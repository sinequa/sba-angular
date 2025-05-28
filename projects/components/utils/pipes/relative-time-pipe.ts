import {Pipe} from "@angular/core";
import {AbstractIntlPipe} from "@sinequa/core/intl";

type RelativeTimeParams = { unit: Intl.RelativeTimeFormatUnit } & Intl.RelativeTimeFormatOptions & { format?: string };

@Pipe({name: "sqRelativeTime", pure: false})
export class RelativeTimePipe extends AbstractIntlPipe<(string | number | Date | undefined), RelativeTimeParams> {

    override updateValue(key: string | number | Date | undefined, params: RelativeTimeParams): void {
        super.updateValue(key, params);
        this.value = this.intlService.formatRelativeTime(key, params);
    }
}
