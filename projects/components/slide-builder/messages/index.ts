import {Utils} from "@sinequa/core/base";

import _enSlideBuilder from "./en";
import _frSlideBuilder from "./fr";
import _deSlideBuilder from "./de";

const enSlideBuilder = Utils.merge({}, _enSlideBuilder);
const frSlideBuilder = Utils.merge({}, _frSlideBuilder);
const deSlideBuilder = Utils.merge({}, _deSlideBuilder);

export { enSlideBuilder, frSlideBuilder, deSlideBuilder };
