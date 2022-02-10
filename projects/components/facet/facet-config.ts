import { MapOf } from "@sinequa/core/base";

export interface FacetConfig {
    type: string;
    title?: string;
    icon?: string;
    includedTabs?: string[];
    excludedTabs?: string[];
    parameters?: MapOf<any>;
}
