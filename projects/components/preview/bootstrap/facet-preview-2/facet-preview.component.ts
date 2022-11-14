import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding, AfterViewChecked } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Query } from '@sinequa/core/app-utils';
import { Record, PreviewData, AuditEventType } from "@sinequa/core/web-services";
import { PreviewService } from "../../preview.service";
import { PreviewDocument } from "../../preview-document";
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { SearchService } from "@sinequa/components/search";
import { UserPreferences } from "@sinequa/components/user-settings";

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
  @Input() downloadablePdf = true;
  @Input() highlightActions = true;
  @Input() highlightEntities = false;
  @Input() highlightExtracts = false;
  /** List of highlights to be shown when turning "extracts" on (should be a subset of allExtracts) */
  @Input() extracts = ["matchlocations", "extractslocations", "matchingpassages"];
  /** List of highlights returned by the server considered as "extracts" (but not necessarily displayed), all the others being considered "entities" */
  @Input() allExtracts = ["matchlocations", "extractslocations", "matchingpassages"];
  @Output() previewLoaded = new EventEmitter<PreviewDocument>();
  @HostBinding('style.height.px') _height: number = this.height;

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

  constructor(
    public previewService: PreviewService,
    public searchService: SearchService,
    public prefs: UserPreferences
  ) {

    super();

    this.toggleEntitiesAction = new Action({
      icon: "fas fa-fw fa-lightbulb",
      title: "msg#facet.preview.toggleEntities",
      data: 'msg#facet.preview.entities',
      action: (action) => {
        action.selected = !action.selected;
        this.highlightEntitiesPref = action.selected;
        this.updateHighlights();
      }
    });

    this.toggleExtractsAction = new Action({
      icon: "fas fa-fw fa-highlighter",
      title: "msg#facet.preview.toggleExtracts",
      data: 'msg#facet.preview.extracts',
      action: (action) => {
        action.selected = !action.selected;
        this.highlightExtractsPref = action.selected;
        this.updateHighlights();
      }
    });

    this.maximizeAction = new Action({
      icon: "fas fa-fw fa-search-plus",
      title: "msg#facet.preview.maximize",
      action: () => {
        this.scalingFactor = this.scalingFactor + this.scaleFactorThreshold;
      }
    });

    this.minimizeAction = new Action({
      icon: "fas fa-fw fa-search-minus",
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
      icon: "fas fa-fw fa-file-pdf",
      title: "msg#facet.preview.downloadPdf",
      action: () => this.searchService.notifyOpenOriginalDocument(this.record, undefined, AuditEventType.Doc_CachePdf)
    });

  }

  override get actions(): Action[] {
    const actions: Action[] = [];
    if (this.document) {  // Wait for the document to be loaded before showing the actions
      if (this.downloadablePdf && this.record.pdfUrl) {
        actions.push(this.pdfDownloadAction);
      }
      if (this.highlightActions) {
        actions.push(this.toggleExtractsAction);
        actions.push(this.toggleEntitiesAction);
      }
      actions.push(this.minimizeAction, this.maximizeAction);
    }
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
    this.toggleEntitiesAction.selected = this.highlightEntitiesPref;
    this.toggleExtractsAction.selected = this.highlightExtractsPref;
  }

  ngAfterViewChecked() {
    if (this.document && !this.loading) {
      // as now view is checked, emit event
      this.previewLoaded.emit(this.document);
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

  onPreviewReady(document: PreviewDocument) {
    this.document = document;
    this.updateHighlights();
    this.loading = false;
  }

  updateHighlights() {
    if (this.document && this.data) {
      // The highlights to apply on the document are derived from the list of highlights applied
      // by the server, filtered out by the user preferences
      const filters = Object.keys(this.data.highlightsPerCategory)
        .filter(highlight => {
          // Either a highlight is part of the "extracts", or it is part of the "entities"
          const isExtract = this.allExtracts.includes(highlight);
          return ( isExtract && this.highlightExtractsPref && this.extracts.includes(highlight))
              || (!isExtract && this.highlightEntitiesPref);
        });
      this.document.filterHighlights(filters);
    }
  }

}
