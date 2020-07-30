import {Component, Input, OnInit} from "@angular/core";
import {ValueItem} from "@sinequa/core/app-utils";
import {Record} from "@sinequa/core/web-services";
import {SearchService} from "@sinequa/components/search";

@Component({
    selector: "sq-result-source",
    templateUrl: "./result-source.html",
    styleUrls: ["./result-source.css"]
})
export class ResultSource implements OnInit {
    @Input() record: Record;
    @Input() displayTreepath: boolean;
    @Input() displayTreepathMinLevel = 0;
    @Input() displayTreepathMaxLevel: number;
    @Input() displayUrl: boolean = true;

    source: ValueItem[] = [];
    url: string;

    constructor(
        public searchService: SearchService) {
    }

    public ngOnInit() {
        if(this.displayTreepath && !!this.record.treepath){
            const treepath = this.record.treepath[0];
            if(!!treepath && treepath.length >= 2){
                this.source = treepath.substr(1, treepath.length-2).split('/')
                    .slice(this.displayTreepathMinLevel, this.displayTreepathMaxLevel)
                    .map((path,i,array) => {
                        return {
                            display: path,
                            value: '/'+array.slice(0,i+1).join('/')+'/*'
                        };
                    });
            }
        }
        if(this.displayUrl){
            this.url = this.record.url1;
        }
    }

    select(item){
        this.searchService.addFieldSelect("treepath", item);
        this.searchService.search();
    }

}