import {Injectable, OnDestroy, RendererFactory2, Renderer2, Inject} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Keys, StrictUnion} from "@sinequa/core/base";
import {DOCUMENT} from "@angular/common";

// Based on  Bootstrap (v4.4.1): dropdown.js

export interface DropdownEvent {
    type: "clear" | "toggle" | "active";
}

export interface DropdownClearEvent extends DropdownEvent {
    type: "clear";
    sourceEvent: KeyboardEvent | MouseEvent | undefined;
}

export interface DropdownToggleEvent extends DropdownEvent {
    type: "toggle";
    element: Element;
}

export interface DropdownActiveEvent extends DropdownEvent {
    type: "active";
    value: boolean;
}

export type DropdownEvents = DropdownClearEvent | DropdownToggleEvent | DropdownActiveEvent;

export const gClassName = {
    DISABLED        : 'disabled',
    SHOW            : 'show',
    DROPUP          : 'dropup',
    DROPRIGHT       : 'dropend',
    DROPLEFT        : 'dropstart',
    MENURIGHT       : 'dropdown-menu-end',
    MENULEFT        : 'dropdown-menu-start',
    POSITION_STATIC : 'position-static'
};

export const gSelector = {
    DROPDOWN      : '.dropdown',
    DATA_TOGGLE   : '[data-bs-toggle="dropdown"]',
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
        @Inject(DOCUMENT) public readonly document: Document,
        rendererFactory: RendererFactory2
    ) {
        this._events = new Subject<DropdownEvents>();
        this.renderer = rendererFactory.createRenderer(null, null);
        this.unlisteners = [];
        this.unlisteners.push(this.renderer.listen(this.document, "keydown", this.dataApiKeydownHandler));
        this.unlisteners.push(this.renderer.listen(this.document, "click", this.clearMenus));
        this.unlisteners.push(this.renderer.listen(this.document, "keyup", this.clearMenus));
        this.unlisteners.push(this.renderer.listen(this.document, "click", this.toggle));
        this.unlisteners.push(this.renderer.listen(this.document, "click", this.formChildClick));
        this.unlisteners.push(this.renderer.listen(this.document, "wheel", () => {
            this.raiseClear();
            this.raiseActive(false);
        }));
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
        const descendant = this.matchDescendant(this.document.documentElement, event, `${gSelector.DATA_TOGGLE},${gSelector.MENU}`);
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
            event.key === Keys.space || event.key !== Keys.esc &&
            (event.key !== Keys.down && event.key !== Keys.up || (event.target as Element).closest(gSelector.MENU)) :
            !(event.key === Keys.up || event.key === Keys.down || event.key === Keys.esc)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (/*TODO descendant.disabled || */descendant.classList.contains(gClassName.DISABLED)) {
            return;
        }

        const parent = this.getParentFromElement(descendant);
        const isActive = parent instanceof HTMLElement && parent.classList.contains(gClassName.SHOW);

        if (!isActive && event.key === Keys.esc) {
            return;
        }

        if (!isActive || isActive && (event.key === Keys.esc || event.key === Keys.space)) {
            if (event.key === Keys.esc) {
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

        if (event.key === Keys.up && index > 0) { // Up
            index--;
        }

        if (event.key === Keys.down && index < items.length - 1) { // Down
            index++;
        }

        if (index < 0) {
            index = 0;
        }

        items[index].focus();
    }

    private clearMenus = (event: StrictUnion<KeyboardEvent | MouseEvent>): boolean | void => {
        if (event && (event.button === 2 /*RIGHT_MOUSE_BUTTON_WHICH*/ ||
            event.type === 'keyup' && event.key !== Keys.tab)) {
            return;
        }
        this._events.next({type: "clear", sourceEvent: event});
    }

    private toggle = (event: MouseEvent): boolean | void => {
        const descendant = this.matchDescendant(this.document.documentElement, event, gSelector.DATA_TOGGLE);
        if (!descendant) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this._events.next({type: "toggle", element: descendant});
    }

    private formChildClick = (event: MouseEvent): boolean | void => {
        this.raiseActive(false);
        if (!this.matchDescendant(this.document.documentElement, event, gSelector.FORM_CHILD)) {
            return;
        }
        event.stopPropagation();
    }

    raiseClear() {
        this._events.next({type: "clear", sourceEvent: undefined});
    }
    
    raiseActive(active: boolean) {
        this._events.next({type: "active", value: active});
    }
}
