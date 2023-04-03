import { Injectable } from "@angular/core";
import { NormalComment, Comment } from "@sinequa/components/comments";
import { HttpService } from "@sinequa/core/web-services";
import { Observable, of, EMPTY } from "rxjs";
import { NORMAL_COMMENT } from "../data/comments";

@Injectable({
    providedIn: 'root'
})
export class MockCommentsWebService extends HttpService {
    protected endpoint = 'plugin/CommentsWebService';

    getComments(docid: string): Observable<Comment[]> {
        return of([NORMAL_COMMENT])
    }

    getCommentCount(docid: string): Observable<number> {
        return of(4);
    }

    getCommentCounts(docids: string[]): Observable<{ [id: string]: number }> {
        return of({});
    }

    createComment(docid: string, message: string, replyto?: string): Observable<NormalComment> {
        return of(NORMAL_COMMENT);
    }

    updateComment(docid: string, commentid: string, message: string) {
        return of([NORMAL_COMMENT]);
    }

    deleteComment(docid: string, commentid: string, markAsDeleted: boolean): Observable<void> {
        return EMPTY;
    }

    likeComment(docid: string, commentid: string): Observable<NormalComment> {
        return of(NORMAL_COMMENT);
    }
}
