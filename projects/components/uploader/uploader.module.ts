import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from "@sinequa/core/intl";

import { UtilsModule } from "@sinequa/components/utils";
import { UploaderComponent } from './uploader/uploader.component';
import { UploadsListComponent } from './uploads-list/uploads-list.component';
import { UploadsStatusComponent } from './uploads-status/uploads-status.component';
import { BsFacetModule } from "../facet";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        BsFacetModule
    ],
    declarations: [
        UploaderComponent,
        UploadsListComponent,
        UploadsStatusComponent
    ],
    exports: [
        UploaderComponent,
        UploadsListComponent,
        UploadsStatusComponent
    ]
})
export class UploaderModule {
}
