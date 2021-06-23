---
layout: default
title: Completed Application
parent: Tutorial
nav_order: 11
---

# Completed application
{: .no_toc }

Here is for reference, the source code of the application, at the end of the tutorial (empty files are ignored).

1. TOC
{:toc}

## App module `src/app/app.module.ts`

```ts
{% raw %}import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable, from } from 'rxjs';

import { WebServicesModule, StartConfig } from "@sinequa/core/web-services";
import { LoginModule, LoginInterceptor } from "@sinequa/core/login";
import { IntlModule, LocaleData, LocalesConfig, Locale } from "@sinequa/core/intl";
import { ModalModule } from "@sinequa/core/modal";
import { NotificationsInterceptor } from "@sinequa/core/notification";
import { AuditInterceptor } from "@sinequa/core/app-utils";

import { BsSearchModule } from '@sinequa/components/search';
import { BsFacetModule } from '@sinequa/components/facet';
import { BsActionModule} from '@sinequa/components/action';
import { BsAutocompleteModule } from '@sinequa/components/autocomplete';
import { BsPreviewModule } from '@sinequa/components/preview';
import { BsModalModule } from '@sinequa/components/modal';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { Preview } from './preview';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SCREEN_SIZE_RULES } from '@sinequa/components/utils';

// Sinequa Core config
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
        return from(import('../locales/'+locale).then(m => m.default));
    }
}

// Screen size breakpoints (consistent with Bootstrap custom breakpoints in app.scss)
export const breakpoints = {
    lg: "(min-width: 1000px)",
    sm: "(min-width: 600px) and (max-width: 999px)",
    xs: "(max-width: 599px)",
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: "home", component: HomeComponent},
            {path: "search", component: SearchComponent},
            {path: "**", redirectTo: "home"}
        ]),
        FormsModule,
        ReactiveFormsModule,
        
        WebServicesModule.forRoot(startConfig),
        IntlModule.forRoot(AppLocalesConfig),
        LoginModule.forRoot(), // Just use default login modal
        ModalModule.forRoot(),

        BsSearchModule.forRoot({routes: ['search']}),
        BsFacetModule,
        BsActionModule,
        BsAutocompleteModule,
        BsPreviewModule,
        BsModalModule,
        BsSavedQueriesModule
    ],
    declarations: [
        AppComponent,
        Preview,
        HomeComponent,
        SearchComponent,
        SearchFormComponent
    ],
    entryComponents: [
        Preview
    ],
    providers: [
        // Provides an APP_INITIALIZER which will fetch application configuration information from the Sinequa
        // server automatically at startup using the application name specified in the URL (app[-debug]/<app-name>).
        // This allows an application to avoid hard-coding parameters in the StartConfig but requires that the application
        // be served from the an app[-debug]/<app name> URL.
        // {provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true},

        // Provides the Angular LocationStrategy to be used for reading route state from the browser's URL. Currently
        // only the HashLocationStrategy is supported by Sinequa.
        {provide: LocationStrategy, useClass: HashLocationStrategy},

        // Provides an HttpInterceptor to handle user login. The LoginInterceptor handles HTTP 401 responses
        // to Sinequa web service requests and initiates the login process.
        {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true},

        // Provides an HttpInterceptor that offers a centralized location through which all client-side
        // audit records pass. An application can replace AuditInterceptor with a subclass that overrides
        // the updateAuditRecord method to add custom audit information to the records.
        {provide: HTTP_INTERCEPTORS, useClass: AuditInterceptor, multi: true},

        // Provides an HttpInterceptor that automatically processes any notifications specified in the $notifications
        // member of the response body to any Sinequa web service requests.
        {provide: HTTP_INTERCEPTORS, useClass: NotificationsInterceptor, multi: true},

        {provide: SCREEN_SIZE_RULES, useValue: breakpoints}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}{% endraw %}
```

## App Component

### Controller `src/app/app.component.ts`

```ts
{% raw %}import {Component, AfterViewInit} from "@angular/core";
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
}{% endraw %}
```

### Template `src/app/app.component.html`

```html
{% raw %}<router-outlet></router-outlet>
<ng-container *ngIf="notificationsService.notificationsStream | async as notification">
    <div *ngIf="deleteNotification(notification)" class="notification position-fixed" style="bottom: 5px; right: 5px; width: 500px">
        <div *ngIf="notification.title" class="title">
            <span>{{notification.title | sqMessage}}</span>
            <hr>
        </div>
        <div>{{notification.text | sqMessage:{values: notification.params} }}</div>
    </div>
</ng-container>{% endraw %}
```

### Styles `src/app/app.component.scss`

```scss
{% raw %}.notification {
    border: solid;
    padding: 8px;

    .title {
        font-weight: bold;
    }
}{% endraw %}
```

## Home Component

### Controller `src/app/home/home.component.ts`

```ts
{% raw %}import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}{% endraw %}
```

### Template `src/app/home/home.component.html`

```html
{% raw %}<div class="vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
    <h1 class="mb-5">Hello Search 🔍</h1>
    <app-search-form style="width: 500px;"></app-search-form>
</div>{% endraw %}
```

## Search Component

### Controller `src/app/search/search.component.ts`

```ts
{% raw %}import { Component } from "@angular/core";
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
          action.selected = action.data == this.intlService.currentLocale; 
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

}{% endraw %}
```

### Template `src/app/search/search.component.html`

```html
{% raw %}<div class="search container">
    <div class="row">

        <!-- Navbar -->
        <nav class="navbar navbar-expand col-12 d-flex">
            <a [routerLink]="['/home']" class="text-decoration-none" *ngIf="ui.screenSizeIsGreater('xs') || !showFacet">
                <h1>🔍<span *ngIf="ui.screenSizeIsGreaterOrEqual('lg')"> Hello Search</span></h1>
            </a>
            <app-search-form class="flex-grow-1 mx-sm-3" *ngIf="ui.screenSizeIsGreater('xs') || showFacet"></app-search-form>
            <button class="btn btn-light ml-auto" (click)="_showFacet = !_showFacet" *ngIf="ui.screenSizeIsLess('lg')">
                <i class="fas fa-filter"></i>
            </button>
            <ul class="navbar-nav navbar-right" *ngIf="ui.screenSizeIsGreater('xs') || !showFacet">
                <sq-saved-queries-menu [autoAdjustBreakpoint]="'lg'" [collapseBreakpoint]="'xs'"></sq-saved-queries-menu>
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
                    <sq-facet-tree #facet [results]="results" [aggregation]="'Treepath'"></sq-facet-tree>
                </sq-facet-card>
                
                <sq-facet-card [title]="'msg#facet.company.title'" [icon]="'fas fa-building'">
                    <sq-facet-list #facet [results]="results" [aggregation]="'Company'" [allowExclude]="false" [allowAnd]="false"></sq-facet-list>
                </sq-facet-card>
        
                <sq-facet-card [title]="'msg#savedQueries.savedQueries'" [icon]="'fas fa-save'">
                    <sq-facet-saved-queries #facet [maxQueries]="5" [searchRoute]=""></sq-facet-saved-queries>
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
</div>{% endraw %}
```

### Styles `src/app/search/search.component.scss`

```scss
{% raw %}.record {

    h3 {
        margin: 0.5em 0 0 0;
        font-weight: normal;
        font-size: 1.25em;
    }

    .source {
        color: #006621;
        font-size: 0.9em;
        margin: 0.25em 0;
    }
    
    p {
        color: #676767;
        margin-top: 0;
        font-size: 0.9em;
    }
}

sq-facet-card {
    display: block;
    margin-bottom: 1em;
}{% endraw %}
```

## Search form component

### Controller `src/app/search-form/search-form.component.ts`

```ts
{% raw %}import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AppService } from '@sinequa/core/app-utils';
import { SearchService } from '@sinequa/components/search';
import { LoginService } from '@sinequa/core/login';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  searchControl: FormControl;
  form: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    public loginService: LoginService,
    public appService: AppService,
    public searchService: SearchService) {
    
    this.searchControl = new FormControl();
    this.form = this.formBuilder.group({
        search: this.searchControl
    });

    this.searchService.queryStream.subscribe({
        next: (query) => {
            this.searchControl.setValue((query && query.text) || '');
        }
    });

  }

  search() {
    this.searchService.clearQuery();
    this.searchService.query.text = this.searchControl.value || '';
    this.searchService.searchText("/search");
  }

  clear() {
      this.searchService.clear();
      this.searchControl.setValue("");
  }

}{% endraw %}
```

### Template `src/app/search-form/search-form.component.html`

```ts
{% raw %}<form novalidate [formGroup]="form">
    <div class="d-flex flex-column flex-grow-1 position-relative">
        <div class="input-group">
            <input type="text" placeholder="{{ 'msg#search.placeholder' | sqMessage }}" formControlName="search"
                class="form-control"
                sqAutocomplete
                [dropdown]="dropdown" 
                [off]="!loginService.complete || !appService.suggestQueries"
                [suggestQuery]="appService.suggestQueries? appService.suggestQueries[0] : null"
                (submit)="search()">

            <div class="input-group-append">
                <button class="btn btn-primary" type="submit" (click)="search()" [attr.disabled]="!loginService.complete? '' : null">{{ 'msg#search.button' | sqMessage }}</button>
                <button class="btn btn-light" *ngIf="searchService.resultsStream | async" type="button" (click)="clear()">{{ 'msg#search.clear' | sqMessage }}</button>
            </div>
        </div>
        
        <sq-autocomplete-list #dropdown>
            <ng-template #itemTpl let-item>
                <div class="py-2" style="padding-left:0.75rem;">{{item.display}}
                    <small *ngIf="item.category" class="ml-2 text-muted">{{(item.label || item.category) | sqMessage}}</small>
                </div>
            </ng-template>    
        </sq-autocomplete-list>
    </div>
</form>{% endraw %}
```

## Preview

### Controller `src/preview.ts`

```
import { Component, Inject } from "@angular/core";
import { Record } from '@sinequa/core/web-services';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';

@Component({
    selector: "preview",
    template: `
<sq-modal [title]="record.title" [showFooter]="false">
    <sq-preview-document-iframe [downloadUrl]="url"></sq-preview-document-iframe>
</sq-modal>
    `
})
export class Preview {

    url?: string; // URL of the HTML preview
    
    constructor(
        @Inject(MODAL_MODEL) public record: Record,
        previewService: PreviewService,
        searchService: SearchService){
        
        previewService.getPreviewData(record.id, searchService.query).subscribe({
            next: (data) => {
                this.url = previewService.makeDownloadUrl(data.documentCachedContentUrl);
            }
        });
    }

}
```

## Global styles

### App `src/styles/app.scss`

```scss
{% raw %}@import "~@angular/cdk/overlay-prebuilt";

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

// Align dropdown to the right side
.navbar-right {
    .dropdown-menu {
        right: 0;
        left: auto; // Reset the default from `.dropdown-menu`
    }
}{% endraw %}
```

### Preview `src/styles/preview.scss`

```ts
{% raw %}span.extractslocations {
    background-color: #ecdcdc
}

span.matchlocations {
    background-color: #e9cdcd
}

span.company {
    background-color: #c0e1ee
}

span.geo {
    background-color: #bef0e5
}

span.person {
    background-color: #ddecb8
}{% endraw %}
```

## Locales

### English `src/locales/en.ts`

```ts
{% raw %}import {LocaleData} from "@sinequa/core/intl";
import d3Format from "d3-format/locale/en-US.json";
import d3Time from "d3-time-format/locale/en-US.json";
import {enCore} from "@sinequa/core"; 
import "intl/locale-data/jsonp/en-US"; // Safari
import {Utils} from "@sinequa/core/base";

import {enFacet} from "@sinequa/components/facet";
import {enResult} from "@sinequa/components/result";
import {enSearch} from "@sinequa/components/search";
import {enSavedQueries} from "@sinequa/components/saved-queries";

let appMessages = {
    
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
    messages: Utils.merge({}, enCore, enFacet, enResult, enSearch, enSavedQueries, appMessages)
};{% endraw %}
```

### French `src/locales/fr.ts`

```ts
{% raw %}import {LocaleData} from "@sinequa/core/intl";
import d3Format from "d3-format/locale/fr-FR.json";
import d3Time from "d3-time-format/locale/fr-FR.json";
import {frCore} from "@sinequa/core"; 
import "intl/locale-data/jsonp/fr-FR"; // Safari
import {Utils} from "@sinequa/core/base";

import {frFacet} from "@sinequa/components/facet";
import {frResult} from "@sinequa/components/result";
import {frSearch} from "@sinequa/components/search";
import {frSavedQueries} from "@sinequa/components/saved-queries";

let appMessages = {
    
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
    messages: Utils.merge({}, frCore, frFacet, frResult, frSearch, frSavedQueries, appMessages)
};{% endraw %}
```
