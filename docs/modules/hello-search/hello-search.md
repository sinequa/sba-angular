---
layout: default
title: Hello Search
parent: Modules
nav_order: 4
---

# Hello Search

*Hello Search* is the simplest kind of Search-Based Application you can build with the SBA Framework. It is made of a single module and a single Angular component, which shows a search form and a list of results:

![Hello Search]({{site.baseurl}}assets/tutorial/hello-search.png)

## App module

Hello Search has one Angular module (`AppModule`) in [`src/app/app.module.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.module.ts). It looks very much like the default `app.module.ts` you would get from creating a new Angular app with `ng new`, with some specific points:

- We import required modules from [`@sinequa/core`]({{site.baseurl}}core) and pass them configuration via their `forRoot()` methods.
- In particular we must pass the [`StartConfig`]({{site.baseurl}}core/interfaces/StartConfig.html) object to the [`WebServicesModule`]({{site.baseurl}}core/modules/WebServicesModule.html). This object contains the **URL of the sinequa server** (which can be omitted when the app is hosted on the server) and the **name of the App** configured in the Sinequa administration.
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

The results list displays the list of [`Record`]({{site.baseurl}}core/interfaces/Record.html) objects from a [`Results`]({{site.baseurl}}core/interfaces/Results.html) object provided by the controller. The first `*ngIf` and `| async` allow to display the results only when they become available (it is *asynchronous*, since the server cannot respond instantaneously). Then, the `*ngFor` iterates through the list of results. Inside this `<div>`, when then display the title, source and relevant extracts of each document.

```html
{% raw %}<div *ngIf="results$ | async; let results">
    <hr>    
    <div *ngFor="let record of results.records" class="record">
        <a href="{{record.url1}}">
            <h3 [innerHtml]="record.displayTitle || record.title"></h3>
        </a>
        <div class="source">{{record.url1}}</div>
        <p *ngIf="record.relevantExtracts" [innerHTML]="record.relevantExtracts"></p>       
    </div>
</div>{% endraw %}
```

**Login/Logout buttons**:

These buttons call the `login()` and `logout()` methods of the controller.

```html
<button *ngIf="loginService.complete" type="button" (click)="logout()">Logout</button>
<button *ngIf="!loginService.complete" type="button" (click)="login()">Login</button>
```

**Notifications**:

Notifications are typically some error messages coming from the Sinequa services and managed by the [`NotificationModule`]({{site.baseurl}}core/modules/NotificationModule.html) from [`@sinequa/core`]({{site.baseurl}}core). If you fail to log in or to get data from the Sinequa indexes, you will likely see a message displayed at the bottom of the app.

```html
{% raw %}<ng-container *ngIf="notificationsService.notificationsStream | async as notification">
    <hr>
    <div *ngIf="deleteNotification(notification)" class="notification">
        <div *ngIf="notification.title" class="title">
            <span>{{notification.title | sqMessage}}</span>
            <hr>
        </div>
        <div>{{notification.text | sqMessage:{values: notification.params} }}</div>
    </div>
</ng-container>{% endraw %}
```

### Controller

The controller ([`src/app/app.component.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/app/app.component.ts)) consists of the class `AppComponent`, which is made of the main following parts:

**Fields**:

The `AppComponent` class has the following fields:
- `form`: An Angular [`FormGroup`](https://angular.io/api/forms/FormGroup) object needed to interact with the content of a `<form>`.
- `results$`: An [rxjs Observable](https://angular.io/guide/observables) of [`Results`]({{site.baseurl}}core/interfaces/Results.html) (since results are retrieved asynchronously).

```ts
form: FormGroup;
results$: Observable<Results>;
```

**Constructor**:

In the constructor, we inject the following services from [`@sinequa/core`]({{site.baseurl}}core) (and initialize our `form`):
- [`LoginService`]({{site.baseurl}}core/injectables/LoginService.html): Service in charge of authentication and initialization of other services.
- [`AppService`]({{site.baseurl}}core/injectables/AppService.html): Service in charge of retrieving the configuration of your application from the Sinequa server.
- [`QueryWebService`]({{site.baseurl}}core/injectables/QueryWebService.html): Service in charge of sending *queries* and retrieving *results* from the Sinequa server.
- [`NotificationsService`]({{site.baseurl}}core/injectables/NotificationsService.html): Service in charge of centralizing errors and warnings from other services.

```ts
constructor(
    protected formBuilder: FormBuilder,
    public loginService: LoginService,
    public appService: AppService,
    public queryWebService: QueryWebService,
    public notificationsService: NotificationsService) {
        
    this.form = this.formBuilder.group({
        "search": []
    });
}
```

**Search method**:

The `search()` method is called when the user clicks on the "search" button. It performs the following tasks:
- Create a new [`Query`]({{site.baseurl}}core/classes/Query.html) object (with the right name, retrieved from the app configuration.
- Set the `query.text` to the value typed by the user in the search form (`this.form.get("search").value`).
- Send the query to the [`QueryWebService`]({{site.baseurl}}core/injectables/QueryWebService.html) and get the results observable (`results$`). When results are available (asynchronously), the template will display them.

```ts
search() {
    let ccquery = this.appService.ccquery;
    let query = new Query(ccquery ? ccquery.name : "_unknown");
    query.text = this.form.get("search").value || "";
    this.results$ = this.queryWebService.getResults(query);
}
```

**Login and Logout method**:

The `login()` and `logout()` methods are essentially proxies to the corresponding methods in the [`LoginService`]({{site.baseurl}}core/injectables/LoginService.html) which manages the authentication. Note that the [`LoginService`]({{site.baseurl}}core/injectables/LoginService.html) also takes care of retrieving data from the server via three services:

- The [`AppWebService`]({{site.baseurl}}core/injectables/AppWebService.html), which retrieves the configuration of the applications.
- The [`PrincipalWebService`]({{site.baseurl}}core/injectables/PrincipalWebService.html), which retrieves the user data from its domain (it includes the name, email, id, and other data).
- The [`UserSettingsWebService`]({{site.baseurl}}core/injectables/UserSettingsWebService.html), which retrieves the *User Settings* (more information in the [Tutorial]({{site.baseurl}}tutorial/user-settings.html) and the [Tips & Tricks]({{site.baseurl}}tipstricks/user-settings.html))

Additionally, we clear the results on log out, by removing the `results$` and emptying the search form.

```ts
login() {
    this.loginService.login();
}

logout() {
    this.clear();
    this.loginService.logout();
}

clear() {
    this.results$ = null;
    this.form.get("search").setValue("");
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

In addition to the component's stylesheet, a global stylesheet ([`src/styles/app.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/hello-search/src/styles/app.scss)) contains styles that apply to the whole app. This is where you would import (globally) third party styling libraries such as Bootstrap (see the [tutorial]({{site.baseurl}}tutorial/search-module#importing-bootstrap)).

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
