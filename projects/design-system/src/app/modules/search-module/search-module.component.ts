import { Component } from '@angular/core';
import { DidYouMeanComponent } from './did-you-mean/did-you-mean.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { PageSizeSelectorComponent } from './page-size-selector/page-size-selector.component';
import { PagerComponent } from './pager/pager.component';
import { ScopeComponent } from './scope/scope.component';
import { ScrollerComponent } from './scroller/scroller.component';
import { SortSelectorComponent } from './sort-selector/sort-selector.component';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-search-module',
  templateUrl: '../../module-template.html'
})
export class SearchModuleComponent {

  title = 'Search Module';

  components = [
    DidYouMeanComponent,
    LoadMoreComponent,
    LoadingBarComponent,
    PageSizeSelectorComponent,
    PagerComponent,
    ScopeComponent,
    ScrollerComponent,
    SortSelectorComponent,
    TabsComponent
  ];

  constructor() { }

}
