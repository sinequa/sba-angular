import {Utils} from "@sinequa/core/base";
import _enUtils from "./en";
import _frUtils from "./fr";
import _deUtils from "./de";

const enUtils = Utils.merge({}, _enUtils);
const frUtils = Utils.merge({}, _frUtils);
const deUtils = Utils.merge({}, _deUtils);

export { enUtils, frUtils, deUtils };
