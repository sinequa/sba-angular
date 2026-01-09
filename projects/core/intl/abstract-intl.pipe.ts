import {Pipe, PipeTransform, OnDestroy, ChangeDetectorRef, inject} from "@angular/core";
import {Subscription} from "rxjs";
import {IntlService} from "./intl.service";
import {Utils} from "@sinequa/core/base";

/**
 * An abstract base class for pipes that should refresh automatically
 * when the current locale on {@link IntlService} changes. Pipes should
 * be declared as `pure: false` - the current value is cached to avoid
 * unnecessary processing
 */
@Pipe({
    name: "sqAbstractIntlPipe", pure: false,
    standalone: false
})
export abstract class AbstractIntlPipe<U, V> implements PipeTransform, OnDestroy {
    protected value: any = "";
    protected lastValue: any;
    protected lastParams: any;
    protected localeChange: Subscription;

    protected readonly intlService: IntlService = inject(IntlService);
    protected readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    protected updateValue(value: U, params?: V): void {
        this.lastValue = value;
        this.lastParams = params;
        this.changeDetectorRef.markForCheck();
    }

    transform(value: U, params?: V): any {
        // if we ask another time for the same key, return the last value
        if (Utils.equals(value, this.lastValue) && Utils.equals(params, this.lastParams)) {
            return this.value;
        }

        // set the value
        this.updateValue(value, params);

        // subscribe to localeChange event
        if (!this.localeChange) {
            this.localeChange = this.intlService.events.subscribe(
                (event) => {
                    if (!Utils.isEmpty(this.lastValue)) {
                        this.lastValue = null;
                        this.updateValue(value, params);
                    }
                });
        }

        return this.value;
    }

    ngOnDestroy(): void {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }
}
