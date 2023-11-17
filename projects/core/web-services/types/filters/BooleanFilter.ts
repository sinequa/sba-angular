import { BaseFilter } from "./BaseFilter";

export type BooleanFilter = BaseFilter & {
  operator?: 'eq' | 'neq',
  value: boolean | number | string
}
