import {CommonModule} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {Ng5SliderModule} from 'ng5-slider';

import {IntlModule} from '@sinequa/core/intl';
import {EngineType, EngineTypeModifier, Results, START_CONFIG} from '@sinequa/core/web-services';
import {MODAL_LOGIN} from '@sinequa/core/login';

import {RouterStub} from '@testing/stubs/router.stub';
import {AppLocalesConfig} from '@testing/mocks/app.locales.config';
import {startConfig} from "@testing/mocks/start.config";

import {BsFacetModule} from '../facet.module';
import {BsFacetRange} from './facet-range';
import {MODAL_CONFIRM, MODAL_PROMPT} from '@sinequa/core/modal';
import {RESULTS_COVID} from '@testing/mocks/results-covid';
import {AppService} from '@sinequa/core/app-utils';
import {UIService} from '@sinequa/components/utils';

describe('BsFacetRange', () => {
  let context: BsFacetRange;
  let fixture: ComponentFixture<BsFacetRange>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BsFacetRange],
      imports: [
        CommonModule,
        IntlModule.forRoot(AppLocalesConfig),
        BsFacetModule.forRoot(),
        Ng5SliderModule
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
    context.results = RESULTS_COVID as unknown as Results;
    context.aggregation = "ModifiedRange";

    // fake getColumn() return value
    spyOn(context["appService"], "getColumn").and.returnValue({name: "modified", type: "date", eType: EngineType.date, eTypeModifier: EngineTypeModifier.none});
  });

  it('should be created', () => {
    expect(context).toBeTruthy();
  });

  it('should display dates range', () => {
    spyOn<any>(context, "init").and.callThrough();
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

});