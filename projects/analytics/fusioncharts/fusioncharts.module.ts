import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from '@sinequa/core/intl';
import { BsSelectionModule } from '@sinequa/components/selection';
import { UtilsModule } from "@sinequa/components/utils";

import { FusionChart } from "./chart/chart";
import { FusionChartsDirective } from "./angular-fusioncharts/fusioncharts.directive";
import { FusionChartsService, FusionChartsStatic } from "./angular-fusioncharts/fusioncharts.service";
import { MultiLevelPieChart } from "./multi-level-pie-chart/multi-level-pie-chart";


@NgModule({
  imports: [
    CommonModule,
    IntlModule,
    UtilsModule,
    BsSelectionModule
  ],
  declarations: [
    FusionChartsDirective,
    FusionChart,
    MultiLevelPieChart
  ],
  exports: [
    FusionChartsDirective,
    FusionChart,
    MultiLevelPieChart
  ]
})
export class FusionChartsModule {
  static forRoot(core: any, ...modules: any[]): ModuleWithProviders<FusionChartsModule> {
    return {
      ngModule: FusionChartsModule,
      providers: [
        FusionChartsService,
        {
          provide: FusionChartsStatic,
          useValue: {
            core,
            modules
          }
        }
      ]
    }
  }
}
