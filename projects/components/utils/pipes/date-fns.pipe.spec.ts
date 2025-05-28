import { ChangeDetectorRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { IntlService, Locale, LocaleData, LocalesConfig, LOCALES_CONFIG } from "@sinequa/core/intl";
import { DateFnsPipe } from "./date-fns.pipe"

const localeDataFR: LocaleData = {
  intl: {
    locale: 'fr-FR'
  },
  messages: {}
}
const localeDataEN: LocaleData = {
  intl: {
    locale: 'en-US'
  },
  messages: {}
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
  constructor() {
    this.locales = [
      { name: "en", display: "msg#locale.en", data: localeDataEN },
      { name: "fr", display: "msg#locale.fr", data: localeDataFR },
      { name: "de", display: "msg#locale.de", data: localeDataDE },
    ];
    this.defaultLocale = this.locales[0];
  }
}

describe("DateFnsPipe", () => {
  let pipe: DateFnsPipe;
  let service: IntlService;

  beforeEach(() => {
    jasmine.clock().mockDate(new Date(2022, 9, 1));
  })

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
        IntlService,
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        DateFnsPipe
      ]
    });

    // first init IntlService to en-US locale (default)
    service = TestBed.inject(IntlService);
    service.init();

    pipe = TestBed.inject(DateFnsPipe);
  })

  it('transforms "2022-12-31" to ... with i18n', () => {
    const d = "2022-12-31";
    const d1 = "2022-12-30";

    // Beware, if "format" is set, others options are not processed
    expect(service.currentLocale.name).toEqual("en");

    // format
    expect(pipe.transform(d, { format: "MMMM yyyy" })).toEqual("December 2022");
    // fromNow
    expect(pipe.transform(d, { type: "fromNow" })).toEqual("in 3 months");
    expect(pipe.transform(d, { type: "fromNow", suffix: false })).toEqual("3 months");
    // from
    expect(pipe.transform(d, { type: 'from', reference: d1 })).toEqual("in 1 day");
    // to
    expect(pipe.transform(d, { type: 'to', reference: d1 })).toEqual('1 day ago');
    // calendar
    expect(pipe.transform(d, { type: 'calendar', reference: d1 })).toEqual('tomorrow at 12:00 AM');
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

    expect(pipe.transform(d, { type: 'diff', unit: "weeks", reference: d1 })).toEqual("4");

    const r = "2030-01-01";
    const r1 = "2022-01-01";
    // should returns 8 years between the two dates
    expect(pipe.transform(r, { type: 'diff', unit: 'year', reference: r1 })).toEqual('8');
    expect(pipe.transform(r, { type: 'diff', unit: 'years', reference: r1 })).toEqual('8');

    expect(pipe.transform(d, { type: 'diff', unit: 'hour', reference: d1 })).toEqual("744");
    expect(pipe.transform(d, { type: 'diff', unit: "minutes", reference: d1 })).toEqual("44640");
    expect(pipe.transform(d, { type: 'diff', unit: "seconds", reference: d1 })).toEqual("2678400");
  })
})