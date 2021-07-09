import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HighlightValue, PreviewData, CCColumn } from '@sinequa/core/web-services';
import { PreviewDocument } from '../../preview-document';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { AppService } from '@sinequa/core/app-utils';

@Component({
  selector: 'sq-preview-entity-facet',
  templateUrl: './preview-entity-facet.component.html',
  styleUrls: ['./preview-entity-facet.component.scss']
})
export class BsPreviewEntityFacetComponent extends AbstractFacet implements OnInit, OnChanges {
  @Input() entity: string;  // Required from init
  @Input() data: HighlightValue[];  // Required from init
  @Input() previewData: PreviewData;  // Required from init and does not change (facet is rebuilt if it does)
  @Input() previewDocument: PreviewDocument;  // May be null at the start
  @Input() startUnchecked: boolean;
  @Output() itemsChecked = new EventEmitter<boolean>();

  count: number = 10;
  sortFreq: boolean = true;
  hidden = new Map<string, boolean>();
  nav = new Map<string, number>();
  column: CCColumn | undefined;

  checkAction: Action;
  sortFreqAction: Action;
  sortAlphaAction: Action;

  constructor(
    private appService:AppService
  ) {
    super();

    this.checkAction = new Action({
      icon: "far fa-check-square",
      title: "msg#preview.highlightFilters.keepNone",
      action: this.unselectAll,
      updater: (action: Action) => {
        let foundHidden = false;
        let foundNotHidden = false;
        this.data.forEach(value => {
          foundHidden = foundHidden || this.hidden.get(value.value) || false;
          foundNotHidden = foundNotHidden || !this.hidden.get(value.value);
        });
        if(!foundHidden){ // All items selected
          action.action = this.unselectAll;
          action.icon = "far fa-check-square";
          action.title = "msg#preview.highlightFilters.keepNone";
        }
        else if(!foundNotHidden){ // All items unselected
          action.action = this.selectAll;
          action.icon = "far fa-square";
          action.title = "msg#preview.highlightFilters.keepAll";
        }
        else { // Some items selected
          action.action = this.selectAll;
          action.icon = "far fa-check-square";
          action.title = "msg#preview.highlightFilters.keepAll";
        }
      }
    });
    this.sortAlphaAction = new Action({
      icon: "fas fa-sort-alpha-down",
      title: "msg#preview.sortAlphabetically",
      action: () => {
        this.sortFreq = false;
      }
    });
    this.sortFreqAction = new Action({
      icon: "fas fa-sort-amount-down",
      title: "msg#preview.sortFrequency",
      action: () => {
        this.sortFreq = true;
      }
    });
  }

  get actions(): Action[]{
    const actions: Action[] = [];
    if(this.previewDocument){
      actions.push(this.checkAction);
    }
    actions.push(this.sortFreq? this.sortAlphaAction : this.sortFreqAction);
    return actions;
  }

  /**
   * Uncheck items if needed
   */
  ngOnInit(){
    if(this.startUnchecked){
      this.unselectAll();
      this.checkAction.update();
    }
    this.column = this.appService.getColumn(this.entity);
  }

  /**
   * Since the preview document comes after the preview data, we need to wait for that change
   * and apply the hidden state in the document.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if(changes["previewDocument"]){
      if(this.previewDocument){
        this.data.forEach(val => {
          if(this.hidden.get(val.value)){
            this.previewDocument.toggleHighlight(this.entity, false, val.value);
          }
        });
      }
    }
  }

  /**
   * Returns the entities to be displayed in the facet, performing truncation and sorting of the input list
   */
  get entityValues(): HighlightValue[] {
    return this.data.sort((a,b) => {
      const d = b.locations.length - a.locations.length;
      return this.sortFreq && d !== 0?  d : a.displayValue.localeCompare(b.displayValue);
    }).slice(0, this.count);
  }

  /**
   * Returns the number of occurrences of a given value.
   * If the user used the facet to navigate, the format is "i / count"
   * @param value
   */
  entityCount(value: HighlightValue): string {
    let count = value.locations.length + "";
    const navValue = this.nav.get(value.value);
    if(navValue !== undefined){
      count = (navValue+1) + " / " + count;
    }
    return count;
  }

  /**
   * Return whether the entity is hidden (unchecked) or not
   * @param value
   */
  entityHidden(value: HighlightValue): boolean {
    return !!this.hidden.get(value.value);
  }

  /**
   * Shows all the entities in the list
   */
  showAll(){
    this.count = this.data.length;
    return false;
  }

  /**
   * Toggles the hidden (checked/unchecked) state of a value in the list.
   * Modifies the provided preview document.
   * @param value
   */
  toggleEntity(value: HighlightValue){
    this.hidden.set(value.value, !this.hidden.get(value.value));
    if(this.previewDocument){
      this.previewDocument.toggleHighlight(this.entity, !this.hidden.get(value.value), value.value);
    }
    this.checkAction.update();
  }

  /**
   * Unselect all entities (set hidden)
   */
  unselectAll = (action?: Action) => {
    if(this.previewDocument){
      this.previewDocument.toggleHighlight(this.entity, false);
    }
    this.data.forEach((value)=> {
      this.hidden.set(value.value, true);
    });
    if(action){
      action.update();
      this.itemsChecked.next(false);
    }
  }

  /**
   * Select all entities (unset hidden)
   */
  selectAll = (action: Action) => {
    if(this.previewDocument){
      this.previewDocument.toggleHighlight(this.entity, true);
    }
    this.data.forEach((value)=> {
      this.hidden.set(value.value, false);
    });
    if(action){
      action.update();
      this.itemsChecked.next(true);
    }
  }

  /**
   * Navigate to the next value of this entity.
   * Modifies the provided preview document.
   * @param value
   */
  nextEntity(value: HighlightValue){
    let navValue = this.nav.get(value.value);
    if(navValue === undefined){
      navValue = 0;
      this.nav.set(value.value, navValue);
    }
    else if(navValue < value.locations.length-1){
      navValue++;
      this.nav.set(value.value, navValue);
    }
    this.selectEntity(this.entity, value.value, navValue);
  }

  /**
   * Navigate to the next value of this entity.
   * Modifies the provided preview document.
   * @param value
   */
  prevEntity(value: HighlightValue){
    let navValue = this.nav.get(value.value);
    if(navValue === undefined){
      navValue = 0;
      this.nav.set(value.value, navValue);
    }
    else if(navValue > 0){
      navValue--;
      this.nav.set(value.value, navValue);
    }
    this.selectEntity(this.entity, value.value, navValue);
  }

  /**
   * Navigate to the given occurrence of an entity in a specific category
   * Modifies the provided preview document.
   * @param category
   * @param value
   * @param i
   */
  selectEntity(category: string, value: string, i: number){
    const indexes = this.getEntityIndexes(category, value);
    this.previewDocument.selectHighlight(category, indexes[i]);
  }

  /**
   * Helper function to find the indexes of all occurrences of a entity value in the document
   * @param category
   * @param value
   */
  private getEntityIndexes(category: string, value: string) {
    const indexes: number[] = [];
    for (let i = 0; i < this.previewData.highlightsPerLocation['length']; i++) {
      const highlight = this.previewData.highlightsPerLocation[i];
      const categories = Object.keys(highlight.positionInCategories);
      for (const currentCategory of categories) {
        if (currentCategory === category) {
          for (const highlightValue of highlight.values) {
            if (highlightValue === value) {
              indexes.push(highlight.positionInCategories[category]);
            }
          }
        }
      }
    }
    return indexes;
  }
}
