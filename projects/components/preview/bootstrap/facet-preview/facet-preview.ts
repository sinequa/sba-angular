import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {SafeResourceUrl} from "@angular/platform-browser";
import {Query} from '@sinequa/core/app-utils';
import {Record, PreviewData} from "@sinequa/core/web-services";
import {PreviewService} from "../../preview.service";
import {PreviewDocument} from "../../preview-document";

@Component({
    selector: "sq-facet-preview",
    templateUrl: "./facet-preview.html",
})
export class BsFacetPreview implements OnChanges {
    @Input() record: Record;
    @Input() sandbox;
    @Input() query: Query;
    @Input() height: string;
    @Input() iframeClass: string;
    @Input() similarDocuments: Record[];
    @Output() recordOpened = new EventEmitter<{record: Record, query: Query, startSmall?: boolean, iframeClass?: string}>();
    data: PreviewData;
    document: PreviewDocument;
    downloadUrl?: SafeResourceUrl;

    constructor(
        private previewService: PreviewService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["record"] || changes["query"]) {
            this.previewService.getPreviewData(this.record.id, this.query).subscribe(
                previewData => {
                    this.data = previewData;
                    this.downloadUrl = this.data ? this.previewService.makeDownloadUrl(this.data.documentCachedContentUrl) : undefined;
                });
        }
    }

    openSimilarDoc(doc: Record) {
        this.recordOpened.next({
            record: doc,
            query: this.query,
            startSmall: true,
            iframeClass: this.iframeClass
        });
        return false;
    }
}