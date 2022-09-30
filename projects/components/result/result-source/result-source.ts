import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {ValueItem} from "@sinequa/core/app-utils";
import {AuditEventType, Record} from "@sinequa/core/web-services";
import {SearchService} from "@sinequa/components/search";

@Component({
    selector: "sq-result-source",
    templateUrl: "./result-source.html",
    styleUrls: ["./result-source.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultSource {
    @Input() record: Record;
    @Input() treepathColumn = "treepath";
    @Input() displayTreepath: boolean;
    @Input() displayTreepathMinLevel = 0;
    @Input() displayTreepathMaxLevel: number;
    @Input() urlColumn = "url1";
    @Input() displayUrl: boolean = true;

    constructor(
        public searchService: SearchService) {
    }

    get source(): ValueItem[] {
        if(this.displayTreepath && this.record[this.treepathColumn]) {
            const treepath = this.record[this.treepathColumn][0] as string;
            if(treepath?.length >= 2) {
                return treepath.substring(1, treepath.length-1).split('/')
                    .slice(this.displayTreepathMinLevel, this.displayTreepathMaxLevel)
                    .map((path,i,array) => ({
                            display: path,
                            value: '/'+array.slice(0,i+1).join('/')+'/*'
                        }));
            }
        }
        return [];
    }

    get url(): string {
        return this.displayUrl && this.record[this.urlColumn];
    }

    select(item: ValueItem){
        if(this.searchService.addFieldSelect(this.treepathColumn, item)) {
            this.searchService.search();
        }
        return false;
    }

    notifyClick() {
      if(this.url) {
        this.searchService.notifyOpenOriginalDocument(this.record, undefined, AuditEventType.Click_ResultLink);
      }
    }

}
