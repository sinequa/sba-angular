import { z } from "zod";

// export type JsonValue = boolean | number | string | null | undefined | JsonArray | JsonObject;
const JsonValueSchema = z.union([
  z.boolean(),
  z.number(),
  z.string(),
  z.null(),
  z.undefined(),
  z.array(z.lazy(() => JsonValueSchema)),
  z.record(z.string(), z.lazy(() => JsonValueSchema))
])
/**
 * A union type of the possible JSON types
 * @deprecated use javascript literals instead
 */
export type JsonValue = z.infer<typeof JsonValueSchema>;

// export interface JsonObject {
//     [key: string]: JsonValue;
// }
export const JsonObjectSchema = z.record(z.string(), JsonValueSchema);
/**
 * Describes a JSON object
 * @deprecated Use `Record<string, any>` or `{}` instead
 */
export type JsonObject = z.infer<typeof JsonObjectSchema>;

// export interface JsonArray extends Array<JsonValue> {}
const JsonArraySchema = z.array(JsonValueSchema);
/**
 * Describes a JSON array
 * @deprecated Use `any[]` instead
 */
export type JsonArray = z.infer<typeof JsonArraySchema>;
