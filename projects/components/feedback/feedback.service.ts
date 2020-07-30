import {Injectable, InjectionToken, Inject, Type} from "@angular/core";
import {AuditWebService, AuditEvent} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {NotificationsService} from "@sinequa/core/notification";
import {ModalService, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {Action} from "@sinequa/components/action";

export const AuditFeedbackType = "UserFeedback";

/**
 * The modal types are unknown to this service.
 * The module using this service must provide these components
 * in their forRoot() method
 *
 * Example below:
 *
    public static forRoot(): ModuleWithProviders<FeedbackModule> {
        return {
            ngModule: FeedbackModule,
            providers: [
                {
                    provide: FEEDBACK_COMPONENTS,
                    useValue: {
                        feedbackForm: FeedbackForm
                    }
                },
                FeedbackService,
            ]
        };
    }

 */
export interface FeedbackComponents {
    feedbackForm: Type<any>;
}
export const FEEDBACK_COMPONENTS = new InjectionToken<FeedbackComponents>('FEEDBACK_COMPONENTS');


@Injectable({
    providedIn: 'root',
})
export class FeedbackService {

    constructor(
        public auditService: AuditWebService,
        public modalService: ModalService,
        public appService: AppService,
        public notificationsService: NotificationsService,
        @Inject(FEEDBACK_COMPONENTS) public feedbackComponents: FeedbackComponents
        ) {
    }

    public sendUserFeedback(message: string, thankUser: boolean){
        const event : AuditEvent = {
            type: AuditFeedbackType,
            detail: {
                app: this.appService.appName,
                message: name,
                detail: message,
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
            children: [
                this.createAction("content", "msg#feedback.content.text", "msg#feedback.content.title", "far fa-file-alt fa-fw"),
                this.createAction("ui", "msg#feedback.ui.text", "msg#feedback.ui.title", "fas fa-desktop fa-fw"),
                this.createAction("lang", "msg#feedback.lang.text", "msg#feedback.lang.title", "far fa-comments fa-fw"),
                this.createAction("other", "msg#feedback.other.text", "msg#feedback.other.title", "far fa-lightbulb fa-fw"),
            ]
        })];
    }

    public createAction(name:string, text:string, title:string, icon:string) : Action {
        return new Action({
            name: name,
            text: text,
            title: title,
            icon: icon,
            action: (item, event) => {
                this.openFeedbackModal(title);
            }
        });
    }

    public openFeedbackModal(title: string){
        const message = {"message" : "", "title" : title};
        this.modalService.open(this.feedbackComponents.feedbackForm, {model: message})
            .then((result) => {
                if (result === ModalResult.OK && message.message.trim() !== "") {
                    this.sendUserFeedback(message.message, true);
                }
            });
    }
}