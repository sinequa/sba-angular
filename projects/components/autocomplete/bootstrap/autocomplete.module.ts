import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Autocomplete} from "../autocomplete.directive";
import {AutocompleteFieldSearch} from "../autocomplete-field-search.directive";
import {BsAutocompleteList} from "./autocomplete-list/autocomplete-list";
import {BsFieldSearchItemsComponent} from './field-search-items.component';
import {UtilsModule} from '@sinequa/components/utils';

@NgModule({
    imports: [
        CommonModule,
        UtilsModule
    ],
    declarations: [
        BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch
    ],
    exports: [
        BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch
    ]
})
export class BsAutocompleteModule {
}