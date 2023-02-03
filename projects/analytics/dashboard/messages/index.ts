import {Utils} from "@sinequa/core/base";
import _enDashboard from "./en";
import _frDashboard from "./fr";
import _deDashboard from "./de";

const enDashboard = Utils.merge({}, _enDashboard);
const frDashboard = Utils.merge({}, _frDashboard);
const deDashboard = Utils.merge({}, _deDashboard);

export { enDashboard, frDashboard, deDashboard };
