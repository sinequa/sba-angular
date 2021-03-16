import {TestBed} from "@angular/core/testing";
import {HttpHandler} from '@angular/common/http';

import {UserSettingsWebService, Aggregation, AggregationItem, START_CONFIG, EngineType} from '@sinequa/core/web-services';
import {AppService, FormatService, Expr, ExprValueInitializer, ExprOperandsInitializer, ExprOperator, Query, ExprBuilder} from '@sinequa/core/app-utils';
import {IntlService} from '@sinequa/core/intl';

import {AGGREGATION_GEO, FACETS, AGGREGATION_SIZE, AGGREGATION_BOOLEAN} from '@testing/mocks';
import {FacetService, DEFAULT_FACETS, FacetEventType} from '../facet';
import {SearchService, Breadcrumbs, BreadcrumbsItem} from '../search';
import {SuggestService} from '../autocomplete';

describe("FacetService", () => {
	const aggregation = {geo: AGGREGATION_GEO as Aggregation, size: AGGREGATION_SIZE as unknown as Aggregation, bool: AGGREGATION_BOOLEAN as Aggregation};
	let service: FacetService;
	let searchService: SearchService;
	let appService: AppService;
	let formatService: FormatService;
	let intlService: IntlService;
	let exprBuilder: ExprBuilder;

	beforeEach(() => {
		const UserSettingsWebServiceFactory = () => ({
			events: {subscribe: f => f({})},
			patch: (object, auditEvents) => ({subscribe: f => f({})}),
			timezone: {},
			userSettings: {}
		});

		const SearchServiceFactory = () => ({
			search: () => {},
			query: {
				replaceSelect: () => {},
				removeSelect: () => {},
				addSelect: () => {},
				lastSelect: () => {}
			}
		})

		TestBed.configureTestingModule({
			providers: [
				FacetService,
				FormatService,
				AppService,
				HttpHandler,
				{provide: SearchService, useFactory: SearchServiceFactory},
				{
					provide: UserSettingsWebService, useFactory: UserSettingsWebServiceFactory
				},
				{provide: SuggestService, useFactory: () => {}},
				{provide: IntlService, useFactory: () => {}},
				{provide: START_CONFIG, useValue: {app: "testing_app"}},
				{provide: DEFAULT_FACETS, useValue: FACETS}
			]
		});
		service = TestBed.inject(FacetService);
		searchService = TestBed.inject(SearchService);
		appService = TestBed.inject(AppService);
		formatService = TestBed.inject(FormatService);
		intlService = TestBed.inject(IntlService);
		exprBuilder = TestBed.inject(ExprBuilder);

	});

	it("can load instance", () => {
		expect(service).toBeTruthy();
		expect(service.events).toBeDefined();
		expect(service.changes).toBeDefined();
	});

	it("should returns facets", () => {
		// As I provide DEFAULT_FACETS, facets should not be empty
		expect(service.facets.length).toEqual(8);
	})

	it("should returns a specific facet", () => {
		const existingFacet = service.facet('geo');
		const unknownFacet = service.facet('unknown');

		expect(existingFacet?.name).toEqual('geo');
		expect(unknownFacet).toBeUndefined();
	})


	describe("facets filters", () => {

		it("should clear filters", () => {
			spyOn(searchService.query, 'removeSelect');
			service.clearFilters('facetName');
			expect(searchService.query.removeSelect).toHaveBeenCalled();
		});

		it("should clear filters and re-launch search", () => {
			const spy = spyOn(searchService, 'search');
			// stub patchFacets() to avoid side effect on toHaveBeenCalledTimes() function
			spyOn<any>(service, 'patchFacets');
			spyOn<any>(service['_events'], 'next');

			// keep previous version working
			service.clearFiltersSearch('geo', true);
			expect(searchService.search).toHaveBeenCalledTimes(1);

			spy.calls.reset();

			// an array should trigger searchService.search() once
			// but event() should be triggered as usual
			service.clearFiltersSearch(["geo", "persons"], true);
			expect(searchService.search).toHaveBeenCalledTimes(1);

			expect(service['_events'].next).toHaveBeenCalledTimes(3);
		})

		describe("addFilterSearch", () => {

			it("should trigger an event", () => {
				// Given
				const items = aggregation["geo"].items![0];
				spyOn(service, 'addFilter').and.returnValue(true);
				spyOn(service.events, 'next');

				// When
				service.addFilterSearch("Geo", aggregation["geo"], items);

				// Then
				expect(service.addFilter).toHaveBeenCalledWith("Geo", aggregation["geo"], items, {});
				expect(service.events.next).toHaveBeenCalledWith({type: FacetEventType.AddFilter, facet: undefined});
			})
			
			it("should not trigger an event", () => {
				// Given
				const items = aggregation["geo"].items![0];
				spyOn(service, 'addFilter').and.returnValue(false);
				spyOn(service.events, 'next');

				// When
				service.addFilterSearch("Geo", aggregation["geo"], items);

				// Then
				expect(service.addFilter).toHaveBeenCalledWith("Geo", aggregation["geo"], items, {});
				expect(service.events.next).not.toHaveBeenCalled();
			})
		});

		describe("removeFilter", () => {
			it("should remove a single value filter", () => {
				const items = aggregation["size"].items![0];
				const exprValueInitializer: ExprValueInitializer = {
					exprContext: {appService, formatService, intlService},
					display: "< 10 Ko",
					value: undefined,
					field: "size",
				}
				const expr: Expr = new Expr(exprValueInitializer);

				const item: BreadcrumbsItem = {
					expr,
					display: "< 10 Ko",
					facet: "Size",
					active: true
				};

				// Given breadcrumbs:
				// < 10 Ko
				searchService.breadcrumbs = {
					items: [] as BreadcrumbsItem[],
					activeSelects: [item] as BreadcrumbsItem[],
					findSelect: (facet) => item.expr
				} as Breadcrumbs;
				searchService.breadcrumbs.items = [{expr: undefined, display: "abc"}, item];

				spyOn(searchService.query, "removeSelect");
				spyOn<any>(service, "findItemFilter").and.returnValue(item.expr)
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(0);

				service.removeFilter("Size", aggregation["size"], items);

				expect(searchService.query.removeSelect).toHaveBeenCalledWith(0);
			});

			it("should remove a single value from a select filter", () => {
				const aggItem = aggregation["size"].items![1];
				const exprValueInitializer: ExprValueInitializer = {
					exprContext: {appService, formatService, intlService},
					display: "< 10 Ko",
					value: undefined,
					field: "size",
				}
				const expr: Expr = new Expr(exprValueInitializer);
				expr.toString = () => "size`< 10 Ko`:(>= 0 AND < 10240)";

				const item: BreadcrumbsItem = {
					expr,
					display: "< 10 Ko",
					facet: "Size",
					active: true,
				};

				exprValueInitializer.display = "10 Ko à 100 Ko";
				const expr2: Expr = new Expr(exprValueInitializer);
				expr2.toString = () => "size`10 Ko à 100 Ko`:(>= 10240 AND < 102400)";

				const item2: BreadcrumbsItem = {
					expr: expr2,
					display: "10 Ko à 100 Ko",
					facet: "Size",
					active: false
				};

				// Given Breadcrumbs:
				// text:abc / < 10 Ko OR 10 Ko to 100 Ko
				searchService.breadcrumbs = {
					activeIndex: 1,
					selects: [item, item2],
					items: [{expr: undefined, display: "abc"}, item, item2] as BreadcrumbsItem[],
					activeSelects: [item, item2] as BreadcrumbsItem[],
					findSelect: (facet) => item2.expr
				} as Breadcrumbs;

				spyOn(searchService.query, "removeSelect");
				spyOn(searchService.query, "replaceSelect");
				//spyOn<any>(service, "makeExpr").and.callThrough();

				Object.assign(item2.expr, {parent: {operands: [item.expr, item2.expr]}});
				spyOn<any>(service, "findItemFilter").and.returnValue(item2.expr);
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(1);

				// When remove filter : 10 Ko to 100 Ko
				service.removeFilter("Size", aggregation["size"], aggItem);

				//expect(service["makeExpr"]).toHaveBeenCalledWith("Size", jasmine.anything(), [{count: 0, value: "size`< 10 Ko`:(>= 0 AND < 10240)", display: "< 10 Ko", $column: undefined, $excluded: undefined}], jasmine.anything());
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(1, {expression: "size`< 10 Ko`:(>= 0 AND < 10240)", facet: "Size"});
				expect(searchService.query.removeSelect).not.toHaveBeenCalled();
			});
		})

		describe("addFilter", () => {

			it("should add a single value filter", () => {
				// Given
				const items = aggregation["geo"].items![0];
				spyOn(searchService.query, "addSelect");

				// When
				service.addFilter('Geo', aggregation["geo"], items);

				// Then
				const expectedExpr = 'geo: (`Iraq`:`IRAQ`)';
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, 'Geo');
			})

			it("should do nothing when items is undefined or []", () => {
				// Given
				const testCases = [
					{items: undefined as unknown as AggregationItem},
					{items: [] as AggregationItem[]}
				];
				spyOn(searchService.query, "addSelect");

				// When Then
				testCases.forEach((test) => {
					service.addFilter('Geo', aggregation["geo"], test.items);
					expect(searchService.query.addSelect).not.toHaveBeenCalled();
				})
			});

			it("should add a single value filter when items is an array of 1 element", () => {
				// Given
				const items = aggregation["geo"].items!.slice(0, 1);
				spyOn(searchService.query, "addSelect");

				// When
				service.addFilter('Geo', aggregation["geo"], items);

				// Then
				const expectedExpr = 'geo: (`Iraq`:`IRAQ`)';
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, 'Geo');
			});

			it("should add a select filter when items is an array", () => {
				// Given
				const items = aggregation["geo"].items!.slice(0, 2);
				spyOn(searchService.query, "addSelect");

				// When
				service.addFilter('Geo', aggregation["geo"], items);

				// Then
				const expectedExpr = 'geo: (`Iraq`:`IRAQ` OR `Guantanamo`:`GUANTANAMO`)';
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, 'Geo');
			});

			it("should append a single item to the previous select (same facet)", () => {
				// breadcrumps: IRAQ OR GUANTANAMO
				// expected breadcrumps: IRAQ OR GUANTANAMO OR IOWA
				// Given
				spyOn(searchService.query, "addSelect");
				spyOn(searchService.query, "replaceSelect");

				searchService.breadcrumbs = {
					activeIndex: 0,
					activeSelects: [{}],
					removeItem: (item) => (item),
					findSelect: (facetName) => ({
						operands: [
							{value: 'IRAQ', display: 'Iraq'},
							{value: 'GUANTANAMO', display: 'Guantanamo'}
						]
					})
				} as Breadcrumbs;
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(0);

				// When
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items![2]); // IOWA

				// Then
				const expectedExpr = 'geo: (`Iraq`:`IRAQ` OR `Guantanamo`:`GUANTANAMO` OR `Iowa`:`IOWA`)';
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(0, {expression: expectedExpr, facet: "Geo"})
				expect(searchService.query.addSelect).not.toHaveBeenCalled();
			});

			it("should append a single item to the previous select with AND operator (same facet)", () => {
				// breadcrumps: IRAQ AND GUANTANAMO
				// expected breadcrumps: IRAQ AND GUANTANAMO AND IOWA
				// Given
				spyOn(searchService.query, "addSelect");
				spyOn(searchService.query, "replaceSelect");

				searchService.breadcrumbs = {
					activeIndex: 0,
					activeSelects: [{}],
					removeItem: (item) => (item),
					findSelect: (facetName) => ({
						and: true,
						operands: [
							{value: 'IRAQ', display: 'Iraq'},
							{value: 'GUANTANAMO', display: 'Guantanamo'}
						]
					})
				} as Breadcrumbs;
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(0);

				// When
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items![2]); // IOWA

				// Then
				const expectedExpr = 'geo: (`Iraq`:`IRAQ` AND `Guantanamo`:`GUANTANAMO` AND `Iowa`:`IOWA`)';
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(0, {expression: expectedExpr, facet: "Geo"})
				expect(searchService.query.addSelect).not.toHaveBeenCalled();
			});

			it("should append a single item to the previous select with NOT operator (same facet)", () => {
				// breadcrumps: NOT(IRAQ OR GUANTANAMO)
				// expected breadcrumps: NOT(IRAQ OR GUANTANAMO OR IOWA)
				// Given
				spyOn(searchService.query, "addSelect");
				spyOn(searchService.query, "replaceSelect");

				// breadcrumbItem
				const item = {
					expr: {
						not: true,
						operands: [
							{value: 'IRAQ', display: 'Iraq'},
							{value: 'GUANTANAMO', display: 'Guantanamo'}
						]
					}
				};

				searchService.breadcrumbs = {
					activeIndex: 0,
					selects: [item, item],
					activeSelects: [item, item],
					removeItem: (item) => (item),
					findSelect: (facetName) => item.expr
				} as Breadcrumbs;
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(0);

				// When
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items![2], {not: true}); // IOWA

				// Then
				const expectedExpr = 'NOT (geo: (`Iraq`:`IRAQ` OR `Guantanamo`:`GUANTANAMO` OR `Iowa`:`IOWA`))';
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(0, {expression: expectedExpr, facet: "Geo"})
				expect(searchService.query.addSelect).not.toHaveBeenCalled();
			});

			it("should create a new select with OR operators when previous select is AND/OR operator", () => {
				// breadcrumps: IRAQ AND GUANTANAMO
				// expected breadcrumps: (IRAQ AND GUANTANAMO)/(IOWA OR NEW HAMPSHIRE)
				// Given
				spyOn(searchService.query, "addSelect");
				spyOn(searchService.query, "replaceSelect");

				searchService.breadcrumbs = {
					activeIndex: 0,
					activeSelects: [{}],
					removeItem: (item) => (item),
					findSelect: (facetName) => ({
						and: true,
						operands: [
							{value: 'IRAQ', display: 'Iraq'},
							{value: 'GUANTANAMO', display: 'Guantanamo'}
						]
					})
				} as Breadcrumbs;
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(0);

				// When
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items!.slice(2, 4), {and: false}); // [IOWA, NEW HAMSPHIRE]

				// Then
				const expectedExpr = 'geo: (`Iowa`:`IOWA` OR `New Hampshire`:`NEW HAMPSHIRE`)';
				expect(searchService.query.replaceSelect).not.toHaveBeenCalled();
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, "Geo");
			});


			it("should append a single facet item to the previous single value (same facet)", () => {
				// breadcrumps: IRAQ
				// expected breadcrumps: IRAQ OR IOWA
				// Given
				spyOn(searchService.query, "addSelect");
				spyOn(searchService.query, "replaceSelect");

				searchService.breadcrumbs = {
					activeIndex: 0,
					activeSelects: [{}],
					removeItem: (item) => (item),
					findSelect: (facetName) => ({value: "IRAQ", display: "Iraq", toString: (withFields: boolean = true) => "IRAQ"})
				} as Breadcrumbs;
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(0);

				// When
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items![2]); // IOWA

				// Then
				const expectedExpr = 'geo: (`Iraq`:`IRAQ` OR `Iowa`:`IOWA`)';
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(0, {expression: expectedExpr, facet: "Geo"})
				expect(searchService.query.addSelect).not.toHaveBeenCalled();
			});


			it("should add 2 new AND facet items without append them to previous OR select", () => {
				// breadcrumps: IRAQ OR GUANTANAMO
				// expected breadcrumps : (IRAQ OR GUANTANAMO) / (IOWA AND NEW HAMPSHIRE)
				// Given
				spyOn(searchService.query, "addSelect");
				spyOn(searchService.query, "replaceSelect");

				searchService.breadcrumbs = {
					activeIndex: 0,
					activeSelects: [{}],
					activeItem: {
						expr: {
							and: false,
							operands: [
								{value: 'IRAQ', display: 'Iraq'},
								{value: 'GUANTANAMO', display: 'Guantanamo'}
							]
						}
					},
					removeItem: (item) => (item),
					findSelect: (facetName) => {}
				} as Breadcrumbs;

				// When
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items!.slice(2, 4), {and: true}); // [IOWA, NEW HAMPSHIRE]

				// Then
				const expectedExpr = 'geo: (`Iowa`:`IOWA` AND `New Hampshire`:`NEW HAMPSHIRE`)';
				expect(searchService.query.replaceSelect).not.toHaveBeenCalled();
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, "Geo");
			});

			it("should add 2 new OR facet items without append them to previous AND filters", () => {
				// breadcrumps: IRAQ AND GUANTANAMO
				// expected breadcrumps: (IRAQ AND GUANTANAMO)/(IOWA OR NEW HAMPSHIRE)
				// Given
				spyOn(searchService.query, "addSelect");
				spyOn(searchService.query, "replaceSelect");

				searchService.breadcrumbs = {
					activeIndex: 0,
					activeSelects: [{}],
					activeItem: {
						expr: {
							and: true,
							operands: [
								{value: 'IRAQ', display: 'Iraq'},
								{value: 'GUANTANAMO', display: 'Guantanamo'}
							]
						}
					},
					removeItem: (item) => (item),
					findSelect: (facetName) => {}
				} as Breadcrumbs;

				// When
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items!.slice(2, 4)); // [IOWA, NEW HAMPSHIRE]

				// Then
				const expectedExpr = 'geo: (`Iowa`:`IOWA` OR `New Hampshire`:`NEW HAMPSHIRE`)';
				expect(searchService.query.replaceSelect).not.toHaveBeenCalled();
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, "Geo");
			});

			it("should replace current select when options is replaceCurrent", () => {
				// breadcrumps: GUANTANAMO
				// expected breadcrumps: IRAQ
				// Given
				const items = aggregation["geo"].items![0];
				const facetName = "Geo";
				spyOn(searchService.query, "addSelect");
				spyOn(searchService.query, "removeSelect");

				const exprValueInitializer: ExprValueInitializer = {
					exprContext: {appService, formatService, intlService},
					display: "Guantanamo",
					value: "GUANTANAMO",
					field: "geo",
				}
				const expr: Expr = new Expr(exprValueInitializer);
				expr.toString = () => "geo`GUANTANAMO";

				const item: BreadcrumbsItem = {
					expr,
					display: "Guantanamo",
					facet: "Geo",
					active: true,
				};

				searchService.breadcrumbs = {
					activeIndex: 0,
					items: [item],
					activeSelects: [item],
					removeItem: (item) => (item),
					findSelect: (facetName) => item.expr
				} as Breadcrumbs;

				// When
				service.addFilter(facetName, aggregation["geo"], items, {replaceCurrent: true});

				// Then
				const expectedExpr = 'geo: (`Iraq`:`IRAQ`)';
				expect(searchService.query.removeSelect).toHaveBeenCalledWith(facetName);
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, facetName);
			});

			it("should add a filter with NOT options", () => {
				// breadcrumps: empty
				// expected breadcrumbs: NOT (IRAQ OR GUANTANAMO)
				// Given
				const items = aggregation["geo"].items!.slice(0, 2);
				spyOn(searchService.query, "addSelect");

				// When
				service.addFilter('Geo', aggregation["geo"], items, {not: true});

				// Then
				const expectedExpr = 'NOT (geo: (`Iraq`:`IRAQ` OR `Guantanamo`:`GUANTANAMO`))';
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, 'Geo');
			});

			it("should add a filter with AND options", () => {
				// Given
				const items = aggregation["geo"].items!.slice(0, 2);
				spyOn(searchService.query, "addSelect");

				// When
				service.addFilter('Geo', aggregation["geo"], items, {and: true});

				// Then
				const expectedExpr = 'geo: (`Iraq`:`IRAQ` AND `Guantanamo`:`GUANTANAMO`)';
				expect(searchService.query.addSelect).toHaveBeenCalledWith(expectedExpr, 'Geo');
			});

			it("should remove an item from a NOT select", () => {
				// breadcrumps: NOT(IRAQ OR GUANTANAMO OR IOWA)
				// expected breadcrumps : NOT (IRAQ OR GUANTANAMO)
				// Given
				const exprValueInitializer: ExprValueInitializer[] = [
					{
						exprContext: {appService, formatService, intlService},
						display: "Iraq",
						value: "IRAQ",
						field: "geo",
					},
					{
						exprContext: {appService, formatService, intlService},
						display: "Guantanamo",
						value: "GUANTANAMO",
						field: "geo",
					},
					{
						exprContext: {appService, formatService, intlService},
						display: "Iowa",
						value: "IOWA",
						field: "geo",
					},
				]
				const exprs: Expr[] = exprValueInitializer.map(exprValue => {
					const expr = new Expr(exprValue);
					expr.toString = () => `"${exprValue.field}\`${exprValue.value}\`"`;
					return expr;
				})

				const expr = {
					and: false,
					not: true,
					operands: [
						exprs[0],
						exprs[1],
						exprs[2]
					]
				}
				Object.assign(exprs[0], {parent: {operands: [exprs[0], exprs[1], exprs[2]]}});
				Object.assign(exprs[1], {parent: {operands: [exprs[0], exprs[1], exprs[2]]}});
				Object.assign(exprs[2], {parent: {operands: [exprs[0], exprs[1], exprs[2]]}});

				const item: BreadcrumbsItem = {
					expr,
					display: "",
					facet: "Geo",
					active: true,
				} as BreadcrumbsItem;

				spyOn(searchService.query, "removeSelect");
				spyOn(searchService.query, "replaceSelect");

				searchService.breadcrumbs = {
					activeIndex: 0,
					selects: [item],
					activeSelects: [item],
					items: [{expr: undefined, display: "abc"}, item],
					activeItem: item,
					removeItem: (item) => (item),
					findSelect: (facetName) => {}
				} as Breadcrumbs;

				// return IOWA expression
				spyOn<any>(service, "findItemFilter").and.returnValue(exprs[2]);
				// return select expression
				spyOn<any>(searchService.breadcrumbs, "findSelect").and.returnValue(exprs[2]);
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(0);

				// When remove item: IOWA
				service.removeFilter('Geo', aggregation["geo"], aggregation["geo"].items![2]); // IOWA

				// Then
				const expectedExpr = 'NOT (geo: (`Iraq`:`IRAQ` OR `Guantanamo`:`GUANTANAMO`))';
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(0, {expression: expectedExpr, facet: "Geo"});
				expect(searchService.query.removeSelect).not.toHaveBeenCalledWith(0);
			});

		});

		describe("makeAggregationExpr", () => {

			it("should returns an Expr", () => {
				// Given
				const item: AggregationItem = {count: 0, value: 'IRAQ', display: 'Iraq'}

				// When
				const expr = exprBuilder.makeAggregationExpr(aggregation["geo"], item);

				// Then
				expect(expr).toEqual("geo: (`Iraq`:`IRAQ`)");
			});

			it("should returns an Expr when flag valuesAreExpressions is true", () => {
				// Given
				// "value": "size`< 10 Ko`:(>= 0 AND < 10240)",
				// "display": "< 10 Ko",
				const item: AggregationItem = aggregation["size"].items![0];

				// When
				const expr = exprBuilder.makeAggregationExpr(aggregation["size"], item);

				// Then
				expect(expr).toEqual("size`< 10 Ko`:(>= 0 AND < 10240)");
			});

		})
	});

	describe("toAggregationItem", () => {
		it("should returns an AggregationItem", () => {
			const item = aggregation["geo"].items![0];
			const exprInitializer: ExprValueInitializer = {
				exprContext: {appService, formatService, intlService},
				display: "Iraq",
				value: "IRAQ",
				field: "country"
			};

			const expr: Expr = new Expr(exprInitializer);
			const expected = service.exprToAggregationItem(expr as Expr, aggregation["geo"].valuesAreExpressions);

			expect(expected).toEqual([{count: 0, value: item.value, display: item.display, $column: undefined, $excluded: undefined}])
		});

		it("should returns an AggregationItem", () => {
			const item = {value: "size`< 10 Ko`:(>=0 AND <10240)", display: "< 10 Ko"}

			const op1: ExprValueInitializer = {
				exprContext: {appService, formatService, intlService},
				display: undefined,
				value: "0",
				field: "size",
				operator: ExprOperator.gte
			};
			const op2: ExprValueInitializer = {
				exprContext: {appService, formatService, intlService},
				display: undefined,
				value: "10240",
				field: "size",
				operator: ExprOperator.lt
			};

			const exprInitializer: ExprOperandsInitializer = {
				exprContext: {appService, formatService, intlService},
				display: "< 10 Ko",
				and: true,
				op1: new Expr(op1),
				op2: new Expr(op2),
				field: "size"
			};

			const expr: Expr = new Expr(exprInitializer);
			const expected = service.exprToAggregationItem(expr as Expr, aggregation["size"].valuesAreExpressions);

			expect(expected).toEqual([{count: 0, value: item.value, display: item.display, $column: undefined, $excluded: undefined}])
		});
	})

	describe("breadcrumbs conversions to AggregationItem", () => {

		it("should returns aggregationItems as simples values", () => {
			// Given
			// create a breadcrumbs with initial values
			const exprValueInitializer: ExprValueInitializer = {
				exprContext: {appService, formatService, intlService},
				display: "Iraq",
				value: "IRAQ",
				field: "country"
			}
			const expr: Expr = new Expr(exprValueInitializer);

			const item: BreadcrumbsItem = {
				expr,
				display: "Iraq",
				facet: "Geo",
				active: true
			};
			searchService.breadcrumbs = {
				items: [{expr: undefined, display: "abc"}, item] as BreadcrumbsItem[],
				activeSelects: [item] as BreadcrumbsItem[]
			} as Breadcrumbs;

			const breadcrumbsItems = service.getBreadcrumbsItems("Geo", searchService.breadcrumbs);
			expect(breadcrumbsItems.length).toEqual(1);
			expect(breadcrumbsItems).toEqual([{expr: jasmine.anything(), display: "Iraq", facet: "Geo", active: true}]);

			const aggregationItems = service.exprToAggregationItem(breadcrumbsItems[0].expr as Expr, aggregation["geo"].valuesAreExpressions);
			expect(aggregationItems.length).toEqual(1);
			expect(aggregationItems).toEqual([{count: 0, value: 'IRAQ', display: 'Iraq', $column: undefined, $excluded: undefined}]);
		});

		it("should returns aggregationItems as ValuesAreExpression", () => {
			const query = new Query("training_query");
			query.text = "obama";
			query.tab = "all";
			query.addSelect("geo:((`Iraq`:(`IRAQ`)) OR (`Guantanamo`:(`GUANTANAMO`)))", "geo");
			query.addSelect("company`Washington POST`:WASHINGTON POST", "company");
			query.addSelect("size`< 10 Ko`:(>=0 AND <10240)", "size");
			query.addSelect("documentlanguages:(`fr`)", "documentlanguages");

			spyOn(query, 'copy').and.returnValue(query);
			spyOn(query, 'copyAdvanced').and.returnValue(query);

			// When
			const breadcrumbs = Breadcrumbs.create(appService, searchService, query);
			searchService.breadcrumbs = breadcrumbs;

			// Then
			expect(breadcrumbs.text instanceof Expr).toBeTrue();
			expect(breadcrumbs.text.toString()).toEqual('text:obama');
			expect(breadcrumbs.items.length).toEqual(5);
			expect(breadcrumbs.items[0].expr?.toString()).toEqual("text:obama");
			expect(breadcrumbs.items[1].expr?.toString()).toEqual("geo:(`Iraq`:IRAQ OR `Guantanamo`:GUANTANAMO)");
			expect(breadcrumbs.items[2].expr?.toString()).toEqual("company`Washington POST`:WASHINGTON POST");
			expect(breadcrumbs.items[3].expr?.toString(false)).toEqual("size`< 10 Ko`:(>=0 AND <10240)");
			expect(breadcrumbs.items[4].expr?.toString(false)).toEqual("fr");

			let expr: Expr = appService.parseExpr(breadcrumbs.items[1].expr?.toString() || "") as Expr;
			expect(expr instanceof Expr).toBeTrue();
			expect(expr.operands.length).toEqual(2);
			expect(expr.operands[0].value).toEqual("IRAQ");
			expect(expr.operands[0].field).toEqual("geo");
			expect(expr.operands[1].value).toEqual("GUANTANAMO");

			let r = service.exprToAggregationItem(expr.operands, aggregation["geo"].valuesAreExpressions);
			expect(r).toEqual([{count: 0, value: "IRAQ", display: "Iraq", $column: undefined, $excluded: undefined}, {count: 0, value: "GUANTANAMO", display: "Guantanamo", $column: undefined, $excluded: undefined}])

			expr = appService.parseExpr(breadcrumbs.items[2].expr?.toString() || "") as Expr;
			expect(expr instanceof Expr).toBeTrue();
			expect(expr.value).toEqual("WASHINGTON POST");
			expect(expr.field).toEqual("company");

			r = service.exprToAggregationItem(expr, aggregation["geo"].valuesAreExpressions);
			expect(r).toEqual([{count: 0, value: "WASHINGTON POST", display: "Washington POST", $column: undefined, $excluded: undefined}]);

			expr = appService.parseExpr(breadcrumbs.items[3].expr?.toString(false) || "") as Expr;
			expect(expr instanceof Expr).toBeTrue();
			expect(expr.operands.length).toEqual(2);
			expect(expr.operands[0].value).toEqual(">=0");
			expect(expr.operands[0].field).toEqual("size");
			expect(expr.operands[1].value).toEqual("<10240");
			expect(expr.operands[1].field).toEqual("size");

			r = service.exprToAggregationItem(expr, aggregation["size"].valuesAreExpressions);
			expect(r).toEqual([{count: 0, value: "size`< 10 Ko`:(>=0 AND <10240)", display: "< 10 Ko", $column: undefined, $excluded: undefined}]);
		});

		it("should returns aggregationItems", () => {
			// Given
			const facetName = "geo";
			const query = new Query("training_query");
			query.text = "obama";
			query.tab = "all";
			query.addSelect("geo:((`Iraq`:(`IRAQ`)) OR (`Guantanamo`:(`GUANTANAMO`)))", "geo");
			query.addSelect("company`Washington POST`:WASHINGTON POST", "company");
			query.addSelect("size`< 10 Ko`:(>=0 AND <10240)", "size");
			query.addSelect("geo:((`Iowa`:(`IOWA`)) AND (`Honolulu`:(`HONOLULU`)))", "geo");
			query.addSelect("geo`Chicago`:(`CHICAGO`)", "geo");


			spyOn(query, 'copy').and.returnValue(query);
			spyOn(query, 'copyAdvanced').and.returnValue(query);

			const breadcrumbs = Breadcrumbs.create(appService, searchService, query);
			searchService.breadcrumbs = breadcrumbs;

			// When
			const items = service.getBreadcrumbsItems(facetName, breadcrumbs);
			expect(items.length).toEqual(3);
			expect(items[0].expr?.operands.length).toEqual(2);
			expect(items[1].expr?.operands.length).toEqual(2);
			expect(items[2].expr?.operands).toBeUndefined()

			// aggregation items are constructed from nested expressions
			const r = [] as Expr[][];
			for (const item of items) {
				const value = item.expr?.operands as Expr[] || [item.expr];
				r.push(value);
			}
			// faltten results
			const result = [].concat.apply([], r);

			const aggItems = service.exprToAggregationItem(result, aggregation[facetName].valuesAreExpressions);

			// Then
			expect(aggItems.length).toEqual(5);
			expect(aggItems.map(item => item.value)).toEqual(["IRAQ", "GUANTANAMO", "IOWA", "HONOLULU", "CHICAGO"]);
		})

		it("should returns aggregationItems as ValuesAreExpression", () => {
			// Given
			const facetName = "size";
			const query = new Query("training_query");
			query.text = "obama";
			query.tab = "all";
			query.addSelect("((size`10 Ko à 100 Ko`:(>= 10240 AND < 102400)) OR (size`100 Ko à 1 Mo`:(>= 102400 AND < 1048576)))", "size");
			query.addSelect("size`1 Mo à 10 Mo`:(>= 1048576 AND < 10485760)", "size");

			spyOn(query, 'copy').and.returnValue(query);
			spyOn(query, 'copyAdvanced').and.returnValue(query);

			const breadcrumbs = Breadcrumbs.create(appService, searchService, query);
			searchService.breadcrumbs = breadcrumbs;

			// When
			const items = service.getBreadcrumbsItems(facetName, breadcrumbs);
			expect(items.length).toEqual(2);
			expect(items[0].expr?.operands.length).toEqual(2);
			expect(items[1].expr?.operands.length).toEqual(2);

			// aggregation items are constructed from nested expressions
			const r = [] as Expr[][];
			for (const item of items) {
				const value = (item.expr?.display === undefined) ? item.expr?.operands as Expr[] || item.expr : item.expr;
				r.push(value as Expr[]);
			}
			// faltten results
			const result = [].concat.apply([], r);

			const aggItems = service.exprToAggregationItem(result, aggregation[facetName].valuesAreExpressions);

			// Then
			expect(aggItems.length).toEqual(3);
			expect(aggItems.map(item => item.display)).toEqual(["10 Ko à 100 Ko", "100 Ko à 1 Mo", "1 Mo à 10 Mo"]);
		})

		it("should returns aggregationItems as boolean value", () => {
			// Given
			const facetName = "bool";
			const query = new Query("training_query");
			query.text = "obama";
			query.tab = "all";
			query.addSelect("bool:(`true`)", "bool");
			//query.addSelect("bool:((`false`) OR (`true`))", "bool");

			spyOn(query, 'copy').and.returnValue(query);
			spyOn(query, 'copyAdvanced').and.returnValue(query);

			const breadcrumbs = Breadcrumbs.create(appService, searchService, query);
			searchService.breadcrumbs = breadcrumbs;

			// When
			const items = service.getBreadcrumbsItems(facetName, breadcrumbs);
			expect(items.length).toEqual(1);
			expect(items[0].expr?.operands).toBeUndefined(); 		// (true) no operands

			// as no resolve columns are done to find column type, we fake this value here
			spyOnProperty<any>(items[0].expr, 'column', 'get').and.returnValue({eType: EngineType.bool});

			// aggregation items are constructed from nested expressions
			const r = [] as Expr[][];
			for (const item of items) {
				const value = (item.expr?.display === undefined) ? item.expr?.operands as Expr[] || item.expr : item.expr;
				r.push(value as Expr[]);
			}
			// faltten results
			const result = [].concat.apply([], r);

			// When
			const aggItems = service.exprToAggregationItem(result, aggregation[facetName].valuesAreExpressions);
			expect(aggItems.length).toEqual(1);
			expect(aggItems[0]).toEqual({count: 0, value: true, display: undefined, $column: jasmine.anything(), $excluded: undefined});
		})

		it("should returns aggregationItems as boolean values", () => {
			// Given
			const facetName = "bool";
			const query = new Query("training_query");
			query.text = "obama";
			query.tab = "all";
			query.addSelect("bool:((`false`) OR (`true`))", "bool");

			spyOn(query, 'copy').and.returnValue(query);
			spyOn(query, 'copyAdvanced').and.returnValue(query);

			const breadcrumbs = Breadcrumbs.create(appService, searchService, query);
			searchService.breadcrumbs = breadcrumbs;

			// When
			const items = service.getBreadcrumbsItems(facetName, breadcrumbs);
			expect(items.length).toEqual(1);
			expect(items[0].expr?.operands).toBeDefined(); 		// (false, true) operands

			// as no resolve columns are done to find column type, we fake this value here
			spyOnProperty<any>(items[0].expr?.operands[0], 'column', 'get').and.returnValue({eType: EngineType.bool});
			spyOnProperty<any>(items[0].expr?.operands[1], 'column', 'get').and.returnValue({eType: EngineType.bool});

			// aggregation items are constructed from nested expressions
			const r = [] as Expr[][];
			for (const item of items) {
				const value = (item.expr?.display === undefined) ? item.expr?.operands as Expr[] || item.expr : item.expr;
				r.push(value as Expr[]);
			}
			// faltten results
			const result = [].concat.apply([], r);

			// When
			const aggItems = service.exprToAggregationItem(result, aggregation[facetName].valuesAreExpressions);
			expect(aggItems.length).toEqual(2);
			expect(aggItems[0]).toEqual({count: 0, value: false, display: undefined, $column: jasmine.anything(), $excluded: undefined});
			expect(aggItems[1]).toEqual({count: 0, value: true, display: undefined, $column: jasmine.anything(), $excluded: undefined});
		})

	})
});
