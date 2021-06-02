import {Injectable} from "@angular/core";
import {AuditWebService, AuditEvent} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {NotificationsService} from "@sinequa/core/notification";
import {ModalService, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {Action} from "@sinequa/components/action";

export const AuditFeedbackType = "UserFeedback";


@Injectable({
    providedIn: 'root',
})
export class FeedbackService {

    constructor(
        public auditService: AuditWebService,
        public modalService: ModalService,
        public appService: AppService,
        public notificationsService: NotificationsService
        ) {
    }

    public sendUserFeedback(type: string, message: string, thankUser: boolean){
        const event : AuditEvent = {
            type: AuditFeedbackType,
            detail: {
                app: this.appService.appName,
                message: type,
                detail: message
            }
        };
        Utils.subscribe(this.auditService.notify([event]),
            (result) => {
                if(thankUser)
                    this.notificationsService.success("msg#feedback.thankyou");
        });
    }

    public buildFeedbackAction() : Action[] {
        return [new Action({
            text: "msg#feedback.text",
            title: "msg#feedback.title",
            icon: "fas fa-comment",
            headerGroup: true,
            children: [
                this.createAction("content", "msg#feedback.content.text", "msg#feedback.content.title", "far fa-file-alt fa-fw"),
                this.createAction("ui", "msg#feedback.ui.text", "msg#feedback.ui.title", "fas fa-desktop fa-fw"),
                this.createAction("lang", "msg#feedback.lang.text", "msg#feedback.lang.title", "far fa-comments fa-fw"),
                this.createAction("other", "msg#feedback.other.text", "msg#feedback.other.title", "far fa-lightbulb fa-fw"),
            ]
        })];
    }

    public createAction(type:string, text:string, title:string, icon:string) : Action {
        return new Action({
            text: text,
            title: title,
            icon: icon,
            action: () => this.openFeedbackModal(type, title)
        });
    }

    public openFeedbackModal(type: string, title: string){
        const model = {title: 'msg#feedback.title', message: title, output: '', buttons: [], rowCount: 5};
        this.modalService.prompt(model)
            .then((result) => {
                if (result === ModalResult.OK && model.output.trim() !== "") {
                    this.sendUserFeedback(type, model.output, true);
                }
            });
    }
}