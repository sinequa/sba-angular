import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";
import {LoadComponentModule} from "@sinequa/core/load-component";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";
import {BsActionModule} from "@sinequa/components/action";
import {BsSelectionModule} from "@sinequa/components/selection";

import {RESULTS_VIEWS, DEFAULT_VIEW, ResultsView} from "./results-view.service";

import {BsResultsTimelineView} from "./results-timeline-view/results-timeline-view";
import {BsTimelineTooltip} from "./results-timeline-tooltip/results-timeline-tooltip";
import {BsResultsScatterView} from "./results-scatter-view/results-scatter-view";

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
    ],
    declarations: [
        BsResultsScatterView, 
        BsResultsTimelineView, 
        BsTimelineTooltip,
    ],
    exports: [
        BsResultsScatterView, 
        BsResultsTimelineView,
    ],
})
export class ResultsViewModule {
    public static forRoot(resultsViews: ResultsView[], defaultView: ResultsView): ModuleWithProviders {
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
