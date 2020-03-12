import {Component, Input} from "@angular/core";
import {SelectionService} from "../../selection.service";
import {Action} from '@sinequa/components/action';

@Component({
    selector: "sq-results-selector",
    templateUrl: "./results-selector.html"
})
export class BsResultsSelector {
    @Input() size: string;
    @Input() style: string;
    @Input() rightAligned: boolean;

    constructor(
        public selectionService: SelectionService) {
    }

    public get actions(): Action[] {
        return this.rightAligned? this.selectionService.selectionActions.slice().reverse() : this.selectionService.selectionActions;
    }
}
