import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";
import { BsActionModule } from "@sinequa/components/action";
import { BsFacetModule } from "@sinequa/components/facet";

import { NetworkComponent } from "./network.component";
import { BsNodeInfoCard } from "./node-info-card.component";
import { BsEdgeInfoCard } from "./edge-info-card.component";
import { VisNetworkDirective } from "./vis-network.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,

        IntlModule,
        UtilsModule,
        CollapseModule,
        BsActionModule,
        BsFacetModule
    ],
    declarations: [
        VisNetworkDirective,
        NetworkComponent,
        BsNodeInfoCard,
        BsEdgeInfoCard
    ],
    exports: [
        VisNetworkDirective,
        NetworkComponent,
        BsNodeInfoCard,
        BsEdgeInfoCard
    ],
})
export class NetworkModule {
}
