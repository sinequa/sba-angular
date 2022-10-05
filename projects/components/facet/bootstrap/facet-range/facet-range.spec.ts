import {CommonModule} from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Router} from '@angular/router';
import {NgxSliderModule} from '@angular-slider/ngx-slider';

import {IntlModule} from '@sinequa/core/intl';
import {EngineType, EngineTypeModifier, Results, START_CONFIG} from '@sinequa/core/web-services';
import {MODAL_LOGIN} from '@sinequa/core/login';
import {MODAL_CONFIRM, MODAL_PROMPT} from '@sinequa/core/modal';
import {AppService} from '@sinequa/core/app-utils';
import {UIService} from '@sinequa/components/utils';

import {RouterStub} from '@testing/stubs/router.stub';
import {AppLocalesConfig} from '@testing/mocks/app.locales.config';
import {startConfig} from "@testing/mocks/start.config";

import {BsFacetModule} from '../facet.module';
import {BsFacetRange} from './facet-range';


describe('BsFacetRange', () => {
  let context: BsFacetRange;
  let fixture: ComponentFixture<BsFacetRange>;

  function setModifiedAggregation() {
    context.results = {
      aggregations: [
        {
          "name": "ModifiedRange",
          "column": "modified",
          "items": [
            {
              "count": 120397,
              "operatorResults": {
                "min": "1901-01-01 00:00:00",
                "max": "2020-09-15 00:00:00"
              }
            }
          ]
        }
      ]
    } as unknown as Results;
    context.aggregation = "ModifiedRange";

    // fake getColumn() return value
    spyOn(context["appService"], "getColumn").and.returnValue({name: "modified", type: "date", eType: EngineType.date, eTypeModifier: EngineTypeModifier.none});
  }

  function setDoubleAggregation() {
    context.results = {
      aggregations: [
        {
          "name": "DoubleAggregation",
          "column": "Double",
          "items": [
            {
              "count": 120397,
              "operatorResults": {
                "min": -132.4,
                "max": 435.65
              }
            }
          ]
        }
      ]
    } as unknown as Results;
    context.aggregation = "DoubleAggregation";

    // fake getColumn() return value
    spyOn(context["appService"], "getColumn").and.returnValue({name: "double", type: "double", eType: EngineType.double, eTypeModifier: EngineTypeModifier.none});
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BsFacetRange],
      imports: [
        CommonModule,
        IntlModule.forRoot(AppLocalesConfig),
        BsFacetModule.forRoot(),
        NgxSliderModule
      ],
      providers: [
        AppService,
        UIService,
        {provide: Router, useClass: RouterStub},
        {provide: START_CONFIG, useValue: startConfig},
        {provide: MODAL_LOGIN, useValue: {}},
        {provide: MODAL_CONFIRM, useValue: {}},
        {provide: MODAL_PROMPT, useValue: {}},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsFacetRange);
    context = fixture.debugElement.componentInstance;
  });

  it('should be created', () => {
    expect(context).toBeTruthy();
  });

  it('should display dates range', () => {
    spyOn<any>(context, "init").and.callThrough();
    setModifiedAggregation();

    context.ngOnChanges({results: {previousValue: undefined, currentValue: undefined, firstChange: true, isFirstChange: () => true }});

    fixture.detectChanges();

    expect(context.initDone).toBeTrue();
    expect(context.data?.items).toBeDefined();
    expect(new Date(context.options.floor as number).toLocaleDateString("en-US")).toEqual("1/1/1901");
    expect(new Date(context.options.ceil as number).toLocaleDateString("en-US")).toEqual("9/15/2020");
    expect(context.options.step).toEqual(86400000);
    expect(new Date(context.value).toLocaleDateString("en-US")).toEqual("1/1/1901");
    expect(context["init"]).toHaveBeenCalledTimes(1);

  })

  it('should display new dates range when results changes', () => {
    spyOn<any>(context, "init").and.callThrough();
    setModifiedAggregation();

    expect(context.initDone).toBeUndefined();

    context.ngOnChanges({results: {previousValue: undefined, currentValue: undefined, firstChange: true, isFirstChange: () => true}});
    fixture.detectChanges();

    expect(context.initDone).toBeTrue();
    expect(context.data?.items).toBeDefined();
    expect(new Date(context.options.floor as number).toLocaleDateString("en-US")).toEqual("1/1/1901");
    expect(new Date(context.options.ceil as number).toLocaleDateString("en-US")).toEqual("9/15/2020");
    expect(context.options.step).toEqual(86400000);
    expect(new Date(context.value).toLocaleDateString("en-US")).toEqual("1/1/1901");

    // fake results changes
    context.results = {
      aggregations: [
        {
          "name": "ModifiedRange",
          "column": "modified",
          "items": [
            {
              "count": 120397,
              "operatorResults": {
                "min": "1974-09-02 00:00:00",
                "max": "2020-10-25 00:00:00"
              }
            }
          ]
        }
      ]
    } as unknown as Results;

    context.ngOnChanges({results: {previousValue: undefined, currentValue: undefined, firstChange: true, isFirstChange: () => true}});

    expect(context.initDone).toBeTrue();
    fixture.detectChanges();

    expect(new Date(context.options.floor as number).toLocaleDateString("en-US")).toEqual("9/2/1974");
    expect(new Date(context.options.ceil as number).toLocaleDateString("en-US")).toEqual("10/25/2020");
    expect(context.options.step).toEqual(86400000);
    expect(new Date(context.value).toLocaleDateString("en-US")).toEqual("9/2/1974");

    expect(context["init"]).toHaveBeenCalledTimes(2);

  })

  it("should handle number in min/max", () => {
    spyOn<any>(context, "parseValue").and.callThrough();

    setDoubleAggregation();

    context.min = 12;
    context.max = 23;

    context.ngOnChanges({results: {previousValue: undefined, currentValue: undefined, firstChange: true, isFirstChange: () => true }});
    fixture.detectChanges();

    expect(context["parseValue"]).toHaveBeenCalledTimes(2);
    expect(context.options.floor).toEqual(12);
    expect(context.options.ceil).toEqual(23);

  })

  it("should handle string in min/max", () => {
    spyOn<any>(context, "parseValue").and.callThrough();

    setDoubleAggregation();

    context.min = "12";
    context.max = "23";

    context.ngOnChanges({results: {previousValue: undefined, currentValue: undefined, firstChange: true, isFirstChange: () => true }});
    fixture.detectChanges();

    expect(context["parseValue"]).toHaveBeenCalledTimes(2);
    expect(context.options.floor).toEqual(12);
    expect(context.options.ceil).toEqual(23);

  })


  it("should handle date as string in min/max", () => {
    spyOn<any>(context, "parseValue").and.callThrough();

    setModifiedAggregation();

    context.min = "2010-01-01";
    context.max = "2020-12-31";

    context.ngOnChanges({results: {previousValue: undefined, currentValue: undefined, firstChange: true, isFirstChange: () => true }});
    fixture.detectChanges();

    expect(context["parseValue"]).toHaveBeenCalledTimes(2);
    expect(context.options.floor).toEqual(1262300400000);
    expect(context.options.ceil).toEqual(1609369200000);

  })


  it("should handle date as Date in min/max", () => {
    spyOn<any>(context, "parseValue").and.callThrough();

    setModifiedAggregation();

    context.min = new Date("2010-01-01");
    context.max = new Date("2020-12-31");

    context.ngOnChanges({results: {previousValue: undefined, currentValue: undefined, firstChange: true, isFirstChange: () => true }});
    fixture.detectChanges();

    expect(context["parseValue"]).toHaveBeenCalledTimes(2);
    expect(context.options.floor).toEqual(1262300400000);
    expect(context.options.ceil).toEqual(1609455600000);

  })

  it("should handle sizes (for non-date columns)", () => {
    spyOn<any>(context, "parseValue").and.callThrough();

    setDoubleAggregation();

    context.min = 0;
    context.max = "3kB";

    context.ngOnChanges({results: {previousValue: undefined, currentValue: undefined, firstChange: true, isFirstChange: () => true }});
    fixture.detectChanges();

    expect(context["parseValue"]).toHaveBeenCalledTimes(2);
    expect(context.options.floor).toEqual(0);
    expect(context.options.ceil).toEqual(3*1024);

  })

});
