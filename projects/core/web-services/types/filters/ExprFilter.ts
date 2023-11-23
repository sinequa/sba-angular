import { BaseFilter } from "./BaseFilter";
import { Filter } from "./Filter";

export type ExprFilter =  Omit<BaseFilter, 'field'> & {
  operator: 'and' | 'or' | 'not',
  filters: Filter[]
}