import {Injectable, OnDestroy, RendererFactory2, Renderer2} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Keys} from "@sinequa/core/base";

// Based on  Bootstrap (v4.4.1): dropdown.js

export interface DropdownEvent {
    type: "clear" | "toggle";
}

export interface DropdownClearEvent extends DropdownEvent {
    type: "clear";
    sourceEvent: KeyboardEvent | MouseEvent | undefined;
}

export interface DropdownToggleEvent extends DropdownEvent {
    type: "toggle";
    element: Element;
}

export type DropdownEvents = DropdownClearEvent | DropdownToggleEvent;

export const gClassName = {
    DISABLED        : 'disabled',
    SHOW            : 'show',
    DROPUP          : 'dropup',
    DROPRIGHT       : 'dropright',
    DROPLEFT        : 'dropleft',
    MENURIGHT       : 'dropdown-menu-right',
    MENULEFT        : 'dropdown-menu-left',
    POSITION_STATIC : 'position-static'
};

export const gSelector = {
    DROPDOWN      : '.dropdown',
    DATA_TOGGLE   : '[data-toggle="dropdown"]',
    FORM_CHILD    : '.dropdown form',
    MENU          : '.dropdown-menu',
    NAVBAR_NAV    : '.navbar-nav',
    VISIBLE_ITEMS : '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
};

export const gAttachmentMap = {
    TOP       : 'top-start',
    TOPEND    : 'top-end',
    BOTTOM    : 'bottom-start',
    BOTTOMEND : 'bottom-end',
    RIGHT     : 'right-start',
    RIGHTEND  : 'right-end',
    LEFT      : 'left-start',
    LEFTEND   : 'left-end'
};

@Injectable({
    providedIn: "root"
})
export class BsDropdownService implements OnDestroy {
    protected _events: Subject<DropdownEvents>;
    protected unlisteners: (() => void)[];
    protected renderer: Renderer2;

    constructor(
        rendererFactory: RendererFactory2
    ) {
        this._events = new Subject<DropdownEvents>();
        this.renderer = rendererFactory.createRenderer(null, null);
        this.unlisteners = [];
        this.unlisteners.push(this.renderer.listen(document, "keydown", this.dataApiKeydownHandler));
        this.unlisteners.push(this.renderer.listen(document, "click", this.clearMenus));
        this.unlisteners.push(this.renderer.listen(document, "keyup", this.clearMenus));
        this.unlisteners.push(this.renderer.listen(document, "click", this.toggle));
        this.unlisteners.push(this.renderer.listen(document, "click", this.formChildClick));
    }

    ngOnDestroy() {
        this._events.complete();
        this.unlisteners.forEach((unlistener) => unlistener());
    }

    get events(): Observable<DropdownEvents> {
        return this._events;
    }

    private matchDescendant(base: Element, event: Event, selector: string): HTMLElement | null {
        let element: HTMLElement | null = event.target as HTMLElement;
        while (element && element !== base) {
            if (element.matches(selector)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }

    private getSelectorFromElement(element: HTMLElement) {
        let selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
            const hrefAttr = element.getAttribute('href');
            selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
        }

        try {
            return document.querySelector(selector) ? selector : null;
        }
        catch (err) {
            return null;
        }
    }

    getParentFromElement(element: HTMLElement): Node | null {
        let parent: HTMLElement | null = null;
        const selector = this.getSelectorFromElement(element);

        if (selector) {
            parent = document.querySelector(selector);
        }
        if (!parent) {
            // Account for scroll menus and sub menus
            parent = element.parentElement;
            while (parent &&
                (parent.classList.contains("sq-scroll-menu") ||
                parent.classList.contains("sq-scroll-menu-item") ||
                parent.classList.contains("dropdown-submenu"))) {
                parent = parent.parentElement;
            }
        }
        return parent;
    }

    private dataApiKeydownHandler = (event: KeyboardEvent): boolean | void => {
        const descendant = this.matchDescendant(document.documentElement, event, `${gSelector.DATA_TOGGLE},${gSelector.MENU}`);
        if (!descendant) {
            return;
        }
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test((event.target as Element).tagName) ?
            event.which === Keys.space || event.which !== Keys.esc &&
            (event.which !== Keys.down && event.which !== Keys.up || (event.target as Element).closest(gSelector.MENU)) :
            !(event.which === Keys.up || event.which === Keys.down || event.which === Keys.esc)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (/*TODO descendant.disabled || */descendant.classList.contains(gClassName.DISABLED)) {
            return;
        }

        const parent = this.getParentFromElement(descendant);
        const isActive = parent instanceof HTMLElement && parent.classList.contains(gClassName.SHOW);

        if (!isActive && event.which === Keys.esc) {
            return;
        }

        if (!isActive || isActive && (event.which === Keys.esc || event.which === Keys.space)) {
            if (event.which === Keys.esc) {
                const toggle = parent instanceof Element && parent.querySelector(gSelector.DATA_TOGGLE);
                if (toggle instanceof HTMLElement) {
                    // toggle.dispatchEvent(new Event("focus", {bubbles: true}));
                    // NB $(toggle).trigger('focus') will set the focus on toggle
                    toggle.focus();
                }
            }

            descendant.dispatchEvent(new Event("click", {bubbles: true}));
            return;
        }

        let items: HTMLElement[] = [];
        if (parent instanceof Element) {
            items = items.slice.call(parent.querySelectorAll(gSelector.VISIBLE_ITEMS))
                .filter((item: Element) => item instanceof HTMLElement && (item.offsetWidth > 0 || item.offsetHeight > 0));
        }

        if (items.length === 0) {
            return;
        }

        let index = items.indexOf(event.target as HTMLElement);

        if (event.which === Keys.up && index > 0) { // Up
            index--;
        }

        if (event.which === Keys.down && index < items.length - 1) { // Down
            index++;
        }

        if (index < 0) {
            index = 0;
        }

        items[index].focus();
    }

    private clearMenus = (event: KeyboardEvent | MouseEvent): boolean | void => {
        if (event && (event.which === 3 /*RIGHT_MOUSE_BUTTON_WHICH*/ ||
            event.type === 'keyup' && event.which !== Keys.tab)) {
            return;
        }
        this._events.next({type: "clear", sourceEvent: event});
    }

    private toggle = (event: UIEvent): boolean | void => {
        const descendant = this.matchDescendant(document.documentElement, event, gSelector.DATA_TOGGLE);
        if (!descendant) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this._events.next({type: "toggle", element: descendant});
    }

    private formChildClick = (event: UIEvent): boolean | void => {
        if (!this.matchDescendant(document.documentElement, event, gSelector.FORM_CHILD)) {
            return;
        }
        event.stopPropagation();
    }

    raiseClear() {
        this._events.next({type: "clear", sourceEvent: undefined});
    }
}
