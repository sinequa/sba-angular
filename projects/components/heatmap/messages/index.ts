import {Utils} from "@sinequa/core/base";
import {enResultsView, frResultsView, deResultsView} from "@sinequa/components/results-view";
import {enSearch, frSearch, deSearch} from "@sinequa/components/search";
import _enHeatmap from "./en";
import _frHeatmap from "./fr";
import _deHeatmap from "./de";

const enHeatmap = Utils.merge({}, _enHeatmap, enResultsView, enSearch);
const frHeatmap = Utils.merge({}, _frHeatmap, frResultsView, frSearch);
const deHeatmap = Utils.merge({}, _deHeatmap, deResultsView, deSearch);

export { enHeatmap, frHeatmap, deHeatmap };
