import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";

export interface FeedbackMessage {
    message : string;
    title: string;
}

@Component({
    selector: "sq-feedback-form",
    templateUrl: "./feedback-form.html"
})
export class BsFeedbackForm implements OnInit, OnDestroy {
    msgControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL) public model: FeedbackMessage,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.msgControl = new FormControl(this.model.message, Validators.required);
        this.form = this.formBuilder.group({
            feedbackMsg: this.msgControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.model.message = this.msgControl.value;
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
