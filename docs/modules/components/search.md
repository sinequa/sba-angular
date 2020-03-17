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

## Search Service

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

### Timeline

The `sq-timeline` component displays a chart representing the distribution of the results in time. Users can filter the search by clicking, dragging and dropping on dates on the chart (thus adding date filters in the query).

![Timeline]({{site.baseurl}}assets/modules/search/timeline.png)

This components requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input to work properly.

```html
<sq-timeline [results]="results"></sq-timeline>
```

### Loading bar

The [`sq-loading-bar`]({{site.baseurl}}components/components/BsLoadingBar.html) component displays a indeterminate loading bar when the search is active (the [`SearchService`]({{site.baseurl}}components/injectables/SearchService.html) expects results from the server). The component uses the `SearchService.searchActive` property and requires no mandatory input.

![Loading bar]({{site.baseurl}}assets/modules/search/loading-bar.png)

```html
<sq-loading-bar></sq-loading-bar>
```
