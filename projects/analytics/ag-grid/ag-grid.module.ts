import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from '@sinequa/core/intl';
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionModule } from "@sinequa/components/action";
import { BsModalModule } from "@sinequa/components/modal";
import { AgGridModule as AGModule } from 'ag-grid-angular';
import { ResultModule } from "@sinequa/components/result";

import { AgGridViewComponent } from "./ag-grid-view.component";
import { DataModalComponent } from "./data-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({

    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule, 
        
        IntlModule,
        UtilsModule,
        BsActionModule,
        BsModalModule,
        ResultModule,
        
        AGModule.withComponents([]),
    ],
    declarations: [
        AgGridViewComponent,
        DataModalComponent
    ],
    exports: [
        AgGridViewComponent
    ],
})
export class AgGridModule {}