import {Pipe} from "@angular/core";
import {AbstractIntlPipe} from "@sinequa/core/intl";

@Pipe({name: "sqTime", pure: false})
export class TimePipe extends AbstractIntlPipe<(number | Date), Intl.DateTimeFormatOptions> {

    override updateValue(key: number | Date, params: Intl.DateTimeFormatOptions): void {
        super.updateValue(key, params);
        this.value = this.intlService.formatTime(key, params);
    }
}