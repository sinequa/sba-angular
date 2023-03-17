import {Component} from '@angular/core';
import {Tab} from "@sinequa/core/web-services";
import {BsPager} from "@sinequa/components/search";

@Component({
    selector: 'doc-search',
    templateUrl: './search.component.html'
})
export class DocSearchComponent {


    /**
     * TABS
     */
    tabs: Tab[] = [
        {name: 'button', display: 'Option 1', value: '/button', count: 1},
        {name: 'input', display: 'Option 2', value: '/input', count: 1},
        {name: 'checkbox', display: 'Option 3', value: '/checkbox', count: 1},
        {name: 'radio', display: 'Option 4', value: '/radio', count: 1},
        {name: 'textarea', display: 'Option 5', value: '/textarea', count: 1}
    ];

    code1: string = `<sq-tabs [results]="results"></sq-tabs>`;

    /**
     * PAGINATION
     */
    currentPage: number = 7;
    pageCount: number = 15;
    items: BsPager.Item[] = [
        new BsPager.Item(1, this.currentPage, BsPager.FIRST_PAGE, "msg#pager.firstPage"),
        new BsPager.Item(this.currentPage > 1 ? this.currentPage - 1 : 1, this.currentPage, BsPager.PREVIOUS_PAGE, "msg#pager.previousPage"),
        new BsPager.Item(this.currentPage - 3, this.currentPage, BsPager.ELLIPSIS),
        new BsPager.Item(this.currentPage - 2, this.currentPage),
        new BsPager.Item(this.currentPage - 1, this.currentPage),
        new BsPager.Item(this.currentPage, this.currentPage),
        new BsPager.Item(this.currentPage + 1, this.currentPage),
        new BsPager.Item(this.currentPage + 2, this.currentPage),
        new BsPager.Item(this.currentPage + 2, this.currentPage, BsPager.ELLIPSIS),
        new BsPager.Item(this.currentPage < this.pageCount ? this.currentPage + 1 : this.pageCount, this.currentPage, BsPager.NEXT_PAGE, "msg#pager.nextPage"),
        new BsPager.Item(this.pageCount, this.currentPage, BsPager.LAST_PAGE, "msg#pager.lastPage")
    ];

    code2: string = `<sq-pager [results]="results"></sq-pager>`;

    code3: string = `<div class="input-group">
    <div class="form-control d-flex pe-1">
        <!-- Search bar -->
        <div class="d-flex w-100">
            <input type="text" placeholder="Search for...">
        </div>

        <!-- Optional inner buttons -->
        <button type="button" class="btn p-0 me-2">
            <i class="fas fa-times-circle text-muted"></i>
        </button>

        <button type="button" class="btn p-0 me-2">
            <i class="fas fa-brain"></i>
        </button>
    </div>

    <!-- Search buttons -->
    <button class="btn btn-primary" type="button">
        <i class="fas fa-search"></i>
    </button>
</div>`;

    constructor() {
    }

}
