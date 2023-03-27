import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocSearchModuleComponent } from './search-module.component';
import { DocDidYouMeanComponent } from './did-you-mean/did-you-mean.component';
import { DocLoadMoreComponent } from './load-more/load-more.component';
import { DocLoadingBarComponent } from './loading-bar/loading-bar.component';
import { DocPageSizeSelectorComponent } from './page-size-selector/page-size-selector.component';
import { DocPagerComponent } from './pager/pager.component';
import { DocScopeComponent } from './scope/scope.component';
import { DocScrollerComponent } from './scroller/scroller.component';
import { DocSortSelectorComponent } from './sort-selector/sort-selector.component';
import { DocTabsComponent } from './tabs/tabs.component';
import { BsSearchModule, SearchOptions } from "@sinequa/components/search";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocSearchModuleComponent }
];

// Search options (search service)
export const searchOptions: SearchOptions = {
  routes: ["facet"],
  deactivateRouting: true
};

@NgModule({
  declarations: [
    DocSearchModuleComponent,
    DocDidYouMeanComponent,
    DocLoadMoreComponent,
    DocLoadingBarComponent,
    DocPageSizeSelectorComponent,
    DocPagerComponent,
    DocScopeComponent,
    DocScrollerComponent,
    DocSortSelectorComponent,
    DocTabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsSearchModule.forRoot(searchOptions)
  ]
})
export class DocSearchModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-did-you-mean', DocDidYouMeanComponent);
    this.createElement('doc-load-more', DocLoadMoreComponent);
    this.createElement('doc-loading-bar', DocLoadingBarComponent);
    this.createElement('doc-page-size-selector', DocPageSizeSelectorComponent);
    this.createElement('doc-pager', DocPagerComponent);
    this.createElement('doc-scope', DocScopeComponent);
    this.createElement('doc-scroller', DocScrollerComponent);
    this.createElement('doc-sort-selector', DocSortSelectorComponent);
    this.createElement('doc-tabs', DocTabsComponent);
  }
}
