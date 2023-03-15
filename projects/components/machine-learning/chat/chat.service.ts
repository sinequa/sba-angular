import { Injectable } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { JsonMethodPluginService, Record, RelevantExtract, TextChunksWebService, TopPassage, UserSettingsWebService } from "@sinequa/core/web-services";
import { BehaviorSubject, forkJoin, map, Observable, of, switchMap, tap } from "rxjs";
import { marked } from "marked";
import { ModalResult, ModalService, PromptOptions } from "@sinequa/core/modal";
import { NotificationsService } from "@sinequa/core/notification";
import { Validators } from "@angular/forms";

export interface OpenAIModelMessage {
  role: string;
  content: string;
  display: boolean;
  $attachment?: Omit<ChatAttachment, '$record'|'$expanded'|'$payload'>;
}

export interface ChatMessage extends OpenAIModelMessage {
  $attachment?: ChatAttachment;
  $content?: string;
  $citations?: OpenAIReference[];
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

export type OpenAIReference = {
  refId: number;
  recordId: string;
  lEnginePassages: {passage_id: number; offset: number; length: number;}[];
  $record: Record;
}

export interface OpenAIResponse {
  messagesHistory: OpenAIModelMessage[];
  tokens: OpenAIModelTokens;
  scope?: OpenAIReference[];
}

export interface ChatResponse extends OpenAIResponse {
  messagesHistory: ChatMessage[];
}

export type OpenAIModel = "Davinci3" | "GPT35Turbo";

export interface SavedChat {
  name: string;
  messages: OpenAIModelMessage[];
  tokens: OpenAIModelTokens;
}

@Injectable({providedIn: 'root'})
export class ChatService {
  attachments$ = new BehaviorSubject<ChatAttachment[]>([]);

  constructor(
    public textChunksService: TextChunksWebService,
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService,
    private userSettingsService: UserSettingsWebService,
    public modalService: ModalService,
    public notificationsService: NotificationsService
  ) {}


  // ChatGPT API

  public summarize(topPassages: TopPassage[], modelName: OpenAIModel, temperature: number, generateTokens: number, topP: number, extendBefore: number, extendAfter: number, top: number, prompt: string): Observable<ChatResponse> {
    const queryText = this.searchService.query.text || '';
    const model = {
      model: modelName,
      temperature,
      generateTokens,
      topP
    };
    const passages = {
      list: topPassages.map(p => ({docId: p.recordId, passageIndex: p.id, index: p.index})),
      extendBefore,
      extendAfter,
      top
    };
    const data = {
      action: 'summarize',
      model,
      queryText,
      passages,
      prompt
    };

    return this.jsonMethodWebService.post('OpenAI', data).pipe(
      tap((res: ChatResponse) => {
        res.scope?.forEach(r => r.$record = topPassages.find(p => p.recordId === r.recordId)?.$record!)
      }),
      tap(res => this.processMessages(res.messagesHistory, res.scope))
    )
  }

  fetch(messages: ChatMessage[], modelName: OpenAIModel, temperature: number, generateTokens: number, topP: number): Observable<ChatResponse> {
    const model = {
      model: modelName,
      temperature,
      generateTokens,
      topP
    };
    const messagesHistory = this.cleanAttachments(messages);
    const data = {action: "chat", model, messagesHistory, promptProtection: false};
    return this.jsonMethodWebService.post("OpenAI", data).pipe(
      map((res: OpenAIResponse) => ({
        ...res,
        messagesHistory: [ ...messages, res.messagesHistory.at(-1)! as ChatMessage ]
      })),
      tap((res: ChatResponse) => {
        res.scope?.forEach(r => r.$record = messages.find(p => p.$attachment?.recordId === r.recordId)?.$attachment?.$record!)
      }),
      tap(res => this.processMessages(res.messagesHistory, res.scope))
    );
  }


  cleanAttachments(messagesHistory: ChatMessage[]): OpenAIModelMessage[] {
    return messagesHistory.map(message => ({
      role: message.role,
      content: message.content,
      display: message.display,
      $attachment: !message.$attachment? undefined : {
        ...message.$attachment,
        $expanded: undefined,
        $record: undefined,
        $payload: undefined
      }
    }));
  }

  restoreAttachments(messageHistory: OpenAIModelMessage[]): Observable<ChatMessage[]> {
    const ids = messageHistory.filter(m => m.$attachment).map(a => a.$attachment?.recordId!);
    if(ids.length == 0) {
      return of(messageHistory as ChatMessage[]); // Records have no attachment, we can return them as is
    }
    return this.searchService.getRecords(ids).pipe(
      map(records =>
        (messageHistory as ChatMessage[]).map(message => {
          if(message.$attachment) {
            message.$attachment.$record = records.find(r => r?.id === message.$attachment?.recordId)!;
          }
          return message;
        })
      ),
      tap(messages => this.processMessages(messages))
    );
  }

  processMessages(messagesHistory: OpenAIModelMessage[], scope?: OpenAIReference[]) {
    scope?.forEach(s => s.$record = s.$record || this.searchService.results?.records?.find(r => r.id === s.recordId)!);
    for(let m of messagesHistory as ChatMessage[]) {
      if(!m.$content) {
        m.$content = marked(m.content);
        m.$citations = [];
        if(m.role === 'assistant') {
          const matches = m.$content.matchAll(/\[(\d+(,[ \d]+)*)\]/g);
          const citations = new Set<number>();
          for(let match of matches) {
            for(let ref of match[1].split(',')) {
              citations.add(+ref);
            }
          }
          m.$citations = [...citations].sort((a,b)=> a-b)
                                      .map(i => scope?.find(ref => ref.refId === i)!)
                                      .filter(r => r);
          m.$content = m.$content.replace(/\[(\d+(,[ \d]+)*)\]/g, (str,match) => {
            let html = '';
            for(let ref of match.split(',')) {
              const record = scope?.find(s => s.refId === +ref)?.$record;
              if(record) {
                html += `<a class="citation" href="${record.url1}" title="${record.title}">${ref}</a>`;
              }
              else {
                html += `<span class="citation">${ref}</span>`;
              }
            }
            return html;
          });
        }
      }
    }
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
    ).subscribe(passages => {
      if(passages.length > 0) {
        this.addPassages(passages, this.searchService.query);
      }
      else {
        this.attachments$.next([]);
      }
    });
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



  public get savedChats(): SavedChat[] {
    if (!this.userSettingsService.userSettings)
      this.userSettingsService.userSettings = {};
    if (!this.userSettingsService.userSettings["savedChats"])
      this.userSettingsService.userSettings["savedChats"] = [];
    return this.userSettingsService.userSettings["savedChats"];
  }

  public get(name: string): SavedChat | undefined {
    return this.savedChats.find((chat: SavedChat) => chat.name === name);
  }

  public save(savedChat: SavedChat): void {
    const chat = this.get(savedChat.name);
    if (chat) {
      this.delete(chat.name, true);
    }
    this.savedChats.push(savedChat);
    this.sync().subscribe(() => this.notificationsService.success(`${savedChat.name} was saved successfully`));
  }

  public delete(name: string, skipSync?: boolean): void {
    const chat = this.get(name);
    if (chat) {
      this.savedChats.splice(this.savedChats.indexOf(chat), 1);
      if (!skipSync) {
        this.sync();
      }
    }
  }

  private sync() {
    return this.userSettingsService.patch({ savedChats: this.savedChats });
  }


  saveChat(messages: OpenAIModelMessage[], tokens: OpenAIModelTokens) {
    const model: PromptOptions = {
      title: 'Save Chat',
      message: 'Enter a name for the chat',
      buttons: [],
      output: '',
      validators: [Validators.required]
    };
    this.modalService.prompt(model).then(res => {
      if (res === ModalResult.OK) {
        const savedChat: SavedChat = { name: model.output, messages, tokens };
        this.save(savedChat);
      }
    });
  }

}
