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
    @Input() renamable = true;

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
        if(this.config.closable) {
            this.actions.push(this.closeAction);
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
    }
}