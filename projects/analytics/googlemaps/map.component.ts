import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AgmInfoWindow } from '@agm/core'
;
import { AbstractFacet, FacetService } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';

import { ExprBuilder } from '@sinequa/core/app-utils';
import { Results, Record } from '@sinequa/core/web-services';

import { darkStyle } from "./dark-style";

@Component({
    selector: "sq-googlemaps",
    templateUrl: "./map.component.html"
})
export class MapComponent extends AbstractFacet implements OnChanges {
    /** Name of the map used as an identifier for the facet, to associate its selects */
    @Input() name = "map";
    /** Results list displayed on the map when possible */
    @Input() results: Results;
    /** Desired height of the map */
    @Input() height = 300;
    /** Name of the field storing the latitude as a decimal number */
    @Input() latitudeField = "latitude";
    /** Name of the field storing the longitude as a decimal number */
    @Input() longitudeField = "longitude";
    /** Map style (light or dark are supported) */
    @Input() style = "light";
    /** Event emitter that emits a Record object when the marker of that record is clicked by the user */
    @Output() recordClicked = new EventEmitter<Record>();

    /** Filtered list of records, keeping only the geolocated records */
    geoRecords: Record[] = [];
    /** Mode for fitting the map to its contained markers */
    fitBounds: google.maps.LatLngBoundsLiteral | boolean;

    // Actions for selecting an area on the map, and clearing that selection
    filterArea: Action;
    clearFilters: Action;

    /** Bounds of the map updated on initialization and user interaction */
    bounds: google.maps.LatLngBounds;
    /** Currently opened info window, which can be closed when another window is closed */
    openedWindow?: AgmInfoWindow;

    /** Styles of the map if any */
    mapStyles: any;

    constructor(
        public searchService: SearchService,
        public facetService: FacetService,
        public exprBuilder: ExprBuilder
    ){
        super();
        
        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.searchService.query.removeSelect(this.name);
                this.searchService.search();
            }
        });

        // Filter the currently selected area
        this.filterArea = new Action({
            icon: "fas fa-search",
            title: "msg#googlemaps.filterArea",
            action: () => {
                if(this.facetService.hasFiltered(this.name)) {
                    this.searchService.query.removeSelect(this.name);
                }
                const minLat = this.bounds.getSouthWest().lat();
                const maxLat = this.bounds.getNorthEast().lat();
                const minLng = this.bounds.getSouthWest().lng();
                const maxLng = this.bounds.getNorthEast().lng();
                const expr = this.exprBuilder.concatAndExpr([
                    this.exprBuilder.makeNumericalExpr(this.latitudeField, '>=', minLat),
                    this.exprBuilder.makeNumericalExpr(this.latitudeField, '<=', maxLat),
                    this.exprBuilder.makeNumericalExpr(this.longitudeField, '>=', minLng),
                    this.exprBuilder.makeNumericalExpr(this.longitudeField, '<=', maxLng)
                ]);
                this.searchService.query.addSelect(expr, this.name);
                this.searchService.search();
            }
        });
    }

    get actions(): Action[] {
        const actions = [] as Action[];
        if(this.facetService.hasFiltered(this.name)) {
            actions.push(this.clearFilters);
        }
        if(this.bounds) {
            actions.push(this.filterArea);
        }
        return actions;
    }

    ngOnChanges(changes: SimpleChanges) {

        if(changes['results']) {
            if(this.results) {
                this.geoRecords = this.results.records.filter(r => !!r[this.latitudeField]);
            }
            this.closeWindow();
        }

        if(changes['style']) {
            this.mapStyles = this.style === "dark"? darkStyle : undefined;
        }

        // If no document, the view shows a default latitude / longitude
        if(this.geoRecords.length === 0) {
            this.fitBounds = false;
        }
        // If multiple documents, the view is centered around them, at the right scale
        else if(this.geoRecords.length > 1) {
            this.fitBounds = true;
        }
        else {
            // Custom bounds centered around the single geo record in the results
            this.fitBounds = {
                east: this.geoRecords[0][this.longitudeField] + 0.02,
                north: this.geoRecords[0][this.latitudeField] + 0.02,
                south: this.geoRecords[0][this.latitudeField] - 0.02,
                west: this.geoRecords[0][this.longitudeField] - 0.02
            };
        }
    }

    closeWindow() {
        if(this.openedWindow) {
            this.openedWindow.close();
            this.openedWindow = undefined;
        }
    }


    // Manage map interactions (avoid multiple opened info windows)

    onMapClick(event: Event) {
        this.closeWindow();
    }

    onMarkerClick(event: Event, record: Record, infoWindow?: AgmInfoWindow) {
        this.closeWindow();
        this.openedWindow = infoWindow;
        this.recordClicked.next(record);
    }

    onBoundsChange(bounds: google.maps.LatLngBounds) {
        this.bounds = bounds;
    }
}