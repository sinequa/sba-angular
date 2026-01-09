import {Pipe} from "@angular/core";
import {AbstractIntlPipe} from "@sinequa/core/intl";

@Pipe({
    name: "sqDate", pure: false,
    standalone: false
})
export class DatePipe extends AbstractIntlPipe<(Number | Date | string), Intl.DateTimeFormatOptions>{

    override updateValue(key: number | Date | string, params: Intl.DateTimeFormatOptions): void {
        super.updateValue(key, params);
        this.value = this.intlService.formatDate(key, params);
    }
}