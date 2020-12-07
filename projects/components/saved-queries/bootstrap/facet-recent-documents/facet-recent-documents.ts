import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecentDocumentsService, RecentDocument } from '../../recent-documents.service';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';

@Component({
  selector: 'sq-facet-recent-documents',
  templateUrl: './facet-recent-documents.html',
  styles: [`
.recent-document-item .document-delete{
    opacity: 0;
}

.recent-document-item:hover .document-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
})
export class BsFacetRecentDocuments extends AbstractFacet  {
    @Input() searchRoute: string = "/preview";
    @Input() maxDocuments: number = 5;
    @Input() enableDelete: boolean = true;
    @Input() openOriginal: boolean = false;
    @Output() documentOpened = new EventEmitter<RecentDocument>();

    page: number = 0;

    previousPage: Action;
    nextPage: Action;

    constructor(
        public recentDocumentsService: RecentDocumentsService,
        public searchService: SearchService) {
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
        return Math.max(0, Math.ceil(this.recentDocumentsService.recentdocuments.length / this.maxDocuments) - 1);
    }

    get startIndex(): number {
        return this.page * this.maxDocuments;
    }

    get endIndex(): number {
        return (this.page+1) * this.maxDocuments;
    }

    get actions(): Action[] {
        this.previousPage.update();
        this.nextPage.update();
        return [this.previousPage, this.nextPage];
    }

    openRecentDocument(document: RecentDocument) {
        if(this.openOriginal && !!document.url1){
            this.searchService.notifyOpenOriginalDocument(<any> document);
        }
        this.documentOpened.emit(document); // Can be use to trigger actions, like the preview
        return true;
    }

    deleteDocument(document: RecentDocument, event: Event){
        this.recentDocumentsService.deleteRecentDocument(document);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }

    getQueryParams(document: RecentDocument) {
        return {
            id: document.id,
            query: this.searchService.makeQuery().toJsonForQueryString()
        };
    }
}
