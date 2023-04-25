import { ChangeDetectionStrategy, Component, ContentChild, Input, OnChanges, TemplateRef } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { map, Observable, tap } from "rxjs";

@Component({
  selector: 'sq-result-duplicates-list',
  templateUrl: './result-duplicates-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultDuplicatesListComponent implements OnChanges {
  @Input() record: Record;

  @ContentChild(TemplateRef) duplicateTpl?: TemplateRef<any>;

  duplicates$: Observable<Record[]> | undefined;
  searching = false;

  constructor(
    public searchService: SearchService,
    public appService: AppService
  ) {}

  ngOnChanges() {
    const groupByFields = this.getGroupByFields();
    this.duplicates$ = undefined;
    if(groupByFields.length > 0) {
      const query = this.searchService.makeQuery();
      for(let field of groupByFields) {
        const value = this.record[field];
        if(!value) {
          console.error(`Field ${field} does not exist in record ${this.record.id}`);
          return;
        }
        query.addFilter({field, value});
      }
      query.addFilter({field: "id", operator: 'neq', value: this.record.id});
      query.groupBy = 'id'; // Hack to override the group by applied by the web service
      this.searching = true;
      this.duplicates$ = this.searchService.getResults(query, undefined, {searchInactive: true}).pipe(
        tap(r => this.record.groupcount = r.rowCount + 1), // It's possible that this query finds more duplicates than the original groupcount, because it is computed without filter
        map(r => r.records),
        tap(() => this.searching = false)
      );
    }
  }

  getGroupByFields(): string[] {
    // Note: to be replaced by the actual value of the group by clause to be included in the results
    if(this.searchService.query.groupBy) {
      return this.searchService.query.groupBy.trim().split(' ');
    }
    else if(this.appService.ccquery?.['removeDuplicates']) {
      if(this.appService.ccquery?.['useNearHash']) {
        return ["nearhash"];
      }
      else {
        return ["exacthash"];
      }
    }
    return [];
  }

}
