import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';

import { IntlModule } from "@sinequa/core/intl";

import { BsActionModule } from "@sinequa/components/action";

import { BsResultsSelector } from "./results-selector/results-selector";
import { BsResultSelector } from "./result-selector/result-selector";
import { BsSelectionArranger } from "./selection-arranger/selection-arranger.component";
import { SELECTION_OPTIONS, defaultSelectionOptions } from "../selection.service";

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,

        IntlModule,

        BsActionModule,
    ],
    declarations: [
        BsResultsSelector, BsResultSelector, BsSelectionArranger
    ],
    exports: [
        BsResultsSelector, BsResultSelector, BsSelectionArranger
    ],
    providers: [
        {provide: SELECTION_OPTIONS, useValue: defaultSelectionOptions}
    ]
})
export class BsSelectionModule {
}
