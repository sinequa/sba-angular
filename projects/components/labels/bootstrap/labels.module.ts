import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";
import {BsSelectionModule} from "@sinequa/components/selection";
import {BsModalModule} from "@sinequa/components/modal";
import {BsActionModule} from "@sinequa/components/action";
import {BsAutocompleteModule} from "@sinequa/components/autocomplete";
import {LabelsModule} from "../labels.module";

import {BsRenameLabel} from "./rename-label/rename-label";
import {BsLabelsMenuComponent} from "./labels-menu/labels-menu.component";

import {LABELS_COMPONENTS, LabelsComponents} from "../labels.service";
import { BsDeleteLabel } from './delete-label/delete-label';
import { BsAddLabel } from './add-label/add-label';
import { BsLabelsAutocompleteComponent } from './labels-autocomplete/labels-autocomplete.component';
import { BsEditLabel } from './edit-label/edit-label';

export const defaultLabelComponents: LabelsComponents = {
    labelsAutocompleteComponent: BsLabelsAutocompleteComponent,
    renameModal: BsRenameLabel,
    deleteModal: BsDeleteLabel,
    addModal: BsAddLabel,
    editModal: BsEditLabel
};

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        CommonModule,

        IntlModule,
        ValidationModule,

        UtilsModule,
        BsSelectionModule,
        BsModalModule,
        BsAutocompleteModule,
        BsActionModule,
        LabelsModule
    ],
    declarations: [
        BsLabelsAutocompleteComponent,
        BsRenameLabel,
        BsLabelsMenuComponent,
        BsDeleteLabel,
        BsAddLabel,
        BsEditLabel
    ],
    exports: [
        LabelsModule,
        BsLabelsAutocompleteComponent,
        BsRenameLabel,
        BsLabelsMenuComponent,
        BsDeleteLabel,
        BsAddLabel,
        BsEditLabel
    ],
    providers: [
        {provide: LABELS_COMPONENTS, useValue: defaultLabelComponents},
    ]
})
export class BsLabelsModule {
}
