export const QueryWebServiceFactory = () => ({
  getResults: (query, auditEvents, arg) => ({pipe: () => ({})}),
  getMultipleResults: (queries, auditEvents) => ({})
});
