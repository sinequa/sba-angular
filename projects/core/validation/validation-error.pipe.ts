import {inject, Pipe} from "@angular/core";
import {ValidationErrors} from "@angular/forms";
import {AbstractIntlPipe} from "@sinequa/core/intl";
import {ValidationService} from "./validation.service";

/**
 * A pipe to display the first error in a `ValidationErrors` map.
 */
@Pipe({name: "sqValidationError", pure: false})
export class ValidationErrorPipe extends AbstractIntlPipe<ValidationErrors, any> {
    private validationService: ValidationService = inject(ValidationService);

    override updateValue(key: ValidationErrors, params: any): void {
        super.updateValue(key, params);
        const text = this.validationService.getFirstErrorText(key);
        const info = this.validationService.getFirstErrorInfo(key);
        this.value = text ? this.intlService.formatMessage(text, info) : undefined;
    }
}
