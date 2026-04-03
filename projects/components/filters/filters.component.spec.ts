import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchService } from '@sinequa/components/search';
import { AppService, Query } from '@sinequa/core/app-utils';
import { START_CONFIG } from '@sinequa/core/web-services';
import { startConfig } from '@testing/mocks/start.config';
import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
    let context: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;
    let searchSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FiltersComponent],
            providers: [
                { provide: AppService, useValue: { getColumn: () => null, getPluralLabel: () => '', getSingularLabel: () => '' } },
                { provide: SearchService, useValue: { search: jasmine.createSpy('search') } },
                { provide: START_CONFIG, useValue: startConfig }
            ]
        })
        .overrideComponent(FiltersComponent, { set: { template: '' } })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FiltersComponent);
        context = fixture.componentInstance;
        searchSpy = context.searchService.search as jasmine.Spy;

        const query = new Query('test');
        const filter: any = { field: 'modified', operator: 'gte', value: '2024-01-01' };
        query.filters = filter;
        context.query = query;
        context.filter = filter;
    });

    describe('remove()', () => {

        it('should call removeFilters on the query', () => {
            spyOn(context.query, 'removeFilters').and.callThrough();

            context.remove();

            expect(context.query.removeFilters).toHaveBeenCalled();
        });

        it('should emit filterEdit with the updated query', () => {
            const emitSpy = spyOn(context.filterEdit, 'emit');

            context.remove();

            expect(emitSpy).toHaveBeenCalledWith(context.query);
        });

        /**
         * Bug fix — ES-31290 / ES-31340:
         * remove() emitted filterEdit but never called searchService.search(), so
         * the results were not updated when a filter was removed via allowRemove="true".
         */
        it('should call searchService.search() to apply the filter removal', () => {
            context.remove();

            expect(searchSpy).toHaveBeenCalled();
        });
    });
});
