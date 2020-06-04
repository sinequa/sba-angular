import { Directive, HostBinding, ElementRef } from "@angular/core";
import { FocusableOption } from "@angular/cdk/a11y";

@Directive({
    selector: "[sqFocusKeyListItem]"
})
export class FocusKeyListItemDirective implements FocusableOption {
    @HostBinding() tabindex = -1;
    @HostBinding("attr.role") role = "list-item";

    constructor(protected element: ElementRef) {
    }

    focus() {
        this.element.nativeElement.focus();
    }
}
