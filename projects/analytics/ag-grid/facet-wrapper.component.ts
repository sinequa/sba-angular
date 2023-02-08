import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import { Component } from "@angular/core";
import { SqDatasource } from "./datasource";
import { Aggregation, Results } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";

@Component({
    selector: 'facet-wrapper',
    template: `
<sq-facet-list
    [results]="results"
    [aggregation]="aggregation.name"
    [searchable]="aggregation.$hasMore"
    [alwaysShowSearch]="aggregation.$hasMore"
    name="ag-grid-{{field}}">
</sq-facet-list>
    `,
    styles: [`
sq-facet-list {
    display: block;
    width: 200px;
}

:is(sq-facet-list) ::ng-deep .list-group > div.pb-2 {
    padding-bottom: 0.25rem!important;
    padding-top: 0.25rem!important;
}
   `]
})
export class FacetWrapperComponent {
    params: IFilterParams;

    field: string;
    aggregation: Aggregation;

    get datasource(): SqDatasource {
        return this.params.rowModel['datasource'];
    }

    get results(): Results {
        return this.datasource.latestResults;
    }

    agInit(params: IFilterParams): void {
        this.params = params;
        if(!this.params.colDef.field)
            throw Error("Column definitions need at least a field");
        this.field = this.params.colDef.field; // Field is the alias
        this.aggregation = this.results.aggregations.find(a => Utils.eqNC(this.field, a.column))!;
        if(!this.aggregation)
            throw Error(`An aggregation needs to be defined for '${this.field}' to display a facet`);
    }

    isFilterActive(): boolean {
        return this.aggregation.$filtered.length > 0;
    }

    // Not called in infinite row model setup
    doesFilterPass(params: IDoesFilterPassParams): boolean {
        return true;
    }

    getModel() {
        return this.isFilterActive()? {facetActive: true} : undefined;
    }

    setModel(model: any) {
    }

}
