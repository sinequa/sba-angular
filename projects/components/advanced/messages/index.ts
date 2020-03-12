import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import _enAdvanced from "./en";
import _frAdvanced from "./fr";
import _deAdvanced from "./de";

const enAdvanced = Utils.merge({}, _enAdvanced, enSearch);
const frAdvanced = Utils.merge({}, _frAdvanced, frSearch);
const deAdvanced = Utils.merge({}, _deAdvanced, deSearch);

export {enAdvanced, frAdvanced, deAdvanced};

