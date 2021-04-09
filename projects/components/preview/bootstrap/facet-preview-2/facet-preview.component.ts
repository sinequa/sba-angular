import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding, AfterViewChecked } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Query } from '@sinequa/core/app-utils';
import { Record, PreviewData } from "@sinequa/core/web-services";
import { PreviewService } from "../../preview.service";
import { PreviewDocument, HighlightFilters } from "../../preview-document";
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';

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
  @Input() customActions: Action[];
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

  data?: PreviewData;
  document?: PreviewDocument;
  downloadUrl?: SafeResourceUrl;

  private readonly scaleFactorThreshold = 0.1;
  private loaded = false;

  constructor(
      private previewService: PreviewService) {

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
      selected: true,
      action: (action) => {
        action.selected = !action.selected;
        if(this.data?.highlightsPerCategory) {
          Object.keys(this.data.highlightsPerCategory)
            .filter(value => value !== "extractslocations" && value !== "matchlocations")
            .forEach(cat =>
              this.document?.toggleHighlight(cat, action.selected!)
            );
        }
      }
    });

    this.toggleExtractsAction = new Action({
        icon: "fas fa-highlighter",
        title: "msg#facet.preview.toggleExtracts",
        selected: true,
        action: (action) => {
            action.selected = !action.selected;
            this.document?.toggleHighlight("matchlocations", action.selected);
            this.document?.toggleHighlight("extractslocations", action.selected);
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

  }

  get actions(): Action[] {
    const actions: Action[] = [];
    if(this.customActions){
      actions.push(...this.customActions);
    }
    if(this.highlightActions) {
      actions.push(this.toggleExtractsAction, this.toggleEntitiesAction);
    }
    this.minimizeAction.update();
    actions.push(this.minimizeAction, this.maximizeAction);
    if(this.expandModal){
      actions.push(this.expandModalAction);
    }
    if(this.closable){
      actions.push(this.closeAction);
    }
    return actions;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["record"]) {
      this.previewService.getPreviewData(this.record.id, this.query).subscribe(
        previewData => {
          this.data = previewData;
          this.downloadUrl = this.data ? this.previewService.makeDownloadUrl(this.data.documentCachedContentUrl) : undefined;
        });
      this.downloadUrl = undefined;
      this.data = undefined;
      this.document = undefined;
    }
    if(changes["height"] || changes["scalingFactor"]) {
      this._height = this.height;
    }
  }

  ngAfterViewChecked() {
    if (this.document && this.loaded) {
      this.loaded = false;
      // as now view is checked, emit event
      this.previewLoaded.emit(this.document);
    }
  }

  onPreviewReady(document: PreviewDocument) {
    this.document = document;
    if (this.document && this.filters) {
      this.document.filterHighlights(this.filters);
    }

    this.loaded = true;
  }
}
