import { Component, OnInit, Inject } from "@angular/core";
import { ModalButton, ModalResult, MODAL_MODEL } from "@sinequa/core/modal";
import { UpdateLabelsAction, ModalProperties } from "../../labels.service";

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
        `
    ]
})
export class BsDeleteLabel implements OnInit {
    buttons: ModalButton[];
    title: string;
    alert: string;

    constructor(
        @Inject(MODAL_MODEL)
        public model: {
            values: string[];
            properties: ModalProperties;
        }
    ) {}

    ngOnInit() {
        switch (this.model.properties.action) {
            case UpdateLabelsAction.delete:
                this.title = "msg#deleteLabel.title";
                this.alert = "msg#deleteLabel.alertText";
                break;
            case UpdateLabelsAction.bulkRemove:
                this.title = "msg#bulkRemoveLabel.title";
                this.alert = "msg#bulkRemoveLabel.alertText";
                break;
            default:
                this.title = "";
                this.alert = "";
                break;
        }

        this.buttons = [
            new ModalButton({
                result: ModalResult.OK,
                primary: true,
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
