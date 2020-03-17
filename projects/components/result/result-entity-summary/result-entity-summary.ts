import {Component, Input, OnChanges} from "@angular/core";
import {Record, CCColumn} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {SearchService} from "@sinequa/components/search";

export interface EntityValue {
    display: string;
    value: string;
    locations?: Number[];
    lengths?: Number[];
    originalLocations?: Number[];
    originalLengths?: Number[];
}

export interface EntityStats {
    highlight: string;
    column?: CCColumn;
    values: EntityValue[];
    expanded: boolean;
}

@Component({
    selector: "sq-result-entity-summary",
    templateUrl: "./result-entity-summary.html",
    styleUrls: ["./result-entity-summary.css"]
})
export class ResultEntitySummary implements OnChanges {
    @Input() record: Record;
    @Input() highlightedEntities: string[];

    entity_stats : EntityStats[];

    constructor(
        public searchService: SearchService,
        public appService: AppService) {
    }

    ngOnChanges(){
        
        this.entity_stats = [];

        this.highlightedEntities.forEach(highlight => {
            if(this.record[highlight]){
                this.entity_stats.push({
                    highlight: highlight,
                    column : this.appService.getColumn(highlight),
                    values : this.entityStats(this.record[highlight]),
                    expanded : false
                });
            }
        });
        
    }

    entityStats(raw_values : any[]) : EntityValue[]{
        return raw_values.map( value => {
            if(!!value['locations'] && !!value["originalLocations"]){
                let locations = value["locations"].split(',').map(l => +l);
                let originalLocations = value["originalLocations"].split(',').map(l => +l);
                return {
                    display : value["display"],
                    value : value["value"],
                    locations : locations.filter((v,i) => i % 2 == 0),
                    lengths : locations.filter((v,i) => i % 2 == 1),
                    originalLocations : originalLocations.filter((v,i) => i % 2 == 0),
                    originalLengths: originalLocations.filter((v,i) => i % 2 == 1),
                }
            }
            return value;
        });
    }

    entityClick(value : EntityValue, stat: EntityStats){
        this.searchService.addFieldSelect(stat.highlight, value);
        this.searchService.search();
    }

}