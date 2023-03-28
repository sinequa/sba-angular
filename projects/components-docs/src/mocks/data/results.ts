import { TermPresence } from "@sinequa/core/web-services";

const didYouMean: any = {
  spellingCorrectionMode: 'Correct',
  text: {
    original: 'original text',
    corrected: 'corrected text'
  }
};

const termspresence: TermPresence[] = [
  {
    "term": "Paris",
    "presence": "found"
  },
  {
    "term": "France",
    "presence": "missing"
  },
];

export const RESULTS = {
  didYouMean,
  "details": [
    {
      "statements": [
        "select distribution('docformat,basicforms=true,order=freqdesc,labels=true,wantnulls=true,post-group-by=true,merge-groups=true') as count_tab from index,test_data where text contains 'Paris' and docformat in ('*','html','htm','doc','docx','rtf','xls','xlsx','ppt','pptx','txt') and  synonyms='uk-us' and  reformulations='false' and  SearchParameters='dlang=autodetect;langw=en\/1.2\/fr\/1.1\/es\/1.0\/it\/1.0\/nl\/1.0\/ko\/0.8\/*\/0.9;scmode=Smart;mac=1000;mw=0' and  language='autodetect' and  concepts limit 100 and  globalrelevance>=40 and  wordsrelevance>=0 and  (CACHE (CHECKACLS('accesslists=\"accesslist1,accesslist2\",deniedlists=\"deniedlist1\"') FOR ('sinequa|S-1-5-21-2165854416-2067547654-1784818317-6903'))) skip 0 count 1 forget above 1"
      ],
      "attributes": {
        "cachehit": "1",
        "rowfetchtime": "0.01 ms",
        "processingtime": "1.21 ms",
        "count_tab.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"docformat\",\"type\":\"string\"},{\"name\":\"docformat\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "matchingrowcount": "7",
        "postgroupbymatchingrowcount": "7"
      }
    },
    {
      "statements": [
        "select searchguid('30967B90DA804DFB851E8A5D2A1C152B'),internalquerylog,id,databasealias,flags,globalrelevance,matchingpartnames,termspresence,internalqueryanalysis,documentweight, wordsrelevance, wordproximityrelevance, wordscorerelevance, wordcountrelevance, meaningrelevance,highlight(Text,'chunk=sentence\/window,count=10,context.window=3,offsets=true,separator=;,startmarker=\"{b}\",endmarker=\"{nb}\",remap=true,dedup=1, score=true') as extracts,matchlocations('remap=true,perpartname=true,partnames=title') as matchlocationsperpartname,title,documentlanguages,documentweight,authors,modified,indexationtime,version,keywords,size,treepath,filename,fileext,flags,collection,docformat,doctype,containerid,msgfrom,msgto,remap(person),remap(company),remap(geo),url1,url2,accesslist1,accesslist2,deniedlist1,sourcecsv1,sourcecsv2,sourcecsv3,sourcecsv4,sourcecsv5,sourcecsv6,sourcecsv7,sourcecsv8,sourcecsv9,sourcecsv10,sourcetree1,sourcetree2,sourcetree3,sourcetree4,sourcetree5,sourcestr1,sourcestr2,sourcestr3,sourcestr4,sourcestr5,sourcestr6,sourcestr7,sourcestr8,sourcestr9,sourcestr10,sourcevarchar1,sourcevarchar2,sourcevarchar3,sourcevarchar4,sourcevarchar5,sourcedatetime1,sourcedatetime2,sourcedatetime3,sourcedatetime4,sourcedatetime5,sourceint1,sourceint2,sourceint3,sourceint4,sourceint5,sourcedouble1,sourcedouble2,sourcedouble3,sourcedouble4,sourcedouble5,sourcebool1,sourcebool2,sourcebool3,sourcebool4,sourcebool5,remap(entity1),remap(entity2),remap(entity3),remap(entity4),remap(entity5),enginecsv1,enginecsv2,enginecsv3,enginecsv4,enginecsv5,engineusercsv1,engineusercsv2,engineusercsv3,engineusercsv4,engineusercsv5,distribution('size,bounds=\"0;10240;102400;1048576;10485760;2147483646\",order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true,count=11') as count_Size__005F_SizeDefault,concepts,distribution('matchingpartnames,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_MatchingPartnames,distribution('documentlanguages,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_DocumentLanguages,distribution('docformat,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_DocFormat,distribution('authors,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_Authors,distribution('doctype,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_DocType,distribution('fileext,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_FileExt,distribution('modified,bounds=\"2023-01-01;2023-03-01;2023-03-05;2023-03-06\",order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true,count=11') as count_Modified__005F_DateDefault,distribution('treepath,basicforms=false,labels=true,maxcount=20,minlevel=2,wantmore=true,order=labelasc,count-to-order=100,post-group-by=true,merge-groups=true') as count_Treepath,correlation('geo,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,order=scoredesc,post-group-by=true,merge-groups=true,limit=100') as correl_Geo,correlation('person,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,order=scoredesc,post-group-by=true,merge-groups=true,limit=100') as correl_Person,correlation('company,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,order=scoredesc,post-group-by=true,merge-groups=true,limit=100') as correl_Company,distribution('modified,basicforms=true,labels=false,order2=labelasc,order=keyasc,count-to-order=100,mask=YYYY-WW,post-group-by=true,merge-groups=true') as count_Timeline,distribution('sourcebool1,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggBool,distribution('sourceint1,count=4,basicforms=true,labels=false,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggInt,distribution('sourcedouble1,count=4,basicforms=true,labels=false,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggDouble,distribution('sourcedouble1,bounds=\"50;150\",order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true,count=11') as count_AggDoubleDist_Doubles,distribution('*,count=11,basicforms=true,labels=false,order2=labelasc,ops=min\/max\/sum\/avg\/stddev\/variance,value=sourcedouble1,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggDoubleRange,distribution('sourcedatetime1,bounds=\"2000-01-01;2015-01-01;2023-01-01\",order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true,count=11') as count_AggDateDist_Dates,distribution('*,count=11,basicforms=true,labels=false,order2=labelasc,ops=min\/max,value=sourcedatetime1,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggDateRange,distribution('sourcedatetime1,basicforms=true,labels=false,order2=labelasc,order=keyasc,count-to-order=100,mask=YYYY,post-group-by=true,merge-groups=true') as count_AggDateTimeline,distribution('sourcestr1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggString,distribution('sourcetree1,basicforms=false,labels=true,maxcount=200,minlevel=2,wantmore=true,order=labelasc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggTree,distribution('entity1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggEntity,distribution('entity2,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,count-to-order=100,post-group-by=true,merge-groups=true') as count_AggEntityNorm from index,test_data where text contains 'Paris' and docformat='*' and  synonyms='uk-us' and  reformulations='false' and  SearchParameters='dlang=autodetect;langw=en\/1.2\/fr\/1.1\/es\/1.0\/it\/1.0\/nl\/1.0\/ko\/0.8\/*\/0.9;scmode=Smart;mac=1000;mw=0' and  language='autodetect' and  concepts limit 100 and  globalrelevance>=40 and  wordsrelevance>=0 and  (CACHE (CHECKACLS('accesslists=\"accesslist1,accesslist2\",deniedlists=\"deniedlist1\"') FOR ('sinequa|S-1-5-21-2165854416-2067547654-1784818317-6903'))) order by globalrelevance desc skip 2 count 2"
      ],
      "attributes": {
        "cachehit": "1",
        "searchguid": "30967B90DA804DFB851E8A5D2A1C152B",
        "rowfetchtime": "0.01 ms",
        "processingtime": "2.44 ms",
        "concepts.schema": "{\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"value\",\"type\":\"string\"}]},{\"name\":\"score\",\"type\":\"number\"},{\"name\":\"count\",\"type\":\"number\"}]}",
        "extracts.schema": "{\"format\":\"StringWithSeparators\",\"separator\":\";\",\"startmarker\":\"{b}\",\"endmarker\":\"{nb}\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"Text\"}]},{\"name\":\"highlighted\",\"type\":\"string\"},{\"name\":\"locations\",\"type\":\"string\",\"subtype\":\"location\"},{\"name\":\"originalLocations\",\"type\":\"string\",\"subtype\":\"location\"},{\"name\":\"score\",\"type\":\"number\"}]}",
        "matchingrowcount": "7",
        "correl_geo.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"geo\",\"type\":\"string\"},{\"name\":\"geo\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggint.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourceint1\",\"type\":\"number\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "correl_person.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"person\",\"type\":\"string\"},{\"name\":\"person\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggbool.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcebool1\",\"type\":\"boolean\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggtree.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcetree1\",\"type\":\"string\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_authors.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"authors\",\"type\":\"string\"},{\"name\":\"authors\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_doctype.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"doctype\",\"type\":\"string\"},{\"name\":\"doctype\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_fileext.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"fileext\",\"type\":\"string\"},{\"name\":\"fileext\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "correl_company.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"company\",\"type\":\"string\"},{\"name\":\"company\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_timeline.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"modified\",\"type\":\"string\",\"format\":\"YYYY-WW\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_treepath.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"treepath\",\"type\":\"string\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggdouble.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcedouble1\",\"type\":\"number\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggentity.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"entity1\",\"type\":\"string\"},{\"name\":\"entity1\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggstring.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcestr1\",\"type\":\"string\"},{\"name\":\"sourcestr1\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_docformat.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"docformat\",\"type\":\"string\"},{\"name\":\"docformat\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggdaterange.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[]},{\"name\":\"count\",\"type\":\"number\"},{\"name\":\"ops\",\"type\":\"array\",\"fields\":[{\"name\":\"min\",\"type\":\"string\",\"format\":\"YYYY-MM-DD-HH-MM-SS\"},{\"name\":\"max\",\"type\":\"string\",\"format\":\"YYYY-MM-DD-HH-MM-SS\"}]}]}",
        "count_aggentitynorm.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"entity2\",\"type\":\"string\"},{\"name\":\"entity2\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggdoublerange.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[]},{\"name\":\"count\",\"type\":\"number\"},{\"name\":\"ops\",\"type\":\"array\",\"fields\":[{\"name\":\"min\",\"type\":\"number\"},{\"name\":\"max\",\"type\":\"number\"},{\"name\":\"sum\",\"type\":\"number\"},{\"name\":\"avg\",\"type\":\"number\"},{\"name\":\"stddev\",\"type\":\"number\"},{\"name\":\"variance\",\"type\":\"number\"}]}]}",
        "postgroupbymatchingrowcount": "7",
        "count_aggdatetimeline.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcedatetime1\",\"type\":\"string\",\"format\":\"YYYY\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_aggdatedist_dates.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_documentlanguages.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"DocumentLanguages\",\"type\":\"string\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_matchingpartnames.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"matchingpartnames\",\"type\":\"string\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
        "matchlocationsperpartname.schema": "{\"format\":\"JsonForPartnames\",\"separator\":\";\",\"innerseparator\":\",\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"MatchLocations\"}]},{\"name\":\"locations\",\"type\":\"string\",\"subtype\":\"location\"},{\"name\":\"originalLocations\",\"type\":\"string\",\"subtype\":\"location\"}]}",
        "count_aggdoubledist_doubles.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_size__005f_sizedefault.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"count\",\"type\":\"number\"}]}",
        "count_modified__005f_datedefault.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"count\",\"type\":\"number\"}]}"
      }
    }
  ],
  "tab": "all",
  "tabs": [
    {
      "name": "all",
      "display": "msg#results.results_all_tab",
      "value": "*",
      "count": 7
    },
    {
      "name": "html",
      "display": "Web",
      "value": "html,htm",
      "count": 7
    },
    {
      "name": "doc",
      "display": "Word",
      "value": "doc,docx,rtf",
      "count": 0
    },
    {
      "name": "xls",
      "display": "Excel",
      "value": "xls,xlsx",
      "count": 0
    },
    {
      "name": "ppt",
      "display": "PowerPoint",
      "value": "ppt,pptx",
      "count": 0
    },
    {
      "name": "txt",
      "display": "msg#results.results_text_tab",
      "value": "txt",
      "count": 0
    }
  ],
  "aggregations": [
    {
      "name": "Concepts",
      "column": "concepts"
    },
    {
      "name": "Geo",
      "column": "geo",
      "items": [
        {
          "value": "PARIS",
          "display": "Paris",
          "count": 7
        },
        {
          "value": "ASIA",
          "display": "Asia",
          "count": 7
        },
        {
          "value": "DUBLIN",
          "display": "Dublin",
          "count": 4
        },
        {
          "value": "IRAQ",
          "display": "Iraq",
          "count": 3
        },
        {
          "value": "PANAMA",
          "display": "Panama",
          "count": 3
        },
        {
          "value": "DELAWARE",
          "display": "Delaware",
          "count": 3
        },
        {
          "value": "DISTRICT OF COLUMBIA",
          "display": "District of Columbia",
          "count": 3
        },
        {
          "value": "FIJI",
          "display": "Fiji",
          "count": 3
        },
        {
          "value": "NEW ORLEANS",
          "display": "New Orleans",
          "count": 3
        },
        {
          "value": "SOVIET UNION",
          "display": "Soviet Union",
          "count": 3
        },
        {
          "value": "IRAN",
          "display": "Iran",
          "count": 4
        }
      ]
    },
    {
      "name": "AggInt",
      "column": "sourceint1",
      "items": [
        {
          "value": null,
          "count": 7
        }
      ]
    },
    {
      "name": "Person",
      "column": "person",
      "items": [
        {
          "value": "GEORGE WASHINGTON",
          "display": "George Washington",
          "count": 2
        },
        {
          "value": "JOHN TRUMBULL",
          "display": "John Trumbull",
          "count": 2
        },
        {
          "value": "THOMAS JEFFERSON",
          "display": "Thomas Jefferson",
          "count": 2
        },
        {
          "value": "WOODROW WILSON",
          "display": "Woodrow Wilson",
          "count": 2
        },
        {
          "value": "ABRAHAM LINCOLN",
          "display": "Abraham Lincoln",
          "count": 2
        },
        {
          "value": "ALEXANDER GRAHAM BELL",
          "display": "Alexander Graham Bell",
          "count": 2
        },
        {
          "value": "NOAM CHOMSKY",
          "display": "Noam Chomsky",
          "count": 2
        },
        {
          "value": "RONALD REAGAN",
          "display": "Ronald Reagan",
          "count": 2
        },
        {
          "value": "THEODORE ROOSEVELT",
          "display": "Theodore Roosevelt",
          "count": 2
        },
        {
          "value": "FRANKLIN D. ROOSEVELT",
          "display": "Franklin D. Roosevelt",
          "count": 2
        },
        {
          "value": "STEPHEN ELOP",
          "display": "Stephen Elop",
          "count": 2
        }
      ]
    },
    {
      "name": "AggBool",
      "column": "sourcebool1",
      "items": [
        {
          "value": null,
          "count": 7
        }
      ]
    },
    {
      "name": "AggTree",
      "column": "sourcetree1",
      "isTree": true
    },
    {
      "name": "Authors",
      "column": "authors"
    },
    {
      "name": "DocType",
      "column": "doctype"
    },
    {
      "name": "FileExt",
      "column": "fileext",
      "items": [
        {
          "value": "htm",
          "display": "htm",
          "count": 7
        }
      ]
    },
    {
      "name": "Company",
      "column": "company",
      "items": [
        {
          "value": "NEW YORK STOCK EXCHANGE",
          "display": "New York Stock Exchange",
          "count": 4
        },
        {
          "value": "NYSE",
          "display": "NYSE",
          "count": 4
        },
        {
          "value": "AIR FORCE",
          "display": "Air Force",
          "count": 3
        },
        {
          "value": "REUTERS",
          "display": "Reuters",
          "count": 5
        },
        {
          "value": "FUJITSU",
          "display": "Fujitsu",
          "count": 3
        },
        {
          "value": "ADVANCED MICRO DEVICES",
          "display": "Advanced Micro Devices",
          "count": 2
        },
        {
          "value": "AMERICAN AIRLINES",
          "display": "American Airlines",
          "count": 2
        },
        {
          "value": "LG ELECTRONICS",
          "display": "LG Electronics",
          "count": 2
        },
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post",
          "count": 4
        },
        {
          "value": "YAHOO!",
          "display": "Yahoo!",
          "count": 5
        },
        {
          "value": "GOOGLE",
          "display": "Google",
          "count": 7
        }
      ]
    },
    {
      "name": "Timeline",
      "column": "modified",
      "items": [
        {
          "value": "2020-W45",
          "count": 7
        }
      ]
    },
    {
      "name": "Treepath",
      "column": "treepath",
      "isTree": true,
      "count": 7,
      "hasChildren": true,
      "items": [
        {
          "value": "Web",
          "count": 7,
          "hasChildren": false
        }
      ]
    },
    {
      "name": "AggDouble",
      "column": "sourcedouble1",
      "items": [
        {
          "value": null,
          "count": 7
        }
      ]
    },
    {
      "name": "AggEntity",
      "column": "entity1"
    },
    {
      "name": "AggString",
      "column": "sourcestr1"
    },
    {
      "name": "DocFormat",
      "column": "docformat",
      "items": [
        {
          "value": "htm",
          "display": "htm",
          "count": 7
        }
      ]
    },
    {
      "name": "AggDateRange",
      "column": "sourcedatetime1",
      "items": [
        {
          "count": 7,
          "operatorResults": {
            "min": "",
            "max": ""
          }
        }
      ]
    },
    {
      "name": "AggEntityNorm",
      "column": "entity2"
    },
    {
      "name": "AggDoubleRange",
      "column": "sourcedouble1",
      "items": [
        {
          "count": 7,
          "operatorResults": {
            "min": 0,
            "max": 0,
            "sum": 0,
            "avg": 0,
            "stddev": 0,
            "variance": 0
          }
        }
      ]
    },
    {
      "name": "AggDateTimeline",
      "column": "sourcedatetime1",
      "items": [
        {
          "value": "",
          "count": 7
        }
      ]
    },
    {
      "name": "AggDateDist",
      "column": "sourcedatetime1",
      "isDistribution": true,
      "valuesAreExpressions": true
    },
    {
      "name": "DocumentLanguages",
      "column": "documentlanguages",
      "items": [
        {
          "value": "en",
          "count": 7
        }
      ]
    },
    {
      "name": "MatchingPartnames",
      "column": "matchingpartnames",
      "items": [
        {
          "value": "text",
          "count": 7
        }
      ]
    },
    {
      "name": "AggDoubleDist",
      "column": "sourcedouble1",
      "isDistribution": true,
      "valuesAreExpressions": true
    },
    {
      "name": "Size",
      "column": "size",
      "isDistribution": true,
      "valuesAreExpressions": true,
      "items": [
        {
          "value": "size`< 10 Kb[fr]< 10 Ko`:(>= 0 AND < 10240)",
          "display": "< 10 Kb[fr]< 10 Ko",
          "count": 0
        },
        {
          "value": "size`10 Kb to 100 Kb[fr]10 Ko \u00e0 100 Ko`:(>= 10240 AND < 102400)",
          "display": "10 Kb to 100 Kb[fr]10 Ko \u00e0 100 Ko",
          "count": 0
        },
        {
          "value": "size`100 Kb to 1 Mb[fr]100 Ko \u00e0 1 Mo`:(>= 102400 AND < 1048576)",
          "display": "100 Kb to 1 Mb[fr]100 Ko \u00e0 1 Mo",
          "count": 6
        },
        {
          "value": "size`1 Mb to 10 Mb[fr]1 Mo \u00e0 10 Mo`:(>= 1048576 AND < 10485760)",
          "display": "1 Mb to 10 Mb[fr]1 Mo \u00e0 10 Mo",
          "count": 1
        },
        {
          "value": "size`> 10 Mb[fr]> 10 Mo`:(>= 10485760 AND < 2147483646)",
          "display": "> 10 Mb[fr]> 10 Mo",
          "count": 0
        }
      ]
    },
    {
      "name": "Modified",
      "column": "modified",
      "isDistribution": true,
      "valuesAreExpressions": true,
      "items": [
        {
          "value": "modified`Since yesterday[fr]Depuis hier`:>= 2023-03-05",
          "display": "Since yesterday[fr]Depuis hier",
          "count": 0
        },
        {
          "value": "modified`This week[fr]Cette semaine`:>= 2023-03-06",
          "display": "This week[fr]Cette semaine",
          "count": 0
        },
        {
          "value": "modified`This month[fr]Ce mois ci`:>= 2023-03-01",
          "display": "This month[fr]Ce mois ci",
          "count": 0
        },
        {
          "value": "modified`This year[fr]Cette ann\u00e9e`:>= 2023-01-01",
          "display": "This year[fr]Cette ann\u00e9e",
          "count": 0
        },
        {
          "value": "modified`Before this year[fr]Avant cette ann\u00e9e`:< 2023-01-01",
          "display": "Before this year[fr]Avant cette ann\u00e9e",
          "count": 7
        }
      ]
    }
  ],
  "id": "2478133872E04857855C248C59AA1CE2",
  "queryName": "query",
  "rowCount": 30,
  "totalRowCount": 30,
  "cursorRowCount": 2,
  "page": 3,
  "pageSize": 2,
  "columnCount": 104,
  "groupBy": null,
  "hasRelevance": true,
  "sort": "relevance",
  "attributes": {
    "cachehit": "1",
    "searchguid": "30967B90DA804DFB851E8A5D2A1C152B",
    "rowfetchtime": "0.01 ms",
    "processingtime": "2.44 ms",
    "concepts.schema": "{\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"value\",\"type\":\"string\"}]},{\"name\":\"score\",\"type\":\"number\"},{\"name\":\"count\",\"type\":\"number\"}]}",
    "extracts.schema": "{\"format\":\"StringWithSeparators\",\"separator\":\";\",\"startmarker\":\"{b}\",\"endmarker\":\"{nb}\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"Text\"}]},{\"name\":\"highlighted\",\"type\":\"string\"},{\"name\":\"locations\",\"type\":\"string\",\"subtype\":\"location\"},{\"name\":\"originalLocations\",\"type\":\"string\",\"subtype\":\"location\"},{\"name\":\"score\",\"type\":\"number\"}]}",
    "matchingrowcount": "7",
    "correl_geo.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"geo\",\"type\":\"string\"},{\"name\":\"geo\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggint.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourceint1\",\"type\":\"number\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "correl_person.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"person\",\"type\":\"string\"},{\"name\":\"person\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggbool.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcebool1\",\"type\":\"boolean\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggtree.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcetree1\",\"type\":\"string\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_authors.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"authors\",\"type\":\"string\"},{\"name\":\"authors\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_doctype.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"doctype\",\"type\":\"string\"},{\"name\":\"doctype\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_fileext.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"fileext\",\"type\":\"string\"},{\"name\":\"fileext\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "correl_company.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"company\",\"type\":\"string\"},{\"name\":\"company\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_timeline.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"modified\",\"type\":\"string\",\"format\":\"YYYY-WW\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_treepath.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"treepath\",\"type\":\"string\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggdouble.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcedouble1\",\"type\":\"number\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggentity.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"entity1\",\"type\":\"string\"},{\"name\":\"entity1\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggstring.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcestr1\",\"type\":\"string\"},{\"name\":\"sourcestr1\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_docformat.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"docformat\",\"type\":\"string\"},{\"name\":\"docformat\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggdaterange.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[]},{\"name\":\"count\",\"type\":\"number\"},{\"name\":\"ops\",\"type\":\"array\",\"fields\":[{\"name\":\"min\",\"type\":\"string\",\"format\":\"YYYY-MM-DD-HH-MM-SS\"},{\"name\":\"max\",\"type\":\"string\",\"format\":\"YYYY-MM-DD-HH-MM-SS\"}]}]}",
    "count_aggentitynorm.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"entity2\",\"type\":\"string\"},{\"name\":\"entity2\",\"type\":\"string\",\"subtype\":\"label\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggdoublerange.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[]},{\"name\":\"count\",\"type\":\"number\"},{\"name\":\"ops\",\"type\":\"array\",\"fields\":[{\"name\":\"min\",\"type\":\"number\"},{\"name\":\"max\",\"type\":\"number\"},{\"name\":\"sum\",\"type\":\"number\"},{\"name\":\"avg\",\"type\":\"number\"},{\"name\":\"stddev\",\"type\":\"number\"},{\"name\":\"variance\",\"type\":\"number\"}]}]}",
    "postgroupbymatchingrowcount": "7",
    "count_aggdatetimeline.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"sourcedatetime1\",\"type\":\"string\",\"format\":\"YYYY\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_aggdatedist_dates.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_documentlanguages.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"DocumentLanguages\",\"type\":\"string\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_matchingpartnames.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"matchingpartnames\",\"type\":\"string\"}]},{\"name\":\"count\",\"type\":\"number\"}]}",
    "matchlocationsperpartname.schema": "{\"format\":\"JsonForPartnames\",\"separator\":\";\",\"innerseparator\":\",\",\"schema\":[{\"name\":\"columns\",\"type\":\"array\",\"fields\":[{\"name\":\"MatchLocations\"}]},{\"name\":\"locations\",\"type\":\"string\",\"subtype\":\"location\"},{\"name\":\"originalLocations\",\"type\":\"string\",\"subtype\":\"location\"}]}",
    "count_aggdoubledist_doubles.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_size__005f_sizedefault.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"count\",\"type\":\"number\"}]}",
    "count_modified__005f_datedefault.schema": "{\"separator\":\";\",\"innerseparator\":\";\",\"schema\":[{\"name\":\"count\",\"type\":\"number\"}]}"
  },
  "records": [
    {
      "id": "\/Web\/Wiki\/|https:\/\/en.wikipedia.org\/wiki\/Internet",
      "databasealias": "index",
      "flags": [
        "h"
      ],
      "globalrelevance": 0.78713,
      "matchingpartnames": [
        "text"
      ],
      termspresence,
      "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/402px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
      "documentweight": "default",
      "wordsrelevance": "0.787109",
      "wordproximityrelevance": "1",
      "wordscorerelevance": "0.391602",
      "wordcountrelevance": "1",
      "meaningrelevance": "1",
      "extracts": [
        {
          "highlighted": "Entities at the heart of censorship and surveillance , Reporters Without Borders ({b}Paris{nb}), 11 March 2014.",
          "locations": "101989,104",
          "originalLocations": "358479,107",
          "score": "65536"
        },
        {
          "highlighted": "^ Internet Enemies , Reporters Without Borders ({b}Paris{nb}), 12 March 2012",
          "locations": "102119,69",
          "originalLocations": "358729,282",
          "score": "65536"
        }
      ],
      "matchlocationsperpartname": [
        {
          "matchlocations": [

          ]
        }
      ],
      "title": "Internet - Wikipedia",
      "language": [
        "en"
      ],
      "modified": "2020-11-05 11:10:47",
      "indexationtime": "2020-11-05 17:59:25",
      "version": "ZvTqLft4gF\/WhLkMfzBNCA==",
      "size": 519425,
      "treepath": [
        "\/Web\/"
      ],
      "filename": "Internet",
      "fileext": "htm",
      "collection": [
        "\/Web\/Wiki\/"
      ],
      "docformat": "htm",
      "person": [
        {
          "value": "PAUL BARAN",
          "display": "Paul Baran",
          "count": 3,
          "locations": "7503,10",
          "originalLocations": "43691,10"
        },
        {
          "value": "TIM BERNERS",
          "display": "Tim Berners",
          "count": 3,
          "locations": "11292,11",
          "originalLocations": "55771,11"
        },
        {
          "value": "ANDREW KEEN",
          "display": "Andrew Keen",
          "count": 2,
          "locations": "64487,11",
          "originalLocations": "172381,11"
        },
        {
          "value": "BOB KAHN",
          "display": "Bob Kahn",
          "count": 2,
          "locations": "9182,8",
          "originalLocations": "48046,8"
        },
        {
          "value": "DAVE SPOHN",
          "display": "Dave Spohn",
          "count": 2,
          "locations": "96092,10",
          "originalLocations": "323242,10"
        },
        {
          "value": "DONALD DAVIES",
          "display": "Donald Davies",
          "count": 2,
          "locations": "7553,13",
          "originalLocations": "43797,13"
        },
        {
          "value": "ALEXANDER GRAHAM BELL",
          "display": "Alexander Graham Bell",
          "count": 1,
          "locations": "110985,21",
          "originalLocations": "428483,21"
        },
        {
          "value": "ALEXANDER STEPANOVICH POPOV",
          "display": "Alexander Stepanovich Popov",
          "count": 1,
          "locations": "111450,27",
          "originalLocations": "430868,27"
        },
        {
          "value": "ALFRED VAIL",
          "display": "Alfred Vail",
          "count": 1,
          "locations": "111560,11",
          "originalLocations": "431392,11"
        },
        {
          "value": "ANTONIO MEUCCI",
          "display": "Antonio Meucci",
          "count": 1,
          "locations": "111399,14",
          "originalLocations": "430587,14"
        },
        {
          "value": "ARIEL FUTTER",
          "display": "Ariel Futter",
          "count": 1,
          "locations": "88530,12",
          "originalLocations": "275820,12"
        },
        {
          "value": "BEN SEGAL",
          "display": "Ben Segal",
          "count": 1,
          "locations": "82545,9",
          "originalLocations": "237291,9"
        },
        {
          "value": "BETH SIMONE",
          "display": "Beth Simone",
          "count": 1,
          "locations": "98464,11",
          "originalLocations": "337771,11"
        },
        {
          "value": "BILL STEWART",
          "display": "Bill Stewart",
          "count": 1,
          "locations": "77501,12",
          "originalLocations": "205828,12"
        },
        {
          "value": "CAMILLE TISSOT",
          "display": "Camille Tissot",
          "count": 1,
          "locations": "111544,14",
          "originalLocations": "431316,14"
        },
        {
          "value": "CARL SUNSHINE",
          "display": "Carl Sunshine",
          "count": 1,
          "locations": "81413,13",
          "originalLocations": "231423,13"
        },
        {
          "value": "CAROLE HUGHES",
          "display": "Carole Hughes",
          "count": 1,
          "locations": "96259,13",
          "originalLocations": "324080,13"
        },
        {
          "value": "CERF",
          "display": "Cerf",
          "count": 1,
          "locations": "82217,4",
          "originalLocations": "235017,4"
        },
        {
          "value": "CHANDRA BOSE",
          "display": "Chandra Bose",
          "count": 1,
          "locations": "111034,12",
          "originalLocations": "428680,12"
        },
        {
          "value": "CHARLES K. KAO",
          "display": "Charles K. Kao",
          "count": 1,
          "locations": "111291,14",
          "originalLocations": "430059,14"
        }
      ],
      "company": [
        {
          "value": "GOOGLE",
          "display": "Google",
          "count": 10,
          "locations": "22438,6",
          "originalLocations": "82552,6"
        },
        {
          "value": "FACEBOOK",
          "display": "Facebook",
          "count": 7,
          "locations": "25288,8",
          "originalLocations": "89090,8"
        },
        {
          "value": "MICROSOFT",
          "display": "Microsoft",
          "count": 4,
          "locations": "36390,9",
          "originalLocations": "118347,9"
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times",
          "count": 4,
          "locations": "67408,14",
          "originalLocations": "179195,14"
        },
        {
          "value": "IBM",
          "display": "IBM",
          "count": 3,
          "locations": "108962,3",
          "originalLocations": "412198,3"
        },
        {
          "value": "ORACLE",
          "display": "Oracle",
          "count": 3,
          "locations": "109006,6",
          "originalLocations": "412501,6"
        },
        {
          "value": "TWITTER",
          "display": "Twitter",
          "count": 3,
          "locations": "55123,7",
          "originalLocations": "157211,7"
        },
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post",
          "count": 2,
          "locations": "76813,15",
          "originalLocations": "204207,15"
        },
        {
          "value": "APPLE",
          "display": "Apple",
          "count": 1,
          "locations": "36456,5",
          "originalLocations": "118727,5"
        },
        {
          "value": "AT&T",
          "display": "AT&T",
          "count": 1,
          "locations": "84999,4",
          "originalLocations": "255151,8"
        },
        {
          "value": "BLOOMBERG",
          "display": "Bloomberg",
          "count": 1,
          "locations": "86973,9",
          "originalLocations": "269453,9"
        },
        {
          "value": "COMSCORE",
          "display": "comScore",
          "count": 1,
          "locations": "97752,8",
          "originalLocations": "332410,8"
        },
        {
          "value": "FUJITSU",
          "display": "Fujitsu",
          "count": 1,
          "locations": "109618,7",
          "originalLocations": "416832,7"
        },
        {
          "value": "LINKEDIN",
          "display": "LinkedIn",
          "count": 1,
          "locations": "55446,8",
          "originalLocations": "157623,8"
        },
        {
          "value": "MCGRAW-HILL",
          "display": "McGraw-Hill",
          "count": 1,
          "locations": "82380,11",
          "originalLocations": "235922,11"
        },
        {
          "value": "NETFLIX",
          "display": "Netflix",
          "count": 1,
          "locations": "104151,7",
          "originalLocations": "371297,7"
        },
        {
          "value": "NOKIA",
          "display": "Nokia",
          "count": 1,
          "locations": "72172,5",
          "originalLocations": "188894,5"
        },
        {
          "value": "SIEMENS",
          "display": "Siemens",
          "count": 1,
          "locations": "72149,10",
          "originalLocations": "188831,10"
        },
        {
          "value": "SRI\/SURGICAL EXPRESS",
          "display": "SRI\/Surgical Express",
          "count": 1,
          "locations": "8157,17",
          "originalLocations": "45458,17"
        },
        {
          "value": "WORKSPACE",
          "display": "Workspace",
          "count": 1,
          "locations": "108925,9",
          "originalLocations": "411979,9"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States",
          "count": 15,
          "locations": "2277,13",
          "originalLocations": "25487,13"
        },
        {
          "value": "ASIA",
          "display": "Asia",
          "count": 9,
          "locations": "16255,4",
          "originalLocations": "68083,4"
        },
        {
          "value": "CHINA",
          "display": "China",
          "count": 8,
          "locations": "45997,5",
          "originalLocations": "135916,5"
        },
        {
          "value": "EUROPE",
          "display": "Europe",
          "count": 7,
          "locations": "10052,6",
          "originalLocations": "52397,6"
        },
        {
          "value": "AFRICA",
          "display": "Africa",
          "count": 6,
          "locations": "16172,6",
          "originalLocations": "67712,6"
        },
        {
          "value": "AUSTRALIA",
          "display": "Australia",
          "count": 4,
          "locations": "10060,9",
          "originalLocations": "52405,9"
        },
        {
          "value": "EGYPT",
          "display": "Egypt",
          "count": 4,
          "locations": "67543,5",
          "originalLocations": "179392,5"
        },
        {
          "value": "INDIA",
          "display": "India",
          "count": 4,
          "locations": "25092,5",
          "originalLocations": "88677,5"
        },
        {
          "value": "LONDON",
          "display": "London",
          "count": 4,
          "locations": "8879,6",
          "originalLocations": "47226,6"
        },
        {
          "value": "UNITED KINGDOM",
          "display": "United Kingdom",
          "count": 4,
          "locations": "62802,7",
          "originalLocations": "168527,7"
        },
        {
          "value": "LATIN AMERICA",
          "display": "Latin America",
          "count": 3,
          "locations": "16411,13",
          "originalLocations": "68572,13"
        },
        {
          "value": "NEW YORK",
          "display": "New York",
          "count": 3,
          "locations": "21936,8",
          "originalLocations": "81455,8"
        },
        {
          "value": "SWEDEN",
          "display": "Sweden",
          "count": 3,
          "locations": "8809,6",
          "originalLocations": "47017,6"
        },
        {
          "value": "TORONTO",
          "display": "Toronto",
          "count": 3,
          "locations": "21965,7",
          "originalLocations": "81609,7"
        },
        {
          "value": "UK",
          "display": "UK",
          "count": 3,
          "locations": "20093,2",
          "originalLocations": "77238,2"
        },
        {
          "value": "ARMENIA",
          "display": "Armenia",
          "count": 2,
          "locations": "74591,7",
          "originalLocations": "197573,7"
        },
        {
          "value": "CALIFORNIA",
          "display": "California",
          "count": 2,
          "locations": "8218,10",
          "originalLocations": "45660,10"
        },
        {
          "value": "CAMBRIDGE",
          "display": "Cambridge",
          "count": 2,
          "locations": "95284,9",
          "originalLocations": "318225,9"
        },
        {
          "value": "CHICAGO",
          "display": "Chicago",
          "count": 2,
          "locations": "22006,7",
          "originalLocations": "81801,7"
        },
        {
          "value": "COLOMBIA",
          "display": "Colombia",
          "count": 2,
          "locations": "24708,8",
          "originalLocations": "88068,8"
        }
      ],
      "url1": "https:\/\/en.wikipedia.org\/wiki\/Internet",
      "rank": 2,
      "relevantExtracts": "Entities at the heart of censorship and surveillance , Reporters Without Borders (<b>Paris<\/b>), 11 March 2014.... ^ Internet Enemies , Reporters Without Borders (<b>Paris<\/b>), 12 March 2012"
    },
    {
      "id": "\/Web\/Wiki\/|https:\/\/en.wikipedia.org\/wiki\/LinkedIn",
      "databasealias": "index",
      "flags": [
        "h"
      ],
      "globalrelevance": 0.786222,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "Paris",
          "presence": "found"
        }
      ],
      "documentweight": "default",
      "wordsrelevance": "0.786133",
      "wordproximityrelevance": "1",
      "wordscorerelevance": "0.38916",
      "wordcountrelevance": "1",
      "meaningrelevance": "1",
      "extracts": [
        {
          "highlighted": "Founded in Mountain View, California , LinkedIn is currently headquartered in Sunnyvale, California , with 33 global offices in Omaha , Chicago , Los Angeles , New York , Washington, D.C. , S\u00e3o Paulo , London , Dublin , Amsterdam , Graz , Milan , {b}Paris{nb} , Munich , Madrid , Stockholm , Singapore , Hong Kong , China , Japan , Australia , Canada , India and Dubai .",
          "locations": "3318,363",
          "originalLocations": "25843,2107",
          "score": "65536"
        }
      ],
      "matchlocationsperpartname": [
        {
          "matchlocations": [

          ]
        }
      ],
      "title": "LinkedIn - Wikipedia",
      "language": [
        "en"
      ],
      "modified": "2020-11-05 16:50:58",
      "indexationtime": "2020-11-05 17:59:36",
      "version": "d4pOutHDcBfq0O57sMaQ7g==",
      "size": 438782,
      "treepath": [
        "\/Web\/"
      ],
      "filename": "LinkedIn",
      "fileext": "htm",
      "collection": [
        "\/Web\/Wiki\/"
      ],
      "docformat": "htm",
      "person": [
        {
          "value": "JEFF WEINER",
          "display": "Jeff Weiner",
          "count": 9,
          "locations": "1000,11",
          "originalLocations": "13025,11"
        },
        {
          "value": "REID HOFFMAN",
          "display": "Reid Hoffman",
          "count": 7,
          "locations": "812,12",
          "originalLocations": "12003,12"
        },
        {
          "value": "RYAN ROSLANSKY",
          "display": "Ryan Roslansky",
          "count": 5,
          "locations": "888,14",
          "originalLocations": "12363,14"
        },
        {
          "value": "SATYA NADELLA",
          "display": "Satya Nadella",
          "count": 3,
          "locations": "8610,13",
          "originalLocations": "42984,13"
        },
        {
          "value": "BILL GATES",
          "display": "Bill Gates",
          "count": 2,
          "locations": "25229,10",
          "originalLocations": "94694,10"
        },
        {
          "value": "INGRID LUNDEN",
          "display": "Ingrid Lunden",
          "count": 2,
          "locations": "63818,13",
          "originalLocations": "272982,13"
        },
        {
          "value": "JEAN-LUC VAILLANT",
          "display": "Jean-Luc Vaillant",
          "count": 2,
          "locations": "864,17",
          "originalLocations": "12250,17"
        },
        {
          "value": "KONSTANTIN GUERICKE",
          "display": "Konstantin Guericke",
          "count": 2,
          "locations": "836,19",
          "originalLocations": "12168,19"
        },
        {
          "value": "MELISSA SELCHER",
          "display": "Melissa Selcher",
          "count": 2,
          "locations": "916,15",
          "originalLocations": "12467,15"
        },
        {
          "value": "RACHEL KING",
          "display": "Rachel King",
          "count": 2,
          "locations": "64077,11",
          "originalLocations": "273940,11"
        },
        {
          "value": "SINA WEIBO",
          "display": "Sina Weibo",
          "count": 2,
          "locations": "77162,10",
          "originalLocations": "370099,10"
        },
        {
          "value": "ADAM MAIDA",
          "display": "Adam Maida",
          "count": 1,
          "locations": "49576,10",
          "originalLocations": "177900,10"
        },
        {
          "value": "AMANDA K. DAMARIN",
          "display": "Amanda K. Damarin",
          "count": 1,
          "locations": "33718,17",
          "originalLocations": "110437,17"
        },
        {
          "value": "AMY HOOD",
          "display": "Amy Hood",
          "count": 1,
          "locations": "74105,8",
          "originalLocations": "343861,8"
        },
        {
          "value": "ANASTASIA SANTORENEOS",
          "display": "Anastasia Santoreneos",
          "count": 1,
          "locations": "25575,21",
          "originalLocations": "95619,21"
        },
        {
          "value": "ANNIKA WILCOX",
          "display": "Annika Wilcox",
          "count": 1,
          "locations": "33759,13",
          "originalLocations": "110478,13"
        },
        {
          "value": "ARIANNA HUFFINGTON",
          "display": "Arianna Huffington",
          "count": 1,
          "locations": "25114,18",
          "originalLocations": "94212,18"
        },
        {
          "value": "ARNE SORENSON",
          "display": "Arne Sorenson",
          "count": 1,
          "locations": "74011,13",
          "originalLocations": "343266,13"
        },
        {
          "value": "CESAR CERNUDA",
          "display": "C\u00e9sar Cernuda",
          "count": 1,
          "locations": "74198,13",
          "originalLocations": "344562,14"
        },
        {
          "value": "CHARLES NOSKI",
          "display": "Charles Noski",
          "count": 1,
          "locations": "73903,13",
          "originalLocations": "342668,13"
        }
      ],
      "company": [
        {
          "value": "LINKEDIN",
          "display": "LinkedIn",
          "count": 405,
          "locations": "0,8",
          "originalLocations": "101,8"
        },
        {
          "value": "MICROSOFT",
          "display": "Microsoft",
          "count": 30,
          "locations": "1093,21",
          "originalLocations": "13522,21"
        },
        {
          "value": "FACEBOOK",
          "display": "Facebook",
          "count": 12,
          "locations": "11752,8",
          "originalLocations": "57137,8"
        },
        {
          "value": "GOOGLE",
          "display": "Google",
          "count": 9,
          "locations": "1191,6",
          "originalLocations": "14117,6"
        },
        {
          "value": "FORBES",
          "display": "Forbes",
          "count": 8,
          "locations": "31342,6",
          "originalLocations": "106708,6"
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times",
          "count": 6,
          "locations": "4307,14",
          "originalLocations": "29984,14"
        },
        {
          "value": "YAHOO!",
          "display": "Yahoo!",
          "count": 6,
          "locations": "62040,6",
          "originalLocations": "263760,6"
        },
        {
          "value": "REUTERS",
          "display": "Reuters",
          "count": 5,
          "locations": "49435,7",
          "originalLocations": "176095,7"
        },
        {
          "value": "GERON",
          "display": "Geron",
          "count": 3,
          "locations": "51478,5",
          "originalLocations": "193438,5"
        },
        {
          "value": "BLOOMBERG",
          "display": "Bloomberg",
          "count": 2,
          "locations": "47943,9",
          "originalLocations": "165422,9"
        },
        {
          "value": "DELL",
          "display": "Dell",
          "count": 2,
          "locations": "39279,4",
          "originalLocations": "120417,4"
        },
        {
          "value": "NEW YORK STOCK EXCHANGE",
          "display": "New York Stock Exchange",
          "count": 2,
          "locations": "6760,23",
          "originalLocations": "39023,23"
        },
        {
          "value": "NYSE",
          "display": "NYSE",
          "count": 2,
          "locations": "4863,4",
          "originalLocations": "32330,4"
        },
        {
          "value": "TWITTER",
          "display": "Twitter",
          "count": 2,
          "locations": "23606,7",
          "originalLocations": "90728,7"
        },
        {
          "value": "AMAZON",
          "display": "Amazon",
          "count": 1,
          "locations": "43585,10",
          "originalLocations": "131055,10"
        },
        {
          "value": "APPLE",
          "display": "Apple",
          "count": 1,
          "locations": "75310,5",
          "originalLocations": "356242,5"
        },
        {
          "value": "ARBEL",
          "display": "Arbel",
          "count": 1,
          "locations": "50589,5",
          "originalLocations": "185878,5"
        },
        {
          "value": "CRM",
          "display": "CRM",
          "count": 1,
          "locations": "51536,11",
          "originalLocations": "193642,11"
        },
        {
          "value": "HANCOCK",
          "display": "Hancock",
          "count": 1,
          "locations": "73136,7",
          "originalLocations": "332107,7"
        },
        {
          "value": "MERCK",
          "display": "Merck",
          "count": 1,
          "locations": "48911,5",
          "originalLocations": "172431,5"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States",
          "count": 26,
          "locations": "4324,2",
          "originalLocations": "30004,2"
        },
        {
          "value": "CHINA",
          "display": "China",
          "count": 14,
          "locations": "3627,5",
          "originalLocations": "27577,5"
        },
        {
          "value": "CALIFORNIA",
          "display": "California",
          "count": 9,
          "locations": "711,10",
          "originalLocations": "11420,10"
        },
        {
          "value": "RUSSIA",
          "display": "Russia",
          "count": 7,
          "locations": "8200,6",
          "originalLocations": "42267,6"
        },
        {
          "value": "SAN FRANCISCO",
          "display": "San Francisco",
          "count": 7,
          "locations": "6455,13",
          "originalLocations": "37846,13"
        },
        {
          "value": "DUBLIN",
          "display": "Dublin",
          "count": 5,
          "locations": "3529,6",
          "originalLocations": "26899,6"
        },
        {
          "value": "INDIA",
          "display": "India",
          "count": 5,
          "locations": "3664,5",
          "originalLocations": "27868,5"
        },
        {
          "value": "AUSTRALIA",
          "display": "Australia",
          "count": 4,
          "locations": "3643,9",
          "originalLocations": "27723,9"
        },
        {
          "value": "JAPAN",
          "display": "Japan",
          "count": 4,
          "locations": "3635,5",
          "originalLocations": "27646,5"
        },
        {
          "value": "MOUNTAIN VIEW",
          "display": "Mountain View",
          "count": 4,
          "locations": "695,13",
          "originalLocations": "11355,13"
        },
        {
          "value": "NEW YORK",
          "display": "New York",
          "count": 4,
          "locations": "3478,8",
          "originalLocations": "26574,8"
        },
        {
          "value": "CANADA",
          "display": "Canada",
          "count": 3,
          "locations": "3655,6",
          "originalLocations": "27798,6"
        },
        {
          "value": "FRANCE",
          "display": "France",
          "count": 3,
          "locations": "28123,6",
          "originalLocations": "99717,6"
        },
        {
          "value": "GERMANY",
          "display": "Germany",
          "count": 3,
          "locations": "28131,7",
          "originalLocations": "99725,7"
        },
        {
          "value": "STAMFORD",
          "display": "Stamford",
          "count": 3,
          "locations": "57710,8",
          "originalLocations": "247740,8"
        },
        {
          "value": "SYRIA",
          "display": "Syria",
          "count": 3,
          "locations": "41630,5",
          "originalLocations": "126346,5"
        },
        {
          "value": "ASIA",
          "display": "Asia",
          "count": 2,
          "locations": "5850,4",
          "originalLocations": "35411,4"
        },
        {
          "value": "BELGIUM",
          "display": "Belgium",
          "count": 2,
          "locations": "31803,7",
          "originalLocations": "107907,7"
        },
        {
          "value": "BINGLEY",
          "display": "Bingley",
          "count": 2,
          "locations": "67081,7",
          "originalLocations": "287976,7"
        },
        {
          "value": "BRAZIL",
          "display": "Brazil",
          "count": 2,
          "locations": "28100,6",
          "originalLocations": "99694,6"
        }
      ],
      "url1": "https:\/\/en.wikipedia.org\/wiki\/LinkedIn",
      "rank": 3,
      "relevantExtracts": "Founded in Mountain View, California , LinkedIn is currently ... , Dublin , Amsterdam , Graz , Milan , <b>Paris <\/b>, Munich , Madrid , Stockholm , Singapore , ... Japan , Australia , Canada , India and Dubai "
    },
    {
      "id": "\/I_NS1_Internet\/I_Sinequa\/|https:\/\/www.sinequa.com\/assets\/videos\/digital-business-collaboration-making-knowledge-discoverable\/",
      "databasealias": "I_NS1_Sinequa_Website",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 1.919175,
      "matchingpartnames": [
        "text",
        "title"
      ],
      "termspresence": [
        {
          "term": "CEO",
          "presence": "found"
        },
        {
          "term": "Sinequa",
          "presence": "found"
        }
      ],
      "documentweight": "default",
      "wordsrelevance": "0.919434",
      "wordproximityrelevance": "0.904785",
      "wordscorerelevance": "0.811035",
      "wordcountrelevance": "2",
      "meaningrelevance": "1",
      "extracts": [
        {
          "highlighted": "Listen to Alexandre Bilger, {b}Sinequa{nb}'s {b}CEO{nb}, and discover how {b}Sinequa{nb} is continuously innovating with its new solutions and capabilities.",
          "locations": "3487,135",
          "originalLocations": "114586,135",
          "score": "65280"
        },
        {
          "highlighted": "Making Knowledge Discoverable - {b}Sinequa{nb}",
          "locations": "4349,39,37,39",
          "originalLocations": "135757,39,917,39",
          "score": "4480"
        },
        {
          "highlighted": "Discover the power of {b}Sinequa{nb}",
          "locations": "4210,29",
          "originalLocations": "128692,29",
          "score": "1344"
        },
        {
          "highlighted": "{b}Sinequa{nb} on Github",
          "locations": "270,17,1692,17",
          "originalLocations": "24581,17,90977,17",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} University",
          "locations": "305,18,1727,18",
          "originalLocations": "25316,18,91984,18",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} Overflow",
          "locations": "325,16,1747,16",
          "originalLocations": "25696,16,92490,16",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} for Azure",
          "locations": "438,17,1115,17",
          "originalLocations": "30253,17,63972,17",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} Partners",
          "locations": "774,16",
          "originalLocations": "38766,16",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} Partners \u2192",
          "locations": "1533,18",
          "originalLocations": "84579,134",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} at Digital Business Collaboration Europe 2021 - the digital event around innovative digital collaboration tools and platforms.",
          "locations": "1991,134",
          "originalLocations": "107708,136",
          "score": "896"
        }
      ],
      "matchlocationsperpartname": [
        {
          "matchlocations": [
            {
              "partname": "title",
              "data": "4381,7;135789,7"
            }
          ]
        }
      ],
      "matchingpassages": {
        "schemas": [
          {
            "function": "matchlocations",
            "schema": {
              "format": "StringWithSeparators",
              "separator": ";",
              "innerseparator": ",",
              "schema": [
                {
                  "name": "columns",
                  "type": "array",
                  "fields": [
                    {
                      "name": "MatchLocations"
                    }
                  ]
                },
                {
                  "name": "locations",
                  "type": "string",
                  "subtype": "location"
                }
              ]
            }
          }
        ],
        "passages": [
          {
            "id": 3,
            "score": 0.9995,
            "rm.score": 0.9995,
            "kw.score": 0.85375,
            "vect.score": 0.09936,
            "location": [
              2839,
              813
            ],
            "rlocation": [
              108866,
              6914
            ],
            "matchlocations": "2843,7,2966,7,3103,7,3275,7,3468,7,3515,7,3525,3,3547,7",
            "highlightedText": "how <span class=\"matchlocations\">Sinequa<\/span>'s Intelligent Search Platform helps to access information in a single source  how others like Soci\u00e9t\u00e9 G\u00e9n\u00e9rale use <span class=\"matchlocations\">Sinequa<\/span> as part of their Intranet solution to improve productivity  how the partnership with Microsoft supports our customers to provide <span class=\"matchlocations\">Sinequa<\/span> within MS Teams  Alana Cento  Sr. Product Marketing Manager at  Watch the video now  \"Digital Business Collaboration: Making Knowledge Discoverable\"  Discover what <span class=\"matchlocations\">Sinequa<\/span> can do for your business.  Let's have a quick overview of the benefits that our product can give to your company.  Contact us  Get started  Related videos.  Replay Inform Online 2022 - <span class=\"matchlocations\">Sinequa<\/span>'s Roadmap  Listen to Alexandre Bilger, <span class=\"matchlocations\">Sinequa<\/span>'s <span class=\"matchlocations\">CEO<\/span>, and discover how <span class=\"matchlocations\">Sinequa<\/span> is continuously innovating with its new solutions and capabilities.  Play video  KM World Keynote"
          }
        ]
      },
      "title": "Digital Business Collaboration 2021: Making Knowledge Discoverable - Sinequa",
      "language": [
        "en"
      ],
      "modified": "2022-08-01 10:33:18",
      "indexationtime": "2022-08-01 10:33:18",
      "version": "ifWX520M4\/8hhnBTIUQVIw==",
      "size": 135633,
      "treepath": [
        "\/Internet\/www.sinequa.com\/"
      ],
      "filename": "file.htm",
      "fileext": "htm",
      "collection": [
        "\/I_NS1_Internet\/I_Sinequa\/"
      ],
      "docformat": "Web",
      "person": [
        {
          "value": "MARTIN SAUNDERS",
          "display": "Martin Saunders",
          "count": 2
        },
        {
          "value": "ALANA CENTO",
          "display": "Alana Cento",
          "count": 1
        },
        {
          "value": "ALEXANDRE BILGER",
          "display": "Alexandre Bilger",
          "count": 1
        },
        {
          "value": "SCOTT PARKER",
          "display": "Scott Parker",
          "count": 1
        }
      ],
      "company": [
        {
          "value": "SINEQUA",
          "display": "Sinequa",
          "count": 25
        },
        {
          "value": "MICROSOFT",
          "display": "Microsoft",
          "count": 1
        },
        {
          "value": "SOCIETE GENERALE",
          "display": "Soci\u00e9t\u00e9 G\u00e9n\u00e9rale",
          "count": 1
        }
      ],
      "geo": [
        {
          "value": "EUROPE",
          "display": "Europe",
          "count": 1
        },
        {
          "value": "LONDON",
          "display": "London",
          "count": 1
        },
        {
          "value": "UNITED KINGDOM",
          "display": "United Kingdom",
          "count": 1
        }
      ],
      "wordcount": 479,
      "exacthash": "80h4rsbtoW6epE6c5nmbWg==",
      "nearhash": "ZR9Cr73dmhfZyZQGCXl1SA==",
      "partnamelocations": [
        {
          "value": "title",
          "display": "title",
          "count": 1
        }
      ],
      "url1": "https:\/\/www.sinequa.com\/assets\/videos\/digital-business-collaboration-making-knowledge-discoverable\/",
      "rank": 9,
      "displayTitle": "Digital Business Collaboration 2021: Making Knowledge Discoverable - <span class=\"match-highlight\">Sinequa<\/span>",
      "relevantExtracts": "Listen to Alexandre Bilger, <b>Sinequa<\/b>&#39;s <b>CEO<\/b>, and discover how <b>Sinequa <\/b>is continuously innovating ... capabilities.... Making Knowledge Discoverable - <b>Sinequa<\/b>... Discover the power of <b>Sinequa<\/b>... <b>Sinequa <\/b>... Github... <b>Sinequa <\/b>University... <b>Sinequa <\/b>Overflow... <b>Sinequa <\/b>... Azure... <b>Sinequa <\/b>... <b>Sinequa <\/b>... <b>Sinequa <\/b>at Digital Business "
    },
    {
      "id": "\/I_NS1_Internet\/I_Sinequa\/|https:\/\/www.sinequa.com\/press\/sinequa-brings-intelligent-search-to-microsoft-teams\/",
      "databasealias": "I_NS1_Sinequa_Website",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 1.919646,
      "matchingpartnames": [
        "text",
        "title"
      ],
      "termspresence": [
        {
          "term": "CEO",
          "presence": "found"
        },
        {
          "term": "Sinequa",
          "presence": "found"
        }
      ],
      "documentweight": "default",
      "wordsrelevance": "0.919922",
      "wordproximityrelevance": "1",
      "wordscorerelevance": "0.771729",
      "wordcountrelevance": "2",
      "meaningrelevance": "1",
      "extracts": [
        {
          "highlighted": "said Alexandre Bilger, {b}CEO{nb} of {b}Sinequa{nb}.",
          "locations": "5554,38",
          "originalLocations": "111515,38",
          "score": "112046"
        },
        {
          "highlighted": "{b}Sinequa{nb} Brings Intelligent Search to Microsoft Teams - {b}Sinequa{nb}",
          "locations": "7643,62",
          "originalLocations": "145461,62",
          "score": "4480"
        },
        {
          "highlighted": "Unleash the power of {b}Sinequa{nb}",
          "locations": "3252,28",
          "originalLocations": "108651,28",
          "score": "1344"
        },
        {
          "highlighted": "Building on our partnership with Microsoft and the recent release of {b}Sinequa{nb} for Azure, we are now the only leading enterprise search vendor to bring advanced Insight Apps easily accessible from Teams.",
          "locations": "5118,201",
          "originalLocations": "111074,201",
          "score": "1344"
        },
        {
          "highlighted": "Discover the power of {b}Sinequa{nb}",
          "locations": "7541,29",
          "originalLocations": "138435,29",
          "score": "1344"
        },
        {
          "highlighted": "{b}Sinequa{nb} on Github",
          "locations": "256,17",
          "originalLocations": "24161,17",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} University",
          "locations": "291,18",
          "originalLocations": "24896,18",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} Overflow",
          "locations": "311,16",
          "originalLocations": "25276,16",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} for Azure",
          "locations": "424,17",
          "originalLocations": "29832,17",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} Partners",
          "locations": "760,16",
          "originalLocations": "38345,16",
          "score": "896"
        }
      ],
      "matchlocationsperpartname": [
        {
          "matchlocations": [
            {
              "partname": "title",
              "data": "7643,7,7698,7;145461,7,145516,7"
            }
          ]
        }
      ],
      "matchingpassages": {
        "schemas": [
          {
            "function": "matchlocations",
            "schema": {
              "format": "StringWithSeparators",
              "separator": ";",
              "innerseparator": ",",
              "schema": [
                {
                  "name": "columns",
                  "type": "array",
                  "fields": [
                    {
                      "name": "MatchLocations"
                    }
                  ]
                },
                {
                  "name": "locations",
                  "type": "string",
                  "subtype": "location"
                }
              ]
            }
          }
        ],
        "passages": [
          {
            "id": 7,
            "score": 0.99952,
            "rm.score": 0.99952,
            "kw.score": 0.85791,
            "location": [
              5116,
              616
            ],
            "rlocation": [
              111068,
              5679
            ],
            "matchlocations": "5187,7,5577,3,5584,7,5621,7,5654,15,5696,7,5724,7",
            "highlightedText": "\" Building on our partnership with Microsoft and the recent release of <span class=\"matchlocations\">Sinequa<\/span> for Azure, we are now the only leading enterprise search vendor to bring advanced Insight Apps easily accessible from Teams. It is a natural evolution of our platform based on customer demand. Teams is also a highly customizable environment that will open endless possibilities for our partners to build a new user experience for Microsoft Teams customers. \" said Alexandre Bilger, <span class=\"matchlocations\">CEO<\/span> of <span class=\"matchlocations\">Sinequa<\/span>.  For more information about <span class=\"matchlocations\">Sinequa<\/span> for Teams, please visit: <span class=\"matchlocations\">www.sinequa.com<\/span>\/product-enterprise-search\/<span class=\"matchlocations\">sinequa<\/span>-for-teams\/ .  About <span class=\"matchlocations\">Sinequa<\/span>."
          }
        ]
      },
      "title": "Sinequa Brings Intelligent Search to Microsoft Teams - Sinequa",
      "language": [
        "en"
      ],
      "modified": "2022-08-01 10:32:54",
      "indexationtime": "2022-08-01 10:32:54",
      "version": "RDymrVIulFg9ERSqVj+g5Q==",
      "size": 145374,
      "treepath": [
        "\/Internet\/www.sinequa.com\/"
      ],
      "filename": "file.htm",
      "fileext": "htm",
      "collection": [
        "\/I_NS1_Internet\/I_Sinequa\/"
      ],
      "docformat": "Web",
      "person": [
        {
          "value": "ALEXANDRE BILGER",
          "display": "Alexandre Bilger",
          "count": 1
        },
        {
          "value": "PATRICK METAIREAU",
          "display": "Patrick M\u00e9taireau",
          "count": 1
        }
      ],
      "company": [
        {
          "value": "SINEQUA",
          "display": "Sinequa",
          "count": 44
        },
        {
          "value": "MICROSOFT",
          "display": "Microsoft",
          "count": 15
        },
        {
          "value": "AZURE",
          "display": "Azure",
          "count": 1
        }
      ],
      "geo": [
        {
          "value": "FRANCE",
          "display": "France",
          "count": 1
        },
        {
          "value": "NETHERLANDS",
          "display": "Netherlands",
          "count": 1
        },
        {
          "value": "NEW YORK",
          "display": "New York",
          "count": 1
        },
        {
          "value": "PARIS",
          "display": "Paris",
          "count": 1
        },
        {
          "value": "UNITED STATES",
          "display": "United States",
          "count": 1
        }
      ],
      "wordcount": 832,
      "exacthash": "oKclCA5dpUAB2LwYPa7M7Q==",
      "nearhash": "bvF4e1tvPpmJRiRP63pV+A==",
      "partnamelocations": [
        {
          "value": "title",
          "display": "title",
          "count": 1
        }
      ],
      "url1": "https:\/\/www.sinequa.com\/press\/sinequa-brings-intelligent-search-to-microsoft-teams\/",
      "rank": 8,
      "displayTitle": "<span class=\"match-highlight\">Sinequa<\/span> Brings Intelligent Search to Microsoft Teams - <span class=\"match-highlight\">Sinequa<\/span>",
      "relevantExtracts": "said Alexandre Bilger, <b>CEO <\/b>of <b>Sinequa<\/b>... <b>Sinequa <\/b>Brings Intelligent Search ... Microsoft Teams - <b>Sinequa<\/b>... Unleash the power of <b>Sinequa<\/b>... Building on our ... recent release of <b>Sinequa <\/b>for Azure, we ... Teams.... Discover the power of <b>Sinequa<\/b>... <b>Sinequa <\/b>... Github... <b>Sinequa <\/b>University... <b>Sinequa <\/b>Overflow... <b>Sinequa <\/b>... Azure... <b>Sinequa <\/b>"
    },
    {
      "id": "\/I_NS1_Internet\/I_Sinequa\/|https:\/\/www.sinequa.com\/assets\/videos\/ambient-search-for-the-modern-digital-workplace\/",
      "databasealias": "I_NS1_Sinequa_Website",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 1.945172,
      "matchingpartnames": [
        "text",
        "title"
      ],
      "termspresence": [
        {
          "term": "CEO",
          "presence": "found"
        },
        {
          "term": "Sinequa",
          "presence": "found"
        }
      ],
      "documentweight": "default",
      "wordsrelevance": "0.945313",
      "wordproximityrelevance": "1",
      "wordscorerelevance": "0.843994",
      "wordcountrelevance": "2",
      "meaningrelevance": "1",
      "extracts": [
        {
          "highlighted": "Sit down with Enterprise Search experts Martin White, Managing Director of Intranet Focus, and Alexandre Bilger, {b}CEO{nb} of {b}Sinequa{nb}.",
          "locations": "3623,128",
          "originalLocations": "116149,128",
          "score": "112046"
        },
        {
          "highlighted": "Listen to Alexandre Bilger, {b}Sinequa{nb}'s {b}CEO{nb}, and discover how {b}Sinequa{nb} is continuously innovating with its new solutions and capabilities.",
          "locations": "3812,135",
          "originalLocations": "117475,135",
          "score": "65280"
        },
        {
          "highlighted": "{b}Sinequa{nb}",
          "locations": "4361,7,61,7",
          "originalLocations": "136024,7,928,7",
          "score": "4480"
        },
        {
          "highlighted": "Discover the power of {b}Sinequa{nb}",
          "locations": "4198,29",
          "originalLocations": "128935,29",
          "score": "1344"
        },
        {
          "highlighted": "{b}Sinequa{nb} on Github",
          "locations": "262,17",
          "originalLocations": "24763,17",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} University",
          "locations": "297,18",
          "originalLocations": "25498,18",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} Overflow",
          "locations": "317,16",
          "originalLocations": "25878,16",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} for Azure",
          "locations": "430,17,1107,17",
          "originalLocations": "30435,17,64154,17",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} Partners",
          "locations": "766,16",
          "originalLocations": "38948,16",
          "score": "896"
        },
        {
          "highlighted": "{b}Sinequa{nb} Partners \u2192",
          "locations": "1525,18",
          "originalLocations": "84761,134",
          "score": "896"
        }
      ],
      "matchlocationsperpartname": [
        {
          "matchlocations": [
            {
              "partname": "title",
              "data": "4361,7;136024,7"
            }
          ]
        }
      ],
      "matchingpassages": {
        "schemas": [
          {
            "function": "matchlocations",
            "schema": {
              "format": "StringWithSeparators",
              "separator": ";",
              "innerseparator": ",",
              "schema": [
                {
                  "name": "columns",
                  "type": "array",
                  "fields": [
                    {
                      "name": "MatchLocations"
                    }
                  ]
                },
                {
                  "name": "locations",
                  "type": "string",
                  "subtype": "location"
                }
              ]
            }
          }
        ],
        "passages": [
          {
            "id": 6,
            "score": 0.99969,
            "rm.score": 0.99969,
            "kw.score": 0.86376,
            "location": [
              3812,
              556
            ],
            "rlocation": [
              117475,
              18556
            ],
            "matchlocations": "3840,7,3850,3,3872,7,4135,7,4220,7,4248,7,4361,7",
            "highlightedText": "Listen to Alexandre Bilger, <span class=\"matchlocations\">Sinequa<\/span>'s <span class=\"matchlocations\">CEO<\/span>, and discover how <span class=\"matchlocations\">Sinequa<\/span> is continuously innovating with its new solutions and capabilities.  Play video  Product  Company  Industries  Career  Solutions  Resources  Blog  Assets  Events  Press  Webinars  Help center  Download center  Technical documentation  The Partner Corner  <span class=\"matchlocations\">Sinequa<\/span> University  Technical forum  Customer support  Github  Discover the power of <span class=\"matchlocations\">Sinequa<\/span>  Get started  @2022 <span class=\"matchlocations\">Sinequa<\/span>. All rights reserved | Privacy policy  \u202e\u2064\u202d  Forrester: Ambient Search for the Modern Digital Workplace | <span class=\"matchlocations\">Sinequa<\/span>"
          }
        ]
      },
      "title": "Forrester: Ambient Search for the Modern Digital Workplace | Sinequa",
      "language": [
        "en"
      ],
      "modified": "2022-08-01 10:34:40",
      "indexationtime": "2022-08-01 10:34:40",
      "version": "wF3Oa6DB\/gwm5ov7cmjj2w==",
      "size": 135876,
      "treepath": [
        "\/Internet\/www.sinequa.com\/"
      ],
      "filename": "file.htm",
      "fileext": "htm",
      "collection": [
        "\/I_NS1_Internet\/I_Sinequa\/"
      ],
      "docformat": "Web",
      "person": [
        {
          "value": "ALEXANDRE BILGER",
          "display": "Alexandre Bilger",
          "count": 2
        },
        {
          "value": "MARTIN WHITE",
          "display": "Martin White",
          "count": 1
        },
        {
          "value": "MIKE GAULTIERI",
          "display": "Mike Gaultieri",
          "count": 1
        }
      ],
      "company": [
        {
          "value": "SINEQUA",
          "display": "Sinequa",
          "count": 21
        }
      ],
      "wordcount": 469,
      "exacthash": "yfCIYJDm8Ng42n2mHV9cPA==",
      "nearhash": "urrj2LhsodLTHM4NZxLe+Q==",
      "partnamelocations": [
        {
          "value": "title",
          "display": "title",
          "count": 1
        }
      ],
      "url1": "https:\/\/www.sinequa.com\/assets\/videos\/ambient-search-for-the-modern-digital-workplace\/",
      "rank": 1,
      "displayTitle": "Forrester: Ambient Search for the Modern Digital Workplace | <span class=\"match-highlight\">Sinequa<\/span>",
      "relevantExtracts": "Sit down with ... and Alexandre Bilger, <b>CEO <\/b>of <b>Sinequa<\/b>... Listen to Alexandre Bilger, <b>Sinequa<\/b>&#39;s <b>CEO<\/b>, and discover how <b>Sinequa <\/b>is continuously innovating ... capabilities.... <b>Sinequa<\/b>... Discover the power of <b>Sinequa<\/b>... <b>Sinequa <\/b>... Github... <b>Sinequa <\/b>University... <b>Sinequa <\/b>Overflow... <b>Sinequa <\/b>... Azure... <b>Sinequa <\/b>Partners... <b>Sinequa <\/b>Partners "
    },
    {
      "id": "\/I_NS1_Tools\/I_Confluence\/|1398145029",
      "databasealias": "I_NS1_Confluence",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 1.936338,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "CEO",
          "presence": "found"
        },
        {
          "term": "Sinequa",
          "presence": "found"
        }
      ],
      "documentweight": "default",
      "wordsrelevance": "0.936523",
      "wordproximityrelevance": "1",
      "wordscorerelevance": "0.818604",
      "wordcountrelevance": "2",
      "meaningrelevance": "1",
      "extracts": [
        {
          "highlighted": "Who is the {b}CEO{nb} of {b}Sinequa{nb}?",
          "locations": "1600,26",
          "originalLocations": "9703,26",
          "score": "165793"
        },
        {
          "highlighted": "{b}CEO{nb}\", \"Name\" :",
          "locations": "1333,14,2352,14,3577,14",
          "originalLocations": "9146,37,11685,41,14952,39",
          "score": "32640"
        },
        {
          "highlighted": "{b}CEO{nb}\", \"weight\" :",
          "locations": "2142,16",
          "originalLocations": "11087,39",
          "score": "32640"
        },
        {
          "highlighted": "{b}CEO{nb}\", \"language\" :",
          "locations": "2225,18",
          "originalLocations": "11270,41",
          "score": "32640"
        },
        {
          "highlighted": "{b}CEO{nb}\" }, { \"text\" :",
          "locations": "2275,18,2295,21",
          "originalLocations": "11417,65,11489,68",
          "score": "32640"
        },
        {
          "highlighted": "{b}ceo{nb}\" } ], \"slots\" :",
          "locations": "2318,19",
          "originalLocations": "11564,60",
          "score": "28560"
        },
        {
          "highlighted": "{b}Sinequa{nb}\", \"Name\" :",
          "locations": "1433,18",
          "originalLocations": "9368,41",
          "score": "0"
        },
        {
          "highlighted": "{b}Sinequa{nb}\", \"weight\" :",
          "locations": "2609,20",
          "originalLocations": "12353,43",
          "score": "0"
        },
        {
          "highlighted": "{b}Sinequa{nb}\", \"language\" :",
          "locations": "2696,22",
          "originalLocations": "12540,45",
          "score": "0"
        },
        {
          "highlighted": "{b}Sinequa{nb}\" } ], \"entities\" :",
          "locations": "2750,26",
          "originalLocations": "12691,67",
          "score": "0"
        }
      ],
      "matchlocationsperpartname": [
        {
          "matchlocations": [

          ]
        }
      ],
      "matchingpassages": {
        "schemas": [
          {
            "function": "matchlocations",
            "schema": {
              "format": "StringWithSeparators",
              "separator": ";",
              "innerseparator": ",",
              "schema": [
                {
                  "name": "columns",
                  "type": "array",
                  "fields": [
                    {
                      "name": "MatchLocations"
                    }
                  ]
                },
                {
                  "name": "locations",
                  "type": "string",
                  "subtype": "location"
                }
              ]
            }
          }
        ],
        "passages": [
          {
            "id": 3,
            "score": 0.99974,
            "rm.score": 0.99974,
            "kw.score": 0.90795,
            "location": [
              1450,
              634
            ],
            "rlocation": [
              9408,
              1489
            ],
            "matchlocations": "1611,3,1618,7",
            "highlightedText": ": \"company\", \"Offset\" : 18, \"Length\" : 7, \"Score\" : 0.944759786128998 } ], \"ServingTime\" : \"31 ms\" }, \"queryAnalysis\" : { \"initial\" : true, \"text\" : \"Who is the <span class=\"matchlocations\">CEO<\/span> of <span class=\"matchlocations\">Sinequa<\/span>?\", \"queryLanguage\" : \"en\", \"elements\" : [ { \"text\" : \"Who\", \"weight\" : 1, \"offset\" : 0, \"length\" : 3, \"stopword\" : true, \"baseform\" : \"who\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"who\" } ] }, { \"text\" : \"is\", \"weight\" : 1, \"offset\" : 4, \"length\" : 2, \"stopword\" : true, \"baseform\" : \"be\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"be\" } ] }, { \"text\" : \"the\", \"weight\" : 1, \"offset\" : 7, \"length\" : 3, \"stopword\" : true, \"baseform\" : \"the\", \"language\""
          },
          {
            "id": 6,
            "score": 0.62031,
            "rm.score": 0.62031,
            "kw.score": 0.90869,
            "location": [
              2211,
              624
            ],
            "rlocation": [
              11241,
              1681
            ],
            "matchlocations": "2225,3,2275,3,2295,6,2318,3,2352,3,2609,7,2696,7,2750,7,2815,7",
            "highlightedText": "\"baseform\" : \"<span class=\"matchlocations\">CEO<\/span>\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"<span class=\"matchlocations\">CEO<\/span>\" }, { \"text\" : \"<span class=\"matchlocations\">C.E.O.<\/span>\" }, { \"text\" : \"<span class=\"matchlocations\">ceo<\/span>\" } ], \"slots\" : [ { \"Text\" : \"<span class=\"matchlocations\">CEO<\/span>\", \"Name\" : \"job_title\", \"Offset\" : 11, \"Length\" : 3, \"Score\" : 0.996078431606293 } ] }, { \"text\" : \"of\", \"weight\" : 1, \"offset\" : 15, \"length\" : 2, \"stopword\" : true, \"baseform\" : \"of\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"of\" } ] }, { \"text\" : \"<span class=\"matchlocations\">Sinequa<\/span>\", \"weight\" : 1, \"offset\" : 18, \"length\" : 7, \"stopword\" : false, \"baseform\" : \"<span class=\"matchlocations\">Sinequa<\/span>\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"<span class=\"matchlocations\">Sinequa<\/span>\" } ], \"entities\" : [ { \"entity\" : \"itcompany\", \"text\" : \"<span class=\"matchlocations\">Sinequa<\/span>\", \"weight\" :"
          },
          {
            "id": 5,
            "score": 0.00441,
            "rm.score": 0.00441,
            "kw.score": 0.86987,
            "location": [
              1970,
              603
            ],
            "rlocation": [
              10625,
              1597
            ],
            "matchlocations": "2142,3,2225,3,2275,3,2295,6,2318,3,2352,3",
            "highlightedText": "] }, { \"text\" : \"the\", \"weight\" : 1, \"offset\" : 7, \"length\" : 3, \"stopword\" : true, \"baseform\" : \"the\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"the\" } ] }, { \"text\" : \"<span class=\"matchlocations\">CEO<\/span>\", \"weight\" : 1, \"offset\" : 11, \"length\" : 3, \"stopword\" : false, \"baseform\" : \"<span class=\"matchlocations\">CEO<\/span>\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"<span class=\"matchlocations\">CEO<\/span>\" }, { \"text\" : \"<span class=\"matchlocations\">C.E.O.<\/span>\" }, { \"text\" : \"<span class=\"matchlocations\">ceo<\/span>\" } ], \"slots\" : [ { \"Text\" : \"<span class=\"matchlocations\">CEO<\/span>\", \"Name\" : \"job_title\", \"Offset\" : 11, \"Length\" : 3, \"Score\" : 0.996078431606293 } ] }, { \"text\" : \"of\", \"weight\" : 1, \"offset\" : 15, \"length\" : 2, \"stopword\" : true, \"baseform\" : \"of\", \"language\" : \"en\", \"lemmas\" : ["
          }
        ]
      },
      "title": "Readme",
      "language": [
        "en"
      ],
      "authors": [
        "Ren\u00e9 Leclercq"
      ],
      "modified": "2021-03-18 15:57:34",
      "indexationtime": "2022-09-09 14:27:41",
      "version": "2021-03-18T14:57:34.437Z",
      "size": 23983,
      "treepath": [
        "\/Intranet Portals\/Confluence\/R&D\/Projects\/Query Intent V2 (QI V2)\/"
      ],
      "filename": "Readme",
      "fileext": "htm",
      "collection": [
        "\/I_NS1_Tools\/I_Confluence\/"
      ],
      "docformat": "Web",
      "doctype": "Page",
      "person": [
        {
          "value": "JOHN DOE",
          "display": "John Doe",
          "count": 2
        },
        {
          "value": "RENE LE CLERCQ",
          "display": "Ren\u00e9 Le Clercq",
          "count": 1
        }
      ],
      "company": [
        {
          "value": "SINEQUA",
          "display": "Sinequa",
          "count": 13
        }
      ],
      "geo": [
        {
          "value": "PARIS",
          "display": "Paris",
          "count": 3
        }
      ],
      "wordcount": 828,
      "exacthash": "AUsbB13ick466\/JIAYG0Nw==",
      "nearhash": "WjRIxtw\/lrpdiAoGF84hRA==",
      "partnamelocations": [
        {
          "value": "title",
          "display": "title",
          "count": 1
        }
      ],
      "url1": "https:\/\/sinequa.atlassian.net\/wiki\/spaces\/PRODUCT\/pages\/1398145029\/Readme",
      "sinequaauthors": [
        "Ren\u00e9 Leclercq"
      ],
      "objecttype": "Documentation",
      "objecttypeprimary": "Documentation",
      "rank": 2,
      "displayTitle": "Readme",
      "relevantExtracts": "Who is the <b>CEO <\/b>of <b>Sinequa<\/b>... <b>CEO<\/b>&quot;, &quot;Name&quot; ... <b>CEO<\/b>&quot;, &quot;weight&quot; ... <b>CEO<\/b>&quot;, &quot;language&quot; ... <b>CEO<\/b>&quot; }, { &quot;text&quot; ... <b>ceo<\/b>&quot; } ], &quot;slots&quot; ... <b>Sinequa<\/b>&quot;, &quot;Name&quot; ... <b>Sinequa<\/b>&quot;, &quot;weight&quot; ... <b>Sinequa<\/b>&quot;, &quot;language&quot; ... <b>Sinequa<\/b>&quot; } ], &quot;entities&quot; "
    },
    {
      "id": "\/I_NS1_Tools\/I_Loopio\/|539277",
      "databasealias": "I_NS1_Loopio",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 1.920726,
      "matchingpartnames": [
        "text",
        "rfp_answers"
      ],
      "termspresence": [
        {
          "term": "CEO",
          "presence": "found"
        },
        {
          "term": "Sinequa",
          "presence": "found"
        }
      ],
      "documentweight": "default",
      "wordsrelevance": "0.920898",
      "wordproximityrelevance": "1",
      "wordscorerelevance": "0.77417",
      "wordcountrelevance": "2",
      "meaningrelevance": "1",
      "extracts": [
        {
          "highlighted": "In 2006-7, our current {b}CEO{nb}, Alexandre Bilger and his associate acquired the technology and company.",
          "locations": "676,99,4443,99",
          "originalLocations": "1048,99,5459,99",
          "score": "32640"
        },
        {
          "highlighted": "{b}Sinequa{nb} began its existence in France as a private research lab working on Natural Language Processing and Semantic analysis of large textual datasets.",
          "locations": "298,151",
          "originalLocations": "664,151",
          "score": "0"
        },
        {
          "highlighted": "Since then, {b}Sinequa{nb} has remained focused on this singular mission with a single product, an end-to-end platform currently in its version 11",
          "locations": "978,139",
          "originalLocations": "1350,139",
          "score": "0"
        },
        {
          "highlighted": "Key milestones for {b}Sinequa{nb} include year over year double-digit growth ",
          "locations": "1119,70",
          "originalLocations": "1509,70",
          "score": "0"
        },
        {
          "highlighted": "The core business continues to be singularly focused on the evolution of the {b}Sinequa{nb} Cognitive search and analytics platform.",
          "locations": "1563,125",
          "originalLocations": "1955,125",
          "score": "0"
        },
        {
          "highlighted": "About 30% of {b}Sinequa{nb}'s staff works in R&D to support the constant evolution of the market and the needs of our customers, and to lead the way in applying cognitive technology in the marketplace.",
          "locations": "1689,194",
          "originalLocations": "2081,200",
          "score": "0"
        },
        {
          "highlighted": "As a software provider, 90% of {b}Sinequa{nb}'s revenue comes from subscription licenses, the remaining 10% is generated by professional services engagements, which supports POCs and provides expertise during deployments.",
          "locations": "1884,214",
          "originalLocations": "2282,216",
          "score": "0"
        },
        {
          "highlighted": "{b}Sinequa{nb} has an extended network of System integrators who implement the platform and deploy solutions for our customers.",
          "locations": "2099,120",
          "originalLocations": "2499,120",
          "score": "0"
        },
        {
          "highlighted": "The Life Sciences industry has been a rapidly growing market for {b}Sinequa{nb} in the last few years.",
          "locations": "2221,95",
          "originalLocations": "2639,95",
          "score": "0"
        },
        {
          "highlighted": "{b}Sinequa{nb} will continue to evolve its platform as a single end-to-end solution but there is emphasis on incorporating both IP and specialized technology from partners (such as ontologies, taxonomies) to further enrich our logical data warehouse .",
          "locations": "2660,244",
          "originalLocations": "3078,244",
          "score": "0"
        }
      ],
      "matchlocationsperpartname": [
        {
          "matchlocations": [

          ]
        }
      ],
      "matchingpassages": {
        "schemas": [
          {
            "function": "matchlocations",
            "schema": {
              "format": "StringWithSeparators",
              "separator": ";",
              "innerseparator": ",",
              "schema": [
                {
                  "name": "columns",
                  "type": "array",
                  "fields": [
                    {
                      "name": "MatchLocations"
                    }
                  ]
                },
                {
                  "name": "locations",
                  "type": "string",
                  "subtype": "location"
                }
              ]
            }
          }
        ],
        "passages": [
          {
            "id": 1,
            "score": 0.99974,
            "rm.score": 0.99974,
            "kw.score": 0.78759,
            "vect.score": 0.12963,
            "location": [
              298,
              816
            ],
            "rlocation": [
              664,
              822
            ],
            "matchlocations": "298,7,596,7,620,7,699,3,990,7",
            "highlightedText": "<span class=\"matchlocations\">Sinequa<\/span> began its existence in France as a private research lab working on Natural Language Processing and Semantic analysis of large textual datasets. This research and subsequent investment in advanced information processing capability has culminated in a unique search technology at the core of <span class=\"matchlocations\">Sinequa<\/span>'s platform, the <span class=\"matchlocations\">Sinequa<\/span> Engine, representing over 20 man-years of R&D.. In 2006-7, our current <span class=\"matchlocations\">CEO<\/span>, Alexandre Bilger and his associate acquired the technology and company. The objective was to build a complete platform around the core engine to tackle the most complex cognitive search and analytics challenges for the most demanding data-driven organizations in the world. Since then, <span class=\"matchlocations\">Sinequa<\/span> has remained focused on this singular mission with a single product, an end-to-end platform currently in its version"
          },
          {
            "id": 9,
            "score": 0.99974,
            "rm.score": 0.99974,
            "kw.score": 0.78759,
            "vect.score": 0.12963,
            "location": [
              4065,
              816
            ],
            "rlocation": [
              5075,
              822
            ],
            "matchlocations": "4065,7,4363,7,4387,7,4466,3,4757,7",
            "highlightedText": "<span class=\"matchlocations\">Sinequa<\/span> began its existence in France as a private research lab working on Natural Language Processing and Semantic analysis of large textual datasets. This research and subsequent investment in advanced information processing capability has culminated in a unique search technology at the core of <span class=\"matchlocations\">Sinequa<\/span>'s platform, the <span class=\"matchlocations\">Sinequa<\/span> Engine, representing over 20 man-years of R&D.. In 2006-7, our current <span class=\"matchlocations\">CEO<\/span>, Alexandre Bilger and his associate acquired the technology and company. The objective was to build a complete platform around the core engine to tackle the most complex cognitive search and analytics challenges for the most demanding data-driven organizations in the world. Since then, <span class=\"matchlocations\">Sinequa<\/span> has remained focused on this singular mission with a single product, an end-to-end platform currently in its version"
          }
        ]
      },
      "title": "A concise history of your company, including an overview of your company's strategy, especially with regards to Life Science industry;Summarize the history and development of the solution that you are offering.;Briefly tell us about your company\u2019s growth over the past five years.",
      "language": [
        "en"
      ],
      "authors": [
        "Fanny Bella\u00efche"
      ],
      "modified": "2021-02-03 22:43:39",
      "indexationtime": "2022-07-05 04:02:55",
      "version": "2021-02-03T17:43:39-05:00",
      "size": 4571,
      "treepath": [
        "\/Loopio\/"
      ],
      "filename": "file.htm",
      "fileext": "htm",
      "collection": [
        "\/I_NS1_Tools\/I_Loopio\/"
      ],
      "docformat": "Web",
      "person": [
        {
          "value": "ALEXANDRE BILGER",
          "display": "Alexandre Bilger",
          "count": 2
        }
      ],
      "company": [
        {
          "value": "SINEQUA",
          "display": "Sinequa",
          "count": 28
        },
        {
          "value": "ASTRA",
          "display": "Astra",
          "count": 2
        },
        {
          "value": "CELGENE",
          "display": "Celgene",
          "count": 2
        },
        {
          "value": "GARTNER",
          "display": "Gartner",
          "count": 2
        },
        {
          "value": "PFIZER",
          "display": "Pfizer",
          "count": 2
        }
      ],
      "geo": [
        {
          "value": "FRANCE",
          "display": "France",
          "count": 2
        }
      ],
      "wordcount": 389,
      "exacthash": "81Rnz51oWV+TnCRC3SzX5Q==",
      "nearhash": "Wno1EFf2FLjGyM+e8zZBjg==",
      "partnamelocations": [
        {
          "value": "rfp_answers",
          "display": "rfp_answers",
          "count": 1
        },
        {
          "value": "rfp_question",
          "display": "rfp_question",
          "count": 1
        },
        {
          "value": "title",
          "display": "title",
          "count": 1
        }
      ],
      "url1": "https:\/\/sinequa.loopio.com\/library?entry=539277",
      "sinequaauthors": [
        "Fanny Bella\u00efche"
      ],
      "indexationNsco": "QG XS - V1_S - V1",
      "rfplanguage": "English",
      "rfpquestionstext": "A concise history of your company, including an overview of your company's strategy, especially with regards to Life Science industry;Summarize the history and development of the solution that you are offering.;Briefly tell us about your company\u2019s growth over the past five years.",
      "rfpanswertext": "<p>Sinequa began its existence in France as a private research lab working on Natural Language Processing and Semantic analysis of large textual datasets. This research and subsequent investment in advanced information processing capability has culminated in a unique search technology at the core of Sinequa\u2019s platform, the Sinequa Engine, representing over 20 man-years of R&amp;D.. In 2006-7, our current CEO, Alexandre Bilger and his associate acquired the technology and company. The objective was to build a complete platform around the core engine to tackle the most complex cognitive search and analytics challenges for the most demanding data-driven organizations in the world. Since then, Sinequa has remained focused on this singular mission with a single product, an end-to-end platform currently in its version 11<\/p>\n\n<p> <\/p>\n\n<p>Key milestones for Sinequa include year over year double-digit growth; entry into the US Market in 2014 and quickly establishing a leadership position in Life Sciences; recognition as a leader in back-to-back market reports by analyst groups including Gartner (Magic Quadrant) and Forrester (Forrester Wave); and a significant expansion of the platform\u2019s cognitive capabilities with full integration of TensorFlow for machine learning in 2020. The core business continues to be singularly focused on the evolution of the Sinequa Cognitive search and analytics platform. About 30% of Sinequa\u2019s staff works in R&amp;D to support the constant evolution of the market and the needs of our customers, and to lead the way in applying cognitive technology in the marketplace. As a software provider, 90% of Sinequa\u2019s revenue comes from subscription licenses, the remaining 10% is generated by professional services engagements, which supports POCs and provides expertise during deployments. Sinequa has an extended network of System integrators who implement the platform and deploy solutions for our customers.<\/p>\n\n<p> <\/p>\n\n<p>The Life Sciences industry has been a rapidly growing market for Sinequa in the last few years. The input and guidance from key clients such as Pfizer, Astra Zeneca, Celgene, UCB, BMS and Biogen have helped us to understand better specific needs and complexities of large pharmaceutical companies. There is commonality between use cases where best practices can be shared to accelerate the benefit brought to each individual organization. Sinequa will continue to evolve its platform as a single end-to-end solution but there is emphasis on incorporating both IP and specialized technology from partners (such as ontologies, taxonomies) to further enrich our logical data warehouse . Sinequa comes to the strategy table knowing the expected outcomes for applying cognitive technology to various use cases in the Biopharma industry, and is continuing to invest in technology and resources to expand that capability.<\/p>\n\n<p> <\/p>\n\n<p>Sinequa\u2019s approach to the market and our platform has kept ahead of the trends that impact our customers and prospects through constant innovation of our technology and capabilities. For example, Sinequa invested early on to develop connectors and performance scalability to ahead of the recent energy exerted in the \u201cbig data\u201d approach to solving business problems. We are on the cutting edge of incorporating advanced cognitive capabilities and machine learning so companies can extract more value from their disparate information assets in less time than ever before.<\/p>\n",
      "rfpcategoryname": "General Company Information",
      "rfpstatus": "APPROVED",
      "ticketcreationdate": "2017-12-07 13:59:40",
      "sourceint1": 27,
      "rank": 7,
      "displayTitle": "A concise history of your company, including an overview of your company's strategy, especially with regards to Life Science industry;Summarize the history and development of the solution that you are offering.;Briefly tell us about your company\u2019s growth over the past five years.",
      "relevantExtracts": "2006-7, our current <b>CEO<\/b>, Alexandre ... <b>Sinequa <\/b>began its ... Since then, <b>Sinequa <\/b>has remained ... Key milestones for <b>Sinequa <\/b>include year ... evolution of the <b>Sinequa <\/b>Cognitive ... About 30% of <b>Sinequa<\/b>&#39;s ... provider, 90% of <b>Sinequa<\/b>&#39;s ... <b>Sinequa <\/b>has ... growing market for <b>Sinequa <\/b>in ... <b>Sinequa <\/b>will "
    }
  ],
  "answers": {
    "answers": [
      {
        "index": "I_NS1_Sinequa_Website",
        "chunkid": 2711,
        "text": "Alexandre Bilger",
        "af.score": 0.9931390285491943,
        "rm.score": 0.9996923208236694,
        "score": 0.9931390285491943,
        "location": [
          3822,
          16
        ],
        "rlocation": [
          117485,
          16
        ],
        "passage": {
          "id": 6,
          "location": [
            3812,
            556
          ],
          "rlocation": [
            117475,
            18556
          ],
          "highlightedText": "Listen to <span class=\"answer\">Alexandre Bilger<\/span>, Sinequa's CEO, and discover how Sinequa is continuously innovating with its new solutions and capabilities.  Play video  Product  Company  Industries  Career  Solutions  Resources  Blog  Assets  Events  Press  Webinars  Help center  Download center  Technical documentation  The Partner Corner  Sinequa University  Technical forum  Customer support  Github  Discover the power of Sinequa  Get started  @2022 Sinequa. All rights reserved | Privacy policy  \u202e\u2064\u202d  Forrester: Ambient Search for the Modern Digital Workplace | Sinequa"
        },
        "recordId": "\/I_NS1_Internet\/I_Sinequa\/|https:\/\/www.sinequa.com\/assets\/videos\/ambient-search-for-the-modern-digital-workplace\/"
      },
      {
        "index": "I_NS1_Loopio",
        "chunkid": 2474,
        "text": "Alexandre Bilger",
        "af.score": 0.9859877824783325,
        "rm.score": 0.9997442364692688,
        "score": 0.9859877824783325,
        "location": [
          4471,
          16
        ],
        "rlocation": [
          5487,
          16
        ],
        "passage": {
          "id": 9,
          "location": [
            4065,
            816
          ],
          "rlocation": [
            5075,
            822
          ],
          "highlightedText": "Sinequa began its existence in France as a private research lab working on Natural Language Processing and Semantic analysis of large textual datasets. This research and subsequent investment in advanced information processing capability has culminated in a unique search technology at the core of Sinequa's platform, the Sinequa Engine, representing over 20 man-years of R&D.. In 2006-7, our current CEO, <span class=\"answer\">Alexandre Bilger<\/span> and his associate acquired the technology and company. The objective was to build a complete platform around the core engine to tackle the most complex cognitive search and analytics challenges for the most demanding data-driven organizations in the world. Since then, Sinequa has remained focused on this singular mission with a single product, an end-to-end platform currently in its version"
        },
        "recordId": "\/I_NS1_Tools\/I_Loopio\/|539277"
      }
    ]
  },
  "topPassages": {
    "passages": [
      {
        "index": "I_NS1_Confluence",
        "chunkid": 2747,
        "id": 3,
        "score": 0.99974,
        "location": [
          1450,
          634
        ],
        "rlocation": [
          9408,
          1489
        ],
        "matchlocations": "1611,3,1618,7",
        "highlightedText": ": \"company\", \"Offset\" : 18, \"Length\" : 7, \"Score\" : 0.944759786128998 } ], \"ServingTime\" : \"31 ms\" }, \"queryAnalysis\" : { \"initial\" : true, \"text\" : \"Who is the <span class=\"matchlocations\">CEO<\/span> of <span class=\"matchlocations\">Sinequa<\/span>?\", \"queryLanguage\" : \"en\", \"elements\" : [ { \"text\" : \"Who\", \"weight\" : 1, \"offset\" : 0, \"length\" : 3, \"stopword\" : true, \"baseform\" : \"who\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"who\" } ] }, { \"text\" : \"is\", \"weight\" : 1, \"offset\" : 4, \"length\" : 2, \"stopword\" : true, \"baseform\" : \"be\", \"language\" : \"en\", \"lemmas\" : [ { \"text\" : \"be\" } ] }, { \"text\" : \"the\", \"weight\" : 1, \"offset\" : 7, \"length\" : 3, \"stopword\" : true, \"baseform\" : \"the\", \"language\"",
        "recordId": "\/I_NS1_Tools\/I_Confluence\/|1398145029"
      },
      {
        "index": "I_NS1_Loopio",
        "chunkid": 2474,
        "id": 9,
        "score": 0.99974,
        "location": [
          4065,
          816
        ],
        "rlocation": [
          5075,
          822
        ],
        "matchlocations": "4065,7,4363,7,4387,7,4466,3,4757,7",
        "answer": "Alexandre Bilger",
        "answerScore": 0.9859877824783325,
        "highlightedText": "<span class=\"matchlocations\">Sinequa<\/span> began its existence in France as a private research lab working on Natural Language Processing and Semantic analysis of large textual datasets. This research and subsequent investment in advanced information processing capability has culminated in a unique search technology at the core of <span class=\"matchlocations\">Sinequa<\/span>'s platform, the <span class=\"matchlocations\">Sinequa<\/span> Engine, representing over 20 man-years of R&D.. In 2006-7, our current <span class=\"matchlocations\">CEO<\/span>, <span class=\"answer\">Alexandre Bilger<\/span> and his associate acquired the technology and company. The objective was to build a complete platform around the core engine to tackle the most complex cognitive search and analytics challenges for the most demanding data-driven organizations in the world. Since then, <span class=\"matchlocations\">Sinequa<\/span> has remained focused on this singular mission with a single product, an end-to-end platform currently in its version",
        "recordId": "\/I_NS1_Tools\/I_Loopio\/|539277"
      },
      {
        "index": "I_NS1_Loopio",
        "chunkid": 2474,
        "id": 1,
        "score": 0.99974,
        "location": [
          298,
          816
        ],
        "rlocation": [
          664,
          822
        ],
        "matchlocations": "298,7,596,7,620,7,699,3,990,7",
        "highlightedText": "<span class=\"matchlocations\">Sinequa<\/span> began its existence in France as a private research lab working on Natural Language Processing and Semantic analysis of large textual datasets. This research and subsequent investment in advanced information processing capability has culminated in a unique search technology at the core of <span class=\"matchlocations\">Sinequa<\/span>'s platform, the <span class=\"matchlocations\">Sinequa<\/span> Engine, representing over 20 man-years of R&D.. In 2006-7, our current <span class=\"matchlocations\">CEO<\/span>, Alexandre Bilger and his associate acquired the technology and company. The objective was to build a complete platform around the core engine to tackle the most complex cognitive search and analytics challenges for the most demanding data-driven organizations in the world. Since then, <span class=\"matchlocations\">Sinequa<\/span> has remained focused on this singular mission with a single product, an end-to-end platform currently in its version",
        "recordId": "\/I_NS1_Tools\/I_Loopio\/|539277"
      },
      {
        "index": "I_NS1_Sinequa_Website",
        "chunkid": 2711,
        "id": 6,
        "score": 0.99969,
        "location": [
          3812,
          556
        ],
        "rlocation": [
          117475,
          18556
        ],
        "matchlocations": "3840,7,3850,3,3872,7,4135,7,4220,7,4248,7,4361,7",
        "answer": "Alexandre Bilger",
        "answerScore": 0.9931390285491943,
        "highlightedText": "Listen to <span class=\"answer\">Alexandre Bilger<\/span>, <span class=\"matchlocations\">Sinequa<\/span>'s <span class=\"matchlocations\">CEO<\/span>, and discover how <span class=\"matchlocations\">Sinequa<\/span> is continuously innovating with its new solutions and capabilities.  Play video  Product  Company  Industries  Career  Solutions  Resources  Blog  Assets  Events  Press  Webinars  Help center  Download center  Technical documentation  The Partner Corner  <span class=\"matchlocations\">Sinequa<\/span> University  Technical forum  Customer support  Github  Discover the power of <span class=\"matchlocations\">Sinequa<\/span>  Get started  @2022 <span class=\"matchlocations\">Sinequa<\/span>. All rights reserved | Privacy policy  \u202e\u2064\u202d  Forrester: Ambient Search for the Modern Digital Workplace | <span class=\"matchlocations\">Sinequa<\/span>",
        "recordId": "\/I_NS1_Internet\/I_Sinequa\/|https:\/\/www.sinequa.com\/assets\/videos\/ambient-search-for-the-modern-digital-workplace\/"
      },
      {
        "index": "I_NS1_Loopio",
        "chunkid": 2378,
        "id": 3,
        "score": 0.99967,
        "location": [
          1117,
          790
        ],
        "rlocation": [
          2058,
          801
        ],
        "matchlocations": "1117,7,1421,7,1445,7,1523,3,1765,7,1859,7",
        "answer": "Alexandre Bilger",
        "answerScore": 0.9886695146560669,
        "highlightedText": "<span class=\"matchlocations\">Sinequa<\/span> origins trace back to a French university as a research lab working on Natural Language Processing (NLP) and semantic analysis of large textual datasets. This research and subsequent investment in advanced information processing capability culminated in a unique search technology at the core of <span class=\"matchlocations\">Sinequa<\/span>'s platform, the <span class=\"matchlocations\">Sinequa<\/span> Engine, which now embodies over 20 years of R&D. In 2006, our current <span class=\"matchlocations\">CEO<\/span>, <span class=\"answer\">Alexandre Bilger<\/span> acquired the technology and company with an objective to build a comprehensive platform to tackle the most complex cognitive search and analytics challenges for the most demanding organizations in the world. Since then, <span class=\"matchlocations\">Sinequa<\/span> has remained focused on this singular mission with a single end-to-end platform - the <span class=\"matchlocations\">Sinequa<\/span> software - that is currently in its 11th",
        "recordId": "\/I_NS1_Tools\/I_Loopio\/|652667"
      },
      {
        "index": "I_NS1_Loopio",
        "chunkid": 2378,
        "id": 1,
        "score": 0.99967,
        "location": [
          126,
          790
        ],
        "rlocation": [
          490,
          801
        ],
        "matchlocations": "126,7,430,7,454,7,532,3,774,7,868,7",
        "highlightedText": "<span class=\"matchlocations\">Sinequa<\/span> origins trace back to a French university as a research lab working on Natural Language Processing (NLP) and semantic analysis of large textual datasets. This research and subsequent investment in advanced information processing capability culminated in a unique search technology at the core of <span class=\"matchlocations\">Sinequa<\/span>'s platform, the <span class=\"matchlocations\">Sinequa<\/span> Engine, which now embodies over 20 years of R&D. In 2006, our current <span class=\"matchlocations\">CEO<\/span>, Alexandre Bilger acquired the technology and company with an objective to build a comprehensive platform to tackle the most complex cognitive search and analytics challenges for the most demanding organizations in the world. Since then, <span class=\"matchlocations\">Sinequa<\/span> has remained focused on this singular mission with a single end-to-end platform - the <span class=\"matchlocations\">Sinequa<\/span> software - that is currently in its 11th",
        "recordId": "\/I_NS1_Tools\/I_Loopio\/|652667"
      },
      {
        "index": "I_NS1_Sinequa_Website",
        "chunkid": 2616,
        "id": 7,
        "score": 0.99952,
        "location": [
          5116,
          616
        ],
        "rlocation": [
          111068,
          5679
        ],
        "matchlocations": "5187,7,5577,3,5584,7,5621,7,5654,15,5696,7,5724,7",
        "highlightedText": "\" Building on our partnership with Microsoft and the recent release of <span class=\"matchlocations\">Sinequa<\/span> for Azure, we are now the only leading enterprise search vendor to bring advanced Insight Apps easily accessible from Teams. It is a natural evolution of our platform based on customer demand. Teams is also a highly customizable environment that will open endless possibilities for our partners to build a new user experience for Microsoft Teams customers. \" said Alexandre Bilger, <span class=\"matchlocations\">CEO<\/span> of <span class=\"matchlocations\">Sinequa<\/span>.  For more information about <span class=\"matchlocations\">Sinequa<\/span> for Teams, please visit: <span class=\"matchlocations\">www.sinequa.com<\/span>\/product-enterprise-search\/<span class=\"matchlocations\">sinequa<\/span>-for-teams\/ .  About <span class=\"matchlocations\">Sinequa<\/span>.",
        "recordId": "\/I_NS1_Internet\/I_Sinequa\/|https:\/\/www.sinequa.com\/press\/sinequa-brings-intelligent-search-to-microsoft-teams\/"
      },
      {
        "index": "I_NS1_Sinequa_Website",
        "chunkid": 2642,
        "id": 3,
        "score": 0.9995,
        "location": [
          2839,
          813
        ],
        "rlocation": [
          108866,
          6914
        ],
        "matchlocations": "2843,7,2966,7,3103,7,3275,7,3468,7,3515,7,3525,3,3547,7",
        "highlightedText": "how <span class=\"matchlocations\">Sinequa<\/span>'s Intelligent Search Platform helps to access information in a single source  how others like Soci\u00e9t\u00e9 G\u00e9n\u00e9rale use <span class=\"matchlocations\">Sinequa<\/span> as part of their Intranet solution to improve productivity  how the partnership with Microsoft supports our customers to provide <span class=\"matchlocations\">Sinequa<\/span> within MS Teams  Alana Cento  Sr. Product Marketing Manager at  Watch the video now  \"Digital Business Collaboration: Making Knowledge Discoverable\"  Discover what <span class=\"matchlocations\">Sinequa<\/span> can do for your business.  Let's have a quick overview of the benefits that our product can give to your company.  Contact us  Get started  Related videos.  Replay Inform Online 2022 - <span class=\"matchlocations\">Sinequa<\/span>'s Roadmap  Listen to Alexandre Bilger, <span class=\"matchlocations\">Sinequa<\/span>'s <span class=\"matchlocations\">CEO<\/span>, and discover how <span class=\"matchlocations\">Sinequa<\/span> is continuously innovating with its new solutions and capabilities.  Play video  KM World Keynote",
        "recordId": "\/I_NS1_Internet\/I_Sinequa\/|https:\/\/www.sinequa.com\/assets\/videos\/digital-business-collaboration-making-knowledge-discoverable\/"
      }
    ]
  },
  "queryAnalysis": {
    "initial": true,
    "text": "Paris",
    "queryLanguage": "en",
    "elements": [
      {
        "text": "Paris",
        "weight": 1,
        "baseform": "Paris",
        "language": "en"
      }
    ]
  },
  "totalProcessingTime": "16 ms",
  "methodresult": "ok"
}