import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {SavedQuery} from "../../saved-queries.service";

@Component({
    selector: "sq-edit-saved-query",
    templateUrl: "./edit-saved-query.html"
})
export class BsEditSavedQuery implements OnInit, OnDestroy {
    nameControl: UntypedFormControl;
    form: UntypedFormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL) public model: SavedQuery,
        private formBuilder: UntypedFormBuilder) {
    }

    ngOnInit() {
        this.nameControl = new UntypedFormControl(this.model.name, Validators.required);
        this.form = this.formBuilder.group({
            savedQueryName: this.nameControl
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
