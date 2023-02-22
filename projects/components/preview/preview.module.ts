import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@sinequa/core/intl";
import { WebServicesModule } from "@sinequa/core/web-services";
import { UtilsModule } from "@sinequa/components/utils";
import { BsSearchModule } from "@sinequa/components/search";
import { BsActionModule } from "@sinequa/components/action";
import { Preview } from "./preview.component";
import { PreviewSearchFormComponent } from './preview-search-form.component';
import { PreviewTooltipComponent } from "./preview-tooltip";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IntlModule,
    WebServicesModule,
    UtilsModule,
    BsActionModule,
    BsSearchModule
  ],
  declarations: [
    Preview, PreviewTooltipComponent, PreviewSearchFormComponent
  ],
  exports: [
    Preview, PreviewSearchFormComponent
  ],
})
export class PreviewModule { }
