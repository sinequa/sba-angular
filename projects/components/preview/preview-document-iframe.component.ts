import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, ContentChild, OnChanges, SimpleChanges, ChangeDetectorRef, OnInit, OnDestroy } from "@angular/core";
import { SafeResourceUrl} from '@angular/platform-browser';
import { PreviewDocument } from "./preview-document";


/**
 * This component manages the iframe containing the document's preview.
 * The main input is the URL of the document's preview.
 * The main output is an event emitter providing an instance of PreviewDocument.
 *
 * PreviewDocument is a wrapper around the HTML Document, allowing to interact with
 * the HTML of the preview (for example to highlight some entities)
 *
 * It is possible to insert a tooltip in the preview via transclusion.
 * Example:
    <sq-preview-document-iframe
        [downloadUrl]="downloadUrl"
        (onPreviewReady)="onPreviewReady($event)">
        <sq-preview-tooltip #tooltip
            [previewDocument]="previewDocument"
            [previewData]="previewDocument">
        </sq-preview-tooltip>
    </sq-preview-document-iframe>
 */
@Component({
    selector: "sq-preview-document-iframe",
    template: `
                <iframe #documentFrame
                    [sandbox]="sandbox || defaultSandbox"
                    [src]="downloadUrl"
                    [style.--factor]="scalingFactor"
                    [ngStyle]="{'-ms-zoom': scalingFactor, '-moz-transform': 'scale(var(--factor))', '-o-transform': 'scale(var(--factor))', '-webkit-transform': 'scale(var(--factor))'}">
                </iframe>`,
    styles: [`
:host{
    flex: 1;
}


iframe {
    background-color: white;
    flex: 1;
    position: relative;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    height: calc(100% / var(--factor));
    width: calc(100% / var(--factor));
    border: 0;

    -moz-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
}
    `]
})
export class PreviewDocumentIframe implements OnChanges, OnInit, OnDestroy {
    defaultSandbox : string = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";
    @Input() sandbox : string;
    @Input()  downloadUrl: string | SafeResourceUrl;
    @Input() scalingFactor: number = 1.0;
    @Output() onPreviewReady = new EventEmitter<PreviewDocument>();
    @ViewChild('documentFrame', {static: true}) documentFrame: ElementRef;  // Reference to the preview HTML in the iframe
    @ContentChild('tooltip', { read: ElementRef, static: false }) tooltip: ElementRef; // see https://stackoverflow.com/questions/45343810/how-to-access-the-nativeelement-of-a-component-in-angular4

    previewDocument: PreviewDocument;

    constructor(
        private cdr: ChangeDetectorRef) {
    }

    public onPreviewDocLoad() {
        // const previewDocument = new PreviewDocument(this.documentFrame);

        // SVG highlight:
        //   background rectangle (highlight) were added to the SVG by the HTML generator (C#), but html generation is
        //   not able to know the geometry of the text. It is up to the browser to compute the position and size of the
        //   background. That needs to be done now that the iFrame is loaded.
        this.previewDocument.setSvgBackgroundPositionAndSize();

        if(this.tooltip)
            this.addTooltip(this.previewDocument);

        // Let upstream component know
        this.onPreviewReady.next(this.previewDocument);

        this.cdr.markForCheck();
    }

    addTooltip(previewDocument: PreviewDocument){
        previewDocument.insertComponent(this.tooltip.nativeElement);
    }
    
    ngOnInit() {
        this.documentFrame.nativeElement.addEventListener("load", () => this.onPreviewDocLoad(), true);
        this.previewDocument = new PreviewDocument(this.documentFrame);
    }
    
    ngOnDestroy() {
        this.documentFrame.nativeElement.removeEventListener("load", () => this.onPreviewDocLoad());
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if(simpleChanges.scalingFactor && !simpleChanges.scalingFactor.firstChange) {
            return;
        }
        
        if(simpleChanges.downloadUrl) {
            this.cdr.markForCheck();
        }
    }
}