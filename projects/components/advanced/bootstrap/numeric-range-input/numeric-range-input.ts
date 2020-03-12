import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * The options to configure the component.
 */
export interface NumericRangeInputOptions {}

export const SQ_NUMERIC_RANGE_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsNumericRangeInput),
    multi: true
};

@Component({
    selector: 'sq-numeric-range-input',
    templateUrl: './numeric-range-input.html',
    providers: [SQ_NUMERIC_RANGE_INPUT_VALUE_ACCESSOR]
})
export class BsNumericRangeInput implements OnInit, ControlValueAccessor {

    @Input() public options: NumericRangeInputOptions;
    public range: (number | undefined)[];

    private onChange: (value) => void = () => {};

    constructor() {
        this.range = [undefined, undefined];
    }

    ngOnInit(): void { }

    notifyValueChange(): void {
        this.onChange(this.range);
    }

    /**
     * Updates the lower bound of the range.
     *
     * @param value The new value.
     * @memberof NumericRangeInput
     */
    public updateFrom(value: number): void {
        if (this.range[0] !== value) {
            this.range[0] = value;
            this.notifyValueChange();
        }
    }

    /**
     * Updates the upper bound of the range.
     *
     * @param value The new value.
     * @memberof NumericRangeInput
     */
    public updateTo(value: number): void {
        if (this.range[1] !== value) {
            this.range[1] = value;
            this.notifyValueChange();
        }
    }

    //#region ControlValueAccessor methods
    writeValue(newRange: any[]): void {
        this.range = (!!newRange && newRange.length === 2) ? newRange : [null, null];
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }
    //#endregion
}
