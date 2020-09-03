import {Component, OnInit, Inject} from "@angular/core";
import {ModalButton, ModalResult, MODAL_MODEL} from "@sinequa/core/modal";
import { ModalProperties } from '../../labels.service';

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

    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL)
        public model: {
            values: string[];
            properties: ModalProperties;
        }
    ) {}

    ngOnInit() {
        this.buttons = [
            new ModalButton({
                result: ModalResult.OK,
                primary: true
            }),
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];
    }

    updateLabelsNature(nature: boolean) {
        this.model.properties.public = nature;
    }

    onLabelsChanged(values: string[]) {
        this.model.values = values;
    }
}
