import { ChangeDetectorRef } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { IntlService, Locale, LocaleData, LocalesConfig, LOCALES_CONFIG } from "@sinequa/core/intl";

import msgUS from "@sinequa/core/intl/messages/en";
import msgFR from "@sinequa/core/intl/messages/fr";

import { TimePipe } from "./time-pipe";

const localeDataFR: LocaleData = {
  intl: {
    locale: 'fr-FR'
  },
  messages: msgFR
}
const localeDataEN: LocaleData = {
  intl: {
    locale: 'en-US'
  },
  messages: msgUS
}
const localeDataDE: LocaleData = {
  intl: {
    locale: 'de-DE'
  },
  messages: {}
}

class AppLocalesConfig implements LocalesConfig {
  defaultLocale: Locale;
  locales?: Locale[];
  constructor(){
      this.locales = [
          { name: "en", display: "msg#locale.en", data: localeDataEN },
          { name: "fr", display: "msg#locale.fr", data: localeDataFR },
          { name: "de", display: "msg#locale.de", data: localeDataDE },
      ];
      this.defaultLocale = this.locales[1];
  }
}

describe("TimePipe", () => {
  let pipe: TimePipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig }      ]
    });

    pipe = new TimePipe(TestBed.inject(IntlService), TestBed.inject(ChangeDetectorRef));
  })

  // all options are described here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

  it('transforms a number to ... with i18n (en-US)', () => {
    // 2022-12-31 15:18:36
    const d = new Date(2022, 31, 12, 15, 18, 36);
    expect(pipe.transform(d)).toEqual("3:18 PM");
    expect(pipe.transform(d, { timeZoneName: "short", calendar: "buddhist" })).toEqual("3:18 PM GMT+2");
  })

  it('transforms a number to ... with i18n (french)', waitForAsync(() => {
    const service = TestBed.inject(IntlService);
    service.use("fr", false).subscribe(_ => {
      const d = new Date(2022, 31, 12, 15, 18, 36);
      expect(pipe.transform(d)).toEqual("15:18");
      expect(pipe.transform(d, { timeZoneName: "short", calendar: "buddhist" })).toEqual("15:18 UTC+2");
    })
  }))
})