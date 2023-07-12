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
import { createElement } from 'src/app/shared/create-element';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { DocFacetHelloWorldComponent } from './hello-world/facet-hello-world.component';
import { DocFacetContainerComponent } from './facet-container/facet-container.component';
import { DocTemplateCustomizationComponent } from './template-customization/template-customization.component';

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
    DocFacetContainerComponent,
    DocFacetRangeComponent,
    DocFacetTagCloudComponent,
    DocFacetTestingComponent,
    DocRefineComponent,
    HelloWorldComponent,
    DocFacetHelloWorldComponent,
    DocTemplateCustomizationComponent
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
export class DocFacetModule {
  constructor() {
    createElement('doc-facet', DocFacetComponent);
    createElement('doc-facet-list', DocFacetListComponent);
    createElement('doc-facet-filters', DocFacetFiltersComponent);
    createElement('doc-facet-range', DocFacetRangeComponent);
    createElement('doc-facet-bar', DocFacetBarComponent);
    createElement('doc-facet-multi', DocFacetMultiComponent);
    createElement('doc-facet-container', DocFacetContainerComponent);
    createElement('doc-facet-tag-cloud', DocFacetTagCloudComponent);
    createElement('doc-refine', DocRefineComponent);
    createElement('doc-facet-hello-world', DocFacetHelloWorldComponent);
    createElement('doc-template-customization', DocTemplateCustomizationComponent);
  }
}
