import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, ContentChild, OnChanges, SimpleChanges, AfterViewInit, NgZone, ChangeDetectorRef, OnInit, OnDestroy } from "@angular/core";
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
    template: `
                <iframe #documentFrame
                    [attr.sandbox]="_sandbox"
                    [src]="sanitizedUrlSrc"
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

.spinner-grow {
    width: 3rem;
    height: 3rem
}
    `]
})
export class PreviewDocumentIframe implements OnChanges, OnInit, OnDestroy, AfterViewInit {
    defaultSandbox: string = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";
    @Input() sandbox: string | null;
    @Input() downloadUrl: string;
    @Input() scalingFactor: number = 1.0;
    @Output() onPreviewReady = new EventEmitter<PreviewDocument>();
    @Output() urlChange = new EventEmitter<string>();
    @ViewChild('documentFrame', {static: true}) documentFrame: ElementRef;  // Reference to the preview HTML in the iframe
    @ContentChild('tooltip', {read: ElementRef, static: false}) tooltip: ElementRef; // see https://stackoverflow.com/questions/45343810/how-to-access-the-nativeelement-of-a-component-in-angular4

    public sanitizedUrlSrc: SafeResourceUrl;
    public loading = true;
    public _sandbox: string | null = this.defaultSandbox;

    previewDocument: PreviewDocument;

    constructor(
        private zone: NgZone,
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer) {
    }

    public onPreviewDocLoad() {

        if (this.documentFrame === undefined) return;
        if (this.downloadUrl === undefined) return;


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

    addTooltip(previewDocument: PreviewDocument) {
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
        if (simpleChanges.sandbox) {
            this._sandbox = (Utils.isString(this.sandbox) || this.sandbox === null) ?
                this.sandbox : this.defaultSandbox;
        }
        if (simpleChanges.scalingFactor && !simpleChanges.scalingFactor.firstChange) {
            return;
        }
        
        this.resetContent();
        if (this.downloadUrl && this.downloadUrl !== "about:blank") {
            this.loading = true;
            this.zone.run(() => {
                this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadUrl);
                this.onPreviewDocLoad();
            });
        }
    }

    ngAfterViewInit() {
        this.resetContent();
        this.iframeURLChange(this.documentFrame.nativeElement, (newURL: string) => {
            this.urlChange.next(newURL)
        });
    }

    iframeURLChange(iframe, callback) {
        let lastDispatched = null;

        const dispatchChange = function () {
            if (iframe.contentWindow) {
                const newHref = iframe.contentWindow.location.pathname;
                if (newHref === "about:blank") return;
                if (newHref !== lastDispatched) {
                    callback(newHref);
                    lastDispatched = newHref;
                }
            }
        };

        const unloadHandler = function (e: Event) {
            setTimeout(dispatchChange, 0);
        };

        function attachUnload() {
            // Remove the unloadHandler in case it was already attached.
            // Otherwise, there will be two handlers, which is unnecessary.
            if (iframe.contentWindow) {
                iframe.contentWindow.removeEventListener("unload", unloadHandler);
                iframe.contentWindow.addEventListener("unload", unloadHandler);
            }
        }

        iframe.addEventListener("load", function () {

            attachUnload();

            // Just in case the change wasn't dispatched during the unload event...
            dispatchChange();
        });

        attachUnload();
    }
    
    resetContent() {
        this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
}