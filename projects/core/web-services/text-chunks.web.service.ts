import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { IQuery } from "./query/query";
import { StartConfig, START_CONFIG } from "./start-config.web.service";

export interface TextLocation {
    /** Location in document (defaults to 0) */
    offset?: number;
    /** Length in document (defaults to all document) */
    length?: number;
}

export interface TextChunk {
    /** Location in document */
    offset: number;
    /** Length of chunk in document */
    length: number;
    /** Text with HTML tags for entity highlights */
    text: string;
    /** For information: SQL clause for extracting this text chunk */
    sql: string;
}

@Injectable({providedIn: 'root'})
export class TextChunksWebService extends HttpService {
    private static readonly endpoint = "doc.textchunks";

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }
    
    /**
     * Returns text chunks from a given document and at given locations with
     * optional highlights for entities and relevant extracts
     * @param id The document from which to extract the text
     * @param textChunks The locations at which to get the text
     * @param highlights The list of highlights (entities, matchlocations, extractlocations) to include in the text (the web service defaults to no highlight)
     * @param query A query to retrieve the document (including the text searched in the document, which is needed to highlight matches and extracts)
     * @param leftSentencesCount Number of sentences to include BEFORE each location
     * @param rightSentencesCount Number of sentences to include AFTER each location
     * @returns An observable list of text chunks
     */
    getTextChunks(id: string, textChunks: TextLocation[], highlights?: string[], query?: IQuery, leftSentencesCount?: number, rightSentencesCount?: number): Observable<TextChunk[]> {
        return this.httpClient.post<{chunks: TextChunk[]}>(
            this.makeUrl(TextChunksWebService.endpoint), 
            {
                app: this.appName,
                id,
                textChunks,
                highlights,
                query,
                leftSentencesCount,
                rightSentencesCount
            }).pipe(pluck("chunks"));
    }
}