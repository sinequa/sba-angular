import {Component, Input, Output, EventEmitter} from "@angular/core";
import {trigger, state, animate, transition, style, AnimationTriggerMetadata} from '@angular/animations';

export function collapseButtonAnimations(timings: number | string): AnimationTriggerMetadata[] {
    return [
        trigger('toggleCollapsed', [
            state('0', style({transform: 'rotate(0deg)'})),
            state('1', style({transform: 'rotate(-180deg)'})),
            transition('0 <=> 1', [
                animate(timings)
            ])
        ]),
    ];
}

@Component({
    selector: "sq-collapse-button",
    templateUrl: "./collapse-button.component.html",
    animations: collapseButtonAnimations(".15s ease-in-out")
})
export class CollapseButton {
    @Input() collapsed: boolean;
    @Input() icon: string;
    @Input() text: string;
    @Output() state: EventEmitter<boolean>;

    constructor() {
        this.state = new EventEmitter<boolean>();
        this.collapsed = true;
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.state.emit(this.collapsed);
    }
}