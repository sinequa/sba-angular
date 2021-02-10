import { Component, Input, OnChanges, OnDestroy } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { AppService } from "@sinequa/core/app-utils";
import { Utils } from '@sinequa/core/base';
import { Subscription } from 'rxjs';
import { AutocompleteItem } from '@sinequa/components/autocomplete';

@Component({
    selector: "sq-advanced-form-input",
    templateUrl: "./advanced-form-input.html"
})
export class BsAdvancedFormInput implements OnChanges, OnDestroy {
    @Input() form: FormGroup;
    @Input() field: string;
    @Input() suggestQuery: string;
    @Input() label: string;

    control: AbstractControl | null;
    viewValue: string | number | undefined | null;

    private _valueChangesSubscription: Subscription;

    constructor(public appService: AppService) {}

    ngOnChanges() {
        if(this.label === undefined) {
            this.label = this.appService.getLabel(this.field);
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            if (this.control.value) {
                this.viewValue = this.control.value.display
                    ? this.control.value.display
                    : this.control.value.value.toString();
            }

            this._valueChangesSubscription = Utils.subscribe(
                this.control.valueChanges,
                (val) => {
                  if (val) {
                      this.viewValue = val.display ? val.display : val.value.toString();
                  }
                }
            );
        }
        else {
            throw new Error("No form control named "+this.field);
        }
    }

    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }

    onItemChange(item: AutocompleteItem) {
        this.viewValue = item?.display;
        this._updateControl(item);
    }

    private _updateControl(item: AutocompleteItem): void {
        const value = item
        ? {
            value: item.normalized!,
            display: item.display
        } : undefined;
        this.control?.markAsDirty();
        this.control?.setValue(value, {emitEvent: false});
    }
}
