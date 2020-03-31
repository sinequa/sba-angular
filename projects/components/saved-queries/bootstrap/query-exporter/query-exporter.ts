import { Component, Input } from '@angular/core';
import { Results, ExportSourceType } from "@sinequa/core/web-services";
import { SavedQueriesService } from "../../saved-queries.service";
import { SelectionService } from "@sinequa/components/selection";
import { Action } from "@sinequa/components/action";



/**
 * Toolbar component for Export query feature.
 *
 */
@Component({
    selector: 'sq-query-exporter',
    templateUrl: './query-exporter.html'
})
export class BsQueryExporter {

    @Input() results: Results;
    @Input() rightAligned: boolean;

    public exportAction: Action;

    constructor(
        private selectionService: SelectionService,
        private savedQueriesService: SavedQueriesService
    ) {
        this.exportAction = new Action({
            icon: 'fas fa-download',
            title: 'msg#exportQuery.btnTitle',
            action: (item: Action, event: Event) => {
                this.export();
            }
        });
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
     * Generic export function.
     * <p>
     * Opens up a dialog to let user choose the export source, export format and other parameters.
     *
     * @memberof QueryExporter
     */
    public export(): void {

        this.savedQueriesService.exportModal(
            this.hasSelectedRecords() ? ExportSourceType.Selection : ExportSourceType.Result);

    }

}
