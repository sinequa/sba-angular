import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Validators } from "@angular/forms";
import { ConfirmType, ModalButton, ModalResult, ModalService } from "@sinequa/core/modal";
import { Principal, PrincipalWebService } from "@sinequa/core/web-services";
import { CommentsWebService, Comment, NormalComment } from "./comments.web.service";

@Component({
    selector: 'sq-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {
    @Input() docid: string;
    @Input() theme: 'light' | 'dark' = 'light';

    comments: Comment[];
    user?: Principal;

    constructor(
        public commentsWebService: CommentsWebService,
        public modalService: ModalService,
        public principalService: PrincipalWebService
    ){

    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if(simpleChanges.docid && this.docid) {
            this.user = this.principalService.principal;
            this.commentsWebService.getComments(this.docid)
                .subscribe(comments => this.comments = comments);
        }
    }

    addComment(replyTo?: Comment) {
        const model = {
            title: replyTo? 'msg#comments.replyTo' : 'msg#comments.add',
            message: 'msg#comments.markdownNotice',
            buttons: [],
            output: '',
            validators: [Validators.required],
            rowCount: 5
        }
        this.modalService.prompt(model).then(result => {
            if(result === ModalResult.OK && model.output.trim() !== "") {
                this.commentsWebService.createComment(this.docid, model.output, replyTo?.commentid).subscribe(comment => {
                    if(replyTo) {
                        if(!replyTo.subcomments) {
                            replyTo.subcomments = [];
                        }
                        replyTo.subcomments.push(comment);
                    }
                    else {
                        this.comments.push(comment);
                    }
                });
            }
        });
    }

    likeComment(comment: NormalComment) {
        this.commentsWebService.likeComment(comment.docid, comment.commentid)
            .subscribe(res => {
                comment.likes = res.likes;
                comment.likedByUser = res.likedByUser;
            });
    }

    editComment(comment: NormalComment) {
        const model = {
            title: 'msg#comments.editComment',
            message: 'msg#comments.markdownNotice',
            buttons: [],
            output: comment.message,
            validators: [Validators.required],
            rowCount: 5
        }
        this.modalService.prompt(model).then(result => {
            if(result === ModalResult.OK && model.output.trim() !== "") {
                this.commentsWebService.updateComment(comment.docid, comment.commentid, model.output)
                    .subscribe(res => {
                        comment.message = res.message;
                        comment.modified = res.modified;
                        comment.likes = res.likes;
                        comment.likedByUser = res.likedByUser;
                    });
            }
        });
    }

    deleteComment(comment: NormalComment) {
        // If the comment has subcomments, only mark it as deleted
        const markAsDeleted = !!comment.subcomments?.length;

        this.modalService.confirm({
            message: "msg#comments.deleteNotice",
            confirmType: ConfirmType.Warning,
            buttons: [
                new ModalButton({
                    result: ModalResult.Yes,
                    primary: true
                }),
                new ModalButton({
                    result: ModalResult.Cancel
                })
            ]
        }).then(res => {
            if(res === ModalResult.Yes) {
                this.commentsWebService.deleteComment(comment.docid, comment.commentid, markAsDeleted)
                    .subscribe(res => {
                        if(markAsDeleted) {
                            let c = comment as any;
                            c.deleted = true;
                            delete c.message;
                            delete c.userid;
                            delete c.username;
                            delete c.likes;
                            delete c.likedByUser;
                        }
                        else {
                            this.remove(this.comments, comment);
                        }
                    });
            }
        });

    }

    protected remove(comments: Comment[], comment: Comment): boolean {
        for(let i=0; i<comments.length; i++) {
            if(comments[i] === comment) {
                comments.splice(i,1);
                return true;
            }
            const subcomments = comments[i].subcomments;
            if(subcomments) {
                if(this.remove(subcomments, comment)) {
                    return true;
                }
            }
        }
        return false;
    }
}