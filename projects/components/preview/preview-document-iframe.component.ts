import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, ContentChild, OnChanges, SimpleChanges } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Utils } from "@sinequa/core/base";
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
    template: `<iframe #documentFrame
                    [hidden]="loading"
                    [attr.sandbox]="_sandbox"
                    [src]="sanitizedUrlSrc"
                    (load)="onPreviewDocLoad($event)"
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
export class PreviewDocumentIframe implements OnChanges {
    defaultSandbox : string = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";
    @Input() sandbox : string | null;
    @Input() downloadUrl: string | SafeResourceUrl;
    @Input() scalingFactor: number = 1.0;
    @Output() onPreviewReady = new EventEmitter<PreviewDocument>();
    @ViewChild('documentFrame', {static: false}) documentFrame: ElementRef;  // Reference to the preview HTML in the iframe
    @ContentChild('tooltip', { read: ElementRef, static: false }) tooltip: ElementRef; // see https://stackoverflow.com/questions/45343810/how-to-access-the-nativeelement-of-a-component-in-angular4

    public loading = false;
    public sanitizedUrlSrc: SafeResourceUrl;

    public _sandbox: string | null = this.defaultSandbox;

    constructor(private sanitizer: DomSanitizer) {
        // when donwloadUrl is undefined, a sanitizer error occurs, code below prevents this
        // setting a default safe url
        this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }

    public onPreviewDocLoad(event: Event) {
        // unfortunately, initializing "sanitizedUrlSrc" property in constructor() trigges load() callback;
        // so, while not "loading", just exit the method
        if (!this.loading) return;
        const previewDocument = new PreviewDocument(this.documentFrame);

        // SVG highlight:
        //   background rectangle (highlight) were added to the SVG by the HTML generator (C#), but html generation is
        //   not able to know the geometry of the text. It is up to the browser to compute the position and size of the
        //   background. That needs to be done now that the iFrame is loaded.
        previewDocument.setSvgBackgroundPositionAndSize();

        if(this.tooltip)
            this.addTooltip(previewDocument);

        // Let upstream component know
        this.onPreviewReady.next(previewDocument);

        this.loading = false;
    }

    addTooltip(previewDocument: PreviewDocument){
        previewDocument.insertComponent(this.tooltip.nativeElement);
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if(simpleChanges.sandbox) {
            this._sandbox = (Utils.isString(this.sandbox) || this.sandbox === null) ? 
                this.sandbox : this.defaultSandbox;
        }
        if(simpleChanges.scalingFactor && !simpleChanges.scalingFactor.firstChange) {
            return;
        }
        if(this.downloadUrl) {
            this.loading = true;
            this.sanitizedUrlSrc = this.downloadUrl;
        }
    }
}