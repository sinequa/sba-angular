import {Component, OnInit, OnDestroy} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ModalButton, ModalResult} from "@sinequa/core/modal";
import {IRef, Utils} from "@sinequa/core/base";

@Component({
    selector: "sq-rename-label",
    templateUrl: "./rename-label.html"
})
export class BsRenameLabel implements OnInit, OnDestroy {
    model: IRef<string>;
    labelControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];

    constructor(
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
