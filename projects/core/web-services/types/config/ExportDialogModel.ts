import { ExportOutputFormat } from "./ExportOutputFormat";
import { ExportSourceType } from "./ExportSourceType";

/**
 * Data model of the Export dialog.
 */


export interface ExportDialogModel {
    format: ExportOutputFormat;
    export: ExportSourceType;
    webService: string;
    maxCount?: number;
    queryName?: string;
}
