import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enCollapse, frCollapse, deCollapse} from "@sinequa/components/collapse";
import {enMetadata, frMetadata, deMetadata} from "@sinequa/components/metadata";

import _enResult from "./en";
import _frResult from "./fr";
import _deResult from "./de";

const enResult = Utils.merge({}, _enResult, enSearch, enMetadata, enCollapse);
const frResult = Utils.merge({}, _frResult, frSearch, frMetadata, frCollapse);
const deResult = Utils.merge({}, _deResult, deSearch, deMetadata, deCollapse);

export { enResult, frResult, deResult };
