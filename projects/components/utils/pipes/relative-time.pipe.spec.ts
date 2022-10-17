import { ChangeDetectorRef } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";

import { IntlService, Locale, LocaleData, LocalesConfig, LOCALES_CONFIG } from "@sinequa/core/intl";

import msgUS from "@sinequa/core/intl/messages/en";
import msgFR from "@sinequa/core/intl/messages/fr";

import { RelativeTimePipe } from "./relative-time-pipe";

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

describe("RelativeTimePipe", () => {
  let pipe: RelativeTimePipe;

  beforeEach(() => {
    jasmine.clock().mockDate(new Date(2022, 9, 1));
  })

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig }      ]
    });

    pipe = new RelativeTimePipe(TestBed.inject(IntlService), TestBed.inject(ChangeDetectorRef));
  })

  it('transforms a number to ... with i18n (en-US)', () => {
    const d = "2022-12-31";
    expect(pipe.transform(d, { unit: "month" })).toEqual("in 3 months");
    expect(pipe.transform(d, { unit: "month", style: 'long' })).toEqual("in 3 months");
    expect(pipe.transform(d, { unit: "month", style: 'long', numeric: "always" })).toEqual("in 3 months");
    expect(pipe.transform(d, { unit: "month", style: 'short' })).toEqual("in 3 mo.");
    expect(pipe.transform(d, { unit: "hour", style: 'short' })).toEqual("in 3 mo.");
    expect(pipe.transform(d, { unit: "week", style: 'short' })).toEqual("in 3 mo.");
    expect(pipe.transform(d, { unit: "week", numeric: "always" })).toEqual("in 3 months");
    expect(pipe.transform(d, { unit: "week", numeric: "auto" })).toEqual("in 3 months");
  })

  it('transforms a number to ... with i18n (french)', waitForAsync(() => {
    const service = TestBed.inject(IntlService);
    service.use("fr", false).subscribe(_ => {
      const d = "2022-12-31";
      expect(pipe.transform(d, { unit: "month" })).toEqual("dans 3 mois");
      expect(pipe.transform(d, { unit: "month", style: 'long' })).toEqual("dans 3 mois");
      expect(pipe.transform(d, { unit: "month", style: 'long', numeric: "always" })).toEqual("dans 3 mois");
      expect(pipe.transform(d, { unit: "month", style: 'short' })).toEqual("dans 3 m.");
      expect(pipe.transform(d, { unit: "hour", style: 'short' })).toEqual("dans 3 m.");
      expect(pipe.transform(d, { unit: "week", style: 'short' })).toEqual("dans 3 m.");
      expect(pipe.transform(d, { unit: "week", numeric: "always" })).toEqual("dans 3 mois");
      expect(pipe.transform(d, { unit: "week", numeric: "auto" })).toEqual("dans 3 mois");
      })
  }))
})