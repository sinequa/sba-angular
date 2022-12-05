import { ChangeDetectorRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { AppLocalesConfig } from "@testing/mocks/app.locales.config";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";

import { DatePipe } from "./date-pipe";

describe("DatePipe", () => {
  let pipe: DatePipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        DatePipe,
      ]
    });

    pipe = TestBed.inject(DatePipe);
  })

  it('transforms "2022-12-31" to ... with i18n', () => {
    const d = "2022-12-31";
    expect(pipe.transform(d, { dateStyle: 'short' })).toEqual("12/31/22");

  })
})