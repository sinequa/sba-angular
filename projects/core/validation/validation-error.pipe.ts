import {Pipe, ChangeDetectorRef} from "@angular/core";
import {ValidationErrors} from "@angular/forms";
import {AbstractIntlPipe, IntlService} from "@sinequa/core/intl";
import {ValidationService} from "./validation.service";

/**
 * A pipe to display the first error in a `ValidationErrors` map.
 */
@Pipe({name: "sqValidationError", pure: false})
export class ValidationErrorPipe extends AbstractIntlPipe {
    constructor(
        intlService: IntlService,
        changeDetectorRef: ChangeDetectorRef,
        protected validationService: ValidationService) {
        super(intlService, changeDetectorRef);
    }

    updateValue(key: ValidationErrors, params: any): void {
        super.updateValue(key, params);
        const text = this.validationService.getFirstErrorText(key);
        const info = this.validationService.getFirstErrorInfo(key);
        this.value = text ? this.intlService.formatMessage(text, {values: info}) : undefined;
    }
}
