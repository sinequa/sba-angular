import {inject, Pipe} from "@angular/core";
import {AbstractIntlPipe} from "@sinequa/core/intl";
import {FormatService, ValueItem} from "@sinequa/core/app-utils";
import {CCColumn} from "@sinequa/core/web-services";
import {Utils, FieldValue} from "@sinequa/core/base";

@Pipe({
    name: "sqValue", pure: false,
    standalone: false
})
export class ValuePipe extends AbstractIntlPipe<(ValueItem | FieldValue), CCColumn> {

    protected readonly formatService: FormatService = inject(FormatService);

    override updateValue(key: ValueItem | FieldValue, params: CCColumn): void {
        super.updateValue(key, params);
        this.value = this.formatService.formatFieldValue(key, params);
        this.value = Utils.replace(this.value, /;/g, "$&\u200B");
    }
}