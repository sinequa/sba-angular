import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from './code.component';
import { DocComponentDemoComponent } from './component-demo.component';
import { BsFacetModule, FacetState, NamedFacetConfig } from '@sinequa/components/facet';

// List of default facets displayed (only facet2 is displayed here)
export const defaultFacets: FacetState[] = [
  { name: "facet1", position: 0 },
  { name: "facet2", position: 1 },
  { name: "facet3", position: 2 }
];

// List of facet configurations (of type list and tree)
export const namedFacetConfig: NamedFacetConfig[] = [
  {
      name: "facet1",
      title: "Modified",
      type: "list",
      icon: "fas fa-calendar-day",
      aggregation: 'modified'
  },
  {
      name: "facet2",
      title: "Tree path",
      type: "tree",
      icon: "fas fa-sitemap",
      aggregation: "Treepath"
  },
  {
      name: "facet3",
      title: "Person",
      type: "list",
      icon: "fas fa-user",
      aggregation: "Person"
  }
];

@NgModule({
  declarations: [
    DocCodeComponent,
    DocComponentDemoComponent
  ],
  imports: [
    CommonModule,
    BsFacetModule.forRoot(namedFacetConfig, defaultFacets)
  ],
  exports: [
    DocCodeComponent,
    DocComponentDemoComponent
  ]
})
export class DocBaseModule { }
