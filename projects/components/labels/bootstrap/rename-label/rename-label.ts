import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ModalButton, ModalResult, MODAL_MODEL} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import { UpdateLabelsAction } from '../../labels.service';

@Component({
    selector: "sq-rename-label",
    templateUrl: "./rename-label.html"
})
export class BsRenameLabel implements OnInit, OnDestroy {

    labelControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    readonly labelsAction = UpdateLabelsAction.rename;

    constructor(
        @Inject(MODAL_MODEL) public model: any,
        private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.labelControl = new FormControl(this.model.newValue, Validators.required);
        this.form = this.formBuilder.group({
            label: this.labelControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            () => {
                this.model.newValue = this.labelControl.value;
            }
        );

        this.buttons = [
            new ModalButton({
                result: ModalResult.OK,
                primary: true,
                validation: this.form
            }),
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];
    }

    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }

    onLabelsChanged(obj: {values: string[], public: boolean}) {
        this.model.oldValues = obj.values;
        this.model.public = obj.public;
    }
}
