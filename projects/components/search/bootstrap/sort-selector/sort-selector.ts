import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {AppService} from "@sinequa/core/app-utils";
import {AuditEvent, AuditEventType, CCSortingChoice, Results} from "@sinequa/core/web-services";
import {Action} from "@sinequa/components/action";
import {SearchService} from "../../search.service";

@Component({
    selector: "sq-sort-selector",
    templateUrl: "./sort-selector.html"
})
export class BsSortSelector implements OnChanges {
    @Input() results: Results;  // Needed to detect Changes
    @Input() rightAligned: boolean;
    @Input() style: string;
    @Input() size: string;
    sortAction: Action | undefined;

    constructor(
        public appService: AppService,
        public searchService: SearchService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["results"]) {
            this.buildSortAction();
        }
    }

    private setCurrentSort(name: string) {
        if (this.sortAction) {
            const sortingChoices = this.getSortingChoices();
            const current = sortingChoices && sortingChoices.find((value) => {
                return Utils.eqNC(value.name, name);
            });
            if (current) {
                const queryOrderBy = this.searchService.query.orderBy;
                this.sortAction.text = !!queryOrderBy ? "msg#sortSelector.sortOther" : current.display || current.name;
                this.sortAction.icon = !!queryOrderBy ? 'fas fa-sort'
                    : this.isAscendingSort(current.orderByClause) ? 'fas fa-sort-amount-up'
                    : this.isDescendingSort(current.orderByClause) ? 'fas fa-sort-amount-down' : 'fas fa-sort';
            }
            else {
                this.sortAction.text = "msg#sortSelector.sortOther";
                this.sortAction.icon = "fas fa-sort";
            }
            this.sortAction.messageParams = {values: {text: this.sortAction.text}}; // for title
        }
    }

    private selectSort(sortingChoice: CCSortingChoice) {
        this.setCurrentSort(sortingChoice.name);
        this.searchService.query.sort = sortingChoice.name;
        const audit: AuditEvent = {
            type: AuditEventType.Search_Sort,
            detail: {
                sort: sortingChoice.name,
                orderByClause: sortingChoice.orderByClause,
            }
        };
        this.searchService.search(undefined, audit);
    }

    private buildSortAction() {
        const sortingChoices = this.getSortingChoices();
        if (!sortingChoices || sortingChoices.length === 0) {
            this.sortAction = undefined;
            return;
        }
        this.sortAction = new Action({
            title: "msg#sortSelector.sortByTitle",
            children: sortingChoices
                .filter(sortingChoice => this.searchService.hasRelevance || !Utils.includes(sortingChoice.orderByClause, "globalrelevance"))
                .map(sortingChoice => new Action({
                    icon: this.isAscendingSort(sortingChoice.orderByClause) ? 'fas fa-sort-amount-up'
                            : this.isDescendingSort(sortingChoice.orderByClause) ? 'fas fa-sort-amount-down' : '',
                    text: sortingChoice.display || sortingChoice.name,
                    data: sortingChoice,
                    action: (item: Action, event: Event) => {
                        this.selectSort(item.data);
                    }
                }))
        });
        if (!!this.searchService.results) {
            this.setCurrentSort(this.searchService.results.sort);
        }
    }

    private isAscendingSort(orderByClause: string): boolean {
        if (!orderByClause) {
            return false;
        }

        const lastElement: string = orderByClause.substring(orderByClause.lastIndexOf(' ') + 1);
        return Utils.eqNC('asc', lastElement);
    }

    private isDescendingSort(orderByClause: string): boolean {
        if (!orderByClause) {
            return false;
        }

        const lastElement: string = orderByClause.substring(orderByClause.lastIndexOf(' ') + 1);
        return Utils.eqNC('desc', lastElement);
    }

    private isTabSearch(): boolean {
        const query = this.appService.ccquery;
        if (!query)
            return false;
        const tabSearch = query.tabSearch;
        return !(!tabSearch || !tabSearch.column || !tabSearch.isActive ||
            !tabSearch.tabs || tabSearch.tabs.length === 0);
    }

    private getSortingChoices(): CCSortingChoice[] | null | undefined {
        if (this.isTabSearch()) {
            const tabName = this.searchService.results && this.searchService.results.tab;
            if (tabName && this.appService.ccquery) {
                for (const t of this.appService.ccquery.tabSearch.tabs) {
                    if (t.name === tabName) {
                        const s = t.sortingChoices;
                        if (s && s.length > 0)
                            return s;
                        else
                            break;
                    }
                }
            }
        }
        const q = this.appService.ccquery;
        return q && q.sortingChoices;
    }
}