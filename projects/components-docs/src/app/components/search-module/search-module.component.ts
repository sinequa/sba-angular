import { Component } from '@angular/core';
import { DocDidYouMeanComponent } from './did-you-mean/did-you-mean.component';
import { DocLoadMoreComponent } from './load-more/load-more.component';
import { DocLoadingBarComponent } from './loading-bar/loading-bar.component';
import { DocPageSizeSelectorComponent } from './page-size-selector/page-size-selector.component';
import { DocPagerComponent } from './pager/pager.component';
import { DocScopeComponent } from './scope/scope.component';
import { DocScrollerComponent } from './scroller/scroller.component';
import { DocSortSelectorComponent } from './sort-selector/sort-selector.component';
import { DocTabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'doc-search-module',
  templateUrl: '../../module-template.html'
})
export class DocSearchModuleComponent {

  title = 'Search Module';

  components = [
    DocDidYouMeanComponent,
    DocLoadMoreComponent,
    DocLoadingBarComponent,
    DocPageSizeSelectorComponent,
    DocPagerComponent,
    DocScopeComponent,
    DocScrollerComponent,
    DocSortSelectorComponent,
    DocTabsComponent
  ];

  constructor() { }

}
