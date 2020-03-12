import {Locale, LocalesConfig} from "@sinequa/core/intl";
import {enCore} from "./messages";

export class DefaultLocalesConfig implements LocalesConfig {
    defaultLocale: Locale;
    locales?: Locale[];

    constructor() {
        this.defaultLocale = {
            name: "en",
            display: "English",
            data: {
                intl: {
                    locale: "en-US"
                },
                messages: enCore,
            }
        };
        this.locales = [this.defaultLocale];
    }
}
