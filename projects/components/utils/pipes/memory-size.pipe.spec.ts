import { ChangeDetectorRef } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { FormatService } from "@sinequa/core/app-utils";
import { IntlService, Locale, LocaleData, LocalesConfig, LOCALES_CONFIG } from "@sinequa/core/intl";
import { MemorySizePipe } from "./memory-size-pipe";

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
      this.defaultLocale = this.locales[0];
  }
}

describe("MemorySizePipe", () => {
  let pipe: MemorySizePipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        FormatService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        MemorySizePipe
      ]
    });

    pipe = TestBed.inject(MemorySizePipe);
  })

  it('transforms memory unit to ... (en-US)', () => {
    expect(pipe.transform(1)).toEqual("1 B");
    expect(pipe.transform(10)).toEqual("10 B");
    expect(pipe.transform(100)).toEqual("100 B");
    expect(pipe.transform(1_024)).toEqual("1 KB");

    expect(pipe.transform(Math.pow(1_024,2))).toEqual("1 MB");
    expect(pipe.transform(Math.pow(1_024,3))).toEqual("1 GB");
    expect(pipe.transform(Math.pow(1_024,4))).toEqual("1 TB");
    expect(pipe.transform(Math.pow(1_024,5))).toEqual("1 PB");
  })

  it('transforms memory unit to ... (french)', waitForAsync(() => {
    const service = TestBed.inject(IntlService);
    service.use("fr", false).subscribe(_ => {
      expect(pipe.transform(1)).toEqual("1 o");
      expect(pipe.transform(10)).toEqual("10 o");
      expect(pipe.transform(100)).toEqual("100 o");
      expect(pipe.transform(1_024)).toEqual("1 Ko");

      expect(pipe.transform(Math.pow(1_024,2))).toEqual("1 Mo");
      expect(pipe.transform(Math.pow(1_024,3))).toEqual("1 Go");
      expect(pipe.transform(Math.pow(1_024,4))).toEqual("1 To");
      expect(pipe.transform(Math.pow(1_024,5))).toEqual("1 Po");
    })
  }))
})