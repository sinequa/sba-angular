import { Injectable } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { JsonMethodPluginService, Record, RelevantExtract, TextChunksWebService, TopPassage, UserSettingsWebService } from "@sinequa/core/web-services";
import { BehaviorSubject, forkJoin, map, Observable, of, switchMap, tap } from "rxjs";
import { marked } from "marked";
import { ModalResult, ModalService, PromptOptions } from "@sinequa/core/modal";
import { NotificationsService } from "@sinequa/core/notification";
import { Validators } from "@angular/forms";
import { Utils } from "@sinequa/core/base";

/**
 * Individual message sent & returned by the ChatGPT API.
 * If this message is an attachment, we attach the minimal
 * information needed to reconstruct this attachment (RawAttachment)
 * as well as the reference id computed at the moment of sending
 * the attachment to the API.
 */
export interface RawMessage {
  role: string;
  content: string;
  display: boolean;
  /** Messages from the user can have attachments */
  $attachment?: RawAttachment;
  /** Reference of this attachment in the contexte of the conversation */
  $refId?: number;
}

/**
 * Minimal information necessary to reconstruct an attachment
 */
export interface RawAttachment {
  type: 'document' | 'snippet' | 'extract';
  recordId: string;
  queryStr: string;
  offset: number;
  length: number;
  sentencesBefore: number;
  sentencesAfter: number;
}

/**
 * A chat message that has been processed to include the markdown-formatted
 * content for display, as well as detailed attachment data, and optionally
 * a list of the references extracted from that message
 */
export interface ChatMessage extends RawMessage {
  /** This content is formatted to be properly displayed in the UI */
  $content: string;
  /** Messages from the user can have attachments */
  $attachment?: ChatAttachment;
  /** Messages from the assistant can have references that refer to attachments ids */
  $references?: {refId: number; $record: Record}[];
}

/**
 * Chat attachment for which we know the text and the source
 * record object
 */
export interface ChatAttachment extends RawAttachment {
  /** text of the attachment displayed in the UI */
  $text: string;
  /** Record from which this this attachment is taken */
  $record: Record;
  /** Whether the attachment is displayed expanded of not */
  $expanded?: boolean;
}

/**
 * Chat Attachment for which we know the number
 * of tokens it consumes
 */
export interface ChatAttachmentWithTokens extends ChatAttachment {
  /** Number of tokens of this message */
  $tokenCount: number;
}

/**
 * Information provided by the API about the number of tokens consumed
 * by the current conversation
 */
export type OpenAITokens = {
  used: number;
  model: number;
}

/**
 * Raw response of the API
 */
export interface RawResponse {
  messagesHistory: RawMessage[];
  tokens: OpenAITokens;
}

/**
 * Enriched response of the API
 */
export interface ChatResponse extends RawResponse {
  messagesHistory: ChatMessage[];
}

/**
 * Model names supported by the API
 */
export type OpenAIModel = "Davinci3" | "GPT35Turbo";

/**
 * Minimal data structure saved to reconstruct a conversation
 */
export interface SavedChat {
  name: string;
  messages: RawMessage[];
  tokens: OpenAITokens;
}

@Injectable({providedIn: 'root'})
export class ChatService {

  /**
   * Global list of attachments fed by various methods from the ChatService,
   * such as: searchAttachments, addAttachments, removeAttachment, moreTokens, lessTokens...
   */
  attachments$ = new BehaviorSubject<ChatAttachmentWithTokens[]>([]);

  constructor(
    public textChunksService: TextChunksWebService,
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService,
    private userSettingsService: UserSettingsWebService,
    public modalService: ModalService,
    public notificationsService: NotificationsService
  ) {}


  // ChatGPT API

  /**
   * Calls the ChatGPT API to retrieve a new message given all previous messages
   */
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
      map((res: RawResponse) => ({
        tokens: res.tokens,
        messagesHistory: [
          ...messages,
          this.processMessage(res.messagesHistory.at(-1)!, messages)
        ]
      })),
    );
  }

  /**
   * Returns the number of tokens taken by the given text
   */
  count(text: string): Observable<number> {
    const data = { action: "TokenCount", model: "GPT35Turbo", text };
    return this.jsonMethodWebService.post("OpenAI", data).pipe(map(res => res.tokens));
  }

  /**
   * Takes a list of ChatMessage and strips it from its
   * optional data ($content, $record, etc.) so that it can be sent
   * to the chat, or saved in the user settings
   */
  cleanAttachments(messagesHistory: ChatMessage[]): RawMessage[] {
    return messagesHistory.map(message => ({
      role: message.role,
      content: message.content,
      display: message.display,
      $attachment: message.$attachment? {
        type: message.$attachment.type,
        recordId: message.$attachment.recordId,
        queryStr: message.$attachment.queryStr,
        offset: message.$attachment.offset,
        length: message.$attachment.length,
        sentencesBefore: message.$attachment.sentencesBefore,
        sentencesAfter: message.$attachment.sentencesAfter,
      }: undefined,
      $refId: message.$refId
    }));
  }

  /**
   * Given a list of raw messages (typically from a saved chat),
   * this function reconstructs all the necessary data (records, attachments...)
   * and returns a list of ChatMessage objects ready to be displayed
   */
  restoreAttachments(messages: RawMessage[]): Observable<ChatMessage[]> {
    const ids = messages.map(a => a.$attachment?.recordId!).filter(id => id);
    return this.searchService.getRecords(ids).pipe(
      switchMap(records => forkJoin(
        messages.map(message => {
          if(message.$attachment) {
            const a = message.$attachment;
            const record = records.find(r => r?.id === a.recordId);
            if(record) { // record is found
              return this.getAttachment(a.type, record, a.queryStr, a.offset, a.length, a.sentencesBefore, a.sentencesAfter);
            }
          }
          return of(undefined);
        })
      )),
      map(attachments => {
        const chatMessages: ChatMessage[] = [];
        for(let i=0; i<messages.length; i++) {
          const message = messages[i];
          const $attachment = attachments[i];
          chatMessages.push(this.processMessage(message, chatMessages, $attachment));
        }
        return chatMessages;
      })
    );
  }

  /**
   * Generates the $content and $references fields on a ChatMessage
   * If the message if from the assistant, we attempt to extract references
   * from it.
   */
  processMessage(message: RawMessage, conversation: ChatMessage[], $attachment?: ChatAttachment): ChatMessage {
    const chatMessage: ChatMessage = {...message, $content: marked(message.content), $attachment};
    if(message.role === 'assistant') {
      this.extractReferences(chatMessage, conversation);
    }
    return chatMessage;
  }

  /**
   * Extract references from a given message, given the context of a conversation
   * (which includes messages/attachments that this message is refering to).
   */
  protected extractReferences(message: ChatMessage, conversation: ChatMessage[]) {
    const matches = message.$content.matchAll(/\[(\d+(,[ \d]+)*)\]/g);
    const references = new Set<number>();
    for(let match of matches) {
      for(let ref of match[1].split(',')) {
        references.add(+ref);
      }
    }
    if(references.size > 0) {
      message.$references = [...references].sort((a,b)=> a-b)
        .map(refId => ({
          refId,
          $record: conversation.find(p => p.$refId === refId)?.$attachment?.$record!
        }))
        .filter(r => r.$record);
        message.$content = message.$content.replace(/\[(\d+(,[ \d]+)*)\]/g, (str,match) => {
        let html = '';
        for(let ref of match.split(',')) {
          const record = conversation.find(p => p.$refId === +ref)?.$attachment?.$record;
          if(record) {
            html += `<a class="reference" href="${record.url1}" title="${Utils.escapeHtml(record.title)}">${Utils.escapeHtml(ref)}</a>`;
          }
          else {
            html += `<span class="reference">${Utils.escapeHtml(ref)}</span>`;
          }
        }
        return html;
      });
    }
  }

  /**
   * Given a list of attachments and an existing conversation, this function generates
   * a list of chat messages with the formatted attachment as content.
   * Each attachment gets a reference id corresponding to the records ids used throughout the
   * conversation.
   * The messages that can be appended to the conversation and sent to the API.
   */
  prepareAttachmentMessages(attachments: ChatAttachment[], conversation: ChatMessage[]): ChatMessage[] {
    const refs = new Map<string, number>();
    for(let msg of conversation) {
      if(msg.$attachment) {
        refs.set(msg.$attachment.recordId, msg.$refId!);
      }
    }
    let lastRefId = [...refs.values()].sort((a,b) => a - b).at(-1) || 0; // Get the last used reference id

    return attachments.map($attachment => {
      if(!refs.has($attachment.recordId)) {
        refs.set($attachment.recordId, ++lastRefId);
      }
      const $refId = refs.get($attachment.recordId)!;
      return {
        role: 'user',
        content: this.formatPayload($attachment.type, $refId, $attachment.$record.title, $attachment.$text),
        display: true,
        $content: '', // Attachment have their own template
        $attachment,
        $refId
      }
    });
  }


  // Attachment API

  /**
   * Use Sinequa to retrieve relevant passages for the given text query
   * When relevant content is retrieved, the attachments$ subject is
   * upated.
   */
  searchAttachments(text: string, minScore = 0.5, maxPassages = 5) {
    this.searchService.query.text = text;
    this.searchService.getResults(this.searchService.query).pipe(
      tap(results => this.searchService.setResults(results)),
      map(results => {
        const passages = results.topPassages?.passages || [];
        passages.forEach(p => p.$record = results.records.find(r => r.id === p.recordId));
        return passages.filter(p => p.score > minScore).slice(0,maxPassages);
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
      switchMap(passages => passages.length > 0?
        forkJoin(this.getPassages(passages, this.searchService.query)) : of([])
      ),
    ).subscribe(passages => this.attachments$.next(passages));
  }

  /**
   * Returns a (truncated) document attachment
   */
  getDocument(record: Record, query: Query, maxLength = 2048): Observable<ChatAttachmentWithTokens> {
    return this.getAttachmentWithTokens('document', record, query, 0, maxLength, 0, 1);
  }

  /**
   * Returns a list of snippet/passage attachments
   */
  getPassages(passages: TopPassage[], query: Query): Observable<ChatAttachmentWithTokens>[] {
    return passages.map(p => {
      const [offset, length] = p.location;
      return this.getAttachmentWithTokens('snippet', p.$record!, query, offset, length);
    });
  }

  /**
   * Returns a list of extract attachments
   */
  getExtracts(extracts: RelevantExtract[], query: Query): Observable<ChatAttachmentWithTokens>[] {
    return extracts.map(e => {
      const [offset, length] = e.locations.split(',');
      return this.getAttachmentWithTokens('extract', e['$record'], query, +offset, +length);
    });
  }

  /**
   * Add a list of asynchronous attachments to the attachments$
   */
  addAttachments(attachments$: Observable<ChatAttachmentWithTokens>[]) {
    forkJoin(attachments$).subscribe(attachments =>
      this.attachments$.next([
        ...this.attachments$.value,
        ...attachments
      ])
    );
  }

  /**
   * Construct an attachment of a given type, and given a record and a query to retrieve it.
   * Options like offset/length/sentenceBefore/after allow to modulate the position and length
   * of the returned attachment.
   */
  getAttachment(type: 'document' | 'snippet' | 'extract', $record: Record, query: Query|string, offset: number, length: number, sentencesBefore = 0, sentencesAfter = 0): Observable<ChatAttachment> {
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
          const $text = chunks[0].text;
          return {
            type,
            recordId: $record.id,
            queryStr,
            offset,
            length,
            sentencesBefore,
            sentencesAfter,
            $text,
            $record
          };
        }
        throw new Error("Missing text chunk in web service response");
      })
    );
  }

  /**
   * Construct an attachment with getAttachment(), but also counts the number of tokens
   * consumed by this attachment.
   */
  getAttachmentWithTokens(type: 'document' | 'snippet' | 'extract', $record: Record, query: Query|string, offset: number, length: number, sentencesBefore = 0, sentencesAfter = 0): Observable<ChatAttachmentWithTokens> {
    return this.getAttachment(type, $record, query, offset, length, sentencesBefore, sentencesAfter).pipe(
      switchMap(attachment => this.count(this.formatPayload(attachment.type, 10, attachment.$record.title, attachment.$text)).pipe(
        map(count => ({...attachment, $tokenCount: count}))
      )), // Placeholder id as the real id is determined when aggregating the attachments
    );
  }

  /**
   * Creates a formated message for ChatGPT
   */
  protected formatPayload(type: string, id: number, title: string, text: string) {
    return `<${type} id="${id}" title="${title}">${text}</${type}>`;
  }

  /**
   * Replace an old attachment with a new one
   */
  protected spliceAttachment(old: ChatAttachmentWithTokens, replace?: ChatAttachmentWithTokens) {
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

  /**
   * Remove an attachment
   */
  removeAttachment(attachment: ChatAttachmentWithTokens) {
    this.spliceAttachment(attachment);
  }

  /**
   * Decrease the number of tokens of an attachment
   */
  lessTokens(attachment: ChatAttachmentWithTokens) {
    if(attachment.sentencesBefore === 0) {
      attachment.length = Math.floor(attachment.length * 3/4);
    }
    if(!attachment.$record) return;
    this.getAttachmentWithTokens(attachment.type, attachment.$record, attachment.queryStr, attachment.offset, attachment.length, Math.max(0, attachment.sentencesBefore-2), Math.max(0, attachment.sentencesAfter-2))
      .subscribe(a => this.spliceAttachment(attachment, a));
  }

  /**
   * Increase the number of tokens of an attachment
   */
  moreTokens(attachment: ChatAttachmentWithTokens) {
    if(!attachment.$record) return;
    this.getAttachmentWithTokens(attachment.type, attachment.$record, attachment.queryStr, attachment.offset, attachment.length, attachment.sentencesBefore+2, attachment.sentencesAfter+2)
      .subscribe(a => this.spliceAttachment(attachment, a));
  }


  // Saved chats management

  /**
   * Chats saved by the user to reopen them later
   */
  public get savedChats(): SavedChat[] {
    if (!this.userSettingsService.userSettings)
      this.userSettingsService.userSettings = {};
    if (!this.userSettingsService.userSettings["savedChats"])
      this.userSettingsService.userSettings["savedChats"] = [];
    return this.userSettingsService.userSettings["savedChats"];
  }

  /**
   * Returns the saved chat with the given name
   */
  public get(name: string): SavedChat | undefined {
    return this.savedChats.find((chat: SavedChat) => chat.name === name);
  }

  /**
   * Save a agiven chat in the user settings
   */
  public save(savedChat: SavedChat): void {
    const chat = this.get(savedChat.name);
    if (chat) {
      this.delete(chat.name, true);
    }
    this.savedChats.push(savedChat);
    this.sync().subscribe(() => this.notificationsService.success(`${savedChat.name} was saved successfully`));
  }

  /**
   * Delete a given chat
   */
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

  /**
   * Open a prompt to let the user pick a name for a saved chat.
   * If the user obliges the chat is saved.
   */
  saveChat(conversation: ChatMessage[], tokens: OpenAITokens) {
    const messages = this.cleanAttachments(conversation);
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
