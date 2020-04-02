import {Utils} from "@sinequa/core/base";
import {enModal, frModal, deModal} from "@sinequa/components/modal";

import _enUserSettings from "./en";
import _frUserSettings from "./fr";
import _deUserSettings from "./de";

const enUserSettings = Utils.merge({}, _enUserSettings, enModal);
const frUserSettings = Utils.merge({}, _frUserSettings, frModal);
const deUserSettings = Utils.merge({}, _deUserSettings, deModal);

export { enUserSettings, frUserSettings, deUserSettings };
