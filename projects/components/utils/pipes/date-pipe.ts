import {Pipe, ChangeDetectorRef} from "@angular/core";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";

@Pipe({name: "sqDate", pure: false})
export class DatePipe extends AbstractIntlPipe {
    constructor(
        intlService: IntlService,
        changeDetectorRef: ChangeDetectorRef) {
        super(intlService, changeDetectorRef);
    }

    updateValue(key: number | Date, params: Intl.DateTimeFormatOptions): void {
        super.updateValue(key, params);
        this.value = this.intlService.formatDate(key, params);
    }
}