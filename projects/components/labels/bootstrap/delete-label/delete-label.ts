import {Component, OnInit, Inject} from "@angular/core";
import {ModalButton, ModalResult, MODAL_MODEL} from "@sinequa/core/modal";
import { UpdateLabelsAction } from '../../labels.service';

@Component({
    selector: "sq-delete-label",
    templateUrl: "./delete-label.html"
})
export class BsDeleteLabel implements OnInit {

    buttons: ModalButton[];
    title: string;
    alert: string;

    constructor(@Inject(MODAL_MODEL) public model: any) {}

    ngOnInit() {
        switch (this.model.instance) {
            case UpdateLabelsAction.delete:
                this.title = 'msg#labels.deleteLabel';
                this.alert = 'msg#deleteLabel.alertText';
                break;
            case UpdateLabelsAction.bulkRemove:
                this.title = 'msg#labels.bulkRemoveLabel';
                this.alert = 'msg#bulkRemoveLabel.alertText';
                break;
            default:
                this.title = ''
                this.alert = ''
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
