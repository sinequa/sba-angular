import {Component, OnInit, Inject} from "@angular/core";
import {ModalButton, ModalResult, MODAL_MODEL} from "@sinequa/core/modal";
import { UpdateLabelsAction } from '../../labels.service';

@Component({
    selector: "sq-add-label",
    templateUrl: "./add-label.html"
})
export class BsAddLabel implements OnInit {

    buttons: ModalButton[];
    title: string;
    alert: string;

    constructor(@Inject(MODAL_MODEL) public model: any) {}

    ngOnInit() {
        switch (this.model.instance) {
            case UpdateLabelsAction.bulkAdd:
                this.title = 'msg#labels.bulkAddLabel';
                this.alert = 'msg#bulkAddLabel.alertText';
                break;
            default:
                this.title = ''
                break;
        }

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
