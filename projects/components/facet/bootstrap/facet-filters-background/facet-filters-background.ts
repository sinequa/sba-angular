import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "qp-facet-filters-background",
    templateUrl: "./facet-filters-background.html",
    styleUrls: ["./facet-filters-background.css"]
})
export class BsFacetFiltersBackground implements OnInit{
    @Input() count: number;
    @Input() maxcount: number;

    width: number;
    height: number;

    constructor(){
    }

    ngOnInit(){
        this.height = 100;
        this.width = 100.0 * this.count / this.maxcount;
    }

}