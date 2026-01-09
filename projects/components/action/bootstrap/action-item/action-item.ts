import {Component, Input, OnInit, AfterViewInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from "@angular/core";
import {Action} from "../../action";
import {UIService} from "@sinequa/components/utils";
import { ActionItemOptions, ActionSize, DropdownMenuOptions } from "../../typings";

@Component({
    selector: "[sq-action-item]",
    templateUrl: "./action-item.html",
    standalone: false,
    styles: `
.dropdown-list-item {
    max-width: 24rem;
}
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsActionItem implements OnInit, OnDestroy, AfterViewInit {
    @Input("sq-action-item")
    set options(props: ActionItemOptions) {
        this.props = props;
        this.item = props.item;
    }
    get options() {
        return this.props;
    }
    @Input() collapseBreakpoint: ActionSize = "md";

    protected props: ActionItemOptions;
    protected item: Action;

    protected inListItem: boolean;
    protected dropdownButton: Element;
    protected dropdownListItem: Element;
    protected autoAdjustBreakpoint?: string;
    protected showDropdown: boolean;

    constructor(
        private uiService: UIService,
        private elementRef: ElementRef,
        private cdRef: ChangeDetectorRef
    ) {}

    get haveItem(): boolean {
        return !!this.item;
    }

    get isVisible(): boolean {
        return this.haveItem && !this.item.hidden;
    }

    get hasAction(): boolean {
        return this.haveItem && !!this.item.action;
    }

    get isDropdownButton(): boolean {
        return this.isVisible && !this.inListItem && this.item.hasChildren;
    }

    get isButton(): boolean {
        return this.isVisible && !this.inListItem && !this.item.hasChildren && this.hasAction;
    }

    get isDropdownListItem(): boolean {
        return this.isVisible && this.inListItem && this.item.hasChildren;
    }

    get isListItem(): boolean {
        return this.isVisible && this.inListItem && !this.item.hasChildren && this.hasAction;
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
        return !!this.item.icon || !!this.item.iconAfter;
    }

    get itemText(): string {
        if (!this.haveItem) {
            return "";
        }
        const text = this.item.text || "";
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
        const text = this.item.text || "";
        const title = this.item.title || "";
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
        return this.item.messageParams;
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
        if (this.item.init) {
            this.item.init(this.item);
        }
        this.autoAdjustBreakpoint = this.options.autoAdjustBreakpoint;
        this.uiService.resizeEvent.subscribe(e => this.cdRef.detectChanges());
    }

    ngOnDestroy() {
        if (this.item.destroy) {
            this.item.destroy(this.item);
        }
    }

    click(event: UIEvent) {
        if (!this.item.disabled) {
            if (this.item.action) {
                this.item.action(this.item, event);
            }
            if (this.item.toggle && (this.isDropdownButton || this.isDropdownListItem)) {
                const openElement = this.dropdownButton || (this.dropdownListItem ? this.dropdownListItem.parentElement : null);
                if (openElement) {
                    this.item.toggle(this.item, !openElement.classList.contains("open"));
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
