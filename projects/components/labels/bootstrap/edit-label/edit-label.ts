import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import {
    ModalButton,
    ModalResult,
    MODAL_MODEL,
    ModalRef,
} from "@sinequa/core/modal";
import { ModalProperties, LabelsService } from "../../labels.service";
import { SelectionService } from "@sinequa/components/selection";
import { AppService } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { Utils } from "@sinequa/core/base";
import { NotificationsService } from "@sinequa/core/notification";

@Component({
    selector: "sq-edit-label",
    templateUrl: "./edit-label.html",
    styles: [
        `
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
    ],
})
export class BsEditLabel implements OnInit {
    public selectedRecordsIds: string[];
    public buttons: ModalButton[];
    /** Initial labels list assigned to a record */
    public initialLabels: string[] = [];
    public record: Record | undefined;
    public isProcessing: boolean = false;

    constructor(
        @Inject(MODAL_MODEL)
        public model: {
            valuesToBeAdded: string[],
            valuesToBeRemoved: string[],
            properties: ModalProperties
        },
        private appService: AppService,
        private selectionService: SelectionService,
        private labelsService: LabelsService,
        private searchService: SearchService,
        private notificationService: NotificationsService,
        private changeDetectorRef: ChangeDetectorRef,
        private modalRef: ModalRef
    ) {}

    ngOnInit() {
        this.selectedRecordsIds = !!this.selectionService.getSelectedIds()
            ? this.selectionService.getSelectedIds()
            : [];
        if (this.selectedRecordsIds.length === 1) {
            this.record = this.searchService.getRecordFromId(
                this.selectedRecordsIds[0]
            );
            this.initialLabels = this._getInitialRecordLabels();
        }
        this.buttons = [
            new ModalButton({
                text: "msg#editLabel.btnEdit",
                primary: true,
                result: ModalResult.Custom,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.addLabels(
                        this.model.valuesToBeAdded,
                        this.selectionService.getSelectedIds(),
                        this.model.properties.public
                    );
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(
                            observable,
                            () => {},
                            (error) => {
                                this.notificationService.error(
                                    "msg#editLabel.errorFeedback"
                                );
                                this.modalRef.close(error);
                            },
                            () => {
                                this.labelsService
                                    .removeLabels(
                                        this.model.valuesToBeRemoved,
                                        this.selectionService.getSelectedIds(),
                                        this.model.properties.public
                                    )
                                    .subscribe(
                                        () => {},
                                        (error) => {
                                            this.notificationService.error(
                                                "msg#editLabel.errorFeedback"
                                            );
                                            this.modalRef.close(error);
                                        },
                                        () => {
                                            this.isProcessing = false;
                                            this.modalRef.close(ModalResult.OK);
                                            this.notificationService.success(
                                                "msg#editLabel.successFeedback"
                                            );
                                            this.searchService.search(); /** Update the display immediately in the components and facets*/
                                        }
                                    );
                            }
                        );
                    }
                },
            }),
            new ModalButton({
                result: ModalResult.Cancel,
            }),
        ];
    }

    updateLabelsNature(nature: boolean) {
        this.model.properties.public = nature;
        this.model.valuesToBeRemoved = [];
        this.model.valuesToBeAdded = [];
        if (this.selectedRecordsIds.length === 1) {
            this.initialLabels = this._getInitialRecordLabels(); /** update initial labels */
        }
    }

    onLabelsChanged(values: string[]) {
        if (!!this.initialLabels) {
            this.model.valuesToBeAdded = values.filter(
                (value) => !this.initialLabels.find((label) => label === value)
            );
            this.model.valuesToBeRemoved = this.initialLabels.filter(
                (label) => !values.find((value) => value === label)
            );
        } else {
            this.model.valuesToBeAdded = values;
            this.model.valuesToBeRemoved = [];
        }
    }

    onLabelsToBeAddedChanged(values: string[]) {
        this.model.valuesToBeAdded = values;
    }

    onLabelsToBeRemovedChanged(values: string[]) {
        this.model.valuesToBeRemoved = values;
    }

    /**
     * Return the list of labels already assigned to the selected record
     */
    private _getInitialRecordLabels(): string[] {
        if (!!this.record) {
            const field = this.model.properties.public
                ? this.labelsService.publicLabelsField
                : this.labelsService.privateLabelsField;
            const labelsField = this.appService.resolveColumnAlias(field);
            if (!this.model.properties.public) {
                return !!this.record[labelsField]
                    ? (this.labelsService.removePrivatePrefix(
                          this.record[labelsField]
                      ) as string[])
                    : ([] as string[]);
            }
            return this.record[labelsField] || [];
        } else {
            return [];
        }
    }
}
