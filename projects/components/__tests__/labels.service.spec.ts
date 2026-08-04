import { EMPTY, throwError } from 'rxjs';

import { OverlayModule } from '@angular/cdk/overlay';
import { LocationStrategy } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockLocationStrategy } from "@angular/common/testing";
import { TestBed } from "@angular/core/testing";
import { UntypedFormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppService, Query } from "@sinequa/core/app-utils";
import { IntlService, LOCALES_CONFIG } from "@sinequa/core/intl";
import { MODAL_LOGIN } from '@sinequa/core/login';
import { MODAL_CONFIRM, MODAL_PROMPT, ModalService } from '@sinequa/core/modal';
import { NotificationsService } from '@sinequa/core/notification';
import { VALIDATION_MESSAGE_COMPONENT } from '@sinequa/core/validation';
import { CCLabels, LabelsWebService, PrincipalWebService, START_CONFIG } from "@sinequa/core/web-services";

import { BsAddLabel, BsDeleteLabel, BsEditLabel, BsRenameLabel, LABELS_COMPONENTS, LabelsService, ModalProperties, defaultLabelComponents } from '../labels';
import { SearchService } from "../search";
import { SELECTION_OPTIONS, SelectionService } from '../selection';
import { UIService } from '../utils';
import { AppLocalesConfig } from './mocks/app.locales.config';

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


    const UIServiceFactory = () => ({});

    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        OverlayModule],
    providers: [
        LabelsService,
        AppService,
        SearchService,
        { provide: START_CONFIG, useValue: { app: "testing_app" } },
        { provide: MODAL_LOGIN, useValue: "MODAL_LOGIN" },
        { provide: MODAL_CONFIRM, useValue: "MODAL_CONFIRM" },
        { provide: MODAL_PROMPT, useValue: "MODAL_PROMPT" },
        { provide: IntlService, useFactory: IntlServiceFactory },
        { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        ModalService,
        PrincipalWebService,
        NotificationsService,
        SelectionService,
        { provide: LABELS_COMPONENTS, useValue: defaultLabelComponents },
        { provide: SELECTION_OPTIONS, useValue: {} },
        LabelsWebService,
        UntypedFormBuilder,
        { provide: VALIDATION_MESSAGE_COMPONENT, useValue: {} },
        { provide: UIService, useFactory: UIServiceFactory },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
});

    service = TestBed.inject(LabelsService);
    searchService = TestBed.inject(SearchService);
    appService = TestBed.inject(AppService);
    modalService = TestBed.inject(ModalService);
    notificationsService = TestBed.inject(NotificationsService);
    labelsWebService = TestBed.inject(LabelsWebService);

    // do not call ngOnDestroy
    vi.spyOn(service as any, 'ngOnDestroy').mockImplementation((() => undefined) as never);
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
      expect(service.allowPublicLabelsManagement).toBe(true);
      expect(service.allowPublicLabelsEdition).toBe(false);
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
      spyOpenModal = vi.spyOn(modalService, 'open');
      spyProperties = vi.spyOn(service as any, '_modalProperties').mockReturnValue({})
    });

    afterEach(() => {
      spyOpenModal.mockClear();
      spyProperties.mockClear();
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
      spyAddLabels = vi.spyOn(labelsWebService, 'add');
    });

    afterEach(() => {
      spyAddLabels.mockClear();
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
      spyRemoveLabels = vi.spyOn(labelsWebService, 'remove');
    });

    afterEach(() => {
      spyRemoveLabels.mockClear();
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
      spyRenameLabels = vi.spyOn(labelsWebService, 'rename');
      spyNotificationSuccess = vi.spyOn(notificationsService, 'success').mockImplementation((() => undefined) as never);
      spyNotificationError = vi.spyOn(notificationsService, 'error').mockImplementation((() => undefined) as never);
      spySearch = vi.spyOn(searchService, 'search');
    });

    afterEach(() => {
      spyRenameLabels.mockClear();
      spyNotificationSuccess.mockClear();
      spyNotificationError.mockClear();
      spySearch.mockClear();
    })

    it("when a list of labels is provided and the http request is successful", () => {
      const labels = ["toto", "foo"];
      const newLabel = "titi";
      spyRenameLabels.mockReturnValue(EMPTY);

      service.renameLabels(labels, newLabel, true);

      expect(spyRenameLabels).toHaveBeenCalledWith(labels, newLabel, true);
      expect(spyNotificationError).not.toHaveBeenCalled();
      expect(spyNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("when a list of labels is provided and the http request is failed", () => {
      const labels = ["toto", "foo"];
      const newLabel = "titi";
      spyRenameLabels.mockReturnValue(throwError({}));

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
      spyDeleteLabels = vi.spyOn(labelsWebService, 'delete');
      spyNotificationSuccess = vi.spyOn(notificationsService, 'success').mockImplementation((() => undefined) as never);
      spyNotificationError = vi.spyOn(notificationsService, 'error').mockImplementation((() => undefined) as never);
      spySearch = vi.spyOn(searchService, 'search');
    });

    afterEach(() => {
      spyDeleteLabels.mockClear();
      spyNotificationSuccess.mockClear();
      spyNotificationError.mockClear();
      spySearch.mockClear();
    })

    it("when a list of labels is provided and the http request is successful", () => {
      const labels = ["toto", "foo"];
      spyDeleteLabels.mockReturnValue(EMPTY);

      service.deleteLabels(labels, true);

      expect(spyDeleteLabels).toHaveBeenCalledWith(labels, true);
      expect(spyNotificationError).not.toHaveBeenCalled();
      expect(spyNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("when a list of labels is provided and the http request is failed", () => {
      const labels = ["toto", "foo"];
      spyDeleteLabels.mockReturnValue(throwError({}));

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
      spyBulkRemoveLabels = vi.spyOn(labelsWebService, 'bulkRemove');
      spyNotificationSuccess = vi.spyOn(notificationsService, 'success').mockImplementation((() => undefined) as never);
      spyNotificationError = vi.spyOn(notificationsService, 'error').mockImplementation((() => undefined) as never);
      spySearch = vi.spyOn(searchService, 'search');
      searchService.setQuery(new Query("test"));
    });

    afterEach(() => {
      spyBulkRemoveLabels.mockClear();
      spyNotificationSuccess.mockClear();
      spyNotificationError.mockClear();
      spySearch.mockClear();
    })

    it("when a list of labels is provided and the http request is successful", () => {
      const labels = ["toto", "foo"];
      spyBulkRemoveLabels.mockReturnValue(EMPTY);

      service.bulkRemoveLabels(labels, true);

      expect(spyBulkRemoveLabels).toHaveBeenCalledWith(labels, new Query("test"), true);
      expect(spyNotificationError).not.toHaveBeenCalled();
      expect(spyNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("when a list of labels is provided and the http request is failed", () => {
      const labels = ["toto", "foo"];
      spyBulkRemoveLabels.mockReturnValue(throwError({}));

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
      spyBulkAddLabels = vi.spyOn(labelsWebService, 'bulkAdd');
      spyNotificationSuccess = vi.spyOn(notificationsService, 'success').mockImplementation((() => undefined) as never);
      spyNotificationError = vi.spyOn(notificationsService, 'error').mockImplementation((() => undefined) as never);
      spySearch = vi.spyOn(searchService, 'search');
      searchService.setQuery(new Query("test"));
    });

    afterEach(() => {
      spyBulkAddLabels.mockClear();
      spyNotificationSuccess.mockClear();
      spyNotificationError.mockClear();
      spySearch.mockClear();
    })

    it("when a list of labels is provided and the http request is successful", () => {
      const labels = ["toto", "foo"];
      spyBulkAddLabels.mockReturnValue(EMPTY);

      service.bulkAddLabels(labels, true);

      expect(spyBulkAddLabels).toHaveBeenCalledWith(labels, new Query("test"), true);
      expect(spyNotificationError).not.toHaveBeenCalled();
      expect(spyNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("when a list of labels is provided and the http request is failed", () => {
      const labels = ["toto", "foo"];
      spyBulkAddLabels.mockReturnValue(throwError({}));

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
    let spyAddFieldSelect;
    let spySearch;

    beforeEach(() => {
      spyAddFieldSelect = vi.spyOn(searchService, 'addFieldSelect');
      spySearch = vi.spyOn(searchService, 'search');
      vi.spyOn(service as any, 'getSelectedLabels').mockReturnValue([]);
    });

    afterEach(() => {
      spyAddFieldSelect.mockClear();
      spySearch.mockClear();
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
      expect(spySearch).toHaveBeenCalledExactlyOnceWith(undefined, {
          type: "Label_Open",
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
        {value: "toto", display: "toto"},
        {value: "foo", display: "foo"}
      ]

      service.selectLabels(labels, false);

      expect(spyAddFieldSelect).toHaveBeenCalledWith("testing", items);
      expect(spySearch).toHaveBeenCalledExactlyOnceWith(undefined, {
          type: "Label_Open",
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
