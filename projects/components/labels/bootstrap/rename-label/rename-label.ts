import {
    Component,
    OnInit,
    OnDestroy,
    Inject,
    ChangeDetectorRef,
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import {
    ModalButton,
    ModalResult,
    MODAL_MODEL,
    ModalRef,
} from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import { ModalProperties, LabelsService } from "../../labels.service";

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
        `,
    ],
})
export class BsRenameLabel implements OnInit, OnDestroy {
    public labelControl: FormControl;
    public form: FormGroup;
    public formChanges: Subscription;
    public buttons: ModalButton[];
    public isProcessing: boolean = false;

    constructor(
        @Inject(MODAL_MODEL)
        public model: {
            oldValues: string[],
            newValue: string,
            properties: ModalProperties
        },
        private formBuilder: FormBuilder,
        private labelsService: LabelsService,
        private changeDetectorRef: ChangeDetectorRef,
        private modalRef: ModalRef
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
                text: "msg#renameLabel.btnRename",
                primary: true,
                validation: this.form,
                result: ModalResult.Custom,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.renameLabels(
                        this.model.oldValues,
                        this.model.newValue,
                        this.model.properties.public
                    );
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(
                            observable,
                            () => {},
                            (error) => {
                                this.modalRef.close(error);
                            },
                            () => {
                                this.isProcessing = false;
                                this.modalRef.close(ModalResult.OK);
                            }
                        );
                    }
                },
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
