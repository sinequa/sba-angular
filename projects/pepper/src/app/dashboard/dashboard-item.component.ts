import { Component, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { GridsterItemComponent } from 'angular-gridster2';

import { Results, Record } from '@sinequa/core/web-services';
import { Utils } from '@sinequa/core/base';
import { ExprBuilder, Query } from '@sinequa/core/app-utils'

import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';

import { NetworkProvider, ProviderFactory, oOTBConfig, defaultOptions } from "@sinequa/analytics/network";
import { defaultChart } from '@sinequa/analytics/fusioncharts';

import { DashboardItem, DashboardService } from './dashboard.service';
/**
 * A wrapper component for all widgets in the dashboard.
 * The component is in charge of updating inputs going into each widget.
 * To add a custom widget, add it to the template, along with other widgets,
 * then, in the ngOnChanges method, generate the inputs necessary for this widget.
 */

@Component({
    selector: 'sq-dashboard-item',
    templateUrl: './dashboard-item.component.html',
    styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnChanges {
    @Input() config: DashboardItem;
    @Input() results: Results;

    // Whether this widget can be renamed or not
    @Input() renamable = false;

    // Whether this widget can be removed or not
    @Input() closable = true;

    // Whether this widget can be displayed in full-screen mode or not
    @Input() fullScreenExpandable = false;

    // Whether this widget can be viewed in maximized dimensions or not
    @Input() maximizable = true;

    // Size of the container, known only after it has been resized by the Gridster library
    @Input() width?: number;
    @Input() height?: number;

    // Dark/Light theme
    @Input() buttonsStyle: string;

    // Emit an event when the user clicks on a record displayed within a widget
    @Output() recordClicked = new EventEmitter<Record>();

    // Custom actions for this widget
    actions: Action[] = [];
    closeAction: Action;
    renameAction: Action;
    fullScreenAction: Action;
    maximizeAction: Action;

    // Properties specific to certain types of dashboard items
    innerwidth = 600;
    innerheight = 200;

    // Network
    networkProviders: NetworkProvider[] = [];
    networkOptions = defaultOptions;

    // Fusion charts
    chart = defaultChart;
    chartObj?: any;

    // Preview
    record?: Record;
    query?: Query;
    error = false;

    constructor(
        public gridsterItemComponent: GridsterItemComponent,
        public providerFactory: ProviderFactory,
        public searchService: SearchService,
        public dashboardService: DashboardService,
        public exprBuilder: ExprBuilder) {

        this.closeAction = new Action({
            icon: "fas fa-times",
            title: "msg#dashboard.widgetClose",
            action: () => this.close()
        });

        this.renameAction = new Action({
            icon: "far fa-edit",
            title: "msg#dashboard.renameWidgetTitle",
            action: () => this.rename()
        });

        this.fullScreenAction = new Action({
            icon: "fas fa-expand",
            title: "msg#dashboard.fullScreenTitle",
            action: () => this.toggleFullScreen()
        });

        this.maximizeAction = new Action({
            icon: "fas fa-expand-alt",
            title: "msg#dashboard.maximizeTitle",
            action: (action) => {
                this.toggleMaximizedView();
                action.icon = this.gridsterItemComponent.el.classList.contains('widget-maximized-view')
                              ? "fas fa-compress-alt"
                              : "fas fa-expand-alt";
                action.title = this.gridsterItemComponent.el.classList.contains('widget-maximized-view')
                              ? "msg#dashboard.minimizeTitle"
                              : "msg#dashboard.maximizeTitle";
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {

        // Set up the configuration for the NETWORK widget.
        // The test "this.networkProviders.length === 0" ensures the configuration is done only once
        if(this.config.type === "network" && this.results && this.networkProviders.length === 0) {
            this.networkProviders = oOTBConfig(this.providerFactory);
        }

        // If this widget displays a doc preview, a record object is needed. It may come from the list of results
        // or from a additional query via the Search Service.
        if(this.config.type === "preview" && !this.record && this.config.recordId && this.config.queryStr) {
            // Rebuild the query that allowed to obtain this record
            this.query = this.searchService.makeQuery().fromJson(this.config.queryStr);
            if(this.results) {
                // Try to retrieve the record from the results list
                this.record = this.results.records.find(r => r.id === this.config.recordId)
            }
            if(!this.record) {
                // Try to retrieve the record from a dedicated query
                this.query.addSelect(this.exprBuilder.makeExpr('id', this.config.recordId));
                this.searchService.getResults(this.query, undefined, {searchInactive: true}).subscribe(
                    results => {
                        this.record = results.records[0];
                    },
                    err => {
                        console.error(err);
                        this.error = true;
                    }
                );
            }
        }

        if(this.config.type === "chart") {
            this.chart.theme = this.buttonsStyle === "dark"? "candy" : "fusion";
        }

        // Manage width and height changes. Some components need additional treatment

        if(changes["height"] && this.height) {
            this.innerheight = this.height - 43;
            // Update network
            if(this.config.type === "network") {
                this.networkOptions = Utils.copy(defaultOptions);
                this.networkOptions.height = this.innerheight + "px";
            }
            // Update chart
            if(this.chartObj) {
                this.chartObj.resizeTo(this.width, this.innerheight)
            }
        }

        if(changes["width"] && this.width) {
            this.innerwidth = this.width;
            // Update chart, if not already done
            if(this.chartObj && !changes["height"]) {
                this.chartObj.resizeTo(this.width, this.innerheight)
            }
        }

        // Update the actions
        this.actions = [];
        if(this.renamable) {
            this.actions.push(this.renameAction);
        }
        if(this.closable) {
            this.actions.push(this.closeAction);
        }
        if (this.fullScreenExpandable) {
            this.actions = [this.fullScreenAction, ...this.actions];
        }
        if (this.maximizable) {
            this.actions = [this.maximizeAction, ...this.actions]
        }
    }

    toggleFullScreen(): void {
        const elem = this.gridsterItemComponent.el;

        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                this.config.height = window.screen.height; // update gridsterItem to full-fill the screen height
                this.config.width = window.screen.width; // update gridsterItem to full-fill the screen width
                elem.requestFullscreen()
                    .catch(
                        (err) => console.error(`Error attempting to enable full-screen mode: ${err.message}`)
                    );
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }

        /**
         * callback to update the item's actions on switch from/to full-screen mode
         */
        elem.onfullscreenchange = () => {
            if (document.fullscreenElement) {
                this.fullScreenAction.icon = "fas fa-compress";
                this.fullScreenAction.title = "msg#dashboard.exitFullScreenTitle";
            } else {
                this.fullScreenAction.icon = "fas fa-expand";
                this.fullScreenAction.title = "msg#dashboard.fullScreenTitle";
            }

            // update related maximize/minimize actions since they can not be performed in full-screen mode
            if (this.maximizable) {
                this.maximizeAction.disabled =  document.fullscreenElement !== null;
            }
        }
    }

    toggleMaximizedView(): void {
        const elem = this.gridsterItemComponent.el;

        elem.classList.toggle('widget-maximized-view'); // allow container of gridsterItem to full-fill its direct parent dimensions
        elem.parentElement?.classList.toggle('no-scroll'); // disable the direct parent scroll

        if (elem.classList.contains('widget-maximized-view')) { // update component defined in gridsterItem to full-fill its maximized space
            this.config.height = elem.parentElement?.clientHeight!;
            this.config.width = elem.parentElement?.clientWidth!;
        } else { // update height/width to the dimensions of the gridsterItemComponent
            this.config.height = this.gridsterItemComponent.height;
            this.config.width = this.gridsterItemComponent.width;
        }

        // update related full-screen actions since they can not be performed in maximized mode
        if (this.fullScreenExpandable) {
            this.fullScreenAction.disabled = elem.classList.contains('widget-maximized-view');
        }
    }

    // Specific callback methods for the CHART widget

    onChartInitialized(chartObj: any) {
        this.chartObj = chartObj;
        this.chartObj.resizeTo(this.width, this.innerheight);
    }

    onChartAggregationChange(aggregation: string) {
        this.config.aggregation = aggregation;
        this.dashboardService.notifyItemChange(this.config);
    }

    onChartTypeChange(type: string) {
        this.config.chartType = type;
        this.dashboardService.notifyItemChange(this.config);
    }

    /**
     * Notifies parent that a record was clicked
     * @param record
     */
    onRecordClicked(record?: Record){
        if(record){
            this.recordClicked.next(record);
        }
    }

    /**
     * Open a modal to rename this widget
     */
    rename() {
        this.dashboardService.renameWidgetModal(this.config);
    }

    /**
     * Remove this widget from the dashboard
     */
    close() {
        this.dashboardService.removeItem(this.config);
        if (this.gridsterItemComponent.el.parentElement?.classList.contains('no-scroll')) {
            this.gridsterItemComponent.el.parentElement.classList.remove('no-scroll')
        }
    }
}
