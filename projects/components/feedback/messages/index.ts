import {Utils} from "@sinequa/core/base";
import {enModal, frModal, deModal} from "@sinequa/components/modal";
import _enFeedback from "./en";
import _frFeedback from "./fr";
import _deFeedback from "./de";

const enFeedback = Utils.merge({}, _enFeedback, enModal);
const frFeedback = Utils.merge({}, _frFeedback, frModal);
const deFeedback = Utils.merge({}, _deFeedback, deModal);

export { enFeedback, frFeedback, deFeedback };
