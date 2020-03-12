import {Component, Input} from "@angular/core";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-result-icon",
    templateUrl: "./result-icon.html"
})
export class ResultIcon {
    @Input() record: Record;
}