import {Utils} from "@sinequa/core/base";
import _enFilters from "./en";
import _frFilters from "./fr";
import _deFilters from "./de";

const enFilters = Utils.merge({}, _enFilters);
const frFilters = Utils.merge({}, _frFilters);
const deFilters = Utils.merge({}, _deFilters);

export { enFilters, frFilters, deFilters };
