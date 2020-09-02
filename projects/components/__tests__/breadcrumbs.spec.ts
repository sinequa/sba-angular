import {TestBed} from "@angular/core/testing";

import {AppService, Query, FormatService, Expr, ExprValueInitializer} from '@sinequa/core/app-utils';
import {IntlService} from '@sinequa/core/intl';

import {appServiceStub, searchServiceStub} from './stubs';
import {Breadcrumbs, BreadcrumbsItem} from '../search/breadcrumbs';
import {SearchService} from '../search';

describe('Test class Breadcrumbs', () => {
  let breadcrumbs: Breadcrumbs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AppService, useFactory: appServiceStub},
        {provide: SearchService, useFactory: searchServiceStub},
        {provide: FormatService, useValue: {}},
        {provide: IntlService, useValue: {}}
      ]
    });

    const appService = TestBed.inject(AppService);
    const searchService = TestBed.inject(SearchService);

    const query = new Query("test");
    breadcrumbs = Breadcrumbs.create(appService, searchService, query);
  })

  it('Breadcrumbs-create', () => {
    expect(breadcrumbs).toBeDefined();
  });

  describe("find()", () => {
    it('should returns an Expr', () => {
      // Given
      const appService = TestBed.inject(AppService);
      const formatService = TestBed.inject(FormatService);
      const intlService = TestBed.inject(IntlService);
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
      expect(breadcrumbs.find(expr)).toBeDefined()
    });

    it('should returns an Expr when expr is an ExprValueInitializer', () => {
      // Given
      const appService = TestBed.inject(AppService);
      const formatService = TestBed.inject(FormatService);
      const intlService = TestBed.inject(IntlService);
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
      const appService = TestBed.inject(AppService);
      const formatService = TestBed.inject(FormatService);
      const intlService = TestBed.inject(IntlService);
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
      const appService = TestBed.inject(AppService);
      const formatService = TestBed.inject(FormatService);
      const intlService = TestBed.inject(IntlService);
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
