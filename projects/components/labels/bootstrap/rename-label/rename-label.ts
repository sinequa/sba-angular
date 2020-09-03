import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { ModalButton, ModalResult, MODAL_MODEL } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import { ModalProperties } from "../../labels.service";

@Component({
    selector: "sq-rename-label",
    templateUrl: "./rename-label.html",
    styles: [
        `
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `
    ]
})
export class BsRenameLabel implements OnInit, OnDestroy {
    labelControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL)
        public model: {
            oldValues: string[];
            newValue: string;
            properties: ModalProperties;
        },
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.labelControl = new FormControl(
            this.model.newValue,
            Validators.required
        );
        this.form = this.formBuilder.group({
            label: this.labelControl,
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, () => {
            this.model.newValue = this.labelControl.value;
        });

        this.buttons = [
            new ModalButton({
                result: ModalResult.OK,
                primary: true,
                validation: this.form,
            }),
            new ModalButton({
                result: ModalResult.Cancel,
            }),
        ];
    }

    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }

    updateLabelsNature(nature: boolean) {
        this.model.properties.public = nature;
    }

    onLabelsChanged(values: string[]) {
        this.model.oldValues = values;
    }
}
