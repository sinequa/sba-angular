import { BetweenFilter } from "./BetweenFilter";
import { InFilter } from "./InFilter";
import { NullFilter } from "./NullFilter";
import { ValueFilter } from "./ValueFilter";

export type FieldFilter = ValueFilter | BetweenFilter | InFilter | NullFilter;
