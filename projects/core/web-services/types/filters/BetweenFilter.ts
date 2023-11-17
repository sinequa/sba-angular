import { BaseFilter } from "./BaseFilter";

export type BetweenFilter = BaseFilter & {
  operator: 'between',
  start: string | number,
  end: string | number
}
