import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";

import { SearchService } from "@sinequa/components/search";
import { Record } from "@sinequa/core/web-services";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";

import { AppLocalesConfig } from "@testing/mocks/app.locales.config";
import { SearchServiceFactory } from "@testing/factories";
import { RouterStub } from "@testing/stubs";

import { MoneyDatum, MoneyTimelineComponent } from "./money-timeline.component"

import * as d3 from 'd3';
export default d3;

describe('MoneyTimelineComponent', () => {
  let context: MoneyTimelineComponent;
  let fixture: ComponentFixture<MoneyTimelineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MoneyTimelineComponent],
      imports: [],
      providers: [
        {provide: IntlService, useFactory: () => {}},
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        { provide: SearchService, useFactory: SearchServiceFactory },
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTimelineComponent);
    context = fixture.debugElement.componentInstance;
  })

  it('should be created', () => {
    expect(context).toBeDefined();
  })

  describe('parseEntity()', () => {
    it('should return a MoneyDatum object', () => {
      // ATTENTION: with new Date(), month is 0-indexed
      const record = { modified: "2022-12-31" } as Record;
      const expected: MoneyDatum = {
        value: 1000,
        currency: "USD",
        date: new Date(2022,11,31),
        count: 3,
        rawvalue: "USD 1000",
        record: record
      }
      expect(fixture.componentInstance.parseEntity("USD 1000", record, 3)).toEqual(expected);
    })
  })
})
