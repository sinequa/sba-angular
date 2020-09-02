export const AGGREGATION_GEO = {
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

export const AGGREGATION_SIZE = {
  name: "Size",
  column: "size",
  isDistribution: true,
  valuesAreExpressions: true,
  isTree: false,
  items: [
    {
      "value": "size`< 10 Ko`:(>= 0 AND < 10240)",
      "display": "< 10 Ko",
      "count": 0,
      "$column": {
        "name": "size",
        "type": "integer",
        "typeModifier": null,
        "eType": 6,
        "eTypeModifier": 0,
        "aliases": [
          "size"
        ],
        "label": "msg#metadata.sizeLabel",
        "labelPlural": "msg#metadata.sizePluralLabel",
        "formatter": "memorysize"
      }
    },
    {
      "value": "size`10 Ko à 100 Ko`:(>= 10240 AND < 102400)",
      "display": "10 Ko à 100 Ko",
      "count": 82,
      "$column": {
        "name": "size",
        "type": "integer",
        "typeModifier": null,
        "eType": 6,
        "eTypeModifier": 0,
        "aliases": [
          "size"
        ],
        "label": "msg#metadata.sizeLabel",
        "labelPlural": "msg#metadata.sizePluralLabel",
        "formatter": "memorysize"
      },
      "$selected": true
    },
    {
      "value": "size`100 Ko à 1 Mo`:(>= 102400 AND < 1048576)",
      "display": "100 Ko à 1 Mo",
      "count": 805,
      "$column": {
        "name": "size",
        "type": "integer",
        "typeModifier": null,
        "eType": 6,
        "eTypeModifier": 0,
        "aliases": [
          "size"
        ],
        "label": "msg#metadata.sizeLabel",
        "labelPlural": "msg#metadata.sizePluralLabel",
        "formatter": "memorysize"
      },
      "$selected": true
    },
    {
      "value": "size`1 Mo à 10 Mo`:(>= 1048576 AND < 10485760)",
      "display": "1 Mo à 10 Mo",
      "count": 67,
      "$column": {
        "name": "size",
        "type": "integer",
        "typeModifier": null,
        "eType": 6,
        "eTypeModifier": 0,
        "aliases": [
          "size"
        ],
        "label": "msg#metadata.sizeLabel",
        "labelPlural": "msg#metadata.sizePluralLabel",
        "formatter": "memorysize"
      }
    },
    {
      "value": "size`> 10 Mo`:(>= 10485760 AND < 2147483646)",
      "display": "> 10 Mo",
      "count": 0,
      "$column": {
        "name": "size",
        "type": "integer",
        "typeModifier": null,
        "eType": 6,
        "eTypeModifier": 0,
        "aliases": [
          "size"
        ],
        "label": "msg#metadata.sizeLabel",
        "labelPlural": "msg#metadata.sizePluralLabel",
        "formatter": "memorysize"
      }
    }
  ]
};

export const AGGREGATION_TIMELINE = {
  "name": "Modified",
  "column": "modified",
  "isDistribution": true,
  "valuesAreExpressions": true,
  "items": [
    {
      "value": "modified`Depuis hier`:>= 2020-09-01",
      "display": "Depuis hier",
      "count": 57,
      "$column": {
        "name": "modified",
        "type": "datetime",
        "typeModifier": null,
        "eType": 3,
        "eTypeModifier": 0,
        "aliases": [
          "modified"
        ],
        "label": "msg#metadata.modifiedLabel",
        "labelPlural": "msg#metadata.modifiedPluralLabel"
      }
    },
    {
      "value": "modified`Cette semaine`:>= 2020-08-31",
      "display": "Cette semaine",
      "count": 542,
      "$column": {
        "name": "modified",
        "type": "datetime",
        "typeModifier": null,
        "eType": 3,
        "eTypeModifier": 0,
        "aliases": [
          "modified"
        ],
        "label": "msg#metadata.modifiedLabel",
        "labelPlural": "msg#metadata.modifiedPluralLabel"
      }
    },
    {
      "value": "modified`Ce mois ci`:>= 2020-09-01",
      "display": "Ce mois ci",
      "count": 57,
      "$column": {
        "name": "modified",
        "type": "datetime",
        "typeModifier": null,
        "eType": 3,
        "eTypeModifier": 0,
        "aliases": [
          "modified"
        ],
        "label": "msg#metadata.modifiedLabel",
        "labelPlural": "msg#metadata.modifiedPluralLabel"
      }
    },
    {
      "value": "modified`Cette année`:>= 2020-01-01",
      "display": "Cette année",
      "count": 936,
      "$column": {
        "name": "modified",
        "type": "datetime",
        "typeModifier": null,
        "eType": 3,
        "eTypeModifier": 0,
        "aliases": [
          "modified"
        ],
        "label": "msg#metadata.modifiedLabel",
        "labelPlural": "msg#metadata.modifiedPluralLabel"
      }
    },
    {
      "value": "modified`Avant cette année`:< 2020-01-01",
      "display": "Avant cette année",
      "count": 0,
      "$column": {
        "name": "modified",
        "type": "datetime",
        "typeModifier": null,
        "eType": 3,
        "eTypeModifier": 0,
        "aliases": [
          "modified"
        ],
        "label": "msg#metadata.modifiedLabel",
        "labelPlural": "msg#metadata.modifiedPluralLabel"
      }
    }
  ]
}

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