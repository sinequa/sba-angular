
import { Injectable } from '@angular/core';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { OpenAIModelMessage } from './chat.component';

export interface SavedChat {
    name: string;
    messages: OpenAIModelMessage[];
}

@Injectable({ providedIn: 'root' })
export class SavedChatService {

    constructor(
        private userSettingsService: UserSettingsWebService
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
        this.sync();
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

    private sync(): void {
        this.userSettingsService.patch({ savedChats: this.savedChats });
    }

}