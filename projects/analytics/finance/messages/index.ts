import {Utils} from "@sinequa/core/base";
import {enFacet, frFacet, deFacet} from "@sinequa/components/facet";
import _enFinance from "./en";
import _frFinance from "./fr";
import _deFinance from "./de";

const enFinance = Utils.merge({}, _enFinance, enFacet);
const frFinance = Utils.merge({}, _frFinance, frFacet);
const deFinance = Utils.merge({}, _deFinance, deFacet);

export { enFinance, frFinance, deFinance };
