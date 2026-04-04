import {Overlay} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {HttpHandler} from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Router} from '@angular/router';
import {SearchService} from '@sinequa/components/search';

import {IntlModule} from '@sinequa/core/intl';
import {AuthenticationService, LoginService, MODAL_LOGIN} from '@sinequa/core/login';
import {MODAL_CONFIRM, MODAL_PROMPT} from '@sinequa/core/modal';
import {START_CONFIG} from '@sinequa/core/web-services';

import {AppLocalesConfig} from '@testing/mocks/app.locales.config';
import {startConfig} from '@testing/mocks/start.config';
import {RouterStub} from '@testing/stubs';
import {FacetService} from '../../facet.service';

import {BsFacetModule} from '../facet.module';
import {BsFacetList} from './facet-list';
import {NumberPipe, ValuePipe} from '@sinequa/components/utils';

describe('BsFacetList', () => {
    let context: BsFacetList;
    let fixture: ComponentFixture<BsFacetList>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BsFacetList, ValuePipe, NumberPipe],
            imports: [
                CommonModule,
                IntlModule.forRoot(AppLocalesConfig),
                BsFacetModule.forRoot()
            ],
            providers: [
                HttpHandler,
                FacetService,
                SearchService,
                LoginService,
                AuthenticationService,
                Overlay,
                ValuePipe,
                NumberPipe,
                {provide: Router, useClass: RouterStub},
                {provide: START_CONFIG, useValue: startConfig},
                {provide: MODAL_LOGIN, useValue: {}},
                {provide: MODAL_CONFIRM, useValue: {}},
                {provide: MODAL_PROMPT, useValue: {}},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BsFacetList);
        context = fixture.debugElement.componentInstance;
    });

    it('should be created', () => {
        fixture.detectChanges();
        expect(context).toBeTruthy();
    });

    describe('filterItem', () => {
        let addFilterSpy: jasmine.Spy;
        let removeFilterSpy: jasmine.Spy;

        const makeItem = (value: string, filtered = false) =>
            ({ value, count: 1, $filtered: filtered } as any);

        beforeEach(() => {
            addFilterSpy = spyOn(context, 'addFilter');
            removeFilterSpy = spyOn(context, 'removeFilter');
            context.data = { column: 'treepath', isTree: true, $filtered: [] } as any;
        });

        it('should call addFilter with the single item when no items are already filtered', () => {
            const item = makeItem('SourceA');
            context.filterItem(item);
            expect(addFilterSpy).toHaveBeenCalledOnceWith(item);
        });

        it('should call addFilter with all filtered items + new item and replaceCurrent:true when items are already filtered (ES-31072)', () => {
            const existing = makeItem('SourceA', true);
            const newItem = makeItem('SourceB');
            context.data!.$filtered = [existing];

            context.filterItem(newItem);

            expect(addFilterSpy).toHaveBeenCalledOnceWith([existing, newItem], { replaceCurrent: true });
        });

        it('should call removeFilter when the clicked item is already filtered', () => {
            const item = makeItem('SourceA', true);
            context.filterItem(item);
            expect(removeFilterSpy).toHaveBeenCalledOnceWith(item);
            expect(addFilterSpy).not.toHaveBeenCalled();
        });

        it('should combine three items using OR when two are already filtered', () => {
            const a = makeItem('SourceA', true);
            const b = makeItem('SourceB', true);
            const c = makeItem('SourceC');
            context.data!.$filtered = [a, b];

            context.filterItem(c);

            expect(addFilterSpy).toHaveBeenCalledOnceWith([a, b, c], { replaceCurrent: true });
        });
    });

    describe('addFilter', () => {
        let addFilterSearchSpy: jasmine.Spy;

        beforeEach(() => {
            const facetService = fixture.debugElement.injector.get(FacetService);
            addFilterSearchSpy = spyOn(facetService, 'addFilterSearch');
            context.data = { column: 'treepath', isTree: true, $filtered: [] } as any;
        });

        it('should use component replaceCurrent when no explicit value is provided', () => {
            context.replaceCurrent = false;
            const item = { value: 'SourceA', count: 1 } as any;
            context.addFilter(item);
            expect(addFilterSearchSpy).toHaveBeenCalledOnceWith(
                context.data, item, jasmine.objectContaining({ replaceCurrent: false }), undefined, undefined
            );
        });

        it('should respect explicit replaceCurrent:true and not override it (ES-31072)', () => {
            context.replaceCurrent = false;
            const item = { value: 'SourceA', count: 1 } as any;
            context.addFilter(item, { replaceCurrent: true });
            expect(addFilterSearchSpy).toHaveBeenCalledOnceWith(
                context.data, item, jasmine.objectContaining({ replaceCurrent: true }), undefined, undefined
            );
        });

        it('should set and:true when allowOr is false and allowAnd is true', () => {
            context.allowOr = false;
            context.allowAnd = true;
            const item = { value: 'SourceA', count: 1 } as any;
            context.addFilter(item);
            expect(addFilterSearchSpy).toHaveBeenCalledOnceWith(
                context.data, item, jasmine.objectContaining({ and: true }), undefined, undefined
            );
        });
    });

    // it('should display data', () => {
    //     // stub FacetService to returns mocked data
    //     const service = TestBed.inject(FacetService);
    //     spyOn(service, 'getAggregation').and.returnValue(AGGREGATION_GEO as ListAggregation);

    //     // @Input()
    //     context.name = "Geo";
    //     context.results = RESULTS as any;
    //     context.searchItems.selected = true;

    //     expect(context.data).toBeUndefined();
    //     expect(context.isHidden()).toBeTrue();

    //     context.ngOnChanges({results: {} as SimpleChange});
    //     fixture.detectChanges();

    //     // DOM expectations
    //     // - 11 rows
    //     // - no selected rows
    //     const DOM = fixture.nativeElement;
    //     expect(DOM.querySelectorAll(".list-group-item").length).toEqual(11);
    //     expect(DOM.querySelectorAll(".list-group-item-primary").length).toEqual(0);

    //     // Components expectations
    //     expect(context.data?.name).toEqual("Geo");
    //     expect(context.isHidden()).toBeFalse();

    //     expect(context.actions.length).toBeGreaterThan(0);
    //     expect(context.searchItems.selected).toBeFalse();
    // });

    // it("should mark an item selected on user's click", () => {
    //     // stub FacetService to returns mocked data
    //     const service = TestBed.inject(FacetService);
    //     spyOn(service, 'getAggregation').and.returnValue(AGGREGATION_CONCEPTS as unknown as ListAggregation);
    //     spyOn(context, 'ngOnChanges').and.callThrough();
    //     spyOn(context, 'selectItem').and.callThrough();

    //     // @Input()
    //     context.name = 'Geo';
    //     context.results = RESULTS as any;
    //     context.searchItems.selected = true;

    //     // trigger manually an ngOnChanges's event
    //     context.ngOnChanges({results: {} as SimpleChange});
    //     fixture.detectChanges();

    //     // user's click on 4th row
    //     const el: HTMLElement | null = fixture.nativeElement.querySelectorAll("div.list-group-item")[4];
    //     el?.click();

    //     fixture.detectChanges();

    //     // DOM expectations
    //     // - 4th row is selected
    //     // - only 1 row selected
    //     // - selected row's title has changed from "select" to "unselect"
    //     const selectedElements = fixture.nativeElement.querySelectorAll(".sq-selected");

    //     expect(selectedElements.length).toEqual(1);
    //     expect(el?.classList).toContain("sq-selected");
    //     expect(el?.title).toEqual("msg#facet.itemUnselect");

    //     // Component expectations
    //     expect(context.items[4].$selected).toBeTrue();
    //     expect(context.selected.length).toEqual(1);

    //     expect(context.selectItem).toHaveBeenCalledTimes(1);
    //     expect(context.ngOnChanges).toHaveBeenCalledTimes(1);
    // })
});
