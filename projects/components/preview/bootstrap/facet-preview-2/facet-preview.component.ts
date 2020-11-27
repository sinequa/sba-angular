import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding } from "@angular/core";
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
export class BsFacetPreviewComponent2 extends AbstractFacet implements OnChanges {

  @Input() record: Record;
  @Input() query: Query;
  @Input() iframeClass: string;
  @Input() sandbox : string;
  @Input() height: number = 500;
  @Input() scalingFactor: number = 0.6;
  @Input() metadata: string[] = [];
  @Input() expandModal: boolean = true;
  @Input() customActions: Action[];
  @Input() filters: HighlightFilters;
  @Output() recordClosed = new EventEmitter<void>();
  @HostBinding('style.height.px') _height: number = this.height;

  closeAction: Action;
  _expandModalAction: Action;

  data?: PreviewData;
  document?: PreviewDocument;
  downloadUrl?: SafeResourceUrl;
  loadingPreview = false;

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

    this._expandModalAction = new Action({
      icon: "far fa-window-maximize",
      title: "msg#facet.preview.expandTitle",
      action: () => {
        this.previewService.openModal(this.record, this.query, {
          displaySimilarDocuments: false,
          metadata: this.metadata
        });
      }
    });
  }

  get actions(): Action[] {
    const actions: Action[] = [];
    if(this.customActions){
      // update custom actions as minimize could be disabled
      this.customActions.forEach(action => action.update());
      actions.push(...this.customActions);
    }
    if(this.expandModal){
      actions.push(this._expandModalAction);
    }
    actions.push(this.closeAction);
    return actions;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["record"]) {
      this.previewService.getPreviewData(this.record.id, this.query).subscribe(
        previewData => {
          this.loadingPreview = true;
          this.data = previewData;
          this.downloadUrl = this.data ? this.previewService.makeDownloadUrl(this.data.documentCachedContentUrl) : undefined;
        });
      this.downloadUrl = undefined;
      this.data = undefined;
      this.document = undefined;
      this.loadingPreview = false;
    }
    if(changes["height"] || changes["scalingFactor"]) {
      this._height = this.height;
    }
  }

  onPreviewReady(document: PreviewDocument) {
    this.loadingPreview = false;
    this.document = document;
    if (this.document && this.filters) {
        this.document.filterHighlights(this.filters);
    }
  }
}
