import {Query} from '@sinequa/core/app-utils';

export const SearchServiceFactory = () => ({
  search: () => {},
  isEmptySearchIgnoreSelects: () => {},
  isSearchRouteActive: () => true,
  query: new Query("test"),
})
