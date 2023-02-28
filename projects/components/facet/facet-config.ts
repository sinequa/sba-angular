import { Type } from "@angular/core";
import { MapOf, StrictUnion } from "@sinequa/core/base";
import { BsFacetList } from "./bootstrap/facet-list/facet-list";
import { BsFacetRange } from "./bootstrap/facet-range/facet-range";
import { BsRefine } from "./bootstrap/facet-refine/facet-refine";
import { BsFacetTagCloud } from "./bootstrap/facet-tag-cloud/facet-tag-cloud";

export interface FacetConfig<T extends {}> {
  /** type of component that should be displayed */
  type: string;
  /** aggregation(s) used by this facet */
  aggregation: string | string[];
  /** technical name for this facet */
  name?: string;
  /** display title */
  title?: string;
  /** icon class */
  icon?: string;
  /** tabs in which this facet should be displayed */
  includedTabs?: string[];
  /** tabs in which this facet should not be displayed */
  excludedTabs?: string[];
  className?: string;
  /** List of parameters specific to this facet configuration */
  parameters?: StrictUnion<T>;
}

export const DEFAULT_FACET_COMPONENTS: MapOf<Type<any>> = {
  "list": BsFacetList,
  "range": BsFacetRange,
  "refine": BsRefine,
  "tag-cloud": BsFacetTagCloud
}
