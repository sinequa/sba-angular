import {Pipe, ChangeDetectorRef} from "@angular/core";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";
import {FormatService} from "@sinequa/core/app-utils";

/**
 * A pipe to transform a number into a readable internationalized memory size label,
 * for example "126432" into "126 kB".
 *
 * @example
 * <span>Size:</span><span>{{ documentSize | sqMemorySize }}</span>
 */
@Pipe({name: "sqMemorySize", pure: false})
export class MemorySizePipe extends AbstractIntlPipe {
    constructor(
        protected formatService: FormatService,
        intlService: IntlService,
        changeDetectorRef: ChangeDetectorRef) {
        super(intlService, changeDetectorRef);
    }

    updateValue(key: number): void {
        super.updateValue(key);
        this.value = this.formatService.formatMemorySize(key);
    }
}