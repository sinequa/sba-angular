import { Component, Input, OnChanges } from "@angular/core";
import { Record as SqRecord } from "@sinequa/core/web-services";
import { IconFormat, defaultFormatIcons } from "./icons";

@Component({
    selector: "sq-result-icon",
    templateUrl: "./result-icon.html",
    standalone: false
})
export class ResultIcon implements OnChanges {
    /**
     * Record which file extension is displayed as an icon
     */
    @Input() record: SqRecord;

    /**
     * Any forced icon to fetch from the mappings list
     */
    @Input() icon?: string;

    /**
     * Any icons overriding elements
     * This will still use the default icons but will patch it with the provided data
     */
    @Input() set formatIcons(icons: Record<string, IconFormat>) {
        this._formatIcons = { ...defaultFormatIcons, ...(icons || {}) }
    }

    get formatIcons() {
        return this._formatIcons;
    }

    /**
     * Integer controlling the icon's size
     */
    @Input() size: number = 1;

    /**
     * Whether the icon should be colorized
     */
    @Input() colorize: boolean = true;

    @Input() otherClass: string = 'fa-fw';

    private _formatIcons = defaultFormatIcons;

    iconClass: string | undefined;
    color: string | undefined;

    ngOnChanges(): void {
        this.iconClass = undefined;
        this.color = undefined;

        if (this.record || this.icon) {
            const mapping = this.formatIcons[this.icon || this.record.fileext] || this.formatIcons.file;
            this.iconClass = mapping.icon;
            this.color = this.colorize ? mapping.color : undefined;
        }
    }
}