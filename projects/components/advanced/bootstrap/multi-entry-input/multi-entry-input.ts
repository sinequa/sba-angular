import { Component, forwardRef, Input, OnInit, TemplateRef, ContentChild, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Utils } from "@sinequa/core/base";
import moment from 'moment';

export enum ValueType {
    String = 'String',
    Int = 'Int',
    Number = 'Number',
    Date = 'Date'
}

/**
 * The options to configure the component.
 *
 */
export interface MultiEntryInputOptions {
    valueType: ValueType, // The element type
    nbVisibleLines?: number, // Number of values shown in the view list.
    distinct?: boolean, // Whether the list contains distinct value.
}

export const SQ_MULTI_ENTRY_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => BsMultiEntryInput)
}

/**
 * Component representing a text input that accepts multiple entries.
 * <p>
 * This component also performs value validation on each entry.
 *
 */
@Component({
    selector: 'sq-multi-entry-input',
    templateUrl: './multi-entry-input.html',
    providers: [SQ_MULTI_ENTRY_VALUE_ACCESSOR]
})
export class BsMultiEntryInput implements ControlValueAccessor, OnInit, AfterViewInit {

    // Constants
    private readonly MaxNbVisibleCharacters: number = 10;
    private readonly DefaultNbVisibleLines: number = 3;
    public readonly MaxInputWidth: string = (1.8 + this.MaxNbVisibleCharacters * 0.5) + 'em';

    @Input() public options: MultiEntryInputOptions;

    @ContentChild(TemplateRef, {static: false}) template: TemplateRef<any>;
    public values: any[];
    public names: string[];
    public afterViewInit: boolean;

    private onChangeCallback: (_: any) => void = () => {};

    constructor() {
        this.values = [];
        this.names = [];
    }

    ngOnInit(): void {
        if (!this.options.nbVisibleLines) {
            this.options.nbVisibleLines = this.DefaultNbVisibleLines;
        }
    }

    ngAfterViewInit(): void {
        this.afterViewInit = true;
    }

    private get isDate(): boolean {
        return this.options.valueType as ValueType === ValueType.Date;
    }

    private ensureType(type: ValueType, value: any): any {
        switch (type as ValueType) {
            case ValueType.Date:
                return value as Date;
            case ValueType.Int:
            case ValueType.Number:
                return Utils.asNumber(value);
            case ValueType.String:
            default:
                return Utils.trim(value);
        }
    }

    /**
     * Adds new entry at the end of the tag list.
     *
     * @param value The entry to add.
     */
    public add(value: any): void {
        if (Utils.isEmpty(value)) {
            return;
        }

        const newValue: any = this.ensureType(this.options.valueType, value);

        if (this.options.distinct && this.values.includes(newValue)) {
            return;
        }

        const index = this.values.length;
        this.values.splice(index, 0, newValue);
        this.names.splice(index, 0, this.makeItemName(newValue))

        this.triggerOnChange();
    }

    private makeItemName(v: any): string {
        const dateFormat = moment.localeData().longDateFormat('L');
        const strValue: string = this.isDate ? moment(v).format(dateFormat) : v.toString();
        return strValue.length > this.MaxNbVisibleCharacters
            ? strValue.substring(0, this.MaxNbVisibleCharacters) + '...'
            : strValue;
    }

    /**
     * Removes the selected entry.
     *
     * @param index the entry index.
     * @param event the related UI event.
     * @memberof MultiEntryInput
     */
    public onRemoveClicked(index: number, event: Event): void {
        this.remove(index);
    }

    public removeLast(): void {
        if (this.values.length > 0) {
            this.remove(this.values.length - 1);
        }
    }

    /**
     * Removes the selected entry.
     *
     * @param index the entry index.
     * @memberof MultiEntryInput
     */
    private remove(index: number): void {
        this.values.splice(index, 1);
        this.names.splice(index, 1);

        this.triggerOnChange();
    }

    /**
     * Indicates the height of the UI component.
     *
     * @return the height of the UI component.
     */
    public get maxHeight(): string {
        //If size is undefined use 5 as default
        const nbVisibleRows = this.options.nbVisibleLines ? Math.max(this.options.nbVisibleLines, 1) : 5;
        return (2.5 + (nbVisibleRows - 1) * 1.7) + 'em';
    }

    private triggerOnChange() {
        this.onChangeCallback(this.values.length > 0 ? this.values : undefined);
    }

    public calculateInputWidth(inputValue: string): string {
        const nbVisibleCharacters = Math.min(
            this.MaxNbVisibleCharacters,
            Math.max(1, inputValue ? inputValue.length : 0));
        return (1.8 + nbVisibleCharacters * 0.5) + 'em';
    }

    //#region ControlValueAccessor methods
    public writeValue(newValues: any[]): void {
        if (newValues) {
            this.values.splice(0);
            this.names.splice(0);
            newValues.forEach(v => {
                this.values.push(v);
                this.names.push(this.makeItemName(v));
            });
        }
    }

    public registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
    }
    //#endregion
}
