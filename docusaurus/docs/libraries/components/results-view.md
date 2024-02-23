---
layout: default
title: Results Views Module
parent: Components
grand_parent: Libraries
sidebar_position: 16
---

# Results Views Module

## Features

This module provides a way to manage multiple views of the search results. At the core, the `ResultsViewService` keeps track of the current active view, and the list of all available views. This service persists the view name in the URL, and manages the navigation and interactions with the `SearchService`.

The module includes a component (coupled to the service) to select a view (among the list of all views), and a sample "grid" results view, that can be used as an alternative to a standard "list" results view. Other modules include other types of views, such as the [heatmap results view](/libraries/analytics/heatmap.md).

## Import

Import this module in your `app.module.ts`.

```ts
import { BsResultsViewModule } from '@sinequa/components/results-view';

@NgModule({
  imports: [
    ...
    BsResultsViewModule.forRoot(allViews, defaultView)
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enResultsView} from "@sinequa/components/results-view";

const messages = Utils.merge({}, ..., enResultsView, appMessages);
```

## Defining Results Views

A "view" is defined by a `ResultsView` object which contains different settings. Note that this object is independent from the actual rendering of the view: this aspect needs to be handled separately.

For example, let's imagine we have two views:

- one standard list view (e.g. the one from [Vanilla Search](/apps/2-vanilla-search.md)).
- one "grid" view (which is more compact, so it can display more results).

First, we define the `ResultsView` objects and inject them in our `app.module.ts`:

```ts
import { BsResultsViewModule, ResultsView } from '@sinequa/components/results-view';

export const allViews: ResultsView[] = [
    {
        name: "list",
        type: "list",
        display: "List",
        icon: "fas fa-list"
    },
    {
        name: "grid",
        type: "grid",
        display: "Grid",
        icon: "fas fa-th"
    }
];
export const defaultView = allViews[0];

@NgModule({
    imports: [
        ...,

        BsResultsViewModule.forRoot(allViews, defaultView)
```

## Results View Service

The `ResultsViewService` keeps track of the current view and the list of all active views.

When switching views, the service navigates to a new URL including the view name as a query parameter.

Selecting a results view is as simple as calling:

```ts
this.resultsViewService.selectResultsViewName("grid");
```

Behind the scene, the service performs a series of actions:

- Emit a `before-select` event (which can be caught by subscribing to `this.resultsViewService.events`). It is possible to trigger custom actions when this event is fired and tell the service to wait for these actions to complete before actually going to the next step: Simply add 1 (or more) `Promise` to the event object (`event.promises.push(myActionPromise)`).
- Optionally, execute a new custom search query that will yield different results from the ones displayed in the current view. To do so, add a `beforeSearch` method to the `ResultsView` object to modify the query (example below). In that case, the service waits for the results to come in before going to the next step.
- Navigate to a new URL with the new view name. For example `#/search?view=grid&query=...`.
- When the navigation is complete, the service finally sets `this.resultsViewService.resultsView` to the new view and emits an `after-select` event.

## Displaying Results Views

The display of results views is managed via simple Angular template syntax:

```html
<ng-container *ngIf="resultsViewService.resultsView.name === 'list'">
    <!-- Template of the list view -->
</ng-container>

<ng-container *ngIf="resultsViewService.resultsView.name === 'grid'">
    <!-- Template of the grid view -->
</ng-container>
```

The module includes a standard "grid" result view component: `sq-results-grid-view`. You could use for example:

By convention, results view components expect the `ResultsView` object as an input parameter (`view`). The `ResultsView` interface can be extended to include more settings to configure the results view. For example, in the case of the grid results view, the `GridView` interface includes a `columns` array to configure what to display in each column of the grid.

<doc-results-grid-view></doc-results-grid-view>

## Switching Between Views

To switch between results views, include the `sq-results-view-selector` component. The component uses the `ResultsViewService` to display the current view and list of available views.

<doc-results-view-selector></doc-results-view-selector>

Alternatively, the selector can be displayed as a dropdown menu (`useDropdownMenu = true`):

![Results View Selector Dropdown](/assets/modules/results-view/selector-dropdown.png)

## Advanced options

It is possible to assign a view to specific tabs. Use the `includedTabs` and `excludedTabs` parameters of the `ResultsView` interface.

For example:

```ts
export const allViews: ResultsView[] = [
    {
        name: "list",
        type: "list",
        display: "List",
        icon: "fas fa-list",
        includedTabs: ["all"]
    },
    {
        name: "grid",
        type: "grid",
        display: "Grid",
        icon: "fas fa-th",
        columns: [
            {active: true, title: "Title", field: "displayTitle", sortable: false, renderAsHtml: true},
            {active: true, title: "Type", field: "sourcestr4", sortable: true, renderAsHtml: false},
            {active: true, title: "PageRank", field: "sourcedouble1", sortable: true, renderAsHtml: false},
        ],
        excludedTabs: ["company", "people"]
    }
];
```

It is also possible to customize the query for a specific results view. But note that if you use that feature, you will probably need to customize the query for *every* view, to cancel the effects of the first modification.

For example, it would make sense to display more results in the grid view (let's say 100), so we can tune the query to do that (`pageSize` parameter), but we also need to clean up the query when switch from the grid view back to the list view:

```ts
export const allViews: (ResultsView|GridView)[] = [
    {
        name: "list",
        type: "list",
        display: "List",
        icon: "fas fa-list",
        includedTabs: ["all"],
        beforeSearch: (query: Query) => {delete query.pageSize; return true;}
    },
    {
        name: "grid",
        type: "grid",
        display: "Grid",
        icon: "fas fa-th",
        columns: [
            {active: true, title: "Title", field: "displayTitle", sortable: false, renderAsHtml: true},
            {active: true, title: "Type", field: "sourcestr4", sortable: true, renderAsHtml: false},
            {active: true, title: "PageRank", field: "sourcedouble1", sortable: true, renderAsHtml: false},
        ],
        excludedTabs: ["company", "people"],
        beforeSearch: (query: Query) => {query.pageSize = 100; return true;}
    }
];
```
