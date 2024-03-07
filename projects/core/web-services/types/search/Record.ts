import { z } from "zod";

import { DocumentAccessListsSchema } from "./DocumentAccessLists";
import { MatchingPassageSchema } from "./MatchingPassage";
import { MatchLocationsPerPartnameSchema } from "./MatchLocationsPerPartname";
import { RelevantExtractSchema } from "./RelevantExtract";
import { RFMDataSchema } from "./RFMData";
import { TermPresenceSchema } from "./TermPresence";

/**
 * Describes the standard fields in a document result record
 */
export const RecordSchema = z.object({
    /**
     * The zero-based position of this document in the results
     */
    rank: z.number(),
    /**
     * The unique identifier of this document
     */
    id: z.string(),
    /**
     * The name of the index that contains this document
     */
    databasealias: z.string(),
    /**
     * The global relevance of this document in the context of the query
     */
    globalrelevance: z.number().optional(),
    /**
     * Partnames that contain one or more of the search terms
     */
    matchingpartnames: z.array(z.string()).default([]),
    /**
     * The locations of the search terms in the document
     */
    matchlocations: z.array(z.string()).default([]),
    /**
     * The locations of the search terms in the document grouped by partname
     */
    matchlocationsperpartname: z.array(MatchLocationsPerPartnameSchema).default([]),
    /**
     * The languages in the document
     */
    documentlanguages: z.array(z.string()).default([]),
    /**
     * The documentweight value of the document
     */
    documentweight: z.string(),
    /**
     * The modified date and time of the document
     */
    modified: z.string(),
    /**
     * The time and date when the document was indexed
     */
    indexationtime: z.string(),
    /**
     * The version of the document
     */
    version: z.string(),
    /**
     * The title of the document
     */
    title: z.string(),
    /**
     * The display title of the document. This can contain HTML highlighting of the search terms
     */
    displayTitle: z.string().optional(),
    /**
     * The size in bytes of the document
     */
    size: z.number(),
    /**
     * The value of the treepath of the document
     */
    treepath: z.array(z.string()),
    /**
     * The filename of the document
     */
    filename: z.string(),
    /**
     * The file extension of the document
     */
    fileext: z.string(),
    /**
     * The document flags
     */
    flags: z.array(z.string()),
    /**
     * The collection that produced the document (only one element will exist)
     */
    collection: z.array(z.string()),
    /**
     * The value of the docformat column
     */
    docformat: z.string(),
    /**
     * The value of the doctype column
     */
    doctype: z.string().optional(),
    /**
     * The value of the url1 column
     */
    url1: z.string().default(""),
    /**
     * The value of the url2 column
     */
    url2: z.string().optional(),
    /**
     * The relevant extracts from the document. This can contain HTML highlighting of the search terms
     */
    relevantExtracts: z.string().optional(),
    /**
     * Relevant extracts as a raw list, including HTML highlighting
     */
    extracts: z.array(RelevantExtractSchema).optional(),
    /**
     * The text of the document
     */
    text: z.string().default(""),
    /**
     * The document authors
     */
    authors: z.array(z.string()).default([]),
    /**
     * The document access lists
     */
    accesslists: DocumentAccessListsSchema.optional(),
    /**
     * The URL of the document's thumbnail
     */
    thumbnailUrl: z.string().optional(),
    /**
     * The URL of the original document, if it exists
     */
    originalUrl: z.string().optional(),
    /**
     * The URL of the PDF version of the document, if it exists
     */
    pdfUrl: z.string().optional(),
    /**
     * Indicates whether RFM has been enabled for this document
     */
    rfmEnabled: z.boolean().optional().default(false),
    /**
     * Any RFM data for this document
     */
    rfm: RFMDataSchema.optional(),
    /**
     * Information about the search terms and whether they exist in the document or not
     */
    termspresence: z.array(TermPresenceSchema).default([]),
    /**
     * Number of duplicate docs when the web service performs deduplication with a group by clause
     */
    groupcount: z.number().optional(),
    /**
     * Near hash of this document
     */
    nearhash: z.string().optional(),
    /**
     * Exact hash of this document
     */
    exacthash: z.string().optional(),
    /**
     * A client-side field that indicates whether this document is currently selected
     */
    $selected: z.boolean().default(false),
    /**
     * id of the container of this document (for splitted documents, attachments, etc.)
     */
    containerid: z.string().optional(),
    /**
     * Page number of this document (for splitted documents). Added by the front-end
     */
    $page: z.number().optional(),
    /**
     * List of matching passages for that document returned by the passage ranking ML model
     */
    matchingpassages: z.object({
        passages: z.array(MatchingPassageSchema)
    }).optional(),
    /**
     * Whether this record contains Neural Search "matching passages"
     */
    $hasPassages: z.boolean().optional(),
    /**
     * Whether this record is considered a duplicate of its predecessor
     */
    $isDuplicate: z.boolean().default(false),
    /**
     * Number of duplicates of this document
     */
    $duplicateCount: z.number().default(0),
}).transform(data => {
    data.$hasPassages = !!data.matchingpassages?.passages?.length;
    return data;
})

export type Record = z.infer<typeof RecordSchema>;

