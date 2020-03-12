import {Component, Input} from "@angular/core";

/**
 * A default component to be used by the {@link ValidationDirective} directive to display
 * a validation error message using {@link MessagePipe}.
 */
@Component({
    selector: "sq-validation-message",
    template: `
        <div class="sq-validation-message">{{text | sqMessage:{values: info} }}</div>
    `
})
export class ValidationMessageComponent {
    /**
     * The error message text passed to the `sqMessage` pipe.
     */
    @Input() text: string;
    /**
     * The entry for the validator in a `ValidationErrors` object. This is passed
     * as the values to the `sqMessage` pipe.
     */
    @Input() info: any;
}
