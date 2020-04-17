import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";

import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

import {UtilsModule} from "@sinequa/components/utils";
import {BsAutocompleteModule} from "@sinequa/components/autocomplete";
//import {SearchModule} from "@sinequa/components/search";

import {BsAdvanced} from "./advanced/advanced";
import {BsAdvancedForm} from "./advanced-form/advanced-form";
import {BsAdvancedFormCheckbox} from "./advanced-form-checkbox/advanced-form-checkbox";
import {BsAdvancedFormEntry} from "./advanced-form-entry/advanced-form-entry";
import {BsAdvancedFormMultiEntry} from "./advanced-form-multi-entry/advanced-form-multi-entry";
import {BsAdvancedFormRange} from "./advanced-form-range/advanced-form-range";
import {BsAdvancedFormSelect} from "./advanced-form-select/advanced-form-select";
import {BsDatePicker} from "./date-picker/date-picker";
import {BsDateRangePicker} from "./date-range-picker/date-range-picker";
import {BsSelectComponent} from "./select/select";
import {BsMultiEntryInput} from "./multi-entry-input/multi-entry-input";
import {BsNumericRangeInput} from "./numeric-range-input/numeric-range-input";

// Directives
import {BsAdvancedFormAutocomplete} from "./advanced-form-autocomplete.directive";
import {BsAdvancedFormValidation} from "./advanced-form-validation.directive";

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
        BsAdvanced,
        BsAdvancedForm,
        BsAdvancedFormCheckbox,
        BsAdvancedFormEntry,
        BsAdvancedFormMultiEntry,
        BsAdvancedFormRange,
        BsAdvancedFormSelect,
        BsDatePicker,
        BsDateRangePicker,
        BsSelectComponent,
        BsMultiEntryInput,
        BsNumericRangeInput,

        BsAdvancedFormAutocomplete,
        BsAdvancedFormValidation,
    ],
    exports: [
        BsAdvanced,
        BsAdvancedForm,
        BsAdvancedFormCheckbox,
        BsAdvancedFormEntry,
        BsAdvancedFormMultiEntry,
        BsAdvancedFormRange,
        BsAdvancedFormSelect,
        BsDatePicker,
        BsDateRangePicker,
        BsSelectComponent,
        BsMultiEntryInput,
        BsNumericRangeInput,

        BsAdvancedFormAutocomplete,
        BsAdvancedFormValidation,
    ]
})
export class BsAdvancedModule {
}