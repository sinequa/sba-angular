import { AfterViewInit, Component, ElementRef, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from "@angular/core";
import { MatchingPassage, Record } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-passage-list',
  template: `
<ol class="list-group list-group-flush" *ngIf="record.matchingpassages?.passages?.length">
  <li class="list-group-item list-group-item-action sq-passage" #list [id]="'li-'+index" [ngClass]="{expanded: passage.$expanded}"
      *ngFor="let passage of record.matchingpassages?.passages|slice:0:maxPassages; let index = index"
      (click)="expand(passage)">
      <div class="sq-passage-icon"></div>
      <div class="sq-passage-text" [innerHtml]="passage.highlightedText || passage.text"></div>
  </li>
</ol>
  `,
  styleUrls: ['passage-list.component.scss']
})
export class PassageListComponent implements OnChanges, AfterViewInit {

  @Input() record: Record;
  @Input() maxPassages?: number;
  @Input() passageId?: number;

  @ViewChildren("list", ) viewChildren!: QueryList<ElementRef>;

  ngOnChanges(changes: SimpleChanges): void {
    const passages = this.record.matchingpassages?.passages;
    // invalidate all $expanded property except for the first passage
    passages?.forEach((p, index) => p.$expanded = this.passageId?.toString()
      ? p.id === this.passageId : index === 0);
  }

  ngAfterViewInit(): void {
    this.setMaximumHeight();
    this.viewChildren.changes.subscribe(r => this.setMaximumHeight());
  }

  expand(passage: MatchingPassage) {
    const state = !passage.$expanded;
    this.record.matchingpassages?.passages.forEach(p => p.$expanded = false);
    passage.$expanded = state;
  }

  /**
   * For each element in the viewChildren array, set the maximum height of the
   * element to the element's scrollHeight in 'px'
   */
  private setMaximumHeight() {
    this.viewChildren.forEach(el => el.nativeElement.style.setProperty('--maximum', el.nativeElement.scrollHeight + 'px'));
  }
}
