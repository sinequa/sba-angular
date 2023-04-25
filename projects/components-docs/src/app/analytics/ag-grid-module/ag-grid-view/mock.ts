export const mockAgGridColumns = [
    {
        headerName: "Appl",
        field: "app",
        filter: "agTextColumnFilter",
        tooltipField: "app",
    },
    {
        headerName: "Message",
        field: "message",
        filter: "agTextColumnFilter",
        tooltipField: "message",
    },
    {
        headerName: "Detail",
        field: "detail",
        filter: "agTextColumnFilter",
        tooltipField: "detail",
        flex: 1,
        wrapText: true,
        autoHeight: true,
        cellStyle: {
            "white-space": "normal",
            wordBreak: "normal",
        },
    },
];

export const mockAgGridDefaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
};

export const mockAgGridResults = {
    records: [
        {
            app: "insight",
            message: "content",
            detail: "Can you please add a synonym for accesslist <-> ACL",
            $hasPassages: false,
        },
        {
            app: "insight",
            message: "ui",
            detail:
                "I'd really love to see the group faced moved to individual widgets. It's only 3 of them and having to navigate in and out of the very frequently used modification date facet all the time is quite annoying.",
            $hasPassages: false,
        },
        {
            app: "insight",
            message: "content",
            detail:
                "Hi,   What about adding a sponsored link to  https://sinequa.atlassian.net/wiki/spaces/PRODUCT/pages/246906897/Dev+Alpha+Beta+GA+Features  for query terms like: alpha beta ga release version feature capability functionality update upgrade migration ...and others?  Kind regards Hermann",
            $hasPassages: false,
        },
        {
            app: "insight",
            message: "content",
            detail:
                'Can we filter out transition slides for PPT on Slide Search? Search for "NASA case study" and the first ~20 slides are all transition slides that say "Case Studies".  I\'ll be happy to help work out an algorithm to exclude these - we could filter on word count, but since we don\'t want to exclude slides that have graphics but only a few words, can we see the slide type? If we can exclude transition slides by type that would be ideal...',
            $hasPassages: false,
        },
        {
            app: "insight",
            message: "other",
            detail:
                'Some kind of bug: 1. Search for "case study marshall space" 2. See if you have a NASA case study with red bullets with the filename "Case studies manufacturing maintenance 11.22.pptx" 3. Open the file 4. No NASA slide in the file! Just one for Airbus and Siemens!  (interestingly, when I select the slide into the Slide Builder and download it, it is there...so is it linking to the wrong file?)',
            $hasPassages: false,
        },
        {
            app: "insight",
            message: "ui",
            detail:
                "I did a search for +bmc +footprints and clicked on the first Excel file. The preview shows 5 worksheet tabs (Summary, Finance, Pharma, Industry, and Other). When you click on one of these tabs, a new browser tab is opened with the single worksheet.  Is this how it should work?",
            $hasPassages: false,
        },
    ]
}