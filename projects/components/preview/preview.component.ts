import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { AppService, Query } from "@sinequa/core/app-utils";
import { AuditEventType, PreviewData, PreviewWebService } from "@sinequa/core/web-services";
import { UserPreferences } from "@sinequa/components/user-settings";
import { PreviewFrameService } from "./preview-frames.service";
import { Observable, of, Subject } from "rxjs";
import { PreviewEntityOccurrence } from "./preview-tooltip";

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

export const DEFAULT_EXTRACTS = ["matchlocations", "extractslocations", "matchingpassages"];

export const DEFAULT_SANDBOX = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";


@Component({
  selector: 'sq-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Preview extends AbstractFacet implements OnChanges, OnDestroy {
  @Input() id: string;
  @Input() query: Query;

  @Input() scale = 1;
  @Input() scaleIncrement = 0.1;
  @Input() highlights: PreviewHighlightColors[];

  @Input() showTooltip = false;
  @Input() entityActions?: Action[];
  @Input() textActions?: Action[];

  @Input() showMinimap = false;

  @Input() downloadablePdf = true;
  @Input() highlightActions = true;
  @Input() highlightEntities = false;
  @Input() highlightExtracts = false;
  /** List of highlights to be shown when turning "extracts" on (should be a subset of allExtracts) */
  @Input() extracts = DEFAULT_EXTRACTS;
  /** List of highlights returned by the server considered as "extracts" (but not necessarily displayed), all the others being considered "entities" */
  @Input() allExtracts = DEFAULT_EXTRACTS;

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

  @Output() ready = new EventEmitter();

  @HostBinding("style.padding-right.rem")
  get minimapSpace() {
    return this.showMinimap? 1 : 0;
  }

  _sandbox: string|undefined;

  @ViewChild("preview") iframe: ElementRef<HTMLIFrameElement>;
  get preview(): Window | null {
    return this.iframe?.nativeElement?.contentWindow;
  }

  tooltip$ = new Subject<PreviewTooltipData | undefined>();

  loading = false;
  url?: string;
  safeUrl?: SafeResourceUrl;
  data?: PreviewData;

  zoomInAction: Action;
  zoomOutAction: Action;
  toggleEntitiesAction: Action;
  toggleExtractsAction: Action;
  pdfDownloadAction: Action;
  _actions: Action[];

  constructor(
    public previewWS: PreviewWebService,
    public previewFrames: PreviewFrameService,
    public sanitizer: DomSanitizer,
    public appService: AppService,
    public searchService: SearchService,
    public prefs: UserPreferences,
    public cdRef: ChangeDetectorRef
  ) {
    super();

    this.zoomOutAction = new Action({
      icon: "fas fa-fw fa-search-minus",
      title: "msg#facet.preview.minimize",
      action: () => {
        this.scale -= this.scaleIncrement;
        this.updateActions();
        this.cdRef.detectChanges();
      },
      updater: action => action.disabled = this.scale <= 0.2
    });

    this.zoomInAction = new Action({
      icon: "fas fa-fw fa-search-plus",
      title: "msg#facet.preview.maximize",
      action: () => {
        this.scale += this.scaleIncrement;
        this.updateActions();
        this.cdRef.detectChanges();
      },
      updater: action => action.disabled = this.scale >= 3
    });

    this.toggleEntitiesAction = new Action({
      icon: "fas fa-fw fa-lightbulb",
      title: "msg#facet.preview.toggleEntities",
      action: (action) => {
        this.highlightEntitiesPref = !this.highlightEntitiesPref;
        this.updateHighlights();
        action.update();
      },
      updater: action => action.selected = this.highlightEntitiesPref
    });

    this.toggleExtractsAction = new Action({
      icon: "fas fa-fw fa-highlighter",
      title: "msg#facet.preview.toggleExtracts",
      action: (action) => {
        this.highlightExtractsPref = !this.highlightExtractsPref;
        this.updateHighlights();
        action.update();
      },
      updater: action => action.selected = this.highlightExtractsPref
    });

    this.pdfDownloadAction = new Action({
      icon: "fas fa-fw fa-file-pdf",
      title: "msg#facet.preview.downloadPdf",
      action: () => this.searchService.notifyOpenOriginalDocument(this.data!.record, undefined, AuditEventType.Doc_CachePdf)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update the preview content
    if(changes.id || changes.query) {

      this.loading = true;
      this.previewWS.get(this.id, this.query).subscribe(data => {
        this.data = data;
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
        this.previewFrames.subscribe(this.url, 'ready', () => this.onReady());
        this.cdRef.detectChanges();
      });
    }

    // Update the preview highlights
    if(changes.highlights) {
      this.sendMessage({ action: 'highlight', highlights: this.highlights });
    }

    this.updateActions();
  }

  ngOnDestroy(): void {
    if(this.url) {
      this.previewFrames.unsubscribe(this.url);
    }
  }

  sendMessage(message: any) {
    this.preview?.postMessage(message, this.appService.origin);
  }

  onReady() {
    const highlights = this.getHighlights();
    this.sendMessage({ action: 'init', highlights });
    this.updateActions();
    if(this.showTooltip) {
      this.initTooltip();
    }
    this.loading = false;
    this.ready.emit();
    this.cdRef.detectChanges();
  }

  override get actions() {
    return this._actions;
  }

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

  updateHighlights() {
    this.highlight(this.getHighlights());
  }

  getHighlights() {
    return this.highlights.filter(highlight => {
      // Either a highlight is part of the "extracts", or it is part of the "entities"
      const allExtracts = this.allExtracts || DEFAULT_EXTRACTS;
      const extracts = this.extracts || DEFAULT_EXTRACTS;
      const isExtract = allExtracts.includes(highlight.name);
      return ( isExtract && this.highlightExtractsPref && extracts.includes(highlight.name))
          || (!isExtract && this.highlightEntitiesPref);
    });
  }

  highlight(highlights: PreviewHighlightColors[]) {
    this.sendMessage({ action: 'highlight', highlights });
  }

  selectMostRelevant() {
    if(this.data?.highlightsPerCategory['matchingpassages']?.values.length) {
      this.select('matchingpassages_0');
    }
    else if(this.data?.highlightsPerCategory['extractslocations']?.values.length) {
      this.select('extractslocations_0');
    }
  }

  select(id: string) {
    this.sendMessage({ action: 'select', id});
  }

  getHtml(highlight: string): Observable<string[]> {
    if(this.preview && this.data && this.url) {

      // Generate the list of items we want to retrieve
      const ids = this.data.highlightsPerCategory[highlight]?.values[0].locations.map(
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
    if(this.url) {
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


  // Manage user preferences for entity/extract highlighting

  get highlightEntitiesPref(): boolean {
    return this.prefs.get("mini-preview-highlight-entities") ?? this.highlightEntities;
  }

  set highlightEntitiesPref(pref: boolean) {
    this.prefs.set("mini-preview-highlight-entities", pref);
  }

  get highlightExtractsPref(): boolean {
    return this.prefs.get("mini-preview-highlight-extracts") ?? this.highlightExtracts;
  }

  set highlightExtractsPref(pref: boolean) {
    this.prefs.set("mini-preview-highlight-extracts", pref);
  }

}
