import { Component, Input, OnChanges, HostBinding } from "@angular/core";


export interface PassageHighlightParams {
    height: number;
    width: number;
    top: number;
    left: number;
    id: string;
}

/**
 * The passage highlight block inside the preview iframe
 *
 * It consists in styling itself as a block going under the text of a selected passage
 * It takes a PassageHighlightParams in Input to have its position and size setup
 *
 * Those params are handled in PreviewDocument.highlightPassage
 */
@Component({
    selector: "sq-passage-highlight",
    template: "",
    styles: [`:host {
        position: absolute;
        background-color: #FFF7AC;
        border: 2px solid #0B75FF;
        z-index: -1;
    }`]
})
export class BsPassageHighlightComponent implements OnChanges {

    @Input() params: PassageHighlightParams;

    @HostBinding('style.height') height = `0`;
    @HostBinding('style.width') width = `0`;
    @HostBinding('style.top') top = `0`;
    @HostBinding('style.left') left = `0`;
    @HostBinding('style.opacity') opacity;

    ngOnChanges() {
        if (this.params) {
            this.height = `${this.params.height}px`;
            this.width = `${this.params.width}px`;
            this.top = `${this.params.top}px`;
            this.left = `${this.params.left}px`;
            this.opacity = '1';
        } else { // hide if no params
            this.opacity = '0';
        }
    }

}