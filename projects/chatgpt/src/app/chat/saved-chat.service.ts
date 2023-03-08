
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { ModalResult, ModalService, PromptOptions } from '@sinequa/core/modal';
import { NotificationsService } from '@sinequa/core/notification';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { OpenAIModelMessage } from './chat.component';

export interface SavedChat {
  name: string;
  messages: OpenAIModelMessage[];
}

@Injectable({ providedIn: 'root' })
export class SavedChatService {

  openChat?: SavedChat;

  constructor(
    private userSettingsService: UserSettingsWebService,
    public modalService: ModalService,
    public notificationsService: NotificationsService
  ) {
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


  saveChat(messages: OpenAIModelMessage[]) {
    const model: PromptOptions = {
      title: 'Save Chat',
      message: 'Enter a name for the chat',
      buttons: [],
      output: '',
      validators: [Validators.required]
    };
    this.modalService.prompt(model).then(res => {
      if (res === ModalResult.OK) {
        const savedChat: SavedChat = { name: model.output, messages };
        this.save(savedChat);
      }
    });
  }

  loadChat(savedChat: SavedChat): void {
    this.openChat = savedChat;
  }
}
