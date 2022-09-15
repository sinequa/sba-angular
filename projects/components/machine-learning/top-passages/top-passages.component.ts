import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { Record, Results } from "@sinequa/core/web-services";
import { TopPassage } from "@sinequa/core/web-services/models/top-passage";

export interface TopPassageConfig {
  showTitle?: boolean;
  showSource?: boolean;
  lineClamp?: number;
}

@Component({
  selector: 'sq-top-passages',
  templateUrl: 'top-passages.component.html',
  styleUrls: ['top-passages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPassagesComponent {
  @Input() set results(results: Results) {
    // extract top passages from Results object
    this.passages = results.topPassages?.passages || [];
    // converts columns items to sinequa Record only if record is undefined
    this.passages
      .filter(p => p.record === undefined)
      .forEach(p => p.record = p.columns?.reduce((acc, val) => ({ ...acc, ...(val.treepath ? { treepath: [val.treepath] } : val) })) as Record);

    // reset values
    this.selected = -1;
  }

  @Input() set config(conf: TopPassageConfig) {
    this.configuration = { ...this.configuration, ...conf };
    this.MIN_HEIGHT = this.setMinHeight();
  }

  @Output() onClick = new EventEmitter<Record>()

  configuration: TopPassageConfig = { showTitle: true, showSource: false, lineClamp: 2 };

  MIN_HEIGHT: number;
  selected: number;
  passages: TopPassage[];

  constructor() {
    this.MIN_HEIGHT = this.setMinHeight();
  }

  expand(index: number) {
    if (this.selected !== index) {
      this.selected = index;
    } else {
      this.selected = -1;
    }
  }

  titleClicked(e: Event, index: number, record: Record) {
    e.stopImmediatePropagation();
    this.onClick.emit(record);
  }

  private setMinHeight(): number {
    return 24 * (this.configuration.lineClamp === 0 ? 1000 : this.configuration.lineClamp || 1);
  }
}