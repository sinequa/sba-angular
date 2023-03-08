import { Component, EventEmitter, Output } from "@angular/core";
import { SavedChat, SavedChatService } from "./saved-chat.service";

@Component({
  selector: 'sq-saved-chats',
  template: `
  <ul class="list-group">
    <li *ngFor="let chat of savedChatService.savedChats"
      class="d-flex list-group-item list-group-item-action">
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
    public savedChatService: SavedChatService
  ){}

  onLoad(chat: SavedChat) {
    this.load.emit(chat);
    this.savedChatService.loadChat(chat);
  }

  delete(chat: SavedChat) {
    this.savedChatService.delete(chat.name);
  }

}
