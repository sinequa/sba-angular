---
layout: default
title: Application Startup
parent: Tips and Tricks
sidebar_position: 16
---

# Application Startup

This article describes all the steps taking place during the startup of an SBA. This process can be summarized in the following diagram:

![Application startup](/assets/tipstricks/app-startup.png)

## Angular Startup

The very first HTTP request is the one that downloads your application's `index.html`. This file is very short, because the content of the application is downloaded separately. The HTML essentially contains references to your application's scripts and styles, and the body only contains some placeholder elements displayed prior to your scripts execution. The `<app>` element is where Angular is going to build the application.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Vanilla Search</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <link rel="icon" type="image/x-icon" href="assets/vanilla-favicon.png">
        <link rel="stylesheet" href="app.e7f07e699a63ac84627f.css">
    </head>
    <body>
        <app>
            <div class="h-100 d-flex flex-column justify-content-center align-items-center">
                <img id="sinequa-logo" class="mb-3" src="assets/sinequa-logo-light-lg.png" width="180px">
                <img src="assets/loading.gif">
            </div>
        </app>
        <script src="runtime-es2015.c4eb816dab7c85f6f92f.js" type="module"></script>
        <script src="polyfills-es2015.664a2443c66af66d5b66.js" type="module"></script>
        <script src="main-es2015.06f35789ec82dfebff6b.js" type="module"></script>
    </body>
</html>
```

Your Angular code and libraries are all bundled into one `main` file. When the browser finishes downloading it, it is executed. The first step corresponds to the `main.ts` file in your app's source code, which contains the following line:

```ts
platformBrowserDynamic().bootstrapModule(AppModule, {preserveWhitespaces: true})
```

Here, we tell Angular to load the `AppModule` (defined in the `app/app.module.ts` file). The `AppModule` is the root module of your application. It is very central in any Angular project, as it is where you define your routes, components, dependencies and a few other things.

## AppModule Breakdown

In Sinequa application samples (like Vanilla Search), the `AppModule` is where you define and configure:

- The startup configuration (`StartConfig` object).
- The application's routes (`Routes` object from Angular).
- The "search options" of the `SearchService` (`SearchOptions` object).
- The supported languages of the applications (`LocaleConfig` object).
- The screen size breakpoints of the application.
- Optionally, the "selection options" of the `SelectionService` (`SelectionOptions` object).
- Optionally, the list of "results views" of the application (`ResultsView` objects).
- The list of Sinequa or third-party Angular **modules** used by the application.
- The list of **components** of the application (including the root component, generally called `AppComponent` and defined in the `bootstrap` list. The selector of this component must correspond to the one defined in the `index.html` mentioned above)
- The list of **providers** of the application, in particular the `HTTP_INTERCEPTORS` (which allow to perform custom actions when HTTP requests are sent by the app) and `APP_INITIALIZER` (custom actions executed during the application startup).

### Startup Configuration

The `StartConfig` object contains basic information needed by components and services in the application, like the name of App (which must be defined on the Sinequa server).

The `StartConfig` data can be populated in 2 different ways:

- Manually: the values are directly written in `app.module.ts` (and/or in `environment.ts`, if the data is environment-dependent).
- Automatically: You can activate the `StartConfigInitializer` (it is commented out by default) so that the `StartConfig` is fetched automatically from the server. This approach is convenient, but has two issues:

    1. It requires that your app is served from a URL with the pattern `/app/<app-name>` (which is the case if the app is deployed in Sinequa, but not if you are using `ng serve`).
    2. It makes an extra web service call to fetch the data from the server, which slows down the application startup.

The key properties of the `StartConfig` are the following:

- `app` (required): The name of the App defined on the Sinequa server.
- `url` (optional): Can be used to specify the URL of the Sinequa server when the app is hosted at a different address. (By default, the app's URL is used to query the web services.)
- `auditEnabled` (optional): Whether the audit is enabled in the app.
- `autoOAuthProvider` and `autoSAMLProvider`, which are necessary for some [Login Methods](login-methods.md).
- `production` (optional): A flag indicating whether the app is running in production mode or not.

### Application Routes

An Angular application can have multiple "routes". A route is a URL scheme, allowing to switch between different views and resources.

For instance, Vanilla Search has 3 routes: `/home` (displays the home page), `/search` (displays search results) and `/preview` (displays a document's preview). These 3 routes are defined as follows:

```ts
export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "search", component: SearchComponent},
    {path: "preview", component: PreviewComponent},
    {path: "**", redirectTo: "home"}
];
```

These routes must be injected in the `RouterModule` (a standard Angular module providing components and services for managing route changes).

```ts
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        ...
```

### Search Options

The `SearchOptions` object contains configuration required by Sinequa's `SearchService`. In Vanilla Search, it is configured as follows:

```ts
export const searchOptions: SearchOptions = {
    routes: ["search"],
    homeRoute: "home"
};
```

Effectively, this tells the `SearchService` that `/search` is a "search route" (where we need to monitor the URL for changes in the query, and update search results accordingly). The `homeRoute` is also needed in some case.

The `SearchOptions` also contains the following options:

- `deactivateRouting` can be used to deactivate the storage of the search query in the URL (which means the query is not persisted in case of a page refresh).
- `preventQueryNameChanges` can be used to explicitly forbid the use of a query web service different from the primary one.

These search options must be injected in the `BsSearchModule`:

```ts
@NgModule({
    imports: [
        BsSearchModule.forRoot(searchOptions),
        ...
```

### Languages

The language configuration is covered at length in the [tutorial](/tutorial/intl.md).

The language configuration must be injected in the `IntlModule`:

```ts
@NgModule({
    imports: [
        IntlModule.forRoot(AppLocalesConfig),
        ...
```

### Screen Size Breakpoints

Applications like Vanilla Search use Bootstrap for styling the app and making it work on multiple screen sizes. In addition to Bootstrap styles, the app actively monitors the screen size and adjusts its content in function of the size interval. These size intervals (which should be aligned with the Bootstrap ones) are defined as follows:

```ts
export const breakpoints = {
    xl: "(min-width: 1650px)",
    lg: "(min-width: 1400px) and (max-width: 1649.98px)",
    md: "(min-width: 992px) and (max-width: 1399.98px)",
    sm: "(min-width: 576px) and (max-width: 991.98px)",
    xs: "(max-width: 575.98px)",
};
```

(The .98 decimal values are needed to avoid overlaps of the intervals)

These breakpoints must be injected in the list of **providers** (they are used essentially by the `UIService`):

```ts
@NgModule({
    ...
    providers: [
        {provide: SCREEN_SIZE_RULES, useValue: breakpoints},
```

### Selection Options

The selection options (`SelectionOptions`) allow to customize the behavior of the `SelectionService`, which keeps track of the documents selected by the user via checkboxes (aka selectors).

The options are detailed in the [documentation](/libraries/components/selection.md) of the `SelectionModule`.

These options must be injected in the list of **providers**:

```ts
@NgModule({
    ...
    providers: [
        {provide: SELECTION_OPTIONS, useValue: mySelectionOptions},
```

### Help folder settings

The folder settings allow you to customize the help's folder to use within the application.

```ts
@NgModule()({
  ...
  providers: [
    { provide: APP_HELP_FOLDER_OPTIONS, useValue: { folder: 'vanilla-search' } },
```

* `useValue` expect an object of type`FolderOptions`
```ts
export type FolderOptions = {
  folder: string,
  path?: string,
  indexFile?: string,
  useLocale?: boolean,
  useLocaleAsPrefix?: boolean
}
```

We can instead provide this settings using the custom JSON configuration associated with the application in the administration page: `Search-Based-Applications/Apps/<app_name>`

The Json key to use with, is:
```json
"help-folder-options": {
    "folder": string,
    "path": string,
    "indexFile": string,
    "useLocale": boolean,
    "useLocaleAsPrefix": boolean
}
```

Where
* `folder` (required): the folder name should exists in:`path/to/help/<folder>`
* `path` (optional): the full pathname where the help's files are located.
* `indexFile` (optional): is the html file to open when the user click on the help menu action eg: index.html.
* `useLocale` (optional)
    * when **true**, help's folder should be put inside a locale sub-folder (en, fr, de, ...), eg: `path/to/help/<locale>/...`
    * when **false**, no sub-folder will be used.
* `useLocaleAsPrefix` (optional)
    * when **true**, index file is prefixed by the locale followed by a dot character eg: **en.**, eg: `path/to/help/<locale>.index.html`
    * when **false**, only `indexFile` is used to identify the file to open or  the `indexFile`.

### Results Views

Results views can be configured to display search results in different ways. The configuration is described in the [documentation](/libraries/components/results-view.md) of the Results Views module.

The list of views (`ResultsView` objects) and the default one must be injected in the `BsResultsViewModule`:

```ts
@NgModule({
    imports: [
        BsResultsViewModule.forRoot(allViews, defaultView)
        ...
```

### List of Modules

The `AppModule` is the root module of the application. It is where we define the list of submodules (dependencies) used by the app. These can include Angular modules (like `BrowserModule`, `RouterModule` or `FormsModule`), Sinequa modules (like `WebServicesModule`, `LoginModule`, etc.) or third-party modules (like `FusionChartsModule`).

The list of imported submodules is defined within the `@NgModule` construct:

```ts
@NgModule({
    imports: [
        ...
    ]
})
```

Importing a module gives us access to the components and directives that it encapsulate.

However, sometimes these components require some global input configuration. This is why we often need to call a `.forRoot()` method.

In the case of the Results View module above, we call the `forRoot()` method to inject the list of views, so that the components and services of this module have access to them:

```ts
BsResultsViewModule.forRoot(allViews, defaultView)
```

### List of Components

An application can use components defined in imported modules, but it can also have components of its own (at the very least the root `AppComponent`). These components must be added to the list of `declarations` of the `AppModule`.

The list of components is defined within the `@NgModule` construct:

```ts
@NgModule({
    declarations: [
        ...
    ]
})
```

### List of Providers

A [provider](https://angular.io/guide/providers) is an instruction to the Dependency Injection system of Angular on how to obtain a value for a dependency.

In the `AppModule`, we see typically three types of providers:

1. `APP_INITIALIZER`: An app initializer is a piece of code that can be inserted in the Angular initialization process (before Angular starts rendering components). It can be especially useful to fetch some required configuration from the server. The [`@sinequa/core`](/libraries/core/core.md) library already injects a few initializers implicitly, but it is possible to add new ones. In particular, we provide a `StartConfigInitializer` to automatically fetch configuration from the Sinequa server (see [Startup configuration](#startup-configuration)).
2. `HTTP_INTERCEPTORS`: An HTTP interceptor is a piece of code that hooks into the Angular HTTP client. It can "intercept" any request sent to the server, to perform some global actions. By default, three interceptors are injected:

    - The `LoginInterceptor` takes care of triggering the authentication process when the server sends back a 401 error (Unauthorized). When the authentication is complete, the interceptor plays back the failed query. See [Login methods](login-methods.md).
    - The `AuditInterceptor` takes care of normalizing the Audit event messages sent to the server via any web service call. It can be overridden to customize all the audit events across the app. See [Auditing applications](audit.md).
    - The `NotificationsInterceptor` takes care of displaying notifications coming from the server (Notifications can be included via a `$notifications` array appended to the JSON response).

3. Global configuration: As seen above, some configuration must sometimes be injected via the list of providers (`SCREEN_SIZE_RULES`, `SELECTION_OPTIONS`, `LocationStrategy, APP_HELP_FOLDER_OPTIONS`)

## AppComponent

Once the `AppModule` is loaded, Angular renders the root component of the application, the `AppComponent`.

In Vanilla Search, the `AppComponent` does three important things:

1. In the controller (`app.component.ts`), notice that the component extends `ComponentWithLogin`. This parent component takes care of initiating the login process (calling `LoginService.login()` method). This means the login process is always initiated regardless of the active route.
2. In the `onLoginComplete()` method, some initialization tasks are implemented (these tasks could only be performed post-login). In particular, the action bar's `selectionActions` are populated (in function of the features activated in the [configuration](configuration.md)).
3. In the template (`app.component.html`) we include the `<router-outlet>` component. The role of the outlet is to display the currently active route. In vanilla the default route is the `/home` route, displaying the `HomeComponent`. Note that the route component is displayed even if the user is not logged in.

The Login process is described extensively in [Login Methods](login-methods.md). It is important to be aware that a common source of error is trying to perform some actions requiring to be logged in, without verifying whether or not it is the case. Because of point 3) above, it is very important to include checks in the applications, such as:

```html
<h1 *ngIf="loginService.complete">
    Hello {{principalService.principal.fullName}}!
</h1>
```

It is also frequently required to perform tasks upon login or logout events. The correct way to do so is to subscribe to the `LoginService` events:

```ts
this.loginSubscription = this.loginService.events.subscribe(event => {
    if (event.type === "session-start") {
        ...
    }
});
```
