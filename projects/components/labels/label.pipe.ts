import {Pipe} from "@angular/core";
import {AbstractIntlPipe} from "@sinequa/core/intl";

@Pipe({name: "sqLabel", pure: false})
export class LabelPipe extends AbstractIntlPipe<string, boolean> {

    override updateValue(value: string, _public?: boolean): void {
        super.updateValue(value, _public);
        this.value = value;
        this.value = this.intlService.formatMessage(this.value);
    }
}
