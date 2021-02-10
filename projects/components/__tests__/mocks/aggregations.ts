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
      "$selected": false
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
      "$selected": false
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
      "$selected": false
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

export const AGGREGATION_CONCEPTS = {
  "name": "Concepts",
  "column": "concepts",
  "items": [
    {
      "value": "presidential campaign",
      "score": 33.93,
      "count": 53,
      "$selected": false
    },
    {
      "value": "White House",
      "score": 28.726,
      "count": 70,
      "$selected": false
    },
    {
      "value": "national security team",
      "score": 27.341,
      "count": 11,
      "$selected": false
    },
    {
      "value": "Senate Republicans",
      "score": 27.282,
      "count": 18,
      "$selected": false
    },
    {
      "value": "Tax Cuts",
      "score": 26.193,
      "count": 27,
      "$selected": false
    },
    {
      "value": "Democratic presidential primary",
      "score": 23.732,
      "count": 14,
      "$selected": false
    },
    {
      "value": "Affordable Care Act",
      "score": 23.237,
      "count": 28,
      "$selected": false
    },
    {
      "value": "Clinton administration",
      "score": 22.503,
      "count": 23,
      "$selected": false
    },
    {
      "value": "Republican Senator",
      "score": 22.463,
      "count": 27,
      "$selected": false
    },
    {
      "value": "first African American president",
      "score": 22.37,
      "count": 11,
      "$selected": false
    },
    {
      "value": "presidential candidate",
      "score": 21.773,
      "count": 37,
      "$selected": false
    }
  ]
}

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

export const AGGREGATION_BOOLEAN = {
  "name": "bool",
  "column": "sourcebool9",
  "items": [
    {
      "value": false,
      "count": 2104
    },
    {
      "value": true,
      "count": 55
    }
  ]
}
