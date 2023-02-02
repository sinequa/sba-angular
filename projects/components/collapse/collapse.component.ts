import {Component, Input, AfterViewInit, ContentChild, TemplateRef} from "@angular/core";
import {trigger, state, animate, transition, style, AnimationTriggerMetadata} from '@angular/animations';

export function collapseAnimations(timings: number | string): AnimationTriggerMetadata[] {
    return [
        trigger('show', [
            state('void', style({height: 0})),
            transition('void <=> 1', [
                animate(timings)
            ])
        ])
    ];
}

@Component({
    selector: "sq-collapse",
    template: `
        <div *ngIf="!collapsed" class="sq-collapse" [@show]="!collapsed && afterViewInit">
            <ng-container [ngTemplateOutlet]="template"></ng-container>
        </div>
    `,
    styles: [".sq-collapse.ng-animating { overflow: hidden; }"],
    animations: collapseAnimations(".15s ease-in-out")
})
export class Collapse implements AfterViewInit {
    @Input() collapsed: boolean;
    afterViewInit: boolean; // This allows to only trigger the animation after the view initialization
    @ContentChild(TemplateRef, {static: false}) template: TemplateRef<any>;

    constructor() {
        this.collapsed = true;
    }

    ngAfterViewInit() {
        setTimeout(() => this.afterViewInit = true, 0); // Value can switch synchronously => this can cause "Expression has changed" error
    }
}