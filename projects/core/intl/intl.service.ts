import {Injectable, Optional, Inject, OnDestroy, InjectionToken} from "@angular/core";
import {Subject, Observable, concat, of, throwError} from "rxjs";
import {map, last} from "rxjs/operators";
import IntlMessageFormat from "intl-messageformat";
import memoizeFormatConstructor from "intl-format-cache";
// TODO - check loading of locale data per locale - the ponyfill doesn't seem to work
import "@formatjs/intl-relativetimeformat/polyfill";
import "intl-pluralrules";
import get from "lodash/get";
import {Utils, MapOf, JsonObject} from "@sinequa/core/base";
// We support loading d3 bundled and unbundled as it is typically easier
// for others to integrate bundled examples but some 3rd party libs (eg swimlane/charts)
// load d3 unbundled.
import {FormatLocaleDefinition, formatDefaultLocale} from "d3-format";
import {TimeLocaleDefinition, timeFormatDefaultLocale} from "d3-time-format";
import * as d3 from "d3";
import moment from "moment";

/**
 * @ignore
 */
const formatters = {
    getMessageFormat: memoizeFormatConstructor(IntlMessageFormat),
    getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
    getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
    getRelativeTimeFormat: memoizeFormatConstructor(Intl.RelativeTimeFormat),
    getPluralRules: memoizeFormatConstructor(Intl.PluralRules)
};

/**
 * @ignore
 */
const DATE_TIME_FORMAT_OPTIONS = [
    "dateStyle",
    "timeStyle",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName",
];

/**
 * @ignore
 */
const NUMBER_FORMAT_OPTIONS = [
    "localeMatcher",
    "style",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
];

/**
 * @ignore
 */
const RELATIVE_TIME_FORMAT_OPTIONS = [
    "localeMatcher",
    "numeric",
    "style"
];

/**
 * Describes event emitted by {@link IntlService} when the current locale changes
 */
export interface LocaleChangeEvent {
    /**
     * The name of the newly selected locale
     */
    locale: string;
}

/**
 * Describes the data that can be set in a Sinequa locale. Instances are normally
 * defined in application locale modules which can be included statically or loaded
 * dynamically
 */
export interface LocaleData {
    /**
     * Options pertaining to the `Intl` API
     */
    intl: {
        locale: string
    };
    /**
     * Options pertaining to the `Moment.js` library
     */
    moment?: { // default to built-in en-us, data is auto set by moment.defineLocale when the locale module is loaded
        locale: string
    };
    /**
     * Options pertaining to the `D3.js` library
     */
    d3?: {
        locale: string,
        format: FormatLocaleDefinition,
        time: TimeLocaleDefinition
    };
    /**
     * The messages (ICU Message syntax) for this locale
     */
    messages: JsonObject;
}

/**
 * Describes a Sinequa locale
 */
export interface Locale {
    /**
     * The name identifying the locale
     */
    name: string;
    /**
     * A display name for the locale
     */
    display: string;
    /**
     * The directionality of text in this locale (left-to-right or right-to-left)
     */
    direction?: "ltr" | "rtl";
    /**
     * The locale data for the locale
     */
    data?: LocaleData;
}

/**
 * @ignore
 */
interface NextLang {
    start: number;
    end: number;
    lang1: number;
    lang2: number;
}


// moment needs to be set globally to load moment locales successfully when the locales are bundled in the main rollup bundle
// see: https://github.com/rollup/rollup/issues/641
import "./import-moment";

/**
 * Describes the locales configuration object defined by an application and used by the {@link IntlService}
 */
export interface LocalesConfig {
    /**
     * The default locale
     */
    defaultLocale: Locale;
    /**
     * The set of locales supported by the application
     */
    locales?: Locale[];
    /**
     * An optional loader for the dynamic loading of locale data
     * for locales that do not define the data statically
     */
    loadLocale?(locale: string): Observable<LocaleData>;
}

/**
 * An injection token used to initialize the [locales configuration]{@link LocalesConfig} of {@link IntlModule}
 */
export const LOCALES_CONFIG = new InjectionToken<LocalesConfig>('LOCALES_CONFIG');

/**
 * Describes the object to specify custom ICU Message formats
 */
export interface IntlFormats {
    /**
     * Format options for dates
     */
    date?: MapOf<Intl.DateTimeFormatOptions>;
    /**
     * Format options for times
     */
    time?: MapOf<Intl.DateTimeFormatOptions>;
    /**
     * Format options for numbers
     */
    number?: MapOf<Intl.NumberFormatOptions>;
    /**
     * Format options for relative times
     */
    relativeTime?: MapOf<Intl.RelativeTimeFormatOptions>;
}

/**
 * Describes a general configuration object for the {@link IntlModule}
 */
export interface IntlConfig {
    /**
     * Custom formats for ICU Message processing
     */
    formats?: IntlFormats;
}

/**
 * An injection token used to initialize the [general configuration]{@link IntlConfig} of {@link IntlModule}
 */
export const INTL_CONFIG = new InjectionToken<IntlConfig>('INTL_CONFIG');

/**
 * Default custom ICU Message formats
 */
const DEFAULT_FORMATS: IntlFormats = {
    date: {
        sqDateTime: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        },
        sqDate: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        },
        sqYear: {
            year: "numeric"
        },
        sqMonthYear: {
            month: "short",
            year: "numeric"
        }
    },
    time: {
    },
    number: {
        sqWeek: {
            minimumIntegerDigits: 2,
            useGrouping: false
        },
        sqYear: {
            useGrouping: false
        },
        sqNoGrouping: {
            useGrouping: false
        },
        sqZeroDecimalPlaces: {
            maximumFractionDigits: 0
        },
        sqOneDecimalPlace: {
            maximumFractionDigits: 1
        },
        sqTwoDecimalPlaces: {
            maximumFractionDigits: 2
        },
        sqThreeDecimalPlaces: {
            maximumFractionDigits: 3
        },
        sqFourDecimalPlaces: {
            maximumFractionDigits: 4
        },
        sqFiveDecimalPlaces: {
            maximumFractionDigits: 5
        }
    }
};

/* eslint-disable jsdoc/check-alignment,jsdoc/check-indentation,jsdoc/newline-after-description */
/**
 * This service provides methods for managing locales and for formatting dates, numbers and strings using
 * [ICU Message syntax]{@link https://formatjs.io/guides/message-syntax/}. [Messages]{@link LocaleData#messages} stored
 * in a locale's data are referenced using a key in the following form: `msg#<JSONPath>`. Given the following messages:
``` json
{
    "myComponent": {
        "title": "Component: {name}",
        "footer": "Created on {created, date, medium} by {author}"
    }
}
```
 * this key: `msg#myComponent.footer` references myComponent's footer message. The message itself uses
 * ICU Message syntax.
 *
 * This service registers a number of [default custom ICU formats]{@link DEFAULT_FORMATS}. These can be overridden or
 * extended by providing the [INTL_CONFIG]{@link INTL_CONFIG} injection token.
 */
/* eslint-enable jsdoc/check-alignment, jsdoc/check-indentation, jsdoc/newline-after-description */
@Injectable({
    providedIn: "root"
})
export class IntlService implements OnDestroy {
    /**
     * The prefix for ICU messages to be retrieved from [LocaleData.messages]{@link LocaleData#messages}
     * by {@link formatMessage}
     */
    readonly messagePrefix = "msg#";
    /**
     * An alternative prefix for inline ICU messages processed by {@link formatMessage}
     */
    readonly textPrefix = "txt#";
    /**
     * The available locales
     */
    locales: Locale[];
    /** The current locale */
    currentLocale: Locale;
    protected intlLocale: string;
    /** The current direction */
    direction: "ltr" | "rtl";
    protected _events: Subject<LocaleChangeEvent>;
    protected formats: IntlFormats;

    constructor(
        @Optional() @Inject(INTL_CONFIG) protected intlConfig: IntlConfig,
        @Optional() @Inject(LOCALES_CONFIG) protected localesConfig: LocalesConfig
    ) {
        if (!this.intlConfig) {
            this.intlConfig = {};
        }
        if (!localesConfig) {
            if (!localesConfig) {
                console.error("LOCALES_CONFIG has not been provided by the calling app. " +
                    "Please import IntlModule using the forRoot method to which you should pass a LocalesConfig object");
            }
        }
        this._events = new Subject<LocaleChangeEvent>();
        this.locales = localesConfig.locales || [localesConfig.defaultLocale];
    }

    private static getLanguage(name: string) {
        const sepPos = name.indexOf("-");
        if (sepPos === -1) {
            return name;
        }
        return name.substring(0, sepPos);
    }

    private static getBrowserLanguages(): string[] {
        if ((navigator as any).languages) {
            return (navigator as any).languages;
        }
        const language = navigator.language || (navigator as any).userLanguage ||
            (navigator as any).browserLanguage || (navigator as any).systemLanguage;
        return !!language ? [language] : [];
    }

    ngOnDestroy() {
        this._events.complete();
    }

    /**
     * The observable events emitted by this service
     */
    get events(): Observable<LocaleChangeEvent> {
        return this._events;
    }

    private getInitialLocale(): Locale {
        const language = window.localStorage.getItem("sinequa-locale");
        const languages = !!language ? [language] : IntlService.getBrowserLanguages();
        let locale = this.getLocale(languages);
        if (locale) {
            return locale;
        }
        locale = this.getLocale(languages, true);
        if (locale) {
            return locale;
        }
        return this.localesConfig.defaultLocale;
    }

    /**
     * Initialize the service. The current locale is initialized to either the `sinequa-locale` local
     * storage value, the browser language or the default locale.
     *
     * This method is called automatically by the {@link IntlModule} at application startup.
     *
     * @return An observable of the current locale
     */
    init(): Observable<string> {
        // Set up formats
        this.formats = Utils.merge(DEFAULT_FORMATS, this.intlConfig.formats);
        // Load default locale
        let observable = this.use(this.localesConfig.defaultLocale.name, false);
        const initialLocale = this.getInitialLocale();
        if (initialLocale !== this.localesConfig.defaultLocale) {
            // Load initial locale if different to default
            console.log("Setting initial locale: ", initialLocale.name);
            observable = concat<string>(observable, this.use(initialLocale.name, false)).pipe(last<string>());
        }
        Utils.subscribe(observable,
            (value) => {
                console.log("Initial locale set: ", value);
            });
        return observable;
    }

    private loadData(locale: string): Observable<LocaleData> {
        if (!this.localesConfig.loadLocale) {
            return throwError("Dynamic locale loading has not been implemented in the calling app - "  +
                "please add a loadLocale handler to your LocalesConfig");
        }
        return this.localesConfig.loadLocale(locale);
    }

    private getLocale(names: string | string[], approximate = false): Locale | undefined {
        if (typeof names === "string") {
            names = [names];
        }
        for (const name of names) {
            const locale = this.locales.find((locale1) => {
                if (locale1.name === name) {
                    return true;
                }
                if (approximate && IntlService.getLanguage(locale1.name) === IntlService.getLanguage(name)) {
                    return true;
                }
                return false;
            });
            if (locale) {
                return locale;
            }
        }
        return undefined;
    }

    /**
     * Change the current locale. The change is made asynchronously as the locale may need to be
     * downloaded. The current locale is optionally stored in local storage (`sinequa-locale`)
     * to be picked up the next time the service is initialized
     *
     * @param locale The name of the locale to use
     * @param store If `true` the current locale is stored in local storage
     */
    use(locale: string, store = true): Observable<string> {
        const newLocale = this.getLocale(locale);
        if (!newLocale) {
            return throwError({error: "unsupported locale"});
        }

        const observable = !!newLocale.data ? of(newLocale.data) : this.loadData(locale);
        Utils.subscribe<LocaleData>(observable,
            (data) => {
                this.currentLocale = newLocale;

                if (store) {
                    window.localStorage.setItem("sinequa-locale", this.currentLocale.name);
                }

                this.direction = this.currentLocale.direction || "ltr";

                if (!this.currentLocale.data) {
                    this.currentLocale.data = data;
                }

                // Set moment locale
                if (this.currentLocale.data.moment) {
                    // Set (and define if necessary) moment locale (it auto-defines when we are not bundled)
                    if (moment.locale(this.currentLocale.data.moment.locale) !== this.currentLocale.data.moment.locale) {
                        console.log(`moment locale not defined: ${this.currentLocale.data.moment.locale} - defaulting to en`);
                        moment.locale("en");
                    }
                }
                else {
                    moment.locale("en");
                }

                // Set d3 locale
                if (this.currentLocale.data.d3) {
                    formatDefaultLocale(this.currentLocale.data.d3.format);
                    timeFormatDefaultLocale(this.currentLocale.data.d3.time);
                    d3.formatDefaultLocale(this.currentLocale.data.d3.format);
                    d3.timeFormatDefaultLocale(this.currentLocale.data.d3.time);
                }

                if (this.currentLocale.data.intl && this.currentLocale.data.intl.locale) {
                    this.intlLocale = this.currentLocale.data.intl.locale;
                }
                else {
                    this.intlLocale = this.localesConfig.defaultLocale.data ? this.localesConfig.defaultLocale.data.intl.locale : "en";
                }
                return of(this.intlLocale);
            });

        const observable2 = observable.pipe(map((value) => {
            return this.currentLocale.name;
        }));

        Utils.subscribe(observable2,
            (name) => {
                this._events.next({locale: name});
            });

        return observable2;
    }

    private getDefaultMessages(): any {
        const _default = this.locales.find((value) => !!value.data && !!value.data.messages);
        if (_default) {
            return _default.data && _default.data.messages;
        }
        return {};
    }

    private getMessages(): any {
        let messages;
        if (this.currentLocale && this.currentLocale.data) {
            messages = this.currentLocale.data.messages;
        }
        if (!messages) {
            messages = this.getDefaultMessages();
        }
        return messages;
    }

    /**
     * Get the message from the current locale that corresponds to the passed `key`.
     * If the is not prefixed by {@link messagePrefix} then `null` is returned
     *
     * @param key The message key
     */
    getMessage(key: string): string | undefined {
        if (!Utils.startsWith(key, this.messagePrefix)) {
            return undefined;
        }
        key = key.substr(this.messagePrefix.length);
        const messages = this.getMessages();
        let message = get(messages, key);
        if (!message) {
            const defaultMessages = this.getDefaultMessages();
            if (messages !== defaultMessages) {
                message = get(defaultMessages, key);
            }
        }
        return message;
    }

    // Returned start and end are for the text BEFORE the language specifier and so refer to the previous
    // language not the one returned by the same call to this method
    private nextLang(text: string, start: number, allowNone: boolean): NextLang | undefined {
        for (let i = start, ic = text.length - 3; i < ic; i++) {
            if (text[i] === "[" && text[i + 3] === "]") {
                return {
                    start,
                    end: i,
                    lang1: text.charCodeAt(i + 1),
                    lang2: text.charCodeAt(i + 2)
                };
            }
        }
        if (allowNone) {
            return {
                start,
                end: text.length,
                lang1: -1,
                lang2: -1
            };
        }
        return undefined;
    }

    // ([nnn])<default>[fr]<french>[de]<german>...
    private sysLang(text: string): string {
        if (!text) {
            return text;
        }
        let iStart = 0;
        const len = text.length;
        // Skip order
        let i = 0;
        if (text[i] === "[") {
            while (i < len && text[i] >= "0" && text[i] <= "9") {
                i++;
            }
            if (text[i] === "]") {
                iStart = i + 1;
            }
        }
        // Pick out default value
        const defaultLang = this.nextLang(text, iStart, false);
        if (!defaultLang) {
            return text; // Not a sys lang formatted text
        }
        // Look for a matching language
        const lang1 = this.currentLocale.name.charCodeAt(0);
        const lang2 = this.currentLocale.name.charCodeAt(1);
        let curLang: NextLang | undefined = defaultLang;
        while (curLang) {
            if (lang1 === curLang.lang1 && lang2 === curLang.lang2) {
                // We have a matching language, get its text
                const nextLang = this.nextLang(text, curLang.end + 4, true);
                return text.substring(nextLang!.start, nextLang!.end);
            }
            else {
                curLang = this.nextLang(text, curLang.end + 4, false);
            }
        }
        // return default language text
        return text.substring(defaultLang.start, defaultLang.end);
    }

    private processFormatMessage(message: string, values = {}): string {
        const hasValues = Object.keys(values).length > 0;
        if (!hasValues) {
            return message;
        }
        if (message) {
            try {
                const formatter = formatters.getMessageFormat(message, this.intlLocale, this.formats, {formatters});
                const formattedMessage = formatter.format(values);
                return formattedMessage;
            }
            catch (e) {
                console.log("IntlService.processFormatMessage error:", e);
                return message;
            }
        }
        else {
            return message;
        }
    }

    /**
     * Format a message identified by a `key`. Any values referenced
     * by the message are taken from an optional `values` map. The key can be
     * in a variety of forms:
     * * a Sinequa "syslang" string: `apple[fr]pomme[de]Apfel`
     * * a message key resolved in the [messages]{@link LocaleData#messages} of the current
     * locale:  `msg#path1.path2.path3`
     * * an ICU message using the `txt#` prefix: `txt#Hello {name}`
     *
     * @param key The message identifier
     * @param values Values referenced by an ICU message
     * @return The formatted message. If the key is not resolved then it is returned unprocessed
     */
    formatMessage(key: string, values?: MapOf<any>): string {
        key = Utils.trim(key);
        const sysLangStr = this.sysLang(key);
        if (sysLangStr !== key) {
            return sysLangStr;
        }
        const _values = {};
        if (values) {
            for (const valueName of Object.keys(values)) {
                const value = values[valueName];
                if (value && Utils.isString(value)) {
                    _values[valueName] = this.formatMessage(value);
                }
                else {
                    _values[valueName] = value;
                }
            }
        }
        if (Utils.startsWith(key, this.messagePrefix)) {
            if (Utils.eq(key, this.messagePrefix)) {
                return key;
            }
            let message = this.getMessage(key);
            if (!Utils.isString(message)) {
                message = key;
            }
            const formattedMessage = this.processFormatMessage(message, _values);
            return formattedMessage;
        }
        else if (Utils.startsWith(key, this.textPrefix)) {
            if (Utils.eq(key, this.textPrefix)) {
                return key;
            }
            key = key.substr(this.textPrefix.length);
            const formattedMessage = this.processFormatMessage(key, _values);
            return formattedMessage;
        }
        else {
            return key;
        }
    }

    /**
     * Format an ICU Message string
     *
     * @param text An ICU Message to format
     * @param values Values referenced by an ICU message
     */
    formatText(text: string, values?: {}): string {
        const formattedMessage = this.processFormatMessage(text, values);
        return formattedMessage;
    }

    /**
     * Parse a date string in the current locale - eg `04/09/1986`
     *
     * @param value A date string
     * @returns The parse `Date` or `undefined` if the date cannot be parsed
     */
    parseDate(value: string): Date | undefined {
        const m = moment(value, "L");
        if (m.isValid()) {
            return m.toDate();
        }
        return undefined;
    }

    private getNamedFormat(type: string, name: string): Intl.DateTimeFormatOptions | Intl.NumberFormatOptions | undefined {
        const format = this.formats && this.formats[type] && this.formats[type][name];
        if (format) {
            return format;
        }
        console.warn(`IntlService.getNamedFormat - not found - type: ${type}, name: ${name}`);
        return undefined;
    }

    private filterProps(props: {[k: string]: any}, whitelist: string[], defaults: {[k: string]: any} = {}): any {
        return whitelist.reduce<{[k: string]: string}>((filtered, name) => {
            if (props.hasOwnProperty(name)) {
                filtered[name] = props[name];
            }
            else if (defaults.hasOwnProperty(name)) {
                filtered[name] = defaults[name];
            }
            return filtered;
        }, {});
    }

    /**
     * Format a date in the current locale according to the passed options. If the passed `value` is not a `Date`
     * then one is constructed from it.
     *
     * @param value The date to format
     * @param options The options can include a custom format
     */
    formatDate(value: string | number | Date, options: Intl.DateTimeFormatOptions & { format?: string } = {}): string {
        const {format} = options;
        const date = value instanceof Date ? value : new Date(value);
        const defaults = (format && this.getNamedFormat("date", format)) || {};
        const filteredOptions = this.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
        try {
            return formatters.getDateTimeFormat(this.intlLocale, filteredOptions).format(date);
        }
        catch (e) {
            console.warn("IntlService.formatDate:", e);
        }
        return String(date);
    }

    /**
     * Format a time in the current locale according to the passed options. If the passed `value` is not a `Date` then one is
     * constructed from it.
     *
     * @param value The date to format
     * @param options The options can include a custom format
     */
    formatTime(value: string | number | Date, options: Intl.DateTimeFormatOptions & { format?: string } = {}): string {
        const {format} = options;
        const date = value instanceof Date ? value : new Date(value);
        const defaults = (format && this.getNamedFormat("time", format)) || {};
        let filteredOptions = this.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
        if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
            // Add default formatting options if hour, minute, or second isn't defined.
            filteredOptions = Object.assign({},
                filteredOptions,
                {
                    hour: 'numeric',
                    minute: 'numeric'
                });
        }
        try {
            return formatters.getDateTimeFormat(this.intlLocale, filteredOptions).format(date);
        }
        catch (e) {
            console.warn("IntlService.formatTime:", e);
        }
        return String(date);
    }

    private makeRelativeTimeParams(value: Date): { value: number, unit: Intl.RelativeTimeUnit } {
        const diff = value.getTime() - Utils.now.getTime();
        const absDiff = Math.abs(diff);
        if (absDiff < Utils.oneSecond) {
            return { value: 0, unit: "seconds" };
        }
        else if (absDiff < Utils.oneMinute) {
            return { value: Utils.roundAway(diff / Utils.oneSecond), unit: "seconds" };
        }
        else if (absDiff < Utils.oneHour) {
            return { value: Utils.roundAway(diff / Utils.oneMinute), unit: "minutes" };
        }
        else if (absDiff < Utils.oneDay) {
            return { value: Utils.roundAway(diff / Utils.oneHour), unit: "hours" };
        }
        else if (absDiff < (Utils.oneDay * 30)) {
            return { value: Utils.roundAway(diff / Utils.oneDay), unit: "days" };
        }
        else if (absDiff < (Utils.oneDay * 365)) {
            return { value: Utils.roundAway(diff / (Utils.oneDay * 30)), unit: "months" };
        }
        else {
            return { value: Utils.roundAway(diff / (Utils.oneDay * 365)), unit: "years" };
        }
    }

    /**
     * Format a relative time in the current locale according to the passed options
     *
     * @param value The relative time to format. Negative number values represent times in the past.
     * If a Date value is passed then a number value and unit are deduced automatically based on
     * the current date and time.
     * @param unit The relative time unit (eg years, days or seconds). Must be passed if value
     * is a number.
     * @param options The options can include a custom format
     */
    formatRelativeTime(
        value: string | number | Date | undefined, unit?: Intl.RelativeTimeUnit,
        options: Intl.RelativeTimeFormatOptions & { format?: string } = {}
    ): string {
        if (value === undefined) {
            return "";
        }
        if (Utils.isString(value)) {
            value = new Date(value);
        }
        if (Utils.isDate(value)) {
            const params =  this.makeRelativeTimeParams(value);
            value = params.value;
            unit = params.unit;
        }
        const { format } = options;
        const defaults = (format && this.getNamedFormat("relativeTime", format)) || {};
        const filteredOptions = this.filterProps(options, RELATIVE_TIME_FORMAT_OPTIONS, defaults);
        if (!filteredOptions.numeric) {
            filteredOptions.numeric = "auto"; // default is always - we prefer auto
        }
        try {
            return formatters.getRelativeTimeFormat(this.intlLocale, filteredOptions).format(value, unit);
        }
        catch (e) {
            console.warn("IntlService.formatRelativeTime:", e);
        }
        return String(value);
    }

    /**
     * Format a number in the current locale
     *
     * @param value The number to format
     * @param options The options can include a custom format
     */
    formatNumber(value: any, options: Intl.NumberFormatOptions & { format?: any } = {}): string {
        const {format} = options;
        const defaults = format && this.getNamedFormat("number", format);
        const filteredOptions = this.filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
        try {
          return formatters.getNumberFormat(this.intlLocale, filteredOptions).format(value);
        }
        catch (e) {
            console.warn("IntlService.formatNumber:", e);
        }
        return String(value);
    }
}
