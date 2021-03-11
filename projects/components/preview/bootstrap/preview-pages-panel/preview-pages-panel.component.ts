import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, ViewChildren, ElementRef, QueryList } from "@angular/core";
import { PreviewDocument } from "../../preview-document";
import { PreviewService } from "../../preview.service";
import { PreviewData, Results, Record } from "@sinequa/core/web-services";

@Component({
    selector: 'sq-preview-pages-panel',
    templateUrl: './preview-pages-panel.component.html'
})
export class BsPreviewPagesPanelComponent implements OnChanges {
    @Input() pages: Results;
    @Input() previewData: PreviewData;
    @Input() previewDocument: PreviewDocument;
    @Input() style: "light"|"dark" = "light";
    @Output() gotopage = new EventEmitter<number>();

    @ViewChildren('currentPageEl', {read: ElementRef}) currentPageEl: QueryList<ElementRef>;

    sortedPages: Record[];

    containerid: string;
    currentPage: number;

    hasFirst: boolean;
    hasPrevious: boolean;
    hasNext: boolean;

    _pendingPreviewDocument: boolean = true;
    _pendingPages: boolean = true;
    _pendingPage?: number;

    constructor(public previewService: PreviewService) {

    }

    ngOnChanges(changes: SimpleChanges) {

        // PreviewData should change first, which triggers the new previewDocument and pages
        if(changes["previewData"]) {
            this._pendingPreviewDocument = true;
            this._pendingPages = true;
        }

        if(changes["previewDocument"]) {
            this._pendingPreviewDocument = false;
        }

        if(changes["pages"]) {
            this._pendingPages = false;
        }

        // ngOnChanges is called multiple times due to async updates of the Inputs()
        // The _pending variables let us wait for all these inputs to come in before apply the changes
        if(!this._pendingPreviewDocument && !this._pendingPages) {
            this._pendingPage = undefined;

            if(this.previewData) {
                this.currentPage = this.previewData.record.$page!;
                this.containerid = this.previewData.record.containerid!;
            }
    
            if(this.pages && this.currentPage && this.containerid) {

                this.sortedPages = this.pages.records;
    
                // Parse the page number from each record id
                this.sortedPages.forEach(record => {
                    this.previewService.getPageNumber(record);
                    if(!record.$page) {
                        throw new Error("Record is not page... "+ record.id);
                    }
                });
    
                // Insert current page if missing (possible when navigating to previous/next page)
                if(!this.sortedPages.find(page => page.$page === this.currentPage)) {
                    this.sortedPages.push(this.previewData.record);
                }
    
                // Sort the pages
                this.sortedPages.sort((a,b) => a.$page! - b.$page!);
    
                // Update current page neighbours
                this.hasFirst = !!this.sortedPages.find(page => page.$page! === 1 || this.currentPage === 2 ); // include 2nd page, because is covered by the previous page below
                this.hasPrevious = this.currentPage === 1 || !!this.sortedPages.find(page => page.$page === this.currentPage - 1);
                this.hasNext = !!this.sortedPages.find(page => page.$page === this.currentPage + 1);
            }

            // SetTimeout is needed to scroll only after the DOM changes
            setTimeout(() => {
                this.currentPageEl?.first?.nativeElement.scrollIntoView({behaviour: "smooth", block: "start"});
            });
        }

    }

    selectPage(page: number) {
        this.gotopage.next(page);
        this._pendingPage = page;
        return false;
    }

    selectPrevious() {
        return this.selectPage(this.currentPage-1);
    }

    selectNext() {
        return this.selectPage(this.currentPage+1);
    }
}