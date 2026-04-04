import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchService } from '@sinequa/components/search';
import { AppService, FormatService, Query } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { START_CONFIG } from '@sinequa/core/web-services';
import { startConfig } from '@testing/mocks/start.config';
import { ALL_FACETS, DEFAULT_FACETS, FacetService } from '../../facet.service';
import { BsMySearch } from './facet-mysearch';

describe('BsMySearch', () => {
    let context: BsMySearch;
    let fixture: ComponentFixture<BsMySearch>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BsMySearch],
            providers: [
                {
                    provide: SearchService,
                    useValue: {
                        search: jasmine.createSpy('search'),
                        query: new Query('test'),
                        isSearchRouteActive: () => true
                    }
                },
                { provide: AppService, useValue: { getColumn: () => null, getPluralLabel: () => '', getSingularLabel: () => '' } },
                { provide: FormatService, useValue: {} },
                { provide: IntlService, useValue: { init: () => Promise.resolve() } },
                { provide: FacetService, useValue: { getAggregation: () => null } },
                { provide: ALL_FACETS, useValue: [] },
                { provide: DEFAULT_FACETS, useValue: [] },
                { provide: START_CONFIG, useValue: startConfig },
            ]
        })
        .overrideComponent(BsMySearch, { set: { template: '' } })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BsMySearch);
        context = fixture.componentInstance;
    });

    describe('removeItem()', () => {

        it('should do nothing when the item is not in the list', () => {
            context['items'] = [];

            context.removeItem({ display: 'unknown' });

            expect(context.searchService.search).not.toHaveBeenCalled();
        });

        /**
         * Bug fix — ES-31290:
         * With ignoreText=true (default), selects start at index 0 in this.items.
         * The old code used splice(index - 1, 1), so removing items[1] (select2) would
         * call splice(0, 1) and remove select1 instead.
         * The fix uses findIndex on query.select to get the correct splice index.
         */
        it('should remove the correct select using findIndex, not the items array position', () => {
            const select1 = { expression: 'field1:value1' };
            const select2 = { expression: 'field2:value2' };
            const item1: any = { display: 'value1', select: select1 };
            const item2: any = { display: 'value2', select: select2 };

            context['items'] = [item1, item2]; // ignoreText=true: items[0]=select1, items[1]=select2
            context.searchService.query.select = [select1, select2] as any;

            context.removeItem(item2); // remove select2 at items[1], query.select[1]

            // Old code: splice(index - 1) = splice(0) → would remove select1 (wrong)
            // New code: splice(findIndex result) = splice(1) → removes select2 (correct)
            expect(context.searchService.query.select).toEqual([select1] as any);
            expect(context.searchService.search).toHaveBeenCalledOnceWith();
        });

        it('should not splice query.select when the expression is not found', () => {
            const select1 = { expression: 'field1:value1' };
            const item: any = { display: 'ghost', select: { expression: 'not:in:query' } };

            context['items'] = [item];
            context.searchService.query.select = [select1] as any;

            context.removeItem(item);

            expect(context.searchService.query.select).toEqual([select1] as any);
            expect(context.searchService.search).toHaveBeenCalled();
        });

        it('should remove a filter via query.removeFilters', () => {
            const filter: any = { field: 'modified', operator: 'gte', value: '2024-01-01' };
            const filterItem: any = { display: '2024-01-01', filter };
            spyOn(context.searchService.query, 'removeFilters');

            context['items'] = [filterItem];
            context.removeItem(filterItem);

            expect(context.searchService.query.removeFilters).toHaveBeenCalled();
            expect(context.searchService.search).toHaveBeenCalled();
        });
    });
});
