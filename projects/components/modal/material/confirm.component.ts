import {Component, Inject, HostBinding} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmOptions, ConfirmType} from "@sinequa/core/modal";

@Component({
    selector: "sq-confirm",
    templateUrl: "./confirm.component.html",
    styleUrls: ["./confirm.component.scss"]
})
export class MdConfirm {
    @HostBinding("class.sq-confirm") true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public model: ConfirmOptions,
        protected dialogRef: MatDialogRef<MdConfirm>) {
    }

    get title(): string {
        return this.model.title ? this.model.title : "msg#modal.confirm.title";
    }

    public getMessageClass(confirmType): string {
        switch (confirmType) {
            case ConfirmType.Info:
                return "alert-info";
            case ConfirmType.Success:
                return "alert-sucess";
            case ConfirmType.Warning:
                return "alert-warning";
            case ConfirmType.Error:
                return "alert-danger";
            default:
                return "";
        }
    }
}