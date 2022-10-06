import {ChangeDetectorRef, Pipe} from "@angular/core";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";
import {LabelsService} from "./labels.service";

@Pipe({name: "sqLabel", pure: false})
export class LabelPipe extends AbstractIntlPipe<string, boolean> {
    constructor(
        protected labelsService: LabelsService, intlService: IntlService, cdr: ChangeDetectorRef) {
        super(intlService, cdr);
    }

    override updateValue(value: string, _public?: boolean): void {
        super.updateValue(value, _public);
        this.value = value;
        this.value = this.intlService.formatMessage(this.value);
    }
}
