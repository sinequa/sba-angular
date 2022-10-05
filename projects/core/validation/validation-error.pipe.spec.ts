import { ChangeDetectorRef } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { IntlService, Locale, LocaleData, LocalesConfig, LOCALES_CONFIG } from "../intl/intl.service";
import { ValidationErrorPipe } from "./validation-error.pipe";
import { ValidationService } from "./validation.service";

import msgUS from "./messages/en";
import msgFR from "./messages/fr";
import { FormatService } from "../app-utils";

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

describe("ValidationErrorPipe", () => {
  let pipe: ValidationErrorPipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
        IntlService,
        FormatService,
        ValidationService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig }      ]
    });

    pipe = new ValidationErrorPipe(TestBed.inject(IntlService), TestBed.inject(ChangeDetectorRef), TestBed.inject(ValidationService));
  })

  it('transforms an error message ... with i18n (en-US)', () => {
    // key comes from validation service: errorMessagesMap
    expect(pipe.transform({ requiredTrue: "" })).toEqual("This field must be set");
    expect(pipe.transform({ min: { min: 100 } })).toEqual("The value must be at least 100");
    // plural
    expect(pipe.transform({ minlength: {requiredLength: 123} })).toEqual("The value must have at least 123 characters");
    expect(pipe.transform({ minlength: {requiredLength: 1} })).toEqual("The value must have at least 1 character");
  })

  it('transforms an error message ... with i18n (french)', waitForAsync(() => {
    const service = TestBed.inject(IntlService);
    service.use("fr", false).subscribe(_ => {
      // key comes from validation service: errorMessagesMap
      expect(pipe.transform({ requiredTrue: "" })).toEqual("Ce champ doit être positionné");
      expect(pipe.transform({ min: { min: 100 } })).toEqual("La valeur doit être supérieure ou égale à 100");
      // plural
      expect(pipe.transform({ minlength: {requiredLength: 123} })).toEqual("La valeur doit comporter au moins 123 caractères");
      expect(pipe.transform({ minlength: {requiredLength: 1} })).toEqual("La valeur doit comporter au moins 1 caractère");
    })
  }))
})