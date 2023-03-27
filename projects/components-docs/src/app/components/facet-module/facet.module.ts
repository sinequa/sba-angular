import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocFacetModuleComponent } from './facet-module.component';
import { DocFacetComponent } from './facet/facet.component';
import { DocFacetBarComponent } from './facet-bar/facet-bar.component';
import { DocFacetFiltersComponent } from './facet-filters/facet-filters.component';
import { DocFacetListComponent } from './facet-list/facet-list.component';
import { DocFacetMultiComponent } from './facet-multi/facet-multi.component';
import { DocFacetRangeComponent } from './facet-range/facet-range.component';
import { DocFacetTagCloudComponent } from './facet-tag-cloud/facet-tag-cloud.component';
import { DocFacetTestingComponent } from './facet-testing/facet-testing.component';
import { DocRefineComponent } from './refine/refine.component';
import { BsFacetModule } from '@sinequa/components/facet';
import { BsTimelineModule } from '@sinequa/analytics/timeline';
import { FormsModule } from '@angular/forms';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocFacetModuleComponent }
];

@NgModule({
  declarations: [
    DocFacetModuleComponent,
    DocFacetComponent,
    DocFacetBarComponent,
    DocFacetFiltersComponent,
    DocFacetListComponent,
    DocFacetMultiComponent,
    DocFacetRangeComponent,
    DocFacetTagCloudComponent,
    DocFacetTestingComponent,
    DocRefineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsFacetModule,
    BsTimelineModule,
    FormsModule
  ]
})
export class DocFacetModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-facet', DocFacetComponent);
    this.createElement('doc-facet-list', DocFacetListComponent);
    this.createElement('doc-facet-filters', DocFacetFiltersComponent);
    this.createElement('doc-facet-range', DocFacetRangeComponent);
    this.createElement('doc-facet-bar', DocFacetBarComponent);
    this.createElement('doc-facet-multi', DocFacetMultiComponent);
    this.createElement('doc-facet-tag-cloud', DocFacetTagCloudComponent);
    this.createElement('doc-refine', DocRefineComponent);
  }
}
