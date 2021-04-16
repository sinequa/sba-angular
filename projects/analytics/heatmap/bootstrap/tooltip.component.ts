import {Component, Input} from '@angular/core';

@Component({
    selector: "sq-tooltip",
    template: `
<div [ngStyle]="style" [ngClass]="orientation" class="sq-tooltip position-absolute card">
    <div class="card-body bg-{{theme}} p-2">
        <ng-content></ng-content>
    </div>
</div>
`,
    styles: [`
.sq-tooltip {
    z-index: 10;
}

.sq-tooltip::after {
    content: " ";
    position: absolute;
    top: 12px;
    border-width: 8px;
    border-style: solid;
}

.sq-tooltip.right::after {
    left: -17px;
    border-color: transparent rgb(0,0,0,0.125) transparent transparent;
}

.sq-tooltip.left::after {
    right: -17px;
    border-color: transparent transparent transparent rgb(0,0,0,0.125);
}
    `]
})
export class BsTooltipComponent {
    @Input() orientation: "left" | "right" = "right";
    @Input() left = 0;
    @Input() right = 0;
    @Input() top = 0;
    @Input() theme: "light" | "dark" = "light";

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