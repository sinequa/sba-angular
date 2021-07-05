import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Action } from '@sinequa/components/action';
import { PrincipalWebService, UserSettingsWebService } from '@sinequa/core/web-services';
import { AuthenticationService, LoginService, UserOverride } from '@sinequa/core/login';
import { IntlService, Locale } from '@sinequa/core/intl';
import { Utils } from '@sinequa/core/base';
import { BsOverrideUser } from '@sinequa/components/modal';
import { ModalService, ModalResult, ConfirmType, ModalButton } from '@sinequa/core/modal';
import { AppService } from '@sinequa/core/app-utils';
import {NotificationsService, NotificationType} from '@sinequa/core/notification';

@Component({
  selector: 'sq-user-menu',
  templateUrl: './user-menu.component.html'
})
export class BsUserMenuComponent implements OnInit, OnDestroy {

  @Input() icon: string = "fas fa-user";
  @Input() autoAdjust: boolean = true;
  @Input() autoAdjustBreakpoint: string = 'xl';
  @Input() collapseBreakpoint: string = 'sm';
  @Input() size: string;

  menu: Action;

  // User actions
  loginAction: Action;
  logoutAction: Action;
  overrideAction: Action;
  revertOverrideAction: Action;
  adminAction: Action;
  languageAction: Action;
  resetUserSettings: Action;

  constructor(
    public principalService: PrincipalWebService,
    public authenticationService: AuthenticationService,
    public intlService: IntlService,
    public loginService: LoginService,
    public modalService: ModalService,
    public appService: AppService,
    public userSettingsService: UserSettingsWebService,
    public notificationsService: NotificationsService,
    public changeDetectorRef: ChangeDetectorRef) {


    // Actions objects are initialized in the constructor

    // User Menu

    // Login
    this.loginAction = new Action({
      text: "msg#userMenu.login",
      title: "msg#userMenu.login",
      action: () => {
        this.loginService.login();
      }
    });

    // Logout
    this.logoutAction = new Action({
      text: "msg#userMenu.logout",
      title: "msg#userMenu.logout",
      action: () => {
        this.loginService.logout();
        this.changeDetectorRef.markForCheck();
      }
    });

    // Override a user's identity
    this.overrideAction = new Action({
      text: "msg#userMenu.overrideUser",
      title: "msg#userMenu.overrideUser",
      action: () => {
        let userOverride = this.authenticationService.userOverride ?
          Utils.copy<UserOverride>(this.authenticationService.userOverride) : undefined;
        if (!userOverride) {
          userOverride = {
            userName: "",
            domain: ""
          };
        }
        this.modalService.open(BsOverrideUser, {model: userOverride})
          .then((result) => {
            if (result === ModalResult.OK) {
              this.loginService.overrideUser(userOverride);
              this.changeDetectorRef.markForCheck();
            }
          });
      }
    });

    // Cancel user override
    this.revertOverrideAction = new Action({
      text: "msg#userMenu.revertUserOverride",
      title: "msg#userMenu.revertUserOverride",
      action: () => {
        this.loginService.overrideUser(undefined);
        this.changeDetectorRef.markForCheck();
      }
    });

    // Link to the admin
    this.adminAction = new Action({
      text: "msg#userMenu.administration",
      title: "msg#userMenu.administration",
      href: this.appService.adminUrl
    });

    // Language menu
    this.languageAction = new Action({
      text: "msg#userMenu.language",
      title: "msg#userMenu.language",
      children: this.intlService.locales.map(locale =>
        new Action({
          text: locale.display,   // "French"
          title: locale.display,   // "French"
          data: locale,   // French locale
          selected: locale === this.intlService.currentLocale, // Whether French is the current locale
          iconAfter: "sq-image sq-flag-" + locale.name,
          action: (item: Action, $event: UIEvent) => {    // On click, switch to this language
            this.intlService.use((item.data as Locale).name).subscribe(
              (value) => this.languageAction.children!.forEach(a => a.update()));
          },
          updater: (action) => {  // Update the status of buttons
            action.selected = action.data === this.intlService.currentLocale;
          }
        })
      )
    });

    this.resetUserSettings = new Action({
      text: "msg#userMenu.resetUserSettings.menu",
      title: "msg#userMenu.resetUserSettings.menu",
      action: () => {
        this.modalService.confirm({
          title: "msg#userMenu.resetUserSettings.modalTitle",
          message: "msg#userMenu.resetUserSettings.modalMessage", 
          buttons: [
            new ModalButton({result: ModalResult.OK, text: "msg#userMenu.resetUserSettings.modalConfirmButton"}),
            new ModalButton({result: ModalResult.Cancel, primary: true})
          ],
          confirmType: ConfirmType.Warning
        }).then(res => {
          if(res === ModalResult.OK) {
            this.userSettingsService.reset().subscribe({
              next: () => this.notificationsService.notify(NotificationType.Success, "msg#userMenu.resetUserSettings.successMessage"),
              error: () => this.notificationsService.notify(NotificationType.Error, "msg#userMenu.resetUserSettings.errorMessage")
            });
          }
        });
      }
    });

  }

  ngOnInit() {
    this.updateMenu();
    this._loginSubscription = this.loginService.events.subscribe(event => {
      if(event.type === "session-changed"){
        this.updateMenu();
      }
    });
    this._principalSubscription = this.principalService.events.subscribe(event => {
      this.updateMenu();
    });
  }

  private _loginSubscription: Subscription;
  private _principalSubscription: Subscription;
  ngOnDestroy(){
    if(this._loginSubscription){
      this._loginSubscription.unsubscribe();
    }
    if(this._principalSubscription){
      this._principalSubscription.unsubscribe();
    }
  }

  updateMenu() {
    const userActions: Action[] = [];

    if (!this.principalService.principal && !this.authenticationService.userOverrideActive) {
      userActions.push(this.loginAction);
    }
    if (this.principalService.principal) {
      userActions.push(this.logoutAction);
    }
    if (this.authenticationService.userOverrideActive) {
      userActions.push(this.revertOverrideAction);
    }
    if (this.principalService.principal && this.principalService.principal.isAdministrator) {
      userActions.push(this.overrideAction);
    }
    if (this.principalService.principal && (this.principalService.principal.isAdministrator || this.principalService.principal.isDelegatedAdmin)) {
      userActions.push(this.adminAction);
    }
    if(this.loginService.complete) {
      userActions.push(this.resetUserSettings);
    }
    userActions.push(new Action({separator: true}));
    if (this.intlService.locales.length > 1) {
      userActions.push(this.languageAction);
    }

    this.menu = new Action({
        icon: this.icon,
        text: this.loginService.complete && this.principalService.principal ? this.principalService.principal.name || "msg#userMenu.user" : "msg#userMenu.user",
        children: userActions
    });
  }


}
