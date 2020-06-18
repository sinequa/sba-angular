import { Component, OnInit, OnDestroy, ElementRef, Input, ViewChild } from '@angular/core';

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
export class StickyComponent implements OnInit, OnDestroy{
    @Input("sqSticky") offsets?: {top: number, bottom: number};
    @ViewChild("container") container: ElementRef;

    top?: number;
    bottom?: number;
    scrollY: number;
    marginTop = 0;
    
    private listener;
   
    onScroll() {
        const scrollDelta = window.pageYOffset - this.scrollY;
        this.scrollY = window.pageYOffset;

        const offsets = this.offsets || {top: 0, bottom: 0};
        const componentHeight = this.container.nativeElement.getBoundingClientRect().height;

        // Scrolling down
        if(scrollDelta > 0) {
            this.marginTop = 0;
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
        this.listener = () => this.onScroll();
        window.addEventListener('scroll', this.listener);
        this.scrollY = window.pageYOffset;
        this.top = (this.offsets?.top || 0);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.listener);
    }

}