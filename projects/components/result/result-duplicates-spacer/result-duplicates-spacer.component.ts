import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { Record } from "@sinequa/core/web-services";

@Component({
    selector: 'sq-result-duplicates-spacer',
    template: '',
    styleUrls: ['./result-duplicates-spacer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ResultDuplicatesSpacerComponent {
  @Input()
  set record(record: Record) {
    this.isDuplicate = !!record.$isDuplicate;
  }

  @HostBinding("class.sq-duplicate")
  isDuplicate = false;
}
