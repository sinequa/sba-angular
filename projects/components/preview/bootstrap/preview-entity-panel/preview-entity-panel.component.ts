import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CategoryHighlightData, HighlightValue, PreviewData } from '@sinequa/core/web-services';
import { PreviewDocument } from '../../preview-document';

@Component({
  selector: 'sq-preview-entity-panel',
  templateUrl: './preview-entity-panel.component.html',
  styleUrls: ['./preview-entity-panel.component.scss']
})
export class BsPreviewEntityPanelComponent implements OnChanges {

  /**
   * Preview data
   */
  @Input() previewData: PreviewData;

  /**
   * Preview document
   */
  @Input() previewDocument: PreviewDocument;

  /**
   * What is the style of the facets
   */
  @Input() style: string;

  /**
   * Whether the facets are collapsible
   */
  @Input() collapsible: boolean = true;

  /**
   * Allows to uncheck all items from specific facets
   */
  @Input() startUnchecked: {[entity: string]: boolean} = {};

  /**
   * The list of entities to display (if ignored, will be deducted from the preview data)
   */
  @Input() entities: string[];

  /**
   * Triggers an event when check all / check none is use in a facet
   */
  @Output() facetChecked = new EventEmitter<{entity: string, checked: boolean}>();

  _entities: string[] = [];

  constructor() { }

  /**
   * Extracts the list of entities from the preview data
   */
  ngOnChanges() {
    if(this.entities && !!this.previewData){ // If the list of entities is provided as input
      this._entities = this.entities;
    }
    else if(this.previewData){ // The list of entities is deduced from the preview data
      this._entities = Object.keys(this.previewData.highlightsPerCategory).filter(value => value !== "extractslocations");
    }
    else {  // No entity to show
      this._entities = [];
    }
  }

  /**
   * Return the data for a specific entity category
   * @param entity
   */
  data(entity: string): CategoryHighlightData {
    return this.previewData.highlightsPerCategory[entity];
  }

  /**
   * Returns the display value of a specific entity
   * @param entity
   */
  entityDisplay(entity: string): string {
    return this.data(entity).categoryDisplayLabelPlural || this.data(entity).categoryDisplayLabel || entity;
  }

  /**
   * Returns the icon of a specific entity
   * @param entity
   */
  entityIcon(entity: string): string {
    return "sq-icon-"+entity;
  }

  /**
   * Returns the list of values of a specific entity
   * @param entity
   */
  entityValues(entity: string): HighlightValue[] {
    return this.data(entity).values;
  }

  /**
   * Called by child facet when items are checked/unchecked
   * @param entity
   * @param checked
   */
  itemsChecked(entity: string, checked: boolean){
    this.facetChecked.next({entity: entity, checked: checked});
  }

}
