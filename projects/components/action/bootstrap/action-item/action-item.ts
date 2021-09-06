import {Component, Input, OnInit, AfterViewInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {Action} from "../../action";
import {UIService} from "@sinequa/components/utils";
import {DropdownMenuOptions} from "../dropdown-menu/dropdown-menu";


export interface ActionItemOptions {
    item: Action;
    size?: string;
    style?: string;
    autoAdjust?: boolean;
    autoAdjustBreakpoint?: string;
    inMenu: boolean;
    rightAligned?: boolean;
}

@Component({
    selector: "[sq-action-item]",
    templateUrl: "./action-item.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsActionItem implements OnInit, AfterViewInit {
    @Input("sq-action-item") options: ActionItemOptions;
    @Input() collapseBreakpoint: string = "md";
    inListItem: boolean;
    dropdownButton: Element;
    dropdownListItem: Element;
    autoAdjustBreakpoint?: string;
    showDropdown: boolean;

    constructor(
        private uiService: UIService,
        private elementRef: ElementRef,
        private cdRef: ChangeDetectorRef) {
    }

    get haveItem(): boolean {
        return !!this.options.item;
    }

    get isVisible(): boolean {
        return this.haveItem && !this.options.item.hidden;
    }

    get hasAction(): boolean {
        return this.haveItem && !!this.options.item.action;
    }

    get isDropdownButton(): boolean {
        return this.isVisible && !this.inListItem && this.options.item.hasChildren;
    }

    get isButton(): boolean {
        return this.isVisible && !this.inListItem && !this.options.item.hasChildren && this.hasAction;
    }

    get isDropdownListItem(): boolean {
        return this.isVisible && this.inListItem && this.options.item.hasChildren;
    }

    get isListItem(): boolean {
        return this.isVisible && this.inListItem && !this.options.item.hasChildren && this.hasAction;
    }

    get haveSpace(): boolean {
        if (this.uiService.screenSizeIsGreaterOrEqual(this.autoAdjustBreakpoint)) {
            return true;
        }
        if (this.inListItem && this.uiService.screenSizeIsLess(this.collapseBreakpoint)) {
            return true;
        }
        return false;
    }

    get haveIcon(): boolean {
        return !!this.options.item.icon || !!this.options.item.iconAfter;
    }

    get itemText(): string {
        if (!this.haveItem) {
            return "";
        }
        const text = this.options.item.text || "";
        if (this.options.autoAdjust && this.haveIcon) {
            return this.haveSpace ? text : "";
        }
        else {
            return text;
        }
    }

    get itemTitle(): string {
        if (!this.haveItem) {
            return "";
        }
        const text = this.options.item.text || "";
        const title = this.options.item.title || "";
        if (this.options.autoAdjust && this.haveIcon) {
            return this.haveSpace ? (title !== text ? title : "") : title || text;
        }
        else {
            return title;
        }
    }

    get itemMessageParams(): any {
        if (!this.haveItem) {
            return null;
        }
        return this.options.item.messageParams;
    }

    get sizeClass(): string {
        return this.options.size ? `btn-${this.options.size}` : "";
    }

    get styleClass(): string {
        return this.options.style ? `btn-${this.options.style}` : "btn-light";
    }
    
    get dropdownMenuOptions(): DropdownMenuOptions {
        return ({...this.options, showMenuClass: 'show'});
    }

    ngAfterViewInit() {
        this.dropdownButton = this.elementRef.nativeElement.querySelector("div.dropdown");
        this.dropdownListItem = this.elementRef.nativeElement.querySelector("li.dropdown-toggle");
    }

    ngOnInit() {
        this.inListItem = (this.elementRef.nativeElement.nodeName === "LI");
        if (this.options.item.init) {
            this.options.item.init(this.options.item);
        }
        this.autoAdjustBreakpoint = this.options.autoAdjustBreakpoint;
        this.uiService.resizeEvent.subscribe(e => this.cdRef.detectChanges());
    }

    ngOnDestroy() {
        if (this.options.item.destroy) {
            this.options.item.destroy(this.options.item);
        }
    }

    click(event: UIEvent) {
        if (!this.options.item.disabled) {
            if (this.options.item.action) {
                this.options.item.action(this.options.item, event);
            }
            if (this.options.item.toggle && (this.isDropdownButton || this.isDropdownListItem)) {
                const openElement = this.dropdownButton || (this.dropdownListItem ? this.dropdownListItem.parentElement : null);
                if (openElement) {
                    this.options.item.toggle(this.options.item, !openElement.classList.contains("open"));
                }
            }
        }
    }

    touchstart() {
        this.showDropdown = true;
    }

    mousedown() {
        this.showDropdown = true;
    }

    focusin() {
        this.showDropdown = true;
    }
}