/**
 * Defines the object used to request the children of a tree node in an aggregation
 */

export interface Open {
  /**
   * The fielded search expression of the filter used to request the tree node children. For example: `treepath:/folder1/folder2/*`
   */
  expression: string;
  /**
   * The name of the associated aggregation
   */
  aggregation: string;
}
