import { Component, Input, OnChanges, ChangeDetectorRef } from "@angular/core";
import { Record, SimilarDocumentsWebService } from "@sinequa/core/web-services";
import { Query } from "@sinequa/core/app-utils";
import { PreviewService } from "../../preview.service";

@Component({
    selector: "sq-similar-documents",
    templateUrl: "./similar-documents.html"
})
export class BsSimilarDocuments implements OnChanges {
    @Input() private sourceDocumentId: string;
    @Input() private query: Query;
    private documentList: Record[];

    public get documents(): Record[] {
        return this.documentList;
    }

    public constructor(
        private similarDocumentsService: SimilarDocumentsWebService,
        private previewService: PreviewService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    public ngOnChanges(): void {
        if (this.sourceDocumentId == null) {
            this.documentList = [];
            return;
        }
        this.similarDocumentsService.get(this.sourceDocumentId, this.query.name).subscribe(
            (results) => {
                this.documentList = results;
                this.changeDetectorRef.markForCheck();
            }
        );
    }

    public documentIconClass(document: Record): string {
        const documentFormat = document.fileext;
        if (!documentFormat) {
            return "far fa-file";
        }
        return "far fa-file sq-icon-file-" + document.fileext;
    }

    public onLinkClick(document: Record): void {
        this.previewService.openNewWindow(document, this.query);
    }
}
