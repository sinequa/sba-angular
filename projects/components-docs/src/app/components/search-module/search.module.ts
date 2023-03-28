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
import { createElement } from 'src/app/shared/create-element';

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
export class DocSearchModule {
  constructor() {
    createElement('doc-did-you-mean', DocDidYouMeanComponent);
    createElement('doc-load-more', DocLoadMoreComponent);
    createElement('doc-loading-bar', DocLoadingBarComponent);
    createElement('doc-page-size-selector', DocPageSizeSelectorComponent);
    createElement('doc-pager', DocPagerComponent);
    createElement('doc-scope', DocScopeComponent);
    createElement('doc-scroller', DocScrollerComponent);
    createElement('doc-sort-selector', DocSortSelectorComponent);
    createElement('doc-tabs', DocTabsComponent);
  }
}
