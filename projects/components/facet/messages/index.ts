import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enSelection, frSelection, deSelection} from "@sinequa/components/selection";
import {enCollapse, frCollapse, deCollapse} from "@sinequa/components/collapse";
import _enFacet from "./en";
import _frFacet from "./fr";
import _deFacet from "./de";

const enFacet = Utils.merge({}, _enFacet, enSearch, enSelection, enCollapse);
const frFacet = Utils.merge({}, _frFacet, frSearch, frSelection, frCollapse);
const deFacet = Utils.merge({}, _deFacet, deSearch, deSelection, deCollapse);

export {enFacet, frFacet, deFacet};

