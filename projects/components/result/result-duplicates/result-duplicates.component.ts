import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { Record } from "@sinequa/core/web-services";

@Component({
    selector: 'sq-result-duplicates',
    templateUrl: './result-duplicates.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ResultDuplicatesComponent implements OnChanges {
  @Input() record: Record;

  exactDuplicates: number;
  nearDuplicates: number;

  ngOnChanges() {
    this.exactDuplicates = (this.record.groupcount || 1) - 1;
    this.nearDuplicates = this.record.$duplicateCount || 0;
  }
}
