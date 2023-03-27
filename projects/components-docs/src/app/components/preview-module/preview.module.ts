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
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocPreviewModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-preview-highlights', DocPreviewHighlightsComponent);
    this.createElement('doc-preview-links', DocPreviewLinksComponent);
    this.createElement('doc-preview-popup', DocPreviewPopupComponent);
    this.createElement('doc-preview-panel', DocPreviewPanelComponent);
    this.createElement('doc-result-link-preview', DocResultLinkPreviewComponent);
    this.createElement('doc-facet-preview', DocFacetPreviewComponent);
    this.createElement('doc-similar-documents', DocSimilarDocumentsComponent);
    this.createElement('doc-preview-entity-facet', DocPreviewEntityFacetComponent);
    this.createElement('doc-preview-entity-panel', DocPreviewEntityPanelComponent);
    this.createElement('doc-preview-extracts-panel', DocPreviewExtractsPanelComponent);
    this.createElement('doc-preview-search-form', DocPreviewSearchFormComponent);
    this.createElement('doc-preview-pages-panel', DocPreviewPagesPanelComponent);
    this.createElement('doc-preview-page-form', DocPreviewPageFormComponent);
    this.createElement('doc-preview-minimap', DocPreviewMinimapComponent);
    this.createElement('doc-facet-preview-2', DocFacetPreviewComponentComponent);
    this.createElement('doc-preview-tooltip', DocPreviewTooltipComponent);
  }
}
