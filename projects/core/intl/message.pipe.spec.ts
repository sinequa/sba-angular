import { ChangeDetectorRef } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { IntlService, Locale, LocaleData, LocalesConfig, LOCALES_CONFIG } from "./intl.service";
import { MessagePipe } from "./message.pipe";

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

describe("MessagePipe", () => {
  let pipe: MessagePipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig }      ]
    });

    pipe = new MessagePipe(TestBed.inject(IntlService), TestBed.inject(ChangeDetectorRef));
  })

  it('transforms message to ... with i18n (en-US)', () => {
    expect(pipe.transform("hello world")).toEqual("hello world");
    expect(pipe.transform("msg#error.serverError")).toEqual("Server error");
    expect(pipe.transform('msg#system.memorySize.bytes', {value: 100})).toEqual("100 B");
  })

  it('transforms message to ... with i18n (french)', waitForAsync(() => {
    const service = TestBed.inject(IntlService);
    service.use("fr", false).subscribe(_ => {
        expect(pipe.transform("hello world")).toEqual("hello world");
        expect(pipe.transform("msg#error.serverError")).toEqual("Erreur de serveur");
        expect(pipe.transform('msg#system.memorySize.bytes', {value: 100})).toEqual("100 o");
      })
  }))
})