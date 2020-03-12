import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef} from "@angular/core";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {ValidatorFn} from "@angular/forms";
import {Subscription} from "rxjs";
import {Utils, Keys} from "@sinequa/core/base";

@Component({
    selector: "sq-editable",
    templateUrl: "./editable.html",
    styleUrls: ["./editable.scss"]
})
export class BsEditable implements OnInit, OnDestroy {
    @HostBinding("attr.tabindex") tabindex = "0";
    @Input() name: string;
    @Input() value: string;
    @Input() model: any;
    @Output() valueChange: EventEmitter<string>;
    @Input() validators: ValidatorFn[];
    editableControl: FormControl;
    modelControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    previousValue: string;
    editing: boolean;
    private focusAfterEdit: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private elementRef: ElementRef
    ) {
        this.valueChange = new EventEmitter<string>();
    }

    ngOnInit() {
        this.editableControl = new FormControl(this.value, this.validators);
        this.modelControl = new FormControl(this.model);
        this.form = this.formBuilder.group({
            editable: this.editableControl,
            model: this.modelControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges,
            (value) => {
                this.value = this.editableControl.value;
            }
        );
    }

    ngOnDestroy() {
        this.valueChange.unsubscribe();
        this.formChanges.unsubscribe();
    }

    @HostListener("mousedown")
    @HostListener("touchstart")
    startEditing() {
        if (!this.editing) {
            this.previousValue = this.value;
            this.editableControl["_touched"] = false; //TODO - need markAsPristine?
            this.editableControl["_pristine"] = true; //
            this.editing = true;
        }
    }

    stopEditing(cancel = false) {
        if (this.editing) {
            this.editing = false;
            if (this.focusAfterEdit && this.elementRef) {
                this.elementRef.nativeElement.focus();
            }
            this.focusAfterEdit = false;
            if (cancel) {
                this.value = this.previousValue;
            }
            this.valueChange.emit(this.value);
        }
    }

    inputKeydown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case Keys.enter:
                event.stopPropagation();
                this.stopEditing();
                return false;
            case Keys.esc:
                event.stopPropagation();
                this.stopEditing(true);
                return false;
        }
        return undefined;
    }

    @HostListener("keydown", ["$event"])
    hostKeydown(event: KeyboardEvent) {
        if (event.keyCode === Keys.enter) {
            this.focusAfterEdit = true;
            this.startEditing();
            return false;
        }
        return undefined;
    }
}
