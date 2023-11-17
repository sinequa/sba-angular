import { PrincipalEvent } from "./PrincipalEvent";

/**
 * This event is fired each time the [principal]{@link PrincipalWebService#principal} member is modified.
 * Typically this will be at login / logoff and also if the "override user" admin feature is used.
 *
 * @deprecated Use {@link PrincipalEvent} instead
 */
export type PrincipalChangedEvent = PrincipalEvent & {
    type: "changed"
}
