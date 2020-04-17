import {Injectable, Inject, Type, Injector, InjectionToken} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Utils, Keys} from "@sinequa/core/base";
import {MessageParams} from "@sinequa/core/intl"; // Dependency to INTL !
import {ModalRef, IModalRef} from "./modal-ref";

/** Describes the configuration object that can be passed when opening
 * a modal with the {@link ModalService}.
 */
export interface ModalConfig {
    /**
     * Classes that should be added to the `Overlay` pane.
     */
    panelClass?: string | string[];
    /**
     * Indicates whether a backdrop should be added when opening the modal.
     */
    hasBackdrop?: boolean;
    /**
     * Classes that should be added to the backdrop.
     */
    backdropClass?: string | string[];
    /**
     * The data model that the modal will operate on.
     */
    model?: any;
    /**
     * The CSS width of the modal.
     */
    width?: string;
    /**
     * The CSS height of the modal.
     */
    height?: string;
    /**
     * Indicates whether the modal should occupy the screen width and height. In this case
     * `width` and `height` are set to `100%` and the `sq-modal-fullscreen` class is added
     * to `panelClass`
     */
    fullscreen?: boolean;
    /**
     * Indicates whether a click on the backdrop should close the modal. The default value
     * is `true`.
     */
    closeOnBackdropClick?: boolean;
}

const DEFAULT_CONFIG: ModalConfig = {
    hasBackdrop: true,
    backdropClass: ["cdk-overlay-dark-backdrop", "sq-modal-backdrop"],
    panelClass: "sq-modal-pane",
    model: null,
    closeOnBackdropClick: true
};

/**
 * The `MODAL_MODEL` injection token can be used to access the modal's model in
 * the the modal component. The value is `provided` from the value set in the
 * {@link ModalConfig} options when the modal is opened.
 */
export const MODAL_MODEL = new InjectionToken<any>('MODAL_MODEL');

/**
 * The possible result values that can be set when a modal is closed. Buttons in a modal
 * have an associated `ModalResult` value. All buttons except those with a `Custom` result
 * value will close the modal when they are clicked.
 */
export const enum ModalResult {
    OK = -1,
    Cancel = -2,
    Yes = -3,
    No = -4,
    Abort = -5,
    Retry = -6,
    Ignore = -7,
    Custom = 0
}

/**
 * An enumeration of the types of confirm modals. The type of the confirm modal
 * can be reflected in the icon and/or colors used.
 */
export const enum ConfirmType {
    Success,
    Info,
    Warning,
    Error
}

/**
 * Describes the options that can be passed to the [ModalService.confirm]{@link ModalService#confirm}
 * method.
 */
export interface ConfirmOptions {
    /**
     * The title of the confirm modal.
     */
    title?: string;
    /**
     * The message dispayed in the confirm modal.
     */
    message: string;
    /**
     * Any parameters for the `message`.
     */
    messageParams?: MessageParams;
    /**
     * The type of the confirm modal.
     */
    confirmType?: ConfirmType;
    /**
     * The buttons to display in the confirm modal.
     */
    buttons: ModalButton[];
}

/**
 * Describes the options that can be used when creating an instance of a {@link ModalButton}.
 */
export interface IModalButton {
    /**
     * The result associated with the button.
     */
    result: ModalResult;
    /**
     * Indicates whether this button is the primary button amongst a set of buttons.
     */
    primary?: boolean;
    /**
     * The button text.
     */
    text?: string;
    /**
     * Indicates whether the button is currently visible.
     */
    visible?: boolean;
    /**
     * The validation `FormGroup` that should be tested when the button is clicked.
     * The button will only perform its `action` when the validation is `valid`.
     */
    validation?: FormGroup;
    /**
     * Indicats whether the button should be rendered with an `<a>` tag rather than
     * a `<button>` tag.
     */
    anchor?: boolean;

    /**
     * The action to perform when the button is clicked. Buttons with `result` values other
     * than `Custom` also close the modal.
     */
    action?: (button: ModalButton) => void;
}

/**
 * A class representing a button displayed in a modal.
 */
export class ModalButton implements IModalButton {
    /**
     * The result associated with the button.
     */
    result: ModalResult;
    /**
     * Indicates whether this button is the primary button amongst a set of buttons.
     */
    primary: boolean;
    /**
     * The button text.
     */
    text: string;
    /**
     * Indicates whether the button is currently visible.
     */
    visible: boolean;
    /**
     * The validation `FormGroup` that should be tested when the button is clicked.
     * The button will only perform its `action` when the validation is `valid`.
     */
    validation: FormGroup;
    /**
     * Indicats whether the button should be rendered with an `<a>` tag rather than
     * a `<button>` tag.
     */
    anchor: boolean;

    /**
     * The action to perform when the button is clicked. Buttons with `result` values other
     * than `Custom` also close the modal.
     */
    action: (button: ModalButton) => void;

    constructor(options: IModalButton) {
        Utils.extend(this, {visible: true, anchor: false}, options);
    }

    /**
     * Get the button text. Buttons with non-custom result types
     * have default text depending on their result type -
     * `msg#modal.buttons.ok`, `msg#modal.buttons.cancel` etc
     */
    getText() {
        if (this.text) {
            return this.text;
        }
        switch (this.result) {
            case ModalResult.OK:
                return "msg#modal.buttons.ok";
            case ModalResult.Cancel:
                return "msg#modal.buttons.cancel";
            case ModalResult.Yes:
                return "msg#modal.buttons.yes";
            case ModalResult.No:
                return "msg#modal.buttons.no";
            case ModalResult.Abort:
                return "msg#modal.buttons.abort";
            case ModalResult.Retry:
                return "msg#modal.buttons.retry";
            case ModalResult.Ignore:
                return "msg#modal.buttons.ignore";
            default:
                return "";
        }
    }

    /**
     * Perform a click on a button. The button's explicit action is performed if set and
     * the modal closed with the button's modal result if the `result` type is non-`Custom`.
     * If the validation status not `valid` this method returns without performing any action.
     *
     * @param closer An object with a `close` method. If the result type is non-custom then
     * the `close` method of this object is called.
     */
    click(closer: {close(result: any): void}) {
        if (this.validation && !this.validation.valid) {
            return;
        }
        if (this.action) {
            this.action(this);
        }
        if (this.result !== ModalResult.Custom) {
            closer.close(this.result);
        }
    }
}

/**
 * An injection token to set the component to use for the `confirm` modal displayed
 * by the [ModalService.confirm]{@link ModalService#confirm} method.
 */
export const MODAL_CONFIRM = new InjectionToken<Type<any>>('MODAL_CONFIRM');

/**
 * A service to open modal dialogs.
 */
@Injectable({
    providedIn: "root"
})
export class ModalService {
    constructor(
        protected injector: Injector,
        protected overlay: Overlay,
        @Inject(MODAL_CONFIRM) protected confirmModal: Type<any>
    ) {
    }

    /**
     * Open a modal dialog using the passed configuration options.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns An `IModalRef` object that can be used to close the modal.
     */
    openRef(component: Type<any>, config: ModalConfig = {}): IModalRef {
        // Override default configuration
        const modalConfig = { ...DEFAULT_CONFIG, ...config };
        if (modalConfig.fullscreen) {
            modalConfig.width = "100%";
            modalConfig.height = "100%";
            if (Utils.isString(modalConfig.panelClass)) {
                modalConfig.panelClass = [modalConfig.panelClass, "sq-modal-fullscreen"];
            }
            else if (modalConfig.panelClass) {
                modalConfig.panelClass.push("sq-modal-fullscreen");
            }
            else {
                modalConfig.panelClass = "sq-modal-fullscreen";
            }
        }
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(modalConfig);
        // Instantiate remote control
        const modalRef = new ModalRef(overlayRef);
        const overlayComponent = this.attachDialogContainer(component, overlayRef, modalConfig, modalRef);
        modalRef.componentInstance = overlayComponent;
        overlayRef.hostElement.classList.add("sq-modal-host");
        if (modalConfig.closeOnBackdropClick) {
            // NB backdropClick will not fire if pointer-events are enabled on modal-host
            overlayRef.backdropClick().subscribe(() => modalRef.close());
            // Provide support for a scrollable sq-modal-host (overlay wrapper)
            // The standard cdk styling disables pointer-events at this level which means that scrolling
            // won't work. We can enable pointer-events in css but then the backdrop will not receive the
            // click event. So, we handle the click event directly on sq-modal-host also and if the
            // click target === sq-modal-host then we initiate modal closing here
            overlayRef.hostElement.addEventListener("click", (event) => {
                if (event.target === overlayRef.hostElement) {
                    modalRef.close();
                }
            });
        }
        overlayRef.keydownEvents().subscribe((event) => {
            if (event.keyCode === Keys.esc) {
                modalRef.close();
            }
        });
        modalRef.disableSubmit();
        return modalRef;
    }

    /**
     * A wrapper around the {@link #openRef} method which returns a `Promise` that resolves
     * with the `ModalResult` when the modal is closed.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns The `ModalResult` when the modal is closed.
     */
    open(component: Type<any>, config: ModalConfig = {}): Promise<ModalResult> {
        const modalRef = this.openRef(component, config);
        return modalRef.afterClosed().toPromise();
    }

    private createOverlay(config: ModalConfig): OverlayRef {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer(component: Type<any>, overlayRef: OverlayRef, config: ModalConfig, modalRef: ModalRef) {
        const injector = this.createInjector(config, modalRef);

        const containerPortal = new ComponentPortal(component, null, injector);
        const containerRef = overlayRef.attach<Type<any>>(containerPortal);

        return containerRef.instance;
    }

    private createInjector(config: ModalConfig, modalRef: ModalRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(ModalRef, modalRef);
        injectionTokens.set(MODAL_MODEL, config.model);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private getOverlayConfig(config: ModalConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }

    /**
     * Open a confirmation modal dialog displaying a message and a set buttons. This is similar to the Javacsript
     * `Window.alert` method but renders a modal.
     *
     * @param options The options used to open the confirm modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    confirm(options: ConfirmOptions): Promise<ModalResult> {
        return this.open(this.confirmModal, {model: options});
    }

    /**
     * Open a confirm modal that has an `OK` button.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     */
    oK(
        message: string,
        messageParams?: MessageParams,
        title?: string,
        confirmType = ConfirmType.Success): Promise<ModalResult> {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: ModalResult.OK, primary: true })
            ]
        });
    }

    /**
     * Open a confirm modal that has `OK` and `Cancel` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    oKCancel(
        message: string,
        messageParams?: MessageParams,
        title?: string,
        confirmType = ConfirmType.Info,
        primaryButton = ModalResult.OK): Promise<ModalResult> {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: ModalResult.OK, primary: primaryButton === ModalResult.OK }),
                new ModalButton({ visible: true, result: ModalResult.Cancel, primary: primaryButton === ModalResult.Cancel })
            ]
        });
    }

    /**
     * Open a confirm modal that has `Yes` and `No` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    yesNo(
        message: string,
        messageParams?: MessageParams,
        title?: string,
        confirmType = ConfirmType.Info,
        primaryButton = ModalResult.Yes): Promise<ModalResult> {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: ModalResult.Yes, primary: primaryButton === ModalResult.Yes }),
                new ModalButton({ visible: true, result: ModalResult.No, primary: primaryButton === ModalResult.No })
            ]
        });
    }
}
