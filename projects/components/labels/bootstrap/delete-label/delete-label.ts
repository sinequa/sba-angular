import {Component, OnInit, Inject} from "@angular/core";
import {ModalButton, ModalResult, MODAL_MODEL} from "@sinequa/core/modal";

@Component({
    selector: "sq-delete-label",
    templateUrl: "./delete-label.html"
})
export class BsDeleteLabel implements OnInit {

    buttons: ModalButton[];

    constructor(@Inject(MODAL_MODEL) public model: any) {}

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

    onLabelsChanged(obj: {values: string[], public: boolean}) {
        this.model.values = obj.values;
        this.model.public = obj.public;
    }
}
