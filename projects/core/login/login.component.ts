import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MODAL_MODEL, ModalResult, ModalRef} from "@sinequa/core/modal";
import {Credentials} from "./authentication.service";
import {Utils} from "@sinequa/core/base";

/**
 * A basic login component that request a user name and password. It is designed to work with
 * [LoginService.getCredentials]{@link LoginService#getCredentials} and can be set using the
 * {@link MODAL_LOGIN} injection token
 */
@Component({
    selector: "sq-core-login",
    template: `
        <form novalidate [formGroup]="form" style="border: solid;padding: 16px;background-color: white;"
            cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{'msg#modal.login.title' | sqMessage}}</h3>
            <input placeholder="{{'msg#modal.login.userName' | sqMessage}}" formControlName="userName">
            <ng-container *ngIf="showError(userNameControl)">
                <br>
                <span style="color: red;">{{form.get("userName")?.errors | sqValidationError}}</span>
            </ng-container>
            <div style="margin-bottom: 8px;"></div>
            <input type="password" placeholder="{{'msg#modal.login.password' | sqMessage}}" formControlName="password">
            <ng-container *ngIf="showError(passwordControl)">
                <br>
                <span style="color: red;">{{form.get("password")?.errors | sqValidationError}}</span>
            </ng-container>
            <hr>
            <button type="submit" (click)="ok()">{{'msg#modal.buttons.ok' | sqMessage}}</button>
            <button type="button" (click)="cancel()">{{'msg#modal.buttons.cancel' | sqMessage}}</button>
        </form>
    `
})
export class Login implements OnInit, OnDestroy {
    userNameControl: FormControl;
    passwordControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;

    constructor(
        @Inject(MODAL_MODEL) protected model: Credentials,
        protected modalRef: ModalRef,
        protected formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.userNameControl = new FormControl(this.model.userName, Validators.required);
        this.passwordControl = new FormControl(this.model.password, Validators.required);
        this.form = this.formBuilder.group({
            userName: this.userNameControl,
            password: this.passwordControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.model.userName = this.userNameControl.value;
                this.model.password = this.passwordControl.value;
            });
    }

    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }

    showError(control: FormControl): boolean {
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
}
