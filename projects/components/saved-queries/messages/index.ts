import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enSelection, frSelection, deSelection} from "@sinequa/components/selection";
import {enModal, frModal, deModal} from "@sinequa/components/modal";

import _enSavedQueries from "./en";
import _frSavedQueries from "./fr";
import _deSavedQueries from "./de";

const enSavedQueries = Utils.merge({}, _enSavedQueries, enSearch, enSelection, enModal);
const frSavedQueries = Utils.merge({}, _frSavedQueries, frSearch, frSelection, frModal);
const deSavedQueries = Utils.merge({}, _deSavedQueries, deSearch, deSelection, deModal);

export { enSavedQueries, frSavedQueries, deSavedQueries };
