import {Utils} from "@sinequa/core/base";
import _enGrid from "./en";
import _frGrid from "./fr";
import _deGrid from "./de";

const enGrid = Utils.merge({}, _enGrid);
const frGrid = Utils.merge({}, _frGrid);
const deGrid = Utils.merge({}, _deGrid);

export { enGrid, frGrid, deGrid };
