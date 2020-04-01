import {Pipe, ChangeDetectorRef} from "@angular/core";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";
import {Expr, ExprMessageOptions} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";

@Pipe({name: "sqExpr", pure: false})
export class ExprPipe extends AbstractIntlPipe {
    constructor(
        intlService: IntlService,
        changeDetectorRef: ChangeDetectorRef) {
        super(intlService, changeDetectorRef);
    }

    updateValue(key: Expr | string, params: ExprMessageOptions): void {
        super.updateValue(key, params);
        if (key instanceof Expr) {
            const message = key.toMessage(params);
            this.value = this.intlService.formatMessage(message.message, message.values);
        }
        else {
            this.value = this.intlService.formatMessage(key);
            if (params && params.asHTML) {
                this.value = Utils.encodeHTML(this.value);
            }
        }
    }
}