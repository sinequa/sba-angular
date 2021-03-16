import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";

import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

import {UtilsModule} from "@sinequa/components/utils";
import {BsAutocompleteModule} from "@sinequa/components/autocomplete";

import {BsAdvancedFormCheckbox} from "./advanced-form-checkbox/advanced-form-checkbox";
import {BsAdvancedFormRange} from "./advanced-form-range/advanced-form-range";
import {BsAdvancedFormSelect} from "./advanced-form-select/advanced-form-select";
import { BsAdvancedFormMultiInput } from './advanced-form-multi-input/advanced-form-multi-input';
import { BsAdvancedFormInput } from './advanced-form-input/advanced-form-input';
import { BsDatePicker } from './advanced-form-range/date-picker/date-picker';
import { BsDateRangePicker } from './advanced-form-range/date-range-picker/date-range-picker';
import { BsSelectComponent } from './advanced-form-select/select/select';

// Directives
import {BsAdvancedFormAutocomplete} from "./advanced-form-autocomplete.directive";
import {BsAdvancedFormValidation} from "./advanced-form-validation.directive";
import { BsAdvancedFormAutocompleteMultiInput } from './advanced-form-multi-input/advanced-form-autocomplete-multi-input.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        IntlModule,

        // ngx-bootstrap
        BsDatepickerModule.forRoot(),

        UtilsModule,
        BsAutocompleteModule
    ],
    declarations: [
        BsAdvancedFormCheckbox,
        BsAdvancedFormInput,
        BsAdvancedFormRange,
        BsAdvancedFormSelect,
        BsAdvancedFormMultiInput,
        BsDatePicker,
        BsDateRangePicker,
        BsSelectComponent,

        BsAdvancedFormAutocompleteMultiInput,
        BsAdvancedFormAutocomplete,
        BsAdvancedFormValidation,
    ],
    exports: [
        BsAdvancedFormCheckbox,
        BsAdvancedFormInput,
        BsAdvancedFormRange,
        BsAdvancedFormSelect,
        BsAdvancedFormMultiInput,
        BsDatePicker,
        BsDateRangePicker,
        BsSelectComponent,

        BsAdvancedFormAutocompleteMultiInput,
        BsAdvancedFormAutocomplete,
        BsAdvancedFormValidation,
    ]
})
export class BsAdvancedModule {
}
