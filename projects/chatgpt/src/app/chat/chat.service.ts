import { Injectable } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
import { Record, TextChunksWebService, TopPassage } from "@sinequa/core/web-services";
import { BehaviorSubject } from "rxjs";

export interface ChatAttachment {
  id: string;
  text: string;
  title: string;
  type: 'document' | 'passage' | 'extract';
  start: number;
  length: number;
  sentencesBefore: number;
  sentencesAfter: number;
  tokenCount: number;
  payload: string;
  $expanded?: boolean;
}

@Injectable({providedIn: 'root'})
export class ChatService {

  attachments$ = new BehaviorSubject<ChatAttachment[]>([]);

  constructor(
    public textChunksService: TextChunksWebService
  ) {}

  addDocument(record: Record, query: Query) {
    // Retrieve 2048 first chars of document (+ following sentence to avoid stopping in the middle of a sentence)
    this.addAttachment('document', record, query, 0, 2048, 0, 1);
  }

  addPassage(passage: TopPassage, query: Query) {
    const [offset, length] = passage.location;
    this.addAttachment('passage', passage.$record!, query, offset, length);
  }


  addAttachment(type: 'document' | 'passage' | 'extract', record: Record, query: Query, offset: number, length: number, sentencesBefore = 0, sentencesAfter = 0) {
    this.textChunksService.getTextChunks(record.id, [{offset, length}], [], query, sentencesBefore, sentencesAfter).subscribe(chunks => {
      if(chunks?.[0]) {
        const text = chunks[0].text;
        const start = chunks[0].offset;
        const length = chunks[0].length;
        const payload = this.formatPayload(text, type, record.title);
        this.attachments$.next([
          ...this.attachments$.value,
          {
            type,
            id: record.id,
            title: record.title,
            text,
            start,
            length,
            sentencesBefore: 0,
            sentencesAfter: 0,
            tokenCount: Math.floor(payload.length/3.5),
            payload
          }
        ])
      }
    });
  }

  formatPayload(text: string, type: 'document' | 'passage' | 'extract', title: string) {
    return `<${type} title="${title}">${text}</${type}>`;
  }

}
