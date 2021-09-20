import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";

import _enSelection from "./en";
import _frSelection from "./fr";
import _deSelection from "./de";

const enSelection = Utils.merge({}, _enSelection, enSearch);
const frSelection = Utils.merge({}, _frSelection, frSearch);
const deSelection = Utils.merge({}, _deSelection, deSearch);

export { enSelection, frSelection, deSelection };
