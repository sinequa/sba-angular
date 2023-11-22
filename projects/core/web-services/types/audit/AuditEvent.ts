import { AuditEventType, AuditEventTypeValues } from "./AuditEventType";
import { AuditRecord } from "./AuditRecord";

/**
 * Describes a single audit event
 */
export type AuditEvent = {
    type: AuditEventType | AuditEventTypeValues | {} & Record<never,never>, // allow custom event types because AuditEventType allow this
    detail?: {},
    rfmDetail?: {}
}

/**
 * A composite type describing a set of AuditEvents
 */
export type AuditEvents = AuditEvent | AuditEvent[] | AuditRecord;