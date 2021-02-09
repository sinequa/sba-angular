import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MODAL_MODEL, PromptOptions, ModalResult, ModalRef, ModalButton} from "@sinequa/core/modal";
import { Utils } from '@sinequa/core/base';

@Component({
    selector: "sq-prompt",
    template: `
        <form name="prompt" novalidate [formGroup]="form">
            <sq-modal [title]="title" [buttons]="buttons">
                <div class="form-group sq-form-group">
                    <label for="input">{{model.message | sqMessage:model.messageParams}}</label>
                    <input [sqValidation]="form" type="text" class="form-control" id="input" formControlName="input" spellcheck="off" sqAutofocus *ngIf="!model.rowCount">
                    <textarea [sqValidation]="form" type="text" class="form-control" id="input" formControlName="input" spellcheck="on" rows="{{model.rowCount}}" sqAutofocus *ngIf="!!model.rowCount">
                    </textarea>
                </div>
            </sq-modal>
        </form>
    `
})
export class BsPrompt implements OnInit, OnDestroy {
    inputControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL) public model: PromptOptions,
        protected modalRef: ModalRef,
        protected formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.inputControl = new FormControl(this.model.output, this.model.validators || Validators.required);
        this.form = this.formBuilder.group({
            input: this.inputControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.model.output = this.inputControl.value;
            });
            
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

    get title(): string {
        return this.model.title ? this.model.title : "msg#modal.prompt.title";
    }

}
