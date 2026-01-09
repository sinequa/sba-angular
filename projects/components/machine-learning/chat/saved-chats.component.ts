import { Component, EventEmitter, Output } from "@angular/core";
import { AuditWebService } from "@sinequa/core/web-services";
import { ChatService } from "./chat.service";
import { SavedChat } from "./types";

@Component({
    selector: 'sq-saved-chats',
    template: `
  <ul class="list-group list-group-flush rounded-4">
    <li *ngFor="let chat of chatService.savedChats"
      class="d-flex align-items-center list-group-item list-group-item-action">
      <a class="flex-grow-1" role="button" (click)="onLoad(chat)">
        {{chat.name}}
      </a>
      <button class="btn btn-link" (click)="delete(chat);">
        <i class="fas fa-times"></i>
      </button>
    </li>
  </ul>
  `,
    standalone: false
})
export class SavedChatsComponent {
  @Output() load = new EventEmitter<SavedChat>();

  constructor(
    public chatService: ChatService,
    public auditService: AuditWebService
  ){}

  onLoad(chat: SavedChat) {
    this.load.emit(chat);
    this.auditService.notify({
      type: "Chat_Open",
      detail: {
        chat: chat.name
      }
    });
  }

  delete(chat: SavedChat) {
    this.chatService.deleteSavedChat(chat.name);
  }

}
