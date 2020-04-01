import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Results} from "@sinequa/core/web-services";
import {SearchService} from "../../search.service";

@Component({
    selector: "sq-pager",
    templateUrl: "./pager.html",
})
export class BsPager implements OnChanges {
    @Input() results: Results;
    @Input() showNavigation: boolean = true;
    @Input() showFirstLast: boolean = true;
    @Input() showPages: boolean = true;
    @Input() endPages: number = 1;
    @Input() pages: number = 5;

    items: BsPager.Item[] | undefined;

    private currentPage: number;
    pageCount: number = 0;

    static FIRST_PAGE = "«";
    static PREVIOUS_PAGE = "‹";
    static NEXT_PAGE = "›";
    static LAST_PAGE = "»";
    static ELLIPSIS = "…";

    constructor(
        private searchService: SearchService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["results"]) {
            this.makeItems();
        }
    }

    makeItems() {
        this.pageCount = this.searchService.pageCount;
        this.currentPage = this.searchService.page;
        if (this.pageCount === 0) {
            this.items = undefined;
            return;
        }
        let endPages = this.endPages;
        if (!endPages || endPages <= 0) {
            endPages = 1;
        }

        const endWidth = endPages + 1; // +1 for the …

        let pages = this.pages;
        if (!pages) {
            pages = 3 + endWidth * 2;
        }
        if (pages < 3 + endWidth * 2) {
            pages = 3 + endWidth * 2; // 3 is the minimum number of pages to show between the … separators
        }
        let split1 = -1, split2 = -1;
        if (this.pageCount <= pages) {
            pages = this.pageCount;
        }
        else {
            // pages must be an odd number to accommodate:  (First page) … (Current page - 1) (Current page) (Current page + 1) … (Last page)
            pages = Math.floor(pages / 2) * 2 + 1;
            const mid = pages - endWidth * 2;
            const delta = Math.floor(mid / 2);
            if ((this.currentPage - delta) > endPages + 1 + 1) {
                split1 = this.currentPage - delta;
            }
            if ((this.currentPage + delta) < (this.pageCount - endWidth)) {
                split2 = this.currentPage + delta;
            }
            if (split1 === -1 && split2 !== -1) {
                split2 += endPages + 1 + 1 - (this.currentPage - delta);
            }
            else if (split2 === -1 && split1 !== -1)  {
                split1 -= (this.currentPage + delta) - (this.pageCount - endWidth);
            }
        }
        this.items = [];
        if (this.showNavigation) {
            if (this.showFirstLast) {
                this.items.push(new BsPager.Item(1, this.currentPage, BsPager.FIRST_PAGE, "msg#pager.firstPage"));
            }
            this.items.push(new BsPager.Item(this.currentPage > 1 ? this.currentPage - 1 : 1, this.currentPage, BsPager.PREVIOUS_PAGE, "msg#pager.previousPage"));
        }
        if (this.showPages) {
            for (let i = 1, ic = split1 !== -1 ? endPages : split2 !== -1 ? split2 : this.pageCount; i <= ic; i++) {
                this.items.push(new BsPager.Item(i, this.currentPage));
            }
            if (split1 !== -1) {
                this.items.push(new BsPager.Item(0, this.currentPage, BsPager.ELLIPSIS));
                for (let i = split1, ic = split2 !== -1 ? split2 : this.pageCount; i <= ic; i++) {
                    this.items.push(new BsPager.Item(i, this.currentPage));
                }
            }
            if (split2 !== -1) {
                this.items.push(new BsPager.Item(0, this.currentPage, BsPager.ELLIPSIS));
                for (let i = this.pageCount - endPages + 1, ic = this.pageCount; i <= ic; i++) {
                    this.items.push(new BsPager.Item(i, this.currentPage));
                }
            }
        }
        if (this.showNavigation) {
            this.items.push(new BsPager.Item(this.currentPage < this.pageCount ? this.currentPage + 1 : this.pageCount, this.currentPage, BsPager.NEXT_PAGE, "msg#pager.nextPage"));
            if (this.showFirstLast) {
                this.items.push(new BsPager.Item(this.pageCount, this.currentPage, BsPager.LAST_PAGE, "msg#pager.lastPage"));
            }
        }
    }

    gotoPage(page: number) {
        if (page !== this.currentPage && page > 0) {
            this.searchService.gotoPage(page);
        }
    }
}

export namespace BsPager {
    export class Item {
        constructor(
            public page: number,
            public currentPage: number,
            public display?: string | number,
            public title?: string) {
            if (display) {
                this.display = display;
            }
            else {
                this.display = page;
            }
            if (Utils.isUndefined(title) && page) {
                this.title = "msg#pager.pageNumberTitle";
            }
        }

        get active(): boolean {
            return this.isPage && (this.currentPage === this.page);
        }

        get disabled(): boolean {
            return this.isEllipsis || ((this.currentPage === this.page) && this.isNavigation);
        }

        get isNavigation(): boolean {
            return this.display === BsPager.FIRST_PAGE ||
                this.display === BsPager.PREVIOUS_PAGE ||
                this.display === BsPager.NEXT_PAGE ||
                this.display === BsPager.LAST_PAGE;
        }

        get isPage(): boolean {
            return !!this.page && !this.isNavigation;
        }

        get isEllipsis(): boolean {
            return this.display === BsPager.ELLIPSIS;
        }
    }
}