import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CCColumn } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import { Utils, Keys } from "@sinequa/core/base";
import { ValueType } from '../multi-entry-input/multi-entry-input';
import { BsDatePicker } from '../date-picker/date-picker';
import { MultiEntry } from "../advanced-models";

@Component({
    selector: 'sq-advanced-form-multi-entry',
    templateUrl: './advanced-form-multi-entry.html',
    styles: [`
.input-autocomplete{
    display: flex;
    flex-direction: column;
}
    `]
})
export class BsAdvancedFormMultiEntry implements OnInit {

    @Input() form: FormGroup;
    @Input() config: MultiEntry;
    @Input() autocompleteEnabled: boolean;
    @Input() suggestQuery: string;
    name: string;
    label: string;
    column: CCColumn | undefined;
    minDate: Date | undefined;
    maxDate: Date | undefined;

    @ViewChild('inputRef', {static: false}) inputRef: ElementRef;
    @ViewChild('datePicker', {static: false}) datePicker: BsDatePicker;
    public tagsInputValue: any;

    constructor(public appService: AppService) {
        this.tagsInputValue = '';
    }

    ngOnInit(): void {
        this.name = this.config.name || this.config.field;
        this.label = this.config.label || this.appService.getSingularLabel(this.config.field);
        this.column = this.appService.getColumn(this.config.field);
        if (this.isDate) {
            this.minDate = Utils.isDate(this.config.min) ? this.config.min : undefined;
            this.maxDate = Utils.isDate(this.config.max) ? this.config.max : undefined;
        }
    }

    public get valueType(): string {
        return this.isDate ? ValueType.Date : ValueType.String;
    }

    public get isDate(): boolean {
        return !!this.column && AppService.isDate(this.column);
    }

    public getMin(): any {
        return this.config.min;
    }

    public getMax(): any {
        return this.config.max;
    }
    //#region Manage the new tags input template of the MultiEntryInput
    public onMouseClicked(event: Event): void {
        this.focusTagInput();
    }

    public focusTagInput(): void {
        if (this.inputRef) {
            this.inputRef.nativeElement.focus();
        }
        else if (this.datePicker) {
            this.datePicker.focus();
        }
    }

    public onKeyDown(event: KeyboardEvent, addFn: (any) => void, removeLastFn: () => void): void {
        switch (event.keyCode) {
            case Keys.backspace: {
                if (this.hasNoInput) {
                    removeLastFn();
                }
                break;
            }

            case Keys.enter: {
                this.addNewTag(addFn);
                // Avoid the event to act as form submission.
                event.preventDefault();
                event.stopPropagation();
                break;
            }
        }
    }

    private addNewTag(addFn: (any: any) => void) {
        addFn(this.tagsInputValue);
        this.tagsInputValue = '';
    }

    public get hasNoInput(): boolean {
        return this.datePicker
            ? Utils.isEmpty(this.datePicker.input.nativeElement.value)
            : Utils.isEmpty(this.tagsInputValue);
    }

    public onInputChanged(value: any): void {
        this.tagsInputValue = value;
    }

    public onPlusClicked(addFn: (any) => void): void {
        this.addNewTag(addFn);
    }
    //#endregion
}
