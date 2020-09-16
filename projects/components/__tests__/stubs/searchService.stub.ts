import {Query} from '@sinequa/core/app-utils';

export const searchServiceStub = () => ({
  search: () => {},
  isEmptySearchIgnoreSelects: () => {},
  query: new Query("test"),
  mergeAdvanced: () => {}
})
