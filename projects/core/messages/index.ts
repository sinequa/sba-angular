import {Utils} from "@sinequa/core/base";
import {enLogin, frLogin, deLogin} from "@sinequa/core/login";

const enCore = Utils.merge({}, enLogin);
const frCore = Utils.merge({}, frLogin);
const deCore = Utils.merge({}, deLogin);

export { enCore, frCore, deCore };
