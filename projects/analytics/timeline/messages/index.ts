import {Utils} from "@sinequa/core/base";
import {enFacet, frFacet, deFacet} from "@sinequa/components/facet";
import _enTimeline from "./en";
import _frTimeline from "./fr";
import _deTimeline from "./de";

const enTimeline = Utils.merge({}, _enTimeline, enFacet);
const frTimeline = Utils.merge({}, _frTimeline, frFacet);
const deTimeline = Utils.merge({}, _deTimeline, deFacet);

export { enTimeline, frTimeline, deTimeline };
