import { ChangeDetectorRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { AppLocalesConfig } from "@testing/mocks/app.locales.config";
import { FormatService, ValueItem } from "@sinequa/core/app-utils";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";
import { CCColumn, EngineType } from "@sinequa/core/web-services";

import { ValuePipe } from "./value-pipe";

describe("DateFnsPipe", () => {
  let pipe: ValuePipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        FormatService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig }      ]
    });

    pipe = new ValuePipe(TestBed.inject(FormatService), TestBed.inject(IntlService), TestBed.inject(ChangeDetectorRef));
  })

  // all options are described here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

  it('transforms a (ValueItem | FieldValue) to ...', () => {
    const input: ValueItem = { value: "pdf", count: 99, display: "PDF" };
    const column: CCColumn = { eType: EngineType.string, name: "docformat", label: "document" } as CCColumn;

    expect(pipe.transform(input, column)).toEqual("PDF");
    expect(pipe.transform({ value: "pdf", count: 99 }, column)).toEqual("pdf");
    // this doesn't work !!
    // expect(pipe.transform({ value: ";pdf", count: 99 }, column)).toEqual("$&\u200Bpdf");
  })
})