import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { Record } from '@sinequa/core/web-services';
import { SelectionService } from '@sinequa/components/selection';
import { SearchService } from '@sinequa/components/search';
import { FacetConfig, FacetService } from '@sinequa/components/facet';
import { UIService } from '@sinequa/components/utils';
import { PreviewService } from '@sinequa/components/preview';
import { Action } from '@sinequa/components/action';
import { FACETS, METADATA, FEATURES } from '../../config';
import { MAP_WIDGET, TIMELINE_WIDGET, NETWORK_WIDGET, CHART_WIDGET } from '../dashboard/dashboard-add-item.component';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  // Dynamic display of facets titles/icons in the multi-facet component
  public multiFacetIcon? = "fas fa-filter fa-fw";
  public multiFacetTitle = "msg#facet.filters.title";

  private _searchServiceSubscription: Subscription;
  
  darkAction: Action;
  dashboardActions: Action[] = [];

  lastSelectedId?: string;
  lastClickedId?: string;

  constructor(
    public searchService: SearchService,
    public facetService: FacetService,
    public selectionService: SelectionService,
    private previewService: PreviewService,
    private titleService: Title,
    private intlService: IntlService,
    private appService: AppService,
    public loginService: LoginService,
    public dashboardService: DashboardService,
    public ui: UIService,
    public cdRef: ChangeDetectorRef
  ) {

    // Subscribe to the search service to update the page title based on the searched text
    this._searchServiceSubscription = this.searchService.resultsStream.subscribe(results => {
      this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", {search: this.searchService.query.text || ""}));
      
      // Hack to fix an issue with change detection...
      setTimeout(() => {
        this.cdRef.detectChanges();
      }, 0); 
    });
  
    this.ui.addResizeListener(event => {
      this.dashboardService.options.fixedRowHeight = (window.innerHeight - 150) / 4;
      this.dashboardService.updateOptions(this.dashboardService.options);
    });

    this.darkAction = new Action({
      text: 'Dark mode',
      title: 'Toggle dark mode',
      icon: this.isDark()? 'fas fa-toggle-on fa-fw' : 'fas fa-toggle-off fa-fw',
      action: (action) => {
        this.toggleDark();
        action.icon = this.isDark()? 'fas fa-toggle-on fa-fw' : 'fas fa-toggle-off fa-fw';
      }
    })
  }


  /**
   * Initialize the page title
   */
  ngOnInit() {
    this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", {search: ""}));
        
    this.dashboardService.setDefaultDashboard([MAP_WIDGET, TIMELINE_WIDGET, NETWORK_WIDGET, CHART_WIDGET]);
    this.dashboardActions = this.dashboardService.createDashboardActions();
  }

  /**
   * Unsubscribe from the search service
   */
  ngOnDestroy(){
    this._searchServiceSubscription.unsubscribe();
  }

  /**
   * Returns the configuration of the facets displayed in the facet-multi component.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get facets(): FacetConfig[] {
    if(this.appService.app && this.appService.app.data && this.appService.app.data.facets){
      return <FacetConfig[]> <any> this.appService.app.data.facets;
    }
    return FACETS;
  }

  /**
   * Returns the list of features activated in the top right menus.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get features(): string[] {
    if(this.appService.app && this.appService.app.data && this.appService.app.data.features){
      return <string[]> <any> this.appService.app.data.features;
    }
    return FEATURES;
  }

  /**
   * Returns the configuration of the metadata displayed in the facet-preview component.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get metadata(): string[] {
    if(this.appService.app && this.appService.app.data && this.appService.app.data.metadata){
      return <string[]> <any> this.appService.app.data.metadata;
    }
    return METADATA;
  }

  /**
   * Responds to a change of facet in the multi facet
   * @param facet
   */
  facetChanged(facet: FacetConfig){
    if(!facet) {
      this.multiFacetIcon = "fas fa-filter fa-fw";
      this.multiFacetTitle = "msg#facet.filters.title";
    }
    else {
      this.multiFacetIcon = facet.icon;
      this.multiFacetTitle = facet.title;
    }
  }

  /**
   * Responds to a click on a document
   * @param record
   * @param event
   */
  onDocumentClicked(record: Record, event: Event) {
    if(!this.isClickAction(event)){
      if(!this.isOpened(record)) {
        const item = this.dashboardService.addWidget({
          type: 'preview',
          icon: 'far fa-file-alt',
          text: '',
          unique: false
        }, this.dashboardService.dashboard, 2, 3, false); // closable = false, as the underlying component already exposes a "close" action
        item.recordId = record.id;
        item.queryStr = this.searchService.query.toJsonForQueryString();
      }
      else {
        this.lastClickedId = record.id;
      }
    }
  }

  /**
   * Responds to a click on a document represented within a view (eg. on a map)
   * @param record 
   */
  onDocumentClickedFromView(record: Record) {
    this.selectionService.toggleSelectedRecords(record);
    if(record.$selected) {
      this.lastSelectedId = record.id;
    }
  }

  /**
   * Open the preview when this record has no url1
   * @param record 
   * @param isLink 
   */
  openPreviewIfNoUrl(record: Record, isLink: boolean) {
    if(!isLink){
      this.previewService.openRoute(record, this.searchService.query);
    }
  }

  // VERY SPECIFIC TO THIS APP:
  // Make sure the click is not meant to trigger an action (from sq-result-source or sq-result-title)
  private isClickAction(event: Event): boolean {
    if (event.type !== 'click') {
      return true;
    }
    const target = event.target as HTMLElement;
    if (!target) {
      return false;
    }
    return event.type !== 'click' ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.matches("sq-result-selector *, .sq-result-title, sq-result-source *");
  }

  /**
   * Whether the UI is in dark or light mode
   */
  isDark(): boolean {
    return document.body.classList.contains("dark");
  }

  /**
   * Toggle dark mode
   */
  toggleDark() {
    document.body.classList.toggle("dark");
    localStorage.setItem('sinequa-theme', this.isDark()? 'dark' : 'normal');
    return false;
  }

  /**
   * Whether the record is opened or not in the dashboard
   * @param record 
   */
  isOpened(record: Record): boolean {
    return !!this.dashboardService.dashboard.items.find(item => item.recordId === record.id);
  }
}
