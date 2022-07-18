module.exports = {
  packages: {
    'ngx-vis': {
      ignorableDeepImportMatchers: [
        /vis-data\//,
        /vis-network\//,
        /vis-timeline\//
      ]
    },
  },
};