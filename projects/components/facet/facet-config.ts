import { Type } from "@angular/core";
import { MapOf, StrictUnion } from "@sinequa/core/base";
import { BsFacetTree } from "./bootstrap/facet-tree/facet-tree";
import { BsFacetList } from "./bootstrap/facet-list/facet-list";
import { BsFacetRange } from "./bootstrap/facet-range/facet-range";
import { BsRefine } from "./bootstrap/facet-refine/facet-refine";
import { BsFacetTagCloud } from "./bootstrap/facet-tag-cloud/facet-tag-cloud";

export interface FacetConfig<T extends {}> {
    name: string;
    type: string;
    title?: string;
    icon?: string;
    includedTabs?: string[];
    excludedTabs?: string[];
    className?: string;
    parameters?: StrictUnion<T>;
}

export const default_facet_components: MapOf<Type<any>> = {
    "list": BsFacetList,
    "tree": BsFacetTree,
    "range": BsFacetRange,
    "refine": BsRefine,
    "tag-cloud": BsFacetTagCloud
}
