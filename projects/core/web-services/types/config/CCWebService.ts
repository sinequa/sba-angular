
/**
 * Describes the fields available in all web service configuration objects
 */

import { z } from "zod";

import { CCConfigSchema } from "./CCConfig";

const VALUES = ["Query" , "sponsoredlinks" , "queryexport" , "Preview" , "Labels" , "Autocomplete" , "DataSet"] as const;

export const CCWebServiceSchema = CCConfigSchema.extend({
    webServiceType: z.enum(VALUES)
})

export type CCWebService = z.infer<typeof CCWebServiceSchema>;
