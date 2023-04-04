import { Basket } from "@sinequa/components/baskets";
import { RecentDocument, SavedQuery } from "@sinequa/components/saved-queries";
import { Query } from "@sinequa/core/app-utils";

export const baskets: Basket[] = [
    { name: 'basket 1' },
    { name: 'basket 2' },
];

export const savedQueries: SavedQuery[] = [
    {
        name: 'name 1',
        query: new Query('')
    },
    {
        name: 'name 2',
        query: new Query('')
    },
];

export const recentQueries: any[] = [
    {
        "query": {
            "name": "query",
            "text": "how to setup neural search",
            "tab": "all",
            "sort": "date",
            "filters": {
                "operator": "and",
                "filters": [
                    {
                        "display": "Web",
                        "field": "treepath",
                        "value": "\/Web\/*"
                    },
                    {
                        "display": "Charles Scharf",
                        "field": "person",
                        "value": "CHARLES SCHARF"
                    },
                    {
                        "display": "Bill Gates",
                        "field": "person",
                        "value": "BILL GATES"
                    }
                ]
            }
        },
        "date": "2023-02-23T10:31:52.000Z"
    }
];

export const recentDocuments: RecentDocument[] = [
    {
        id: 'id',
        title: 'title 1',
        url1: 'url',
        docformat: 'html',
        treepath: [],
        authors: [],
        date: new Date(),
        original: true
    },
    {
        id: 'id',
        title: 'title 2',
        url1: 'url',
        docformat: 'html',
        treepath: [],
        authors: [],
        date: new Date(),
        original: true
    }
];

export const USER_SETTINGS = {
    baskets,
    savedQueries,
    recentDocuments,
    recentQueries,
    "facets": [
        {
            "name": "facet1",
            "position": 0
        },
        {
            "name": "facet2",
            "position": 1
        },
        {
            "name": "facet3",
            "position": 2
        }
    ],
    "methodresult": "ok"
};