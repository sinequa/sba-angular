import {Component, HostBinding, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {START_CONFIG, StartConfig} from "@sinequa/core/web-services";
import {ModalService, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {AuthenticationService, Credentials} from "@sinequa/core/login";

@Component({
    selector: "sq-login",
    templateUrl: "./login.component.html"
})
export class MdLogin implements OnInit, OnDestroy {
    @HostBinding("class.sq-login") true;
    userNameControl: FormControl;
    passwordControl: FormControl;
    providerNameControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    providers: any[];
    providerName: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) protected model: Credentials,
        protected modalService: ModalService,
        protected dialogRef: MatDialogRef<MdLogin>,
        protected formBuilder: FormBuilder,
        @Inject(START_CONFIG) protected startConfig: StartConfig,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.userNameControl = new FormControl(this.model.userName, Validators.required);
        this.passwordControl = new FormControl(this.model.password, Validators.required);
        this.providerNameControl = new FormControl();
        this.form = this.formBuilder.group({
            userName: this.userNameControl,
            password: this.passwordControl,
            providerName: this.providerNameControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.model.userName = this.userNameControl.value;
                this.model.password = this.passwordControl.value;
                this.providerName = this.providerNameControl.value;
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

        if (this.startConfig.providers) {
            Object.keys(this.startConfig.providers).forEach((providerName) => {
                if (!this.providers) {
                    this.providerName = "";
                    this.providers = [{displayName: "msg#modal.login.signInWith", name: ""}];
                }
                /*tslint:disable-next-line*/
                this.providers.push(this.startConfig.providers![providerName]);
            });
        }
    }

    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }

    yes() {
        this.dialogRef.close(ModalResult.Yes);
    }

    authenticate() {
        Utils.subscribe(this.authenticationService.authenticateWithProvider(this.providerName),
            (response) => {
                this.yes();
            },
            (error) => {
                console.log("login.authenticate cancelled: ", error);
            });
    }
}
