import {Component, Input} from "@angular/core";
import {Record} from "@sinequa/core/web-services";

/**
 * This component requires a global CSS file to map file extensions (doc, ppt, xls, etc.)
 * to Font Awesome icons via a class `sq-icon-file-{{fileext}}`
 */

@Component({
    selector: "sq-result-icon",
    templateUrl: "./result-icon.html"
})
export class ResultIcon {
    /**
     * Record which file extension is displayed as an icon
     */
    @Input() record: Record;

    /**
     * Integer controlling the icon's size
     */
    @Input() size: number = 1; 
}