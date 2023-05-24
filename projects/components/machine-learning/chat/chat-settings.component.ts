import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { ChatConfig, defaultChatConfig } from "./chat.component";
import { ChatService } from "./chat.service";
import { GllmModelDescription } from "./types";

@Component({
  selector: 'sq-chat-settings',
  templateUrl: './chat-settings.component.html'
})
export class ChatSettingsComponent {
  @Input() config: ChatConfig;
  @Output("reset") _reset = new EventEmitter();

  models$: Observable<GllmModelDescription[]>;

  constructor(
    public chatService: ChatService
  ) {
    this.models$ = this.chatService.listModels();
  }

  reset() {
    Object.assign(this.config, defaultChatConfig);
    this._reset.emit();
  }
}
