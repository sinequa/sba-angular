import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AppService, ValueItem} from "@sinequa/core/app-utils";
import {CCColumn, Aggregation, AggregationItem} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {Subscription} from "rxjs";
import {FirstPageService} from "@sinequa/components/search";

@Component({
    selector: "sq-advanced-form-select",
    templateUrl: "./advanced-form-select.html",
})
export class BsAdvancedFormSelect implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() field: string;
    /** Optional label: the component looks for the label in the Query web service configuration for the given field */
    @Input() label: string;
    /** Whether the component supports multiple selection */
    @Input() multiple: boolean;
    /** Optional input. The component automatically looks for an aggregation with the name equal to the field */
    @Input() aggregation: string;

    column: CCColumn | undefined;
    items: ValueItem[];

    private _valueChangesSubscription: Subscription;

    constructor(
        private appService: AppService,
        private firstPageService: FirstPageService) {
    }

    ngOnInit() {
        const control = this.form.get(this.field);
        if(!control) {
            throw new Error("No control in search-form named "+this.field);
        }
        this.column = this.appService.getColumn(this.field);
        this.items = this.getItems();
        if(this.label === undefined) {
            if(this.multiple) {
                this.label = this.appService.getPluralLabel(this.field);
            }
            else {
                this.label = this.appService.getLabel(this.field);
            }
        }
    }

    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }

    private getItems(): ValueItem[] {
        const firstPage = this.firstPageService.firstPage;
        if (firstPage) {
            // Find aggregation for field
            const condition = (this.aggregation) ?
                (aggr: Aggregation) => Utils.eqNC(aggr.name, this.aggregation) :
                (aggr: Aggregation) => this.column && Utils.eqNC(aggr.column, this.column.name);
            const aggregation = firstPage.aggregations.find(condition);

            if (aggregation && aggregation.items) {
                return aggregation.items
                .filter(
                    (item) => !Utils.isArray(item.value) && !!item.value
                )
                .map(
                    (item: AggregationItem) => (
                        {
                            value: item.value,
                            display: item.display ? item.display : item.value.toString()
                        }
                    )
                );
            }
        }
        return [];
    }
}
