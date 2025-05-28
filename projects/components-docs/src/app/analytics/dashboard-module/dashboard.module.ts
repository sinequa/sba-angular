import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocDashboardModuleComponent } from './dashboard-module.component';
import { DocAddWidgetModalComponent } from './add-widget-modal/add-widget-modal.component';
import { DocDashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent } from '@sinequa/analytics/dashboard';
import { createElement } from 'src/app/shared/create-element';
import { DocDashboard2Component } from './dashboard/dashboard2.component';
import { BsFacetModule } from '@sinequa/components/facet';
import { FusionChartsModule } from '@sinequa/analytics/fusioncharts';

const routes: Routes = [
  { path: '', component: DocDashboardModuleComponent }
];

@NgModule({
  declarations: [
    DocDashboardModuleComponent,
    DocAddWidgetModalComponent,
    DocDashboardComponent,
    DocDashboard2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    DashboardComponent,
    BsFacetModule,
    FusionChartsModule
  ]
})
export class DocDashboardModule {
  constructor() {
    createElement('doc-add-widget', DocAddWidgetModalComponent);
    createElement('doc-dashboard', DocDashboardComponent);
    createElement('doc-dashboard2', DocDashboard2Component);
  }
}
