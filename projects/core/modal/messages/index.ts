import {Utils} from "@sinequa/core/base";
import {enIntl, frIntl, deIntl} from "@sinequa/core/intl";
import _enModal from "./en";
import _frModal from "./fr";
import _deModal from "./de";

const enModal = Utils.merge({}, _enModal, enIntl);
const frModal = Utils.merge({}, _frModal, frIntl);
const deModal = Utils.merge({}, _deModal, deIntl);

export { enModal, frModal, deModal };
