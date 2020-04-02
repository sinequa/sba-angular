import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enSelection, frSelection, deSelection} from "@sinequa/components/selection";

import _enResultsView from "./en";
import _frResultsView from "./fr";
import _deResultsView from "./de";

const enResultsView = Utils.merge({}, _enResultsView, enSearch, enSelection);
const frResultsView = Utils.merge({}, _frResultsView, frSearch, frSelection);
const deResultsView = Utils.merge({}, _deResultsView, deSearch, deSelection);

export { enResultsView, frResultsView, deResultsView };
