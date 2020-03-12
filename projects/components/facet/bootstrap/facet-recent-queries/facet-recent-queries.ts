import {Subscription} from "rxjs";
import {Input, Component, SimpleChanges, ChangeDetectorRef} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {AppService, Query} from "@sinequa/core/app-utils";
import {RecentQueriesWebService, Results} from "@sinequa/core/web-services";
import {SearchService} from "@sinequa/components/search";
import {AbstractFacet} from "../../abstract-facet";


@Component({
    selector: "sq-recent-queries",
    templateUrl: "./facet-recent-queries.html"
})
export class BsRecentQueries extends AbstractFacet {
    @Input() results: Results;
    @Input() foldedPageSize: number = 10;
    @Input() unfoldedPageSize: number = 30;
    @Input() searchRoute: string = "/search";

    maxItemsToShow: number;
    folded: boolean = true;

    private myobserver: Subscription | undefined;


    constructor(
        public  recentQueriesService: RecentQueriesWebService,
        public  searchService: SearchService,
        public  appService: AppService,
        private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.maxItemsToShow = this.foldedPageSize;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.myobserver  = Utils.subscribe(this.recentQueriesService.load(), // Updates current state of recent queries, maintained by that service.
        (results) => {
            this.changeDetectorRef.markForCheck();
        },
        (error) => {
            console.error("recent-queries component.getRecentQueries failed: ", error);
        });
    }

    ngOnDestroy() {
        if (this.myobserver)
            this.myobserver.unsubscribe();
        this.myobserver = undefined;
    }

    select(query: Query) {
        //this.searchService.query = Query.copy(query);
        // The memorized query, if built from recentQueriesService at startup, is not always a true Query object.
        // Make sure to build a true one. [Tim is already aware of this inconsistency and has planned some refactoring.]
        this.searchService.setQuery(Utils.extend(this.searchService.makeQuery(), Utils.copy(query)));
        this.searchService.search({path: this.searchRoute});
        return false;
    }

    // Limit the number of queries to display
    isFolded():boolean {
        return this.folded;
    }

    foldUnfoldDisplay (fold:boolean) {
        if (fold){
            this.folded = true;
            this.maxItemsToShow = this.foldedPageSize;
        }
        else{
            this.folded = false;
            this.maxItemsToShow = this.unfoldedPageSize;
        }
    }

    shouldShowPagination():boolean {
        return this.recentQueriesService.userRecentQueriesLength() > this.foldedPageSize;
    }
}