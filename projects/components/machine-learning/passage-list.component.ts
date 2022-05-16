import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Passage, Record } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-passage-list',
  template: `
<div class="list-group list-group-flush" *ngIf="record.matchingpassages?.passages?.length">
  <div class="list-group-item list-group-item-action" [ngClass]="{expanded: passage.$expanded}"
      *ngFor="let passage of record.matchingpassages?.passages|slice:0:maxPassages"
      (click)="expand(passage)">
      <p>
          {{passage.text}}
      </p>
  </div>
</div>
  `,
  styles: [`

  .list-group-item {
    cursor: pointer;
    p {
        max-height: 1.7rem;
        transition: max-height .3s ease-in-out;
        overflow: hidden;
        margin-bottom: 0;
        white-space: break-spaces;
    }
    &.expanded p {
        max-height: 15rem;
    }
  }
  `]
})
export class PassageListComponent implements OnChanges {
  @Input() record: Record;
  @Input() maxPassages = 5;

  ngOnChanges(changes: SimpleChanges): void {
    const passages = this.record.matchingpassages?.passages;
    if(passages) {
      passages[0].$expanded = true;
    }
  }

  expand(passage: Passage) {
    const state = !passage['$expanded'];
    this.record.matchingpassages?.passages.forEach(p => delete p['$expanded']);
    passage['$expanded'] = state;
  }
}
