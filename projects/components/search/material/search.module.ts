import {NgModule, ModuleWithProviders} from "@angular/core";
import {SearchOptions, SEARCH_OPTIONS} from "../search.service";

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class MdSearchModule {
    static forRoot(searchOptions: SearchOptions) : ModuleWithProviders<MdSearchModule> {
        return {
            ngModule: MdSearchModule,
            providers: [
                // Provide SEARCH_OPTIONS
                {provide: SEARCH_OPTIONS, useValue: searchOptions},
            ]
        };
    }
}