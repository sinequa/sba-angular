import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RemarkModule } from "ngx-remark";

import { ResultModule } from "@sinequa/components/result";
import { UtilsModule } from "@sinequa/components/utils";
import { IntlModule } from "@sinequa/core/intl";
import { BsActionModule } from "@sinequa/components/action";

import { AnswerCardComponent } from "./answer-card.component";
import { PassageListComponent } from "./passage-list.component";
import { TopPassagesComponent } from "./top-passages/top-passages.component";

import { ChatComponent } from "./chat/chat.component";
import { ChatSettingsComponent } from "./chat/chat-settings.component";
import { SavedChatsComponent } from "./chat/saved-chats.component";
import { ChatMessageComponent } from "./chat/chat-message.component";


@NgModule({
    imports: [
        CommonModule,
        ResultModule,
        IntlModule,
        UtilsModule,
        FormsModule,
        BsActionModule,
        RemarkModule
    ],
    declarations: [
        AnswerCardComponent,
        PassageListComponent,
        TopPassagesComponent,
        ChatComponent,
        ChatMessageComponent,
        ChatSettingsComponent,
        SavedChatsComponent
    ],
    exports: [
        AnswerCardComponent,
        PassageListComponent,
        TopPassagesComponent,
        ChatComponent,
        ChatSettingsComponent,
        SavedChatsComponent
    ]
})
export class MLModule {
}
