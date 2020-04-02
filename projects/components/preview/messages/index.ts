import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enCollapse, frCollapse, deCollapse} from "@sinequa/components/collapse";
import {enMetadata, frMetadata, deMetadata} from "@sinequa/components/metadata";
import {enModal, frModal, deModal} from "@sinequa/components/modal";
import {enFacet, frFacet, deFacet} from "@sinequa/components/facet";
import {enResult, frResult, deResult} from "@sinequa/components/result";

import _enPreview from "./en";
import _frPreview from "./fr";
import _dePreview from "./de";

const enPreview = Utils.merge({}, _enPreview, enSearch, enCollapse, enMetadata, enModal, enFacet, enResult);
const frPreview = Utils.merge({}, _frPreview, frSearch, frCollapse, frMetadata, frModal, frFacet, frResult);
const dePreview = Utils.merge({}, _dePreview, deSearch, deCollapse, deMetadata, deModal, deFacet, deResult);

export { enPreview, frPreview, dePreview };
