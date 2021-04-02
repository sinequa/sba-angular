import {Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, NgZone, ViewChild, ElementRef} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {PreviewData} from "@sinequa/core/web-services";
import {PreviewDocument} from "./preview-document";
import {Action} from "@sinequa/components/action";

@Component({
    selector: "sq-preview-tooltip",
    templateUrl: "./preview-tooltip.component.html"
})
export class PreviewTooltip implements OnChanges {

    @Input() previewDocument: PreviewDocument;
    @Input() previewData: PreviewData;
    @Input() entityActions: Action[] = [];
    @Input() entityNavActions: boolean = true;
    @Input() selectedTextActions: Action[] = [];
    @Input() scalingFactor = 1.0;
    @ViewChild('tooltip', {static: false}) tooltip : ElementRef;

    // Selected text mode
    selectedText: string = "";

    // Entity hover mode
    entityType: string = "";
    entityValue: string;
    entityDisplay: string;
    entityLabel: string;
    entityCount: number;
    entityIdx: number;

    // Tooltip fixed positioning
    bottom: string = "0px";
    left: string = "0px";
    leftPin; // position of the tooltip pin relative to left
    isBottom: boolean = false;

    constructor(
        private zone: NgZone,
        private changeDetectorRef: ChangeDetectorRef,
        private sanitizer: DomSanitizer){

        }

    /**
     * Add mouse listeners to a new preview document in order to display the tooltip
     * in response to specific hover of click events
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges){
        if(changes["previewDocument"] && !!this.previewDocument){

            if (typeof this.previewDocument.document.addEventListener !== undefined) {
                this.document.addEventListener("mouseup", this.handleMouseUp, false);
                this.document.addEventListener("mousedown", this.handleMouseDown, false);
                this.document.addEventListener("mousemove", this.handleMouseMove, false);
                this.window.addEventListener("scroll", this.handleScroll, false);
            }

        }

        if(changes["scalingFactor"] && this.previewDocument) {
            setTimeout(() => this.handleMouseUp());
        }
    }

    /**
     * Shortcut to the preview document
     */
    private get document(): Document{
        return this.previewDocument.document;
    }

    /**
     * Shortcut to the preview Window
     */
    private get window(): Window {
        return this.previewDocument.getContentWindow();
    }

    /**
     * Control the visibility of the tooltip
     */
    get visibility() : "visible" | "hidden" {
        return (this.selectedText !== "" || this.entityType !== "")? "visible" : "hidden";
    }

    /**
     * Position the tooltip above a bounding box
     */
    positionTooltipAbove(box: DOMRect | ClientRect){
        this.zone.run(() => {   // Necessary to compute the right size of the tooltip when updating the text
            const tooltipWidth = this.tooltip.nativeElement.getBoundingClientRect().width;
            const tooltipHeight = this.tooltip.nativeElement.getBoundingClientRect().height;
            let left = this.scalingFactor*(box.left + 0.5*box.width) - 0.5*tooltipWidth
            left = Math.min(Math.max(left, 0), this.scalingFactor*this.document.body.clientWidth - tooltipWidth); // Avoid tooltip overflow
            this.left = Math.round(left)+"px";

            const leftPin = Math.round(100 * (this.scalingFactor*(box.left + 0.5*box.width) - left) / tooltipWidth);
            this.leftPin = this.sanitizer.bypassSecurityTrustStyle(`${leftPin}%`);
            //absolute top positioning
            //this.bottom = Math.round(box.top-tooltipHeight-5+this.window.scrollY)+"px";
            //absolute bottom positioning
            //this.bottom = Math.round(this.document.documentElement.clientHeight - this.window.scrollY - box.top + 5)+"px";
            //fixed bottom positioning
            if (Math.round(box.top - 5 - tooltipHeight) > 0) {
              this.isBottom = false;
              this.bottom = Math.round(this.scalingFactor* (this.window.innerHeight - box.top) + 5)+"px";
            } else {
              this.isBottom = true;
              this.bottom = Math.round(this.scalingFactor* (this.window.innerHeight - box.top - box.height) - tooltipHeight - 5)+"px";
            }
            this.changeDetectorRef.detectChanges();
        });
    }

    /**
     * Handle mouse button down: reinitilizes selection
     */
    handleMouseDown = (event: MouseEvent) => {
        //if(event.target !== this.tooltip)
        this.selectedText = "";
        //this.changeDetectorRef.detectChanges();
    }

    /**
     * Handle mouse button up: get the selected text and display a tooltip above it
     */
    handleMouseUp = () => {
        const selection = this.document.getSelection();
        this.selectedText = selection ? selection.toString().trim() : "";
        if(selection && this.selectedText){
            const range = selection.getRangeAt(0);
            //console.log("Selected text: ", text);
            //console.log(event);
            //console.log(range.getBoundingClientRect());
            this.changeDetectorRef.detectChanges(); // Refresh size of tooltip
            this.positionTooltipAbove(range.getBoundingClientRect());
        }
        this.changeDetectorRef.detectChanges();
    }

    private _inTime: number = 0;
    /**
     * Handle mouse movements. If hovering an entity and no text is selected, will display a tooltip for this entity
     */
    handleMouseMove = (event: MouseEvent) => {
        if(!this.selectedText && event["path"]){
            const path = <Element[]> event["path"];
            if(path.length>0){
                const element = path[0];
                if(element.nodeType === 1 && element.nodeName === "SPAN" && (element.attributes["data-entity-basic"] || element.attributes["data-entity-display"])){
                    if(this.entityType !== element.className.split(" ")[0] || this.entityDisplay !== element.textContent){  // Tooltip not already displayed
                        this.entityType = element.className.split(" ")[0];    // Update text (and visibility)
                        this.entityDisplay = element.textContent || "";   // Tooltip content
                        const value = element.attributes["data-entity-basic"] || element.attributes["data-entity-display"];
                        this.entityValue = value.value;
                        const highlights = this.previewData.highlightsPerCategory[this.entityType].values
                            .find(v => v.value === value.value);
                        this.entityCount = highlights ? highlights.locations.length : 0;
                        this.entityLabel = this.previewData.highlightsPerCategory[this.entityType].categoryDisplayLabel;

                        const idsplt = element.id.split("_");
                        const idx = parseInt(idsplt[idsplt.length-1], 10);
                        const entity = this.findEntity(this.entityType, this.entityValue, (_, idIndex) => idIndex === idx);
                        this.entityIdx = entity ? entity.valueIndex : 0;

                        this.changeDetectorRef.detectChanges(); // Refresh size of tooltip
                        this.positionTooltipAbove(element.getBoundingClientRect());
                    }
                    this._inTime = Date.now(); // Reset the timer over an entity
                    return;
                }
            }
        }
        // We are not hovering an entity
        if(this.entityType){    // If still displaying the tooltip...
            const isOverTooltip = !!event["path"].find(el => el.localName === "sq-preview-tooltip");
            if(!isOverTooltip) {
                if(Date.now() - this._inTime > 200){ // 200 ms tolerance before closing tooltip
                    this.entityType = "";
                    this.entityValue = "";
                    this.entityDisplay = "";
                    this.entityLabel = "";
                    this.entityCount = 0;
                    this.entityIdx = 0;
                    this.changeDetectorRef.detectChanges(); // Turn off tooltip
                }
            }
            else{
                this._inTime = Date.now(); // Reset the timer over the tooltip
            }
        }
    }

    /**
     * Handle scroll events
     */
    handleScroll = (event) => {
        if(this.selectedText !== ""){
            this.handleMouseUp(); // Reposition tooltip above selected text
        }
        else if(this.entityType !== ""){
            this.entityType = "";
            this.entityValue = "";
            this.changeDetectorRef.detectChanges(); // Turn off tooltip
        }
    }

    /**
     * Move to the previous entity if possible
     * @param event
     */
    previousEntity(event: Event){
        event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
        if(this.entityIdx > 1){
            // Find the index of the previous entity
            const entity = this.findEntity(this.entityType, this.entityValue, (valueIdx,_) => valueIdx === this.entityIdx-1);
            if (entity) {
                const idx = entity.idIndex;
                this.previewDocument.selectHighlight(this.entityType, idx);
            }
        }
    }

    /**
     * Move to the next entity if possible
     * @param event
     */
    nextEntity(event: Event){
        event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
        if(this.entityIdx < this.entityCount){
            // Find the index of the next entity
            const entity = this.findEntity(this.entityType, this.entityValue, (valueIdx,_) => valueIdx === this.entityIdx+1);
            if (entity) {
                const idx = entity.idIndex;
                this.previewDocument.selectHighlight(this.entityType, idx);
            }
        }
    }

    /**
     * Executes a clicked action button in the context of a tooltip for hovered entities
     * @param action
     * @param event
     */
    entityAction(action: Action, event: Event){
        event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
        this.zone.run(() => {
            if(action.action) {
                action.action(action, <any> {type: this.entityType, idx: this.entityIdx, value: this.entityValue, display: this.entityDisplay});
            }
        });
    }

    /**
     * Executes a clicked action button in the context of a tooltip for text selection
     * @param action the action to execute
     * @param event
     */
    selectedTextAction(action: Action, event: Event){
        event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
        this.zone.run(() => {
            if(action.action) {
                action.action(action, <any> {text: this.selectedText});
            }
        });
    }

    /**
     * Helper function to find the indexes of a specific entity *occurrence*. Returns both the index within all
     * of its own occurrences: valueIndex (eg. BILL GATES 3/14) AND the index corresponding to the
     * entity id inside the document: idIndex (eg. id="person_32").
     * @param category eg. person
     * @param value eg. BILL GATES
     * @param predicate function testing whether it is the entity occurrence of interest
     * @returns an object with both indexes
     */
    private findEntity(entityType: string, entityValue: string, predicate: (index: number, idIndex: number) => boolean)
            : {valueIndex: number, idIndex: number} | undefined {
        let currentIdx = 0;
        // For each highlight in the doc
        for(let i=0; i<this.previewData.highlightsPerLocation['length']; i++) {
            const highlight = this.previewData.highlightsPerLocation[i];
            const categories = Object.keys(highlight.positionInCategories);
            // For each value of the highlight
            for(let j=0; j<categories.length; j++){
                // If this is the right entity type and value
                if(categories[j] === entityType && highlight.values[j] === entityValue) {
                    // Increase the counter
                    currentIdx++;
                    // If this is the idx we are looking for, return
                    if(predicate(currentIdx, highlight.positionInCategories[entityType])){
                        return {valueIndex: currentIdx, idIndex: highlight.positionInCategories[entityType]};
                    }
                }
            }
        }
        return undefined;
    }

}
