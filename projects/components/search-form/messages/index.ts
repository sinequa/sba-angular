import {Utils} from "@sinequa/core/base";
import _enSearchForm from "./en";
import _frSearchForm from "./fr";
import _deSearchForm from "./de";

const enSearchForm = Utils.merge({}, _enSearchForm);
const frSearchForm = Utils.merge({}, _frSearchForm);
const deSearchForm = Utils.merge({}, _deSearchForm);

export { enSearchForm, frSearchForm, deSearchForm };
