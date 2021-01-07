import { Component, forwardRef, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Utils, Keys } from "@sinequa/core/base";
import { ValueItem } from '@sinequa/core/app-utils';

@Component({
    selector: "sq-select",
    templateUrl: "./select.html",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => BsSelectComponent),
        }]
})
export class BsSelectComponent implements ControlValueAccessor, OnInit {
    @Input() items: ValueItem[];
    @Input() disabled: boolean;
    @Input() multiple: boolean;
    @ViewChild("button", {static: false}) buttonElement: ElementRef;
    opened: boolean = false;
    isOpen: boolean = false;
    activeItem: number = -1;
    private cancelBlur: boolean = false; // For IE which takes focus when clicking on dropdown scrollbar despite the mousedown handling
    public names: string[];
    private selectedItems: number[]; //stores indices of selected items
    private onChangeCallback: (_: any) => void = () => {};

    ngOnInit() {
        this.clearSelected();
        if (this.items.length === 0) {
          this.disabled = false;
        }
        this.names = [];
        this.items.forEach(item => this.names.push(item.display!));
    }

    setOpen(value: boolean): void {
        if (!this.opened) {
            if (this.disabled || !value) {
                return;
            }
            this.opened = true;
        }
        this.isOpen = value;
        if (!value) {
            this.activeItem = -1;
        }
    }

    mousedown(event: Event): void {
        event.preventDefault();
        this.cancelBlur = true;
        Utils.delay().then(() => this.cancelBlur = false);
    }

    blur(event: FocusEvent): void {
        if (this.cancelBlur) {
            event.preventDefault();
            event.stopImmediatePropagation();
            Utils.delay().then(() => {
                this.buttonElement.nativeElement.focus();
            });
            return;
        }
        this.setOpen(false);
    }

    toggleOpen(): void {
        if (this.disabled) {
            return;
        }
        this.setOpen(!this.isOpen);
    }

    keydown($event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }
        // arrow down
        if ($event.keyCode === Keys.down) {
            if (!this.isOpen) {
                this.setOpen(true);
            }
            this.activeItem++;
            if (this.activeItem >= this.items.length) {
                this.activeItem = 0;
            }
            $event.preventDefault();
            $event.stopPropagation();
        }
        // arrow up
        else if ($event.keyCode === Keys.up) {
            if (!this.isOpen) {
                this.setOpen(true);
            }
            this.activeItem--;
            if (this.activeItem < 0) {
                this.activeItem = this.items.length - 1;
            }
            $event.preventDefault();
            $event.stopPropagation();
        }
        // enter or space
        else if (($event.keyCode === Keys.enter || $event.keyCode === Keys.space) &&
            this.activeItem >= 0 && this.activeItem < this.items.length) {
            this.toggleItemSelected(this.activeItem);
            $event.preventDefault();
            $event.stopPropagation();
        }
        // escape
        else if ($event.keyCode === Keys.esc && this.isOpen) {
            this.setOpen(false);
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    private clearSelected() {
        this.selectedItems = [];
    }

    private countSelected(): number {
        return this.selectedItems.length;
    }

    isItemSelected(itemIndex: number) : boolean {
        return this.selectedItems.includes(itemIndex);
    }

    toggleItemSelected(itemIndex: number): void {
        const idx: number = this.selectedItems.indexOf(itemIndex);
        // Remove item if it was already selected
        if (idx > -1) {
            this.selectedItems.splice(idx, 1);
        }
        // regular case: just add the index, and update the active item if it exists
        else if (this.multiple) {
            this.selectedItems.push(itemIndex);
            if (this.activeItem >= 0)
                this.activeItem = itemIndex;
        }
        // single-item case: ensure there is only one selected item, and close the menu
        else {
            this.selectedItems = [itemIndex];
            this.setOpen(false);
        }
        this.triggerOnChange();
    }

    /* Template properties */
    get buttonTitleMessageParams(): any {
        return {
            values: {
                count: this.countSelected()
            }
        };
    }

    get buttonTitle(): string {
        const selectCount = this.countSelected();

        if (selectCount === 0) {
            return "msg#advanced.select.noItems";
        }
        if (!this.multiple) {
            return this.items[this.selectedItems[0]].display!;
        }
        if (selectCount === this.items.length) {
            return "msg#advanced.select.allItems";
        }

        //Get list of items names corresponding to selected indices
        return this.selectedItems
            .map(index => this.items[index].display!)
            .sort()
            .join(", ");
    }

    get itemListHeight(): string {
        // use 10 as default
        return (10 * 4) + "ex";
    }
    /* End Template properties */

    /* Change event */
    private triggerOnChange() {
        // Gather selected item values
        let values: ValueItem | ValueItem[] | undefined;
        // We can not pass an empty array, when empty use undefined instead
        if (this.selectedItems.length === 0) {
            values = undefined;
        }
        // return an array if multiple
        else if (this.multiple) {
            values = this.selectedItems.map(index => this.items[index]);
        }
        // directly pass the value if not multiple
        else {
            values = this.items[this.selectedItems[0]];
        }

        this.onChangeCallback(values);
    }
    /* End Change event */

    /* ControlValueAccessor methods */
    writeValue(value: ValueItem | ValueItem[]): void {
        this.clearSelected();
        if (value) {
            // the value may not be an array if this select is not multiple
            const asArray = Array.isArray(value) ? value : [value];
            //Mark items as selected based on input values
            this.items.forEach((item, index) => {
                if (asArray.find((el) => el.value === item.value) && index !== undefined) {
                    this.selectedItems.push(index);
                }
            });
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
    }
    /* End ControlValueAccessor methods */
}
