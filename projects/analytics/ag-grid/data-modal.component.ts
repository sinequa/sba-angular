import { Component, Inject } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { UIService } from "@sinequa/components/utils";
import { FormatService, ValueItem } from "@sinequa/core/app-utils";
import { FieldValue } from "@sinequa/core/base";
import { ModalButton, ModalResult, MODAL_MODEL } from "@sinequa/core/modal";
import { CCColumn } from "@sinequa/core/web-services";

declare type DataModel = {
    cell: ValueItem | FieldValue,
    row: any,
    column: string,
    cccolumn: CCColumn,
    formatContent: boolean
};

@Component({
    selector: 'sq-data-modal',
    templateUrl: './data-modal.component.html',
    styles: [`
pre {
    overflow: auto;
    font-size: 12px;
    max-height: 50vh;
}
    `]
})
export class DataModalComponent {

    buttons: ModalButton[];
    copyAction: Action;
    formatContent = true;
    data: string;

    constructor(
        @Inject(MODAL_MODEL) public model: DataModel,
        public uiService: UIService,
        public formatService: FormatService
    ){
        this.formatContent = model.formatContent;
    }

    ngOnInit() {
        // A "fake" button is needed to display the custom footer
        this.buttons = [
            new ModalButton({
                result: ModalResult.Ignore,
                visible: false
            })
        ];

        this.copyAction = new Action({
            icon: "far fa-copy",
            title: "Copy to Clipboard",
            action: () => this.uiService.copyToClipboard(this.data)
        });

        this.updateData();
    }

    updateData() {
        if(this.formatContent) {
            this.data = this.formatService.formatValue(this.model.cell, this.model.cccolumn);
        }
        else {
            this.data = this.formatService.formatRaw(this.model.cell);
        }
    }
}