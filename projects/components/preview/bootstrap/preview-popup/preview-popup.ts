import {Component, OnInit, OnDestroy, ChangeDetectorRef, Inject} from "@angular/core";
import {Subscription} from "rxjs";
import {Query} from "@sinequa/core/app-utils";
import {Record} from "@sinequa/core/web-services";
import {MODAL_MODEL} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {PreviewData} from "@sinequa/core/web-services";
import {SearchService} from "@sinequa/components/search";
import {PreviewService} from "../../preview.service";
import {UIService} from "@sinequa/components/utils";

export interface PreviewPopupModel {
    record: Record;
    query: Query;
    displaySimilarDocuments: boolean;
    metadata: string[];
}

@Component({
    selector: "sq-preview-popup",
    templateUrl: "./preview-popup.html",
    styleUrls: ["./preview-popup.css"]
})
export class BsPreviewPopup implements OnInit, OnDestroy {
    private screenSize: string;
    private resizeSubscription: Subscription;
    previewData: PreviewData;
    private previewDataError: boolean;

    constructor(
        @Inject(MODAL_MODEL) public model: PreviewPopupModel,
        public searchService: SearchService,
        public previewService: PreviewService,
        protected uiService: UIService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.screenSize = this.uiService.screenSize;
        this.resizeSubscription = Utils.subscribe(this.uiService.resizeEvent,
            (event) => {
                if (this.screenSize !== this.uiService.screenSize) {
                    this.screenSize = this.uiService.screenSize;
                    this.changeDetectorRef.markForCheck();
                }
            });
        this.updatePreviewData(this.model.record.id);
    }

    public ngOnDestroy(): void {
        this.resizeSubscription.unsubscribe();
    }

    get currentId(): string {
        if (this.previewData && this.previewData.record) {
            return this.previewData.record.id;
        }
        return "";
    }

    private updatePreviewData(id: string) {
        this.previewService.getPreviewData(id, this.model.query).subscribe(
            previewData => {
                this.previewData = previewData;
                this.previewDataError = false;
                this.changeDetectorRef.markForCheck();
            },
            error => {
                this.previewDataError = true;
            }
        );
    }

    public get recordTitle(): string {
        if (this.previewData && this.previewData.record != null) {
            return this.previewData.record.title;
        }
        return this.previewDataError ? "msg#preview.noDocumentDataErrorPopupTitle" : "";
    }

    public get showPreviousNextText(): boolean {
        return this.uiService.screenSizeIsGreaterOrEqual("lg");
    }

    public get showPreviousNext(): boolean {
        return this.getSearchPositionInPage() >= 0 && !!this.searchService.results &&
            !!this.searchService.results.records && this.searchService.results.records.length > 1;
    }

    public get previousEnabled(): boolean {
        return this.getSearchPositionInPage() > 0;
    }

    public get nextEnabled(): boolean {
        if (!this.searchService.results || !this.searchService.results.records) {
            return false;
        }
        const searchPosition = this.getSearchPositionInPage();
        return searchPosition >= 0 && searchPosition < (this.searchService.results.records.length - 1);
    }

    private getSearchPositionInPage(): number {
        const id = this.currentId;
        if (id && this.searchService.results && this.searchService.results.records) {
            for (let i = 0, ic = this.searchService.results.records.length; i < ic; i++) {
                const record = this.searchService.results.records[i];
                if (record.id === id) {
                    return i;
                }
            }
        }
        return -1;
    }

    public previous() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return;
        }
        const index = this.getSearchPositionInPage();
        if (index <= 0) {
            return;
        }
        const item = this.searchService.results.records[index - 1];
        this.updatePreviewData(item.id);
    }

    public next() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return;
        }
        const index = this.getSearchPositionInPage();
        if (index === -1 || index >= (this.searchService.results.records.length - 1)) {
            return;
        }
        const item = this.searchService.results.records[index + 1];
        this.updatePreviewData(item.id);
    }
}