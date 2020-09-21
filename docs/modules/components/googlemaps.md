---
layout: default
title: Google Maps
parent: Components
grand_parent: Modules
nav_order: 21
---

# Google Maps Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/GoogleMapsModule.html) auto-generated from source code.

Also checkout the official documentation of the [Angular Google Maps](https://angular-maps.com/) library.

## Features

[Angular Google Maps](https://angular-maps.com/) is a library that allows a simple integration of a map (with markers, info windows, zooming & panning interactions, etc.) in Angular applications.

This module includes a single component which uses [Angular Google Maps](https://angular-maps.com/) to display geolocated records from the Sinequa index. The component needs the records to have mono-valued latitude and longitude fields.

![Chart]({{site.baseurl}}assets/modules/googlemaps/map.png){: .d-block .mx-auto }

## Import

Import this module in your `app.module.ts`. Also import the Angular Google Maps module to include your Google Maps API key:

```ts
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@sinequa/components/googlemaps';

@NgModule({
  imports: [
    ...
    GoogleMapsModule,
    AgmCoreModule.forRoot({
        apiKey: "xxxxxxxxxxxxxxxxxx" // Replace with your own Google Maps API key
    }),
```

## Map component

The map component is a facet component (See [Facet Module](facet.html)), which means it is best used when integrated in a facet card:

```html
<sq-facet-card [icon]="'fas fa-globe-americas'" [title]="'Map'">
    <sq-googlemaps #facet [results]="results" [height]="500"></sq-googlemaps>
</sq-facet-card>
```

The component looks through the list of records (`results.records`), filtering geolocated documents. Such documents must have a "latitude" and "longitude" fields (ie. `record['latitude']`). The name of these fields can be customized by binding the `latitudeField` and `longitudeField` inputs. For example:

```html
<sq-googlemaps #facet [results]="results" [height]="500" [latitudeField]="'sourcedouble1'" [latitudeField]="'sourcedouble2'"></sq-googlemaps>
```

(Of course, it is rather recommended to define **aliases** for these columns in the Query Web Service configuration.)

The component displays each geolocated record as a pin on the map, and automatically tries to fit the viewport to these pins. When the user clicks on a pin, an info-window is displayed with the title of that document, and an event is emitted with the corresponding `Record` object.

![Info window]({{site.baseurl}}assets/modules/googlemaps/infowindows.png){: .d-block .mx-auto }

This event can be captured by the parent:

```html
<sq-googlemaps #facet [results]="results" [height]="500" (recordClicked)="onRecordClicked($event)"></sq-googlemaps>
```

Finally, the component displays a "Filter" action in the facet header. When clicked, a selection is created to filter documents falling inside the current bounds of the map.

![Filter]({{site.baseurl}}assets/modules/googlemaps/filter.png){: .d-block .mx-auto }

The selection is expressed as a simple rectangle:

```sql
latitude > minLat AND latitude < maxLat AND longitude > minLng AND longitude < maxLng
```

This approach works fine for simple use cases, but has some limitations:

- When the searched area is very large, the bounds of the map can be very different from a rectangle, due to the sphericity of Earth.
- When searching around the poles or over the [anti-meridian](https://en.wikipedia.org/wiki/180th_meridian), the equation above should be adapted.
- This only works for mono-valued coordinates. If a document had multiple geographic locations attached to it, a different approach is needed.

Sinequa does provide the capabilities to overcome these limitations and enable many more advanced geographical feature, using an [engine plugin](https://github.com/sinequa/plugins/tree/master/GeoSearch).

## Going Further

This component is a simple **example** of integration of Google Maps within a Sinequa SBA. It is very likely that additional functionalities will be needed for specific projects.

We recommend copying the component's source code into your project and adapting it to your precise needs.
