import { Component, Input } from "@angular/core";
import { Principal } from "@sinequa/core/web-services";

@Component({
    selector: "sq-metadata-access-lists-item-single-access-list",
    templateUrl: "./metadata-access-lists-item-single-access-list.html",
    styleUrls: ["./metadata-access-lists-item-single-access-list.css"]
})
export class MetadataAccessListsItemSingleAccessList {

    @Input() private readonly authorized: boolean;
    @Input() public readonly index: number;
    @Input() public readonly accessList: Principal[];
    public collapsed = true;

    public get headerMessage(): string {
        return "msg#metadata.accessLists." + (this.authorized ? "authorizedListHeader" : "deniedListHeader");
    }

    public collapseClick(event: Event) {
        this.collapsed = !this.collapsed;
        event.preventDefault();
    }
}
