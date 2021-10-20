import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ResultModule } from "@sinequa/components/result";
import { BsSearchModule } from "@sinequa/components/search";
import { BsSelectionModule } from "@sinequa/components/selection";
import { UtilsModule } from "@sinequa/components/utils";
import { IntlModule } from "@sinequa/core/intl";
import { SlideBuilderComponent } from "./slide-builder.component";
import { SlideListComponent } from "./slide-list.component";
import { SlideTileComponent } from "./slide-tile.component";

@NgModule({
    imports: [
        CommonModule,

        IntlModule,

        ResultModule,
        BsSearchModule,
        BsSelectionModule,
        UtilsModule,
    ],
    declarations:[
        SlideBuilderComponent,
        SlideTileComponent,
        SlideListComponent
    ],
    exports: [
        SlideBuilderComponent,
        SlideListComponent
    ]
})
export class SlideBuilderModule {}