import { ChangeDetectorRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { AppLocalesConfig } from "@testing/mocks/app.locales.config";
import { ExprBuilder } from "@sinequa/core/app-utils";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";

import { ExprPipe } from "./expr-pipe";

describe("ExprPipe", () => {
  let pipe: ExprPipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig }      ]
    });

    pipe = new ExprPipe(TestBed.inject(IntlService), TestBed.inject(ChangeDetectorRef));
  })

  it('transforms an Expression to it\' string representation', () => {
    // missing some context informations to properly works as expected
    const exp = new ExprBuilder().makeExpr("person", "obama", "Barack Obama");
    expect(pipe.transform(exp, {})).toEqual("person`Barack Obama`: `obama`");
    expect(pipe.transform(exp, { useDisplay: true })).toEqual("person`Barack Obama`: `obama`");
    expect(pipe.transform(exp, { useDisplay: false })).toEqual("person`Barack Obama`: `obama`");

    expect(pipe.transform(exp, { withFields: true })).toEqual("person`Barack Obama`: `obama`");

    const exp1 = new ExprBuilder().makeExpr("person", "obama");
    expect(pipe.transform(exp1, { useDisplay: true })).toEqual("person: `obama`");
    expect(pipe.transform(exp1, { useDisplay: false })).toEqual("person: `obama`");
  })

  it('transforms a string expression to HTML', () => {
    const exp = "age >= 18";
    expect(pipe.transform(exp, { asHTML: true })).toEqual("age &gt;= 18");
  })
})