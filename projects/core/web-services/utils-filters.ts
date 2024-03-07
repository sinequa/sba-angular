import { Utils } from "@sinequa/core/base";

import { BetweenFilter } from "./types/filters/BetweenFilter";
import { ExprFilter } from "./types/filters/ExprFilter";
import { FieldFilter } from "./types/filters/FieldFilter";
import { Filter } from "./types/filters/Filter";
import { InFilter } from "./types/filters/InFilter";
import { NullFilter } from "./types/filters/NullFilter";
import { ValueFilter } from "./types/filters/ValueFilter";

export function isFieldFilter(filter: Filter | undefined): filter is FieldFilter {
  return !!(filter as FieldFilter)?.field;
}

export function isValueFilter(filter: Filter | undefined): filter is ValueFilter {
  // eslint-disable-next-line no-prototype-builtins
  return !!(filter as ValueFilter)?.hasOwnProperty('value');
}

export function isExprFilter(filter: Filter | undefined): filter is ExprFilter {
  return !!(filter as ExprFilter)?.filters;
}

export function compareFilters(a: Filter | undefined, b: Filter | undefined): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.operator !== b.operator) return false;
  if (isExprFilter(a)) return compareExprFilters(a, b as ExprFilter);
  if (a.field !== (b as FieldFilter).field) return false;
  if (isValueFilter(a)) return a.value === (b as ValueFilter).value;
  if (a.operator === 'between') return a.start === (b as BetweenFilter).start && a.end === (b as BetweenFilter).end;
  if (a.operator === 'in') return JSON.stringify(a.values) === JSON.stringify((b as InFilter).values);
  if (a.operator === 'null') return !a.not === !(b as NullFilter).not;
  return false;
}

export function compareExprFilters(a: ExprFilter, b: ExprFilter): boolean {
  if (a.filters.length !== b?.filters.length) return false;
  for (let i = 0; i < a.filters.length; i++) {
    if (!compareFilters(a.filters[i], b.filters[i])) {
      return false;
    }
  }
  return true;
}

export function getFieldPredicate(field: string | string[]): (f: Filter) => boolean {
  const fields = Utils.asArray(field);
  return (filter: Filter) => isFieldFilter(filter) && !!fields.find(f => Utils.eqNC(filter.field, f));
}

export function getValuePredicate(field?: string | string[]): (f: Filter) => boolean {
  const fields = field ? Utils.asArray(field) : undefined;
  return (filter: Filter) => isValueFilter(filter) && (!fields || !!fields.find(f => Utils.eqNC(filter.field, f)));
}


