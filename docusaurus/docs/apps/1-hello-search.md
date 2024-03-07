---
layout: default
title: Hello Search
parent: Applications
nav_order: 1
---

# Hello Search

*Hello Search* is the simplest kind of Search-Based Application you can build with the SBA Framework. It is made of a single module and a single Angular component, which shows a search form and a list of results:

![Hello Search](/assets/tutorial/hello-search.png)

## App module

Hello Search has one Angular module (`AppModule`) in [`src/app/app.module.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.module.ts). It looks very much like the default `app.module.ts` you would get from creating a new Angular app with `ng new`, with some specific points:

- We import required modules from [`@sinequa/core`](/docs/libraries/core/core.md) and pass them configuration via their `forRoot()` methods.
- In particular we must pass the `StartConfig` object to the `WebServicesModule`. This object contains the **URL of the sinequa server** (which can be omitted when the app is hosted on the server) and the **name of the App** configured in the Sinequa administration.
- We use `{provide: LocationStrategy, useClass: HashLocationStrategy},` to manage routes (which is not specific to Hello Search).

## App component

Hello Search has one Angular component (`AppComponent`). It is made of:

- A template: [`src/app/app.component.html`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.component.html)
- A controller: [`src/app/app.component.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.component.ts)
- A stylesheet: [`src/app/app.component.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.component.scss)

### Template

The template ([`src/app/app.component.html`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.component.html)) is divided in four parts:

**Search Form**:

The search form has a search field `<input>`, and two buttons ("Search" and "Clear"). When submitting the form, the `search()` method from the controller is called. Note that the form is deactivated if the user is not logged in.

```html
<form novalidate [formGroup]="form">
    <input type="text" placeholder="Enter search terms..." formControlName="search" spellcheck="false" autocomplete="off" [attr.disabled]="!loginService.complete? '' : null">
    <button type="submit" (click)="search()" [attr.disabled]="!loginService.complete? '' : null">Search</button>
    <button *ngIf="results$ | async" type="button" (click)="clear()">Clear</button>
</form>
```

**Results**:

The results list displays the list of `Record` objects from a `Results` object provided by the controller. The first `*ngIf` and `| async` allow to display the results only when they become available (it is *asynchronous*, since the server cannot respond instantaneously). Then, the `*ngFor` iterates through the list of results. Inside this `<div>`, we then display the title, source and relevant extracts of each document.

```html
<div *ngIf="results$ | async; let results">
    <hr>
    <div *ngFor="let record of results.records" class="record">
        <a href="{{record.url1}}">
            <h3 [innerHtml]="record.displayTitle || record.title"></h3>
        </a>
        <div class="source">{{record.url1}}</div>
        <p *ngIf="record.relevantExtracts" [innerHTML]="record.relevantExtracts"></p>
    </div>
</div>
```

**Login/Logout buttons**:

These buttons call the `login()` and `logout()` methods of the controller.

```html
<button *ngIf="loginService.complete" type="button" (click)="logout()">Logout</button>
<button *ngIf="!loginService.complete" type="button" (click)="login()">Login</button>
```

**Notifications**:

Notifications are typically some error messages coming from the Sinequa services and managed by the `NotificationModule` from [`@sinequa/core`](/docs/libraries/core/core.md). If you fail to log in or to get data from the Sinequa indexes, you will likely see a message displayed at the bottom of the app.

```html
<ng-container *ngIf="notificationsService.notificationsStream | async as notification">
    <hr>
    <div *ngIf="deleteNotification(notification)" class="notification">
        <div *ngIf="notification.title" class="title">
            <span>{{notification.title | sqMessage}}</span>
            <hr>
        </div>
        <div>{{notification.text | sqMessage:{values: notification.params} }}</div>
    </div>
</ng-container>
```

### Controller

The controller ([`src/app/app.component.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.component.ts)) consists of the class `AppComponent`, which is made of the main following parts:

**Fields**:

The `AppComponent` class has the following fields:
- `searchControl`: An Angular [`UntypedFormControl`](https://angular.io/api/forms/UntypedFormControl) object used to handle the search input value.
- `form`: An Angular [`UntypedFormGroup`](https://angular.io/api/forms/UntypedFormGroup) object needed to interact with the content of a `<form>`.
- `results$`: An [rxjs Observable](https://angular.io/guide/observables) of `Results` (since results are retrieved asynchronously) which can also be undefined.

```ts
searchControl: UntypedFormControl;
form: UntypedFormGroup;
results$: Observable<Results> | undefined;
```

**Constructor**:

In the constructor, we inject the following services from [`@sinequa/core`](/docs/libraries/core/core.md) (and initialize our `form`):
- `LoginService`: Service in charge of authentication and initialization of other services.
- `AppService`: Service in charge of retrieving the configuration of your application from the Sinequa server.
- `QueryWebService`: Service in charge of sending *queries* and retrieving *results* from the Sinequa server.
- `NotificationsService`: Service in charge of centralizing errors and warnings from other services.

```ts
constructor(
    protected formBuilder: FormBuilder,
    public loginService: LoginService,
    public appService: AppService,
    public queryWebService: QueryWebService,
    public notificationsService: NotificationsService) {

    this.searchControl = new UntypedFormControl("");
    this.form = this.formBuilder.group({
        search: this.searchControl
    });
}
```

**Search method**:

The `search()` method is called when the user clicks on the "search" button. It performs the following tasks:
- Create a new `Query` object (with the right name, retrieved from the app configuration.
- Set the `query.text` to the value typed by the user in the search form (`this.searchControl.value`).
- Send the query to the `QueryWebService` and get the results observable (`results$`). When results are available (asynchronously), the template will display them.

```ts
search() {
    const ccquery = this.appService.ccquery;
    const query = new Query(ccquery ? ccquery.name : "_unknown");
    query.text = this.searchControl.value || "";
    this.results$ = this.queryWebService.getResults(query);
}
```

**Login and Logout method**:

The `login()` and `logout()` methods are essentially proxies to the corresponding methods in the `LoginService` which manages the authentication. Note that the `LoginService` also takes care of retrieving data from the server via three services:

- The `AppWebService`, which retrieves the configuration of the applications.
- The `PrincipalWebService`, which retrieves the user data from its domain (it includes the name, email, id, and other data).
- The `UserSettingsWebService`, which retrieves the *User Settings* (more information in the [Tutorial](/docs/tutorial/user-settings.md) and the [Tips & Tricks](/docs/tipstricks/user-settings.md))

Additionally, we clear the results on log out, by removing the `results$` and emptying the search form.

```ts
clear() {
    this.results$ = undefined;
    this.searchControl.setValue("");
}

login() {
    this.loginService.login();
}

logout() {
    this.clear();
    this.loginService.logout();
}
```

### Stylesheet

The component's stylesheet ([`src/app/app.component.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.component.scss)) contains CSS rules applied only within the component. In particular:

- Page layout rules, making our search results more readable:

    ```scss
    .search {
        max-width: 800px;
        margin-left: 100px;
    }
    ```

- Text sizing, coloring and spacing for the title (`h1`), document title (`h3`), document source (`.source`) and relevant extracts (`p`).

- Styling of the *notifications*:

    ```scss
    .notification {
        border: solid;
        padding: 8px;

        .title {
            font-weight: bold;
        }
    }
    ```

In addition to the component's stylesheet, a global stylesheet ([`src/styles/app.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/styles/app.scss)) contains styles that apply to the whole app. This is where you would import (globally) third party styling libraries such as Bootstrap (see the [tutorial](/docs/tutorial/search-module#importing-bootstrap)).

```scss
@import "~@angular/cdk/overlay-prebuilt";

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
