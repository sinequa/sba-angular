import { Pipe, PipeTransform } from "@angular/core";
import { IntlService } from "@sinequa/core/intl";
import { Comment } from "./comments.web.service";

@Pipe({
    name: "sqCreationDate",
    standalone: false
})
export class CreationDatePipe implements PipeTransform {

    constructor(
        public intlService: IntlService
    ){}

    transform(comment: Comment): string {
        const creation = this.intlService.formatDate(comment.creation) + " " + this.intlService.formatTime(comment.creation);
        let msg = this.intlService.formatMessage("msg#comments.created", {date: creation});
        if(comment.modified !== comment.creation) {
            const modified = this.intlService.formatDate(comment.modified) + " " + this.intlService.formatTime(comment.modified);
            msg += " - " + this.intlService.formatMessage("msg#comments.modified", {date: modified});
        }
        return msg;
    }
}