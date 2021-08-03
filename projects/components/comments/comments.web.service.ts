import { Inject, Injectable } from "@angular/core";
import { HttpService, SqHttpClient, StartConfig, START_CONFIG } from "@sinequa/core/web-services";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";

declare interface CoreComment {
    commentid: string;
    docid: string;
    replyto: string;
    creation: string;
    modified: string;
    subcomments?: Comment[];
}

export interface DeletedComment extends CoreComment{
    deleted: true;
}

export interface NormalComment extends CoreComment {
    message: string;
    userid: string;
    username: string;
    likes: number;
    likedByUser: boolean;
}

export type Comment = NormalComment | DeletedComment;


@Injectable({
    providedIn: 'root'
})
export class CommentsWebService extends HttpService {
    protected endpoint = 'plugin/CommentsWebService';

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        protected httpClient: SqHttpClient) {
        super(startConfig);
    }

    getComments(docid: string): Observable<Comment[]> {
        return this.httpClient.post<{comments: Comment[]}>(
            this.makeUrl(this.endpoint), {docid, action: 'read'}
        ).pipe(pluck('comments'));
    }

    createComment(docid: string, message: string, replyto?: string): Observable<NormalComment> {
        return this.httpClient.post<{comment: NormalComment}>(
            this.makeUrl(this.endpoint), {docid, message, replyto, action: 'create'}
        ).pipe(pluck('comment'));
    }

    updateComment(docid: string, commentid: string, message: string) {
        return this.httpClient.post<{comment: NormalComment}>(
            this.makeUrl(this.endpoint), {docid, commentid, message, action: 'update'}
        ).pipe(pluck('comment'));
    }

    deleteComment(docid: string, commentid: string, markAsDeleted: boolean): Observable<void> {
        return this.httpClient.post<void>(
            this.makeUrl(this.endpoint), {docid, commentid, markAsDeleted, action: 'delete'}
        );
    }

    likeComment(docid: string, commentid: string): Observable<NormalComment> {
        return this.httpClient.post<{comment: NormalComment}>(
            this.makeUrl(this.endpoint), {docid, commentid, action: 'like'}
        ).pipe(pluck('comment'));
    }
}