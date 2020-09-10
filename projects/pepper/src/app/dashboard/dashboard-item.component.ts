import { Component, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { Results, Record } from '@sinequa/core/web-services';
import { Utils } from '@sinequa/core/base';
import { Query } from '@sinequa/core/app-utils'
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import { NetworkProvider, ProviderFactory, oOTBConfig, defaultOptions } from "@sinequa/components/network";
import { GridsterItemComponent } from 'angular-gridster2';
import { DashboardItem, DashboardService } from './dashboard.service';


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

    @Input() buttonsStyle: string;

    @Output() close = new EventEmitter();
    @Output() recordClicked = new EventEmitter<Record>();

    actions: Action[] = [];
    closeAction: Action;

    // Properties specific to certain types of dashboard items

    // Network
    networkProviders: NetworkProvider[] = [];
    networkOptions = defaultOptions;

    // Timeline sizing
    timelineWidth = 600;
    timelineHeight = 200;

    // Fusion charts
    chartObj?: any;

    // Preview
    record?: Record;
    query?: Query;
    error = false;

    constructor(
        public gridsterItemComponent: GridsterItemComponent,
        public providerFactory: ProviderFactory,
        public searchService: SearchService,
        public dashboardService: DashboardService) {
        this.closeAction = new Action({
            icon: "fas fa-times",
            title: "Close",
            action: () => this.close.next()
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
                this.query.addSelect('id:`'+this.config.recordId+"`");
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

        if(changes["height"] && this.height) {
            this.networkOptions = Utils.copy(defaultOptions);
            this.networkOptions.height = (this.height - 43) + "px";
            this.timelineHeight = this.height - 43;
            if(this.chartObj) {
                this.chartObj.resizeTo(this.width, this.timelineHeight)
            }
        }

        if(changes["width"] && this.width) {
            this.timelineWidth = this.width;
            if(this.chartObj && !changes["height"]) {
                this.chartObj.resizeTo(this.width, this.timelineHeight)
            }
        }

        if(this.config.closable) {
            this.actions = [this.closeAction];
        }
    }

    onChartInitialized(chartObj: any) {
        this.chartObj = chartObj;
        this.chartObj.resizeTo(this.width, this.timelineHeight);
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
}