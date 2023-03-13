import { Injectable } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { JsonMethodPluginService, Record, RelevantExtract, TextChunksWebService, TopPassage } from "@sinequa/core/web-services";
import { BehaviorSubject, forkJoin, map, Observable, of, switchMap, tap } from "rxjs";

export interface OpenAIModelMessage {
  role: string;
  content: string;
  display: boolean;
  attachment?: Omit<ChatAttachment, '$record'|'$expanded'|'$payload'>;
}

export interface ChatMessage {
  role: string;
  content: string;
  display: boolean;
  attachment?: ChatAttachment;
}

export interface ChatAttachment {
  recordId: string;
  queryStr: string;
  text: string;
  type: 'document' | 'passage' | 'extract';
  offset: number;
  length: number;
  sentencesBefore: number;
  sentencesAfter: number;
  tokenCount: number;
  $payload: string;
  $expanded?: boolean;
  $record: Record;
}

export type OpenAIModelTokens = {
  used: number;
  model: number;
}

export type OpenAIResponse = {
  messagesHistory: OpenAIModelMessage[];
  tokens: OpenAIModelTokens;
}

@Injectable({providedIn: 'root'})
export class ChatService {
  attachments$ = new BehaviorSubject<ChatAttachment[]>([]);

  constructor(
    public textChunksService: TextChunksWebService,
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService
  ) {}


  // ChatGPT API

  fetch(messages: ChatMessage[], temperature: number, generateTokens: number, topP: number): Observable<{tokens: OpenAIModelTokens, messagesHistory: ChatMessage[]}> {
    const model = {
      model: "GPT35Turbo",
      temperature,
      generateTokens,
      topP
    };
    const messagesHistory = this.cleanAttachments(messages);
    const data = {action: "chat", model, messagesHistory, promptProtection: false};
    return this.jsonMethodWebService.post("OpenAI", data).pipe(
        map((res: OpenAIResponse) => ({
            tokens: res.tokens,
            messagesHistory: [
              ...messages,
              res.messagesHistory.at(-1)! as ChatMessage
            ]
          })
        )
    );
  }

  cleanAttachments(messagesHistory: ChatMessage[]): OpenAIModelMessage[] {
    return messagesHistory.map(message => !message.attachment? message : {
        ...message,
        attachment: {
          ...message.attachment,
          $expanded: undefined,
          $record: undefined,
          $payload: undefined
        }
      }
    );
  }

  restoreAttachments(messageHistory: OpenAIModelMessage[]): Observable<ChatMessage[]> {
    const ids = messageHistory.filter(m => m.attachment).map(a => a.attachment?.recordId!);
    if(ids.length == 0) {
      return of(messageHistory as ChatMessage[]); // Records have no attachment, we can return them as is
    }
    return this.searchService.getRecords(ids).pipe(
      map(records => (messageHistory as ChatMessage[]).map(message => {
        if(message.attachment) {
          message.attachment.$record = records.find(r => r?.id === message.attachment?.recordId)!;
        }
        return message;
      }))
    );
  }

  count(text: string): Observable<number> {
    const data = { action: "TokenCount", model: "GPT35Turbo", text };
    return this.jsonMethodWebService.post("OpenAI", data).pipe(map(res => res.tokens));
  }

  // Attachment API

  searchAttachments(text: string) {
    this.searchService.query.text = text;
    return this.searchService.getResults(this.searchService.query).pipe(
      tap(results => this.searchService.setResults(results)),
      map(results => {
        const passages = results.topPassages?.passages || [];
        passages.forEach(p => p.$record = results.records.find(r => r.id === p.recordId));
        return passages.filter(p => p.score > 0.5).slice(0,5);
      }),
      switchMap(passages => {
        const ids = passages.filter(p => !p.$record).map(p => p.recordId);
        if(ids.length === 0) return of(passages);
        return this.searchService.getRecords(ids).pipe(
          map(records => {
            passages.forEach(p => p.$record = p.$record || records.find(r => r?.id === p.recordId));
            return passages.filter(p => p.$record);
          })
        );
      }),
    ).subscribe(passages => this.addPassages(passages, this.searchService.query));
  }

  addDocument(record: Record, query: Query) {
    // Retrieve 2048 first chars of document (+ following sentence to avoid stopping in the middle of a sentence)
    this.getAttachment('document', record, query, 0, 2048, 0, 1).subscribe(
      attachment => this.attachments$.next([
        ...this.attachments$.value,
        attachment
      ])
    );
  }

  addPassages(passages: TopPassage[], query: Query) {
    forkJoin(
      passages.map(p => {
        const [offset, length] = p.location;
        return this.getAttachment('passage', p.$record!, query, offset, length);
      })
    ).subscribe(attachments => {
      this.attachments$.next([
        ...this.attachments$.value,
        ...attachments
      ]);
    });
  }

  addExtracts(extracts: RelevantExtract[], query: Query) {
    forkJoin(
      extracts.map(e => {
        const [offset, length] = e.locations.split(',');
        return this.getAttachment('extract', e['$record'], query, +offset, +length);
      })
    ).subscribe(attachments => this.attachments$.next([
        ...this.attachments$.value,
        ...attachments
      ])
    );
  }

  getAttachment(type: 'document' | 'passage' | 'extract', $record: Record, query: Query|string, offset: number, length: number, sentencesBefore = 0, sentencesAfter = 0): Observable<ChatAttachment> {
    if(typeof query === 'string') {
      query = this.searchService.makeQuery().fromJson(query);
    }
    else {
      query = query.copy();
    }
    delete query.page;
    const queryStr = query.toJsonForQueryString();

    return this.textChunksService.getTextChunks($record.id, [{offset, length}], [], query, sentencesBefore, sentencesAfter).pipe(
      map(chunks => {
        if(chunks?.[0]) {
          const text = chunks[0].text;
          const $payload = this.formatPayload(text, type, $record.title);
          return {
            type,
            recordId: $record.id,
            queryStr,
            text,
            offset,
            length,
            sentencesBefore,
            sentencesAfter,
            tokenCount: 0,
            $payload,
            $record
          };
        }
        throw new Error("Missing text chunk in web service response");
      }),
      switchMap(a => this.count(a.$payload).pipe(
          map(count => ({...a, tokenCount: count}))
        )
      )
    );
  }

  formatPayload(text: string, type: 'document' | 'passage' | 'extract', title: string) {
    return `<${type} title="${title}">${text}</${type}>`;
  }

  spliceAttachment(old: ChatAttachment, replace?: ChatAttachment) {
    const attachments = this.attachments$.value;
    const i = attachments.indexOf(old);
    if(i !== -1 ) {
      if(replace) {
        replace.$expanded = old.$expanded;
      }
      attachments.splice(i, 1, ...replace ? [replace] : []);
      this.attachments$.next(attachments);
    }
  }

  removeAttachment(attachment: ChatAttachment) {
    this.spliceAttachment(attachment);
  }

  lessTokens(attachment: ChatAttachment) {
    if(attachment.sentencesBefore === 0) {
      attachment.length = Math.floor(attachment.length * 3/4);
    }
    if(!attachment.$record) return;
    this.getAttachment(attachment.type, attachment.$record, attachment.queryStr, attachment.offset, attachment.length, Math.max(0, attachment.sentencesBefore-2), Math.max(0, attachment.sentencesAfter-2))
      .subscribe(a => this.spliceAttachment(attachment, a));
  }

  moreTokens(attachment: ChatAttachment) {
    if(!attachment.$record) return;
    this.getAttachment(attachment.type, attachment.$record, attachment.queryStr, attachment.offset, attachment.length, attachment.sentencesBefore+2, attachment.sentencesAfter+2)
      .subscribe(a => this.spliceAttachment(attachment, a));
  }

}
