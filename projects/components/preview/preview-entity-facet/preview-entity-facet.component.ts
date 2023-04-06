import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { HighlightValue, PreviewData, CCColumn } from '@sinequa/core/web-services';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { AppService } from '@sinequa/core/app-utils';
import { Preview, PreviewHighlightColors } from '../preview.component';
import { map, Observable, Subscription, tap } from 'rxjs';

interface PreviewEntity {
  display: string;
  ids: number[];
  current?: number;
}

@Component({
  selector: 'sq-preview-entity-facet',
  templateUrl: './preview-entity-facet.component.html',
  styleUrls: ['./preview-entity-facet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewEntityFacetComponent extends AbstractFacet implements OnChanges, OnDestroy {
  @Input() entity: string;  // Required from init
  @Input() data: HighlightValue[];  // Required from init
  @Input() previewData: PreviewData;  // Required from init and does not change (facet is rebuilt if it does)
  @Input() preview: Preview;
  @Input() count: number = 10;
  @Input() sortFreq: boolean = true;
  @Input() label?: string;
  @Input() icon?: string;
  @Input() highlights?: PreviewHighlightColors;

  _actions: Action[];

  items: PreviewEntity[];

  column: CCColumn | undefined;

  sortFreqAction: Action;
  sortAlphaAction: Action;

  highlighted$: Observable<string>;

  constructor(
    public appService:AppService,
    public cdRef: ChangeDetectorRef
  ) {
    super();

    this._actions = [
      new Action({
        action: () => {
          this.sortFreq = !this.sortFreq;
          this.updateSort();
          this.cdRef.detectChanges();
        },
        updater: action => {
          action.icon = this.sortFreq? "fas fa-fw fa-sort-amount-down" : "fas fa-fw fa-sort-alpha-down";
          action.title = this.sortFreq? "msg#preview.sortFrequency" : "msg#preview.sortAlphabetically";
        }
      })
    ];
  }

  override get actions(): Action[]{
    return this._actions;
  }

  /**
   * Since the preview document comes after the preview data, we need to wait for that change
   * and apply the hidden state in the document.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if(changes.data) {
      this.column = this.appService.getColumn(this.entity);
      this.updateValues();
    }
    if(changes.sortFreq) {
      this.updateSort();
    }
    if(this.preview && !this.sub) {

      // Listen to changes of the preview's currently selected id, and update the state of this component accordingly
      this.sub = this.preview.selectedId$.pipe(
        tap(id => this.updateSelected(id))
      ).subscribe(() => this.cdRef.detectChanges());

      // Listen to changes of the preview's currently highlighted categories, and update the state of this component accordingly
      this.highlighted$ = this.preview.highlights$.pipe(
        map(hl => hl.includes(this.entity)? 'highlighted' : '')
      );
    }
  }

  sub?: Subscription;
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  /**
   * Returns the entities to be displayed in the facet, performing truncation and sorting of the input list
   */
  updateValues() {
    // Map of items by value
    const items: Record<string,PreviewEntity> = Object.fromEntries(
      this.data.map(d => [d.value, {display: d.displayValue, ids: []}])
    );

    // For each highlight location
    for (let i = 0; i < this.previewData.highlightsPerLocation['length']; i++) {
      const highlight = this.previewData.highlightsPerLocation[i];
      const index = highlight.positionInCategories[this.entity];
      if(typeof index === 'number') {
        for (const value of highlight.values) {
          items[value]?.ids.push(index);
        }
      }
    }

    this.items = Object.values(items);
    this.updateSort();
  }

  /**
   * Update the order of items
   */
  updateSort() {
    this.items.sort((a,b) => {
      const d = b.ids.length - a.ids.length;
      return this.sortFreq && d !== 0?  d : a.display.localeCompare(b.display);
    });
    this._actions[0].update();
  }

  /**
   * selectedId is the id of the currently selected highlight
   * in the form "company_123". If this facet displays the entity "company",
   * then we set occurrence 123 of this entity as the "current" one
   */
  updateSelected(selectedId: string|undefined) {
    let id = -1;
    if(selectedId) {
      const i = selectedId.lastIndexOf('_');
      const type = selectedId.slice(0, i);
      if(type === this.entity) {
        id = +selectedId.slice(i+1);
      }
    }
    this.setCurrent(id);
  }

  /**
   * For each entity in this facet, search for an occurrence of the given id, and
   * set the "current" property of this entity accordingly (= the index of the currently
   * selected occurrence).
   */
  setCurrent(id: number) {
    this.items.forEach(item => item.current = item.ids.indexOf(id)+1);
  }


  /**
   * Shows all the entities in the list
   */
  showAll(){
    this.count = this.data.length;
  }

  /**
   * Navigate to the next value of this entity.
   * Modifies the provided preview document.
   * @param value
   */
  nextEntity(value: PreviewEntity){
    const i = value.current && value.current < value.ids.length? value.current+1 : 1;
    this.selectEntity(value.ids[i-1]);
  }

  /**
   * Navigate to the next value of this entity.
   * Modifies the provided preview document.
   * @param value
   */
  prevEntity(value: PreviewEntity){
    const i = value.current && value.current > 1? value.current-1 : 1;
    this.selectEntity(value.ids[i-1]);
  }

  /**
   * Navigate to the given occurrence of an entity in a specific category
   * Modifies the provided preview document.
   * @param category
   * @param value
   * @param i
   */
  selectEntity(id: number){
    this.preview.select(`${this.entity}_${id}`);
  }

  toggleHighlight() {
    this.preview.toggleHighlight(this.entity);
  }

}
