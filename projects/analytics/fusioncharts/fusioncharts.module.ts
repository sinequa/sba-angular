import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AngularFusionChartsModule } from "./angular-fusioncharts/fusioncharts.module";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";

import { IntlModule } from '@sinequa/core/intl';
import { BsSelectionModule } from '@sinequa/components/selection';
import { UtilsModule } from "@sinequa/components/utils";

import { FusionChart } from "./chart/chart";

FusionCharts.options.creditLabel = false;
// Fusion is a light theme, Candy is a dark theme
AngularFusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme, CandyTheme);

@NgModule({

    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        BsSelectionModule,
        AngularFusionChartsModule
    ],
    declarations: [
        FusionChart
    ],
    exports: [
        FusionChart
    ],
})
export class FusionChartsModule {}