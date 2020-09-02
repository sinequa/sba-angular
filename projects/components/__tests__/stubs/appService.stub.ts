export const appServiceStub = () => ({
  events: {subscribe: f => f},
  ccquery: {
    name: "ccquery_name",
    tabSearch: {tabs: {find: () => ({})}},
    allowEmptySearch: false
  },
  defaultCCQuery: {name: "default_ccquery_name"},
  getCCQuery: name =>({name: "def"}),
  parseExpr: expression => ({field: {}, value: {}, not: {}}),
  resolveColumnAlias: () => {},
  getColumn: () => {}
});
