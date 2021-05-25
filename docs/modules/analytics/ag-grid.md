---
layout: default
title: AG Grid Module
parent: Analytics
grand_parent: Modules
nav_order: 9
---

# AG Grid Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}analytics/modules/AgGridModule.html) auto-generated from source code.

Also checkout the official documentation of the [AG Grid](https://www.ag-grid.com/angular-grid/) library.

## Features

This module includes an integration of the [AG Grid](https://www.ag-grid.com/) library to display data from Sinequa indexes in the form of a grid view. Note that this module uses the **AG Grid Community** library which is released under the MIT License.

The module exports one component which is a wrapper of the `ag-grid-angular` component provided by the library, and enriched with a custom toolbar.

![AG Grid integration]({{site.baseurl}}assets/modules/ag-grid/ag-grid.png){: .d-block .mx-auto }

## Import

Import this module in your `app.module.ts`.

```ts
import { AgGridModule } from '@sinequa/analytics/ag-grid';

@NgModule({
  imports: [
    ...
    AgGridModule
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enGrid} from "@sinequa/analytics/ag-grid";

const messages = Utils.merge({}, ..., enGrid, appMessages);
```

Additionally, the AG Grid component requires various global stylesheets. Import at least the first one of the following, as well as the theme(s) that your application will use.

```scss
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-balham.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
@import "~ag-grid-community/dist/styles/ag-theme-balham-dark.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
```

## Configuration

The [`sq-ag-grid-view`]({{site.baseurl}}analytics/components/AgGridViewComponent.html) component can be integrated in an Angular template with the following minimal inputs:

```html
<sq-ag-grid-view [results]="results" [columns]="columns"></sq-ag-grid-view>
```

In the snippet above,

- `results` is a [`Results`]({{site.baseurl}}core/interfaces/Results.html) object containing the data to be displayed. A change in the results triggers a new rendering of the component.
- `columns` is the list of columns to be displayed by the Grid. Each column definition is a `ColDef` object (see [AG Grid Documentation](https://www.ag-grid.com/angular-grid/column-definitions/)). Only the `field` property is actualy required, and must correspond to a column (or alias) name existing in the record objects. The component creates automatically other properties of the `ColDef` object, namely: `headerName`, `headerTooltip`, `sortable`, `hide`, `width`, `cellRenderer` and `tooltipValueGetter`.

A sample configuration for the `columns` input could be:

```ts
columns: Column[] = [
    {field: "displayTitle", headerName: "Custom title"},
    {field: "url1"},
    {field: "modified"},
    {field: "sourcestr4"},
    {field: "sourcedouble1"},
    {field: "geo"},
    {field: "docformat"}
]
```

Additionally the component can be configured with the following optional inputs:

- `query`: A [`Query`]({{site.baseurl}}core/classes/Query.html) object to fetch data from the server (when scrolling down the list of results). This defaults to `SearchService.query`.
- `width` (default: `'100%'`): The width of grid.
- `height` (default: `'600px'`): The height of grid.
- `showToolbar` (default: `true`): Whether or not to show the toolbar on top of the grid.
- `formatContent` (default: `true`): Whether or not to format the data (using the [`FormatService`]({{site.baseurl}}core/injectables/FormatService.html)). This property is overriden by the user's preference once they make a choice.
- `rowSelection` (default: `'multiple'`): Whether the user can select one (`'single'`) or multiple (`'multiple'`) rows.
- `displayCheckbox` (default: `false`): Display checkboxes in the first column of the grid, to make row selection more intuitive.
- `theme` (default: `'ag-theme-alpine'`): Choice of the theme. Note that the corresponding stylesheet must be imported in your global `stylesheet` (see above). The library provides a regular theme (`'ag-theme-alpine'`) and a dense theme (`'ag-theme-balham'`) when there is a lot of data to display. On top of this, each of these themes has a dark mode (append `-dark` to the above theme names).
- `defaultColumnWidth` (default: `200`): Default column width in pixels.
- `defaultColDef`: A default `ColDef` with properties applied to all columns (unless overriden in the column's definition).
- `renderCell`: A default cell renderer used for all columns (unless overriden in the column's definition). The default renderer uses the [`FormatService`]({{site.baseurl}}core/injectables/FormatService.html) to format data.
- `tooltipValueGetter` A default function to generate a tooltip for each cell.
- `exportValueGetter` A default function to generate export data for each cell.

## Understanding the "infinite" row model

Internally, the component is configured to use the ["infinite" row model](https://www.ag-grid.com/angular-grid/infinite-scrolling/).

This means that the grid downloads only the bits of data that it needs to display. Concretely, when users scroll down the list of results, the component fetches more data from Sinequa (using pagination parameters) and displays them on the fly.

This configuration involves various steps:

1. The `ag-grid-angular` component is configured with the following settings:

    ```html
    <ag-grid-angular
        ...
        [rowModelType]="'infinite'"
        [cacheBlockSize]="appService.ccquery?.pageSize || 20"
        [blockLoadDebounceMillis]="300">
    ```

    This means that the data is downloaded from the server in blocks of 20 records (unless a different value is configured) and that to avoid flooding the server when scrolling fast, we wait for 300ms before downloading each block.

2. Row data is not passed directly to the grid. Instead, a `Datasource` object is created:

    ```ts
    // Create a new datasource
    this.datasource = this.makeDatasource();
    // Apply to the grid
    this.gridApi.setDatasource(this.datasource);
    ```

    This datasource is responsible for providing data asynchronously, taking into account the current state of the `query` as well as the pagination parameters, custom filters and sorting parameters that the ag-grid component provides.

3. Our implementation of the `IDatasource` interface is available in the [`SqDatasource`]({{site.baseurl}}analytics/classes/SqDatasource.html) class.

    At the moment, most of the complexity comes from the management of the wide range of filter types supported by AG Grid (`contains`, `equals`, `startsWith`, etc.), which is translated into fielded search syntax (including regular expression for some of these filters).

    This class can be overriden or replaced to implement a different logic of data handling.
