import { z } from "zod";

import { JsonObjectSchema } from "@sinequa/core/base";

import { CCConfigSchema } from "./CCConfig";
import { CCIndexSchema } from "./CCIndex";
import { CCListSchema } from "./CCList";
import { CCQuerySchema } from "./CCQuery";
import { CCRFMSchema } from "./CCRFM";
import { CCWebServiceSchema } from "./CCWebService";

/**
 * Describes the fields in the application configuration object
 */
export const CCAppSchema = CCConfigSchema.extend({
    /**
     * Identifies the version of the application configuration. This field can be passed
     * to the [AppWebService.refresh]{@link AppWebService#refresh} api to update the application
     * configuration if the version now available on the server is different.
     */
    versionId: z.string(),
    /**
     * Defines the queries configured on the application
     */
    queries: z.record(z.string(), CCQuerySchema),// Record<string, CCQuery>;
    /**
     * Defines the RFM objects configured on the application
     */
    rfms: z.record(z.string(), CCRFMSchema),
    /**
     * Defines the indexes configured on the application
     */
    indexes: z.record(z.string(), CCIndexSchema),
    /**
     * Defines the lists configured on the application
     */
    lists: z.record(z.string(), CCListSchema),
    /**
     * Defines the web services configured on the application
     */
    webServices: z.record(z.string(), CCWebServiceSchema),
    /**
     * A comma-separated list of the names of the queries configured on the application
     */
    queryNames: z.string(),
    /**
     * The name of the labels web service configured on the application
     */
    labels: z.string(),
    /**
     * The name of the preview web service configured on the application
     */
    preview: z.string(),
    /**
     * The name of the autocomplete web service configured on the application
     */
    autocomplete: z.string(),
    /**
     * The name of the sponsored links web service configured on the application
     */
    sponsoredLinks: z.string(),
    /**
     * The name of the query export web service configured on the application
     */
    queryExport: z.string(),
    /**
     * Determines whether RSS feeds are available on saved queries
     */
    queryRssEnabled: z.boolean(),
    /**
     * Custom JSON configuration (see App Customization tab in Sinequa admin)
     */
    data: JsonObjectSchema,
    /**
     * The version of the server API.
     * This field is used to compare with [MINIMUM_COMPATIBLE_SERVER_API_VERSION]{@link MINIMUM_COMPATIBLE_SERVER_API_VERSION}
     */
    apiVersion: z.string(),
    /**
     * The workspace associated with this app
     */
    workspaceApp: z.string(),
    /**
     * The name of the default query
     */
    defaultQueryName: z.string(),
})

export type CCApp = z.infer<typeof CCAppSchema>;