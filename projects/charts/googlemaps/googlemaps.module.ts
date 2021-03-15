import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from '@sinequa/core/intl';
import { BsActionModule } from "@sinequa/components/action";
import { BsFacetModule } from "@sinequa/components/facet";
import { BsSelectionModule } from '@sinequa/components/selection';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map.component';

@NgModule({

    imports: [
        CommonModule,
        IntlModule,
        BsActionModule,
        BsFacetModule,
        BsSelectionModule,
        
        AgmCoreModule,
    ],
    declarations: [
        MapComponent
    ],
    exports: [
        MapComponent
    ],
})
export class GoogleMapsModule {}