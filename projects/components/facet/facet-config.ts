import { MapOf } from "@sinequa/core/base";

export interface FacetConfig {
    name: string;
    type: string;
    title: string;
    aggregation: string;
    icon?: string;
    includedTabs?: string[];
    excludedTabs?: string[];
    parameters?: MapOf<any>;
}
