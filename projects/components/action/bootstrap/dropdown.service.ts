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
    }

    ngOnDestroy() {
        this._events.complete();
        this.unlisteners.forEach((unlistener) => unlistener());
    }

    get events(): Observable<DropdownEvents> {
        return this._events;
    }

    /**
     * "If the event target matches the selector, return it, otherwise return the
     * first ancestor of the event target that matches the selector."
     *
     * The function starts by declaring a variable named element and assigning it
     * the value of the event target. The event target is the element that the
     * event was dispatched from
     * @param {Element} base - The element that the event listener is attached to.
     * @param {Event} event - The event that was triggered.
     * @param {string} selector - The CSS selector to match.
     * @returns The element that matches the selector.
     */
    private matchDescendant(base: Element, {target}: Event, selector: string): HTMLElement | null {
        let element: HTMLElement | null = target as HTMLElement;
        while (element && element !== base) {
            if (element.matches(selector)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }

    /**
     * If the element has a data-target attribute, return it. Otherwise, if the
     * element has an href attribute, return it. Otherwise, return null
     * @param {HTMLElement} element - The element that triggered the event.
     * @returns The selector is being returned.
     */
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

    /**
     * It returns the parent element of the element passed in as a parameter
     * @param {HTMLElement} element - The element that was clicked.
     * @returns The parent element of the element that was clicked.
     */
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
        if (descendant === null) {
            return;
        }
        /*
            If not input/textarea:
            - And not a key in REGEXP_KEYDOWN => not a dropdown command
            If input/textarea:
            - If space key => not a dropdown command
            - If key is other than escape
            - If key is not up or down => not a dropdown command
            - If trigger inside the menu => not a dropdown command
        */
        const isInput = /input|textarea/i.test((event.target as Element).tagName);
        const isSpaceEvent = event.key === Keys.space;
        const isEscapeEvent = event.key === Keys.esc;
        const isUpOrDownEvent = [Keys.up.toString(), Keys.down.toString()].includes(event.key);
        const isDropdownMenu = (event.target as Element).closest(".dropdown-menu") !== null;

        if (isInput
            ? (isSpaceEvent || !isEscapeEvent) && (!isUpOrDownEvent || isDropdownMenu)
            : !isUpOrDownEvent || isEscapeEvent) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (descendant.classList.contains("disabled")) {
            return;
        }

        const parent = this.getParentFromElement(descendant);
        const isActive = parent instanceof HTMLElement && parent.classList.contains("show");

        if (!isActive && event.key === Keys.esc) {
            return;
        }

        if (!isActive || isActive && (event.key === Keys.esc || event.key === Keys.space)) {
            if (event.key === Keys.esc) {
                const toggle = parent instanceof Element && parent.querySelector(gSelector.DATA_TOGGLE);
                if (toggle instanceof HTMLElement) {
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
        if (!this.matchDescendant(this.document.documentElement, event, ".dropdown form")) {
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
