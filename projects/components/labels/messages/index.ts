import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enModal, frModal, deModal} from "@sinequa/components/modal";
import _enLabels from "./en";
import _frLabels from "./fr";
import _deLabels from "./de";

const enLabels = Utils.merge({}, _enLabels, enSearch, enModal);
const frLabels = Utils.merge({}, _frLabels, frSearch, frModal);
const deLabels = Utils.merge({}, _deLabels, deSearch, deModal);

export { enLabels, frLabels, deLabels };
