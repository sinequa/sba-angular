---
layout: default
title: FusionCharts Module
parent: Components
grand_parent: Modules
nav_order: 19
---

# FusionCharts Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/FusionChartsModule.html) auto-generated from source code.

Also checkout the official documentation of the [FusionCharts](https://www.fusioncharts.com/angular2-js-charts?framework=angular2) library.

## Features

[FusionCharts](https://www.fusioncharts.com/angular2-js-charts?framework=angular2) is a charting library which usage is permitted within the scope of a Sinequa-based project.

This module includes a single component which exposes a limited sample of the [FusionChart](https://www.fusioncharts.com/angular2-js-charts?framework=angular2) functionalities. The FusionCharts library includes many rich and configurable charts which are not covered by this module. The purpose of this module is to demonstrate how to integrate FusionCharts into a SBA, and how it can be connected to the Sinequa data structures and APIs.

![Chart]({{site.baseurl}}assets/modules/fusioncharts/chart.png){: .d-block .mx-auto }

## Import

Import this module in your `app.module.ts`.

```ts
import { FusionChartsModule } from '@sinequa/components/fusioncharts';

@NgModule({
  imports: [
    ...
    FusionChartsModule
```

## FusionChart Component

The [`sq-fusion-chart`]({{site.baseurl}}components/components/FusionChart.html) component displays a chart (multiple types are supported), given at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input and the name of an aggregation (as configured in the query web service).

Its most basic usage is as follow:

```html
<sq-facet-card [icon]="'fas fa-chart-line'" [title]="'FusionCharts'">
    <sq-fusion-chart #facet [results]="results" [aggregation]="'Company'"></sq-fusion-chart>
</sq-facet-card>
```

Which displays a chart as in the image above.

### Chart type

Additionally, an input `type` can be specified to change the type of chart. Currently, only `column2d`, `bar2d`, `pie2d` and `doughnut2d` have been tested (and their "3d" equivalents). Other types listed in the FusionCharts documentation might work as well but could expect different types of input or options.

For example:

```html
<sq-facet-card [icon]="'fas fa-chart-line'" [title]="'FusionCharts'">
    <sq-fusion-chart #facet [type]="'doughnut3d'" [results]="results" [aggregation]="'Company'"></sq-fusion-chart>
</sq-facet-card>
```

Displays the following:

![doughnut]({{site.baseurl}}assets/modules/fusioncharts/doughnut3d.png){: .d-block .mx-auto }

⚠️ We actually do not recommend using Pie or Doughtnut charts to display long-tail aggregations as in the example, since it can be misleading: Only the top ten values are displayed here, but the chart looks as if all these values make up 100% of the data.

### Multiple aggregations

The component also accepts an input `aggregations`, which is the list of names of alternative aggregations that can be plotted instead of the primary `aggregation`. If provided, the facet header includes a drop-down menu allowing the user to select which aggregation he wants to plot.

```html
<sq-facet-card [icon]="'fas fa-chart-line'" [title]="'FusionCharts'">
    <sq-fusion-chart #facet [results]="results" [aggregation]="'Company'" [aggregations]="['Company','Person','Geo']"></sq-fusion-chart>
</sq-facet-card>
```

![Aggregations]({{site.baseurl}}assets/modules/fusioncharts/aggregations.png){: .d-block .mx-auto }

### Width and Height

The component accepts `width` and `height` parameters with the following defaults:

- `width = '100%'`
- `height = '350'` (Note that the input is expected as a `string` and it should NOT contain a suffix like `px`, although `%` works fine)

### Chart options

A `chart` input can be provided to the component. It must have the same structure as in the [FusionCharts documentation](https://www.fusioncharts.com/angular2-js-charts?framework=angular2) (this object is always nested within the `dataSource` object).

The default is:

```ts
export const defaultChart = {
    "theme": "fusion",
    "labelDisplay": "rotate",
    "slantLabel": "1"
}
```

(Note that these default values have the effect of tilting the x axis labels in the default `Column2D` chart)

### Colors

By default, a FusionCharts theme is used (it can be modified using the above [chart options](#chart-options)). However it is possible to specify your own color for displaying the data items:

- `defaultColor`: When specified, will be used as the background color for the data items (eg. the bars of a bar chart).
- `filteredColor` (default: `#C3E6CB`): Displays the *filtered* items (items that have been clicked on to filter the results) in a distinctive color.
- `selectedColor` (default: `#8186d4`): Displays the items that belong to a *selected document* (managed by the [`SelectionService`]({{site.baseurl}}components/injectables/SelectionService.html) - see [Selection Module](selection.html)) in a distinctive color.

![Custom colors]({{site.baseurl}}assets/modules/fusioncharts/colors.png){: .d-block .mx-auto }
