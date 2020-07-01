import { Component, AfterViewInit, OnDestroy, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { UIService } from '../ui.service';

@Component({
    selector: '[sqSticky]',
    template: `
<div [ngStyle]="{'margin-top.px': marginTop}"></div>
<div #container class="sticky-container" [ngStyle]="{'top.px': top, 'bottom.px': bottom}">
    <ng-content></ng-content>
</div>
`,
    styles: [`
.sticky-container {
    position: sticky;
    position: -webkit-sticky;
}
    `]
})
export class StickyComponent implements OnInit, AfterViewInit, OnDestroy{
    @Input("sqSticky") offsets?: {top: number, bottom: number};
    @ViewChild("container") container: ElementRef;

    top?: number;
    bottom?: number;
    scrollY: number;
    marginTop = 0;
    
    private listener;
    
    constructor(protected ui: UIService){
    }
   
    onScroll() {
        const scrollDelta = window.pageYOffset - this.scrollY;
        this.scrollY = window.pageYOffset;

        const offsets = this.offsets || {top: 0, bottom: 0};
        const componentHeight = this.container.nativeElement.getBoundingClientRect().height;

        // Scrolling down
        if(scrollDelta > 0) {
            this.marginTop = Math.min(this.scrollY, this.marginTop);
            this.bottom = undefined;
            this.top = Math.min(-offsets.bottom + window.innerHeight - componentHeight, offsets.top);
        }
        // Scrolling up
        else {
            this.marginTop = Math.max(-offsets.bottom - offsets.top + window.innerHeight - componentHeight + this.scrollY, this.marginTop);
            this.bottom = window.innerHeight - offsets.top - componentHeight;
            this.top = undefined;
        }
    }

    ngOnInit() {
        if(CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {            
            this.scrollY = window.pageYOffset;
            this.top = (this.offsets?.top || 0);
        }
    }

    ngAfterViewInit() {
        // position: sticky is not supported in Internet Explorer. A workaround could be to rely on position: relative and position: fixed, with additional logic.
        if(CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
            this.listener = () => this.onScroll();
            window.addEventListener('scroll', this.listener);
            this.ui.addElementResizeListener(this.container.nativeElement, this.listener);
        }
    }

    ngOnDestroy() {
        if(this.listener) {
            window.removeEventListener('scroll', this.listener);
            this.ui.removeElementResizeListener(this.container.nativeElement, this.listener);
        }
    }

}
