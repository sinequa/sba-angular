import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef
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
import { Observable, of, Subscription, delay } from "rxjs";

export type Placement = "top" | "bottom" | "right" | "left";
/**
 * Directive that attaches a tooltip to the host element
 *
 * @example
 * <div sqTooltip="This is a tooltip's text"></div>
 *
 * @example
 * // A template can be passed to the directive instead of a string. Here 'tooltip' is a template reference
 * <div sqTooltip="tooltip"></div>
 *
 * <ng-template #tooltip>
 *  <h2>Title</h2>
 *  <p>{{ "this is a comment" | uppercase }}</p>
 *  <h3>Other text</h3>
 * </ng-template>
 *
 * @example
 * //HTML can be used directly (not recommanded)
 * <div sqTooltip="<h1>Title</h1><br><p>This is a comment</p>"></div>
 */
@Directive({ selector: "[sqTooltip]" })
export class TooltipDirective<T> implements OnDestroy {
  /**
   * Defining a property called textOrTemplate that can be a string, a function that
   * returns an Observable of a string or undefined, or a TemplateRef.
   */
  @Input("sqTooltip") potentialValueOrTemplate?: string | ((data?: T) => Observable<string | undefined>) | TemplateRef<any>;
  @Input("sqTooltipData") data?: T;

  /**
   * Setting the default value of the placement property to `bottom`
   */
  @Input() placement: Placement = "bottom";
  /**
   * List of fallback placement if *Placement* defined can't be applyied
   */
  @Input() fallbackPlacements: Placement | Placement[] = [];

  /**
   * Delay in millisecond before showing/hiding the tooltip.
   *
   * Default value is 300ms
   */
  @Input() delay = 300;

  private overlayRef: OverlayRef;
  private subscription?: Subscription;
  private clearTimeout?: any;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) { }

  ngOnDestroy() {
    // do not forget to clear timeout function
    this.clearSubscription();
  }

  @HostListener("mouseenter", ['$event'])
  show(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    // The tooltip is already showing: just cancel the hiding
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
      return;
    }

    this.clearSubscription();

    if (!this.potentialValueOrTemplate) return;

    let obs: Observable<string | undefined | TemplateRef<any>>;

    if (Utils.isFunction(this.potentialValueOrTemplate)) {
      obs = this.potentialValueOrTemplate(this.data);
    }
    else if (typeof (this.potentialValueOrTemplate) === "string") {
      obs = of(this.potentialValueOrTemplate)
        .pipe(delay(this.delay))
    } else {
      // this.text is a templateRef
      obs = of(this.potentialValueOrTemplate);
    }

    this.subscription = obs.subscribe(valueOrTemplate => {
      this.overlayRef?.detach();

      // return when value is empty
      if (typeof (valueOrTemplate) === "string") {
        if (!valueOrTemplate?.trim().length) return;
      }

      // set the tooltip's position strategy
      const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions([this.position(), ...this.fallbackPositions()]);

      const scrollStrategy = this.overlay.scrollStrategies.close();
      this.overlayRef = this.overlay.create({ positionStrategy, scrollStrategy });

      // instance of the tooltip's component
      const tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));

      if (typeof (valueOrTemplate) === "string") {
        tooltipRef.instance.text = valueOrTemplate;
      } else {
        tooltipRef.instance.template = valueOrTemplate;
      }
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
    if (!this.clearTimeout) {
      this.clearTimeout = setTimeout(() => this.clearSubscription(), 10);
    }
  }

  position(placement = this.placement): ConnectedPosition {
    switch (placement) {
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

  fallbackPositions(): ConnectedPosition[] {
    return Utils.asArray(this.fallbackPlacements).map(p => this.position(p));
  }

  /**
   * Clear timeout function and detach overlayRef
   */
  private clearSubscription() {
    this.subscription?.unsubscribe();
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
      this.clearTimeout = undefined;
    }
    this.overlayRef?.detach();
  }
}
