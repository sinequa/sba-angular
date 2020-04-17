import {Component, Input} from '@angular/core';

@Component({
    selector: "sq-tooltip",
    template: `
<div [ngStyle]="style" [ngClass]="orientation" class="sq-tooltip position-absolute card">
    <div class="card-body bg-light p-2">
        <ng-content></ng-content>
    </div>
</div>
`,
    styles: [`
.sq-tooltip {
    pointer-events: none;
    opacity: 0.8;
}

.sq-tooltip::after {
    content: " ";
    position: absolute;
    top: 12px;
    border-width: 8px;
    border-style: solid;
}

.sq-tooltip.right::after {
    left: -16px;
    border-color: transparent #f8f9fa transparent transparent;
}

.sq-tooltip.left::after {
    right: -16px;
    border-color: transparent transparent transparent #f8f9fa;
}
    `]
})
export class BsTooltipComponent {
    @Input() orientation: "left" | "right" = "right";
    @Input() left = 0;
    @Input() right = 0;
    @Input() top = 0;

    get style() {
        if(this.orientation === "right") {
            return {
                'left.px': this.left + 7,
                'top.px': this.top - 21, // Align tooltip arrow
            }
        }
        else {
            return {
                'right.px': this.right + 7,
                'top.px': this.top - 21, // Align tooltip arrow
            }
        }
    }
}