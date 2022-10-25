import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding, AfterViewChecked } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Query } from '@sinequa/core/app-utils';
import { Record, PreviewData, AuditEventType } from "@sinequa/core/web-services";
import { PreviewService } from "../../preview.service";
import { PreviewDocument, HighlightFilters } from "../../preview-document";
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { SearchService } from "@sinequa/components/search";

@Component({
  selector: 'sq-facet-preview-2',
  templateUrl: './facet-preview.component.html',
  styleUrls: ['./facet-preview.component.scss']
})
export class BsFacetPreviewComponent2 extends AbstractFacet implements OnChanges, AfterViewChecked {

  @Input() record: Record;
  @Input() query: Query;
  @Input() iframeClass: string;
  @Input() sandbox : string | null;
  @Input() height = 500;
  @Input() scalingFactor = 0.6;
  @Input() metadata: string[] = [];
  @Input() expandModal = true;
  @Input() closable = true;
  @Input() highlightActions = true;
  @Input() isNeural: boolean;
  @Input() customActions: Action[];
  @Input() customSubActions: Action[];
  @Input() filters: HighlightFilters;
  @Input() originalDocTarget: string | undefined;
  @Output() recordClosed = new EventEmitter<void>();
  @Output() previewLoaded = new EventEmitter<PreviewDocument>();
  @HostBinding('style.height.px') _height: number = this.height;

  private closeAction: Action;
  private expandModalAction: Action;
  private toggleEntitiesAction: Action;
  private toggleExtractsAction: Action;
  private minimizeAction: Action;
  private maximizeAction: Action;
  private pdfDownloadAction: Action;

  data?: PreviewData;
  document?: PreviewDocument;
  downloadUrl?: SafeResourceUrl;
  loading = false;

  private readonly scaleFactorThreshold = 0.1;

  hightlights = ["matchlocations", "extractslocations", "matchingpassages"];

  constructor(
      private previewService: PreviewService,
      private searchService: SearchService
  ) {

    super();

    this.closeAction = new Action({
      icon: "fas fa-times",
      title: "msg#facet.preview.closeTitle",
      action: () => {
        this.recordClosed.next();
      }
    });

    this.expandModalAction = new Action({
      icon: "far fa-window-maximize",
      title: "msg#facet.preview.expandTitle",
      action: () => {
        this.previewService.openModal(this.record, this.query, {
          displaySimilarDocuments: false,
          metadata: this.metadata
        });
      }
    });

    this.toggleEntitiesAction = new Action({
      icon: "fas fa-lightbulb",
      title: "msg#facet.preview.toggleEntities",
      name: 'msg#facet.preview.entities',
      selected: false,
      action: (action) => {
        action.selected = !action.selected;
        this.highlightEntities(action.selected);
      }
    });

    this.toggleExtractsAction = new Action({
        icon: "fas fa-highlighter",
        title: "msg#facet.preview.toggleExtracts",
        name: 'msg#facet.preview.extracts',
        selected: false,
        action: (action) => {
            action.selected = !action.selected;
            this.highlightExtracts(action.selected);
        }
    });

    this.maximizeAction = new Action({
      icon: "fas fa-search-plus",
      title: "msg#facet.preview.maximize",
      action: () => {
        this.scalingFactor = this.scalingFactor + this.scaleFactorThreshold;
      }
    });

    this.minimizeAction = new Action({
      icon: "fas fa-search-minus",
      title: "msg#facet.preview.minimize",
      disabled: this.scalingFactor === 0.1,
      action: () => {
        this.scalingFactor = Math.round(Math.max(0.1, this.scalingFactor - this.scaleFactorThreshold) * 100) / 100;
      },
      updater: (action) => {
        action.disabled = this.scalingFactor === 0.1;
      }
    });

    this.pdfDownloadAction = new Action({
      icon: "fas fa-file-pdf",
      title: "msg#facet.preview.downloadPdf",
      action: () => this.searchService.notifyOpenOriginalDocument(this.record, undefined, AuditEventType.Doc_CachePdf)
    })

  }

  override get actions(): Action[] {
    const actions: Action[] = [];
    if (!this.isNeural) {
      if(this.customActions){
        actions.push(...this.customActions);
      }
      if(this.record.pdfUrl) {
        actions.push(this.pdfDownloadAction);
      }
      if(this.expandModal){
        actions.push(this.expandModalAction);
      }
      if(this.closable){
        actions.push(this.closeAction);
      }
    }
    return actions;
  }

  get subActions(): Action[] {
    const actions: Action[] = [];
    if (this.highlightActions) {
      actions.push(this.toggleExtractsAction);
      actions.push(this.toggleEntitiesAction);
    }
    if (this.customSubActions) {
      actions.push(...this.customSubActions);
    }
    return actions;
  }

  get zoomActions(): Action[] {
    const actions: Action[] = [];
    this.minimizeAction.update();
    actions.push(this.minimizeAction, this.maximizeAction);
    return actions;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.record) {
      this.previewService.getPreviewData(this.record.id, this.query).subscribe(
        previewData => {
          this.data = previewData;
          this.downloadUrl = this.data ? this.previewService.makeDownloadUrl(this.data.documentCachedContentUrl) : undefined;
        });
      this.downloadUrl = undefined;
      this.data = undefined;
      this.document = undefined;
      this.loading = true;
      this.pdfDownloadAction.href = this.record.pdfUrl;
    }
    if(changes.height || changes.scalingFactor) {
      this._height = this.height;
    }
    if(changes.filters && this.filters) {
      this.document?.filterHighlights(this.filters);
    }
  }

  ngAfterViewChecked() {
    if (this.document && !this.loading) {
      // as now view is checked, emit event
      this.previewLoaded.emit(this.document);
    }
  }

  onPreviewReady(document: PreviewDocument) {
    this.document = document;

    const selectedEntities = this.toggleEntitiesAction.selected;
    const selectedExtracts = this.toggleExtractsAction.selected;
    this.highlightEntities(selectedEntities !== undefined ? selectedEntities : false);
    this.highlightExtracts(selectedExtracts !== undefined ? selectedExtracts : false);

    if (this.document && this.filters) {
      this.document.filterHighlights(this.filters);
    }

    this.loading = false;
  }

  private highlightEntities(on: boolean): void {
    if(this.data?.highlightsPerCategory) {
      Object.keys(this.data.highlightsPerCategory)
        .filter(value => !this.hightlights.includes(value))
        .forEach(cat =>
          this.document?.toggleHighlight(cat, on!)
        );
    }
  }

  private highlightExtracts(on: boolean): void {
    for(let highlight of this.hightlights) {
      this.document?.toggleHighlight(highlight, on);
    }
  }
}
