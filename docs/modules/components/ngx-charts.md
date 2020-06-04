---
layout: default
title: Ngx Charts Module
parent: Components
grand_parent: Modules
nav_order: 18
---

# Ngx Charts Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/NgxChartsModule.html) auto-generated from source code.

Also checkout the official documentation of the [ngx-charts](https://swimlane.github.io/ngx-charts/) library.

## Features

This module is a wrapper of the open-source [ngx-charts](https://swimlane.github.io/ngx-charts/) library. It allows to display simple charts plotting the data from **aggregations** (although the library may be used in different ways).

The module includes two components:

- A chart component displaying given input data, unaware of Sinequa's API and data structures. It supports different chart types from the [ngx-charts](https://swimlane.github.io/ngx-charts/) library.
- A "facet" component taking care of pre-processing the aggregation data available in the results, and passing it to the chart component. Its API is similar to that of the [List Facet component](facet.html#list-facet).

![Chart]({{site.baseurl}}assets/modules/ngx-charts/chart.png){: .d-block .mx-auto }

## Import

Import this module in your `app.module.ts`.

```ts
import { NgxChartsModule } from '@sinequa/components/ngx-charts';

@NgModule({
  imports: [
    ...
    NgxChartsModule
```

Note that if you need to use the [ngx-charts](https://swimlane.github.io/ngx-charts/) library but do not want to use our wrapper module, you can also import the modules you require directly from `@swimlane/ngx-charts`. For example:

```ts
import { BarChartModule, PieChartModule } from "@swimlane/ngx-charts";

@NgModule({
  imports: [
    ...
    BarChartModule,
    PieChartModule
```

## Chart Component

The [`sq-ngx-chart`]({{site.baseurl}}components/components/NgxChart.html) component displays a chart (multiple types are supported), given some data as input, regardless of the data source (the component is unaware of Sinequa APIs and data structures).

Its basic usage is as follow:

```html
<sq-ngx-chart
    [options]="options"
    [data]="dataPoints"
    (item-click)="click($event)">
</sq-ngx-chart>
```

The `data` input is a list of [`ChartDataPoint`]({{site.baseurl}}components/interfaces/ChartDataPoint.html) objects, a simple interface requiring only `name` and `value` properties:

```ts
this.data = [
    {name: "France", value: 123},
    {name: "Germany", value: 215},
    {name: "United States", value: 156},
    {name: "United Kingdom", value: 432}
]
```

The `options` input is an object of type [`ChartOptions`]({{site.baseurl}}components/interfaces/ChartOptions.html), an interface requiring the following properties:

- `type` (`undefined` defaults to a vertical bar chart): Defines the type of chart to display. Available options: `'horizontalbar'`, `'pie'`, `'advancedpie'`, `'piegrid'`, `'treemap'`, `'numbercard'`, `'gauge'`.
- `colorScheme` (optional): Name of a color scheme used to plot the data (among the options: `vivid`, `natural`, `cool`, `fire`, `solar`, `air`,... see the [source code](https://github.com/swimlane/ngx-charts/blob/master/projects/swimlane/ngx-charts/src/lib/utils/color-sets.ts))
- `getItemColor` (optional): Function taking as input the name of a data item (`string`) and returning a custom color.
- `tickFormatter` (optional): Function taking as input the value of a data item (`number`) and returning a formatted value.

## Facet Chart Component

The [`sq-facet-ngx-chart`]({{site.baseurl}}components/components/FacetNgxChart.html) component displays an aggregation from the results as a chart. The user can click on items in the chart to filter the results.

![Chart facet]({{site.baseurl}}assets/modules/facet/facet-chart.png){: .d-block .mx-auto}

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input and the name of the aggregation to work properly.

```html
<sq-facet-card [title]="'Companies'" [icon]="'fas fa-building'">
    <sq-facet-chart #facet [results]="results" [aggregation]="'Company'"></sq-facet-chart>
</sq-facet-card>
```

### List of inputs

The [`sq-facet-ngx-chart`]({{site.baseurl}}components/components/FacetNgxChart.html) component accepts the following inputs:

- `results` (required): The [`Results`]({{site.baseurl}}core/interfaces/Results.html) object containing the aggregation that must be displayed.
- `aggregation` (required): A `string`, containing the name of the aggregation (as defined in the query web service configuration) to plot in the chart.
- `aggregations` (optional): A list of `string`, containing the name of alternative aggregations. If provided, a dropdown menu will be automatically displayed in the facet frame to switch between these different aggregations.
- `chartType` (`undefined` defaults to a vertical bar chart): Defines the type of chart to display. Available options: `'horizontalbar'`, `'pie'`, `'advancedpie'`, `'piegrid'`, `'treemap'`, `'numbercard'`, `'gauge'`.
- `colorScheme` **or** `colors`: By default a list of `colors` is provided, containing a single color, resulting in all the chart items being drawn with the same color. It is possible to provide a custom list of `colors` with multiple values instead. It is also possible to set `colors` to `null` or `undefined` and instead provide a `colorScheme` (among the options: `vivid`, `natural`, `cool`, `fire`, `solar`, `air`,... see the [source code](https://github.com/swimlane/ngx-charts/blob/master/projects/swimlane/ngx-charts/src/lib/utils/color-sets.ts)).
- `filteredColor` (default: `#C3E6CB`): If the `colors` input is provided, items which are *filtered* (have been clicked on to filter the results) will be displayed with this color.
- `selectedColor` (default: `#7acce5`): If the `colors` input is provided, items belonging to a *selected* document (managed by the [`SelectionService`]({{site.baseurl}}components/injectables/SelectionService.html) - see [Selection Module](selection.html)) will be displayed with this color.
