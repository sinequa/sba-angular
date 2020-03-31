import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {UserOverride} from "@sinequa/core/login";

@Component({
    selector: "sq-override-user",
    templateUrl: "./override-user.html"
})
export class BsOverrideUser implements OnInit, OnDestroy {
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL) public model: UserOverride,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            "userName": [this.model.userName, Validators.required],
            "domain": [this.model.domain, Validators.required]
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges.pipe(debounceTime(100)),
            (value) => {
                Utils.merge(this.model, value);
                //this.model.userName = this.form.get("userName").value;
                //this.model.domain = this.form.get("domain").value;
            });

        this.buttons = [
            new ModalButton({
                result: ModalResult.OK,
                primary: true,
                validation: <any>this.form
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