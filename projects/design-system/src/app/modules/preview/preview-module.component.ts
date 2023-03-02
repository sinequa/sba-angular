import { Component } from '@angular/core';
import { FacetPreviewComponentComponent } from './facet-preview-component/facet-preview-component.component';
import { PreviewEntityFacetComponent } from './preview-entity-facet/preview-entity-facet.component';
import { PreviewEntityPanelComponent } from './preview-entity-panel/preview-entity-panel.component';
import { PreviewExtractsPanelComponent } from './preview-extracts-panel/preview-extracts-panel.component';
import { PreviewHighlightsComponent } from './preview-highlights/preview-highlights.component';
import { PreviewLinksComponent } from './preview-links/preview-links.component';
import { PreviewMinimapComponent } from './preview-minimap/preview-minimap.component';
import { PreviewPageFormComponent } from './preview-page-form/preview-page-form.component';
import { PreviewPagesPanelComponent } from './preview-pages-panel/preview-pages-panel.component';
import { PreviewPanelComponent } from './preview-panel/preview-panel.component';
import { PreviewPopupComponent } from './preview-popup/preview-popup.component';
import { PreviewSearchFormComponent } from './preview-search-form/preview-search-form.component';
import { ResultLinkPreviewComponent } from './result-link-preview/result-link-preview.component';
import { SimilarDocumentsComponent } from './similar-documents/similar-documents.component';

@Component({
  selector: 'app-preview-module',
  templateUrl: '../../module-template.html'
})
export class PreviewModuleComponent {

  title = 'Preview Module';

  components = [
    // FacetPreviewComponent,
    FacetPreviewComponentComponent,
    PreviewEntityFacetComponent,
    PreviewEntityPanelComponent,
    PreviewExtractsPanelComponent,
    PreviewHighlightsComponent,
    PreviewLinksComponent,
    PreviewMinimapComponent,
    PreviewPageFormComponent,
    PreviewPagesPanelComponent,
    PreviewPanelComponent,
    PreviewPopupComponent,
    PreviewSearchFormComponent,
    ResultLinkPreviewComponent,
    SimilarDocumentsComponent
  ];

  constructor() { }

}
