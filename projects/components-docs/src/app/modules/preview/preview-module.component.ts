import { Component } from '@angular/core';
import { DocFacetPreviewComponentComponent } from './facet-preview-component/facet-preview-component.component';
import { DocFacetPreviewComponent } from './facet-preview/facet-preview.component';
import { DocPreviewEntityFacetComponent } from './preview-entity-facet/preview-entity-facet.component';
import { DocPreviewEntityPanelComponent } from './preview-entity-panel/preview-entity-panel.component';
import { DocPreviewExtractsPanelComponent } from './preview-extracts-panel/preview-extracts-panel.component';
import { DocPreviewHighlightsComponent } from './preview-highlights/preview-highlights.component';
import { DocPreviewLinksComponent } from './preview-links/preview-links.component';
import { DocPreviewMinimapComponent } from './preview-minimap/preview-minimap.component';
import { DocPreviewPageFormComponent } from './preview-page-form/preview-page-form.component';
import { DocPreviewPagesPanelComponent } from './preview-pages-panel/preview-pages-panel.component';
import { DocPreviewPanelComponent } from './preview-panel/preview-panel.component';
import { DocPreviewPopupComponent } from './preview-popup/preview-popup.component';
import { DocPreviewSearchFormComponent } from './preview-search-form/preview-search-form.component';
import { DocResultLinkPreviewComponent } from './result-link-preview/result-link-preview.component';
import { DocSimilarDocumentsComponent } from './similar-documents/similar-documents.component';

@Component({
  selector: 'doc-preview-module',
  templateUrl: '../../module-template.html'
})
export class DocPreviewModuleComponent {

  title = 'Preview Module';

  components = [
    DocFacetPreviewComponent,
    DocFacetPreviewComponentComponent,
    DocPreviewEntityFacetComponent,
    DocPreviewEntityPanelComponent,
    DocPreviewExtractsPanelComponent,
    DocPreviewHighlightsComponent,
    DocPreviewLinksComponent,
    DocPreviewMinimapComponent,
    DocPreviewPageFormComponent,
    DocPreviewPagesPanelComponent,
    DocPreviewPanelComponent,
    DocPreviewPopupComponent,
    DocPreviewSearchFormComponent,
    DocResultLinkPreviewComponent,
    DocSimilarDocumentsComponent
  ];

  constructor() { }

}
