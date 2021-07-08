import {Directive, OnInit, OnDestroy, AfterViewInit, ElementRef, HostListener} from "@angular/core";
import {Subscription} from 'rxjs';
import Popper from 'popper.js';
import {Keys} from "@sinequa/core/base";
import {BsDropdownService, gClassName, gSelector, gAttachmentMap} from './dropdown.service';

// Based on  Bootstrap (v4.4.1): dropdown.js

function noop() {}

const gConfig = {
    offset       : 0,
    flip         : true,
    boundary     : 'scrollParent',
    reference    : 'toggle',
    display      : 'dynamic',
    popperConfig : null
};

@Directive({
    selector: gSelector.DATA_TOGGLE
})
export class BsDropdownDirective implements OnInit, OnDestroy, AfterViewInit {
    private subscription: Subscription;
    private inNavbar: boolean;
    private dropdown: HTMLElement;
    private dropdownToggle: HTMLElement;
    private _dropdownMenu: HTMLElement | null;
    private popper;

    constructor(
        private elementRef: ElementRef,
        private dropdownService: BsDropdownService
    ) {
    }

    get dropdownMenu(): HTMLElement | null {
        if (!this._dropdownMenu && this.dropdown) {
            this._dropdownMenu = this.dropdown.querySelector(gSelector.MENU);
        }
        return this._dropdownMenu;
    }

    ngOnInit() {
        this.subscription = this.dropdownService.events.subscribe((event) => {
            if (event.type === "clear") {
                this.clear(event.sourceEvent);
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

        if (/*TODO element.disabled || */element.classList.contains(gClassName.DISABLED)) {
            return;
        }

        const isActive = this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.SHOW);

        this.dropdownService.raiseClear();

        if (isActive) {
            return;
        }

        this.show(true);
    }

    private getPlacement(): string {
        let placement = gAttachmentMap.BOTTOM;

        // Handle dropup
        if (this.dropdown.classList.contains(gClassName.DROPUP)) {
            placement = gAttachmentMap.TOP;
            if (this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.MENURIGHT)) {
                placement = gAttachmentMap.TOPEND;
            }
        }
        else if (this.dropdown.classList.contains(gClassName.DROPRIGHT)) {
            placement = gAttachmentMap.RIGHT;
        }
        else if (this.dropdown.classList.contains(gClassName.DROPLEFT)) {
            placement = gAttachmentMap.LEFT;
        }
        else if (this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.MENURIGHT)) {
            placement = gAttachmentMap.BOTTOMEND;
        }
        return placement;
    }

    private getOffset() {
        return {
            offset: gConfig.offset
        };
    }

    private getPopperConfig() {
        const popperConfig: any = {
            placement: this.getPlacement(),
            modifiers: {
                offset: this.getOffset(),
                flip: {
                    enabled: gConfig.flip
                },
                preventOverflow: {
                    boundariesElement: gConfig.boundary
                }
            }
        };

        // Disable Popper.js if we have a static display
        if (gConfig.display === 'static') {
            popperConfig.modifiers.applyStyle = {
                enabled: false
            };
        }

        return popperConfig;
    }

    show(usePopper = false) {
        if (!this.dropdownToggle || !this.dropdownMenu || !this.dropdown) {
            return;
        }
        if (/*TODO element.disabled || */
            this.dropdownToggle.classList.contains(gClassName.DISABLED) ||
            this.dropdownMenu.classList.contains(gClassName.SHOW)) {
          return;
        }

        const parent = this.dropdown;

        // Disable totally Popper.js for Dropdown in Navbar
        if (!this.inNavbar && usePopper) {
            /**
             * Check for Popper dependency
             * Popper - https://popper.js.org
             */
            if (typeof Popper === 'undefined') {
                throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
            }

            let referenceElement = this.dropdownToggle;

            if (gConfig.reference === 'parent') {
                referenceElement = parent;
            }

            // If boundary is not `scrollParent`, then set position to `static`
            // to allow the menu to "escape" the scroll parent's boundaries
            // https://github.com/twbs/bootstrap/issues/24251
            if (gConfig.boundary !== 'scrollParent') {
                parent.classList.add(gClassName.POSITION_STATIC);
            }
            this.popper = new Popper(referenceElement, this.dropdownMenu, this.getPopperConfig());
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

        this.dropdownMenu.classList.toggle(gClassName.SHOW);
        parent.classList.toggle(gClassName.SHOW);
    }

    private clear(event: KeyboardEvent | MouseEvent | undefined) {
        if (!this.dropdownToggle || !this.dropdownMenu || !this.dropdown) {
            return;
        }
        const parent = this.dropdown;

        if (!parent.classList.contains(gClassName.SHOW)) {
            return;
        }

        if (event && (event.type === 'click' &&
            /input|textarea/i.test((event.target as Element).tagName) || event.type === 'keyup' && event.which === Keys.tab) &&
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

        this.dropdownMenu.classList.remove(gClassName.SHOW);
        parent.classList.remove(gClassName.SHOW);
    }
}
