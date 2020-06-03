import {Injectable, Inject, InjectionToken, OnDestroy, ComponentFactory, ComponentRef, Type} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Utils, MapOf} from "@sinequa/core/base";
import elementResizeDetectorMaker from "element-resize-detector";

export interface CaretPosition {
    start: number;
    end: number;
}

export const SCREEN_SIZE_RULES = new InjectionToken<MapOf<string>>('SCREEN_SIZE_RULES');

@Injectable({
    providedIn: "root"
})
export class UIService implements OnDestroy {
    _resizeEvent = new Subject<UIEvent>();
    _priorityResizeEvent = new Subject<UIEvent>();
    screenSizes: string[];
    screenSize: string; // one of the screen size rules values
    elementResizeDetector: any;
    factories = new Map<Type<any>, ComponentFactory<any>>();

    constructor(
        @Inject(SCREEN_SIZE_RULES) public screenSizeRules: MapOf<string>) {

        this.screenSizes = ["xs", "sm", "md", "lg", "xl", "xxl"]; // in ascending size order
        this.setScreenSize();
        window.addEventListener("resize", this.resizeEventListener);
        this.elementResizeDetector = elementResizeDetectorMaker({ strategy: "scroll" });
    }

    protected resizeEventListener = Utils.frame((event: UIEvent) => {
        this.setScreenSize();
        this._priorityResizeEvent.next(event);
        this._resizeEvent.next(event);
    });

    ngOnDestroy() {
        this._resizeEvent.complete();
        this._priorityResizeEvent.complete();
        window.removeEventListener("resize", this.resizeEventListener);
    }

    get resizeEvent(): Observable<UIEvent> {
        return this._resizeEvent;
    }

    get priorityResizeEvent(): Observable<UIEvent> {
        return this._priorityResizeEvent;
    }

    /*private setTitle(title: string) {
        document.title = this.intlService.formatMessage(title);
    }*/

    appInit(appComponentRef: ComponentRef<any>) {
        //this.setTitle();
        //Utils.subscribe(this.intlService.events,
        //    (value) => {
        //        this.setTitle();
        //    });

        // See https://github.com/angular/angular/issues/18817
        /*this.resizeEvent.subscribe(
            (event) => {
                appComponentRef.changeDetectorRef.markForCheck();
            });*/

        // this.loadComponent({component: DirtyChecker});
    }

    // legacy (was called from app.ts)
    addResizeListener(listener: (event?: UIEvent) => any) {
        this._resizeEvent.subscribe(listener);
    }

    private screenSizeIs(list: string | string[]) {
        //let rules = this.coreConfig.screenSizeRules;

        // validate that we're getting a string or array.
        if (!Utils.isString(list) && !Utils.isArray(list)) {
            throw new Error('screenSizeIs requires an array or comma-separated list');
        }

        // if it's a string, convert to array.
        if (Utils.isString(list)) {
            list = list.split(/\s*,\s*/);
        }

        return list.some((size) => window.matchMedia(this.screenSizeRules[size]).matches);
    }

    private setScreenSize() {
        for (const size of this.screenSizes) {
            if (this.screenSizeIs(size)) {
                this.screenSize = size;
                return;
            }
        }
        throw new Error("UIService.setScreenSize - no matching screen size");
    }

    screenSizeIsEqual(screenSize: string): boolean {
        return this.screenSize === screenSize;
    }

    screenSizeIsGreater(screenSize: string): boolean {
        const index1 = this.screenSizes.findIndex((value) => value === this.screenSize);
        const index2 = this.screenSizes.findIndex((value) => value === screenSize);
        return index1 > index2;
    }

    screenSizeIsLess(screenSize: string): boolean {
        const index1 = this.screenSizes.findIndex((value) => value === this.screenSize);
        const index2 = this.screenSizes.findIndex((value) => value === screenSize);
        return index1 < index2;
    }

    screenSizeIsGreaterOrEqual(screenSize: string): boolean {
        if (screenSize === this.screenSize) {
            return true;
        }
        return this.screenSizeIsGreater(screenSize);
    }

    screenSizeIsLessOrEqual(screenSize: string): boolean {
        if (screenSize === this.screenSize) {
            return true;
        }
        return this.screenSizeIsLess(screenSize);
    }

    private _screenSizeTest(screenSize: string): boolean {
        if (Utils.eqNCN(screenSize, "always", "true")) {
            return true;
        }
        if (Utils.eqNCN(screenSize, "never", "false")) {
            return false;
        }
        if (Utils.startsWith(screenSize, ">=")) {
            return this.screenSizeIsGreaterOrEqual(screenSize.slice(2));
        }
        if (Utils.startsWith(screenSize, ">")) {
            return this.screenSizeIsGreater(screenSize.slice(1));
        }
        if (Utils.startsWith(screenSize, "<=")) {
            return this.screenSizeIsLessOrEqual(screenSize.slice(2));
        }
        if (Utils.startsWith(screenSize, "<")) {
            return this.screenSizeIsLess(screenSize.slice(1));
        }
        if (Utils.startsWith(screenSize, "=")) {
            return this.screenSizeIsEqual(screenSize.slice(1));
        }
        return this.screenSizeIsEqual(screenSize);
    }

    // screenSizes is a sequence of size specs with optional operator separated by space or and (AND)
    // Multiple sequences can be specified using , or ; as a separator (these are OR'd)
    screenSizeTest(screenSizes: string): boolean {
        if (!screenSizes) {
            return true;
        }
        const ors = Utils.split(screenSizes, [',', ';']);
        for (const or of ors) {
            const ands = Utils.split(or, " ");
            if (ands.length === 0) {
                continue;
            }
            let ok = true;
            for (const and of ands) {
                if (Utils.eqNC(and, "and")) { // space separated but you can use and if you want to
                    continue;
                }
                if (!this._screenSizeTest(and)) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                return true;
            }
        }
        return false;
    }

    getContentRect(element: HTMLElement): ClientRect {
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const borderLeft = parseFloat(computedStyle.borderLeft);
        const borderRight = parseFloat(computedStyle.borderRight);
        const borderTop = parseFloat(computedStyle.borderTop);
        const borderBottom = parseFloat(computedStyle.borderBottom);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const paddingRight = parseFloat(computedStyle.paddingRight);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        return {
            top: rect.top + borderTop + paddingTop,
            right: rect.right - borderRight - paddingRight,
            bottom: rect.bottom - borderBottom - paddingBottom,
            left: rect.left + borderLeft + paddingLeft,
            width: rect.width - borderLeft - paddingLeft - paddingRight - borderRight,
            height: rect.height - borderTop - paddingTop - paddingBottom - borderBottom
        };
    }

    // caret support
    getCaret(input: HTMLInputElement): CaretPosition {
        return {
            start: input.selectionStart || 0,
            end: input.selectionEnd || 0
        };
    }

    setCaret(input: HTMLInputElement, start: number, end = start, text?: string, selectionAction = UIService.SelectionAction.collapse, ensureVisible = true, raiseEvent = true) {
        if (start < 0) {
            return;
        }
        if (Utils.isString(text)) {
            let value = input.value;
            if (end >= start) {
                value = value.slice(0, start) + text + value.slice(end);
            }
            else {
                value = value.slice(0, start) + text;
            }
            input.value = value;
            switch (selectionAction) {
                case UIService.SelectionAction.adjust:
                    end = start + text.length;
                    break;
                case UIService.SelectionAction.none:
                    break;
                case UIService.SelectionAction.collapseToStart:
                    end = start;
                    break;
                case UIService.SelectionAction.collapse:
                default:
                    end = start + text.length;
                    start = end;
                    break;
            }
        }
        if (end < 0) {
            end = start;
        }
        input.setSelectionRange(start, end);
        if (ensureVisible) {
            const rect = input.getBoundingClientRect();
            const contentRect = this.getContentRect(input);
            const textPos = this.getTextPosition(input, this.getCaret(input).end);
            let scrollLeft = input.scrollLeft;
            const minX = contentRect.left + scrollLeft;
            const maxX = contentRect.right + scrollLeft;
            const caretX = rect.left + textPos.left;
            if (caretX < minX || caretX > maxX) {
                scrollLeft = Math.max(caretX - contentRect.right + 1/*for the caret*/, 0);
                input.scrollLeft = scrollLeft;
            }
        }
        if (raiseEvent) {
            const event = new CustomEvent("input");
            input.dispatchEvent(event);
        }
    }

    // See https://github.com/component/textarea-caret-position
    // We return a lineHeight value in addition
    private textPositionProperties = [
        'direction',  // RTL support
        'boxSizing',
        'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
        'height',
        'overflowX',
        'overflowY',  // copy the scrollbar for IE

        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
        'borderStyle',

        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',

        // https://developer.mozilla.org/en-US/docs/Web/CSS/font
        'fontStyle',
        'fontVariant',
        'fontWeight',
        'fontStretch',
        'fontSize',
        'fontSizeAdjust',
        'lineHeight',
        'fontFamily',

        'textAlign',
        'textTransform',
        'textIndent',
        'textDecoration',  // might not make a difference, but better be safe

        'letterSpacing',
        'wordSpacing',

        'tabSize',
        'MozTabSize'
    ];
    getTextPosition(element: HTMLElement, position: number, options?: {debug: boolean}): {top: number, left: number, lineHeight: number} {
        const debug = options && options.debug || false;
        if (debug) {
            const el = document.querySelector('#input-textarea-caret-position-mirror-div');
            if ( el ) {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }
        }

        // mirrored div
        const div = document.createElement('div');
        div.id = 'input-textarea-caret-position-mirror-div';
        document.body.appendChild(div);

        const style = div.style;
        const computed = window.getComputedStyle? getComputedStyle(element) : (<any>element).currentStyle;  // currentStyle for IE < 9

        // default textarea styles
        style.whiteSpace = 'pre-wrap';
        if (element.nodeName !== 'INPUT')
            style.wordWrap = 'break-word';  // only for textarea-s

        // position off-screen
        style.position = 'absolute';  // required to return coordinates properly
        if (!debug)
            style.visibility = 'hidden';  // not 'display: none' because we want rendering

        // transfer the element's properties to the div
        this.textPositionProperties.forEach(function (prop) {
            style[prop] = computed[prop];
        });

        if (!Utils.isUndefined((<any>window).mozInnerScreenX)) {
            // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
            if (element.scrollHeight > parseInt(computed.height, 10))
            style.overflowY = 'scroll';
        } else {
            style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
        }

        div.textContent = (<any>element).value.substring(0, position);
        // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
        if (element.nodeName === 'INPUT' && div.textContent) {
            div.textContent = div.textContent.replace(/\s/g, '\u00a0');
        }

        const span = document.createElement('span');
        // Wrapping must be replicated *exactly*, including when a long word gets
        // onto the next line, with whitespace at the end of the line before (#7).
        // The  *only* reliable way to do that is to copy the *entire* rest of the
        // textarea's content into the <span> created at the caret position.
        // for inputs, just '.' would be enough, but why bother?
        div.appendChild(span);

        // return lineHeight too
        span.textContent = '.';
        const lineHeight = span.offsetHeight;

        span.textContent = (<any>element).value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all

        const coordinates = {
            top: span.offsetTop + parseInt(computed['borderTopWidth'], 10),
            left: span.offsetLeft + parseInt(computed['borderLeftWidth'], 10),
            lineHeight: lineHeight
        };

        if (debug) {
            span.style.backgroundColor = '#aaa';
        } else {
            document.body.removeChild(div);
        }

        return coordinates;
    }

    getViewport(): ClientRect {
        return document.body.getBoundingClientRect();
    }

    addElementResizeListener(element: HTMLElement, listener: (this: HTMLElement) => void) {
        this.elementResizeDetector.listenTo(element, listener);
    }

    removeElementResizeListener(element: HTMLElement, listener: (this: HTMLElement) => void) {
        this.elementResizeDetector.removeListener(element, listener);
    }
}

export module UIService {
    export enum SelectionAction {
        adjust,
        none,
        collapseToStart,
        collapse
    }
}
