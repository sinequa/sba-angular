import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ModalRef, MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {AlertsService, Alert} from "../../alerts.service";
import {SearchService} from "@sinequa/components/search";

@Component({
    selector: "sq-edit-alert",
    templateUrl: "./edit-alert.html"
})
export class BsEditAlert implements OnInit, OnDestroy {
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    frequencies: Alert.Frequency[];
    frequency: typeof Alert.Frequency;
    days: typeof Alert.Days;
    canUpdateQuery: boolean;
    updateQuery: boolean;
    private alertNameControl: FormControl;
    private alertFrequencyControl: FormControl;
    private alertTimesControl: FormControl;
    private alertActiveControl: FormControl;
    private updateQueryControl: FormControl; 

    constructor(
        @Inject(MODAL_MODEL) public model: Alert,
        private formBuilder: FormBuilder,
        private searchService: SearchService,
        private alertsService: AlertsService,
        private modalRef: ModalRef) {
        this.frequencies = [
            Alert.Frequency.Daily,
            Alert.Frequency.Hourly,
            Alert.Frequency.Immediate,
        ];
        this.frequency = Alert.Frequency;
        this.days = Alert.Days;
    }

    ngOnInit() {
        if (!this.model.days) {
            this.model.days = this.days.None;
        }
        this.canUpdateQuery = (!!this.alertsService.alert(this.model.name)) &&
            !!this.searchService.results && !!this.searchService.results.records;

        this.alertNameControl = new FormControl(this.model.name, Validators.required);
        this.alertFrequencyControl = new FormControl(this.model.frequency);
        this.alertTimesControl = new FormControl(this.model.times); // TODO validator
        this.alertActiveControl = new FormControl(this.model.active);
        this.updateQueryControl = new FormControl(this.updateQuery);
        this.form = this.formBuilder.group({
            alertName: this.alertNameControl,
            alertFrequency: this.alertFrequencyControl,
            alertTimes: this.alertTimesControl,
            alertActive: this.alertTimesControl,
            updateQuery: this.updateQueryControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.model.name = this.alertNameControl.value;
                this.model.frequency = this.alertFrequencyControl.value;
                this.model.times = this.alertTimesControl.value;
                this.model.active = this.alertActiveControl.value;
                this.updateQuery = this.updateQueryControl.value;
            }
        );

        this.buttons = [
            new ModalButton({
                text: "msg#editAlert.runQuery",
                result: ModalResult.Custom,
                action: (button) => {
                    this.runQuery();
                    this.modalRef.close(ModalResult.Cancel); // dismiss the dialog too (?)
                },
                visible: !!this.alertsService.alert(this.model.name)
            }),
            new ModalButton({
                result: ModalResult.OK,
                primary: true,
                validation: this.form,
                action: (button) => {
                    if (this.updateQuery) {
                        this.alertsService.setAlertToCurrentQuery(this.model);
                    }
                }
            }),
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];
    }

    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }

    dayChecked(day: Alert.Days): boolean {
        return (this.model.days & day) !== 0;
    }

    dayChange(event: UIEvent, day: Alert.Days) {
        const input = event.target as HTMLInputElement;
        if (input.checked) {
            this.model.days |= day;
        }
        else {
            this.model.days &= ~day;
        }
    }

    runQuery() {
        this.alertsService.searchAlert(this.model);
    }
}