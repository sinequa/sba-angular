import {Component, Input, HostBinding} from "@angular/core";

@Component({
    selector: "sq-modal-header",
    templateUrl: "./modal-header.component.html"
})
export class MdModalHeader {
    @Input() title: string;
    @HostBinding("class.sq-modal-header") true;
}