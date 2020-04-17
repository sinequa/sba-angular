import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";
import {UtilsModule} from "@sinequa/components/utils";

import {BsModalModule} from "@sinequa/components/modal";

import {BsAutocompleteModule} from "@sinequa/components/autocomplete";

import {LabelPipe} from "./label.pipe";
import {Labels} from "./labels.component";
import {ResultLabels} from "./result-labels.component";
import {LabelsAutocomplete} from "./labels-autocomplete.directive";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        CommonModule,

        IntlModule,
        ValidationModule,

        UtilsModule,
        BsModalModule,
        BsAutocompleteModule,
    ],
    declarations: [
        LabelPipe, Labels, ResultLabels, LabelsAutocomplete
    ],
    exports: [
        LabelPipe, Labels, ResultLabels, LabelsAutocomplete
    ],
})
export class LabelsModule {
}
