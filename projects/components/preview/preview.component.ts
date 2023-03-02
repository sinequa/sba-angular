import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { AppService, Query } from "@sinequa/core/app-utils";
import { AuditEventType, PreviewData, PreviewWebService } from "@sinequa/core/web-services";
import { UserPreferences } from "@sinequa/components/user-settings";
import { PreviewFrameService } from "./preview-frames.service";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { PreviewEntityOccurrence } from "./preview-tooltip.component";
import { UIService } from "@sinequa/components/utils";
import { MinimapItem } from "./preview-minimap.component";
import { Utils } from "@sinequa/core/base";

export interface PreviewHighlightColors {
  name: string;
  color?: string;
  bgColor?: string;
}

interface EntityHoverEvent {id: string, position: DOMRect};
interface TextSelectionEvent {selectedText: string, position: DOMRect};

interface PreviewTooltipData {
  entity?: PreviewEntityOccurrence;
  selectedText?: string;
  actions?: Action[];
  position: DOMRect;
}

interface MinimapData {
  locations: MinimapItem[];
  passageLocation?: MinimapItem;
}

export const DEFAULT_SANDBOX = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";


@Component({
  selector: 'sq-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Preview extends AbstractFacet implements OnChanges, OnDestroy {

  // Document management
  @Input() id: string;
  @Input() query: Query;

  // Scale management
  /** Default scale */
  @Input() scale = 1;
  /** Increment/decrement of scale (additive) */
  @Input() scaleIncrement = 0.1;

  // Highlight management
  /** Highlights configuration */
  @Input() highlightColors: PreviewHighlightColors[] = [];
  /** Whether to highlight entities by default */
  @Input() highlightEntities = true;
  /** Whether to highlight extracts by default */
  @Input() highlightExtracts = true;
  /** Whether to display the highlight actions */
  @Input() highlightActions = true;
  /** List of highlights considered as "extracts" */
  @Input() extracts = ["matchlocations", "extractslocations", "matchingpassages"];
  /** List of highlights considered as "entities" */
  get entities() {
    return this.allHighlights.filter(name => !this.extracts.includes(name));
  }
  /** Name of the preference property used to stored the highlight preferences */
  @Input() preferenceName = 'preview';


  // Tooltip management
  /** Whether to display a tooltip when hovering entities or selecting text */
  @Input() showTooltip = false;
  /** Actions to display above a hovered entity */
  @Input() entityActions?: Action[];
  /** Actions to display above a selected text */
  @Input() textActions?: Action[];

  // Minimap management
  /** Whether to display the minimap next to the preview iframe */
  @Input() showMinimap = false;
  /** Which highlight type should the minimap display */
  @Input() minimapType = 'extractslocations';
  /** Spacing for the minimap, which is positioned absolutely */
  @HostBinding("style.padding-right.rem")
  get minimapSpace() {
    return this.showMinimap? 1 : 0;
  }

  //Misc
  /** Whether to show an action to download the PDF version of the document (if it exists) */
  @Input() downloadablePdf = true;

  /**
   * Three possible sandbox configurations:
   * - Use a given sanbox (string)
   * - Use the default sandbox (undefined or unbinded)
   * - No sandbox (null)
   */
  @Input()
  set sandbox(sb: string|null|undefined) {
    this._sandbox = sb === null? undefined : sb || DEFAULT_SANDBOX;
  }
  _sandbox: string|undefined;

  /** Emits an event when the preview is ready for any interaction via this component */
  @Output() ready = new EventEmitter();

  // Reference to the iframe's window
  @ViewChild("preview") iframe: ElementRef<HTMLIFrameElement>;
  get preview(): Window | null {
    return this.iframe?.nativeElement?.contentWindow;
  }

  /** Subject emitting a value when the "selected highlight" changes */
  public selectedId$ = new BehaviorSubject<string|undefined>(undefined);

  /** Subject emitting an object triggering the display of a tooltip, or undefined to hide it */
  public tooltip$ = new Subject<PreviewTooltipData | undefined>();

  /** Subject emitting data to display the minimap */
  public minimap$ = new Subject<MinimapData>();

  /** Subject emitting the list of highlights when it changes */
  public highlights$ = new BehaviorSubject<string[]>([]);

  // Actions

  zoomInAction: Action;
  zoomOutAction: Action;
  toggleEntitiesAction: Action;
  toggleExtractsAction: Action;
  pdfDownloadAction: Action;

  _actions: Action[];
  override get actions() { return this._actions; }


  // Other state

  loading = false;
  url?: string;               // URL as a string
  safeUrl?: SafeResourceUrl;  // Sanitized URL, ready for the iframe
  data?: PreviewData;         // The preview data returned by the /api/v1/preview web service

  constructor(
    public previewWS: PreviewWebService,
    public previewFrames: PreviewFrameService,
    public sanitizer: DomSanitizer,
    public appService: AppService,
    public searchService: SearchService,
    public prefs: UserPreferences,
    public cdRef: ChangeDetectorRef,
    public ui: UIService,
    public el: ElementRef
  ) {
    super();

    this.zoomOutAction = new Action({
      icon: "fas fa-fw fa-search-minus",
      title: "msg#preview.minimize",
      action: () => {
        this.scale -= this.scaleIncrement;
        this.updateActions();
        this.cdRef.detectChanges();
        this.onResize();
      },
      updater: action => action.disabled = this.scale <= 0.2
    });

    this.zoomInAction = new Action({
      icon: "fas fa-fw fa-search-plus",
      title: "msg#preview.maximize",
      action: () => {
        this.scale += this.scaleIncrement;
        this.updateActions();
        this.cdRef.detectChanges();
        this.onResize();
      },
      updater: action => action.disabled = this.scale >= 3
    });

    this.toggleEntitiesAction = new Action({
      icon: "fas fa-fw fa-lightbulb",
      title: "msg#preview.toggleEntities",
      action: (action) => this.toggleEntities(!action.selected),
      updater: action => action.selected = this.entities.some(e => this.highlightsPref.includes(e))
    });

    this.toggleExtractsAction = new Action({
      icon: "fas fa-fw fa-highlighter",
      title: "msg#preview.toggleExtracts",
      action: (action) => this.toggleExtracts(!action.selected),
      updater: action => action.selected = this.extracts.some(e => this.highlightsPref.includes(e))
    });

    this.pdfDownloadAction = new Action({
      icon: "fas fa-fw fa-file-pdf",
      title: "msg#preview.downloadPdf",
      action: () => this.searchService.notifyOpenOriginalDocument(this.data!.record, undefined, AuditEventType.Doc_CachePdf)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update the preview content
    if(changes.id || changes.query) {

      this.loading = true;
      this.previewWS.get(this.id, this.query).subscribe(data => {
        if(this.url) {
          this.previewFrames.unsubscribe(this.url);
        }
        this.pdfDownloadAction.href = data.record.pdfUrl;
        this.url = this.appService.updateUrlForCors(data.documentCachedContentUrl);
        if(this.safeUrl) {
          this.safeUrl = undefined;
          this.cdRef.detectChanges(); // Destruct and reconstruct the iframe to prevent navigation issues
        }
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.previewFrames.subscribe(this.url, 'ready', () => this.onReady(data));
        this.cdRef.detectChanges();
        this.ui.addElementResizeListener(this.el.nativeElement, this.onResize);
      });
    }
    else if(changes.preferenceName || changes.highlights) {
      this.updateHighlights();
    }

    this.updateActions();
  }

  ngOnDestroy(): void {
    if(this.url) {
      this.previewFrames.unsubscribe(this.url);
    }
    if(this.iframe) {
      this.ui.removeElementResizeListener(this.el.nativeElement, this.onResize);
    }
  }

  sendMessage(message: any) {
    this.preview?.postMessage(message, this.appService.origin);
  }

  onReady(data: PreviewData) {
    this.data = data;
    const highlights = this.getHighlights();
    this.sendMessage({ action: 'init', highlights });
    this.highlights$.next(this.highlightsPref);
    this.updateActions();
    this.initTooltip();
    this.initMinimap();
    this.loading = false;
    this.ready.emit();
    this.cdRef.detectChanges();
  }

  onResize = Utils.debounce(() => {
    const id = this.selectedId$.getValue();
    if(id) {
      this.select(id); // Reselect the item to force a redraw of the passage highlighter
    }
    this.initMinimap(); // Redraw minimap to match new scale
  }, 100);

  /**
   * Update the facet actions (PDF, highlight toggle, Zoom In/Out)
   */
  updateActions() {
    this._actions = [];
    if(this.preview) {
      if (this.downloadablePdf && this.pdfDownloadAction.href) {
        this._actions.push(this.pdfDownloadAction);
      }
      if (this.highlightActions) {
        this._actions.push(this.toggleExtractsAction, this.toggleEntitiesAction);
      }
      this._actions.push(this.zoomOutAction, this.zoomInAction);
      this._actions.forEach(a => a.update());
    }
  }


  /**
   * Update the preview highlights, based on the user settings or defaults.
   */
  updateHighlights() {
    const highlights = this.getHighlights();
    this.sendMessage({ action: 'highlight', highlights });
    setTimeout(() => this.highlights$.next(this.highlightsPref)); // Fire asynchronously to avoid "change after checked" errors
  }

  /**
   * Return highlight colors based on user settings or defaults.
   */
  getHighlights(): PreviewHighlightColors[] {
    return this.highlightColors.filter(
      hl => this.highlightsPref.includes(hl.name)
    );
  }

  /**
   * Toggle highlight of entities via the user preferences
   */
  toggleEntities(showEntities: boolean) {
    this.highlightsPref = showEntities?
      this.highlightsPref.concat(this.entities.filter(e => this.highlightsPref.indexOf(e) === -1)) :
      this.highlightsPref.filter(hl => !this.entities.includes(hl));
    this.updateHighlights();
    this.toggleEntitiesAction.update();
  }

  /**
   * Toggle highlight of extracts via the user preferences
   */
  toggleExtracts(showExtracts: boolean) {
    this.highlightsPref = showExtracts?
      this.highlightsPref.concat(this.extracts.filter(e => this.highlightsPref.indexOf(e) === -1)) :
      this.highlightsPref.filter(hl => !this.extracts.includes(hl));
    this.updateHighlights();
    this.toggleExtractsAction.update();
  }

  /**
   * Toggle the highlight of a specific type
   */
  toggleHighlight(highlight: string) {
    if(this.highlightsPref.includes(highlight)) {
      this.highlightsPref = this.highlightsPref.filter(hl => hl !== highlight);
    }
    else {
      this.highlightsPref = this.highlightsPref.concat(highlight);
    }
    this.updateHighlights();
    this.toggleEntitiesAction.update();
    this.toggleExtractsAction.update();
  }

  selectMostRelevant() {
    if(this.data?.highlightsPerCategory['matchingpassages']?.values.length) {
      this.select(this.getMostRelevantId('matchingpassages'));
    }
    else if(this.data?.highlightsPerCategory['extractslocations']?.values.length) {
      this.select(this.getMostRelevantId('extractslocations'));
    }
  }

  getMostRelevantId(type: string) {
    const passages = this.data?.highlightsPerCategory[type]?.values[0].locations.map(l => l.start).sort((a,b) => a-b);
    const idx = passages?.findIndex(start => start === this.data?.highlightsPerCategory[type]?.values[0].locations[0].start);
    return `${type}_${idx}`;
  }

  select(id: string) {
    const usePassageHighlighter = id.startsWith('matchingpassages') || id.startsWith('extractslocations')
    this.sendMessage({ action: 'select', id, usePassageHighlighter});
    this.selectedId$.next(id);
  }

  unselect() {
    this.sendMessage({action: 'unselect'});
    this.selectedId$.next(undefined);
  }

  getHtml(highlight: string): Observable<string[]> {
    if(this.preview && this.data && this.url) {

      // Generate the list of items we want to retrieve
      const ids = this.data.highlightsPerCategory[highlight]?.values[0]?.locations.map(
        (_,i) => `${highlight}_${i}`
      );

      if(ids?.length) {
        const obs = new Subject<string[]>();
        this.previewFrames.subscribe<string[]>(this.url, 'get-html-results', data => obs.next(data));
        this.sendMessage({action: 'get-html', ids});
        return obs.asObservable();
      }
    }
    return of([]);
  }


  // Tooltip management

  initTooltip() {
    if(this.url && this.showTooltip) {
      this.previewFrames.subscribe<EntityHoverEvent|undefined>(this.url, 'highlight-hover',
        (event) => this.onHighlightHover(event)
      );
      this.previewFrames.subscribe<TextSelectionEvent|undefined>(this.url, 'text-selection',
        (event) => this.onTextSelection(event)
      );
      this.previewFrames.subscribe<{x: number, y: number}>(this.url, 'scroll',
        (event) => this.onScroll(event)
      );
    }
  }

  tooltipTimeout?: NodeJS.Timeout;

  onHighlightHover(event: EntityHoverEvent|undefined) {
    if(event) {
      this.cancelHideTooltip();
      this.showEntityTooltip(event);
    }
    else {
      this.initHideTooltip();
    }
  }

  onTextSelection(event: TextSelectionEvent|undefined) {
    if(event && this.textActions) {
      this.cancelHideTooltip();
      this.showTextTooltip(event);
    }
    else {
      this.hideTooltip();
    }
  }

  showEntityTooltip(event: EntityHoverEvent) {
    if(this.data) {
      const i = event.id.lastIndexOf('_');
      const type = event.id.substring(0, i);
      // TODO Refactor this mess with better data structures from new web service
      const positionInCategories = +event.id.substring(i+1);
      const location = (this.data.highlightsPerLocation as any).find(value => value.positionInCategories[type] === positionInCategories);
      const display = location.displayValue;
      const category = this.data.highlightsPerCategory[type];
      const entity = category.values.find(v => location.values.includes(v.value));
      const occurrences = entity?.locations;
      const count = occurrences?.length || 0;
      const index = occurrences?.findIndex(o => o.start === location.start) || 0;
      const value = entity?.value;
      const label = category.categoryDisplayLabel;
      if(value) {
        const entity = {...event, type, index, count, value, display, label};
        this.entityActions?.forEach(action => action.data = entity);
        this.tooltip$.next({
          entity,
          actions: this.entityActions,
          position: event.position
        });
      }
    }
  }

  showTextTooltip(event: TextSelectionEvent) {
    this.textActions?.forEach(action => action.data = event.selectedText);
    this.tooltip$.next({...event, actions: this.textActions});
  }

  initHideTooltip() {
    this.tooltipTimeout = setTimeout(() => this.hideTooltip(), 200);
  }

  hideTooltip() {
    this.tooltip$.next(undefined);
    this.cancelHideTooltip();
  }

  cancelHideTooltip() {
    if(this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      delete this.tooltipTimeout;
    }
  }

  onScroll(event: {x: number, y: number}) {
    this.hideTooltip();
  }

  selectEntity(occurrence: PreviewEntityOccurrence) {
    if(this.data) {
      // TODO Refactor this mess with better data structures from new web service
      const entity = this.data.highlightsPerCategory[occurrence.type].values.find(v => v.value === occurrence.value);
      const start = entity?.locations[occurrence.index].start;
      const id = (this.data.highlightsPerLocation as any).find(l => l.start === start && l.values.includes(entity?.value))?.positionInCategories[occurrence.type];
      if(typeof id=== 'number') {
        this.hideTooltip();
        this.select(`${occurrence.type}_${id}`);
      }
    }
  }

  // Minimap management

  initMinimap() {
    if(this.url && this.showMinimap) {
      this.sendMessage({action: 'get-positions', highlight: this.minimapType});
      this.previewFrames.subscribe<MinimapItem[]>(this.url, 'get-positions-results',
        locations => this.minimap$.next({ locations })
      );
    }
  }


  // Manage user preferences for entity/extract highlighting

  get allHighlights(): string[] {
    return this.highlightColors.map(hl => hl.name);
  }

  get defaultHighlights(): string[] {
    return this.allHighlights.filter(
      hl => this.extracts.includes(hl)? this.highlightExtracts : this.highlightEntities
    );
  }

  get highlightsPref(): string[] {
    return this.prefs.get(`${this.preferenceName}-highlights`)  // Get preferences from user settings
      ?? this.defaultHighlights                                 // Or from input settings
      ?? this.allHighlights;               // Or from the highlight colors
  }

  set highlightsPref(pref: string[]) {
    this.prefs.set(`${this.preferenceName}-highlights`, pref);
  }

}
