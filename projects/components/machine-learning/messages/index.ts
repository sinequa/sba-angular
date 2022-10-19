import { Utils } from '@sinequa/core/base';
import _enML from './en';
import _frML from './fr';
import _deML from './de';

const enML = Utils.merge({}, _enML);
const frML = Utils.merge({}, _frML);
const deML = Utils.merge({}, _deML);

export { enML, frML, deML };