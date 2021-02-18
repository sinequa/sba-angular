import {Pipe, ChangeDetectorRef} from "@angular/core";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";
import moment from "moment";

export interface MomentParams {
    format?: string;
    type?: "fromNow" | "from" | "toNow" | "to" | "calendar" | "diff" | "valueOf" | "unix" | "daysInMonth" | "iso";
    suffix?: boolean; // from | fromNow | to| toNow (default: true)
    reference?: moment.MomentInput; // from| to | calendar | diff
    unit?: moment.unitOfTime.Diff; // diff
    precise?: boolean; // diff
}

@Pipe({name: "sqMoment", pure: false})
export class MomentPipe extends AbstractIntlPipe {
    constructor(
        intlService: IntlService,
        changeDetectorRef: ChangeDetectorRef) {
        super(intlService, changeDetectorRef);
    }

    updateValue(key:moment.MomentInput, params: MomentParams = {}): void {
        super.updateValue(key, params);
        const m = moment(key);
        if (params.format) {
            this.value = m.format(params.format);
        }
        else {
            switch (params.type) {
                case "fromNow":
                    this.value = m.fromNow(params.suffix);
                    break;
                case "from":
                    this.value = m.from(params.reference, params.suffix);
                    break;
                case "toNow":
                    this.value = m.toNow(params.suffix);
                    break;
                case "to":
                    this.value = m.to(params.reference, params.suffix);
                    break;
                case "calendar":
                    this.value = m.calendar(params.reference);
                    break;
                case "diff":
                    this.value = "" + m.diff(params.reference, params.unit, params.precise);
                    break;
                case "valueOf":
                    this.value = "" + m.valueOf();
                    break;
                case "unix":
                    this.value = "" + m.unix();
                    break;
                case "daysInMonth":
                    this.value = "" + m.daysInMonth();
                    break;
                case "iso":
                    this.value = m.toISOString();
                    break;
            }
        }
    }
}