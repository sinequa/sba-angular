import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocFinanceModuleComponent } from './finance-module.component';
import { DocMoneyCloudComponent } from './money-cloud/money-cloud.component';
import { DocMoneyTimelineComponent } from './money-timeline/money-timeline.component';
import { FinanceModule } from '@sinequa/analytics/finance';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocFinanceModuleComponent }
];

@NgModule({
  declarations: [
    DocFinanceModuleComponent,
    DocMoneyCloudComponent,
    DocMoneyTimelineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    FinanceModule
  ]
})
export class DocFinanceModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-money-cloud', DocMoneyCloudComponent);
    this.createElement('doc-money-timeline', DocMoneyTimelineComponent);
  }
}
