import { Inject, Injectable } from "@angular/core";
import { HttpService, SqHttpClient, StartConfig, START_CONFIG } from "@sinequa/core/web-services";
import { Observable, of, map } from "rxjs";

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

    /**
     * Return the list of comments for a given document
     * @param docid
     * @returns
     */
    getComments(docid: string): Observable<Comment[]> {
        return this.httpClient.post<{comments: Comment[]}>(
            this.makeUrl(this.endpoint), {docid, action: 'read'}
        ).pipe(map(c => c.comments));
    }

    /**
     * Return the number of comments for a given document
     * @param docid
     * @returns
     */
    getCommentCount(docid: string): Observable<number> {
        return this.httpClient.post<{count: number}>(
            this.makeUrl(this.endpoint), {docid, action: 'count'}
        ).pipe(map(c => c.count));
    }

    /**
     * Return the number of comments for a list of documents
     * @param docids
     * @returns
     */
    getCommentCounts(docids: string[]): Observable<{[id: string]: number}> {
        if(docids.length === 0) {
            return of({});
        }
        return this.httpClient.post<{counts: {[id: string]: number}}>(
            this.makeUrl(this.endpoint), {docid: docids[0], docids, action: 'count'}
        ).pipe(map(c => c.counts));
    }

    /**
     * Create a comment with given message for a given document
     * @param docid
     * @param message
     * @param replyto
     * @returns
     */
    createComment(docid: string, message: string, replyto?: string): Observable<NormalComment> {
        return this.httpClient.post<{comment: NormalComment}>(
            this.makeUrl(this.endpoint), {docid, message, replyto, action: 'create'}
        ).pipe(map(c => c.comment));
    }

    /**
     * Modify the content of a comment
     * @param docid
     * @param commentid
     * @param message
     * @returns
     */
    updateComment(docid: string, commentid: string, message: string) {
        return this.httpClient.post<{comment: NormalComment}>(
            this.makeUrl(this.endpoint), {docid, commentid, message, action: 'update'}
        ).pipe(map(c => c.comment));
    }

    /**
     * Delete a specific comment
     * @param docid
     * @param commentid
     * @param markAsDeleted
     * @returns
     */
    deleteComment(docid: string, commentid: string, markAsDeleted: boolean): Observable<void> {
        return this.httpClient.post<void>(
            this.makeUrl(this.endpoint), {docid, commentid, markAsDeleted, action: 'delete'}
        );
    }

    /**
     * Add a like to a comment
     * @param docid
     * @param commentid
     * @returns
     */
    likeComment(docid: string, commentid: string): Observable<NormalComment> {
        return this.httpClient.post<{comment: NormalComment}>(
            this.makeUrl(this.endpoint), {docid, commentid, action: 'like'}
        ).pipe(map(c => c.comment));
    }
}
