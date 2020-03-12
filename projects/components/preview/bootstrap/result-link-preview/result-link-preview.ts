import {Component, Input} from "@angular/core";
import {Record} from "@sinequa/core/web-services";
import {Query} from "@sinequa/core/app-utils";
import {ModalService} from "@sinequa/core/modal";
import {PreviewService} from "../../preview.service";

@Component({
    selector: "sq-result-link-preview",
    templateUrl: "./result-link-preview.html"
})
export class BsResultLinkPreview {
    @Input() query: Query;
    @Input() record: Record;
    @Input() icon: string = "fas fa-search";
    @Input() text: string = "";
    @Input() title: string = "";
    @Input() usePopup: boolean;
    @Input() newWindow: boolean;
    @Input() displaySimilarDocuments: boolean;
    @Input() metadata: string[];

    constructor(
        public modalService: ModalService,
        public previewService: PreviewService) {
    }

    click(event: MouseEvent) {
        if (this.usePopup) {
            if (event.ctrlKey) {
                this.previewService.openNewWindow(this.record, this.query);
            }
            else {
                this.previewService.openModal(this.record, this.query, {displaySimilarDocuments: this.displaySimilarDocuments, metadata: this.metadata});
            }
        }
        else {
            if(this.newWindow){
                this.previewService.openNewWindow(this.record, this.query);
            }
            else {
                this.previewService.openRoute(this.record, this.query);
            }
        }
        return false;
    }
}