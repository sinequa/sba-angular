import {
    Directive,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2
} from "@angular/core";
import { createPopper, Placement, Options, Instance } from "@popperjs/core";
import { fromEvent, merge, Subject } from "rxjs";
import { filter, pluck, takeUntil } from "rxjs/operators";

@Directive({
    selector: "[sqPopper]"
})
export class PopperDirective implements OnInit, OnDestroy {
    // The hint to display
    @Input() target: HTMLElement;
    // Its positioning (check docs for available options)
    @Input() placement?: Placement;
    // Optional hint target if you desire using other element than specified one
    @Input() sqPopper?: HTMLElement;
    // Emitted when the popper is displayed
    @Output() shown = new EventEmitter();
    // The popper instance
    protected popper: Instance;
    protected readonly defaultConfig: Options = {
        placement: "right",
        strategy: "fixed",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, -2]
                }
            }
        ]
    };
    protected readonly destroy$ = new Subject<void>();

    protected readonly el: ElementRef = inject(ElementRef);
    protected readonly renderer: Renderer2 = inject(Renderer2);

    ngOnInit(): void {
        if (this.target) {
            // An element to position the hint relative to
            const reference = this.sqPopper ? this.sqPopper : this.el.nativeElement;

            this.popper = createPopper(reference, this.target, {
                ...this.defaultConfig,
                placement: this.placement || this.defaultConfig.placement
            });

            this.renderer.setStyle(this.target, "display", "none");

            merge(
                fromEvent(reference, "mouseenter"),
                fromEvent(reference, "mouseleave"),
                // fromEvent(reference, 'click')
            )
                .pipe(
                    filter(() => this.popper != null),
                    pluck("type"),
                    takeUntil(this.destroy$)
                )
                .subscribe((e: any) => this.mouseHoverHandler(e));
        }
    }

    ngOnDestroy(): void {
        if (!this.popper) {
            return;
        }

        this.popper.destroy();

        this.destroy$.next();
        this.destroy$.complete();
    }

    protected mouseHoverHandler(e: string): void {
        if (!this.target) return;

        if (!this.target.classList.contains("show")) {
            this.renderer.removeStyle(this.target, "display");
            this.renderer.addClass(this.target, "show");
            this.show();
        } else {
            this.renderer.setStyle(this.target, "display", "none");
            this.renderer.removeClass(this.target, "show");
        }
    }

    protected show() {
        const reference = this.sqPopper ? this.sqPopper : this.el.nativeElement;

        this.popper = createPopper(reference, this.target, {
            ...this.defaultConfig,
            placement: this.placement || this.defaultConfig.placement
        });

        this.shown.emit();
    }
}