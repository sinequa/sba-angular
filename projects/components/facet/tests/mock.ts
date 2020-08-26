export const AGGREGATION = {
  "name": "Geo",
  "column": "geo",
  "items": [
    {
      "value": "IRAQ",
      "display": "Iraq",
      "count": 50,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      },
      "$selected": true
    },
    {
      "value": "GUANTANAMO",
      "display": "Guantanamo",
      "count": 15,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "IOWA",
      "display": "Iowa",
      "count": 32,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "NEW HAMPSHIRE",
      "display": "New Hampshire",
      "count": 30,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "COLORADO",
      "display": "Colorado",
      "count": 41,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "AMERICA",
      "display": "America",
      "count": 81,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "ILLINOIS",
      "display": "Illinois",
      "count": 43,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "WASHINGTON",
      "display": "Washington",
      "count": 78,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "DISTRICT OF COLUMBIA",
      "display": "District of Columbia",
      "count": 27,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "INDIANA",
      "display": "Indiana",
      "count": 33,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    },
    {
      "value": "ARIZONA",
      "display": "Arizona",
      "count": 35,
      "$column": {
        "name": "geo",
        "type": "csv",
        "typeModifier": "cel",
        "eType": 15,
        "eTypeModifier": 2068,
        "aliases": [
          "geo"
        ],
        "label": "msg#metadata.geoLabel",
        "labelPlural": "msg#metadata.geoPluralLabel"
      }
    }
  ]
};

export const FACETS = [
  {
      name: "geo",
      title: "msg#facet.geo.title",
      type: "list",
      aggregation: "Geo",
      icon: "fas fa-globe-americas",
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
  },
  {
      name: "company",
      title: "msg#facet.company.title",
      type: "list",
      aggregation: "Company",
      icon: "fas fa-building",
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
  },
  {
      name: "person",
      title: "msg#facet.person.title",
      type: "list",
      aggregation: "Person",
      icon: "fas fa-user",
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
  },
  {
      name: "docformat",
      title: "msg#facet.docformat.title",
      type: "list",
      aggregation: "DocFormat",
      icon: "far fa-file-word",
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
  },
  {
      name: "modified",
      title: "msg#facet.modified.title",
      type: "list",
      aggregation: "Modified",
      icon: "fas fa-calendar-day",
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
  },
  {
      name: "size",
      title: "msg#facet.size.title",
      type: "list",
      aggregation: "Size",
      icon: "fas fa-sort-amount-up-alt",
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
  },
  {
      name: "documentlanguages",
      title: "msg#facet.documentlanguages.title",
      type: "list",
      aggregation: "DocumentLanguages",
      icon: "far fa-comment",
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
  },
  {
      name: "concepts",
      title: "msg#facet.concepts.title",
      type: "list",
      aggregation: "Concepts",
      icon: "fas fa-comment-dots",
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
  },
];