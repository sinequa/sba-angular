import {Component, OnChanges, SimpleChanges, Input} from '@angular/core';
import {Results} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {Action} from "@sinequa/components/action";
import {SearchService} from "../../search.service";
//import {ResultsView} from '@sinequa/components/results-view';

// TODO restore functionality of storing page size in user settings ?

/**
 * Component for choosing the page size of the results view
 *
 */
@Component({
    selector: 'sq-page-size-selector',
    templateUrl: './page-size-selector.html'
})
export class BsPageSizeSelector implements OnChanges {
    @Input() results: Results;
    //@Input() resultsView: ResultsView;
    @Input() showInRegularView: boolean = true;
    @Input() showInCustomization: boolean;
    @Input() pageSizes: number[];
    @Input() rightAligned: boolean;

    public pageSizingAction: Action;

    private availableSizes: number[];
    private currentPageSize: number;

    constructor(
        private appService: AppService,
        private searchService: SearchService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.refreshVisualisation();
    }

    /*
    private get globalPageSize(): number {
        const globalQueryParams = this.userSettingsService.getUserSettings().queryParams;
        return globalQueryParams ? globalQueryParams.pageSize : undefined;
    }
    */

    private get configPageSize(): number {
        return this.appService.ccquery ? this.appService.ccquery.pageSize : 0;
    }

    private get defaultPageSize(): number {
        //let res = this.globalPageSize;
        //if (!res) {
        let res = this.configPageSize;
        if (!res) {
            res = SearchService.DefaultPageSize;
        }
        //}

        return res;
    }

    private buildPageSizingAction(): Action {
        this.availableSizes = this.pageSizes ? this.pageSizes.slice(0) : [];
        this.availableSizes.sort((a, b) => a - b);
        const children: Action[] = [];

        children.push(new Action({
            text: 'msg#pageSizeSelector.defaultPageSize',
            messageParams: { values: { size: this.defaultPageSize } },
            data: undefined, // To make sure that setCurrentSize() always chooses the default choice text.
            action: (item: Action, event: Event) => {
                this.updatePageSize(item.data);
            }
        }));

        for (const size of this.availableSizes) {
            children.push(new Action({
                text: size.toString(),
                data: size,
                action: (item: Action, event: Event) => {
                    this.updatePageSize(item.data);
                }
            }));
        }

        return new Action({
            icon: 'fas fa-arrows-alt-v',
            text: 'msg#pageSizeSelector.pageSizeChoice',
            children: children
        });
    }

    private refreshVisualisation(): void {
        this.pageSizingAction = this.buildPageSizingAction();
        if (this.results) {
            //const queryParams = this.userSettingsService.getViewQueryParams(this.resultsView.name);
            //this.currentPageSize = queryParams.pageSize;
            this.setCurrentSize(this.currentPageSize);
        }
    }

    private setCurrentSize(size: number): void {
        if (!size) {
            this.pageSizingAction.text = 'msg#pageSizeSelector.defaultPageSizeChoice';
            this.pageSizingAction.messageParams = { values: { size: this.defaultPageSize } };
        }
        else {
            const selectedAction = this.pageSizingAction.children?.find(action => action.data === size);
            this.pageSizingAction.text = 'msg#pageSizeSelector.pageSizeChoice';
            this.pageSizingAction.messageParams = { values: { size: selectedAction?.data } };
        }
    }

    private updatePageSize(size: number): void {
        if (this.currentPageSize !== size) {
            //this.userSettingsService.saveResultsViewPageSize(this.resultsView.name, size);
            this.currentPageSize = size;

            this.searchService.query.pageSize = size;
            this.searchService.search();
        }

        this.setCurrentSize(size);
    }
}
