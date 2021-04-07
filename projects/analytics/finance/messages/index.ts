import {Utils} from "@sinequa/core/base";
import {enFacet, frFacet, deFacet} from "@sinequa/components/facet";
import _enMoney from "./en";
import _frMoney from "./fr";
import _deMoney from "./de";

const enMoney = Utils.merge({}, _enMoney, enFacet);
const frMoney = Utils.merge({}, _frMoney, frFacet);
const deMoney = Utils.merge({}, _deMoney, deFacet);

export { enMoney, frMoney, deMoney };
