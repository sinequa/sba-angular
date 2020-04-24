import {Component, Input, OnInit, ElementRef, HostBinding} from "@angular/core";
import {Action} from "../../action";

export interface DropdownMenuOptions {
    item: Action;
    rightAligned: boolean;
    showMenuClass: string;
}

@Component({
    selector: "[sq-dropdown-menu]",
    host: {
        "class": "dropdown-menu",
        "role": "menu"
    },
    templateUrl: "./dropdown-menu.html"
})
export class BsDropdownMenu implements OnInit {
    @Input("sq-dropdown-menu") options: DropdownMenuOptions;
    @HostBinding("class.dropdown-menu-right") rightAligned;

    constructor(
        private elementRef: ElementRef) {
    }

    ngOnInit() {
        const element: HTMLElement = this.elementRef.nativeElement;
        if (this.options.item.scrollable) {
            element.classList.add("sq-scrollable-menu");
        }
        else if (this.options.item.scrollGroup) {
            element.classList.add("sq-scroll-menu");
        }
        this.rightAligned = this.options.rightAligned;
    }

    private getLi(element: HTMLElement): HTMLElement | null {
        let element1: HTMLElement | null = element;
        while (element1 && element1.nodeName !== "LI") {
            element1 = element1.parentElement;
        }
        return element1;
    }

    click(item: Action, event: UIEvent) {
        if (!this.options.item.disabled) {
            // Handle sub-menu opening
            let isOpen = false;
            const li = this.getLi(<HTMLElement>event.target);
            if (!!li && li.classList.contains("dropdown-submenu")) {
                event.preventDefault();
                event.stopPropagation();
                isOpen = li.classList.contains(this.options.showMenuClass);
                const ul = li.parentElement;
                if (ul) {
                    for (let i = 0, ic = ul.children.length; i < ic; i++) {
                        const _li = ul.children[i];
                        _li.classList.remove(this.options.showMenuClass);
                    }
                }
                // NB toggle's second param does not work on IE
                // li.classList.toggle(this.options.showMenuClass, !isOpen);
                if (!isOpen) {
                    li.classList.add(this.options.showMenuClass);
                }
            }
            if (item.action) {
                item.action(item, event);
            }
            if (item.toggle) {
                item.toggle(item, !isOpen);
            }
        }
    }
}