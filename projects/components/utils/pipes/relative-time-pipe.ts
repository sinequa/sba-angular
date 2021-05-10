import {Pipe, ChangeDetectorRef} from "@angular/core";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";

@Pipe({name: "sqRelativeTime", pure: false})
export class RelativeTimePipe extends AbstractIntlPipe {
    constructor(
        intlService: IntlService,
        changeDetectorRef: ChangeDetectorRef) {
        super(intlService, changeDetectorRef);
    }

    updateValue(key: string |number | Date | undefined, params: {unit: Intl.RelativeTimeUnit} & Intl.RelativeTimeFormatOptions & { format?: string }): void {
        super.updateValue(key, params);
        this.value = this.intlService.formatRelativeTime(key, params ? params.unit : undefined, params);
    }
}