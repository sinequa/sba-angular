import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    AreaChartModule,
    BarChartModule,
    PieChartModule,
    TreeMapModule,
    NumberCardModule,
    GaugeModule } from "@swimlane/ngx-charts";

import { IntlModule } from '@sinequa/core/intl';
import { UtilsModule } from "@sinequa/components/utils";
import { BsSelectionModule } from "@sinequa/components/selection";

import { NgxChart } from "./chart/chart";
import { FacetNgxChart } from "./facet-chart/facet-chart";

@NgModule({

    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        BsSelectionModule,
        
        // ngx-charts modules
        AreaChartModule,
        BarChartModule,
        PieChartModule,
        TreeMapModule,
        NumberCardModule,
        GaugeModule
    ],
    declarations: [
        NgxChart, FacetNgxChart
    ],
    exports: [
        NgxChart, FacetNgxChart
    ],
})
export class NgxChartsModule {}