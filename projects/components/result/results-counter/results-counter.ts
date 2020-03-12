import {Input, Component} from "@angular/core";

@Component({
    selector: "sq-results-counter",
    templateUrl: "./results-counter.html"
})
export class ResultsCounter {
    @Input() rowCount: number;
}
