import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInQuarters, differenceInSeconds, differenceInWeeks, differenceInYears, format, formatDistance, formatDistanceToNow, formatRelative, getDaysInMonth, getTime, getUnixTime, parseISO, toDate } from "date-fns";
import { zonedTimeToUtc } from 'date-fns-tz';

/**
 * When type = "diff", unit need to be set
 */

export interface DateParams {
    format?: string;
    type?: "fromNow" | "from" | "toNow" | "to" | "calendar" | "diff" | "valueOf" | "unix" | "daysInMonth" | "iso";
    suffix?: boolean; // from | fromNow | to| toNow (default: true)
    reference?: Date | number | string; // from| to | calendar | diff
    unit?: Intl.RelativeTimeFormatUnit; // diff
    precise?: boolean; // diff @deprecated
}

// we can expand this easly
const differenceIn = {
    day: (d,r) => differenceInDays(d,r),
    days: (d,r) => differenceInDays(d,r),
    month: (d,r) => differenceInMonths(d,r),
    months: (d,r) => differenceInMonths(d,r),
    year: (d,r) => differenceInYears(d,r),
    years: (d,r) => differenceInYears(d,r),
    quarter: (d,r) => differenceInQuarters(d,r),
    quarters: (d,r) => differenceInQuarters(d,r),
    week: (d,r) => differenceInWeeks(d,r),
    weeks: (d,r) => differenceInWeeks(d,r),
    hour: (d,r) => differenceInHours(d,r),
    hours: (d, r) => differenceInHours(d, r),
    minute: (d, r) => differenceInMinutes(d, r),
    minutes: (d, r) => differenceInMinutes(d, r),
    second: (d, r) => differenceInSeconds(d, r),
    seconds: (d, r) => differenceInSeconds(d, r),
};

@Pipe({
    name: "sqDateExt", pure: false,
    standalone: false
})
export class DateFnsPipe extends AbstractIntlPipe<(Date | number | string), DateParams> {

    override updateValue(key: Date | number | string, params: DateParams = {} as DateParams): void {
        super.updateValue(key, params);
        const m = (typeof key === 'string')
            ? parseISO(key)
            : toDate(key);

        params = { suffix: true, ...params } as DateParams;

        if (params.format) {
            this.value = format(m, params.format);
        }
        else {
            params.reference = (typeof (params.reference) === 'string')
                ? parseISO(params.reference)
                : params.reference;

            switch (params.type) {
                case "fromNow":
                    this.value = formatDistance(m, Date.now(), { addSuffix: params.suffix });
                    break;
                case "from":
                    this.value = formatDistance(m, params.reference!, { addSuffix: params.suffix });
                    break;
                case "toNow":
                    this.value = formatDistanceToNow(m, { addSuffix: params.suffix });
                    break;
                case "to":
                    this.value = formatDistance(params.reference!, m, { addSuffix: params.suffix });
                    break;
                case "calendar":
                    this.value = formatRelative(m, params.reference!);
                    break;
                case "diff":
                    this.value = "" + differenceIn[params.unit!](m, params.reference)
                    break;
                case "valueOf":
                    this.value = "" + getTime(m);
                    break;
                case "unix":
                    this.value = "" + getUnixTime(m);
                    break;
                case "daysInMonth":
                    this.value = "" + getDaysInMonth(m);
                    break;
                case "iso":
                    this.value = zonedTimeToUtc(m, Intl.DateTimeFormat().resolvedOptions().timeZone).toISOString();
                    break;
            }
        }
    }
}
