import { Component } from '@angular/core';
import { HighlightValue } from '@sinequa/core/web-services';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-preview-entity-facet',
  templateUrl: './preview-entity-facet.component.html'
})
export class PreviewEntityFacetComponent {

  entity = 'person';

  code = `<sq-preview-entity-facet
    [entity]="entity"
    [data]="entityValues(entity)"
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-entity-facet>`;

    code2 = `entityValues(entity: string): HighlightValue[] {
    return this.previewData.highlightsPerCategory[entity].values;
}`;

  constructor(public globalService: GlobalService) { }

  entityValues(entity: string): HighlightValue[] {
    return this.globalService.previewData?.highlightsPerCategory[entity].values || [];
  }

}
