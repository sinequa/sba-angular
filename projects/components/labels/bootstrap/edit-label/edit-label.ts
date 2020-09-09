import { Component, OnInit, Inject } from "@angular/core";
import { ModalButton, ModalResult, MODAL_MODEL } from "@sinequa/core/modal";
import { ModalProperties, LabelsService } from "../../labels.service";
import { SelectionService } from "@sinequa/components/selection";
import { AppService } from "@sinequa/core/app-utils";

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
    selectedRecordsIds: string[] = [];
    buttons: ModalButton[];
    /** Initial labels list assigned to a record */
    initialLabels: string[] = [];
    private record;

    constructor(
        @Inject(MODAL_MODEL)
        public model: {
            valuesToBeAdded: string[];
            valuesToBeRemoved: string[];
            properties: ModalProperties;
        },
        private appService: AppService,
        private selectionService: SelectionService,
        private labelsService: LabelsService
    ) {}

    ngOnInit() {
        this.selectedRecordsIds = this.selectionService.getSelectedIds();
        if (this.selectedRecordsIds.length === 1) {
            this.record = this.labelsService.getRecordFromId(this.selectedRecordsIds[0]);
            this.initialLabels = this._getInitialRecordLabels();
        }
        this.buttons = [
            new ModalButton({
                result: ModalResult.OK,
                primary: true,
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
            this.model.valuesToBeRemoved = []
        }
    }

    onLabelsToBeAddedChanged(values: string[]) {
        this.model.valuesToBeAdded = values
    }

    onLabelsToBeRemovedChanged(values: string[]) {
        this.model.valuesToBeRemoved = values
    }

    /**
     * Return the list of labels already assigned to the selected record
     */
    private _getInitialRecordLabels(): string[] {
        const field = this.model.properties.public
            ? this.labelsService.publicLabelsField
            : this.labelsService.privateLabelsField;
        const labelsField = this.appService.resolveColumnAlias(field);
        if (!this.model.properties.public) {
            return this.labelsService.removePrivatePrefix(this.record[labelsField]) as string[];
        }
        return this.record[labelsField];

    }
}

