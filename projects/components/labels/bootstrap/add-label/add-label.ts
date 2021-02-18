import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import {
    ModalButton,
    ModalResult,
    MODAL_MODEL,
    ModalRef,
} from "@sinequa/core/modal";
import { ModalProperties, LabelsService } from "../../labels.service";
import { Utils } from "@sinequa/core/base";

@Component({
    selector: "sq-add-label",
    templateUrl: "./add-label.html",
    styles: [
        `
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
    ],
})
export class BsAddLabel implements OnInit {
    public buttons: ModalButton[];
    public isProcessing: boolean = false;

    constructor(
        @Inject(MODAL_MODEL)
        public model: {
            values: string[],
            properties: ModalProperties
        },
        private labelsService: LabelsService,
        private changeDetectorRef: ChangeDetectorRef,
        private modalRef: ModalRef
    ) {}

    ngOnInit() {
        this.buttons = [
            new ModalButton({
                text: "msg#bulkAddLabel.btnBulkAdd",
                primary: true,
                result: ModalResult.Custom,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.bulkAddLabels(
                        this.model.values,
                        this.model.properties.public
                    );
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(
                            observable,
                            () => {},
                            (error) => {
                                this.modalRef.close(error);
                            },
                            () => {
                                this.isProcessing = false;
                                this.modalRef.close(ModalResult.OK);
                            }
                        );
                    }
                },
            }),
            new ModalButton({
                result: ModalResult.Cancel,
            }),
        ];
    }

    updateLabelsNature(nature: boolean) {
        this.model.properties.public = nature;
    }

    onLabelsChanged(values: string[]) {
        this.model.values = values;
    }
}
