import {CommonModule} from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Router} from '@angular/router';
import {NgxSliderModule} from '@angular-slider/ngx-slider';

import {IntlModule, IntlService} from '@sinequa/core/intl';
import {START_CONFIG} from '@sinequa/core/web-services';
import {MODAL_LOGIN} from '@sinequa/core/login';

import {RouterStub} from '@testing/stubs/router.stub';
import {AppLocalesConfig} from '@testing/mocks/app.locales.config';
import {startConfig} from "@testing/mocks/start.config";

import {MODAL_CONFIRM, MODAL_PROMPT} from '@sinequa/core/modal';
import {AppService} from '@sinequa/core/app-utils';
import {UIService} from '@sinequa/components/utils';

import { BsFacetModule } from '@sinequa/components/facet';
import { BsDateRangePicker } from './date-range-picker';

describe('BsFacetRange', () => {
  let context: BsDateRangePicker;
  let fixture: ComponentFixture<BsDateRangePicker>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BsDateRangePicker],
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
    fixture = TestBed.createComponent(BsDateRangePicker);
    context = fixture.debugElement.componentInstance;
    context.ngOnInit();
  });

  it('should be created', () => {
    expect(context).toBeTruthy();
  });

  it('should display dates format (en-US)', () => {
    expect(fixture.componentInstance.dateFormat).toEqual("MM/DD/YYYY");
  })

  it('should display date sytem date format', () => {
    fixture.componentInstance.options = { system: true };
    expect(fixture.componentInstance.dateFormat).toEqual("YYYY-MM-DD");
  })

  it('should display specific date format (french)', waitForAsync(() => {
    const service: IntlService = TestBed.inject(IntlService);
    service.use("fr", false).subscribe(_ => {
      expect(fixture.componentInstance.dateFormat).toEqual('DD/MM/YYYY');
    })
  }))

  it('should set a dates range', () => {
    // range MUST start from min to max dates
    const dates = [new Date("2022-12-01 15:16:36"), new Date("2022-12-31 15:18:36")];
    fixture.componentInstance.setValue(dates);

    // 💊 month are 0 indexed: 11 = December
    // time informations are removed
    expect(fixture.componentInstance.value).toEqual([new Date(2022, 11, 1), new Date(2022, 11, 31)]);
    // when options.minDate and options.maxDate are undefined returns
    // minDate = range[0]
    // maxDate = range[1]
    expect(fixture.componentInstance.maxDate).toEqual(new Date(2022,11,31));
    expect(fixture.componentInstance.minDate).toEqual(new Date(2022,11,1));
  })

  it('should set a dates range with "closedRange" flag', () => {
    // range MUST start from min to max dates
    const dates = [new Date("2022-12-01 15:16:36"), new Date("2022-12-31 15:18:36")];
    fixture.componentInstance.options = {
      closedRange: true,
      minDate: new Date('2022-01-01'),
      maxDate: new Date('2022-11-31')
    };
    fixture.componentInstance.setValue(dates);

    // 💊 month are 0 indexed: 11 = December
    // time informations are removed
    expect(fixture.componentInstance.value).toEqual([new Date(2022, 11, 1), new Date(2022, 11, 31)]);
    // undefined expect if options.min
    expect(fixture.componentInstance.maxDate).toBeUndefined();
    expect(fixture.componentInstance.minDate).toBeUndefined();

  })
});
