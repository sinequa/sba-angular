import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Record, Results } from "@sinequa/core/web-services";
import { AbstractFacet } from '@sinequa/components/facet';
import { TopPassage } from "@sinequa/core/web-services/models/top-passage";
import { BehaviorSubject } from "rxjs";

export interface TopPassageConfig {
  showTitle?: boolean;
  showSource?: boolean;
  lineClamp?: number;
}

@Component({
  selector: 'sq-top-passages',
  templateUrl: 'top-passages.component.html',
  styles: [`
.card-body > div {
  cursor: pointer;
}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPassagesComponent extends AbstractFacet {
  @Input() set results(results: Results) {
    // extract top passages from Results object
    this.passages = results.topPassages?.passages || [];
    // converts columns items to sinequa Record only if record is undefined
    this.passages
      .filter(p => p.record === undefined)
      .forEach(p => p.record = p.columns?.reduce((acc, val) => ({ ...acc, ...(val.treepath ? { treepath: [val.treepath] } : val) })) as Record);

    // reset values
    this.currentPage = 0;
    this.pageNumber = Math.floor(this.passages.length / this.itemsPerPage) + 1;
  }
  @Input() collapsed: boolean;
  @Input() itemsPerPage: number = 3;

  @Output() previewOpened = new EventEmitter<TopPassage>();
  @Output() titleClicked = new EventEmitter<{ item: TopPassage, isLink: boolean }>();

  passages: TopPassage[];
  page: number;
  pageNumber: number;
  currentPassages$: BehaviorSubject<TopPassage[]> = new BehaviorSubject<TopPassage[]>([]);

  get currentPage() {
    return this.page;
  }

  set currentPage(page: number) {
    this.page = page;
    const index = page * this.itemsPerPage;
    this.currentPassages$.next(this.passages.slice(index, index + this.itemsPerPage));
  }

  get currentRange() {
    const from = this.currentPage * this.itemsPerPage + 1;
    const to = this.currentPage * this.itemsPerPage + this.itemsPerPage > this.passages.length ? this.passages.length : this.currentPage * this.itemsPerPage + this.itemsPerPage;
    return from < to ? `${from}-${to}` : String(from);
  }

  constructor() {
    super();
  }

  openPreview(passage: TopPassage) {
    this.previewOpened.next(passage);
  }

  onTitleClicked(isLink: boolean, passage: TopPassage) {
    this.titleClicked.next({ item: passage, isLink });
  }
}