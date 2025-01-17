import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatchingPassage, Record } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-passage-list',
  template: `
<ol class="list-group list-group-flush" *ngIf="record.matchingpassages?.passages?.length">
  <li class="list-group-item list-group-item-action sq-passage" #list [id]="'li-'+index" [ngClass]="{expanded: passage.$expanded}"
      *ngFor="let passage of record.matchingpassages?.passages|slice:0:maxPassages; let index = index"
      (click)="expand(passage)">
      <div class="sq-passage-icon"></div>
      <div class="sq-passage-text">
        <span [innerHTML]="passage.highlightedText || passage.text"></span>
      </div>
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
  }

  expand(passage: MatchingPassage) {
    // Do not expand if there is a selection
    const selection = window.getSelection();
    if(selection && selection.toString().length > 0) {
      return;
    }

    const state = !passage.$expanded;
    this.record.matchingpassages?.passages.forEach(p => p.$expanded = false);
    passage.$expanded = state;
  }
}