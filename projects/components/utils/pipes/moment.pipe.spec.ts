import { ChangeDetectorRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { AppLocalesConfig } from "@testing/mocks/app.locales.config";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";

import { MomentPipe } from "./moment-pipe";

describe("MomentPipe", () => {
  let pipe: MomentPipe;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}} },
        IntlService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig }      ]
    });

    // first init IntlService to en-US locale (default)
    const service = TestBed.inject(IntlService);
    service.init();

    pipe = new MomentPipe(TestBed.inject(IntlService), TestBed.inject(ChangeDetectorRef));
  })

  it('transforms "2022-12-31" to ... with i18n', () => {
    const d = "2022-12-31";
    const d1 = "2022-12-30";

    // Beware, if "format" is set, others options are not processed

    // format
    expect(pipe.transform(d, { format: "MMMM yyyy" })).toEqual("December 2022");
    // fromNow
    expect(pipe.transform(d, { type: "fromNow" })).toEqual("in 3 months");
    expect(pipe.transform(d, { type: "fromNow", suffix: false })).toEqual("in 3 months");
    // from
    expect(pipe.transform(d, { type: 'from', reference: d1 })).toEqual("in a day");
    // to
    expect(pipe.transform(d, { type: 'to', reference: d1 })).toEqual('a day ago');
    // calendar
    expect(pipe.transform(d, { type: 'calendar', reference: d1 })).toEqual('Tomorrow at 12:00 AM');
    // valueOf
    expect(pipe.transform(d, { type: 'valueOf' })).toEqual('1672441200000');
    // unix
    expect(pipe.transform(d, { type: 'unix' })).toEqual('1672441200');
    // dayInMonths
    expect(pipe.transform(d, { type: 'daysInMonth' })).toEqual('31');
    // iso
    expect(pipe.transform(d, { type: 'iso' })).toEqual('2022-12-30T23:00:00.000Z');

    // iso with timeZone overrides
    spyOn(Intl, 'DateTimeFormat').and.returnValue(({ resolvedOptions: () => ({ timeZone: 'Asia/Tokyo' }) } as unknown as any));
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toEqual('Asia/Tokyo');
    expect(pipe.transform(d, { type: 'iso' })).toEqual('2022-12-30T23:00:00.000Z');

    // remove previous spy to restore the real behavior
    jasmine.getEnv().allowRespy(true);
    spyOn(Intl, 'DateTimeFormat').and.callThrough();
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toEqual('Europe/Paris');
  })

  it('transforms "2022-12-31" to ... with type = "diff"', () => {
    const d = "2023-01-31";
    const d1 = "2022-12-31";

    // diff with various "unit" args
    // 31 days between the two dates
    expect(pipe.transform(d, { type: 'diff', unit: 'day', reference: d1 })).toEqual('31');
    expect(pipe.transform(d, { type: 'diff', unit: 'days', reference: d1 })).toEqual('31');

    // 1 years between the two dates
    expect(pipe.transform(d, { type: 'diff', unit: 'month', reference: d1 })).toEqual('1');
    expect(pipe.transform(d, { type: 'diff', unit: 'months', reference: d1 })).toEqual('1');

    const r = "2030-01-01";
    const r1 = "2022-01-01";
    // should returns 8 years between the two dates
    expect(pipe.transform(r, { type: 'diff', unit: 'year', reference: r1 })).toEqual('8');
    expect(pipe.transform(r, { type: 'diff', unit: 'years', reference: r1 })).toEqual('8');

    // not supported "unit" returns an empty string
    expect(pipe.transform(d, { type: 'diff', unit: 'hour', reference: d1 })).toEqual("744");
  })
})