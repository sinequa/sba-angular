import { ChangeDetectorRef } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { IntlService, Locale, LocaleData, LocalesConfig, LOCALES_CONFIG } from "@sinequa/core/intl";
import { NumberPipe } from "./number-pipe";

import msgUS from "@sinequa/core/intl/messages/en";
import msgFR from "@sinequa/core/intl/messages/fr";

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

describe("NumberPipe", () => {
  let pipe: NumberPipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        NumberPipe
      ]
    });

    pipe = TestBed.inject(NumberPipe);
  })

  it('transforms a number to ... with i18n (en-US)', () => {
    expect(pipe.transform(123.01)).toEqual("123.01");
    expect(pipe.transform(123_456)).toEqual("123,456");
    expect(pipe.transform(123_456_000)).toEqual("123,456,000");

    // when input is a string, transform returns the input
    expect(pipe.transform("123456")).toEqual("123456");
  })

  it('transforms a number to ... with i18n (french)', waitForAsync(() => {
    const service = TestBed.inject(IntlService);
    service.use("fr", false).subscribe(_ => {
      expect(pipe.transform(123.01)).toEqual("123,01");
      // beware, in fench, as specail space character is set instead of a simple space
      expect(pipe.transform(123_456)).toEqual('123 456');
      expect(pipe.transform(123_456_000)).toEqual("123 456 000");

      // when input is a string, transform returns the input
      expect(pipe.transform("123456")).toEqual("123456");
    })
  }))
})