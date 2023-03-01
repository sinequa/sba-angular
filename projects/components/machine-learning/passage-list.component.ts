import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatchingPassage, Record } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-passage-list',
  template: `
<ol class="list-group list-group-flush" *ngIf="record.matchingpassages?.passages?.length">
  <li class="list-group-item list-group-item-action sq-passage" #list [id]="'li-'+index" [class.expanded]="passage.$expanded"
      *ngFor="let passage of record.matchingpassages?.passages|slice:0:maxPassages; let index = index"
      [class.unexpandable]="!passage.$expandable" (click)="expand(passage, index)">
      <div class="sq-passage-icon"></div>
      <div class="sq-passage-text" [innerHtml]="passage.highlightedText || passage.text"></div>
  </li>
</ol>
  `,
  styleUrls: ['passage-list.component.scss']
})
export class PassageListComponent implements OnChanges {

  @Input() record: Record;
  @Input() maxPassages?: number;
  @Input() passageId?: string;

  ngOnChanges(changes: SimpleChanges): void {
    const passages = this.record.matchingpassages?.passages;
    // invalidate all $expanded property except for the first passage
    passages?.forEach((p, index) => p.$expanded = this.passageId
      ? p.id === Number(this.passageId) : index === 0);
    this.setExpandable();
  }

  expand(passage: MatchingPassage, index: number) {
    if (!passage.$expandable) return;
    const state = !passage.$expanded;
    this.record.matchingpassages?.passages.forEach(p => p.$expanded = false);
    passage.$expanded = state;
  }
}
