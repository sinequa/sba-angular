import {Pipe, PipeTransform, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";
import {IntlService} from "./intl.service";
import {Utils} from "@sinequa/core/base";

/**
 * An abstract base class for pipes that should refresh automatically
 * when the current locale on {@link IntlService} changes. Pipes should
 * be declared as `pure: false` - the current value is cached to avoid
 * unnecessary processing
 */
@Pipe({name: "sqAbstractIntlPipe", pure: false})
export abstract class AbstractIntlPipe implements PipeTransform, OnDestroy {
    protected value: any = "";
    protected lastValue: any;
    protected lastParams: any;
    protected localeChange: Subscription;

    constructor(
        protected intlService: IntlService,
        protected changeDetectorRef: ChangeDetectorRef) {
    }

    protected updateValue(value: any, params?: any): void {
        this.lastValue = value;
        this.lastParams = params;
        this.changeDetectorRef.markForCheck();
    }

    transform(value: any, params?: any): any {
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
