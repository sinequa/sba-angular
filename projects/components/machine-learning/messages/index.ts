import { Utils } from '@sinequa/core/base';
import _enML from './en';
import _frML from './fr';

const enML = Utils.merge({}, _enML);
const frML = Utils.merge({}, _frML);

export { enML, frML };