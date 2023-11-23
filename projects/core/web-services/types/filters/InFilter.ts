import { BaseFilter } from "./BaseFilter";


export type InFilter = BaseFilter & {
  operator: 'in',
  values: string[]
}
