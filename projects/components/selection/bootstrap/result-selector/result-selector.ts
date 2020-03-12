import {Component, Input} from "@angular/core";
import {Record} from "@sinequa/core/web-services";
import {SelectionService} from "../../selection.service";

@Component({
    selector: "sq-result-selector",
    templateUrl: "./result-selector.html"
})
export class BsResultSelector {
    @Input() record: Record;

    constructor(
        public selectionService: SelectionService) {
    }

}