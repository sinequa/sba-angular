import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocFinanceModuleComponent } from './finance-module.component';
import { DocMoneyCloudComponent } from './money-cloud/money-cloud.component';
import { DocMoneyTimelineComponent } from './money-timeline/money-timeline.component';
import { FinanceModule } from '@sinequa/analytics/finance';
import { createElement } from 'src/app/shared/create-element';

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
export class DocFinanceModule {
  constructor() {
    createElement('doc-money-cloud', DocMoneyCloudComponent);
    createElement('doc-money-timeline', DocMoneyTimelineComponent);
  }
}
