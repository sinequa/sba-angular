import {Component, Input} from "@angular/core";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-result-labels",
    templateUrl: "./result-labels.component.html"
})
export class ResultLabels {
    @Input() record: Record;
    @Input() caption: string;
    @Input() public: boolean;
}
