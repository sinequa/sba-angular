import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import { Component } from "@angular/core";
import { SqDatasource } from "./datasource";
import { Aggregation, Results } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { FacetService } from "@sinequa/components/facet";

@Component({
   selector: 'facet-wrapper',
   template: `
<sq-facet-tree *ngIf="isTree" [results]="results" [name]="name" [aggregation]="aggregationName" [searchable]="true" [displayActions]="true"></sq-facet-tree>
<sq-facet-list *ngIf="!isTree" [results]="results" [name]="name" [aggregation]="aggregationName" [searchable]="true" [displayActions]="true"></sq-facet-list>
   `,
   styles: [`
sq-facet-list, sq-facet-tree {
    display: block;
    width: 200px;
}

sq-facet-list ::ng-deep .list-group > div.pb-2, sq-facet-tree ::ng-deep .list-group > div.pb-2 {
    padding-bottom: 0.25rem!important;
    padding-top: 0.25rem!important;
}
   `]
})
export class FacetWrapperComponent {
    params: IFilterParams;

    field: string;
    isTree: boolean;
    aggregationName: string;
    name: string;

    get datasource(): SqDatasource {
        return this.params.rowModel['datasource'];
    }

    get results(): Results {
        return this.datasource.latestResults;
    }

    get aggregation(): Aggregation | undefined {
        return this.results.aggregations.find(a => {
            const col = this.appService.getColumn(a.column);
            const alias = this.appService.getColumnAlias(col);
            return Utils.eqNC(alias, this.field);
        });
    }

    get appService(): AppService {
        return this.datasource.appService;
    }

    get facetService(): FacetService {
        return this.datasource.facetService;
    }
    
    agInit(params: IFilterParams): void {
        this.params = params;
        if(!this.params.colDef.field)
            throw Error("Column definitions need at least a field");
        this.field = this.params.colDef.field; // Field is the alias
        this.isTree = this.appService.isTree(this.field);
        const agg = this.aggregation?.name;
        if(!agg)
            throw Error(`An aggregation needs to be defined for '${this.field}' to display a facet`);
        this.aggregationName = agg;
        this.name = "grid-filter-"+this.field;
        console.log("agInit called ", this.name);
    }

    isFilterActive(): boolean {
        return this.facetService.hasFiltered(this.name);
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