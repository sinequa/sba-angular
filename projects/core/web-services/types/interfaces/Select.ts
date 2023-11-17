/**
 * Defines the object used to filter an {@link IQuery}. This is typically added to a query
 * as a result of a selection in UI facet component
 */

export interface Select {
  /**
   * The fielded search expression of the filter that should be applied to the query
   */
  expression: string;
  /**
   * The name of the facet where this selection was made
   */
  facet: string;
}
