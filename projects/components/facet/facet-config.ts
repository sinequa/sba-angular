import { Type } from "@angular/core";
import { MapOf, StrictUnion } from "@sinequa/core/base";
import { FacetTreeParams, BsFacetTree } from "./bootstrap/facet-tree/facet-tree";
import { FacetListParams, BsFacetList } from "./bootstrap/facet-list/facet-list";
import { FacetMySearchParams, BsMySearch } from "./bootstrap/facet-mysearch/facet-mysearch";
import { FacetRangeParams, BsFacetRange } from "./bootstrap/facet-range/facet-range";
import { FacetRefineParams, BsRefine } from "./bootstrap/facet-refine/facet-refine";
import { FacetTagCloudParams, BsFacetTagCloud } from "./bootstrap/facet-tag-cloud/facet-tag-cloud";

declare type FacetParams = FacetListParams | FacetTreeParams | FacetMySearchParams | FacetRangeParams | FacetRefineParams | FacetTagCloudParams;

export interface FacetConfig<T extends {} = {}> {
    type: string;
    title?: string;
    icon?: string;
    includedTabs?: string[];
    excludedTabs?: string[];
    parameters?: StrictUnion<FacetParams | T>;
}

export const default_facet_components: MapOf<Type<any>> = {
    "list": BsFacetList,
    "tree": BsFacetTree,
    "my-search": BsMySearch,
    "range": BsFacetRange,
    "refine": BsRefine,
    "tag-cloud": BsFacetTagCloud
}
