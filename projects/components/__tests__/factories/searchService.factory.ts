import {Query} from '@sinequa/core/app-utils';

export const SearchServiceFactory = () => ({
  search: () => {},
  isEmptySearchIgnoreSelects: () => {},
  query: new Query("test"),
  mergeAdvanced: () => {}
})
