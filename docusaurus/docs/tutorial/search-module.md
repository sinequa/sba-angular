---
layout: default
title: Search Module
parent: Tutorial
sidebar_position: 3
---

# Search Module

The [Hello Search](/apps/1-hello-search.md) app is solely based on the low-level library [`@sinequa/core`](/libraries/core/core.md). In the next steps of this tutorial, we will incorporate high-level features from [`@sinequa/components`](/libraries/components/components.md).

The first module that we want to integrate is the [Search module](/libraries/components/search.md), since it powers many other modules and is very central in the architecture of the SBA framework.

## Importing the Search Module

In your `app.module.ts`, import the `BsSearchModule` and add it to the `NgModule` declaration:

```ts title="app.module.ts"
import { BsSearchModule } from '@sinequa/components/search';

@NgModule({
  imports: [
    ...
    BsSearchModule.forRoot({routes: [""]})
```

Notice the call to `forRoot()`, which tells the `SearchService` to work on the empty route (Hello Search has no route).

Doing so means you can now use the components exported by this module in your app. However, we need to do things in order, and there are preliminary steps before we can actually do this...

## Using the Search Service

The Hello-Search has a few issues:

- If you refresh the page after searching for something, your results are gone! This is not surprising, as your search criteria are not persisted anywhere.
- You are creating local `Query` and `Results` objects which cannot be used outside of your component.
- You are not generating events and keeping track of user search actions, which will be an issue for implementing some features.

The `SearchService` solves these issues by:

- Centralizing the management of the `Query` and `Results` and providing helper method to easily modify these objects.
- Persisting the query in the URL, so that the app state is not lost on refresh.
- Generating events and keeping track of user actions (breadcrumbs).

In your `app.component.ts`, import the `SearchService` and add it to the declarations of the constructor (in place of the `QueryWebService`):

```ts title="app.component.ts"
import { SearchService } from '@sinequa/components/search';

...
constructor(
    ...
    public searchService: SearchService
){
```

The `SearchService` is going to manage the `Results` *observable* (See [rxjs](https://angular.io/guide/rx-library)), you can now remove the `results$` object:

```ts title="app.component.ts"
// code-block-error-line
results$: Observable<Results> | undefined
```


Your `search()` method can be simplified to:

```ts title="app.component.ts"
search() {
    this.searchService.clearQuery();
    this.searchService.query.text = this.searchControl.value || '';
    this.searchService.searchText();
}
```

You can also replace `this.results$ = undefined` by `this.searchService.clear()`.

Also, remove the now unused imports:
```ts title="app.component.ts
// code-block-error-start
import {QueryWebService, Results} from "@sinequa/core/web-services";
import {AppService`~~`, Query`~~`} from "@sinequa/core/app-utils";
import {Observable} from 'rxjs';
// code-block-error-end
```

Now in your `app.component.html`, replace the occurrences of `results$` by `searchService.resultsStream`.

```html title="app.component.html"
    <button *ngIf="searchService.resultsStream | async" type="button" (click)="clear()">Clear</button>
</form>
<div *ngIf="searchService.resultsStream | async; let results">
    <hr>
    <div *ngFor="let record of results.records" class="record">
...
```

At this point, your application works almost correctly. Notice that the URL now contains a serialized Query object, which contains the text you have searched for. If you refresh the page, the results are still here! However, notice that the text in the search input has disappeared...

![Empty input](/assets/tutorial/search-empty-input.png)

To fix this, we need to listen to the `SearchService` events and fill the input when the query changes.  
Back in your `app.component.ts`, add these lines to your constructor:

```ts title="app.component.ts"
constructor(...) {
    ...
    this.searchService.queryStream.subscribe({
        next: (query) => {
            this.searchControl.setValue((query && query.text) || '');
        }
    });
}
```

Now when you refresh the page after a search, everything should be fine!

## Importing Bootstrap

We are almost ready to start using the components from the Search module. But one thing remains to do: These components depend on the Bootstrap library, and our current Hello Search app does not use any style library.

In your `styles/app.scss` stylesheet, add the following lines:

```scss title="app.scss"
// Bootstrap styles
@import "bootstrap/scss/bootstrap";

/*** Fontawesome ***/
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "@fortawesome/fontawesome-free/scss/fontawesome";
@import "@fortawesome/fontawesome-free/scss/brands";
@import "@fortawesome/fontawesome-free/scss/regular";
@import "@fortawesome/fontawesome-free/scss/solid";
```

You should notice that your app looks a little different. This is because Bootstrap applies default styling to standard HTML elements.

## Search module components

You can now insert some of the Search module components in your component's template. Here are some suggestions:

- `sq-tabs`: Displays some tabs to filter the search corpus (the filters are configured in the administration back-end)
- `sq-loading-bar`: Displays a loading bar when a Search is in progress
- `sq-pager`: Displays a pager to navigate through the search results

```html title="app.component.ts"
<div *ngIf="searchService.resultsStream | async; let results">
    <hr>
    <sq-tabs [results]="results"></sq-tabs>
    <sq-loading-bar></sq-loading-bar>
    <sq-pager [results]="results"></sq-pager>
    <div *ngFor="let record of results.records" class="record">
        ...
    </div>
</div>
```

If everything goes well, you should see something like this in your app:

![Search components](/assets/tutorial/search-components.png)

Don't worry too much about the Look & Feel of the app, we'll come to that later. In particular the name of the tabs read like strange codes (`msg#results.resultsAllTab`): these are keys needed to internationalize your application, with a dictionary for each language (we will deal with that in the [Internationalization chapter](intl.md))
