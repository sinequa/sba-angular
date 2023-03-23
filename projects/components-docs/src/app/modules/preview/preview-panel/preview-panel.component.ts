import { Component, Inject } from '@angular/core';
import { PreviewPopupModel } from '@sinequa/components/preview';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-preview-panel',
  templateUrl: './preview-panel.component.html'
})
export class DocPreviewPanelComponent extends BaseComponent {

  code1 = `<sq-preview-panel
    [query]="model.query"
    [previewData]="globalService.previewData"
    [displaySimilarDocuments]="model.displaySimilarDocuments"
    [metadata]="model.metadata">
</sq-preview-panel>`;

code2 = `constructor(@Inject(MODAL_MODEL) public model: PreviewPopupModel,
    ...
    ) {}`;

  constructor(@Inject(MODAL_MODEL) public model: PreviewPopupModel) {
    super();
  }

}
