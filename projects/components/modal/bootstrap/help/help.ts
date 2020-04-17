import {Component, Inject, HostBinding, OnInit} from "@angular/core";
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {START_CONFIG, StartConfig} from "@sinequa/core/web-services";

@Component({
    selector: "sq-help",
    templateUrl: "./help.html"
})
export class BsHelp  implements OnInit {
    @HostBinding("class.modal-content") true;
    model: {};
    url: SafeResourceUrl;

    constructor(
        @Inject(START_CONFIG) public startConfig: StartConfig,
        public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        const url = this.startConfig.helpUrl || "assets/help/index.html";
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
