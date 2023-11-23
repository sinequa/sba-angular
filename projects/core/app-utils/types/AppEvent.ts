import { CCQuery } from "@sinequa/core/web-services"

/**
 * A base event from which all events that can be issued by the {@link AppService} are derived
 */
export type AppEvent = {
    type: "query-changed"
}

export type AppEvents = AppEvent & {
    current?: CCQuery,
    previous?: CCQuery
}
