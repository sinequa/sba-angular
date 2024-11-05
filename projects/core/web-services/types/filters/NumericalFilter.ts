import { BaseFilter } from "./BaseFilter";

export type NumericalFilter = BaseFilter & {
  operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq',
  value: number | string
}
