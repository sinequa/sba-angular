import {Component, Inject, OnInit} from "@angular/core";
import {Validators, AbstractControl} from "@angular/forms";
import {ValidatorFn} from "@angular/forms";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {ExportSourceType, AuditEvent} from "@sinequa/core/web-services";
import {SavedQueriesService, SavedQuery, SavedQueryEventType, ManageSavedQueriesModel} from "../../saved-queries.service";

@Component({
    selector: "sq-manage-saved-queries",
    templateUrl: "./manage-saved-queries.html",
    styleUrls: ["./manage-saved-queries.scss"]
})
export class BsManageSavedQueries implements OnInit {
    reordering: boolean;
    buttons: ModalButton[];
    removeAllButton: ModalButton;
    nameValidators: ValidatorFn[];

    constructor(
        @Inject(MODAL_MODEL) public model: ManageSavedQueriesModel,
        public savedQueriesService: SavedQueriesService) {
        this.reordering = false;

        this.nameValidators = [
            Validators.required,
            (control: AbstractControl) => {
                const modelControl = control.root.get("model");
                if (modelControl) {
                    for (const item of this.model.savedQueries) {
                        if (modelControl.value === item) {
                            continue;
                        }
                        if (control.value === item.name) {
                            return {
                                unique: true
                            };
                        }
                    }
                }
                return null;
            }
        ];
    }

    ngOnInit() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageSavedQueries.removeAll",
                result: ModalResult.Custom,
                action: (button) => {
                    this.model.savedQueries.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: SavedQueryEventType.DeleteAll
                    });
                },
                visible: this.model.savedQueries.length > 0
            }),
            new ModalButton({
                result: ModalResult.OK,
                primary: true
            }),
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];
    }

    addAuditEvent(auditEvent: AuditEvent) {
        if (!this.model.auditEvents) {
            this.model.auditEvents = [];
        }
        this.model.auditEvents.push(auditEvent);
    }

    reorder() {
        this.reordering = !this.reordering;
    }

    setName(savedQuery: SavedQuery, name: string) {
        if (!Utils.eqNC(savedQuery.name, name)) {
            this.addAuditEvent({
                type: SavedQueryEventType.Rename,
                detail: {
                    query: name,
                    "old-name": savedQuery.name
                }
            });
            savedQuery.name = name;
        }
    }

    remove(savedQuery: SavedQuery, index: number) {
        this.model.savedQueries.splice(index, 1);
        this.removeAllButton.visible = this.model.savedQueries.length > 0;
        this.addAuditEvent({
            type: SavedQueryEventType.Delete,
            detail: {
                query: savedQuery.name
            }
        });
        return false;
    }

    export(savedQuery: SavedQuery) {
        this.savedQueriesService.exportModal(ExportSourceType.SavedQuery, savedQuery);
        return false;
    }

    dropped(drop: CdkDragDrop<SavedQuery[]>) {
        Utils.arrayMove(this.model.savedQueries, drop.previousIndex, drop.currentIndex);
    }
}
