import {Directive, Input, TemplateRef, ViewContainerRef, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ɵMatchMedia, BreakPointRegistry} from '@angular/flex-layout';
import {Subject, throwError} from "rxjs";
import {startWith, switchMap, map} from "rxjs/operators";

// Adapted from https://github.com/angular/flex-layout/issues/142#issuecomment-379465022
// Change ɵMatchMedia => MatchMedia when we move to angular 8
@Directive({
    selector: "[sqMediaIf]",
})
export class MediaIf implements OnDestroy {
    private hasView = false;
    private matcher = new Subject<string>();
    private subscription = this.matcher
        .pipe(
            map(alias => {
                const breakpoint = this.breakpoints.findByAlias(alias);
                if (!breakpoint) {
                    throwError(`breakpoint not found for ${alias}`);
                    return "";
                }
                else {
                    return breakpoint.mediaQuery;
                }
            }),
            switchMap(mq => {
                //console.log("MediaIf:", mq);
                return this.matchMedia.observe([mq], true)
                    .pipe(
                        map(result => {
                            //console.log("MediaChange:", result);
                            return result.matches;
                        }),
                        startWith(this.matchMedia.isActive(mq)));
            }))
        .subscribe(matches => matches ? this.createView() : this.destroyView());

    @Input()
    set sqMediaIf(value: string) {
        this.matcher.next(value);
    }

    constructor(
        private template: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private breakpoints: BreakPointRegistry,
        private matchMedia: ɵMatchMedia,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private createView() {
        if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.template);
            this.changeDetectorRef.markForCheck();
            this.hasView = true;
        }
    }

    private destroyView() {
        if (this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}