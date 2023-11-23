import { z } from "zod";

/**
 * Describes the fields making up an entity in the context of a particular document
 */
export const EntityItemSchema = z.object({
    /**
     * The value
     */
    value: z.string(),
    /**
     * The display
     */
    display: z.string(),
    /**
     * The locations of this item in the document text in the form `row1,col1;row2,col2;...`
     */
    locations: z.string().optional(),
    /**
     * The remapped locations of this item in the original document in the form `row1,col1;row2,col2;...`
     */
    originalLocations: z.string().optional(),
    /**
     * Following ES-11166, the number of occurrence of this entity in the document can be included
     */
    count: z.number().optional()
})

export type EntityItem = z.infer<typeof EntityItemSchema>;
