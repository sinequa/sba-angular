import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationService } from "@sinequa/core/validation";
import { NotificationsService } from "@sinequa/core/notification";
import { Utils } from "@sinequa/core/base";
import { ModalRef, ModalButton, ModalResult, MODAL_MODEL } from "@sinequa/core/modal";
import { ExportSourceType, ExportOutputFormat, CCWebService, CCApp} from "@sinequa/core/web-services";
import {SavedQueriesService, ExportQueryModel} from "../../saved-queries.service";
import {SelectionService} from "@sinequa/components/selection";
import { AppService } from '@sinequa/core/app-utils';

/**
 * Component representing the Export dialog where user can customize the query export action.
 *
 */
@Component({
    selector: 'sq-export-query',
    templateUrl: './export-query.html',
    styleUrls: ["./export-query.scss"]
})
export class BsExportQuery implements OnInit, OnDestroy {

    public readonly supportedFormats: ExportOutputFormat[] = [
        ExportOutputFormat.Csv,
        ExportOutputFormat.Xlsx,
        ExportOutputFormat.Json
    ];
    public readonly outputFormats: typeof ExportOutputFormat = ExportOutputFormat;
    public readonly sourceTypes: typeof ExportSourceType = ExportSourceType;

    public form: FormGroup;
    public savedQueries: string[];
    public buttons: ModalButton[];
    public isDownloading: boolean;
    public exportableColumns: string[];

    private formChanges: Subscription;

    constructor(
        @Inject(MODAL_MODEL) public model: ExportQueryModel,
        private formBuilder: FormBuilder,
        private appService: AppService,
        private selectionService: SelectionService,
        private savedQueriesService: SavedQueriesService,
        private validationService: ValidationService,
        private notificationsService: NotificationsService,
        private changeDetectorRef: ChangeDetectorRef,
        public modalRef: ModalRef) { }

    ngOnInit(): void {
        this.savedQueries = [];
        for (const query of this.savedQueriesService.savedqueries) {
            this.savedQueries.push(query.name);
        }

        this.exportableColumns = [];
        if (this.appService.app) {
            const queryExportConfig = this.getDefaultQueryExportConfig(this.appService.app);
            const columns = (queryExportConfig.columns && queryExportConfig.columns['column$']) || [];
            for (const column of columns) {
                this.exportableColumns.push(column.title);
            }
        }

        this.form = this.formBuilder.group({
            'format': [this.supportedFormats[0]],
            'exportedColumns': [this.model.exportedColumns],
            'export': [this.model.export, Validators.required],
            'maxCount': [this.model.maxCount, Validators.compose([
                this.validationService.integerValidator(),
                this.validationService.minValidator(1)])],
        });

        this.isDownloading = false;

        this.buttons = [
            new ModalButton({
                text: "msg#exportQuery.btnDownload",
                result: ModalResult.Custom,
                anchor: true,
                primary: true,
                action: (_button) => {
                    const observable = this.savedQueriesService.download(this.model);
                    if (observable) {
                        Utils.subscribe(observable,
                            (response: HttpResponse<Blob>) => {
                                console.log('exportQuery.download done.');
                                this.notificationsService.info('msg#exportQuery.successNotification');
                                this.modalRef.close(ModalResult.OK);
                                return response;
                            },
                            (error) => {
                                console.log('exportQuery.download failure - error: ', error);
                                this.modalRef.close(error);
                            });

                        this.isDownloading = true;
                        this.changeDetectorRef.markForCheck();
                    }
                },
            }),
            new ModalButton({
                result: ModalResult.Cancel,
            })
        ];

        const onFormChanged = () => {
            const newFormat = this.form.value['format'];
            const newMaxCount = this.form.value['maxCount'];
            const newExportedColumns = this.form.value['exportedColumns'];

            if (this.model.format !== newFormat) {
                this.model.format = newFormat;
            }

            if (this.model.maxCount !== newMaxCount) {
                this.model.maxCount = newMaxCount;
            }

            this.model.exportedColumns = newExportedColumns;
        };

        this.formChanges = Utils.subscribe(this.form.valueChanges, onFormChanged);
    }

    ngOnDestroy(): void {
        if (this.formChanges) {
            this.formChanges.unsubscribe();
        }
    }

    private getDefaultQueryExportConfig(app: CCApp): CCQueryExport {
        let queryExport = app.queryExport;
        if (queryExport.indexOf(',') !== -1) {
            queryExport = queryExport.substring(0, queryExport.indexOf(','));
        }
        return <CCQueryExport>Utils.getField(app.webServices, queryExport);
    }

    /**
     * Check if the client has selected some records.
     *
     * @returns true if the client has selected some records.
     */
    public hasSelectedRecords(): boolean {
        return this.selectionService.haveSelectedRecords;
    }

    /**
     * Checks if the user chosen export source is the same as the given one.
     * <p>
     * Used to control the radio button state.
     *
     * @param type The source to check.
     * @returns true if the user chosen export source is the same as the given one.
     */
    public sourceChosen(type: ExportSourceType): boolean {
        return (this.model.export & type) !== 0;
    }

    /**
     * Callback called when user chooses a new export source.
     *
     * @param event The related UI event.
     * @param type The new chosen source.
     */
    public sourceChanged(event: UIEvent, type: ExportSourceType): void {
        const input = <HTMLInputElement>event.target;
        if (input.checked) {
            this.model.export = type;
        }
    }

    /**
     * Checks if the dialog allows user to choose export source.
     * Generally, it returns false when the input model export type is already saved query.
     *
     * @returns true if the dialog allows user to choose export source.
     */
    public showSourceChooser(): boolean {
        return !this.sourceChosen(ExportSourceType.SavedQuery);
    }


    public close(): void {
        this.modalRef.close(ModalResult.Cancel);
    }
}

interface CCQueryExportColumnDef {
    title: string;
    pattern: string;
    selectionQuery?: string;
}

interface CCQueryExport extends CCWebService {
    webServiceType: "queryexport";
    columns?: CCQueryExportColumnDef[];
    linksFilterDuplicateUrls?: boolean;
    linksGlobalRelevance?: string;
    linksMaxCount?: number;
    linksSortByOrder?: boolean;
    maxCount?: number;
    separator?: string;
}
