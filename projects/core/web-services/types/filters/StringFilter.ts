import { BaseFilter } from "./BaseFilter";

export type StringFilter = BaseFilter & {
  operator: 'like' | 'contains' | 'regex',
  value: string
}
