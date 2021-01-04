import { Component, Input, OnChanges, ElementRef, OnDestroy } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { Keys, Utils } from "@sinequa/core/base";
import { AutocompleteItem } from "@sinequa/components/autocomplete";
import { Subscription } from "rxjs";
import { AppService, ValueItem } from '@sinequa/core/app-utils';

/**
 * Component representing a text input that accepts multiple entries.
 * This component also performs value validation on each entry.
 *
 */
@Component({
    selector: "sq-advanced-form-multi-input",
    templateUrl: "./advanced-form-multi-input.html",
    styleUrls: ["./advanced-form-multi-input.scss"],
})
export class BsAdvancedFormMultiInput implements OnChanges, OnDestroy {
    @Input() form: FormGroup;
    @Input() field: string;
    @Input() suggestQuery: string;
    @Input() label: string;

    items: AutocompleteItem[] = []; /** List of items already existing in the advanced search */
    private _valueChangesSubscription: Subscription;

    control: AbstractControl | null;

    constructor(
        private elementRef: ElementRef,
        public appService: AppService) {}

    ngOnChanges(): void {
        if(this.label === undefined) {
            this.label = this.appService.getPluralLabel(this.field);
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            this.items = this.control.value
                ? (Utils.isArray(this.control.value)
                        ? this.control.value
                        : [this.control.value]
                    ).map((item: ValueItem) => {
                        return {
                            display: item.display ? item.display : item.value.toString(),
                            normalized: item.value.toString(),
                            category: "",
                        };
                    })
                : [];

            this._valueChangesSubscription = Utils.subscribe(
                this.control.valueChanges,
                (value) => {
                    if(value && !Utils.isArray(value)) {
                        value = [value];
                    }
                    this.items = value
                        ? value.map((item: ValueItem) => {
                                return {
                                    display: item.display ? item.display : item.value.toString(),
                                    normalized: item.value.toString(),
                                    category: "",
                                };
                            })
                        : [];
                }
            );
        }
        else {
            throw new Error("No form control named "+this.field);
        }
    }

    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }

    removeItem(item: AutocompleteItem) {
        this.items.splice(this.items.indexOf(item), 1);
        this._updateControl();
    }

    onItemsChanged(items: AutocompleteItem[]) {
        this.items = items;
        this._updateControl();
    }

    keydown(event: KeyboardEvent) {
        // Intercept tab and set focus to surrounding dropdown-item
        if (event.keyCode === Keys.tab) {
            const dropdownItem = this._getDropdownItem();
            if (dropdownItem) {
                dropdownItem.focus();
                event.preventDefault();
                return false;
            }
        }
        return undefined;
    }

    keypress(event: KeyboardEvent) {
        if (event.keyCode === Keys.enter) {
            // Stop click event firing on surrounding anchor (Firefox)
            event.preventDefault();
            return false;
        }
        return undefined;
    }

    private _updateControl(): void {
        const value = this.items.length > 0
            ? this.items.map((item) => (
                {
                    value: item.normalized!,
                    display: item.display
                }
            ))
            : undefined
        this.control?.markAsDirty();
        this.control?.setValue(value, {emitEvent: false});
    }

    private _getDropdownItem(): HTMLElement | null {
        if (this.elementRef) {
            let current: HTMLElement | null = this.elementRef
                .nativeElement as HTMLElement;
            while (current && !current.classList.contains("dropdown-item")) {
                current = current.parentElement;
            }
            return current;
        }
        return null;
    }
}
