import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";
import {LoadComponentModule} from "@sinequa/core/load-component";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";
import {BsActionModule} from "@sinequa/components/action";
import {BsSelectionModule} from "@sinequa/components/selection";

import {ResultsViewModule} from "../results-view.module";
import {RESULTS_VIEWS, DEFAULT_VIEW, ResultsView} from "../results-view.service";

import {BsResultsViewSelector} from "./results-view-selector/results-view-selector";
import {BsResultsViewConfigurator} from "./results-view-configurator/results-view-configurator";
import {BsResultsGridView} from "./results-grid-view/results-grid-view";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,

        LoadComponentModule,
        IntlModule,
        ValidationModule,

        UtilsModule,
        BsActionModule,
        BsSelectionModule,
        ResultsViewModule
    ],
    declarations: [
        BsResultsViewSelector,
        BsResultsViewConfigurator,
        BsResultsGridView,
    ],
    exports: [
        ResultsViewModule,
        BsResultsViewSelector,
        BsResultsViewConfigurator,
        BsResultsGridView,
    ],
})
export class BsResultsViewModule {
    public static forRoot(resultsViews: ResultsView[], defaultView: ResultsView): ModuleWithProviders<BsResultsViewModule> {
        return {
            ngModule: BsResultsViewModule,
            providers: [
                {
                    provide: RESULTS_VIEWS,
                    useValue: resultsViews
                },
                {
                    provide: DEFAULT_VIEW,
                    useValue: defaultView
                }
            ]
        };
    }
}
