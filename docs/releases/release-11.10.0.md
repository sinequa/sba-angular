---
layout: default
title: 11.10.0
nav_order: 99
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.10.0){:.d-block .text-right }

# General changes

## ⚠️ Platform breaking changes

Unlike previous versions of the SBA Framework, the 11.10.0 release is not compatible with older versions of Sinequa ES (11.9.0 and below). This is due to various new functionalities in the platform's REST API (see below).

## Documentation updates

The [SBA documentation](https://sinequa.github.io/sba-angular/) has been significantly enriched, rewritten and reorganized. In particular:

- Rewritten **Introduction** and **Getting Started** sections
- New **Guides** section with guidance on SBA architecture, development environment, versioning, etc.
- Reorganized the **Components** documentation and introduced interactive examples to replace the previous static screenshots and code snippets.
- New **Applications** section including not only the core framework (vanilla, pepper) but also the Usage Analytics and Vanilla Builder applications.
- New **Releases** section with a list of all SBA releases and their main changes (mirroring the Github releases).
- Auto-generated documentation (compodoc) was removed. Instead, we automatically link class names and interfaces found in the documentation to the matching source code in the Github repository.

## End-to-end tests

This release introduces end-to-end (e2e) tests for the SBA components. These tests are written with [Cypress](https://www.cypress.io/) and defined in the `cypress` folder of the repository. These tests cover the (new) `projects/components-docs` application which centralizes all of Sinequa components from `projects/analytics` and `projects/components` (see below). These tests consist primarily in rendering each component and comparing its visual appearance with a reference screenshot. The reference screenshots are stored in the `cypress/snapshots` folder.

# Library updates

## Core

### Web services

- Removed support of fielded search expressions (`Expr`, `ExprParser`, `ExprBuilder` classes). Expressions are replaced with a new "filter" syntax documented in the [Core library](../libraries/core/app-utils.md#filtering-the-metadata). Note that the fielded search syntax used in the search form is still interpreted by the platform as before (but the SBA is unaware of it).

  ⚠️ Any usage of `Expr` in a custom application must be migrated to the new filter syntax. The new syntax essentially provides the same level of functionality:

  Before:

  ```ts
  expr = this.exprBuilder.concatAndExpr([
    this.exprBuilder.makeExpr("docformat", "pdf"),
    this.exprBuilder.concatOrExpr([
      this.exprBuilder.makeExpr("authors", "John"),
      this.exprBuilder.makeNumericalExpr("size", "<", 1024)
    ])
  ]);
  query.addSelect(expr);
  ```

  After:

  ```ts
  filter = {
    operator: "and",
    filters: [
      { field: "docformat", value: "pdf" },
      {
        operator: "or",
        filters: [
          { field: "authors", value: "John" },
          { field: "size", operator: "<", value: 1024 }
        ]
      }
    ]
  };
  query.addFilter(filter);
  ```

- Dataset web service:

  - New `isDatasetError(result)` method to easily test whether a result returned by the dataset web service is valid.
  - The `get(webService, dataset)` now throws an error if the result is not a valid dataset, and its return signature has therefore been changed to `Observable<Results>`.
  - The `getAll()` method is removed. Use `getBulk()` without specifying any dataset instead.

- The Json Method web service now has proper typing for the `options` argument, enables typing the return type and does not log the response to the console anymore.
- The Query web service `Results` object is more accurately typed and was updated to match the latest platform changes (especially around the Neural Search data structures).
- The download service now allows specifying a file name for the downloaded file (rather than the default one sent by the server).


### Login

- ⚠️ Removed support for login in a popup window using `ng2-ui-auth` (unmaintained library).
- The Login interceptor now sends the UI language to the platform (via headers and/or body).
- The Login interceptor now intercepts network errors (eg. 0, 503, 504) and automatically performs retries (progressively spaced in time, as in gmail) while displaying a special notification to the user.
- The Login service now supports hard-coded credentials for development or CI purposes. Credentials can be injected in an app module's providers:

  ```ts
  {provide: CREDENTIALS, useValue: {username: "admin", password: "admin"}}
  ```

### Audit

- All events now include the current browser URL so the current route & query are always available in the logs.
- Logging of route change events is now a core feature as opposed to an app-by-app implementation.
- Logging of exit/return events is now a core feature as opposed to an app-by-app implementation. Now only the **Navigation_Return** events are captured, following a click on a document link (as opposed to tracking any kind of navigation, or alt-tabbing).

### Miscellaneous

- Fixed the escaping of html elements passed to formatjs (https://github.com/sinequa/sba-angular/issues/108).
- `IntlService.formatRelativeTime()` now behaves consistently whether given a string/Date (delay relative to now) or a number (delay) and always auto-determines the display unit (min, hour, day, week, etc.).


## Components

*All components that apply filters to the `Query` have been migrated to the new filter syntax (see above)*


### Autocomplete module

- ⚠️ Removed the `sqAutocompleteFieldSearch` directive and `sq-field-search-items` component (following the removal of the fielded search syntax).
- New `SuggestService` features:
  - When no suggestion is returned, attempt a new strategy of autocompleting only the last token of the query (eg. "Sinequa Sea" -> "Sinequa **Search Engine**").
  - Deduplication, highlighting and scoring of suggest results.
  - Better protection against HTML injection in the suggest results.


### Collapse module

- ⚠️ Removed `sq-collapse-link` (unused and redundant with `sq-collapse-button`).


### Facet module


- ⚠️ Major refactoring of the `sq-facet-list` component:

  - Removal of the `sq-facet-tree` component. `sq-facet-list` now handles both list and tree aggregations.
  - A click on the checkbox displays an "Apply" button that lets user check other items before applying the selection.
  - A click anywhere else on an item applies the selection immediately.
  - Advanced selection options (AND / OR / NOT operators) are nested under a dropdown menu.
  - New icon for "removing a filter".
  - Changes in options:
    - Added `focusSearch` (default: `false`): Automatically focus the search bar when the facet is expanded.
    - Added `expandedLevel` (default: `2`): The number of levels expanded by default (for tree aggregations).
    - Removed `showCheckbox` (determined automatically)
    - Removed `displayActions` (not useful anymore)
    - Removed `showProgressBar` (unused)
    - Removed `alwaysShowSearch` (the search bar is always shown when `searchable` is `true`)
    - `allowAnd` is `false` by default

- ⚠️ Removed `sq-facet-mysearch` (Replaced by the [Filters module](../libraries/components/filters.md)).

- Change of behavior in the `sq-facet-refine` component: Rather than adding a special select property to the query and letting the server modify the fulltext search query accordinly, this component now directly modifies the fulltext query via `query.addRefine()`.

- Refactoring of the `sq-facet-multi` component. The component now displays a custom header template. The `icon` and `title` of the facet should be passed as input to this component rather than to the parent `sq-facet-card`.

- New `sq-facet-container` component to display a list of facets as a toolbar, where one facet can be expanded at a time. This component is documented in the [Facet library](../libraries/components/facet.md#facet-container). This component is used in the new integrated search form (packaged in [Pepper](../apps/3-pepper.md#integrated-search-form)).

- Refactoring of the `sq-facet-filters` component to properly display the actions and custom templates of the facet components in the dropdown panels.

- Facet card:
  - Handle the "click outside" event more efficiently (see: https://github.com/sinequa/sba-angular/issues/106).
  - New inputs to control the actions' tooltip placement (`defaultTooltipPlacement` and `defaultTooltipFallbackPlacements`).


### New Filters module

This new module is documented in the [Components library](../libraries/components/filters.md). It allows displaying and editing the filters of a `Query` object. The component is meant to replace the `sq-facet-mysearch` and `sq-breadcrumbs` components.


### Machine Learning module

- New `sq-chat` component and `ChatService` service to display a chatbot interface. This component allows to chat with a Large Language Model such as GPT-4 (the model powering ChatGPT). This component is documented in the [Machine Learning library](../libraries/components/machine-learning.md#chat).

- Refactored the `sq-top-passages` component: No more pagination, passage truncation or custom facet card header. The text of the answer (predicted by the answer finder model is highlighted within the text of the passage). The component also auto-hides if no passages are found.


### Metadata module

⚠️ Major refactoring of the module:

- Removal of the `sq-metadata-access-list` component (unused).
- Redesign of the `sq-metadata` and `sq-metadata-item` components. Metadata is now displayed according to a configuration (incl. icon, label, filterable, etc.), similar to how the facets and facet containers work. The components are documented in the [Metadata library](../libraries/components/metadata.md).
- New `HighlightService` whose role is to dynamically generate CSS styles to highlight entities in text, based on a given configuration. This service allows to decouple the preview CSS (which used to contain highlight colors for entities) from the main application, which may or may not want to highlight entities or other metadata dependending on the context. In the context of the metadata module, this service allows to apply highlighting in the "entity tooltip" that displays an extract from a document featuring the entity (see the documentation for more information).


### Preview module

⚠️ Major refactoring of the module:

- Removal of unused legacy components (from SBA v1).

- Replacement of the `sq-preview-document-iframe` and `sq-facet-preview` components, as well as the `PreviewDocument` class with a new `sq-preview` component. This component is documented in the [Preview library](../libraries/components/preview.md).

- A new script must be injected in the preview, similar to how the CSS stylesheet was injected so far:

  - The script file name **must** be configured in the preview web service configuration on the server. The default name should be `preview/preview.js` (see the `_preview` configuration for reference).
  - The script **must** be included in your application build. This is now the case by default in Vanilla Search, Pepper and Hello Search.

- The preview highlights (colors of the entities) are now generated dynamically based on configuration passed to the `sq-preview` component. This allows adding or removing entity highlights without having to recompile the application (simply by adding your custom configuration in the "Customization JSON" object of your application). This is again illustrated by default in Vanilla Search.

- Note: This refactoring allows the preview to be used in CORS contexts (eg. when the application is served from a different domain as the Sinequa WebApp).


### Result module

- Three new components allow to display exact and approximate* duplicate documents in a result list:

  - `sq-result-duplicates`: A simple component that displays the number of exact and approximate duplicates for a given document.
  - `sq-result-duplicates-spacer`: A component that visually differentiates approximate duplicates in a results list.
  - `sq-result-duplicates-list`: Displays a list of "approximate duplicates" for a given document.
  
  *: "Approximate duplicates" are determined by a developer-supplied function (see `SearchOptions`) that compares two documents and returns a boolean.

  See the [Result module documentation](../libraries/components/result.md#duplicate-documents) for more information.

- Refactoring of the `sq-result-icon` component: Rather than relying on a global stylesheet to map file extensions to icons, the component now accepts a custom mapping as input (a default mapping is provided with the same icons as those previously defined in CSS).

- New `showMustInclude` option added to `sq-missing-terms` to allow users to force a missing term to be included in the query.
- Added internationalization of the treepath items in `sq-result-source`.
- The `sq-result-thumbnail` component does NOT wrap the thumbnail in a link anymore if either `linkBehavior` is false or if the URL of the document is empty.


### New Search-Form module

New module exporting a customizable `sq-search-form` component.

This component is used in a simple way in [Vanilla Search](../apps/2-vanilla-search.md) (where it only shows an autocomplete component in the expanded state).

It is also used in Pepper to display an integrated search form (featuring filters, facets and autocomplete).

This module is documented in the [Components library](../libraries/components/search-form.md).


### Search module

- ⚠️ Removal of the `sq-breadcrumbs` component (replaced by the [Filters module](../libraries/components/filters.md)).
- ⚠️ Removal of the `Breadcrumbs` class.
- Scopes: The `sq-scope` component now properly handles default scopes or disabled scopes configured in the query web service.
- Tabs: The `sq-tabs` component can now have custom icons (rather than only text).
- `SearchService`:
  - The service now enriches the `Results` object new properties computed by the SBA (eg. `record.$isDuplicate`, `record.$duplicateCount`, `aggregation.$filtered` etc.). These new pre-computed properties allow to simplify the logic of the SBA components and avoid code duplication.
  - New optional `SearchOptions`:
    - `testDuplicates`: A function that compares two documents and returns a boolean indicating whether they are duplicates (see the new `sq-result-duplicates` components).
    - `initializeResults`: A functional that can be used to customize the `Results` object before it is used by the SBA components.
    - `initializeRecord`: Similar to `initializeResults` but for a single record.
    - `initializeAggregation`: Similar to `initializeResults` but for a single aggregation.

### Theme toggle

⚠️ Removed, because the user menu now includes a theme toggle by default.

### Theme

⚠️ Major refactoring of the Sinequa theme that was introduced in the 11.9.0 release. The theme is now more modular and more simply organized. It makes heavy usage of Bootstrap variables rather than overriding CSS rules. The theme is documented in the [Components library](../libraries/components/theme.md).

### Utils

- The `sqTooltip` directive:
  - now displays a custom template with the `sqTooltipTemplate` input.
  - instead of a string, accepts a function that returns arbitrary data (asynchronously) to be displayed in this template. This allows fetching data from the server to display in the tooltip upon hovering an element.
  - the tooltip can now be hoverable itself (rather than only the element that triggers the tooltip) with the `hoverableTooltip` input. This allows to display a tooltip with a link or button that can be clicked.

- Removed the `sqExpr` pipe (replaced by `sq-filters`).
- The `UIService` now handles whether the dark theme is on or off.
- New `sq-virtual-scroller` component that allows an infinite scroll behavior on a long list of data (e.g. the extracts of the preview).


## Analytics

*All components that apply filters to the `Query` have been migrated to the new filter syntax (see above)*

### New Dashboard module

The Pepper dashboard has been extracted into a separate module `@sinequa/analytics/dashboard` and can be imported in any application. The content of the dashboard is still defined in the host application and can thus be customized easily. This new module is documented in the [Analytics library](../libraries/analytics/dashboard.md).

### Heatmap module

The heatmap component properly handles filtering and formatting of the data (entities, CSV, string, etc.) in both "cooccurrence" and "cross-distribution" modes.

### Timeline module

- Integrated the timeline legend (`sq-timeline-legend` component) into the `sq-timeline` component instead of the `sq-facet-component` component. The inputs of the legend component are now inputs of the timeline component.
- The `sq-facet-timeline` component now handles timelines computed with hour or minute granularity (`MASK` parameter).
- The `sq-timeline` component now handles data points with a `displayedDate` property. This property allows to show on the same chart 2 timeseries from a different time range plotted against each other. This allows for example to compare the evolution of a metric for a year vs. the same metric for the previous year. The timeline tooltip displays the date information accordingly.

# Application updates

## Vanilla Search

- Removed the logging of audit events from the AppComponent (now handled by the core library).

- Complete reorganization of the application CSS, based on the new Sinequa Theme (see above). The application behavior on small screens was also improved.

- Improved the Neural Search UI (based on `@sinequa/components/machine-learning`).
- Replaced the `sq-facet-mysearch` component with the new `sq-filters-view` (see above).
- Implemented the new visualization of duplicate documents (see above).
- Implemented the new `sq-metadata` component (see above). The configuration is defined in `config.ts` but can be overriden by the server without recompiling the application.
- Implemented the new `sq-preview` component (see above). The configuration is defined in `config.ts` but can be overriden by the server without recompiling the application.

- Refactored search form:
  - Now based on the new `sq-search-form` component (see above). This removes a large portion of the complex logic that was previously implemented at the application level.
  - New simpler `app-autocomplete` component (replacing the `sqAutocompleteExtended` directive), which can still be easily customized to add new sources of suggestions or modify the display of the suggestions.
  - Removed the "advanced search" mode from the default UI. This can still be added back by customizing the search form component and using the components from `@sinequa/components/advanced`.

- Redesigned preview route:
  - Now based on the refactoring of the preview module (see above).
  - Improved minimap component (showing matches more accurately).
  - Improved highlighting of long extracts (Now surrounded with a rectangle rather than highlighting the whole extract).
  - Improved embedded tooltip look & feel.
  - Improved list of extracts (now displayed in a virtual scroller).
  - Improved list of entities and query matches (with a refreshed look & feel and auto storage of highlight preferences).


## Pepper

- Removed the logging of audit events from the AppComponent (now handled by the core library).

- Complete reorganization of the application CSS, based on the new Sinequa Theme (see above).

- Replaced the `sq-facet-mysearch` component with the new `sq-filters-view` (see above).

- Implemented the new `sq-preview` component (see above). The configuration is defined in `config.ts` but can be overriden by the server without recompiling the application.

- The `sq-facet-filters` was removed from the application (replaced by the integrated search form)

- The previous search form was replaced by a new "Integrated Search Form". This search form is based on the new `sq-search-form` component (see above) and allows to display facets and filters in addition to the autocomplete. The search form is documented in the [Pepper documentation](../apps/3-pepper.md#integrated-search-form).

- The Pepper dashboard is now based on the new `sq-dashboard` component (see above). The dashboard customization process is documented in the [Pepper documentation](../apps/3-pepper.md#dashboard).

- The dashboard toolbar was simplified to only include the most useful actions:
  - Collapse the search results
  - Add a new widget
  - Import or export the dashboard configuration
  - Close the currently open previews

- Only one dashboard can be saved in the user settings (as opposed to a list of named dashboards)


## LLM Integration

The new `sq-chat` component (see above) allows to interact with a Large Language Model (LLM). This component was integrated in a custom version of Vanilla Search currently available on a separate branch of the repository (`chatgpt-integration`). On top of the chat itself, an "assistant" component acts as an interface between the Search interface and the chat (to perform Retrieval Augmented Generation). This application is documented in the [LLM integration documentation](../apps/6-llm-integration.md).

## Component-docs

Components-docs is a new application not meant to be used as a "starter application" (unlike Vanilla or Pepper). It is included for various technical reasons:

- It is used to generate the interactive examples in the SBA documentation (using Angular Elements).
- It is used to quickly visualize and test components that are not included by default in Vanilla or Pepper.
- It is used to run the end-to-end tests of the SBA components with Cypress.

Note that the data used by this application can be either real data from a Sinequa server, or mocked data (included in the application itself).

## Usage Analytics

- Removed programmatically added boundaries of value 0 in timeline-typed widgets and updated the curve type used to draw the timeline.
- Disabled change selection on timeline zooming (to avoid unwanted selection changes when zooming in/out).
- Empty timeline-typed widgets are now displaying *no data to display* message.
- Added native plot of multiple time series from different queries in timeline-typed widgets.
- Changed the display of tooltips in timeline-typed widgets in order to fit the case of multiple time series charts.
- Added a toggle button to timeline-typed widgets to display time series of the preceding period. 
- Enabled *Rename dashboard" action in the dashboard toolbar.
- Fixed log errors when trying to switch from Chart to Grid view.
- Added a custom configuration to the column *timestamp*, in the default query configuration so that it will be automatically well-formatted.
- Enabled the feature to use multiple dataset web services in the same application. Queries having the same name are now overriden by the last one in the last dataset web service (from left to right).
- The dashboard service `DashboardItemOption` object now has proper typing for the `parameters` argument, enables typing each widget (timeline, chart, grid ...). New configuration interfaces are documented in the [Usage analytics documentation](https://github.com/sinequa/usage-analytics).
- Added new type `heatmap chart`, based on `sq-heatmap` component (see above), allowing to display analytic indicator requesting *cross-distribution*.
- Added new type `multi level pie chart`, allowing to display hierarchical-tree indicator. This new component is documented in the [Analytics library](../libraries/analytics/fusioncharts.md).
- Reorganized *Palette of widgets* and *default dashboards*.
- Refreshed look & feel, based on the new Sinequa Theme (see above).
- Added link to a new *Help page*, including detailed informations and explanations of the overall context of the application.
- *Help page* and *feedback* buttons could be displayed or not, depending on the respective JSON configuration properties `enableHelpPageLink` and `enableUserFeedbackMenu`.
- Grid rows are now selectable (with a checkbox) and the selection is handled by `onGridSelectionChanged()` in the `dashboard-item.component.ts`. 

## Vanilla Builder

- supports new metadata component
- supports new preview component
- add global configuration as a service
- new global configurator
- new image selector configurator
- move checkbox, color picker, image selector and multi-select components to the **ngx-ui-builder library**.
Those components are now prefixed by `uib_`
- `search-form` component was renamed `search-form-legacy`

⚠️ As the global configuration structure has changed, weird effects might occur with existing configuration. Specifically with images.

Before:
```json
{
  "id": "...",
  "logoLight": "/assets/vanilla-logo.png",
  "logoDark": "/assets/vanilla-logo_dark.png"
}
```

After:
```json
{
  "id": "...",
  "images": {
    "logoLight": {"filename": "/assets/vanilla-logo.png" },
    "logoDark": { "filename": "/assets/vanilla-logo_dark.png" }
  }
}
```

When a previous configuration is detected, an automatic conversion will be done.
In the case where this conversion doesn't work, just update manually the image using the builder.
