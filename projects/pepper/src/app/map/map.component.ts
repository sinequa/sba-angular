import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Results, Record } from '@sinequa/core/web-services';
import { AbstractFacet, FacetService } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { AgmInfoWindow } from '@agm/core';
import { SearchService } from '@sinequa/components/search';

@Component({
    selector: "sq-googlemaps",
    templateUrl: "./map.component.html"
})
export class MapComponent extends AbstractFacet implements OnChanges {
    @Input() name = "map";
    @Input() results: Results;
    @Input() height = 300;
    @Input() latitudeField = "latitude";
    @Input() longitudeField = "longitude";
    @Output() recordClicked = new EventEmitter<Record>();

    geoRecords: Record[] = [];
    fitBounds: google.maps.LatLngBoundsLiteral | boolean;

    filterArea: Action;
    clearFilters: Action;

    bounds: google.maps.LatLngBounds;
    openedWindow?: AgmInfoWindow;

    constructor(
        public searchService: SearchService,
        public facetService: FacetService
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
            title: "Filter documents in this area",
            action: () => {
                if(this.facetService.hasFiltered(this.name)) {
                    this.searchService.query.removeSelect(this.name);
                }
                const minLat = this.bounds.getSouthWest().lat();
                const maxLat = this.bounds.getNorthEast().lat();
                const minLng = this.bounds.getSouthWest().lng();
                const maxLng = this.bounds.getNorthEast().lng();
                const expr = `${this.latitudeField}:>=${minLat} AND ${this.latitudeField}:<=${maxLat} AND ${this.longitudeField}:>=${minLng} AND ${this.longitudeField}:<=${maxLng}`
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

    onMapClick(event) {
        this.closeWindow();
    }

    onMarkerClick(event, record: Record, infoWindow?: AgmInfoWindow) {
        this.closeWindow();
        this.openedWindow = infoWindow;
        this.recordClicked.next(record);
    }

    onBoundsChange(bounds) {
        this.bounds = bounds;
    }
}