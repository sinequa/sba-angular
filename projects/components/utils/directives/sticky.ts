import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Utils } from '@sinequa/core/base';
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

    onScroll(forceScrollDown = false) {
        const scrollDelta = window.pageYOffset - this.scrollY;
        this.scrollY = window.pageYOffset;

        const offsets = this.offsets || {top: 0, bottom: 0};
        const componentHeight = this.container.nativeElement.getBoundingClientRect().height;

        // Scrolling down
        if(scrollDelta >= 0 || this.scrollY === 0 || forceScrollDown) {
            this.marginTop = Math.min(this.scrollY, this.marginTop);
            this.bottom = undefined;
            this.top = Math.min(window.innerHeight - componentHeight - offsets.bottom, offsets.top);
        }
        // Scrolling up
        else {
            this.marginTop = Math.max(this.scrollY + window.innerHeight - componentHeight -offsets.bottom - offsets.top, this.marginTop);
            this.bottom = window.innerHeight - offsets.top - componentHeight;
            this.top = undefined;
            if(this.scrollY <= this.marginTop) {
                this.postScrollUp();
            }
        }
    }

    postScrollUp = Utils.debounce(() => {
        this.onScroll(true);
    }, 250);

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
            window.addEventListener('resize', this.listener);
            this.ui.addElementResizeListener(this.container.nativeElement, this.listener);
        }
    }

    ngOnDestroy() {
        if(this.listener) {
            window.removeEventListener('scroll', this.listener);
            window.removeEventListener('resize', this.listener);
            this.ui.removeElementResizeListener(this.container.nativeElement, this.listener);
        }
    }

}
