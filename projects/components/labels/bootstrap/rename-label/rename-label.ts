import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ModalButton, ModalResult, MODAL_MODEL} from "@sinequa/core/modal";
import {IRef, Utils} from "@sinequa/core/base";

@Component({
    selector: "sq-rename-label",
    templateUrl: "./rename-label.html"
})
export class BsRenameLabel implements OnInit, OnDestroy {
    labelControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL) public model: IRef<string>,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.labelControl = new FormControl(this.model.value, Validators.required);
        this.form = this.formBuilder.group({
            label: this.labelControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.model.value = this.labelControl.value;
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
}
