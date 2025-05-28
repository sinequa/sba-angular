import { OverlayModule } from "@angular/cdk/overlay";
import { HttpHandler } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ChangeDetectorRef } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FormatService } from "@sinequa/core/app-utils";
import { IntlService, Locale, LocaleData, LocalesConfig, LOCALES_CONFIG } from "@sinequa/core/intl";
import { MODAL_LOGIN } from "@sinequa/core/login";
import { MODAL_CONFIRM, MODAL_PROMPT } from "@sinequa/core/modal";
import { START_CONFIG } from "@sinequa/core/web-services";

import { SelectionService, SELECTION_OPTIONS } from "../selection";
import { defaultLabelComponents } from "./bootstrap";
import { LabelPipe } from "./label.pipe";
import { LabelsService, LABELS_COMPONENTS } from "./labels.service";

import msgUS from "./messages/en";
import msgFR from "./messages/fr";

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

describe("LabelPipe", () => {
  let pipe: LabelPipe;
  let service: IntlService;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OverlayModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
        HttpHandler,
        IntlService,
        FormatService,
        LabelsService,
        SelectionService,
        { provide: LABELS_COMPONENTS, useValue: defaultLabelComponents },
        { provide: SELECTION_OPTIONS, useValue: {} },
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        { provide: START_CONFIG, useValue: { app: "testing_app" } },
        { provide: MODAL_LOGIN, useValue: "MODAL_LOGIN" },
        { provide: MODAL_CONFIRM, useValue: "MODAL_CONFIRM" },
        { provide: MODAL_PROMPT, useValue: "MODAL_PROMPT" },
        LabelPipe,
      ]
    });

    service = TestBed.inject(IntlService);
    service.init();

    pipe = TestBed.inject(LabelPipe);
  }))

  it('transforms an error message ... with i18n (en-US)', () => {
    // This pipe has the same behavior of a Message Pipe !?
    expect(pipe.transform("msg#labels.removePublicLabelTitle", true)).toEqual("Remove public label");
    expect(pipe['lastValue']).toEqual('msg#labels.removePublicLabelTitle');
    expect(pipe['lastParams']).toEqual(true);
    expect(pipe.transform("abc", false)).toEqual("abc");
  })

  it('transforms an error message ... with i18n (french)', waitForAsync(() => {
    service.use("fr", false).subscribe(_ => {
      expect(pipe.transform("msg#labels.removePublicLabelTitle", true)).toEqual("Supprimer le libellé public");
      expect(pipe.transform("msg#labels.removePublicLabelTitle", false)).toEqual("Supprimer le libellé public");
      expect(pipe['lastValue']).toEqual('msg#labels.removePublicLabelTitle');
      expect(pipe['lastParams']).toEqual(false);
      expect(pipe.transform("abc", true)).toEqual("abc");
    })
  }))
})