import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from '@sinequa/core/intl';
import { BsSelectionModule } from '@sinequa/components/selection';
import { UtilsModule } from "@sinequa/components/utils";

import { FusionChart } from "./chart/chart";
import { FusionChartsComponent } from "./angular-fusioncharts/fusioncharts.component";
import { FusionChartsService, FusionChartsStatic } from "./angular-fusioncharts/fusioncharts.service";


@NgModule({

    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        BsSelectionModule
    ],
    declarations: [
        FusionChartsComponent,
        FusionChart
    ],
    exports: [
        FusionChartsComponent,
        FusionChart
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
