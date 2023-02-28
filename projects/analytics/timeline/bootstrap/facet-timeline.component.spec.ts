import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { HttpHandler } from "@angular/common/http";

import { FirstPageService, SearchService } from "@sinequa/components/search";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";
import { AggregationItem, Results, START_CONFIG } from "@sinequa/core/web-services";
import { SelectionService, SELECTION_OPTIONS } from "@sinequa/components/selection";

import { AppLocalesConfig } from "@testing/mocks/app.locales.config";
import { SearchServiceFactory } from "@testing/factories";
import { RouterStub } from "@testing/stubs";

import { BsFacetTimelineComponent, TimelineRecords } from "./facet-timeline.component";

describe('BsFacetTimelineComponent', () => {
  let context: BsFacetTimelineComponent;
  let fixture: ComponentFixture<BsFacetTimelineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BsFacetTimelineComponent],
      imports: [],
      providers: [
        HttpHandler,
        {provide: IntlService, useFactory: () => {}},
        SelectionService,
        { provide: START_CONFIG, useValue: { app: "testing_app" } },
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        { provide: SELECTION_OPTIONS, useValue: {} },
        { provide: SearchService, useFactory: SearchServiceFactory },
        { provide: FirstPageService, useFactory: () => {}},
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsFacetTimelineComponent);
    context = fixture.debugElement.componentInstance;
  })

  it('should be created', () => {
    expect(context).toBeDefined();
  })

  describe("createDatapoints()", () => {
    it('should returns a TimeLine array', () => {
      const items: AggregationItem[] = [
        { value: '2020-W33', count: 27 },
        { value: '2020-W34', count: 11516 },
        { value: '2020-W35', count: 22967 },
        { value: '2020-W36', count: 39635 },
        { value: '2020-W43', count: 1 },
        { value: '2020-W44', count: 36802 },
        { value: '2020-W50', count: 682 },
        { value: '2020-W51', count: 783 },
      ];

      const expected = [
        { date: new Date("2020-08-06T10:00:00.000Z"), value: 0 },
        { date: new Date("2020-08-13T10:00:00.000Z"), value: 27 },
        { date: new Date("2020-08-20T10:00:00.000Z"), value: 11516 },
        { date: new Date("2020-08-27T10:00:00.000Z"), value: 22967 },
        { date: new Date("2020-09-03T10:00:00.000Z"), value: 39635 },
        { date: new Date("2020-09-10T10:00:00.000Z"), value: 0 },
        { date: new Date("2020-10-15T10:00:00.000Z"), value: 0 },
        { date: new Date("2020-10-22T10:00:00.000Z"), value: 1 },
        { date: new Date("2020-10-29T11:00:00.000Z"), value: 36802 },
        { date: new Date("2020-11-05T11:00:00.000Z"), value: 0 },
        { date: new Date("2020-12-03T11:00:00.000Z"), value: 0 },
        { date: new Date("2020-12-10T11:00:00.000Z"), value: 682 },
        { date: new Date("2020-12-17T11:00:00.000Z"), value: 783 },
        { date: new Date("2020-12-24T11:00:00.000Z"), value: 0 },
      ];

      const results = BsFacetTimelineComponent.createDatapoints(items, 'YYYY-WW');
      expect(results.length).toEqual(expected.length);

      for (let i = 0; i < results.length; i++) {
        expect(results[i].value).toEqual(expected[i].value);
        expect(results[i].date).toEqual(expected[i].date);
      }
    })
  })

  describe("getRecordsAsEvents()", () => {
    it("should returns a TimelineEvent array", () => {
      const config: TimelineRecords = { field: "modified" };

      fixture.componentInstance.results = {
        records: [
          {
              "id": "/Web/Huffpost/|https://www.huffpost.com/entry/black-women-coronavirus-deaths-white-men_n_606e069ac5b6034a70840b16",
              "modified": "2021-05-11 10:28:06",
              "title": "Black Women Died From Coronavirus At Far Higher Rates Than White Men: Study | HuffPost"
          },
          {
              "id": "/Web/Huffpost/|https://www.huffpost.com/entry/kevin-mccarthy-says-he-backs-ousting-liz-cheney-from-role_n_6098286de4b05bee44cb89da",
              "modified": "2021-05-11 10:28:05",
              "title": "House GOP Leader Kevin McCarthy Says He Backs Ousting Liz Cheney From Role | HuffPost"
          },
          {
              "id": "/Web/Huffpost/|https://www.huffpost.com/entry/liz-cheney-kevin-mccarthy-gop_n_6091638ae4b0ccb91c36a937",
              "modified": "2021-05-11 10:28:04",
              "title": "House Republicans Try To Cancel Liz Cheney For Telling Truth About Election | HuffPost"
          }
      ]
      } as Results;

      const expected = [
        {
          "id": "/Web/Huffpost/|https://www.huffpost.com/entry/black-women-coronavirus-deaths-white-men_n_606e069ac5b6034a70840b16",
          "date": new Date("2021-05-11T08:28:06.000Z"),
          "display": "Black Women Died From Coronavirus At Far Higher Rates Than White Men: Study | HuffPost",
          "size": 6,
          "styles": {
            "fill": "green"
          }
        },
        {
          "id": "/Web/Huffpost/|https://www.huffpost.com/entry/kevin-mccarthy-says-he-backs-ousting-liz-cheney-from-role_n_6098286de4b05bee44cb89da",
          "date": new Date("2021-05-11T08:28:05.000Z"),
          "display": "House GOP Leader Kevin McCarthy Says He Backs Ousting Liz Cheney From Role | HuffPost",
          "size": 6,
          "styles": {
            "fill": "green"
          }
        },
        {
          "id": "/Web/Huffpost/|https://www.huffpost.com/entry/liz-cheney-kevin-mccarthy-gop_n_6091638ae4b0ccb91c36a937",
          "date": new Date("2021-05-11T08:28:04.000Z"),
          "display": "House Republicans Try To Cancel Liz Cheney For Telling Truth About Election | HuffPost",
          "size": 6,
          "styles": {
            "fill": "green"
          }
        }
      ];

      const results = fixture.componentInstance.getRecordsAsEvents(config);
      expect(results.length).toEqual(expected.length);

      for (let i = 0; i < results.length; i++) {
        expect(results[i].id).toEqual(expected[i].id);
        expect(results[i].date).toEqual(expected[i].date);
        expect(results[i].display).toEqual(expected[i].display);
        expect(results[i].size).toEqual(expected[i].size);
        expect(results[i].styles?.fill).toEqual(expected[i].styles.fill);
      }

    })
  })

})
