import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CollapseModule } from "@sinequa/components/collapse";
import { UtilsModule } from "@sinequa/components/utils";
import { IntlModule } from "@sinequa/core/intl";
import { LoginModule } from "@sinequa/core/login";
import { WebServicesModule } from "@sinequa/core/web-services";
import { CommentsComponent } from "./comments.component";
import { CreationDatePipe } from "./creation-date.pipe";
import { MarkdownPipe } from "./markdown.pipe";

@NgModule({
    imports: [
        CommonModule,

        WebServicesModule,
        IntlModule,
        LoginModule,

        UtilsModule,
        CollapseModule
    ],
    declarations: [
        CommentsComponent,
        CreationDatePipe,
        MarkdownPipe
    ],
    exports: [
        CommentsComponent,
        MarkdownPipe
    ],
})
export class CommentsModule {
}