import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionModule } from "@sinequa/components/action";
import { BsFacetModule } from "@sinequa/components/facet";

import { VisModule } from 'ngx-vis';
import { NetworkComponent } from "./network.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule, 

        IntlModule,
        UtilsModule,
        BsActionModule,
        BsFacetModule,
        
        VisModule
    ],
    declarations: [
        NetworkComponent
    ],
    exports: [
        NetworkComponent
    ],
})
export class NetworkModule {
}