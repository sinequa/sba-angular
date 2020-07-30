import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {WebServicesModule} from "@sinequa/core/web-services";
import {IntlModule} from "@sinequa/core/intl";
import {LoginModule} from "@sinequa/core/login";
import {UtilsModule} from "@sinequa/components/utils";
import {BsActionModule} from "@sinequa/components/action";
import {SearchOptions, SEARCH_OPTIONS} from "../search.service";

import {BsDidYouMean} from "./did-you-mean/did-you-mean";
import {BsBreadcrumbs} from "./breadcrumbs/breadcrumbs";
import {BsPager} from "./pager/pager";
import {BsPageSizeSelector} from "./page-size-selector/page-size-selector";
import {BsSortSelector} from "./sort-selector/sort-selector";
import {BsTabs} from "./tabs/tabs";
import {BsLoadingBar} from "./loading-bar/loading-bar";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,

        WebServicesModule,
        IntlModule,
        LoginModule,

        UtilsModule,
        BsActionModule
    ],
    declarations: [
        BsDidYouMean,
        BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
        BsTabs, BsLoadingBar
    ],
    exports: [
        BsDidYouMean,
        BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
        BsTabs, BsLoadingBar
    ],
})
export class BsSearchModule {
    static forRoot(searchOptions: SearchOptions) : ModuleWithProviders<BsSearchModule> {
        return {
            ngModule: BsSearchModule,
            providers: [
                // Provide SEARCH_OPTIONS
                {provide: SEARCH_OPTIONS, useValue: searchOptions},
            ]
        };
    }
}