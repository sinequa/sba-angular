---
layout: default
title: Completed Application
parent: Tutorial
sidebar_position: 11
---

# Completed application

Here is for reference, the source code of the application, at the end of the tutorial (empty files are ignored).

## App module

```ts title="app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable, from } from "rxjs";

import { WebServicesModule, StartConfigWebService, StartConfig } from "@sinequa/core/web-services";
import { LoginModule, LoginInterceptor } from "@sinequa/core/login";
import { IntlModule, LocaleData, LocalesConfig, Locale } from "@sinequa/core/intl";
import { ModalModule } from "@sinequa/core/modal";
import { NotificationsInterceptor } from "@sinequa/core/notification";
import { AuditInterceptor } from "@sinequa/core/app-utils";

import { BsSearchModule } from '@sinequa/components/search';
import { BsFacetModule } from '@sinequa/components/facet';
import { BsActionModule } from '@sinequa/components/action';
import { PreviewModule } from '@sinequa/components/preview';
import { BsModalModule } from '@sinequa/components/modal';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';
import { SearchFormComponent } from "@sinequa/components/search-form";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { Preview } from "./preview";
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { Autocomplete } from "./autocomplete";
import { SearchFormComponent as AppSearchFormComponent } from './search-form/search-form.component';
import { SCREEN_SIZE_RULES } from '@sinequa/components/utils';

export const startConfig: StartConfig = {
    app: "training",
    autoSAMLProvider: "identity-dev",
    production: environment.production,
    auditEnabled: true
};

// Locales configuration
export class AppLocalesConfig implements LocalesConfig {
    locales: Locale[] = [
        { name: "en", display: "msg#locale.en" },
        { name: "fr", display: "msg#locale.fr" }
    ];
    defaultLocale: Locale = this.locales[0];
    loadLocale(locale: string): Observable<LocaleData> {
        return from(import('../locales/' + locale).then(m => m.default));
    }
}

export function StartConfigInitializer(startConfigWebService: StartConfigWebService) {
    return () => startConfigWebService.fetchPreLoginAppConfig();
}

// Screen size breakpoints (must be consistent with Bootstrap custom breakpoints in styles/app.scss)
export const breakpoints = {
    lg: "(min-width: 1000px)",
    sm: "(min-width: 600px) and (max-width: 999px)",
    xs: "(max-width: 599px)",
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: "home", component: HomeComponent },
            { path: "search", component: SearchComponent },
            { path: "**", redirectTo: "home" }
        ]),
        FormsModule,
        ReactiveFormsModule,

        WebServicesModule.forRoot(startConfig),
        IntlModule.forRoot(AppLocalesConfig),
        LoginModule.forRoot(), // Just use default login modal
        ModalModule.forRoot(),

        BsSearchModule.forRoot({ routes: ['search'] }),
        BsFacetModule,
        BsActionModule,
        PreviewModule,
        BsModalModule,
        SearchFormComponent,
        BsSavedQueriesModule
    ],
    declarations: [
        AppComponent,
        Preview,
        Autocomplete,
        HomeComponent,
        SearchComponent,
        AppSearchFormComponent
    ],
    providers: [
        // Provides an APP_INITIALIZER which will fetch application configuration information from the Sinequa
        // server automatically at startup using the application name specified in the URL (app[-debug]/<app-name>).
        // This allows an application to avoid hard-coding parameters in the StartConfig but requires that the application
        // be served from the an app[-debug]/<app name> URL.
        // {provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true},

        // Provides the Angular LocationStrategy to be used for reading route state from the browser's URL. Currently
        // only the HashLocationStrategy is supported by Sinequa.
        { provide: LocationStrategy, useClass: HashLocationStrategy },

        // Provides an HttpInterceptor to handle user login. The LoginInterceptor handles HTTP 401 responses
        // to Sinequa web service requests and initiates the login process.
        { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },

        // Provides an HttpInterceptor that offers a centralized location through which all client-side
        // audit records pass. An application can replace AuditInterceptor with a subclass that overrides
        // the updateAuditRecord method to add custom audit information to the records.
        { provide: HTTP_INTERCEPTORS, useClass: AuditInterceptor, multi: true },

        // Provides an HttpInterceptor that automatically processes any notifications specified in the $notifications
        // member of the response body to any Sinequa web service requests.
        { provide: HTTP_INTERCEPTORS, useClass: NotificationsInterceptor, multi: true },

        { provide: SCREEN_SIZE_RULES, useValue: breakpoints }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
```

## App Component

### Controller

```ts title="app.component.ts"
import {Component, AfterViewInit} from "@angular/core";
import {LoginService} from "@sinequa/core/login";
import {NotificationsService, Notification} from "@sinequa/core/notification";

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {

    constructor(
        public loginService: LoginService,
        public notificationsService: NotificationsService) {
    }

    ngAfterViewInit() {
        this.login();
    }

    login() {
        this.loginService.login();
    }

    logout() {
        this.loginService.logout();
    }

    deleteNotification(notification: Notification) {
        setTimeout(() => this.notificationsService.deleteNotification(notification), 5000);
        return true;
    }
}
```

### Template

```html title="app.component.html"
<router-outlet></router-outlet>

<button *ngIf="loginService.complete" type="button" (click)="logout()">{{ msg#app.logout | sqMessage }}</button>
<button *ngIf="!loginService.complete" type="button" (click)="login()">{{ msg#app.login | sqMessage }}</button>
<ng-container *ngIf="notificationsService.notificationsStream | async as notification">
    <div *ngIf="deleteNotification(notification)" class="notification position-fixed" style="bottom: 5px; right: 5px; width: 500px">
        <div *ngIf="notification.title" class="title">
            <span>{{notification.title | sqMessage}}</span>
            <hr>
        </div>
        <div>{{notification.text | sqMessage:{values: notification.params} }}</div>
    </div>
</ng-container>
```

### Styles

```scss title="app.component.scss"
.notification {
    border: solid;
    padding: 8px;

    .title {
        font-weight: bold;
    }
}
```

## Home Component

### Controller

```ts title="home.component.ts"
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

### Template

```html title="home.component.html"
<div class="vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
    <h1 class="mb-5">Hello Search 🔍</h1>
    <div class="w-50 position-relative mb-5">
        <app-search-form></app-search-form>
    </div>
</div>
```

## Search Component

### Controller

```ts title="search.component.ts"
import { Component } from "@angular/core";
import { Action } from '@sinequa/components/action';
import { IntlService, Locale } from '@sinequa/core/intl';
import { Record } from '@sinequa/core/web-services';
import { ModalService } from '@sinequa/core/modal';
import { Preview } from '../preview';
import { SavedQueriesService } from '@sinequa/components/saved-queries';
import { SearchService } from '@sinequa/components/search';
import { UIService } from '@sinequa/components/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  languageActions: Action[];
  _showFacet: boolean = false;

  constructor(
    public intlService: IntlService,
    public modalService: ModalService,
    public savedQueriesService: SavedQueriesService,
    public searchService: SearchService,
    public ui: UIService) {

    // Create one action (button) for each language
    this.languageActions = this.intlService.locales.map(locale =>
      new Action({
        text: locale.display,   // "French"
        data: locale,   // French locale
        selected: locale == this.intlService.currentLocale, // Whether French is the current locale
        action: (item: Action, $event: UIEvent) => {    // On click, switch to this language
          this.intlService.use((item.data as Locale).name).subscribe(
            (value) => this.languageActions.forEach(a => a.update()));
        },
        updater: (action) => {  // Update the status of buttons
          action.selected = action.data === this.intlService.currentLocale;
        }
      })
    );

  }

  openDocument(record: Record){
    this.modalService.open(Preview, {model: record, fullscreen: true});
    return false;
  }

  get showFacet(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('lg') || this._showFacet;
  }

}
```

### Template

```html title="search.component.html"
<div class="search container">
    <div class="row">

        <!-- Navbar -->
        <nav class="navbar col-12 d-flex px-2 px-sm-0">
            <a [routerLink]="['/home']" *ngIf="ui.screenSizeIsGreater('xs') || !showFacet">
                <h1>🔍<span *ngIf="ui.screenSizeIsGreaterOrEqual('lg')"> Hello Search</span></h1>
            </a>
            <app-search-form class="flex-grow-1 position-relative mx-sm-3" style="min-height: 41px;"
                *ngIf="ui.screenSizeIsGreater('xs') || showFacet"></app-search-form>
            <button class="btn btn-light ml-auto" (click)="_showFacet = !_showFacet" *ngIf="ui.screenSizeIsLess('lg')">
                <i class="fas fa-filter"></i>
            </button>
            <ul class="navbar-nav navbar-right" *ngIf="ui.screenSizeIsGreater('xs') || !showFacet">
                <sq-saved-queries-menu [autoAdjustBreakpoint]="'lg'"
                    [collapseBreakpoint]="'xs'"></sq-saved-queries-menu>
            </ul>
        </nav>

        <ng-container *ngIf="searchService.resultsStream | async as results">

            <!-- Results -->
            <div class="col-lg-8" *ngIf="ui.screenSizeIsGreaterOrEqual('lg') || !_showFacet">
                <sq-tabs [results]="results"></sq-tabs>
                <sq-loading-bar></sq-loading-bar>
                <div *ngFor="let record of results.records" class="record">
                    <a href="#" (click)="openDocument(record)">
                        <h3 [innerHtml]="record.displayTitle || record.title"></h3>
                    </a>
                    <a href="{{record.url1}}">
                        <div class="source">{{record.url1}}</div>
                    </a>
                    <p *ngIf="record.relevantExtracts" [innerHTML]="record.relevantExtracts"></p>
                </div>
                <sq-pager [results]="results"></sq-pager>
            </div>

            <!-- Facets -->
            <div class="col-lg-4" *ngIf="showFacet">
                <sq-facet-card [title]="'msg#facet.treepath.title'" [icon]="'fas fa-sitemap'">
                    <sq-facet-list #facet [results]="results" [aggregation]="'Treepath'"></sq-facet-list>
                </sq-facet-card>

                <sq-facet-card [title]="'msg#facet.company.title'" [icon]="'fas fa-building'">
                    <sq-facet-list #facet [results]="results" [aggregation]="'Company'" [allowExclude]="false"
                        [allowAnd]="false"></sq-facet-list>
                </sq-facet-card>

                <sq-facet-card [title]="'msg#savedQueries.savedQueries'" [icon]="'fas fa-save'">
                    <sq-facet-saved-queries #facet [maxQueries]="5"></sq-facet-saved-queries>
                </sq-facet-card>
            </div>

            <!-- Footer -->
            <div class="col-12">
                <hr>
                <span [sq-action-buttons]="{items: languageActions}"></span>
                <button class="btn btn-success" (click)="savedQueriesService.createSavedQueryModal()">
                    <i class="fas fa-save"></i>
                </button>
            </div>
        </ng-container>
    </div>
</div>
```

### Styles

```scss title="search.component.scss"
.search {
    h1 {
        margin-bottom: 0.25em;
    }

    .record {

        h3 {
            margin: 0.5em 0 0 0;
            font-weight: normal;
            font-size: 1.25em;
        }

        .source {
            color: #006621;
            font-size: 0.875em;
            margin: 0.25em 0;
        }

        p {
            color: #676767;
            margin-top: 0;
            font-size: 0.875em;
        }
    }
}

sq-facet-card {
    display: block;
    margin-bottom: 1em;
}
```

## Autocomplete component

### Controller

```ts title="autocomplete.ts"

import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { ReplaySubject, debounceTime, switchMap, filter, Observable } from "rxjs";
import { AutocompleteItem, SuggestService } from "@sinequa/components/autocomplete";
import { SearchService } from "@sinequa/components/search";

@Component({
    selector: "autocomplete",
    template: `
<div class="list-group list-group-flush" *ngIf="items$ | async; let items">
    <a role="button" *ngFor="let item of items" class="list-group-item list-group-item-action" (click)="search(item.display)">
        {{item.display}}
    </a>
</div>
    `,
    styles: [`
.list-group-flush > .list-group-item:last-child {
  border-end-start-radius: 20px;
  border-end-end-radius: 20px;
}
    `]
})
export class Autocomplete implements OnChanges, OnInit {

    @Input() queryText: string;

    inputChange$ = new ReplaySubject(1);
    items$: Observable<AutocompleteItem[] | undefined>;

    constructor(private suggestService: SuggestService,
        private searchService: SearchService) {
    }

    ngOnInit() {
        this.items$ = this.inputChange$
            .pipe(
                filter(text => !!text), // prevents searching if there is no query text
                debounceTime(200), // add a slight wait before retrieving the suggestions to avoid making calls at each change
                switchMap(text => this.suggestService.get(undefined, text as string)) // retrieve the suggestions
            );
    }

    ngOnChanges() {
        this.inputChange$.next(this.queryText);
    }

    search(value: string) {
        this.searchService.query.text = value;
        this.searchService.searchText("/search");
    }
}
```

## Search form component

### Controller

```ts title="search-form.component.ts"
import { Component } from '@angular/core';
import { SearchService } from '@sinequa/components/search';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class AppSearchFormComponent {

  constructor(public searchService: SearchService) { }

}
```

### Template

```html title="search-form.component.html"

<sq-search-form [query]="searchService.query">
    <ng-template let-query>
        <autocomplete [queryText]="query.text"></autocomplete>
    </ng-template>
</sq-search-form>
```

## Preview

### Controller

```ts title="preview.ts"

import { Component, Inject } from "@angular/core";
import { Record } from '@sinequa/core/web-services';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { SearchService } from "@sinequa/components/search";
import { PreviewHighlightColors } from "@sinequa/components/preview";

@Component({
    selector: "preview",
    template: `
<sq-modal [title]="record.title" [showFooter]="false">
    <sq-preview #facet
        class="h-100"
        [highlightColors]="highlights"
        [id]="record.id"
        [query]="searchService.query">
    </sq-preview>
</sq-modal>
    `
})
export class Preview {

    highlights: PreviewHighlightColors[] = [
        {
            name: 'company',
            color: 'white',
            bgColor: '#FF7675'
        },
        {
            name: 'geo',
            color: 'white',
            bgColor: '#74B9FF'
        },
        {
            name: 'person',
            color: 'white',
            bgColor: '#00ABB5'
        },
        {
            name: 'extractslocations',
            color: 'black',
            bgColor: '#fffacd'
        },
        {
            name: 'matchlocations',
            color: 'black',
            bgColor: '#ff0'
        }
    ];

    constructor(
        @Inject(MODAL_MODEL) public record: Record,
        public searchService: SearchService) {
    }
}
```

## Global styles

### App

```scss title="app.scss"
@import "~@angular/cdk/overlay-prebuilt";

// Overriding Bootstrap variables
$grid-breakpoints: (
        xs: 0,
        sm: 600px,
        lg: 1000px
);

$container-max-widths: (
        sm: 800px,
        lg: 1200px
);

// Bootstrap styles
@import "~bootstrap/scss/bootstrap";

/*** Fontawesome ***/
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/brands";
@import "~@fortawesome/fontawesome-free/scss/regular";
@import "~@fortawesome/fontawesome-free/scss/solid";

@import "../../../components/action/bootstrap/action.scss";

body {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

a {
    text-decoration: none;
    color: #3434d6;
}

.record .match-highlight {
    font-weight: bold;
    font-style: italic;
}
```

## Locales

### English

```ts title="en.ts"
import {LocaleData} from "@sinequa/core/intl";
import {enCore} from "@sinequa/core/messages";
import "intl/locale-data/jsonp/en-US"; // Safari
import {Utils} from "@sinequa/core/base";

import {enFacet} from "@sinequa/components/facet";
import {enResult} from "@sinequa/components/result";
import {enSearch} from "@sinequa/components/search";
import {enSearchForm} from "@sinequa/components/search-form";
import {enSavedQueries} from "@sinequa/components/saved-queries";

const d3Format = require('d3-format/locale/en-US');
const d3Time = require('d3-time-format/locale/en-US');

const appMessages = {

    locale: {
        en: "English",
        fr: "Français"
    },

    app: {
        login: "Login",
        logout: "Logout",
    },

    search: {
        button: "Search",
        placeholder: "Enter search terms...",
        clear: "Clear"
    },

    facet: {
        loadMore: "Gimme more data, please!"
    },

    results: {
        resultsAllTab: "All",
        tabPeople: "People",
        tabBusiness: "Companies",
        tabLocation: "Places"
    },
}

export default <LocaleData> {
    intl: {
        locale: "en-US"
    },
    d3: {
        locale: "en-US",
        format: d3Format,
        time: d3Time
    },
    messages: Utils.merge({}, enCore, enFacet, enResult, enSearch, enSearchForm, enSavedQueries, appMessages)
};
```

### French

```ts title="fr.ts"
import {LocaleData} from "@sinequa/core/intl";
import {frCore} from "@sinequa/core/messages";
import "intl/locale-data/jsonp/fr-FR"; // Safari
import {Utils} from "@sinequa/core/base";

import {frFacet} from "@sinequa/components/facet";
import {frResult} from "@sinequa/components/result";
import {frSearch} from "@sinequa/components/search";
import {frSearchForm} from "@sinequa/components/search-form";
import {frSavedQueries} from "@sinequa/components/saved-queries";

const d3Format = require('d3-format/locale/fr-FR');
const d3Time = require('d3-time-format/locale/fr-FR');

const appMessages = {

    locale: {
        en: "English",
        fr: "Français",
    },

    app: {
        login: "Login",
        logout: "Logout",
    },

    search: {
        button: "Chercher",
        placeholder: "Termes de recherche...",
        clear: "Effacer"
    },

    results: {
        resultsAllTab: "Tous",
        tabPeople: "Personnes",
        tabBusiness: "Entreprises",
        tabLocation: "Lieux"
    },
}

export default <LocaleData> {
    intl: {
        locale: "fr-FR"
    },
    d3: {
        locale: "fr-FR",
        format: d3Format,
        time: d3Time
    },
    messages: Utils.merge({}, frCore, frFacet, frResult, frSearch, frSearchForm, frSavedQueries, appMessages)
};
```
