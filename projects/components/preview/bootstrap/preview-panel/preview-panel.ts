import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { SafeResourceUrl } from '@angular/platform-browser';
import { PreviewData } from "@sinequa/core/web-services";
import { Query } from "@sinequa/core/app-utils";
import { PreviewService } from "../../preview.service";
import { PreviewDocument } from "../../preview-document";


@Component({
    selector: "sq-preview-panel",
    templateUrl: "./preview-panel.html",
    styleUrls: ["./preview-panel.scss"]
})
export class BsPreviewPanel implements OnChanges {
    @Input() query: Query;
    @Input() previewData: PreviewData;
    @Input() sandbox: string;
    @Input() displaySimilarDocuments: boolean;
    @Input() metadata: string[];
    @Input() leftPaneAdditionalClasses: string;

    downloadUrl?: SafeResourceUrl;
    previewDocument: PreviewDocument;

    constructor(
        private previewService: PreviewService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["previewData"]) {
            this.downloadUrl = this.previewData ? this.previewService.makeDownloadUrl(this.previewData.documentCachedContentUrl) : undefined;
        }
    }

    onPreviewReady(previewDocument: PreviewDocument){
        this.previewDocument = previewDocument;
        this.changeDetectorRef.markForCheck();
    }
}