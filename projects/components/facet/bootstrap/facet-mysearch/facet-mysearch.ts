import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {MapOf} from "@sinequa/core/base";
import {AppService, Expr} from "@sinequa/core/app-utils";
import {Results, AdvancedValue, AdvancedValueWithOperator} from "@sinequa/core/web-services";
import {SearchService, BreadcrumbsItem} from "@sinequa/components/search";
import {AbstractFacet} from "../../abstract-facet";

@Component({
    selector: "sq-mysearch",
    templateUrl: "./facet-mysearch.html",
    styles:[`
    .badge{
        font-size: 90%;
    }
    `]
})
export class BsMySearch extends AbstractFacet implements OnChanges {
    @Input() results: Results;
    @Input() allowDeletion: boolean = true;
    @Input() displayFieldNames: boolean = true;
    advancedValues: MapOf<{value: AdvancedValue | AdvancedValueWithOperator, display: Expr | string}[]>;
    advancedFields: string[];

    constructor(
        public appService: AppService,
        public searchService: SearchService) {
            super();
    }

    getField(item: BreadcrumbsItem): string {
        if (item.expr) {
            if (item.expr.field) {
                return item.expr.field;
            }
            else {
                if (!item.expr.isStructured) {
                    return "text";
                }
                else {
                    let fields = item.expr.getFields();
                    return fields.join("-");
                }
            }
        }
        return "unknown";
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["results"]) {
            let advancedValues = this.searchService.query.getAdvancedValues();
            this.advancedFields = Object.keys(advancedValues);
            this.advancedValues = {};
            for (let key of this.advancedFields) {
                this.advancedValues[key] = advancedValues[key].map(value => ({
                    value: value,
                    display: this.searchService.query.getAdvancedValueExpr(this.appService, key, value)
                }));
            }
        }
    }

    removeAdvancedValue(field: string, value: AdvancedValue | AdvancedValueWithOperator): boolean {
        this.searchService.removeAdvanced(field, value);
        return false;
    }

    removeItem(item: BreadcrumbsItem): boolean {
        this.searchService.removeBreadcrumbsItem(item);
        return false;
    }
}