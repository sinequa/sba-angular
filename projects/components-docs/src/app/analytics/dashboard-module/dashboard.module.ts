import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocDashboardModuleComponent } from './dashboard-module.component';
import { DocAddWidgetModalComponent } from './add-widget-modal/add-widget-modal.component';
import { DocDashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent } from '@sinequa/analytics/dashboard';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocDashboardModuleComponent }
];

@NgModule({
  declarations: [
    DocDashboardModuleComponent,
    DocAddWidgetModalComponent,
    DocDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    DashboardComponent
  ]
})
export class DocDashboardModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-add-widget', DocAddWidgetModalComponent);
    this.createElement('doc-dashboard', DocDashboardComponent);
  }
}
