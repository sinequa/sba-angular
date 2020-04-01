import {Component, Input, Output, OnInit, ChangeDetectorRef, EventEmitter} from "@angular/core";
import {Results, Record, SimilarDocumentsWebService} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {Query} from "@sinequa/core/app-utils";
import {SearchService} from "@sinequa/components/search";


export interface SimilarDoc{
    id: string;
    record?: Record;
    pct: number;
    near_similarity: boolean;
}

export interface SimilarDocOpenedEvent {
    isLink: boolean;
    record: Record;
}

@Component({
    selector: "sq-similar-docs",
    templateUrl: "./similar-docs.html"
})
export class BsSimilarDocs implements OnInit {
    @Input() record: Record;
    @Input() nearSimilarity : boolean = true;
    @Input() similarDocsColumn : string;
    @Input() titleLinkBehavior: "open" | "action" = "open";
    @Output() similarDocOpened = new EventEmitter<SimilarDocOpenedEvent>();

    docs : SimilarDoc[] = [];

    constructor(
        private searchService: SearchService,
        private changeDetectorRef: ChangeDetectorRef,
        private similarDocumentsService: SimilarDocumentsWebService) {
    }

    ngOnInit() {

        //console.log(this.config);

        if(this.similarDocsColumn){

            const docids = JSON.parse(this.record[this.similarDocsColumn]);
            const docs : SimilarDoc[] = docids.map(
                obj => {
                    return {
                        id : Object.keys(obj)[0],
                        pct : Math.round(100*obj[Object.keys(obj)[0]]),
                        near_similarity : false,
                        record : null
                    };
                });
            const ids : string[] = docs.map(obj => obj.id);

            if(docs.length > 0) {

                const query = Query.copy(this.searchService.query);
                query.text = "";
                query.aggregations = [];
                query.select = [];
                query.addSelect("id:["+ids.join(',')+"]");

                Utils.subscribe(this.searchService.getResults(query),
                    (results: Results) => {
                        //console.log("similar docs!");
                        docs.forEach(obj => { obj.record = results.records.find(r => r.id === obj.id); }); // Add records to the doc objects
                        this.docs = this.docs.filter(obj => ids.indexOf(obj.id) === -1)   // Remove previous docs that are in the new list
                                        .concat(docs)
                                        .sort((a,b) => b.pct - a.pct);
                        this.changeDetectorRef.markForCheck();
                    });

            }
        }

        if(this.nearSimilarity){
            const sourceDocumentId = this.record.id;
            this.similarDocumentsService.get(sourceDocumentId, this.searchService.query.name).subscribe(
                (results) => {
                    const ids = this.docs.map(d => d.id);
                    this.docs = this.docs.concat(results
                        .filter(r => ids.indexOf(r.id) === -1)  // Keep results not already in the list
                        .map(r => {
                            return {
                                pct: Math.round(100*r.globalrelevance),
                                near_similarity : true,
                                record : r,
                                id : r.id
                            };
                        }))
                        .sort((a,b) => b.pct - a.pct);
                    this.changeDetectorRef.markForCheck();
                }
            );
        }
    }

    openDocument(isLink: boolean, record: Record){
        this.similarDocOpened.next({isLink, record});
    }


}