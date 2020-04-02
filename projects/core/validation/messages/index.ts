import {Utils} from "@sinequa/core/base";
import {enIntl, frIntl, deIntl} from "@sinequa/core/intl";
import _enValidation from "./en";
import _frValidation from "./fr";
import _deValidation from "./de";

const enValidation = Utils.merge({}, _enValidation, enIntl);
const frValidation = Utils.merge({}, _frValidation, frIntl);
const deValidation = Utils.merge({}, _deValidation, deIntl);

export { enValidation, frValidation, deValidation };
