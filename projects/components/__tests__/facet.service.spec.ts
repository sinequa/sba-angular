import {TestBed} from "@angular/core/testing";

import {UserSettingsWebService, Aggregation, AggregationItem} from '@sinequa/core/web-services';
import {AppService, FormatService, Expr, ExprValueInitializer} from '@sinequa/core/app-utils';
import {IntlService} from '@sinequa/core/intl';

import {AGGREGATION_GEO, FACETS, AGGREGATION_SIZE} from './mocks/mock';
import {FacetService, DEFAULT_FACETS, FacetEventType} from '../facet';
import {SearchService, Breadcrumbs, BreadcrumbsItem} from '../search';
import {SuggestService} from '../autocomplete';

describe("FacetService", () => {
	const aggregation = {geo: AGGREGATION_GEO as Aggregation, size: AGGREGATION_SIZE as unknown as Aggregation};
	let service: FacetService;
	let searchService: SearchService;

	beforeEach(() => {
		const userSettingsWebServiceStub = () => ({
			events: {subscribe: f => f({})},
			patch: (object, auditEvents) => ({subscribe: f => f({})}),
			timezone: {},
			userSettings: {}
		});

		const searchServiceStub = () => ({
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
				{provide: SearchService, useFactory: searchServiceStub},
				{
					provide: UserSettingsWebService, useFactory: userSettingsWebServiceStub
				},
				{provide: SuggestService, useFactory: () => {}},
				{provide: AppService, useFactory: () => {}},
				{provide: IntlService, useFactory: () => {}},
				{provide: FormatService, useFactory: () => {}},
				{provide: DEFAULT_FACETS, useValue: FACETS}
			]
		});
		service = TestBed.inject(FacetService);
		searchService = TestBed.inject(SearchService);
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
				const items = aggregation["geo"].items[0];
				spyOn(service, 'addFilter');
				spyOn(service.events, 'next');

				// When
				service.addFilterSearch("Geo", aggregation["geo"], items);

				// Then
				expect(service.addFilter).toHaveBeenCalledWith("Geo", aggregation["geo"], items, {});
				expect(service.events.next).toHaveBeenCalledWith({type: FacetEventType.AddFilter, facet: undefined});
			})
		});

		describe("removeFilter", () => {
			it("should remove a single value filter", () => {
				const items = aggregation["size"].items[0];
				const appService = TestBed.inject(AppService);
				const formatService = TestBed.inject(FormatService);
				const intlService = TestBed.inject(IntlService);
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
				searchService.breadcrumbs = {
					items: [] as BreadcrumbsItem[],
					activeSelects: [item] as BreadcrumbsItem[]
				} as Breadcrumbs;
				searchService.breadcrumbs.items = [{expr: undefined, display: "abc"}, item];

				spyOn(searchService.query, "removeSelect");
				spyOn<any>(service, "findItemFilter").and.returnValue(item.expr)

				service.removeFilter("Size", aggregation["size"], items);

				expect(searchService.query.removeSelect).toHaveBeenCalledWith(0);
			});

			it("should remove a selection filter", () => {
				const items = aggregation["size"].items[1];
				const appService = TestBed.inject(AppService);
				const formatService = TestBed.inject(FormatService);
				const intlService = TestBed.inject(IntlService);
				const exprValueInitializer: ExprValueInitializer = {
					exprContext: {appService, formatService, intlService},
					display: "< 10 Ko",
					value: undefined,
					field: "size",
				}
				const expr: Expr = new Expr(exprValueInitializer);
				expr.toString = () =>  "size`< 10 Ko`:(>= 0 AND < 10240)";

				const item: BreadcrumbsItem = {
					expr,
					display: "< 10 Ko",
					facet: "Size",
					active: true,
				};

				exprValueInitializer.display = "10 Ko à 100 Ko";
				const expr2: Expr = new Expr(exprValueInitializer);
				expr2.toString = () =>  "size`10 Ko à 100 Ko`:(>= 10240 AND < 102400)";

				const item2: BreadcrumbsItem = {
					expr: expr2,
					display: "10 Ko à 100 Ko",
					facet: "Size",
					active: false
				};

				searchService.breadcrumbs = {
					activeIndex: 1,
					items: [{expr: undefined, display: "abc"}, item, item2] as BreadcrumbsItem[],
					activeSelects: [item, item2] as BreadcrumbsItem[]
				} as Breadcrumbs;

				spyOn(searchService.query, "removeSelect");
				spyOn(searchService.query, "replaceSelect");
				spyOn<any>(service,"makeExpr").and.callThrough();

				Object.assign(item2.expr, {parent: {operands: [item.expr, item2.expr]}});
				spyOn<any>(service, "findItemFilter").and.returnValue(item2.expr);

				service.removeFilter("Size", aggregation["size"], items);

				expect(service["makeExpr"]).toHaveBeenCalledWith("Size", jasmine.anything(), [{count:0, value: "size`< 10 Ko`:(>= 0 AND < 10240)", display: "< 10 Ko"}], jasmine.anything());
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(1, {expression: "size`< 10 Ko`:(>= 0 AND < 10240)", facet: "Size"});
				expect(searchService.query.removeSelect).not.toHaveBeenCalled();
			});
		})

		describe("addFilter", () => {

			it("should add a single value filter", () => {
				// Given
				const items = aggregation["geo"].items[0];
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation["geo"], items);

				// Then
				const expectedExpr = 'geo`Iraq`:(`IRAQ`)';
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, 'Geo', undefined);
			})

			it("should do nothing when items is undefined or []", () => {
				// Given
				const testCases = [
					{items: undefined as unknown as AggregationItem},
					{items: [] as AggregationItem[]}
				];
				spyOn<any>(service, "_addFacetFilter");

				// When Then
				testCases.forEach((test) => {
					service.addFilter('Geo', aggregation["geo"], test.items);
					expect(service['_addFacetFilter']).not.toHaveBeenCalled();
				})
			});

			it("should add a single value filter when items is an array of 1 element", () => {
				// Given
				const items = aggregation["geo"].items.slice(0, 1);
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation["geo"], items);

				// Then
				const expectedExpr = 'geo`Iraq`:(`IRAQ`)';
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, 'Geo', undefined);
			});

			it("should add a filter when items is an array", () => {
				// Given
				const items = aggregation["geo"].items.slice(0, 2);
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation["geo"], items);

				// Then
				const expectedExpr = 'geo:((`Iraq`:(`IRAQ`)) OR (`Guantanamo`:(`GUANTANAMO`)))';
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, 'Geo', undefined);
			});

			it("should append an item to the previous selection when coming from same Facet", () => {
				// Given
				spyOn<any>(service, "_addFacetFilter");
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
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items[2]); // IOWA

				// Then
				const expectedExpr = 'geo:((`Iraq`:(`IRAQ`)) OR (`Guantanamo`:(`GUANTANAMO`)) OR (`Iowa`:(`IOWA`)))';
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(0, {expression: expectedExpr, facet: "Geo"})
				expect(service['_addFacetFilter']).not.toHaveBeenCalled();
			});

			it("should append an item to the previous single value when coming from same Facet", () => {
				// Given
				spyOn<any>(service, "_addFacetFilter");
				spyOn(searchService.query, "replaceSelect");

				searchService.breadcrumbs = {
					activeIndex: 0,
					activeSelects: [{}],
					removeItem: (item) => (item),
					findSelect: (facetName) => ({value: "IRAQ", display: "Iraq", toString: (withFields: boolean = true) => "IRAQ"})
				} as Breadcrumbs;
				spyOn<any>(searchService.breadcrumbs?.activeSelects, "findIndex").and.returnValue(0);

				// When
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items[2]); // IOWA

				// Then
				const expectedExpr = 'geo:((`Iraq`:(`IRAQ`)) OR (`Iowa`:(`IOWA`)))';
				expect(searchService.query.replaceSelect).toHaveBeenCalledWith(0, {expression: expectedExpr, facet: "Geo"})
				expect(service['_addFacetFilter']).not.toHaveBeenCalled();
			});

			it("should add a new filter if operator is not equal (with AND operator)", () => {
				// Given
				spyOn<any>(service, "_addFacetFilter");
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
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items.slice(2, 4), {and: true}); // [IOWA, NEW HAMPSHIRE]

				// Then
				const expectedExpr = 'geo:((`Iowa`:(`IOWA`)) AND (`New Hampshire`:(`NEW HAMPSHIRE`)))';
				expect(searchService.query.replaceSelect).not.toHaveBeenCalled();
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, "Geo", undefined);
			});

			it("should add a new filter if operator is not equal (with OR operator)", () => {
				// Given
				spyOn<any>(service, "_addFacetFilter");
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
				service.addFilter('Geo', aggregation["geo"], aggregation["geo"].items.slice(2, 4)); // [IOWA, NEW HAMPSHIRE]

				// Then
				const expectedExpr = 'geo:((`Iowa`:(`IOWA`)) OR (`New Hampshire`:(`NEW HAMPSHIRE`)))';
				expect(searchService.query.replaceSelect).not.toHaveBeenCalled();
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, "Geo", undefined);
			});

			it("should remove replace current select when options is replaceCurrent", () => {
				// Given
				const items = aggregation["geo"].items[0];
				const facetName = "Geo";
				spyOn<any>(service, "_addFacetFilter");
				spyOn(searchService.query, "removeSelect");

				// When
				service.addFilter(facetName, aggregation["geo"], items, {replaceCurrent: true});

				// Then
				const expectedExpr = 'geo`Iraq`:(`IRAQ`)';
				expect(searchService.query.removeSelect).toHaveBeenCalledWith(facetName);
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, facetName, undefined);
			});

			it("should add a filter with NOT options", () => {
				// Given
				const items = aggregation["geo"].items.slice(0, 2);
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation["geo"], items, {not: true});

				// Then
				const expectedExpr = 'geo:((`Iraq`:(`IRAQ`)) OR (`Guantanamo`:(`GUANTANAMO`)))';
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, 'Geo', true);
			});

			it("should add a filter with AND options", () => {
				// Given
				const items = aggregation["geo"].items.slice(0, 2);
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation["geo"], items, {and: true});

				// Then
				const expectedExpr = 'geo:((`Iraq`:(`IRAQ`)) AND (`Guantanamo`:(`GUANTANAMO`)))';
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, 'Geo', undefined);
			});

		});

		describe("makeFacetExpr", () => {

			it("should returns an Expr", () => {
				// Given
				const item: AggregationItem = {count: 0, value: 'IRAQ', display: 'Iraq'}

				// When
				const expr = FacetService['makeFacetExpr'](aggregation["geo"], item);

				// Then
				expect(expr).toEqual("geo`Iraq`:(`IRAQ`)");
			});

			it("should returns an Expr when flag valuesAreExpressions is true", () => {
				// Given
				// "value": "size`< 10 Ko`:(>= 0 AND < 10240)",
				// "display": "< 10 Ko",
				const item: AggregationItem = aggregation["size"].items[0];

				// When
				const expr = FacetService['makeFacetExpr'](aggregation["size"], item);

				// Then
				expect(expr).toEqual("size`< 10 Ko`:(>= 0 AND < 10240)");
			});

		})
	});
});
