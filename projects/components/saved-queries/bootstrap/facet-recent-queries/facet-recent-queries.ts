import { Component, Input } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { RecentQueriesService, RecentQuery, RecentQueryEventType } from '../../recent-queries.service';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { SavedQueriesService } from '../../saved-queries.service';
import { Utils } from '@sinequa/core/base';
import { Query } from '@sinequa/core/app-utils';

@Component({
  selector: 'sq-facet-recent-queries',
  templateUrl: './facet-recent-queries.html',
  styles: [`
.recent-query-item .query-delete, .recent-query-item .query-save{
    opacity: 0;
}

.recent-query-item:hover .query-delete, .recent-query-item:hover .query-save{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
})
export class BsFacetRecentQueries extends AbstractFacet  {
    @Input() searchRoute: string = "/search";
    @Input() maxQueries: number = 5;
    @Input() enableDelete: boolean = true;
    @Input() enableSave: boolean = true;

    page: number = 0;

    previousPage: Action;
    nextPage: Action;

    constructor(
        public searchService: SearchService,
        public recentQueriesService: RecentQueriesService,
        public savedQueriesService: SavedQueriesService) {
        super();

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
        return Math.max(0, Math.ceil(this.recentQueriesService.recentqueries.length / this.maxQueries) - 1);
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
        return [this.previousPage, this.nextPage];
    }

    openRecentQuery(query: RecentQuery){
        this.recentQueriesService.notifyOpenRecentQuery(query);
        return true;
    }

    deleteQuery(query: RecentQuery, event: Event){
        event.stopPropagation();
        this.recentQueriesService.deleteRecentQuery(query);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }

    saveQuery(query: RecentQuery, event: Event){
        event.stopPropagation();
        const q = Utils.extend(this.searchService.makeQuery(), Utils.copy(query.query));
        this.savedQueriesService.createSavedQueryModal(q);
        return false;
    }

    getQueryParams(recentQuery: Query) {
        const query = this.searchService.makeQuery(recentQuery);
        const queryParams = query.toJsonForQueryString();
        return {query: queryParams};
    }

    getRouterState(recentQuery: Query) {
        return {
            audit: {
                type: RecentQueryEventType.Search,
                detail: {
                    recentquery: recentQuery.text
                }
            }
        }
    }
}
