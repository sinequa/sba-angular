import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { AppService, Query } from "@sinequa/core/app-utils";
import { AuditEventType, PreviewData, PreviewWebService } from "@sinequa/core/web-services";
import { UserPreferences } from "@sinequa/components/user-settings";
import { PreviewFrameService } from "./preview-frames.service";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";

export type PreviewHighlightColors = {
  name: string;
  color?: string;
  bgColor?: string;
}

export const DEFAULT_EXTRACTS = ["matchlocations", "extractslocations", "matchingpassages"];

export const DEFAULT_SANDBOX = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";


@Component({
  selector: 'sq-preview',
  template: `
  <sq-loading-bar [active]="loading"></sq-loading-bar>

  <iframe *ngIf="safeUrl"
    #preview
    [src]="safeUrl"
    [attr.sandbox]="_sandbox"
    [style.--sq-scale]="scale">
  </iframe>

  <div class="sq-tooltip" *ngIf="entityTooltip$ | async as tooltip"
    [ngStyle]="{'top.px': tooltip.position.y * scale, 'left.px': tooltip.position.x * scale}">
    {{ tooltip.id }}
  </div>
  `,
  styles: [`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
  }
  iframe {
    height: calc(100% / var(--sq-scale));
    width: calc(100% / var(--sq-scale));
    transform: scale(var(--sq-scale));
    transform-origin: 0 0;
    border-radius: var(--bs-card-inner-border-radius, .375rem);
  }
  .sq-tooltip {
    position: absolute;
    background-color: #494949;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 14px;
    max-width: 280px;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTest extends AbstractFacet implements OnChanges, OnDestroy {
  @Input() id: string;
  @Input() query: Query;

  @Input() scale = 1;
  @Input() scaleIncrement = 0.1;
  @Input() highlights: PreviewHighlightColors[];

  @Input() showTooltip = true;

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

  _sandbox: string|undefined;

  @ViewChild("preview") iframe: ElementRef<HTMLIFrameElement>;
  get preview(): Window | null {
    return this.iframe?.nativeElement?.contentWindow;
  }

  entityTooltip$ = new BehaviorSubject<{id: string, position: DOMRect}|undefined>(undefined);

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
        this.scale *= 1 - this.scaleIncrement;
        this.updateActions();
        this.cdRef.detectChanges();
      },
      updater: action => action.disabled = this.scale <= 0.1
    });

    this.zoomInAction = new Action({
      icon: "fas fa-fw fa-search-plus",
      title: "msg#facet.preview.maximize",
      action: () => {
        this.scale *= 1 + this.scaleIncrement;
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

  override get actions() {
    return this._actions;
  }

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

  sendMessage(message: any) {
    this.preview?.postMessage(message, this.appService.origin);
  }

  onReady() {
    const highlights = this.getHighlights();
    this.sendMessage({ action: 'init', highlights });
    this.updateActions();
    if(this.url) {
      this.previewFrames.subscribe<{id: string, position: DOMRect}|undefined>(this.url, 'highlight-hover',
        (event) => this.onHighlightHover(event)
      );
      this.previewFrames.subscribe<{selectedText: string, position: DOMRect}|undefined>(this.url, 'text-selection',
        (event) => this.onTextSelection(event)
      );
      this.previewFrames.subscribe<{x: number, y: number}>(this.url, 'scroll',
        (event) => this.onScroll(event)
      );
    }
    this.loading = false;
    this.cdRef.detectChanges();
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

  onHighlightHover(event: {id: string, position: DOMRect}|undefined) {
    console.log(event);
    this.entityTooltip$.next(event);
  }

  onTextSelection(event: {selectedText: string, position: DOMRect}|undefined) {
    console.log(event);
  }

  onScroll(event: {x: number, y: number}) {
    console.log(event);
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
