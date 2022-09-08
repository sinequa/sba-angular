import { InjectionToken } from "@angular/core";
import { Inject, Optional } from "@angular/core";
import { Injectable } from "@angular/core";
import { Loader } from "@googlemaps/js-api-loader"
import { ExprBuilder } from "@sinequa/core/app-utils";
import { BehaviorSubject, from } from "rxjs";

export const GOOGLE_MAPS_API_KEY = new InjectionToken<string>("GOOGLE_MAPS_API_KEY");

@Injectable({providedIn: 'root'})
export class GoogleMapsService {

  ready = new BehaviorSubject(false);

  EARTH_RADIUS = 6366198.0;
  DEG_RAD = 180.0 / Math.PI;

  constructor(
    public exprBuilder: ExprBuilder,
    @Optional() @Inject(GOOGLE_MAPS_API_KEY) apiKey: string | undefined,
  ){
    const loader = new Loader({
      apiKey: apiKey || "",
    });

    from(
      loader.load().then(() => true)
    ).subscribe(this.ready);
  }

  makeExpr(bounds: google.maps.LatLngBounds, latitude: string, longitude: string) {
    const minLat = bounds.getSouthWest().lat();
    const maxLat = bounds.getNorthEast().lat();
    const minLng = bounds.getSouthWest().lng();
    const maxLng = bounds.getNorthEast().lng();
    return this.exprBuilder.concatAndExpr([
      this.exprBuilder.makeNumericalExpr(latitude, '>=', minLat),
      this.exprBuilder.makeNumericalExpr(latitude, '<=', maxLat),
      this.exprBuilder.makeNumericalExpr(longitude, '>=', minLng),
      this.exprBuilder.makeNumericalExpr(longitude, '<=', maxLng)
    ]);
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
