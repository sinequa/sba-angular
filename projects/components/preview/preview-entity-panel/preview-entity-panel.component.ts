import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { HighlightValue, PreviewData } from '@sinequa/core/web-services';
import { Preview, PreviewHighlightColors } from '../preview.component';

@Component({
  selector: 'sq-preview-entity-panel',
  templateUrl: './preview-entity-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewEntityPanelComponent implements OnChanges {
  @Input() preview: Preview;
  @Input() previewData: PreviewData;
  @Input() style: string;
  @Input() ignored = ["extractslocations", "matchingpassages"];
  @Input() highlights?: PreviewHighlightColors[];

  entities: {
    type: string,
    icon: string,
    display: string,
    values: HighlightValue[],
    highlights?: PreviewHighlightColors
  }[] | undefined;

  /**
   * Extracts the list of entities from the preview data
   */
  ngOnChanges() {

    if(!this.previewData) {
      this.entities = undefined;
      return;
    }

    this.entities = Object.entries(this.previewData.highlightsPerCategory)
      .filter(([type, data]) => !this.ignored.includes(type) && data.values?.length)
      .map(([type, data]) => ({
        type,
        values: data.values,
        icon: "sq-icon-"+type,
        display: data.categoryDisplayLabelPlural || data.categoryDisplayLabel,
        highlights: this.highlights?.find(hl => hl.name === type)
      }));
  }

}
