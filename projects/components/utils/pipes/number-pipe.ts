import {Pipe, ChangeDetectorRef} from "@angular/core";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({name: "sqNumber", pure: false})
export class NumberPipe extends AbstractIntlPipe {
    constructor(
        intlService: IntlService,
        changeDetectorRef: ChangeDetectorRef) {
        super(intlService, changeDetectorRef);
    }

    updateValue(key: number | string, params: Intl.NumberFormatOptions): void {
        super.updateValue(key, params);
        this.value = typeof key === "number" ? this.intlService.formatNumber(key, params) : key;
    }
}