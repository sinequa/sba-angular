import {TestBed} from "@angular/core/testing";
import {HttpHandler} from '@angular/common/http';

import {AppService, Query, FormatService, Expr, ExprValueInitializer} from '@sinequa/core/app-utils';
import {IntlService} from '@sinequa/core/intl';
import {START_CONFIG} from '@sinequa/core/web-services';

import {SearchServiceFactory} from '@testing/factories';

import {Breadcrumbs, BreadcrumbsItem} from '../search/breadcrumbs';
import {SearchService} from '../search';

describe('Test class Breadcrumbs', () => {
  let breadcrumbs: Breadcrumbs;
  let appService: AppService;
  let searchService: SearchService;
  let formatService: FormatService;
  let intlService: IntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService,
        HttpHandler,
        {provide: START_CONFIG, useValue: {app: "testing_app"}},
        {provide: SearchService, useFactory: SearchServiceFactory},
        {provide: FormatService, useValue: {}},
        {provide: IntlService, useValue: {}}
      ]
    });

    appService = TestBed.inject(AppService);
    searchService = TestBed.inject(SearchService);
    formatService = TestBed.inject(FormatService);
    intlService = TestBed.inject(IntlService);

    const query = new Query("test");
    breadcrumbs = Breadcrumbs.create(appService, searchService, query);
  })

  it("should returns a breadcrumbs object", () => {
    const query = new Query("training_query");
    query.text = "obama";
    query.tab = "all";
    query.addSelect("geo:((`Iraq`:(`IRAQ`)) OR (`Guantanamo`:(`GUANTANAMO`)))", "geo");

    spyOn(query, 'copy').and.returnValue(query);
    spyOn(query, 'copyAdvanced').and.returnValue(query);

    // When
    breadcrumbs = Breadcrumbs.create(appService, searchService, query);

    // Then
    expect(breadcrumbs.text instanceof Expr).toBeTrue();
    expect(breadcrumbs.text.toString()).toEqual('text:obama');
    expect(breadcrumbs.items.length).toEqual(2);
    expect(breadcrumbs.items[0].expr?.toString()).toEqual("text:obama");
    expect(breadcrumbs.items[1].expr?.toString()).toEqual("geo:(`Iraq`:IRAQ OR `Guantanamo`:GUANTANAMO)");
  });

  describe("find()", () => {
    it('should returns an Expr', () => {
      // Given
      spyOn<any>(appService, "resolveColumnAlias").and.returnValue(false);
      const exprValueInitializer: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        display: "Iraq",
        value: "IRAQ",
        field: "country"
      };
      const expr: Expr = new Expr(exprValueInitializer);

      const item: BreadcrumbsItem = {
        expr,
        display: "Iraq",
        facet: "Geo",
        active: true
      };
      breadcrumbs.items = [{expr: undefined, display: "abc"}, item];

      // When
      expect(breadcrumbs.find(expr)).toBeDefined()
    });

    it('should returns an Expr when expr is an ExprValueInitializer', () => {
      // Given
      spyOn<any>(appService, "resolveColumnAlias").and.returnValue(false);
      const exprValueInitializer: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        display: "Iraq",
        value: "IRAQ",
        field: "country",
      }
      const expr: Expr = new Expr(exprValueInitializer);

      const item: BreadcrumbsItem = {
        expr,
        display: "Iraq",
        facet: "Geo",
        active: true
      };
      breadcrumbs.items = [{expr: undefined, display: "abc"}, item];

      // When
      expect(breadcrumbs.find(exprValueInitializer)).toBeDefined()
    });
  })

  describe("findSelect()", () => {
    it('should returns an Expr', () => {
      // Given
      const exprValueInitializer: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        display: "Iraq",
        value: "IRAQ",
        field: "country",
      }
      const expr: Expr = new Expr(exprValueInitializer);

      const item: BreadcrumbsItem = {
        expr,
        display: "Iraq",
        facet: "Geo",
        active: true
      };
      breadcrumbs.items = [{expr: undefined, display: "abc"}, item];

      // When
      // Then
      expect(breadcrumbs.findSelect("Geo")).toBeDefined();
      expect(breadcrumbs.findSelect("Geo", "country")).toBeDefined();
      expect(breadcrumbs.findSelect("Geo", expr)).toBeDefined();
    });

    it('should returns undefined when no filters', () => {
      // Given
      breadcrumbs.items = [{expr: undefined, display: "abc"}];

      // When
      // Then
      expect(breadcrumbs.findSelect("Geo")).toBeUndefined();
      expect(breadcrumbs.findSelect("Geo", "country")).toBeUndefined();
      expect(breadcrumbs.findSelect("Geo", undefined)).toBeUndefined();
    });

    it('should returns undefined when not found', () => {
      // Given
      const exprValueInitializer: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        display: "Iraq",
        value: "IRAQ",
        field: "country",
      }
      const exprValueInitializer2: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        display: "Obama",
        value: "OBAMA",
        field: "name",
      }
      const expr: Expr = new Expr(exprValueInitializer);
      const expr2: Expr = new Expr(exprValueInitializer2);

      const item: BreadcrumbsItem = {
        expr,
        display: "Iraq",
        facet: "Geo",
        active: true
      };
      breadcrumbs.items = [{expr: undefined, display: "abc"}, item];

      // When
      // Then
      expect(breadcrumbs.findSelect("person")).toBeUndefined(); // facet "person" not found
      expect(breadcrumbs.findSelect("Geo", "name")).toBeUndefined(); // field "name" not found
      expect(breadcrumbs.findSelect("Geo", expr2)).toBeUndefined(); // expr2 not found
    });
  });
});
