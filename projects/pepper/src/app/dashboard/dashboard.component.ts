import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { DashboardComponent, WidgetOption, DashboardService, Widget, WidgetState } from "@sinequa/analytics/dashboard";
import { FinanceModule } from "@sinequa/analytics/finance";
import { FusionChartsModule } from "@sinequa/analytics/fusioncharts";
import { BsHeatmapModule } from "@sinequa/analytics/heatmap";
import { NetworkModule, oOTBConfig, ProviderFactory } from "@sinequa/analytics/network";
import { BsTimelineModule } from "@sinequa/analytics/timeline";
import { BsFacetModule } from "@sinequa/components/facet";
import { PreviewHighlightColors, PreviewModule } from "@sinequa/components/preview";
import { ResultModule } from "@sinequa/components/result";
import { SearchService } from "@sinequa/components/search";
import { UIService, UtilsModule } from "@sinequa/components/utils";
import { IntlModule } from "@sinequa/core/intl";
import { Results } from "@sinequa/core/web-services";
import { map, Observable, of, tap } from "rxjs";
import { GoogleMapsModule } from "@sinequa/analytics/googlemaps";
import { UserPreferences } from "@sinequa/components/user-settings";
import { NotificationsService } from "@sinequa/core/notification";
import { AppService } from "@sinequa/core/app-utils";
import { PREVIEW_HIGHLIGHTS, SELECTORS_HIGHLIGHTS } from "../../config";
import { HighlightService } from "@sinequa/components/metadata";

const defaultOptions = {
  renamable: false,
  maximizable: true,
  removable: true,
  unique: true,
  rows: 2,
  cols: 2
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [`
:host {
  position: relative;
}
.sq-dashboard-toolbar {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}
  `],
    imports: [
        CommonModule, // angular dependencies
        IntlModule, // @sinequa/core
        ResultModule, BsFacetModule, PreviewModule, UtilsModule, // @sinequa/components
        DashboardComponent, FusionChartsModule, BsHeatmapModule, BsTimelineModule, NetworkModule, GoogleMapsModule, FinanceModule, // @sinequa/analytics
    ]
})
export class AppDashboardComponent implements OnChanges {
  @Input() results: Results;

  @Output() recordClicked = new EventEmitter<Record>();

  /** Reference to the sq-dashboard component */
  @ViewChild(DashboardComponent)
  dashboardComponent: DashboardComponent;

  /** List of all supported widgets. the type property must correspond to a "ngSwitchCase" in the template */
  widgets: WidgetOption[] = [
    {type: 'map',            icon: 'fas fa-globe-americas fa-fw',  text: 'msg#dashboard.map',      ...defaultOptions },
    {type: 'timeline',       icon: 'fas fa-chart-line fa-fw',      text: 'msg#dashboard.timeline', ...defaultOptions },
    {type: 'network',        icon: 'fas fa-project-diagram fa-fw', text: 'msg#dashboard.network',  ...defaultOptions, init: widget => widget.providers = oOTBConfig(this.providerFactory) },
    {type: 'chart',          icon: 'fas fa-chart-bar fa-fw',       text: 'msg#dashboard.chart',    ...defaultOptions, unique: false, state: {aggregation: 'Company', chartType: 'Column2D'} },
    {type: 'heatmap',        icon: 'fas fa-th fa-fw',              text: 'msg#dashboard.heatmap',  ...defaultOptions, rows: 3 },
    {type: 'tagcloud',       icon: 'fas fa-comments fa-fw',        text: 'msg#dashboard.tagcloud', ...defaultOptions },
    {type: 'money-timeline', icon: 'fas fa-search-dollar fa-fw',   text: 'msg#money.timeline',     ...defaultOptions },
    {type: 'money-cloud',    icon: 'fas fa-comment-dollar fa-fw',  text: 'msg#money.cloud',        ...defaultOptions },
    {type: 'preview',        icon: 'far fa-file-alt fa-fw',        text: '',                       ...defaultOptions, rows: 3, renamable: false, init: widget => widget.record = this.getRecord(widget) },
  ]

  /** Widgets created by default */
  defaultWidgets: string[] = ['map', 'timeline', 'network', 'chart'];

  /** Dashboard displayed by sq-dashboard */
  dashboard: Widget[];

  /** Id of a record to which we want to scroll */
  clickedRecordId = '';

  /** Number of currently opened previews */
  previewCount = 0;

  constructor(
    public appService: AppService,
    public highlightService: HighlightService,
    public searchService: SearchService,
    public dashboardService: DashboardService,
    public providerFactory: ProviderFactory,
    public notificationsService: NotificationsService,
    public readonly ui: UIService,
    public prefs: UserPreferences
  ) {
    const highlights: {selectors: string[], highlights: PreviewHighlightColors[]}[] = this.appService.app?.data?.highlights as any || SELECTORS_HIGHLIGHTS;
    this.highlightService.setHighlights(highlights);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.dashboard) {
      const states = this.prefs.get("dashboard");
      // Try to revive dashboard from user preferences, or set the default dashboard
      this.dashboard = states? this.createDashboard(states) : this.createDefaultDashboard();
      this.updatePreviewCount();
    }

    // Update the 'opened' state of new records
    if(changes.results) {
      for(const record of this.results.records) {
        record['$opened'] = this.dashboard.some(widget => widget.state.recordId === record.id);
      }
    }
  }

  createDefaultDashboard(): Widget[] {
    return this.defaultWidgets
      .map(type => this.getOption(type))
      .map(option => this.dashboardService.createWidget(option));
  }

  createDashboard(states: WidgetState[]) {
    try {
      return states.map(state => {
        const option = this.getOption(state.type);
        option.state = state;
        return this.dashboardService.createWidget(option);
      });
    }
    catch(err) {
      this.notificationsService.error("Failed to import dashboard! See the console for more information");
      console.error(err);
      return [];
    }
  }

  addWidget() {
    // First get the list of widgets that can be added
    const widgets = this.widgets.filter(
      w => w.type !== 'preview' && (!w.unique || this.getWidgets(w.type).length === 0)
    );
    // Then, prompt the user for one
    this.dashboardService.promptAdd(widgets).then(widget => {
      if(widget) {
        // Add the widget selected by the user
        this.dashboardComponent.add(widget);
      }
    });
  }

  onChanged(widgets: Widget[]) {
    this.updatePreviewCount(widgets);
    // Save the dashboard in the user preferences
    this.prefs.set("dashboard", widgets.map(w => w.state));
  }

  protected getOption(type: string): WidgetOption {
    const option = this.widgets.find(w => w.type === type);
    if(!option) {
      throw new Error("Unknown widget type! "+type);
    }
    return {...option};
  }

  protected getWidgets(type: string, widgets = this.dashboard): Widget[] {
    return widgets.filter(w => w.state.type === type);
  }

  // Button to reset the dashboard

  reset() {
    this.dashboardService.promptReset().then(confirmed => {
      if(confirmed) {
        this.dashboard = this.createDefaultDashboard();
      }
    });
  }


  // Import and export
  export() {
    this.dashboardService.export(this.dashboard);
  }

  import(input: HTMLInputElement) {
    this.dashboardService.import(input).then(
      res => this.dashboard = this.createDashboard(res),
      err => console.warn("Aborted import", err)
    );
  }

  // Button to toggle the visibility of results

  @Input() showResults: boolean;
  @Output() toggleResults = new EventEmitter();

  onToggleResults() {
    this.toggleResults.emit();
    // wait for the transition to be finished before updating the gridster dimensions
    setTimeout(() => this.dashboardComponent.resize(), 500);
  }


  // Preview management

  openPreview(record: Record) {
    if(!record['$opened']) {
      record['$opened'] = true;
      const option = this.getOption('preview');
      option.state = {recordId: record.id, queryStr: this.searchService.query.toJsonForQueryString()};
      const widget = this.dashboardService.createWidget(option);
      this.dashboardComponent.add(widget);
    }
    else {
      // If already opened, scroll to this widget
      this.clickedRecordId = record.id;
    }
  }

  closePreviews() {
    this.getWidgets('preview').forEach(
      w => this.dashboardComponent.remove(w.state)
    )
  }

  /**
   * Retrieve a record to display its preview
   */
  getRecord(widget: Widget): Observable<Record> {
    widget.query = this.searchService.makeQuery().fromJson(widget.state.queryStr); // Try to retrieve the record from a dedicated query
    widget.query.addFilter({field: 'id', value: widget.state.recordId});
    const record = this.results.records.find(r => r.id === widget.state.recordId); // Try to retrieve the record from the results list
    return record? of(record) : this.searchService.getResults(widget.query, undefined, {searchInactive: true}).pipe(
      map(res => res.records[0]),
      tap(record => {
        if(!record) {
          widget.error = "Could not retrieve record"
        }
      })
    );
  }

  updatePreviewCount(widgets = this.dashboard) {
    this.previewCount = this.getWidgets('preview', widgets).length;
  }

  onRemoved(widget: Widget) {
    if(widget.state.type === 'preview') {
      const record = this.results.records.find(r => r.id === widget.state.recordId);
      if(record) {
        record['$opened'] = false;
      }
    }
  }


  public get previewHighlights(): PreviewHighlightColors[] {
    return this.appService.app?.data?.previewHighlights as any || PREVIEW_HIGHLIGHTS;
  }

}
