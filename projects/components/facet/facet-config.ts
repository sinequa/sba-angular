import { StrictUnion } from "@sinequa/core/base";
import { FacetListParams, FacetTreeParams } from ".";

export interface FacetConfig<T extends {} = {}> {
    type: string;
    title?: string;
    icon?: string;
    includedTabs?: string[];
    excludedTabs?: string[];
    parameters?: StrictUnion<FacetListParams | FacetTreeParams | T>;
}
