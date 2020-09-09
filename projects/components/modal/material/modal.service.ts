import {Injectable, Inject, Type, Injector} from "@angular/core";
import {Overlay} from '@angular/cdk/overlay';
import {MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";
import {Subject, Observable, of} from "rxjs";
import {MODAL_CONFIRM, ModalService, ModalConfig, ModalResult, IModalRef, CheckCloseEvent, MODAL_PROMPT} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";

export interface SqMatDialogRef<T> extends MatDialogRef<T> {
    checkClose(): Observable<CheckCloseEvent>;
}

class MdModalRef implements IModalRef {
    componentInstance: Type<any>;

    constructor(private dialogRef: SqMatDialogRef<any>) {
        this.componentInstance = this.dialogRef.componentInstance;
    }

    checkClose(): Observable<CheckCloseEvent> {
        return this.dialogRef.checkClose();
    }

    beforeClosed(): Observable<ModalResult> {
        return this.dialogRef.beforeClosed();
    }

    afterClosed(): Observable<ModalResult> {
        return this.dialogRef.afterClosed();
    }

    close(result = ModalResult.Cancel) {
        this.dialogRef.close(result);
    }
}

@Injectable({
    providedIn: "root"
})
export class MdModalService extends ModalService {
    constructor(
        protected matDialog: MatDialog,
        injector: Injector,
        overlay: Overlay,
        protected intlService: IntlService,
        @Inject(MODAL_CONFIRM) confirmModal: Type<any>,
        @Inject(MODAL_PROMPT) promptModal: Type<any>) {
        super(injector, overlay, confirmModal, promptModal);
    }

    private monkeyPatchDialogRef(dialogRef: SqMatDialogRef<any>) {
        const checkClose = new Subject<CheckCloseEvent>();
        dialogRef.checkClose = () => {
            return checkClose.asObservable();
        };
        const originalClose = dialogRef.close;
        dialogRef.close = function(result = ModalResult.Cancel) {
            const checkCloseEvent: CheckCloseEvent = {result};
            checkClose.next(checkCloseEvent);
            (checkCloseEvent.cancelled || of(false)).subscribe(
                (cancelled) => {
                    if (!cancelled) {
                        checkClose.complete();
                        originalClose.call(this, result);
                    }
                }
            );
        };
    }

    openRef(component: Type<any>, config: ModalConfig = {}): IModalRef {
        const matConfig: MatDialogConfig = {
            data: config.model
        };
        if (!Utils.isUndefined(config.panelClass)) {
            matConfig.panelClass = config.panelClass;
        }
        if (!Utils.isUndefined(config.hasBackdrop)) {
            matConfig.hasBackdrop = config.hasBackdrop;
        }
        if (Utils.isString(config.backdropClass)) {
            matConfig.backdropClass = config.backdropClass;
        }
        if (config.fullscreen) {
            matConfig.maxWidth = "none";
            if (Utils.isString(matConfig.panelClass)) {
                matConfig.panelClass = [matConfig.panelClass, "sq-modal-fullscreen"];
            }
            else if (matConfig.panelClass) {
                matConfig.panelClass.push("sq-modal-fullscreen");
            }
            else {
                matConfig.panelClass = "sq-modal-fullscreen";
            }
        }
        else {
            if (!Utils.isUndefined(config.width)) {
                matConfig.width = config.width;
            }
            else {
                matConfig.width = "480px";
            }
            if (!Utils.isUndefined(config.height)) {
                matConfig.height = config.height;
            }
        }
        matConfig.direction = this.intlService.direction;
        const dialogRef = this.matDialog.open(component, matConfig) as SqMatDialogRef<any>;
        this.monkeyPatchDialogRef(dialogRef);
        return new MdModalRef(dialogRef);
    }
}
