import {Injectable, InjectionToken, Optional, Inject, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {SearchService} from "./search.service";
import {Subscription, Observable, of} from 'rxjs';
import {Utils} from "@sinequa/core/base";
import {AuditEventType, Results} from "@sinequa/core/web-services";

export interface FirstPageOptions {
    displayOnHomePage?: boolean;
}

export const FIRST_PAGE_OPTIONS = new InjectionToken<FirstPageOptions>("FIRST_PAGE_OPTIONS");

@Injectable({
    providedIn: "root"
})
export class FirstPageService implements OnDestroy {
    private searchSubscription: Subscription;
    firstPage: Results;

    constructor(
        @Optional() @Inject(FIRST_PAGE_OPTIONS) protected options: FirstPageOptions,
        protected searchService: SearchService,
        protected router: Router
    ) {
        if (!this.options) {
            this.options = {};
        }
        this.searchSubscription = this.searchService.events.subscribe(
            (event) => {
                if (event.type === "clear") {
                    if (this.displayOnHomePage(event.path)) {
                        Utils.subscribe(this.getFirstPage(),
                            (results) => {
                                this.searchService.setResults(results);
                            });
                    }
                }
            }
        );
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }

    /**
     * @ignore
     * legacy
     */
    get isFirstPage(): boolean {
        return this.isCurrentSearchResults;
    }

    get isCurrentSearchResults(): boolean {
        return !!this.searchService.results && this.searchService.results === this.firstPage;
    }

    displayOnHomePage(path?: string): boolean {
        if (Utils.isArray(this.options.displayOnHomePage)) {
            if (!path) {
                const url = Utils.makeURL(this.router.url);
                path = url.pathname;
            }
            for (const path1 of this.options.displayOnHomePage) {
                if (Utils.endsWith(path, Utils.addUrl("/", path1))) {
                    return true;
                }
            }
            return false;
        }
        else {
            return !!this.options.displayOnHomePage;
        }
    }

    getFirstPage(): Observable<Results> {
        if (this.firstPage) {
            return of<Results>(this.firstPage);
        }
        const query = this.searchService.makeQuery();
        query.isFirstPage = true;
        const observable = this.searchService.getResults(query, {
            type: AuditEventType.Search_FirstPage
        }, {
            searchInactive: true
        });
        Utils.subscribe(observable,
            (results) => {
                this.firstPage = results;
                return results;
            });
        return observable;
    }
}
