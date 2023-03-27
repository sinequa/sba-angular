import { Component, EventEmitter, Output } from "@angular/core";
import { SavedChat, ChatService } from "./chat.service";

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
  `
})
export class SavedChatsComponent {
  @Output() load = new EventEmitter<SavedChat>();

  constructor(
    public chatService: ChatService
  ){}

  onLoad(chat: SavedChat) {
    this.load.emit(chat);
  }

  delete(chat: SavedChat) {
    this.chatService.deleteSavedChat(chat.name);
  }

}
