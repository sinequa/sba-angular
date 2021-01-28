import {TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";

import {AuditWebService, QueryWebService, Results, Tab} from "@sinequa/core/web-services";
import {AppService, FormatService, Query} from "@sinequa/core/app-utils";
import {NotificationsService} from "@sinequa/core/notification";
import {LoginService} from "@sinequa/core/login";
import {IntlService} from "@sinequa/core/intl";

import {AuditWebServiceFactory, LoginServiceFactory, NotificationsServiceFactory, QueryWebServiceFactory} from '@testing/factories';
import {RouterStub} from '@testing/stubs';

import {BreadcrumbsItem, Breadcrumbs} from "../search/breadcrumbs";
import {SearchService} from "../search/search.service";

describe("SearchService", () => {
  let service: SearchService;
  beforeEach(() => {

    const appServiceStub = {
      events: {subscribe: f => f},
      ccquery: {
        name: "ccquery_name",
        tabSearch: {tabs: {find: () => ({})}},
        allowEmptySearch: false
      },
      defaultCCQuery: {name: "default_ccquery_name"},
      getCCQuery: name => ({name: "def"}),
      parseExpr: expression => ({field: {}, value: {}, not: {}})
    };

    TestBed.configureTestingModule({
      providers: [
        SearchService,
        {provide: Router, useClass: RouterStub},
        {provide: QueryWebService, useFactory: QueryWebServiceFactory},
        {provide: AuditWebService, useFactory: AuditWebServiceFactory},
        {provide: AppService, useValue: appServiceStub},
        {provide: FormatService, useValue: {}},
        {provide: NotificationsService, useFactory: NotificationsServiceFactory},
        {provide: LoginService, useFactory: LoginServiceFactory},
        {provide: IntlService, useValue: {}}
      ]
    });

    service = TestBed.inject(SearchService);
    spyOn<any>(service, "handleLogin");
    spyOn<any>(service, "handleNavigation");
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
    expect(service.results).toBeUndefined();
    expect(service.breadcrumbs).toBeUndefined();
    expect(service['options'].routes).toEqual(["search"]);

    expect(service["handleLogin"]).not.toHaveBeenCalled();
    expect(service["handleNavigation"]).not.toHaveBeenCalled();
  });

  describe("setQuery", () => {
    it("should sent event 'new-query'", () => {
      spyOn<any>(service['_events'], "next");
      const query: Query = new Query("abc");

      service.setQuery(query);
      expect(service['_events'].next).toHaveBeenCalledWith({type: "new-query", query});
      expect((service["_query"] as any).name).toEqual("def");
    });

    it("should sent event 'new-query' with prevents name changes and returns ccquery", () => {
      spyOn<any>(service['_events'], "next");
      const query: Query = new Query("abc");

      // When preventQueryNameChanges is true
      service["options"].preventQueryNameChanges = true;

      // Then
      service.setQuery(query);
      expect(service['_events'].next).toHaveBeenCalledWith({type: "new-query", query});
      expect((service["_query"] as any).name).toEqual("ccquery_name");
    });

    it("should sent event 'new-query' with prevents name changes and returns default ccquery", () => {
      spyOn<any>(service['_events'], "next");
      const query: Query = new Query("abc");
      const appService = TestBed.inject(AppService);
      appService.ccquery = undefined;

      // When preventQueryNameChanges is true
      service["options"].preventQueryNameChanges = true;

      // Then
      service.setQuery(query);
      expect(service['_events'].next).toHaveBeenCalledWith({type: "new-query", query});
      expect((service["_query"] as any).name).toEqual("default_ccquery_name");
    });

    it("should sent event 'new-query' and returns defaultCCQuery when query is not found", () => {
      spyOn<any>(service['_events'], "next");
      const query: Query = new Query("abc");
      const appService = TestBed.inject(AppService);
      spyOn(appService, "getCCQuery").and.returnValue(undefined);

      // Then
      service.setQuery(query);
      expect(service['_events'].next).toHaveBeenCalledWith({type: "new-query", query});
      expect((service["_query"] as any).name).toEqual("default_ccquery_name");
    });

  })

  describe("selectBreadcrumbsItem", () => {
    it("should set query from BreadcrumpsItem and perfrom a search action", () => {
      const breadcrumbsItemStub: BreadcrumbsItem = <any>{};
      const query: Query = <Query>{name: "abc", action: "search", toJsonForQueryString: () => ""};
      service.breadcrumbs = {
        selectItem: (item) => query,
        removeItem: (item) => item,
        items: [breadcrumbsItemStub],
        query: query
      } as Breadcrumbs;
      service['options'].homeRoute = "home";

      spyOn(service, "setQuery").and.callThrough();
      spyOn(service, "search").and.callThrough();

      service.selectBreadcrumbsItem(breadcrumbsItemStub);

      expect(service.setQuery).toHaveBeenCalledWith(query, false);
      expect(service.search).toHaveBeenCalledWith({reuseBreadcrumbs: true});
    });
  });

  describe("removeBreadcrumbsItem", () => {
    it("should clear query and navigate to 'home'", () => {
      const breadcrumbsItemStub: BreadcrumbsItem = <any>{};
      service.breadcrumbs = {
        removeItem: (item) => item,
        items: [breadcrumbsItemStub],
        query: {name: "abc"}
      } as Breadcrumbs;
      service['options'].homeRoute = "home";

      spyOn(service, "isEmptySearch").and.callThrough();
      spyOn(service, "clear").and.callThrough();
      spyOn(service, "selectBreadcrumbsItem").and.callThrough();
      spyOn(service, "navigate");

      service.removeBreadcrumbsItem(breadcrumbsItemStub);

      expect(service.isEmptySearch).toHaveBeenCalled();
      expect(service.clear).toHaveBeenCalled();
      expect(service.navigate).toHaveBeenCalledWith({path: "home"})
      expect(service.selectBreadcrumbsItem).not.toHaveBeenCalled();
    });

    it("should not clear query and select next BreadcrumbsItem", () => {
      const breadcrumbsItemStub: BreadcrumbsItem = <any>{};
      service.breadcrumbs = {
        removeItem: (item) => item,
        selectItem: (item) => {},
        items: [breadcrumbsItemStub],
        query: <any>{name: "abc", select: [1, 2, 3]}
      } as Breadcrumbs;
      service['options'].homeRoute = "home";

      spyOn(service, "isEmptySearch").and.callThrough();
      spyOn(service, "clear").and.callThrough();
      spyOn(service, "selectBreadcrumbsItem").and.callThrough();
      spyOn(service, "navigate");

      service.removeBreadcrumbsItem(breadcrumbsItemStub);

      expect(service.isEmptySearch).toHaveBeenCalled();
      expect(service.clear).not.toHaveBeenCalled();
      expect(service.navigate).not.toHaveBeenCalled();
      expect(service.selectBreadcrumbsItem).toHaveBeenCalled();
    });
  });

  describe("removeSelect", () => {
    it("makes expected calls", () => {
      spyOn(service, "removeBreadcrumbsItem").and.callThrough();
      service.breadcrumbs = {removeItem: (item) => ({}), items: [{facet: "geo"}, {facet: "person"}]} as Breadcrumbs

      service.removeSelect(-1);

      expect(service.removeBreadcrumbsItem).toHaveBeenCalledWith({facet: "geo"} as BreadcrumbsItem);
    });
  })

  describe("removeText", () => {
    it("makes expected calls", () => {
      spyOn(service, "removeBreadcrumbsItem").and.callThrough();
      service.breadcrumbs = {removeItem: (item) => ({}), items: [{facet: "geo"}]} as Breadcrumbs

      service.removeText();

      expect(service.removeBreadcrumbsItem).toHaveBeenCalledWith({facet: "geo"} as BreadcrumbsItem);
    });
  });

  describe("home", () => {
    it("should clear query and navigate to home", () => {
      spyOn(service, "clear").and.callThrough();
      spyOn(service, "navigate");
      service["options"].homeRoute = "/home";

      service.home();

      expect(service.clear).toHaveBeenCalledWith(true, "/home");
      expect(service.navigate).toHaveBeenCalled();
    })

    it("should clear query and navigate to path", () => {
      spyOn(service, "clear").and.callThrough();
      spyOn(service, "navigate");

      service.home("/about");

      expect(service.clear).toHaveBeenCalledWith(true, "/about");
      expect(service.navigate).toHaveBeenCalled();
    })
  });

  describe("isEmptySearchIgnoreSelects", () => {
    it("should return true", () => {
      const query = {action: "search"} as Query;
      service.isEmptySearchIgnoreSelects(query);

      // by default
      expect(service.isEmptySearchIgnoreSelects(query)).toBeTrue();

      // query is undefined;
      expect(service.isEmptySearchIgnoreSelects(undefined)).toBeTrue();
    })

    it("should return false", () => {
      let query = {action: "search", isFirstPage: true} as Query;
      service.isEmptySearchIgnoreSelects(query);

      // isFirstPage = true
      expect(service.isEmptySearchIgnoreSelects(query)).toBeFalse();

      // text is defined
      query = {action: "search", text: "abc"} as Query;
      service.isEmptySearchIgnoreSelects(query);
      expect(service.isEmptySearchIgnoreSelects(query)).toBeFalse();

      // basket is defined
      query = {action: "search", basket: "abc"} as Query;
      expect(service.isEmptySearchIgnoreSelects(query)).toBeFalse();

      // query.action not "search"
      query = {action: "open"} as Query;
      expect(service.isEmptySearchIgnoreSelects(query)).toBeFalse();
    })
  });

  describe("isEmptySearch", () => {
    it("should return false", () => {
      let query = {action: "search", isFirstPage: true} as Query;
      spyOn(service, "isEmptySearchIgnoreSelects").and.callThrough();

      // default
      expect(service.isEmptySearch(query)).toBeFalse();

      // when isEmptySearchIgnoreSelects returns false
      let expected = service.isEmptySearch(query);
      expect(service.isEmptySearchIgnoreSelects).toHaveBeenCalled();
      expect(expected).toBeFalse();

      // when isEmptySearchIgnoreSelects returns true and query.select is not empty
      query = {action: "search", select: [{name: "abc"}] as unknown} as Query;
      expected = service.isEmptySearch(query);
      expect(service.isEmptySearchIgnoreSelects).toHaveBeenCalled();
      expect(expected).toBeFalse();

      query = {action: "open"} as Query;
      expect(service.isEmptySearch(query)).toBeFalse();
    })
  })

  describe("getHistoryState", () => {
    it("makes expected calls", () => {
      const routerStub: Router = TestBed.inject(Router);
      spyOn(routerStub, "getCurrentNavigation").and.callThrough();
      service["getHistoryState"]();
      expect(routerStub.getCurrentNavigation).toHaveBeenCalled();
    });
  });

  describe("isSearchRouteActive", () => {
    it("makes expected calls", () => {
      spyOn<any>(service, "isSearchRoute").and.callThrough();
      service.isSearchRouteActive();
      expect(service["isSearchRoute"]).toHaveBeenCalled();
    });
  });

  describe("getQueryFromUrl", () => {
    it("makes expected calls when route is /search", () => {
      const router = TestBed.inject(Router);
      const url = 'search?query=%7B"name":"training_query","text":"obama","tab":"all","select":%5B%5D%7D';
      router.navigateByUrl(url);

      spyOn<any>(service, "isSearchRoute").and.callThrough();
      spyOn(service, "makeQuery").and.callThrough();

      service.getQueryFromUrl();

      expect(router.url).toEqual(url);
      expect(service["isSearchRoute"]).toHaveBeenCalled();
      expect(service.makeQuery).toHaveBeenCalled();
    });

    it("makes expected calls when route is /preview", () => {
      const router = TestBed.inject(Router);
      const url = 'preview?id=%2FWeb%2FWikipedia%2F%7CPresident_Obama&query=%7B"name":"training_query","text":"obama"%7D';
      router.navigateByUrl(url);

      spyOn<any>(service, "isSearchRoute").and.callThrough();
      spyOn(service, "makeQuery").and.callThrough();

      service.getQueryFromUrl();

      expect(router.url).toEqual(url);
      expect(service["isSearchRoute"]).toHaveBeenCalled();
      expect(service.makeQuery).not.toHaveBeenCalled();
    });

  });

  describe("handleLogin", () => {
    beforeEach(() => {
      spyOn(service, "navigate").and.callThrough();
      (<jasmine.Spy>service["handleLogin"]).and.callThrough();
      const router = TestBed.inject(Router);
      const url = 'search?query=%7B"name":"training_query","text":"obama","tab":"all","select":%5B%5D%7D';
      router.navigateByUrl(url);
    });

    it("should navigate if url contains a query search and login is complete", () => {
      service["handleLogin"]();
      expect(service.navigate).toHaveBeenCalled();
    });

    it("should do nothing is login is not complete", () => {
      const loginService = TestBed.inject(LoginService);
      loginService.complete = false;

      service["handleLogin"]();
      expect(service.navigate).not.toHaveBeenCalled();
    });

    it("should do nothing if url is not a query search", () => {
      const router = TestBed.inject(Router);
      const url = 'preview?query=%7B"name":"training_query","text":"obama","tab":"all","select":%5B%5D%7D';
      router.navigateByUrl(url);

      service["handleLogin"]();
      expect(service.navigate).not.toHaveBeenCalled();
    });
  });

  describe("Tab", () => {
    describe("getTab", () => {
      it("should return Tab with name 'abc'", () => {
        const tab: Tab = {name: "abc", display: "abc/efg", value: "def", count: 52};
        service.results= {tabs: [tab]} as Results;

        const expected = service.getTab("abc");
        expect(expected).toEqual(tab);
      });

      it("should return undefined if tab name is not found or results is undefined", () => {
        const tab: Tab = {name: "abc", display: "abc/efg", value: "def", count: 52};

        // When results is undefined
        // Then
        expect(service.getTab("abc")).toBeUndefined();

        // When
        service.results= {tabs: [tab]} as Results;

        // Then
        expect(service.getTab("def")).toBeUndefined();
      })
    });

    describe("getCurrentTab", () => {
      it("should do nothing when results is undefined or results have no tab", () => {
        spyOn(service, "getTab").and.callThrough();
        service.getCurrentTab();
        expect(service.getTab).not.toHaveBeenCalled();

        service.results = {} as Results;
        service.getCurrentTab();
        expect(service.getTab).not.toHaveBeenCalled();
      });

      it("should return current results tab", () => {
        spyOn(service, "getTab").and.callThrough();
        const tab: Tab = {name: "abc", display: "efg", value: "abc/efg", count: 52};
        service.results = {tab: "abc", tabs: [tab]} as Results;

        const expected = service.getCurrentTab();

        expect(service.getTab).toHaveBeenCalled();
        expect(expected).toEqual(tab);
      });
    });
  })
});
