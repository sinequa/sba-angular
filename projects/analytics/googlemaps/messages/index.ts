import {Utils} from "@sinequa/core/base";
import {enFacet, frFacet, deFacet} from "@sinequa/components/facet";
import _enGooglemaps from "./en";
import _frGooglemaps from "./fr";
import _deGooglemaps from "./de";

const enGooglemaps = Utils.merge({}, _enGooglemaps, enFacet);
const frGooglemaps = Utils.merge({}, _frGooglemaps, frFacet);
const deGooglemaps = Utils.merge({}, _deGooglemaps, deFacet);

export { enGooglemaps, frGooglemaps, deGooglemaps };
