import { BaseFilter } from "./BaseFilter";

export type NullFilter = BaseFilter & {
  operator: 'null',
  not?: boolean
}
