import { Component, Input, Inject, Optional } from '@angular/core';
import { LoginService } from '@sinequa/core/login';
import { IntlService } from '@sinequa/core/intl';
import { AppService } from '@sinequa/core/app-utils';
import { Placement } from '@sinequa/components/utils';
import { APP_HELP_FOLDER_OPTIONS, BsUserMenuComponent, HelpFolderOptions } from '../user-menu/user-menu.component';

@Component({
    selector: 'sq-help-button',
    templateUrl: './help-button.component.html',
    styleUrls: ['./help-button.component.scss']
})
export class BsHelpButtonComponent {

    @Input() helpFolderOptions: HelpFolderOptions;
    @Input() tooltip?: string = "msg#userMenu.help";
    @Input() text?: string;
    @Input() icon?: string = "fas fa-question";
    @Input() styleClass?: string = "btn-primary";
    @Input() tooltipPlacement?: Placement = "bottom";
    @Input() fallbackPlacements?: Placement[] = ["top", "bottom"];

    constructor(
        public intlService: IntlService,
        public loginService: LoginService,
        public appService: AppService,
        @Optional() @Inject(APP_HELP_FOLDER_OPTIONS) private helpDefaultFolderOptions: HelpFolderOptions | null | undefined) {}

    openHelpPage() {
        // "options" could be undefined
        // "helpDefaultFolderOptions" could be null, in this case map it to undefined
        const options = this.appService.app?.data["help-folder-options"] as HelpFolderOptions;
        const defaults = this.helpDefaultFolderOptions ?? undefined;

        if (options || defaults || this.helpFolderOptions) {
            const { name } = this.intlService.currentLocale;
            const helpFolderOptions = {
                ...defaults,
                ...options,
                ...this.helpFolderOptions // Allow to override the default options in case we want to open a different help page in the same app
            };
            const url = this.appService.helpUrl(BsUserMenuComponent.getHelpIndexUrl(name, helpFolderOptions));
            window.open(url, "_blank");
        }
    }
}
