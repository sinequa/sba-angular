import {Input, Component} from "@angular/core";

@Component({
  selector: "sq-results-counter",
  templateUrl: "./results-counter.html",
  styles: [`
  .sq-results-count {
    white-space: nowrap;
  }
  `]
})
export class ResultsCounter {
  @Input() rowCount: number;
}
