import { ElementRef } from "@angular/core";


export enum HighlightCategoryFilterChoice {
    All, None, Value
}

export interface HighlightCategoryFilterState {
    choice: HighlightCategoryFilterChoice;
    filterValue: string;
}

/**
 * This class offers an API to manipulate the HTML of a preview document.
 * - Insert elements dynamically in the DOM of the preview (eg. tooltips)
 * - Retrieve the text of entities or extracts
 * - Select the elements of entities or extracts (by altering their CSS classes)
 * - Highlight (or not) specific entities or categories in the HTML (by altering their CSS classes)
 */
export class PreviewDocument {

    private static readonly SELECTED_HIGHLIGHT_CLASS: string = "sq-current";
    private static readonly SELECTED_HIGHLIGHT_FIRST_FRAGMENT_CLASS: string = "sq-first";
    private static readonly SELECTED_HIGHLIGHT_LAST_FRAGMENT_CLASS: string = "sq-last";
    private static readonly FILTERED_OUT_HIGHLIGHT_CLASS: string = "sq-inactive";
    private static readonly SVG_LINE_CLASS: string = "sq-svg";

    private static readonly BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE = "data-entity-basic";
    private static readonly ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE = "data-entity-display";

    private readonly _window: Window;

    constructor(iframe: ElementRef){
        let frame = iframe.nativeElement;
        if (frame && frame.contentWindow && frame.contentWindow.frames) {
            let sheet = frame.contentWindow.frames["frSheet"]; // aspose xls preview
            if (sheet) {
                return sheet;
            }
        }
        this._window = frame.contentWindow;
    }


    // PUBLIC METHODS
    
    /**
     * Return the Window of the iframe containing the element
     */
    public getContentWindow(): Window {
        return this._window;
    }

    /**
     * Returns the root Document element of the HTML Preview
     */
    public get document(): Document {
        return this._window.document;
    }

    /**
     * Insert a given DOM Element in the body of the document preview
     * @param component 
     */
    public insertComponent(component){
        this.document.body.appendChild(component);
    }
    
    /**
     * Returns the text of a given entity
     * @param categoryId Category of the entity
     * @param index Index of the entity in that category
     */
    public getHighlightText(categoryId: string, index: number) : string {
        if (index < 0) {
            return "";
        }
        let nodes: NodeList = this.document.querySelectorAll("#"+categoryId + "_" + index);
        if (nodes == null || nodes.length ===0) {
            return "";
        }
        let text = "";
        nodes.forEach(n => text += (n['innerHTML'] || n.textContent));
        return text;
    }

    /**
     * Update the location of the entities' SVG background (for some converters)
     */
    public setSvgBackgroundPositionAndSize(): void {
        var svgList: NodeListOf<Element> = this.document.querySelectorAll("svg");
        if (svgList != null) {
            for (var i = 0, ic = svgList.length; i < ic; i++) {
                var svg = svgList.item(i);
                var tspanList: HTMLCollectionOf<SVGTSpanElement> = svg.getElementsByTagName("tspan");
                if (tspanList != null) {
                    for (var j = 0, jc = tspanList.length; j < jc; j++) {
                        var tspan = tspanList.item(j);
                        if (tspan) {
                            var bgId = tspan.getAttribute("data-entity-background");
                            if (bgId) {
                                var rect = this.getFirst(this.getDocElements(bgId));
                                if (rect) {
                                    this.resizeSvgBackground(rect, tspan);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Select a specific entity by applying specific highlight classes 
     * to the DOM elements and scrolling the view to center around them.
     * @param categoryId Category of the entity
     * @param index Index of the entity in that category
     */
    public selectHighlight(categoryId: string, index: number) : void {
        
        // Move selection
        let targetElements = this.getDocElements(categoryId + "_" + index);
        if (!targetElements || targetElements.length == 0) {
            return;
        }

        this.clearHighlightSelection();

        for (var i = 0; i< targetElements.length; i++) {
            this.setHighlightSelection(targetElements[i], i == 0, i == targetElements.length - 1);
        }

        // Scroll
        let scrollContainer: Element = this.getScrollingContainer();
        let [x, y]: [number,  number] = PreviewDocument.computeTargetScroll(targetElements, scrollContainer);
        this._window.scrollBy(x, y);
    }

    /**
     * Removes all entity selection classes from the document HTML elements
     */
    public clearHighlightSelection(): void {
        // Clear HTML elements borders
        Array.from(this.document.getElementsByClassName(PreviewDocument.SELECTED_HIGHLIGHT_CLASS))
            .forEach(element => element.classList.remove(PreviewDocument.SELECTED_HIGHLIGHT_CLASS));
        // Clear SVG elements borders
        let elements: NodeListOf<Element> = this.document.querySelectorAll("line.sq-svg");
        for (let i = 0; i < elements.length; i++) {
            const parentNode = elements[i].parentNode;
            if (parentNode) {
                parentNode.removeChild(elements[i]);
            }
        }
    }

    /**
     * Turns highlights on or off based on the provided filter object. Additionally clears the selected entity
     * @param filters object where each key provides a filter for each category of entity/highlight
     */
    public filterHighlights(filters: { [key: string]: HighlightCategoryFilterState }){

        this.updateHighlightFilterState(filters);
        this.clearHighlightSelection();
    }
    
    /**
     * Loop through every highlighted element in the document and turn highlights on or off based on the filters object
     * @param filters object where each key provides a filter for each category of entity/highlight
     */
    public updateHighlightFilterState(filters: { [key: string]: HighlightCategoryFilterState }):void {
        let elements: NodeListOf<Element> = this.document.querySelectorAll("[data-entity-display], .extractslocations, .matchlocations");
        for (let i = 0; i < elements.length; i++) {
            let element: Element = elements[i];
            if (PreviewDocument.elementIsFilteredOut(element, filters)) {
                element.classList.add(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
            }
            else {
                element.classList.remove(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
            }
        }
    }

    /**
     * Turns on/off the highlights of one category of entities or a specific value if provided
     * @param category e.g. person
     * @param on true for highlighting / false for turning off
     * @param value e.g. "BILL GATES"
     */
    public toggleHighlight(category: string, on: boolean, value?: string) {
        let elements: NodeListOf<Element> = this.document.querySelectorAll("."+category);
        elements.forEach(element => {
            if(!value 
                || (element.hasAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE) && value === element.getAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE))
                || (element.hasAttribute(PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE) && value === element.getAttribute(PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE))) {
                
                if(on){
                    element.classList.remove(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                }
                else{
                    element.classList.add(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                }
            }
        });
    }
    


    // PRIVATE METHODS

    private setHighlightSelection(elt: Element, isFirst: boolean, isLast: boolean): void {
        if (this.isSvgElement(elt)) {
            this.setHighlightSelectionSVG(elt, isFirst, isLast);
        }
        else {
            this.setHighlightSelectionHTML(elt, isFirst, isLast);
        }
    }

    // NB https://miketaylr.com/posts/2014/11/document-body-scrollTop.html
    private getScrollingContainer(): Element {
        return this.document.scrollingElement ||
            this.document.documentElement ||
            /*contentDocument.body.parentElement ||*/ //TODO - check desirability of this (especially in Safari)
            this.document.body;
    }

    private setHighlightSelectionHTML(elt: Element, isFirst: boolean, isLast: boolean): void {
        elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_CLASS);
        if (isFirst) {
            elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_FIRST_FRAGMENT_CLASS);
        }
        if (isLast) {
            elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_LAST_FRAGMENT_CLASS);
        }
    }

    private setHighlightSelectionSVG(elt: Element, isFirst: boolean, isLast: boolean): void {
        var bgId = elt.getAttribute("data-entity-background");
        if (!bgId) return;
        var rect: SVGRectElement = <SVGRectElement>this.getFirst(this.getDocElements(bgId));
        var group = rect.parentNode;
        var rectPosition = rect.getBBox();

        if (group) {
            var top = rectPosition.y;
            var bottom = rectPosition.y + rectPosition.height;
            var left = rectPosition.x;
            var right = rectPosition.x + rectPosition.width;
            var valueTransform = rect.getAttribute("transform");
            this.addSvgLine(group, left, top   , right, top   , valueTransform);
            this.addSvgLine(group, left, bottom, right, bottom, valueTransform);
            if (isFirst) this.addSvgLine(group, left , top, left , bottom, valueTransform);
            if (isLast)  this.addSvgLine(group, right, top, right, bottom, valueTransform);
        }
    }

    private addSvgLine(group: Node, x1: number, y1: number, x2: number, y2: number, transform: string | null): void {
        var line: Element = this.document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("class", PreviewDocument.SVG_LINE_CLASS);
        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", String(x2));
        line.setAttribute("y2", String(y2));
        if (transform) line.setAttribute("transform", transform);
        group.appendChild(line);
    }


    private resizeSvgBackground(rect: Element, tspan: SVGTSpanElement): void {
        var elt: Element = tspan;
        while (elt.tagName != "text")
        {
            elt = elt.parentNode as Element;
            if (elt == null) break;
        }
        var text: SVGTextElement = elt as SVGTextElement;
        var textBoxPixel: ClientRect = text.getBoundingClientRect();
        var textBoxSVG: SVGRect = text.getBBox();
        if (textBoxPixel.height == 0 || textBoxPixel.width == 0) return;
        var scaleX = textBoxSVG.width / textBoxPixel.width;
        var scaleY = textBoxSVG.height / textBoxPixel.height;
        var deltaX = 2 * scaleX;
        var deltaY = 2 * scaleY;

        var firstCharRect = tspan.getExtentOfChar(0);
        var tspanWidth = tspan.getComputedTextLength();

        rect.setAttribute("x", String(firstCharRect.x - deltaX));
        rect.setAttribute("y", String(firstCharRect.y - deltaY));
        rect.setAttribute("width", String(tspanWidth + 2 * deltaX));
        rect.setAttribute("height", String(textBoxSVG.height + 2 * deltaY));
        var valueTransform = text.getAttribute("transform");
        if (valueTransform) rect.setAttribute("transform", valueTransform);
    }
    
    private getDocElements(id: string): Array<Element> {
        var list = Array<Element>();
        // Get HTML elements directly by id
        var eltList: NodeListOf<Element> = this.document.querySelectorAll("#" + id);
        for (let i = 0; i < eltList.length; i++) {
            list.push(eltList[i]);
        }
        // Get SVG tspan iterating on them (jquery querySelectorAll didn't return SVG inner elements)
        var svgList: NodeListOf<Element> = this.document.querySelectorAll("svg");
        if (svgList != null) {
            for (var i = 0, ic = svgList.length; i < ic; i++) {
                var svg = svgList.item(i);
                var tspanList: HTMLCollectionOf<SVGTSpanElement> = svg.getElementsByTagName("tspan");
                if (tspanList != null) {
                    for (var j = 0, jc = tspanList.length; j < jc; j++) {
                        var tspan = tspanList.item(j);
                        if (tspan) {
                            if (tspan.id == id) list.push(tspan);
                        }
                    }
                }
            }
        }
        return list;
    }

    private getFirst(nodes: Array<Element>): Element | null {
        return (nodes != null && nodes.length > 0) ? nodes[0] : null;
    }

    private isSvgElement(elt: Element): boolean {
        if (elt == null) return false;
        return "viewportElement" in <any>elt;
    }



    // PRIVATE STATIC (from highlight helper)
    

    private static elementIsFilteredOut(element: Element, filters: {[key: string]: HighlightCategoryFilterState}): boolean {
        let elementClass: string = this.getElementCategory(element, Object.keys(filters));
        if (elementClass == null) {
            return false;
        }
        let filterState = filters[elementClass];
        if (filterState == null) {
            return false;
        }
        if (filterState.choice == HighlightCategoryFilterChoice.None) {
            return true;
        }
        if (filterState.choice == HighlightCategoryFilterChoice.All) {
            return false;
        }
        if (element.hasAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE)) {
            return filterState.filterValue != element.getAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE);
        }
        return filterState.filterValue != element.getAttribute(PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE);
    }

    private static getElementCategory(element: Element, categoryIds: string[]): string {
        for (let categoryId of categoryIds) {
            if (element.classList.contains(categoryId)) {
                return categoryId;
            }
        }
        return "";
    }

    private static computeTargetScroll(elementsToCenter: Array<Element>, container: Element): [number, number] {
        // Check for scrollability on the container
        let computedStyle = getComputedStyle(container);
        if (computedStyle.overflow === "hidden") {
            return [0, 0];
        }
        let elementRectangles = elementsToCenter.map(element => element.getBoundingClientRect());
        let targetRectangle = this.computeBoundingRectangle(elementRectangles);
        if (!targetRectangle) {
            return [0, 0];
        }
        let availableWidth: number = container.clientWidth;
        let availableHeight: number = container.clientHeight;
        let x = computedStyle.overflowX === "hidden" ? 0 : targetRectangle.left - ((availableWidth - targetRectangle.width)/2);
        let y = computedStyle.overflowY === "hidden" ? 0 : targetRectangle.top - ((availableHeight - targetRectangle.height)/2);
        return [x, y];
    }

    private static computeBoundingRectangle(rectangles: (DOMRect | ClientRect)[]): DOMRect | ClientRect | undefined {
        if (!rectangles || rectangles.length == 0) {
            return undefined;
        }
        var result: DOMRect | ClientRect | undefined;
        for (var i = 0; i < rectangles.length; i++) {
            result = this.computeRectangleUnion(result, rectangles[i]);
        }
        return result;
    }

    private static computeRectangleUnion(rectangle1: DOMRect | ClientRect | undefined, rectangle2: DOMRect | ClientRect) {
        if (rectangle1 == null) {
            return rectangle2;
        }
        if (rectangle2 == null) {
            return rectangle1;
        }
        let left = Math.min(rectangle1.left, rectangle2.left);
        let right = Math.max(rectangle1.right, rectangle2.right);
        let top = Math.min(rectangle1.top, rectangle2.top);
        let bottom = Math.max(rectangle1.bottom, rectangle2.bottom);
        return new DOMRect(left, top, right - left, bottom - top);
    }
}
