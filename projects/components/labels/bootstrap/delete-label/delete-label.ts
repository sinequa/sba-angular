import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import {
    ModalButton,
    ModalResult,
    MODAL_MODEL,
    ModalRef,
} from "@sinequa/core/modal";
import {
    UpdateLabelsAction,
    ModalProperties,
    LabelsService,
} from "../../labels.service";
import { Utils } from "@sinequa/core/base";

@Component({
    selector: "sq-delete-label",
    templateUrl: "./delete-label.html",
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
export class BsDeleteLabel implements OnInit {
    public buttons: ModalButton[];
    public title: string;
    public alert: string;
    public btnText: string;
    public isProcessing: boolean = false;

    private _action: () => void;

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
        switch (this.model.properties.action) {
            case UpdateLabelsAction.delete:
                this.title = "msg#deleteLabel.title";
                this.btnText = "msg#deleteLabel.btnDelete";
                this.alert = "msg#deleteLabel.alertText";
                this._action = () => {
                    const observable = this.labelsService.deleteLabels(
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
                };
                break;
            case UpdateLabelsAction.bulkRemove:
                this.title = "msg#bulkRemoveLabel.title";
                this.btnText = "msg#bulkRemoveLabel.btnBulkRemove";
                this.alert = "msg#bulkRemoveLabel.alertText";
                this._action = () => {
                    const observable = this.labelsService.bulkRemoveLabels(
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
                };
                break;
            default:
                this.title = "";
                this.btnText = "";
                this.alert = "";
                break;
        }

        this.buttons = [
            new ModalButton({
                text: this.btnText,
                primary: true,
                result: ModalResult.Custom,
                anchor: true,
                action: this._action,
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
