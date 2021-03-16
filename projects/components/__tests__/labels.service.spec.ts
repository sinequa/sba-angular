import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppService, Query } from "@sinequa/core/app-utils";
import { SearchService } from "../search";
import { START_CONFIG, PrincipalWebService, LabelsWebService, CCLabels, AuditEventType } from "@sinequa/core/web-services";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";
import { MODAL_LOGIN } from '@sinequa/core/login';
import { MODAL_CONFIRM, MODAL_PROMPT, ModalService } from '@sinequa/core/modal';
import { AuthService } from 'ng2-ui-auth';
import { AppLocalesConfig } from './mocks/app.locales.config';
import { LabelsService, LABELS_COMPONENTS, defaultLabelComponents, ModalProperties, BsRenameLabel, BsDeleteLabel, BsAddLabel, BsEditLabel } from '../labels';
import { NotificationsService } from '@sinequa/core/notification';
import { SelectionService, SELECTION_OPTIONS } from '../selection';
import { FormBuilder } from '@angular/forms';
import { VALIDATION_MESSAGE_COMPONENT } from '@sinequa/core/validation';
import { UIService } from '../utils';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { EMPTY, throwError } from 'rxjs';

describe("LabelsService", () => {
  let service: LabelsService;
  let searchService: SearchService;
  let appService: AppService;
  let modalService: ModalService;
  let notificationsService: NotificationsService;
  let labelsWebService: LabelsWebService;

  beforeEach(() => {

    const IntlServiceFactory = () => ({
      parseDate: () => {},
    });

    const AuthServiceFactory = () => ({});

    const UIServiceFactory = () => ({});

    TestBed.configureTestingModule({
      providers: [
        LabelsService,
        AppService,
        SearchService,
        { provide: START_CONFIG, useValue: { app: "testing_app" } },
        { provide: MODAL_LOGIN, useValue: "MODAL_LOGIN" },
        { provide: MODAL_CONFIRM, useValue: "MODAL_CONFIRM" },
        { provide: MODAL_PROMPT, useValue: "MODAL_PROMPT" },
        { provide: IntlService, useFactory: IntlServiceFactory },
        { provide: AuthService, useFactory: AuthServiceFactory },
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        ModalService,
        PrincipalWebService,
        NotificationsService,
        SelectionService,
        { provide: LABELS_COMPONENTS, useValue: defaultLabelComponents },
        { provide: SELECTION_OPTIONS, useValue: {} },
        LabelsWebService,
        FormBuilder,
        { provide: VALIDATION_MESSAGE_COMPONENT, useValue: {} },
        { provide: UIService, useFactory: UIServiceFactory },
      ],
      imports: [
        RouterTestingModule,
        OverlayModule,
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(LabelsService);
    searchService = TestBed.inject(SearchService);
    appService = TestBed.inject(AppService);
    modalService = TestBed.inject(ModalService);
    notificationsService = TestBed.inject(NotificationsService);
    labelsWebService = TestBed.inject(LabelsWebService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });

  describe("should return the correct config for labels feature", () => {

    it("when setup is defined at app level", () => {
      appService.cclabels = {
        publicLabelsField: "foo",
        privateLabelsField: "toto",
        labelsAutoSuggestWildcard: "&",
        allowPublicLabelsCreation: true,
        allowPublicLabelsModification: false
      } as CCLabels;

      expect(service.publicLabelsField).toEqual("foo");
      expect(service.privateLabelsField).toEqual("toto");
      expect(service.labelsAutoSuggestWildcard).toEqual("&");
      expect(service.allowPublicLabelsManagement).toBeTrue();
      expect(service.allowPublicLabelsEdition).toBeFalse();
    });

    it("when default setup to be used", () => {
      appService.cclabels = {} as CCLabels;

      expect(service.publicLabelsField).toBeUndefined();
      expect(service.privateLabelsField).toBeUndefined();
      expect(service.labelsAutoSuggestWildcard).toBeUndefined();
      expect(service.allowPublicLabelsManagement).toBeFalsy();
      expect(service.allowPublicLabelsEdition).toBeFalsy();
    });
  });

  describe("should get users rights related to labels feature", () => {

    it("case default user rights", () => {
      expect(service.userLabelsRights).toEqual({canManagePublicLabels: true, canEditPublicLabels: true})
    });
  });

  describe("should build selection action", () => {

    it("when an action is possible", () => {
      appService.cclabels = {
        publicLabelsField: "foo",
        privateLabelsField: "toto"
      } as CCLabels;

      const action = service.buildSelectionAction();

      expect(action).toBeDefined();
    });

    it("when no action to be returned", () => {
      appService.cclabels = {} as CCLabels;

      expect(service.buildSelectionAction()).toBeUndefined();
    });
  });

  describe("instantiate modals of label's actions", () => {
    let spyOpenModal;
    let spyProperties;

    beforeEach(() => {
      spyOpenModal = spyOn(modalService, 'open').and.callThrough();
      spyProperties = spyOn<any>(service, '_modalProperties').and.returnValue({})
    });

    afterEach(() => {
      spyOpenModal.calls.reset();
      spyProperties.calls.reset();
    })

    it("modal rename labels", () => {
      const data = {
          oldValues: [],
          newValue: "",
          properties: {} as ModalProperties,
      }

      service.renameLabelModal();

      expect(spyProperties).toHaveBeenCalledWith(2)
      expect(spyOpenModal).toHaveBeenCalledWith(BsRenameLabel, {model: data});
    });

    it("modal delete labels", () => {
      const data = {
          values: [],
          properties: {} as ModalProperties,
      }

      service.deleteLabelModal();

      expect(spyProperties).toHaveBeenCalledWith(3)
      expect(spyOpenModal).toHaveBeenCalledWith(BsDeleteLabel, {model: data});
    });

    it("modal bulk add labels", () => {
      const data = {
          values: [],
          properties: {} as ModalProperties,
      }

      service.bulkAddLabelModal();

      expect(spyProperties).toHaveBeenCalledWith(4)
      expect(spyOpenModal).toHaveBeenCalledWith(BsAddLabel, {model: data});
    });

    it("modal bulk remove labels", () => {
      const data = {
          values: [],
          properties: {} as ModalProperties,
      }

      service.bulkRemoveLabelModal();

      expect(spyProperties).toHaveBeenCalledWith(5)
      expect(spyOpenModal).toHaveBeenCalledWith(BsDeleteLabel, {model: data});
    });

    it("modal edit labels", () => {
      const data = {
          valuesToBeAdded: [],
          valuesToBeRemoved: [],
          properties: {} as ModalProperties,
      }

      service.editLabelModal();

      expect(spyProperties).toHaveBeenCalledWith(6)
      expect(spyOpenModal).toHaveBeenCalledWith(BsEditLabel, {model: data});
    });
  });

  describe("should perform add labels operation", () => {
    let spyAddLabels;

    beforeEach(() => {
      spyAddLabels = spyOn(labelsWebService, 'add').and.callThrough();
    });

    afterEach(() => {
      spyAddLabels.calls.reset();
    })

    it("when a list of labels is provided", () => {
      const labels = ["toto", "foo"];
      const ids = ["1", "2"]

      service.addLabels(labels, ids, true);

      expect(spyAddLabels).toHaveBeenCalledWith(labels, ids, true);
    });

    it("when no label is provided", () => {
      const labels = [];
      const ids = ["1", "2"];

      service.addLabels(labels, ids, true);

      expect(spyAddLabels).not.toHaveBeenCalled();
    });
  });

  describe("should perform remove labels operation", () => {
    let spyRemoveLabels;

    beforeEach(() => {
      spyRemoveLabels = spyOn(labelsWebService, 'remove').and.callThrough();
    });

    afterEach(() => {
      spyRemoveLabels.calls.reset();
    })

    it("when a list of labels is provided", () => {
      const labels = ["toto", "foo"];
      const ids = ["1", "2"]

      service.removeLabels(labels, ids, false);

      expect(spyRemoveLabels).toHaveBeenCalledWith(labels, ids, false);
    });

    it("when no label is provided", () => {
      const labels = [];
      const ids = ["1", "2"];

      service.removeLabels(labels, ids, true);

      expect(spyRemoveLabels).not.toHaveBeenCalled();
    });
  });

  describe("should perform rename labels operation", () => {
    let spyRenameLabels;
    let spyNotificationSuccess;
    let spyNotificationError;
    let spySearch;

    beforeEach(() => {
      spyRenameLabels = spyOn(labelsWebService, 'rename').and.callThrough();
      spyNotificationSuccess = spyOn(notificationsService, 'success');
      spyNotificationError = spyOn(notificationsService, 'error');
      spySearch = spyOn(searchService, 'search').and.callThrough();
    });

    afterEach(() => {
      spyRenameLabels.calls.reset();
      spyNotificationSuccess.calls.reset();
      spyNotificationError.calls.reset();
      spySearch.calls.reset();
    })

    it("when a list of labels is provided and the http request is successful", () => {
      const labels = ["toto", "foo"];
      const newLabel = "titi";
      spyRenameLabels.and.returnValue(EMPTY);

      service.renameLabels(labels, newLabel, true);

      expect(spyRenameLabels).toHaveBeenCalledWith(labels, newLabel, true);
      expect(spyNotificationError).not.toHaveBeenCalled();
      expect(spyNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("when a list of labels is provided and the http request is failed", () => {
      const labels = ["toto", "foo"];
      const newLabel = "titi";
      spyRenameLabels.and.returnValue(throwError({}));

      service.renameLabels(labels, newLabel, true);

      expect(spyRenameLabels).toHaveBeenCalledWith(labels, newLabel, true);
      expect(spyNotificationError).toHaveBeenCalledTimes(1);
      expect(spyNotificationSuccess).not.toHaveBeenCalled();
      expect(spySearch).not.toHaveBeenCalled();
    });

    it("when no label is provided", () => {
      const labels = [];
      const newLabel = "titi";

      service.renameLabels(labels, newLabel, true);

      expect(spyRenameLabels).not.toHaveBeenCalled();
    });
  });

  describe("should perform delete labels operation", () => {
    let spyDeleteLabels;
    let spyNotificationSuccess;
    let spyNotificationError;
    let spySearch;

    beforeEach(() => {
      spyDeleteLabels = spyOn(labelsWebService, 'delete').and.callThrough();
      spyNotificationSuccess = spyOn(notificationsService, 'success');
      spyNotificationError = spyOn(notificationsService, 'error');
      spySearch = spyOn(searchService, 'search').and.callThrough();
    });

    afterEach(() => {
      spyDeleteLabels.calls.reset();
      spyNotificationSuccess.calls.reset();
      spyNotificationError.calls.reset();
      spySearch.calls.reset();
    })

    it("when a list of labels is provided and the http request is successful", () => {
      const labels = ["toto", "foo"];
      spyDeleteLabels.and.returnValue(EMPTY);

      service.deleteLabels(labels, true);

      expect(spyDeleteLabels).toHaveBeenCalledWith(labels, true);
      expect(spyNotificationError).not.toHaveBeenCalled();
      expect(spyNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("when a list of labels is provided and the http request is failed", () => {
      const labels = ["toto", "foo"];
      spyDeleteLabels.and.returnValue(throwError({}));

      service.deleteLabels(labels, true);

      expect(spyDeleteLabels).toHaveBeenCalledWith(labels, true);
      expect(spyNotificationError).toHaveBeenCalledTimes(1);
      expect(spyNotificationSuccess).not.toHaveBeenCalled();
      expect(spySearch).not.toHaveBeenCalled();
    });

    it("when no label is provided", () => {
      const labels = [];

      service.deleteLabels(labels, true);

      expect(spyDeleteLabels).not.toHaveBeenCalled();
    });
  });

  describe("should perform bulkRemove labels operation", () => {
    let spyBulkRemoveLabels;
    let spyNotificationSuccess;
    let spyNotificationError;
    let spySearch;

    beforeEach(() => {
      spyBulkRemoveLabels = spyOn(labelsWebService, 'bulkRemove').and.callThrough();
      spyNotificationSuccess = spyOn(notificationsService, 'success');
      spyNotificationError = spyOn(notificationsService, 'error');
      spySearch = spyOn(searchService, 'search').and.callThrough();
      searchService.setQuery(new Query("test"));
    });

    afterEach(() => {
      spyBulkRemoveLabels.calls.reset();
      spyNotificationSuccess.calls.reset();
      spyNotificationError.calls.reset();
      spySearch.calls.reset();
    })

    it("when a list of labels is provided and the http request is successful", () => {
      const labels = ["toto", "foo"];
      spyBulkRemoveLabels.and.returnValue(EMPTY);

      service.bulkRemoveLabels(labels, true);

      expect(spyBulkRemoveLabels).toHaveBeenCalledWith(labels, new Query("test"), true);
      expect(spyNotificationError).not.toHaveBeenCalled();
      expect(spyNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("when a list of labels is provided and the http request is failed", () => {
      const labels = ["toto", "foo"];
      spyBulkRemoveLabels.and.returnValue(throwError({}));

      service.bulkRemoveLabels(labels, true);

      expect(spyBulkRemoveLabels).toHaveBeenCalledWith(labels, new Query("test"), true);
      expect(spyNotificationError).toHaveBeenCalledTimes(1);
      expect(spyNotificationSuccess).not.toHaveBeenCalled();
      expect(spySearch).not.toHaveBeenCalled();
    });

    it("when no label is provided", () => {
      const labels = [];

      service.bulkRemoveLabels(labels, true);

      expect(spyBulkRemoveLabels).not.toHaveBeenCalled();
    });
  });

  describe("should perform bulkAdd labels operation", () => {
    let spyBulkAddLabels;
    let spyNotificationSuccess;
    let spyNotificationError;
    let spySearch;

    beforeEach(() => {
      spyBulkAddLabels = spyOn(labelsWebService, 'bulkAdd').and.callThrough();
      spyNotificationSuccess = spyOn(notificationsService, 'success');
      spyNotificationError = spyOn(notificationsService, 'error');
      spySearch = spyOn(searchService, 'search').and.callThrough();
      searchService.setQuery(new Query("test"));
    });

    afterEach(() => {
      spyBulkAddLabels.calls.reset();
      spyNotificationSuccess.calls.reset();
      spyNotificationError.calls.reset();
      spySearch.calls.reset();
    })

    it("when a list of labels is provided and the http request is successful", () => {
      const labels = ["toto", "foo"];
      spyBulkAddLabels.and.returnValue(EMPTY);

      service.bulkAddLabels(labels, true);

      expect(spyBulkAddLabels).toHaveBeenCalledWith(labels, new Query("test"), true);
      expect(spyNotificationError).not.toHaveBeenCalled();
      expect(spyNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("when a list of labels is provided and the http request is failed", () => {
      const labels = ["toto", "foo"];
      spyBulkAddLabels.and.returnValue(throwError({}));

      service.bulkAddLabels(labels, true);

      expect(spyBulkAddLabels).toHaveBeenCalledWith(labels, new Query("test"), true);
      expect(spyNotificationError).toHaveBeenCalledTimes(1);
      expect(spyNotificationSuccess).not.toHaveBeenCalled();
      expect(spySearch).not.toHaveBeenCalled();
    });

    it("when no label is provided", () => {
      const labels = [];

      service.bulkAddLabels(labels, true);

      expect(spyBulkAddLabels).not.toHaveBeenCalled();
    });
  });

  describe("should trigger a search on labels selection", () => {
    let spyAddPrivatePrefix;
    let spyAddFieldSelect;
    let spySearch;

    beforeEach(() => {
      spyAddFieldSelect = spyOn(searchService, 'addFieldSelect').and.callThrough();
      spyAddPrivatePrefix = spyOn(service, 'addPrivatePrefix').and.returnValue('prefix');
      spySearch = spyOn(searchService, 'search').and.callThrough();
      spyOn<any>(service, 'getSelectedLabels').and.returnValue([]);
    });

    afterEach(() => {
      spyAddPrivatePrefix.calls.reset();
      spyAddFieldSelect.calls.reset();
      spySearch.calls.reset();
    })

    it("when a list of public labels is provided", () => {
      appService.cclabels = {
        publicLabelsField: "test",
        privateLabelsField: "testing"
      } as CCLabels;
      const labels = ["toto", "foo"];
      const items = [
        {value: "toto", display: "toto"},
        {value: "foo", display: "foo"}
      ]

      service.selectLabels(labels, true);

      expect(spyAddFieldSelect).toHaveBeenCalledWith("test", items);
      expect(spyAddPrivatePrefix).not.toHaveBeenCalled();
      expect(spySearch).toHaveBeenCalledOnceWith(undefined, {
          type: AuditEventType.Label_Open,
          detail: {
              label: "toto,foo",
              public: true,
          },
      });
    });

    it("when a list of private labels is provided", () => {
      appService.cclabels = {
        publicLabelsField: "test",
        privateLabelsField: "testing"
      } as CCLabels;
      const labels = ["toto", "foo"];
      const items = [
        {value: "prefix", display: "toto"},
        {value: "prefix", display: "foo"}
      ]

      service.selectLabels(labels, false);

      expect(spyAddFieldSelect).toHaveBeenCalledWith("testing", items);
      expect(spyAddPrivatePrefix).toHaveBeenCalledTimes(2);
      expect(spySearch).toHaveBeenCalledOnceWith(undefined, {
          type: AuditEventType.Label_Open,
          detail: {
              label: "toto,foo",
              public: false,
          },
      });
    });

    it("when no label's field retrieved", () => {
      appService.cclabels = {} as CCLabels;
      const labels = ["toto", "foo"];

      service.selectLabels(labels, true);

      expect(spySearch).not.toHaveBeenCalled();
    });
  });

});
