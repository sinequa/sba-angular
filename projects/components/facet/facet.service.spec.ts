import {TestBed} from "@angular/core/testing";

import {UserSettingsWebService, Aggregation, AggregationItem} from '@sinequa/core/web-services';
import {AppService, FormatService} from '@sinequa/core/app-utils';
import {IntlService} from '@sinequa/core/intl';

import {FacetService, FacetEventType, DEFAULT_FACETS} from "./facet.service";
import {SuggestService} from '../autocomplete';
import {SearchService} from '../search';

import {AGGREGATION, FACETS} from './mock';

describe("FacetService", () => {
	const aggregation: Aggregation = AGGREGATION as Aggregation;
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

		describe("addFilterSearch", () => {

			it("should trigger an event", () => {
				// Given
				const items = aggregation.items[0];
				spyOn(service, 'addFilter');
				spyOn(service.events, 'next');

				// When
				service.addFilterSearch("Geo", aggregation, items);

				// Then
				expect(service.addFilter).toHaveBeenCalledWith("Geo", aggregation, items, {});
				expect(service.events.next).toHaveBeenCalledWith({type: FacetEventType.AddFilter, facet: undefined});
			})
		});

		describe("addFilter", () => {

			it("should add a single value filter", () => {
				// Given
				const items = aggregation.items[0];
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation, items);

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
					service.addFilter('Geo', aggregation, test.items);
					expect(service['_addFacetFilter']).not.toHaveBeenCalled();
				})
			});

			it("should add a single value filter when items is an array of 1 element", () => {
				// Given
				const items = aggregation.items.slice(0, 1);
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation, items);

				// Then
				const expectedExpr = 'geo`Iraq`:(`IRAQ`)';
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, 'Geo', undefined);
			});

			it("should add a filter when items is an array", () => {
				// Given
				const items = aggregation.items.slice(0, 2);
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation, items);

				// Then
				const expectedExpr = 'geo:((`Iraq`:(`IRAQ`)) OR (`Guantanamo`:(`GUANTANAMO`)))';
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, 'Geo', undefined);
			});

			it("should remove select before when options is replaceCurrent", () => {
				// Given
				const items = aggregation.items[0];
				const facetName = "Geo";
				spyOn<any>(service, "_addFacetFilter");
				spyOn(searchService.query, "removeSelect");

				// When
				service.addFilter(facetName, aggregation, items, {replaceCurrent: true});

				// Then
				const expectedExpr = 'geo`Iraq`:(`IRAQ`)';
				expect(searchService.query.removeSelect).toHaveBeenCalledWith(facetName);
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, facetName, undefined);
			});

			it("should add a filter when items is an array with NOT options", () => {
				// Given
				const items = aggregation.items.slice(0, 2);
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation, items, {not: true});

				// Then
				const expectedExpr = 'geo:((`Iraq`:(`IRAQ`)) OR (`Guantanamo`:(`GUANTANAMO`)))';
				expect(service['_addFacetFilter']).toHaveBeenCalledWith(expectedExpr, 'Geo', true);
			});

			it("should add a filter when items is an array with AND options", () => {
				// Given
				const items = aggregation.items.slice(0, 2);
				spyOn<any>(service, "_addFacetFilter");

				// When
				service.addFilter('Geo', aggregation, items, {and: true});

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
				const expr = FacetService['makeFacetExpr'](aggregation, item);

				// Then
				expect(expr).toEqual("geo`Iraq`:(`IRAQ`)");
			})
		})
	});
});
