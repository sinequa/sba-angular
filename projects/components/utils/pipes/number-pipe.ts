import {Pipe} from "@angular/core";
import {AbstractIntlPipe} from "@sinequa/core/intl";

@Pipe({name: "sqNumber", pure: false})
export class NumberPipe extends AbstractIntlPipe<(number | string), Intl.NumberFormatOptions> {

    override updateValue(key: number | string, params: Intl.NumberFormatOptions): void {
        super.updateValue(key, params);
        this.value = typeof key === "number" ? this.intlService.formatNumber(key, params) : key;
    }
}