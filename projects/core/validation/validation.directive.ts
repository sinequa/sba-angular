import {Directive, Input, OnInit, DoCheck, InjectionToken, Type, Inject, ViewContainerRef} from "@angular/core";
import {FormGroup, AbstractControl} from "@angular/forms";
import {Utils, MapOf} from "@sinequa/core/base";
import {LoadComponentService, LoadedComponent} from "@sinequa/core/load-component";
import {ValidationService} from "./validation.service";

/**
 * Describes the options that can be passed to {@link ValidationDirective}.
 */
export interface ValidationOptions {
    /**
     * The `FormGroup` container.
     */
    form: FormGroup;
    /**
     * Identifies the control to validate. Defaults to the value of the `formControlName`
     * attribute on the element to which the `ValidationDirective` is attached.
     */
    controlName?: string;
    /**
     * The class name to set on the element if validation passes. Defaults to `is-valid`.
     */
    validClass?: string;
    /**
     * The class name to set on the element if validation fails. Defaults to `is-invalid`.
     */
    invalidClass?: string;
    /**
     * The selector to identify children of the element to which to also apply the validity
     * classes. Defaults to `.form-control`. Set to `null` to not select any children.
     */
    childSelector?: string;
    /**
     * Custom error messages to use for the validators. By default the messages defined in
     * {@link ValidationService} are used.
     */
    errorMessages?: MapOf<string>;
}

/**
 * An injection token that can be provided to override the component loaded by {@link ValidationDirective}
 * to display validation error messages. The default component is {@link ValidationMessageComponent}.
 */
export const VALIDATION_MESSAGE_COMPONENT = new InjectionToken<Type<any>>("VALIDATION_MESSAGE_COMPONENT");

/**
 * A directive to automatically add validity classes to the element to which it is attached. In addition,
 * when the associated `FormControl` is invalid a component is dynamically loaded after the element to display
 * the validation message.
 * The component to load can be specified by providing the {@link VALIDATION_MESSAGE_COMPONENT} injection token.
 * By default, the {@link ValidationMessageComponent} component is used.
 */
@Directive({
    selector: "[sqValidation]"
})
export class ValidationDirective implements OnInit, DoCheck {
    @Input("sqValidation") options: FormGroup | ValidationOptions;
    private element: HTMLElement;
    private form: FormGroup;
    private control: AbstractControl;
    private validClass?: string;
    private invalidClass?: string;
    private childSelector?: string;
    private errorMessages?: MapOf<string>;
    private validationMessage: LoadedComponent;
    private active: boolean;
    private valid: boolean;
    private dirty: boolean;
    private error?: string;
    private errorInfo?: string;

    constructor(
        @Inject(VALIDATION_MESSAGE_COMPONENT) private validationMessageComponent: Type<any>,
        private viewContainerRef: ViewContainerRef,
        private loadComponentService: LoadComponentService,
        private validationService: ValidationService) {
        this.element = viewContainerRef.element.nativeElement;
    }

    ngOnInit() {
        if (!this.options) {
            console.log("Validation.ngOnInit - no options");
            return;
        }
        let controlName;
        if (this.options instanceof FormGroup) {
            this.form = this.options;
        }
        else {
            this.form = this.options.form;
            controlName = this.options.controlName;
            this.validClass = this.options.validClass;
            this.invalidClass = this.options.invalidClass;
            this.childSelector = this.options.childSelector;
            this.errorMessages = this.options.errorMessages;
        }
        if (!this.form) {
            console.log("Validation.ngOnInit - no form model");
            return;
        }
        if (!this.form.controls) {
            console.log("Validation.ngOnInit - no form controls");
            return;
        }
        if (controlName) {
            this.control = this.form.controls[controlName];
        }
        else {
            const formControlName = this.element.getAttribute("formControlName");
            if (formControlName) {
                this.control = this.form.controls[formControlName];
            }
        }
        if (!this.control) {
            console.log("Validation.ngOnInit - no control");
            return;
        }
        if (!this.validClass) {
            this.validClass = "is-valid";
        }
        if (!this.invalidClass) {
            this.invalidClass = "is-invalid";
        }
        if (Utils.isUndefined(this.childSelector)) {
            this.childSelector = ".form-control";
        }
        this.valid = this.control.valid;
        this.dirty = this.control.dirty;
        this.active = true;
        this.error = undefined;
    }

    private getFirstError(): string | undefined {
        if (this.control.errors) {
            return Object.keys(this.control.errors)[0];
        }
        return undefined;
    }

    private getErrorText(error?: string): string {
        if (error && this.errorMessages && !!this.errorMessages[error]) {
            return this.errorMessages[error];
        }
        return this.validationService.getErrorText(error);
    }

    private getErrorInfo(error?: string): any {
        if (error && this.control.errors) {
            return this.control.errors[error];
        }
        return undefined;
    }

    private setValidityClasses() {
        const add = this.control.valid ? this.validClass : this.invalidClass;
        const remove = this.control.valid ? this.invalidClass : this.validClass;
        if (remove) {
            this.element.classList.remove(remove);
        }
        if (add) {
            this.element.classList.add(add);
        }
        if (this.childSelector) {
            const children = Array.from(this.element.querySelectorAll(this.childSelector));
            children.forEach(element => {
                if (remove) {
                    element.classList.remove(remove);
                }
                if (add) {
                    element.classList.add(add);
                }
            });
        }
    }

    private removeValidityClasses() {
        if (this.validClass) {
            this.element.classList.remove(this.validClass);
        }
        if (this.invalidClass) {
            this.element.classList.remove(this.invalidClass);
        }
        if (this.childSelector) {
            const children = Array.from(this.element.querySelectorAll(this.childSelector));
            children.forEach(element => {
                if (this.validClass) {
                    element.classList.remove(this.validClass);
                }
                if (this.invalidClass) {
                    element.classList.remove(this.invalidClass);
                }
            });
        }
    }

    /**
     * Update the validity classes on the element depending on the validity state of the
     * associated `FormControl`. If the control is invalid then the validation message component
     * is loaded to display an error message.
     */
    ngDoCheck() {
        if (!this.active) {
            return;
        }
        if (this.valid === this.control.valid && this.dirty === this.control.dirty) {
            const firstError = this.getFirstError();
            const errorInfo = this.getErrorInfo(firstError);
            if (firstError === this.error && errorInfo === this.errorInfo) {
                return;
            }
            this.error = firstError;
            this.errorInfo = errorInfo;
        }
        this.valid = this.control.valid;
        this.dirty = this.control.dirty;
        if (this.control.dirty) {
            this.setValidityClasses();
            if (this.control.valid) {
                if (this.validationMessage) {
                    this.validationMessage.componentRef.instance.text = "";
                }
            }
            else {
                if (!this.validationMessage) {
                    this.validationMessage =
                        this.loadComponentService.loadComponent({component: this.validationMessageComponent}, this.viewContainerRef);
                }
                const error = this.getFirstError();
                this.validationMessage.componentRef.instance.text = this.getErrorText(error);
                this.validationMessage.componentRef.instance.info = this.getErrorInfo(error);
            }
        }
        else {
            this.removeValidityClasses();
            if (this.validationMessage) {
                this.validationMessage.componentRef.instance.text = "";
            }
        }
    }
}
