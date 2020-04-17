import {Utils} from "@sinequa/core/base";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import {enModal, frModal, deModal} from "@sinequa/components/modal";
import _enAlerts from "./en";
import _frAlerts from "./fr";
import _deAlerts from "./de";

const enAlerts = Utils.merge({}, _enAlerts, enSearch, enModal);
const frAlerts = Utils.merge({}, _frAlerts, frSearch, frModal);
const deAlerts = Utils.merge({}, _deAlerts, deSearch, deModal);

export { enAlerts, frAlerts, deAlerts };
