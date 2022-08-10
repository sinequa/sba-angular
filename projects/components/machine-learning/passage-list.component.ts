import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatchingPassage, Record } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-passage-list',
  template: `
<ol class="list-group list-group-flush list-group-numbered" *ngIf="record.matchingpassages?.passages?.length">
  <li class="list-group-item list-group-item-action sq-passage" [ngClass]="{expanded: passage.$expanded}"
      *ngFor="let passage of record.matchingpassages?.passages|slice:0:maxPassages"
      (click)="expand(passage)">
      <span class="sq-passage-text" [innerHtml]="passage.highlightedText || passage.text"></span>
  </li>
</ol>
  `,
  styleUrls: ['passage-list.component.scss']
})
export class PassageListComponent implements OnChanges {
  @Input() record: Record;
  @Input() maxPassages?: number;

  ngOnChanges(changes: SimpleChanges): void {
    const passages = this.record.matchingpassages?.passages;
    // invalidate all $expanded property except for the first passage
    passages?.forEach((p,index) => p.$expanded = index === 0);
  }

  expand(passage: MatchingPassage) {
    const state = !passage.$expanded;
    this.record.matchingpassages?.passages.forEach(p => p.$expanded = false);
    passage.$expanded = state;
  }
}
