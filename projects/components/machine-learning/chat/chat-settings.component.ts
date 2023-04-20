import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ChatConfig, defaultChatConfig } from "./chat.component";
import { ChatService } from "./chat.service";
import { OpenAIModel } from "./types";

@Component({
  selector: 'sq-chat-settings',
  template: `
  <div class="card-body small">
    <div class="mb-2">
      <label for="openaiModel" class="form-label">Model</label>
      <select class="form-select" id="openaiModel" [(ngModel)]="config.model" *ngIf="models$ | async as models">
        <option *ngFor="let model of models">{{model}}</option>
      </select>
    </div>
    <div class="form-check form-switch mb-2">
      <input class="form-check-input" type="checkbox" role="switch" id="textBeforeAttachments" [(ngModel)]="config.textBeforeAttachments">
      <label class="form-check-label" for="textBeforeAttachments">Send text before attachments</label>
    </div>
    <div class="form-check form-switch mb-2">
      <input class="form-check-input" type="checkbox" role="switch" id="displayAttachments" [(ngModel)]="config.displayAttachments">
      <label class="form-check-label" for="displayAttachments">Display attachments in the chat conversation</label>
    </div>
    <div class="mb-2">
      <label for="initialSystemPrompt" class="form-label">Initial system prompt (hidden)</label>
      <textarea class="form-control" id="initialSystemPrompt" [(ngModel)]="config.initialSystemPrompt"></textarea>
    </div>
    <div class="mb-2">
      <label for="initialUserPrompt" class="form-label">Initial user prompt</label>
      <textarea class="form-control" id="initialUserPrompt" [(ngModel)]="config.initialUserPrompt"></textarea>
    </div>
    <div class="mb-2">
      <label for="addAttachmentPrompt" class="form-label">Default prompt when adding an attachment</label>
      <textarea class="form-control" id="addAttachmentPrompt" [(ngModel)]="config.addAttachmentPrompt"></textarea>
    </div>
    <div class="mb-2">
      <label for="addAttachmentsPrompt" class="form-label">Default prompt when adding multiple attachment</label>
      <textarea class="form-control" id="addAttachmentsPrompt" [(ngModel)]="config.addAttachmentsPrompt"></textarea>
    </div>
    <div class="mb-2">
      <label for="attachmentsHiddenPrompt" class="form-label">Hidden prompt inserted after a list of attachments to given special instructions/guidance</label>
      <textarea class="form-control" id="attachmentsHiddenPrompt" [(ngModel)]="config.attachmentsHiddenPrompt"></textarea>
    </div>
    <div class="mb-2">
      <label for="autoSearchMinScore" class="form-label">Auto-search minimum passage score: {{config.autoSearchMinScore}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="1" step="0.05" id="autoSearchMinScore" [(ngModel)]="config.autoSearchMinScore">
    </div>
    <div class="mb-2">
      <label for="autoSearchMaxPassages" class="form-label">Auto-search maximum number of passages: {{config.autoSearchMaxPassages}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="10" step="1" id="autoSearchMaxPassages" [(ngModel)]="config.autoSearchMaxPassages">
    </div>
    <div class="mb-2">
      <label for="autoSearchMaxDocuments" class="form-label">Auto-search maximum number of documents (when no passage): {{config.autoSearchMaxDocuments}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="10" step="1" id="autoSearchMaxDocuments" [(ngModel)]="config.autoSearchMaxDocuments">
    </div>
    <div class="mb-2">
      <label for="autoSearchExpand" class="form-label">Expand passages with extra sentences: {{config.autoSearchExpand}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="10" step="1" id="autoSearchExpand" [(ngModel)]="config.autoSearchExpand">
    </div>
    <div class="mb-2">
      <label for="temperature" class="form-label">Temperature: {{config.temperature}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="2" step="0.1" id="temperature" [(ngModel)]="config.temperature">
    </div>
    <div class="mb-2">
      <label for="top-p" class="form-label">Top P: {{config.topP}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="1" step="0.05" id="top-p" [(ngModel)]="config.topP">
    </div>
    <div class="mb-2">
      <label for="max-tokens" class="form-label">Max tokens: {{config.maxTokens}}</label>
      <input type="range" class="form-range form-range-sm" min="1" max="2048" step="1" id="max-tokens" [(ngModel)]="config.maxTokens">
    </div>
    <button class="btn btn-primary" (click)="reset()">Reset configuration</button>
  </div>  `
})
export class ChatSettingsComponent {
  @Input() config: ChatConfig;

  models$: Observable<OpenAIModel[]>;

  constructor(
    public chatService: ChatService
  ) {
    this.models$ = this.chatService.listModels();
  }

  reset() {
    Object.assign(this.config, defaultChatConfig);
  }
}
