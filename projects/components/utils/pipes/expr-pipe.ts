import {Pipe} from "@angular/core";
import {AbstractIntlPipe} from "@sinequa/core/intl";
import {Expr, ExprMessageOptions} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";

@Pipe({name: "sqExpr", pure: false})
export class ExprPipe extends AbstractIntlPipe<(Expr | string), ExprMessageOptions> {

    override updateValue(key: Expr | string, params: ExprMessageOptions): void {
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