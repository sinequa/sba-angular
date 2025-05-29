import { BooleanFilter } from "./BooleanFilter";
import { NumericalFilter } from "./NumericalFilter";
import { StringFilter } from "./StringFilter";

export type ValueFilter = BooleanFilter | NumericalFilter | StringFilter;
