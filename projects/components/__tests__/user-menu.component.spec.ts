import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { Action, ActionSeparator } from '@sinequa/components/action';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { AuthenticationService, LoginService } from '@sinequa/core/login';
import { ModalService } from '@sinequa/core/modal';
import { NotificationsService } from '@sinequa/core/notification';
import { PrincipalWebService, UserSettingsWebService } from '@sinequa/core/web-services';
import { UIService } from '@sinequa/components/utils';

import { BsUserMenuComponent } from '../user-settings/bootstrap/user-menu/user-menu.component';

describe('BsUserMenuComponent', () => {
  let component: BsUserMenuComponent;

  beforeEach(() => {
    const loginServiceStub = {
      events: new Subject<any>(),
      complete: true,
      login: () => {},
      logout: () => {},
      overrideUser: () => {}
    };

    const principalServiceStub = {
      events: new Subject<any>(),
      principal: null
    };

    const intlServiceStub = {
      events: new Subject<any>(),
      locales: [{ name: 'en', display: 'English' }],
      currentLocale: { name: 'en', display: 'English' },
      use: () => new Subject()
    };

    const appServiceStub = {
      adminUrl: '/admin',
      app: null,
      helpUrl: (path: string) => `/help/${path}`
    };

    const uiServiceStub = {
      toggleDark: () => {},
      isDark: () => false
    };

    const authStub = {
      userOverride: null,
      userOverrideActive: false
    };

    TestBed.configureTestingModule({
      providers: [
        BsUserMenuComponent,
        { provide: LoginService, useValue: loginServiceStub },
        { provide: PrincipalWebService, useValue: principalServiceStub },
        { provide: IntlService, useValue: intlServiceStub },
        { provide: AppService, useValue: appServiceStub },
        { provide: UIService, useValue: uiServiceStub },
        { provide: AuthenticationService, useValue: authStub },
        { provide: ModalService, useValue: { open: () => Promise.resolve(), confirm: () => Promise.resolve() } },
        { provide: UserSettingsWebService, useValue: { reset: () => new Subject() } },
        { provide: NotificationsService, useValue: { notify: () => {} } },
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {}, detectChanges: () => {} } }
      ]
    });

    component = TestBed.inject(BsUserMenuComponent);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  describe('getCreditActions()', () => {
    it('should return creditAction when showCredits is true and no customCreditActions', () => {
      component.showCredits = true;
      const actions = component.getCreditActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toBe(component.creditAction);
    });

    it('should return empty array when showCredits is false and no customCreditActions', () => {
      component.showCredits = false;
      expect(component.getCreditActions()).toEqual([]);
    });

    it('should return customCreditActions when provided, ignoring showCredits', () => {
      const custom = [new Action({ text: 'My Company' })];
      component.customCreditActions = custom;
      component.showCredits = true;

      const actions = component.getCreditActions();
      expect(actions).toEqual(custom);
    });

    it('should return customCreditActions even when showCredits is false', () => {
      const custom = [new Action({ text: 'My Company' })];
      component.customCreditActions = custom;
      component.showCredits = false;

      expect(component.getCreditActions()).toEqual(custom);
    });

    it('should fall through to default behavior when customCreditActions is empty', () => {
      component.customCreditActions = [];
      component.showCredits = true;

      const actions = component.getCreditActions();
      expect(actions[0]).toBe(component.creditAction);
    });
  });

  describe('getHelpActions()', () => {
    it('should return empty array when enableHelp is false', () => {
      component.enableHelp = false;
      component.customHelpActions = [new Action({ text: 'Help' })];
      expect(component.getHelpActions()).toEqual([]);
    });

    it('should return empty array when login is not complete', () => {
      const loginService = TestBed.inject(LoginService) as any;
      loginService.complete = false;
      component.customHelpActions = [new Action({ text: 'Help' })];
      expect(component.getHelpActions()).toEqual([]);
    });

    it('should return customHelpActions + separator when provided', () => {
      const custom = [new Action({ text: 'Custom Help', href: '/my-help' })];
      component.customHelpActions = custom;
      component.enableHelp = true;

      const actions = component.getHelpActions();
      expect(actions.length).toBe(2);
      expect(actions[0]).toBe(custom[0]);
      expect(actions[1]).toBe(ActionSeparator);
    });

    it('should return empty array when customHelpActions is empty and no app/default options', () => {
      component.customHelpActions = [];
      component.enableHelp = true;
      // appService.app is null, no default options injected
      expect(component.getHelpActions()).toEqual([]);
    });

    it('should return default helpAction when no customHelpActions and app options are set', () => {
      const appService = TestBed.inject(AppService) as any;
      appService.app = { data: { 'help-folder-options': { path: '/help', indexFile: 'index.html' } } };
      component.enableHelp = true;

      const actions = component.getHelpActions();
      expect(actions.length).toBe(2);
      expect(actions[0]).toBe(component.helpAction);
      expect(actions[1]).toBe(ActionSeparator);
    });
  });
});
