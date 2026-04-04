import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacetConfig } from '../../facet-config';
import { FacetService } from '../../facet.service';
import { BsFacetFilters } from './facet-filters';

const mockFacetService = {
    changes: { subscribe: () => ({ unsubscribe: () => {} }) },
    isFacetIncluded: () => true,
    getAggregation: () => null,
    facets: null,
    defaultFacets: null,
    allFacets: null,
    createFacetMenu: () => null
};

describe('BsFacetFilters', () => {
    let context: BsFacetFilters;
    let fixture: ComponentFixture<BsFacetFilters>;
    let detectChangesSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BsFacetFilters],
            providers: [
                { provide: FacetService, useValue: mockFacetService },
                { provide: ChangeDetectorRef, useValue: { detectChanges: () => {} } }
            ]
        })
        .overrideComponent(BsFacetFilters, { set: { template: '' } })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BsFacetFilters);
        context = fixture.componentInstance;
        // Prevent ngOnDestroy from failing if ngOnChanges was never called
        context['sub'] = { unsubscribe: jasmine.createSpy('unsubscribe') } as any;
        detectChangesSpy = spyOn(context['cdRef'], 'detectChanges');
    });

    describe('openFacet()', () => {

        it('should set openedFacet when no facet was previously open', () => {
            const facet = { name: 'facetA' } as FacetConfig<{}>;

            context.openFacet(facet);

            expect(context.openedFacet).toBe(facet);
            expect(detectChangesSpy).not.toHaveBeenCalled();
        });

        /**
         * Bug fix — ES-31290:
         * The old code called cdRef.detectChanges() whenever any facet was already open,
         * even when switching to a *different* facet. This detectChanges() fired mid-click
         * alongside Bootstrap's data-bs-toggle="dropdown", causing Angular to re-evaluate
         * the template and close the dropdown before the user could interact.
         *
         * Fix: only call detectChanges() when the *same* facet is re-opened (to force
         * sqLoadComponent to re-emit). When switching to a different facet, Angular
         * handles the *ngIf transition naturally without an intermediate detectChanges().
         */
        it('should NOT call detectChanges when switching from one facet to a different one', () => {
            const facetA = { name: 'facetA' } as FacetConfig<{}>;
            const facetB = { name: 'facetB' } as FacetConfig<{}>;
            context.openedFacet = facetA;
            detectChangesSpy.calls.reset();

            context.openFacet(facetB);

            expect(detectChangesSpy).not.toHaveBeenCalled();
            expect(context.openedFacet).toBe(facetB);
        });

        it('should call detectChanges once when re-opening the same facet (to force component reload)', () => {
            const facet = { name: 'facetA' } as FacetConfig<{}>;
            context.openedFacet = facet;
            detectChangesSpy.calls.reset();

            context.openFacet(facet);

            expect(detectChangesSpy).toHaveBeenCalledTimes(1);
            expect(context.openedFacet).toBe(facet);
        });
    });
});
