import { BaseFilter } from "./BaseFilter";

export type NumericalFilter = BaseFilter & {
  operator: 'gt' | 'gte' | 'lt' | 'lte',
  value: number | string
}
