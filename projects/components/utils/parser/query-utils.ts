import { Utils } from "@sinequa/core/base";
import { IQuery, Select } from "@sinequa/core/web-services";

// deprecated functions

/**
 * Add a select filter to the query
 *
 * @param expr The fielded search expression to filter the results
 * @param facet The name of the associated facet
 *
 * @deprecated
 */
export const addSelect = (query: IQuery, expr: string, facet?: string) => {
  pushSelect( query,
    {
      expression: expr,
      facet: facet || ""
    });
}

/**
 * Adds a new `Select` object to the end of the query's `selects`
 *
 * @deprecated
 */
export const pushSelect = (query: IQuery, select: Select) => {
  if (!query || !query.select) {
    query.select = [];
  }
  query.select.push(select);
}

/**
 * Remove the last `Select` object from the `selects` and return it
 *
 * @deprecated
 */
export const popSelect = (query: IQuery): Select | undefined => {
  if (!query || !query.select) {
    return undefined;
  }
  return query.select.pop();
}

/**
 * Remove the `Select` object identified by `indexOrFacet`
 *
 * @param indexOrFacet either an index in the `selects` array or a facet name
 * @param all If `true` and `indexOrFacet` is a facet name then all `Select` objects with a matching facet name will be removed
 *
 * @deprecated
 */
export const removeSelect = (query: IQuery, indexOrFacet: number | string, all = false): void => {
  if (!query || !query.select) {
    return;
  }
  if (Utils.isString(indexOrFacet)) {
    // indexOrFacet is a facet name
    for (let i = query.select.length - 1; i >= 0; i--) {
      const _select = query.select[i];
      if (Utils.eqNC(_select.facet, indexOrFacet)) {
        query.select.splice(i, 1);
        if (query.select.length === 0) {
          delete query.select; // Clean the query if no more select
          return;
        }
        if (!all) {
          return;
        }
      }
    }
  }
  else {
    if (indexOrFacet < 0 || indexOrFacet >= query.select.length) {
      return;
    }
    query.select.splice(indexOrFacet, 1);
    if (query.select.length === 0) {
      delete query.select;
    }
  }
}

/**
 * Replace a `Select` with another
 *
 * @param index The index in the `selects` array of the `Select to replace
 * @param select The `Select` to use as a replacement
 *
 * @deprecated
 */
export const replaceSelect = (query: IQuery, index: number, select: Select) => {
  if (!query || !query.select) {
    return;
  }
  query.select.splice(index, 1, select);
}

/**
* Find the index of the nth `Select` object matching the passed facet name
*
* @param facet A facet name
* @param ordinal Specifies which `Select` object to retrieve among selects with the same facet name
*
* @deprecated
*/
export const findSelectIndex = (query: IQuery, facet: string, ordinal = 0): number => {
  if (!query || !query.select) {
    return -1;
  }
  let index = 0;
  let facetOrdinal = 0;
  let facetIndex = -1;
  for (const select of query.select) {
    if (Utils.eqNC(facet, select.facet)) {
      facetIndex = index;
      if (facetOrdinal === ordinal) {
        break;
      }
      facetOrdinal++;
    }
    index++;
  }
  return facetIndex;
}

/**
 * Find the first `Select` matching the passed facet name
 *
 * @param facet A facet name
 * @param fromEnd If `true` start searching backwards from the last `Select`
 *
 * @deprecated
 */
export const findSelect = (query: IQuery, facet: string, fromEnd = true): Select | undefined => {
  const facetSelectIndex = findSelectIndex(query, facet, fromEnd ? -1 : 0);
  return facetSelectIndex >= 0 ? query.select && query.select[facetSelectIndex] : undefined;
}
