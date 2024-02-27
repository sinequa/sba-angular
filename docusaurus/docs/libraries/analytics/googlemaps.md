---
layout: default
title: Google Maps Module
parent: Analytics
grand_parent: Libraries
nav_order: 5
---

# Google Maps Module

This module is an integration of the [Angular Google Maps](https://github.com/angular/components/tree/main/src/google-maps) library.

## Features

[Angular Google Maps](https://github.com/angular/components/tree/main/src/google-maps) is an official Angular library that allows to integrate a Google Map component (with markers, info windows, zooming & panning interactions, etc.) in Angular applications.

This Sinequa module wraps this component and uses it to display geolocated records from the Sinequa index. The component needs the records to have mono-valued latitude and longitude fields.

![Chart](/assets/modules/googlemaps/map.png)

## Import

Import this module in your `app.module.ts`. Also import the Angular Google Maps module to include your Google Maps API key:

```ts
import { GoogleMapsModule, GOOGLE_MAPS_API_KEY } from '@sinequa/analytics/googlemaps';

@NgModule({
  imports: [
    ...
    GoogleMapsModule
  ],
  ...,
  providers: [
    ...,
    {provide: GOOGLE_MAPS_API_KEY, useValue: "<YOUR GOOGLE MAPS API KEY HERE>"}
  ]
```

Note that the component will be displayed even if you don't provide an API key, but it cannot be used in production.

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enGooglemaps} from "@sinequa/analytics/googlemaps";

const messages = Utils.merge({}, ..., enGooglemaps, appMessages);
```

## Map component


The map component is a facet component (See [Facet Module](//libraries/components/facet.html)), which means it is best used when integrated in a facet card:

```html
<sq-facet-card [icon]="'fas fa-globe-americas'" [title]="'Map'">
    <sq-googlemaps #facet [results]="results" [width]="500" [height]="300"></sq-googlemaps>
</sq-facet-card>
```

The component looks through the list of records (`results.records`), filtering geolocated documents. Such documents must have a "latitude" and "longitude" fields (ie. `record['latitude']`). The name of these fields can be customized by binding the `latitudeField` and `longitudeField` inputs. For example:

```html
<sq-googlemaps #facet [results]="results" [latitudeField]="'sourcedouble1'" [latitudeField]="'sourcedouble2'"></sq-googlemaps>
```

(Of course, it is rather recommended to define **aliases** for these columns in the Query Web Service configuration.)

The component displays each geolocated record as a pin on the map, and automatically tries to fit the viewport to these pins. When the user clicks on a pin, an info-window is displayed with the title of that document, and an event is emitted with the corresponding `Record` object.

![Info window](/assets/modules/googlemaps/infowindows.png)

This event can be captured by the parent:

```html
<sq-googlemaps #facet [results]="results" (recordClicked)="onRecordClicked($event)"></sq-googlemaps>
```

Finally, the component displays a "Filter" action in the facet header. When clicked, a selection is created to filter documents falling inside the current bounds of the map.

![Filter](/assets/modules/googlemaps/filter.png)

The selection is expressed as a simple rectangle:

```sql
latitude > minLat AND latitude < maxLat AND longitude > minLng AND longitude < maxLng
```

This approach works fine for simple use cases, but has some limitations:

- When the searched area is very large, the bounds of the map can be very different from a rectangle, due to the sphericity of Earth.
- When searching around the poles or over the [anti-meridian](https://en.wikipedia.org/wiki/180th_meridian), the equation above should be adapted.
- This only works for mono-valued coordinates. If a document had multiple geographic locations attached to it, a different approach is needed.

Sinequa does provide the capabilities to overcome these limitations and enable many more advanced geographical feature, using an [engine plugin](https://github.com/sinequa/plugins/tree/master/GeoSearch).

## Additional Options

### Customizing the info windows templates

It is possible to pass a `ng-template` to the component (by transclusion), to customize the HTML displayed in the popups showed when clicking on a marker.

```html
<sq-googlemaps [results]="results">
  <ng-template let-record>
    Hello world: {{record?.title}}
  </ng-template>
</sq-googlemaps>
```

### Minimum auto-fit size

It is possible to customize the minimum distance down to which the component will zoom to fit the markers. In particular, when only a single marker is displayed, we want to avoid zooming on it with the maximum resolution supported by Google Maps.

In the example below, this minimum size is set to 10km.

```html
<sq-googlemaps [results]="results" [minFit]="10000">
</sq-googlemaps>
```

## Going Further

This component is a simple **example** of integration of Google Maps within a Sinequa SBA. It is very likely that additional functionalities will be needed for specific projects.

We recommend copying the component's source code into your project and adapting it to your precise needs.
