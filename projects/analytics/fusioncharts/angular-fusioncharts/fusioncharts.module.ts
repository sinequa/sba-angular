import { NgModule, ModuleWithProviders } from '@angular/core';

import { FusionChartsComponent } from './fusioncharts.component';
import { FusionChartsDirective } from './fusioncharts.directive';
import { FusionChartsPipe } from './fusioncharts.pipe';
import { FusionChartsStatic, FusionChartsService } from './fusioncharts.service';

@NgModule({
    declarations: [
        FusionChartsComponent,
        FusionChartsDirective,
        FusionChartsPipe
    ],
    exports: [
        FusionChartsComponent,
        FusionChartsDirective,
        FusionChartsPipe
    ],
    providers: [
        FusionChartsService,
        FusionChartsStatic
    ]
})
export class AngularFusionChartsModule {
    // Keep this for backward compatible
    static forRoot(fcCore?: any, ...fcModules: any[]): ModuleWithProviders<AngularFusionChartsModule> {
        return {
            ngModule: AngularFusionChartsModule,
            providers: [{
                provide: FusionChartsStatic,
                useValue: {
                    core: fcCore,
                    modules: fcModules
                }
            }]
        };
    }

    static fcRoot(fcCore?: any, ...fcModules: any[]) {
        FusionChartsService.setFCRoot({
            core: fcCore,
            modules: fcModules
        });
    }
}