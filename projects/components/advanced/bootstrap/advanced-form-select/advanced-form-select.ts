import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {FormGroup, AbstractControl} from "@angular/forms";
import {AppService} from "@sinequa/core/app-utils";
import {CCColumn, Aggregation} from "@sinequa/core/web-services";
import {Utils, NameValueArrayView, NameValueArrayViewHelper, FieldValue} from "@sinequa/core/base";
import {Subscription} from "rxjs";
import {FirstPageService} from "@sinequa/components/search";
import { AdvancedSelect } from '../../advanced.service';
import { SelectOptions } from './select/select';

@Component({
    selector: "sq-advanced-form-select",
    templateUrl: "./advanced-form-select.html",
})
export class BsAdvancedFormSelect implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() config: AdvancedSelect;
    control: AbstractControl | null;
    column: CCColumn | undefined;
    name: string;
    label: string;

    options: SelectOptions;
    selectedValues: FieldValue[]; //selected item value list

    private _valueChangesSubscription: Subscription;

    constructor(
        private appService: AppService,
        private firstPageService: FirstPageService) {
    }

    ngOnInit() {
        this.name = this.config.name;
        this.control = this.form.get(this.name);
        this.column = this.appService.getColumn(this.config.field);
        this.options = {
            disabled: this.control?.disabled,
            multiple: Utils.isUndefined(this.config.multiple) || this.config.multiple,
            items: this.getItems()
        };
        this.label = this.config.label;
        this.selectedValues = [];

        if (this.control) {
            this._valueChangesSubscription = this.control.valueChanges.subscribe(value => this.selectedValues = value || []);
        }
    }

    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }

    private getItems(): NameValueArrayView<string, any> {
        if (this.config.list) {
            const cclist = this.appService.getList(this.config.list);
            if (cclist) {
                return NameValueArrayViewHelper.fromObjects(cclist.items, "name", "value");
            }
        }

        const firstPage = this.firstPageService.firstPage;
        if (firstPage) {
            // Find aggregation for field
            const condition = (this.config.aggregation) ?
                (aggr: Aggregation) => Utils.eqNC(aggr.name, this.config.aggregation) :
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
