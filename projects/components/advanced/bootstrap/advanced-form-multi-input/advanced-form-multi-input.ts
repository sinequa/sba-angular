import { Component, Input, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { Keys, Utils } from "@sinequa/core/base";
import { AutocompleteItem } from "@sinequa/components/autocomplete";
import { Subscription } from "rxjs";
import { AdvancedInput } from "../../advanced.service";

/**
 * Component representing a text input that accepts multiple entries.
 * This component also performs value validation on each entry.
 *
 */
@Component({
    selector: "sq-advanced-form-multi-input",
    templateUrl: "./advanced-form-multi-input.html",
    styleUrls: ["./advanced-form-multi-input.scss"]
})
export class BsAdvancedFormMultiInput implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() config: AdvancedInput;
    @Input() autocompleteEnabled: boolean = true;

    items: AutocompleteItem[] = []; /** List of items performed in the advanced search */
    name: string;
    label: string;
    control: AbstractControl | null;
    private _valueChangesSubscription: Subscription;

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.name = this.config.name;
        this.label = this.config.label;
        this.control = this.form.get(this.name);
        if (this.control) {
            this.items = this.control.value
                ? Utils.isArray(this.control.value)
                    ? this.control.value.map((item) => {
                          return {
                              display: item,
                              category: "",
                          };
                      })
                    : [this.control.value].map((item) => {
                          return {
                              display: item,
                              category: "",
                          };
                      })
                : [];
            this._valueChangesSubscription = Utils.subscribe(
                this.control.valueChanges,
                (value) => {
                    this.items = value
                        ? value.map((item) => {
                              return {
                                  display: item,
                                  category: "",
                              };
                          })
                        : [];
                }
            );
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
        this.control?.markAsDirty();
        this.control?.setValue(this.items.map((item) => item.display));
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
