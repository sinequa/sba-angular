import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";
import {BsSelectionModule} from "@sinequa/components/selection";
import {BsModalModule} from "@sinequa/components/modal";
import {BsActionModule} from "@sinequa/components/action";

import {BASKET_COMPONENTS} from "../baskets.service";
import {BsEditBasket} from "./edit-basket/edit-basket";
import {BsManageBaskets} from "./manage-baskets/manage-baskets";
import {BsSelectBasket} from "./select-basket/select-basket";
import {BsResultBaskets} from "./result-baskets/result-baskets";
import {BsBasketsMenuComponent} from "./baskets-menu/baskets-menu.component";
import {BsFacetBasketsComponent} from './facet-baskets/facet-baskets.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,

        BsModalModule,
        IntlModule,
        ValidationModule,

        UtilsModule,
        BsSelectionModule,
        BsActionModule
    ],
    declarations: [
        BsEditBasket, BsManageBaskets, BsSelectBasket,
        BsResultBaskets, BsBasketsMenuComponent,
        BsFacetBasketsComponent
    ],
    exports: [
        BsEditBasket, BsManageBaskets, BsSelectBasket,
        BsResultBaskets, BsBasketsMenuComponent,
        BsFacetBasketsComponent
    ],
    providers: [
        {
            provide: BASKET_COMPONENTS,
            useValue: {
                selectBasketModal: BsSelectBasket,
                editBasketModal: BsEditBasket,
                manageBasketsModal: BsManageBaskets
            }
        }
    ]
})
export class BsBasketsModule {
}
