import { Component, Input } from '@angular/core';
import { SavedQueriesService, SavedQuery, SavedQueryEventType } from '../../saved-queries.service';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';

@Component({
  selector: 'sq-facet-saved-queries',
  templateUrl: './facet-saved-queries.html',
  styles: [`
.saved-query-item .query-delete{
    opacity: 0;
}

.saved-query-item:hover .query-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
})
export class BsFacetSavedQueries extends AbstractFacet  {
    @Input() searchRoute: string = "/search";
    @Input() maxQueries: number = 5;
    @Input() enableDelete: boolean = true;

    page: number = 0;

    manageSavedQueries: Action;
    previousPage: Action;
    nextPage: Action;

    constructor(
        public savedQueriesService: SavedQueriesService) {
        super();

        this.manageSavedQueries = new Action({
            icon: "fas fa-cog",
            title: "msg#savedQueries.manageSavedQueries",
            action: () => {
                this.savedQueriesService.manageSavedQueriesModal();
            }
        });

        this.previousPage = new Action({
            icon: "fas fa-chevron-left",
            title: "msg#facet.previous",
            action: () => {
                this.page--;
            },
            updater: (action: Action) => {
                action.disabled = this.page <= 0;
                action.hidden = this.maxPage === 0;
            }
        });

        this.nextPage = new Action({
            icon: "fas fa-chevron-right",
            title: "msg#facet.next",
            action: () => {
                this.page++;
            },
            updater: (action: Action) => {
                action.disabled = this.page >= this.maxPage;
                action.hidden = this.maxPage === 0;
            }
        });
    }

    get maxPage(): number {
        return Math.max(0, Math.ceil(this.savedQueriesService.savedqueries.length / this.maxQueries) - 1);
    }

    get startIndex(): number {
        return this.page * this.maxQueries;
    }

    get endIndex(): number {
        return (this.page+1) * this.maxQueries;
    }

    get actions(): Action[] {
        this.previousPage.update();
        this.nextPage.update();
        return [this.previousPage, this.nextPage, this.manageSavedQueries];
    }

    openSavedQuery(query: SavedQuery){
        this.savedQueriesService.notifyOpenSavedQuery(query)
        return true;
    }

    deleteQuery(query: SavedQuery, event: Event){
        event.stopPropagation();
        this.savedQueriesService.deleteSavedQuery(query);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }

    getQueryParams(savedQuery: SavedQuery) {
        const query = this.savedQueriesService.searchService.makeQuery(savedQuery.query);
        const queryParams = query.toJsonForQueryString();
        return {query: queryParams};
    }

    getRouterState(savedQuery: SavedQuery) {
        return {
            audit: {
                type: SavedQueryEventType.Search,
                detail: {
                    "saved-query": savedQuery.name
                }
            }
        }
    }
}
