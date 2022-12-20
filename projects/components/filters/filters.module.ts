import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DragDropModule} from '@angular/cdk/drag-drop';

import { FiltersComponent } from "./filters.component";
import { FiltersEditorComponent } from "./filters-editor.component";
import { DragAndDropManagerDirective } from "./drag-drop-manager.directive";

import { installPatch } from "./drag-drop-patch";
import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionModule } from "@sinequa/components/action";

// This patches Angular CDK to enable nested drag & drop lists
// See: https://mounted.medium.com/angular-cdk-nested-drag-and-drop-d849365a7ca9
installPatch();

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    IntlModule,
    UtilsModule,
    BsActionModule
  ],
  exports: [FiltersComponent, FiltersEditorComponent],
  declarations: [
    FiltersComponent,
    FiltersEditorComponent,
    DragAndDropManagerDirective,
  ]
})
export class FiltersModule {}
