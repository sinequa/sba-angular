import { Component, Input } from "@angular/core";
import { DocumentAccessLists } from "@sinequa/core/web-services";

@Component({
    selector: "sq-metadata-access-lists-item",
    templateUrl: "./metadata-access-lists-item.html",
    styleUrls: ["./metadata-access-lists-item.css"]
})
export class MetadataAccessListsItem {
    @Input() public accessLists: DocumentAccessLists;
}