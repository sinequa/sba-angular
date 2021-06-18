import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {BsAdvancedModule} from "@sinequa/components/advanced";
import {BsAutocompleteModule} from "@sinequa/components/autocomplete";
import {UtilsModule} from "@sinequa/components/utils";
import {IntlModule} from "@sinequa/core/intl";

import {AutocompleteExtended} from "./search-form/autocomplete-extended.directive";
import {SearchFormComponent} from "./search-form/search-form.component";

@NgModule({
  declarations: [
    SearchFormComponent,
    AutocompleteExtended
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    IntlModule,
    UtilsModule,
    BsAutocompleteModule,
    BsAdvancedModule,
  ],
  exports: [
    SearchFormComponent,
    AutocompleteExtended
  ]
})
export class SharedModule{}