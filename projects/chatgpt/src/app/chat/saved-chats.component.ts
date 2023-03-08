import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OpenAIModelMessage } from "./chat.component";
import { SavedChat } from "./saved-chat.service";

@Component({
  selector: 'sq-saved-chats',
  template: `
  <div class="card-body small">
    <div class="list-group list-group-flush">
      <div class="sq-saved-chat d-flex list-group-item list-group-item-action" *ngFor="let chat of savedChats" (click)="load.emit(chat)">
        {{chat.name}}
        <button class="ms-auto btn" (click)="$event.stopPropagation(); delete.emit(chat);"><i class="fas fa-times"></i></button>
      </div>
    </div>
  </div>  `,
  styles: [`
.sq-saved-chat {
  cursor: pointer;
}
  `]
})
export class SavedChatsComponent {
  @Input() savedChats: SavedChat[] = [];

  @Output() load = new EventEmitter<OpenAIModelMessage>();
  @Output() delete = new EventEmitter<OpenAIModelMessage>();
}
