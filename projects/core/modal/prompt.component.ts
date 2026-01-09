import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MODAL_MODEL, PromptOptions, ModalResult} from "./modal.service";
import { ModalRef } from "./modal-ref";
import { Utils } from '@sinequa/core/base';

@Component({
    selector: "sq-core-prompt",
    template: `
        <form novalidate [formGroup]="form" style="border: solid;padding: 16px;background-color: white;" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{title | sqMessage}}</h3>
            <div>{{model.message | sqMessage:model.messageParams}}</div>
            <input type="text" formControlName="input" *ngIf="!model.rowCount">
            <textarea type="text" formControlName="input" spellcheck="on" rows="{{model.rowCount}}" autofocus *ngIf="!!model.rowCount">
            </textarea>
            <ng-container *ngIf="showError(inputControl)">
                <br>
                <span style="color: red;">{{form.get("input")?.errors | sqValidationError}}</span>
            </ng-container>
            <hr>
            <button type="submit" (click)="ok()">{{'msg#modal.buttons.ok' | sqMessage}}</button>
            <button type="button" (click)="cancel()">{{'msg#modal.buttons.cancel' | sqMessage}}</button>
        </form>
    `,
    standalone: false
})
export class Prompt implements OnInit, OnDestroy {
    inputControl: UntypedFormControl;
    form: UntypedFormGroup;
    formChanges: Subscription;

    constructor(
        @Inject(MODAL_MODEL) public model: PromptOptions,
        protected modalRef: ModalRef,
        protected formBuilder: UntypedFormBuilder) {
    }

    ngOnInit() {
        this.inputControl = new UntypedFormControl(this.model.output, this.model.validators || Validators.required);
        this.form = this.formBuilder.group({
            input: this.inputControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.model.output = this.inputControl.value;
            });
    }

    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }

    showError(control: UntypedFormControl): boolean {
        return control.invalid && (control.dirty || this.modalRef.submitted);
    }

    ok() {
        if (!this.form.valid) {
            return;
        }
        this.modalRef.close(ModalResult.OK);
    }

    cancel() {
        this.modalRef.close(ModalResult.Cancel);
    }

    get title(): string {
        return this.model.title ? this.model.title : "msg#modal.prompt.title";
    }

}
