import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AbstractFacet, FacetService } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { Results, Record } from '@sinequa/core/web-services';

import { darkStyle } from "./dark-style";
import { GoogleMapsService } from './googlemaps.service';
import { SelectionService } from '@sinequa/components/selection';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ContentChild } from '@angular/core';
import { Query } from '@sinequa/core/app-utils';

export interface GeoRecord {
  position: google.maps.LatLngLiteral;
  options: google.maps.MarkerOptions;
  record: Record;
}

@Component({
  selector: "sq-googlemaps",
  templateUrl: "./map.component.html"
})
export class MapComponent extends AbstractFacet implements OnChanges, OnDestroy {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ContentChild(TemplateRef) infoWindowsTpl?: TemplateRef<any>;

  map?: google.maps.Map;

  /** Name of the map used as an identifier for the facet, to associate its selects */
  @Input() name = "map";
  /** Results list displayed on the map when possible */
  @Input() results: Results;
  @Input() query?: Query;
  /** Desired width of the map */
  @Input() width = 300;
  /** Desired height of the map */
  @Input() height = 300;
  /** Default position of the map */
  @Input() center: google.maps.LatLngLiteral = { lat: 35, lng: -30 };
  /** Name of the field storing the latitude as a decimal number */
  @Input() latitudeField = "latitude";
  /** Name of the field storing the longitude as a decimal number */
  @Input() longitudeField = "longitude";
  /** Minimum size to auto fit in meters */
  @Input() minFit = 1000;
  /** Map style (light or dark are supported) */
  @Input() style = "light";
  /** Event emitter that emits a Record object when the marker of that record is clicked by the user */
  @Output() recordClicked = new EventEmitter<Record>();

  options: google.maps.MapOptions;

  /** Filtered list of records, keeping only the geolocated records */
  geoRecords: GeoRecord[] = [];
  clickedRecord: Record | undefined;

  // Actions for selecting an area on the map, and clearing that selection
  filterArea: Action;
  clearFilters: Action;

  sub: Subscription;

  constructor(
    public selectionService: SelectionService,
    public facetService: FacetService,
    public gmaps: GoogleMapsService
  ) {
    super();

    // Clear the current filters
    this.clearFilters = new Action({
      icon: "far fa-minus-square",
      title: "msg#facet.clearSelects",
      action: () => {
        this.facetService.clearFiltersSearch([this.latitudeField, this.longitudeField], true, this.query, this.name);
      }
    });

    // Filter the currently selected area
    this.filterArea = new Action({
      icon: "fas fa-search",
      title: "msg#googlemaps.filterArea",
      action: () => {
        if(this.map) {
          const bounds = this.map.getBounds();
          if(bounds) {
            const filter = this.gmaps.makeFilter(bounds, this.latitudeField, this.longitudeField);
            this.facetService.applyFilterSearch(filter, this.query, true, this.name);
          }
        }
      }
    });

    this.sub = this.selectionService.events.subscribe(() => {
      for(let rec of this.geoRecords) {
        // Regenerate the marker styles depending on their selection state
        rec.options = this.getMarkerOptions(rec.record);
      }
    });
  }

  override get actions(): Action[] {
    const actions = [] as Action[];
    if (this.facetService.hasFiltered([this.latitudeField, this.longitudeField], this.query)) {
      actions.push(this.clearFilters);
    }
    if (this.map) {
      actions.push(this.filterArea);
    }
    return actions;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['results']) {
      this.updateGeoRecords();
      this.infoWindow?.close();
    }

    if (changes['style']) {
      this.options = {
        styles: this.style === "dark" ? darkStyle : undefined
      };
    }

    this.fitBounds();
  }

  init(map: google.maps.Map) {
    this.map = map;
    this.fitBounds();
  }

  updateGeoRecords() {
    this.geoRecords = this.results?.records
      .filter(r => r[this.latitudeField] && r[this.longitudeField])
      .map(record => ({
        position: {
          lat: record[this.latitudeField],
          lng: record[this.longitudeField]
        },
        options: this.getMarkerOptions(record),
        record
      })) || [];
  }

  getMarkerOptions(record: Record): google.maps.MarkerOptions {
    return {opacity: record.$selected? 1 : 0.65, title: record.title}
  }

  fitBounds() {
    if(this.map && this.geoRecords.length) {
      var bounds = new google.maps.LatLngBounds();
      for (let record of this.geoRecords) {
        bounds.extend(record.position);
      }
      const center = bounds.getCenter();
      bounds.extend(this.gmaps.move(center, this.minFit*0.5, this.minFit*0.5));
      bounds.extend(this.gmaps.move(center, -this.minFit*0.5, -this.minFit*0.5));
      this.map?.fitBounds(bounds);
    }
  }

  // Manage map interactions (avoid multiple opened info windows)

  onMapClick(event: Event) {
    this.infoWindow.close();
  }

  onMarkerClick(event: Event, marker: MapMarker, record: GeoRecord) {
    // Toggle selection except if we focus an previously selected record
    if(!record.record.$selected || record.record === this.clickedRecord) {
      this.recordClicked.next(record.record);
    }
    this.infoWindow.open(marker);
    this.clickedRecord = record.record;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
