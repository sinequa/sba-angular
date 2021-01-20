import { Component, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { Results, Record } from '@sinequa/core/web-services';
import { Utils } from '@sinequa/core/base';
import { ExprBuilder, Query } from '@sinequa/core/app-utils'
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import { NetworkProvider, ProviderFactory, oOTBConfig, defaultOptions } from "@sinequa/components/network";
import { GridsterItemComponent } from 'angular-gridster2';
import { DashboardItem, DashboardService } from './dashboard.service';
import { defaultChart } from '@sinequa/components/fusioncharts';

@Component({
    selector: 'sq-dashboard-item',
    templateUrl: './dashboard-item.component.html',
    styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnChanges {
    @Input() config: DashboardItem;
    @Input() results: Results;

    // Size of the container, known only after it has been resized
    @Input() width?: number;
    @Input() height?: number;

    // Optional actions to be added to dashboard widgets
    @Input() closable?: number;
    @Input() fullScreenExpandable?: number;
    @Input() maximizable?: number;

    @Input() buttonsStyle: string;

    @Output() recordClicked = new EventEmitter<Record>();

    actions: Action[] = [];
    closeAction: Action;
    renameAction: Action;
    fullScreenAction: Action;
    exitFullScreenAction: Action;
    maximizeAction: Action;
    minimizeAction: Action;

    // Properties specific to certain types of dashboard items
    innerwidth = 600;
    innerheight = 200;
    initialHeight: number | undefined;
    initialWidth: number | undefined;

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
            title: "Full screen",
            action: () => this.toggleFullScreen()
        });

        this.exitFullScreenAction = new Action({
            icon: "fas fa-compress",
            title: "Exit full screen",
            action: () => this.toggleFullScreen()
        });

        this.maximizeAction = new Action({
            icon: "fas fa-expand-alt",
            title: "Maximize",
            action: () => this.toggleMaximizedView()
        });

        this.minimizeAction = new Action({
            icon: "fas fa-compress-alt",
            title: "Minimize",
            action: () => this.toggleMaximizedView()
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.config.type === "network" && this.results && this.networkProviders.length === 0) {
            this.networkProviders = oOTBConfig(this.providerFactory);
        }

        if(this.config.type === "preview" && !this.record && this.config.recordId && this.config.queryStr) {
            this.query = this.searchService.makeQuery().fromJson(this.config.queryStr);
            if(this.results) {
                this.record = this.results.records.find(r => r.id === this.config.recordId)
            }
            if(!this.record) {
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

        if(changes["height"] && this.height) {
            this.networkOptions = Utils.copy(defaultOptions);
            this.innerheight = this.height - 43;
            this.networkOptions.height = this.innerheight + "px";
            if(this.chartObj) {
                this.chartObj.resizeTo(this.width, this.innerheight)
            }
        }

        if(changes["width"] && this.width) {
            this.innerwidth = this.width;
            if(this.chartObj && !changes["height"]) {
                this.chartObj.resizeTo(this.width, this.innerheight)
            }
        }

        if(this.closable) {
            this.actions = [this.renameAction, this.closeAction];
        }

        if (this.fullScreenExpandable) {
            this.actions = [this.fullScreenAction, ...this.actions];
        }

        if (this.maximizable) {
            this.actions = [
                this.gridsterItemComponent.el.classList.contains('widget-maximized-view')
                    ? this.minimizeAction
                    : this.maximizeAction,
                ...this.actions
            ]
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
                const index = this.actions.indexOf(this.fullScreenAction);
                this.actions[index] = this.exitFullScreenAction;
            }

            // update related maximize/minimize actions since they can not be performed in full-screen mode
            const indexMaximizeAction = this.actions.indexOf(this.maximizeAction);
            if (indexMaximizeAction > -1) {
                this.actions[indexMaximizeAction].disabled = document.fullscreenElement !== null;
            }
            const indexMinimizeAction = this.actions.indexOf(this.minimizeAction);
            if (indexMinimizeAction > -1) {
                this.actions[indexMinimizeAction].disabled = document.fullscreenElement !== null;
            }
        }
    }

    toggleMaximizedView(): void {
        const elem = this.gridsterItemComponent.el;

        if (!this.initialHeight) { // save original height before maximizing
            this.initialHeight = this.innerheight + 43;
        }
        if (!this.initialWidth) { // save original width before maximizing
            this.initialWidth = this.innerwidth;
        }

        elem.classList.toggle('widget-maximized-view'); // allow container of gridsterItem to full-fill its direct parent dimensions
        this.gridsterItemComponent.el.parentElement?.classList.toggle('no-scroll'); // disable the direct parent scroll

        if (elem.classList.contains('widget-maximized-view')) { // update component defined in gridsterItem to full-fill its maximized space
            this.config.height = this.gridsterItemComponent.el.parentElement?.clientHeight!;
            this.config.width = this.gridsterItemComponent.el.parentElement?.clientWidth!;
        } else { // restore original dashboard view
            this.config.height = this.initialHeight;
            this.config.width = this.initialWidth;
        }

        // update related full-screen actions since they can not be performed in maximized mode
        const indexFullScreenAction = this.actions.indexOf(this.fullScreenAction);
        if (indexFullScreenAction > -1) {
            this.actions[indexFullScreenAction].disabled = elem.classList.contains('widget-maximized-view');
        }
        const indexExitFullScreenAction = this.actions.indexOf(this.exitFullScreenAction);
        if (indexExitFullScreenAction > -1) {
            this.actions[indexExitFullScreenAction].disabled = elem.classList.contains('widget-maximized-view');
        }
    }

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

    onRecordClicked(record?: Record){
        if(record){
            this.recordClicked.next(record);
        }
    }

    rename() {
        this.dashboardService.renameWidgetModal(this.config);
    }

    close() {
        this.dashboardService.removeItem(this.config);
    }
}
