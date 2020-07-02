import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";
import {WebServicesModule} from "@sinequa/core/web-services";

import {UtilsModule} from "@sinequa/components/utils";
import {CollapseModule} from "@sinequa/components/collapse";
import {MetadataModule} from "@sinequa/components/metadata";
import {BsModalModule} from "@sinequa/components/modal";
import {BsFacetModule} from "@sinequa/components/facet";
import {ResultModule} from "@sinequa/components/result";
import { BsActionModule } from "@sinequa/components/action";
import {PreviewModule} from "../preview.module";
import {BsPreviewHighlights} from "./preview-highlights/preview-highlights";
import {BsPreviewLinks} from "./preview-links/preview-links";
import {BsPreviewPopup} from "./preview-popup/preview-popup";
import {BsPreviewPanel} from "./preview-panel/preview-panel";
import {BsResultLinkPreview} from "./result-link-preview/result-link-preview";
import {BsFacetPreview} from "./facet-preview/facet-preview";
import {BsSimilarDocs} from "./similar-docs/similar-docs";
import {BsSimilarDocuments} from "./similar-documents/similar-documents";
import {BsFacetPreviewComponent2 } from './facet-preview-2/facet-preview.component';
import {BsPreviewEntityFacetComponent} from './preview-entity-facet/preview-entity-facet.component';
import {BsPreviewEntityPanelComponent} from './preview-entity-panel/preview-entity-panel.component';
import {BsPreviewExtractsPanelComponent} from './preview-extracts-panel/preview-extracts-panel.component';
import {BsPreviewSearchFormComponent} from './preview-search-form/preview-search-form.component';

import {PREVIEW_MODAL} from '../preview.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,

        IntlModule,
        WebServicesModule,

        UtilsModule,
        CollapseModule,
        MetadataModule,
        BsModalModule,
        BsFacetModule,
        ResultModule,
        BsActionModule,
        PreviewModule
    ],
    declarations: [
        BsPreviewHighlights, BsPreviewLinks,
        BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
        BsFacetPreview, BsFacetPreviewComponent2,
        BsSimilarDocs, BsSimilarDocuments,
        BsPreviewEntityFacetComponent,
        BsPreviewEntityPanelComponent,
        BsPreviewExtractsPanelComponent,
        BsPreviewSearchFormComponent
    ],
    exports: [
        PreviewModule,
        BsPreviewHighlights, BsPreviewLinks,
        BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
        BsFacetPreview, BsFacetPreviewComponent2,
        BsSimilarDocs, BsSimilarDocuments,
        BsPreviewEntityFacetComponent,
        BsPreviewEntityPanelComponent,
        BsPreviewExtractsPanelComponent,
        BsPreviewSearchFormComponent
    ],
    providers: [
        {provide: PREVIEW_MODAL, useValue: BsPreviewPopup}
    ]
})
export class BsPreviewModule {
}