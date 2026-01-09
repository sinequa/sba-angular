import {Directive, OnInit, OnDestroy, AfterViewInit, ElementRef, HostListener} from "@angular/core";
import {Subscription} from 'rxjs';
import {createPopper} from '@popperjs/core';
import {Keys, StrictUnion} from "@sinequa/core/base";
import {BsDropdownService, gClassName, gSelector} from './dropdown.service';

// Based on  Bootstrap (v4.4.1): dropdown.js

function noop() {}

const gConfig = {
    offset       : [0,2],
    flip         : true,
    boundary     : 'clippingParents',
    reference    : 'toggle',
    display      : 'dynamic',
    popperConfig: null,
    autoClose: true
};

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: "[data-bs-toggle='dropdown']",
    standalone: false
})
export class BsDropdownDirective implements OnInit, OnDestroy, AfterViewInit {
    private subscription: Subscription;
    /**
     * true if the dropdown is within a navbar element
     */
    private inNavbar: boolean;
    /**
     * the dropdown wrapper, often the parent of the `ElementRef` element
     *
     * @example
     * <div class="dropdown">
     * ...
     * </div>
     * */
    private dropdown: HTMLElement;
    /**
     * the `dropdown-toggle` element where the directive is set.
     *
     * @example
     * <button class="dropdown-toggle" [data-bs-toggle]="dropdown">...</button>
     */
    private dropdownToggle: HTMLElement;
    /**
     * the `dropdown-menu` element attached to the `dropdown-toggle` element
     *
     * @example
     * <div class="dropdown">
     *   <button class="dropdown-toggle" [data-bs-toggle]="dropdown">...</button>
     *   <ul class="dropdown-menu">
     *   ...
     *   </ul>
     * </div>
     */
    private _dropdownMenu: HTMLElement | null;
    private popper;

    constructor(
        private elementRef: ElementRef,
        private dropdownService: BsDropdownService
    ) {
    }

    /**
     * @returns The first `.dropdown` descendant `.dropdown-menu` element.
     */
    get dropdownMenu(): HTMLElement | null {
        if (!this._dropdownMenu && this.dropdown) {
            this._dropdownMenu = this.dropdown.querySelector(".dropdown-menu");
        }
        return this._dropdownMenu;
    }

    ngOnInit() {
        this.subscription = this.dropdownService.events.subscribe((event) => {
            if (event.type === "clear") {
                this.clear(event.sourceEvent as StrictUnion<KeyboardEvent | MouseEvent | undefined>);
            }
            else if (event.type === "toggle") {
                this.toggle(event.element);
            }
        });
    }

    ngAfterViewInit() {
        this.dropdownToggle = this.elementRef.nativeElement;
        this.dropdown = this.dropdownService.getParentFromElement(this.dropdownToggle) as HTMLElement;
        this.inNavbar = !!this.dropdownToggle.closest('.navbar');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener("click", ["$event"])
    clickHandler(event: Event) {
        // before event.stopPropagation()
        // needed to avoid dropdown menu list to stay opened,
        // bubble event to his root parent first and once
        const isActive = this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.SHOW);
        if (!isActive) this.dropdown.dispatchEvent(new Event('click', {bubbles: true, cancelable: false}));

        event.preventDefault();
        event.stopPropagation();
        this.toggle(this.dropdownToggle);
    }

    private toggle(element: Element) {
        if (!element || this.dropdownToggle !== element || !this.dropdownMenu || !this.dropdown) {
            return;
        }

        if (element.classList.contains("disabled")) {
            return;
        }

        const isActive = this.dropdownMenu && this.dropdownMenu.classList.contains("show");

        this.dropdownService.raiseClear();
        // send dropdown's active state to the service
        this.dropdownService.raiseActive(!isActive);
        if (isActive) {
            // hide submenu if any on dropdown button
            if (element.parentElement) {
                this.closeSubmenus(element.parentElement)
            }
            return;
        }

        this.show(true);
    }

    /**
     * * If the dropdown is a `dropup`, then the placement is `top-start` unless
     *   if the dropdown menu is a `dropdown-menu-end`, then the placement is `top-end`.
     * * If the dropdown is a `dropend`, then the placement is `right-start`.
     * * If the dropdown is a `dropstart`, then the placement is `left-start`.
     * * If the dropdown menu is a `dropdown-menu-end`, then the placement is `bottom-end`.
     * Otherwise, the placement is `bottom-start`
     *
     * @returns The placement of the dropdown menu.
     */
    private getPlacement(): string {
        let placement = "bottom-start";

        // Handle dropup
        if (this.dropdown.classList.contains("dropup")) {
            placement = "top-start";
            if (this.dropdownMenu && this.dropdownMenu.classList.contains("dropdown-menu-end")) {
                placement = "top-end";
            }
        }
        else if (this.dropdown.classList.contains("dropend")) {
            placement = "right-start";
        }
        else if (this.dropdown.classList.contains("dropstart")) {
            placement = "left-start";
        }
        else if (this.dropdownMenu && this.dropdownMenu.classList.contains("dropdown-menu-end")) {
            placement = "bottom-end";
        }
        return placement;
    }

    private getPopperConfig() {
        const popperConfig: any = {
            placement: this.getPlacement(),
            modifiers: [
                {
                    name: 'preventOverflow',
                    options: {
                        boundary: document.querySelector(gConfig.boundary)
                    }
                },
                {
                    name: 'offset',
                    options: {
                        offset: gConfig.offset
                    }
                }
            ]
        };

        // Disable Popper.js if we have a static display
        if (gConfig.display === 'static') {
            popperConfig.modifiers.push({
                name: 'applyStyle',
                enabled: false
            });
        }

        return popperConfig;
    }

    /**
     * If the dropdown menu is already visible, do nothing. Otherwise, if the
     * dropdown menu is not visible, show it
     * @param [usePopper=false] - boolean
     */
    show(usePopper = false) {
        if (!this.dropdownToggle || !this.dropdownMenu || !this.dropdown) {
            return;
        }

        if (this.dropdownToggle.classList.contains("disabled") ||
            this.dropdownMenu.classList.contains("show")) {
          return;
        }

        const parent = this.dropdown;

        // Disable totally Popper.js for Dropdown in Navbar
        if (!this.inNavbar || usePopper) {
            let referenceElement = this.dropdownToggle;

            if (gConfig.reference === 'parent') {
                referenceElement = parent;
            }

            // If boundary is not `scrollParent`, then set position to `static`
            // to allow the menu to "escape" the scroll parent's boundaries
            // https://github.com/twbs/bootstrap/issues/24251
            if (gConfig.boundary !== 'clippingParents') {
                parent.classList.add(gClassName.POSITION_STATIC);
            }
            this.popper = createPopper(referenceElement, this.dropdownMenu, this.getPopperConfig());
        }

        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement &&
            !parent.closest(gSelector.NAVBAR_NAV)) {
            Array.from(document.body.children).forEach((element) => element.addEventListener('mouseover', noop));
        }

        this.dropdownToggle.focus();
        this.dropdownToggle.setAttribute('aria-expanded', "true");

        this.dropdownMenu.classList.toggle("show");
        parent.classList.toggle("show");
    }

    /**
     * If the dropdown is open, close it
     * @param event - StrictUnion<KeyboardEvent | MouseEvent | undefined>
     */
    private clear(event: StrictUnion<KeyboardEvent | MouseEvent | undefined>) {
        if (!this.dropdownToggle || !this.dropdownMenu || !this.dropdown) {
            return;
        }
        const parent = this.dropdown;

        if (!parent.classList.contains("show")) {
            return;
        }

        if (event && (event.type === 'click' &&
            /input|textarea/i.test((event.target as Element).tagName) || event.type === 'keyup' && event.key === Keys.tab) &&
            parent.contains(event.target as Node)) {
            return;
        }

        // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
            Array.from(document.body.children).forEach((element) => element.removeEventListener('mouseover', noop));
        }

        this.dropdownToggle.setAttribute('aria-expanded', 'false');

        if (this.popper) {
            this.popper.destroy();
        }

        this.dropdownMenu.classList.remove("show");
        parent.classList.remove("show");

        // close all sub-menus with 'show' class where 'parent' is the dropdown element
        this.closeSubmenus(parent);
    }

    /**
     * It removes the class "show" from all submenus.
     * @param {HTMLElement} element - HTMLElement - The element that was clicked.
     */
    private closeSubmenus(element: HTMLElement) {
        const elements = element.querySelectorAll("ul");
        elements.forEach(el => el.classList.remove("show"));
    }
}
