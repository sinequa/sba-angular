import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IntlModule } from "@sinequa/core/intl";
import { WebServicesModule } from "@sinequa/core/web-services";
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionModule } from "@sinequa/components/action";
import { BsFacetModule } from "@sinequa/components/facet";
import { BsSearchModule } from "@sinequa/components/search";

import { Preview } from "./preview.component";
import { PreviewSearchFormComponent } from './preview-search-form/preview-search-form.component';
import { PreviewTooltipComponent } from "./preview-tooltip/preview-tooltip.component";
import { PreviewExtractsPanelComponent } from './preview-extracts-panel/preview-extracts-panel.component';
import { PreviewMinimapComponent } from "./preview-minimap/preview-minimap.component";
import { PreviewEntityFacetComponent } from "./preview-entity-facet/preview-entity-facet.component";
import { PreviewEntityPanelComponent } from "./preview-entity-panel/preview-entity-panel.component";
import { PreviewNavigator } from "./preview-navigator";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IntlModule,
    WebServicesModule,
    UtilsModule,
    BsActionModule,
    BsFacetModule,
    BsSearchModule,
    PreviewNavigator
  ],
  declarations: [
    Preview,
    PreviewSearchFormComponent,
    PreviewExtractsPanelComponent,
    PreviewEntityFacetComponent,
    PreviewEntityPanelComponent,

    PreviewTooltipComponent,
    PreviewMinimapComponent,
  ],
  exports: [
    Preview,
    PreviewSearchFormComponent,
    PreviewExtractsPanelComponent,
    PreviewEntityFacetComponent,
    PreviewEntityPanelComponent,

    PreviewTooltipComponent,
    PreviewMinimapComponent
  ],
})
export class PreviewModule { }
