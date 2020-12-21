import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AppService} from "@sinequa/core/app-utils";
import {CCColumn, Aggregation} from "@sinequa/core/web-services";
import {Utils, NameValueArrayView, NameValueArrayViewHelper, FieldValue} from "@sinequa/core/base";
import {Subscription} from "rxjs";
import {FirstPageService} from "@sinequa/components/search";
import { SelectOptions } from './select/select';

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
    /** Optional input. The component automatically looks for an aggretion with the name equal to the field */
    @Input() aggregation: string;
    /** Gets a list defined on the server (deprecated) */
    @Input() list: string;
    column: CCColumn | undefined;

    options: SelectOptions;
    selectedValues: FieldValue[]; //selected item value list

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
        this.options = {
            disabled: control?.disabled,
            multiple: !!this.multiple,
            items: this.getItems()
        };
        if(this.label === undefined) {
            if(this.multiple) {
                this.label = this.appService.getPluralLabel(this.field);
            }
            else {
                this.label = this.appService.getLabel(this.field);
            }
        }
        this.selectedValues = [];

        if (control) {
            this._valueChangesSubscription = control.valueChanges.subscribe(value => this.selectedValues = value || []);
        }
    }

    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }

    private getItems(): NameValueArrayView<string, any> {
        if (this.list) {
            const cclist = this.appService.getList(this.list);
            if (cclist) {
                return NameValueArrayViewHelper.fromObjects(cclist.items, "name", "value");
            }
        }

        const firstPage = this.firstPageService.firstPage;
        if (firstPage) {
            // Find aggregation for field
            const condition = (this.aggregation) ?
                (aggr: Aggregation) => Utils.eqNC(aggr.name, this.aggregation) :
                (aggr: Aggregation) => this.column && Utils.eqNC(aggr.column, this.column.name);
            const aggregation = firstPage.aggregations.find(condition);

            if (aggregation && aggregation.items) {
                let nameKey = "display";
                const valueKey = "value";
                // If first item does not have a name field, use the value field as a name
                if (aggregation.items.length > 0 && (!aggregation.items[0][nameKey])) {
                    nameKey = valueKey;
                }
                return NameValueArrayViewHelper.fromObjects<{[k: string]: any}>(aggregation.items, nameKey, valueKey);
            }
        }
        return NameValueArrayViewHelper.fromArray([]);
    }
}
