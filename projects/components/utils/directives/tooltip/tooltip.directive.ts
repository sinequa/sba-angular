import {
  Directive,
  ElementRef,
  HostBinding,
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
@Directive({
    selector: "[sqTooltip]",
    standalone: false
})
export class TooltipDirective<TooltipData=undefined, TooltipDisplay=string> implements OnDestroy {
  /**
   * Defining a property called textOrTemplate that can be a string, a function that
   * returns an Observable of a string or undefined, or a TemplateRef.
   */
  @Input("sqTooltip") value?: TooltipDisplay | ((data?: TooltipData) => Observable<TooltipDisplay | undefined> | undefined);
  @Input("sqTooltipData") data?: TooltipData;
  @Input("sqTooltipTemplate") template?: TemplateRef<any>;

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
  /**
   * If the tooltip should stay opened on hover
   */
  @Input() hoverableTooltip = false;
  /**
   * Custom class for the tooltip
   */
  @Input() tooltipClass?: string;

  /**
   * Applies the "has-tooltip" class to its host when displayed
   */
  @HostBinding('class.has-tooltip') hasTooltip = false;

  private overlayRef: OverlayRef;
  private subscription?: Subscription;
  private clearTimeout?: any;
  static activeTooltip?: TooltipDirective<any, any>;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) { }

  ngOnDestroy() {
    // do not forget to clear timeout function
    this.clear();
  }

  @HostListener("mouseenter")
  show() {
    // The tooltip is already showing: just cancel the hiding
    if (this.clearTimeout) {
      this.cancelHide();
      return;
    }

    this.clear();

    if (!this.value) return;

    let obs = Utils.isFunction(this.value)?
      this.value(this.data) :
      of(this.value).pipe(delay(this.delay));

    this.subscription = obs?.subscribe(data => {

      // return when value is empty
      if (!data || (typeof data === 'string' && !data.trim())) return;

      this.clear();

      TooltipDirective.activeTooltip?.clear();
      TooltipDirective.activeTooltip = this;

      // set the tooltip's position strategy
      const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions([this.position(), ...this.fallbackPositions()]);

      const scrollStrategy = this.overlay.scrollStrategies.close();
      this.overlayRef = this.overlay.create({ positionStrategy, scrollStrategy });

      // instance of the tooltip's component
      const tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent<TooltipDisplay>));

      tooltipRef.instance.data = data;

      if (this.template) {
        tooltipRef.instance.template = this.template;
      }
      if (this.tooltipClass) {
        tooltipRef.instance.tooltipClass = this.tooltipClass;
      }

      if (this.hoverableTooltip) {
        this.overlayRef.overlayElement.addEventListener("mouseenter", () => this.cancelHide());
        this.overlayRef.overlayElement.addEventListener('mouseleave', () => this.hide());
      }

      this.hasTooltip = true;
    });
  }

  @HostListener("mousedown")
  mouseClick() {
    this.clear();
  }

  @HostListener("mouseleave")
  hide() {
    if (!this.clearTimeout) {
      this.clearTimeout = setTimeout(() => this.clear(), this.hoverableTooltip ? this.delay : 10);
    }
  }

  cancelHide() {
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
      this.clearTimeout = undefined;
    }
  }

  /**
   * Clear timeout function and detach overlayRef
   */
  clear() {
    this.subscription?.unsubscribe();
    this.cancelHide();
    this.overlayRef?.detach();
    this.hasTooltip = false;
  }

  position(placement = this.placement): ConnectedPosition {
    switch (placement) {
      case "bottom":
        return {
          originX: "center",
          originY: "bottom",
          overlayX: "center",
          overlayY: "top",
          offsetY: 2
        };
      case "right":
        return {
          originX: "end",
          originY: "center",
          overlayX: "start",
          overlayY: "center",
          offsetX: 2
        };
      case "left":
        return {
          originX: "start",
          originY: "center",
          overlayX: "end",
          overlayY: "center",
          offsetX: -2
        };
      default:
        return {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
          offsetY: -2
        };
    }
  }

  fallbackPositions(): ConnectedPosition[] {
    return Utils.asArray(this.fallbackPlacements).map(p => this.position(p));
  }

}
