import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppService, FormatService, ExprValueInitializer, Expr, ExprOperandsInitializer } from "@sinequa/core/app-utils";

import { SearchService } from "../search";
import { AdvancedService } from "../advanced";
import { ValidationService } from "@sinequa/core/validation";
import { START_CONFIG, CCColumn } from "@sinequa/core/web-services";
import { HttpHandler } from "@angular/common/http";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";
import { FormControl } from "@angular/forms";
import { MODAL_LOGIN } from '@sinequa/core/login';
import { MODAL_CONFIRM, MODAL_PROMPT } from '@sinequa/core/modal';
import { AuthService } from 'ng2-ui-auth';
import { AppLocalesConfig } from './mocks/app.locales.config';
import { Utils } from '@sinequa/core/base';

describe("AdvancedService", () => {
  let service: AdvancedService;
  let searchService: SearchService;
  let appService: AppService;
  let formatService: FormatService;
  let intlService: IntlService;

  beforeEach(() => {

    const IntlServiceFactory = () => ({
      parseDate: () => {},
    });

    const AuthServiceFactory = () => ({});

    TestBed.configureTestingModule({
      providers: [
        AdvancedService,
        FormatService,
        AppService,
        HttpHandler,
        ValidationService,
        SearchService,
        { provide: START_CONFIG, useValue: { app: "testing_app" } },
        { provide: MODAL_LOGIN, useValue: "MODAL_LOGIN" },
        { provide: MODAL_CONFIRM, useValue: "MODAL_CONFIRM" },
        { provide: MODAL_PROMPT, useValue: "MODAL_PROMPT" },
        { provide: IntlService, useFactory: IntlServiceFactory },
        { provide: AuthService, useFactory: AuthServiceFactory },
        {provide: LOCALES_CONFIG, useClass: AppLocalesConfig},
      ],
      imports: [
        RouterTestingModule,
        OverlayModule
      ]
    });
    service = TestBed.inject(AdvancedService);
    searchService = TestBed.inject(SearchService);
    appService = TestBed.inject(AppService);
    formatService = TestBed.inject(FormatService);
    intlService = TestBed.inject(IntlService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
    expect(service.validators).toBeDefined();
  });

  describe("advanced validators", () => {
    it("min", () => {
      const validator = service.validators.min(10, "toto");
      const control = new FormControl("control", [validator]);
      control.setValue(1);
      expect(control.errors?.min).toBeDefined();
      expect(control.valid).toBeFalsy();
    });

    it("max", () => {
      const validator = service.validators.max(10, "toto");
      const control = new FormControl("control", [validator]);
      control.setValue(11);
      expect(control.errors?.max).toBeDefined();
      expect(control.valid).toBeFalsy();
    });

    it("required", () => {
      const validator = service.validators.required;
      const control = new FormControl("control", [validator]);
      control.setValue(null);
      expect(control.errors?.required).toBeDefined();
      expect(control.valid).toBeFalsy();
    });

    it("email", () => {
      const validator = service.validators.email;
      const control = new FormControl("control", [validator]);
      control.setValue("test");
      expect(control.errors?.email).toBeDefined();
      expect(control.valid).toBeFalsy();
    });

    it("pattern", () => {
      const validator = service.validators.pattern("^[0-9]+$");
      const control = new FormControl("control", [validator]);
      control.setValue("abc");
      expect(control.errors?.pattern).toBeDefined();
      expect(control.valid).toBeFalsy();
    });

    it("integer", () => {
      const validator = service.validators.integer("toto");
      const control = new FormControl("control", [validator]);
      control.setValue(1.8);
      expect(control.errors?.integer).toBeDefined();
      expect(control.valid).toBeFalsy();
    });

    it("number", () => {
      const validator = service.validators.number("toto");
      const control = new FormControl("control", [validator]);
      control.setValue("test");
      expect(control.errors?.number).toBeDefined();
      expect(control.valid).toBeFalsy();
    });

    it("range", () => {
      const validator = service.validators.range("toto");
      const control = new FormControl("control", [validator]);
      control.setValue(["b", "a"]);
      expect(control.errors?.range).toBeDefined();
      expect(control.valid).toBeFalsy();
    });

    it("date", () => {
      const validator = service.validators.date("toto");
      const control = new FormControl("control", [validator]);
      control.setValue("10");
      expect(control.errors?.date).toBeDefined();
      expect(control.valid).toBeFalsy();
    });
  });

  describe("create advanced controls", () => {
    let spy;
    let spyGetValue;
    let spyGetRange;
    let spyGetBoolean;
    beforeEach(() => {
      spy = spyOn<any>(service, "createControl");
      spyGetValue = spyOn<any>(service, "getValue");
      spyGetRange = spyOn<any>(service, "getRangeValue");
      spyGetBoolean = spyOn<any>(service, "getBooleanValue");
      searchService.query.select = [];
    });

    it("select-control", () => {
      service.createSelectControl("toto", []);
      expect(spyGetValue).toHaveBeenCalledWith("toto", searchService.query);
      expect(spyGetRange).not.toHaveBeenCalled();
      expect(spyGetBoolean).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(undefined, [], undefined);
    });

    it("range-control", () => {
      service.createRangeControl("toto");
      expect(spyGetValue).not.toHaveBeenCalled();
      expect(spyGetBoolean).not.toHaveBeenCalled();
      expect(spyGetRange).toHaveBeenCalledWith("toto", searchService.query);
      expect(spy).toHaveBeenCalledWith(undefined, undefined, undefined);
    });

    it("input-control", () => {
      service.createInputControl("toto", []);
      expect(spyGetValue).toHaveBeenCalledWith("toto", searchService.query);
      expect(spyGetRange).not.toHaveBeenCalled();
      expect(spyGetBoolean).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(undefined, [], undefined);
    });

    it("multi-input-control", () => {
      service.createMultiInputControl("toto", undefined, []);
      expect(spyGetValue).toHaveBeenCalledWith("toto", searchService.query);
      expect(spyGetRange).not.toHaveBeenCalled();
      expect(spyGetBoolean).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(undefined, undefined, []);
    });

    it("checkbox-control", () => {
      service.createCheckboxControl("toto", []);
      expect(spyGetValue).not.toHaveBeenCalled();
      expect(spyGetRange).not.toHaveBeenCalled();
      expect(spyGetBoolean).toHaveBeenCalledWith("toto", searchService.query);
      expect(spy).toHaveBeenCalledWith(undefined, [], undefined);
    });
  });

  describe("get advanced value from searchService.query", () => {
    let spy;
    let spyQueryAction;
    beforeEach(() => {
      searchService.query.select = [
        {expression: "treepath: (`Product`:`Product` OR `web`:`web`)", facet: "advanced_treepath"},
        {expression: "authors: (`Sinequa`:`sinequa`)", facet: "advanced_authors"},
        {expression: "size:<=262144000", facet: "advanced_size"},
        {expression: "modified:[2020-12-01..2020-12-16]", facet: "advanced_modified"},
        {expression: "person: (`Bill Gates`:`BILL GATES` OR `Bill Clinton`:`BILL CLINTON`)", facet: "advanced_person"},
        {expression: "docformat: (`htm`:`htm`)", facet: "advanced_docformat"}
      ];
      spy = spyOn(appService, 'parseExpr');
      spyQueryAction = spyOn(searchService.query, 'findSelect').and.callThrough();
    });

    afterEach(() => {
      spy.calls.reset();
    })

    it("when defined filter for a mono-select and multi-select component", () => {
      // Case multi-select
      const op1 : ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        values: ["Product"],
        display: "Product",
        value: "Product",
        field: "treepath",
        operator: 0
      }

      const op2 : ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        values: ["web"],
        display: "web",
        value: "web",
        field: "treepath",
        operator: 0
      }

      const exprOperandsInitializer1: ExprOperandsInitializer = {
        exprContext: {appService, formatService, intlService},
        op1: op1 as Expr,
        op2: op2 as Expr,
        field: "treepath",
        and: false
      };
      const expr1: Expr = new Expr(exprOperandsInitializer1);
      spy.and.returnValue(expr1);
      const value1 = service.getValue("treepath");

      expect(spyQueryAction).toHaveBeenCalledWith("advanced_treepath");
      expect(value1).toEqual([
        {display: "Product",value: "Product"},
        {display: "web",value: "web"}
      ]);

      // Case mono-select
      const exprValueInitializer2: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        values: ["sinequa"],
        display: "Sinequa",
        field: "authors",
        operator: 0
      };
      const expr2: Expr = new Expr(exprValueInitializer2);
      spy.and.returnValue(expr2);
      const value2 = service.getValue("authors");

      expect(spyQueryAction).toHaveBeenCalledWith("advanced_authors");
      expect(value2).toEqual({display: "Sinequa",value: "sinequa"});
    });

    it("when defined filter for a number/date range component", () => {
      // Case numbers with only one operand of the range
      const exprValueInitializer1: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        values: ["262144000"],
        value: "262144000",
        field: "size",
        operator: 5
      };
      const expr1: Expr = new Expr(exprValueInitializer1);
      spy.and.returnValue(expr1);
      const value1 = service.getRangeValue("size");

      expect(spyQueryAction).toHaveBeenCalledWith("advanced_size");
      expect(value1).toEqual([undefined, '262144000']);

      // Case dates with 2 operands of the range
      const exprValueInitializer2: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        values: ["2020-12-01", "2020-12-16"],
        field: "modified",
        operator: 11
      };
      const expr2: Expr = new Expr(exprValueInitializer2);
      spy.and.returnValue(expr2);
      const value2 = service.getRangeValue("modified");

      expect(spyQueryAction).toHaveBeenCalledWith("advanced_modified");
      expect(value2).toEqual(["2020-12-01", "2020-12-16"]);
    });

    it("when defined filter for a multi-input/input component", () => {
      // Case multi-input
      const op1 : ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        values: ["BILL GATES"],
        display: "Bill Gates",
        value: "BILL GATES",
        field: "person",
        operator: 0
      }

      const op2 : ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        values: ["BILL CLINTON"],
        display: "Bill Clinton",
        value: "BILL CLINTON",
        field: "person",
        operator: 0
      }

      const exprOperandsInitializer1: ExprOperandsInitializer = {
        exprContext: {appService, formatService, intlService},
        op1: op1 as Expr,
        op2: op2 as Expr,
        field: "person",
        and: false
      };
      const expr1: Expr = new Expr(exprOperandsInitializer1);
      spy.and.returnValue(expr1);
      const value1 = service.getValue("person");

      expect(spyQueryAction).toHaveBeenCalledWith("advanced_person");
      expect(value1).toEqual([
        {display: "Bill Gates",value: "BILL GATES"},
        {display: "Bill Clinton",value: "BILL CLINTON"}
      ]);

      // Case input
      const exprValueInitializer2: ExprValueInitializer = {
        exprContext: {appService, formatService, intlService},
        values: ["htm"],
        field: "docformat",
        operator: 0
      };
      const expr2: Expr = new Expr(exprValueInitializer2);
      spy.and.returnValue(expr2);
      const value2 = service.getValue("docformat");

      expect(spyQueryAction).toHaveBeenCalledWith("advanced_docformat");
      expect(value2).toEqual({display: "htm",value: "htm"});
    });

    it("Undefined filter should also be processed", () => {
      // Case range
      const value1 = service.getRangeValue("foo");

      expect(spyQueryAction).toHaveBeenCalledWith("advanced_foo");
      expect(value1).toEqual([undefined,undefined]);

      // All other Cases: as example Select
      const value2 = service.getValue("toto");

      expect(spyQueryAction).toHaveBeenCalledWith("advanced_toto");
      expect(value2).toEqual(undefined);
    });
  });

  describe("set advanced value in searchService.query", () => {
    let spyQueryRemoveAction;
    let spyQueryAddAction;
    beforeEach(() => {
      searchService.query.select = [];
      spyQueryAddAction = spyOn(searchService.query, 'addSelect').and.callThrough();
      spyQueryRemoveAction = spyOn(searchService.query, 'removeSelect').and.callThrough();
    });

    afterEach(() => {
      spyQueryAddAction.calls.reset();
      spyQueryRemoveAction.calls.reset();
    })

    it("from a number/date range component", () => {
      // Case numbers with only one operand of the range
      service.setNumericalSelect('size', 262144000, '<=');

      expect(spyQueryRemoveAction).toHaveBeenCalledWith("advanced_size");
      expect(spyQueryAddAction).toHaveBeenCalledWith("size:<= 262144000","advanced_size");

      // Case dates with 2 operands of the range
      service.setRangeSelect('modified', ["2020-12-01", "2020-12-16"]);

      expect(spyQueryRemoveAction).toHaveBeenCalledWith("advanced_modified");
      expect(spyQueryAddAction).toHaveBeenCalledWith("modified: [2020-12-01..2020-12-16]","advanced_modified");
    });

    it("from a (select/input/checkbox...) component", () => {

      service.setSelect('treepath', [
        {display: "Product",value: "Product"},
        {display: "web",value: "web"}
      ]);

      expect(spyQueryRemoveAction).toHaveBeenCalledWith("advanced_treepath");
      expect(spyQueryAddAction).toHaveBeenCalledWith("treepath: (`Product`:`Product` OR `web`:`web`)","advanced_treepath");
    });

    it("with undefined value", () => {
      service.setSelect('person', undefined);

      expect(spyQueryRemoveAction).toHaveBeenCalledWith("advanced_person");
      expect(spyQueryAddAction).not.toHaveBeenCalled();
    });
  });

  describe("remove an advanced value from searchService.query", () => {
    let spyQueryRemoveAction;
    let spySearch;
    beforeEach(() => {
      searchService.query.select = [{expression: "foo: (`toto`:`toto`)", facet: "advanced_foo"}];
      spySearch = spyOn(searchService, 'search').and.callThrough();
      spyQueryRemoveAction = spyOn(searchService.query, 'removeSelect').and.callThrough();
    });

    afterEach(() => {
      spySearch.calls.reset();
      spyQueryRemoveAction.calls.reset();
    })

    it("remove existing select and trigger new search", () => {
      service.removeAdvancedValue("foo");

      expect(spyQueryRemoveAction).toHaveBeenCalledWith("advanced_foo");
      expect(searchService.query.select).toEqual(undefined);
      expect(spySearch).toHaveBeenCalled();
    });

    it("non-existent select and trigger new search", () => {
      service.removeAdvancedValue("test");

      expect(spyQueryRemoveAction).toHaveBeenCalledWith("advanced_test");
      expect(searchService.query.select).toEqual([{expression: "foo: (`toto`:`toto`)", facet: "advanced_foo"}]);
      expect(spySearch).toHaveBeenCalled();
    });

    it("remove existing select without triggering new search", () => {
      service.removeAdvancedValue("foo", false);

      expect(spyQueryRemoveAction).toHaveBeenCalledWith("advanced_foo");
      expect(searchService.query.select).toEqual(undefined);
      expect(spySearch).not.toHaveBeenCalled();
    });
  });

  describe("reset advanced values from searchService.query", () => {
    let spySearch;

    beforeEach(() => {
      searchService.query.select = [
        {expression: "foo: (`toto`:`toto`)", facet: "advanced_foo"},
        {expression: "test: (`titi`:`titi`)", facet: "test"}
      ];
      spySearch = spyOn(searchService, 'search').and.callThrough();
    });

    afterEach(() => {
      spySearch.calls.reset();
    })

    it("then trigger new search", () => {
      service.resetAdvancedValues();

      expect(searchService.query.select).toEqual([{expression: "test: (`titi`:`titi`)", facet: "test"}]);
      expect(spySearch).toHaveBeenCalled();
    });

    it("without triggering new search", () => {
      service.resetAdvancedValues(false);

      expect(searchService.query.select).toEqual([{expression: "test: (`titi`:`titi`)", facet: "test"}]);
      expect(spySearch).not.toHaveBeenCalled();
    });
  });

  describe("format an advanced value", () => {
    let spy;
    beforeEach(() => {
      spy = spyOn(formatService, 'formatValue');
    });

    afterEach(() => {
      spy.calls.reset();
    })

    it("single value with formatted column", () => {
      const column = {formatter: "toto"} as CCColumn;
      spyOn(appService, 'getColumn').and.returnValue(column)

      service.formatAdvancedValue("toto", "foo");

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("foo", column);
    });

    it("list of items (including undefined values) with formatted column", () => {
      const column = {formatter: "toto"} as CCColumn;
      const value = ["foo", "test", undefined];
      spyOn(appService, 'getColumn').and.returnValue(column)

      service.formatAdvancedValue("toto", value);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith("foo", column);
      expect(spy).toHaveBeenCalledWith("test", column);
    });

    it("with unformatted column", () => {
      const column = {formatter: undefined} as CCColumn;
      spyOn(appService, 'getColumn').and.returnValue(column)

      service.formatAdvancedValue("toto", 1520845152);

      expect(spy).not.toHaveBeenCalled();
    });

  });

  describe("cast an advanced value", () => {
    let column;
    beforeEach(() => {
      column = {formatter: "toto"} as CCColumn;
      spyOn(Utils, 'isString').and.returnValue(true)
    });

    it("string as Date", () => {
      spyOn(AppService, 'isDate').and.returnValue(true)
      const spy = spyOn(Utils, 'toDate');

      service.castAdvancedValue("12/12/1212", column);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("12/12/1212");
    });

    it("string as integer", () => {
      spyOn(AppService, 'isInteger').and.returnValue(true)
      spyOn(Utils, 'testInteger').and.returnValue(true)
      const spy = spyOn(Utils, 'toInt');

      service.castAdvancedValue("12", column);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("12");
    });

    it("string as number", () => {
      spyOn(AppService, 'isDouble').and.returnValue(true)
      spyOn(Utils, 'testFloat').and.returnValue(true)
      const spy = spyOn(Utils, 'toNumber');

      service.castAdvancedValue("129.487", column);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("129.487");
    });

    it("string as boolean", () => {
      spyOn(AppService, 'isBoolean').and.returnValue(true)
      const spy = spyOn(Utils, 'isTrue');

      service.castAdvancedValue("true", column);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("true");
    });

  });
});
