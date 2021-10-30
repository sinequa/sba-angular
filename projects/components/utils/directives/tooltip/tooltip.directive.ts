import {
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
import { ComponentPortal } from "@angular/cdk/portal";
import { TooltipComponent } from "./tooltip.component";
import { Utils } from "@sinequa/core/base";
import { Observable, of, Subscription } from "rxjs";
import { delay } from "rxjs/operators";

@Directive({selector: "[sqTooltip]"})
export class TooltipDirective<T> implements OnDestroy {
  @Input("sqTooltip") text?: string | ((data?: T) => Observable<string|undefined>) = "";
  @Input("sqTooltipData") data?: T;
  @Input() placement: "top" | "bottom" | "right" | "left" = "bottom";
  @Input() delay = 300;

  private overlayRef: OverlayRef;
  private subscription?: Subscription;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnDestroy() {
    // do not forget to clear timeout function
    this.clearSubscription();
  }

  @HostListener("mouseenter", ['$event'])
  show(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.clearSubscription();

    if(!this.text) return;

    let obs: Observable<string|undefined>;

    if(Utils.isFunction(this.text)) {
      obs = this.text(this.data);
    }
    else {
      obs = of(this.text)
        .pipe(delay(this.delay))
    }

    this.subscription = obs.subscribe(text => {
      this.overlayRef?.detach();

      if(!text?.trim().length) return;
  
      const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([this.position()]);
      
      const scrollStrategy = this.overlay.scrollStrategies.close();
      this.overlayRef = this.overlay.create({positionStrategy, scrollStrategy});
      
      const tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
      tooltipRef.instance.text = text;
    });
  }

  @HostListener("mousedown", ['$event'])
  mouseClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation();
    this.clearSubscription();
  }

  @HostListener("mouseleave")
  hide() {
    this.clearSubscription();
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
  private clearSubscription() {
    this.subscription?.unsubscribe();
    this.overlayRef?.detach();
  }
}