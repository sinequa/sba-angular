import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ChatConfig, defaultChatConfig } from "./chat.component";
import { ChatService } from "./chat.service";

@Component({
    selector: 'sq-chat-settings',
    templateUrl: './chat-settings.component.html',
    standalone: false
})
export class ChatSettingsComponent {
  @Input() config: ChatConfig;
  @Output("reset") _reset = new EventEmitter();

  constructor(
    public chatService: ChatService
  ) {}

  reset() {
    Object.assign(this.config, defaultChatConfig);
    this._reset.emit();
  }
}
