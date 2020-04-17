import {Utils} from "@sinequa/core/base";
import {enFacet, frFacet, deFacet} from "@sinequa/components/facet";
import {enCollapse, frCollapse, deCollapse} from "@sinequa/components/collapse";

import _enMetadata from "./en";
import _frMetadata from "./fr";
import _deMetadata from "./de";

const enMetadata = Utils.merge({}, _enMetadata, enFacet, enCollapse);
const frMetadata = Utils.merge({}, _frMetadata, frFacet, frCollapse);
const deMetadata = Utils.merge({}, _deMetadata, deFacet, deCollapse);

export { enMetadata, frMetadata, deMetadata };
