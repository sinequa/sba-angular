import {Component, HostBinding, OnInit, OnDestroy, Inject} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {StartConfig, START_CONFIG} from "@sinequa/core/web-services";
import {ModalService, MODAL_MODEL, ModalRef, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import { AuthenticationService, Credentials } from "@sinequa/core/login";


@Component({
    selector: "sq-login",
    templateUrl: "./login.component.html"
})
export class BsLogin implements OnInit, OnDestroy {
    @HostBinding("class.sq-login") true;
    userNameControl: UntypedFormControl;
    passwordControl: UntypedFormControl;
    providerNameControl: UntypedFormControl;
    form: UntypedFormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    providers: any[];
    providerName: string;

    constructor(
        @Inject(MODAL_MODEL) protected model: Credentials,
        protected modalService: ModalService,
        protected modalRef: ModalRef,
        protected formBuilder: UntypedFormBuilder,
        @Inject(START_CONFIG) protected startConfig: StartConfig,
        protected authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.userNameControl = new UntypedFormControl(this.model.userName, Validators.required);
        this.passwordControl = new UntypedFormControl(this.model.password, Validators.required);
        this.providerNameControl = new UntypedFormControl();
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
    }

    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }

    yes() {
        this.modalRef.close(ModalResult.Yes);
    }

    authenticate() {
        Utils.subscribe(this.authenticationService.autoAuthenticate(),
            (response) => {
                this.yes();
            },
            (error) => {
                console.log("login.authenticate cancelled: ", error);
            });
    }
}
