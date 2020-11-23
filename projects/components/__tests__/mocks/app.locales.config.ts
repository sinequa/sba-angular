import {Locale, LocaleData, LocalesConfig} from '@sinequa/core/intl';

import d3Format from "d3-format/locale/en-US.json";
import d3Time from "d3-time-format/locale/en-US.json";

const data: LocaleData = {
  intl: {
    locale: "en-US"
  },
  d3: {
    locale: "en-US",
    format: d3Format,
    time: d3Time
  },
  messages: {}
};

export class AppLocalesConfig implements LocalesConfig {
  defaultLocale: Locale;
  locales?: Locale[];
  constructor() {
    this.locales = [
      {name: "en", display: "msg#locale.en", data},
    ];
    this.defaultLocale = this.locales[0];
  }
}
;
