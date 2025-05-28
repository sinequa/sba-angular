import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enCollapse, frCollapse, deCollapse} from "@sinequa/components/collapse";

import _enResult from "./en";
import _frResult from "./fr";
import _deResult from "./de";

const enResult = Utils.merge({}, _enResult, enSearch, enCollapse);
const frResult = Utils.merge({}, _frResult, frSearch, frCollapse);
const deResult = Utils.merge({}, _deResult, deSearch, deCollapse);

export { enResult, frResult, deResult };
