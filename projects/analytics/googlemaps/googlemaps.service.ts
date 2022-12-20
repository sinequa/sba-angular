import { InjectionToken } from "@angular/core";
import { Inject, Optional } from "@angular/core";
import { Injectable } from "@angular/core";
import { Loader } from "@googlemaps/js-api-loader"
import { Filter } from "@sinequa/core/web-services";
import { BehaviorSubject, from } from "rxjs";

export const GOOGLE_MAPS_API_KEY = new InjectionToken<string>("GOOGLE_MAPS_API_KEY");

@Injectable({providedIn: 'root'})
export class GoogleMapsService {

  ready = new BehaviorSubject(false);

  EARTH_RADIUS = 6366198.0;
  DEG_RAD = 180.0 / Math.PI;

  constructor(
    @Optional() @Inject(GOOGLE_MAPS_API_KEY) apiKey: string | undefined,
  ){
    const loader = new Loader({
      apiKey: apiKey || "",
    });

    from(
      loader.load().then(() => true)
    ).subscribe(this.ready);
  }

  makeFilter(bounds: google.maps.LatLngBounds, latitude: string, longitude: string, facetName: string): Filter {
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    return {
      operator: 'and',
      display: "Map Selection",
      facetName,
      filters: [
        {field: latitude, operator: 'between', start: sw.lat(), end: ne.lat()},
        {field: longitude, operator: 'between', start: sw.lng(), end: ne.lng()}
      ]
    };
  }


  move(startLL: google.maps.LatLng, toNorth: number, toEast: number): google.maps.LatLngLiteral {
    const lonDiff = this.meterToLongitude(toEast, startLL.lat());
    const latDiff = this.meterToLatitude(toNorth);
    return {lat: startLL.lat() + latDiff, lng: startLL.lng() + lonDiff};
  }

  private meterToLongitude(meterToEast: number, latitude: number): number {
    const latArc = latitude / this.DEG_RAD;
    const radius = Math.cos(latArc) * this.EARTH_RADIUS;
    return meterToEast / radius * this.DEG_RAD;
  }

  private meterToLatitude(meterToNorth: number): number {
    return meterToNorth / this.EARTH_RADIUS * this.DEG_RAD;
  }

}
