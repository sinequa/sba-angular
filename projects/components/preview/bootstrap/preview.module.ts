import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";

import {IntlModule} from "@sinequa/core/intl";
import {WebServicesModule} from "@sinequa/core/web-services";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";
import {CollapseModule} from "@sinequa/components/collapse";
import {MetadataModule} from "@sinequa/components/metadata";
import {BsModalModule} from "@sinequa/components/modal";
import {BsFacetModule} from "@sinequa/components/facet";
import {ResultModule} from "@sinequa/components/result";
import {BsActionModule} from "@sinequa/components/action";
import {BsSearchModule} from "@sinequa/components/search";

import {PreviewModule} from "../preview.module";
import {BsPreviewEntityFacetComponent} from './preview-entity-facet/preview-entity-facet.component';
import {BsPreviewEntityPanelComponent} from './preview-entity-panel/preview-entity-panel.component';
import {BsPreviewExtractsPanelComponent} from './preview-extracts-panel/preview-extracts-panel.component';
import {BsPreviewSearchFormComponent} from './preview-search-form/preview-search-form.component';
import {BsPreviewPagesPanelComponent} from './preview-pages-panel/preview-pages-panel.component';
import {BsPreviewPageFormComponent} from './preview-page-form/preview-page-form.component';
import {BsPreviewMinimapComponent} from "./preview-minimap/preview-minimap.component";
import {BsPassageHighlightComponent} from "./preview-passage-highlight/preview-passage-highlight.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        ScrollingModule,

        IntlModule,
        WebServicesModule,
        ValidationModule,

        UtilsModule,
        CollapseModule,
        MetadataModule,
        BsModalModule,
        BsFacetModule,
        ResultModule,
        BsActionModule,
        BsSearchModule,
        PreviewModule
    ],
    declarations: [
        BsPreviewEntityFacetComponent,
        BsPreviewEntityPanelComponent,
        BsPreviewExtractsPanelComponent,
        BsPreviewSearchFormComponent,
        BsPreviewPagesPanelComponent,
        BsPreviewPageFormComponent,
        BsPreviewMinimapComponent,
        BsPassageHighlightComponent
    ],
    exports: [
        PreviewModule,
        BsPreviewEntityFacetComponent,
        BsPreviewEntityPanelComponent,
        BsPreviewExtractsPanelComponent,
        BsPreviewSearchFormComponent,
        BsPreviewPagesPanelComponent,
        BsPreviewPageFormComponent,
        BsPreviewMinimapComponent,
        BsPassageHighlightComponent
    ]
})
export class BsPreviewModule {
}
