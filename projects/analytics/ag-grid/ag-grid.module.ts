import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AgGridModule as AGModule } from 'ag-grid-angular';

import { IntlModule } from '@sinequa/core/intl';
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionModule } from "@sinequa/components/action";
import { BsModalModule } from "@sinequa/components/modal";
import { BsFacetModule } from "@sinequa/components/facet";
import { ResultModule } from "@sinequa/components/result";

import { AgGridViewComponent } from "./ag-grid-view.component";
import { DataModalComponent } from "./data-modal.component";
import { FacetWrapperComponent } from "./facet-wrapper.component";

@NgModule({

    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule, 
        
        IntlModule,
        UtilsModule,
        BsActionModule,
        BsModalModule,
        ResultModule,
        BsFacetModule,
        
        AGModule.withComponents([FacetWrapperComponent]),
    ],
    declarations: [
        AgGridViewComponent,
        DataModalComponent,
        FacetWrapperComponent
    ],
    exports: [
        AgGridViewComponent
    ],
})
export class AgGridModule {}