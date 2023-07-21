import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { AppService, Query } from "@sinequa/core/app-utils";
import { AuditEventType, CustomHighlights, PreviewData } from "@sinequa/core/web-services";
import { UserPreferences } from "@sinequa/components/user-settings";
import { PreviewFrameService } from "./preview-frames.service";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { UIService } from "@sinequa/components/utils";
import { Utils } from "@sinequa/core/base";
import { PreviewService } from "./preview.service";

export interface PreviewHighlightColors {
  name: string;
  color?: string;
  bgColor?: string;
}

@Component({
  selector: 'sq-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Preview extends AbstractFacet implements OnChanges, OnDestroy {

  // Document management
  @Input() id: string;
  @Input() query?: Query;
  @Input() customHighlights?: CustomHighlights[];

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
  @Input() usePassageHighlighter = ["extractslocations", "matchingpassages"]
  /** Name of the preference property used to stored the highlight preferences */
  @Input() preferenceName = 'preview';

  //Misc
  /** Whether to show an action to download the PDF version of the document (if it exists) */
  @Input() downloadablePdf = true;

  /** Emits an event when the preview is ready for any interaction via this component */
  @Output() ready = new EventEmitter();

  @Output() resize = new EventEmitter();

  // Reference to the iframe's window
  @ViewChild("preview") iframe: ElementRef<HTMLIFrameElement>;
  get preview(): Window | null {
    return this.iframe?.nativeElement?.contentWindow;
  }

  /** Subject emitting a value when the "selected highlight" changes */
  public selectedId$ = new BehaviorSubject<string|undefined>(undefined);

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
    public previewService: PreviewService,
    public previewFrames: PreviewFrameService,
    public sanitizer: DomSanitizer,
    public appService: AppService,
    public searchService: SearchService,
    public prefs: UserPreferences,
    public cdRef: ChangeDetectorRef,
    public ui: UIService,
    public el: ElementRef<HTMLElement>
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

    this.ui.addElementResizeListener(this.el.nativeElement, this.onResize);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update the preview content
    if(changes.id || changes.query || changes.customHighlights) {

      this.loading = true;
      const query = this.query || this.searchService.query;
      this.previewService.getPreviewData(this.id, query, this.customHighlights).subscribe(data => {
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
    else if(changes.preferenceName || changes.highlights) {
      this.updateHighlights();
    }

    this.updateActions();
  }

  ngOnDestroy(): void {
    if(this.url) {
      this.previewFrames.unsubscribe(this.url);
    }
    this.ui.removeElementResizeListener(this.el.nativeElement, this.onResize);
  }

  sendMessage(message: any) {
    this.preview?.postMessage(message, this.appService.origin);
  }

  onReady() {
    const highlights = this.getHighlights();
    this.sendMessage({ action: 'init', highlights });
    this.highlights$.next(this.highlightsPref);
    this.updateActions();
    this.loading = false;
    this.ready.emit();
    this.cdRef.detectChanges();
  }

  onLoad() {
    if(this.iframe && this.loading) { // onload is called a first time even before we have a reference to the iframe
      this.loading = false;
      this.updateActions();
      this.ready.emit();
    }
  }

  onResize = Utils.debounce(() => {
    if(!this.loading) {
      const id = this.selectedId$.getValue();
      if(id) {
        this.select(id); // Reselect the item to force a redraw of the passage highlighter
      }
      this.resize.emit();
    }
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
    if(this.selectedId$.value === id) {
      this.unselect();
    }
    else {
      const usePassageHighlighter = this.usePassageHighlighter.some(highlight => id.startsWith(highlight));
      this.sendMessage({ action: 'select', id, usePassageHighlighter});
      this.selectedId$.next(id);
    }
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


  selectEntity(type: string, value: string, index=0) {
    if (this.data) {
      const entity = this.data.highlightsPerCategory[type].values
        .find(v => v.value === value);
      if(entity) {
        const start = entity.locations[index].start;
        this.selectStart(type, start, entity.value);
      }
    }
  }

  selectStart(type: string, start: number, value?: string) {
    if(this.data) {
      const location = Object.values(this.data.highlightsPerLocation)
        .find(l => l.start === start && l.positionInCategories.hasOwnProperty(type) && (!value || l.values.includes(value)));
      const id = location?.positionInCategories[type];
      if(typeof id === 'number') {
        this.select(`${type}_${id}`);
      }
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
