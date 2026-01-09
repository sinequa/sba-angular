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
    animations: collapseButtonAnimations(".15s ease-in-out"),
    standalone: false
})
export class CollapseButton {
    @Input() collapsed = true;
    @Input() icon: string;
    @Input() text: string;
    @Input() collapsedTitle = 'msg#collapseButton.expand';
    @Input() expandedTitle = 'msg#collapseButton.collapse';
    @Output() state = new EventEmitter<boolean>();

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.state.emit(this.collapsed);
    }
}
