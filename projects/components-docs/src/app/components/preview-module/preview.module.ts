import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocPreviewModuleComponent } from './preview-module.component';
import { DocFacetPreviewComponent } from './facet-preview/facet-preview.component';
import { DocFacetPreviewComponentComponent } from './facet-preview-component/facet-preview-component.component';
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
import { DocPreviewTooltipComponent } from './preview-tooltip/preview-tooltip.component';
import { DocResultLinkPreviewComponent } from './result-link-preview/result-link-preview.component';
import { DocSimilarDocumentsComponent } from './similar-documents/similar-documents.component';
import { BsPreviewModule } from "@sinequa/components/preview";
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocPreviewModuleComponent }
];

@NgModule({
  declarations: [
    DocPreviewModuleComponent,
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
    DocPreviewTooltipComponent,
    DocResultLinkPreviewComponent,
    DocSimilarDocumentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsPreviewModule
  ]
})
export class DocPreviewModule {
  constructor() {
    createElement('doc-preview-highlights', DocPreviewHighlightsComponent);
    createElement('doc-preview-links', DocPreviewLinksComponent);
    createElement('doc-preview-popup', DocPreviewPopupComponent);
    createElement('doc-preview-panel', DocPreviewPanelComponent);
    createElement('doc-result-link-preview', DocResultLinkPreviewComponent);
    createElement('doc-facet-preview', DocFacetPreviewComponent);
    createElement('doc-similar-documents', DocSimilarDocumentsComponent);
    createElement('doc-preview-entity-facet', DocPreviewEntityFacetComponent);
    createElement('doc-preview-entity-panel', DocPreviewEntityPanelComponent);
    createElement('doc-preview-extracts-panel', DocPreviewExtractsPanelComponent);
    createElement('doc-preview-search-form', DocPreviewSearchFormComponent);
    createElement('doc-preview-pages-panel', DocPreviewPagesPanelComponent);
    createElement('doc-preview-page-form', DocPreviewPageFormComponent);
    createElement('doc-preview-minimap', DocPreviewMinimapComponent);
    createElement('doc-facet-preview-2', DocFacetPreviewComponentComponent);
    createElement('doc-preview-tooltip', DocPreviewTooltipComponent);
  }
}
