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
import {AuthService} from 'ng2-ui-auth';

import {AppLocalesConfig} from '@testing/mocks/app.locales.config';
import {startConfig} from '@testing/mocks/start.config';
import {RouterStub} from '@testing/stubs';
import {FacetService} from '../../facet.service';

import {SimpleChange} from '@angular/core';
import {BsFacetModule} from '../facet.module';
import {BsFacetList} from './facet-list';
import {RESULTS} from '@sinequa/components/__tests__/mocks/results';
import {AGGREGATION_CONCEPTS, AGGREGATION_GEO} from '@sinequa/components/__tests__/mocks/aggregations';
import {NumberPipe, ValuePipe} from '@sinequa/components/utils';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

describe('BsFacetList', () => {
    let context: BsFacetList;
    let fixture: ComponentFixture<BsFacetList>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BsFacetList, ValuePipe, NumberPipe],
            imports: [
                CommonModule,
                IntlModule.forRoot(AppLocalesConfig),
                TooltipModule,
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
                {provide: AuthService, useValue: {}},
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

    it('should display data', () => {
        // stub FacetService to returns mocked data
        const service = TestBed.inject(FacetService);
        spyOn(service, 'getAggregation').and.returnValue(AGGREGATION_GEO);
        spyOn(context, 'refreshFiltered').and.callThrough();

        // @Input()
        context.name = "Geo";
        context.results = RESULTS as any;
        context.searchBar = true;

        expect(context.data()).toBeUndefined();
        expect(context.count).toEqual(0);
        expect(context.isHidden()).toBeTrue();

        context.ngOnChanges({results: {} as SimpleChange});
        fixture.detectChanges();

        // DOM expectations
        // - 11 rows
        // - no selected rows
        const DOM = fixture.nativeElement;
        expect(DOM.querySelectorAll(".facet-row").length).toEqual(11);
        expect(DOM.querySelectorAll(".list-group-item-primary").length).toEqual(0);

        // Components expectations
        expect(context.getName()).toEqual("Geo");
        expect(context.data()?.name).toEqual("Geo");
        expect(context.count).toEqual(10);
        expect(context.isHidden()).toBeFalse();

        expect(context.actions.length).toBeGreaterThan(0);
        expect(context.searchBar).toBeFalse();
        expect(context.filtered.length).toEqual(0);
        expect(context.skip).toEqual(0);
        expect(context.searchQuery.value).toEqual("");
        expect(context.noResults).toBeFalse();
        expect(context.suggestions$.getValue().length).toEqual(0);

        expect(context.refreshFiltered).toHaveBeenCalledTimes(1);
    });

    it("should mark an item selected on user's click", () => {
        // stub FacetService to returns mocked data
        const service = TestBed.inject(FacetService);
        spyOn(service, 'getAggregation').and.returnValue(AGGREGATION_CONCEPTS);
        spyOn(context, 'refreshFiltered').and.callThrough();
        spyOn(context, 'ngOnChanges').and.callThrough();
        spyOn(context, 'selectItem').and.callThrough();

        // @Input()
        context.name = 'Geo';
        context.results = RESULTS as any;
        context.searchBar = true;

        // trigger manually an ngOnChanges's event
        context.ngOnChanges({results: {} as SimpleChange});
        fixture.detectChanges();

        // user's click on 4th row
        const el: HTMLElement | null = fixture.nativeElement.querySelectorAll("div.facet-row")[4];
        el?.click();

        fixture.detectChanges();

        // DOM expectations
        // - 4th row is selected
        // - only 1 row selected
        // - selected row's title has changed from "select" to "unselect"
        const selectedElements = fixture.nativeElement.querySelectorAll(".list-group-item-primary");

        expect(selectedElements.length).toEqual(1);
        expect(el?.classList).toContain("list-group-item-primary");
        expect(el?.title).toEqual("msg#facet.itemUnselect");

        // Component expectations
        expect(context.items$.getValue()[4].$selected).toBeTrue();
        expect(context.selected.length).toEqual(1);

        expect(context.selectItem).toHaveBeenCalledTimes(1);
        expect(context.ngOnChanges).toHaveBeenCalledTimes(1);
    })
});