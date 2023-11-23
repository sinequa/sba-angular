import { z } from "zod";

/**
 * Defines configuration parameters for a column
 */
export const CCColumnInfoSchema = z.object({
  /**
   * The column name
   */
  name: z.string(),
  /**
   * A description of the column
   */
  description: z.string(),
  /**
   * A comma-separated list of aliases for the column
   */
  aliases: z.string(),
  /**
   * A display label for the column
   */
  label: z.string(),
  /**
   * A plural form display label for the column
   */
  labelPlural: z.string(),
  /**
   * The name of a formatter function that produces a formatted string value from the column value. See {@link FormatService}
   */
  formatter: z.string(),
  /**
   * A set of transform functions that are applied to the a formatted string value. See {@link FormatService}
   */
  transforms: z.string(),
  /**
   * The name of a parser function that produces a column value from a formatted string value. See {@link FormatService}
   */
  parser: z.string(),
})

export type CCColumnInfo = z.infer<typeof CCColumnInfoSchema>;

