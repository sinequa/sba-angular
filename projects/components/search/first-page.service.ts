import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, Subscription, filter, switchMap, tap } from 'rxjs';

import { Utils } from "@sinequa/core/base";
import { LoginService } from "@sinequa/core/login";
import { AuditEventType, Results } from "@sinequa/core/web-services";

import { SearchService } from "./search.service";

export interface FirstPageOptions {
    displayOnHomePage?: boolean;
}

export const FIRST_PAGE_OPTIONS = new InjectionToken<FirstPageOptions>("FIRST_PAGE_OPTIONS");

@Injectable({
    providedIn: "root"
})
export class FirstPageService implements OnDestroy {
    private subscriptions: Subscription = new Subscription();
    firstPage?: Results;

    constructor(
        @Optional() @Inject(FIRST_PAGE_OPTIONS) protected options: FirstPageOptions,
        protected searchService: SearchService,
        protected loginService: LoginService,
        protected router: Router
    ) {
        if (!this.options) {
            this.options = {};
        }
        this.subscriptions.add(
            this.searchService.events
                .pipe(
                    filter(event => event.type === "clear"),
                    filter(event => this.displayOnHomePage((event as SearchService.ClearEvent).path)),
                    switchMap(_ => this.getFirstPage())
                ).subscribe()
        );

        // when session changed, on login complete, cache results must be cleared before to get the first page query
        this.subscriptions.add(
            this.loginService.events
                .pipe(
                    filter(event => event.type === "login-complete"),
                    switchMap(_ => {
                        if(this.firstPage) {
                            this.firstPage = undefined;
                            return this.getFirstPage();
                        }
                        else return of();
                    })
                ).subscribe()
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
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

    /**
     * "If the first page is already cached, return it as an observable, otherwise,
     * make a query, set the isFirstPage flag to true, and then return the results
     * as an observable."
     *
     * @returns Observable<Results>
     */
    getFirstPage(): Observable<Results> {
        if (this.firstPage) {
            return of(this.firstPage);
        }
        const query = this.searchService.makeQuery();
        query.isFirstPage = true;

        // side effect, set cache results, then return "results" as observable
        return this.searchService.getResults(query, { type: AuditEventType.Search_FirstPage }, { searchInactive: true })
            .pipe(tap(results => this.firstPage = results))
    }
}
