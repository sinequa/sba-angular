import {Locale, LocaleData, LocalesConfig} from '@sinequa/core/intl';
import { FormatLocaleDefinition } from 'd3-format';
import { TimeLocaleDefinition } from 'd3-time-format';

import d3Format from "../../../../node_modules/d3-format/locale/en-US.json";
import d3Time from "../../../../node_modules/d3-time-format/locale/en-US.json";

const localeDataFR: LocaleData = {
  intl: {
    locale: 'fr-FR'
  },
  moment: {
    locale: "fr"
  },
  d3: {
    locale: "fr-FR",
    format: d3Format as FormatLocaleDefinition,
    time: d3Time as TimeLocaleDefinition
  },
  messages: {}
}
const localeDataEN: LocaleData = {
  intl: {
    locale: 'en-US'
  },
  moment: {
    locale: "en"
  },
  d3: {
    locale: "en-US",
    format: d3Format as FormatLocaleDefinition,
    time: d3Time as TimeLocaleDefinition
  },
  messages: {}
}
const localeDataDE: LocaleData = {
  intl: {
    locale: 'de-DE'
  },
  moment: {
    locale: "de"
  },
  d3: {
    locale: "de-DE",
    format: d3Format as FormatLocaleDefinition,
    time: d3Time as TimeLocaleDefinition
  },
  messages: {}
}

export class AppLocalesConfig implements LocalesConfig {
  defaultLocale: Locale;
  locales?: Locale[];
  constructor() {
    this.locales = [
      { name: "en", display: "msg#locale.en", data: localeDataEN },
      { name: "fr", display: "msg#locale.fr", data: localeDataFR },
      { name: "de", display: "msg#locale.de", data: localeDataDE },
    ];
    this.defaultLocale = this.locales[1];
  }
}
;
