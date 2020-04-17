import {Utils} from "@sinequa/core/base";
import {enIntl, frIntl, deIntl} from "@sinequa/core/intl";
import {enModal, frModal, deModal} from "@sinequa/core/modal";
import {enValidation, frValidation, deValidation} from "@sinequa/core/validation";
import _enLogin from "./en";
import _frLogin from "./fr";
import _deLogin from "./de";

const enLogin = Utils.merge({}, _enLogin, enIntl, enModal, enValidation);
const frLogin = Utils.merge({}, _frLogin, frIntl, frModal, frValidation);
const deLogin = Utils.merge({}, _deLogin, deIntl, deModal, deValidation);

export { enLogin, frLogin, deLogin };
