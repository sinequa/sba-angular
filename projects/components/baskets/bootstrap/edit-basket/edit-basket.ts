import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {Basket} from "../../baskets.service";

@Component({
    selector: "sq-edit-basket",
    templateUrl: "./edit-basket.html"
})
export class BsEditBasket implements OnInit, OnDestroy {
    nameControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL) public model: Basket,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.nameControl = new FormControl(this.model.name, Validators.required);
        this.form = this.formBuilder.group({
            basketName: this.nameControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.model.name = this.nameControl.value;
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
