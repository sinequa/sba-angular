---
layout: default
title: Vis Timeline Module
parent: Analytics
grand_parent: Libraries
nav_order: 4
---

# Vis Timeline Module

This module is an integration of the [Vis Timeline](https://visjs.github.io/vis-timeline/docs/timeline/) library.

This module reuses code from the [ngx-vis](https://github.com/visjs/ngx-vis) project. The documentation from this project is valid, except the directive and service are packaged in this Sinequa module.

## Features

This module includes a sample Timeline visualization for dates and events, based on the [Vis library](https://visjs.org/). The timeline can display punctual *dates* (generic events) or *events* (dates associated to an event name).

The module only includes one component, which can be used as is, or more probably taken as a starting point for further development using the Vis library API.

![Timeline](/assets/modules/vis-timeline/timeline.png)

## Import

Import this module in your `app.module.ts`.

```ts
import { VisTimelineModule } from '@sinequa/analytics/vis-timeline';

@NgModule({
  imports: [
    ...
    VisTimelineModule
```

Note that if you need to use the Vis Timeline library directly (without using our wrapper module), you can simply import the `VisModule` as follow:

```ts
import {VisModule} from "ngx-vis";

@NgModule({
  imports: [
    ...
    VisModule
```

In any case you will also need to import the following stylesheet in your app's global stylesheet:

```scss
// Vis.js styles
@import "~vis-timeline/dist/vis-timeline-graph2d.min.css";
```

## Timeline Component


### Basic usage

The `sq-result-timeline` component displays a timeline associated to a specific `Record` object. This record must have at least one column storing a list of "dates" or "events".

If this column is named `'dates'`, a sample usage could be as follow:

```html
<sq-result-timeline [record]="record" [dates]="record['dates']"></sq-result-timeline>
```

### Dates and Events

A **date** can be a JavaScript [`Date`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date) object, or a formatted string which can be parsed automatically by the [date-fns library](https://date-fns.org/) (which is used internally). For example `"2020-12-03"` or `"2020-12"` qualify as dates. A Sinequa index can store such a list of dates within a CSV or Entity column.

An **event** is a date associated to an event name. The association is done by formatting the field as `(Event name)#(Date)`, which is the standard format of cooccurrence normalization in the Sinequa platform. For example, the event `(Birthday)#(2021-04-24)` can be extracted from documents with a cooccurrence associating two entities: One for the event names (eg. a whitelist entity) and one for the dates (eg. a TMA entity).

⚠️ Note that you may have other type of data to display on this timeline. Rather than trying to awkwardly coax your data into the data structures that this component expect, we recommend you to create your own component using the [Vis](https://visjs.org/) and [ngx-vis](https://github.com/visjs/ngx-vis) APIs. In particular the `[visTimeline]` directive and `VisTimelineService` to listen to user events, like clicks on the dates and events. Both the directive and service are packaged in the Sinequa library and can be imported with: `import {VisTimelineDirective, VisTimelineService} from '@sinequa/analytics/vis-timeline';`

### List of Inputs

The `sq-result-timeline` component accepts the following inputs:

- `record` (required): The object of type `Record` which contains the dates to display.
- `dates` (optional): The column of the `record` object which contains the dates to display (eg. `record['dates']`).
- `events` (optional): The column of the `record` object which contains the events to display (eg. `record['events']`).
- `min_year` and `max_year` (defaults: `0` and `10000`): Min and max years to filter out the date and event outliers.
- `min_dates` and `max_dates` (defaults: `1` and `100`): Min and max number of dates or events to display.
- `options`: an object of type [`TimelineOptions`](https://visjs.github.io/vis-timeline/docs/timeline/#Configuration_Options) containing the configuration of the Vis Timeline. The default options are as follow:

    ```ts
    export const defaultOptions : TimelineOptions = {
        minHeight : '150px',
        margin: {
            axis: 5,
            item: 5
        }
    };
    ```
