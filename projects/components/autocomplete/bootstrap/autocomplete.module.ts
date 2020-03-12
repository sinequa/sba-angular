import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Autocomplete} from "../autocomplete.directive";
import {BsAutocompleteList} from "./autocomplete-list/autocomplete-list";
import {UtilsModule} from '@sinequa/components/utils';

@NgModule({
    imports: [
        CommonModule,
        UtilsModule
    ],
    declarations: [
        BsAutocompleteList, Autocomplete
    ],
    exports: [
        BsAutocompleteList, Autocomplete
    ]
})
export class BsAutocompleteModule {
}