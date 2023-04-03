import { Component } from '@angular/core';
import { HighlightValue } from '@sinequa/core/web-services';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-preview-entity-facet',
  templateUrl: './preview-entity-facet.component.html'
})
export class DocPreviewEntityFacetComponent extends BaseComponent {

  entity = 'person';

  code1 = `<sq-preview-entity-facet
    [entity]="entity"
    [data]="entityValues(entity)"
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-entity-facet>`;

    code2 = `entityValues(entity: string): HighlightValue[] {
    return this.previewData.highlightsPerCategory[entity].values;
}`;

  entityValues(entity: string): HighlightValue[] {
    return this.globalService.previewData?.highlightsPerCategory[entity].values || [];
  }

}
