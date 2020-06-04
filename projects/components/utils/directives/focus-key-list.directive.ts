import { Directive, Input, Output, HostBinding, EventEmitter, OnChanges, AfterContentInit,
    ContentChildren, QueryList, HostListener } from "@angular/core";
import { FocusKeyManager } from "@angular/cdk/a11y";
import { FocusKeyListItemDirective } from "./focus-key-list-item.directive";
import { Utils } from "@sinequa/core/base";

@Directive({
    selector: "[sqFocusKeyList]"
})
export class FocusKeyListDirective implements OnChanges, AfterContentInit {
    @Input() activeItem = -1;
    @Input() withWrap = true;
    @Output() itemSelect = new EventEmitter<number>();
    @HostBinding("attr.role") role = "list";
    @ContentChildren(FocusKeyListItemDirective) components: QueryList<FocusKeyListItemDirective>;
    protected keyManager: FocusKeyManager<FocusKeyListItemDirective>;

    ngOnChanges() {
        if (this.keyManager) {
            this.keyManager.setActiveItem(this.activeItem);
        }
    }

    ngAfterContentInit() {
        this.keyManager = new FocusKeyManager<FocusKeyListItemDirective>(this.components);
        if (this.withWrap) {
            this.keyManager.withWrap();
        }
        if (this.activeItem >= 0 && this.components.length > 0) {
            Utils.delay().then(() => {
                this.keyManager.setActiveItem(this.activeItem);
            });
        }
    }

    @HostListener("keydown", ["$event"])
    onKeydown(event) {
        this.keyManager.onKeydown(event);
        this.itemSelect.emit(this.keyManager.activeItemIndex !== null ? this.keyManager.activeItemIndex : undefined);
    }
}
