import {Type} from "@angular/core";
import {OverlayRef} from '@angular/cdk/overlay';
import {Subject, Observable, of} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {ModalResult} from "./modal.service";

/**
 * Describes the event raised by an {@link IModalRef} instance before a modal dialog is closed.
 */
export interface CheckCloseEvent {
    /**
     * The result passed to the [IModalRef.close]{@link IModalRef#close} method.
     */
    result: ModalResult;
    /**
     * A flag that can be set by the event receiver to indicate that the closing of the modal dialog
     * should be cancelled.
     */
    cancelled?: Observable<boolean>;
}

/**
 * Describes the object returned by the [ModalService.openRef]{@link ModalService.openRef} method
 * to maintain a reference to the opened modal.
 */
export interface IModalRef {
    /**
     * The component instance of the referenced modal component.
     */
    componentInstance: Type<any> | undefined;
    /**
     * A stream that emits before the referenced modal is closed to allow an observer
     * to cancel the closing.
     */
    checkClose(): Observable<CheckCloseEvent>;
    /**
     * A stream that emits before the referenced modal is closed.
     */
    beforeClosed(): Observable<ModalResult>;
    /**
     * A stream that emits after the referenced modal is closed.
     */
    afterClosed(): Observable<ModalResult>;
    /**
     * Close the referenced modal with the passed `result`.
     * @param result The referenced modal's result.
     */
    close(result: ModalResult);
}

/**
 * An implementation of the {@link IModalRef} interface.
 */
export class ModalRef implements IModalRef {
    /**
     * The component instance of the referenced modal component.
     */
    componentInstance: Type<any> | undefined;
    /**
     * A flag indicating whether the referenced modal has been submitted.
     */
    submitted: boolean;
    private _checkClose = new Subject<CheckCloseEvent>();
    private _beforeClosed = new Subject<ModalResult>();
    private _afterClosed = new Subject<ModalResult>();
    private formElement: HTMLFormElement | undefined;

    constructor(private overlayRef: OverlayRef) {
    }

    /**
     * A stream that emits before the referenced modal is closed to allow an observer
     * to cancel the closing.
     */
    checkClose(): Observable<CheckCloseEvent> {
        return this._checkClose.asObservable();
    }

    /**
     * A stream that emits before the referenced modal is closed.
     */
    beforeClosed(): Observable<ModalResult> {
        return this._beforeClosed.asObservable();
    }

    /**
     * A stream that emits aftervthe referenced modal is closed.
     */
    afterClosed(): Observable<ModalResult> {
        return this._afterClosed.asObservable();
    }

    /**
     * Close the referenced modal with the passed `result`.
     * @param result The referenced modal's result.
     */
    close(result = ModalResult.Cancel) {
        // Delay to allow submit handling
        Utils.delay().then(() => {
            const checkCloseEvent: CheckCloseEvent = { result };
            this._checkClose.next(checkCloseEvent);
            (checkCloseEvent.cancelled || of(false)).subscribe(
                (cancelled) => {
                    if (!cancelled) {
                        this._checkClose.complete();
                        this._beforeClosed.next(result);
                        this._beforeClosed.complete();
                        this.removeSubmitListener();
                        this.overlayRef.detachBackdrop();
                        this.overlayRef.dispose();
                        this.componentInstance = undefined;
                        this._afterClosed.next(result);
                        this._afterClosed.complete();
                    }
                }
            );
        });
    }

    private submitListener = (event) => {
        this.submitted = true;
        event.preventDefault();
        return false;
    }

    /**
     * Disable the standard browser submit handling on any HTML form in the modal component.
     */
    disableSubmit() {
        if (!this.formElement) {
            const formElement = this.overlayRef.overlayElement.querySelector("form");
            if (formElement) {
                this.formElement = formElement;
                this.formElement.addEventListener("submit", this.submitListener);
            }
        }
    }

    private removeSubmitListener() {
        if (this.formElement) {
            this.formElement.removeEventListener("submit", this.submitListener);
            this.formElement = undefined;
        }
    }
}
