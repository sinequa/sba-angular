---
layout: default
title: Search Module
parent: Components
grand_parent: Libraries
sidebar_position: 1
---

# Search Module

The Search module is also documented in the [tutorial](/tutorial/search-module.md).

## Features

This modules provides:

- `SearchService`: A central service to manage search queries and results, and their life cycles. This service is used by many other modules to modify the search query and get results globally.
- A list of components to control the search query (`Query`). These components are styled with the Bootstrap library, and their class names start with `Bs`.

## Import

Import this module in your `app.module.ts` and pass the list of routes where you need the Search service to be active, as well as other optional parameters (See `SearchOptions`).

```ts
import { BsSearchModule } from '@sinequa/components/search';

@NgModule({
  imports: [
    ...
    BsSearchModule.forRoot({
        routes: ["search", "search2"],
        homeRoute: "home"
    })
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enSearch} from "@sinequa/components/search";

const messages = Utils.merge({}, ..., enSearch, appMessages);
```

## Search Service

### Overview

The `SearchService` provides an opinionated way to manage the lifecycle of Sinequa
search queries and their results. It has a `query` property which determines the `Query` that will be
used when executing any of the service's `search` methods. When you access the `query` property a new `Query` is created if one does not already
exist. The query name used is taken from the current `ccquery` held on the `AppService`. This
determines the query web service used on the server when executing the query.

After a query has been executed its `Results` are stored in the `results` property.

As you work with the Search Service it issues a number of events (`new-query`, `new-results`, ...) on the `events` property that can be listened
to by other services and components. In addition, there is the `resultsStream` behavior subject that is convenient to use in components when
displaying results:

```html
<ng-container *ngIf="searchService.resultsStream | async; let results">
  <my-results-component [results]="results"></my-results-component>
</ng-container>
```

### Usage

Initial fulltext search:

```ts
// Clear the current query, if any
this.searchService.clearQuery();
// Set the text on the query (a new query is created by the query getter)
this.searchService.query.text = 'some fulltext';
// Initiate the search
this.searchService.search();
```

Faceted search:

```ts
// Add the filter
this.searchService.query.addSelect('authors:proust', 'Authors');
// Initiate the search
this.searchService.search();
```

Did you mean:

```ts
this.searchService.didYouMean('corrected text', DidYouMeanKind.Original);
```

Pagination:

```ts
this.searchService.gotoPage(3);
```

Tab selection:

```ts
this.searchService.selectTab('mytab');
```

### Routing

By default, the Search Service works with the Angular router. A search issued by the service updates the `query` query string parameter and uses the
router to navigate to the new URL. The query is actually executed on completion of the navigation which lets the service react to external navigations
too. The routes for which the service is active are defined in the `SearchOptions` specified
when importing the `SearchModule`. If no `SearchOptions` are specified then default options are created with the `routes` array set to `['search']`.
Urls with routes that include the current query can be shared with other users. When they click on the URL the associated query will automatically
be executed (in the context of that user).

Owing to this interaction with the router, `navigate` is the fundamental method for executing queries with the `SearchService`. The most common method
used is `search` which resets the currently selected page and "did-you-mean" status before calling `navigate`. The methods which call `navigate` are
`search`, `gotoPage` and `didYouMean`. The `search` method is called by `searchText`, `selectBreadcrumbsItem`, `searchRefine` and  `selectTab`. These
methods send auditing information with the queries.

The `SearchService.home` method clears the current query and navigates to the `homeRoute` defined on the `SearchOptions` unless an explicit route is
passed. If no route is specified and the `homeRoute` is empty then navigation remains in the context of the current route.

It is possible to deactivate routing in the `SearchService` using `SearchOptions`:

```ts
NgModule({
  imports: [
    SearchModule.forRoot({deactivateRouting: true})
  ]
})
```

The search methods will all still work but they will execute the queries immediately rather than passing via the router.

## Components

### Tabs

The `sq-tabs` component allows to control the `query.tab` parameter. When clicking on a tab, this parameter is set and a new search is triggered.

This components requires at least a `Results` input to work properly.

<doc-tabs></doc-tabs>

### Did you mean

The `sq-did-you-mean` component displays the syntaxic or phonetic corrections of the user's search query. These corrections are sent by the server via the `Results.didYouMean` object.

This components requires at least a `Results` input to work properly.

<doc-did-you-mean></doc-did-you-mean>

### Page Size Selector

The `sq-page-size-selector` component displays a button allowing the user to select the number of results per page from a dropdown menu (`query.pageSize` parameter). The component is based on the [Action module](/libraries/components/action.md).

This components requires at least a `Results` input to work properly.

<doc-page-size-selector></doc-page-size-selector>

### Sort selector

The `sq-sort-selector` component displays a button that allows the user to select the sorting criteria (by relevance, by date, etc.). It controls the `query.orderBy` parameter (the different values can be configured server-side in the [**Query web service**](/guides/2-server-config.md#query-web-service-default-_query)). The component is based on the [Action module](/libraries/components/action.md).

![Sort selector](/assets/modules/search/sort-selector.png)

This components requires at least a `Results` input to work properly.

```html
<sq-sort-selector [results]="results"></sq-sort-selector>
```


### Pager

The `sq-pager` component displays a list of buttons allowing the user to navigate between the different pages of documents in the results. It controls the `query.page` parameter.

![Pager](/assets/modules/search/pager.png)

This components requires at least a `Results` input to work properly.

```html
<sq-pager [results]="results"></sq-pager>
```


### Loading bar

The `sq-loading-bar` component displays a indeterminate loading bar when the search is active (the `SearchService` expects results from the server). The component uses the `SearchService.searchActive` property and requires no mandatory input.

<doc-loading-bar></doc-loading-bar>

### Load More Button

The `sq-load-more` component display a simple button allowing user to fetch next results.

Results comes from `SearchService.resultsStream` and requires no mandatory input.

```html
<sq-load-more></sq-load-more>
```


### Lazy-loading results while scrolling down

The `sq-scroller` component allow continuously loading results as the user scrolls down the page.

Results comes from `SearchService.resultsStream` and requires no mandatory input.

We are using the [`Observer API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to do this.

```html
<sq-scroller></sq-scroller>
```


### Scope selector

The `sq-scope` component allows users to select a subset of sources, much like the tabs but with additional flexibility for defining the WHERE-clause returning the documents.

The scope configuration is defined in the query web service (Result Page tab):

![Scope config](/assets/modules/search/scope-config.png)

![Scope rules](/assets/modules/search/scope-rules.png)

The scope selector is typically displayed in the search bar, although this is not an obligation.

![Scope selector](/assets/modules/search/scope.png)

Selecting a scope updates the `Query` object, without triggering a new search (if this behavior is required, it is possible to trigger a new search by listening to the `(queryChange)` event emited by this component).

A complete implementation could look like this:

```html
<sq-scope
  *ngIf="appService.ccquery?.scopesActive"
  [query]="searchService.query"
  (queryChange)="searchService.search()">
</sq-scope>
```


(Note that, unlike with the tabs, the query web service does not support counting the number of elements in each scope for a given query. Therefore, scopes could be displayed in the form of tabs, but without tab counters.)
