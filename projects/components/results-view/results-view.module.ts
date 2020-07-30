import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";
import {BsActionModule} from "@sinequa/components/action";
import {BsSelectionModule} from "@sinequa/components/selection";

import {RESULTS_VIEWS, DEFAULT_VIEW, ResultsView} from "./results-view.service";

import {BsResultsScatterView} from "./results-scatter-view/results-scatter-view";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,

        IntlModule,
        ValidationModule,

        UtilsModule,
        BsActionModule,
        BsSelectionModule,
    ],
    declarations: [
        BsResultsScatterView,
    ],
    exports: [
        BsResultsScatterView,
    ],
})
export class ResultsViewModule {
    public static forRoot(resultsViews: ResultsView[], defaultView: ResultsView): ModuleWithProviders<ResultsViewModule> {
        return {
            ngModule: ResultsViewModule,
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
