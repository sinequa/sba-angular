import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enSelection, frSelection, deSelection} from "@sinequa/components/selection";
import {enModal, frModal, deModal} from "@sinequa/components/modal";
import _enBaskets from "./en";
import _frBaskets from "./fr";
import _deBaskets from "./de";

const enBaskets = Utils.merge({}, _enBaskets, enSearch, enSelection, enModal);
const frBaskets = Utils.merge({}, _frBaskets, frSearch, frSelection, frModal);
const deBaskets = Utils.merge({}, _deBaskets, deSearch, deSelection, deModal);

export { enBaskets, frBaskets, deBaskets };