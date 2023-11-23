import { AuditEvent } from "./AuditEvent";

/**
 * Contains an array of {@link AuditEvent} objects and an array of ML audit event records
 */

export type AuditRecord = {
    auditEvents?: AuditEvent[],
    mlAuditEvents?: any[]
}
