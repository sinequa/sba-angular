import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy
} from "@angular/core";
import {
  ConnectedPosition,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef
} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";

import {TooltipComponent} from "./tooltip.component";

@Directive({selector: "[sqTooltip]"})
export class TooltipDirective implements OnDestroy {
  @Input("sqTooltip") text = "";
  @Input() placement: "top" | "bottom" | "right" | "left" = "bottom";
  @Input() delay = 300;

  private overlayRef: OverlayRef;
  private timeoutId;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnDestroy() {
    // do not forget to clear timeout function
    this.clearTimer();
  }

  @HostListener("mouseenter", ['$event'])
  show(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.clearTimer();

    this.timeoutId = setTimeout(() => {
      if(this.overlayRef) {
          this.overlayRef.detach();
      }

      if (this.text.trim().length === 0) {
        return;
      }

      const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([this.position()]);
      
      const scrollStrategy = this.overlay.scrollStrategies.close();
      this.overlayRef = this.overlay.create({positionStrategy, scrollStrategy});
      
      const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
      tooltipRef.instance.text = this.text;
    }, this.delay);
  }

  @HostListener("mousedown", ['$event'])
  mouseClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation();
    this.clearTimer();
  }

  @HostListener("mouseleave")
  hide() {
    this.clearTimer();
  }

  position(): ConnectedPosition {
    switch (this.placement) {
      case "bottom":
        return {
          originX: "center",
          originY: "bottom",
          overlayX: "center",
          overlayY: "top",
          offsetY: 8
        };
      case "right":
        return {
          originX: "end",
          originY: "center",
          overlayX: "start",
          overlayY: "center",
          offsetX: 8
        };
      case "left":
        return {
          originX: "start",
          originY: "center",
          overlayX: "end",
          overlayY: "center",
          offsetX: -8
        };
      default:
        return {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
          offsetY: -8
        };
    }
  }

  /**
   * Clear timeout function and detach overlayRef
   */
  private clearTimer() {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}