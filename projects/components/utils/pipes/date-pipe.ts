import {Pipe, ChangeDetectorRef} from "@angular/core";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";

@Pipe({name: "sqDate", pure: false})
export class DatePipe extends AbstractIntlPipe<(Number | Date | string), Intl.DateTimeFormatOptions> {
    constructor(
        intlService: IntlService,
        changeDetectorRef: ChangeDetectorRef) {
        super(intlService, changeDetectorRef);
    }

    override updateValue(key: number | Date | string, params: Intl.DateTimeFormatOptions): void {
        super.updateValue(key, params);
        this.value = this.intlService.formatDate(key, params);
    }
}