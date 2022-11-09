import { Record as SQRecord } from "../query.web.service";

export type TopPassageColumnKey = "id" | "url1" | "title" | "filename" | "treepath" | "modified" | "docformat" | "fileeext" | "collection" | "authors"
export type TopPassageColumn = Partial<Record<TopPassageColumnKey, string>>;

export interface TopPassage {
    id: number;
    index: string;
    score: number;
    text: string;
    columns: Partial<Record<TopPassageColumnKey, unknown>>[];
    record: SQRecord;
    recordId: string;
}