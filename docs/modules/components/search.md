---
layout: default
title: Search Module
parent: Components
grand_parent: Modules
nav_order: 1
---

# Search Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/BsSearchModule.html) auto-generated from source code.

The Search module is also documented in the [tutorial]({{site.baseurl}}tutorial/search-module.html).

## Features

This modules provides:

- [`SearchService`]({{site.baseurl}}components/injectables/SearchService.html): A central service to manage search queries and results, and their lifecycles. This service is used by many other modules to modify the search query and get results globally.
- A list of components to control the search query ([`Query`]({{site.baseurl}}core/classes/Query.html)). These components are styled with the Bootstrap library, and their class names start with `Bs`.

## Import

Import this module in your `app.module.ts` and pass the list of routes where you need the Search service to be active, as well as other optional parameters (See [SearchOptions]({{site.baseurl}}components/interfaces/SearchOptions.html)).

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

The [SearchService]({{site.baseurl}}/components/injectables/SearchService.html) provides an opinionated way to manage the lifecycle of Sinequa
search queries and their results. It has a `query` property which determines the [`Query`]({{site.baseurl}}/core/classes/Query.html) that will be
used when executing any of the service's `search` methods. When you access the `query` property a new `Query` is created if one does not already
exist. The query name used is taken from the current `ccquery` held on the [AppService]({{site.baseurl}}/core/injectables/AppService.html). This
determines the query web service used on the server when executing the query.

After a query has been executed its [Results]({{site.baseurl}}/core/interfaces/Results.html) are stored in the `results` property.
A corresponding [Breadcrumbs]({{site.baseurl}}/components/classes/Breadcrumbs.html) instance is also maintained and stored in the `breadcrumbs`
property.

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
too. The routes for which the service is active are defined in the [SearchOptions]({{site.baseurl}}components/interfaces/SearchOptions.html)) specified
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

The [`sq-tabs`]({{site.baseurl}}components/components/BsTabs.html) component allows to control the `query.tab` parameter. When clicking on a tab, this parameter is set and a new search is triggered.

![Tabs]({{site.baseurl}}assets/modules/search/tabs.png)

This components requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input to work properly.

```html
<sq-tabs [results]="results"></sq-tabs>
```

### Breadcrumbs

The [`sq-breadcrumbs`]({{site.baseurl}}components/components/BsBreadcrumbs.html) component allows to display the list of search criteria currently active. Clicking on a search criteria can "rewind" or "wind forward" the search to that particular user action.

![Breadcrumbs]({{site.baseurl}}assets/modules/search/breadcrumbs.png)

The breadcrumb list ([`Breadcrumbs`]({{site.baseurl}}components/classes/Breadcrumbs.html)) is stored in the [`SearchService`]({{site.baseurl}}components/injectables/SearchService.html), which takes care of managing the lifecycle of this list (eg. automatically adding/removing breacrumbs items when the user clicks a facet).

This components requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input to work properly.

```html
<sq-breadcrumbs [results]="results"></sq-breadcrumbs>
```

### Did you mean

The [`sq-did-you-mean`]({{site.baseurl}}components/components/BsDidYouMean.html) component displays the syntaxic or phonetic corrections of the user's search query. These corrections are sent by the server via the `Results.didYouMean` object.

![Did you mean]({{site.baseurl}}assets/modules/search/did-you-mean.png)

This components requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input to work properly.

```html
<sq-did-you-mean [results]="results"></sq-did-you-mean>
```

### Page Size Selector

The [`sq-page-size-selector`]({{site.baseurl}}components/components/BsPageSizeSelector.html) component displays a button allowing the user to select the number of results per page from a dropdown menu (`query.pageSize` parameter). The component is based on the [Action module]({{site.baseurl}}modules/components/action.html).

![Page size]({{site.baseurl}}assets/modules/search/page-size.png)

This components requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input to work properly.

```html
<sq-page-size-selector [results]="results"></sq-page-size-selector>
```

### Sort selector

The [`sq-sort-selector`]({{site.baseurl}}components/components/BsSortSelector.html) component displays a button allowing the user to select the sorting criteria (by relevance, by date, etc.). It controls the `query.orderBy` parameter (the different values can be configured server-side in the [Query]({{site.baseurl}}gettingstarted/server-setup.html#query-web-service)). The component is based on the [Action module]({{site.baseurl}}modules/components/action.html).

![Sort selector]({{site.baseurl}}assets/modules/search/sort-selector.png)

This components requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input to work properly.

```html
<sq-sort-selector [results]="results"></sq-sort-selector>
```

### Pager

The [`sq-pager`]({{site.baseurl}}components/components/BsPager.html) component displays a list of buttons allowing the user to navigate between the different pages of documents in the results. It controls the `query.page` parameter.

![Pager]({{site.baseurl}}assets/modules/search/pager.png)

This components requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input to work properly.

```html
<sq-pager [results]="results"></sq-pager>
```

### Loading bar

The [`sq-loading-bar`]({{site.baseurl}}components/components/BsLoadingBar.html) component displays a indeterminate loading bar when the search is active (the [`SearchService`]({{site.baseurl}}components/injectables/SearchService.html) expects results from the server). The component uses the `SearchService.searchActive` property and requires no mandatory input.

![Loading bar]({{site.baseurl}}assets/modules/search/loading-bar.png)

```html
<sq-loading-bar></sq-loading-bar>
```

### Load More Button

The [`sq-load-more`]({{site.baseurl}}components/components/BsLoadMore.html) component display a simple button allowing user to fetch next results.

Results comes from [`SearchService.ResultsStream`]({{site.baseurl}}components/injectables/SearchService.html) and requires no mandatory input.

```html
<sq-load-more></sq-load-more>
```

### Lazy-loading results while scrolling down

The [`sq-scroller`]({{site.baseurl}}components/components/BsScroller.html) component allow continuously loading results as the user scrolls down the page.

Results comes from [`SearchService.ResultsStream`]({{site.baseurl}}components/injectables/SearchService.html) and requires no mandatory input.

We are using the [`Observer API`](https://https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to do this.

```html
<sq-scroller></sq-scroller>
```