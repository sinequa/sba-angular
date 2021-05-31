import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ModalRef, MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {AlertsService, Alert} from "../../alerts.service";
import {SearchService} from "@sinequa/components/search";
import {KeyValue} from "@angular/common";

@Component({
    selector: "sq-edit-alert",
    templateUrl: "./edit-alert.html",
    styleUrls: ["./edit-alert.scss"]
})
export class BsEditAlert implements OnInit, OnDestroy {
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    frequencies: Alert.Frequency[];
    frequency: typeof Alert.Frequency;
    canUpdateQuery: boolean;
    updateQuery: boolean;
    weekdays = {
        'monday': Alert.Days.Monday, 
        'tuesday': Alert.Days.Tuesday,
        'wednesday': Alert.Days.Wednesday,
        'thursday': Alert.Days.Thursday,
        'friday': Alert.Days.Friday,
        'saturday': Alert.Days.Saturday,
        'sunday': Alert.Days.Sunday
    };
    
    showDirtyMessage = false;
    
    // Preserve original property order
    originalOrder = (a: KeyValue<string, Alert.Days>, b: KeyValue<string, Alert.Days>): number => 0
    
    private alertDaysControl: FormControl;
    private alertNameControl: FormControl;
    private alertFrequencyControl: FormControl;
    private alertTimesControl: FormControl;
    private alertActiveControl: FormControl;
    private updateQueryControl: FormControl;

    constructor(
        @Inject(MODAL_MODEL) public model: { alert: Alert, searchRoute?: string },
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
    }

    get alert() {
        return this.model.alert;
    }

    ngOnInit() {
        if (!this.alert.days) {
            this.alert.days = Alert.Days.None;
        }
        this.canUpdateQuery = (!!this.alertsService.alert(this.alert.name)) &&
            !!this.searchService.results && !!this.searchService.results.records;

        this.alertDaysControl = new FormControl(this.alert.days);
        this.alertNameControl = new FormControl(this.alert.name, Validators.required);
        this.alertFrequencyControl = new FormControl(this.alert.frequency);
        this.alertTimesControl = new FormControl(this.alert.times); // TODO validator
        this.alertActiveControl = new FormControl(this.alert.active);
        this.updateQueryControl = new FormControl(this.updateQuery);
        this.form = this.formBuilder.group({
            alertName: this.alertNameControl,
            alertFrequency: this.alertFrequencyControl,
            alertTimes: this.alertTimesControl,
            alertActive: this.alertActiveControl,
            updateQuery: this.updateQueryControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.alert.name = this.alertNameControl.value;
                this.alert.frequency = this.alertFrequencyControl.value;
                this.alert.times = this.alertTimesControl.value;
                this.alert.active = this.alertActiveControl.value;
                this.alert.days = this.alertDaysControl.value;
                this.updateQuery = this.updateQueryControl.value;
            }
        );
        
        this.createButtons();
    }

    private createButtons() {
        this.buttons = [
            new ModalButton({
                text: "msg#editAlert.runQuery",
                result: ModalResult.Custom,
                action: (button) => {
                    this.runQuery();
                    this.modalRef.close(ModalResult.Cancel); // dismiss the dialog too (?)
                },
                visible: !!this.alertsService.alert(this.alert.name)
            }),
            new ModalButton({
                result: ModalResult.OK,
                primary: true,
                validation: this.form,
                action: (button) => {
                    if (this.updateQuery) {
                        this.alertsService.setAlertToCurrentQuery(this.alert);
                    }
                }
            }),
            new ModalButton({
                result: ModalResult.Cancel,
                action: (button) => {
                    if (this.form.dirty) {
                        button.result = ModalResult.Custom;
                        this.showDirtyMessage = true;
                        this.createYesNoButtons();
                    }
                }
            })
        ];
    }
    private createYesNoButtons() {
        this.buttons = [
            new ModalButton({
                result: ModalResult.Yes,
                primary: true,
            }),
            new ModalButton({
                result: ModalResult.No,
                action: (button) => {
                    button.result = ModalResult.Custom;
                    this.showDirtyMessage = false;
                    this.createButtons();
                }
            })
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }

    dayChecked(day: Alert.Days): boolean {
        return (this.alert.days & day) !== 0;
    }

    dayChange(event: UIEvent, day: Alert.Days) {
        const input = event.target as HTMLInputElement;
        if (input.checked) {
            this.alertDaysControl.setValue(this.alert.days |= day);
            // this.alert.days |= day;
        }
        else {
            this.alertDaysControl.setValue(this.alert.days &= ~day);
            // this.alert.days &= ~day;
        }
        this.form.markAsDirty();
    }

    runQuery() {
        this.alertsService.searchAlert(this.alert, this.model.searchRoute);
    }
}