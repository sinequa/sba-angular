export const RESULTS = {
  "statements": [
    "select distribution('sourcestr4,basicforms=true,order=freqdesc,labels=true,wantnulls=true,post-group-by=true,merge-groups=true') as count_tab from Wikipedia,SinequaDoc where text contains 'obama' and sourcestr4 in ('*',NULL,'human','business','company','website','software','software company','newspaper','organization','city of the United States','city','state of the United States','state','country','sovereign state') and  relevancetransforms='<RelevanceTransforms><PartNameBoost fraction=\"30\"><PartNames mode=\"and\"><PartName>title</PartName></PartNames><Action op=\"add\" field=\"sourcedouble1\"></Action></PartNameBoost></RelevanceTransforms>' and  synonyms='uk-us' and  reformulations='false' and  SearchParameters='mac=1000;mw=0;dlang=autodetect;langw=en/1.2/fr/1.1/es/1.0/it/1.0/nl/1.0/ko/0.8/*/0.9;scmode=Smart' and  language='autodetect' and  concepts limit 100 and  globalrelevance>=40 and  wordsrelevance>=0 and  (CACHE (CHECKACLS('accesslists=\"accesslist1,accesslist2\",deniedlists=\"deniedlist1\"') FOR ('internal|S-1-5-21-2165854416-2067547654-1784818317-6655'))) group by nearhash skip 0 count 1 forget above 1",
    "select searchguid('1D6F3E8FAE13428D992B43246BFE8CB4'),internalquerylog,id,databasealias,flags,globalrelevance,matchingpartnames,termspresence,internalqueryanalysis,highlight(Text,'chunk=sentence/window,count=10,context.window=3,offsets=true,separator=;,startmarker=\"{b}\",endmarker=\"{nb}\",remap=true,dedup=1') as extracts,matchlocations('remap=true,perpartname=true') as matchlocationsperpartname,groupcount,title,documentlanguages,documentweight,authors,modified,indexationtime,version,keywords,size,treepath,filename,fileext,flags,collection,docformat,doctype,containerid,msgfrom,msgto,remap(person),remap(company),remap(geo),wordcount,exacthash,nearhash,remap(partnamelocations),url1,url2,accesslist1,accesslist2,deniedlist1,sourcecsv1,sourcecsv2,sourcecsv3,sourcecsv4,sourcecsv5,sourcestr1,sourcestr2,sourcestr3,sourcestr4,sourcestr5,sourcevarchar3,sourcevarchar4,sourcevarchar5,sourcedouble1,sourcedouble2,sourcedouble3,sourcedouble4,sourcedouble5,remap(entity1),remap(entity2),remap(entity3),remap(entity4),remap(entity5),remap(entity6),remap(entity7),remap(entity8),remap(entity9),remap(entity10),remap(entity11),remap(entity12),remap(entity13),remap(entity14),remap(entity15),remap(entity16),remap(entity17),remap(entity18),remap(entity19),remap(entity20),enginecsv1,enginecsv2,enginecsv3,enginecsv4,enginecsv5,engineusercsv1,engineusercsv2,engineusercsv3,engineusercsv4,engineusercsv5,distribution('size,bounds=\"0;10240;102400;1048576;10485760;2147483646,order=freqdesc\",post-group-by=true,merge-groups=true,count=11') as count_Size__005F_SizeDefault,concepts,distribution('matchingpartnames,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_MatchingPartnames,distribution('documentlanguages,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_DocumentLanguages,distribution('docformat,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_DocFormat,distribution('authors,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Authors,distribution('doctype,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_DocType,distribution('fileext,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_FileExt,distribution('filename,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_FileName,distribution('title,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Title,distribution('modified,bounds=\"2020-01-01;2020-10-01;2020-10-19;2020-10-20,order=freqdesc\",post-group-by=true,merge-groups=true,count=11') as count_Modified__005F_DateDefault,distribution('treepath,basicforms=false,labels=true,maxcount=20,minlevel=2,wantmore=true,order=labelasc,post-group-by=true,merge-groups=true') as count_Treepath,correlation('geo,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true') as correl_Geo,correlation('person,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true') as correl_Person,correlation('company,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true') as correl_Company,distribution('modified,basicforms=true,labels=false,order2=labelasc,order=keyasc,mask=YYYY-WW,post-group-by=true,merge-groups=true') as count_Timeline,distribution('enginecsv1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_publicLabels,distribution('engineusercsv1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true,prefixes=\"internal|S-1-5-21-2165854416-2067547654-1784818317-6655|\"') as count_privateLabels,distribution('entity19,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Company_Person_Cooc,distribution('entity20,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Person_Job_Company_Cooc from Wikipedia,SinequaDoc where text contains 'obama' and sourcestr4 in ('*',NULL) and  relevancetransforms='<RelevanceTransforms><PartNameBoost fraction=\"30\"><PartNames mode=\"and\"><PartName>title</PartName></PartNames><Action op=\"add\" field=\"sourcedouble1\"></Action></PartNameBoost></RelevanceTransforms>' and  synonyms='uk-us' and  reformulations='false' and  SearchParameters='mac=1000;mw=0;dlang=autodetect;langw=en/1.2/fr/1.1/es/1.0/it/1.0/nl/1.0/ko/0.8/*/0.9;scmode=Smart' and  language='autodetect' and  concepts limit 100 and  globalrelevance>=40 and  wordsrelevance>=0 and  (CACHE (CHECKACLS('accesslists=\"accesslist1,accesslist2\",deniedlists=\"deniedlist1\"') FOR ('internal|S-1-5-21-2165854416-2067547654-1784818317-6655'))) group by nearhash order by globalrelevance desc skip 0 count 20"
  ],
  "tab": "all",
  "tabs": [
    {
      "name": "all",
      "display": "msg#results.resultsAllTab",
      "value": "*,",
      "count": 894
    },
    {
      "name": "human",
      "display": "msg#results.tabPeople",
      "value": "human",
      "count": 349
    },
    {
      "name": "business",
      "display": "msg#results.tabBusiness",
      "value": "business,company,website,software,software company,newspaper,organization",
      "count": 20
    },
    {
      "name": "location",
      "display": "msg#results.tabLocation",
      "value": "city of the United States,city,state of the United States,state,country,sovereign state",
      "count": 3
    }
  ],
  "aggregations": [
    {
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
    },
    {
      "name": "Geo",
      "column": "geo",
      "items": [
        {
          "value": "IRAQ",
          "display": "Iraq",
          "count": 45,
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
          },
          "$selected": false
        },
        {
          "value": "AMERICA",
          "display": "America",
          "count": 77,
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
          "value": "NEW HAMPSHIRE",
          "display": "New Hampshire",
          "count": 26,
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
          "value": "ILLINOIS",
          "display": "Illinois",
          "count": 42,
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
          "value": "IOWA",
          "display": "Iowa",
          "count": 28,
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
          "value": "WASHINGTON",
          "display": "Washington",
          "count": 74,
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
          "value": "AFGHANISTAN",
          "display": "Afghanistan",
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
          },
          "$selected": false
        },
        {
          "value": "COLORADO",
          "display": "Colorado",
          "count": 36,
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
          "value": "ALASKA",
          "display": "Alaska",
          "count": 29,
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
          "value": "DISTRICT OF COLUMBIA",
          "display": "District of Columbia",
          "count": 25,
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
        }
      ]
    },
    {
      "name": "Person",
      "column": "person",
      "items": [
        {
          "value": "OBAMA",
          "display": "Obama",
          "count": 73,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama",
          "count": 98,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "JOE BIDEN",
          "display": "Joe Biden",
          "count": 44,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton",
          "count": 56,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "JOHN MCCAIN",
          "display": "John McCain",
          "count": 40,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "HARRY REID",
          "display": "Harry Reid",
          "count": 22,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "DAVID AXELROD",
          "display": "David Axelrod",
          "count": 12,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "SARAH PALIN",
          "display": "Sarah Palin",
          "count": 22,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "JOHN KERRY",
          "display": "John Kerry",
          "count": 31,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "BIDEN",
          "display": "Biden",
          "count": 11,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "GEORGE W. BUSH",
          "display": "George W. Bush",
          "count": 54,
          "$column": {
            "name": "person",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "person"
            ],
            "label": "msg#metadata.personLabel",
            "labelPlural": "msg#metadata.personPluralLabel"
          },
          "$selected": false
        }
      ]
    },
    {
      "name": "Authors",
      "column": "authors",
      "items": [
        {
          "value": "sinequa",
          "display": "Sinequa",
          "count": 10
        }
      ]
    },
    {
      "name": "DocType",
      "column": "doctype",
      "items": [
        {
          "value": "fr.sinequa-es.v10",
          "display": "fr.sinequa-es.v10",
          "count": 3
        },
        {
          "value": "fr.sinequa-es.v11",
          "display": "fr.sinequa-es.v11",
          "count": 3
        },
        {
          "value": "en.sinequa-es.v10",
          "display": "en.sinequa-es.v10",
          "count": 2
        },
        {
          "value": "en.sinequa-es.v11",
          "display": "en.sinequa-es.v11",
          "count": 2
        }
      ]
    },
    {
      "name": "FileExt",
      "column": "fileext",
      "items": [
        {
          "value": "htm",
          "display": "htm",
          "count": 884
        },
        {
          "value": "html",
          "display": "html",
          "count": 10
        }
      ]
    },
    {
      "name": "Company",
      "column": "company",
      "items": [
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post",
          "count": 51,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times",
          "count": 62,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "ADVISORY BOARD",
          "display": "Advisory Board",
          "count": 2,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "UNITE",
          "display": "Unite",
          "count": 2,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "PARKER DRILLING",
          "display": "Parker Drilling",
          "count": 1,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "REUTERS",
          "display": "Reuters",
          "count": 15,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "FREDDIE MAC",
          "display": "Freddie Mac",
          "count": 2,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "AIR FORCE",
          "display": "Air Force",
          "count": 18,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "BLOOMBERG",
          "display": "Bloomberg",
          "count": 14,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "DEVRY EDUCATION",
          "display": "DeVry Education",
          "count": 1,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        },
        {
          "value": "NACCO INDUSTRIES",
          "display": "NACCO Industries",
          "count": 1,
          "$column": {
            "name": "company",
            "type": "csv",
            "typeModifier": "cel",
            "eType": 15,
            "eTypeModifier": 2068,
            "aliases": [
              "company"
            ],
            "label": "msg#metadata.companyLabel",
            "labelPlural": "msg#metadata.companyPluralLabel"
          },
          "$selected": false
        }
      ]
    },
    {
      "name": "Timeline",
      "column": "modified",
      "items": [
        {
          "value": "2019-W41",
          "count": 5
        },
        {
          "value": "2020-W05",
          "count": 5
        },
        {
          "value": "2020-W34",
          "count": 71
        },
        {
          "value": "2020-W35",
          "count": 311
        },
        {
          "value": "2020-W36",
          "count": 502
        }
      ]
    },
    {
      "name": "Treepath",
      "column": "treepath",
      "isTree": true,
      "count": 894,
      "hasChildren": true,
      "items": [
        {
          "value": "Product",
          "count": 10,
          "hasChildren": true,
          "items": [
            {
              "value": "Documentation",
              "count": 10,
              "hasChildren": true,
              "items": [
                {
                  "value": "V10",
                  "count": 5,
                  "hasChildren": true,
                  "items": [
                    {
                      "value": "Enterprise Search",
                      "count": 5,
                      "hasChildren": true,
                      "items": [
                        {
                          "value": "Documentation for Developers[fr]Documentation pour développeurs",
                          "count": 3,
                          "hasChildren": false,
                          "$path": "/Product/Documentation/V10/Enterprise Search/Documentation for Developers[fr]Documentation pour développeurs/",
                          "$column": {
                            "name": "treepath",
                            "type": "csv",
                            "typeModifier": "ct",
                            "eType": 15,
                            "eTypeModifier": 524292,
                            "aliases": [
                              "treepath",
                              "source"
                            ],
                            "label": "msg#metadata.treepathLabel",
                            "labelPlural": "msg#metadata.treepathPluralLabel"
                          },
                          "$level": 5,
                          "$opened": false
                        },
                        {
                          "value": "Syntax[fr]Syntaxe",
                          "count": 2,
                          "hasChildren": false,
                          "$path": "/Product/Documentation/V10/Enterprise Search/Syntax[fr]Syntaxe/",
                          "$column": {
                            "name": "treepath",
                            "type": "csv",
                            "typeModifier": "ct",
                            "eType": 15,
                            "eTypeModifier": 524292,
                            "aliases": [
                              "treepath",
                              "source"
                            ],
                            "label": "msg#metadata.treepathLabel",
                            "labelPlural": "msg#metadata.treepathPluralLabel"
                          },
                          "$level": 5,
                          "$opened": false
                        }
                      ],
                      "$path": "/Product/Documentation/V10/Enterprise Search/",
                      "$column": {
                        "name": "treepath",
                        "type": "csv",
                        "typeModifier": "ct",
                        "eType": 15,
                        "eTypeModifier": 524292,
                        "aliases": [
                          "treepath",
                          "source"
                        ],
                        "label": "msg#metadata.treepathLabel",
                        "labelPlural": "msg#metadata.treepathPluralLabel"
                      },
                      "$level": 4,
                      "$opened": false
                    }
                  ],
                  "$path": "/Product/Documentation/V10/",
                  "$column": {
                    "name": "treepath",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292,
                    "aliases": [
                      "treepath",
                      "source"
                    ],
                    "label": "msg#metadata.treepathLabel",
                    "labelPlural": "msg#metadata.treepathPluralLabel"
                  },
                  "$level": 3,
                  "$opened": false
                },
                {
                  "value": "V11",
                  "count": 5,
                  "hasChildren": true,
                  "items": [
                    {
                      "value": "Enterprise Search",
                      "count": 5,
                      "hasChildren": true,
                      "items": [
                        {
                          "value": "Documentation for Developers[fr]Documentation pour développeurs",
                          "count": 3,
                          "hasChildren": false,
                          "$path": "/Product/Documentation/V11/Enterprise Search/Documentation for Developers[fr]Documentation pour développeurs/",
                          "$column": {
                            "name": "treepath",
                            "type": "csv",
                            "typeModifier": "ct",
                            "eType": 15,
                            "eTypeModifier": 524292,
                            "aliases": [
                              "treepath",
                              "source"
                            ],
                            "label": "msg#metadata.treepathLabel",
                            "labelPlural": "msg#metadata.treepathPluralLabel"
                          },
                          "$level": 5,
                          "$opened": false
                        },
                        {
                          "value": "Syntax[fr]Syntaxe",
                          "count": 2,
                          "hasChildren": false,
                          "$path": "/Product/Documentation/V11/Enterprise Search/Syntax[fr]Syntaxe/",
                          "$column": {
                            "name": "treepath",
                            "type": "csv",
                            "typeModifier": "ct",
                            "eType": 15,
                            "eTypeModifier": 524292,
                            "aliases": [
                              "treepath",
                              "source"
                            ],
                            "label": "msg#metadata.treepathLabel",
                            "labelPlural": "msg#metadata.treepathPluralLabel"
                          },
                          "$level": 5,
                          "$opened": false
                        }
                      ],
                      "$path": "/Product/Documentation/V11/Enterprise Search/",
                      "$column": {
                        "name": "treepath",
                        "type": "csv",
                        "typeModifier": "ct",
                        "eType": 15,
                        "eTypeModifier": 524292,
                        "aliases": [
                          "treepath",
                          "source"
                        ],
                        "label": "msg#metadata.treepathLabel",
                        "labelPlural": "msg#metadata.treepathPluralLabel"
                      },
                      "$level": 4,
                      "$opened": false
                    }
                  ],
                  "$path": "/Product/Documentation/V11/",
                  "$column": {
                    "name": "treepath",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292,
                    "aliases": [
                      "treepath",
                      "source"
                    ],
                    "label": "msg#metadata.treepathLabel",
                    "labelPlural": "msg#metadata.treepathPluralLabel"
                  },
                  "$level": 3,
                  "$opened": false
                }
              ],
              "$path": "/Product/Documentation/",
              "$column": {
                "name": "treepath",
                "type": "csv",
                "typeModifier": "ct",
                "eType": 15,
                "eTypeModifier": 524292,
                "aliases": [
                  "treepath",
                  "source"
                ],
                "label": "msg#metadata.treepathLabel",
                "labelPlural": "msg#metadata.treepathPluralLabel"
              },
              "$level": 2,
              "$opened": true
            }
          ],
          "$path": "/Product/",
          "$column": {
            "name": "treepath",
            "type": "csv",
            "typeModifier": "ct",
            "eType": 15,
            "eTypeModifier": 524292,
            "aliases": [
              "treepath",
              "source"
            ],
            "label": "msg#metadata.treepathLabel",
            "labelPlural": "msg#metadata.treepathPluralLabel"
          },
          "$level": 1,
          "$opened": true
        },
        {
          "value": "web",
          "count": 884,
          "hasChildren": true,
          "items": [
            {
              "value": "Wiki",
              "count": 884,
              "hasChildren": false,
              "$path": "/web/Wiki/",
              "$column": {
                "name": "treepath",
                "type": "csv",
                "typeModifier": "ct",
                "eType": 15,
                "eTypeModifier": 524292,
                "aliases": [
                  "treepath",
                  "source"
                ],
                "label": "msg#metadata.treepathLabel",
                "labelPlural": "msg#metadata.treepathPluralLabel"
              },
              "$level": 2,
              "$opened": false
            }
          ],
          "$path": "/web/",
          "$column": {
            "name": "treepath",
            "type": "csv",
            "typeModifier": "ct",
            "eType": 15,
            "eTypeModifier": 524292,
            "aliases": [
              "treepath",
              "source"
            ],
            "label": "msg#metadata.treepathLabel",
            "labelPlural": "msg#metadata.treepathPluralLabel"
          },
          "$level": 1,
          "$opened": true
        }
      ]
    },
    {
      "name": "DocFormat",
      "column": "docformat",
      "items": [
        {
          "value": "htm",
          "display": "htm",
          "count": 894,
          "$column": {
            "name": "docformat",
            "type": "csv",
            "typeModifier": "acilx",
            "eType": 15,
            "eTypeModifier": 8390917,
            "aliases": [
              "docformat"
            ],
            "label": "msg#metadata.docformatLabel",
            "labelPlural": "msg#metadata.docformatPluralLabel"
          },
          "$selected": false
        }
      ]
    },
    {
      "name": "publicLabels",
      "column": "enginecsv1",
      "items": [
        {
          "value": "demo",
          "display": "demo",
          "count": 3
        },
        {
          "value": "president",
          "display": "president",
          "count": 1
        }
      ]
    },
    {
      "name": "privateLabels",
      "column": "engineusercsv1"
    },
    {
      "name": "DocumentLanguages",
      "column": "documentlanguages",
      "items": [
        {
          "value": "en",
          "count": 888,
          "$column": {
            "name": "documentlanguages",
            "type": "csv",
            "typeModifier": "ci",
            "eType": 15,
            "eTypeModifier": 260,
            "aliases": [
              "language"
            ],
            "label": "msg#metadata.documentlanguagesLabel",
            "labelPlural": "msg#metadata.documentlanguagesPluralLabel",
            "formatter": "language"
          },
          "$selected": false
        },
        {
          "value": "fr",
          "count": 6,
          "$column": {
            "name": "documentlanguages",
            "type": "csv",
            "typeModifier": "ci",
            "eType": 15,
            "eTypeModifier": 260,
            "aliases": [
              "language"
            ],
            "label": "msg#metadata.documentlanguagesLabel",
            "labelPlural": "msg#metadata.documentlanguagesPluralLabel",
            "formatter": "language"
          },
          "$selected": false
        }
      ]
    },
    {
      "name": "MatchingPartnames",
      "column": "matchingpartnames",
      "items": [
        {
          "value": "text",
          "count": 894
        },
        {
          "value": "tables",
          "count": 126
        },
        {
          "value": "title",
          "count": 9
        }
      ]
    },
    {
      "name": "Company_Person_Cooc",
      "column": "entity19",
      "items": [
        {
          "value": "(NEW YORK TIMES)#(OBAMA)",
          "display": "(New York Times)#(Obama)",
          "count": 17
        },
        {
          "value": "(FACEBOOK)#(MARK ZUCKERBERG)",
          "display": "(Facebook)#(Mark Zuckerberg)",
          "count": 13
        },
        {
          "value": "(NEW YORK TIMES)#(DONALD TRUMP)",
          "display": "(New York Times)#(Donald Trump)",
          "count": 9
        },
        {
          "value": "(NEW YORK TIMES)#(GEORGE W. BUSH)",
          "display": "(New York Times)#(George W. Bush)",
          "count": 9
        },
        {
          "value": "(NEW YORK TIMES)#(DAVID BROOKS)",
          "display": "(New York Times)#(David Brooks)",
          "count": 8
        },
        {
          "value": "(ALABAMA)#(JEFF SESSIONS)",
          "display": "(Alabama)#(Jeff Sessions)",
          "count": 7
        },
        {
          "value": "(WASHINGTON POST)#(DANA MILBANK)",
          "display": "(Washington Post)#(Dana Milbank)",
          "count": 7
        },
        {
          "value": "(WASHINGTON POST)#(DONALD TRUMP)",
          "display": "(Washington Post)#(Donald Trump)",
          "count": 7
        },
        {
          "value": "(WASHINGTON POST)#(GLENN KESSLER)",
          "display": "(Washington Post)#(Glenn Kessler)",
          "count": 7
        },
        {
          "value": "(WASHINGTON POST)#(OBAMA)",
          "display": "(Washington Post)#(Obama)",
          "count": 7
        },
        {
          "value": "(NEW YORK TIMES)#(BILL CLINTON)",
          "display": "(New York Times)#(Bill Clinton)",
          "count": 6
        }
      ]
    },
    {
      "name": "Size",
      "column": "size",
      "isDistribution": true,
      "valuesAreExpressions": true,
      "items": [
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
          },
          "$selected": false
        },
        {
          "value": "size`10 Ko à 100 Ko`:(>= 10240 AND < 102400)",
          "display": "10 Ko à 100 Ko",
          "count": 59,
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
          "count": 725,
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
          "count": 110,
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
          },
          "$selected": false
        }
      ]
    },
    {
      "name": "Person_Job_Company_Cooc",
      "column": "entity20",
      "items": [
        {
          "value": "(MARK ZUCKERBERG)#(CHIEF EXECUTIVE OFFICER)#(FACEBOOK)",
          "display": "(Mark Zuckerberg)#(Chief Executive Officer)#(Facebook)",
          "count": 8
        },
        {
          "value": "(HOWARD SCHULTZ)#(CHIEF EXECUTIVE OFFICER)#(STARBUCKS)",
          "display": "(Howard Schultz)#(Chief Executive Officer)#(Starbucks)",
          "count": 3
        },
        {
          "value": "(JAMIE DIMON)#(CHIEF EXECUTIVE OFFICER)#(J.P.MORGAN)",
          "display": "(Jamie Dimon)#(Chief Executive Officer)#(J.P.Morgan)",
          "count": 3
        },
        {
          "value": "(LLOYD BLANKFEIN)#(CHIEF EXECUTIVE OFFICER)#(GOLDMAN SACHS)",
          "display": "(Lloyd Blankfein)#(Chief Executive Officer)#(Goldman Sachs)",
          "count": 3
        },
        {
          "value": "(SATYA NADELLA)#(CHIEF EXECUTIVE OFFICER)#(MICROSOFT)",
          "display": "(Satya Nadella)#(Chief Executive Officer)#(Microsoft)",
          "count": 3
        },
        {
          "value": "(DENNIS MUILENBURG)#(CHIEF EXECUTIVE OFFICER)#(BOEING)",
          "display": "(Dennis Muilenburg)#(Chief Executive Officer)#(Boeing)",
          "count": 2
        },
        {
          "value": "(ERIC SCHMIDT)#(CHIEF EXECUTIVE OFFICER)#(GOOGLE)",
          "display": "(Eric Schmidt)#(Chief Executive Officer)#(Google)",
          "count": 2
        },
        {
          "value": "(FRANKLIN RAINES)#(CHIEF EXECUTIVE OFFICER)#(FANNIE MAE)",
          "display": "(Franklin Raines)#(Chief Executive Officer)#(Fannie Mae)",
          "count": 2
        },
        {
          "value": "(INDRA NOOYI)#(CHIEF EXECUTIVE OFFICER)#(PEPSICO)",
          "display": "(Indra Nooyi)#(Chief Executive Officer)#(PepsiCo)",
          "count": 2
        },
        {
          "value": "(JEFFREY IMMELT)#(CHIEF EXECUTIVE OFFICER)#(GENERAL ELECTRIC)",
          "display": "(Jeffrey Immelt)#(Chief Executive Officer)#(General Electric)",
          "count": 2
        },
        {
          "value": "(KEN LEWIS)#(CHIEF EXECUTIVE OFFICER)#(BANK OF AMERICA)",
          "display": "(Ken Lewis)#(Chief Executive Officer)#(Bank of America)",
          "count": 2
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
          "value": "modified`Depuis hier`:>= 2020-10-20",
          "display": "Depuis hier",
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
          },
          "$selected": false
        },
        {
          "value": "modified`Cette semaine`:>= 2020-10-19",
          "display": "Cette semaine",
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
          },
          "$selected": false
        },
        {
          "value": "modified`Ce mois ci`:>= 2020-10-01",
          "display": "Ce mois ci",
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
          },
          "$selected": false
        },
        {
          "value": "modified`Cette année`:>= 2020-01-01",
          "display": "Cette année",
          "count": 889,
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
          },
          "$selected": false
        },
        {
          "value": "modified`Avant cette année`:< 2020-01-01",
          "display": "Avant cette année",
          "count": 5,
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
          },
          "$selected": false
        }
      ]
    }
  ],
  "id": "6F86B492C0994406BE658CA0BF4F0FD0",
  "rowCount": 894,
  "totalRowCount": 894,
  "cursorRowCount": 20,
  "page": 1,
  "pageSize": 20,
  "columnCount": 87,
  "sort": "relevance",
  "attributes": {
    "cachehit": "1",
    "searchguid": "1D6F3E8FAE13428D992B43246BFE8CB4",
    "rowfetchtime": "0.01 ms",
    "processingtime": "3.22 ms",
    "internalquerylog": "<QueryLog>\t<timing name='AcqMRdLk' duration='0.00 ms' start='1.43 ms' tid='21'/>\n\t<timing name='AcqDBRdLk' duration='0.00 ms' start='1.43 ms' tid='21'/>\n\t<timing name='QueryProcessor::Parse' duration='1.32 ms' start='0.07 ms' tid='21'/>\n<Info Type='AutoOpt.SetOrderBySize' value='500'/>\n<Info Type='AutoOpt.MaxQueryHits' value='500'/>\n<IndexSearch index='SinequaDoc'>\n\t<timing name='AcqRLk' duration='0.00 ms' start='2.02 ms' tid='21'/>\n\t<timing name='Fetching DBQuery' duration='0.03 ms' start='2.04 ms' tid='21'/>\n\t<timing name='GetKeywords' duration='0.03 ms' start='2.08 ms' tid='21'/>\n\t<timing name='HeliumMatcher::HeliumMatcher' duration='0.13 ms' start='2.12 ms' tid='21'/>\n\t<timing name='Searching idx #0' duration='0.00 ms' start='2.27 ms' tid='21'/>\n\t<timing name='Searching idx #1' duration='0.00 ms' start='2.27 ms' tid='21'/>\n\t<timing name='Searching idx #2' duration='0.02 ms' start='2.28 ms' tid='21'/>\n\t<timing name='PSearching [1-100466[' duration='0.04 ms' start='2.27 ms' tid='21'/>\n\t<timing name='SearcherContext::FinalMergeAndSort' duration='0.00 ms' start='2.31 ms' tid='21'/>\n\t<timing name='FinalMergeAndSort [1-100466[' duration='0.01 ms' start='2.31 ms' tid='21'/>\n\t<timing name='MergeContexts' duration='0.00 ms' start='2.31 ms' tid='21'/>\n\t<timing name='FullTextSearchRWA' duration='0.26 ms' start='2.07 ms' tid='21'/>\n\t<timing name='SearchRWA' duration='0.31 ms' start='2.03 ms' tid='21'/>\n</IndexSearch><IndexSearch index='Wikipedia'>\n\t<timing name='AcqRLk' duration='0.00 ms' start='2.06 ms' tid='9'/>\n\t<timing name='Fetching DBQuery' duration='0.04 ms' start='2.08 ms' tid='9'/>\n\t<timing name='GetKeywords' duration='0.12 ms' start='2.16 ms' tid='9'/>\n\t<timing name='HeliumMatcher::HeliumMatcher' duration='0.04 ms' start='2.30 ms' tid='9'/>\n\t<timing name='Searching idx #0' duration='1.03 ms' start='2.36 ms' tid='9'/>\n\t<timing name='Searching idx #1' duration='0.81 ms' start='3.39 ms' tid='9'/>\n\t<timing name='Searching idx #2' duration='0.04 ms' start='4.21 ms' tid='9'/>\n\t<timing name='Searching idx #3' duration='0.04 ms' start='4.25 ms' tid='9'/>\n\t<timing name='Searching idx #4' duration='0.00 ms' start='4.30 ms' tid='9'/>\n\t<timing name='PSearching [1-83930[' duration='1.95 ms' start='2.36 ms' tid='9'/>\n\t<timing name='SearcherContext::FinalMergeAndSort' duration='0.17 ms' start='4.31 ms' tid='9'/>\n\t<timing name='FinalMergeAndSort [1-83930[' duration='0.17 ms' start='4.31 ms' tid='9'/>\n\t<timing name='MergeContexts' duration='0.05 ms' start='4.49 ms' tid='9'/>\n<Info Type='MacReached' Index='Wikipedia' limit='1000'/>\n\t<timing name='FullTextSearchRWA' duration='2.45 ms' start='2.14 ms' tid='9'/>\n\t<timing name='SearchRWA' duration='2.53 ms' start='2.07 ms' tid='9'/>\n</IndexSearch>\t<timing name='ConceptualizeDBRWA' duration='14.10 ms' start='4.82 ms' tid='21'/>\n\t<timing name='ComputeAttributeAggregates' duration='0.02 ms' start='18.94 ms' tid='21'/>\n\t<timing name='Grouper(AH-,GB+)' duration='0.19 ms' start='18.96 ms' tid='21'/>\n\t<timing name='correlation(geo,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true)' duration='0.33 ms' start='19.16 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='19.91 ms' tid='21'/>\n\t<timing name='distribution(title,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.72 ms' start='19.50 ms' tid='21'/>\n\t<timing name='correlation(person,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true)' duration='1.54 ms' start='20.22 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='21.80 ms' tid='21'/>\n\t<timing name='distribution(authors,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.04 ms' start='21.77 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='21.84 ms' tid='21'/>\n\t<timing name='distribution(doctype,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.03 ms' start='21.81 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='21.88 ms' tid='21'/>\n\t<timing name='distribution(fileext,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.04 ms' start='21.85 ms' tid='21'/>\n\t<timing name='correlation(company,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true)' duration='0.15 ms' start='21.89 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='22.45 ms' tid='21'/>\n\t<timing name='distribution(filename,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.64 ms' start='22.05 ms' tid='21'/>\n\t<timing name='distribution(modified,basicforms=true,labels=false,order2=labelasc,order=keyasc,mask=YYYY-WW,post-group-by=true,merge-groups=true)' duration='0.12 ms' start='22.69 ms' tid='21'/>\n\t<timing name='TreePathSort of 13 items' duration='0.00 ms' start='22.87 ms' tid='21'/>\n\t<timing name='BuildResultStringTreePath' duration='0.00 ms' start='22.89 ms' tid='21'/>\n\t<timing name='distribution(treepath,basicforms=false,labels=true,maxcount=20,minlevel=2,wantmore=true,order=labelasc,post-group-by=true,merge-groups=true)' duration='0.08 ms' start='22.82 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='22.93 ms' tid='21'/>\n\t<timing name='distribution(docformat,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.04 ms' start='22.90 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='22.96 ms' tid='21'/>\n\t<timing name='distribution(enginecsv1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.03 ms' start='22.94 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='23.00 ms' tid='21'/>\n\t<timing name='distribution(engineusercsv1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true,prefixes=&quot;internal|S-1-5-21-2165854416-2067547654-1784818317-6655|&quot;)' duration='0.03 ms' start='22.97 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='23.04 ms' tid='21'/>\n\t<timing name='distribution(documentlanguages,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.04 ms' start='23.01 ms' tid='21'/>\n\t<timing name='distribution(matchingpartnames,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.10 ms' start='23.05 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='23.77 ms' tid='21'/>\n\t<timing name='distribution(entity19,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.66 ms' start='23.15 ms' tid='21'/>\n\t<timing name='distribution(size,bounds=&quot;0;10240;102400;1048576;10485760;2147483646,order=freqdesc&quot;,post-group-by=true,merge-groups=true,count=11)' duration='0.08 ms' start='23.82 ms' tid='21'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='24.16 ms' tid='21'/>\n\t<timing name='distribution(entity20,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.56 ms' start='23.91 ms' tid='21'/>\n\t<timing name='distribution(modified,bounds=&quot;2020-01-01;2020-10-01;2020-10-19;2020-10-20,order=freqdesc&quot;,post-group-by=true,merge-groups=true,count=11)' duration='0.06 ms' start='24.47 ms' tid='21'/>\n\t<timing name='ComputeAttributeAggregates' duration='5.38 ms' start='19.15 ms' tid='21'/>\n</QueryLog>",
    "matchingrowcount": "1010",
    "internalqueryanalysis": "<?xml version='1.0' encoding='utf-8' standalone='yes' ?>\n<deep-query>\n<text>obama<tree>\n<word><surface-form>obama</surface-form><image>obama</image><form language=\"en\" weight=\"1.0000\">obama<base-form>obama</base-form></form>\n</word>\n</tree>\n</text>\n\n<semantic-descriptors>\n</semantic-descriptors><analysis></analysis><DYM><text form=\"obama\" /></DYM></deep-query>",
    "postgroupbymatchingrowcount": "894"
  },
  "records": [
    {
      "id": "/Web/Wikipedia/|Barack_Obama",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 1.088625,
      "matchingpartnames": [
        "text",
        "tables",
        "title"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "Barack Hussein {b}Obama{nb} II ( /bəˈrɑːk huːˈseɪn oʊˈbɑːmə/ ( listen )",
        "138,65",
        "43782,2200",
        "A member of the Democratic Party , {b}Obama{nb} was the first African-American president of the United States.",
        "337,103",
        "46320,260",
        "{b}Obama{nb} was born in Honolulu , Hawaii , making him the first president not born in the contiguous United States .",
        "562,111",
        "46922,274",
        "{b}Obama{nb} received national attention in 2004 with his March Senate primary win, his well-received July Democratic National Convention keynote address , and his landslide November election to the Senate.",
        "1197,199",
        "48370,430",
        "In 2008, he was nominated for president a year after his presidential campaign began, and after close primary campaigns against Hillary Clinton , {b}Obama{nb} was elected over Republican John McCain and was inaugurated alongside Joe Biden on January 20, 2009.",
        "1397,252",
        "48801,961",
        "{b}Obama{nb} signed many landmark bills into law during his first two years in office.",
        "1720,79",
        "49913,79",
        "After winning re-election by defeating Republican opponent Mitt Romney , {b}Obama{nb} was sworn in for a second term in 2013.",
        "2933,118",
        "53026,379",
        "{b}Obama{nb} nominated three justices to the Supreme Court :",
        "4235,53",
        "56684,156",
        "During {b}Obama{nb}'s term in office, the United States' reputation abroad significantly improved.",
        "4488,91",
        "57491,91",
        "{b}Obama{nb} left office in January 2017 and continues to reside in Washington, D.C.",
        "4786,77",
        "58065,135"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "153,5,372,5,562,5,1197,5,1543,5,1720,5,3006,5,4235,5,4495,5,4786,5,4888,5,5509,5,5581,5,5812,5,6011,5,6214,5,6254,5,6541,5,6596,5,7397,5,7965,5,8092,5,8360,5,8396,5,8586,5,8993,5,9248,5,9402,5,9580,5,9677,5,9854,5,10590,5,10803,5,10951,5,11108,5,11224,5,11519,5,11807,5,11926,5,12082,5,12527,5,12859,5,12959,5,13444,5,13756,5,14006,5,14213,5,14264,5,14781,5,14962,5,15101,5,15638,5,15954,5,16208,5,16724,5,16852,5,17025,5,17360,5,17826,5,18192,5,18775,5,19133,5,19482,5,19752,5,20610,5,21038,5,21149,5,21428,5,21748,5,22250,5,22755,5,22848,5,23026,5,23072,5,23274,5,23331,5,23536,5,24006,5,24246,5,24440,5,24686,5,24778,5,24825,5,25052,5,25260,5,25383,5,25673,5,25856,5,26104,5,26327,5,26633,5,26680,5,26840,5,27066,5,27573,5,27783,5,27837,5,28305,5,28629,5,28790,5,29081,5,29378,5,29504,5,29759,5,29828,5,29890,5,29989,5,30238,5,30311,5,30614,5,30732,5,31090,5,31167,5,31284,5,31395,5,31506,5,31566,5,31874,5,32033,5,32358,5,32487,5,32606,5,32974,5,33117,5,33210,5,33568,5,33904,5,34189,5,34340,5,34477,5,34772,5,35054,5,35383,5,35607,5,35679,5,35772,5,36193,5,36763,5,37058,5,37209,5,37652,5,38092,5,38453,5,38877,5,39246,5,39704,5,40050,5,40652,5,40832,5,41227,5,41507,5,42015,5,42222,5,42450,5,43021,5,43772,5,45065,5,45742,5,46040,5,46575,5,46632,5,46925,5,47046,5,47174,5,47497,5,48014,5,48063,5,48204,5,48317,5,48403,5,48449,5,48796,5,48892,5,50037,5,50163,5,50297,5,50719,5,53291,5,53407,5,53578,5,53762,5,54177,5,54341,5,55004,5,55147,5,55319,5,55661,5,55857,5,55994,5,56461,5,56603,5,56760,5,57195,5,57332,5,57467,5,57574,5,57800,5,57834,5,57904,5,58447,5,58576,5,59060,5,59173,5,59280,5,59575,5,59806,5,60028,5,60119,5,60308,5,60468,5,60628,5,60740,5,61180,5,61282,5,61512,5,61752,5,62273,5,62890,5,63223,5,63506,5,63739,5,63864,5,63971,5,64272,5,64475,5,64612,5,64990,5,65098,5,65356,5,65649,5,65926,5,66697,5,67125,5,67347,5,67500,5,67770,5,67816,5,68086,5,68194,5,68257,5,68839,5,68943,5,69756,5,69830,5,70227,5,70633,5,70972,5,71129,5,71366,5,71532,5,71995,5,72126,5,72341,5,72419,5,72721,5,72868,5,73508,5,73642,5,73850,5,73949,5,74159,5,74293,5,74468,5,74754,5,74948,5,75123,5,75263,5,75354,5,75644,5,76426,5,76630,5,76763,5,76987,5,77434,5,77632,5,78069,5,78213,5,78407,5,78614,5,78759,5,78845,5,78934,5,79095,5,79372,5,79524,5,79779,5,80109,5,80244,5,80372,5,80462,5,80732,5,81091,5,81345,5,81564,5,81897,5,82208,5,82249,5,82292,5,82503,5,82617,5,83080,5,83390,5,83602,5,84141,5,84780,5,84862,5,84964,5,85140,5,85375,5,86304,5,86434,5,86975,5,87130,5,87254,5,87610,5,88315,5,88730,5,88855,5,88887,5,89128,5,89768,5,89911,5,89955,5,90049,5,90127,5,90156,5,90863,5,91008,5,91059,5,91130,5,91192,5,91336,5,91377,5,91492,5,91541,5,91688,5,91726,5,91953,5,92139,5,92302,5,92430,5,92479,5,92588,5,92798,5,93059,5,93169,5,93224,5,93358,5,93411,5,93454,5,93507,5,93529,5,93632,5;43797,5,46448,5,46922,5,48370,5,49254,5,49913,5,53260,5,56684,5,57498,5,58065,5,86318,5,89312,5,90337,5,91114,5,91700,5,92074,5,92231,5,92752,5,92924,5,95121,5,96693,5,96943,5,97671,5,97824,5,98333,5,99209,5,99585,5,100024,5,100442,5,100657,5,101114,5,104050,5,104565,5,104832,5,105280,5,105567,5,106574,5,108541,5,108758,5,109144,5,110268,5,112720,5,113038,5,114429,5,115329,5,115835,5,116093,5,116376,5,117587,5,118194,5,118890,5,119850,5,121468,5,122059,5,122936,5,123354,5,123730,5,124862,5,126250,5,128749,5,131097,5,132352,5,133315,5,133813,5,135944,5,138188,5,138367,5,139175,5,139992,5,141717,5,142914,5,143235,5,144967,5,145033,5,145337,5,145520,5,146245,5,147524,5,147995,5,148550,5,149302,5,150784,5,150851,5,151482,5,152526,5,152956,5,153753,5,154215,5,154634,5,156194,5,156790,5,157077,5,157588,5,158421,5,159695,5,160980,5,161054,5,162877,5,165447,5,165699,5,167121,5,168072,5,168258,5,168785,5,170114,5,170248,5,170583,5,171210,5,171479,5,172297,5,172569,5,173645,5,173992,5,174395,5,176769,5,176984,5,177064,5,178100,5,178690,5,179342,5,180076,5,180671,5,184474,5,185088,5,185185,5,186486,5,187683,5,188526,5,189919,5,190490,5,191332,5,191855,5,193500,5,194946,5,196149,5,196440,5,197326,5,198492,5,199201,5,199602,5,200970,5,201911,5,203921,5,204687,5,205871,5,206775,5,208037,5,217323,5,217812,5,220040,5,220885,5,222237,5,223095,5,223547,5,224959,5,227082,5,230023,5,231889,5,232609,5,233713,5,233896,5,234645,5,236093,5,236459,5,237361,5,238224,5,238399,5,238870,5,239203,5,239409,5,239581,5,241982,5,242098,5,245154,5,245430,5,245842,5,247032,5,253935,5,254106,5,254343,5,254647,5,256777,5,257245,5,258538,5,258807,5,259975,5,260899,5,261610,5,262506,5,263912,5,264440,5,266106,5,267057,5,267369,5,267744,5,268012,5,269457,5,270447,5,270593,5,271480,5,271972,5,273043,5,274351,5,274583,5,275499,5,276059,5,276628,5,276956,5,277439,5,278442,5,278684,5,278916,5,279660,5,279882,5,281951,5,282639,5,284449,5,285769,5,286400,5,288190,5,288733,5,289134,5,289361,5,289872,5,290412,5,290691,5,291325,5,291644,5,292190,5,292868,5,295234,5,296895,5,298380,5,299695,5,300304,5,301302,5,301348,5,302183,5,313309,5,315612,5,316984,5,317230,5,321043,5,321137,5,321658,5,322440,5,323209,5,323486,5,324249,5,325999,5,327010,5,327396,5,327924,5,328122,5,328711,5,329098,5,330312,5,330776,5,331272,5,333078,5,334011,5,334410,5,335936,5,336463,5,336889,5,337190,5,337490,5,337701,5,339372,5,341186,5,341880,5,342133,5,344073,5,345625,5,346145,5,347323,5,347699,5,348598,5,349117,5,349319,5,350700,5,350997,5,351297,5,352244,5,352516,5,353058,5,353671,5,353862,5,354110,5,354338,5,354872,5,356128,5,356584,5,356923,5,357544,5,358646,5,358745,5,358792,5,359123,5,359451,5,360299,5,361329,5,361765,5,363101,5,364365,5,364818,5,365203,5,365442,5,365803,5,368446,5,368596,5,370358,5,370999,5,371350,5,372305,5,373462,5,374805,5,374930,5,375088,5,375974,5,377519,5,378008,5,378439,5,378605,5,379207,5,379236,5,384791,5,385413,5,385647,5,386008,5,386228,5,386714,5,386871,5,1861743,5,1861944,5,1862750,5,1862947,5,1864808,5,1865310,5,1865637,5,1866148,5,1866487,5,1867511,5,1868401,5,1868845,5,1869124,5,1869683,5,1869923,5,1870495,5,1870693,5,1871295,5,1872111,5,1873089,5"
          },
          {
            "partname": "tables",
            "data": "93690,5,94106,5,94271,5,94297,5,94557,5,94718,5;2498493,5,2498922,5,2499091,5,2499117,5,2499384,5,2499548,5"
          },
          {
            "partname": "title",
            "data": "94784,5;2499694,5"
          }
        ]
      },
      "groupcount": 2,
      "title": "Barack Obama",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 14:40:56",
      "indexationtime": "2020-09-01 20:46:12",
      "version": "Z5n6t/2Whdsw1VtpdwzS4w==",
      "size": 2498377,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Barack_Obama",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "JOE BIDEN",
          "display": "Joe Biden"
        },
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "GEORGE W. BUSH",
          "display": "George W. Bush"
        },
        {
          "value": "BENJAMIN NETANYAHU",
          "display": "Benjamin Netanyahu"
        },
        {
          "value": "RONALD REAGAN",
          "display": "Ronald Reagan"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "OSAMA BIN LADEN",
          "display": "Osama bin Laden"
        },
        {
          "value": "ANGELA MERKEL",
          "display": "Angela Merkel"
        },
        {
          "value": "DONALD TRUMP",
          "display": "Donald Trump"
        },
        {
          "value": "JAMES BYRD",
          "display": "James Byrd"
        },
        {
          "value": "JOHN MCCAIN",
          "display": "John McCain"
        },
        {
          "value": "MITT ROMNEY",
          "display": "Mitt Romney"
        },
        {
          "value": "TRUMP",
          "display": "Trump"
        },
        {
          "value": "ALICE PALMER",
          "display": "Alice Palmer"
        },
        {
          "value": "DERRICK BELL",
          "display": "Derrick Bell"
        },
        {
          "value": "EMMANUEL MACRON",
          "display": "Emmanuel Macron"
        },
        {
          "value": "FRANKLIN D. ROOSEVELT",
          "display": "Franklin D. Roosevelt"
        },
        {
          "value": "GEORGE H. W. BUSH",
          "display": "George H. W. Bush"
        }
      ],
      "company": [
        {
          "value": "CITIBANK",
          "display": "Citibank"
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "FACEBOOK",
          "display": "Facebook"
        },
        {
          "value": "GENERAL MOTORS",
          "display": "General Motors"
        },
        {
          "value": "HARRIS INTERACTIVE",
          "display": "Harris Interactive"
        },
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        },
        {
          "value": "NETFLIX",
          "display": "Netflix"
        },
        {
          "value": "SHILOH INDUSTRIES",
          "display": "Shiloh Industries"
        },
        {
          "value": "SUTTER",
          "display": "Sutter"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "CHICAGO",
          "display": "Chicago"
        },
        {
          "value": "ILLINOIS",
          "display": "Illinois"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "IRAN",
          "display": "Iran"
        },
        {
          "value": "AFGHANISTAN",
          "display": "Afghanistan"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "HAWAII",
          "display": "Hawaii"
        },
        {
          "value": "RUSSIA",
          "display": "Russia"
        },
        {
          "value": "ISRAEL",
          "display": "Israel"
        },
        {
          "value": "CUBA",
          "display": "Cuba"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "NEW YORK",
          "display": "New York"
        },
        {
          "value": "LIBYA",
          "display": "Libya"
        },
        {
          "value": "HONOLULU",
          "display": "Honolulu"
        },
        {
          "value": "INDONESIA",
          "display": "Indonesia"
        },
        {
          "value": "FRANCE",
          "display": "France"
        },
        {
          "value": "SYRIA",
          "display": "Syria"
        },
        {
          "value": "MIDDLE EAST",
          "display": "Middle East"
        },
        {
          "value": "SAUDI ARABIA",
          "display": "Saudi Arabia"
        }
      ],
      "wordcount": 10871,
      "exacthash": "4ctg4IAcwsTxA5PlTUJDcA==",
      "nearhash": "Cr/TM34s5xxKewKmxPtiOw==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Barack_Obama",
      "sourcecsv1": [
        "Barack Obama",
        "44th President of the United States",
        "Vice President",
        "Preceded by",
        "Succeeded by",
        "United States Senator from Illinois",
        "Member of the Illinois Senate from the 13th district",
        "Born",
        "Political party",
        "Spouse",
        "Children",
        "Mother",
        "Father",
        "Relatives",
        "Residence",
        "Education",
        "Alma mater",
        "Awards",
        "Website",
        "External video"
      ],
      "sourcecsv2": [
        "Barack_(disambiguation)",
        "Obama_(disambiguation)",
        "Barack_Obama_(disambiguation)",
        "President_of_the_United_States",
        "Joe_Biden",
        "George_W._Bush",
        "Donald_Trump",
        "United_States_Senate",
        "List_of_United_States_senators_from_Illinois",
        "Peter_Fitzgerald_(politician)",
        "Roland_Burris",
        "Illinois_Senate",
        "Alice_Palmer_(politician)",
        "Kwame_Raoul",
        "Honolulu",
        "Hawaii",
        "Democratic_Party_(United_States)",
        "Michelle_Obama",
        "Family_of_Barack_Obama",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Obama_family",
        "Kalorama_(Washington,_D.C.)",
        "Punahou_School",
        "Alma_mater",
        "Occidental_College",
        "Columbia_University",
        "Bachelor_of_Arts",
        "Harvard_Law_School",
        "Juris_Doctor",
        "Nobel_Peace_Prize",
        "2009_Nobel_Peace_Prize",
        "Profile_in_Courage_Award",
        "Political_positions_of_Barack_Obama",
        "Electoral_history_of_Barack_Obama",
        "Early_life_and_career_of_Barack_Obama",
        "Public_image_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "United_States_Senate_career_of_Barack_Obama",
        "Presidency_of_Barack_Obama",
        "Timeline_of_the_Barack_Obama_presidency",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Obama_Doctrine",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_2008_presidential_campaign",
        "2008_United_States_presidential_election",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Patient_Protection_and_Affordable_Care_Act",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Barack_Obama_2012_presidential_campaign",
        "2012_United_States_presidential_election",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Second_inauguration_of_Barack_Obama",
        "Immigration_reform_in_the_United_States#Obama&#39",
        "s_executive_actions_of_November_2014",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "Barack_Obama_Presidential_Center",
        "Obama_Foundation",
        "One_America_Appeal",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "African_Americans",
        "U.S._senator",
        "Illinois",
        "Illinois_state_senator",
        "Contiguous_United_States",
        "Chicago",
        "Harvard_Law_Review",
        "University_of_Chicago_Law_School",
        "United_States_Senate_election_in_Illinois,_2004",
        "2004_Democratic_National_Convention",
        "Democratic_Party_presidential_primaries,_2008",
        "Hillary_Clinton",
        "Republican_Party_(United_States)",
        "John_McCain",
        "Public_health_insurance_option",
        "Dodd%E2%80%93Frank_Wall_Street_Reform_and_Consumer_Protection_Act",
        "Don%27t_Ask,_Don%27t_Tell_Repeal_Act_of_2010",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Tax_Relief,_Unemployment_Insurance_Reauthorization,_and_Job_Creation_Act_of_2010",
        "Great_Recession_in_the_United_States",
        "Budget_Control_Act_of_2011",
        "American_Taxpayer_Relief_Act_of_2012",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "New_START",
        "Iraq_War",
        "2011_military_intervention_in_Libya",
        "United_Nations_Security_Council_Resolution_1973",
        "Muammar_Gaddafi",
        "Al-Qaeda",
        "Anwar_al-Awlaki",
        "Mitt_Romney",
        "LGBT_American",
        "Supreme_Court_of_the_United_States",
        "Same-sex_marriage_in_the_United_States",
        "United_States_v._Windsor",
        "Obergefell_v._Hodges",
        "Gun_politics_in_the_United_States",
        "Sandy_Hook_Elementary_School_shooting",
        "Assault_weapons",
        "Global_warming",
        "American-led_intervention_in_Iraq_(2014%E2%80%93present)",
        "Islamic_State_of_Iraq_and_the_Levant",
        "Ending_U.S._combat_operations_in_Afghanistan",
        "Paris_Agreement",
        "International_sanctions_during_the_Ukrainian_crisis",
        "Russian_military_intervention_in_Ukraine_(2014%E2%80%93present)",
        "Russian_interference_in_the_2016_United_States_elections",
        "Hiroshima_Peace_Memorial_Park",
        "African_Union",
        "Barack_Obama_Supreme_Court_candidates",
        "Sonia_Sotomayor",
        "Elena_Kagan",
        "Merrick_Garland",
        "Merrick_Garland_Supreme_Court_nomination",
        "Historical_rankings_of_presidents_of_the_United_States",
        "Washington,_D.C.",
        "Kapiolani_Medical_Center_for_Women_and_Children",
        "Wichita,_Kansas",
        "Ancestry.com",
        "John_Punch_(slave)",
        "Colony_of_Virginia",
        "Luo_people_of_Kenya_and_Tanzania",
        "Nyang%27oma_Kogelo",
        "Russian_language",
        "University_of_Hawaii_at_Manoa",
        "Wailuku,_Hawaii",
        "University_of_Washington",
        "Seattle",
        "Economics",
        "Harvard_University",
        "Master_of_Arts",
        "Lolo_Soetoro",
        "University_of_Hawaii",
        "Native_Indonesian",
        "East%E2%80%93West_Center",
        "Graduate_student",
        "Geography",
        "Molokai",
        "J-1_visa",
        "Indonesia",
        "Tebet,_South_Jakarta",
        "South_Jakarta",
        "Menteng",
        "Central_Jakarta",
        "Indonesian_Language",
        "State_Elementary_School_Menteng_01",
        "Calvert_School",
        "Jakarta",
        "Indonesian_language",
        "Madelyn_Dunham",
        "Stanley_Armour_Dunham",
        "University-preparatory_school",
        "Maya_Soetoro-Ng",
        "Anthropology",
        "PhD",
        "Ovarian_cancer",
        "Uterine_cancer",
        "Alcohol_(drug)",
        "Marijuana",
        "Cocaine",
        "Los_Angeles",
        "Disinvestment_from_South_Africa",
        "Apartheid",
        "Pakistan",
        "India",
        "Political_science",
        "International_relations",
        "English_literature",
        "Business_International_Corporation",
        "New_York_Public_Interest_Research_Group",
        "City_College_of_New_York",
        "Bernie_Mac",
        "Margaret_Thatcher",
        "Moneygall",
        "Jefferson_Davis",
        "President_of_the_Confederate_States_of_America",
        "American_Civil_War",
        "Dick_Cheney",
        "Sheila_Miyoshi_Jager",
        "Green_Room_(White_House)",
        "Sidley_Austin",
        "In_vitro_fertilization",
        "University_of_Chicago_Laboratory_Schools",
        "Sidwell_Friends_School",
        "Portuguese_Water_Dog",
        "Bo_(dog)",
        "Ted_Kennedy",
        "Sunny_(dog)",
        "Jump_shot_(basketball)",
        "Pickup_game",
        "White_House",
        "Chicago_White_Sox",
        "2005_American_League_Championship_Series",
        "2009_Major_League_Baseball_All-Star_Game",
        "Chicago_Bears",
        "National_Football_League",
        "Steeler_Nation",
        "Super_Bowl_XLIII",
        "1985_Chicago_Bears_season",
        "Super_Bowl_XX",
        "Space_Shuttle_Challenger_disaster",
        "Hyde_Park,_Chicago",
        "Kenwood,_Chicago",
        "Tony_Rezko",
        "Money_(magazine)",
        "Fisher_House_Foundation",
        "Glamour_(magazine)",
        "Feminist",
        "Protestant",
        "Secular_humanism",
        "Atheism",
        "Black_church",
        "Community_organizing",
        "African_Methodist_Episcopal_Church",
        "Christianity_Today",
        "Redeemer_(Christianity)",
        "Resurrection_of_Jesus",
        "Golden_Rule",
        "Trinity_United_Church_of_Christ",
        "Jeremiah_Wright",
        "Jeremiah_Wright_controversy",
        "Shiloh_Baptist_Church_(Washington,_D.C.)",
        "St._John%27s_Episcopal_Church,_Lafayette_Square",
        "Camp_David",
        "Developing_Communities_Project",
        "Roseland,_Chicago",
        "West_Pullman,_Chicago",
        "Riverdale,_Chicago",
        "South_Side,_Chicago",
        "Altgeld_Gardens_Homes_(Chicago,_Illinois)",
        "Gamaliel_Foundation",
        "WGBH_Educational_Foundation",
        "Northwestern_University_School_of_Law",
        "Somerville,_Massachusetts",
        "Laurence_Tribe",
        "Associate_attorney",
        "Hopkins_%26_Sutter",
        "Magna_cum_laude",
        "List_of_African-American_firsts",
        "Constitutional_law",
        "Lecturer",
        "Project_Vote",
        "Voter_registration_campaign",
        "Crain%27s_Chicago_Business",
        "Of_counsel",
        "Class-action_lawsuit",
        "Equal_Credit_Opportunity_Act",
        "Fair_Housing_Act",
        "Woods_Fund_of_Chicago",
        "Joyce_Foundation",
        "Chicago_Annenberg_Challenge",
        "ShoreBank",
        "South_Shore,_Chicago",
        "Chicago_Lawn,_Chicago",
        "Tax_credit",
        "Welfare_reform",
        "Payday_loan",
        "Predatory_lending",
        "Foreclosure",
        "2000_Illinois%27s_1st_congressional_district_election",
        "Illinois%27s_1st_congressional_district",
        "United_States_House_of_Representatives",
        "Bobby_Rush",
        "Racial_profiling",
        "Capital_punishment_in_the_United_States",
        "2004_United_States_Senate_election_in_Illinois",
        "David_Axelrod_(political_consultant)",
        "2003_invasion_of_Iraq",
        "Iraq_Resolution",
        "Protests_against_the_Iraq_War",
        "Carol_Moseley_Braun",
        "Democratic_National_Committee",
        "Jack_Ryan_(politician)",
        "Alan_Keyes",
        "Congressional_Black_Caucus",
        "Congressional_Quarterly",
        "Resignation_from_the_United_States_Senate",
        "Lame_duck_(politics)",
        "List_of_bills_sponsored_by_Barack_Obama_in_the_United_States_Senate",
        "Sponsor_(legislative)",
        "Secure_America_and_Orderly_Immigration_Act",
        "Nunn%E2%80%93Lugar_Cooperative_Threat_Reduction",
        "Federal_Funding_Accountability_and_Transparency_Act_of_2006",
        "Tom_Carper",
        "Tom_Coburn",
        "Tort_reform",
        "Class_Action_Fairness_Act_of_2005",
        "Foreign_Intelligence_Surveillance_Act_of_1978_Amendments_Act_of_2008",
        "NSA_warrantless_surveillance_(2001%E2%80%9307)",
        "Richard_Lugar",
        "Democratic_Republic_of_the_Congo",
        "Honest_Leadership_and_Open_Government_Act",
        "Deceptive_Practices_and_Voter_Intimidation_Prevention_Act",
        "Iraq_War_De-Escalation_Act_of_2007",
        "Disinvestment_from_Iran",
        "Comprehensive_Iran_Sanctions,_Accountability,_and_Divestment_Act_of_2010",
        "State_Children%27s_Health_Insurance_Program",
        "United_States_Senate_Committee_on_Foreign_Relations",
        "United_States_Senate_Committee_on_Environment_and_Public_Works",
        "United_States_Senate_Committee_on_Veterans%27_Affairs",
        "United_States_Senate_Committee_on_Health,_Education,_Labor_and_Pensions",
        "United_States_Senate_Committee_on_Homeland_Security_and_Governmental_Affairs",
        "United_States_Senate_Foreign_Relations_Subcommittee_on_Europe_and_Regional_Security_Cooperation",
        "Mahmoud_Abbas",
        "President_of_the_Palestinian_National_Authority",
        "University_of_Nairobi",
        "Springfield,_Illinois",
        "United_States",
        "Old_State_Capitol_State_Historic_Site_(Illinois)",
        "Abraham_Lincoln",
        "Lincoln%27s_House_Divided_Speech",
        "Energy_policy_of_the_United_States",
        "Health_care_reform_in_the_United_States",
        "Delegate_(American_politics)",
        "Caucus",
        "Oval_Office",
        "Delaware",
        "Evan_Bayh",
        "Tim_Kaine",
        "2008_Democratic_National_Convention",
        "Denver",
        "Bill_Clinton",
        "Invesco_Field_at_Mile_High",
        "Campaign_finance_in_the_United_States",
        "Sarah_Palin",
        "United_States_presidential_election_debates",
        "Electoral_College_(United_States)",
        "Election",
        "Barack_Obama_election_victory_speech,_2008",
        "Grant_Park_(Chicago)",
        "Federal_Election_Commission",
        "Democratic_Party_presidential_primaries,_2012",
        "2012_Democratic_National_Convention",
        "Charlotte,_North_Carolina",
        "Paul_Ryan",
        "Franklin_D._Roosevelt",
        "List_of_United_States_presidential_elections_by_popular_vote_margin",
        "McCormick_Place",
        "Confirmations_of_Barack_Obama%27s_Cabinet",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "Oath_of_office_of_the_President_of_the_United_States",
        "Chief_Justice_of_the_United_States",
        "John_Roberts",
        "United_States_Capitol",
        "Executive_order",
        "Presidential_memorandum",
        "Guantanamo_Bay_detention_camp",
        "Ronald_Reagan",
        "Mexico_City_policy",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "Statute_of_limitations",
        "Embryonic_stem_cell",
        "Barack_Obama_speech_to_joint_session_of_Congress,_February_2009",
        "Speaker_of_the_United_States_House_of_Representatives",
        "Nancy_Pelosi",
        "Associate_Justice_of_the_Supreme_Court_of_the_United_States",
        "David_Souter",
        "Hispanic",
        "John_Paul_Stevens",
        "Health_Care_and_Education_Reconciliation_Act_of_2010",
        "Reconciliation_(United_States_Congress)",
        "Pell_Grant",
        "Metropolitan_Museum",
        "New_York_City",
        "Tarja_Halonen",
        "President_of_Finland",
        "Pentti_Araj%C3%A4rvi",
        "Cabinet_of_the_United_States",
        "The_Pentagon",
        "NASA",
        "Human_spaceflight",
        "Ares_I",
        "Ares_V",
        "Constellation_program",
        "International_Space_Station",
        "2011_State_of_the_Union_Address",
        "Innovation_economics",
        "Earmark_(politics)",
        "Sustainable_energy",
        "Matthew_Shepard_and_James_Byrd_Jr._Hate_Crimes_Prevention_Act",
        "Hate_crime_laws_in_the_United_States",
        "HIV",
        "Immigration_Equality",
        "Don%27t_ask,_don%27t_tell",
        "United_States_Armed_Forces",
        "Transgender_personnel_in_the_United_States_military",
        "LGBT_rights_in_the_United_States",
        "Hollingsworth_v._Perry",
        "Defense_of_Marriage_Act",
        "Human_Rights_Campaign",
        "White_House_Council_on_Women_and_Girls",
        "White_House_Office_of_Intergovernmental_Affairs",
        "Executive_order_(United_States)",
        "Senior_Advisor_to_the_President",
        "Valerie_Jarrett",
        "White_House_Task_Force_to_Protect_Students_from_Sexual_Assault",
        "Office_of_the_Vice_President_of_the_United_States",
        "Violence_Against_Women_Act",
        "Stimulus_(economics)",
        "Great_Recession",
        "Tax_incentive",
        "United_States_federal_budget",
        "National_debt_of_the_United_States",
        "Treasury_Secretary",
        "Timothy_Geithner",
        "Financial_crisis_of_2007%E2%80%9308",
        "Public%E2%80%93Private_Investment_Program_for_Legacy_Assets",
        "Automotive_industry_crisis_of_2008%E2%80%9310",
        "General_Motors",
        "Chrysler",
        "Chrysler_Chapter_11_reorganization",
        "Fiat",
        "General_Motors_Chapter_11_reorganization",
        "Car_Allowance_Rebate_System",
        "Federal_Reserve_System",
        "Congressional_Budget_Office",
        "2010_United_States_federal_budget",
        "Gross_domestic_product",
        "United_States_debt_ceiling",
        "Federal_government_of_the_United_States",
        "Default_(finance)",
        "Unemployment_rate",
        "Ben_Bernanke",
        "National_Association_for_Business_Economics",
        "NATO",
        "World_War_II",
        "OECD",
        "2010_United_States_elections",
        "Bush_tax_cuts",
        "Federal_Insurance_Contributions_Act_tax",
        "Estate_tax_in_the_United_States",
        "Income_inequality_in_the_United_States",
        "Fast_food_worker_strikes",
        "Pope_Francis",
        "Trickle-down_economics",
        "Trans-Pacific_Partnership",
        "Climate_change_policy_of_the_United_States",
        "BP_oil_spill",
        "United_States_Coast_Guard",
        "Venice,_Louisiana",
        "Drilling_rig",
        "Macondo_Prospect",
        "Gulf_of_Mexico",
        "Deepwater_Horizon_oil_spill",
        "United_States_Secretary_of_the_Interior",
        "Ken_Salazar",
        "Deepwater_drilling",
        "Keystone_XL_pipeline",
        "Petroleum_exploration_in_the_Arctic",
        "Conservation_movement",
        "Federal_lands",
        "Antiquities_Act",
        "National_monument_(United_States)",
        "Healthcare_reform_in_the_United_States",
        "United_States_Congress",
        "Health_care_in_the_United_States",
        "Pre-existing_condition",
        "Federal_poverty_level",
        "Congressional_Research_Service",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "Provisions_of_the_Patient_Protection_and_Affordable_Care_Act",
        "Medicaid",
        "Health_insurance_exchange",
        "JAMA_(journal)",
        "Tax_bracket",
        "Indoor_tanning",
        "Medicare_Advantage",
        "National_Federation_of_Independent_Business_v._Sebelius",
        "Burwell_v._Hobby_Lobby_Stores,_Inc.",
        "Religious_Freedom_Restoration_Act",
        "King_v._Burwell",
        "Energy_policy",
        "State_of_the_Union",
        "2012_Aurora,_Colorado_shooting",
        "University_of_Colorado_Hospital",
        "Federal_Assault_Weapons_Ban",
        "Bureau_of_Alcohol,_Tobacco,_Firearms_and_Explosives",
        "Women%27s_suffrage",
        "Civil_rights_movements",
        "2010_United_States_House_of_Representatives_elections",
        "2010_United_States_Senate_elections",
        "Federal_Communications_Commission",
        "Internet_access",
        "Net_neutrality",
        "Barack_Obama_on_mass_surveillance",
        "Patriot_Act",
        "Global_surveillance_disclosures_(2013%E2%80%93present)",
        "Whistleblower",
        "Edward_Snowden",
        "A_New_Beginning",
        "Cairo_University",
        "Jamal_Khashoggi",
        "Bambang_Harymurti",
        "Nahum_Barnea",
        "United_States_Secretary_of_State",
        "Russian_reset",
        "Al_Arabiya",
        "Ankara",
        "Angela_Merkel",
        "2009_Iranian_presidential_election",
        "President_of_the_United_Nations_Security_Council",
        "United_Nations_Security_Council",
        "Benjamin_Netanyahu",
        "East_Jerusalem",
        "Dmitry_Medvedev",
        "START_I",
        "Matteo_Renzi",
        "LGBT_rights_by_country_or_territory",
        "2014_Winter_Olympics",
        "Sochi",
        "United_States%E2%80%93Cuban_Thaw",
        "Cuba%E2%80%93United_States_relations",
        "Saudi_Arabian-led_intervention_in_Yemen",
        "Saudi_Arabia%E2%80%93United_States_relations",
        "Saudi_Arabia",
        "2016_Sana%27a_funeral_airstrike",
        "United_States_Marine_Corps",
        "Counter-terrorism",
        "David_Cameron",
        "2010_G20_Toronto_summit",
        "Northern_Iraq_offensive_(June_2014)",
        "Sinjar_massacre",
        "82nd_Airborne_Division",
        "David_D._McKiernan",
        "Special_Forces_(United_States_Army)",
        "Stanley_A._McChrystal",
        "David_Petraeus",
        "Shimon_Peres",
        "Israeli_settlement",
        "Two-state_solution",
        "Arab%E2%80%93Israeli_conflict",
        "Joint_Political_Military_Group",
        "Iron_Dome",
        "Palestinian_rocket_attacks_on_Israel",
        "Jeffrey_Goldberg",
        "Zionism",
        "Civil_Rights_Movement",
        "2014_Israel%E2%80%93Gaza_conflict",
        "United_Nations_Security_Council_Resolution_2334",
        "Palestinian_territories",
        "Vladimir_Putin",
        "Arab_Spring",
        "Arab_League",
        "Misrata",
        "Tomahawk_(missile)",
        "Northrop_Grumman_B-2_Spirit",
        "Operation_Unified_Protector",
        "Foreign_involvement_in_the_Syrian_Civil_War",
        "American-led_intervention_in_the_Syrian_Civil_War",
        "Syrian_Civil_War",
        "Bashar_al-Assad",
        "Timber_Sycamore",
        "Ghouta_chemical_attack",
        "U.S._Government_Assessment_of_the_Syrian_Government%27s_Use_of_Chemical_Weapons_on_August_21,_2013",
        "Destruction_of_Syria%27s_chemical_weapons",
        "Chlorine_gas",
        "Military_intervention_against_ISIL",
        "Wikisource",
        "Operation_Neptune%27s_Spear",
        "White_House_Situation_Room",
        "Situation_Room_(photograph)",
        "Osama_bin_Laden",
        "Osama_bin_Laden%27s_compound_in_Abbottabad",
        "Abbottabad",
        "Islamabad",
        "Leon_Panetta",
        "United_States_Navy_SEALs",
        "World_Trade_Center_site",
        "Times_Square",
        "Reactions_to_the_death_of_Osama_bin_Laden",
        "Negotiations_leading_to_the_Joint_Comprehensive_Plan_of_Action",
        "Nuclear_weapon",
        "Joint_Plan_of_Action",
        "Hezbollah",
        "Drug_Enforcement_Administration",
        "Project_Cassandra",
        "Central_Intelligence_Agency",
        "Ra%C3%BAl_Castro",
        "Vatican_City",
        "Prisoner_exchange",
        "Death_of_Nelson_Mandela",
        "Johannesburg",
        "Cuban_Thaw",
        "The_New_Republic",
        "Havana",
        "Calvin_Coolidge",
        "Addis_Ababa",
        "Education_in_Africa",
        "Economy_of_Africa",
        "LGBT",
        "Democratization",
        "United_States_presidential_visits_to_Sub-Saharan_Africa",
        "Hiroshima",
        "Atomic_bombings_of_Hiroshima_and_Nagasaki",
        "Shinz%C5%8D_Abe",
        "Hiroshima_Peace_Memorial_Museum",
        "Russia%E2%80%93United_States_relations#From_Obama’s_first_term_to_election_of_Trump_(2009–16)",
        "Annexation_of_Crimea_by_the_Russian_Federation",
        "Russian_military_intervention_in_Syria",
        "2016_United_States_election_interference_by_Russia",
        "2016_United_States_presidential_election",
        "George_Robertson,_Baron_Robertson_of_Port_Ellen",
        "International_reactions_to_the_2008_United_States_presidential_election",
        "Ivy_League",
        "Civil_rights_movement",
        "National_Association_of_Black_Journalists",
        "Gallup_Organization",
        "Harris_Insights_%26_Analytics",
        "France_24",
        "International_Herald_Tribune",
        "2012_UEFA_Champions_League_Final",
        "Grammy_Award_for_Best_Spoken_Word_Album",
        "Grammy_Award",
        "Audiobook",
        "Barack_Obama_presidential_primary_campaign,_2008",
        "Yes_We_Can_(will.i.am_song)",
        "Daytime_Emmy_Award",
        "Time_(magazine)",
        "Time_Person_of_the_Year",
        "Parliament_of_the_United_Kingdom",
        "Westminster_Hall",
        "Charles_de_Gaulle",
        "Nelson_Mandela",
        "Elizabeth_II",
        "Pope_Benedict_XVI",
        "Norwegian_Nobel_Committee",
        "Oslo",
        "The_New_York_Times",
        "Geir_Lundestad",
        "Inauguration_of_Donald_Trump",
        "Executive_One",
        "Joint_Base_Andrews",
        "Kalorama,_Washington,_D.C.",
        "John_F._Kennedy_Presidential_Library_and_Museum",
        "University_of_Chicago",
        "2017_French_presidential_election",
        "Emmanuel_Macron",
        "Marine_Le_Pen",
        "Berlin",
        "Kensington_Palace",
        "Prince_Harry",
        "Manchester_Arena_bombing",
        "Mauricio_Macri",
        "Better_Care_Reconciliation_Act_of_2017",
        "Jeff_Sessions",
        "Deferred_Action_for_Childhood_Arrivals",
        "Jimmy_Carter",
        "George_H._W._Bush",
        "Hurricane_Harvey",
        "Hurricane_Irma",
        "Gulf_Coast_of_the_United_States",
        "Texas",
        "Penguin_Random_House",
        "China",
        "Xi_Jinping",
        "Narendra_Modi",
        "Dalai_Lama",
        "Fran%C3%A7ois_Hollande",
        "Anne_Hidalgo",
        "Netflix",
        "Higher_Ground_Productions",
        "American_Factory",
        "Academy_Award_for_Best_Documentary_Feature",
        "October_2018_United_States_mail_bombing_attempts",
        "CNN",
        "Debbie_Wasserman_Schultz",
        "Cesar_Sayoc",
        "Martha%27s_Vineyard",
        "Wyc_Grousbeck",
        "2020_United_States_presidential_election",
        "COVID-19_pandemic",
        "Commencement_speeches",
        "COVID-19_pandemic_in_the_United_States",
        "Coronavirus_pandemic",
        "Ahmaud_Arbery",
        "Graduate_Together:_America_Honors_the_High_School_Class_of_2020",
        "NBC_News",
        "Health_Care_and_Education_Reconciliation_Act",
        "Medicare_(United_States)",
        "Depression_(economics)",
        "U.S._Bureau_of_Labor_Statistics",
        "Obama_administration",
        "Financial_regulation",
        "Great_Depression",
        "National_Defense_Authorization_Act_for_Fiscal_Year_2010",
        "Lesbian,_gay_and_bisexual",
        "Transgender",
        "Gallup_poll",
        "Drone_strikes",
        "Taliban",
        "Afghanistan",
        "Pew_Research_Center",
        "United_States_Bureau_of_Justice_Statistics",
        "American_Political_Science_Association",
        "Brookings_Institution",
        "Presidential_library",
        "Jackson_Park_(Chicago)",
        "Of_Thee_I_Sing_(book)",
        "Random_House_Audio",
        "ISBN_(identifier)",
        "DREAM_Act",
        "Fraud_Enforcement_and_Recovery_Act_of_2009",
        "Immigration_Reform_and_Control_Act_of_1986",
        "IRS_targeting_controversy",
        "Middle_Class_Tax_Relief_and_Job_Creation_Act_of_2012",
        "National_Broadband_Plan_(United_States)",
        "Office_of_Energy_Efficiency_and_Renewable_Energy",
        "SPEECH_Act",
        "Stay_with_It",
        "White_House_Office_of_Energy_and_Climate_Change_Policy",
        "Roberts_Court",
        "Speeches_of_Barack_Obama",
        "Assassination_threats_against_Barack_Obama",
        "List_of_African-American_United_States_senators",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "List_of_federal_political_scandals_in_the_United_States#2009–2017_Barack_Obama_Administration",
        "List_of_things_named_after_Barack_Obama",
        "YouTube",
        "The_Washington_Post",
        "The_Honolulu_Advertiser",
        "ISSN_(identifier)",
        "HuffPost",
        "Wayback_Machine",
        "Los_Angeles_Times",
        "Chicago_Tribune",
        "The_EastAfrican",
        "Kompas",
        "University_of_Pennsylvania",
        "Honolulu_Star-Bulletin",
        "Newsweek",
        "The_Boston_Globe",
        "The_Bridge:_The_Life_and_Rise_of_Barack_Obama",
        "NPR",
        "Harry_S._Truman",
        "PBS_NewsHour",
        "USA_Today",
        "ABC_News",
        "Peter_Baker_(author)",
        "The_New_York_Times_Company",
        "OCLC_(identifier)",
        "American_Archive_of_Public_Broadcasting",
        "Library_of_Congress",
        "Jesse_White_(politician)",
        "Illinois_Secretary_of_State",
        "Biographical_Directory_of_the_United_States_Congress",
        "Evan_Thomas",
        "PublicAffairs",
        "Karen_Tumulty",
        "Bloomberg_L.P.",
        "Commission_on_Presidential_Debates",
        "Hartford_Courant",
        "United_Press_International",
        "Federal_Elections_Commission",
        "Pittsburgh_Post-Gazette",
        "Federal_News_Radio",
        "CBS_News",
        "Bloomberg_News",
        "Doi_(identifier)",
        "S2CID_(identifier)",
        "SSRN_(identifier)",
        "Bureau_of_Labor_Statistics",
        "Bureau_of_Economic_Analysis",
        "The_Christian_Science_Monitor",
        "The_Hill_(newspaper)",
        "All_Things_Considered",
        "Chicago_Sun-Times",
        "Politico",
        "PMC_(identifier)",
        "PMID_(identifier)",
        "The_Guardian",
        "The_Times_of_India",
        "Voice_of_America",
        "The_Gazette_(Colorado_Springs)",
        "Associated_Press",
        "The_Wall_Street_Journal",
        "The_Times_of_Israel",
        "Fox_News",
        "Fox_News_Channel",
        "National_Journal",
        "Al_Jazeera",
        "New_York_(magazine)",
        "Vox_(magazine)",
        "Greg_Grandin",
        "The_Nation",
        "The_Other_Barack:_The_Bold_and_Reckless_Life_of_President_Obama%27s_Father",
        "David_Maraniss",
        "Barack_Obama:_The_Story",
        "Simon_%26_Schuster",
        "David_Mendell",
        "Obama:_From_Promise_to_Power",
        "HarperCollins",
        "Three_Rivers_Press",
        "Crown_Publishing_Group",
        "A_Singular_Woman:_The_Untold_Story_of_Barack_Obama%27s_Mother",
        "Riverhead_Books",
        "Larissa_MacFarquhar",
        "Organizing_for_Action",
        "Encyclop%C3%A6dia_Britannica",
        "Curlie",
        "C-SPAN",
        "PolitiFact.com",
        "Vox_(website)",
        "WBEZ",
        "Project_Gutenberg",
        "Internet_Archive",
        "LibriVox",
        "IMDb",
        "TV.com",
        "List_of_Presidents_of_the_United_States",
        "List_of_United_States_Senators_from_Illinois",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "West_Wing_Week",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "Barack_Obama_judicial_appointment_controversies",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "2010_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2008_Democratic_Party_presidential_primaries",
        "2012_Democratic_Party_presidential_primaries",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "Book:Barack_Obama",
        "Classes_of_United_States_Senators",
        "Alexi_Giannoulias",
        "Harold_Ford_Jr.",
        "Democratic_National_Convention",
        "Mark_Warner",
        "John_Kerry",
        "List_of_United_States_Democratic_Party_presidential_tickets",
        "Dick_Durbin",
        "Martti_Ahtisaari",
        "Liu_Xiaobo",
        "United_States_order_of_precedence",
        "Walter_Mondale",
        "Gordon_Brown",
        "G20",
        "Stephen_Harper",
        "George_Washington",
        "Presidency_of_George_Washington",
        "John_Adams",
        "Presidency_of_John_Adams",
        "Thomas_Jefferson",
        "Presidency_of_Thomas_Jefferson",
        "James_Madison",
        "Presidency_of_James_Madison",
        "James_Monroe",
        "Presidency_of_James_Monroe",
        "John_Quincy_Adams",
        "Presidency_of_John_Quincy_Adams",
        "Andrew_Jackson",
        "Presidency_of_Andrew_Jackson",
        "Martin_Van_Buren",
        "Presidency_of_Martin_Van_Buren",
        "William_Henry_Harrison",
        "Presidency_of_William_Henry_Harrison",
        "John_Tyler",
        "Presidency_of_John_Tyler",
        "James_K._Polk",
        "Presidency_of_James_K._Polk",
        "Zachary_Taylor",
        "Presidency_of_Zachary_Taylor",
        "Millard_Fillmore",
        "Presidency_of_Millard_Fillmore",
        "Franklin_Pierce",
        "Presidency_of_Franklin_Pierce",
        "James_Buchanan",
        "Presidency_of_James_Buchanan",
        "Presidency_of_Abraham_Lincoln",
        "Andrew_Johnson",
        "Presidency_of_Andrew_Johnson",
        "Ulysses_S._Grant",
        "Presidency_of_Ulysses_S._Grant",
        "Rutherford_B._Hayes",
        "Presidency_of_Rutherford_B._Hayes",
        "James_A._Garfield",
        "Presidency_of_James_A._Garfield",
        "Chester_A._Arthur",
        "Presidency_of_Chester_A._Arthur",
        "Grover_Cleveland",
        "Presidencies_of_Grover_Cleveland",
        "Benjamin_Harrison",
        "Presidency_of_Benjamin_Harrison",
        "William_McKinley",
        "Presidency_of_William_McKinley",
        "Theodore_Roosevelt",
        "Presidency_of_Theodore_Roosevelt",
        "William_Howard_Taft",
        "Presidency_of_William_Howard_Taft",
        "Woodrow_Wilson",
        "Presidency_of_Woodrow_Wilson",
        "Warren_G._Harding",
        "Presidency_of_Warren_G._Harding",
        "Presidency_of_Calvin_Coolidge",
        "Herbert_Hoover",
        "Presidency_of_Herbert_Hoover",
        "Presidency_of_Franklin_D._Roosevelt",
        "Presidency_of_Harry_S._Truman",
        "Dwight_D._Eisenhower",
        "Presidency_of_Dwight_D._Eisenhower",
        "John_F._Kennedy",
        "Presidency_of_John_F._Kennedy",
        "Lyndon_B._Johnson",
        "Presidency_of_Lyndon_B._Johnson",
        "Richard_Nixon",
        "Presidency_of_Richard_Nixon",
        "Gerald_Ford",
        "Presidency_of_Gerald_Ford",
        "Presidency_of_Jimmy_Carter",
        "Presidency_of_Ronald_Reagan",
        "Presidency_of_George_H._W._Bush",
        "Presidency_of_Bill_Clinton",
        "Presidency_of_George_W._Bush",
        "Presidency_of_Donald_Trump",
        "Seal_of_the_President_of_the_United_States",
        "Book:Presidents_of_the_United_States",
        "2004_United_States_presidential_election",
        "List_of_candidates_in_the_2008_United_States_presidential_election",
        "Comparison_of_the_2008_United_States_presidential_candidates",
        "2008_United_States_presidential_debates",
        "Congressional_endorsements_for_the_2008_United_States_presidential_election",
        "Fundraising_for_the_2008_United_States_presidential_election",
        "Ballot_access_for_the_2008_United_States_presidential_election",
        "2008_United_States_presidential_election_timeline",
        "2008_Super_Tuesday",
        "Potomac_primary",
        "2008_Super_Tuesday_II",
        "Nationwide_opinion_polling_for_the_2008_United_States_presidential_election",
        "Statewide_opinion_polling_for_the_2008_United_States_presidential_election",
        "International_opinion_polling_for_the_2008_United_States_presidential_election",
        "Statewide_opinion_polling_for_the_2008_Democratic_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2008_Democratic_Party_presidential_primaries",
        "2008_Democratic_Party_presidential_debates_and_forums",
        "Results_of_the_2008_Democratic_Party_presidential_primaries",
        "List_of_Democratic_Party_superdelegates,_2008",
        "2008_Democratic_Party_vice_presidential_candidate_selection",
        "Political_positions_of_Joe_Biden",
        "2008_Democratic_Party_presidential_candidates",
        "Evan_Bayh_2008_presidential_campaign",
        "Joe_Biden_2008_presidential_campaign",
        "Hillary_Clinton_2008_presidential_campaign",
        "Political_positions_of_Hillary_Clinton",
        "List_of_Hillary_Clinton_2008_presidential_campaign_endorsements",
        "Chris_Dodd",
        "Chris_Dodd_2008_presidential_campaign",
        "John_Edwards",
        "John_Edwards_2008_presidential_campaign",
        "Political_positions_of_John_Edwards",
        "Mike_Gravel",
        "Mike_Gravel_2008_presidential_campaign",
        "Dennis_Kucinich",
        "Dennis_Kucinich_2008_presidential_campaign",
        "Bill_Richardson",
        "Bill_Richardson_2008_presidential_campaign",
        "Tom_Vilsack",
        "Tom_Vilsack_2008_presidential_campaign",
        "2008_Republican_National_Convention",
        "Statewide_opinion_polling_for_the_2008_Republican_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2008_Republican_Party_presidential_primaries",
        "2008_Republican_Party_presidential_debates_and_forums",
        "Political_positions_of_the_2008_Republican_Party_presidential_primary_candidates",
        "2008_Republican_Party_presidential_primaries",
        "Results_of_the_2008_Republican_Party_presidential_primaries",
        "John_McCain_2008_presidential_campaign",
        "Political_positions_of_John_McCain",
        "List_of_John_McCain_2008_presidential_campaign_endorsements",
        "Democratic_and_liberal_support_for_John_McCain_in_2008",
        "2008_Republican_Party_vice_presidential_candidate_selection",
        "Vice_presidential_candidacy_of_Sarah_Palin",
        "Political_positions_of_Sarah_Palin",
        "2008_Republican_Party_presidential_candidates",
        "Sam_Brownback",
        "John_H._Cox",
        "Jim_Gilmore",
        "Jim_Gilmore_2008_presidential_campaign",
        "Rudy_Giuliani",
        "Rudy_Giuliani_2008_presidential_campaign",
        "Political_positions_of_Rudy_Giuliani",
        "Mike_Huckabee",
        "Mike_Huckabee_2008_presidential_campaign",
        "Political_positions_of_Mike_Huckabee",
        "Duncan_L._Hunter",
        "Duncan_L._Hunter_2008_presidential_campaign",
        "Alan_Keyes_2008_presidential_campaign",
        "Ray_McKinney",
        "Ron_Paul",
        "Ron_Paul_2008_presidential_campaign",
        "Political_positions_of_Ron_Paul",
        "Mitt_Romney_2008_presidential_campaign",
        "Political_positions_of_Mitt_Romney",
        "Tom_Tancredo",
        "Tom_Tancredo_2008_presidential_campaign",
        "Fred_Thompson",
        "Fred_Thompson_2008_presidential_campaign",
        "Tommy_Thompson",
        "Tommy_Thompson_2008_presidential_campaign",
        "Draft_(politics)",
        "Al_Gore",
        "Draft_Mark_Warner_movement",
        "Newt_Gingrich",
        "Condoleezza_Rice",
        "Draft_Condi_movement",
        "Independent_politician",
        "Michael_Bloomberg",
        "Draft_Bloomberg_movement",
        "Third_party_(United_States)",
        "Third-party_and_independent_candidates_for_the_2008_United_States_presidential_election",
        "Constitution_Party_(United_States)",
        "Constitution_Party_National_Convention",
        "Chuck_Baldwin",
        "Chuck_Baldwin_2008_presidential_campaign",
        "Darrell_Castle",
        "Daniel_Imperato",
        "Green_Party_of_the_United_States",
        "2008_Green_National_Convention",
        "Cynthia_McKinney",
        "Cynthia_McKinney_2008_presidential_campaign",
        "Political_positions_of_Cynthia_McKinney",
        "Rosa_Clemente",
        "Elaine_Brown",
        "Jesse_Johnson_(West_Virginia_politician)",
        "Kent_Mesplay",
        "Kat_Swift",
        "Libertarian_Party_(United_States)",
        "2008_Libertarian_National_Convention",
        "Bob_Barr",
        "Bob_Barr_2008_presidential_campaign",
        "Political_positions_of_Bob_Barr",
        "Wayne_Allyn_Root",
        "Michael_Jingozian",
        "Steve_Kubby",
        "Mary_Ruwart",
        "Doug_Stanhope",
        "Brian_Rohrbough",
        "Boston_Tea_Party_(political_party)",
        "Charles_Jay",
        "Objectivist_Party",
        "Tom_Stevens_(politician)",
        "Peace_and_Freedom_Party",
        "Ralph_Nader",
        "Ralph_Nader_2008_presidential_campaign",
        "Matt_Gonzalez",
        "Gloria_La_Riva",
        "Brian_Moore_(political_activist)",
        "Brian_Moore_2008_presidential_campaign",
        "Prohibition_Party",
        "Gene_Amondson",
        "Reform_Party_of_the_United_States_of_America",
        "Ted_Weill",
        "Party_for_Socialism_and_Liberation",
        "Eugene_Puryear",
        "Socialist_Party_USA",
        "Stewart_Alexander",
        "Eric_Chester",
        "Socialist_Workers_Party_(United_States)",
        "R%C3%B3ger_Calero",
        "James_Harris_(Socialist_Workers_Party_politician)",
        "Alyson_Kennedy",
        "Jeff_Boss",
        "Stephen_Colbert_(character)",
        "Stephen_Colbert_2008_presidential_campaign",
        "Earl_Dodge",
        "Bradford_Lyttle",
        "Frank_Moore_(performance_artist)",
        "Joe_Schriner",
        "Jonathon_Sharkey",
        "2008_United_States_House_of_Representatives_elections",
        "2008_United_States_Senate_elections",
        "2008_United_States_gubernatorial_elections",
        "Fundraising_for_the_2012_United_States_presidential_election",
        "Nationwide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Statewide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Pre-2012_statewide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Timeline_of_the_2012_United_States_presidential_election",
        "2012_United_States_presidential_debates",
        "Newspaper_endorsements_in_the_2012_United_States_presidential_election",
        "Political_impact_of_Hurricane_Sandy",
        "2012_Democratic_Party_presidential_candidates",
        "Bob_Ely",
        "Keith_Judd",
        "Warren_Mosler",
        "Darcy_Richardson",
        "Vermin_Supreme",
        "Randall_Terry",
        "John_Wolfe_Jr.",
        "2012_Republican_National_Convention",
        "2012_Republican_Party_presidential_primaries",
        "2012_Republican_Party_presidential_debates_and_forums",
        "Statewide_opinion_polling_for_the_2012_Republican_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2012_Republican_Party_presidential_primaries",
        "Straw_polls_for_the_2012_Republican_Party_presidential_primaries",
        "2012_Republican_Party_presidential_candidates",
        "Mitt_Romney_2012_presidential_campaign",
        "List_of_Mitt_Romney_2012_presidential_campaign_endorsements",
        "Political_positions_of_Paul_Ryan",
        "Michele_Bachmann",
        "Michele_Bachmann_2012_presidential_campaign",
        "Herman_Cain",
        "Herman_Cain_2012_presidential_campaign",
        "Political_positions_of_Herman_Cain",
        "Mark_Callahan",
        "Jack_Fellure",
        "Newt_Gingrich_2012_presidential_campaign",
        "Political_positions_of_Newt_Gingrich",
        "Stewart_Greenleaf",
        "Jon_Huntsman_Jr.",
        "Jon_Huntsman_2012_presidential_campaign",
        "Gary_Johnson",
        "Gary_Johnson_2012_presidential_campaign",
        "Fred_Karger",
        "Andy_Martin",
        "Thaddeus_McCotter",
        "Thaddeus_McCotter_2012_presidential_campaign",
        "Jimmy_McMillan",
        "Roy_Moore",
        "Ron_Paul_2012_presidential_campaign",
        "Tim_Pawlenty",
        "Tim_Pawlenty_2012_presidential_campaign",
        "Rick_Perry",
        "Rick_Perry_2012_presidential_campaign",
        "Political_positions_of_Rick_Perry",
        "Buddy_Roemer",
        "Buddy_Roemer_2012_presidential_campaign",
        "Rick_Santorum",
        "Rick_Santorum_2012_presidential_campaign",
        "2012_Libertarian_National_Convention",
        "Jim_Gray_(jurist)",
        "R._J._Harris",
        "Carl_Person",
        "Sam_Sloan",
        "R._Lee_Wrights",
        "2012_Green_National_Convention",
        "2012_Green_Party_presidential_primaries",
        "Jill_Stein",
        "Jill_Stein_2012_presidential_campaign",
        "Cheri_Honkala",
        "Roseanne_Barr",
        "Third-party_and_independent_candidates_for_the_2012_United_States_presidential_election",
        "American_Independent_Party",
        "Tom_Hoefling",
        "Wiley_Drake",
        "Virgil_Goode",
        "Virgil_Goode_2012_presidential_campaign",
        "Edward_C._Noonan",
        "Laurie_Roth",
        "American_Freedom_Party",
        "Merlin_Miller",
        "Virginia_Abernethy",
        "2012_Constitution_Party_National_Convention",
        "Jim_Clymer",
        "Robby_Wells",
        "Freedom_Socialist_Party",
        "Grassroots-Legalize_Cannabis_Party",
        "Jim_Carlson_(businessman)",
        "Justice_Party_(United_States)",
        "Rocky_Anderson",
        "Luis_J._Rodriguez",
        "Peta_Lindsay",
        "Cindy_Sheehan",
        "James_Hedges",
        "Andre_Barnett",
        "Laurence_Kotlikoff",
        "Socialist_Equality_Party_(United_States)",
        "Jerry_White_(socialist)",
        "Stewart_Alexander_2012_presidential_campaign",
        "Alejandro_Mendoza",
        "Lee_Abramson",
        "Randy_Blythe",
        "Naked_Cowboy",
        "Terry_Jones_(pastor)",
        "2012_United_States_elections",
        "2012_United_States_House_of_Representatives_elections",
        "2012_United_States_Senate_elections",
        "2012_United_States_gubernatorial_elections",
        "1828_United_States_presidential_election",
        "John_C._Calhoun",
        "1832_Democratic_National_Convention",
        "1835_Democratic_National_Convention",
        "Richard_Mentor_Johnson",
        "1840_Democratic_National_Convention",
        "1844_Democratic_National_Convention",
        "George_M._Dallas",
        "1848_Democratic_National_Convention",
        "Lewis_Cass",
        "William_Orlando_Butler",
        "1852_Democratic_National_Convention",
        "William_R._King",
        "1856_Democratic_National_Convention",
        "John_C._Breckinridge",
        "1860_Democratic_National_Conventions",
        "Stephen_A._Douglas",
        "Herschel_Vespasian_Johnson",
        "Joseph_Lane",
        "Southern_Democrats",
        "1864_Democratic_National_Convention",
        "George_B._McClellan",
        "George_H._Pendleton",
        "1868_Democratic_National_Convention",
        "Horatio_Seymour",
        "Francis_Preston_Blair_Jr.",
        "1872_Democratic_National_Convention",
        "Horace_Greeley",
        "Benjamin_Gratz_Brown",
        "1876_Democratic_National_Convention",
        "Samuel_J._Tilden",
        "Thomas_A._Hendricks",
        "1880_Democratic_National_Convention",
        "Winfield_Scott_Hancock",
        "William_Hayden_English",
        "1884_Democratic_National_Convention",
        "1888_Democratic_National_Convention",
        "Allen_G._Thurman",
        "1892_Democratic_National_Convention",
        "Adlai_Stevenson_I",
        "1896_Democratic_National_Convention",
        "William_Jennings_Bryan",
        "Arthur_Sewall",
        "1900_Democratic_National_Convention",
        "1904_Democratic_National_Convention",
        "Alton_B._Parker",
        "Henry_Gassaway_Davis",
        "1908_Democratic_National_Convention",
        "John_W._Kern",
        "1912_Democratic_National_Convention",
        "Thomas_R._Marshall",
        "1916_Democratic_National_Convention",
        "1920_Democratic_National_Convention",
        "James_M._Cox",
        "1924_Democratic_National_Convention",
        "John_W._Davis",
        "Charles_W._Bryan",
        "1928_Democratic_National_Convention",
        "Al_Smith",
        "Joseph_Taylor_Robinson",
        "1932_Democratic_National_Convention",
        "John_Nance_Garner",
        "1936_Democratic_National_Convention",
        "1940_Democratic_National_Convention",
        "Henry_A._Wallace",
        "1944_Democratic_National_Convention",
        "1948_Democratic_National_Convention",
        "Alben_W._Barkley",
        "1952_Democratic_National_Convention",
        "Adlai_Stevenson_II",
        "John_Sparkman",
        "1956_Democratic_National_Convention",
        "Estes_Kefauver",
        "1960_Democratic_National_Convention",
        "1964_Democratic_National_Convention",
        "Hubert_Humphrey",
        "1968_Democratic_National_Convention",
        "Edmund_Muskie",
        "1972_Democratic_National_Convention",
        "George_McGovern",
        "Thomas_Eagleton",
        "Sargent_Shriver",
        "1976_Democratic_National_Convention",
        "1980_Democratic_National_Convention",
        "1984_Democratic_National_Convention",
        "Geraldine_Ferraro",
        "1988_Democratic_National_Convention",
        "Michael_Dukakis",
        "Lloyd_Bentsen",
        "1992_Democratic_National_Convention",
        "1996_Democratic_National_Convention",
        "2000_Democratic_National_Convention",
        "Joe_Lieberman",
        "2016_Democratic_National_Convention",
        "2020_Democratic_National_Convention",
        "Kamala_Harris",
        "Party_leaders_of_the_United_States_House_of_Representatives",
        "Andrew_Stevenson",
        "John_Bell_(Tennessee_politician)",
        "John_Winston_Jones",
        "John_Wesley_Davis",
        "Howell_Cobb",
        "Linn_Boyd",
        "George_Washington_Jones_(Tennessee_politician)",
        "James_Lawrence_Orr",
        "George_S._Houston",
        "William_E._Niblack",
        "Samuel_J._Randall",
        "Michael_C._Kerr",
        "John_G._Carlisle",
        "William_S._Holman",
        "Charles_Frederick_Crisp",
        "David_B._Culberson",
        "James_D._Richardson",
        "John_Sharp_Williams",
        "Champ_Clark",
        "Claude_Kitchin",
        "Finis_J._Garrett",
        "Henry_Thomas_Rainey",
        "Jo_Byrns",
        "William_B._Bankhead",
        "Sam_Rayburn",
        "John_W._McCormack",
        "Carl_Albert",
        "Tip_O%27Neill",
        "Jim_Wright",
        "Tom_Foley",
        "Dick_Gephardt",
        "Party_leaders_of_the_United_States_Senate",
        "John_W._Stevenson",
        "William_A._Wallace",
        "James_B._Beck",
        "Arthur_Pue_Gorman",
        "David_Turpie",
        "James_Kimbrough_Jones",
        "Joseph_Clay_Stiles_Blackburn",
        "Charles_Allen_Culberson",
        "Hernando_Money",
        "Thomas_S._Martin",
        "Gilbert_Hitchcock",
        "Oscar_Underwood",
        "Scott_W._Lucas",
        "Ernest_McFarland",
        "Mike_Mansfield",
        "Robert_Byrd",
        "George_J._Mitchell",
        "Tom_Daschle",
        "Harry_Reid",
        "Chuck_Schumer",
        "Benjamin_F._Hallett",
        "Robert_Milligan_McLane",
        "David_Allen_Smalley",
        "August_Belmont",
        "Augustus_Schell",
        "Abram_Hewitt",
        "William_Henry_Barnum",
        "Calvin_S._Brice",
        "William_F._Harrity",
        "Thomas_Taggart",
        "Norman_E._Mack",
        "William_F._McCombs",
        "Vance_C._McCormick",
        "Homer_Stille_Cummings",
        "George_White_(Ohio_politician)",
        "Cordell_Hull",
        "Clem_L._Shaver",
        "John_J._Raskob",
        "James_Farley",
        "Edward_J._Flynn",
        "Frank_Comerford_Walker",
        "Robert_E._Hannegan",
        "J._Howard_McGrath",
        "William_M._Boyle",
        "Frank_E._McKinney",
        "Stephen_A._Mitchell_(politician)",
        "Paul_Butler_(lawyer)",
        "Henry_M._Jackson",
        "John_Moran_Bailey",
        "Larry_O%27Brien",
        "Fred_R._Harris",
        "Jean_Westwood_(politician)",
        "Robert_S._Strauss",
        "Kenneth_M._Curtis",
        "John_Coyle_White",
        "Charles_Manatt",
        "Paul_G._Kirk",
        "Ron_Brown",
        "David_Wilhelm",
        "Debra_DeLee",
        "Donald_Fowler",
        "Roy_Romer",
        "Steven_Grossman_(politician)",
        "Ed_Rendell",
        "Joe_Andrew",
        "Terry_McAuliffe",
        "Howard_Dean",
        "Tom_Perez",
        "List_of_state_parties_of_the_Democratic_Party_(United_States)",
        "Alabama_Democratic_Party",
        "Alaska_Democratic_Party",
        "Arizona_Democratic_Party",
        "Democratic_Party_of_Arkansas",
        "California_Democratic_Party",
        "Colorado_Democratic_Party",
        "Democratic_Party_of_Connecticut",
        "Delaware_Democratic_Party",
        "Florida_Democratic_Party",
        "Democratic_Party_of_Georgia",
        "Democratic_Party_of_Hawaii",
        "Idaho_Democratic_Party",
        "Democratic_Party_of_Illinois",
        "Indiana_Democratic_Party",
        "Iowa_Democratic_Party",
        "Kansas_Democratic_Party",
        "Kentucky_Democratic_Party",
        "Louisiana_Democratic_Party",
        "Maine_Democratic_Party",
        "Maryland_Democratic_Party",
        "Massachusetts_Democratic_Party",
        "Michigan_Democratic_Party",
        "Minnesota_Democratic%E2%80%93Farmer%E2%80%93Labor_Party",
        "Mississippi_Democratic_Party",
        "Missouri_Democratic_Party",
        "Montana_Democratic_Party",
        "Nebraska_Democratic_Party",
        "Nevada_Democratic_Party",
        "New_Hampshire_Democratic_Party",
        "New_Jersey_Democratic_State_Committee",
        "Democratic_Party_of_New_Mexico",
        "New_York_State_Democratic_Committee",
        "North_Carolina_Democratic_Party",
        "North_Dakota_Democratic%E2%80%93Nonpartisan_League_Party",
        "Ohio_Democratic_Party",
        "Oklahoma_Democratic_Party",
        "Democratic_Party_of_Oregon",
        "Pennsylvania_Democratic_Party",
        "Rhode_Island_Democratic_Party",
        "South_Carolina_Democratic_Party",
        "South_Dakota_Democratic_Party",
        "Tennessee_Democratic_Party",
        "Texas_Democratic_Party",
        "Utah_Democratic_Party",
        "Vermont_Democratic_Party",
        "Democratic_Party_of_Virginia",
        "Washington_State_Democratic_Party",
        "West_Virginia_Democratic_Party",
        "Democratic_Party_of_Wisconsin",
        "Wyoming_Democratic_Party",
        "District_of_Columbia_Democratic_State_Committee",
        "Democratic_Party_of_Guam",
        "Democratic_Party_(Northern_Mariana_Islands)",
        "Democratic_Party_(Puerto_Rico)",
        "Democratic_Party_of_the_Virgin_Islands",
        "Democrats_Abroad",
        "Democratic_Party_(United_States)_organizations",
        "Senate_Democratic_Caucus",
        "United_States_Senate_Democratic_Policy_Committee",
        "United_States_Senate_Democratic_Steering_and_Outreach_Committee",
        "United_States_Senate_Democratic_Conference_Secretary",
        "House_Democratic_Caucus",
        "Democratic_Congressional_Campaign_Committee",
        "Democratic_Governors_Association",
        "Democratic_Legislative_Campaign_Committee",
        "Democratic_Senatorial_Campaign_Committee",
        "National_Conference_of_Democratic_Mayors",
        "College_Democrats_of_America",
        "National_Federation_of_Democratic_Women",
        "Stonewall_Democrats",
        "Stonewall_Young_Democrats",
        "Young_Democrats_of_America",
        "High_School_Democrats_of_America",
        "History_of_the_United_States_Democratic_Party",
        "List_of_Democratic_Party_presidential_primaries",
        "Democratic_Party_presidential_debates",
        "Factions_in_the_Democratic_Party_(United_States)",
        "Superdelegate",
        "2005_Democratic_National_Committee_chairmanship_election",
        "2017_Democratic_National_Committee_chairmanship_election",
        "2006_United_States_House_of_Representatives_Democratic_Caucus_leadership_election",
        "2018_United_States_House_of_Representatives_Democratic_Caucus_leadership_election",
        "Weekly_Democratic_Address",
        "Jesse_B._Thomas",
        "John_McLean_(Illinois_politician)",
        "David_J._Baker",
        "John_McCracken_Robinson",
        "Samuel_McRoberts",
        "James_Semple",
        "Orville_Hickman_Browning",
        "William_Alexander_Richardson",
        "Richard_Yates_(politician,_born_1815)",
        "John_A._Logan",
        "David_Davis_(Supreme_Court_justice)",
        "Shelby_Moore_Cullom",
        "J._Hamilton_Lewis",
        "Joseph_M._McCormick",
        "Charles_S._Deneen",
        "James_M._Slattery",
        "Charles_W._Brooks",
        "Paul_Douglas",
        "Charles_H._Percy",
        "Paul_Simon_(politician)",
        "Ninian_Edwards",
        "Elias_Kane",
        "William_Lee_D._Ewing",
        "Richard_M._Young",
        "Sidney_Breese",
        "James_Shields_(politician,_born_1806)",
        "Lyman_Trumbull",
        "Richard_J._Oglesby",
        "Charles_B._Farwell",
        "John_M._Palmer_(politician)",
        "William_E._Mason",
        "Albert_J._Hopkins",
        "William_Lorimer_(politician)",
        "Lawrence_Yates_Sherman",
        "William_B._McKinley",
        "Otis_F._Glenn",
        "William_H._Dieterich",
        "Everett_Dirksen",
        "Ralph_Tyler_Smith",
        "Adlai_Stevenson_III",
        "Alan_J._Dixon",
        "Mark_Kirk",
        "Tammy_Duckworth",
        "Patriot_Act,_Title_I",
        "Patriot_Act,_Title_II",
        "Patriot_Act,_Title_III",
        "Patriot_Act,_Title_IV",
        "Patriot_Act,_Title_V",
        "Patriot_Act,_Title_VI",
        "Patriot_Act,_Title_VII",
        "Patriot_Act,_Title_VIII",
        "Patriot_Act,_Title_IX",
        "Patriot_Act,_Title_X",
        "History_of_the_Patriot_Act",
        "Omnibus_Crime_Control_and_Safe_Streets_Act_of_1968",
        "Electronic_Communications_Privacy_Act",
        "Computer_Fraud_and_Abuse_Act",
        "Foreign_Intelligence_Surveillance_Act",
        "Family_Educational_Rights_and_Privacy_Act",
        "Money_Laundering_Control_Act",
        "Bank_Secrecy_Act",
        "Right_to_Financial_Privacy_Act",
        "Fair_Credit_Reporting_Act",
        "Immigration_and_Nationality_Act_of_1952",
        "Victims_of_Crime_Act_of_1984",
        "Telemarketing_and_Consumer_Fraud_and_Abuse_Prevention_Act",
        "John_Ashcroft",
        "Alberto_Gonzales",
        "Patrick_Leahy",
        "Orrin_Hatch",
        "Jon_Kyl",
        "Dianne_Feinstein",
        "Viet_D._Dinh",
        "Michael_Chertoff",
        "Eric_Holder",
        "Lamar_Smith",
        "Bob_Graham",
        "Jay_Rockefeller",
        "Arlen_Specter",
        "Mike_Oxley",
        "Dick_Armey",
        "Paul_Sarbanes",
        "Trent_Lott",
        "Russ_Feingold",
        "Ellen_Segal_Huvelle",
        "Lisa_Murkowski",
        "Ron_Wyden",
        "Larry_Craig",
        "John_E._Sununu",
        "Bernie_Sanders",
        "Jerry_Nadler",
        "John_Conyers",
        "Butch_Otter",
        "Federal_Bureau_of_Investigation",
        "United_States_Department_of_Justice",
        "United_States_House_Permanent_Select_Committee_on_Intelligence",
        "United_States_Department_of_the_Treasury",
        "Financial_Crimes_Enforcement_Network",
        "United_States_Department_of_State",
        "National_Institute_of_Standards_and_Technology",
        "United_States_Customs_Service",
        "U.S._Immigration_and_Customs_Enforcement",
        "American_Civil_Liberties_Union",
        "American_Library_Association",
        "Center_for_Democracy_and_Technology",
        "Center_for_Public_Integrity",
        "Electronic_Frontier_Foundation",
        "Electronic_Privacy_Information_Center",
        "Humanitarian_Law_Project",
        "Charles_Lindbergh",
        "Walter_Chrysler",
        "Owen_D._Young",
        "Mahatma_Gandhi",
        "Pierre_Laval",
        "Hugh_S._Johnson",
        "Haile_Selassie",
        "Wallis_Simpson",
        "Chiang_Kai-shek",
        "Soong_Mei-ling",
        "Adolf_Hitler",
        "Joseph_Stalin",
        "Winston_Churchill",
        "George_Marshall",
        "James_F._Byrnes",
        "Korean_War",
        "Mohammad_Mosaddegh",
        "Konrad_Adenauer",
        "John_Foster_Dulles",
        "Harlow_Curtice",
        "Hungarian_Revolution_of_1956",
        "Nikita_Khrushchev",
        "George_Beadle",
        "Charles_Stark_Draper",
        "John_Franklin_Enders",
        "Donald_A._Glaser",
        "Joshua_Lederberg",
        "Willard_Libby",
        "Linus_Pauling",
        "Edward_Mills_Purcell",
        "Isidor_Isaac_Rabi",
        "Emilio_Segr%C3%A8",
        "William_Shockley",
        "Edward_Teller",
        "Charles_H._Townes",
        "James_Van_Allen",
        "Robert_Burns_Woodward",
        "Pope_John_XXIII",
        "Martin_Luther_King_Jr.",
        "William_Westmoreland",
        "Baby_boomers",
        "Apollo_8",
        "William_Anders",
        "Frank_Borman",
        "Jim_Lovell",
        "Middle_America_(United_States)",
        "Willy_Brandt",
        "Henry_Kissinger",
        "John_Sirica",
        "Faisal_of_Saudi_Arabia",
        "Susan_Brownmiller",
        "Kathleen_Byerly",
        "Alison_Cheek",
        "Jill_Ker_Conway",
        "Betty_Ford",
        "Ella_Grasso",
        "Carla_Anderson_Hills",
        "Barbara_Jordan",
        "Billie_Jean_King",
        "Susie_Sharp",
        "Carol_Sutton",
        "Addie_L._Wyatt",
        "Anwar_Sadat",
        "Deng_Xiaoping",
        "Ruhollah_Khomeini",
        "Lech_Wa%C5%82%C4%99sa",
        "Personal_computer",
        "Yuri_Andropov",
        "Peter_Ueberroth",
        "Corazon_Aquino",
        "Mikhail_Gorbachev",
        "Environmentalism",
        "Ted_Turner",
        "Yasser_Arafat",
        "F._W._de_Klerk",
        "Yitzhak_Rabin",
        "Pope_John_Paul_II",
        "David_Ho",
        "Andrew_Grove",
        "Ken_Starr",
        "Jeff_Bezos",
        "Cynthia_Cooper_(accountant)",
        "Coleen_Rowley",
        "Sherron_Watkins",
        "Bono",
        "Bill_Gates",
        "Melinda_Gates",
        "You_(Time_Person_of_the_Year)",
        "Mark_Zuckerberg",
        "Protest",
        "Responses_to_the_West_African_Ebola_virus_epidemic",
        "Kent_Brantly",
        "Salome_Karwah",
        "Me_Too_(hashtag)",
        "Maria_Ressa",
        "Wa_Lone",
        "Kyaw_Soe_Oo",
        "Capital_Gazette_shooting",
        "Greta_Thunberg",
        "Book:Time_Persons_of_the_Year",
        "Nobel_Prize",
        "Nobel_Prize_in_Chemistry",
        "Venki_Ramakrishnan",
        "Thomas_A._Steitz",
        "Ada_Yonath",
        "Nobel_Prize_in_Literature",
        "Herta_M%C3%BCller",
        "Nobel_Prize_in_Physics",
        "Charles_K._Kao",
        "Willard_Boyle",
        "George_E._Smith",
        "Nobel_Prize_in_Physiology_or_Medicine",
        "Elizabeth_Blackburn",
        "Carol_W._Greider",
        "Jack_W._Szostak",
        "Nobel_Memorial_Prize_in_Economic_Sciences",
        "Elinor_Ostrom",
        "Oliver_E._Williamson",
        "List_of_Nobel_laureates",
        "List_of_Nobel_Peace_Prize_laureates",
        "Henry_Dunant",
        "Fr%C3%A9d%C3%A9ric_Passy",
        "%C3%89lie_Ducommun",
        "Charles_Albert_Gobat",
        "Randal_Cremer",
        "Institut_de_Droit_International",
        "Bertha_von_Suttner",
        "Ernesto_Teodoro_Moneta",
        "Louis_Renault_(jurist)",
        "Klas_Pontus_Arnoldson",
        "Fredrik_Bajer",
        "Auguste_Beernaert",
        "Paul_Henri_Balluet_d%27Estournelles_de_Constant",
        "International_Peace_Bureau",
        "Tobias_Asser",
        "Alfred_Hermann_Fried",
        "Elihu_Root",
        "Henri_La_Fontaine",
        "International_Committee_of_the_Red_Cross",
        "L%C3%A9on_Bourgeois",
        "Hjalmar_Branting",
        "Christian_Lous_Lange",
        "Fridtjof_Nansen",
        "Austen_Chamberlain",
        "Charles_G._Dawes",
        "Aristide_Briand",
        "Gustav_Stresemann",
        "Ferdinand_Buisson",
        "Ludwig_Quidde",
        "Frank_B._Kellogg",
        "Nathan_S%C3%B6derblom",
        "Jane_Addams",
        "Nicholas_Murray_Butler",
        "Norman_Angell",
        "Arthur_Henderson",
        "Carl_von_Ossietzky",
        "Carlos_Saavedra_Lamas",
        "Robert_Cecil,_1st_Viscount_Cecil_of_Chelwood",
        "Nansen_International_Office_for_Refugees",
        "Emily_Greene_Balch",
        "John_Mott",
        "Quaker_Peace_and_Social_Witness",
        "American_Friends_Service_Committee",
        "John_Boyd_Orr",
        "Ralph_Bunche",
        "L%C3%A9on_Jouhaux",
        "Albert_Schweitzer",
        "United_Nations_High_Commissioner_for_Refugees",
        "Lester_B._Pearson",
        "Dominique_Pire",
        "Philip_Noel-Baker",
        "Albert_Lutuli",
        "Dag_Hammarskj%C3%B6ld",
        "International_Federation_of_Red_Cross_and_Red_Crescent_Societies",
        "UNICEF",
        "Ren%C3%A9_Cassin",
        "International_Labour_Organization",
        "Norman_Borlaug",
        "L%C3%AA_%C4%90%E1%BB%A9c_Th%E1%BB%8D",
        "Se%C3%A1n_MacBride",
        "Eisaku_Sat%C5%8D",
        "Andrei_Sakharov",
        "Betty_Williams_(peace_activist)",
        "Mairead_Maguire",
        "Amnesty_International",
        "Menachem_Begin",
        "Mother_Teresa",
        "Adolfo_P%C3%A9rez_Esquivel",
        "Alva_Myrdal",
        "Alfonso_Garc%C3%ADa_Robles",
        "Desmond_Tutu",
        "International_Physicians_for_the_Prevention_of_Nuclear_War",
        "Elie_Wiesel",
        "%C3%93scar_Arias",
        "United_Nations_peacekeeping",
        "14th_Dalai_Lama",
        "Aung_San_Suu_Kyi",
        "Rigoberta_Mench%C3%BA",
        "Pugwash_Conferences_on_Science_and_World_Affairs",
        "Joseph_Rotblat",
        "Carlos_Filipe_Ximenes_Belo",
        "Jos%C3%A9_Ramos-Horta",
        "International_Campaign_to_Ban_Landmines",
        "Jody_Williams",
        "John_Hume",
        "David_Trimble",
        "M%C3%A9decins_Sans_Fronti%C3%A8res",
        "Kim_Dae-jung",
        "2001_Nobel_Peace_Prize",
        "United_Nations",
        "Kofi_Annan",
        "2002_Nobel_Peace_Prize",
        "2003_Nobel_Peace_Prize",
        "Shirin_Ebadi",
        "2004_Nobel_Peace_Prize",
        "Wangari_Maathai",
        "2005_Nobel_Peace_Prize",
        "International_Atomic_Energy_Agency",
        "Mohamed_ElBaradei",
        "2006_Nobel_Peace_Prize",
        "Grameen_Bank",
        "Muhammad_Yunus",
        "2007_Nobel_Peace_Prize",
        "Intergovernmental_Panel_on_Climate_Change",
        "2008_Nobel_Peace_Prize",
        "2010_Nobel_Peace_Prize",
        "2011_Nobel_Peace_Prize",
        "Ellen_Johnson_Sirleaf",
        "Leymah_Gbowee",
        "Tawakkol_Karman",
        "2012_Nobel_Peace_Prize",
        "European_Union",
        "2013_Nobel_Peace_Prize",
        "Organisation_for_the_Prohibition_of_Chemical_Weapons",
        "2014_Nobel_Peace_Prize",
        "Kailash_Satyarthi",
        "Malala_Yousafzai",
        "2015_Nobel_Peace_Prize",
        "Tunisian_National_Dialogue_Quartet",
        "2016_Nobel_Peace_Prize",
        "Juan_Manuel_Santos",
        "2017_Nobel_Peace_Prize",
        "International_Campaign_to_Abolish_Nuclear_Weapons",
        "2018_Nobel_Peace_Prize",
        "Denis_Mukwege",
        "Nadia_Murad",
        "2019_Nobel_Peace_Prize",
        "Abiy_Ahmed",
        "Stan_Freberg",
        "Carl_Sandburg",
        "Lincoln_Portrait",
        "Leonard_Bernstein",
        "Charles_Laughton",
        "Edward_Albee",
        "Who%27s_Afraid_of_Virginia_Woolf%3F",
        "That_Was_the_Week_That_Was",
        "Goddard_Lieberson",
        "Edward_R._Murrow",
        "Rod_McKuen",
        "Art_Linkletter",
        "Diane_Linkletter",
        "Les_Crane",
        "Desiderata_(Les_Crane_album)",
        "Bruce_Botnick",
        "Richard_Harris",
        "Jonathan_Livingston_Seagull",
        "Peter_Cook",
        "Dudley_Moore",
        "James_Whitmore",
        "Give_%27em_Hell,_Harry!",
        "Henry_Fonda",
        "Helen_Hayes",
        "James_Earl_Jones",
        "Orson_Welles",
        "Julie_Harris_(actress)",
        "The_Belle_of_Amherst",
        "Citizen_Kane",
        "John_Gielgud",
        "Pat_Carroll",
        "Gertrude_Stein",
        "Donovan%27s_Brain",
        "Raiders_of_the_Lost_Ark",
        "William_Warfield",
        "Ben_Kingsley",
        "Mike_Berniker",
        "Ma_Rainey%27s_Black_Bottom",
        "Johnny_Cash",
        "Jerry_Lee_Lewis",
        "Chips_Moman",
        "Ricky_Nelson",
        "Roy_Orbison",
        "Carl_Perkins",
        "Sam_Phillips",
        "Garrison_Keillor",
        "Lake_Wobegon_Days",
        "Jesse_Jackson",
        "Gilda_Radner",
        "George_Burns",
        "Gracie:_A_Love_Story",
        "Ken_Burns",
        "The_Civil_War_(miniseries)",
        "Magic_Johnson",
        "Maya_Angelou",
        "On_the_Pulse_of_Morning",
        "Henry_Rollins",
        "It_Takes_a_Village",
        "Charles_Kuralt",
        "Christopher_Reeve",
        "Still_Me",
        "LeVar_Burton",
        "Sidney_Poitier",
        "The_Measure_of_a_Man:_A_Spiritual_Autobiography",
        "Quincy_Jones",
        "A_Song_Flung_Up_to_Heaven",
        "Al_Franken",
        "Lies_and_the_Lying_Liars_Who_Tell_Them",
        "My_Life_(Clinton_autobiography)",
        "Our_Endangered_Values",
        "Ossie_Davis",
        "Ruby_Dee",
        "Beau_Bridges",
        "Cynthia_Nixon",
        "Blair_Underwood",
        "An_Inconvenient_Truth_(book)",
        "Michael_J._Fox",
        "Jon_Stewart",
        "Earth_(The_Book)",
        "Betty_White",
        "Janis_Ian",
        "Stephen_Colbert",
        "America_Again",
        "Joan_Rivers",
        "A_Full_Life:_Reflections_at_90",
        "Carol_Burnett",
        "Carrie_Fisher",
        "The_Princess_Diarist",
        "Becoming_(book)",
        "Bibsys",
        "National_Library_of_Chile",
        "Biblioteca_Nacional_de_Espa%C3%B1a",
        "BNF_(identifier)",
        "Name_and_Title_Authority_File_of_Catalonia",
        "CiNii_(identifier)",
        "GND_(identifier)",
        "ICCU_(identifier)",
        "ISNI_(identifier)",
        "LCCN_(identifier)",
        "National_Library_of_Latvia",
        "MusicBrainz",
        "National_Central_Library",
        "National_Diet_Library",
        "National_Library_of_the_Czech_Republic",
        "National_Library_of_Australia",
        "National_Library_of_Greece",
        "National_Library_of_Israel",
        "National_Library_of_Korea",
        "National_Library_of_Poland",
        "National_Library_of_Romania",
        "National_and_University_Library_in_Zagreb",
        "Royal_Library_of_the_Netherlands",
        "RERO_(Library_Network_of_Western_Switzerland)",
        "Netherlands_Institute_for_Art_History",
        "Russian_State_Library",
        "SELIBR_(identifier)",
        "SNAC",
        "SUDOC_(identifier)",
        "Semantic_Scholar",
        "Trove",
        "Union_List_of_Artist_Names",
        "VIAF_(identifier)",
        "WorldCat_Identities"
      ],
      "sourcestr1": "Barack_Obama",
      "sourcestr2": "Q76",
      "sourcestr3": "Q5",
      "sourcestr4": "human",
      "sourcevarchar3": "[{\"Barack Obama\":\"Official portrait, 2012\",\"44th President of the United States\":[\"In office\",\"January 20, 2009\\u2013January 20, 2017\"],\"Vice President\":\"Joe Biden\",\"Preceded by\":\"Alice Palmer\",\"Succeeded by\":\"Kwame Raoul\",\"United States Senator from Illinois\":[\"In office\",\"January 3, 2005\\u2013November 16, 2008\"],\"Member of the Illinois Senate from the 13th district\":[\"In office\",\"January 8, 1997\\u2013November 4, 2004\"],\"Personal details\":\"\",\"Born\":[\"Barack Hussein Obama II\",\"August 4, 1961\",\"(age59)\",\"Honolulu\",\",\",\"Hawaii\"],\"Political party\":\"Democratic\",\"Spouse\":\"Michelle Robinson\",\"Children\":[\"Malia\",\"Sasha\"],\"Mother\":\"Ann Dunham\",\"Father\":\"Barack Obama Sr.\",\"Relatives\":[\"See\",\"Obama family\"],\"Residence\":\"Kalorama (Washington, D.C.)\",\"Education\":\"Punahou School\",\"Alma mater\":[\"Occidental College\",\"(attended)\",\"Columbia University\",\"Harvard University\"],\"Awards\":[\"Nobel Peace Prize\",\"Profile in Courage Award\",\"(2017)\"],\"Signature\":\"\",\"Website\":[\"Official website\",\"Obama Foundation\",\"White House Archives\"]},{\"External video\":[\"Derrick Bell threatens to leave Harvard\",\", April 24, 1990, 11:34,\",\"Boston TV Digital Archive\",\"Student Barack Obama introduces Professor Derrick Bell starting at 6:25.\"]}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/1200px-President_Barack_Obama.jpg",
      "sourcedouble1": 0.109767,
      "entity1": [
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2015",
          "display": "2015"
        },
        {
          "value": "2017",
          "display": "2017"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "2004",
          "display": "2004"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "2016",
          "display": "2016"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "2007",
          "display": "2007"
        },
        {
          "value": "2006",
          "display": "2006"
        },
        {
          "value": "24",
          "display": "24"
        }
      ],
      "date": [
        {
          "value": "2017-03-31",
          "display": "2017-03-31"
        },
        {
          "value": "2009-01-20",
          "display": "2009-01-20"
        },
        {
          "value": "2017-01-20",
          "display": "2017-01-20"
        },
        {
          "value": "1961-08-04",
          "display": "1961-08-04"
        },
        {
          "value": "2005-01-03",
          "display": "2005-01-03"
        },
        {
          "value": "2007-02-10",
          "display": "2007-02-10"
        },
        {
          "value": "2008-11-16",
          "display": "2008-11-16"
        },
        {
          "value": "2009-06-04",
          "display": "2009-06-04"
        },
        {
          "value": "2010-03-23",
          "display": "2010-03-23"
        },
        {
          "value": "2010-08-31",
          "display": "2010-08-31"
        },
        {
          "value": "2011-05-01",
          "display": "2011-05-01"
        },
        {
          "value": "2017-01-05",
          "display": "2017-01-05"
        },
        {
          "value": "2017-03-23",
          "display": "2017-03-23"
        },
        {
          "value": "2017-03-24",
          "display": "2017-03-24"
        },
        {
          "value": "1990-04-24",
          "display": "1990-04-24"
        },
        {
          "value": "1992-10-03",
          "display": "1992-10-03"
        },
        {
          "value": "1997-01-08",
          "display": "1997-01-08"
        },
        {
          "value": "1998-05-13",
          "display": "1998-05-13"
        },
        {
          "value": "2002-10-02",
          "display": "2002-10-02"
        },
        {
          "value": "2004-11-04",
          "display": "2004-11-04"
        }
      ],
      "entity3": [
        {
          "value": "06:25",
          "display": "06:25"
        },
        {
          "value": "11:34",
          "display": "11:34"
        }
      ],
      "entity4": [
        {
          "value": "USD 1600000",
          "display": "USD 1600000"
        },
        {
          "value": "USD 1500000000000",
          "display": "USD 1500000000000"
        },
        {
          "value": "USD 10000000",
          "display": "USD 10000000"
        },
        {
          "value": "USD 115000000000",
          "display": "USD 115000000000"
        },
        {
          "value": "USD 11500000000000",
          "display": "USD 11500000000000"
        },
        {
          "value": "USD 1200000000000",
          "display": "USD 1200000000000"
        },
        {
          "value": "USD 1300000",
          "display": "USD 1300000"
        },
        {
          "value": "USD 1340000000000",
          "display": "USD 1340000000000"
        },
        {
          "value": "USD 1400000000000",
          "display": "USD 1400000000000"
        },
        {
          "value": "USD 143000000000",
          "display": "USD 143000000000"
        },
        {
          "value": "USD 1700000",
          "display": "USD 1700000"
        },
        {
          "value": "USD 1700000000",
          "display": "USD 1700000000"
        },
        {
          "value": "USD 17200000000000",
          "display": "USD 17200000000000"
        },
        {
          "value": "USD 2000000000000",
          "display": "USD 2000000000000"
        },
        {
          "value": "USD 2100000",
          "display": "USD 2100000"
        },
        {
          "value": "USD 3000000000000",
          "display": "USD 3000000000000"
        },
        {
          "value": "USD 348000000000",
          "display": "USD 348000000000"
        },
        {
          "value": "USD 4200000",
          "display": "USD 4200000"
        },
        {
          "value": "USD 5500000",
          "display": "USD 5500000"
        },
        {
          "value": "USD 6000000",
          "display": "USD 6000000"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "DEATH",
          "display": "Death"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        },
        {
          "value": "DIRECTOR",
          "display": "Director"
        },
        {
          "value": "CHAIRMAN OF THE BOARD",
          "display": "Chairman of the board"
        },
        {
          "value": "CO-FOUNDER",
          "display": "Co-founder"
        }
      ],
      "entity14": [
        {
          "value": "CONTRACT",
          "display": "Contract"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "DEBT",
          "display": "Debt"
        },
        {
          "value": "INVESTMENT",
          "display": "Investment"
        },
        {
          "value": "CAPITAL",
          "display": "Capital"
        },
        {
          "value": "LIQUIDITY",
          "display": "Liquidity"
        },
        {
          "value": "PENALTY",
          "display": "Penalty"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        },
        {
          "value": "BONDS",
          "display": "Bonds"
        }
      ],
      "event_date": [
        {
          "value": "(BIRTH)#(1961-08-04)",
          "display": "(Birth)#(1961-08-04)"
        },
        {
          "value": "(ELECTION)#(2010-11-02)",
          "display": "(Election)#(2010-11-02)"
        },
        {
          "value": "(BIRTH)#(2004-11-04)",
          "display": "(Birth)#(2004-11-04)"
        },
        {
          "value": "(DEATH)#(2008-11-02)",
          "display": "(Death)#(2008-11-02)"
        },
        {
          "value": "(DEATH)#(2011-05-02)",
          "display": "(Death)#(2011-05-02)"
        },
        {
          "value": "(VICTORY)#(2011-04-04)",
          "display": "(Victory)#(2011-04-04)"
        },
        {
          "value": "(VICTORY)#(2012-11-06)",
          "display": "(Victory)#(2012-11-06)"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(JOE BIDEN)",
          "display": "(Vice-President)#(Joe Biden)"
        },
        {
          "value": "(CO-FOUNDER)#(MILTON DAVIS)",
          "display": "(Co-founder)#(Milton Davis)"
        },
        {
          "value": "(VICE-PRESIDENT)#(ALICE PALMER)",
          "display": "(Vice-President)#(Alice Palmer)"
        },
        {
          "value": "(VICE-PRESIDENT)#(BIDEN)",
          "display": "(Vice-President)#(Biden)"
        },
        {
          "value": "(VICE-PRESIDENT)#(HILLARY CLINTON)",
          "display": "(Vice-President)#(Hillary Clinton)"
        },
        {
          "value": "(VICE-PRESIDENT)#(NANCY PELOSI)",
          "display": "(Vice-President)#(Nancy Pelosi)"
        }
      ],
      "entity18": [
        {
          "value": "(CONTRACT)#(USD 115000000000)",
          "display": "(Contract)#(USD 115000000000)"
        },
        {
          "value": "(ACQUISITION)#(USD 2000000000000)",
          "display": "(Acquisition)#(USD 2000000000000)"
        },
        {
          "value": "(CONTRACT)#(USD 65000000)",
          "display": "(Contract)#(USD 65000000)"
        },
        {
          "value": "(DEBT)#(USD 17200000000000)",
          "display": "(Debt)#(USD 17200000000000)"
        },
        {
          "value": "(LIQUIDITY)#(USD 1700000000)",
          "display": "(Liquidity)#(USD 1700000000)"
        },
        {
          "value": "(REVENUE)#(USD 1700000)",
          "display": "(Revenue)#(USD 1700000)"
        },
        {
          "value": "(REVENUE)#(USD 5500000)",
          "display": "(Revenue)#(USD 5500000)"
        }
      ],
      "company_person": [
        {
          "value": "(FACEBOOK)#(JEFF SESSIONS)",
          "display": "(Facebook)#(Jeff Sessions)"
        },
        {
          "value": "(NETFLIX)#(MICHELLE OBAMA)",
          "display": "(Netflix)#(Michelle Obama)"
        },
        {
          "value": "(CITIBANK)#(SELMA BUYCKS-ROBERSON)",
          "display": "(Citibank)#(Selma Buycks-Roberson)"
        }
      ],
      "enginecsv2": [
        "3"
      ],
      "private_label": [],
      "engineusercsv2": [],
      "rank": 0,
      "displayTitle": "Barack <span class=\"match-highlight\">Obama</span>",
      "relevantExtracts": "Barack Hussein <b>Obama </b>II ( /bəˈrɑːk ... Democratic Party , <b>Obama </b>was the first ... <b>Obama </b>was born in ... <b>Obama </b>received national attention ... Hillary Clinton , <b>Obama </b>was elected ... <b>Obama </b>signed many ... Mitt Romney , <b>Obama </b>was sworn ... <b>Obama </b>nominated three ... During <b>Obama</b>&#39;s term ... <b>Obama </b>left office "
    },
    {
      "id": "/Web/Wikipedia/|Presidency_of_Barack_Obama",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 1.013445,
      "matchingpartnames": [
        "text",
        "tables",
        "title"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "{b}Obama{nb}, a Democrat from Illinois , took office following a decisive victory over Republican nominee John McCain in the 2008 presidential election .",
        "194,146",
        "33026,540",
        "{b}Obama{nb} was succeeded by Republican Donald Trump , who won the 2016 presidential election .",
        "600,89",
        "34327,251",
        "{b}Obama{nb}'s first-term actions addressed the global financial crisis and included a major stimulus package , a partial extension of the Bush tax cuts , legislation to reform health care , a major financial regulation reform bill , and the end of a major US military presence in Iraq .",
        "691,280",
        "34586,939",
        "{b}Obama{nb} also appointed Supreme Court Justices Elena Kagan and Sonia Sotomayor , the latter of whom became the first Hispanic American on the Supreme Court.",
        "972,153",
        "35526,456",
        "Following the elections, {b}Obama{nb} and Congressional Republicans engaged in a protracted stand-off over government spending levels and the debt ceiling .",
        "1260,149",
        "36308,230",
        "The {b}Obama{nb} administration's policy against terrorism downplayed Bush's counterinsurgency model, expanding air strikes and making extensive use of special forces and encouraging greater reliance on host-government militaries.",
        "1410,223",
        "36539,223",
        "The {b}Obama{nb} administration orchestrated the military operation that resulted in the death of Osama bin Laden on May 2, 2011.",
        "1634,122",
        "36763,302",
        "In his second term, {b}Obama{nb} took steps to combat climate change , signing a major international climate agreement and an executive order to limit carbon emissions .",
        "1758,162",
        "37073,396",
        "{b}Obama{nb} also presided over the implementation of the Affordable Care Act and other legislation passed in his first term, and he negotiated rapprochements with Iran and Cuba.",
        "1921,171",
        "37470,239",
        "Republicans took control of the Senate after the 2014 elections , and {b}Obama{nb} continued to grapple with Congressional Republicans over government spending, immigration, judicial nominations, and other issues.",
        "2290,206",
        "38012,291"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "27,5,96,5,194,5,600,5,691,5,972,5,1285,5,1414,5,1638,5,1778,5,1921,5,2165,5,2242,5,2360,5,2554,5,2710,5,2809,5,3104,5,3228,5,3250,5,3536,5,4050,5,4110,5,4249,5,4311,5,4428,5,4483,5,4554,5,4731,5,4913,5,5025,5,5198,5,5351,5,5496,5,5561,5,5712,5,5950,5,5982,5,6029,5,7286,5,7341,5,7466,5,7486,5,7619,5,7912,5,8706,5,8823,5,9013,5,9460,5,9688,5,9872,5,10020,5,10318,5,10569,5,10940,5,11019,5,11195,5,11488,5,12030,5,12665,5,13024,5,14553,5,14887,5,16567,5,16901,5,16979,5,17706,5,18331,5,18351,5,18529,5,18688,5,18770,5,19052,5,19208,5,19583,5,19805,5,20035,5,20205,5,20310,5,20573,5,20662,5,21009,5,21815,5,21906,5,22299,5,22414,5,22838,5,23067,5,23144,5,23891,5,24127,5,24514,5,24626,5,24734,5,24973,5,25032,5,25224,5,25304,5,26100,5,26195,5,26253,5,26308,5,26876,5,27422,5,27450,5,27598,5,27816,5,28053,5,28120,5,28356,5,28593,5,28915,5,28958,5,29014,5,29135,5,29209,5,30288,5,30416,5,30529,5,31512,5,31657,5,31751,5,31808,5,33311,5,33367,5,33467,5,33667,5,33862,5,34138,5,34317,5,34608,5,34654,5,35159,5,35367,5,35549,5,37008,5,37217,5,37345,5,37648,5,38197,5,38414,5,38434,5,38500,5,38771,5,38983,5,39312,5,39421,5,39835,5,39985,5,40093,5,40177,5,40368,5,40473,5,40493,5,40634,5,40837,5,40987,5,41526,5,41781,5,42092,5,42275,5,42383,5,42799,5,42954,5,43233,5,43321,5,43488,5,43602,5,43691,5,43817,5,43881,5,44349,5,44413,5,44542,5,44745,5,45430,5,45567,5,45679,5,45904,5,46262,5,46295,5,46683,5,46761,5,47349,5,47579,5,47806,5,48016,5,48108,5,48244,5,48355,5,48557,5,48933,5,49097,5,49151,5,49489,5,49559,5,49651,5,49740,5,50318,5,50662,5,50829,5,50851,5,50969,5,51061,5,51253,5,51516,5,51859,5,52087,5,52257,5,52598,5,52826,5,53035,5,53452,5,53493,5,53645,5,53727,5,53747,5,53828,5,54328,5,54373,5,54463,5,54843,5,55480,5,55566,5,55732,5,56089,5,56410,5,56490,5,57015,5,57369,5,57537,5,57697,5,58065,5,58221,5,58264,5,58449,5,58582,5,58804,5,58878,5,59100,5,59192,5,59399,5,59776,5,60038,5,60266,5,60387,5,60596,5,61292,5,61387,5,61504,5,61869,5,61993,5,62165,5,62266,5,62498,5,62732,5,62877,5,63329,5,63414,5,63745,5,64487,5,65072,5,65556,5,65750,5,65918,5,66484,5,66627,5,66775,5,66881,5,66929,5,67084,5,67607,5,67711,5,68260,5,68342,5,68696,5,69333,5,69937,5,70174,5,70456,5,71046,5,71235,5,71295,5,71693,5,71812,5,72167,5,72393,5,72526,5,72676,5,72824,5,74342,5,74465,5,74661,5,74868,5,75332,5,75623,5,76093,5,76429,5,76582,5,76950,5,77715,5,77758,5,77892,5,78301,5,78390,5,78554,5,78714,5,78820,5,78927,5,79224,5,79965,5,80120,5,80334,5,80466,5,80954,5,81164,5,81245,5,81265,5,81378,5,81565,5,81705,5,81833,5,82141,5,82213,5,82327,5,82560,5,82807,5,83046,5,83175,5,83386,5,84319,5,84507,5,84929,5,85150,5,85383,5,85475,5,85558,5,85636,5,85924,5,86064,5,86280,5,87084,5,87407,5,87768,5,87834,5,87975,5,88099,5,88164,5,88231,5,88530,5,88560,5,88665,5,88932,5,89025,5,89132,5,89159,5,89256,5,89832,5,89906,5,90005,5,90138,5,90186,5,90357,5,90418,5,90579,5,90713,5,90835,5,90887,5,91018,5,91196,5,91406,5,91523,5,91664,5,91759,5,91903,5,91978,5,92069,5,92144,5,92296,5,92368,5,92452,5,92514,5,92618,5,92681,5,92945,5,93019,5,93255,5,93426,5,93436,5,93665,5,93738,5,93893,5,93971,5,94111,5,94221,5,94268,5,94475,5,94563,5,94918,5,95272,5,95501,5,95542,5,95584,5,95628,5,95642,5,95897,5,96513,5,97227,5,97259,5,97300,5,97364,5,97475,5,97573,5;32550,5,32737,5,33026,5,34327,5,34586,5,35526,5,36333,5,36543,5,36767,5,37093,5,37470,5,37782,5,37859,5,38167,5,84184,5,84671,5,85089,5,85682,5,85975,5,85997,5,86712,5,88622,5,88682,5,89179,5,89241,5,89641,5,89931,5,90167,5,90920,5,91102,5,110984,5,111295,5,111823,5,112323,5,112464,5,112951,5,113472,5,113653,5,113856,5,135388,5,136663,5,136966,5,136986,5,137204,5,138156,5,141565,5,142073,5,142347,5,143624,5,155777,5,156248,5,156608,5,157428,5,158030,5,159063,5,159326,5,159800,5,160664,5,161590,5,166288,5,167078,5,171245,5,171994,5,177697,5,178857,5,179134,5,181059,5,182088,5,182255,5,182572,5,183685,5,184082,5,184585,5,185044,5,185945,5,186618,5,187077,5,187393,5,187498,5,188254,5,188482,5,189111,5,191337,5,191512,5,192323,5,192585,5,193475,5,193930,5,195176,5,197995,5,198863,5,199664,5,199920,5,200168,5,200926,5,201482,5,202282,5,202362,5,204461,5,204880,5,205078,5,206034,5,207272,5,209302,5,210157,5,210883,5,211156,5,211647,5,211714,5,212190,5,212767,5,213599,5,213932,5,213988,5,214191,5,214411,5,218095,5,218425,5,218690,5,221114,5,221379,5,221762,5,221819,5,225917,5,226498,5,226636,5,227233,5,227834,5,228562,5,228984,5,229666,5,229848,5,231319,5,232088,5,232271,5,234393,5,235072,5,235407,5,236055,5,237887,5,238246,5,238266,5,238332,5,239268,5,239722,5,240519,5,240628,5,241587,5,242257,5,243950,5,244138,5,244675,5,245033,5,245189,5,245472,5,246058,5,246406,5,247559,5,248118,5,249427,5,249748,5,250010,5,251006,5,251483,5,252347,5,252786,5,253089,5,253621,5,253921,5,254089,5,254455,5,264676,5,264864,5,265100,5,265629,5,267088,5,267362,5,267744,5,268160,5,269651,5,269684,5,270901,5,271119,5,273927,5,274523,5,275316,5,276001,5,276093,5,276349,5,276542,5,277122,5,278320,5,278484,5,278692,5,280665,5,280824,5,281131,5,281371,5,282964,5,284123,5,284600,5,284902,5,285181,5,285600,5,285976,5,286890,5,288020,5,288589,5,289093,5,290495,5,291074,5,291755,5,293045,5,293581,5,294005,5,294227,5,294301,5,294600,5,300020,5,300246,5,300336,5,301545,5,303474,5,303722,5,303888,5,304775,5,305781,5,306048,5,307652,5,308781,5,309566,5,310237,5,311208,5,311635,5,311962,5,312694,5,313055,5,315000,5,315194,5,316068,5,316294,5,316844,5,317735,5,319055,5,320002,5,320390,5,321162,5,322613,5,322836,5,323239,5,324027,5,324454,5,324979,5,325274,5,325833,5,327455,5,327758,5,329092,5,329325,5,330158,5,331603,5,333071,5,334272,5,334608,5,334986,5,336242,5,336533,5,336866,5,337118,5,352458,5,353990,5,355394,5,355498,5,357687,5,357845,5,358875,5,360414,5,362035,5,362647,5,363937,5,365329,5,366337,5,366539,5,367446,5,367758,5,368737,5,369737,5,370043,5,370529,5,370872,5,376926,5,377348,5,378060,5,378816,5,380332,5,381059,5,382661,5,383764,5,384181,5,385463,5,387665,5,387854,5,388386,5,389482,5,389817,5,389981,5,390997,5,391103,5,391210,5,391872,5,394006,5,394303,5,395396,5,395672,5,396581,5,396949,5,397030,5,397050,5,397319,5,404853,5,405212,5,405480,5,406017,5,406329,5,406634,5,407101,5,407924,5,408303,5,408653,5,409078,5,412896,5,415713,5,416581,5,416922,5,419919,5,420083,5,420383,5,420461,5,421115,5,421482,5,421920,5,426752,5,427292,5,429582,5,429791,5,430208,5,430589,5,430654,5,430865,5,431574,5,431604,5,431855,5,432605,5,432801,5,433050,5,433077,5,433429,5,436446,5,436723,5,436970,5,437251,5,437299,5,437618,5,437827,5,438270,5,438663,5,438785,5,439036,5,439463,5,439874,5,440232,5,440498,5,440794,5,440889,5,441225,5,441457,5,441548,5,441769,5,442005,5,442077,5,442197,5,442511,5,442654,5,442857,5,443647,5,443723,5,444336,5,444509,5,444519,5,445163,5,445238,5,445705,5,445785,5,446225,5,446481,5,446654,5,447161,5,447691,5,448555,5,449400,5,452306,5,452483,5,452715,5,452885,5,453015,5,453451,5,455090,5,1576165,5,1576338,5,1576573,5,1576842,5,1577272,5,1577524,5"
          },
          {
            "partname": "tables",
            "data": "97617,5,97680,5,97770,5,97812,5;1705990,5,1706055,5,1706148,5,1706192,5"
          },
          {
            "partname": "title",
            "data": "99736,5;1708340,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Presidency of Barack Obama",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 05:38:46",
      "indexationtime": "2020-09-02 05:34:01",
      "version": "PEo9m7wPs9sAokyGbeLUiA==",
      "size": 1705860,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Presidency_of_Barack_Obama",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "DONALD TRUMP",
          "display": "Donald Trump"
        },
        {
          "value": "JOHN BOEHNER",
          "display": "John Boehner"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "BUSH",
          "display": "Bush"
        },
        {
          "value": "MITT ROMNEY",
          "display": "Mitt Romney"
        },
        {
          "value": "GEORGE W. BUSH",
          "display": "George W. Bush"
        },
        {
          "value": "JOE BIDEN",
          "display": "Joe Biden"
        },
        {
          "value": "OSAMA BIN LADEN",
          "display": "Osama bin Laden"
        },
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "NANCY PELOSI",
          "display": "Nancy Pelosi"
        },
        {
          "value": "MITCH MCCONNELL",
          "display": "Mitch McConnell"
        },
        {
          "value": "VALERIE JARRETT",
          "display": "Valerie Jarrett"
        },
        {
          "value": "SONIA SOTOMAYOR",
          "display": "Sonia Sotomayor"
        },
        {
          "value": "JOHN MCCAIN",
          "display": "John McCain"
        },
        {
          "value": "ARNE DUNCAN",
          "display": "Arne Duncan"
        },
        {
          "value": "BERNIE SANDERS",
          "display": "Bernie Sanders"
        },
        {
          "value": "EDWARD SNOWDEN",
          "display": "Edward Snowden"
        },
        {
          "value": "LEON PANETTA",
          "display": "Leon Panetta"
        }
      ],
      "company": [
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "GENERAL MOTORS",
          "display": "General Motors"
        },
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        },
        {
          "value": "BOEING",
          "display": "Boeing"
        },
        {
          "value": "SONY",
          "display": "Sony"
        },
        {
          "value": "CITIGROUP",
          "display": "Citigroup"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "AFGHANISTAN",
          "display": "Afghanistan"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "RUSSIA",
          "display": "Russia"
        },
        {
          "value": "IRAN",
          "display": "Iran"
        },
        {
          "value": "CUBA",
          "display": "Cuba"
        },
        {
          "value": "CHINA",
          "display": "China"
        },
        {
          "value": "GUANTANAMO",
          "display": "Guantanamo"
        },
        {
          "value": "LIBYA",
          "display": "Libya"
        },
        {
          "value": "SYRIA",
          "display": "Syria"
        },
        {
          "value": "MASSACHUSETTS",
          "display": "Massachusetts"
        },
        {
          "value": "MIDDLE EAST",
          "display": "Middle East"
        },
        {
          "value": "ASIA",
          "display": "Asia"
        },
        {
          "value": "ISRAEL",
          "display": "Israel"
        },
        {
          "value": "YEMEN",
          "display": "Yemen"
        },
        {
          "value": "NORTH KOREA",
          "display": "North Korea"
        },
        {
          "value": "SOUTH KOREA",
          "display": "South Korea"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "BENGHAZI",
          "display": "Benghazi"
        },
        {
          "value": "CANADA",
          "display": "Canada"
        }
      ],
      "wordcount": 11215,
      "exacthash": "podwcBirGSxcudpTpW3DXg==",
      "nearhash": "3J63aiFDhWpIc10GHsp3PA==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Presidency_of_Barack_Obama",
      "sourcecsv1": [
        "Presidency of Barack Obama",
        "President",
        "Cabinet",
        "Party",
        "Election",
        "Seat",
        "Barack Obama",
        "Joe Biden",
        "Hillary Clinton",
        "John Kerry",
        "Tim Geithner",
        "Jack Lew",
        "Bob Gates *",
        "Leon Panetta",
        "Chuck Hagel",
        "Ash Carter",
        "Eric Holder",
        "Loretta Lynch",
        "Ken Salazar",
        "Sally Jewell",
        "Tom Vilsack",
        "Gary Locke",
        "John Bryson",
        "Penny Pritzker",
        "Hilda Solis",
        "Thomas Perez",
        "Kathleen Sebelius",
        "Sylvia Burwell",
        "Arne Duncan",
        "John King",
        "Shaun Donovan",
        "Julian Castro",
        "Ray LaHood",
        "Anthony Foxx",
        "Steven Chu",
        "Ernest Moniz",
        "Eric Shinseki",
        "Bob McDonald",
        "Janet Napolitano",
        "Jeh Johnson",
        "Rahm Emanuel",
        "William Daley",
        "Denis McDonough",
        "Lisa Jackson",
        "Gina McCarthy",
        "Peter Orszag",
        "Susan Rice",
        "Samantha Power",
        "Ron Kirk",
        "Michael Froman",
        "Christina Romer",
        "Austan Goolsbee",
        "Alan Krueger",
        "Jason Furman",
        "Karen Mills **",
        "Maria Contreras-Sweet"
      ],
      "sourcecsv2": [
        "Timeline_of_the_presidency_of_Barack_Obama",
        "President_of_the_United_States",
        "Cabinet_of_Barack_Obama",
        "Democratic_Party_(United_States)",
        "2008_United_States_presidential_election",
        "2012_United_States_presidential_election",
        "White_House",
        "Presidency_of_George_W._Bush",
        "Presidency_of_Donald_Trump",
        "Barack_Obama",
        "Political_positions_of_Barack_Obama",
        "Electoral_history_of_Barack_Obama",
        "Early_life_and_career_of_Barack_Obama",
        "Family_of_Barack_Obama",
        "Public_image_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "United_States_Senate_career_of_Barack_Obama",
        "Timeline_of_the_Barack_Obama_presidency",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Obama_Doctrine",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "Presidency_of_Barack_Obama",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_2008_presidential_campaign",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Patient_Protection_and_Affordable_Care_Act",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Barack_Obama_2012_presidential_campaign",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Second_inauguration_of_Barack_Obama",
        "Immigration_reform_in_the_United_States#Obama&#39",
        "s_executive_actions_of_November_2014",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "Barack_Obama_Presidential_Center",
        "Obama_Foundation",
        "One_America_Appeal",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "2009_Nobel_Peace_Prize",
        "Eastern_Time_Zone",
        "Illinois",
        "Republican_Party_(United_States)",
        "John_McCain",
        "Mitt_Romney",
        "List_of_United_States_Presidential_firsts",
        "African_American",
        "Multiracial",
        "Hawaii",
        "Donald_Trump",
        "2016_United_States_presidential_election",
        "Financial_crisis_of_2007%E2%80%9308",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Bush_tax_cuts",
        "Dodd%E2%80%93Frank_Wall_Street_Reform_and_Consumer_Protection_Act",
        "Iraq_War",
        "Iraq",
        "United_States_Supreme_Court",
        "Elena_Kagan",
        "Sonia_Sotomayor",
        "Hispanic_and_Latino_Americans",
        "United_States_House_of_Representatives",
        "2010_United_States_elections",
        "United_States_debt_ceiling",
        "Climate_change",
        "Paris_Agreement",
        "Executive_order",
        "Greenhouse_gas",
        "Affordable_Care_Act",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "2014_United_States_elections",
        "Great_Recession",
        "American_Recovery_and_Reinvestment_Act",
        "Effects_of_the_2008%E2%80%9310_automotive_industry_crisis_on_the_United_States",
        "Wall_Street",
        "Credit_CARD_Act_of_2009",
        "Tax_Relief,_Unemployment_Insurance_Reauthorization,_and_Job_Creation_Act_of_2010",
        "Budget_Control_Act_of_2011",
        "American_Taxpayer_Relief_Act_of_2012",
        "2016_United_States_federal_budget",
        "United_States_debt-ceiling_crisis_of_2013",
        "United_States_federal_government_shutdown_of_2013",
        "Continuing_Appropriations_Act,_2014",
        "Bipartisan_Budget_Act_of_2013",
        "Health_care_reform_in_the_United_States",
        "Health_Care_and_Education_Reconciliation_Act_of_2010",
        "Education_in_the_United_States",
        "Race_to_the_Top",
        "Every_Student_Succeeds_Act",
        "Clean_Power_Plan",
        "Immigration_policy",
        "Deferred_Action_for_Childhood_Arrivals",
        "Deferred_Action_for_Parents_of_Americans",
        "United_States_v._Texas",
        "Lilly_Ledbetter_Fair_Pay_Act",
        "Matthew_Shepard_and_James_Byrd_Jr._Hate_Crimes_Prevention_Act",
        "Don%27t_Ask,_Don%27t_Tell_Repeal_Act_of_2010",
        "United_States_Intelligence_Community",
        "Mass_surveillance_in_the_United_States",
        "Patriot_Act",
        "USA_Freedom_Act",
        "111th_United_States_Congress",
        "Timeline_of_the_presidency_of_Barack_Obama_(2009)",
        "Timeline_of_the_presidency_of_Barack_Obama_(2010)",
        "112th_United_States_Congress",
        "Timeline_of_the_presidency_of_Barack_Obama_(2011)",
        "Timeline_of_the_presidency_of_Barack_Obama_(2012)",
        "113th_United_States_Congress",
        "Timeline_of_the_presidency_of_Barack_Obama_(2013)",
        "Timeline_of_the_presidency_of_Barack_Obama_(2014)",
        "114th_United_States_Congress",
        "Timeline_of_the_presidency_of_Barack_Obama_(2015)",
        "Timeline_of_the_presidency_of_Barack_Obama_(2016)",
        "115th_United_States_Congress",
        "Timeline_of_the_presidency_of_Barack_Obama_(2017)",
        "Free_trade_agreement",
        "United_States%E2%80%93Colombia_Free_Trade_Agreement",
        "Panama%E2%80%93United_States_Trade_Promotion_Agreement",
        "South_Korea-United_States_Free_Trade_Agreement",
        "Trans-Pacific_Partnership",
        "Arms_control",
        "New_START",
        "American-led_intervention_in_Iraq_(2014%E2%80%93present)",
        "Afghanistan",
        "Withdrawal_of_U.S._troops_from_Afghanistan",
        "Cuba",
        "Iran",
        "Drone_strikes_in_Pakistan",
        "2011_military_intervention_in_Libya",
        "Military_intervention_against_ISIL",
        "Merrick_Garland",
        "Merrick_Garland_Supreme_Court_nomination",
        "2008_United_States_elections",
        "2008_Democratic_Party_presidential_primaries",
        "2008_Democratic_National_Convention",
        "United_States_Senate",
        "United_States_Senate_election_in_Illinois,_2004",
        "Democratic_Party_presidential_primaries,_2008",
        "First_Lady_of_the_United_States",
        "Hillary_Clinton",
        "Joe_Biden",
        "Delaware",
        "John_Edwards",
        "Superdelegate",
        "Democratic_Party_vice_presidential_candidate_selection,_2008",
        "George_W._Bush",
        "Arizona",
        "Electoral_College_(United_States)",
        "Speaker_of_the_United_States_House_of_Representatives",
        "Nancy_Pelosi",
        "United_States_Senate_Majority_Leader",
        "Harry_Reid",
        "John_Boehner",
        "Mitch_McConnell",
        "United_States_presidential_transition",
        "Chris_Lu",
        "John_Podesta",
        "Valerie_Jarrett",
        "Pete_Rouse",
        "United_States_Cabinet",
        "Executive_Office_of_the_President_of_the_United_States",
        "Rahm_Emanuel",
        "White_House_Chief_of_Staff",
        "United_States_presidential_inauguration",
        "Oath_of_office_of_the_president_of_the_united_states",
        "Vice_President_of_the_United_States",
        "United_States_Secretary_of_State",
        "John_Kerry",
        "United_States_Secretary_of_the_Treasury",
        "Timothy_Geithner",
        "Jack_Lew",
        "United_States_Secretary_of_Defense",
        "Robert_Gates",
        "Leon_Panetta",
        "Chuck_Hagel",
        "Ash_Carter",
        "United_States_Attorney_General",
        "Eric_Holder",
        "Loretta_Lynch",
        "United_States_Secretary_of_the_Interior",
        "Ken_Salazar",
        "Sally_Jewell",
        "United_States_Secretary_of_Agriculture",
        "Tom_Vilsack",
        "United_States_Secretary_of_Commerce",
        "Gary_Locke",
        "John_Bryson",
        "Penny_Pritzker",
        "United_States_Secretary_of_Labor",
        "Hilda_Solis",
        "Tom_Perez",
        "United_States_Secretary_of_Health_and_Human_Services",
        "Kathleen_Sebelius",
        "Sylvia_Mathews_Burwell",
        "United_States_Secretary_of_Education",
        "Arne_Duncan",
        "John_King_Jr.",
        "United_States_Secretary_of_Housing_and_Urban_Development",
        "Shaun_Donovan",
        "Julian_Castro",
        "United_States_Secretary_of_Transportation",
        "Ray_LaHood",
        "Anthony_Foxx",
        "United_States_Secretary_of_Energy",
        "Steven_Chu",
        "Ernest_Moniz",
        "United_States_Secretary_of_Veterans_Affairs",
        "Eric_Shinseki",
        "Robert_A._McDonald",
        "United_States_Secretary_of_Homeland_Security",
        "Janet_Napolitano",
        "Jeh_Johnson",
        "William_M._Daley",
        "Denis_McDonough",
        "Administrator_of_the_Environmental_Protection_Agency",
        "Lisa_P._Jackson",
        "Gina_McCarthy",
        "Office_of_Management_and_Budget",
        "Peter_R._Orszag",
        "United_States_Ambassador_to_the_United_Nations",
        "Susan_Rice",
        "Samantha_Power",
        "Office_of_the_United_States_Trade_Representative",
        "Ron_Kirk",
        "Michael_Froman",
        "Council_of_Economic_Advisers",
        "Christina_Romer",
        "Austan_Goolsbee",
        "Alan_Krueger",
        "Jason_Furman",
        "Administrator_of_the_Small_Business_Administration",
        "Karen_Mills",
        "Maria_Contreras-Sweet",
        "Confirmations_of_Barack_Obama%27s_Cabinet",
        "Citigroup",
        "Team_of_rivals",
        "Governor_of_Kansas",
        "List_of_United_States_political_appointments_across_party_lines",
        "Ray_Lahood",
        "Independent_agencies_of_the_United_States_government",
        "White_House_Office",
        "Counselor_to_the_President",
        "Senior_Advisor_to_the_President_of_the_United_States",
        "David_Axelrod_(political_consultant)",
        "David_Plouffe",
        "Daniel_Pfeiffer",
        "Brian_Deese",
        "Shailagh_Murray",
        "White_House_Deputy_Chief_of_Staff",
        "Jim_Messina_(political_staffer)",
        "Mona_Sutphen",
        "Nancy-Ann_DeParle",
        "Alyssa_Mastromonaco",
        "Mark_B._Childress",
        "Rob_Nabors",
        "Anita_Decker_Breckenridge",
        "Kristie_Canegallo",
        "White_House_Press_Secretary",
        "Robert_Gibbs",
        "Jay_Carney",
        "Josh_Earnest",
        "White_House_Communications_Director",
        "Ellen_Moran",
        "Anita_Dunn",
        "Jennifer_Palmieri",
        "Jen_Psaki",
        "White_House_Counsel",
        "Greg_Craig",
        "Robert_Bauer",
        "Kathryn_Ruemmler",
        "Neil_Eggleston",
        "National_Security_Advisor_(United_States)",
        "James_L._Jones",
        "Thomas_E._Donilon",
        "Pakistan",
        "Richard_Holbrooke",
        "Marc_Grossman",
        "James_Dobbins_(diplomat)",
        "George_J._Mitchell",
        "David_Hale_(diplomat)",
        "Martin_Indyk",
        "Director_of_National_Intelligence",
        "Dennis_C._Blair",
        "David_C._Gompert",
        "James_R._Clapper",
        "Director_of_the_Federal_Bureau_of_Investigation",
        "Robert_Mueller",
        "James_Comey",
        "Director_of_the_Central_Intelligence_Agency",
        "Michael_Morell",
        "David_Petraeus",
        "John_O._Brennan",
        "Federal_Reserve_Board_of_Governors",
        "Ben_Bernanke",
        "Daniel_Tarullo",
        "Janet_Yellen",
        "Sarah_Bloom_Raskin",
        "Jerome_Powell",
        "Jeremy_C._Stein",
        "Stanley_Fischer",
        "Lael_Brainard",
        "Federal_Deposit_Insurance_Corporation",
        "Sheila_Bair",
        "Martin_J._Gruenberg",
        "U.S._Securities_and_Exchange_Commission",
        "Mary_Schapiro",
        "Elisse_B._Walter",
        "Mary_Jo_White",
        "United_States_National_Economic_Council",
        "Lawrence_Summers",
        "Gene_Sperling",
        "Jeffrey_Zients",
        "Economic_Recovery_Advisory_Board",
        "Paul_Volcker",
        "President%27s_Economic_Recovery_Advisory_Board",
        "Jeffrey_R._Immelt",
        "Barack_Obama_Supreme_Court_candidates",
        "Supreme_Court_of_the_United_States",
        "David_Souter",
        "Sonia_Sotomayor_Supreme_Court_nomination",
        "John_Paul_Stevens",
        "Elena_Kagan_Supreme_Court_nomination",
        "Antonin_Scalia",
        "United_States_Court_of_Appeals_for_the_District_of_Columbia_Circuit",
        "United_States_Senate_Committee_on_the_Judiciary",
        "Chuck_Grassley",
        "Neil_Gorsuch",
        "Neil_Gorsuch_Supreme_Court_nomination",
        "Barack_Obama_judicial_appointment_controversies",
        "United_States_federal_judge",
        "United_States_courts_of_appeals",
        "United_States_district_court",
        "Filibuster_in_the_United_States_Senate",
        "82nd_United_States_Congress",
        "Denver",
        "Barack_Obama_speech_to_joint_session_of_Congress,_February_2009",
        "Oath_of_office",
        "September_11_attacks",
        "Executive_Order_13492",
        "Guantanamo_military_commission",
        "Executive_Order_13491",
        "Waterboarding",
        "Mexico_City_Policy",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "Statute_of_limitations",
        "Pay_discrimination",
        "Children%27s_Health_Insurance_Program_Reauthorization_Act",
        "Embryonic_stem_cell",
        "Signing_statement",
        "Omnibus_Public_Land_Management_Act_of_2009",
        "National_Wilderness_Preservation_System",
        "Bipartisan",
        "Barack_Obama_social_policy",
        "Health_care_reforms_proposed_during_the_Obama_administration",
        "American_Clean_Energy_and_Security_Act",
        "DREAM_Act",
        "Treaty_Clause",
        "Obamacare",
        "Health_care_reform_debate_in_the_United_States",
        "Clinton_health_care_plan_of_1993",
        "United_States_Senate_Committee_on_Finance",
        "Gang_of_Six#Health_care,_2009",
        "Affordable_Health_Care_for_America_Act",
        "Medicaid",
        "Health_insurance_mandate",
        "Health_insurance_exchange",
        "Pre-existing_condition",
        "Public_health_insurance_option",
        "Cadillac_insurance_plan",
        "United_States_Senate_special_election_in_Massachusetts,_2010",
        "Scott_Brown_(politician)",
        "Medicare_(United_States)",
        "JAMA_(journal)",
        "National_Federation_of_Independent_Business_v._Sebelius",
        "King_v._Burwell",
        "Tax_credit",
        "HealthCare.gov",
        "Health_insurance_coverage_in_the_United_States",
        "Single-payer_healthcare",
        "Banking_in_the_United_States",
        "Subprime_mortgage_crisis",
        "Wall_Street_reform",
        "New_Deal",
        "Derivative_(finance)",
        "Credit_default_swap",
        "Systemic_risk",
        "Capital_requirement",
        "Orderly_Liquidation_Authority",
        "Financial_Stability_Oversight_Council",
        "Consumer_Financial_Protection_Bureau",
        "Glass-Steagall_Act",
        "Rulemaking",
        "Environmental_policy_of_the_United_States",
        "Marine_policy_of_the_Barack_Obama_administration",
        "Global_warming",
        "Global_catastrophic_risk",
        "Climate_change_denial",
        "Emissions_trading",
        "Environmental_Protection_Agency",
        "Coal",
        "Natural_gas",
        "2009_United_Nations_Climate_Change_Conference",
        "Copenhagen_Accord",
        "Kyoto_Protocol",
        "Carbon_emissions_reporting",
        "Carbon_emissions",
        "Developing_countries",
        "2015_United_Nations_Climate_Change_Conference",
        "Montreal_Protocol",
        "Hydrofluorocarbons",
        "Fuel_economy_in_automobiles",
        "Corporate_Average_Fuel_Economy",
        "Car_Allowance_Rebate_System",
        "Renewable_energy",
        "Electricity_grid",
        "Plug-in_electric_vehicle",
        "Economy_of_the_United_States",
        "Real_versus_nominal_value_(economics)",
        "Real_gross_domestic_product",
        "Global_financial_crisis_of_2008%E2%80%932009",
        "Great_Depression",
        "Tax_incentive",
        "Automotive_industry_crisis_of_2008%E2%80%9310",
        "General_Motors",
        "Chrysler",
        "Mortgage",
        "Home_Affordable_Refinance_Program",
        "Home_Affordable_Modification_Program",
        "Federal_Reserve_Board",
        "Interest_rate",
        "Zero_interest-rate_policy",
        "List_of_U.S._states_by_unemployment_rate",
        "Income_inequality_in_the_United_States",
        "Minimum_wage_in_the_United_States",
        "Fair_Minimum_Wage_Act_of_2007",
        "Bill_Clinton",
        "Poverty_in_the_United_States",
        "Developed_country",
        "Taxation_in_the_United_States",
        "Income_tax_in_the_United_States",
        "Presidency_of_Bill_Clinton",
        "Reconciliation_(United_States_Congress)",
        "Lame_duck_(politics)",
        "111th_Congress",
        "Unemployment_insurance",
        "Federal_Insurance_Contributions_Act_tax",
        "Bernie_Sanders",
        "United_States_fiscal_cliff",
        "Alternative_minimum_tax",
        "Tax_deduction",
        "Estate_tax_in_the_United_States",
        "United_States_federal_budget",
        "National_debt_of_the_United_States",
        "Austerity",
        "National_Commission_on_Fiscal_Responsibility_and_Reform",
        "United_States_military_spending",
        "Home_mortgage_interest_deduction",
        "Social_Security_(United_States)",
        "Cut,_Cap_and_Balance_Act",
        "United_States_Department_of_the_Treasury",
        "United_States_debt-ceiling_crisis_of_2011",
        "Fourteenth_Amendment_to_the_United_States_Constitution",
        "Entitlement",
        "United_States_Congress_Joint_Select_Committee_on_Deficit_Reduction",
        "United_States_budget_sequestration_in_2013",
        "Continuing_Appropriations_Resolution,_2014_(H.J.Res_59)",
        "Consolidated_Appropriations_Act,_2014",
        "October_2015_Speaker_of_the_United_States_House_of_Representatives_election",
        "Debt_limit",
        "LGBT_rights_in_the_United_States",
        "LGBT",
        "Hate_crime_laws_in_the_United_States",
        "Don%27t_ask,_don%27t_tell",
        "United_States_Armed_Forces",
        "Employment_Non-Discrimination_Act",
        "Equality_Act_of_2015",
        "Same-sex_marriage",
        "Todd_M._Hughes",
        "United_States_Court_of_Appeals_for_the_Federal_Circuit",
        "Obergefell_v._Hodges",
        "Executive_Order_13672",
        "Women_in_combat",
        "Transgender",
        "Africa",
        "Common_Core_State_Standards_Initiative",
        "National_Governors_Association",
        "Council_of_Chief_State_School_Officers",
        "Pre-kindergarten",
        "Let%27s_Move",
        "Michelle_Obama",
        "Childhood_obesity",
        "Student_loan",
        "Pay_as_You_Earn_(PAYE)_-_Federal_Student_Loan_Relief_Program",
        "Pell_Grant",
        "For-profit_college",
        "Immigration_to_the_United_States",
        "Border_Security,_Economic_Opportunity,_and_Immigration_Modernization_Act_of_2013",
        "Immigration_and_Nationality_Act_of_1965",
        "Refugees_of_the_Syrian_Civil_War",
        "Energy_policy_of_the_Obama_administration",
        "International_Space_Station",
        "Fracking",
        "Solar_power",
        "Deepwater_Horizon_oil_spill",
        "Arctic_Ocean",
        "Keystone_XL_Pipeline",
        "Oil_sand",
        "Gulf_of_Mexico",
        "Keystone_Pipeline",
        "Criminal_justice_reform_in_the_United_States",
        "Federal_drug_policy_of_the_United_States",
        "Crime_in_the_United_States",
        "Medical_marijuana",
        "Consolidated_Appropriations_Act,_2010",
        "Needle-exchange_programme",
        "Fair_Sentencing_Act",
        "Crack_cocaine",
        "Cocaine",
        "Cannabis_in_the_United_States",
        "Marijuana",
        "Legal_history_of_cannabis_in_the_United_States",
        "Controlled_Substances_Act",
        "War_on_drugs",
        "Private_prison",
        "Pardon",
        "Opioid_epidemic",
        "Fentanyl",
        "Heroin",
        "Gun_politics_in_the_United_States",
        "Sandy_Hook_Elementary_School_shooting",
        "Gun_control",
        "Mass_shooting",
        "Federal_Assault_Weapons_Ban",
        "Assault_weapons",
        "Magazine_(firearms)",
        "Background_check",
        "Armor-piercing_bullet",
        "Bureau_of_Alcohol,_Tobacco,_Firearms_and_Explosives",
        "Joe_Manchin",
        "Pat_Toomey",
        "Charleston_church_shooting",
        "Second_Amendment_to_the_United_States_Constitution",
        "McDonald_v._City_of_Chicago",
        "Incorporation_of_the_Bill_of_Rights",
        "List_of_areas_in_the_United_States_National_Park_System",
        "Concealed_carry_in_the_United_States",
        "Cyberwarfare_in_the_United_States",
        "Cybersecurity",
        "United_States_Cyber_Command",
        "Sony_Pictures_Entertainment",
        "Sony_Pictures_Entertainment_hack",
        "North_Korea",
        "The_Interview",
        "Cybersecurity_Information_Sharing_Act",
        "Democratic_National_Committee",
        "Democratic_National_Committee_cyber_attacks",
        "Email",
        "Colin_Powell",
        "Race_and_ethnicity_in_the_United_States",
        "Harvard_University",
        "Henry_Louis_Gates,_Jr.",
        "Cambridge,_Massachusetts",
        "Henry_Louis_Gates_arrest_controversy",
        "African-American",
        "Trial_of_George_Zimmerman",
        "George_Zimmerman",
        "Shooting_of_Trayvon_Martin",
        "Shooting_of_Michael_Brown",
        "Ferguson,_Missouri",
        "Ferguson_unrest",
        "Black_Lives_Matter",
        "Institutional_racism",
        "Black_people",
        "Kennedy_Space_Center",
        "Charles_Bolden",
        "NASA",
        "Augustine_panel",
        "Constellation_program",
        "2011_United_States_federal_budget",
        "Mars",
        "Low_Earth_orbit",
        "Space_Launch_System",
        "Commercial_Crew_Development",
        "Commercial_Orbital_Transportation_Services",
        "SpaceX",
        "Virgin_Galactic",
        "Blue_Origin",
        "Boeing",
        "Bigelow_Aerospace",
        "Space_Shuttle_program",
        "Russian_space_program",
        "Lunar_Reconnaissance_Orbiter",
        "Mars_Science_Laboratory",
        "Human_mission_to_Mars",
        "Internet",
        "Broadband_internet",
        "Federal_Communications_Commission",
        "Internet_provider",
        "Public_utility",
        "Net_neutrality",
        "18F",
        "United_States_Digital_Service",
        "Information_technology",
        "High-speed_rail_in_the_United_States",
        "Florida_High_Speed_Corridor",
        "Autonomous_car",
        "National_Highway_Traffic_Safety_Administration",
        "Cancer_research",
        "Cancer",
        "The_American_Economic_Review",
        "War_on_Terror",
        "A_New_Beginning",
        "Muslim_world",
        "Special_forces",
        "Infantry",
        "Al-Qaeda",
        "ISIL",
        "Al-Shabaab_(militant_group)",
        "Authorization_for_Use_of_Military_Force_Against_Terrorists",
        "East_Asian_foreign_policy_of_the_Barack_Obama_administration",
        "East_Asia",
        "India",
        "Nuclear_non-proliferation",
        "Engagement_(diplomacy)",
        "Internationalism_(politics)",
        "Isolationism",
        "Realism_(international_relations)",
        "Liberal_internationalism",
        "U.S.%E2%80%93Iraq_Status_of_Forces_Agreement",
        "Nouri_al-Maliki",
        "Embassy_of_the_United_States,_Baghdad",
        "Islamic_State_of_Iraq_and_the_Levant",
        "Syrian_Civil_War",
        "Iraqi_Civil_War_(2014%E2%80%932017)",
        "Michael_Mullen",
        "U.S.%E2%80%93Afghanistan_Strategic_Partnership_Agreement",
        "Major_non-NATO_ally",
        "Embassy_of_the_United_States,_Kabul",
        "Mohammad_Ashraf_Ghani",
        "Hamid_Karzai",
        "President_of_Afghanistan",
        "Abdullah_Abdullah",
        "Operation_Enduring_Freedom",
        "Resolute_Support_Mission",
        "Taliban",
        "Islamic_State_of_Iraq_and_the_Levant_%E2%80%93_Khorasan_Province",
        "Martin_Dempsey",
        "Counter-terrorism",
        "Central_Asia",
        "China_as_an_emerging_superpower",
        "Great_power",
        "China%E2%80%93United_States_relations",
        "Territorial_disputes_in_the_South_China_Sea",
        "South_China_Sea",
        "East_China_Sea",
        "Association_of_Southeast_Asian_Nations",
        "2015_Myanmar_general_election",
        "Myanmar",
        "Vietnam",
        "Australia",
        "Philippines",
        "Laos",
        "South_Korea",
        "Japan",
        "North_Korea%E2%80%93United_States_relations",
        "North_Korea_and_weapons_of_mass_destruction",
        "NATO%E2%80%93Russia_relations",
        "Dmitry_Medvedev",
        "2009_G-20_London_summit",
        "Russian_reset",
        "Russia%E2%80%93United_States_relations",
        "Russia",
        "Russo-Georgian_War",
        "NATO",
        "Expansion_of_NATO",
        "Eastern_bloc",
        "President_of_Russia",
        "World_Trade_Organization",
        "Nuclear_disarmament",
        "Nuclear_weapon",
        "Permanent_normal_trade_relations",
        "Vladimir_Putin",
        "2014%E2%80%9315_Russian_military_intervention_in_Ukraine",
        "Ukraine",
        "Annexation_of_Crimea_by_the_Russian_Federation",
        "Republic_of_Crimea",
        "Euromaidan",
        "International_reactions_to_the_annexation_of_Crimea_by_the_Russian_Federation",
        "International_sanctions_during_the_Ukrainian_crisis",
        "Russian_financial_crisis_(2014%E2%80%93present)",
        "War_in_Donbass",
        "Computer_security",
        "Cyberwarfare_in_Russia",
        "2016_United_States_election_interference_by_Russia",
        "Special_prosecutor",
        "Links_between_Trump_associates_and_Russian_officials",
        "Mueller_Report",
        "Israel",
        "Benjamin_Netenyahu",
        "Israeli%E2%80%93Palestinian_conflict",
        "United_Nations",
        "Palestinian_people",
        "Two-state_solution",
        "Iron_Dome",
        "United_Nations_Security_Council_Resolution_2334",
        "Israeli_settlement",
        "Israeli-occupied_territories",
        "Six-Day_War",
        "United_States_free_trade_agreements",
        "Panama",
        "Colombia",
        "Doha_Development_Round",
        "Trade_barrier",
        "Transatlantic_Trade_and_Investment_Partnership",
        "European_Union",
        "Trans-Pacific_Partnership_negotiations",
        "Trade_promotion_authority",
        "2016_United_States_presidential_elections",
        "Comprehensive_and_Progressive_Agreement_for_Trans-Pacific_Partnership",
        "Guantanamo_Bay_detention_camp",
        "Enemy_combatant",
        "Prisoner_of_war",
        "Army_Field_Manual",
        "Enhanced_interrogation_techniques",
        "Enemy_combatants",
        "Periodic_Review_Board",
        "Yemen",
        "Wikisource",
        "White_House_Situation_Room",
        "Osama_bin_Laden",
        "Sunni",
        "Islamist",
        "Terrorism",
        "Osama_bin_Laden%27s_compound_in_Abbottabad",
        "Abbottabad",
        "Islamabad",
        "Navy_SEALs",
        "Reactions_to_the_death_of_Osama_bin_Laden",
        "Drone_attacks_in_Pakistan",
        "Yemeni_Civil_War_(2015%E2%80%93present)",
        "Unmanned_aerial_vehicle",
        "Somalia",
        "Civilian_casualties_from_US_drone_strikes",
        "North_Waziristan",
        "Blowback_(intelligence)",
        "United_nations",
        "Extrajudicial_killing",
        "Extrajudicial_punishment",
        "Anwar_al-Aulaqi",
        "Al-Qaeda_in_the_Arabian_Peninsula",
        "Due_Process_Clause",
        "Cuba%E2%80%93United_States_relations",
        "United_States_embargo_against_Cuba",
        "Cuban_Revolution",
        "Cuban_Missile_Crisis",
        "Vatican_City",
        "Pope_Francis",
        "Prisoner_swap",
        "Raul_Castro",
        "Death_and_state_funeral_of_Nelson_Mandela",
        "Johannesburg",
        "Alan_Gross",
        "Cuban_Five",
        "State_Sponsors_of_Terrorism",
        "Calvin_Coolidge",
        "Wet_feet,_dry_feet_policy",
        "Latin_America%E2%80%93United_States_relations",
        "Iran%E2%80%93United_States_relations",
        "Iranian_Revolution",
        "Iran_hostage_crisis",
        "Nuclear_program_of_Iran",
        "Iran_and_state-sponsored_terrorism",
        "Negotiations_leading_to_the_Joint_Comprehensive_Plan_of_Action",
        "P5%2B1",
        "Hasan_Rouhani",
        "2013_Iranian_presidential_election",
        "President_of_Iran",
        "Benjamin_Netanyahu",
        "International_Atomic_Energy_Agency",
        "Arab_Spring",
        "Arab_states",
        "Arab",
        "Egyptian_Revolution_of_2011",
        "Hosni_Mubarak",
        "Abdel_Fattah_el-Sisi",
        "Mohammed_Morsi",
        "2013_Egyptian_coup_d%27%C3%A9tat",
        "Yemeni_Revolution",
        "Saudi_Arabian-led_intervention_in_Yemen",
        "Saudi_Arabia",
        "2016_Sana%27a_funeral_airstrike",
        "Benghazi",
        "Muammar_Gaddafi",
        "United_Nations_Security_Council_Resolution_1973",
        "No_fly_zone",
        "Tomahawk_cruise_missiles",
        "Sweden",
        "Libyan_Civil_War_(2014%E2%80%93present)",
        "Libyan_Civil_War_(2011)",
        "US_domestic_reactions_to_the_2011_military_intervention_in_Libya",
        "War_Powers_Resolution",
        "United_States_Ambassador_to_Libya",
        "J._Christopher_Stevens",
        "United_States_House_Select_Committee_on_Benghazi",
        "American-led_intervention_in_the_Syrian_Civil_War",
        "Bashar_al-Assad",
        "Syrian_opposition",
        "Ghouta_chemical_attack",
        "Al-Qaeda_in_Iraq",
        "Abu_Musab_al-Zarqawi",
        "Terrorist",
        "American-led_intervention_in_Syria",
        "Kurds_in_Syria",
        "Turkey",
        "Kurds",
        "Kurds_in_Turkey",
        "Russian_military_intervention_in_the_Syrian_Civil_War",
        "Proxy_war",
        "Barack_Obama_on_mass_surveillance",
        "United_States_Department_of_Justice",
        "PRISM_(surveillance_program)",
        "Clandestine_operation",
        "Mass_surveillance",
        "Computer_surveillance",
        "Data_mining",
        "National_Security_Agency",
        "News_leak",
        "Edward_Snowden",
        "Search_warrant",
        "U.S._Executive_Branch",
        "Lobbying_in_the_United_States",
        "Citizens_for_Responsibility_and_Ethics_in_Washington",
        "Weekly_address",
        "Whitehouse.gov",
        "Executive_Order_13233",
        "Freedom_of_Information_Act_(United_States)",
        "State_secrets_privilege",
        "Whistleblowing",
        "Espionage_Act_of_1917",
        "Thomas_Andrews_Drake",
        "Stephen_Jin-Woo_Kim",
        "State_Department",
        "Jeffrey_Alexander_Sterling",
        "Shamai_Leibowitz",
        "Federal_Bureau_of_Investigation",
        "John_Kiriakou",
        "Chelsea_Manning",
        "United_States_Army",
        "United_States_v._Manning",
        "Global_surveillance_disclosures_(2013%E2%80%93present)",
        "Glenn_Greenwald",
        "Reactions_to_global_surveillance_disclosures",
        "Party_divisions_of_United_States_Congresses",
        "Tea_Party_Movement",
        "2010_United_States_House_of_Representatives_elections",
        "Redistricting",
        "2010_United_States_census",
        "2012_United_States_elections",
        "2012_Democratic_Party_presidential_primaries",
        "2012_Democratic_National_Convention",
        "Massachusetts_health_care_reform",
        "Dwight_Eisenhower",
        "Party_leaders_of_the_United_States_Senate",
        "Party_leaders_of_the_United_States_House_of_Representatives",
        "Paul_Ryan",
        "Chuck_Schumer",
        "Wave_election",
        "2016_United_States_elections",
        "Twenty-second_Amendment_to_the_United_States_Constitution",
        "Democratic_Party_presidential_primaries,_2016",
        "Politico",
        "2016_Democratic_National_Convention",
        "Barack_Obama_citizenship_conspiracy_theories",
        "The_Atlantic",
        "Barack_Obama%27s_farewell_address",
        "Historical_rankings_of_Presidents_of_the_United_States",
        "United_States_presidential_approval_rating",
        "Gallup_(company)",
        "Kenya",
        "Natural-born-citizen_clause",
        "CNN",
        "Barack_Obama_religion_conspiracy_theories",
        "Islam",
        "United_Church_of_Christ",
        "Mainline_Protestant",
        "Siena_Research_Institute",
        "Siena_College",
        "Loudonville,_New_York",
        "Institute_for_the_Study_of_the_Americas",
        "University_of_London",
        "School_of_Advanced_Study",
        "Newsweek",
        "History_News_Network",
        "Brookings_Institution",
        "American_Political_Science_Association",
        "Vox_(website)",
        "Rolling_Stone",
        "Parks_and_Recreation",
        "Zeitgeist",
        "Breaking_Bad",
        "Veep",
        "Empire_(2015_TV_series)",
        "Vox_Media",
        "Speeches_of_Barack_Obama",
        "List_of_people_pardoned_by_Barack_Obama",
        "List_of_federal_political_scandals_in_the_United_States#Barack_Obama_administration_(2009–2017)",
        "Roberts_Court",
        "Fiscal_year",
        "Omnibus_Budget_Reconciliation_Act_of_1993",
        "Joe_Lieberman",
        "Angus_King",
        "List_of_tie-breaking_votes_cast_by_Vice_Presidents_of_the_United_States",
        "Al_Franken",
        "United_States_Senate_election_in_Minnesota,_2008",
        "Arlen_Specter",
        "NPR",
        "United_States_Court_of_International_Trade",
        "The_New_York_Times",
        "The_Seattle_Times",
        "Associated_Press",
        "WUSA_(TV)",
        "Doi_(identifier)",
        "ISSN_(identifier)",
        "PMC_(identifier)",
        "PMID_(identifier)",
        "Bureau_of_Labor_Statistics",
        "United_States_Department_of_Labor",
        "Federal_Reserve_Economic_Data",
        "ABC_News",
        "CBS_News",
        "George_Stephanopoulos",
        "Census.gov",
        "Fox_News_Channel",
        "The_Huffington_Post",
        "The_Hill_(newspaper)",
        "ISBN_(identifier)",
        "JSTOR_(identifier)",
        "Pew_Research_Center",
        "The_Guardian",
        "The_Washington_Times",
        "Shane_Harris",
        "BBC_News",
        "Democracy_Now!",
        "The_White_House",
        "The_New_Yorker",
        "The_Washington_Post",
        "Reuters",
        "Robert_Dreyfuss",
        "The_Nation",
        "Charlie_Savage",
        "NBC_News",
        "Social_Research",
        "The_Independent",
        "International_Business_Times",
        "The_Wall_Street_Journal",
        "PolitiFact.com",
        "Scott_Shane",
        "Washingtonian_(magazine)",
        "The_Economist",
        "Fox_News",
        "Bibliography_of_Barack_Obama",
        "Jonathan_Alter",
        "Robert_M._Gates",
        "Duty:_Memoirs_of_a_Secretary_at_War",
        "Alfred_A._Knopf",
        "YouTube",
        "Nadav_Kander",
        "List_of_Presidents_of_the_United_States",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "2004_Democratic_National_Convention",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "West_Wing_Week",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "Of_Thee_I_Sing_(book)",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_presidential_eligibility_litigation",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "Book:Barack_Obama",
        "George_Washington",
        "Presidency_of_George_Washington",
        "John_Adams",
        "Presidency_of_John_Adams",
        "Thomas_Jefferson",
        "Presidency_of_Thomas_Jefferson",
        "James_Madison",
        "Presidency_of_James_Madison",
        "James_Monroe",
        "Presidency_of_James_Monroe",
        "John_Quincy_Adams",
        "Presidency_of_John_Quincy_Adams",
        "Andrew_Jackson",
        "Presidency_of_Andrew_Jackson",
        "Martin_Van_Buren",
        "Presidency_of_Martin_Van_Buren",
        "William_Henry_Harrison",
        "Presidency_of_William_Henry_Harrison",
        "John_Tyler",
        "Presidency_of_John_Tyler",
        "James_K._Polk",
        "Presidency_of_James_K._Polk",
        "Zachary_Taylor",
        "Presidency_of_Zachary_Taylor",
        "Millard_Fillmore",
        "Presidency_of_Millard_Fillmore",
        "Franklin_Pierce",
        "Presidency_of_Franklin_Pierce",
        "James_Buchanan",
        "Presidency_of_James_Buchanan",
        "Abraham_Lincoln",
        "Presidency_of_Abraham_Lincoln",
        "Andrew_Johnson",
        "Presidency_of_Andrew_Johnson",
        "Ulysses_S._Grant",
        "Presidency_of_Ulysses_S._Grant",
        "Rutherford_B._Hayes",
        "Presidency_of_Rutherford_B._Hayes",
        "James_A._Garfield",
        "Presidency_of_James_A._Garfield",
        "Chester_A._Arthur",
        "Presidency_of_Chester_A._Arthur",
        "Grover_Cleveland",
        "Presidencies_of_Grover_Cleveland",
        "Benjamin_Harrison",
        "Presidency_of_Benjamin_Harrison",
        "William_McKinley",
        "Presidency_of_William_McKinley",
        "Theodore_Roosevelt",
        "Presidency_of_Theodore_Roosevelt",
        "William_Howard_Taft",
        "Presidency_of_William_Howard_Taft",
        "Woodrow_Wilson",
        "Presidency_of_Woodrow_Wilson",
        "Warren_G._Harding",
        "Presidency_of_Warren_G._Harding",
        "Presidency_of_Calvin_Coolidge",
        "Herbert_Hoover",
        "Presidency_of_Herbert_Hoover",
        "Franklin_D._Roosevelt",
        "Presidency_of_Franklin_D._Roosevelt",
        "Harry_S._Truman",
        "Presidency_of_Harry_S._Truman",
        "Dwight_D._Eisenhower",
        "Presidency_of_Dwight_D._Eisenhower",
        "John_F._Kennedy",
        "Presidency_of_John_F._Kennedy",
        "Lyndon_B._Johnson",
        "Presidency_of_Lyndon_B._Johnson",
        "Richard_Nixon",
        "Presidency_of_Richard_Nixon",
        "Gerald_Ford",
        "Presidency_of_Gerald_Ford",
        "Jimmy_Carter",
        "Presidency_of_Jimmy_Carter",
        "Ronald_Reagan",
        "Presidency_of_Ronald_Reagan",
        "George_H._W._Bush",
        "Presidency_of_George_H._W._Bush",
        "Seal_of_the_President_of_the_United_States",
        "Book:Presidents_of_the_United_States",
        "LCCN_(identifier)",
        "VIAF_(identifier)",
        "WorldCat_Identities"
      ],
      "sourcestr1": "Presidency_of_Barack_Obama",
      "sourcestr2": "Q1379733",
      "sourcestr3": "Q15284636",
      "sourcestr4": "presidential term",
      "sourcevarchar3": "[{\"Presidency of Barack Obama\":\"January 20, 2009 \\u2013 January 20, 2017\",\"President\":\"Barack Obama\",\"Cabinet\":\"See list\",\"Party\":\"Democratic\",\"Election\":[\"2008\",\",\",\"2012\"],\"Seat\":\"White House\"},{\"The Obama Cabinet\":\"\",\"Office Name Term\":\"\",\"Barack Obama\":[\"President\",\"2009\\u20132017\"],\"Joe Biden\":[\"Vice President\",\"2009\\u20132017\"],\"Hillary Clinton\":[\"Secretary of State\",\"2009\\u20132013\"],\"John Kerry\":\"2013\\u20132017\",\"Tim Geithner\":[\"Secretary of the Treasury\",\"2009\\u20132013\"],\"Jack Lew\":\"2010\\u20132012\",\"Bob Gates *\":[\"Secretary of Defense\",\"2006\\u20132011\"],\"Leon Panetta\":\"2011\\u20132013\",\"Chuck Hagel\":\"2013\\u20132015\",\"Ash Carter\":\"2015\\u20132017\",\"Eric Holder\":[\"Attorney General\",\"2009\\u20132015\"],\"Loretta Lynch\":\"2015\\u20132017\",\"Ken Salazar\":[\"Secretary of the Interior\",\"2009\\u20132013\"],\"Sally Jewell\":\"2013\\u20132017\",\"Tom Vilsack\":[\"Secretary of Agriculture\",\"2009\\u20132017\"],\"Gary Locke\":[\"Secretary of Commerce\",\"2009\\u20132011\"],\"John Bryson\":\"2011\\u20132012\",\"Penny Pritzker\":\"2013\\u20132017\",\"Hilda Solis\":[\"Secretary of Labor\",\"2009\\u20132013\"],\"Thomas Perez\":\"2013\\u20132017\",\"Kathleen Sebelius\":[\"Secretary of Health and\",\"Human Services\",\"2009\\u20132014\"],\"Sylvia Burwell\":\"2013\\u20132014\",\"Arne Duncan\":[\"Secretary of Education\",\"2009\\u20132016\"],\"John King\":\"2016\\u20132017\",\"Shaun Donovan\":\"2014\\u20132017\",\"Julian Castro\":\"2014\\u20132017\",\"Ray LaHood\":[\"Secretary of Transportation\",\"2009\\u20132013\"],\"Anthony Foxx\":\"2013\\u20132017\",\"Steven Chu\":[\"Secretary of Energy\",\"2009\\u20132013\"],\"Ernest Moniz\":\"2013\\u20132017\",\"Eric Shinseki\":[\"Secretary of Veterans Affairs\",\"2009\\u20132014\"],\"Bob McDonald\":\"2014\\u20132017\",\"Janet Napolitano\":[\"Secretary of Homeland Security\",\"2009\\u20132013\"],\"Jeh Johnson\":\"2013\\u20132017\",\"Rahm Emanuel\":[\"Chief of Staff\",\"2009\\u20132010\"],\"William Daley\":\"2011\\u20132012\",\"Denis McDonough\":\"2013\\u20132017\",\"Lisa Jackson\":[\"Administrator of the\",\"Environmental Protection Agency\",\"2009\\u20132013\"],\"Gina McCarthy\":\"2013\\u20132017\",\"Peter Orszag\":[\"Director of the Office of\",\"Management and Budget\",\"2009\\u20132010\"],\"Susan Rice\":[\"Ambassador to the United Nations\",\"2009\\u20132013\"],\"Samantha Power\":\"2013\\u20132017\",\"Ron Kirk\":[\"United States Trade Representative\",\"2009\\u20132013\"],\"Michael Froman\":\"2013\\u20132017\",\"Christina Romer\":[\"Chair of the\",\"Council of Economic Advisers\",\"2009\\u20132010\"],\"Austan Goolsbee\":\"2010\\u20132011\",\"Alan Krueger\":\"2011\\u20132013\",\"Jason Furman\":\"2013\\u20132017\",\"Karen Mills **\":[\"Administrator of the\",\"Small Business Administration\",\"2009\\u20132013\"],\"Maria Contreras-Sweet\":\"2014\\u20132017\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/1200px-President_Barack_Obama.jpg",
      "sourcedouble1": 0.032098,
      "entity1": [
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "2015",
          "display": "2015"
        },
        {
          "value": "2016",
          "display": "2016"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2017",
          "display": "2017"
        },
        {
          "value": "46",
          "display": "46"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "35",
          "display": "35"
        },
        {
          "value": "40",
          "display": "40"
        },
        {
          "value": "45",
          "display": "45"
        },
        {
          "value": "10",
          "display": "10"
        }
      ],
      "date": [
        {
          "value": "2009-01-20",
          "display": "2009-01-20"
        },
        {
          "value": "2009-01-21",
          "display": "2009-01-21"
        },
        {
          "value": "2017-01-20",
          "display": "2017-01-20"
        },
        {
          "value": "2009-01-03",
          "display": "2009-01-03"
        },
        {
          "value": "2009-01-19",
          "display": "2009-01-19"
        },
        {
          "value": "2009-01-22",
          "display": "2009-01-22"
        },
        {
          "value": "2009-02-13",
          "display": "2009-02-13"
        },
        {
          "value": "2009-02-17",
          "display": "2009-02-17"
        },
        {
          "value": "2009-03-09",
          "display": "2009-03-09"
        },
        {
          "value": "2009-04-01",
          "display": "2009-04-01"
        },
        {
          "value": "2009-07-13",
          "display": "2009-07-13"
        },
        {
          "value": "2009-07-30",
          "display": "2009-07-30"
        },
        {
          "value": "2010-03-23",
          "display": "2010-03-23"
        },
        {
          "value": "2010-03-30",
          "display": "2010-03-30"
        },
        {
          "value": "2010-04-08",
          "display": "2010-04-08"
        },
        {
          "value": "2010-04-15",
          "display": "2010-04-15"
        },
        {
          "value": "2010-07-21",
          "display": "2010-07-21"
        },
        {
          "value": "2010-12-17",
          "display": "2010-12-17"
        },
        {
          "value": "2011-04-04",
          "display": "2011-04-04"
        },
        {
          "value": "2011-05-01",
          "display": "2011-05-01"
        }
      ],
      "entity3": [
        {
          "value": "12:00",
          "display": "12:00"
        },
        {
          "value": "12:05",
          "display": "12:05"
        },
        {
          "value": "17:00",
          "display": "17:00"
        }
      ],
      "entity4": [
        {
          "value": "USD 250000",
          "display": "USD 250000"
        },
        {
          "value": "USD 787000000000",
          "display": "USD 787000000000"
        },
        {
          "value": "USD 3275",
          "display": "USD 3275"
        },
        {
          "value": "USD 3750",
          "display": "USD 3750"
        },
        {
          "value": "USD 1000000",
          "display": "USD 1000000"
        },
        {
          "value": "USD 100000000000",
          "display": "USD 100000000000"
        },
        {
          "value": "USD 116000000000",
          "display": "USD 116000000000"
        },
        {
          "value": "USD 15000000000",
          "display": "USD 15000000000"
        },
        {
          "value": "USD 18300000000",
          "display": "USD 18300000000"
        },
        {
          "value": "USD 19000000000",
          "display": "USD 19000000000"
        },
        {
          "value": "USD 4000000000",
          "display": "USD 4000000000"
        },
        {
          "value": "USD 5120000",
          "display": "USD 5120000"
        },
        {
          "value": "USD 54000000000",
          "display": "USD 54000000000"
        },
        {
          "value": "USD 800000000000",
          "display": "USD 800000000000"
        },
        {
          "value": "USD 858000000000",
          "display": "USD 858000000000"
        },
        {
          "value": "USD 9300000000",
          "display": "USD 9300000000"
        },
        {
          "value": "USD 0.188",
          "display": "USD 0.188"
        },
        {
          "value": "USD 0.478",
          "display": "USD 0.478"
        },
        {
          "value": "USD 0.488",
          "display": "USD 0.488"
        },
        {
          "value": "USD 0.560",
          "display": "USD 0.560"
        }
      ],
      "entity7": [
        {
          "value": "2.100, 12.000",
          "display": "2.100, 12.000"
        },
        {
          "value": "4.450, 9.800",
          "display": "4.450, 9.800"
        },
        {
          "value": "47.000, 97.000",
          "display": "47.000, 97.000"
        },
        {
          "value": "5.200, 8.400",
          "display": "5.200, 8.400"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "DEATH",
          "display": "Death"
        },
        {
          "value": "BATTLE",
          "display": "Battle"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        },
        {
          "value": "DIRECTOR",
          "display": "Director"
        },
        {
          "value": "INVESTOR",
          "display": "Investor"
        }
      ],
      "entity14": [
        {
          "value": "CONTRACT",
          "display": "Contract"
        },
        {
          "value": "DEBT",
          "display": "Debt"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "INVESTMENT",
          "display": "Investment"
        },
        {
          "value": "CAPITAL",
          "display": "Capital"
        },
        {
          "value": "LOSSES",
          "display": "Losses"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        },
        {
          "value": "LIQUIDITY",
          "display": "Liquidity"
        },
        {
          "value": "PENALTY",
          "display": "Penalty"
        }
      ],
      "event_date": [
        {
          "value": "(ELECTION)#(2011-04-04)",
          "display": "(Election)#(2011-04-04)"
        },
        {
          "value": "(DEATH)#(2011-05-02)",
          "display": "(Death)#(2011-05-02)"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(JOE BIDEN)",
          "display": "(Vice-President)#(Joe Biden)"
        },
        {
          "value": "(VICE-PRESIDENT)#(BIDEN)",
          "display": "(Vice-President)#(Biden)"
        },
        {
          "value": "(DIRECTOR)#(COLIN POWELL)",
          "display": "(Director)#(Colin Powell)"
        },
        {
          "value": "(DIRECTOR)#(GINA MCCARTHY)",
          "display": "(Director)#(Gina McCarthy)"
        },
        {
          "value": "(DIRECTOR)#(JOHN BRENNAN)",
          "display": "(Director)#(John Brennan)"
        },
        {
          "value": "(DIRECTOR)#(JOHN O. BRENNAN)",
          "display": "(Director)#(John O. Brennan)"
        },
        {
          "value": "(DIRECTOR)#(PETER ORSZAG)",
          "display": "(Director)#(Peter Orszag)"
        },
        {
          "value": "(VICE-PRESIDENT)#(BARACK OBAMA)",
          "display": "(Vice-President)#(Barack Obama)"
        },
        {
          "value": "(VICE-PRESIDENT)#(HILLARY CLINTON)",
          "display": "(Vice-President)#(Hillary Clinton)"
        },
        {
          "value": "(VICE-PRESIDENT)#(JOHN KERRY)",
          "display": "(Vice-President)#(John Kerry)"
        },
        {
          "value": "(DIRECTOR)#(ANITA DUNN)",
          "display": "(Director)#(Anita Dunn)"
        },
        {
          "value": "(DIRECTOR)#(ELLEN MORAN)",
          "display": "(Director)#(Ellen Moran)"
        },
        {
          "value": "(DIRECTOR)#(JOSH EARNEST)",
          "display": "(Director)#(Josh Earnest)"
        }
      ],
      "company_person": [
        {
          "value": "(CITIGROUP)#(MICHAEL FROMAN)",
          "display": "(Citigroup)#(Michael Froman)"
        }
      ],
      "rank": 1,
      "displayTitle": "Presidency of Barack <span class=\"match-highlight\">Obama</span>",
      "relevantExtracts": "<b>Obama</b>, a ... <b>Obama </b>was succeeded ... <b>Obama</b>&#39;s first-term ... <b>Obama </b>also appointed ... Following the elections, <b>Obama </b>and Congressional ... The <b>Obama </b>administration&#39;s policy ... The <b>Obama </b>administration orchestrated ... his second term, <b>Obama </b>took steps ... <b>Obama </b>also ... elections , and <b>Obama </b>continued "
    },
    {
      "id": "/Web/Wikipedia/|Michelle_Obama",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 1.008514,
      "matchingpartnames": [
        "text",
        "tables",
        "title"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "Michelle LaVaughn Robinson {b}Obama{nb} ( née Robinson",
        "2,49",
        "16941,116",
        "She is married to the 44th president of the United States , Barack {b}Obama{nb} .",
        "173,74",
        "17271,344",
        "Raised on the South Side of Chicago , Illinois, {b}Obama{nb} is a graduate of Princeton University and Harvard Law School .",
        "296,116",
        "17762,342",
        "In her early legal career, she worked at the law firm Sidley Austin where she met Barack {b}Obama{nb}.",
        "413,95",
        "18105,151",
        "{b}Obama{nb} campaigned for her husband's presidential bid throughout 2007 and 2008, delivering a keynote address at the 2008 Democratic National Convention .",
        "797,151",
        "18724,358",
        "As first lady, {b}Obama{nb} served as a role model for women and worked as an advocate for poverty awareness, education, nutrition, physical activity, and healthy eating.",
        "1043,163",
        "19481,163",
        "Some of {b}Obama{nb}'s paternal family still reside in the Georgetown area.",
        "2068,68",
        "34097,68",
        "Robinson met Barack {b}Obama{nb} when they were among the few African Americans at their law firm, Sidley Austin LLP (she has sometimes said only two, although others have noted that there were others in different departments).",
        "10098,220",
        "53280,330",
        "Before meeting {b}Obama{nb}, Michelle had told her mother she intended to focus solely on her career.",
        "10506,94",
        "54354,94",
        "Barack {b}Obama{nb} has said that the couple had an \"opposites attract\" scenario in their initial interest in each other, since Michelle had stability from her two-parent home while he was \"adventurous\".",
        "10678,196",
        "54880,196"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "29,5,240,5,344,5,502,5,797,5,1058,5,2076,5,10118,5,10521,5,10685,5,11077,5,11480,5,11685,5,12107,5,13357,5,13551,5,13639,5,13882,5,14180,5,14625,5,15451,5,15565,5,16555,5,17001,5,17083,5,17782,5,18191,5,18732,5,19336,5,19422,5,20396,5,20564,5,20737,5,21022,5,21328,5,22047,5,22146,5,22729,5,22813,5,22888,5,23164,5,23288,5,23529,5,23595,5,23860,5,24004,5,24240,5,24500,5,24845,5,24931,5,24980,5,25174,5,25277,5,25416,5,25540,5,26216,5,26400,5,26781,5,26880,5,27045,5,27225,5,27448,5,27654,5,27735,5,27872,5,28075,5,28383,5,28596,5,28792,5,28927,5,29013,5,29077,5,29228,5,29468,5,29711,5,29831,5,30091,5,30249,5,30427,5,30572,5,30973,5,31064,5,31326,5,31456,5,32064,5,32250,5,32324,5,32683,5,33016,5,33127,5,33203,5,34115,5,34239,5,34318,5,34426,5,34542,5,35313,5,35360,5,35380,5,35431,5,35695,5,35736,5,35869,5,36165,5,36309,5,36422,5,36550,5,36773,5,36945,5,37012,5,37069,5,37135,5,37258,5,37330,5,37457,5,37582,5,37728,5,37927,5,38256,5,38435,5,38650,5,38784,5,38885,5,38996,5,39648,5,39756,5,39877,5,40216,5,40390,5,40473,5,41087,5,41160,5,41293,5,41413,5,41749,5,41824,5,42077,5,42180,5,42367,5,42687,5,42759,5,42862,5,43176,5,43409,5,43573,5,44338,5,44625,5,44788,5,44931,5,45623,5,45753,5,46411,5,46635,5,47432,5,47530,5,47619,5,47935,5,48354,5,48565,5,48656,5,48725,5,49092,5,49214,5,49305,5,49426,5,49609,5,49816,5,49986,5,50304,5,50606,5,50724,5,50824,5,51082,5,51106,5,51133,5,51161,5;16968,5,17605,5,17901,5,18250,5,18724,5,19496,5,34105,5,53350,5,54369,5,54887,5,55876,5,56386,5,57645,5,58593,5,62780,5,63288,5,63435,5,63801,5,64490,5,65116,5,66934,5,67171,5,69156,5,70635,5,70793,5,72215,5,76270,5,77599,5,79192,5,79866,5,81709,5,82012,5,82862,5,83270,5,84432,5,88125,5,88338,5,91054,5,91208,5,91283,5,91919,5,92311,5,92672,5,92744,5,93224,5,93494,5,94210,5,94701,5,95207,5,95413,5,95462,5,97554,5,98614,5,98913,5,99550,5,101991,5,102195,5,103179,5,103692,5,104274,5,104712,5,105073,5,105509,5,106598,5,106945,5,107652,5,108515,5,108939,5,109342,5,110677,5,110839,5,110903,5,111174,5,111793,5,112482,5,112744,5,113299,5,113583,5,114380,5,114640,5,116554,5,116732,5,117395,5,117743,5,120010,5,120390,5,120512,5,121462,5,121968,5,123098,5,123194,5,125278,5,125522,5,125601,5,125709,5,125885,5,128388,5,128435,5,128455,5,128526,5,129020,5,129187,5,129469,5,130302,5,130706,5,131134,5,131450,5,131960,5,133500,5,133626,5,133800,5,133986,5,134355,5,134588,5,134955,5,135326,5,135679,5,136244,5,137047,5,137472,5,138058,5,138432,5,140184,5,140441,5,141953,5,142061,5,142384,5,143536,5,144279,5,144482,5,145738,5,145882,5,147000,5,147349,5,147766,5,147961,5,148647,5,148805,5,149130,5,149588,5,150038,5,150477,5,151184,5,151818,5,152298,5,155791,5,157450,5,158040,5,158429,5,160821,5,161477,5,163179,5,164120,5,166540,5,166758,5,167175,5,167690,5,168309,5,168741,5,168952,5,169280,5,170007,5,170249,5,170480,5,170922,5,171418,5,171841,5,172419,5,172949,5,773792,5,774733,5,775720,5,777630,5,777785,5,777954,5,778128,5"
          },
          {
            "partname": "tables",
            "data": "51458,5,51561,5,51770,5;993901,5,994009,5,994221,5"
          },
          {
            "partname": "title",
            "data": "51973,5;994511,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Michelle Obama",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 14:47:22",
      "indexationtime": "2020-09-02 05:43:22",
      "version": "Tjizd0GJ970VRXKf/zeT/A==",
      "size": 993783,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Michelle_Obama",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "MICHELLE OBAMA",
          "display": "Michelle Obama"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "LAURA BUSH",
          "display": "Laura Bush"
        },
        {
          "value": "JILL BIDEN",
          "display": "Jill Biden"
        },
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "MELANIA TRUMP",
          "display": "Melania Trump"
        },
        {
          "value": "OPRAH WINFREY",
          "display": "Oprah Winfrey"
        },
        {
          "value": "FRASER ROBINSON",
          "display": "Fraser Robinson"
        },
        {
          "value": "ANN ROMNEY",
          "display": "Ann Romney"
        },
        {
          "value": "CRAIG ROBINSON",
          "display": "Craig Robinson"
        },
        {
          "value": "DONALD TRUMP",
          "display": "Donald Trump"
        },
        {
          "value": "KING SALMAN",
          "display": "King Salman"
        },
        {
          "value": "MARIAN ROBINSON",
          "display": "Marian Robinson"
        },
        {
          "value": "MICHELLE COTTLE",
          "display": "Michelle Cottle"
        },
        {
          "value": "VALERIE JARRETT",
          "display": "Valerie Jarrett"
        },
        {
          "value": "ANNIE LEIBOVITZ",
          "display": "Annie Leibovitz"
        },
        {
          "value": "BARBARA BOXER",
          "display": "Barbara Boxer"
        },
        {
          "value": "BARBARA BUSH",
          "display": "Barbara Bush"
        },
        {
          "value": "BARBARA WALTERS",
          "display": "Barbara Walters"
        }
      ],
      "company": [
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "TREEHOUSE FOODS",
          "display": "Treehouse Foods"
        },
        {
          "value": "WALMART",
          "display": "Walmart"
        },
        {
          "value": "AIR FORCE",
          "display": "Air Force"
        },
        {
          "value": "ARGO",
          "display": "Argo"
        },
        {
          "value": "CAMELOT",
          "display": "Camelot"
        },
        {
          "value": "E.W.SCRIPPS",
          "display": "E.W.Scripps"
        },
        {
          "value": "FACEBOOK",
          "display": "Facebook"
        },
        {
          "value": "NETFLIX",
          "display": "Netflix"
        },
        {
          "value": "NYSE",
          "display": "NYSE"
        },
        {
          "value": "PBS",
          "display": "PBS"
        },
        {
          "value": "SHILOH INDUSTRIES",
          "display": "Shiloh Industries"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "CHICAGO",
          "display": "Chicago"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "ILLINOIS",
          "display": "Illinois"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "SOUTH CAROLINA",
          "display": "South Carolina"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "GEORGETOWN",
          "display": "Georgetown"
        },
        {
          "value": "SAUDI ARABIA",
          "display": "Saudi Arabia"
        },
        {
          "value": "JORDAN",
          "display": "Jordan"
        },
        {
          "value": "NEW YORK",
          "display": "New York"
        },
        {
          "value": "QATAR",
          "display": "Qatar"
        },
        {
          "value": "GEORGIA",
          "display": "Georgia"
        },
        {
          "value": "NEW JERSEY",
          "display": "New Jersey"
        },
        {
          "value": "PHILADELPHIA",
          "display": "Philadelphia"
        },
        {
          "value": "AFRICA",
          "display": "Africa"
        },
        {
          "value": "CHINA",
          "display": "China"
        },
        {
          "value": "FRANCE",
          "display": "France"
        },
        {
          "value": "LONDON",
          "display": "London"
        },
        {
          "value": "MEXICO",
          "display": "Mexico"
        }
      ],
      "wordcount": 5640,
      "exacthash": "GPHK48S6tuv+lqLofmesuw==",
      "nearhash": "msSWxFFDLsBqkD8Xz61g7Q==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Michelle_Obama",
      "sourcecsv1": [
        "First Lady of the United States",
        "President",
        "Preceded by",
        "Succeeded by",
        "Born",
        "Political party",
        "Spouse",
        "Children",
        "Parents",
        "Relatives",
        "Education"
      ],
      "sourcecsv2": [
        "First_Lady_Michelle_Obama_(painting)",
        "First_Lady_of_the_United_States",
        "Barack_Obama",
        "Laura_Bush",
        "Melania_Trump",
        "Chicago",
        "Illinois",
        "Democratic_Party_(United_States)",
        "Malia_Obama",
        "Sasha_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Princeton_University",
        "Bachelor_of_Arts",
        "Harvard_University",
        "Juris_Doctor",
        "Birth_name",
        "List_of_Presidents_of_the_United_States",
        "President_of_the_United_States",
        "List_of_African-American_firsts",
        "South_Side_of_Chicago",
        "Harvard_Law_School",
        "Sidley_Austin",
        "University_of_Chicago",
        "University_of_Chicago_Medical_Center",
        "Barack_Obama_2008_presidential_campaign",
        "2008_Democratic_National_Convention",
        "2012_Democratic_National_Convention",
        "2016_Democratic_National_Convention",
        "2020_Democratic_National_Convention",
        "Family_of_Barack_Obama#Michelle_Obama&#39",
        "s_extended_family",
        "Precinct_captain",
        "Spiegel_(catalog)",
        "American_Civil_War",
        "Southern_United_States",
        "Gullah",
        "Lowcountry",
        "Slavery_in_the_United_States",
        "Friendfield_Plantation",
        "Georgetown,_South_Carolina",
        "Freedman",
        "Clayton_County,_Georgia",
        "DNA",
        "Birmingham,_Alabama",
        "Cleveland,_Ohio",
        "Rabbi",
        "Capers_Funnye",
        "South_Shore,_Chicago",
        "Community_areas_of_Chicago",
        "Monopoly_(board_game)",
        "White_Cloud,_Michigan",
        "Multiple_sclerosis",
        "Whitney_M._Young_Magnet_High_School",
        "Magnet_school",
        "Jesse_Jackson",
        "Santita_Jackson",
        "Near_West_Side,_Chicago",
        "Gender_discrimination",
        "Advanced_placement",
        "National_Honor_Society",
        "Student_council",
        "Salutatorian",
        "African-American_studies",
        "Latin_honors",
        "Oregon_State_University",
        "Brown_University",
        "BMW",
        "Charles_Ogletree",
        "Harvard_Legal_Aid_Bureau",
        "Postgraduate_education",
        "Hillary_Clinton",
        "Family_of_Barack_Obama#Fraser_C._Robinson_III",
        "Summer_associate",
        "Community_organization",
        "Spike_Lee",
        "Do_the_Right_Thing",
        "In_vitro_fertilisation",
        "Pete_Souza",
        "Oval_Office",
        "Valerie_Jarrett",
        "The_Audacity_of_Hope:_Thoughts_on_Reclaiming_the_American_Dream",
        "University_of_Chicago_Laboratory_Schools",
        "Sidwell_Friends_School",
        "Georgetown_Day_School",
        "The_Ellen_DeGeneres_Show",
        "Rosalynn_Carter",
        "White_House",
        "Marian_Robinson",
        "United_Methodist",
        "Trinity_United_Church_of_Christ",
        "Reformed",
        "United_Church_of_Christ",
        "Jeremiah_Wright",
        "Shiloh_Baptist_Church_(Washington,_D.C.)",
        "St._John%27s_Episcopal_Church,_Lafayette_Square_(Washington,_D.C.)",
        "African_Methodist_Episcopal_Church",
        "Law_license",
        "Public_sector",
        "Mayor_of_Chicago",
        "Public_Allies",
        "Fundraising",
        "Tax_return_(United_States)",
        "United_States_Senate",
        "TreeHouse_Foods",
        "New_York_Stock_Exchange",
        "Wal-Mart",
        "AFL-CIO",
        "Trenton,_New_Jersey",
        "Chicago_Council_on_Global_Affairs",
        "Illinois_Senate_career_of_Barack_Obama#Campaign_for_Bobby_Rush&#39",
        "s_congressional_seat",
        "United_States_House_of_Representatives",
        "Interior_decoration",
        "Fist_bump",
        "Joe_Biden",
        "Jill_Biden",
        "Springfield,_Illinois",
        "Oprah_Winfrey",
        "Stump_speech_(politics)",
        "Cal_Thomas",
        "Fox_News",
        "Angry_Black_Woman",
        "The_View_(U.S._TV_series)",
        "Ladies%27_Home_Journal",
        "Editorial",
        "Maureen_Dowd",
        "John_F._Kennedy",
        "Gerald_Ford",
        "John_F._Kennedy#&quot",
        "Camelot_Era&quot",
        "American_Dream",
        "Rasmussen_Reports",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Larry_King",
        "Bradley_effect",
        "Jon_Stewart",
        "The_Daily_Show",
        "America%27s_Pulse",
        "E._D._Hill",
        "Barack_Obama_presidential_primary_campaign,_2008",
        "The_Daily_Beast",
        "The_Guardian",
        "Ann_Romney",
        "Mitt_Romney",
        "Newsweek",
        "Elizabeth_II",
        "Buckingham_Palace",
        "Carla_Bruni",
        "Palais_Rohan,_Strasbourg",
        "Homeless_shelter",
        "Soup_kitchen",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "Pay_equity",
        "United_States_Department_of_Housing_and_Urban_Development",
        "United_States_Department_of_Education",
        "United_States_Cabinet",
        "Jackie_Norris",
        "Corporation_for_National_and_Community_Service",
        "Spelman_College",
        "Ford_Foundation",
        "Darren_Walker",
        "Barbara_Walters",
        "Barbara_Walters%27_10_Most_Fascinating_People",
        "Memoir",
        "Becoming_(book)",
        "Let%27s_Move!",
        "National_Coalition_for_Homeless_Veterans",
        "Politico",
        "Linda_Hirshman",
        "MSNBC",
        "Melissa_Harris-Perry",
        "Obesity_in_the_United_States",
        "Chibok_schoolgirls_kidnapping",
        "Samuel_L._Jackson",
        "James_Clyburn",
        "Elizabeth_Warren",
        "Martin_O%27Malley",
        "Bernie_Sanders",
        "Austin,_Texas",
        "Organic_movement",
        "Organic_food",
        "White_House_Kitchen_Garden",
        "Eleanor_Roosevelt",
        "Ellen_DeGeneres",
        "Childhood_obesity",
        "Task_Force_on_Childhood_Obesity",
        "American_Grown:_The_Story_of_the_White_House_Kitchen_Garden_and_Gardens_Across_America",
        "United_States_Department_of_Defense",
        "Sesame_Street",
        "Big_Bird",
        "Rand_Paul",
        "Dunkin%27_Donuts",
        "Chris_Christie",
        "Governor_of_New_Jersey",
        "Iowa",
        "Ted_Cruz",
        "Employment_Non-Discrimination_Act",
        "Don%27t_Ask_Don%27t_Tell",
        "Defense_of_Marriage_Act",
        "Civil_unions",
        "Federal_Marriage_Amendment",
        "Proposition_8",
        "Florida_Amendment_2",
        "Lawrence_v._Texas",
        "Americans",
        "UC_Merced",
        "Merced_County,_California",
        "San_Francisco_Chronicle",
        "March_on_Washington",
        "Lincoln_Memorial",
        "Tracy_Reese",
        "Selma,_Alabama",
        "Selma_to_Montgomery_marches",
        "Edmund_Pettus_Bridge",
        "Coachella_Valley",
        "Prince_Harry",
        "Fort_Belvoir,_Virginia",
        "San_Bernardino,_California",
        "2015_San_Bernardino_attack",
        "Delhi",
        "Mexico",
        "Johannesburg",
        "Cape_Town",
        "Botswana",
        "Gra%C3%A7a_Machel",
        "Peng_Liyuan",
        "Xi_Jinping",
        "Ben_Rhodes_(White_House_staffer)",
        "Saudi_Arabia",
        "Abdullah_of_Saudi_Arabia",
        "Salman_of_Saudi_Arabia",
        "King_Salman",
        "David_Cameron",
        "Qatar",
        "Doha,_Qatar",
        "Amman,_Jordan",
        "Cuba",
        "Argentina",
        "Mauricio_Macri",
        "Milwaukee,_Wisconsin",
        "Barbara_Boxer",
        "Mary_Jo_Kilroy",
        "Joe_Sestak",
        "Los_Angeles_Times",
        "Hillary_Clinton_2016_presidential_campaign",
        "Southern_New_Hampshire_University",
        "Denver,_Colorado",
        "Voter_turnout",
        "Michelle_Nunn",
        "Philadelphia",
        "Donald_Trump",
        "Donald_Trump_and_Billy_Bush_recording_controversy",
        "Manchester,_New_Hampshire",
        "Essence_(magazine)",
        "Vanity_Fair_(magazine)",
        "Oprah_Winfrey%27s_Legends_Ball",
        "02138",
        "People_(magazine)",
        "Isabel_Toledo",
        "St._Gallen_Embroidery",
        "First_inauguration_of_Barack_Obama",
        "African_American",
        "Fashion_week",
        "Role_model",
        "Sarah_Jane_Brown",
        "Gordon_Brown",
        "MSN",
        "Protocol_(diplomacy)",
        "Queen_Elizabeth_II",
        "Jacqueline_Kennedy_Onassis",
        "Barbara_Bush",
        "J.Crew",
        "Target_Corporation",
        "Michael_Kors",
        "Jason_Wu",
        "Mimi_Plange",
        "Duro_Olowu",
        "Adire_(textile_art)",
        "Vogue_(magazine)",
        "Lou_Henry_Hoover",
        "Bess_Truman",
        "Annie_Leibovitz",
        "Better_Homes_and_Gardens_(magazine)",
        "85th_Academy_Awards",
        "Academy_Awards",
        "Argo_(2012_film)",
        "U.S._News_%26_World_Report",
        "PBS",
        "E._W._Scripps_Company",
        "Bonnie_Erb%C3%A9",
        "Gallup_poll",
        "Person_of_the_Year",
        "Silicon_Valley,_California",
        "Eunice_Shriver",
        "2017_ESPY_Awards",
        "Elizabeth_Alexander_(poet)",
        "Obama_Foundation",
        "Hartford,_Connecticut",
        "Nevada",
        "Instagram",
        "Netflix",
        "Becoming_(film)",
        "Associated_Press",
        "Democratic_National_Convention",
        "American_Grown",
        "ISBN_(identifier)",
        "Chicago_Tribune",
        "The_Washington_Times",
        "The_New_York_Times",
        "Chicago_Sun-Times",
        "Princeton_Alumni_Weekly",
        "The_Island_Packet",
        "The_Washington_Post",
        "The_Times",
        "NPR",
        "New_York_Times",
        "The_Jewish_Daily_Forward",
        "Time_(magazine)",
        "The_Boston_Globe",
        "ESPN",
        "Crain%27s_Chicago_Business",
        "Crain_Communications,_Inc.",
        "Wayback_Machine",
        "Seeley_G._Mudd",
        "Daily_Princetonian",
        "The_Daily_Telegraph",
        "Southland_Publishing",
        "Robin_Roberts_(newscaster)",
        "ABC_News",
        "The_Wall_Street_Journal",
        "FactCheck.org",
        "USA_Today",
        "NBC_News",
        "Sioux_City_Journal",
        "Redbook",
        "Today.com",
        "The_Huffington_Post",
        "United_Press_International",
        "Usaid.gov",
        "WhiteHouse.gov",
        "The_Independent",
        "OCLC_(identifier)",
        "Mediaite.com",
        "The_Advocate_(LGBT_magazine)",
        "Advertising_Age",
        "Biography_(TV_series)",
        "A%26E_Network",
        "Access_Hollywood",
        "Town_%26_Country_(magazine)",
        "Reuters",
        "ISSN_(identifier)",
        "Walter_Clemens",
        "IMDb",
        "Twitter",
        "Facebook",
        "Teresa_Heinz",
        "List_of_United_States_Democratic_Party_presidential_tickets",
        "2008_United_States_presidential_election",
        "2012_United_States_presidential_election",
        "Bill_Clinton",
        "List_of_first_ladies_of_the_United_States",
        "Martha_Washington",
        "Abigail_Adams",
        "Martha_Jefferson_Randolph",
        "Dolley_Madison",
        "Elizabeth_Monroe",
        "Louisa_Adams",
        "Emily_Donelson",
        "Sarah_Yorke_Jackson",
        "Angelica_Singleton_Van_Buren",
        "Anna_Harrison",
        "Jane_Irwin_Harrison",
        "Letitia_Christian_Tyler",
        "Priscilla_Cooper_Tyler",
        "Julia_Gardiner_Tyler",
        "Sarah_Childress_Polk",
        "Margaret_Taylor",
        "Abigail_Fillmore",
        "Jane_Pierce",
        "Harriet_Lane",
        "Mary_Todd_Lincoln",
        "Eliza_McCardle_Johnson",
        "Julia_Grant",
        "Lucy_Webb_Hayes",
        "Lucretia_Garfield",
        "Mary_Arthur_McElroy",
        "Rose_Cleveland",
        "Frances_Cleveland",
        "Caroline_Harrison",
        "Mary_Harrison_McKee",
        "Ida_Saxton_McKinley",
        "Edith_Roosevelt",
        "Helen_Herron_Taft",
        "Ellen_Axson_Wilson",
        "Margaret_Woodrow_Wilson",
        "Edith_Wilson",
        "Florence_Harding",
        "Grace_Coolidge",
        "Mamie_Eisenhower",
        "Lady_Bird_Johnson",
        "Pat_Nixon",
        "Betty_Ford",
        "Nancy_Reagan",
        "First_Ladies_National_Historic_Site",
        "First_Ladies:_Influence_%26_Image",
        "Family_of_Barack_Obama#Michelle_Robinson_Obama&#39",
        "s_extended_family",
        "Family_of_Barack_Obama#Fraser_Robinson_Jr.",
        "South_Carolina",
        "Alabama",
        "Circa",
        "Beth_Shalom_B%27nai_Zaken_Ethiopian_Hebrew_Congregation",
        "Family_of_Barack_Obama",
        "NBA",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "Early_life_and_career_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention",
        "United_States_Senate_career_of_Barack_Obama",
        "Political_positions_of_Barack_Obama",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "2009_Nobel_Peace_Prize",
        "West_Wing_Week",
        "Presidency_of_Barack_Obama",
        "Presidential_transition_of_Barack_Obama",
        "Second_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Obama_Doctrine",
        "Patient_Protection_and_Affordable_Care_Act",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Barack_Obama_Presidential_Center",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Electoral_history_of_Barack_Obama",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2008_Democratic_Party_presidential_primaries",
        "2012_Democratic_Party_presidential_primaries",
        "Barack_Obama_2008_presidential_primary_campaign",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Barack_Obama_2012_presidential_campaign",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Public_image_of_Barack_Obama",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "George_W._Bush",
        "Book:Barack_Obama",
        "Grammy_Award_for_Best_Spoken_Word_Album",
        "Stan_Freberg",
        "Carl_Sandburg",
        "Lincoln_Portrait",
        "Leonard_Bernstein",
        "Charles_Laughton",
        "Edward_Albee",
        "Who%27s_Afraid_of_Virginia_Woolf%3F",
        "That_Was_the_Week_That_Was",
        "Goddard_Lieberson",
        "Edward_R._Murrow",
        "Everett_Dirksen",
        "Rod_McKuen",
        "Art_Linkletter",
        "Diane_Linkletter",
        "Martin_Luther_King_Jr.",
        "Les_Crane",
        "Desiderata_(Les_Crane_album)",
        "Bruce_Botnick",
        "Richard_Harris",
        "Jonathan_Livingston_Seagull",
        "Peter_Cook",
        "Dudley_Moore",
        "James_Whitmore",
        "Give_%27em_Hell,_Harry!",
        "Henry_Fonda",
        "Helen_Hayes",
        "James_Earl_Jones",
        "Orson_Welles",
        "Julie_Harris_(actress)",
        "The_Belle_of_Amherst",
        "Citizen_Kane",
        "John_Gielgud",
        "Pat_Carroll",
        "Gertrude_Stein",
        "Donovan%27s_Brain",
        "Raiders_of_the_Lost_Ark",
        "William_Warfield",
        "Ben_Kingsley",
        "Mike_Berniker",
        "Ma_Rainey%27s_Black_Bottom",
        "Johnny_Cash",
        "Jerry_Lee_Lewis",
        "Chips_Moman",
        "Ricky_Nelson",
        "Roy_Orbison",
        "Carl_Perkins",
        "Sam_Phillips",
        "Garrison_Keillor",
        "Lake_Wobegon_Days",
        "Gilda_Radner",
        "George_Burns",
        "Gracie:_A_Love_Story",
        "Ken_Burns",
        "The_Civil_War_(miniseries)",
        "Magic_Johnson",
        "Maya_Angelou",
        "On_the_Pulse_of_Morning",
        "Henry_Rollins",
        "It_Takes_a_Village",
        "Charles_Kuralt",
        "Christopher_Reeve",
        "Still_Me",
        "LeVar_Burton",
        "Sidney_Poitier",
        "The_Measure_of_a_Man:_A_Spiritual_Autobiography",
        "Quincy_Jones",
        "A_Song_Flung_Up_to_Heaven",
        "Al_Franken",
        "Lies_and_the_Lying_Liars_Who_Tell_Them",
        "My_Life_(Clinton_autobiography)",
        "Jimmy_Carter",
        "Our_Endangered_Values",
        "Ossie_Davis",
        "Ruby_Dee",
        "Beau_Bridges",
        "Cynthia_Nixon",
        "Blair_Underwood",
        "An_Inconvenient_Truth_(book)",
        "Al_Gore",
        "Michael_J._Fox",
        "Earth_(The_Book)",
        "Betty_White",
        "Janis_Ian",
        "Stephen_Colbert",
        "America_Again",
        "Joan_Rivers",
        "A_Full_Life:_Reflections_at_90",
        "Carol_Burnett",
        "Carrie_Fisher",
        "The_Princess_Diarist",
        "Biblioteca_Nacional_de_Espa%C3%B1a",
        "BNF_(identifier)",
        "CiNii_(identifier)",
        "GND_(identifier)",
        "ICCU_(identifier)",
        "ISNI_(identifier)",
        "LCCN_(identifier)",
        "MusicBrainz",
        "National_Library_of_the_Czech_Republic",
        "National_Library_of_Korea",
        "Royal_Library_of_the_Netherlands",
        "SNAC",
        "SUDOC_(identifier)",
        "VIAF_(identifier)",
        "WorldCat_Identities"
      ],
      "sourcestr1": "Michelle_Obama",
      "sourcestr2": "Q13133",
      "sourcestr3": "Q5",
      "sourcestr4": "human",
      "sourcevarchar3": "[{\"Michelle Obama\":\"\",\"First Lady of the United States\":[\"In role\",\"January 20, 2009\\u2013January 20, 2017\"],\"President\":\"Barack Obama\",\"Preceded by\":\"Laura Bush\",\"Succeeded by\":\"Melania Trump\",\"Personal details\":\"\",\"Born\":[\"Michelle LaVaughn Robinson\",\"January 17, 1964\",\"(age56)\",\"Chicago\",\",\",\"Illinois\",\", U.S.\"],\"Political party\":\"Democratic\",\"Spouse\":\"Barack Obama\",\"Children\":[\"Malia\",\"Sasha\"],\"Parents\":[\"Fraser Robinson III (father)\",\"Marian Shields\",\"(mother)\"],\"Relatives\":[\"Craig Robinson\",\"(brother)\"],\"Education\":[\"Princeton University\",\"Harvard University\"],\"Signature\":\"\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelle_Obama_2013_official_portrait.jpg/1200px-Michelle_Obama_2013_official_portrait.jpg",
      "sourcedouble1": 0.030474,
      "entity1": [
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "2015",
          "display": "2015"
        },
        {
          "value": "2016",
          "display": "2016"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "2020",
          "display": "2020"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "2007",
          "display": "2007"
        },
        {
          "value": "2017",
          "display": "2017"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "6",
          "display": "6"
        },
        {
          "value": "13",
          "display": "13"
        },
        {
          "value": "14",
          "display": "14"
        }
      ],
      "date": [
        {
          "value": "1964-01-17",
          "display": "1964-01-17"
        },
        {
          "value": "2009-04-01",
          "display": "2009-04-01"
        },
        {
          "value": "2016-10-13",
          "display": "2016-10-13"
        },
        {
          "value": "1992-10-03",
          "display": "1992-10-03"
        },
        {
          "value": "2007-05-14",
          "display": "2007-05-14"
        },
        {
          "value": "2007-12-10",
          "display": "2007-12-10"
        },
        {
          "value": "2008-05-31",
          "display": "2008-05-31"
        },
        {
          "value": "2008-08-23",
          "display": "2008-08-23"
        },
        {
          "value": "2008-10-06",
          "display": "2008-10-06"
        },
        {
          "value": "2009-01-20",
          "display": "2009-01-20"
        },
        {
          "value": "2009-04-03",
          "display": "2009-04-03"
        },
        {
          "value": "2009-04-06",
          "display": "2009-04-06"
        },
        {
          "value": "2009-06-05",
          "display": "2009-06-05"
        },
        {
          "value": "2010-02-09",
          "display": "2010-02-09"
        },
        {
          "value": "2010-11-08",
          "display": "2010-11-08"
        },
        {
          "value": "2011-09-20",
          "display": "2011-09-20"
        },
        {
          "value": "2011-12-11",
          "display": "2011-12-11"
        },
        {
          "value": "2012-05-09",
          "display": "2012-05-09"
        },
        {
          "value": "2015-01-27",
          "display": "2015-01-27"
        },
        {
          "value": "2015-03-07",
          "display": "2015-03-07"
        }
      ],
      "entity4": [
        {
          "value": "USD 14000000",
          "display": "USD 14000000"
        },
        {
          "value": "USD 157082",
          "display": "USD 157082"
        },
        {
          "value": "USD 273618",
          "display": "USD 273618"
        },
        {
          "value": "USD 51200",
          "display": "USD 51200"
        },
        {
          "value": "USD 991296",
          "display": "USD 991296"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "DEATH",
          "display": "Death"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        }
      ],
      "entity13": [
        {
          "value": "DIRECTOR",
          "display": "Director"
        },
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        },
        {
          "value": "CHIEF INFORMATION OFFICER",
          "display": "Chief Information Officer"
        },
        {
          "value": "FOUNDER",
          "display": "Founder"
        }
      ],
      "entity14": [
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "BONDS",
          "display": "Bonds"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "LOSSES",
          "display": "Losses"
        },
        {
          "value": "INVESTMENT",
          "display": "Investment"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        }
      ],
      "event_date": [
        {
          "value": "(BIRTH)#(1964-01-17)",
          "display": "(Birth)#(1964-01-17)"
        }
      ],
      "entity18": [
        {
          "value": "(REVENUE)#(USD 51200)",
          "display": "(Revenue)#(USD 51200)"
        },
        {
          "value": "(REVENUE)#(USD 991296)",
          "display": "(Revenue)#(USD 991296)"
        }
      ],
      "company_person": [
        {
          "value": "(AIR FORCE)#(MICHELLE OBAMA)",
          "display": "(Air Force)#(Michelle Obama)"
        },
        {
          "value": "(AIR FORCE)#(OBAMA)",
          "display": "(Air Force)#(Obama)"
        },
        {
          "value": "(AIR FORCE)#(SASHA OBAMA)",
          "display": "(Air Force)#(Sasha Obama)"
        },
        {
          "value": "(E.W.SCRIPPS)#(BONNIE ERBE)",
          "display": "(E.W.Scripps)#(Bonnie Erbé)"
        },
        {
          "value": "(FACEBOOK)#(MICHELLE OBAMA)",
          "display": "(Facebook)#(Michelle Obama)"
        },
        {
          "value": "(NEW YORK TIMES)#(MAUREEN DOWD)",
          "display": "(New York Times)#(Maureen Dowd)"
        },
        {
          "value": "(PBS)#(BONNIE ERBE)",
          "display": "(PBS)#(Bonnie Erbé)"
        }
      ],
      "rank": 2,
      "displayTitle": "Michelle <span class=\"match-highlight\">Obama</span>",
      "relevantExtracts": "Michelle LaVaughn Robinson <b>Obama </b>( ... States , Barack <b>Obama </b>... Chicago , Illinois, <b>Obama </b>is a ... she met Barack <b>Obama</b>... <b>Obama </b>campaigned for ... As first lady, <b>Obama </b>served as ... Some of <b>Obama</b>&#39;s paternal ... Robinson met Barack <b>Obama </b>when they ... Before meeting <b>Obama</b>, Michelle ... Barack <b>Obama </b>has "
    },
    {
      "id": "/Web/Wikipedia/|Barack_Obama_2008_presidential_campaign",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.99334,
      "matchingpartnames": [
        "text",
        "tables",
        "title"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "The 2008 presidential campaign of Barack {b}Obama{nb} , then junior United States Senator from Illinois , was announced on February 10, 2007, in Springfield, Illinois .",
        "2,161",
        "63615,389",
        "At the 2008 Democratic National Convention on August 27, Barack {b}Obama{nb} was formally selected as the Democratic Party nominee for President of the United States in 2008 .",
        "382,168",
        "64682,631",
        "On November 4, 2008, {b}Obama{nb} defeated the Republican nominee, Senator John McCain of Arizona , making him the President-elect and the first African American elected President .",
        "638,174",
        "65733,636",
        "Upon the vote of the Electoral College on December 15, 2008, and the subsequent certification thereof by a Joint Session of the United States Congress on January 8, 2009, Barack {b}Obama{nb} was elected President of the United States and Joe Biden Vice President of the United States , with 365 of 538 electors.",
        "923,304",
        "66831,799",
        "{b}Obama{nb} strategically had pictures made with financial experts Warren Buffett and Paul Volcker so the public would perceive him as having inside knowledge of Wall Street.",
        "2087,168",
        "86272,168",
        "{b}Obama{nb}'s vice presidential running mate had been a subject of speculation since the end of the primaries.",
        "2271,104",
        "89165,104",
        "On August 21, 2008, {b}Obama{nb} announced that he had made a selection for his running mate, but would not reveal until August 23 who it was.",
        "2775,135",
        "90103,135",
        "{b}Obama{nb}'s campaign encouraged supporters to sign up for a text messaging system that would alert them the moment he announced his choice.",
        "2911,135",
        "90356,193",
        "Joe Biden and Barack {b}Obama{nb} after the presentation of Biden as the vice presidential running mate in Springfield, Illinois",
        "3048,121",
        "91223,121",
        "On August 22, KMBC News of Kansas City spotted bumper stickers of an \"{b}Obama{nb}/Bayh '08\" ticket that were being printed in Lenexa, Kansas .",
        "3311,136",
        "92625,309"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "43,5,446,5,659,5,1101,5,1606,5,1726,5,1765,5,1844,5,2087,5,2271,5,2795,5,2911,5,3069,5,3178,5,3195,5,3381,5,3680,5,3808,5,3979,5,4264,5,4333,5,5139,5,5270,5,6227,5,6276,5,6540,5,6680,5,7008,5,7470,5,8099,5,8379,5,8749,5,8798,5,9007,5,9222,5,9399,5,10062,5,10245,5,10489,5,10536,5,10714,5,11113,5,11522,5,11637,5,11863,5,12406,5,12535,5,12647,5,12744,5,13219,5,13607,5,14123,5,14212,5,14360,5,14616,5,14694,5,14836,5,15500,5,15727,5,15752,5,16017,5,16301,5,16404,5,16485,5,16895,5,17134,5,17279,5,17435,5,17591,5,17713,5,17984,5,18318,5,18860,5,19053,5,19152,5,19263,5,19726,5,20338,5,20586,5,20937,5,21094,5,21543,5,22723,5,22926,5,23128,5,23448,5,23700,5,24003,5,24048,5,24311,5,24374,5,24533,5,24655,5,24704,5,25065,5,25141,5,25202,5,25426,5,25879,5,25926,5,26138,5,26279,5,26347,5,26555,5,26924,5,26990,5,27149,5,27304,5,27437,5,27635,5,27654,5,27778,5,28155,5,28199,5,28471,5,28718,5,28836,5,28918,5,29713,5,29927,5,30823,5,31103,5,31418,5,31512,5,31555,5,31591,5,31656,5,31707,5,31804,5,31860,5,32042,5;63659,5,64896,5,65754,5,67315,5,85254,5,85374,5,85530,5,85726,5,86272,5,89165,5,90123,5,90356,5,91244,5,92136,5,92210,5,92811,5,93330,5,93685,5,94165,5,94452,5,95631,5,99736,5,99984,5,101714,5,101881,5,102683,5,102823,5,103151,5,104743,5,105489,5,106732,5,108541,5,110105,5,110984,5,113142,5,113749,5,115137,5,116037,5,116398,5,116568,5,117057,5,117712,5,118496,5,118802,5,119202,5,120122,5,120423,5,122696,5,123662,5,124930,5,125536,5,127669,5,127996,5,128519,5,128888,5,128966,5,129108,5,131705,5,132486,5,132628,5,133274,5,134066,5,135916,5,136017,5,136533,5,136920,5,137210,5,137417,5,137573,5,138402,5,138673,5,139553,5,140646,5,141000,5,141099,5,141210,5,142425,5,143895,5,145018,5,145673,5,146448,5,147908,5,150486,5,150980,5,151461,5,152355,5,153035,5,153724,5,153769,5,154401,5,154518,5,154863,5,156940,5,157009,5,158610,5,159097,5,159158,5,159502,5,161066,5,161113,5,161565,5,161706,5,163177,5,163385,5,169899,5,170054,5,170634,5,171005,5,171258,5,171686,5,171705,5,171829,5,172595,5,172639,5,173103,5,173476,5,173714,5,174375,5,175446,5,175666,5,178083,5,178692,5,180166,5,180418,5,180565,5,180707,5,180990,5,181269,5,181744,5,181916,5,441588,5"
          },
          {
            "partname": "tables",
            "data": "32091,5,32116,5,32230,5;636205,5,636230,5,636348,5"
          },
          {
            "partname": "title",
            "data": "32960,5;637172,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Barack Obama 2008 presidential campaign",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 05:42:40",
      "indexationtime": "2020-09-01 20:16:44",
      "version": "p/VgeZocMWvzgpGHTQQeOQ==",
      "size": 636096,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Barack_Obama_2008_presidential_campaign",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "JOHN MCCAIN",
          "display": "John McCain"
        },
        {
          "value": "JOE BIDEN",
          "display": "Joe Biden"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "SARAH PALIN",
          "display": "Sarah Palin"
        },
        {
          "value": "DAVID CAMERON",
          "display": "David Cameron"
        },
        {
          "value": "TIM KAINE",
          "display": "Tim Kaine"
        },
        {
          "value": "BUSH",
          "display": "Bush"
        },
        {
          "value": "BEN HARPER",
          "display": "Ben Harper"
        },
        {
          "value": "BILL AYERS",
          "display": "Bill Ayers"
        },
        {
          "value": "BILL BURTON",
          "display": "Bill Burton"
        },
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "BRUCE SPRINGSTEEN",
          "display": "Bruce Springsteen"
        },
        {
          "value": "CHRIS HUGHES",
          "display": "Chris Hughes"
        },
        {
          "value": "CLAIRE MCCASKILL",
          "display": "Claire McCaskill"
        },
        {
          "value": "DAN SIROKER",
          "display": "Dan Siroker"
        },
        {
          "value": "DAVID AXELROD",
          "display": "David Axelrod"
        },
        {
          "value": "DAVID PLOUFFE",
          "display": "David Plouffe"
        },
        {
          "value": "DOLORES HUERTA",
          "display": "Dolores Huerta"
        },
        {
          "value": "GEORGE W. BUSH",
          "display": "George W. Bush"
        }
      ],
      "company": [
        {
          "value": "FACEBOOK",
          "display": "Facebook"
        },
        {
          "value": "APPLE",
          "display": "Apple"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "ISRAEL",
          "display": "Israel"
        },
        {
          "value": "ILLINOIS",
          "display": "Illinois"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "DELAWARE",
          "display": "Delaware"
        },
        {
          "value": "AFGHANISTAN",
          "display": "Afghanistan"
        },
        {
          "value": "ALASKA",
          "display": "Alaska"
        },
        {
          "value": "VIRGINIA",
          "display": "Virginia"
        },
        {
          "value": "CHICAGO",
          "display": "Chicago"
        },
        {
          "value": "SPRINGFIELD",
          "display": "Springfield"
        },
        {
          "value": "ARIZONA",
          "display": "Arizona"
        },
        {
          "value": "KANSAS",
          "display": "Kansas"
        },
        {
          "value": "NORTH CAROLINA",
          "display": "North Carolina"
        },
        {
          "value": "DISTRICT OF COLUMBIA",
          "display": "District of Columbia"
        },
        {
          "value": "ARLINGTON",
          "display": "Arlington"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        },
        {
          "value": "INDIANA",
          "display": "Indiana"
        },
        {
          "value": "JORDAN",
          "display": "Jordan"
        },
        {
          "value": "TENNESSEE",
          "display": "Tennessee"
        }
      ],
      "wordcount": 3653,
      "exacthash": "gg+ywNJuxyI0me+K8S1hQQ==",
      "nearhash": "17dxmiEDEkM3eTPNxuGN4Q==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Barack_Obama_2008_presidential_campaign",
      "sourcecsv1": [
        "Obama for America",
        "Campaign",
        "Candidate",
        "Affiliation",
        "Status",
        "Headquarters",
        "Key people",
        "Receipts",
        "Chant",
        "Website"
      ],
      "sourcecsv2": [
        "Obama_logo",
        "2008_Democratic_Party_presidential_primaries",
        "2008_United_States_presidential_election",
        "Barack_Obama",
        "United_States_Senate",
        "Illinois",
        "Joe_Biden",
        "Delaware",
        "Democratic_Party_(United_States)",
        "Michigan_Avenue_(Chicago)",
        "Chicago,_Illinois",
        "David_Plouffe",
        "Penny_Pritzker",
        "David_Axelrod_(political_consultant)",
        "Michael_Slaby",
        "Robert_Gibbs",
        "Bill_Burton_(political_consultant)",
        "Claire_McCaskill",
        "Tim_Kaine",
        "Paul_Hodes",
        "Campaign_finance_in_the_United_States",
        "Timeline_of_the_2008_United_States_presidential_election",
        "2008_United_States_presidential_debates",
        "Nationwide_opinion_polling_for_the_2008_United_States_presidential_election",
        "Statewide_opinion_polling_for_the_2008_United_States_presidential_election",
        "Political_parties_in_the_United_States",
        "2008_Democratic_Party_presidential_candidates",
        "2008_Democratic_Party_presidential_debates_and_forums",
        "Nationwide_opinion_polling_for_the_2008_Democratic_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2008_Democratic_Party_presidential_primaries",
        "Results_of_the_2008_Democratic_Party_presidential_primaries",
        "2008_Democratic_National_Convention",
        "List_of_Democratic_Party_superdelegates,_2008",
        "Republican_Party_(United_States)",
        "2008_Republican_Party_presidential_candidates",
        "2008_Republican_Party_presidential_debates_and_forums",
        "2008_Republican_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2008_Republican_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2008_Republican_Party_presidential_primaries",
        "Results_of_the_2008_Republican_Party_presidential_primaries",
        "John_McCain_2008_presidential_campaign",
        "2008_Republican_National_Convention",
        "Third_party_(United_States)",
        "Libertarian_Party_(United_States)",
        "2008_Libertarian_National_Convention",
        "Green_Party_of_the_United_States",
        "Green_Party_presidential_primaries,_2008",
        "2008_Green_National_Convention",
        "Constitution_Party_(United_States)",
        "United_States_third_party_and_independent_presidential_candidates,_2008",
        "2008_United_States_elections",
        "2008_United_States_House_of_Representatives_elections",
        "2008_United_States_Senate_elections",
        "2008_United_States_gubernatorial_elections",
        "Vice_President_of_the_United_States",
        "2008_Democratic_Party_vice_presidential_candidate_selection",
        "2008_Republican_Party_vice_presidential_candidate_selection",
        "2004_United_States_presidential_election",
        "2012_United_States_presidential_election",
        "Political_positions_of_Barack_Obama",
        "Electoral_history_of_Barack_Obama",
        "Early_life_and_career_of_Barack_Obama",
        "Family_of_Barack_Obama",
        "Public_image_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "United_States_Senate_career_of_Barack_Obama",
        "Presidency_of_Barack_Obama",
        "Timeline_of_the_Barack_Obama_presidency",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Obama_Doctrine",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Patient_Protection_and_Affordable_Care_Act",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Barack_Obama_2012_presidential_campaign",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Second_inauguration_of_Barack_Obama",
        "Immigration_reform_in_the_United_States#Obama&#39",
        "s_executive_actions_of_November_2014",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "Barack_Obama_Presidential_Center",
        "Obama_Foundation",
        "One_America_Appeal",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "2009_Nobel_Peace_Prize",
        "Political_positions_of_Joe_Biden",
        "Electoral_history_of_Joe_Biden",
        "Joe_Biden#Early_life_and_education_(1942–1965)",
        "Joe_Biden#Early_political_career_and_family_life_(1966–1972)",
        "Family_of_Joe_Biden",
        "List_of_United_States_senators_from_Delaware",
        "United_States_Senate_career_of_Joe_Biden",
        "Vice_presidency_of_Joe_Biden",
        "Joe_Biden_1988_presidential_campaign",
        "1988_Democratic_Party_presidential_primaries",
        "Joe_Biden_2008_presidential_campaign",
        "Joe_Biden_2020_presidential_campaign",
        "2020_Democratic_Party_presidential_primaries",
        "2020_Democratic_National_Convention",
        "2020_United_States_presidential_debates",
        "2020_United_States_presidential_election",
        "List_of_Joe_Biden_2020_presidential_campaign_endorsements",
        "List_of_Joe_Biden_2020_presidential_campaign_primary_endorsements",
        "2020_Democratic_Party_vice_presidential_candidate_selection",
        "2012_Democratic_National_Convention",
        "Promises_to_Keep_(Biden_book)",
        "Promise_Me,_Dad",
        "Junior_United_States_Senator",
        "Springfield,_Illinois",
        "United_States_Democratic_Party",
        "President_of_the_United_States",
        "African_American",
        "John_McCain",
        "Arizona",
        "President-elect_of_the_United_States",
        "Warren_G._Harding",
        "John_F._Kennedy",
        "Electoral_College_(United_States)",
        "Joint_session_of_the_United_States_Congress",
        "United_States_Congress",
        "2008_Montana_Democratic_primary",
        "2008_South_Dakota_Democratic_primary",
        "United_States_Republican_Party",
        "Hillary_Clinton",
        "Unity,_New_Hampshire",
        "Evan_Bayh",
        "Kathleen_Sebelius",
        "Colin_Powell",
        "Bill_Richardson",
        "Wesley_Clark",
        "Text_messaging",
        "Michelle_Obama",
        "Jill_Biden",
        "United_States_Vice_President",
        "KMBC-TV",
        "Kansas_City,_Missouri",
        "Lenexa,_Kansas",
        "NBC_News",
        "Associated_Press",
        "Kuwait",
        "Afghanistan",
        "Iraq",
        "Jordan",
        "Israel",
        "Hamid_Karzai",
        "Nouri_al-Maliki",
        "Abdullah_II_of_Jordan",
        "State_of_Palestine",
        "Mahmoud_Abbas",
        "Prime_Minister_of_Israel",
        "Ehud_Olmert",
        "Angela_Merkel",
        "Nicolas_Sarkozy",
        "Gordon_Brown",
        "Tony_Blair",
        "Conservative_Party_(UK)",
        "David_Cameron",
        "Berlin_Victory_Column",
        "Berlin",
        "United_States_presidential_election_debates",
        "Commission_on_Presidential_Debates",
        "University_of_Mississippi",
        "Oxford,_Mississippi",
        "Belmont_University",
        "Nashville,_Tennessee",
        "Hofstra_University",
        "Hempstead_(village),_New_York",
        "Town_hall_meetings",
        "Independence_Day_(United_States)",
        "Hank_Paulson",
        "Financial_crisis_of_2007%E2%80%932008",
        "Civil_Forum_on_the_Presidency",
        "Rick_Warren",
        "Lake_Forest,_California",
        "Democracy",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "Grant_Park_(Chicago)",
        "Chicago",
        "United_States",
        "Campaign_slogan",
        "Fundraising_for_the_2008_United_States_presidential_election",
        "Democratic_National_Committee",
        "Obama-Biden_Transition_Project",
        "Federal_Election_Commission",
        "Watergate_scandal",
        "527_group",
        "Sarah_Palin",
        "Republican_National_Committee",
        "Mercury_Sable",
        "Logo",
        "Flag_of_the_United_States",
        "Sunrise",
        "Sol_Sender",
        "Chant",
        "United_Farm_Workers",
        "S%C3%AD_se_puede",
        "The_Economist",
        "People%27s_Democratic_Party_of_Tajikistan",
        "Barack_Obama_%22Hope%22_poster",
        "Shepard_Fairey",
        "Stencil",
        "Beige",
        "Mixed-media",
        "Smithsonian_Institution",
        "National_Portrait_Gallery_(United_States)",
        "Gotham_(typeface)",
        "Capital_letter",
        "Jonathan_Hoefler",
        "Tobias_Frere-Jones",
        "GQ_(magazine)",
        "Requiem_(typeface)",
        "U2",
        "City_of_Blinding_Lights",
        "Bruce_Springsteen",
        "The_Rising_(Bruce_Springsteen_song)",
        "Stevie_Wonder",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "Joss_Stone",
        "Ben_Harper",
        "Better_Way",
        "Yes_We_Can_(will.i.am_song)",
        "Will.i.am",
        "The_Black_Eyed_Peas",
        "Ruwanga_Samath",
        "JFC_Reggae_Band",
        "Barack_Obama_on_social_media",
        "Internet",
        "Social_media",
        "John_Kerry",
        "United_States_presidential_election",
        "MySpace",
        "Facebook",
        "Email",
        "Chris_Hughes",
        "Steve_Spinner",
        "Harvard",
        "Marshall_Ganz",
        "Howard_Dean",
        "NGP_VAN",
        "Advertising_Age",
        "Association_of_National_Advertisers",
        "Apple_Inc.",
        "Zappos.com",
        "Dan_Siroker",
        "North_Carolina",
        "Good_Morning_America",
        "NBC",
        "CBS",
        "Fox_Broadcasting_Company",
        "Univision",
        "MSNBC",
        "Black_Entertainment_Television",
        "TV_One_(Radio_One)",
        "2008_World_Series",
        "American_Broadcasting_Company",
        "Pushing_Daisies",
        "H._Ross_Perot",
        "Dish_Network",
        "CBS_Evening_News",
        "Smear_campaign",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Obama-Ayers_controversy",
        "Bill_Ayers",
        "Barack_Obama_religion_conspiracy_theories",
        "Ira_Forman",
        "National_Jewish_Democratic_Council",
        "Jewish_Council_for_Education_%26_Research",
        "Comparison_of_United_States_presidential_candidates,_2008",
        "Energy_policy_of_the_United_States",
        "New_Energy_For_America",
        "Lobbying_in_the_United_States",
        "Universal_health_care",
        "Nationwide_opinion_polling_for_the_United_States_presidential_election,_2008",
        "Statewide_opinion_polling_for_the_United_States_presidential_election,_2008",
        "Democratic_National_Convention",
        "U.S._Republican_Party",
        "Alaska",
        "The_Gallup_Organization",
        "RealClearPolitics",
        "Newsweek",
        "Pew_Research",
        "George_H.W._Bush",
        "Bill_Clinton",
        "George_W._Bush",
        "Dick_Cheney",
        "President_of_the_United_States_Senate",
        "Speaker_of_the_United_States_House_of_Representatives",
        "List_of_U.S._states_by_alphabet",
        "District_of_Columbia",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Campaign_rhetoric_of_Barack_Obama",
        "Iowa_Electronic_Market",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "List_of_African-American_United_States_presidential_and_vice_presidential_candidates",
        "BBC_News",
        "Wayback_Machine",
        "The_New_York_Times",
        "CNN",
        "CNN_News",
        "The_Boston_Globe",
        "The_Washington_Post",
        "ISBN_(identifier)",
        "Daily_Press_(California)",
        "Liz_Sly",
        "Chicago_Tribune",
        "The_Guardian",
        "The_Hartford_Courant",
        "ABC_News",
        "Bloomberg_L.P.",
        "USA_Today",
        "Kenneth_P._Vogel",
        "The_Politico",
        "Slate_(magazine)",
        "Nico_Pitney",
        "Crain%27s_Chicago_Business",
        "National_Post",
        "W._Lance_Bennett",
        "Reuters",
        "University_of_Wisconsin%E2%80%93Madison",
        "Karen_Tumulty",
        "Time_(magazine)",
        "WebCite",
        "Curlie",
        "List_of_Presidents_of_the_United_States",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "2004_Democratic_National_Convention",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "West_Wing_Week",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "A_More_Perfect_Union_(speech)",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2012_Democratic_Party_presidential_primaries",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_presidential_eligibility_litigation",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Artists_for_Obama",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "Donald_Trump",
        "Book:Barack_Obama",
        "List_of_vice_presidents_of_the_United_States",
        "Classified_Information_Procedures_Act",
        "Omnibus_Counterterrorism_Act_of_1995",
        "Violence_Against_Women_Act",
        "Violent_Crime_Control_and_Law_Enforcement_Act",
        "Biden-Sanders_Unity_Task_Forces",
        "1972_United_States_Senate_election_in_Delaware",
        "1978_United_States_Senate_election_in_Delaware",
        "1984_United_States_Senate_election_in_Delaware",
        "1990_United_States_Senate_election_in_Delaware",
        "1996_United_States_Senate_election_in_Delaware",
        "2002_United_States_Senate_election_in_Delaware",
        "2008_United_States_Senate_election_in_Delaware",
        "2008_United_States_presidential_debates#October_2:_Vice_presidential_debate_(Washington_University_in_St._Louis)",
        "2012_United_States_presidential_debates#October_11:_Vice_presidential_debate_(Centre_College)",
        "2020_Democratic_Party_presidential_debates",
        "Biden_family",
        "Neilia_Hunter",
        "Beau_Biden",
        "Hunter_Biden",
        "Edward_Francis_Blewitt",
        "Tomorrow_Will_Be_Different",
        "List_of_honors_received_by_Joe_Biden",
        "List_of_things_named_after_Joe_Biden",
        "Joe_Biden_(The_Onion)",
        "Cancer_Breakthroughs_2020",
        "Crumb_and_Get_It_bakery_incident",
        "Joe_Biden_sexual_assault_allegation",
        "Book:Joe_Biden",
        "List_of_candidates_in_the_2008_United_States_presidential_election",
        "Comparison_of_the_2008_United_States_presidential_candidates",
        "Congressional_endorsements_for_the_2008_United_States_presidential_election",
        "Ballot_access_for_the_2008_United_States_presidential_election",
        "2008_United_States_presidential_election_timeline",
        "2008_Super_Tuesday",
        "Potomac_primary",
        "2008_Super_Tuesday_II",
        "International_opinion_polling_for_the_2008_United_States_presidential_election",
        "International_reactions_to_the_2008_United_States_presidential_election",
        "Evan_Bayh_2008_presidential_campaign",
        "Hillary_Clinton_2008_presidential_campaign",
        "Political_positions_of_Hillary_Clinton",
        "List_of_Hillary_Clinton_2008_presidential_campaign_endorsements",
        "Chris_Dodd",
        "Chris_Dodd_2008_presidential_campaign",
        "John_Edwards",
        "John_Edwards_2008_presidential_campaign",
        "Political_positions_of_John_Edwards",
        "Mike_Gravel",
        "Mike_Gravel_2008_presidential_campaign",
        "Dennis_Kucinich",
        "Dennis_Kucinich_2008_presidential_campaign",
        "Bill_Richardson_2008_presidential_campaign",
        "Tom_Vilsack",
        "Tom_Vilsack_2008_presidential_campaign",
        "Political_positions_of_the_2008_Republican_Party_presidential_primary_candidates",
        "Political_positions_of_John_McCain",
        "List_of_John_McCain_2008_presidential_campaign_endorsements",
        "Democratic_and_liberal_support_for_John_McCain_in_2008",
        "Vice_presidential_candidacy_of_Sarah_Palin",
        "Political_positions_of_Sarah_Palin",
        "Sam_Brownback",
        "John_H._Cox",
        "Jim_Gilmore",
        "Jim_Gilmore_2008_presidential_campaign",
        "Rudy_Giuliani",
        "Rudy_Giuliani_2008_presidential_campaign",
        "Political_positions_of_Rudy_Giuliani",
        "Mike_Huckabee",
        "Mike_Huckabee_2008_presidential_campaign",
        "Political_positions_of_Mike_Huckabee",
        "Duncan_L._Hunter",
        "Duncan_L._Hunter_2008_presidential_campaign",
        "Alan_Keyes",
        "Alan_Keyes_2008_presidential_campaign",
        "Ray_McKinney",
        "Ron_Paul",
        "Ron_Paul_2008_presidential_campaign",
        "Political_positions_of_Ron_Paul",
        "Mitt_Romney",
        "Mitt_Romney_2008_presidential_campaign",
        "Political_positions_of_Mitt_Romney",
        "Tom_Tancredo",
        "Tom_Tancredo_2008_presidential_campaign",
        "Fred_Thompson",
        "Fred_Thompson_2008_presidential_campaign",
        "Tommy_Thompson",
        "Tommy_Thompson_2008_presidential_campaign",
        "Draft_(politics)",
        "Al_Gore",
        "Mark_Warner",
        "Draft_Mark_Warner_movement",
        "Newt_Gingrich",
        "Condoleezza_Rice",
        "Draft_Condi_movement",
        "Independent_politician",
        "Michael_Bloomberg",
        "Draft_Bloomberg_movement",
        "Third-party_and_independent_candidates_for_the_2008_United_States_presidential_election",
        "Constitution_Party_National_Convention",
        "Chuck_Baldwin",
        "Chuck_Baldwin_2008_presidential_campaign",
        "Darrell_Castle",
        "Daniel_Imperato",
        "Cynthia_McKinney",
        "Cynthia_McKinney_2008_presidential_campaign",
        "Political_positions_of_Cynthia_McKinney",
        "Rosa_Clemente",
        "Elaine_Brown",
        "Jesse_Johnson_(West_Virginia_politician)",
        "Kent_Mesplay",
        "Kat_Swift",
        "Bob_Barr",
        "Bob_Barr_2008_presidential_campaign",
        "Political_positions_of_Bob_Barr",
        "Wayne_Allyn_Root",
        "Michael_Jingozian",
        "Steve_Kubby",
        "Mary_Ruwart",
        "Doug_Stanhope",
        "Brian_Rohrbough",
        "Boston_Tea_Party_(political_party)",
        "Charles_Jay",
        "Objectivist_Party",
        "Tom_Stevens_(politician)",
        "Peace_and_Freedom_Party",
        "Ralph_Nader",
        "Ralph_Nader_2008_presidential_campaign",
        "Matt_Gonzalez",
        "Gloria_La_Riva",
        "Brian_Moore_(political_activist)",
        "Brian_Moore_2008_presidential_campaign",
        "Prohibition_Party",
        "Gene_Amondson",
        "Reform_Party_of_the_United_States_of_America",
        "Ted_Weill",
        "Party_for_Socialism_and_Liberation",
        "Eugene_Puryear",
        "Socialist_Party_USA",
        "Stewart_Alexander",
        "Eric_Chester",
        "Socialist_Workers_Party_(United_States)",
        "R%C3%B3ger_Calero",
        "James_Harris_(Socialist_Workers_Party_politician)",
        "Alyson_Kennedy",
        "Jeff_Boss",
        "Stephen_Colbert_(character)",
        "Stephen_Colbert_2008_presidential_campaign",
        "Earl_Dodge",
        "Bradford_Lyttle",
        "Frank_Moore_(performance_artist)",
        "Joe_Schriner",
        "Jonathon_Sharkey",
        "Andrew_Jackson_1828_presidential_campaign",
        "James_Polk_1844_presidential_campaign",
        "George_McClellan_1864_presidential_campaign",
        "Horatio_Seymour_1868_presidential_campaign",
        "Horace_Greeley_1872_presidential_campaign",
        "Samuel_Tilden_1876_presidential_campaign",
        "Winfield_Scott_Hancock_1880_presidential_campaign",
        "Grover_Cleveland_1884_presidential_campaign",
        "Grover_Cleveland_1888_presidential_campaign",
        "Grover_Cleveland_1892_presidential_campaign",
        "William_Jennings_Bryan_1896_presidential_campaign",
        "William_Jennings_Bryan_1900_presidential_campaign",
        "Alton_B._Parker_1904_presidential_campaign",
        "William_Jennings_Bryan_1908_presidential_campaign",
        "Al_Smith_1928_presidential_campaign",
        "John_F._Kennedy_1960_presidential_campaign",
        "Hubert_Humphrey_1968_presidential_campaign",
        "George_McGovern_1972_presidential_campaign",
        "Walter_Mondale_1984_presidential_campaign",
        "Michael_Dukakis_1988_presidential_campaign",
        "Bill_Clinton_1992_presidential_campaign",
        "Bill_Clinton_1996_presidential_campaign",
        "Al_Gore_2000_presidential_campaign",
        "John_Kerry_2004_presidential_campaign",
        "Hillary_Clinton_2016_presidential_campaign",
        "List_of_United_States_Democratic_Party_presidential_tickets",
        "Democratic-Republican_Party",
        "List_of_Democratic_National_Conventions",
        "History_of_the_United_States_Democratic_Party"
      ],
      "sourcestr1": "Barack_Obama_2008_presidential_campaign",
      "sourcestr2": "Q2935433",
      "sourcestr3": "Q60589804",
      "sourcestr4": "presidential campaign",
      "sourcevarchar3": "[{\"Obama for America\":\"2008 Obama\\u2013Biden campaign logo\",\"Campaign\":[\"2008 Democratic primaries\",\"2008 U.S. presidential election\"],\"Candidate\":[\"Barack Obama\",\"U.S. Senator\",\"from\",\"Illinois\",\"(2005\\u20132008)\",\"Joe Biden\",\"U.S. Senator\",\"from\",\"Delaware\",\"(1973\\u20132009)\"],\"Affiliation\":\"Democratic Party\",\"Status\":[\"Announced: February 10, 2007\",\"Presumptive nominee: June 3, 2008\",\"Official nominee: August 27, 2008\",\"Won election: November 4, 2008\"],\"Headquarters\":[\"233 North\",\"Michigan Avenue\",\"Chicago, Illinois\",\"60601\"],\"Key people\":[\"David Plouffe\",\"(Manager)\",\"Penny Pritzker\",\"(Finance)\",\"David Axelrod\",\"(Media)\",\"Michael Slaby\",\"(Chief Technology Officer)\",\"Robert Gibbs\",\"(Communications)\",\"Bill Burton\",\"(Spokesman)\",\"Henry De Sio  (Chief Operating Officer)\",\"Claire McCaskill\",\"(Co-Chair)\",\"Tim Kaine\",\"(Co-Chair)\",\"Paul Hodes\",\"(Co-Chair)\"],\"Receipts\":[\"US$670.7 million\",\"(November 24, 2008)\"],\"Slogan\":\"\",\"Chant\":\"Yes We Can\",\"Website\":\"www.barackobama.com\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Obama_Biden_logo.svg/1200px-Obama_Biden_logo.svg.png",
      "sourcedouble1": 0.016767,
      "entity1": [
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2007",
          "display": "2007"
        },
        {
          "value": "24",
          "display": "24"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "23",
          "display": "23"
        },
        {
          "value": "15",
          "display": "15"
        },
        {
          "value": "26",
          "display": "26"
        },
        {
          "value": "19",
          "display": "19"
        },
        {
          "value": "365",
          "display": "365"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "27",
          "display": "27"
        },
        {
          "value": "18",
          "display": "18"
        },
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "29",
          "display": "29"
        },
        {
          "value": "50",
          "display": "50"
        },
        {
          "value": "8",
          "display": "8"
        },
        {
          "value": "25",
          "display": "25"
        }
      ],
      "date": [
        {
          "value": "2008-11-04",
          "display": "2008-11-04"
        },
        {
          "value": "2008-11-03",
          "display": "2008-11-03"
        },
        {
          "value": "2008-06-03",
          "display": "2008-06-03"
        },
        {
          "value": "2009-01-08",
          "display": "2009-01-08"
        },
        {
          "value": "2007-02-10",
          "display": "2007-02-10"
        },
        {
          "value": "2008-06-12",
          "display": "2008-06-12"
        },
        {
          "value": "2008-08-27",
          "display": "2008-08-27"
        },
        {
          "value": "2008-09-04",
          "display": "2008-09-04"
        },
        {
          "value": "2008-09-15",
          "display": "2008-09-15"
        },
        {
          "value": "2008-10-19",
          "display": "2008-10-19"
        },
        {
          "value": "2008-11-01",
          "display": "2008-11-01"
        },
        {
          "value": "2008-11-24",
          "display": "2008-11-24"
        },
        {
          "value": "2008-07-24",
          "display": "2008-07-24"
        },
        {
          "value": "2008-08-16",
          "display": "2008-08-16"
        },
        {
          "value": "2008-08-21",
          "display": "2008-08-21"
        },
        {
          "value": "2008-08-23",
          "display": "2008-08-23"
        },
        {
          "value": "2008-09-24",
          "display": "2008-09-24"
        },
        {
          "value": "2008-09-25",
          "display": "2008-09-25"
        },
        {
          "value": "2008-09-26",
          "display": "2008-09-26"
        },
        {
          "value": "2008-09-29",
          "display": "2008-09-29"
        }
      ],
      "entity3": [
        {
          "value": "20:00",
          "display": "20:00"
        }
      ],
      "entity4": [
        {
          "value": "USD 1000000",
          "display": "USD 1000000"
        },
        {
          "value": "USD 10000000",
          "display": "USD 10000000"
        },
        {
          "value": "USD 103802537",
          "display": "USD 103802537"
        },
        {
          "value": "USD 133549000",
          "display": "USD 133549000"
        },
        {
          "value": "USD 150000000",
          "display": "USD 150000000"
        },
        {
          "value": "USD 200000000",
          "display": "USD 200000000"
        },
        {
          "value": "USD 21900000",
          "display": "USD 21900000"
        },
        {
          "value": "USD 24600000",
          "display": "USD 24600000"
        },
        {
          "value": "USD 265000000",
          "display": "USD 265000000"
        },
        {
          "value": "USD 27000000",
          "display": "USD 27000000"
        },
        {
          "value": "USD 52000000",
          "display": "USD 52000000"
        },
        {
          "value": "USD 66000000",
          "display": "USD 66000000"
        },
        {
          "value": "USD 670700000",
          "display": "USD 670700000"
        },
        {
          "value": "USD 84100000",
          "display": "USD 84100000"
        },
        {
          "value": "KPW 2008",
          "display": "KPW 2008"
        },
        {
          "value": "USD 200",
          "display": "USD 200"
        },
        {
          "value": "USD 650000000",
          "display": "USD 650000000"
        },
        {
          "value": "USD 700000000000",
          "display": "USD 700000000000"
        },
        {
          "value": "USD 700000000003",
          "display": "USD 700000000003"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "BATTLE",
          "display": "Battle"
        },
        {
          "value": "DEATH",
          "display": "Death"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        },
        {
          "value": "CHIEF TECHNOLOGY OFFICER",
          "display": "Chief Technology Officer"
        },
        {
          "value": "DIRECTOR",
          "display": "Director"
        },
        {
          "value": "FOUNDER",
          "display": "Founder"
        },
        {
          "value": "CHIEF OPERATING OFFICER",
          "display": "Chief Operating Officer"
        },
        {
          "value": "CO-FOUNDER",
          "display": "Co-founder"
        }
      ],
      "entity14": [
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        },
        {
          "value": "CAPITAL",
          "display": "Capital"
        },
        {
          "value": "LIQUIDITY",
          "display": "Liquidity"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "DEBT",
          "display": "Debt"
        },
        {
          "value": "LOSSES",
          "display": "Losses"
        }
      ],
      "event_date": [
        {
          "value": "(ELECTION)#(2008-11-04)",
          "display": "(Election)#(2008-11-04)"
        },
        {
          "value": "(VICTORY)#(2008-11-04)",
          "display": "(Victory)#(2008-11-04)"
        },
        {
          "value": "(BIRTH)#(2008-06-12)",
          "display": "(Birth)#(2008-06-12)"
        },
        {
          "value": "(ELECTION)#(2008-08-27)",
          "display": "(Election)#(2008-08-27)"
        },
        {
          "value": "(ELECTION)#(2008-11-03)",
          "display": "(Election)#(2008-11-03)"
        },
        {
          "value": "(VICTORY)#(2008-08-27)",
          "display": "(Victory)#(2008-08-27)"
        },
        {
          "value": "(DEFEAT)#(2008-11-04)",
          "display": "(Defeat)#(2008-11-04)"
        }
      ],
      "person_cooc": [
        {
          "value": "(CHIEF OPERATING OFFICER)#(CLAIRE MCCASKILL)",
          "display": "(Chief Operating Officer)#(Claire McCaskill)"
        },
        {
          "value": "(CHIEF OPERATING OFFICER)#(HENRY DE SIO)",
          "display": "(Chief Operating Officer)#(Henry De Sio)"
        },
        {
          "value": "(CHIEF TECHNOLOGY OFFICER)#(JOHN KERRY)",
          "display": "(Chief Technology Officer)#(John Kerry)"
        },
        {
          "value": "(CHIEF TECHNOLOGY OFFICER)#(MICHAEL SLABY)",
          "display": "(Chief Technology Officer)#(Michael Slaby)"
        },
        {
          "value": "(CHIEF TECHNOLOGY OFFICER)#(ROBERT GIBBS)",
          "display": "(Chief Technology Officer)#(Robert Gibbs)"
        },
        {
          "value": "(CO-FOUNDER)#(CHRIS HUGHES)",
          "display": "(Co-founder)#(Chris Hughes)"
        },
        {
          "value": "(DIRECTOR)#(DAN SIROKER)",
          "display": "(Director)#(Dan Siroker)"
        },
        {
          "value": "(DIRECTOR)#(IRA FORMAN)",
          "display": "(Director)#(Ira Forman)"
        },
        {
          "value": "(FOUNDER)#(DOLORES HUERTA)",
          "display": "(Founder)#(Dolores Huerta)"
        }
      ],
      "company_person": [
        {
          "value": "(FACEBOOK)#(CHRIS HUGHES)",
          "display": "(Facebook)#(Chris Hughes)"
        }
      ],
      "person_job_company": [
        {
          "value": "(CHRIS HUGHES)#(CO-FOUNDER)#(FACEBOOK)",
          "display": "(Chris Hughes)#(Co-founder)#(Facebook)"
        }
      ],
      "enginecsv2": [
        "3"
      ],
      "engineusercsv2": [],
      "rank": 3,
      "displayTitle": "Barack <span class=\"match-highlight\">Obama</span> 2008 presidential campaign",
      "relevantExtracts": "campaign of Barack <b>Obama </b>, then ... August 27, Barack <b>Obama </b>was formally ... November 4, 2008, <b>Obama </b>defeated the ... 8, 2009, Barack <b>Obama </b>was elected ... <b>Obama </b>strategically had ... <b>Obama</b>&#39;s vice ... August 21, 2008, <b>Obama </b>announced that ... <b>Obama</b>&#39;s ... Biden and Barack <b>Obama </b>after ... of an &quot;<b>Obama</b>/Bayh "
    },
    {
      "id": "/Web/Wikipedia/|Barack_Obama_citizenship_conspiracy_theories",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.991956,
      "matchingpartnames": [
        "text",
        "title"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "A 2010 billboard displayed in South Gate, California , questioning the validity of Barack {b}Obama{nb}'s birth certificate and by extension his eligibility to serve as President of the U.S. The billboard was part of an advertising campaign by WorldNetDaily , whose URL appears on the billboard's bottom right corner.",
        "2,309",
        "11717,599",
        "The movement falsely asserted {b}Obama{nb} was ineligible to be President of the United States because he was not a natural-born citizen of the U.S. as required by Article Two of the Constitution .",
        "924,190",
        "15734,589",
        "Theories alleged that {b}Obama{nb}'s published birth certificate was a forgery—that his actual birthplace was not Hawaii but Kenya .",
        "1252,125",
        "16717,286",
        "Other theories alleged that {b}Obama{nb} became a citizen of Indonesia in childhood, thereby losing his U.S. citizenship .",
        "1378,115",
        "17004,244",
        "Still others claimed that {b}Obama{nb} was not a natural-born U.S. citizen because he was born a dual citizen (British and American).",
        "1494,126",
        "17249,196",
        "A number of political commentators have characterized these various claims as a racist reaction to {b}Obama{nb}'s status as the first African-American president of the United States.",
        "1621,175",
        "17446,341",
        "These claims were promoted by fringe theorists (pejoratively referred to as \"birthers\"), the most prominent among whom was Donald Trump , who would later succeed {b}Obama{nb} as president.",
        "1798,181",
        "17928,290",
        "Some theorists sought court rulings to declare {b}Obama{nb} ineligible to take office, or to grant access to various documents which they claimed would support such ineligibility",
        "1980,172",
        "18219,172",
        "Some political opponents, especially in the Republican Party , have expressed skepticism about {b}Obama{nb}'s citizenship or been unwilling to acknowledge it",
        "2186,151",
        "18425,244",
        "Polls conducted in 2010 (before the April 2011 release) suggested that at least 25% of adult Americans said that they doubted {b}Obama{nb}'s U.S. birth, and a May 2011 Gallup poll found that the percentage had fallen to 13% of American adults (23% of Republicans).",
        "2837,257",
        "19972,623"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "92,5,590,5,714,5,954,5,1274,5,1406,5,1520,5,1720,5,1960,5,2027,5,2281,5,2479,5,2687,5,2963,5,3127,5,3209,5,3248,5,3540,5,3767,5,3952,5,4064,5,4125,5,4280,5,4561,5,4750,5,4858,5,4920,5,5128,5,5382,5,5520,5,5859,5,6005,5,6318,5,6392,5,6571,5,6599,5,6704,5,6811,5,7044,5,7344,5,7499,5,7534,5,7759,5,7844,5,7941,5,8005,5,8811,5,9118,5,9761,5,10401,5,10546,5,10999,5,11090,5,11481,5,11963,5,12054,5,12569,5,12732,5,13752,5,14283,5,14400,5,14635,5,15151,5,15483,5,15893,5,16741,5,16981,5,17154,5,17279,5,17460,5,17599,5,17809,5,17932,5,18077,5,18094,5,18230,5,18348,5,18442,5,18586,5,18725,5,18791,5,18897,5,18967,5,19080,5,19171,5,19358,5,19757,5,20152,5,20621,5,20823,5,20963,5,21498,5,21520,5,22005,5,22205,5,22310,5,22509,5,22656,5,22774,5,22927,5,23452,5,23610,5,23751,5,24329,5,24625,5,25205,5,25626,5,25665,5,26104,5,26463,5,26539,5,26555,5,26709,5,26829,5,27189,5,27512,5,27830,5,27892,5,28179,5,28783,5,28950,5,29116,5,29240,5,29411,5,29677,5,29825,5,29915,5,30325,5,31192,5,31515,5,32311,5,32389,5,32430,5,32644,5,33182,5,33433,5,33637,5,33970,5,34083,5,34422,5,34570,5,34845,5,35111,5,35330,5,35555,5,35659,5,35791,5,35944,5,36103,5,36449,5,36796,5,37188,5,38036,5,38105,5,38355,5,38799,5,39333,5,39566,5,39699,5,39841,5,40614,5,40980,5,41475,5,41556,5,41800,5,42239,5,42742,5,43486,5,43906,5,45036,5,45078,5,45727,5,46083,5,46125,5,46307,5,46607,5,47360,5,47639,5,48841,5,51468,5,51951,5,52147,5,52422,5,52562,5,52744,5,52821,5,53047,5,53858,5,54080,5,54157,5,54390,5,54927,5,55083,5,55222,5,55382,5,55712,5,55889,5,56346,5,56639,5,57080,5,57489,5,58081,5,58878,5,59486,5,59548,5,59696,5,60055,5,60421,5,60440,5,61151,5,61644,5,61873,5,62267,5,62686,5,62805,5,63179,5,63755,5,64026,5,64337,5,64482,5,64635,5,64770,5,65096,5,65139,5,65373,5,65597,5,66035,5,66228,5,66741,5,67589,5,67725,5,67907,5,67974,5,68094,5,68427,5,68644,5,69617,5,70216,5,70281,5,70348,5,70569,5,70689,5,70940,5,71086,5,71263,5,71425,5,71910,5,72180,5,72928,5,73330,5,73399,5,73558,5,73743,5,73757,5,73966,5,74090,5,74207,5,74340,5,74429,5,74491,5,74556,5,74689,5,74803,5,74873,5,75000,5;11880,5,14024,5,14449,5,15764,5,16739,5,17032,5,17275,5,17629,5,18199,5,18266,5,18613,5,19119,5,19699,5,20098,5,20785,5,44629,5,45217,5,46165,5,47559,5,48047,5,48611,5,48672,5,49107,5,50132,5,50535,5,50643,5,51056,5,51594,5,52188,5,52326,5,53161,5,53744,5,54325,5,54399,5,55118,5,55149,5,55530,5,55858,5,56658,5,57332,5,57491,5,57526,5,57751,5,59144,5,59400,5,59464,5,61115,5,61553,5,63230,5,64013,5,64287,5,65340,5,65692,5,66330,5,66935,5,67184,5,68082,5,68501,5,70440,5,71269,5,71616,5,72023,5,72662,5,72994,5,73878,5,75929,5,76429,5,76951,5,77076,5,77419,5,77558,5,78062,5,78194,5,78339,5,78658,5,78872,5,79063,5,79372,5,79516,5,79698,5,79887,5,80059,5,80129,5,80242,5,80456,5,80643,5,81456,5,82129,5,83534,5,83877,5,84150,5,84868,5,84890,5,85671,5,86175,5,86280,5,86651,5,87428,5,87649,5,87978,5,88960,5,89313,5,89681,5,90849,5,91542,5,92660,5,93433,5,93472,5,94228,5,94881,5,95091,5,95107,5,95490,5,95730,5,96090,5,96653,5,97885,5,97967,5,98671,5,100076,5,100599,5,100999,5,101508,5,101806,5,102327,5,102707,5,102797,5,103850,5,106404,5,107025,5,108768,5,109128,5,109217,5,109434,5,111184,5,111873,5,112279,5,113307,5,113420,5,114061,5,114515,5,115064,5,115484,5,115829,5,116054,5,116158,5,116290,5,116754,5,116913,5,117480,5,118253,5,119884,5,121312,5,121381,5,122003,5,122861,5,123889,5,124242,5,124501,5,124880,5,126523,5,126889,5,127639,5,127720,5,128292,5,129095,5,129737,5,131157,5,132076,5,134191,5,134373,5,135570,5,136285,5,136327,5,136509,5,137293,5,140938,5,141522,5,144037,5,149097,5,149755,5,150222,5,150689,5,151083,5,151265,5,151342,5,151568,5,153030,5,153518,5,153595,5,154022,5,154757,5,155066,5,155352,5,156136,5,156623,5,156963,5,157939,5,158605,5,159582,5,161910,5,163287,5,164751,5,165704,5,165766,5,165999,5,166698,5,167261,5,167280,5,168612,5,169363,5,169727,5,170331,5,171210,5,171518,5,172365,5,173718,5,174665,5,175317,5,175720,5,175880,5,176921,5,177247,5,177416,5,177958,5,178344,5,180200,5,180689,5,181720,5,183111,5,183367,5,183793,5,183860,5,183980,5,184433,5,184927,5,186377,5,187364,5,187668,5,197986,5,198384,5,198504,5,198881,5,199140,5,199516,5,200011,5,200715,5,201189,5,202215,5,203049,5,203122,5,203281,5,206163,5,206297,5,206803,5,207047,5,207268,5,933599,5,933873,5,934108,5,934406,5,934833,5,935357,5,935653,5,936021,5"
          },
          {
            "partname": "title",
            "data": "75509,5;1105697,5"
          }
        ]
      },
      "groupcount": 2,
      "title": "Barack Obama citizenship conspiracy theories",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-31 04:51:13",
      "indexationtime": "2020-09-02 05:56:45",
      "version": "h6k9hIlJ9wC4js6vhnA49g==",
      "size": 1105503,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Barack_Obama_citizenship_conspiracy_theories",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "DONALD TRUMP",
          "display": "Donald Trump"
        },
        {
          "value": "ORLY TAITZ",
          "display": "Orly Taitz"
        },
        {
          "value": "ANDY MARTIN",
          "display": "Andy Martin"
        },
        {
          "value": "BARACK HUSSEIN OBAMA",
          "display": "Barack Hussein Obama"
        },
        {
          "value": "ANN DUNHAM",
          "display": "Ann Dunham"
        },
        {
          "value": "JANICE OKUBO",
          "display": "Janice Okubo"
        },
        {
          "value": "NEWT GINGRICH",
          "display": "Newt Gingrich"
        },
        {
          "value": "SARAH OBAMA",
          "display": "Sarah Obama"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "ALAN KEYES",
          "display": "Alan Keyes"
        },
        {
          "value": "ALEX KOPPELMAN",
          "display": "Alex Koppelman"
        },
        {
          "value": "ANDREW SULLIVAN",
          "display": "Andrew Sullivan"
        },
        {
          "value": "DAVID VITTER",
          "display": "David Vitter"
        },
        {
          "value": "GORDON LIDDY",
          "display": "Gordon Liddy"
        },
        {
          "value": "JAN BREWER",
          "display": "Jan Brewer"
        },
        {
          "value": "JEAN SCHMIDT",
          "display": "Jean Schmidt"
        },
        {
          "value": "JEROME CORSI",
          "display": "Jerome Corsi"
        },
        {
          "value": "JOE ARPAIO",
          "display": "Joe Arpaio"
        }
      ],
      "company": [
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        },
        {
          "value": "ADOBE",
          "display": "Adobe"
        },
        {
          "value": "FACEBOOK",
          "display": "Facebook"
        },
        {
          "value": "MCCLATCHY",
          "display": "McClatchy"
        },
        {
          "value": "YAHOO!",
          "display": "Yahoo!"
        }
      ],
      "geo": [
        {
          "value": "HAWAII",
          "display": "Hawaii"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "KENYA",
          "display": "Kenya"
        },
        {
          "value": "HONOLULU",
          "display": "Honolulu"
        },
        {
          "value": "ARIZONA",
          "display": "Arizona"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "INDONESIA",
          "display": "Indonesia"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "PENNSYLVANIA",
          "display": "Pennsylvania"
        },
        {
          "value": "TENNESSEE",
          "display": "Tennessee"
        },
        {
          "value": "KANSAS",
          "display": "Kansas"
        },
        {
          "value": "HUTCHINSON",
          "display": "Hutchinson"
        },
        {
          "value": "CHESTER",
          "display": "Chester"
        },
        {
          "value": "NEW JERSEY",
          "display": "New Jersey"
        },
        {
          "value": "UNITED KINGDOM",
          "display": "United Kingdom"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "ALABAMA",
          "display": "Alabama"
        },
        {
          "value": "CAIRO",
          "display": "Cairo"
        },
        {
          "value": "COLORADO",
          "display": "Colorado"
        },
        {
          "value": "DELAWARE",
          "display": "Delaware"
        }
      ],
      "wordcount": 7864,
      "exacthash": "QGQUrMjTBCdnHwtEsxq3pw==",
      "nearhash": "aQplZh1EjuNMLGnTsFaV0w==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Barack_Obama_citizenship_conspiracy_theories",
      "sourcecsv2": [
        "Birtherism_(disambiguation)",
        "South_Gate,_California",
        "Advertising_campaign",
        "WorldNetDaily",
        "URL",
        "White_House",
        "Honolulu",
        "Barack_Obama",
        "Barack_Obama_2008_presidential_campaign",
        "2008_United_States_presidential_election",
        "Presidency_of_Barack_Obama",
        "Christianity",
        "President_of_the_United_States",
        "Natural-born-citizen_clause_of_the_U.S._Constitution",
        "Article_Two_of_the_United_States_Constitution#Clause_5:_Qualifications_for_office",
        "Birth_certificate",
        "Hawaii",
        "Kenya_Colony",
        "Indonesia",
        "U.S._citizenship",
        "Multiple_citizenship",
        "Racism_in_the_United_States",
        "African-American",
        "Fringe_theory",
        "Donald_Trump",
        "Republican_Party_(United_States)",
        "Hawaii_Department_of_Health",
        "Gallup_poll",
        "Early_life_and_career_of_Barack_Obama",
        "Ann_Dunham",
        "Conspiracy_theorist",
        "Kapi%27olani_Medical_Center_for_Women_%26_Children",
        "Wichita,_Kansas",
        "Barack_Obama_Sr.",
        "Luo_(Kenya_and_Tanzania)",
        "Nyang%27oma_Kogelo",
        "Nyanza_Province",
        "British_Kenya",
        "The_Honolulu_Advertiser",
        "Honolulu_Star-Bulletin",
        "Lolo_Soetoro",
        "Jakarta",
        "State_Elementary_School_Menteng_01",
        "Education_in_Indonesia",
        "Menteng",
        "Madelyn_and_Stanley_Dunham",
        "Barack_Obama_religion_conspiracy_theories",
        "Andy_Martin",
        "Jim_Geraghty",
        "National_Review_Online",
        "Philip_J._Berg",
        "NPR",
        "Associated_Press",
        "The_Standard_(Kenya)",
        "Snopes.com",
        "Breitbart_(website)",
        "Scanned_image",
        "Barack_Obama_presidential_campaign,_2008#&quot",
        "Fight_the_Smears&quot",
        "_website",
        "Daily_Kos",
        "National_Review",
        "Prima_facie",
        "Adobe_Photoshop",
        "Jerome_Corsi",
        "The_Obama_Nation",
        "Fox_News",
        "FactCheck.org",
        "Larry_Klayman",
        "Linda_Lingle",
        "TVNewser",
        "CNN",
        "Loretta_Fuddy",
        "Drudge_Report",
        "Image_editing_software",
        "Optical_character_recognition",
        "The_Grio",
        "Jim_Crow_laws",
        "White_Anglo-Saxon_Protestant",
        "Political_commentator",
        "Los_Angeles_Times",
        "University_of_California,_Los_Angeles",
        "Eugene_Volokh",
        "Sarah_Onyango_Obama",
        "Anabaptist",
        "The_McClatchy_Company",
        "Mombasa",
        "Chicago_Tribune",
        "Orly_Taitz",
        "Barack_Obama_presidential_eligibility_litigation#Keyes_v._Bowen",
        "Center_for_Independent_Media",
        "Anonymous_blogger",
        "Barack_Obama_presidential_eligibility_litigation",
        "Bali",
        "Honolulu_Advertiser",
        "United_States_nationality_law",
        "U.S._State_Department",
        "April_Fools%27_Day",
        "Fulbright_scholarship",
        "Natural-born_citizen",
        "Fourteenth_Amendment_to_the_United_States_Constitution",
        "Gabriel_J._Chin",
        "Minor_v._Happersett",
        "Ankeny_v._Governor_of_the_State_of_Indiana",
        "Donofrio_v._Wells",
        "Citizen_of_the_United_Kingdom_and_Colonies",
        "Rocky_Mountain_News",
        "Constitution_of_Kenya",
        "Pennsylvania",
        "Hillary_Clinton",
        "Alan_Keyes",
        "Illinois_United_States_Senate_election,_2004",
        "Reagan_administration",
        "Soviet_Union",
        "Israel",
        "Andy_Martin_(American_politician)",
        "Perennial_candidate",
        "Robert_L._Schulz",
        "Tax_protester_(United_States)",
        "Judicial_Watch",
        "Constitution_Party_(United_States)",
        "Paleoconservative",
        "Third_party_(United_States)",
        "Electoral_College_(United_States)",
        "Faithless_electors",
        "Joseph_Farah",
        "Michael_Savage_(commentator)",
        "G._Gordon_Liddy",
        "Brian_Sussman",
        "Lars_Larson",
        "Bob_Grant_(radio_host)",
        "Jim_Quinn",
        "The_War_Room_with_Quinn_and_Rose",
        "Barbara_Simpson",
        "Mark_Davis_(talk_show_host)",
        "Fred_Grandy",
        "Rush_Limbaugh",
        "Sean_Hannity",
        "Lou_Dobbs",
        "The_Savage_Nation",
        "Chuck_Norris",
        "Open_letter",
        "Baltimore_Orioles",
        "Luke_Scott_(baseball)",
        "Yahoo!",
        "The_Huffington_Post",
        "Charlie_Sheen",
        "Southern_Poverty_Law_Center",
        "James_Wenneker_von_Brunn",
        "United_States_Holocaust_Memorial_Museum_shooting",
        "Malik_Obama",
        "Lynn_Vavreck",
        "Michael_Cohen_(lawyer)",
        "National_Enquirer",
        "Donald_Trump_2016_presidential_campaign",
        "Good_Morning_America",
        "Politifact",
        "The_View_(U.S._TV_series)",
        "Whoopi_Goldberg",
        "CNN_Newsroom",
        "Suzanne_Malveaux",
        "Maricopa_County,_Arizona",
        "Joe_Arpaio",
        "Jan_Brewer",
        "Ken_Bennett",
        "Salon_(website)",
        "Tennessee_General_Assembly",
        "Matthew_Hill",
        "Podcast",
        "Roy_Moore",
        "Cullman_Times",
        "Alabama",
        "Richard_Shelby",
        "Mike_Stark",
        "Roy_Blunt",
        "West_Chester_Township,_Butler_County,_Ohio",
        "Jean_Schmidt",
        "Nathan_Deal",
        "Georgia_gubernatorial_election,_2010",
        "Georgia_(U.S._state)",
        "Cynthia_McKinney",
        "David_Weigel",
        "Slate_(magazine)",
        "Rusty_Humphries",
        "Radio_talk_show",
        "Sarah_Palin",
        "United_States_presidential_elections,_2008",
        "Maternity",
        "Andrew_Sullivan",
        "The_Hutchinson_News",
        "Hutchinson,_Kansas",
        "Tim_Huelskamp",
        "Metairie,_Louisiana",
        "David_Vitter",
        "Speaker_of_the_United_States_House_of_Representatives",
        "Newt_Gingrich",
        "White_House_Press_Secretary",
        "Robert_Gibbs",
        "Steve_Malzberg",
        "Mike_Huckabee",
        "The_O%27Reilly_Factor",
        "Michele_Bachmann",
        "Mike_Coffman",
        "Colorado",
        "Elbert_County,_Colorado",
        "Mitt_Romney",
        "Republican_Party_of_Arizona",
        "Lindsey_Graham",
        "Bumper_sticker",
        "John_McCain_2008_presidential_campaign",
        "Political_right",
        "Tea_Party_protests",
        "Michael_Castle",
        "Georgetown,_Delaware",
        "NBC_Nightly_News",
        "United_States_presidential_eligibility_legislation",
        "Democratic_Party_(United_States)",
        "NBC_News",
        "Republican_National_Committee",
        "Michael_Steele",
        "Joel_Pollak",
        "The_American_Thinker",
        "Marc_Ambinder",
        "The_Atlantic",
        "CBS_News",
        "Sic",
        "The_Sunday_Times",
        "Orange_County_Register",
        "Ohio_State_University",
        "Research_2000",
        "Politico",
        "Brendan_Nyhan",
        "Public_Policy_Polling",
        "Virginia",
        "Utah",
        "Deseret_News",
        "KSL-TV",
        "Pew_Research_Center",
        "Harris_Poll",
        "The_Gallup_Organization",
        "Tea_Party_movement",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Tim_Pawlenty",
        "Rick_Santorum",
        "Delaware",
        "Joe_Biden",
        "Christine_O%27Donnell",
        "United_States_Senate_special_election_in_Delaware,_2010",
        "Chris_Coons",
        "Tea_Party_protest",
        "Austin,_Texas",
        "The_Nation",
        "Moon_landing_conspiracy_theories",
        "Holocaust_denial",
        "Climate_change_denial",
        "Young_Earth_creationism",
        "MSNBC",
        "Rachel_Maddow",
        "Michael_Medved",
        "Ann_Coulter",
        "Conservatism_in_the_United_States",
        "Steve_Sailer",
        "United_States_Secret_Service",
        "St._Petersburg_Times",
        "Camille_Paglia",
        "Factcheck.org",
        "Tinfoil_hat",
        "Chip_Berlet",
        "Dana_Milbank",
        "The_Washington_Post",
        "We_the_People_Foundation",
        "We_the_People_Foundation#Disputing_Obama&#39",
        "s_citizenship",
        "Anti-Semite",
        "Journal_of_Experimental_Social_Psychology",
        "David_Remnick",
        "David_Letterman",
        "Bill_Maher",
        "Orange_County,_California",
        "Supreme_Court_of_the_United_States",
        "Andrew_Jackson",
        "Chester_A._Arthur",
        "Alvin_T._Onaka",
        "News_conference",
        "Lester_Kinsolving",
        "White_House_press_secretary",
        "Bill_Press",
        "National_Prayer_Breakfast",
        "Brian_Williams",
        "White_House_Correspondents%27_Association",
        "Gridiron_Dinner",
        "Bruce_Springsteen",
        "Born_in_the_U.S.A._(song)",
        "Saint_Patrick%27s_Day",
        "Moneygall",
        "Betty_White",
        "George_Stephanopoulos",
        "Barack_Obama_presidential_campaign,_2012",
        "Birthright_citizenship_in_the_United_States",
        "Security_paper",
        "Where%27s_the_Birth_Certificate%3F",
        "Dreams_from_My_Real_Father",
        "Frank_Marshall_Davis",
        "Kamala_Harris_citizenship_conspiracy_theories",
        "Doi_(identifier)",
        "The_Guardian",
        "The_New_York_Times",
        "PBS",
        "ISSN_(identifier)",
        "Wayback_Machine",
        "Cengage_Learning",
        "The_New_York_Times_Magazine",
        "HighBeam_Research",
        "The_Daily_Telegraph",
        "ISBN_(identifier)",
        "Nedra_Pickler",
        "Michael_Dobbs_(American_author)",
        "The_Jakarta_Post",
        "PR_Newswire",
        "Tampa_Bay_Times",
        "U-T_San_Diego",
        "ABC_News",
        "The_Seattle_Times",
        "Talking_Points_Memo",
        "The_Rachel_Maddow_Show_(TV_series)",
        "Qualitative_Sociology",
        "S2CID_(identifier)",
        "PM_(ABC_Radio)",
        "Washington_Independent",
        "Barbara_Crossette",
        "Snopes",
        "Courthouse_News_Service",
        "U.S._News_%26_World_Report",
        "Daily_News_(New_York)",
        "Ben_Smith_(journalist)",
        "Politico_(newspaper)",
        "CNBC",
        "East_Valley_Tribune",
        "The_Cullman_Times",
        "WKRC-TV",
        "New_York_(magazine)",
        "Flickr",
        "Ron_Reagan",
        "Wilmington_Star-News",
        "WPTV",
        "Hartford_Courant",
        "Orlando_Sentinel",
        "The_Christian_Science_Monitor",
        "The_Arizona_Republic",
        "The_Daily_Beast",
        "Jake_Tapper",
        "National_Journal",
        "PolitiFact",
        "The_Politico",
        "The_Daily_Nation",
        "GQ",
        "Salon.com",
        "Current_TV",
        "SuperNews!",
        "Life_(magazine)",
        "List_of_Presidents_of_the_United_States",
        "United_States_Senate",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention",
        "United_States_Senate_career_of_Barack_Obama",
        "Political_positions_of_Barack_Obama",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "2009_Nobel_Peace_Prize",
        "West_Wing_Week",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "Second_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Obama_Doctrine",
        "Patient_Protection_and_Affordable_Care_Act",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Barack_Obama_Presidential_Center",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Electoral_history_of_Barack_Obama",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2008_Democratic_Party_presidential_primaries",
        "2012_Democratic_Party_presidential_primaries",
        "Barack_Obama_2008_presidential_primary_campaign",
        "2008_Democratic_National_Convention",
        "2012_Democratic_National_Convention",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Barack_Obama_2012_presidential_campaign",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "2012_United_States_presidential_election",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Family_of_Barack_Obama",
        "Michelle_Obama",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Public_image_of_Barack_Obama",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "George_W._Bush",
        "Book:Barack_Obama",
        "Conspiracy_theory",
        "List_of_conspiracy_theories",
        "Antiscience",
        "Cabal",
        "Conspiracy_(civil)",
        "Conspiracy_(criminal)",
        "Deception",
        "Espionage",
        "Conspiracy_fiction",
        "List_of_political_conspiracies",
        "Pseudoscience",
        "Secrecy",
        "Secret_society",
        "Urban_legend",
        "Attitude_polarization",
        "Cognitive_dissonance",
        "Communal_reinforcement",
        "Confirmation_bias",
        "Locus_of_control",
        "Mass_hysteria",
        "Paranoia",
        "Psychological_projection",
        "Assassination",
        "Geoffrey_Chaucer",
        "Princes_in_the_Tower",
        "Kaspar_Hauser",
        "Assassination_of_Abraham_Lincoln",
        "Ludwig_II_of_Bavaria",
        "Assassination_of_Archduke_Franz_Ferdinand_of_Austria",
        "Herbert_Kitchener,_1st_Earl_Kitchener",
        "Michael_Collins_(Irish_leader)",
        "Sergey_Kirov",
        "W%C5%82adys%C5%82aw_Sikorski%27s_death_controversy",
        "Death_of_Subhas_Chandra_Bose",
        "Dag_Hammarskj%C3%B6ld",
        "Patrice_Lumumba",
        "Death_of_Marilyn_Monroe",
        "John_F._Kennedy_assassination_conspiracy_theories",
        "Lee_Harvey_Oswald",
        "Dorothy_Kilgallen",
        "Martin_Luther_King_Jr._assassination_conspiracy_theories",
        "Robert_F._Kennedy_assassination_conspiracy_theories",
        "Juscelino_Kubitschek",
        "Pope_John_Paul_I_conspiracy_theories",
        "Airey_Neave",
        "1980_Camarate_air_crash",
        "Francisco_de_S%C3%A1_Carneiro",
        "Adelino_Amaro_da_Costa",
        "Assassination_of_Olof_Palme",
        "Death_and_state_funeral_of_Muhammad_Zia-ul-Haq",
        "Suicide_of_Vince_Foster",
        "Yitzhak_Rabin_assassination_conspiracy_theories",
        "Death_of_Diana,_Princess_of_Wales,_conspiracy_theories",
        "Nepalese_royal_massacre",
        "Jeffrey_Epstein_death_conspiracy_theories",
        "Death_of_Chan_Yin-lam",
        "False_flag",
        "USS_Maine_(ACR-1)",
        "RMS_Lusitania",
        "Reichstag_fire",
        "Pearl_Harbor_advance-knowledge_conspiracy_theory",
        "USS_Liberty_incident",
        "Wider%C3%B8e_Flight_933",
        "Korean_Air_Lines_Flight_007_alternative_theories",
        "1986_Mozambican_Tupolev_Tu-134_crash",
        "Pan_Am_Flight_103_conspiracy_theories",
        "Oklahoma_City_bombing_conspiracy_theories",
        "September_11_attacks_advance-knowledge_conspiracy_theories",
        "World_Trade_Center_controlled_demolition_conspiracy_theories",
        "Controversies_about_the_2004_Madrid_train_bombings",
        "Rumours_and_conspiracy_theories_about_the_July_2005_London_bombings",
        "Malaysia_Airlines_Flight_17",
        "RMS_Titanic_conspiracy_theories",
        "Phar_Lap",
        "Warsaw_concentration_camp",
        "Other_Losses",
        "Conspiracy_theories_about_Adolf_Hitler%27s_death",
        "Yemenite_Children_Affair",
        "Cairo_Fire",
        "Dyatlov_Pass_incident",
        "Lost_Cosmonauts",
        "Sightings_of_Elvis_Presley",
        "Jonestown_conspiracy_theories",
        "Satanic_ritual_abuse",
        "MS_Estonia",
        "Suicide_of_Kurt_Cobain",
        "Hello_Garci_scandal",
        "Osama_bin_Laden_death_conspiracy_theories",
        "2013_Lahad_Datu_standoff",
        "Zamboanga_City_crisis",
        "Malaysia_Airlines_Flight_370_disappearance_theories",
        "New_World_Order_(conspiracy_theory)",
        "Bilderberg_Group",
        "Black_helicopter",
        "Bohemian_Grove",
        "Chatham_House",
        "Council_on_Foreign_Relations",
        "Denver_International_Airport",
        "Eurabia",
        "Georgia_Guidestones",
        "Illuminati",
        "Judeo-Masonic_conspiracy_theory",
        "Jewish_conspiracy",
        "The_Protocols_of_the_Elders_of_Zion",
        "Kalergi_Plan",
        "Masonic_conspiracy_theories",
        "North_American_Union",
        "List_of_conspiracy_theories#Anti-Catholic_conspiracy_theories",
        "Jesuit_conspiracy_theories",
        "Vatican_conspiracy_theories",
        "ODESSA",
        "Rothschild_family",
        "Skull_and_Bones",
        "The_Fellowship_(Christian_organization)",
        "Trilateral_Commission",
        "Zionist_Occupation_Government_conspiracy_theory",
        "Conspiracy_theories_in_the_Arab_world",
        "Israel-related_animal_conspiracy_theories",
        "Temple_denial",
        "Conspiracy_theories_in_Turkey",
        "UFO_conspiracy_theory",
        "Alien_abduction",
        "Area_51",
        "Bermuda_Triangle",
        "Black_Knight_satellite_conspiracy_theory",
        "Cryptoterrestrial_hypothesis",
        "Extraterrestrial_hypothesis",
        "Interdimensional_hypothesis",
        "Dulce_Base",
        "Project_Sign",
        "Majestic_12",
        "Men_in_black",
        "Nazi_UFOs",
        "Project_Serpo",
        "Reptilian_humanoid",
        "List_of_reported_UFO_sightings",
        "Tunguska_event",
        "Foo_fighter",
        "Battle_of_Los_Angeles",
        "Ghost_rockets",
        "Maury_Island_incident",
        "Roswell_UFO_incident",
        "Gorman_dogfight",
        "Mantell_UFO_incident",
        "McMinnville_UFO_photographs",
        "Lubbock_Lights",
        "1952_Washington,_D.C._UFO_incident",
        "Barney_and_Betty_Hill",
        "Kecksburg_UFO_incident",
        "Westall_UFO",
        "Jimmy_Carter_UFO_incident",
        "Disappearance_of_Frederick_Valentich",
        "Rendlesham_Forest_incident",
        "Cash-Landrum_incident",
        "Japan_Air_Lines_flight_1628_incident",
        "Varginha_UFO_incident",
        "Phoenix_Lights",
        "USS_Nimitz_UFO_incident",
        "2006_O%27Hare_International_Airport_UFO_sighting",
        "Federal_government_of_the_United_States",
        "1951_Pont-Saint-Esprit_mass_poisoning",
        "United_States_bombing_of_the_Chinese_embassy_in_Belgrade",
        "Black_genocide_conspiracy_theory",
        "Business_Plot",
        "CIA_Kennedy_assassination_conspiracy_theory",
        "Allegations_of_CIA_assistance_to_Osama_bin_Laden",
        "Dulles%27_Plan",
        "FEMA_camps_conspiracy_theory",
        "High_Frequency_Active_Auroral_Research_Program",
        "Jade_Helm_15_conspiracy_theories",
        "Montauk_Project",
        "October_Surprise_conspiracy_theory",
        "Pizzagate_conspiracy_theory",
        "Philadelphia_Experiment",
        "Project_Azorian",
        "QAnon",
        "Sandy_Hook_Elementary_School_shooting_conspiracy_theories",
        "Murder_of_Seth_Rich",
        "Sovereign_citizen_movement",
        "Redemption_movement",
        "Vast_right-wing_conspiracy",
        "TWA_Flight_800_conspiracy_theories",
        "Big_Pharma_conspiracy_theory",
        "OPV_AIDS_hypothesis",
        "SARS_conspiracy_theory",
        "Misinformation_related_to_the_COVID-19_pandemic",
        "Vaccine_hesitancy",
        "Vaccines_and_autism",
        "MMR_vaccine_and_autism",
        "Chemtrail_conspiracy_theory",
        "Water_fluoridation_controversy",
        "GMO_conspiracy_theories",
        "Electronic_harassment",
        "Free_energy_suppression_conspiracy_theory",
        "Global_warming_conspiracy_theory",
        "2012_phenomenon",
        "Agenda_21",
        "Andinia_Plan",
        "Black_genocide",
        "Avro_Canada_CF-105_Arrow",
        "Bible_conspiracy_theory",
        "Clockwork_Orange_(plot)",
        "Conspiracy_Encyclopedia",
        "Cultural_Marxism",
        "Paul_is_dead",
        "Judeo-Bolshevism",
        "Judeopolonia",
        "Homintern",
        "Homosexual_recruitment",
        "Knights_Templar_legends",
        "Lilla_Saltsj%C3%B6badsavtalet",
        "Love_Jihad",
        "Reconquista_(Mexico)",
        "New_Coke",
        "Phantom_time_hypothesis",
        "New_Chronology_(Fomenko)",
        "Red_mercury",
        "Soft_coup",
        "George_Soros",
        "War_against_Islam",
        "White_genocide_conspiracy_theory",
        "Genocide_denial"
      ],
      "sourcestr1": "Barack_Obama_citizenship_conspiracy_theories",
      "sourcestr2": "Q3137784",
      "sourcestr3": "Q159535",
      "sourcestr4": "conspiracy theory",
      "sourcevarchar3": "[]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Billboard_Challenging_the_validity_of_Barack_Obama%27s_Birth_Certificate.JPG/1200px-Billboard_Challenging_the_validity_of_Barack_Obama%27s_Birth_Certificate.JPG",
      "sourcedouble1": 0.013355,
      "entity1": [
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "1961",
          "display": "1961"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "27",
          "display": "27"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "11",
          "display": "11"
        },
        {
          "value": "2016",
          "display": "2016"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "14",
          "display": "14"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "28",
          "display": "28"
        },
        {
          "value": "8",
          "display": "8"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "23",
          "display": "23"
        },
        {
          "value": "12",
          "display": "12"
        }
      ],
      "date": [
        {
          "value": "2011-04-27",
          "display": "2011-04-27"
        },
        {
          "value": "2009-07-27",
          "display": "2009-07-27"
        },
        {
          "value": "1961-08-04",
          "display": "1961-08-04"
        },
        {
          "value": "2009-07-28",
          "display": "2009-07-28"
        },
        {
          "value": "2008-06-12",
          "display": "2008-06-12"
        },
        {
          "value": "1961-08-13",
          "display": "1961-08-13"
        },
        {
          "value": "2008-01-08",
          "display": "2008-01-08"
        },
        {
          "value": "2008-11-09",
          "display": "2008-11-09"
        },
        {
          "value": "2009-01-08",
          "display": "2009-01-08"
        },
        {
          "value": "2009-02-10",
          "display": "2009-02-10"
        },
        {
          "value": "2009-05-27",
          "display": "2009-05-27"
        },
        {
          "value": "2009-06-10",
          "display": "2009-06-10"
        },
        {
          "value": "2009-07-04",
          "display": "2009-07-04"
        },
        {
          "value": "2009-07-22",
          "display": "2009-07-22"
        },
        {
          "value": "2009-07-23",
          "display": "2009-07-23"
        },
        {
          "value": "2009-07-29",
          "display": "2009-07-29"
        },
        {
          "value": "2009-08-02",
          "display": "2009-08-02"
        },
        {
          "value": "2009-08-06",
          "display": "2009-08-06"
        },
        {
          "value": "2009-09-05",
          "display": "2009-09-05"
        },
        {
          "value": "2009-10-01",
          "display": "2009-10-01"
        }
      ],
      "entity4": [
        {
          "value": "USD 5000000",
          "display": "USD 5000000"
        }
      ],
      "entity12": [
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        }
      ],
      "entity13": [
        {
          "value": "DIRECTOR",
          "display": "Director"
        },
        {
          "value": "CHIEF TECHNOLOGY OFFICER",
          "display": "Chief Technology Officer"
        },
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        },
        {
          "value": "FOUNDER",
          "display": "Founder"
        }
      ],
      "entity14": [
        {
          "value": "CONTRACT",
          "display": "Contract"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        }
      ],
      "event_date": [
        {
          "value": "(BIRTH)#(2011-04-27)",
          "display": "(Birth)#(2011-04-27)"
        },
        {
          "value": "(BIRTH)#(1961-08-04)",
          "display": "(Birth)#(1961-08-04)"
        },
        {
          "value": "(BIRTH)#(1961-08-13)",
          "display": "(Birth)#(1961-08-13)"
        },
        {
          "value": "(BIRTH)#(2009-07-22)",
          "display": "(Birth)#(2009-07-22)"
        },
        {
          "value": "(BIRTH)#(2009-08-02)",
          "display": "(Birth)#(2009-08-02)"
        },
        {
          "value": "(BIRTH)#(2009-10-01)",
          "display": "(Birth)#(2009-10-01)"
        },
        {
          "value": "(BIRTH)#(2011-03-17)",
          "display": "(Birth)#(2011-03-17)"
        },
        {
          "value": "(BIRTH)#(2011-04-25)",
          "display": "(Birth)#(2011-04-25)"
        },
        {
          "value": "(BIRTH)#(2008-06-09)",
          "display": "(Birth)#(2008-06-09)"
        }
      ],
      "person_cooc": [
        {
          "value": "(DIRECTOR)#(CHIYOME FUKINO)",
          "display": "(Director)#(Chiyome Fukino)"
        },
        {
          "value": "(CHIEF TECHNOLOGY OFFICER)#(NATHAN GOULDING)",
          "display": "(Chief Technology Officer)#(Nathan Goulding)"
        },
        {
          "value": "(DIRECTOR)#(JANICE OKUBO)",
          "display": "(Director)#(Janice Okubo)"
        },
        {
          "value": "(DIRECTOR)#(LORETTA FUDDY)",
          "display": "(Director)#(Loretta Fuddy)"
        },
        {
          "value": "(FOUNDER)#(LARRY KLAYMAN)",
          "display": "(Founder)#(Larry Klayman)"
        },
        {
          "value": "(VICE-PRESIDENT)#(JOE BIDEN)",
          "display": "(Vice-President)#(Joe Biden)"
        }
      ],
      "company_person": [
        {
          "value": "(NEW YORK TIMES)#(OBAMA)",
          "display": "(New York Times)#(Obama)"
        },
        {
          "value": "(WASHINGTON POST)#(BOB SCHULZ)",
          "display": "(Washington Post)#(Bob Schulz)"
        },
        {
          "value": "(WASHINGTON POST)#(DANA MILBANK)",
          "display": "(Washington Post)#(Dana Milbank)"
        }
      ],
      "rank": 4,
      "displayTitle": "Barack <span class=\"match-highlight\">Obama</span> citizenship conspiracy theories",
      "relevantExtracts": "validity of Barack <b>Obama</b>&#39;s ... movement falsely asserted <b>Obama </b>... Theories alleged that <b>Obama</b>... theories alleged that <b>Obama </b>... others claimed that <b>Obama </b>... racist reaction to <b>Obama</b>... would later succeed <b>Obama </b>... rulings to declare <b>Obama </b>... expressed skepticism about <b>Obama</b>... that they doubted <b>Obama</b>"
    },
    {
      "id": "/Web/Wikipedia/|Confirmations_of_Barack_Obama%27s_Cabinet",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.986073,
      "matchingpartnames": [
        "text",
        "tables",
        "title"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "The First {b}Obama{nb} Cabinet, 2009",
        "2,29",
        "8142,29",
        "This page documents the nomination and confirmation process for cabinet nominees of Barack {b}Obama{nb} 's administration .",
        "243,116",
        "27955,336",
        "Vice President Joe Biden , President {b}Obama{nb}, Budget Director Peter Orszag and Chief of Staff Rahm Emanuel in the oval office , January 2009",
        "826,138",
        "74461,384",
        "In early August, {b}Obama{nb} and Biden met in secret to discuss a possible vice-presidential relationship.",
        "1372,100",
        "75621,100",
        "On August 22, 2008, Barack {b}Obama{nb} announced that Biden would be his running mate .",
        "1473,81",
        "75857,134",
        "The New York Times reported that the strategy behind the choice reflected a desire to fill out the ticket with someone who has foreign policy and national security experience—and not to help the ticket win a swing state or to emphasize {b}Obama{nb}'s \"change\" message.",
        "1555,261",
        "76305,445",
        "Other observers pointed out Biden's appeal to middle-class and blue-collar voters, as well as his willingness to aggressively challenge Republican nominee John McCain in a way that {b}Obama{nb} seemed uncomfortable doing at times.",
        "1817,223",
        "76866,421",
        "In accepting {b}Obama{nb}'s offer, Biden ruled out to him the possibility of running for president again in 2016.",
        "2041,106",
        "77403,106",
        "On November 4, 2008, {b}Obama{nb} was elected President and Biden Vice President of the United States.",
        "2149,95",
        "77651,95",
        "The {b}Obama{nb}-Biden ticket won 365 electoral college votes to McCain-Palin's 173, and had a 53-46 percent edge in the nationwide popular vote.",
        "2245,138",
        "77862,355"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "12,5,334,5,863,5,1037,5,1151,5,1389,5,1500,5,1791,5,1998,5,2054,5,2170,5,2249,5,2514,5,2788,5,2842,5,3433,5,4010,5,4318,5,4430,5,5113,5,6364,5,6376,5,6779,5,7412,5,8302,5,10596,5,11446,5,11707,5,12305,5,12422,5,12578,5,12752,5,12940,5,13269,5,13964,5,14012,5,14412,5,14754,5,15166,5,15237,5,16280,5,17550,5,19490,5,19588,5,20284,5,20824,5,22491,5,23068,5,23308,5,23643,5,23793,5,24002,5,25049,5,25589,5,26153,5,26472,5,27728,5,27895,5,28541,5,28972,5,29049,5,30143,5,30551,5,31097,5,31320,5,32217,5,32310,5,32874,5,33060,5,34531,5,34727,5,35379,5,35730,5,36387,5,36495,5,37334,5,37938,5,38103,5,38869,5,38930,5,39922,5,55251,5,55379,5,55535,5,56020,5,56207,5,56376,5,56733,5,56815,5,57074,5,57989,5,58267,5,59214,5,59473,5,60099,5,60190,5,60679,5,61154,5,61570,5,61619,5,62630,5,63010,5,63411,5,63564,5,63746,5,63867,5,64331,5,64487,5,64856,5,65095,5,65580,5,66054,5;8152,5,28182,5,74545,5,74938,5,75052,5,75638,5,75884,5,76725,5,77245,5,77416,5,77672,5,77866,5,78462,5,79377,5,79435,5,80873,5,96889,5,97776,5,98005,5,99750,5,104139,5,104151,5,107979,5,110037,5,111610,5,115905,5,117951,5,119988,5,123576,5,123816,5,124131,5,124429,5,125048,5,128906,5,130319,5,130484,5,132754,5,135347,5,136926,5,137108,5,141477,5,146072,5,149583,5,149681,5,152568,5,155829,5,162817,5,163831,5,164197,5,166438,5,167004,5,168691,5,172235,5,175344,5,176753,5,177801,5,180817,5,181134,5,182738,5,184119,5,184316,5,188703,5,189962,5,190704,5,191649,5,195301,5,195394,5,198139,5,198501,5,201095,5,202010,5,204802,5,206101,5,209498,5,209606,5,211425,5,214022,5,215032,5,218243,5,218477,5,221695,5,335842,5,337666,5,338028,5,339055,5,339300,5,339694,5,340339,5,340685,5,341068,5,343735,5,344408,5,346553,5,347519,5,350466,5,350710,5,352669,5,354923,5,356645,5,356694,5,359383,5,360900,5,362876,5,363425,5,363666,5,364033,5,365561,5,366437,5,367921,5,369681,5,371585,5,373911,5"
          },
          {
            "partname": "tables",
            "data": "66601,5,66643,5;918678,5,918722,5"
          },
          {
            "partname": "title",
            "data": "68570,5;920873,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Confirmations of Barack Obama's Cabinet",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-29 23:28:01",
      "indexationtime": "2020-09-02 06:13:32",
      "version": "RoNJF9qn82+MggnB0LhTMg==",
      "size": 918565,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Confirmations_of_Barack_Obama's_Cabinet",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "JOHN KERRY",
          "display": "John Kerry"
        },
        {
          "value": "HILDA SOLIS",
          "display": "Hilda Solis"
        },
        {
          "value": "JACK LEW",
          "display": "Jack Lew"
        },
        {
          "value": "ARNE DUNCAN",
          "display": "Arne Duncan"
        },
        {
          "value": "ERIC HOLDER",
          "display": "Eric Holder"
        },
        {
          "value": "ERIC SHINSEKI",
          "display": "Eric Shinseki"
        },
        {
          "value": "KATHLEEN SEBELIUS",
          "display": "Kathleen Sebelius"
        },
        {
          "value": "KEN SALAZAR",
          "display": "Ken Salazar"
        },
        {
          "value": "LEON PANETTA",
          "display": "Leon Panetta"
        },
        {
          "value": "PENNY PRITZKER",
          "display": "Penny Pritzker"
        },
        {
          "value": "SYLVIA MATHEWS BURWELL",
          "display": "Sylvia Mathews Burwell"
        },
        {
          "value": "CHUCK HAGEL",
          "display": "Chuck Hagel"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "CHRISTINA ROMER",
          "display": "Christina Romer"
        },
        {
          "value": "GARY LOCKE",
          "display": "Gary Locke"
        },
        {
          "value": "GINA MCCARTHY",
          "display": "Gina McCarthy"
        },
        {
          "value": "JOE BIDEN",
          "display": "Joe Biden"
        },
        {
          "value": "JOHN BRYSON",
          "display": "John Bryson"
        }
      ],
      "company": [
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "PROCTER&GAMBLE",
          "display": "Procter&Gamble"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "MASSACHUSETTS",
          "display": "Massachusetts"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "NEW HAMPSHIRE",
          "display": "New Hampshire"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        },
        {
          "value": "IOWA",
          "display": "Iowa"
        },
        {
          "value": "KANSAS",
          "display": "Kansas"
        },
        {
          "value": "OKLAHOMA",
          "display": "Oklahoma"
        },
        {
          "value": "DELAWARE",
          "display": "Delaware"
        },
        {
          "value": "NEW YORK",
          "display": "New York"
        },
        {
          "value": "CONNECTICUT",
          "display": "Connecticut"
        },
        {
          "value": "NEW MEXICO",
          "display": "New Mexico"
        },
        {
          "value": "NORTH CAROLINA",
          "display": "North Carolina"
        },
        {
          "value": "NORTH DAKOTA",
          "display": "North Dakota"
        },
        {
          "value": "PENNSYLVANIA",
          "display": "Pennsylvania"
        },
        {
          "value": "WEST VIRGINIA",
          "display": "West Virginia"
        },
        {
          "value": "ARIZONA",
          "display": "Arizona"
        },
        {
          "value": "ARKANSAS",
          "display": "Arkansas"
        },
        {
          "value": "COLORADO",
          "display": "Colorado"
        }
      ],
      "wordcount": 7247,
      "exacthash": "3AEFUJQo/6SEkxZ/MwmOZg==",
      "nearhash": "8tuUA3FzrVA8yPE6FlAF4w==",
      "partnamelocations": [
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Confirmations_of_Barack_Obama%27s_Cabinet",
      "sourcecsv1": [
        "Barack Obama",
        "Joe Biden",
        "Hillary Clinton",
        "John Kerry",
        "Tim Geithner",
        "Jack Lew",
        "Bob Gates *",
        "Leon Panetta",
        "Chuck Hagel",
        "Ash Carter",
        "Eric Holder",
        "Loretta Lynch",
        "Ken Salazar",
        "Sally Jewell",
        "Tom Vilsack",
        "Gary Locke",
        "John Bryson",
        "Penny Pritzker",
        "Hilda Solis",
        "Thomas Perez",
        "Kathleen Sebelius",
        "Sylvia Burwell",
        "Arne Duncan",
        "John King",
        "Shaun Donovan",
        "Julian Castro",
        "Ray LaHood",
        "Anthony Foxx",
        "Steven Chu",
        "Ernest Moniz",
        "Eric Shinseki",
        "Bob McDonald",
        "Janet Napolitano",
        "Jeh Johnson",
        "Rahm Emanuel",
        "William Daley",
        "Denis McDonough",
        "Lisa Jackson",
        "Gina McCarthy",
        "Peter Orszag",
        "Susan Rice",
        "Samantha Power",
        "Ron Kirk",
        "Michael Froman",
        "Christina Romer",
        "Austan Goolsbee",
        "Alan Krueger",
        "Jason Furman",
        "Karen Mills **",
        "Maria Contreras-Sweet"
      ],
      "sourcecsv2": [
        "President_of_the_United_States",
        "Cabinet_of_the_United_States",
        "United_States_Senate",
        "Appointments_Clause",
        "United_States_Constitution",
        "Barack_Obama",
        "Vice_President_of_the_United_States",
        "Joe_Biden",
        "United_States_Secretary_of_State",
        "Hillary_Clinton",
        "John_Kerry",
        "United_States_Secretary_of_the_Treasury",
        "Timothy_Geithner",
        "Jack_Lew",
        "United_States_Secretary_of_Defense",
        "Robert_Gates",
        "Leon_Panetta",
        "Chuck_Hagel",
        "Ash_Carter",
        "United_States_Attorney_General",
        "Eric_Holder",
        "Loretta_Lynch",
        "United_States_Secretary_of_the_Interior",
        "Ken_Salazar",
        "Sally_Jewell",
        "United_States_Secretary_of_Agriculture",
        "Tom_Vilsack",
        "United_States_Secretary_of_Commerce",
        "Gary_Locke",
        "John_Bryson",
        "Penny_Pritzker",
        "United_States_Secretary_of_Labor",
        "Hilda_Solis",
        "Tom_Perez",
        "United_States_Secretary_of_Health_and_Human_Services",
        "Kathleen_Sebelius",
        "Sylvia_Mathews_Burwell",
        "United_States_Secretary_of_Education",
        "Arne_Duncan",
        "John_King_Jr.",
        "United_States_Secretary_of_Housing_and_Urban_Development",
        "Shaun_Donovan",
        "Julian_Castro",
        "United_States_Secretary_of_Transportation",
        "Ray_LaHood",
        "Anthony_Foxx",
        "United_States_Secretary_of_Energy",
        "Steven_Chu",
        "Ernest_Moniz",
        "United_States_Secretary_of_Veterans_Affairs",
        "Eric_Shinseki",
        "Robert_A._McDonald",
        "United_States_Secretary_of_Homeland_Security",
        "Janet_Napolitano",
        "Jeh_Johnson",
        "White_House_Chief_of_Staff",
        "Rahm_Emanuel",
        "William_M._Daley",
        "Denis_McDonough",
        "Administrator_of_the_Environmental_Protection_Agency",
        "Lisa_P._Jackson",
        "Gina_McCarthy",
        "Office_of_Management_and_Budget",
        "Peter_R._Orszag",
        "United_States_Ambassador_to_the_United_Nations",
        "Susan_Rice",
        "Samantha_Power",
        "Office_of_the_United_States_Trade_Representative",
        "Ron_Kirk",
        "Michael_Froman",
        "Council_of_Economic_Advisers",
        "Christina_Romer",
        "Austan_Goolsbee",
        "Alan_Krueger",
        "Jason_Furman",
        "Administrator_of_the_Small_Business_Administration",
        "Karen_Mills",
        "Maria_Contreras-Sweet",
        "Presidency_of_Barack_Obama",
        "United_States_presidential_line_of_succession",
        "2008_Democratic_Party_vice_presidential_candidate_selection",
        "Dick_Cheney",
        "Number_One_Observatory_Circle",
        "Peter_Orszag",
        "Oval_office",
        "NBC",
        "Meet_the_Press",
        "Running_mate",
        "The_New_York_Times",
        "Foreign_policy",
        "National_security",
        "Swing_state",
        "Middle-class",
        "Blue-collar",
        "John_McCain",
        "Electoral_college_votes",
        "Oath_of_office",
        "John_Paul_Stevens",
        "Presidential_transition_of_Barack_Obama",
        "U.S._Secret_Service",
        "Ron_Klain",
        "Time_(magazine)",
        "Jay_Carney",
        "Office_of_the_Vice_President_of_the_United_States",
        "Steve_Ricchetti",
        "Cynthia_Hogan",
        "Mike_Donilon",
        "Evan_Ryan",
        "Shailagh_Murray",
        "Colin_Kahl",
        "Wife_of_the_Vice_President_of_the_United_States",
        "Catherine_M._Russell",
        "Moises_Vela",
        "Terrell_McSweeny",
        "Jared_Bernstein",
        "Elizabeth_Alexander_(press_secretary)",
        "Sudafi_Henry",
        "Senate_Foreign_Relations_Committee",
        "Bill_Richardson",
        "Sam_Nunn",
        "Saxbe_fix",
        "Bill_Clinton",
        "William_J._Clinton_Presidential_Center_and_Park",
        "Clinton_Global_Initiative",
        "United_States_Senate_Committee_on_Foreign_Relations",
        "Lewinsky_scandal",
        "Christopher_Hitchens",
        "Vanity_Fair_(magazine)",
        "Hardball_with_Chris_Matthews",
        "2008_Democratic_Presidential_Primary",
        "John_Cornyn",
        "David_Vitter",
        "John_F._Kerry",
        "United_States_Senate_Committee_on_Finance",
        "Federal_Reserve_Bank_of_New_York",
        "Henry_Paulson",
        "United_States_Department_of_the_Treasury",
        "Financial_crisis_of_2007%E2%80%932008",
        "Renminbi",
        "Senate_Finance_Committee",
        "Internal_Revenue_Service",
        "International_Monetary_Fund",
        "TurboTax",
        "Michelle_Malkin",
        "Speaker_of_the_United_States_House_of_Representatives",
        "Newt_Gingrich",
        "Treasury_Secretary",
        "Lindsey_Graham",
        "United_States_Senate_Committee_on_Armed_Services",
        "George_W._Bush",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Presidential_line_of_succession",
        "Designated_survivor",
        "Director_of_the_Central_Intelligence_Agency",
        "United_States_Senate_Committee_on_the_Judiciary",
        "Barack_Obama_2008_presidential_campaign",
        "Guantanamo_Bay_detention_camp",
        "Presidency_of_George_W._Bush",
        "USA_PATRIOT_Act",
        "Enhanced_interrogation_techniques",
        "NSA_warrantless_surveillance",
        "Patrick_Leahy",
        "United_States_Democratic_Party",
        "Vermont",
        "George_W._Bush_administration",
        "Waterboarding",
        "Torture",
        "Attorney_General_of_the_United_States",
        "United_States_Senate_Committee_on_Energy_and_Natural_Resources",
        "Bill_Ritter",
        "Michael_Bennet",
        "National_Park_Service",
        "Bureau_of_Land_Management",
        "United_States_Fish_and_Wildlife_Service",
        "United_States_Geological_Survey",
        "California",
        "New_Mexico",
        "Manuel_Lujan_Jr.",
        "George_H._W._Bush",
        "Kieran_Suckling",
        "Gene_Karpinski",
        "League_of_Conservation_Voters",
        "Oil_shale",
        "Dirk_Kempthorne",
        "Statue_of_Liberty",
        "September_11_attacks",
        "Recreational_Equipment,_Inc.",
        "United_States_Senate_Committee_on_Agriculture,_Nutrition_and_Forestry",
        "Iowa",
        "Mike_Johanns",
        "Ed_Schafer",
        "Corn_Refiners_Association",
        "National_Farmers_Union_(United_States)",
        "American_Farm_Bureau_Federation",
        "Environmental_Defense_Fund",
        "Genetically_modified_crops",
        "Genetic_engineering",
        "Biotechnology_Industry_Organization",
        "United_States_Senate_Committee_on_Commerce,_Science,_and_Transportation",
        "Unsuccessful_nominations_to_the_Cabinet_of_the_United_States",
        "Judd_Gregg",
        "Super-majority",
        "Al_Franken",
        "John_H._Lynch",
        "Mitch_McConnell",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "United_States_Census",
        "State_of_Washington",
        "Governor_of_Washington",
        "Chinese_American",
        "Asian_American",
        "James_Inhofe",
        "Republican_Party_(United_States)",
        "Oklahoma",
        "Senate_hold",
        "Seizure",
        "Hit_and_run_(vehicular)",
        "Rebecca_Blank",
        "United_States_Senate_Committee_on_Health,_Education,_Labor_and_Pensions",
        "U.S._Trade_Representative",
        "Employee_Free_Choice_Act",
        "H-2A_Visa",
        "Obama_transition_team",
        "AFL-CIO",
        "Judy_Chu",
        "2009_California%27s_32nd_congressional_district_special_election",
        "United_States_Senate_Committee_on_Health,_Education,_Labor,_and_Pensions",
        "Ted_Kennedy",
        "Mike_Enzi",
        "Thomas_Perez",
        "Tom_Daschle",
        "United_States_Senate_Committee_on_Banking,_Housing_and_Urban_Affairs",
        "San_Antonio",
        "United_States_Senate_Committee_on_Commerce,_Science_and_Transportation",
        "House_Transportation_and_Infrastructure_Committee",
        "House_Appropriations_Committee",
        "James_Oberstar",
        "Energy_and_Natural_Resources_Committee",
        "Barack_Obama_administration",
        "United_States_Cabinet",
        "Elaine_Chao",
        "Health,_Education,_Labor_and_Pensions_Committee",
        "Tom_Harkin",
        "United_States_Senate_Committee_on_Veterans_Affairs",
        "Secretary_of_Veterans_Affairs",
        "United_States_Senate_Committee_on_Homeland_Security_and_Governmental_Affairs",
        "Obama-Biden_Transition_Project",
        "United_States_Department_of_Homeland_Security",
        "List_of_female_United_States_Cabinet_Secretaries",
        "Jan_Brewer",
        "Lieutenant_governor_(United_States)",
        "University_of_California",
        "Rand_Beers",
        "United_States_Deputy_Secretary_of_Homeland_Security",
        "List_of_positions_filled_by_presidential_appointment_with_Senate_confirmation",
        "Under_Secretary_of_Homeland_Security_for_National_Protection_and_Programs",
        "Executive_Office_of_the_President_of_the_United_States",
        "Recorded_vote",
        "Voice_vote",
        "Hawaii",
        "Daniel_Akaka",
        "Tennessee",
        "Lamar_Alexander",
        "Wyoming",
        "John_Barrasso",
        "Montana",
        "Max_Baucus",
        "Indiana",
        "Evan_Bayh",
        "Alaska",
        "Mark_Begich",
        "Colorado",
        "Utah",
        "Bob_Bennett_(politician)",
        "Jeff_Bingaman",
        "Missouri",
        "Kit_Bond",
        "Barbara_Boxer",
        "Ohio",
        "Sherrod_Brown",
        "Kansas",
        "Sam_Brownback",
        "Kentucky",
        "Jim_Bunning",
        "North_Carolina",
        "Richard_Burr",
        "Illinois",
        "Roland_Burris",
        "West_Virginia",
        "Robert_Byrd",
        "Washington_(state)",
        "Maria_Cantwell",
        "Maryland",
        "Ben_Cardin",
        "Delaware",
        "Tom_Carper",
        "Pennsylvania",
        "Bob_Casey_Jr.",
        "Georgia_(U.S._state)",
        "Saxby_Chambliss",
        "Tom_Coburn",
        "Mississippi",
        "Thad_Cochran",
        "Maine",
        "Susan_Collins",
        "North_Dakota",
        "Kent_Conrad",
        "Bob_Corker",
        "Texas",
        "Idaho",
        "Mike_Crapo",
        "South_Carolina",
        "Jim_DeMint",
        "Connecticut",
        "Chris_Dodd",
        "Byron_Dorgan",
        "Dick_Durbin",
        "Nevada",
        "John_Ensign",
        "Wisconsin",
        "Russ_Feingold",
        "Dianne_Feinstein",
        "Minnesota",
        "New_York_(state)",
        "Kirsten_Gillibrand",
        "Chuck_Grassley",
        "New_Hampshire",
        "Kay_Hagan",
        "Orrin_Hatch",
        "Kay_Bailey_Hutchison",
        "Jim_Inhofe",
        "Daniel_Inouye",
        "Johnny_Isakson",
        "Nebraska",
        "South_Dakota",
        "Tim_Johnson_(U.S._Senator)",
        "Ted_Kaufman",
        "Massachusetts",
        "Amy_Klobuchar",
        "Herb_Kohl",
        "Arizona",
        "Jon_Kyl",
        "Louisiana",
        "Mary_Landrieu",
        "New_Jersey",
        "Frank_Lautenberg",
        "Michigan",
        "Carl_Levin",
        "Joe_Lieberman",
        "Arkansas",
        "Blanche_Lincoln",
        "Richard_Lugar",
        "Florida",
        "Mel_Martinez",
        "Claire_McCaskill",
        "Bob_Menendez",
        "Oregon",
        "Jeff_Merkley",
        "Barbara_Mikulski",
        "Lisa_Murkowski",
        "Patty_Murray",
        "Bill_Nelson",
        "Ben_Nelson",
        "Mark_Pryor",
        "Rhode_Island",
        "Jack_Reed_(Rhode_Island_politician)",
        "Harry_Reid",
        "Jim_Risch",
        "Pat_Roberts",
        "Jay_Rockefeller",
        "Bernie_Sanders",
        "Chuck_Schumer",
        "Alabama",
        "Jeff_Sessions",
        "Jeanne_Shaheen",
        "Richard_Shelby",
        "Olympia_Snowe",
        "Arlen_Specter",
        "Debbie_Stabenow",
        "Jon_Tester",
        "John_Thune",
        "Mark_Udall",
        "Tom_Udall",
        "George_Voinovich",
        "Virginia",
        "Mark_Warner",
        "Jim_Webb",
        "Sheldon_Whitehouse",
        "Roger_Wicker",
        "Ron_Wyden",
        "Attorney-General_of_the_United_States",
        "Secretary_of_Health_and_Human_Services",
        "Democratic_Party_(United_States)",
        "Political_independent",
        "Sonia_Sotomayor",
        "Ben_Bernanke",
        "Elena_Kagan",
        "David_Petraeus",
        "Richard_Cordray",
        "Kelly_Ayotte",
        "Richard_Blumenthal",
        "Roy_Blunt",
        "John_Boozman",
        "Scott_Brown_(politician)",
        "Dan_Coats",
        "Chris_Coons",
        "Carte_Goodwin",
        "Dean_Heller",
        "John_Hoeven",
        "Ron_Johnson_(Wisconsin_politician)",
        "Paul_G._Kirk",
        "Mark_Kirk",
        "Mike_Lee_(U.S._politician)",
        "George_LeMieux",
        "Jerry_Moran",
        "Rand_Paul",
        "Rob_Portman",
        "Marco_Rubio",
        "Pat_Toomey",
        "United_States_Solicitor_General",
        "Elena_Kagan_Supreme_Court_nomination",
        "Supreme_Court_of_the_United_States",
        "Federal_Reserve_Board_of_Governors",
        "Central_Intelligence_Agency",
        "Consumer_Financial_Protection_Bureau",
        "2009_Illinois%27s_5th_congressional_district_special_election",
        "National_Jewish_Democratic_Council",
        "Peace_process_in_the_Israeli%E2%80%93Palestinian_conflict",
        "Ali_Abunimah",
        "Electronic_Intifada",
        "Pete_Rouse",
        "Mayor_of_Chicago",
        "Counselor_to_the_President",
        "Deputy_National_Security_Advisor",
        "Senator_Bernie_Sanders",
        "Unanimous_consent",
        "Jeffrey_Zients",
        "U.S._Ambassador_to_the_United_Nations",
        "National_Security_Advisor_(United_States)",
        "Tom_Donilon",
        "United_States_Environmental_Protection_Agency",
        "North_American_Free_Trade_Agreement",
        "Council_of_Economic_Advisors",
        "United_States_Cabinet#Cabinet-level_officers",
        "Small_Business_Administration",
        "Gil_Kerlikowske",
        "Director_of_the_Office_of_National_Drug_Control_Policy",
        "John_P._Walters",
        "Ryan_Lizza",
        "The_New_Yorker",
        "Associated_Press",
        "The_Washington_Post",
        "Adam_Nagourney",
        "The_New_Republic",
        "The_News_Journal",
        "The_Politico",
        "Reuters",
        "NPR",
        "Sky_News",
        "Peter_Baker_(author)",
        "Change.gov",
        "CNBC",
        "The_Daily_Telegraph",
        "Yahoo",
        "Marquis_Who%27s_Who",
        "Angus_King",
        "ABC_News",
        "Bloomberg_L.P.",
        "NBCNews.com",
        "Boston_Globe",
        "The_Philadelphia_Inquirer",
        "Judy_Woodruff",
        "The_Situation_Room_with_Wolf_Blitzer",
        "CNN",
        "Glenn_Greenwald",
        "Salon.com",
        "Yahoo!_Inc.",
        "Idaho_Statesman",
        "Yahoo!_News",
        "USA_Today",
        "Los_Angeles_Times",
        "Bloomberg_News",
        "Kenneth_P._Vogel",
        "The_Wall_Street_Journal",
        "Wayback_Machine",
        "Crain_Communications_Inc.",
        "McClatchy_Newspapers",
        "The_Atlantic",
        "Foreign_Policy",
        "New_York_Daily_News",
        "Democracy_Now",
        "Lynn_Sweet",
        "The_Chicago_Sun-Times",
        "Real_Clear_Politics",
        "Star_Tribune",
        "Newark_Star_Ledger",
        "Star-Ledger",
        "BBC_News",
        "Congressional_Record",
        "Bob_McDonald_(businessman)",
        "Cabinet_of_the_United_States#Cabinet-level_officers"
      ],
      "sourcestr1": "Confirmations_of_Barack_Obama%27s_Cabinet",
      "sourcestr2": "Q4206667",
      "sourcestr3": "Q639738",
      "sourcestr4": "United States Cabinet",
      "sourcevarchar3": "[{\"The Obama Cabinet\":\"\",\"Office Name Term\":\"\",\"Barack Obama\":[\"President\",\"2009\\u20132017\"],\"Joe Biden\":[\"Vice President\",\"2009\\u20132017\"],\"Hillary Clinton\":[\"Secretary of State\",\"2009\\u20132013\"],\"John Kerry\":\"2013\\u20132017\",\"Tim Geithner\":[\"Secretary of the Treasury\",\"2009\\u20132013\"],\"Jack Lew\":\"2010\\u20132012\",\"Bob Gates *\":[\"Secretary of Defense\",\"2006\\u20132011\"],\"Leon Panetta\":\"2011\\u20132013\",\"Chuck Hagel\":\"2013\\u20132015\",\"Ash Carter\":\"2015\\u20132017\",\"Eric Holder\":[\"Attorney General\",\"2009\\u20132015\"],\"Loretta Lynch\":\"2015\\u20132017\",\"Ken Salazar\":[\"Secretary of the Interior\",\"2009\\u20132013\"],\"Sally Jewell\":\"2013\\u20132017\",\"Tom Vilsack\":[\"Secretary of Agriculture\",\"2009\\u20132017\"],\"Gary Locke\":[\"Secretary of Commerce\",\"2009\\u20132011\"],\"John Bryson\":\"2011\\u20132012\",\"Penny Pritzker\":\"2013\\u20132017\",\"Hilda Solis\":[\"Secretary of Labor\",\"2009\\u20132013\"],\"Thomas Perez\":\"2013\\u20132017\",\"Kathleen Sebelius\":[\"Secretary of Health and\",\"Human Services\",\"2009\\u20132014\"],\"Sylvia Burwell\":\"2013\\u20132014\",\"Arne Duncan\":[\"Secretary of Education\",\"2009\\u20132016\"],\"John King\":\"2016\\u20132017\",\"Shaun Donovan\":\"2014\\u20132017\",\"Julian Castro\":\"2014\\u20132017\",\"Ray LaHood\":[\"Secretary of Transportation\",\"2009\\u20132013\"],\"Anthony Foxx\":\"2013\\u20132017\",\"Steven Chu\":[\"Secretary of Energy\",\"2009\\u20132013\"],\"Ernest Moniz\":\"2013\\u20132017\",\"Eric Shinseki\":[\"Secretary of Veterans Affairs\",\"2009\\u20132014\"],\"Bob McDonald\":\"2014\\u20132017\",\"Janet Napolitano\":[\"Secretary of Homeland Security\",\"2009\\u20132013\"],\"Jeh Johnson\":\"2013\\u20132017\",\"Rahm Emanuel\":[\"Chief of Staff\",\"2009\\u20132010\"],\"William Daley\":\"2011\\u20132012\",\"Denis McDonough\":\"2013\\u20132017\",\"Lisa Jackson\":[\"Administrator of the\",\"Environmental Protection Agency\",\"2009\\u20132013\"],\"Gina McCarthy\":\"2013\\u20132017\",\"Peter Orszag\":[\"Director of the Office of\",\"Management and Budget\",\"2009\\u20132010\"],\"Susan Rice\":[\"Ambassador to the United Nations\",\"2009\\u20132013\"],\"Samantha Power\":\"2013\\u20132017\",\"Ron Kirk\":[\"United States Trade Representative\",\"2009\\u20132013\"],\"Michael Froman\":\"2013\\u20132017\",\"Christina Romer\":[\"Chair of the\",\"Council of Economic Advisers\",\"2009\\u20132010\"],\"Austan Goolsbee\":\"2010\\u20132011\",\"Alan Krueger\":\"2011\\u20132013\",\"Jason Furman\":\"2013\\u20132017\",\"Karen Mills **\":[\"Administrator of the\",\"Small Business Administration\",\"2009\\u20132013\"],\"Maria Contreras-Sweet\":\"2014\\u20132017\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/US_Cabinet_official_group_photo_July_26%2C_2012.jpg/1200px-US_Cabinet_official_group_photo_July_26%2C_2012.jpg",
      "sourcedouble1": 0.011703,
      "entity1": [
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "18",
          "display": "18"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "21",
          "display": "21"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "23",
          "display": "23"
        },
        {
          "value": "6",
          "display": "6"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "27",
          "display": "27"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "11",
          "display": "11"
        },
        {
          "value": "16",
          "display": "16"
        }
      ],
      "date": [
        {
          "value": "2009-01-20",
          "display": "2009-01-20"
        },
        {
          "value": "2009-01-21",
          "display": "2009-01-21"
        },
        {
          "value": "2008-12-01",
          "display": "2008-12-01"
        },
        {
          "value": "2008-12-19",
          "display": "2008-12-19"
        },
        {
          "value": "2009-01-23",
          "display": "2009-01-23"
        },
        {
          "value": "2009-02-11",
          "display": "2009-02-11"
        },
        {
          "value": "2013-01-25",
          "display": "2013-01-25"
        },
        {
          "value": "2013-05-16",
          "display": "2013-05-16"
        },
        {
          "value": "2013-06-10",
          "display": "2013-06-10"
        },
        {
          "value": "2014-05-23",
          "display": "2014-05-23"
        },
        {
          "value": "2008-11-05",
          "display": "2008-11-05"
        },
        {
          "value": "2009-01-04",
          "display": "2009-01-04"
        },
        {
          "value": "2009-02-03",
          "display": "2009-02-03"
        },
        {
          "value": "2009-08-06",
          "display": "2009-08-06"
        },
        {
          "value": "2010-11-18",
          "display": "2010-11-18"
        },
        {
          "value": "2011-06-30",
          "display": "2011-06-30"
        },
        {
          "value": "2011-10-20",
          "display": "2011-10-20"
        },
        {
          "value": "2011-12-08",
          "display": "2011-12-08"
        },
        {
          "value": "2012-01-27",
          "display": "2012-01-27"
        },
        {
          "value": "2013-02-27",
          "display": "2013-02-27"
        }
      ],
      "entity4": [
        {
          "value": "USD 16000000",
          "display": "USD 16000000"
        },
        {
          "value": "USD 220000",
          "display": "USD 220000"
        },
        {
          "value": "USD 6400",
          "display": "USD 6400"
        },
        {
          "value": "USD 14847",
          "display": "USD 14847"
        },
        {
          "value": "USD 15000",
          "display": "USD 15000"
        },
        {
          "value": "USD 35000",
          "display": "USD 35000"
        }
      ],
      "entity12": [
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "BATTLE",
          "display": "Battle"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        }
      ],
      "entity13": [
        {
          "value": "DIRECTOR",
          "display": "Director"
        },
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        },
        {
          "value": "CHIEF EXECUTIVE OFFICER",
          "display": "Chief Executive Officer"
        },
        {
          "value": "CHIEF INFORMATION OFFICER",
          "display": "Chief Information Officer"
        },
        {
          "value": "FOUNDER",
          "display": "Founder"
        }
      ],
      "entity14": [
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "BONDS",
          "display": "Bonds"
        },
        {
          "value": "CONTRACT",
          "display": "Contract"
        }
      ],
      "event_date": [
        {
          "value": "(ELECTION)#(2009-04-07)",
          "display": "(Election)#(2009-04-07)"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(JOE BIDEN)",
          "display": "(Vice-President)#(Joe Biden)"
        },
        {
          "value": "(DIRECTOR)#(PETER ORSZAG)",
          "display": "(Director)#(Peter Orszag)"
        },
        {
          "value": "(DIRECTOR)#(SYLVIA MATHEWS BURWELL)",
          "display": "(Director)#(Sylvia Mathews Burwell)"
        },
        {
          "value": "(DIRECTOR)#(OBAMA)",
          "display": "(Director)#(Obama)"
        },
        {
          "value": "(VICE-PRESIDENT)#(OBAMA)",
          "display": "(Vice-President)#(Obama)"
        },
        {
          "value": "(VICE-PRESIDENT)#(DICK CHENEY)",
          "display": "(Vice-President)#(Dick Cheney)"
        },
        {
          "value": "(CHIEF EXECUTIVE OFFICER)#(OBAMA)",
          "display": "(Chief Executive Officer)#(Obama)"
        },
        {
          "value": "(CHIEF EXECUTIVE OFFICER)#(SALLY JEWELL)",
          "display": "(Chief Executive Officer)#(Sally Jewell)"
        },
        {
          "value": "(DIRECTOR)#(GINA MCCARTHY)",
          "display": "(Director)#(Gina McCarthy)"
        },
        {
          "value": "(DIRECTOR)#(IRA FORMAN)",
          "display": "(Director)#(Ira Forman)"
        },
        {
          "value": "(DIRECTOR)#(JACK LEW)",
          "display": "(Director)#(Jack Lew)"
        },
        {
          "value": "(DIRECTOR)#(JEFFREY ZIENTS)",
          "display": "(Director)#(Jeffrey Zients)"
        },
        {
          "value": "(DIRECTOR)#(LEON PANETTA)",
          "display": "(Director)#(Leon Panetta)"
        },
        {
          "value": "(VICE-PRESIDENT)#(BARACK OBAMA)",
          "display": "(Vice-President)#(Barack Obama)"
        },
        {
          "value": "(VICE-PRESIDENT)#(HILLARY CLINTON)",
          "display": "(Vice-President)#(Hillary Clinton)"
        },
        {
          "value": "(VICE-PRESIDENT)#(JOHN KERRY)",
          "display": "(Vice-President)#(John Kerry)"
        },
        {
          "value": "(DIRECTOR)#(JAY CARNEY)",
          "display": "(Director)#(Jay Carney)"
        },
        {
          "value": "(DIRECTOR)#(JOE BIDEN)",
          "display": "(Director)#(Joe Biden)"
        }
      ],
      "company_person": [
        {
          "value": "(PROCTER&GAMBLE)#(BARACK OBAMA)",
          "display": "(Procter&Gamble)#(Barack Obama)"
        },
        {
          "value": "(PROCTER&GAMBLE)#(ERIC SHINSEKI)",
          "display": "(Procter&Gamble)#(Eric Shinseki)"
        }
      ],
      "rank": 5,
      "displayTitle": "Confirmations of Barack <span class=\"match-highlight\">Obama</span>&#39;s Cabinet",
      "relevantExtracts": "The First <b>Obama </b>... nominees of Barack <b>Obama </b>... Biden , President <b>Obama</b>, Budget ... In early August, <b>Obama </b>and Biden ... 22, 2008, Barack <b>Obama </b>announced that ... or to emphasize <b>Obama</b>... a way that <b>Obama </b>seemed uncomfortable ... In accepting <b>Obama</b>&#39;s ... November 4, 2008, <b>Obama </b>was ... The <b>Obama</b>-Biden "
    },
    {
      "id": "/Web/Wikipedia/|Barack_Obama_on_mass_surveillance",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.979113,
      "matchingpartnames": [
        "text",
        "tables",
        "title"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "President {b}Obama{nb} addresses NSA mass surveillance in a speech on January 17, 2014",
        "14,79",
        "14756,79",
        "U.S. president Barack {b}Obama{nb} has received widespread criticism due to his support of government surveillance.",
        "95,108",
        "14857,162",
        "President {b}Obama{nb} had released many statements on mass surveillance as a result.",
        "204,78",
        "15020,142",
        "As a senator , {b}Obama{nb} condemned the Patriot Act for violating the rights of American citizens.",
        "301,93",
        "21680,214",
        "In 2011, {b}Obama{nb} signed a four-year renewal of the Patriot Act, specifically provisions allowing roaming wiretaps and government searches of business records.",
        "656,156",
        "22302,156",
        "{b}Obama{nb} argued that the renewal was needed to protect the United States from terrorist attacks.",
        "813,93",
        "22459,93",
        "{b}Obama{nb} also received criticism for his reversal on privacy protection.",
        "1054,69",
        "22834,69",
        "{b}Obama{nb} initially defended NSA mass surveillance programs when they were first leaked.",
        "1500,84",
        "24242,84",
        "Following Snowden's admittance to leaking classified documents regarding national surveillance, {b}Obama{nb} attempted to ignore the issue of NSA surveillance.",
        "1752,152",
        "24656,152",
        "It was speculated that {b}Obama{nb} did this to avoid complicating the Department of Justice investigation into Snowden.",
        "1905,113",
        "24809,213"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "24,5,117,5,214,5,316,5,665,5,813,5,1054,5,1500,5,1848,5,1928,5,2036,5,2177,5,2812,5,2882,5,3063,5,3180,5,3353,5,3971,5,4445,5,4634,5,5348,5,5604,5,6231,5,6431,5,6618,5,6877,5,7102,5,7446,5,7579,5,8163,5,8482,5,9593,5,10174,5,10660,5,13208,5;14766,5,14929,5,15030,5,21764,5,22311,5,22459,5,22834,5,24242,5,24752,5,24832,5,25214,5,25355,5,26817,5,28384,5,28565,5,29275,5,29749,5,31044,5,31862,5,32299,5,33596,5,34750,5,35842,5,36227,5,36589,5,37473,5,38185,5,38638,5,38771,5,40255,5,40943,5,43608,5,44207,5,44701,5,49545,5"
          },
          {
            "partname": "tables",
            "data": "13259,5;211632,5"
          },
          {
            "partname": "title",
            "data": "13332,5;211785,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Barack Obama on mass surveillance",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-30 08:18:06",
      "indexationtime": "2020-09-02 06:47:26",
      "version": "YS7z59zdomjyDiCuGLUmGg==",
      "size": 211496,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Barack_Obama_on_mass_surveillance",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "CHRIS FARRELL",
          "display": "Chris Farrell"
        },
        {
          "value": "JAMES COMEY",
          "display": "James Comey"
        },
        {
          "value": "SUSAN RICE",
          "display": "Susan Rice"
        },
        {
          "value": "ANGELA MERKEL",
          "display": "Angela Merkel"
        },
        {
          "value": "DIANNE FEINSTEIN",
          "display": "Dianne Feinstein"
        },
        {
          "value": "EDWARD SNOWDEN",
          "display": "Edward Snowden"
        },
        {
          "value": "MIKE ROGERS",
          "display": "Mike Rogers"
        },
        {
          "value": "PETER KING",
          "display": "Peter King"
        },
        {
          "value": "THOMAS OPPERMANN",
          "display": "Thomas Oppermann"
        },
        {
          "value": "RAND PAUL",
          "display": "Rand Paul"
        }
      ],
      "company": [
        {
          "value": "FACEBOOK",
          "display": "Facebook"
        },
        {
          "value": "GOOGLE",
          "display": "Google"
        },
        {
          "value": "YAHOO!",
          "display": "Yahoo!"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "GERMANY",
          "display": "Germany"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "EUROPEAN UNION",
          "display": "European Union"
        },
        {
          "value": "UNITED KINGDOM",
          "display": "United Kingdom"
        },
        {
          "value": "BRAZIL",
          "display": "Brazil"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "RUSSIA",
          "display": "Russia"
        }
      ],
      "wordcount": 1396,
      "exacthash": "bS8E/9z0NHwrapiIzT0w2w==",
      "nearhash": "OV5LcOYwt2HhnjhwKNZz2w==",
      "partnamelocations": [
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        },
        {
          "value": "event",
          "display": "event"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Barack_Obama_on_mass_surveillance",
      "sourcecsv1": [
        "External video"
      ],
      "sourcecsv2": [
        "Barack_Obama",
        "Mass_surveillance",
        "United_States_Senate",
        "Patriot_Act",
        "Top_secret",
        "Leak_(news)",
        "Edward_Snowden",
        "National_Security_Agency",
        "United_States_Department_of_Justice",
        "YouTube",
        "Google",
        "Facebook",
        "Yahoo",
        "Mozilla",
        "Rand_Paul",
        "Fourth_Amendment_to_the_United_States_Constitution",
        "Fourth_Amendment_Restoration_Act",
        "Dianne_Feinstein",
        "Mike_Rogers_(Michigan_politician)",
        "Peter_T._King",
        "ACLU",
        "Dilma_Rousseff",
        "Der_Spiegel",
        "European_Union",
        "Electronic_Frontier_Foundation",
        "The_Day_We_Fight_Back",
        "FISA_Improvements_Act",
        "Foreign_Intelligence_Surveillance_Act",
        "ZDF",
        "Germany%E2%80%93United_States_relations",
        "Thomas_Oppermann",
        "Social_Democratic_Party_of_Germany",
        "Angela_Merkel",
        "United_States_Foreign_Intelligence_Surveillance_Court",
        "American_Civil_Liberties_Union",
        "Sprint_Corporation",
        "Classified_information#Top_Secret_.28TS.29",
        "Judicial_Watch",
        "Aftermath_of_the_global_surveillance_disclosure",
        "Political_positions_of_Barack_Obama",
        "The_New_York_Times",
        "Los_Angeles_Times",
        "NBC_News",
        "Huffington_Post",
        "The_Washington_Post",
        "The_Local",
        "The_Wall_Street_Journal",
        "Mainz",
        "Washington,_D.C.",
        "List_of_Presidents_of_the_United_States",
        "President_of_the_United_States",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "Early_life_and_career_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention",
        "United_States_Senate_career_of_Barack_Obama",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "2009_Nobel_Peace_Prize",
        "West_Wing_Week",
        "Presidency_of_Barack_Obama",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "Second_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Obama_Doctrine",
        "Patient_Protection_and_Affordable_Care_Act",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Barack_Obama_Presidential_Center",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Electoral_history_of_Barack_Obama",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2008_Democratic_Party_presidential_primaries",
        "2012_Democratic_Party_presidential_primaries",
        "Barack_Obama_2008_presidential_primary_campaign",
        "2008_Democratic_National_Convention",
        "2012_Democratic_National_Convention",
        "Barack_Obama_2008_presidential_campaign",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "2008_United_States_presidential_election",
        "Barack_Obama_2012_presidential_campaign",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "2012_United_States_presidential_election",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Family_of_Barack_Obama",
        "Michelle_Obama",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Public_image_of_Barack_Obama",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "George_W._Bush",
        "Donald_Trump",
        "Book:Barack_Obama"
      ],
      "sourcestr1": "Barack_Obama_on_mass_surveillance",
      "sourcestr2": "Q17083171",
      "sourcevarchar3": "[{\"External video\":[\"President Obama speech on global surveillance, January 17, 2014\",\"on\",\"YouTube\"]}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/President_Obama_speaks_on_U.S._intelligence_programs_2014-01-17.webm/1200px--President_Obama_speaks_on_U.S._intelligence_programs_2014-01-17.webm.jpg",
      "sourcedouble1": 0.012897,
      "entity1": [
        {
          "value": "0",
          "display": "0"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "17",
          "display": "17"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "702",
          "display": "702"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2015",
          "display": "2015"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "2017",
          "display": "2017"
        },
        {
          "value": "18",
          "display": "18"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "28",
          "display": "28"
        },
        {
          "value": "2003",
          "display": "2003"
        },
        {
          "value": "2016",
          "display": "2016"
        }
      ],
      "date": [
        {
          "value": "2014-01-17",
          "display": "2014-01-17"
        },
        {
          "value": "2017-04-28",
          "display": "2017-04-28"
        },
        {
          "value": "2014-03-25",
          "display": "2014-03-25"
        },
        {
          "value": "2015-06-01",
          "display": "2015-06-01"
        },
        {
          "value": "2017-05-24",
          "display": "2017-05-24"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        }
      ],
      "entity13": [
        {
          "value": "DIRECTOR",
          "display": "Director"
        }
      ],
      "entity14": [
        {
          "value": "SHARES",
          "display": "Shares"
        }
      ],
      "person_cooc": [
        {
          "value": "(DIRECTOR)#(CHRIS FARRELL)",
          "display": "(Director)#(Chris Farrell)"
        },
        {
          "value": "(DIRECTOR)#(JAMES COMEY)",
          "display": "(Director)#(James Comey)"
        }
      ],
      "rank": 6,
      "displayTitle": "Barack <span class=\"match-highlight\">Obama</span> on mass surveillance",
      "relevantExtracts": "President <b>Obama </b>addresses NSA ... U.S. president Barack <b>Obama </b>has received ... President <b>Obama </b>had released ... a senator , <b>Obama </b>condemned ... In 2011, <b>Obama </b>signed ... <b>Obama </b>argued ... <b>Obama </b>also ... <b>Obama </b>initially ... regarding national surveillance, <b>Obama </b>attempted ... was speculated that <b>Obama </b>did "
    },
    {
      "id": "/Web/Wikipedia/|2004_Democratic_National_Convention_keynote_address",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.974599,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "{b}Obama{nb} points to the Kansas delegation while giving his address",
        "2,62",
        "7332,104",
        "The keynote address at the 2004 Democratic National Convention (DNC) was given by then Illinois State Senator , United States senatorial candidate, and future President Barack {b}Obama{nb} on the night of Tuesday, July 27, 2004, in Boston, Massachusetts .",
        "66,248",
        "7458,619",
        "{b}Obama{nb} first met Democratic presidential candidate John Kerry in the spring of 2004, and was one of several names considered for the role of keynote speaker at the party's convention that summer.",
        "695,194",
        "9137,244",
        "{b}Obama{nb} was told in early July 2004 that he was chosen to deliver the address, and he largely wrote the speech himself, with later edits from the Kerry presidential campaign .",
        "890,173",
        "9382,298",
        "Delivered on the second night of the DNC in just under 20 minutes, the address included both a biographical sketch of {b}Obama{nb}, his own vision of America, and the reasons for his support of Kerry for the presidency.",
        "1064,212",
        "9681,217",
        "In 1996, {b}Obama{nb} was first elected to the Illinois Senate by that state's 13th District, and he would go on to hold that seat for eight years .",
        "1689,141",
        "18528,306",
        "The Democratic presidential primary in Illinois was held that March 16, and later that spring {b}Obama{nb} had his first opportunity to meet the soon to be nominated Democratic presidential candidate John Kerry , doing two joint Chicago campaign stops that left Kerry impressed.",
        "1978,271",
        "19234,632",
        "Corrigan's friend, Lisa Hay, knew {b}Obama{nb} from their time together working on the Harvard Law Review and strongly recommended him.",
        "2687,128",
        "21429,194",
        "Cahill had previously seen {b}Obama{nb} in a photo in TIME and began asking for opinions from people who knew and had worked with him.",
        "2816,127",
        "21738,192",
        "Although there were some internal worries about his style of speaking, lack of experience with a teleprompter, opposition to the Iraq War that Kerry initially supported, and the fact that he was only a state senator, they eventually chose {b}Obama{nb} over the other finalist, Jennifer Granholm, in part because polls showed Kerry with less support among African-Americans than Democrats normally enjoyed and because he was running for an important Senate seat.",
        "2944,454",
        "21932,536"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "2,5,242,5,695,5,890,5,1182,5,1698,5,2072,5,2721,5,2843,5,3183,5,3423,5,3518,5,3602,5,3951,5,4105,5,4310,5,4701,5,4892,5,5522,5,5718,5,5830,5,6360,5,6700,5,6768,5,6897,5,7101,5,7199,5,8046,5,8445,5,8602,5,9270,5,9426,5,9549,5,9636,5,10036,5,10146,5,10723,5,10853,5,11108,5,11507,5,11943,5,12575,5,12999,5,13089,5,13350,5,14962,5,15377,5,15562,5,15726,5,15771,5,16769,5,16879,5,17735,5,17941,5,18136,5,18202,5,18337,5,18426,5,18711,5,19066,5,19393,5,20116,5,20333,5,20633,5,20693,5,20705,5,20823,5,21111,5,21301,5,22142,5,22274,5,22511,5,22677,5,22899,5,23793,5,24108,5,24255,5,24506,5,24672,5,24862,5,25070,5,25220,5,25445,5,25643,5;7332,5,7910,5,9137,5,9382,5,9804,5,18537,5,19500,5,21463,5,21765,5,22253,5,22754,5,22973,5,23199,5,23963,5,25982,5,26475,5,27072,5,27339,5,28449,5,28646,5,28900,5,29967,5,31143,5,31212,5,31471,5,32331,5,32685,5,35064,5,35693,5,36122,5,37214,5,37370,5,38648,5,38736,5,39575,5,39821,5,40632,5,41561,5,42270,5,43256,5,44040,5,44789,5,45214,5,45310,5,45713,5,47714,5,49045,5,49287,5,49590,5,49692,5,51883,5,51993,5,53901,5,54510,5,54972,5,55038,5,56079,5,56362,5,57060,5,58073,5,58987,5,60129,5,60610,5,61355,5,61415,5,61427,5,61545,5,62525,5,62937,5,64072,5,64260,5,64751,5,64969,5,65192,5,67241,5,68792,5,69212,5,69590,5,69945,5,70211,5,70637,5,70838,5,71063,5,209098,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "2004 Democratic National Convention keynote address",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 15:55:02",
      "indexationtime": "2020-09-02 09:49:42",
      "version": "NDkRqEi/ybAplOXNli51/g==",
      "size": 305624,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "2004_Democratic_National_Convention_keynote_address",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "JOHN KERRY",
          "display": "John Kerry"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "JENNIFER GRANHOLM",
          "display": "Jennifer Granholm"
        },
        {
          "value": "ALAN KEYES",
          "display": "Alan Keyes"
        },
        {
          "value": "ARNOLD SCHWARZENEGGER",
          "display": "Arnold Schwarzenegger"
        },
        {
          "value": "ARTUR DAVIS",
          "display": "Artur Davis"
        },
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "BRIAN WILLIAMS",
          "display": "Brian Williams"
        },
        {
          "value": "CHRIS MATTHEWS",
          "display": "Chris Matthews"
        },
        {
          "value": "COLIN POWELL",
          "display": "Colin Powell"
        },
        {
          "value": "DAVID A. FRANK",
          "display": "David A. Frank"
        },
        {
          "value": "DAVID BROOKS",
          "display": "David Brooks"
        },
        {
          "value": "DICK DURBIN",
          "display": "Dick Durbin"
        },
        {
          "value": "DOUGLAS BRINKLEY",
          "display": "Douglas Brinkley"
        },
        {
          "value": "EMIL JONES",
          "display": "Emil Jones"
        },
        {
          "value": "HENDRIK HERTZBERG",
          "display": "Hendrik Hertzberg"
        },
        {
          "value": "HOWARD FINEMAN",
          "display": "Howard Fineman"
        },
        {
          "value": "JEFF GREENFIELD",
          "display": "Jeff Greenfield"
        },
        {
          "value": "JIMMY CARTER",
          "display": "Jimmy Carter"
        },
        {
          "value": "JOHN EDWARDS",
          "display": "John Edwards"
        }
      ],
      "company": [
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        }
      ],
      "geo": [
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "ILLINOIS",
          "display": "Illinois"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "MASSACHUSETTS",
          "display": "Massachusetts"
        },
        {
          "value": "CHICAGO",
          "display": "Chicago"
        },
        {
          "value": "NEW YORK",
          "display": "New York"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "ALABAMA",
          "display": "Alabama"
        },
        {
          "value": "JOHNSON",
          "display": "Johnson"
        },
        {
          "value": "KENYA",
          "display": "Kenya"
        },
        {
          "value": "SPRINGFIELD",
          "display": "Springfield"
        },
        {
          "value": "UNITED KINGDOM",
          "display": "United Kingdom"
        },
        {
          "value": "RICHMOND",
          "display": "Richmond"
        },
        {
          "value": "VIRGINIA",
          "display": "Virginia"
        },
        {
          "value": "KANSAS",
          "display": "Kansas"
        }
      ],
      "wordcount": 2661,
      "exacthash": "/qGr2ou/38G2zzkBIOaK5Q==",
      "nearhash": "CxuDMDd6JbK6/LWBKX7Mvw==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "title",
          "display": "title"
        },
        {
          "value": "job",
          "display": "job"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/2004_Democratic_National_Convention_keynote_address",
      "sourcecsv2": [
        "Kansas",
        "Illinois_Senate",
        "United_States_Senate",
        "President_of_the_United_States",
        "Barack_Obama",
        "Boston,_Massachusetts",
        "United_States_Senate_election_in_Illinois,_2004",
        "Democratic_Party_(United_States)",
        "Dreams_from_My_Father",
        "Keynote",
        "John_Kerry",
        "John_Kerry_presidential_campaign,_2004",
        "List_of_United_States_over-the-air_television_networks",
        "PBS",
        "United_States_cable_news",
        "C-SPAN",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_United_States_presidential_election",
        "Democratic_Party_(United_States)_presidential_primaries,_2004",
        "Mary_Beth_Cahill",
        "2004_Democratic_National_Convention",
        "Jennifer_Granholm",
        "Janet_Napolitano",
        "Tom_Vilsack",
        "Mark_Warner",
        "Bill_Richardson",
        "Jack_Corrigan_(lawyer)",
        "Robert_Shrum",
        "Harvard_Law_Review",
        "TIME",
        "Opposition_to_the_Iraq_War",
        "Independence_Day_(United_States)",
        "Hope_(painting)",
        "Springfield,_Illinois",
        "The_Audacity_of_Hope",
        "Jeremiah_Wright",
        "Richmond,_Virginia",
        "George_Frederic_Watts",
        "TD_Garden",
        "Boston",
        "Massachusetts",
        "Meet_the_Press",
        "Tim_Russert",
        "Face_the_Nation",
        "Late_Edition_with_Wolf_Blitzer",
        "Good_Morning_America",
        "2003_invasion_of_Iraq",
        "Iraq_Resolution",
        "Michelle_Obama",
        "National_Public_Radio",
        "Harold_Ford",
        "Boston_Harbor",
        "Martin_Nesbitt",
        "Teleprompter",
        "Boston_Bruins",
        "Boston_Celtics",
        "Speechwriter",
        "Jon_Favreau_(speechwriter)",
        "Eastern_Time_Zone",
        "Keep_On_Pushing_(song)",
        "The_Impressions",
        "Dick_Durbin",
        "Early_life_and_career_of_Barack_Obama",
        "Family_of_Barack_Obama",
        "Barack_Obama,_Sr.",
        "Stanley_Armour_Dunham",
        "George_S._Patton",
        "World_War_II",
        "Madelyn_Dunham",
        "Sasha_and_Malia_Obama",
        "United_States_Declaration_of_Independence",
        "Spin_(public_relations)",
        "Attack_ad",
        "Red_States_and_Blue_States",
        "Brian_Williams",
        "MSNBC",
        "Chris_Matthews",
        "Pat_Buchanan",
        "Public_Broadcasting_Service",
        "David_Brooks_(journalist)",
        "Mark_Shields",
        "Jimmy_Carter",
        "Hendrik_Hertzberg",
        "Mario_Cuomo",
        "Baylor_University",
        "Tom_Brokaw",
        "CNN",
        "Jeff_Greenfield",
        "Howard_Fineman",
        "Rice_University",
        "Douglas_Brinkley",
        "Chicago_Tribune",
        "The_Washington_Times",
        "The_Independent",
        "African_American_candidates_for_president_of_the_United_States",
        "Colin_Powell",
        "Kenya",
        "Daily_Nation",
        "Family_of_Barack_Obama#Extended_family_-_paternal_relations",
        "The_Christian_Science_Monitor",
        "Michael_Madigan",
        "Richard_M._Daley",
        "Emil_Jones",
        "Rod_Blagojevich",
        "Carol_Moseley_Braun",
        "New_York_(state)",
        "Hillary_Clinton",
        "2008_Democratic_Party_presidential_primaries",
        "United_States_Secretary_of_State",
        "Alabama",
        "Artur_Davis",
        "American_Behavioral_Scientist",
        "California",
        "Arnold_Schwarzenegger",
        "2004_Republican_National_Convention",
        "Robert_Rowland",
        "American_Dream",
        "Ronald_Reagan",
        "Individualism",
        "Communitarianism",
        "University_of_Oregon",
        "Al_Sharpton",
        "Stereotypes_of_African_Americans",
        "List_of_ethnic_slurs",
        "Variety_(magazine)",
        "American_Broadcasting_Company",
        "CBS",
        "NBC",
        "Chicago",
        "Fox_News",
        "Teresa_Heinz-Kerry",
        "Jet_(magazine)",
        "Alan_Keyes",
        "Barack_Obama_2008_presidential_campaign",
        "2008_United_States_presidential_election",
        "Mitt_Romney",
        "ISBN_(identifier)",
        "Wayback_Machine",
        "Chicago_(magazine)",
        "Doi_(identifier)",
        "ISSN_(identifier)",
        "LexisNexis",
        "Wikisource",
        "List_of_Presidents_of_the_United_States",
        "List_of_United_States_Senators_from_Illinois",
        "United_States_Senate_career_of_Barack_Obama",
        "Political_positions_of_Barack_Obama",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "2009_Nobel_Peace_Prize",
        "West_Wing_Week",
        "Presidency_of_Barack_Obama",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "Second_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Obama_Doctrine",
        "Patient_Protection_and_Affordable_Care_Act",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Barack_Obama_Presidential_Center",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Electoral_history_of_Barack_Obama",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2012_Democratic_Party_presidential_primaries",
        "Barack_Obama_2008_presidential_primary_campaign",
        "2008_Democratic_National_Convention",
        "2012_Democratic_National_Convention",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Barack_Obama_2012_presidential_campaign",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "2012_United_States_presidential_election",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Public_image_of_Barack_Obama",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "George_W._Bush",
        "Donald_Trump",
        "Book:Barack_Obama"
      ],
      "sourcestr1": "2004_Democratic_National_Convention_keynote_address",
      "sourcestr2": "Q4602699",
      "sourcevarchar3": "[]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/en/0/0e/2004_DNC_keynote.png",
      "sourcedouble1": 0.009833,
      "entity1": [
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2004",
          "display": "2004"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "8",
          "display": "8"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "2006",
          "display": "2006"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "17",
          "display": "17"
        },
        {
          "value": "2000",
          "display": "2000"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "27",
          "display": "27"
        },
        {
          "value": "10300000",
          "display": "10300000"
        },
        {
          "value": "9100000",
          "display": "9100000"
        },
        {
          "value": "100",
          "display": "100"
        },
        {
          "value": "1964",
          "display": "1964"
        },
        {
          "value": "1984",
          "display": "1984"
        },
        {
          "value": "2005",
          "display": "2005"
        },
        {
          "value": "2012",
          "display": "2012"
        }
      ],
      "date": [
        {
          "value": "2005-01-04",
          "display": "2005-01-04"
        },
        {
          "value": "2008-11-04",
          "display": "2008-11-04"
        },
        {
          "value": "2012-11-06",
          "display": "2012-11-06"
        },
        {
          "value": "2004-07-27",
          "display": "2004-07-27"
        }
      ],
      "entity3": [
        {
          "value": "21:45",
          "display": "21:45"
        },
        {
          "value": "01:30",
          "display": "01:30"
        }
      ],
      "entity12": [
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "DEATH",
          "display": "Death"
        }
      ],
      "entity13": [
        {
          "value": "DIRECTOR",
          "display": "Director"
        }
      ],
      "entity14": [
        {
          "value": "DEBT",
          "display": "Debt"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        },
        {
          "value": "CONTRACT",
          "display": "Contract"
        }
      ],
      "rank": 7,
      "displayTitle": "2004 Democratic National Convention keynote address",
      "relevantExtracts": "<b>Obama </b>points to ... future President Barack <b>Obama </b>on the ... <b>Obama </b>first met ... <b>Obama </b>was told ... biographical sketch of <b>Obama</b>, his ... In 1996, <b>Obama </b>was first ... later that spring <b>Obama </b>had his ... Lisa Hay, knew <b>Obama </b>from their ... had previously seen <b>Obama </b>in ... they eventually chose <b>Obama </b>over "
    },
    {
      "id": "/Web/Wikipedia/|2009_Nobel_Peace_Prize",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.973653,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "U.S. President Barack {b}Obama{nb} receiving the 2009 Nobel Peace Prize",
        "2,64",
        "30355,64",
        "The 2009 Nobel Peace Prize was awarded to United States President Barack {b}Obama{nb} for his \"extraordinary efforts to strengthen international diplomacy and cooperation between people\".",
        "68,180",
        "30441,297",
        "{b}Obama{nb} accepted the prize in Oslo on December 10, 2009.",
        "654,54",
        "31905,54",
        "{b}Obama{nb} is the fourth President of the United States to have won the Nobel Peace Prize (after Theodore Roosevelt , Woodrow Wilson and Jimmy Carter , with Carter's honor happening after leaving office).",
        "990,199",
        "32539,517",
        "Nominations for the 2009 Nobel Peace Prize closed just 11 days after {b}Obama{nb} took office.",
        "1326,87",
        "38736,87",
        "We are awarding {b}Obama{nb} for what he has done in the past year.",
        "2599,60",
        "41763,60",
        "And we are hoping this may contribute a little bit for what he is trying to do,\" noting that he hoped the award would assist {b}Obama{nb}'s foreign policy efforts.",
        "2660,156",
        "41824,156",
        "The New York Times reported that Jagland shrugged off the question of whether \"the committee feared being labeled naïve for accepting a young politician's promises at face value\", stating that \"no one could deny that 'the international climate' had suddenly improved, and that Mr. {b}Obama{nb} was the main reason...",
        "3117,309",
        "42680,314",
        "Barack {b}Obama{nb} with Thorbjørn Jagland at the 2009 Nobel Peace Prize ceremony.",
        "3480,75",
        "43933,146",
        "{b}Obama{nb} was the fourth U.S. President to be awarded the Nobel Peace Prize , after Theodore Roosevelt (1906) and Woodrow Wilson (1919)—both of whom received the award during their terms—and Jimmy Carter (2002), who received the award 21 years after leaving office.",
        "3557,261",
        "44101,506"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "24,5,141,5,326,5,431,5,654,5,990,5,1395,5,2615,5,2785,5,2871,5,2999,5,3398,5,3487,5,3557,5,4038,5,4393,5,4400,5,4545,5,4893,5,6551,5,6736,5,7410,5,7790,5,7908,5,8382,5,8449,5,9281,5,9610,5,9779,5,10507,5,11232,5,11406,5,11735,5,12470,5,12697,5,13017,5,13265,5,13416,5,13610,5,13682,5,14094,5,14845,5,14902,5,14969,5,15087,5,15289,5,15693,5,15799,5,16007,5,16152,5,16496,5,16578,5,17194,5,17352,5,17606,5,18088,5,18128,5,18424,5,19139,5,19565,5,19747,5,20195,5,20684,5,20846,5,21005,5,21413,5,22118,5,22164,5,22310,5,22518,5,22711,5,22897,5,23377,5,23416,5,23578,5,23778,5,24325,5,24504,5,24809,5,24876,5,25413,5,25588,5;30377,5,30627,5,31020,5,31389,5,31905,5,32539,5,38805,5,41779,5,41949,5,42091,5,42432,5,42966,5,43940,5,44101,5,45117,5,45935,5,45956,5,46294,5,46777,5,49111,5,49714,5,51861,5,52795,5,52913,5,53595,5,53662,5,56044,5,56677,5,56976,5,57980,5,59254,5,59628,5,60224,5,61970,5,62507,5,63013,5,64063,5,64423,5,64946,5,65351,5,66399,5,67666,5,67723,5,67790,5,68025,5,68625,5,69314,5,69671,5,70164,5,70566,5,71276,5,71529,5,72806,5,73253,5,73690,5,74604,5,74762,5,75497,5,76773,5,77424,5,78419,5,79278,5,80531,5,80816,5,81027,5,81873,5,84811,5,84877,5,85081,5,85829,5,86262,5,86742,5,87811,5,87850,5,88019,5,88548,5,89867,5,90173,5,90669,5,90736,5,348537,5,349224,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "2009 Nobel Peace Prize",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-30 16:40:52",
      "indexationtime": "2020-09-02 02:37:59",
      "version": "NDoA/mbqlSZ0Xw+Zoc8WQQ==",
      "size": 517359,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "2009_Nobel_Peace_Prize",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "JIMMY CARTER",
          "display": "Jimmy Carter"
        },
        {
          "value": "MORGAN TSVANGIRAI",
          "display": "Morgan Tsvangirai"
        },
        {
          "value": "JOHN BOLTON",
          "display": "John Bolton"
        },
        {
          "value": "MICHAEL GERSON",
          "display": "Michael Gerson"
        },
        {
          "value": "PETER BEINART",
          "display": "Peter Beinart"
        },
        {
          "value": "REINHOLD NIEBUHR",
          "display": "Reinhold Niebuhr"
        },
        {
          "value": "THOMAS L. FRIEDMAN",
          "display": "Thomas L. Friedman"
        },
        {
          "value": "PIEDAD CORDOBA",
          "display": "Piedad Córdoba"
        },
        {
          "value": "SIMA SAMAR",
          "display": "Sima Samar"
        },
        {
          "value": "THEODORE ROOSEVELT",
          "display": "Theodore Roosevelt"
        },
        {
          "value": "WOODROW WILSON",
          "display": "Woodrow Wilson"
        },
        {
          "value": "AL GORE",
          "display": "Al Gore"
        },
        {
          "value": "AUNG SAN",
          "display": "Aung San"
        },
        {
          "value": "ALEXANDER DOWNER",
          "display": "Alexander Downer"
        },
        {
          "value": "ANDREW SULLIVAN",
          "display": "Andrew Sullivan"
        },
        {
          "value": "ANGELA MERKEL",
          "display": "Angela Merkel"
        },
        {
          "value": "ANN ALTHOUSE",
          "display": "Ann Althouse"
        },
        {
          "value": "ANWAR AL-AWLAKI",
          "display": "Anwar al-Awlaki"
        }
      ],
      "company": [
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        },
        {
          "value": "CARTERS",
          "display": "Carters"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "AFGHANISTAN",
          "display": "Afghanistan"
        },
        {
          "value": "NORWAY",
          "display": "Norway"
        },
        {
          "value": "OSLO",
          "display": "Oslo"
        },
        {
          "value": "MIDDLE EAST",
          "display": "Middle East"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "AUSTRALIA",
          "display": "Australia"
        },
        {
          "value": "EUROPE",
          "display": "Europe"
        },
        {
          "value": "IRAN",
          "display": "Iran"
        },
        {
          "value": "ZIMBABWE",
          "display": "Zimbabwe"
        },
        {
          "value": "LATIN AMERICA",
          "display": "Latin America"
        },
        {
          "value": "NORTH KOREA",
          "display": "North Korea"
        },
        {
          "value": "SOUTH AFRICA",
          "display": "South Africa"
        },
        {
          "value": "AFRICA",
          "display": "Africa"
        },
        {
          "value": "ASIA",
          "display": "Asia"
        },
        {
          "value": "INDONESIA",
          "display": "Indonesia"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "IRELAND",
          "display": "Ireland"
        },
        {
          "value": "PAKISTAN",
          "display": "Pakistan"
        },
        {
          "value": "POLAND",
          "display": "Poland"
        }
      ],
      "wordcount": 2725,
      "exacthash": "QigH1Bhr0IGhq4qOr7zObg==",
      "nearhash": "yFusTz90N2LIoQhigWVFXg==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/2009_Nobel_Peace_Prize",
      "sourcecsv1": [
        "2009 Nobel Peace Prize"
      ],
      "sourcecsv2": [
        "2008_Nobel_Peace_Prize",
        "Nobel_Peace_Prize",
        "2010_Nobel_Peace_Prize",
        "Barack_Obama",
        "Political_positions_of_Barack_Obama",
        "Electoral_history_of_Barack_Obama",
        "Early_life_and_career_of_Barack_Obama",
        "Family_of_Barack_Obama",
        "Public_image_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "United_States_Senate_career_of_Barack_Obama",
        "Presidency_of_Barack_Obama",
        "Timeline_of_the_Barack_Obama_presidency",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Obama_Doctrine",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_2008_presidential_campaign",
        "2008_United_States_presidential_election",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Patient_Protection_and_Affordable_Care_Act",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Barack_Obama_2012_presidential_campaign",
        "2012_United_States_presidential_election",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Second_inauguration_of_Barack_Obama",
        "Immigration_reform_in_the_United_States#Obama&#39",
        "s_executive_actions_of_November_2014",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "Barack_Obama_Presidential_Center",
        "Obama_Foundation",
        "One_America_Appeal",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "United_States",
        "Norwegian_Nobel_Committee",
        "Nuclear_nonproliferation",
        "Muslim_world",
        "Just_war",
        "President_of_the_United_States",
        "Theodore_Roosevelt",
        "Woodrow_Wilson",
        "Jimmy_Carter",
        "Nobel_Committee",
        "Piedad_C%C3%B3rdoba",
        "Sima_Samar",
        "Hu_Jia_(activist)",
        "Morgan_Tsvangirai",
        "Parliament_of_Norway",
        "Norwegian_Labor_Party",
        "Socialist_Left_Party_(Norway)",
        "Conservative_Party_of_Norway",
        "Progress_Party_(Norway)",
        "Thorbj%C3%B8rn_Jagland",
        "Secretary_General_of_the_Council_of_Europe",
        "A_New_Beginning",
        "Islam",
        "Cairo",
        "Nuclear_proliferation",
        "Climate_change",
        "Charles_G._Dawes",
        "Austen_Chamberlain",
        "Al_Gore",
        "Intergovernmental_Panel_on_Climate_Change",
        "%C3%93scar_Arias",
        "Aung_San_Suu_Kyi",
        "White_House_Rose_Garden",
        "Lyndon_Johnson",
        "Medal_of_Freedom",
        "Reinhold_Niebuhr",
        "Swedish_kronor",
        "Fisher_House_Foundation",
        "Clinton_Bush_Haiti_Fund",
        "College_Summit",
        "Posse_Foundation",
        "United_Negro_College_Fund",
        "American_Indian_College_Fund",
        "Africare",
        "Central_Asia_Institute",
        "The_New_York_Times",
        "Centrebet",
        "Margin_of_error",
        "The_Wall_Street_Journal",
        "Thomas_L._Friedman",
        "Today_(NBC_program)",
        "Matt_Lauer",
        "Jonah_Goldberg",
        "National_Review",
        "Green_Revolution_(Iran)",
        "CounterPunch",
        "Alexander_Cockburn",
        "Peter_Beinart",
        "Daily_Beast",
        "Noam_Chomsky",
        "American_exceptionalism",
        "Michael_Gerson",
        "Commentary_(magazine)",
        "Peter_Wehner",
        "Dan_Balz",
        "Los_Angeles_Times",
        "Ruth_Marcus_(journalist)",
        "Richard_Cohen_(Washington_Post_columnist)",
        "David_Ignatius",
        "Michael_Kinsley",
        "Ann_Althouse",
        "Princeton_University",
        "Slate_(magazine)",
        "Mickey_Kaus",
        "David_Brooks_(journalist)",
        "John_R._Bolton",
        "Michael_Crowley_(journalist)",
        "War_on_Terror",
        "Drone_attacks_in_Pakistan",
        "Nancy_Pelosi",
        "John_McCain",
        "Republican_National_Committee",
        "Michael_Steele",
        "Synovate",
        "Dagbladet",
        "Prime_Minister_of_Norway",
        "Jens_Stoltenberg",
        "Siv_Jensen",
        "Erna_Solberg",
        "Torstein_Dahle",
        "Red_(Norway)",
        "Muhammad_Yunus",
        "Desmond_Tutu",
        "Mairead_Corrigan",
        "Lech_Wa%C5%82%C4%99sa",
        "Solidarity_(Polish_trade_union)",
        "14th_Dalai_Lama",
        "United_Nations_Secretary-General",
        "Ban_Ki-moon",
        "Nicolas_Sarkozy",
        "Prime_minister",
        "Dmitry_Medvedev",
        "Gordon_Brown",
        "Taoiseach",
        "Brian_Cowen",
        "Angela_Merkel",
        "Holy_See",
        "Federico_Lombardi",
        "Fatmir_Sejdiu",
        "Alexander_Downer",
        "Sydney_Peace_Prize",
        "Hamid_Karzai",
        "Taliban",
        "Zabiullah_Mujahid",
        "Nahdlatul_Ulama",
        "Yukio_Hatoyama",
        "Pratibha_Patil",
        "Shimon_Peres",
        "Manouchehr_Mottaki",
        "Cuba",
        "Fidel_Castro",
        "Nicol%C3%A1s_Maduro",
        "Hugo_Ch%C3%A1vez",
        "Mwai_Kibaki",
        "Jacob_Zuma",
        "Ubuntu_(philosophy)",
        "Zulu_language",
        "Bolivia",
        "Evo_Morales",
        "Russian_Liberal_Democratic_Party",
        "Vladimir_Zhirinovsky",
        "2011_Libyan_Civil_War",
        "Anwar_al-Awlaki",
        "Abdulrahman_al-Awlaki",
        "Predator_drones",
        "Oslo_City_Hall",
        "Jon_Favreau_(speechwriter)",
        "Ben_Rhodes_(speechwriter)",
        "Newt_Gingrich",
        "Sarah_Palin",
        "Ross_Douthat",
        "Andrew_Sullivan",
        "Hendrik_Hertzberg",
        "Dennis_Kucinich",
        "Orwellian",
        "Simon_Schama",
        "Cicero",
        "List_of_Nobel_Peace_Prize_laureates",
        "List_of_black_Nobel_Laureates",
        "The_Saturday_Evening_Post",
        "Archive-It",
        "JSTOR_(identifier)",
        "Church_History_(journal)",
        "Doi_(identifier)",
        "George_Packer",
        "The_New_Yorker",
        "ABC_News",
        "The_New_Republic",
        "The_San_Diego_Union-Tribune",
        "R%C3%B8dt",
        "Institute_for_Public_Accuracy",
        "Wayback_Machine",
        "The_Advertiser_(Adelaide)",
        "Wikisource",
        "Executive_Office_of_the_President_of_the_United_States",
        "List_of_members_of_the_Norwegian_Nobel_Committee",
        "Norwegian_Nobel_Institute",
        "Nobel_Peace_Center",
        "Nobel_Peace_Prize_Concert",
        "Oslo_Spektrum",
        "World_Summit_of_Nobel_Peace_Laureates",
        "List_of_Nobel_laureates",
        "2001_Nobel_Peace_Prize",
        "2002_Nobel_Peace_Prize",
        "2003_Nobel_Peace_Prize",
        "2004_Nobel_Peace_Prize",
        "2005_Nobel_Peace_Prize",
        "2006_Nobel_Peace_Prize",
        "2007_Nobel_Peace_Prize",
        "2011_Nobel_Peace_Prize",
        "2012_Nobel_Peace_Prize",
        "2013_Nobel_Peace_Prize",
        "2014_Nobel_Peace_Prize",
        "2015_Nobel_Peace_Prize",
        "2016_Nobel_Peace_Prize",
        "2017_Nobel_Peace_Prize",
        "2018_Nobel_Peace_Prize",
        "2019_Nobel_Peace_Prize",
        "2020_Nobel_Peace_Prize",
        "Henry_Dunant",
        "Fr%C3%A9d%C3%A9ric_Passy",
        "%C3%89lie_Ducommun",
        "Charles_Albert_Gobat",
        "Randal_Cremer",
        "Institut_de_Droit_International",
        "Bertha_von_Suttner",
        "Ernesto_Teodoro_Moneta",
        "Louis_Renault_(jurist)",
        "Klas_Pontus_Arnoldson",
        "Fredrik_Bajer",
        "Auguste_Beernaert",
        "Paul_Henri_Balluet_d%27Estournelles_de_Constant",
        "International_Peace_Bureau",
        "Tobias_Asser",
        "Alfred_Hermann_Fried",
        "Elihu_Root",
        "Henri_La_Fontaine",
        "International_Committee_of_the_Red_Cross",
        "L%C3%A9on_Bourgeois",
        "Hjalmar_Branting",
        "Christian_Lous_Lange",
        "Fridtjof_Nansen",
        "Aristide_Briand",
        "Gustav_Stresemann",
        "Ferdinand_Buisson",
        "Ludwig_Quidde",
        "Frank_B._Kellogg",
        "Nathan_S%C3%B6derblom",
        "Jane_Addams",
        "Nicholas_Murray_Butler",
        "Norman_Angell",
        "Arthur_Henderson",
        "Carl_von_Ossietzky",
        "Carlos_Saavedra_Lamas",
        "Robert_Cecil,_1st_Viscount_Cecil_of_Chelwood",
        "Nansen_International_Office_for_Refugees",
        "Cordell_Hull",
        "Emily_Greene_Balch",
        "John_Mott",
        "Quaker_Peace_and_Social_Witness",
        "American_Friends_Service_Committee",
        "John_Boyd_Orr",
        "Ralph_Bunche",
        "L%C3%A9on_Jouhaux",
        "Albert_Schweitzer",
        "George_Marshall",
        "United_Nations_High_Commissioner_for_Refugees",
        "Lester_B._Pearson",
        "Dominique_Pire",
        "Philip_Noel-Baker",
        "Albert_Lutuli",
        "Dag_Hammarskj%C3%B6ld",
        "Linus_Pauling",
        "International_Federation_of_Red_Cross_and_Red_Crescent_Societies",
        "Martin_Luther_King_Jr.",
        "UNICEF",
        "Ren%C3%A9_Cassin",
        "International_Labour_Organization",
        "Norman_Borlaug",
        "Willy_Brandt",
        "L%C3%AA_%C4%90%E1%BB%A9c_Th%E1%BB%8D",
        "Henry_Kissinger",
        "Se%C3%A1n_MacBride",
        "Eisaku_Sat%C5%8D",
        "Andrei_Sakharov",
        "Betty_Williams_(peace_activist)",
        "Mairead_Maguire",
        "Amnesty_International",
        "Anwar_Sadat",
        "Menachem_Begin",
        "Mother_Teresa",
        "Adolfo_P%C3%A9rez_Esquivel",
        "Alva_Myrdal",
        "Alfonso_Garc%C3%ADa_Robles",
        "International_Physicians_for_the_Prevention_of_Nuclear_War",
        "Elie_Wiesel",
        "United_Nations_peacekeeping",
        "Mikhail_Gorbachev",
        "Rigoberta_Mench%C3%BA",
        "Nelson_Mandela",
        "F._W._de_Klerk",
        "Yitzhak_Rabin",
        "Yasser_Arafat",
        "Pugwash_Conferences_on_Science_and_World_Affairs",
        "Joseph_Rotblat",
        "Carlos_Filipe_Ximenes_Belo",
        "Jos%C3%A9_Ramos-Horta",
        "International_Campaign_to_Ban_Landmines",
        "Jody_Williams",
        "John_Hume",
        "David_Trimble",
        "M%C3%A9decins_Sans_Fronti%C3%A8res",
        "Kim_Dae-jung",
        "United_Nations",
        "Kofi_Annan",
        "Shirin_Ebadi",
        "Wangari_Maathai",
        "International_Atomic_Energy_Agency",
        "Mohamed_ElBaradei",
        "Grameen_Bank",
        "Martti_Ahtisaari",
        "Liu_Xiaobo",
        "Ellen_Johnson_Sirleaf",
        "Leymah_Gbowee",
        "Tawakkol_Karman",
        "European_Union",
        "Organisation_for_the_Prohibition_of_Chemical_Weapons",
        "Kailash_Satyarthi",
        "Malala_Yousafzai",
        "Tunisian_National_Dialogue_Quartet",
        "Juan_Manuel_Santos",
        "International_Campaign_to_Abolish_Nuclear_Weapons",
        "Denis_Mukwege",
        "Nadia_Murad",
        "Abiy_Ahmed",
        "Nobel_Prize",
        "Nobel_Prize_in_Chemistry",
        "Venki_Ramakrishnan",
        "Thomas_A._Steitz",
        "Ada_Yonath",
        "Nobel_Prize_in_Literature",
        "Herta_M%C3%BCller",
        "Nobel_Prize_in_Physics",
        "Charles_K._Kao",
        "Willard_Boyle",
        "George_E._Smith",
        "Nobel_Prize_in_Physiology_or_Medicine",
        "Elizabeth_Blackburn",
        "Carol_W._Greider",
        "Jack_W._Szostak",
        "Nobel_Memorial_Prize_in_Economic_Sciences",
        "Elinor_Ostrom",
        "Oliver_E._Williamson",
        "List_of_Presidents_of_the_United_States",
        "United_States_Senate",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "2004_Democratic_National_Convention",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "West_Wing_Week",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2008_Democratic_Party_presidential_primaries",
        "2012_Democratic_Party_presidential_primaries",
        "2008_Democratic_National_Convention",
        "2012_Democratic_National_Convention",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "Michelle_Obama",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "George_W._Bush",
        "Donald_Trump",
        "Book:Barack_Obama"
      ],
      "sourcestr1": "2009_Nobel_Peace_Prize",
      "sourcestr2": "Q3231462",
      "sourcestr3": "Q35637",
      "sourcestr4": "Nobel Peace Prize",
      "sourcevarchar3": "[{\"2009 Nobel Peace Prize\":[\"\\u2190\",\"2008\",\"Nobel Peace Prize\",\"2010\",\"\\u2192\"]}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/5/5e/President_Barack_Obama_with_the_Nobel_Prize_medal_and_diploma.jpg",
      "sourcedouble1": 0.024574,
      "entity1": [
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "9",
          "display": "9"
        },
        {
          "value": "36",
          "display": "36"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "29",
          "display": "29"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "8",
          "display": "8"
        },
        {
          "value": "10000",
          "display": "10000"
        },
        {
          "value": "10000000",
          "display": "10000000"
        },
        {
          "value": "1400000",
          "display": "1400000"
        },
        {
          "value": "18",
          "display": "18"
        },
        {
          "value": "19",
          "display": "19"
        },
        {
          "value": "1976",
          "display": "1976"
        },
        {
          "value": "1983",
          "display": "1983"
        },
        {
          "value": "20000",
          "display": "20000"
        },
        {
          "value": "2006",
          "display": "2006"
        },
        {
          "value": "2008",
          "display": "2008"
        }
      ],
      "date": [
        {
          "value": "2009-10-09",
          "display": "2009-10-09"
        },
        {
          "value": "2009-12-10",
          "display": "2009-12-10"
        },
        {
          "value": "2009-09-29",
          "display": "2009-09-29"
        }
      ],
      "entity4": [
        {
          "value": "USD 1400000",
          "display": "USD 1400000"
        },
        {
          "value": "USD 100000",
          "display": "USD 100000"
        },
        {
          "value": "USD 125000",
          "display": "USD 125000"
        },
        {
          "value": "USD 200000",
          "display": "USD 200000"
        },
        {
          "value": "USD 250000",
          "display": "USD 250000"
        }
      ],
      "entity12": [
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "DEATH",
          "display": "Death"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        },
        {
          "value": "DIRECTOR",
          "display": "Director"
        }
      ],
      "entity14": [
        {
          "value": "DEBT",
          "display": "Debt"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(AL GORE)",
          "display": "(Vice-President)#(Al Gore)"
        },
        {
          "value": "(DIRECTOR)#(STUART REES)",
          "display": "(Director)#(Stuart Rees)"
        },
        {
          "value": "(VICE-PRESIDENT)#(CHARLES DAWES)",
          "display": "(Vice-President)#(Charles Dawes)"
        }
      ],
      "company_person": [
        {
          "value": "(NEW YORK TIMES)#(OBAMA)",
          "display": "(New York Times)#(Obama)"
        },
        {
          "value": "(NEW YORK TIMES)#(THOMAS L. FRIEDMAN)",
          "display": "(New York Times)#(Thomas L. Friedman)"
        },
        {
          "value": "(WASHINGTON POST)#(DAVID IGNATIUS)",
          "display": "(Washington Post)#(David Ignatius)"
        },
        {
          "value": "(WASHINGTON POST)#(MICHAEL KINSLEY)",
          "display": "(Washington Post)#(Michael Kinsley)"
        },
        {
          "value": "(WASHINGTON POST)#(RICHARD COHEN)",
          "display": "(Washington Post)#(Richard Cohen)"
        },
        {
          "value": "(WASHINGTON POST)#(RUTH MARCUS)",
          "display": "(Washington Post)#(Ruth Marcus)"
        },
        {
          "value": "(NEW YORK TIMES)#(DAVID BROOKS)",
          "display": "(New York Times)#(David Brooks)"
        },
        {
          "value": "(NEW YORK TIMES)#(JOHN BOLTON)",
          "display": "(New York Times)#(John Bolton)"
        },
        {
          "value": "(NEW YORK TIMES)#(MICKEY KAUS)",
          "display": "(New York Times)#(Mickey Kaus)"
        },
        {
          "value": "(NEW YORK TIMES)#(MORGAN TSVANGIRAI)",
          "display": "(New York Times)#(Morgan Tsvangirai)"
        },
        {
          "value": "(NEW YORK TIMES)#(PIEDAD CORDOBA)",
          "display": "(New York Times)#(Piedad Córdoba)"
        },
        {
          "value": "(NEW YORK TIMES)#(ROSS DOUTHAT)",
          "display": "(New York Times)#(Ross Douthat)"
        },
        {
          "value": "(NEW YORK TIMES)#(SIMA SAMAR)",
          "display": "(New York Times)#(Sima Samar)"
        },
        {
          "value": "(WASHINGTON POST)#(DAN BALZ)",
          "display": "(Washington Post)#(Dan Balz)"
        },
        {
          "value": "(WASHINGTON POST)#(MICHAEL GERSON)",
          "display": "(Washington Post)#(Michael Gerson)"
        },
        {
          "value": "(CARTERS)#(JIMMY CARTER)",
          "display": "(Carters)#(Jimmy Carter)"
        },
        {
          "value": "(CARTERS)#(THEODORE ROOSEVELT)",
          "display": "(Carters)#(Theodore Roosevelt)"
        },
        {
          "value": "(CARTERS)#(WOODROW WILSON)",
          "display": "(Carters)#(Woodrow Wilson)"
        },
        {
          "value": "(WASHINGTON POST)#(THOMAS L. FRIEDMAN)",
          "display": "(Washington Post)#(Thomas L. Friedman)"
        }
      ],
      "rank": 8,
      "displayTitle": "2009 Nobel Peace Prize",
      "relevantExtracts": "U.S. President Barack <b>Obama </b>receiving the 2009 ... States President Barack <b>Obama </b>for his ... <b>Obama </b>accepted the ... <b>Obama </b>is the ... 11 days after <b>Obama </b>... We are awarding <b>Obama </b>for what ... award would assist <b>Obama</b>&#39;s ... and that Mr. <b>Obama </b>was ... Barack <b>Obama </b>with Thorbj&#248;rn ... <b>Obama </b>was the "
    },
    {
      "id": "/Web/Wikipedia/|2008_United_States_presidential_election",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.973094,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "The Democratic ticket of Barack {b}Obama{nb} , the junior U.S. Senator from Illinois , and Joe Biden , the senior U.S. Senator from Delaware , defeated the Republican ticket of John McCain , the senior Senator from Arizona , and Sarah Palin , the Governor of Alaska .",
        "131,260",
        "70089,1340",
        "{b}Obama{nb} became the first African American ever to be elected to the presidency as well as being only the third sitting United States Senator elected president, joining Warren G. Harding and John F. Kennedy .",
        "392,205",
        "71430,392",
        "The Democratic primaries were marked by a sharp contest between {b}Obama{nb} and the initial front-runner, Senator Hillary Clinton .",
        "878,125",
        "72696,324",
        "After a long primary season, {b}Obama{nb} secured the Democratic nomination in June 2008.",
        "1121,82",
        "73347,82",
        "McCain supported the war, as well as a troop surge that had begun in 2007, while {b}Obama{nb} strongly opposed the war.",
        "1281,112",
        "73648,198",
        "{b}Obama{nb} campaigned on the theme that \" Washington must change,\" while McCain emphasized his experience.",
        "1534,101",
        "74086,162",
        "{b}Obama{nb} won a decisive victory over McCain, winning the Electoral College and the popular vote by a sizable margin, including states that had not voted for the Democratic presidential candidate since 1976 (North Carolina) and 1964 (Indiana and Virginia).",
        "1883,252",
        "74971,558",
        "{b}Obama{nb} received the largest share of the popular vote won by a Democrat since Lyndon B. Johnson in 1964 and was the first Democrat to win an outright majority of the popular vote since Jimmy Carter in 1976 .",
        "2136,206",
        "75530,707",
        "As of the 2016 presidential election {b}Obama{nb}'s total count of 69.5 million votes still stands as the largest tally ever won by a presidential candidate.",
        "2343,150",
        "76238,529",
        "{b}Obama{nb} flipped nine states that had voted Republican in 2004 :",
        "2494,61",
        "76768,170"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "163,5,392,5,942,5,1150,5,1362,5,1534,5,1883,5,2136,5,2380,5,2494,5,4495,5,5760,5,6415,5,6564,5,6754,5,6945,5,7123,5,7933,5,8546,5,8757,5,9196,5,9573,5,9762,5,9894,5,10594,5,10803,5,10934,5,11018,5,11126,5,11631,5,13041,5,13417,5,13635,5,14192,5,19473,5,20634,5,23136,5,23154,5,23598,5,24051,5,24464,5,25312,5,26306,5,26615,5,27292,5,27349,5,27794,5,28079,5,28169,5,28559,5,28740,5,28900,5,30262,5,31397,5,32236,5,32874,5,33958,5,34596,5,34939,5,35141,5,35894,5,36196,5,36346,5,38133,5,38690,5,38747,5,38797,5,39021,5,39909,5,40001,5,40189,5,40276,5,40374,5,42122,5,42321,5,42537,5,43604,5,44057,5,44231,5,44459,5,44767,5,45463,5,45601,5,45728,5,45794,5,46394,5,46527,5,46819,5,47052,5,47184,5,47854,5,48093,5,48343,5,48584,5,48636,5,48860,5,49024,5,49273,5,49330,5,49494,5,49633,5,50108,5,50126,5,50464,5,50561,5,50928,5,51005,5,51132,5,51158,5,51444,5,52333,5,53310,5,53515,5,53738,5,53825,5,54040,5,58304,5,59059,5,59195,5,59581,5,59709,5,59771,5,69411,5,70348,5,70455,5,71116,5,71465,5,71635,5,71782,5,72319,5,72598,5,72795,5,75741,5,75966,5,76196,5,76522,5,76856,5,76932,5,77081,5,77891,5,78165,5,78482,5,78949,5,79144,5,79398,5,79588,5,79970,5,80499,5,80609,5,80721,5,80828,5,80871,5,80939,5,81052,5;70265,5,71430,5,72900,5,73376,5,73815,5,74086,5,74971,5,75530,5,76654,5,76768,5,132031,5,151864,5,153664,5,154436,5,154754,5,155161,5,155720,5,157307,5,160051,5,160505,5,162009,5,164112,5,164547,5,164830,5,165837,5,166046,5,167058,5,167142,5,167484,5,168457,5,172026,5,172486,5,173006,5,173914,5,217677,5,220905,5,238941,5,238959,5,239615,5,240131,5,241111,5,242602,5,248986,5,249349,5,250132,5,250195,5,250640,5,251870,5,252059,5,252689,5,252870,5,253147,5,254928,5,257337,5,258568,5,259323,5,261495,5,262380,5,263118,5,263321,5,265673,5,267029,5,267722,5,276122,5,278467,5,278532,5,278653,5,278935,5,282778,5,282870,5,283147,5,283234,5,283458,5,287865,5,288598,5,288934,5,290873,5,292128,5,292422,5,292650,5,293381,5,295442,5,295654,5,295921,5,296151,5,297527,5,297723,5,298486,5,299015,5,299267,5,303951,5,304858,5,306126,5,307428,5,307955,5,308903,5,309264,5,310524,5,310581,5,310745,5,311065,5,312930,5,312968,5,314441,5,314851,5,315717,5,315794,5,316030,5,316056,5,317788,5,319993,5,321630,5,321835,5,322178,5,322431,5,323789,5,332719,5,338165,5,341869,5,343943,5,344201,5,344661,5,378751,5,382561,5,382668,5,387688,5,390466,5,390636,5,390803,5,392055,5,393624,5,394526,5,416641,5,417471,5,417821,5,418695,5,419724,5,419800,5,420189,5,422254,5,422648,5,423559,5,424596,5,424990,5,425521,5,425717,5,426292,5,427501,5,427739,5,427975,5,428767,5,428936,5,429110,5,429517,5"
          }
        ]
      },
      "groupcount": 2,
      "title": "2008 United States presidential election",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 02:05:50",
      "indexationtime": "2020-09-01 21:15:11",
      "version": "6rMuWCDLX36gFMu6dGK/RQ==",
      "size": 1177266,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "2008_United_States_presidential_election",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "JOHN MCCAIN",
          "display": "John McCain"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "GEORGE W. BUSH",
          "display": "George W. Bush"
        },
        {
          "value": "CYNTHIA MCKINNEY",
          "display": "Cynthia McKinney"
        },
        {
          "value": "BOB BARR",
          "display": "Bob Barr"
        },
        {
          "value": "RON PAUL",
          "display": "Ron Paul"
        },
        {
          "value": "CHUCK BALDWIN",
          "display": "Chuck Baldwin"
        },
        {
          "value": "RALPH NADER",
          "display": "Ralph Nader"
        },
        {
          "value": "SARAH PALIN",
          "display": "Sarah Palin"
        },
        {
          "value": "JOE BIDEN",
          "display": "Joe Biden"
        },
        {
          "value": "ALAN KEYES",
          "display": "Alan Keyes"
        },
        {
          "value": "MIKE HUCKABEE",
          "display": "Mike Huckabee"
        },
        {
          "value": "JOHN EDWARDS",
          "display": "John Edwards"
        },
        {
          "value": "JOHN KERRY",
          "display": "John Kerry"
        },
        {
          "value": "JIMMY CARTER",
          "display": "Jimmy Carter"
        },
        {
          "value": "MITT ROMNEY",
          "display": "Mitt Romney"
        },
        {
          "value": "BRIAN MOORE",
          "display": "Brian Moore"
        },
        {
          "value": "DARRELL CASTLE",
          "display": "Darrell Castle"
        },
        {
          "value": "FRED THOMPSON",
          "display": "Fred Thompson"
        }
      ],
      "company": [
        {
          "value": "FACEBOOK",
          "display": "Facebook"
        },
        {
          "value": "LEHMAN BROTHERS",
          "display": "Lehman Brothers"
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        },
        {
          "value": "NORTH CAROLINA",
          "display": "North Carolina"
        },
        {
          "value": "COLORADO",
          "display": "Colorado"
        },
        {
          "value": "NEBRASKA",
          "display": "Nebraska"
        },
        {
          "value": "OHIO",
          "display": "Ohio"
        },
        {
          "value": "INDIANA",
          "display": "Indiana"
        },
        {
          "value": "VIRGINIA",
          "display": "Virginia"
        },
        {
          "value": "IOWA",
          "display": "Iowa"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "PENNSYLVANIA",
          "display": "Pennsylvania"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "ARIZONA",
          "display": "Arizona"
        },
        {
          "value": "TEXAS",
          "display": "Texas"
        },
        {
          "value": "GEORGIA",
          "display": "Georgia"
        },
        {
          "value": "NEW YORK",
          "display": "New York"
        },
        {
          "value": "MICHIGAN",
          "display": "Michigan"
        },
        {
          "value": "MONTANA",
          "display": "Montana"
        },
        {
          "value": "NEW HAMPSHIRE",
          "display": "New Hampshire"
        }
      ],
      "wordcount": 9534,
      "exacthash": "xKK795eEUF5IRFlddFqk3Q==",
      "nearhash": "cA7bhGTZWkRH015ETGkc2Q==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/2008_United_States_presidential_election",
      "sourcecsv1": [
        "538 members of the Electoral College 270 electoral votes needed to win",
        "Turnout"
      ],
      "sourcecsv2": [
        "2008_United_States_elections",
        "2004_United_States_presidential_election",
        "2012_United_States_presidential_election",
        "United_States_Electoral_College",
        "Nationwide_opinion_polling_for_the_2008_United_States_presidential_election",
        "Percentage_point",
        "Barack_Obama",
        "John_McCain",
        "Democratic_Party_(United_States)",
        "Republican_Party_(United_States)",
        "Illinois",
        "Arizona",
        "Joe_Biden",
        "Sarah_Palin",
        "Washington,_D.C.",
        "Nebraska%27s_2nd_congressional_district",
        "Electoral_votes",
        "President_of_the_United_States",
        "George_W._Bush",
        "Timeline_of_the_2008_United_States_presidential_election",
        "2008_United_States_presidential_debates",
        "Statewide_opinion_polling_for_the_2008_United_States_presidential_election",
        "Political_parties_in_the_United_States",
        "2008_Democratic_Party_presidential_candidates",
        "2008_Democratic_Party_presidential_debates_and_forums",
        "2008_Democratic_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2008_Democratic_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2008_Democratic_Party_presidential_primaries",
        "Results_of_the_2008_Democratic_Party_presidential_primaries",
        "Barack_Obama_2008_presidential_campaign",
        "2008_Democratic_National_Convention",
        "List_of_Democratic_Party_superdelegates,_2008",
        "2008_Republican_Party_presidential_candidates",
        "2008_Republican_Party_presidential_debates_and_forums",
        "2008_Republican_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2008_Republican_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2008_Republican_Party_presidential_primaries",
        "Results_of_the_2008_Republican_Party_presidential_primaries",
        "John_McCain_2008_presidential_campaign",
        "2008_Republican_National_Convention",
        "Third_party_(United_States)",
        "Libertarian_Party_(United_States)",
        "2008_Libertarian_National_Convention",
        "Green_Party_of_the_United_States",
        "Green_Party_presidential_primaries,_2008",
        "2008_Green_National_Convention",
        "Constitution_Party_(United_States)",
        "United_States_third_party_and_independent_presidential_candidates,_2008",
        "2008_United_States_House_of_Representatives_elections",
        "2008_United_States_Senate_elections",
        "2008_United_States_gubernatorial_elections",
        "Vice_President_of_the_United_States",
        "2008_Democratic_Party_vice_presidential_candidate_selection",
        "2008_Republican_Party_vice_presidential_candidate_selection",
        "United_States_presidential_election",
        "List_of_United_States_Senators_from_Illinois",
        "List_of_United_States_Senators_from_Delaware",
        "Delaware",
        "List_of_United_States_Senators_from_Arizona",
        "List_of_Governors_of_Alaska",
        "Alaska",
        "African_Americans",
        "Warren_G._Harding",
        "John_F._Kennedy",
        "Term_limit",
        "Twenty-second_Amendment_to_the_United_States_Constitution",
        "Republican_Party_presidential_primaries,_2008",
        "Mitt_Romney",
        "Mike_Huckabee",
        "Democratic_Party_presidential_primaries,_2008",
        "Hillary_Clinton",
        "New_Hampshire_primary",
        "Iraq_War",
        "Public_image_of_George_W._Bush",
        "Iraq_War_troop_surge_of_2007",
        "Financial_crisis_of_2007%E2%80%932008",
        "Electoral_College_(United_States)",
        "List_of_United_States_presidential_elections_by_popular_vote_margin",
        "Lyndon_B._Johnson",
        "1964_United_States_presidential_election",
        "Jimmy_Carter",
        "1976_United_States_presidential_election",
        "2016_United_States_presidential_election",
        "2008_United_States_presidential_election_in_Colorado",
        "2008_United_States_presidential_election_in_Florida",
        "2008_United_States_presidential_election_in_Indiana",
        "2008_United_States_presidential_election_in_Iowa",
        "2008_United_States_presidential_election_in_Nevada",
        "2008_United_States_presidential_election_in_New_Mexico",
        "2008_United_States_presidential_election_in_North_Carolina",
        "2008_United_States_presidential_election_in_Ohio",
        "2008_United_States_presidential_election_in_Virginia",
        "2008_United_States_presidential_election_in_Nebraska",
        "Incumbent",
        "Article_Two_of_the_United_States_Constitution",
        "Natural-born-citizen_clause",
        "Primary_election",
        "Indirect_election",
        "Governor_of_Texas",
        "Twentieth_Amendment_to_the_United_States_Constitution",
        "Eastern_Time_Zone",
        "Bill_Clinton",
        "George_H._W._Bush",
        "Political_positions_of_Barack_Obama",
        "Electoral_history_of_Barack_Obama",
        "Early_life_and_career_of_Barack_Obama",
        "Family_of_Barack_Obama",
        "Public_image_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "United_States_Senate_career_of_Barack_Obama",
        "Presidency_of_Barack_Obama",
        "Timeline_of_the_Barack_Obama_presidency",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Obama_Doctrine",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Patient_Protection_and_Affordable_Care_Act",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Barack_Obama_2012_presidential_campaign",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Second_inauguration_of_Barack_Obama",
        "Immigration_reform_in_the_United_States#Obama&#39",
        "s_executive_actions_of_November_2014",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "Barack_Obama_Presidential_Center",
        "Obama_Foundation",
        "One_America_Appeal",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "2009_Nobel_Peace_Prize",
        "U.S._senator",
        "John_Edwards",
        "Bill_Richardson",
        "Chris_Dodd",
        "Mike_Gravel",
        "Dennis_Kucinich",
        "Tom_Vilsack",
        "United_States_Senate",
        "New_York_(state)",
        "North_Carolina",
        "List_of_Governors_of_New_Mexico",
        "Governor_of_New_Mexico",
        "New_Mexico",
        "Connecticut",
        "United_States_House_of_Representatives",
        "Ohio%27s_10th_congressional_district",
        "Governor_of_Iowa",
        "Hillary_Clinton_2008_presidential_campaign",
        "John_Edwards_2008_presidential_campaign",
        "Bill_Richardson_2008_presidential_campaign",
        "Joe_Biden_2008_presidential_campaign",
        "Chris_Dodd_2008_presidential_campaign",
        "Mike_Gravel_2008_presidential_campaign",
        "Dennis_Kucinich_2008_presidential_campaign",
        "Tom_Vilsack_2008_presidential_campaign",
        "United_States_midterm_election,_2006",
        "United_States_Congress",
        "Al_Gore",
        "2000_United_States_presidential_election",
        "John_Kerry",
        "Running_mate",
        "Evan_Bayh",
        "Independent_(voter)",
        "Christopher_Dodd",
        "The_Vancouver_Sun",
        "Saint_Anselm_College",
        "American_Broadcasting_Company",
        "Facebook",
        "Super_Tuesday,_2008",
        "United_States_presidential_primary",
        "California_Democratic_primary,_2008",
        "Hispanic_and_Latino_Americans",
        "Louisiana",
        "Nebraska_Democratic_caucuses,_2008",
        "Hawaii_Democratic_caucuses,_2008",
        "Wisconsin_Democratic_primary,_2008",
        "United_States_Virgin_Islands_Democratic_territorial_convention,_2008",
        "Washington_Democratic_caucuses,_2008",
        "Ohio_Democratic_primary,_2008",
        "Rhode_Island_Democratic_primary,_2008",
        "Texas_Democratic_primary_and_caucuses,_2008",
        "Pennsylvania_Democratic_primary,_2008",
        "NPR",
        "North_Carolina_Democratic_primary,_2008",
        "Indiana_Democratic_primary,_2008",
        "Proportional_representation",
        "Associated_Press",
        "1952_United_States_presidential_election",
        "1928_United_States_presidential_election",
        "1896_United_States_presidential_election",
        "Cabinet_of_the_United_States",
        "1920_United_States_presidential_election",
        "Political_positions_of_John_McCain",
        "Electoral_history_of_John_McCain",
        "Early_life_and_military_career_of_John_McCain",
        "Cultural_and_political_image_of_John_McCain",
        "House_and_Senate_career_of_John_McCain,_until_2000",
        "United_States_Senate_career_of_John_McCain,_2001%E2%80%932014",
        "John_McCain_2000_presidential_campaign",
        "2000_Republican_Party_presidential_primaries",
        "United_States_2008_presidential_election",
        "Governor_of_Alaska",
        "Ron_Paul",
        "Rudy_Giuliani",
        "Fred_Thompson",
        "Governor_of_Massachusetts",
        "List_of_governors_of_Arkansas",
        "U.S._House_of_Representatives",
        "Texas",
        "Mayor_of_New_York_City",
        "Tennessee",
        "Mitt_Romney_2008_presidential_campaign",
        "Mike_Huckabee_2008_presidential_campaign",
        "Ron_Paul_2008_presidential_campaign",
        "Rudy_Giuliani_2008_presidential_campaign",
        "Fred_Thompson_2008_presidential_campaign",
        "Alan_Keyes",
        "Duncan_L._Hunter",
        "Tom_Tancredo",
        "Sam_Brownback",
        "Jim_Gilmore",
        "Assistant_Secretary_of_State_for_International_Organization_Affairs",
        "California",
        "Colorado",
        "Kansas",
        "Governor_of_Virginia",
        "Alan_Keyes_2008_presidential_campaign",
        "Duncan_L._Hunter_2008_presidential_campaign",
        "Tom_Tancredo_2008_presidential_campaign",
        "Jim_Gilmore_2008_presidential_campaign",
        "Rudolph_Giuliani",
        "Pro-choice",
        "Abortion",
        "Arkansas",
        "Massachusetts",
        "New_Hampshire_Republican_primary,_2008",
        "South_Carolina_Republican_primary,_2008",
        "Florida_Republican_primary,_2008",
        "Arnold_Schwarzenegger",
        "California_Republican_primary,_2008",
        "District_of_Columbia_Republican_primary,_2008",
        "Kansas_Republican_caucuses,_2008",
        "Wisconsin_Republican_primary,_2008",
        "Washington_Republican_primary,_2008",
        "United_States_Virgin_Islands_Republican_caucuses,_2008",
        "Puerto_Rico_Republican_caucuses,_2008",
        "Texas_Republican_primary,_2008",
        "Ohio_Republican_primary,_2008",
        "Vermont_Republican_primary,_2008",
        "Rhode_Island_Republican_primary,_2008",
        "Third-party_and_independent_candidates_for_the_2008_United_States_presidential_election",
        "Green_Party_(United_States)",
        "Ralph_Nader",
        "Chuck_Baldwin",
        "Darrell_Castle",
        "Sixteenth_Amendment_to_the_United_States_Constitution",
        "Roe_v._Wade",
        "Internal_Revenue_Service",
        "Federal_Reserve_System",
        "Cynthia_McKinney",
        "Rosa_Clemente",
        "Single-payer_health_care",
        "Bob_Barr",
        "Wayne_Allyn_Root",
        "Income_tax_in_the_United_States",
        "USA_PATRIOT_Act",
        "Attorney_at_law_(United_States)",
        "Ralph_Nader_2008_presidential_campaign",
        "Georgia_(U.S._state)",
        "Bob_Barr_2008_presidential_campaign",
        "Pastor",
        "Florida",
        "Chuck_Baldwin_2008_presidential_campaign",
        "Cynthia_McKinney_2008_presidential_campaign",
        "Constitution_Party_National_Convention",
        "Kansas_City,_Missouri",
        "Denver,_Colorado",
        "Chicago,_Illinois",
        "Saint_Paul,_Minnesota",
        "Global_financial_crisis_of_2008%E2%80%932009",
        "World_War_II",
        "David_Petraeus",
        "Hurricane_Gustav",
        "Fairfax,_Virginia",
        "Bob_Dole",
        "Ronald_Reagan",
        "Generation_X",
        "Grand_Canyon",
        "John_Murtha",
        "Cleveland,_Ohio",
        "Wasilla",
        "David_Letterman",
        "Great_Depression",
        "Politico",
        "Bankruptcy_of_Lehman_Brothers",
        "Jacksonville,_Florida",
        "Global_financial_crisis_of_2008",
        "Universal_health_care",
        "United_States_presidential_election_debates,_2008",
        "Commission_on_Presidential_Debates",
        "Bipartisan",
        "University_of_Mississippi",
        "Oxford,_Mississippi",
        "Jim_Lehrer",
        "Washington_University_in_St._Louis",
        "St._Louis,_Missouri",
        "Gwen_Ifill",
        "Belmont_University",
        "Nashville,_Tennessee",
        "Tom_Brokaw",
        "Hofstra_University",
        "Hempstead_(town),_New_York",
        "Bob_Schieffer",
        "Columbia_University",
        "Amy_Goodman",
        "Democracy_Now!",
        "C-SPAN",
        "Fundraising_for_the_2008_United_States_presidential_election",
        "Michael_E._Toner",
        "Federal_Election_Commission",
        "Drill,_baby,_drill",
        "Yes_We_Can_(slogan)",
        "Lipstick_on_a_pig",
        "Grassroots_fundraising",
        "Howard_Dean",
        "Howard_Dean_2004_presidential_campaign",
        "YouTube",
        "MySpace",
        "Twitter",
        "Smear_campaign",
        "Push_poll",
        "Viral_video",
        "Brave_New_Films",
        "Swing_states",
        "Indiana",
        "Ohio",
        "Michigan",
        "Nevada",
        "John_Bohlinger",
        "United_States_House_Committee_on_the_Judiciary",
        "United_States_Department_of_Justice",
        "Texas_Supreme_Court",
        "Marshall_Scholarship",
        "Rhodes_Scholarship",
        "Oxford_University",
        "Pew_Research_Center",
        "Tim_Russert",
        "NBC_News",
        "President_of_Russia",
        "Dmitry_Medvedev",
        "Saturday_Night_Live",
        "Modern_liberalism_in_the_United_States",
        "Illegal_immigrants",
        "ABC_News",
        "Philadelphia,_Pennsylvania",
        "Charles_Gibson",
        "George_Stephanopoulos",
        "Blog",
        "Bosnia_and_Herzegovina",
        "Op-ed",
        "The_New_York_Times",
        "Elizabeth_Edwards",
        "Erica_Jong",
        "Mark_Halperin",
        "Project_for_Excellence_in_Journalism",
        "Harvard_University",
        "Joan_Shorenstein_Center_on_the_Press,_Politics_and_Public_Policy",
        "Center_for_Media_and_Public_Affairs",
        "George_Mason_University",
        "Coordinated_Universal_Time",
        "Election_Day_(United_States)",
        "United_States_presidential_election_in_Illinois,_2008",
        "Northeastern_United_States",
        "United_States_presidential_election_in_Ohio,_2008",
        "United_States_presidential_election_in_Pennsylvania,_2008",
        "Great_Lakes_region",
        "United_States_presidential_election_in_Michigan,_2008",
        "United_States_presidential_election_in_Wisconsin,_2008",
        "United_States_presidential_election_in_Minnesota,_2008",
        "United_States_presidential_election_in_North_Dakota,_2008",
        "United_States_presidential_election_in_South_Dakota,_2008",
        "United_States_presidential_election_in_Nebraska,_2008",
        "United_States_presidential_election_in_Kansas,_2008",
        "United_States_presidential_election_in_Oklahoma,_2008",
        "United_States_presidential_election_in_Montana,_2008",
        "United_States_presidential_election_in_Utah,_2008",
        "United_States_presidential_election_in_Idaho,_2008",
        "United_States_presidential_election_in_Wyoming,_2008",
        "United_States_presidential_election_in_Arizona,_2008",
        "United_States_presidential_election_in_Florida,_2008",
        "United_States_presidential_election_in_North_Carolina,_2008",
        "United_States_presidential_election_in_Virginia,_2008",
        "United_States_presidential_election_in_Iowa,_2008",
        "United_States_presidential_election_in_New_Mexico,_2008",
        "1936_United_States_presidential_election",
        "United_States_presidential_election_in_Indiana,_2008",
        "1972_United_States_presidential_election",
        "CNN",
        "Fox_News",
        "West_Coast_of_the_United_States",
        "United_States_presidential_election_in_California,_2008",
        "United_States_presidential_election_in_Oregon,_2008",
        "United_States_presidential_election_in_Washington,_2008",
        "United_States_presidential_election_in_Alaska,_2008",
        "United_States_presidential_election_in_Hawaii,_2008",
        "Phoenix,_Arizona",
        "Grant_Park_(Chicago)",
        "Chicago",
        "Barack_Obama_election_victory_speech,_2008",
        "Cartogram",
        "Swing_state",
        "Philadelphia",
        "Houston,_Texas",
        "Las_Vegas,_Nevada",
        "Miami",
        "Columbus,_Ohio",
        "Detroit",
        "Boston",
        "Los_Angeles",
        "Portland,_Oregon",
        "San_Francisco",
        "Denver",
        "Atlanta",
        "Madison,_Wisconsin",
        "New_York_City",
        "London",
        "Bonn",
        "Berlin",
        "Obama,_Japan",
        "Toronto",
        "Rio_de_Janeiro",
        "Sydney",
        "Nairobi",
        "Virginia",
        "Missouri_bellwether",
        "Missouri",
        "Voter_turnout",
        "1968_United_States_presidential_election",
        "Voting_age",
        "1960_United_States_presidential_election",
        "American_University",
        "Ballot_access",
        "Gloria_La_Riva",
        "Party_for_Socialism_and_Liberation",
        "Brian_Moore_(political_activist)",
        "Socialist_Party_USA",
        "Brian_Moore_presidential_campaign,_2008",
        "R%C3%B3ger_Calero",
        "Socialist_Workers_Party_(United_States)",
        "Charles_Jay",
        "Boston_Tea_Party_(political_party)",
        "Thomas_Stevens_(politician)",
        "Objectivist_Party",
        "Gene_Amondson",
        "Prohibition_Party",
        "New_Party_(United_States)",
        "New_American_Independent_Party",
        "We_the_People_Foundation",
        "Jeff_Boss",
        "Ted_Weill",
        "Reform_Party_of_the_United_States_of_America",
        "Bradford_Lyttle",
        "United_States_Pacifist_Party",
        "Santa_Claus",
        "Mickey_Mouse",
        "1992_United_States_presidential_election",
        "United_States_Democratic_Party",
        "John_Sidney_McCain",
        "United_States_Republican_Party",
        "Sarah_Louise_Palin",
        "Independent_(politics)",
        "Matt_Gonzalez",
        "Wiley_Drake",
        "2008_United_States_presidential_election_in_Alabama",
        "2008_United_States_presidential_election_in_Alaska",
        "2008_United_States_presidential_election_in_Arizona",
        "2008_United_States_presidential_election_in_Arkansas",
        "2008_United_States_presidential_election_in_California",
        "2008_United_States_presidential_election_in_Connecticut",
        "2008_United_States_presidential_election_in_Delaware",
        "2008_United_States_presidential_election_in_the_District_of_Columbia",
        "2008_United_States_presidential_election_in_Georgia",
        "2008_United_States_presidential_election_in_Hawaii",
        "2008_United_States_presidential_election_in_Idaho",
        "2008_United_States_presidential_election_in_Illinois",
        "2008_United_States_presidential_election_in_Kansas",
        "2008_United_States_presidential_election_in_Kentucky",
        "2008_United_States_presidential_election_in_Louisiana",
        "2008_United_States_presidential_election_in_Maine",
        "2008_United_States_presidential_election_in_Maryland",
        "2008_United_States_presidential_election_in_Massachusetts",
        "2008_United_States_presidential_election_in_Michigan",
        "2008_United_States_presidential_election_in_Minnesota",
        "2008_United_States_presidential_election_in_Mississippi",
        "2008_United_States_presidential_election_in_Missouri",
        "2008_United_States_presidential_election_in_Montana",
        "2008_United_States_presidential_election_in_New_Hampshire",
        "2008_United_States_presidential_election_in_New_Jersey",
        "2008_United_States_presidential_election_in_New_York",
        "2008_United_States_presidential_election_in_North_Dakota",
        "2008_United_States_presidential_election_in_Oklahoma",
        "2008_United_States_presidential_election_in_Oregon",
        "2008_United_States_presidential_election_in_Pennsylvania",
        "2008_United_States_presidential_election_in_Rhode_Island",
        "2008_United_States_presidential_election_in_South_Carolina",
        "2008_United_States_presidential_election_in_South_Dakota",
        "2008_United_States_presidential_election_in_Tennessee",
        "2008_United_States_presidential_election_in_Texas",
        "2008_United_States_presidential_election_in_Utah",
        "2008_United_States_presidential_election_in_Vermont",
        "2008_United_States_presidential_election_in_Washington_(state)",
        "2008_United_States_presidential_election_in_West_Virginia",
        "2008_United_States_presidential_election_in_Wisconsin",
        "2008_United_States_presidential_election_in_Wyoming",
        "Maine%27s_1st_congressional_district",
        "Maine%27s_2nd_congressional_district",
        "Nebraska%27s_1st_congressional_district",
        "Nebraska%27s_3rd_congressional_district",
        "International_reaction_to_the_United_States_presidential_election,_2008",
        "Moderates",
        "Conservatism_in_the_United_States",
        "White_American",
        "African_American",
        "Asian_American",
        "Protestantism",
        "Catholic_Church_in_the_United_States",
        "American_Jews",
        "Irreligion",
        "Christian_right",
        "LGBT",
        "Heterosexuality",
        "Secondary_education_in_the_United_States",
        "Higher_education_in_the_United_States",
        "Postgraduate_education",
        "Labor_unions_in_the_United_States",
        "Veteran",
        "Midwestern_United_States",
        "Southern_United_States",
        "Western_United_States",
        "Somerville,_New_Jersey",
        "Kenya",
        "Luo_(Kenya_and_Tanzania)",
        "Bi-racial",
        "White_Anglo-Saxon_Protestant",
        "Roman_Catholic",
        "William_E._Miller",
        "Sargent_Shriver",
        "Geraldine_Ferraro#1984_vice-presidential_candidacy",
        "Democratic_Party_presidential_primaries,_2004",
        "1940_United_States_presidential_election",
        "Franklin_D._Roosevelt",
        "Henry_A._Wallace",
        "1944_United_States_presidential_election",
        "District_of_Columbia",
        "Maryland",
        "Census_Bureau",
        "1956_United_States_presidential_election",
        "Kentucky",
        "West_Virginia",
        "1916_United_States_presidential_election",
        "Montana",
        "Nebraska",
        "Maine",
        "Omaha",
        "Barack_Obama_religion_conspiracy_theories",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Newspaper_endorsements_in_the_2008_United_States_presidential_election",
        "International_opinion_polling_for_the_2008_United_States_presidential_election",
        "FiveThirtyEight",
        "Shirley_Chisholm",
        "George_McGovern",
        "The_Christian_Science_Monitor",
        "The_Stentor",
        "The_Times",
        "BBC_News",
        "The_Seattle_Times",
        "Bloomberg_L.P.",
        "Mosheh_Oinounou",
        "Fox_News_Channel",
        "The_New_Yorker",
        "University_of_Illinois_at_Springfield",
        "USA_Today",
        "Wayback_Machine",
        "Doi_(identifier)",
        "JSTOR_(identifier)",
        "Forbes",
        "San_Antonio_Express-News",
        "Chuck_Todd",
        "MSNBC",
        "The_Star_(South_Africa)",
        "The_Independent",
        "St._Louis_Post-Dispatch",
        "National_Public_Radio",
        "The_Atlanta_Journal-Constitution",
        "Jesse_Walker",
        "Hendrik_Hertzberg",
        "Los_Angeles_Times",
        "The_Heritage_Foundation",
        "Health_Affairs",
        "New_England_Journal_of_Medicine",
        "St._Petersburg_Times",
        "Kenneth_P._Vogel",
        "The_Politico",
        "New_York_Post",
        "Jacques_Steinberg",
        "Howard_Kurtz",
        "The_Washington_Post",
        "Tucson_Citizen",
        "WLS-TV",
        "San_Francisco_Chronicle",
        "Encyclop%C3%A6dia_Britannica",
        "Curlie",
        "Scientific_American",
        "List_of_candidates_in_the_2008_United_States_presidential_election",
        "Comparison_of_the_2008_United_States_presidential_candidates",
        "Congressional_endorsements_for_the_2008_United_States_presidential_election",
        "Ballot_access_for_the_2008_United_States_presidential_election",
        "2008_United_States_presidential_election_timeline",
        "2008_Super_Tuesday",
        "Potomac_primary",
        "2008_Super_Tuesday_II",
        "International_reactions_to_the_2008_United_States_presidential_election",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Political_positions_of_Joe_Biden",
        "Evan_Bayh_2008_presidential_campaign",
        "Political_positions_of_Hillary_Clinton",
        "List_of_Hillary_Clinton_2008_presidential_campaign_endorsements",
        "Political_positions_of_John_Edwards",
        "Political_positions_of_the_2008_Republican_Party_presidential_primary_candidates",
        "List_of_John_McCain_2008_presidential_campaign_endorsements",
        "Democratic_and_liberal_support_for_John_McCain_in_2008",
        "Vice_presidential_candidacy_of_Sarah_Palin",
        "Political_positions_of_Sarah_Palin",
        "John_H._Cox",
        "Political_positions_of_Rudy_Giuliani",
        "Political_positions_of_Mike_Huckabee",
        "Ray_McKinney",
        "Political_positions_of_Ron_Paul",
        "Political_positions_of_Mitt_Romney",
        "Tommy_Thompson",
        "Tommy_Thompson_2008_presidential_campaign",
        "Draft_(politics)",
        "Mark_Warner",
        "Draft_Mark_Warner_movement",
        "Newt_Gingrich",
        "Condoleezza_Rice",
        "Draft_Condi_movement",
        "Independent_politician",
        "Michael_Bloomberg",
        "Draft_Bloomberg_movement",
        "Daniel_Imperato",
        "Political_positions_of_Cynthia_McKinney",
        "Elaine_Brown",
        "Jesse_Johnson_(West_Virginia_politician)",
        "Kent_Mesplay",
        "Kat_Swift",
        "Political_positions_of_Bob_Barr",
        "Michael_Jingozian",
        "Steve_Kubby",
        "Mary_Ruwart",
        "Doug_Stanhope",
        "Brian_Rohrbough",
        "Tom_Stevens_(politician)",
        "Peace_and_Freedom_Party",
        "Brian_Moore_2008_presidential_campaign",
        "Eugene_Puryear",
        "Stewart_Alexander",
        "Eric_Chester",
        "James_Harris_(Socialist_Workers_Party_politician)",
        "Alyson_Kennedy",
        "Stephen_Colbert_(character)",
        "Stephen_Colbert_2008_presidential_campaign",
        "Earl_Dodge",
        "Frank_Moore_(performance_artist)",
        "Joe_Schriner",
        "Jonathon_Sharkey",
        "2007_United_States_elections",
        "2009_United_States_elections",
        "2008_United_States_Senate_election_in_Alabama",
        "2008_United_States_Senate_election_in_Alaska",
        "2008_United_States_Senate_election_in_Arkansas",
        "2008_United_States_Senate_election_in_Colorado",
        "2008_United_States_Senate_election_in_Delaware",
        "2008_United_States_Senate_election_in_Georgia",
        "2008_United_States_Senate_election_in_Idaho",
        "2008_United_States_Senate_election_in_Illinois",
        "2008_United_States_Senate_election_in_Iowa",
        "2008_United_States_Senate_election_in_Kansas",
        "2008_United_States_Senate_election_in_Kentucky",
        "2008_United_States_Senate_election_in_Louisiana",
        "2008_United_States_Senate_election_in_Maine",
        "2008_United_States_Senate_election_in_Massachusetts",
        "2008_United_States_Senate_election_in_Michigan",
        "2008_United_States_Senate_election_in_Minnesota",
        "2008_United_States_Senate_election_in_Mississippi",
        "2008_United_States_Senate_special_election_in_Mississippi",
        "2008_United_States_Senate_election_in_Montana",
        "2008_United_States_Senate_election_in_Nebraska",
        "2008_United_States_Senate_election_in_New_Hampshire",
        "2008_United_States_Senate_election_in_New_Jersey",
        "2008_United_States_Senate_election_in_New_Mexico",
        "2008_United_States_Senate_election_in_North_Carolina",
        "2008_United_States_Senate_election_in_Oklahoma",
        "2008_United_States_Senate_election_in_Oregon",
        "2008_United_States_Senate_election_in_Rhode_Island",
        "2008_United_States_Senate_election_in_South_Carolina",
        "2008_United_States_Senate_election_in_South_Dakota",
        "2008_United_States_Senate_election_in_Tennessee",
        "2008_United_States_Senate_election_in_Texas",
        "2008_United_States_Senate_election_in_Virginia",
        "2008_United_States_Senate_election_in_West_Virginia",
        "2008_United_States_Senate_election_in_Wyoming",
        "2008_United_States_Senate_special_election_in_Wyoming",
        "2008_United_States_House_of_Representatives_elections_in_Alabama",
        "2008_United_States_House_of_Representatives_election_in_Alaska",
        "2008_United_States_House_of_Representatives_election_in_American_Samoa",
        "2008_United_States_House_of_Representatives_elections_in_Arizona",
        "2008_United_States_House_of_Representatives_elections_in_Arkansas",
        "2008_United_States_House_of_Representatives_elections_in_California",
        "2008_California%27s_12th_congressional_district_special_election",
        "2008_United_States_House_of_Representatives_elections_in_Colorado",
        "2008_United_States_House_of_Representatives_elections_in_Connecticut",
        "2008_United_States_House_of_Representatives_election_in_Delaware",
        "2008_United_States_House_of_Representatives_election_in_the_District_of_Columbia",
        "2008_United_States_House_of_Representatives_elections_in_Florida",
        "2008_United_States_House_of_Representatives_elections_in_Georgia",
        "2008_United_States_House_of_Representatives_election_in_Guam",
        "2008_United_States_House_of_Representatives_elections_in_Hawaii",
        "2008_United_States_House_of_Representatives_elections_in_Idaho",
        "2008_United_States_House_of_Representatives_elections_in_Illinois",
        "2008_Illinois%27s_14th_congressional_district_special_election",
        "2008_United_States_House_of_Representatives_elections_in_Indiana",
        "2008_Indiana%27s_7th_congressional_district_special_election",
        "2008_United_States_House_of_Representatives_elections_in_Iowa",
        "2008_United_States_House_of_Representatives_elections_in_Kansas",
        "2008_United_States_House_of_Representatives_elections_in_Kentucky",
        "2008_United_States_House_of_Representatives_elections_in_Louisiana",
        "2008_Louisiana%27s_1st_congressional_district_special_election",
        "2008_Louisiana%27s_6th_congressional_district_special_election",
        "2008_United_States_House_of_Representatives_elections_in_Maine",
        "2008_United_States_House_of_Representatives_elections_in_Maryland",
        "2008_Maryland%27s_4th_congressional_district_special_election",
        "2008_United_States_House_of_Representatives_elections_in_Massachusetts",
        "2008_United_States_House_of_Representatives_elections_in_Michigan",
        "2008_United_States_House_of_Representatives_elections_in_Minnesota",
        "2008_United_States_House_of_Representatives_elections_in_Mississippi",
        "2008_Mississippi%27s_1st_congressional_district_special_election",
        "2008_United_States_House_of_Representatives_elections_in_Missouri",
        "2008_United_States_House_of_Representatives_election_in_Montana",
        "2008_United_States_House_of_Representatives_elections_in_Nebraska",
        "2008_United_States_House_of_Representatives_elections_in_Nevada",
        "2008_United_States_House_of_Representatives_elections_in_New_Hampshire",
        "2008_United_States_House_of_Representatives_elections_in_New_Jersey",
        "2008_United_States_House_of_Representatives_elections_in_New_Mexico",
        "2008_United_States_House_of_Representatives_elections_in_New_York",
        "2008_United_States_House_of_Representatives_elections_in_North_Carolina",
        "2008_United_States_House_of_Representatives_election_in_North_Dakota",
        "2008_United_States_House_of_Representatives_election_in_the_Northern_Mariana_Islands",
        "2008_United_States_House_of_Representatives_elections_in_Ohio",
        "2008_Ohio%27s_11th_congressional_district_special_election",
        "2008_United_States_House_of_Representatives_elections_in_Oklahoma",
        "2008_United_States_House_of_Representatives_elections_in_Oregon",
        "2008_United_States_House_of_Representatives_elections_in_Pennsylvania",
        "2008_United_States_House_of_Representatives_election_in_Puerto_Rico",
        "2008_United_States_House_of_Representatives_elections_in_Rhode_Island",
        "2008_United_States_House_of_Representatives_elections_in_South_Carolina",
        "2008_United_States_House_of_Representatives_election_in_South_Dakota",
        "2008_United_States_House_of_Representatives_elections_in_Tennessee",
        "2008_United_States_House_of_Representatives_elections_in_Texas",
        "2008_United_States_House_of_Representatives_elections_in_Utah",
        "2008_United_States_House_of_Representatives_election_in_Vermont",
        "2008_United_States_House_of_Representatives_elections_in_Virginia",
        "2008_United_States_House_of_Representatives_election_in_the_United_States_Virgin_Islands",
        "2008_United_States_House_of_Representatives_elections_in_Washington",
        "2008_United_States_House_of_Representatives_elections_in_West_Virginia",
        "2008_United_States_House_of_Representatives_elections_in_Wisconsin",
        "2008_United_States_House_of_Representatives_election_in_Wyoming",
        "2008_American_Samoa_gubernatorial_election",
        "2008_Delaware_gubernatorial_election",
        "2008_Indiana_gubernatorial_election",
        "2008_Missouri_gubernatorial_election",
        "2008_Montana_gubernatorial_election",
        "2008_New_Hampshire_gubernatorial_election",
        "2008_North_Carolina_gubernatorial_election",
        "2008_North_Dakota_gubernatorial_election",
        "2008_Puerto_Rico_gubernatorial_election",
        "2008_Utah_gubernatorial_election",
        "2008_Vermont_gubernatorial_election",
        "2008_Washington_gubernatorial_election",
        "2008_West_Virginia_gubernatorial_election",
        "2008_California_State_Senate_election",
        "2008_Iowa_Senate_election",
        "2008_Massachusetts_House_of_Representatives_election",
        "2008_Massachusetts_Senate_election",
        "2008_Pennsylvania_Attorney_General_election",
        "2008_Pennsylvania_Auditor_General_election",
        "2008_Pennsylvania_State_Treasurer_election",
        "2008_Washington_Attorney_General_election",
        "2008_Washington_Secretary_of_State_election",
        "2008_Bakersfield,_California_mayoral_election",
        "2008_Baton_Rouge_mayoral_election",
        "2008_Fresno_mayoral_election",
        "2008_Irvine_mayoral_election",
        "2008_Mesa_mayoral_election",
        "2008_Milwaukee_mayoral_election",
        "2008_Orlando_mayoral_election",
        "2008_Portland,_Oregon_mayoral_election",
        "2008_Sacramento_mayoral_election",
        "2008_San_Diego_mayoral_election",
        "2008_Scottsdale_mayoral_election",
        "2008_Stockton,_California_mayoral_election",
        "2008_Virginia_Beach_mayoral_election",
        "2008_American_Samoan_general_election",
        "2008_Guamanian_general_election",
        "2008_Illinois_elections",
        "2008_Minnesota_elections",
        "2008_Oklahoma_state_elections",
        "2008_Oregon_state_elections",
        "2008_Pennsylvania_elections",
        "2008_Puerto_Rican_general_election",
        "2008_South_Carolina_elections",
        "2008_United_States_Virgin_Islands_general_election",
        "2008_Vermont_elections",
        "2008_Virginia_elections",
        "1788%E2%80%9389_United_States_presidential_election",
        "1792_United_States_presidential_election",
        "1796_United_States_presidential_election",
        "1800_United_States_presidential_election",
        "1804_United_States_presidential_election",
        "1808_United_States_presidential_election",
        "1812_United_States_presidential_election",
        "1816_United_States_presidential_election",
        "1820_United_States_presidential_election",
        "1824_United_States_presidential_election",
        "1828_United_States_presidential_election",
        "1832_United_States_presidential_election",
        "1836_United_States_presidential_election",
        "1840_United_States_presidential_election",
        "1844_United_States_presidential_election",
        "1848_United_States_presidential_election",
        "1852_United_States_presidential_election",
        "1856_United_States_presidential_election",
        "1860_United_States_presidential_election",
        "1864_United_States_presidential_election",
        "1868_United_States_presidential_election",
        "1872_United_States_presidential_election",
        "1876_United_States_presidential_election",
        "1880_United_States_presidential_election",
        "1884_United_States_presidential_election",
        "1888_United_States_presidential_election",
        "1892_United_States_presidential_election",
        "1900_United_States_presidential_election",
        "1904_United_States_presidential_election",
        "1908_United_States_presidential_election",
        "1912_United_States_presidential_election",
        "1924_United_States_presidential_election",
        "1932_United_States_presidential_election",
        "1948_United_States_presidential_election",
        "1980_United_States_presidential_election",
        "1984_United_States_presidential_election",
        "1988_United_States_presidential_election",
        "1996_United_States_presidential_election",
        "2020_United_States_presidential_election",
        "United_States_presidential_elections_in_Alabama",
        "United_States_presidential_elections_in_Alaska",
        "United_States_presidential_elections_in_Arizona",
        "United_States_presidential_elections_in_Arkansas",
        "United_States_presidential_elections_in_California",
        "United_States_presidential_elections_in_Colorado",
        "United_States_presidential_elections_in_Connecticut",
        "United_States_presidential_elections_in_Delaware",
        "United_States_presidential_elections_in_Florida",
        "United_States_presidential_elections_in_Georgia",
        "United_States_presidential_elections_in_Hawaii",
        "United_States_presidential_elections_in_Idaho",
        "United_States_presidential_elections_in_Illinois",
        "United_States_presidential_elections_in_Indiana",
        "United_States_presidential_elections_in_Iowa",
        "United_States_presidential_elections_in_Kansas",
        "United_States_presidential_elections_in_Kentucky",
        "United_States_presidential_elections_in_Louisiana",
        "United_States_presidential_elections_in_Maine",
        "United_States_presidential_elections_in_Maryland",
        "United_States_presidential_elections_in_Massachusetts",
        "United_States_presidential_elections_in_Michigan",
        "United_States_presidential_elections_in_Minnesota",
        "United_States_presidential_elections_in_Mississippi",
        "United_States_presidential_elections_in_Missouri",
        "United_States_presidential_elections_in_Montana",
        "United_States_presidential_elections_in_Nebraska",
        "United_States_presidential_elections_in_Nevada",
        "United_States_presidential_elections_in_New_Hampshire",
        "United_States_presidential_elections_in_New_Jersey",
        "United_States_presidential_elections_in_New_Mexico",
        "United_States_presidential_elections_in_New_York",
        "United_States_presidential_elections_in_North_Carolina",
        "United_States_presidential_elections_in_North_Dakota",
        "United_States_presidential_elections_in_Ohio",
        "United_States_presidential_elections_in_Oklahoma",
        "United_States_presidential_elections_in_Oregon",
        "List_of_United_States_presidential_elections_in_Pennsylvania",
        "United_States_presidential_elections_in_Rhode_Island",
        "United_States_presidential_elections_in_South_Carolina",
        "United_States_presidential_elections_in_South_Dakota",
        "United_States_presidential_elections_in_Tennessee",
        "United_States_presidential_elections_in_Texas",
        "United_States_presidential_elections_in_Utah",
        "United_States_presidential_elections_in_Vermont",
        "United_States_presidential_elections_in_Virginia",
        "United_States_presidential_elections_in_Washington",
        "United_States_presidential_elections_in_Washington,_D.C.",
        "United_States_presidential_elections_in_West_Virginia",
        "United_States_presidential_elections_in_Wisconsin",
        "United_States_presidential_elections_in_Wyoming",
        "Iowa_caucuses",
        "Nevada_caucuses",
        "South_Carolina_primary",
        "Super_Tuesday",
        "United_States_presidential_nominating_convention",
        "List_of_presidential_nominating_conventions_in_the_United_States",
        "Brokered_convention",
        "Convention_bounce",
        "Superdelegate",
        "Popular_vote_(representative_democracy)",
        "United_States_presidential_election_summary",
        "United_States_presidential_elections_in_which_the_winner_lost_the_popular_vote",
        "List_of_United_States_presidential_elections_by_Electoral_College_margin",
        "List_of_United_States_presidential_election_results_by_state",
        "Electoral_vote_changes_between_United_States_presidential_elections",
        "List_of_people_who_received_an_electoral_vote_in_the_United_States_Electoral_College",
        "Contingent_election",
        "Faithless_elector",
        "Unpledged_elector",
        "Voter_turnout_in_the_United_States_presidential_elections",
        "List_of_U.S._presidential_campaign_slogans",
        "Historical_polling_for_U.S._Presidential_elections",
        "List_of_United_States_major_party_presidential_tickets",
        "List_of_unsuccessful_major_party_candidates_for_President_of_the_United_States",
        "United_States_presidential_debates",
        "October_surprise",
        "Red_states_and_blue_states",
        "Tipping-point_state",
        "Election_recount",
        "United_States_presidential_straw_polls_in_Guam",
        "1973_United_States_vice_presidential_confirmation",
        "1974_United_States_vice_presidential_confirmation",
        "List_of_Presidents_of_the_United_States",
        "Illinois_Senate",
        "2004_Democratic_National_Convention",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "West_Wing_Week",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2012_Democratic_Party_presidential_primaries",
        "2012_Democratic_National_Convention",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "Michelle_Obama",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_presidential_eligibility_litigation",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "Donald_Trump",
        "Book:Barack_Obama",
        "List_of_vice_presidents_of_the_United_States",
        "List_of_United_States_senators_from_Delaware",
        "United_States_Senate_career_of_Joe_Biden",
        "Vice_presidency_of_Joe_Biden",
        "Classified_Information_Procedures_Act",
        "Omnibus_Counterterrorism_Act_of_1995",
        "Violence_Against_Women_Act",
        "Violent_Crime_Control_and_Law_Enforcement_Act",
        "Biden-Sanders_Unity_Task_Forces",
        "Electoral_history_of_Joe_Biden",
        "1972_United_States_Senate_election_in_Delaware",
        "1978_United_States_Senate_election_in_Delaware",
        "1984_United_States_Senate_election_in_Delaware",
        "1990_United_States_Senate_election_in_Delaware",
        "1996_United_States_Senate_election_in_Delaware",
        "2002_United_States_Senate_election_in_Delaware",
        "2008_United_States_presidential_debates#October_2:_Vice_presidential_debate_(Washington_University_in_St._Louis)",
        "2012_United_States_presidential_debates#October_11:_Vice_presidential_debate_(Centre_College)",
        "Joe_Biden_1988_presidential_campaign",
        "1988_Democratic_Party_presidential_primaries",
        "Joe_Biden_2020_presidential_campaign",
        "List_of_Joe_Biden_2020_presidential_campaign_endorsements",
        "2020_Democratic_Party_presidential_primaries",
        "List_of_Joe_Biden_2020_presidential_campaign_primary_endorsements",
        "2020_Democratic_Party_presidential_debates",
        "2020_Democratic_Party_vice_presidential_candidate_selection",
        "2020_Democratic_National_Convention",
        "2020_United_States_presidential_debates",
        "Biden_family",
        "Neilia_Hunter",
        "Jill_Biden",
        "Beau_Biden",
        "Hunter_Biden",
        "Edward_Francis_Blewitt",
        "Promises_to_Keep_(Biden_book)",
        "Promise_Me,_Dad",
        "Tomorrow_Will_Be_Different",
        "List_of_honors_received_by_Joe_Biden",
        "List_of_things_named_after_Joe_Biden",
        "Joe_Biden_(The_Onion)",
        "Cancer_Breakthroughs_2020",
        "Crumb_and_Get_It_bakery_incident",
        "Joe_Biden_sexual_assault_allegation",
        "Book:Joe_Biden",
        "List_of_United_States_Representatives_from_Arizona",
        "Arizona%27s_1st_congressional_district",
        "Keating_Five",
        "International_Republican_Institute",
        "John_McCain_presidential_campaign,_2000",
        "Senate_career_of_John_McCain,_2001%E2%80%932014",
        "Bipartisan_Campaign_Reform_Act",
        "Climate_Stewardship_Acts",
        "Detainee_Treatment_Act",
        "Intelligence_Authorization_Act_for_Fiscal_Year_2008",
        "List_of_bills_sponsored_by_John_McCain_in_the_United_States_Senate",
        "John_McCain_presidential_campaign,_2008",
        "List_of_John_McCain_presidential_campaign_endorsements,_2008",
        "1982_United_States_House_of_Representatives_elections",
        "1984_United_States_House_of_Representatives_elections",
        "United_States_Senate_election_in_Arizona,_1986",
        "United_States_Senate_election_in_Arizona,_1992",
        "United_States_Senate_election_in_Arizona,_1998",
        "United_States_Senate_election_in_Arizona,_2004",
        "United_States_Senate_election_in_Arizona,_2010",
        "United_States_Senate_election_in_Arizona,_2016",
        "Faith_of_My_Fathers",
        "Worth_the_Fighting_For",
        "Why_Courage_Matters",
        "Character_Is_Destiny",
        "Hard_Call",
        "Thirteen_Soldiers",
        "The_Restless_Wave_(book)",
        "The_Nightingale%27s_Song",
        "My_Dad,_John_McCain",
        "Game_Change_(film)",
        "Cindy_McCain",
        "Carol_McCain",
        "Meghan_McCain",
        "John_S._McCain_Jr.",
        "Roberta_McCain",
        "Joe_McCain",
        "John_S._McCain_Sr.",
        "Book:John_McCain",
        "LCCN_(identifier)"
      ],
      "sourcestr1": "2008_United_States_presidential_election",
      "sourcestr2": "Q45578",
      "sourcestr3": "Q47566",
      "sourcestr4": "United States presidential election",
      "sourcevarchar3": "[{\"538 members of the Electoral College 270 electoral votes needed to win\":\"Opinionpolls\",\"Turnout\":[\"58.2%\",\"1.5\",\"pp\"]}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/ElectoralCollege2008.svg/1200px-ElectoralCollege2008.svg.png",
      "sourcedouble1": 0.042539,
      "entity1": [
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "0",
          "display": "0"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "2004",
          "display": "2004"
        },
        {
          "value": "6",
          "display": "6"
        },
        {
          "value": "15",
          "display": "15"
        },
        {
          "value": "7",
          "display": "7"
        },
        {
          "value": "9",
          "display": "9"
        },
        {
          "value": "11",
          "display": "11"
        },
        {
          "value": "2007",
          "display": "2007"
        },
        {
          "value": "21",
          "display": "21"
        },
        {
          "value": "0.01",
          "display": "0.01"
        },
        {
          "value": "8",
          "display": "8"
        },
        {
          "value": "0.15",
          "display": "0.15"
        },
        {
          "value": "0.33",
          "display": "0.33"
        }
      ],
      "date": [
        {
          "value": "2008-11-04",
          "display": "2008-11-04"
        },
        {
          "value": "2009-01-08",
          "display": "2009-01-08"
        },
        {
          "value": "2008-02-05",
          "display": "2008-02-05"
        },
        {
          "value": "2009-01-20",
          "display": "2009-01-20"
        },
        {
          "value": "2007-03-01",
          "display": "2007-03-01"
        },
        {
          "value": "2007-07-14",
          "display": "2007-07-14"
        },
        {
          "value": "2007-10-18",
          "display": "2007-10-18"
        },
        {
          "value": "2007-12-16",
          "display": "2007-12-16"
        },
        {
          "value": "2008-03-09",
          "display": "2008-03-09"
        },
        {
          "value": "2008-04-27",
          "display": "2008-04-27"
        },
        {
          "value": "2008-05-29",
          "display": "2008-05-29"
        },
        {
          "value": "2008-05-31",
          "display": "2008-05-31"
        },
        {
          "value": "2008-09-10",
          "display": "2008-09-10"
        },
        {
          "value": "2008-09-24",
          "display": "2008-09-24"
        },
        {
          "value": "2008-09-26",
          "display": "2008-09-26"
        },
        {
          "value": "2008-10-03",
          "display": "2008-10-03"
        },
        {
          "value": "2008-10-05",
          "display": "2008-10-05"
        },
        {
          "value": "2008-10-07",
          "display": "2008-10-07"
        },
        {
          "value": "2008-10-15",
          "display": "2008-10-15"
        },
        {
          "value": "2008-10-22",
          "display": "2008-10-22"
        }
      ],
      "entity3": [
        {
          "value": "21:00",
          "display": "21:00"
        },
        {
          "value": "23:00",
          "display": "23:00"
        },
        {
          "value": "00:00",
          "display": "00:00"
        },
        {
          "value": "00:30",
          "display": "00:30"
        },
        {
          "value": "01:00",
          "display": "01:00"
        },
        {
          "value": "01:30",
          "display": "01:30"
        },
        {
          "value": "02:00",
          "display": "02:00"
        },
        {
          "value": "03:00",
          "display": "03:00"
        },
        {
          "value": "04:00",
          "display": "04:00"
        },
        {
          "value": "06:00",
          "display": "06:00"
        },
        {
          "value": "19:30",
          "display": "19:30"
        },
        {
          "value": "20:30",
          "display": "20:30"
        },
        {
          "value": "21:30",
          "display": "21:30"
        }
      ],
      "entity4": [
        {
          "value": "USD 100000000",
          "display": "USD 100000000"
        },
        {
          "value": "USD 1000000000",
          "display": "USD 1000000000"
        },
        {
          "value": "USD 1010000000",
          "display": "USD 1010000000"
        },
        {
          "value": "USD 1345202",
          "display": "USD 1345202"
        },
        {
          "value": "USD 1383681",
          "display": "USD 1383681"
        },
        {
          "value": "USD 1601104696",
          "display": "USD 1601104696"
        },
        {
          "value": "USD 1644712232",
          "display": "USD 1644712232"
        },
        {
          "value": "USD 346666422",
          "display": "USD 346666422"
        },
        {
          "value": "USD 379006485",
          "display": "USD 379006485"
        },
        {
          "value": "USD 4187628",
          "display": "USD 4187628"
        },
        {
          "value": "USD 448900000",
          "display": "USD 448900000"
        },
        {
          "value": "USD 4496180",
          "display": "USD 4496180"
        },
        {
          "value": "USD 6000000",
          "display": "USD 6000000"
        },
        {
          "value": "USD 649500000",
          "display": "USD 649500000"
        },
        {
          "value": "USD 700000000000",
          "display": "USD 700000000000"
        },
        {
          "value": "USD 760370195",
          "display": "USD 760370195"
        },
        {
          "value": "USD 778642962",
          "display": "USD 778642962"
        },
        {
          "value": "USD 1.17",
          "display": "USD 1.17"
        },
        {
          "value": "USD 1.48",
          "display": "USD 1.48"
        },
        {
          "value": "USD 10.94",
          "display": "USD 10.94"
        }
      ],
      "entity7": [
        {
          "value": "0, 0.00",
          "display": "0, 0.00"
        },
        {
          "value": "1, 121.411",
          "display": "1, 121.411"
        },
        {
          "value": "1, 138.809",
          "display": "1, 138.809"
        },
        {
          "value": "1, -32",
          "display": "1, -32"
        },
        {
          "value": "1.013, 0.22",
          "display": "1.013, 0.22"
        },
        {
          "value": "1.014, 0.36",
          "display": "1.014, 0.36"
        },
        {
          "value": "1.024, 0.04",
          "display": "1.024, 0.04"
        },
        {
          "value": "1.024, 0.37",
          "display": "1.024, 0.37"
        },
        {
          "value": "1.028, 0.13",
          "display": "1.028, 0.13"
        },
        {
          "value": "1.034, 0.08",
          "display": "1.034, 0.08"
        },
        {
          "value": "1.067, 0.33",
          "display": "1.067, 0.33"
        },
        {
          "value": "1.092, 0.02",
          "display": "1.092, 0.02"
        },
        {
          "value": "1.109, 0.27",
          "display": "1.109, 0.27"
        },
        {
          "value": "1.138, 0.43",
          "display": "1.138, 0.43"
        },
        {
          "value": "1.139, 0.10",
          "display": "1.139, 0.10"
        },
        {
          "value": "1.160, 0.02",
          "display": "1.160, 0.02"
        },
        {
          "value": "1.192, 0.47",
          "display": "1.192, 0.47"
        },
        {
          "value": "1.199, 0.38",
          "display": "1.199, 0.38"
        },
        {
          "value": "1.314, 0.29",
          "display": "1.314, 0.29"
        },
        {
          "value": "1.346, 0.04",
          "display": "1.346, 0.04"
        }
      ],
      "entity12": [
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "DEATH",
          "display": "Death"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        }
      ],
      "entity14": [
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "DEBT",
          "display": "Debt"
        },
        {
          "value": "PENALTY",
          "display": "Penalty"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "LOSSES",
          "display": "Losses"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        }
      ],
      "event_date": [
        {
          "value": "(ELECTION)#(2008-12-11)",
          "display": "(Election)#(2008-12-11)"
        },
        {
          "value": "(ELECTION)#(2008-11-04)",
          "display": "(Election)#(2008-11-04)"
        },
        {
          "value": "(ELECTION)#(2008-02-05)",
          "display": "(Election)#(2008-02-05)"
        },
        {
          "value": "(ELECTION)#(2008-10-22)",
          "display": "(Election)#(2008-10-22)"
        },
        {
          "value": "(VICTORY)#(2008-02-05)",
          "display": "(Victory)#(2008-02-05)"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(DARRELL CASTLE)",
          "display": "(Vice-President)#(Darrell Castle)"
        },
        {
          "value": "(VICE-PRESIDENT)#(JOHN MCCAIN)",
          "display": "(Vice-President)#(John McCain)"
        },
        {
          "value": "(VICE-PRESIDENT)#(ROSA CLEMENTE)",
          "display": "(Vice-President)#(Rosa Clemente)"
        },
        {
          "value": "(VICE-PRESIDENT)#(SARAH PALIN)",
          "display": "(Vice-President)#(Sarah Palin)"
        },
        {
          "value": "(VICE-PRESIDENT)#(WAYNE ALLYN ROOT)",
          "display": "(Vice-President)#(Wayne Allyn Root)"
        },
        {
          "value": "(VICE-PRESIDENT)#(BARACK OBAMA)",
          "display": "(Vice-President)#(Barack Obama)"
        },
        {
          "value": "(VICE-PRESIDENT)#(GEORGE W. BUSH)",
          "display": "(Vice-President)#(George W. Bush)"
        },
        {
          "value": "(VICE-PRESIDENT)#(JOE BIDEN)",
          "display": "(Vice-President)#(Joe Biden)"
        }
      ],
      "entity18": [
        {
          "value": "(REVENUE)#(USD 15000)",
          "display": "(Revenue)#(USD 15000)"
        }
      ],
      "company_person": [
        {
          "value": "(NEW YORK TIMES)#(ELIZABETH EDWARDS)",
          "display": "(New York Times)#(Elizabeth Edwards)"
        }
      ],
      "rank": 9,
      "displayTitle": "2008 United States presidential election",
      "relevantExtracts": "ticket of Barack <b>Obama </b>, the junior ... <b>Obama </b>became the ... sharp contest between <b>Obama </b>and the ... long primary season, <b>Obama </b>secured the ... in 2007, while <b>Obama </b>strongly ... <b>Obama </b>campaigned on ... <b>Obama </b>won a ... <b>Obama </b>received the ... 2016 presidential election <b>Obama</b>&#39;s total ... <b>Obama </b>flipped nine "
    },
    {
      "id": "/Web/Wikipedia/|Democratic_Party_(United_States)_presidential_primaries,_2008",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.972665,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "Senator Barack {b}Obama{nb} of Illinois was selected as the nominee, becoming the first African American to secure the presidential nomination of any major political party in the United States.",
        "208,186",
        "118591,382",
        "However, due to a close race between {b}Obama{nb} and Senator Hillary Clinton of New York , the contest remained competitive for longer than expected, and neither candidate received enough pledged delegates from state primaries and caucuses to achieve a majority, without endorsements from unpledged delegates ( superdelegates ).",
        "395,322",
        "118974,519",
        "The media reports did include Florida, which neither Clinton nor {b}Obama{nb} contested, and Michigan.",
        "1897,95",
        "121519,95",
        "Consequently, {b}Obama{nb} and other candidates removed their names from the ballot yet Clinton did not.",
        "2185,97",
        "121895,97",
        "The DNC did not count the popular vote from Michigan, and evenly split the state's delegates between Clinton and {b}Obama{nb}.",
        "2283,119",
        "121993,119",
        "As a result, without the Michigan vote, {b}Obama{nb} won the popular vote",
        "2403,67",
        "122113,67",
        "{b}Obama{nb} received enough superdelegate endorsements on June 3 to claim that he had secured the simple majority of delegates necessary to win the nomination, and Clinton conceded the nomination four days later.",
        "2664,206",
        "122608,206",
        "{b}Obama{nb} was nominated on the first ballot, at the August convention.",
        "2871,66",
        "123043,66",
        "Clinton went on to serve as {b}Obama{nb}'s Secretary of State for his first term as president, and the Democratic nominee for president in 2016.",
        "3050,137",
        "123222,231",
        "Campaign ) (Endorsed {b}Obama{nb}",
        "4227,26",
        "139085,47"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "223,5,432,5,1962,5,2199,5,2396,5,2443,5,2664,5,2871,5,3078,5,3949,5,3970,5,4248,5,4406,5,4548,5,4676,5,4849,5,5142,5,11526,5,12776,5,13119,5,13345,5,13585,5,13736,5,13853,5,14065,5,14278,5,14505,5,14564,5,14689,5,15690,5,15715,5,16196,5,17147,5,17400,5,17684,5,17799,5,18635,5,18860,5,18935,5,19577,5,19940,5,20100,5,20303,5,20382,5,20631,5,20766,5,21964,5,22618,5,23471,5,24050,5,24262,5,24287,5,25214,5,25531,5,25607,5,25784,5,26251,5,26267,5,27471,5,27529,5,27635,5,27879,5,27910,5,28051,5,28303,5,28633,5,29117,5,29560,5,29693,5,29953,5,30292,5,30308,5,31046,5,31117,5,31454,5,31860,5,32015,5,32570,5,33163,5,33554,5,33603,5,33697,5,33726,5,33838,5,34025,5,34102,5,34200,5,34409,5,34677,5,34949,5,35120,5,35136,5,36030,5,36416,5,36603,5,37203,5,37511,5,38040,5,38408,5,38775,5,38967,5,39260,5,39895,5,40225,5,40538,5,40725,5,40911,5,41077,5,41393,5,41409,5,41527,5,42297,5,42420,5,42609,5,42952,5,43002,5,43403,5,43516,5,43714,5,44096,5,44112,5,45101,5,45208,5,47664,5;118660,5,119011,5,121584,5,121909,5,122106,5,122153,5,122608,5,123043,5,123250,5,136438,5,136520,5,139127,5,141313,5,143700,5,145714,5,147634,5,151240,5,168600,5,175442,5,176359,5,176825,5,177388,5,177693,5,177927,5,178607,5,179055,5,179405,5,179581,5,179706,5,182805,5,182857,5,190546,5,193326,5,193696,5,194209,5,194441,5,195687,5,195912,5,196060,5,197122,5,197797,5,198096,5,198525,5,198721,5,198970,5,199105,5,202247,5,203407,5,204838,5,205999,5,207361,5,207413,5,211671,5,212413,5,212649,5,213329,5,214418,5,214452,5,222546,5,222604,5,222710,5,222954,5,222985,5,223126,5,223465,5,224212,5,225376,5,226079,5,226329,5,226589,5,227597,5,227631,5,233303,5,233394,5,233951,5,234763,5,234918,5,236948,5,237886,5,239318,5,239367,5,239461,5,239633,5,239795,5,240125,5,240262,5,240459,5,240785,5,241294,5,241684,5,242544,5,242578,5,246410,5,246916,5,247103,5,247936,5,248347,5,249089,5,249703,5,252048,5,252380,5,252937,5,254429,5,254759,5,255198,5,255385,5,255571,5,255857,5,256401,5,256417,5,256535,5,257730,5,259440,5,262466,5,262809,5,262859,5,263555,5,263668,5,263866,5,264802,5,264836,5,270232,5,271547,5,279495,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "2008 Democratic Party presidential primaries",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 05:32:31",
      "indexationtime": "2020-09-02 01:41:42",
      "version": "CsdF/IBtbNb/O/GI1nncmA==",
      "size": 846261,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Democratic_Party_(United_States)_presidential_primaries,_2008",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "JOHN EDWARDS",
          "display": "John Edwards"
        },
        {
          "value": "JOHN MCCAIN",
          "display": "John McCain"
        },
        {
          "value": "MIKE GRAVEL",
          "display": "Mike Gravel"
        },
        {
          "value": "BILL RICHARDSON",
          "display": "Bill Richardson"
        },
        {
          "value": "DENNIS KUCINICH",
          "display": "Dennis Kucinich"
        },
        {
          "value": "TED KENNEDY",
          "display": "Ted Kennedy"
        },
        {
          "value": "CAROLINE KENNEDY",
          "display": "Caroline Kennedy"
        },
        {
          "value": "CHRIS DODD",
          "display": "Chris Dodd"
        },
        {
          "value": "GEORGE W. BUSH",
          "display": "George W. Bush"
        },
        {
          "value": "JAMES CARVILLE",
          "display": "James Carville"
        },
        {
          "value": "JEREMIAH WRIGHT",
          "display": "Jeremiah Wright"
        },
        {
          "value": "JESSE JACKSON",
          "display": "Jesse Jackson"
        },
        {
          "value": "JOHN F. KENNEDY",
          "display": "John F. Kennedy"
        },
        {
          "value": "JOHN KERRY",
          "display": "John Kerry"
        },
        {
          "value": "JUDAS ISCARIOT",
          "display": "Judas Iscariot"
        },
        {
          "value": "KENT GARBER",
          "display": "Kent Garber"
        },
        {
          "value": "MARK WARNER",
          "display": "Mark Warner"
        }
      ],
      "company": [
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "XCEL ENERGY",
          "display": "Xcel Energy"
        }
      ],
      "geo": [
        {
          "value": "MICHIGAN",
          "display": "Michigan"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        },
        {
          "value": "IOWA",
          "display": "Iowa"
        },
        {
          "value": "NEW HAMPSHIRE",
          "display": "New Hampshire"
        },
        {
          "value": "SOUTH CAROLINA",
          "display": "South Carolina"
        },
        {
          "value": "TEXAS",
          "display": "Texas"
        },
        {
          "value": "OHIO",
          "display": "Ohio"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "RICHARDSON",
          "display": "Richardson"
        },
        {
          "value": "NEVADA",
          "display": "Nevada"
        },
        {
          "value": "PUERTO RICO",
          "display": "Puerto Rico"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "AMERICAN SAMOA",
          "display": "American Samoa"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "GUAM",
          "display": "Guam"
        },
        {
          "value": "PENNSYLVANIA",
          "display": "Pennsylvania"
        },
        {
          "value": "NORTH CAROLINA",
          "display": "North Carolina"
        },
        {
          "value": "CONNECTICUT",
          "display": "Connecticut"
        },
        {
          "value": "DISTRICT OF COLUMBIA",
          "display": "District of Columbia"
        },
        {
          "value": "U.S.VIRGIN ISLANDS",
          "display": "U.S.Virgin Islands"
        }
      ],
      "wordcount": 5595,
      "exacthash": "65R0BsTFx7xQLQuCImHMEQ==",
      "nearhash": "NfC15FzZW1YBqRj6HZ2Ljw==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "title",
          "display": "title"
        },
        {
          "value": "job",
          "display": "job"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Democratic_Party_(United_States)_presidential_primaries,_2008",
      "sourcecsv2": [
        "2008_Republican_Party_presidential_primaries",
        "2004_Democratic_Party_presidential_primaries",
        "2012_Democratic_Party_presidential_primaries",
        "Barack_Obama",
        "Hillary_Clinton",
        "Illinois",
        "New_York_(state)",
        "Michigan_Democratic_primary,_2008",
        "Florida_Democratic_primary,_2008",
        "New_Hampshire_Democratic_primary,_2008",
        "Nevada_Democratic_caucuses,_2008",
        "Missouri_Democratic_primary,_2008",
        "Texas_Democratic_primary_and_caucuses,_2008",
        "Guam_Democratic_territorial_convention,_2008",
        "John_Kerry",
        "2008_United_States_presidential_election",
        "Timeline_of_the_2008_United_States_presidential_election",
        "2008_United_States_presidential_debates",
        "Nationwide_opinion_polling_for_the_2008_United_States_presidential_election",
        "Statewide_opinion_polling_for_the_2008_United_States_presidential_election",
        "Political_parties_in_the_United_States",
        "Democratic_Party_(United_States)",
        "2008_Democratic_Party_presidential_candidates",
        "2008_Democratic_Party_presidential_debates_and_forums",
        "Nationwide_opinion_polling_for_the_2008_Democratic_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2008_Democratic_Party_presidential_primaries",
        "Results_of_the_2008_Democratic_Party_presidential_primaries",
        "Barack_Obama_2008_presidential_campaign",
        "2008_Democratic_National_Convention",
        "List_of_Democratic_Party_superdelegates,_2008",
        "Republican_Party_(United_States)",
        "2008_Republican_Party_presidential_candidates",
        "2008_Republican_Party_presidential_debates_and_forums",
        "Nationwide_opinion_polling_for_the_2008_Republican_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2008_Republican_Party_presidential_primaries",
        "Results_of_the_2008_Republican_Party_presidential_primaries",
        "John_McCain_2008_presidential_campaign",
        "2008_Republican_National_Convention",
        "Third_party_(United_States)",
        "Libertarian_Party_(United_States)",
        "2008_Libertarian_National_Convention",
        "Green_Party_of_the_United_States",
        "Green_Party_presidential_primaries,_2008",
        "2008_Green_National_Convention",
        "Constitution_Party_(United_States)",
        "United_States_third_party_and_independent_presidential_candidates,_2008",
        "2008_United_States_elections",
        "2008_United_States_House_of_Representatives_elections",
        "2008_United_States_Senate_elections",
        "2008_United_States_gubernatorial_elections",
        "Vice_President_of_the_United_States",
        "2008_Democratic_Party_vice_presidential_candidate_selection",
        "2008_Republican_Party_vice_presidential_candidate_selection",
        "2004_United_States_presidential_election",
        "2012_United_States_presidential_election",
        "Political_positions_of_Barack_Obama",
        "Electoral_history_of_Barack_Obama",
        "Early_life_and_career_of_Barack_Obama",
        "Family_of_Barack_Obama",
        "Public_image_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "United_States_Senate_career_of_Barack_Obama",
        "Presidency_of_Barack_Obama",
        "Timeline_of_the_Barack_Obama_presidency",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Obama_Doctrine",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Patient_Protection_and_Affordable_Care_Act",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Barack_Obama_2012_presidential_campaign",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Second_inauguration_of_Barack_Obama",
        "Immigration_reform_in_the_United_States#Obama&#39",
        "s_executive_actions_of_November_2014",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "Barack_Obama_Presidential_Center",
        "Obama_Foundation",
        "One_America_Appeal",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "2009_Nobel_Peace_Prize",
        "Political_positions_of_Hillary_Clinton",
        "Electoral_history_of_Hillary_Clinton",
        "Hillary_Clinton#First_Lady_of_the_United_States_(1993–2001)",
        "Clinton_health_care_plan_of_1993",
        "Children%27s_Health_Insurance_Program",
        "United_States_Senate_career_of_Hillary_Clinton",
        "2000_United_States_Senate_election_in_New_York",
        "2006_United_States_Senate_election_in_New_York",
        "Hillary_Clinton%27s_tenure_as_Secretary_of_State",
        "List_of_international_trips_made_by_Hillary_Clinton_as_United_States_Secretary_of_State",
        "Foreign_policy_of_Barack_Obama",
        "Quadrennial_Diplomacy_and_Development_Review",
        "Hillary_Clinton_email_controversy",
        "Hillary_Doctrine",
        "Hillary_Clinton_2008_presidential_campaign",
        "List_of_Hillary_Clinton_2008_presidential_campaign_endorsements",
        "Hillary_Clinton_2016_presidential_campaign",
        "2016_Democratic_Party_presidential_primaries",
        "2016_Democratic_National_Convention",
        "2016_United_States_presidential_debates",
        "2016_United_States_presidential_election",
        "2016_Democratic_Party_vice_presidential_candidate_selection",
        "List_of_Hillary_Clinton_2016_presidential_campaign_political_endorsements",
        "List_of_Hillary_Clinton_2016_presidential_campaign_non-political_endorsements",
        "Clinton_Foundation",
        "Clinton_Foundation%E2%80%93State_Department_controversy",
        "Onward_Together",
        "List_of_awards_and_honors_received_by_Hillary_Clinton",
        "Bibliography_of_Hillary_Clinton",
        "United_States_Secretary_of_State",
        "President_of_the_United_States",
        "United_States_Senate",
        "List_of_African-American_firsts",
        "Superdelegates",
        "Primary_election",
        "Caucus",
        "U.S._state",
        "Delegate_(American_politics)",
        "Denver",
        "Colorado",
        "American_Samoa",
        "Guam",
        "United_States_Virgin_Islands",
        "Democrats_Abroad",
        "Michigan",
        "Florida",
        "Democratic_National_Committee",
        "John_Edwards",
        "North_Carolina",
        "John_Edwards_2008_presidential_campaign",
        "Bill_Richardson",
        "List_of_Governors_of_New_Mexico",
        "Governor_of_New_Mexico",
        "New_Mexico",
        "Bill_Richardson_2008_presidential_campaign",
        "Joe_Biden",
        "Delaware",
        "Joe_Biden_2008_presidential_campaign",
        "Chris_Dodd",
        "Connecticut",
        "Chris_Dodd_2008_presidential_campaign",
        "Mike_Gravel",
        "Alaska",
        "Mike_Gravel_2008_presidential_campaign",
        "Jesse_Johnson_(West_Virginia_politician)",
        "Dennis_Kucinich",
        "United_States_House_of_Representatives",
        "Ohio%27s_10th_congressional_district",
        "Dennis_Kucinich_2008_presidential_campaign",
        "Tom_Vilsack",
        "Governor_of_Iowa",
        "Tom_Vilsack_2008_presidential_campaign",
        "US_states",
        "District_of_Columbia",
        "Puerto_Rico",
        "Virgin_Islands",
        "United_States_presidential_primary",
        "Democratic_National_Convention",
        "United_States_Electoral_College",
        "List_of_Democratic_Party_(United_States)_superdelegates,_2008",
        "Superdelegate",
        "List_of_current_United_States_Governors",
        "Proportional_representation",
        "Affirmative_action",
        "Nationwide_opinion_polling_for_the_Democratic_Party_2008_presidential_candidates",
        "United_States_general_elections,_2006",
        "Al_Gore",
        "Russ_Feingold",
        "Evan_Bayh",
        "Tom_Daschle",
        "Wesley_Clark",
        "Mark_Warner",
        "Al_Sharpton",
        "Oprah_Winfrey",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Iowa",
        "Iowa_Democratic_caucuses,_2008",
        "South_Carolina_Democratic_primary,_2008",
        "Saint_Anselm_College",
        "Debate",
        "Cable_news",
        "Pundit_(expert)",
        "Culinary_Workers_Union",
        "Race_in_the_United_States",
        "African_American",
        "Super_Tuesday,_2008",
        "Bill_Clinton",
        "CBS_News",
        "Jesse_Jackson",
        "Democratic_Party_(United_States)_presidential_primaries,_1988",
        "Florida_Legislature",
        "United_States_congressional_delegations_from_Florida",
        "Fort_Lauderdale,_Florida",
        "Super_Tuesday_(2008)",
        "Super_Tuesday",
        "Caroline_Kennedy",
        "John_F._Kennedy",
        "Ted_Kennedy",
        "Alabama_Democratic_primary,_2008",
        "Alaska_Democratic_caucuses,_2008",
        "American_Samoa_Democratic_caucuses,_2008",
        "Arizona_Democratic_primary,_2008",
        "Arkansas_Democratic_primary,_2008",
        "California_Democratic_primary,_2008",
        "Colorado_Democratic_caucuses,_2008",
        "Connecticut_Democratic_primary,_2008",
        "Delaware_Democratic_primary,_2008",
        "Georgia_Democratic_primary,_2008",
        "Idaho_Democratic_caucuses,_2008",
        "Illinois_Democratic_primary,_2008",
        "Kansas_Democratic_caucuses,_2008",
        "Massachusetts_Democratic_presidential_primary,_2008",
        "Minnesota_Democratic_caucuses,_2008",
        "New_Jersey_Democratic_primary,_2008",
        "New_Mexico_Democratic_primary,_2008",
        "New_York_Democratic_primary,_2008",
        "North_Dakota_Democratic_caucuses,_2008",
        "Oklahoma_Democratic_primary,_2008",
        "Tennessee_Democratic_primary,_2008",
        "Utah_Democratic_primary,_2008",
        "Hispanic_and_Latino_Americans",
        "Rocky_Mountains",
        "Southern_United_States",
        "Midwestern_United_States",
        "Northeastern_United_States",
        "Southwestern_United_States",
        "Arkansas",
        "Louisiana_Democratic_primary,_2008",
        "Nebraska_Democratic_caucuses,_2008",
        "United_States_Virgin_Islands_Democratic_primary,_2008",
        "Washington_Democratic_caucuses,_2008",
        "Maine_Democratic_caucuses,_2008",
        "Democrats_Abroad_primary,_2008",
        "District_of_Columbia_Democratic_primary,_2008",
        "Maryland_Democratic_primary,_2008",
        "Virginia_Democratic_primary,_2008",
        "Hawaii_Democratic_caucuses,_2008",
        "Wisconsin_Democratic_primary,_2008",
        "Maine",
        "Patti_Solis_Doyle",
        "Potomac_Primaries",
        "NBC_News",
        "Jeremiah_Wright_controversy",
        "A_More_Perfect_Union_(speech)",
        "Super_Tuesday_II,_2008",
        "Working-class",
        "RealClearPolitics",
        "CNN",
        "Saturday_Night_Live",
        "Tony_Rezko",
        "Austan_Goolsbee",
        "North_American_Free_Trade_Agreement",
        "The_New_York_Times",
        "White_House",
        "Ohio_Democratic_primary,_2008",
        "Rhode_Island_Democratic_primary,_2008",
        "Vermont_Democratic_primary,_2008",
        "Wyoming_Democratic_caucuses,_2008",
        "Mississippi_Democratic_primary,_2008",
        "Conference_call",
        "Sermon",
        "Jeremiah_Wright",
        "YouTube",
        "James_Carville",
        "Easter",
        "Judas_Iscariot",
        "United_States_Libertarian_presidential_candidates,_2008",
        "Speaker_of_the_United_States_House_of_Representatives",
        "Nancy_Pelosi",
        "Republican_Party_(United_States)_presidential_primaries,_2008",
        "West_Virginia",
        "Kentucky",
        "Des_Moines,_Iowa",
        "Puerto_Rico_Democratic_primary,_2008",
        "Xcel_Energy_Center",
        "Michelle_Obama",
        "Presumptive_nominee",
        "St._Paul,_Minnesota",
        "Pennsylvania_Democratic_primary,_2008",
        "Indiana_Democratic_primary,_2008",
        "North_Carolina_Democratic_primary,_2008",
        "West_Virginia_Democratic_primary,_2008",
        "Kentucky_Democratic_primary,_2008",
        "Oregon_Democratic_primary,_2008",
        "Montana_Democratic_primary,_2008",
        "2008_South_Dakota_Democratic_primary",
        "Washington,_D.C.",
        "John_McCain",
        "Voter_turnout",
        "Red_states",
        "Voter_registration",
        "African-American",
        "Open_primary",
        "Independent_(voter)",
        "George_W._Bush",
        "Iraq_War",
        "Realigning_election",
        "Fundraising_for_the_2008_United_States_presidential_election",
        "Iowa_Democratic_Party",
        "Quad-City_Times",
        "The_Boston_Globe",
        "Politico.com",
        "Time_(magazine)",
        "E._J._Dionne_Jr.",
        "USA_Today",
        "ABCNews.com",
        "New_York_Review_of_Books",
        "Orlando_Sentinel",
        "The_Christian_Science_Monitor",
        "Detroit_Free_Press",
        "Guardian_Unlimited",
        "Michigan_Democratic_Party",
        "Dan_Balz",
        "The_Atlanta_Journal-Constitution",
        "The_Wall_Street_Journal",
        "Politico_(newspaper)",
        "Kenneth_M._Curtis",
        "Bill_Schneider_(journalist)",
        "Chuck_Todd",
        "Los_Angeles_Times",
        "Chris_Cillizza",
        "Jack_Evans_(D.C._Council)",
        "Wayback_Machine",
        "Albert_Wynn",
        "Jack_B._Johnson",
        "Newsweek",
        "Jonathan_Alter",
        "ABC_News",
        "Fox_News",
        "U.S._News_%26_World_Report",
        "2008_Alabama_Democratic_primary",
        "2008_Alaska_Democratic_caucuses",
        "2008_Arizona_Democratic_primary",
        "2008_Arkansas_Democratic_primary",
        "2008_California_Democratic_primary",
        "2008_Colorado_Democratic_caucuses",
        "2008_Connecticut_Democratic_primary",
        "2008_Delaware_Democratic_primary",
        "2008_Florida_Democratic_primary",
        "2008_Georgia_Democratic_primary",
        "2008_Hawaii_Democratic_caucuses",
        "2008_Idaho_Democratic_caucuses",
        "2008_Illinois_Democratic_primary",
        "2008_Indiana_Democratic_primary",
        "2008_Iowa_Democratic_caucuses",
        "2008_Kansas_Democratic_caucuses",
        "2008_Kentucky_Democratic_primary",
        "2008_Louisiana_Democratic_primary",
        "2008_Maine_Democratic_caucuses",
        "2008_Maryland_Democratic_primary",
        "2008_Massachusetts_Democratic_presidential_primary",
        "2008_Michigan_Democratic_primary",
        "2008_Minnesota_Democratic_caucuses",
        "2008_Mississippi_Democratic_primary",
        "2008_Missouri_Democratic_primary",
        "2008_Montana_Democratic_primary",
        "2008_Nebraska_Democratic_caucuses",
        "2008_Nevada_Democratic_caucuses",
        "2008_United_States_presidential_election_in_New_Hampshire",
        "2008_New_Jersey_Democratic_primary",
        "2008_New_Mexico_Democratic_primary",
        "2008_New_York_Democratic_primary",
        "2008_North_Carolina_Democratic_primary",
        "2008_North_Dakota_Democratic_caucuses",
        "2008_Ohio_Democratic_primary",
        "2008_Oklahoma_Democratic_primary",
        "2008_Oregon_Democratic_primary_elections",
        "2008_Pennsylvania_Democratic_primary",
        "2008_Rhode_Island_Democratic_primary",
        "2008_South_Carolina_Democratic_primary",
        "2008_Tennessee_Democratic_primary",
        "2008_Texas_Democratic_primary_and_caucuses",
        "2008_Utah_Democratic_primary",
        "2008_Vermont_Democratic_primary",
        "2008_Virginia_Democratic_primary",
        "2008_Washington_Democratic_caucuses",
        "2008_West_Virginia_Democratic_primary",
        "2008_Wisconsin_Democratic_primary",
        "2008_Wyoming_Democratic_caucuses",
        "2008_American_Samoa_Democratic_caucuses",
        "2008_District_of_Columbia_Democratic_primary",
        "2008_Democrats_Abroad_primary",
        "2008_Guam_Democratic_territorial_convention",
        "2008_Puerto_Rico_Democratic_primary",
        "2008_United_States_Virgin_Islands_Democratic_territorial_convention",
        "List_of_candidates_in_the_2008_United_States_presidential_election",
        "Comparison_of_the_2008_United_States_presidential_candidates",
        "Congressional_endorsements_for_the_2008_United_States_presidential_election",
        "Ballot_access_for_the_2008_United_States_presidential_election",
        "2008_United_States_presidential_election_timeline",
        "2008_Super_Tuesday",
        "Potomac_primary",
        "2008_Super_Tuesday_II",
        "International_opinion_polling_for_the_2008_United_States_presidential_election",
        "International_reactions_to_the_2008_United_States_presidential_election",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Political_positions_of_Joe_Biden",
        "Evan_Bayh_2008_presidential_campaign",
        "Political_positions_of_John_Edwards",
        "Political_positions_of_the_2008_Republican_Party_presidential_primary_candidates",
        "Political_positions_of_John_McCain",
        "List_of_John_McCain_2008_presidential_campaign_endorsements",
        "Democratic_and_liberal_support_for_John_McCain_in_2008",
        "Sarah_Palin",
        "Vice_presidential_candidacy_of_Sarah_Palin",
        "Political_positions_of_Sarah_Palin",
        "Sam_Brownback",
        "John_H._Cox",
        "Jim_Gilmore",
        "Jim_Gilmore_2008_presidential_campaign",
        "Rudy_Giuliani",
        "Rudy_Giuliani_2008_presidential_campaign",
        "Political_positions_of_Rudy_Giuliani",
        "Mike_Huckabee",
        "Mike_Huckabee_2008_presidential_campaign",
        "Political_positions_of_Mike_Huckabee",
        "Duncan_L._Hunter",
        "Duncan_L._Hunter_2008_presidential_campaign",
        "Alan_Keyes",
        "Alan_Keyes_2008_presidential_campaign",
        "Ray_McKinney",
        "Ron_Paul",
        "Ron_Paul_2008_presidential_campaign",
        "Political_positions_of_Ron_Paul",
        "Mitt_Romney",
        "Mitt_Romney_2008_presidential_campaign",
        "Political_positions_of_Mitt_Romney",
        "Tom_Tancredo",
        "Tom_Tancredo_2008_presidential_campaign",
        "Fred_Thompson",
        "Fred_Thompson_2008_presidential_campaign",
        "Tommy_Thompson",
        "Tommy_Thompson_2008_presidential_campaign",
        "Draft_(politics)",
        "Draft_Mark_Warner_movement",
        "Newt_Gingrich",
        "Condoleezza_Rice",
        "Draft_Condi_movement",
        "Independent_politician",
        "Michael_Bloomberg",
        "Draft_Bloomberg_movement",
        "Third-party_and_independent_candidates_for_the_2008_United_States_presidential_election",
        "Constitution_Party_National_Convention",
        "Chuck_Baldwin",
        "Chuck_Baldwin_2008_presidential_campaign",
        "Darrell_Castle",
        "Daniel_Imperato",
        "Cynthia_McKinney",
        "Cynthia_McKinney_2008_presidential_campaign",
        "Political_positions_of_Cynthia_McKinney",
        "Rosa_Clemente",
        "Elaine_Brown",
        "Kent_Mesplay",
        "Kat_Swift",
        "Bob_Barr",
        "Bob_Barr_2008_presidential_campaign",
        "Political_positions_of_Bob_Barr",
        "Wayne_Allyn_Root",
        "Michael_Jingozian",
        "Steve_Kubby",
        "Mary_Ruwart",
        "Doug_Stanhope",
        "Brian_Rohrbough",
        "Boston_Tea_Party_(political_party)",
        "Charles_Jay",
        "Objectivist_Party",
        "Tom_Stevens_(politician)",
        "Peace_and_Freedom_Party",
        "Ralph_Nader",
        "Ralph_Nader_2008_presidential_campaign",
        "Matt_Gonzalez",
        "Gloria_La_Riva",
        "Brian_Moore_(political_activist)",
        "Brian_Moore_2008_presidential_campaign",
        "Prohibition_Party",
        "Gene_Amondson",
        "Reform_Party_of_the_United_States_of_America",
        "Ted_Weill",
        "Party_for_Socialism_and_Liberation",
        "Eugene_Puryear",
        "Socialist_Party_USA",
        "Stewart_Alexander",
        "Eric_Chester",
        "Socialist_Workers_Party_(United_States)",
        "R%C3%B3ger_Calero",
        "James_Harris_(Socialist_Workers_Party_politician)",
        "Alyson_Kennedy",
        "Jeff_Boss",
        "Stephen_Colbert_(character)",
        "Stephen_Colbert_2008_presidential_campaign",
        "Earl_Dodge",
        "Bradford_Lyttle",
        "Frank_Moore_(performance_artist)",
        "Joe_Schriner",
        "Jonathon_Sharkey",
        "Timeline_of_the_2004_United_States_presidential_election",
        "Timeline_of_the_2012_United_States_presidential_election",
        "Timeline_of_the_2016_United_States_presidential_election",
        "Timeline_of_the_2020_United_States_presidential_election",
        "Nationwide_opinion_polling_for_the_2016_Democratic_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_Democratic_Party_2020_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2012_Republican_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2016_Republican_Party_presidential_primaries",
        "Opinion_polling_for_the_2020_Republican_Party_presidential_primaries",
        "Opinion_polling_for_the_2004_Democratic_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2016_Democratic_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2020_Democratic_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2012_Republican_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2016_Republican_Party_presidential_primaries",
        "Fundraising_for_the_2012_United_States_presidential_election",
        "Fundraising_in_the_2016_United_States_presidential_election",
        "Fundraising_in_the_2020_United_States_presidential_election",
        "Democratic_Party_presidential_debates",
        "2004_Democratic_Party_presidential_debates_and_forums",
        "2016_Democratic_Party_presidential_debates_and_forums",
        "2020_Democratic_Party_presidential_debates",
        "2020_Democratic_Party_presidential_forums",
        "Republican_Party_presidential_debates",
        "2012_Republican_Party_presidential_debates_and_forums",
        "2016_Republican_Party_presidential_debates_and_forums",
        "2020_Republican_Party_presidential_debates",
        "2016_Libertarian_Party_presidential_debates_and_forums",
        "2016_Green_Party_presidential_debates_and_forums",
        "Straw_poll",
        "Conservative_Political_Action_Conference",
        "Iowa_State_Fair_Straw_Poll",
        "Iowa_Straw_Poll_(1979%E2%80%932011)",
        "Texas_Straw_Poll",
        "Iowa_caucuses",
        "New_Hampshire_primary",
        "Nevada_caucuses",
        "South_Carolina_primary",
        "Democratic_Party_presidential_primaries",
        "1912_Democratic_Party_presidential_primaries",
        "1916_Democratic_Party_presidential_primaries",
        "1920_Democratic_Party_presidential_primaries",
        "1924_Democratic_Party_presidential_primaries",
        "1928_Democratic_Party_presidential_primaries",
        "1932_Democratic_Party_presidential_primaries",
        "1936_Democratic_Party_presidential_primaries",
        "1940_Democratic_Party_presidential_primaries",
        "1944_Democratic_Party_presidential_primaries",
        "1948_Democratic_Party_presidential_primaries",
        "1952_Democratic_Party_presidential_primaries",
        "1956_Democratic_Party_presidential_primaries",
        "1960_Democratic_Party_presidential_primaries",
        "1964_Democratic_Party_presidential_primaries",
        "1968_Democratic_Party_presidential_primaries",
        "1972_Democratic_Party_presidential_primaries",
        "1976_Democratic_Party_presidential_primaries",
        "1980_Democratic_Party_presidential_primaries",
        "1984_Democratic_Party_presidential_primaries",
        "1988_Democratic_Party_presidential_primaries",
        "1992_Democratic_Party_presidential_primaries",
        "1996_Democratic_Party_presidential_primaries",
        "2000_Democratic_Party_presidential_primaries",
        "2020_Democratic_Party_presidential_primaries",
        "Republican_Party_presidential_primaries",
        "1912_Republican_Party_presidential_primaries",
        "1916_Republican_Party_presidential_primaries",
        "1920_Republican_Party_presidential_primaries",
        "1924_Republican_Party_presidential_primaries",
        "1928_Republican_Party_presidential_primaries",
        "1932_Republican_Party_presidential_primaries",
        "1936_Republican_Party_presidential_primaries",
        "1940_Republican_Party_presidential_primaries",
        "1944_Republican_Party_presidential_primaries",
        "1948_Republican_Party_presidential_primaries",
        "1952_Republican_Party_presidential_primaries",
        "1956_Republican_Party_presidential_primaries",
        "1960_Republican_Party_presidential_primaries",
        "1964_Republican_Party_presidential_primaries",
        "1968_Republican_Party_presidential_primaries",
        "1972_Republican_Party_presidential_primaries",
        "1976_Republican_Party_presidential_primaries",
        "1980_Republican_Party_presidential_primaries",
        "1984_Republican_Party_presidential_primaries",
        "1988_Republican_Party_presidential_primaries",
        "1992_Republican_Party_presidential_primaries",
        "1996_Republican_Party_presidential_primaries",
        "2000_Republican_Party_presidential_primaries",
        "2004_Republican_Party_presidential_primaries",
        "2012_Republican_Party_presidential_primaries",
        "2016_Republican_Party_presidential_primaries",
        "2020_Republican_Party_presidential_primaries",
        "2016_Libertarian_Party_presidential_primaries",
        "2020_Libertarian_Party_presidential_primaries",
        "2008_Green_Party_presidential_primaries",
        "2012_Green_Party_presidential_primaries",
        "2016_Green_Party_presidential_primaries",
        "2020_Green_Party_presidential_primaries",
        "1996_Reform_Party_presidential_primaries",
        "2000_Reform_Party_presidential_primaries",
        "2004_Reform_Party_presidential_primaries",
        "2008_Reform_Party_presidential_primaries",
        "2012_Reform_Party_presidential_primaries",
        "2016_Reform_Party_presidential_primaries",
        "2020_Reform_Party_presidential_primaries",
        "2016_Constitution_Party_presidential_primaries",
        "2020_Constitution_Party_presidential_primaries",
        "List_of_United_States_presidential_candidates_by_number_of_primary_votes",
        "Results_of_the_2016_Democratic_Party_presidential_primaries",
        "Results_of_the_2020_Democratic_Party_presidential_primaries",
        "Results_of_the_2012_Republican_Party_presidential_primaries",
        "Results_of_the_2016_Republican_Party_presidential_primaries",
        "Results_of_the_2020_Republican_Party_presidential_primaries",
        "1832_Democratic_National_Convention",
        "1835_Democratic_National_Convention",
        "1840_Democratic_National_Convention",
        "1844_Democratic_National_Convention",
        "1848_Democratic_National_Convention",
        "1852_Democratic_National_Convention",
        "1856_Democratic_National_Convention",
        "1860_Democratic_National_Conventions",
        "1864_Democratic_National_Convention",
        "1868_Democratic_National_Convention",
        "1872_Democratic_National_Convention",
        "1876_Democratic_National_Convention",
        "1880_Democratic_National_Convention",
        "1884_Democratic_National_Convention",
        "1888_Democratic_National_Convention",
        "1892_Democratic_National_Convention",
        "1896_Democratic_National_Convention",
        "1900_Democratic_National_Convention",
        "1904_Democratic_National_Convention",
        "1908_Democratic_National_Convention",
        "1912_Democratic_National_Convention",
        "1916_Democratic_National_Convention",
        "1920_Democratic_National_Convention",
        "1924_Democratic_National_Convention",
        "1928_Democratic_National_Convention",
        "1932_Democratic_National_Convention",
        "1936_Democratic_National_Convention",
        "1940_Democratic_National_Convention",
        "1944_Democratic_National_Convention",
        "1948_Democratic_National_Convention",
        "1952_Democratic_National_Convention",
        "1956_Democratic_National_Convention",
        "1960_Democratic_National_Convention",
        "1964_Democratic_National_Convention",
        "1968_Democratic_National_Convention",
        "1972_Democratic_National_Convention",
        "1976_Democratic_National_Convention",
        "1980_Democratic_National_Convention",
        "1984_Democratic_National_Convention",
        "1988_Democratic_National_Convention",
        "1992_Democratic_National_Convention",
        "1996_Democratic_National_Convention",
        "2000_Democratic_National_Convention",
        "2004_Democratic_National_Convention",
        "2012_Democratic_National_Convention",
        "2020_Democratic_National_Convention",
        "Republican_National_Convention",
        "1856_Republican_National_Convention",
        "1860_Republican_National_Convention",
        "1864_Republican_National_Convention",
        "1868_Republican_National_Convention",
        "1872_Republican_National_Convention",
        "1876_Republican_National_Convention",
        "1880_Republican_National_Convention",
        "1884_Republican_National_Convention",
        "1888_Republican_National_Convention",
        "1892_Republican_National_Convention",
        "1896_Republican_National_Convention",
        "1900_Republican_National_Convention",
        "1904_Republican_National_Convention",
        "1908_Republican_National_Convention",
        "1912_Republican_National_Convention",
        "1916_Republican_National_Convention",
        "1920_Republican_National_Convention",
        "1924_Republican_National_Convention",
        "1928_Republican_National_Convention",
        "1932_Republican_National_Convention",
        "1936_Republican_National_Convention",
        "1940_Republican_National_Convention",
        "1944_Republican_National_Convention",
        "1948_Republican_National_Convention",
        "1952_Republican_National_Convention",
        "1956_Republican_National_Convention",
        "1960_Republican_National_Convention",
        "1964_Republican_National_Convention",
        "1968_Republican_National_Convention",
        "1972_Republican_National_Convention",
        "1976_Republican_National_Convention",
        "1980_Republican_National_Convention",
        "1984_Republican_National_Convention",
        "1988_Republican_National_Convention",
        "1992_Republican_National_Convention",
        "1996_Republican_National_Convention",
        "2000_Republican_National_Convention",
        "2004_Republican_National_Convention",
        "2012_Republican_National_Convention",
        "2016_Republican_National_Convention",
        "2020_Republican_National_Convention",
        "Libertarian_National_Convention",
        "1983_Libertarian_National_Convention",
        "1987_Libertarian_National_Convention",
        "1991_Libertarian_National_Convention",
        "1996_Libertarian_National_Convention",
        "2000_Libertarian_National_Convention",
        "2004_Libertarian_National_Convention",
        "2010_Libertarian_National_Convention",
        "2012_Libertarian_National_Convention",
        "2014_Libertarian_National_Convention",
        "2016_Libertarian_National_Convention",
        "2020_Libertarian_National_Convention",
        "Green_National_Convention",
        "2000_Green_National_Convention",
        "2004_Green_National_Convention",
        "2012_Green_National_Convention",
        "2016_Green_National_Convention",
        "2020_Green_National_Convention",
        "List_of_Whig_National_Conventions",
        "1839_Whig_National_Convention",
        "1844_Whig_National_Convention",
        "1848_Whig_National_Convention",
        "1852_Whig_National_Convention",
        "1856_Whig_National_Convention",
        "Greenback_Party",
        "1876_Greenback_National_Convention",
        "1880_Greenback_National_Convention",
        "1884_Greenback_National_Convention",
        "Populist_Party_(United_States)",
        "1912_Progressive_National_Convention",
        "1916_Progressive_National_Convention",
        "1924_Progressive_National_Convention",
        "1948_Progressive_National_Convention",
        "California_Democratic_Party_v._Jones",
        "Graduated_Random_Presidential_Primary_System",
        "Delaware_Plan",
        "Rotating_Regional_Primary_System",
        "Interregional_Primary_Plan",
        "National_Primary",
        "List_of_Presidents_of_the_United_States",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "West_Wing_Week",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "Donald_Trump",
        "Book:Barack_Obama",
        "List_of_Secretaries_of_State_of_the_United_States",
        "List_of_United_States_senators_from_New_York",
        "First_Lady_of_the_United_States",
        "United_Nations_Security_Council_Resolution_1888",
        "United_Nations_Special_Representative_on_Sexual_Violence_in_Conflict",
        "Family_Entertainment_Protection_Act",
        "Flag_Protection_Act_of_2005",
        "Hillaryland",
        "White_House_travel_office_controversy",
        "White_House_FBI_files_controversy",
        "Vast_right-wing_conspiracy",
        "Vital_Voices",
        "Save_America%27s_Treasures",
        "State_Children%27s_Health_Insurance_Program",
        "Adoption_and_Safe_Families_Act",
        "Foster_Care_Independence_Act",
        "White_House_Millennium_Council",
        "National_Millennium_Trail",
        "Arkansas_Advocates_for_Children_and_Families",
        "Rose_Law_Firm",
        "Legal_Services_Corporation",
        "Whitewater_controversy",
        "Hillary_Clinton_cattle_futures_controversy",
        "Women%27s_rights_are_human_rights",
        "Basket_of_deplorables",
        "Hillary_Rodham_senior_thesis",
        "It_Takes_a_Village",
        "Dear_Socks,_Dear_Buddy",
        "An_Invitation_to_the_White_House",
        "Living_History_(book)",
        "Hard_Choices",
        "Stronger_Together_(book)",
        "What_Happened_(Clinton_book)",
        "The_Book_of_Gutsy_Women",
        "Hillary_Clinton_2008_presidential_primary_campaign",
        "List_of_Democrats_who_opposed_the_Hillary_Clinton_2016_presidential_campaign",
        "Hillary_Victory_Fund",
        "Cultural_and_political_image_of_Hillary_Clinton",
        "Saturday_Night_Live_parodies_of_Hillary_Clinton",
        "Hillary_and_Clinton",
        "Hillary_(film)",
        "Presidency_of_Bill_Clinton",
        "Chelsea_Clinton",
        "Hugh_Rodham_(born_1911)",
        "Dorothy_Howell_Rodham",
        "Hugh_Rodham_(born_1950)",
        "Tony_Rodham",
        "Socks_(cat)",
        "Buddy_(dog)",
        "Whitehaven_(house)",
        "Book:Hillary_Clinton"
      ],
      "sourcestr1": "Democratic_Party_(United_States)_presidential_primaries,_2008",
      "sourcestr2": "Q9062647",
      "sourcestr3": "Q669262",
      "sourcestr4": "primary election",
      "sourcevarchar3": "[{}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Democratic_presidential_primary%2C_2008.svg/1200px-Democratic_presidential_primary%2C_2008.svg.png",
      "sourcedouble1": 0.00991,
      "entity1": [
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "9",
          "display": "9"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "8",
          "display": "8"
        },
        {
          "value": "0",
          "display": "0"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "13",
          "display": "13"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "15",
          "display": "15"
        },
        {
          "value": "6",
          "display": "6"
        },
        {
          "value": "14",
          "display": "14"
        },
        {
          "value": "23",
          "display": "23"
        },
        {
          "value": "12",
          "display": "12"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "29",
          "display": "29"
        },
        {
          "value": "38",
          "display": "38"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "26",
          "display": "26"
        }
      ],
      "date": [
        {
          "value": "2008-06-03",
          "display": "2008-06-03"
        },
        {
          "value": "2008-01-03",
          "display": "2008-01-03"
        },
        {
          "value": "2008-01-05",
          "display": "2008-01-05"
        },
        {
          "value": "2008-01-15",
          "display": "2008-01-15"
        },
        {
          "value": "2008-01-29",
          "display": "2008-01-29"
        },
        {
          "value": "2008-02-05",
          "display": "2008-02-05"
        },
        {
          "value": "2008-05-31",
          "display": "2008-05-31"
        },
        {
          "value": "2007-02-23",
          "display": "2007-02-23"
        },
        {
          "value": "2008-01-10",
          "display": "2008-01-10"
        },
        {
          "value": "2008-01-23",
          "display": "2008-01-23"
        },
        {
          "value": "2008-01-30",
          "display": "2008-01-30"
        },
        {
          "value": "2008-08-28",
          "display": "2008-08-28"
        },
        {
          "value": "2009-01-20",
          "display": "2009-01-20"
        }
      ],
      "entity4": [
        {
          "value": "USD 12000000",
          "display": "USD 12000000"
        },
        {
          "value": "USD 20000000",
          "display": "USD 20000000"
        },
        {
          "value": "USD 32000000",
          "display": "USD 32000000"
        },
        {
          "value": "USD 5000000",
          "display": "USD 5000000"
        },
        {
          "value": "USD 6000000",
          "display": "USD 6000000"
        },
        {
          "value": "USD 7500000",
          "display": "USD 7500000"
        }
      ],
      "entity7": [
        {
          "value": "1.056, 1.063",
          "display": "1.056, 1.063"
        },
        {
          "value": "2.614, 1.036",
          "display": "2.614, 1.036"
        },
        {
          "value": "3.220, 1.323",
          "display": "3.220, 1.323"
        },
        {
          "value": "3.725, 1.533",
          "display": "3.725, 1.533"
        },
        {
          "value": "4.417, 1.794",
          "display": "4.417, 1.794"
        },
        {
          "value": "2, 1.216",
          "display": "2, 1.216"
        },
        {
          "value": "2, 1.222",
          "display": "2, 1.222"
        },
        {
          "value": "2, 1.352",
          "display": "2, 1.352"
        },
        {
          "value": "2, 1.421",
          "display": "2, 1.421"
        },
        {
          "value": "2, 1.427",
          "display": "2, 1.427"
        },
        {
          "value": "2, 1.562",
          "display": "2, 1.562"
        },
        {
          "value": "2, 1.726",
          "display": "2, 1.726"
        },
        {
          "value": "2, 1.732",
          "display": "2, 1.732"
        },
        {
          "value": "2, 1.823",
          "display": "2, 1.823"
        },
        {
          "value": "1.731, 1",
          "display": "1.731, 1"
        },
        {
          "value": "1.794, 1",
          "display": "1.794, 1"
        },
        {
          "value": "1.978, 46",
          "display": "1.978, 46"
        },
        {
          "value": "2.272, 1",
          "display": "2.272, 1"
        }
      ],
      "entity12": [
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "DEATH",
          "display": "Death"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        }
      ],
      "entity14": [
        {
          "value": "LOSSES",
          "display": "Losses"
        }
      ],
      "event_date": [
        {
          "value": "(ELECTION)#(2008-05-31)",
          "display": "(Election)#(2008-05-31)"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(CHRISTOPHER CHRIS DODD)",
          "display": "(Vice-President)#(Christopher Chris Dodd)"
        }
      ],
      "rank": 10,
      "displayTitle": "2008 Democratic Party presidential primaries",
      "relevantExtracts": "Senator Barack <b>Obama </b>of Illinois ... close race between <b>Obama </b>and Senator ... neither Clinton nor <b>Obama </b>... Consequently, <b>Obama </b>and other ... between Clinton and <b>Obama</b>... the Michigan vote, <b>Obama </b>won the ... <b>Obama </b>received enough ... <b>Obama </b>was ... to serve as <b>Obama</b>&#39;s ... Campaign ) (Endorsed <b>Obama</b>"
    },
    {
      "id": "/Web/Wikipedia/|Orly_Taitz",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.967892,
      "matchingpartnames": [
        "text",
        "tables"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "A dentist, lawyer, and former real estate agent, Taitz was a figure in the \"birther\" movement , which promoted the conspiracy theory that President {b}Obama{nb} was not a natural-born citizen eligible to serve as President of the United States.",
        "114,237",
        "12941,866",
        "Taitz also promotes a number of other conspiracy theories both related and unrelated to President {b}Obama{nb}.",
        "352,104",
        "13808,104",
        "Taitz's claims regarding President {b}Obama{nb}",
        "2208,40",
        "39080,40",
        "Taitz claimed that President {b}Obama{nb} was not a natural-born citizen of the United States and was therefore ineligible to serve as President.",
        "2250,138",
        "39898,270",
        "Taitz made other claims against President {b}Obama{nb}, including:",
        "2515,59",
        "40379,59",
        "That a number of homosexuals from President {b}Obama{nb}'s former church have died mysteriously.",
        "2576,89",
        "40452,89",
        "That President {b}Obama{nb} had dozens of Social Security numbers , and his passport was inaccurate.",
        "2667,93",
        "40688,166",
        "Taitz claimed that a person who was cooperating with the FBI in connection with President {b}Obama{nb}'s passport died mysteriously, \"shot in the head\".",
        "2761,145",
        "40855,145",
        "That a Kenyan birth certificate with the name \"Barack {b}Obama{nb}\" is authentic.",
        "2908,74",
        "41147,74",
        "That President {b}Obama{nb}'s first act as President was to donate money to Hamas , which she claims will be used to build Qassam rockets .",
        "2984,132",
        "41348,226"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "262,5,450,5,2243,5,2279,5,2557,5,2620,5,2682,5,2851,5,2962,5,2999,5,3140,5,3280,5,3369,5,3613,5,3735,5,4133,5,5001,5,5236,5,5695,5,5832,5,6044,5,6752,5,7278,5,7532,5,7654,5,7857,5,8036,5,8581,5,10494,5,11933,5,12458,5,13310,5,13539,5,13703,5,13914,5,13973,5,14101,5,14717,5,15096,5,15261,5,15372,5,15443,5,15482,5,15605,5,15693,5,15885,5,16238,5,16412,5,16503,5,17141,5,17562,5,17645,5,17837,5,18342,5,18499,5,18664,5,19023,5,19334,5,19445,5,20065,5,20187,5,21772,5,23997,5,24767,5,26687,5,26894,5,28199,5,28880,5,29017,5,29408,5;13714,5,13906,5,39115,5,39927,5,40421,5,40496,5,40703,5,40945,5,41201,5,41363,5,41741,5,42111,5,42350,5,42874,5,43264,5,44379,5,47907,5,49098,5,50334,5,50656,5,51302,5,54047,5,55547,5,55855,5,55977,5,56180,5,56359,5,57304,5,61753,5,65293,5,67525,5,69469,5,70659,5,71390,5,72487,5,72663,5,72791,5,73859,5,74952,5,75311,5,75545,5,75616,5,75655,5,75896,5,75984,5,76416,5,77045,5,77372,5,77820,5,79937,5,81175,5,81258,5,81456,5,83079,5,83237,5,83403,5,84414,5,85325,5,85553,5,87140,5,87438,5,91182,5,96032,5,99376,5,104509,5,104962,5,110010,5,111996,5,112133,5,113301,5"
          },
          {
            "partname": "tables",
            "data": "29809,5;454204,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Orly Taitz",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 11:45:25",
      "indexationtime": "2020-09-02 01:41:47",
      "version": "U7XOZUZ0hTIpSXRNg+OiFg==",
      "size": 453794,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Orly_Taitz",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "ORLY TAITZ",
          "display": "Orly Taitz"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "PAMELA BARNETT",
          "display": "Pamela Barnett"
        },
        {
          "value": "ALAN KEYES",
          "display": "Alan Keyes"
        },
        {
          "value": "ALBERT HENDERSHOT",
          "display": "Albert Hendershot"
        },
        {
          "value": "BILL GARDNER",
          "display": "Bill Gardner"
        },
        {
          "value": "BRIAN KEMP",
          "display": "Brian Kemp"
        },
        {
          "value": "CLARENCE THOMAS",
          "display": "Clarence Thomas"
        },
        {
          "value": "DAMON DUNN",
          "display": "Damon Dunn"
        },
        {
          "value": "DAN DUMEZICH",
          "display": "Dan Dumezich"
        },
        {
          "value": "DAVID MANNING",
          "display": "David Manning"
        },
        {
          "value": "DAVID SHUSTER",
          "display": "David Shuster"
        },
        {
          "value": "DIANNE FEINSTEIN",
          "display": "Dianne Feinstein"
        },
        {
          "value": "DONALD STERLING",
          "display": "Donald Sterling"
        },
        {
          "value": "EDWARD NOONAN",
          "display": "Edward Noonan"
        },
        {
          "value": "ELIZABETH EMKEN",
          "display": "Elizabeth Emken"
        },
        {
          "value": "JAMES DAVID MANNING",
          "display": "James David Manning"
        },
        {
          "value": "JAMES GRINOLS",
          "display": "James Grinols"
        },
        {
          "value": "JOE ARPAIO",
          "display": "Joe Arpaio"
        }
      ],
      "company": [
        {
          "value": "BAXTER INTERNATIONAL",
          "display": "Baxter International"
        },
        {
          "value": "GOLDMAN SACHS",
          "display": "Goldman Sachs"
        },
        {
          "value": "GOOGLE",
          "display": "Google"
        }
      ],
      "geo": [
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "NEW HAMPSHIRE",
          "display": "New Hampshire"
        },
        {
          "value": "INDIANA",
          "display": "Indiana"
        },
        {
          "value": "TEXAS",
          "display": "Texas"
        },
        {
          "value": "MISSISSIPPI",
          "display": "Mississippi"
        },
        {
          "value": "ISRAEL",
          "display": "Israel"
        },
        {
          "value": "ALABAMA",
          "display": "Alabama"
        },
        {
          "value": "HAWAII",
          "display": "Hawaii"
        },
        {
          "value": "SACRAMENTO",
          "display": "Sacramento"
        },
        {
          "value": "KANSAS",
          "display": "Kansas"
        },
        {
          "value": "MINNESOTA",
          "display": "Minnesota"
        },
        {
          "value": "SOVIET UNION",
          "display": "Soviet Union"
        },
        {
          "value": "CHISINAU",
          "display": "Chisinau"
        },
        {
          "value": "MOLDOVA",
          "display": "Moldova"
        },
        {
          "value": "WEST VIRGINIA",
          "display": "West Virginia"
        },
        {
          "value": "AFGHANISTAN",
          "display": "Afghanistan"
        },
        {
          "value": "ARIZONA",
          "display": "Arizona"
        },
        {
          "value": "COLORADO",
          "display": "Colorado"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        }
      ],
      "wordcount": 3290,
      "exacthash": "xh5fRHMGvX9WFN/kc7dCGw==",
      "nearhash": "aflRANfCziXjQsmSq/uXXA==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Orly_Taitz",
      "sourcecsv1": [
        "Orly Taitz",
        "Born",
        "Citizenship",
        "Alma mater",
        "Occupation",
        "Known for",
        "Political party",
        "Spouse",
        "Children",
        "Website"
      ],
      "sourcecsv2": [
        "Moldavian_Soviet_Socialist_Republic",
        "Soviet_Union",
        "Chi%C8%99in%C4%83u",
        "Hebrew_University_of_Jerusalem",
        "Taft_Law_School",
        "President_Obama",
        "Natural_born_citizen_of_the_United_States",
        "Republican_Party_(United_States)",
        "Hebrew_language",
        "Conspiracy_theorist",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Conspiracy_theory",
        "Frivolous_litigation",
        "Jewish",
        "Aliyah",
        "Israel",
        "Las_Vegas_Valley",
        "Naturalization",
        "Laguna_Niguel,_California",
        "Mission_Viejo,_California",
        "Rancho_Santa_Margarita,_California",
        "Black_belt_(martial_arts)",
        "Taekwondo",
        "Controversy_over_ethnic_and_linguistic_identity_in_Moldova",
        "The_Orange_County_Register",
        "Hamas",
        "Hezbollah",
        "American_Israel_Public_Affairs_Committee",
        "The_Holocaust",
        "Kishinev_pogrom",
        "Natural-born_citizen_of_the_United_States",
        "Selective_Service_System",
        "Social_Security_number",
        "Qassam_rocket",
        "FEMA_camps_conspiracy_theory",
        "Federal_Emergency_Management_Agency",
        "Internment",
        "Osama_bin_Laden",
        "Death_of_Osama_bin_Laden",
        "Sandy_Hook_Elementary_School_shooting_conspiracy_theories",
        "Sandy_Hook_Elementary_School_shooting",
        "Goldman_Sachs",
        "United_States_Department_of_the_Treasury",
        "Baxter_International",
        "Avian_influenza",
        "Vaccine",
        "Alcee_Hastings",
        "United_States_House_of_Representatives",
        "Labor_camp",
        "Hugo_Ch%C3%A1vez",
        "FactCheck",
        "Annenberg_Foundation",
        "PayPal",
        "Google",
        "Ted_Cruz",
        "Marco_Rubio",
        "Bobby_Jindal",
        "Alan_Keyes",
        "Debra_Bowen",
        "U.S._Supreme_Court",
        "David_O._Carter",
        "Subornation_of_perjury",
        "United_States_Court_of_Appeals_for_the_Ninth_Circuit",
        "United_States_Army_Reserve",
        "United_States_Court_of_Appeals_for_the_Eleventh_Circuit",
        "United_States_Army",
        "Restraining_order",
        "Clay_D._Land",
        "Talking_Points_Memo",
        "Treason",
        "Order_to_show_cause",
        "Wikisource",
        "Sanctions_(law)",
        "Federal_Rules_of_Civil_Procedure",
        "Associate_Justice_of_the_Supreme_Court_of_the_United_States",
        "Clarence_Thomas",
        "Chief_Justice_of_the_United_States",
        "John_Roberts",
        "Abstract_of_judgment",
        "Lien",
        "Samuel_Alito",
        "Pro_se_legal_representation_in_the_United_States",
        "Quo_warranto",
        "United_States_district_court",
        "Royce_C._Lamberth",
        "Tilting_at_windmills",
        "Freedom_of_Information_Act",
        "Social_Security_Administration",
        "Social_security_number",
        "Hawaii_Department_of_Health",
        "Hawaii_State_Circuit_Courts",
        "Kathryn_Ruemmler",
        "Freedom_of_Information_Act_(United_States)",
        "Sisyphean",
        "William_L._O%27Brien",
        "Bill_Gardner_(politician)",
        "D.J._Bettencourt",
        "Georgia_Secretary_of_State",
        "Brian_Kemp",
        "Administrative_law_judge",
        "Natural-born-citizen_clause_of_the_U.S._Constitution",
        "Rogers_Cadenhead",
        "Pro_hac_vice",
        "Joe_Arpaio",
        "Sacramento,_California",
        "Keith_Russell_Judd",
        "American_Independent_Party",
        "Electoral_College_(United_States)",
        "Morrison_C._England_Jr.",
        "Kalaupapa_Airport",
        "Medical_cannabis",
        "Initiative",
        "A%26E_(TV_channel)",
        "Duck_Dynasty#Phil_Robertson.27s_GQ_Interview",
        "National_Basketball_Association",
        "Donald_Sterling",
        "Shaquille_O%27Neal",
        "Standing_(law)",
        "NSA",
        "FBI",
        "Centers_for_Disease_Control",
        "Ebola",
        "California_Secretary_of_State_election,_2010",
        "Secretary_of_State_of_California",
        "Primary_election",
        "National_Football_League",
        "Damon_Dunn",
        "Orly_Taitz",
        "David_O._Carter#Barnett_v._Obama",
        "California_Courts_of_Appeal",
        "United_States_Senate_election_in_California,_2012",
        "Dianne_Feinstein",
        "Blanket_primary",
        "Elizabeth_Emken",
        "Sharron_Angle",
        "California_Court_of_Appeal",
        "California_Attorney_General_election,_2014",
        "California_Attorney_General",
        "James_David_Manning",
        "Tea_Party_Nation",
        "Channel_10_(Israel)",
        "London_at_Kirschenbaum",
        "Channel_1_(Israel)",
        "Arutz_Sheva",
        "Russian_language",
        "Israel_Plus",
        "Vesti_(Israeli_newspaper)",
        "David_Shuster",
        "Tamron_Hall",
        "MSNBC",
        "Brownshirt",
        "Fox_News",
        "Bill_O%27Reilly_(political_commentator)",
        "Lawrence_O%27Donnell",
        "Selective_Service",
        "Barack_Obama_religion_conspiracy_theories",
        "Time_Magazine",
        "Tablet_Magazine",
        "OC_Weekly",
        "Haaretz",
        "The_Colbert_Report",
        "Comedy_Central",
        "Washington_Jewish_Week",
        "Salon_(magazine)",
        "Esquire_(magazine)",
        "U.S._News_%26_World_Report",
        "Tampa_Bay_Times",
        "Washington_Post",
        "Orange_County_Weekly",
        "United_States_District_Court_for_the_Central_District_of_California",
        "Huffington_Post",
        "Los_Angeles_Times",
        "San_Jose_Mercury_News",
        "Atlanta_Journal-Constitution",
        "Ledger-Enquirer",
        "The_Atlanta_Journal-Constitution",
        "The_Washington_Examiner",
        "Supreme_Court_of_the_United_States",
        "United_Press_International",
        "Legal_Times",
        "Honolulu_Star-Advertiser",
        "KHON-TV",
        "Raw_Story",
        "The_McClatchy_Company",
        "Concord_Monitor",
        "New_Hampshire_Union_Leader",
        "The_Economist",
        "WGCL-TV",
        "The_Birmingham_News",
        "Salon_(website)",
        "Phoenix_New_Times",
        "Topeka_Capitol-Journal",
        "The_Topeka_Capital-Journal",
        "WLBT",
        "Sacramento_Bee",
        "Valley_Morning_Star",
        "ABC_News",
        "David_Weigel",
        "The_Washington_Independent",
        "Wayback_Machine",
        "Public_Policy_Polling",
        "The_Huffington_Post",
        "Associated_Press",
        "The_National_Memo",
        "The_Christian_Science_Monitor",
        "IMDb"
      ],
      "sourcestr1": "Orly_Taitz",
      "sourcestr2": "Q7103338",
      "sourcestr3": "Q5",
      "sourcestr4": "human",
      "sourcevarchar3": "[{\"Orly Taitz\":\"Taitz in 2008\",\"Born\":[\"August 30, 1960\",\"(age60)\",\"Kishinev,\",\"Moldavian SSR\",\",\",\"Soviet Union\",\"(now\",\"Chi\\u0219in\\u0103u\",\", Moldova)\"],\"Citizenship\":[\"American,\",\"Israeli\"],\"Alma mater\":[\"Hebrew University of Jerusalem\",\"Taft Law School\"],\"Occupation\":\"Dentist, lawyer\",\"Known for\":[\"Filing lawsuits challenging\",\"President Obama\",\"'s\",\"eligibility\",\"to serve as President of the United States\"],\"Political party\":[\"None (previously\",\"Republican\"],\"Spouse\":\"Yosef Taitz\",\"Children\":\"3 sons\",\"Website\":\"www.orlytaitzesq.com\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Orly_Taitz_by_FiredUpMissouri_cropped.jpg/1200px-Orly_Taitz_by_FiredUpMissouri_cropped.jpg",
      "sourcedouble1": 0.003536,
      "entity1": [
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "15",
          "display": "15"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "11",
          "display": "11"
        },
        {
          "value": "20000",
          "display": "20000"
        },
        {
          "value": "30",
          "display": "30"
        },
        {
          "value": "12",
          "display": "12"
        },
        {
          "value": "17",
          "display": "17"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "2015",
          "display": "2015"
        },
        {
          "value": "7",
          "display": "7"
        },
        {
          "value": "8",
          "display": "8"
        }
      ],
      "date": [
        {
          "value": "1960-08-30",
          "display": "1960-08-30"
        },
        {
          "value": "2009-08-03",
          "display": "2009-08-03"
        },
        {
          "value": "2010-01-27",
          "display": "2010-01-27"
        },
        {
          "value": "2010-03-15",
          "display": "2010-03-15"
        },
        {
          "value": "2010-04-14",
          "display": "2010-04-14"
        },
        {
          "value": "2010-05-12",
          "display": "2010-05-12"
        },
        {
          "value": "2010-06-17",
          "display": "2010-06-17"
        },
        {
          "value": "2011-01-10",
          "display": "2011-01-10"
        },
        {
          "value": "2011-03-17",
          "display": "2011-03-17"
        },
        {
          "value": "2011-08-30",
          "display": "2011-08-30"
        },
        {
          "value": "2011-10-12",
          "display": "2011-10-12"
        },
        {
          "value": "2011-10-17",
          "display": "2011-10-17"
        },
        {
          "value": "2012-05-01",
          "display": "2012-05-01"
        },
        {
          "value": "2012-06-05",
          "display": "2012-06-05"
        },
        {
          "value": "2012-11-02",
          "display": "2012-11-02"
        },
        {
          "value": "2012-12-13",
          "display": "2012-12-13"
        },
        {
          "value": "2013-01-03",
          "display": "2013-01-03"
        },
        {
          "value": "2013-12-20",
          "display": "2013-12-20"
        },
        {
          "value": "2014-01-09",
          "display": "2014-01-09"
        },
        {
          "value": "2014-08-27",
          "display": "2014-08-27"
        }
      ],
      "entity4": [
        {
          "value": "USD 20000",
          "display": "USD 20000"
        },
        {
          "value": "USD 4000",
          "display": "USD 4000"
        },
        {
          "value": "USD 10000",
          "display": "USD 10000"
        }
      ],
      "entity12": [
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "DEATH",
          "display": "Death"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        }
      ],
      "entity13": [
        {
          "value": "DIRECTOR",
          "display": "Director"
        }
      ],
      "event_date": [
        {
          "value": "(BIRTH)#(1960-08-30)",
          "display": "(Birth)#(1960-08-30)"
        },
        {
          "value": "(BIRTH)#(2011-10-12)",
          "display": "(Birth)#(2011-10-12)"
        },
        {
          "value": "(BIRTH)#(2011-10-17)",
          "display": "(Birth)#(2011-10-17)"
        },
        {
          "value": "(DEFEAT)#(2010-06-17)",
          "display": "(Defeat)#(2010-06-17)"
        },
        {
          "value": "(ELECTION)#(2012-06-05)",
          "display": "(Election)#(2012-06-05)"
        },
        {
          "value": "(ELECTION)#(2013-01-03)",
          "display": "(Election)#(2013-01-03)"
        }
      ],
      "person_cooc": [
        {
          "value": "(DIRECTOR)#(LORETTA FUDDY)",
          "display": "(Director)#(Loretta Fuddy)"
        }
      ],
      "rank": 11,
      "displayTitle": "Orly Taitz",
      "relevantExtracts": "theory that President <b>Obama </b>... unrelated to President <b>Obama</b>... claims regarding President <b>Obama</b>... claimed that President <b>Obama </b>... claims against President <b>Obama</b>... homosexuals from President <b>Obama</b>... That President <b>Obama </b>... connection with President <b>Obama</b>... the name &quot;Barack <b>Obama</b>... President <b>Obama</b>"
    },
    {
      "id": "/Web/Wikipedia/|2012_United_States_presidential_election",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.967317,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "The incumbent Democratic President Barack {b}Obama{nb} , and his running mate , Vice President Joe Biden , were elected to a second term.",
        "131,130",
        "72181,567",
        "As the incumbent president , {b}Obama{nb} secured the Democratic nomination with no serious opposition.",
        "407,96",
        "73383,299",
        "Other issues included long-term federal budget issues, the future of social insurance programs , and the Affordable Care Act , {b}Obama{nb}'s marquee legislative program.",
        "999,163",
        "74702,443",
        "{b}Obama{nb} defeated Romney, winning a majority of both the Electoral College and the popular vote .",
        "1442,94",
        "75763,399",
        "{b}Obama{nb} won 332 electoral votes and 51.1% of the popular vote compared to Romney's 206 electoral votes and 47.2%.",
        "1537,111",
        "76163,261",
        "{b}Obama{nb} was the first incumbent since Franklin D. Roosevelt in 1944 to win reelection with fewer electoral votes and a smaller popular vote margin than had been won in the previous election, and was also the first two-term president since Ronald Reagan to win both his presidential bids with a majority of the nationwide popular vote (50% or more).",
        "1649,346",
        "76425,584",
        "{b}Obama{nb} did not hold onto Indiana , North Carolina , or Nebraska's 2nd congressional district , but crucially won all 18 \" blue wall \" states and defeated Romney in other swing states the Republicans had won in 2000 and 2004 , most notably Florida and Ohio .",
        "2105,256",
        "77229,1259",
        "Ultimately, of the 9 swing states identified by the Washington Post in the 2012 election, {b}Obama{nb} won 8, losing only North Carolina.",
        "2362,130",
        "78489,130",
        "{b}Obama{nb}, the NAACP , and the Democratic Party fought against many of the new state laws.",
        "3335,86",
        "98004,125",
        "The {b}Obama{nb} campaign fought against the Ohio law , pushing for a petition and statewide referendum to repeal it in time for the 2012 election.",
        "4187,140",
        "100224,191"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "173,5,436,5,1126,5,1442,5,1537,5,1649,5,2105,5,2452,5,3335,5,4191,5,5416,5,5632,5,14843,5,15719,5,15889,5,16072,5,16343,5,16756,5,17456,5,18120,5,18353,5,18469,5,18505,5,20060,5,20126,5,20448,5,20785,5,21325,5,21807,5,22619,5,22699,5,22899,5,23277,5,24273,5,24371,5,24463,5,24791,5,24912,5,24973,5,32419,5,32616,5,33831,5,34463,5,34720,5,34984,5,35075,5,35154,5,35295,5,35394,5,35438,5,35956,5,36228,5,36386,5,36610,5,37101,5,40037,5,40146,5,40504,5,41116,5,41269,5,42248,5,42524,5,43540,5,43680,5,43768,5,44491,5,44612,5,45504,5,45756,5,46118,5,46617,5;72457,5,73497,5,75109,5,75763,5,76163,5,76425,5,77229,5,78579,5,98004,5,100228,5,104466,5,127131,5,202953,5,205463,5,205867,5,206169,5,206716,5,207933,5,216049,5,218866,5,220272,5,220945,5,222161,5,228024,5,228198,5,228520,5,229044,5,229944,5,230801,5,233176,5,233376,5,233667,5,234838,5,241634,5,242504,5,245084,5,246680,5,246931,5,247373,5,304563,5,305161,5,309596,5,312530,5,312807,5,313483,5,313574,5,313653,5,313924,5,314023,5,314067,5,315059,5,315643,5,316949,5,317287,5,319295,5,340557,5,340716,5,342556,5,344128,5,344511,5,346773,5,347402,5,349935,5,350075,5,350163,5,353757,5,353878,5,360987,5,363590,5,367163,5,371676,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "2012 United States presidential election",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-31 20:59:09",
      "indexationtime": "2020-09-02 01:42:02",
      "version": "sm5uV6JUM5EuyIo2OFhZ4w==",
      "size": 1044051,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "2012_United_States_presidential_election",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "MITT ROMNEY",
          "display": "Mitt Romney"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "GARY JOHNSON",
          "display": "Gary Johnson"
        },
        {
          "value": "JILL STEIN",
          "display": "Jill Stein"
        },
        {
          "value": "NEWT GINGRICH",
          "display": "Newt Gingrich"
        },
        {
          "value": "RON PAUL",
          "display": "Ron Paul"
        },
        {
          "value": "VIRGIL GOODE",
          "display": "Virgil Goode"
        },
        {
          "value": "RICK SANTORUM",
          "display": "Rick Santorum"
        },
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "FRANKLIN D. ROOSEVELT",
          "display": "Franklin D. Roosevelt"
        },
        {
          "value": "RICK PERRY",
          "display": "Rick Perry"
        },
        {
          "value": "HERMAN CAIN",
          "display": "Herman Cain"
        },
        {
          "value": "MICHELE BACHMANN",
          "display": "Michele Bachmann"
        },
        {
          "value": "TIM PAWLENTY",
          "display": "Tim Pawlenty"
        },
        {
          "value": "PAUL RYAN",
          "display": "Paul Ryan"
        },
        {
          "value": "JOE BIDEN",
          "display": "Joe Biden"
        },
        {
          "value": "GEORGE W. BUSH",
          "display": "George W. Bush"
        },
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "DONALD TRUMP",
          "display": "Donald Trump"
        },
        {
          "value": "JON HUNTSMAN",
          "display": "Jon Huntsman"
        }
      ],
      "company": [
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        },
        {
          "value": "DOW JONES",
          "display": "Dow Jones"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "IOWA",
          "display": "Iowa"
        },
        {
          "value": "PENNSYLVANIA",
          "display": "Pennsylvania"
        },
        {
          "value": "MASSACHUSETTS",
          "display": "Massachusetts"
        },
        {
          "value": "NEBRASKA",
          "display": "Nebraska"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        },
        {
          "value": "OHIO",
          "display": "Ohio"
        },
        {
          "value": "WISCONSIN",
          "display": "Wisconsin"
        },
        {
          "value": "NEW HAMPSHIRE",
          "display": "New Hampshire"
        },
        {
          "value": "MAINE",
          "display": "Maine"
        },
        {
          "value": "VIRGINIA",
          "display": "Virginia"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "UTAH",
          "display": "Utah"
        },
        {
          "value": "SOUTH CAROLINA",
          "display": "South Carolina"
        },
        {
          "value": "MINNESOTA",
          "display": "Minnesota"
        },
        {
          "value": "TEXAS",
          "display": "Texas"
        },
        {
          "value": "COLORADO",
          "display": "Colorado"
        },
        {
          "value": "NEW YORK",
          "display": "New York"
        },
        {
          "value": "JOHNSON",
          "display": "Johnson"
        },
        {
          "value": "TENNESSEE",
          "display": "Tennessee"
        }
      ],
      "wordcount": 5578,
      "exacthash": "Q5T5Y4W2Xxl+p6sKS5MXwA==",
      "nearhash": "e9v6WCaYPvcn20dMtF+bBQ==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/2012_United_States_presidential_election",
      "sourcecsv1": [
        "538 members of the Electoral College 270 electoral votes needed to win",
        "Turnout"
      ],
      "sourcecsv2": [
        "2012_United_States_elections",
        "2008_United_States_presidential_election",
        "2016_United_States_presidential_election",
        "United_States_Electoral_College",
        "Nationwide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Percentage_point",
        "Barack_Obama",
        "Mitt_Romney",
        "Democratic_Party_(United_States)",
        "Republican_Party_(United_States)",
        "Illinois",
        "Massachusetts",
        "Joe_Biden",
        "Paul_Ryan",
        "Washington,_D.C.",
        "Electoral_votes",
        "President_of_the_United_States",
        "Timeline_of_the_2012_United_States_presidential_election",
        "2012_United_States_presidential_debates",
        "List_of_2012_United_States_presidential_electors",
        "Nationwide_opinion_polling_for_the_United_States_2012_presidential_election",
        "Statewide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Political_parties_in_the_United_States",
        "2012_Democratic_Party_presidential_candidates",
        "2012_Democratic_Party_presidential_primaries",
        "Barack_Obama_2012_presidential_campaign",
        "2012_Democratic_National_Convention",
        "Prelude_to_the_2012_Republican_Party_presidential_primaries",
        "2012_Republican_Party_presidential_candidates",
        "2012_Republican_Party_presidential_debates_and_forums",
        "2012_Republican_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2012_Republican_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2012_Republican_Party_presidential_primaries",
        "2012_Straw_polls_for_the_Republican_Party_presidential_primaries",
        "Results_of_the_2012_Republican_Party_presidential_primaries",
        "Mitt_Romney_2012_presidential_campaign",
        "2012_Republican_Party_vice_presidential_candidate_selection",
        "2012_Republican_National_Convention",
        "Endorsements_in_the_2012_Republican_Party_presidential_primaries",
        "Third_party_(United_States)",
        "Libertarian_Party_(United_States)",
        "Libertarian_Party_presidential_candidates,_2012",
        "Libertarian_Party_(United_States)_presidential_primaries,_2012",
        "Gary_Johnson_2012_presidential_campaign",
        "2012_Libertarian_National_Convention",
        "Green_Party_of_the_United_States",
        "2012_Green_Party_presidential_primaries",
        "Jill_Stein_2012_presidential_campaign",
        "2012_Green_National_Convention",
        "Constitution_Party_(United_States)",
        "Virgil_Goode_2012_presidential_campaign",
        "2012_Constitution_Party_National_Convention",
        "Justice_Party_(United_States)",
        "Rocky_Anderson",
        "Americans_Elect",
        "Third-party_and_independent_candidates_for_the_2012_United_States_presidential_election",
        "2012_United_States_House_of_Representatives_elections",
        "2012_United_States_Senate_elections",
        "2012_United_States_gubernatorial_elections",
        "Vice_President_of_the_United_States",
        "Joe_Biden#Vice_Presidency_(2009–2017)",
        "United_States_presidential_election",
        "Running_mate",
        "Governor_of_Massachusetts",
        "United_States_House_of_Representatives",
        "Wisconsin",
        "President_(government_title)",
        "Conservatism_in_the_United_States",
        "Rick_Santorum",
        "Speaker_of_the_United_States_House_of_Representatives",
        "Newt_Gingrich",
        "Great_Recession",
        "United_States_federal_budget",
        "Social_insurance",
        "Patient_Protection_and_Affordable_Care_Act",
        "Foreign_policy",
        "Iraq_War",
        "Iran",
        "Nuclear_program_of_Iran",
        "Terrorism",
        "Super_PACs",
        "Electoral_College_(United_States)",
        "List_of_United_States_presidential_elections_by_popular_vote_margin",
        "Popular_vote_(United_States_presidential_election)",
        "Franklin_D._Roosevelt",
        "1944_United_States_presidential_election",
        "Ronald_Reagan",
        "2012_United_States_presidential_election_in_Indiana",
        "2012_United_States_presidential_election_in_North_Carolina",
        "Nebraska%27s_2nd_congressional_district",
        "Blue_wall_(politics)",
        "Swing_states",
        "2000_United_States_presidential_election",
        "2004_United_States_presidential_election",
        "2012_United_States_presidential_election_in_Florida",
        "2012_United_States_presidential_election_in_Ohio",
        "Voter_fraud",
        "Florida",
        "Georgia_(U.S._state)",
        "Ohio",
        "Tennessee",
        "West_Virginia",
        "Kansas",
        "South_Carolina",
        "Texas",
        "Voter_ID_laws_(United_States)",
        "Driver%27s_license",
        "Passport",
        "NAACP",
        "Bill_Clinton",
        "Poll_tax_(United_States)",
        "Jim_Crow_laws",
        "Disfranchisement_after_Reconstruction_era",
        "Black_people",
        "Hispanic_and_Latino_Americans",
        "Rolling_Stone",
        "American_Legislative_Exchange_Council",
        "Law_of_Ohio",
        "Pennsylvania",
        "Paper_candidate",
        "United_States_presidential_primary",
        "Guam",
        "Puerto_Rico",
        "U.S._Virgin_Islands",
        "American_Samoa",
        "Democrats_Abroad",
        "Superdelegate",
        "Presumptive_nominee",
        "Political_positions_of_Barack_Obama",
        "Electoral_history_of_Barack_Obama",
        "Early_life_and_career_of_Barack_Obama",
        "Family_of_Barack_Obama",
        "Public_image_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "United_States_Senate_career_of_Barack_Obama",
        "Presidency_of_Barack_Obama",
        "Timeline_of_the_Barack_Obama_presidency",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Obama_Doctrine",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_2008_presidential_campaign",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Second_inauguration_of_Barack_Obama",
        "Immigration_reform_in_the_United_States#Obama&#39",
        "s_executive_actions_of_November_2014",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "Barack_Obama_Presidential_Center",
        "Obama_Foundation",
        "One_America_Appeal",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "2009_Nobel_Peace_Prize",
        "List_of_Presidents_of_the_United_States",
        "List_of_Vice_Presidents_of_the_United_States",
        "Ron_Paul",
        "Minnesota",
        "Tim_Pawlenty",
        "John_McCain_2008_presidential_campaign",
        "Greenville,_South_Carolina",
        "Herman_Cain",
        "Gary_Johnson",
        "Jon_Huntsman,_Jr.",
        "Michele_Bachmann",
        "Ames_Straw_Poll",
        "Thaddeus_McCotter",
        "Moderate",
        "Donald_Trump",
        "Sarah_Palin",
        "Chris_Christie",
        "Rick_Perry",
        "Super_Tuesday,_2012",
        "Republican_National_Committee",
        "Republican_National_Convention",
        "Political_positions_of_Mitt_Romney",
        "Electoral_history_of_Mitt_Romney",
        "Business_career_of_Mitt_Romney",
        "Salt_Lake_Organizing_Committee_for_the_Olympic_and_Paralympic_Winter_Games_of_2002",
        "Public_image_of_Mitt_Romney",
        "Governorship_of_Mitt_Romney",
        "Massachusetts_health_care_reform",
        "Mitt_Romney_2008_presidential_campaign",
        "2008_Republican_Party_presidential_primaries",
        "2008_Republican_National_Convention",
        "Binders_full_of_women",
        "List_of_Mitt_Romney_2012_presidential_campaign_endorsements",
        "Mitt_Romney#U.S._Senator_from_Utah",
        "No_Apology",
        "Mitt_Romney%27s_2016_anti-Trump_speech",
        "United_States_Senate",
        "List_of_Governors_of_Massachusetts",
        "Buddy_Roemer",
        "Texas%27s_14th_congressional_district",
        "List_of_Speakers_of_the_United_States_House_of_Representatives",
        "Governor_of_Louisiana",
        "List_of_governors_of_Texas",
        "US_Ambassador_to_China",
        "Ron_Paul_2012_presidential_campaign",
        "Newt_Gingrich_2012_presidential_campaign",
        "Rick_Santorum_presidential_campaign,_2012",
        "Buddy_Roemer_presidential_campaign,_2012",
        "Rick_Perry_presidential_campaign,_2012",
        "Jon_Huntsman_presidential_campaign,_2012",
        "Fred_Karger",
        "U.S._Representative",
        "List_of_Governors_of_New_Mexico",
        "Federal_Reserve_Bank_of_Kansas_City",
        "Michigan",
        "Governor_of_Minnesota",
        "Political_consultant",
        "Michele_Bachmann_presidential_campaign,_2012",
        "Gary_Johnson_presidential_campaign,_2012",
        "Herman_Cain_presidential_campaign,_2012",
        "Thaddeus_McCotter_presidential_campaign,_2012",
        "Tim_Pawlenty_presidential_campaign,_2012",
        "Fred_Karger_2012",
        "Write-in",
        "Jim_Gray_(jurist)",
        "Jill_Stein",
        "Cheri_Honkala",
        "Virgil_Goode",
        "Jim_Clymer",
        "Luis_J._Rodriguez",
        "Jill_Stein_presidential_campaign,_2012",
        "Virgil_Goode_presidential_campaign,_2012",
        "Barack_Obama_presidential_campaign,_2012",
        "Mitt_Romney_presidential_campaign,_2012",
        "Ballot_access",
        "Negative_campaigning",
        "Grassroots",
        "Americans_for_Prosperity",
        "Political_action_committee",
        "The_Washington_Post",
        "Swing_state",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Solyndra",
        "The_Wall_Street_Journal",
        "Constitution_Party_National_Convention",
        "Nashville,_Tennessee",
        "Las_Vegas,_Nevada",
        "Baltimore",
        "Tampa,_Florida",
        "Charlotte,_North_Carolina",
        "United_States_presidential_election_debates,_2012",
        "Commission_on_Presidential_Debates",
        "Social_Security_(United_States)",
        "Medicare_(United_States)",
        "Medicaid",
        "University_of_Denver",
        "Denver,_Colorado",
        "Jim_Lehrer",
        "Centre_College",
        "Danville,_Kentucky",
        "Kentucky",
        "Martha_Raddatz",
        "Hofstra_University",
        "Hempstead_(village),_New_York",
        "Candy_Crowley",
        "Lynn_University",
        "Boca_Raton,_Florida",
        "Bob_Schieffer",
        "Ron_Klain",
        "John_Kerry",
        "Hilton_Hotel",
        "Chicago",
        "Larry_King",
        "Free_%26_Equal_Elections_Foundation",
        "RT_(TV_network)",
        "Thom_Hartmann",
        "Christina_Tobin",
        "Conservative_Political_Action_Conference",
        "Radio_personality",
        "Rush_Limbaugh",
        "The_Rush_Limbaugh_Show",
        "You_didn%27t_build_that",
        "Roanoke,_Virginia",
        "Virginia",
        "47_percent",
        "Second_U.S._presidential_debate_of_2012",
        "Third_U.S._presidential_debate_of_2012",
        "Shovel-ready",
        "Affordable_Healthcare_for_America_Act",
        "2012_Summer_Olympics",
        "Omnishambles",
        "Hashtag",
        "Twitter",
        "Collins_English_Dictionary",
        "Spreadex",
        "Battleground_state",
        "Delaware",
        "New_Mexico",
        "James_P._Gray",
        "California",
        "Green_Party_(United_States)",
        "Roseanne_Barr",
        "Peace_and_Freedom_Party",
        "Hawaii",
        "Cindy_Sheehan",
        "Utah",
        "Tom_Hoefling",
        "Iowa",
        "Andre_Barnett",
        "Reform_Party_of_the_United_States_of_America",
        "New_York_(state)",
        "Arkansas",
        "Alabama",
        "2012_United_States_presidential_election_in_Alabama",
        "Alaska",
        "2012_United_States_presidential_election_in_Alaska",
        "Arizona",
        "2012_United_States_presidential_election_in_Arizona",
        "2012_United_States_presidential_election_in_Arkansas",
        "2012_United_States_presidential_election_in_California",
        "Colorado",
        "2012_United_States_presidential_election_in_Colorado",
        "Connecticut",
        "2012_United_States_presidential_election_in_Connecticut",
        "2012_United_States_presidential_election_in_Delaware",
        "2012_United_States_presidential_election_in_the_District_of_Columbia",
        "2012_United_States_presidential_election_in_Georgia",
        "2012_United_States_presidential_election_in_Hawaii",
        "Idaho",
        "2012_United_States_presidential_election_in_Idaho",
        "2012_United_States_presidential_election_in_Illinois",
        "Indiana",
        "2012_United_States_presidential_election_in_Iowa",
        "2012_United_States_presidential_election_in_Kansas",
        "2012_United_States_presidential_election_in_Kentucky",
        "Louisiana",
        "2012_United_States_presidential_election_in_Louisiana",
        "Maine",
        "2012_United_States_presidential_election_in_Maine",
        "Maryland",
        "2012_United_States_presidential_election_in_Maryland",
        "2012_United_States_presidential_election_in_Massachusetts",
        "2012_United_States_presidential_election_in_Michigan",
        "2012_United_States_presidential_election_in_Minnesota",
        "Mississippi",
        "2012_United_States_presidential_election_in_Mississippi",
        "Missouri",
        "2012_United_States_presidential_election_in_Missouri",
        "Montana",
        "2012_United_States_presidential_election_in_Montana",
        "Nebraska",
        "2012_United_States_presidential_election_in_Nebraska",
        "Nevada",
        "2012_United_States_presidential_election_in_Nevada",
        "New_Hampshire",
        "2012_United_States_presidential_election_in_New_Hampshire",
        "New_Jersey",
        "2012_United_States_presidential_election_in_New_Jersey",
        "2012_United_States_presidential_election_in_New_Mexico",
        "2012_United_States_presidential_election_in_New_York",
        "North_Carolina",
        "North_Dakota",
        "2012_United_States_presidential_election_in_North_Dakota",
        "Oklahoma",
        "2012_United_States_presidential_election_in_Oklahoma",
        "Oregon",
        "2012_United_States_presidential_election_in_Oregon",
        "2012_United_States_presidential_election_in_Pennsylvania",
        "Rhode_Island",
        "2012_United_States_presidential_election_in_Rhode_Island",
        "2012_United_States_presidential_election_in_South_Carolina",
        "South_Dakota",
        "2012_United_States_presidential_election_in_South_Dakota",
        "2012_United_States_presidential_election_in_Tennessee",
        "2012_United_States_presidential_election_in_Texas",
        "2012_United_States_presidential_election_in_Utah",
        "Vermont",
        "2012_United_States_presidential_election_in_Vermont",
        "2012_United_States_presidential_election_in_Virginia",
        "Washington_(state)",
        "2012_United_States_presidential_election_in_Washington_(state)",
        "2012_United_States_presidential_election_in_West_Virginia",
        "2012_United_States_presidential_election_in_Wisconsin",
        "Wyoming",
        "2012_United_States_presidential_election_in_Wyoming",
        "Randall_Terry",
        "Maine%27s_1st_congressional_district",
        "Maine%27s_2nd_congressional_district",
        "Nebraska%27s_1st_congressional_district",
        "Nebraska%27s_3rd_congressional_district",
        "Eastern_Standard_Time_(North_America)",
        "Karl_Rove",
        "Concession_(politics)",
        "Pakistan-United_States_relations",
        "Dow_Jones_Industrial_Average",
        "NASDAQ",
        "S%26P_500",
        "Liberalism_in_the_United_States",
        "Moderates",
        "Independent_(voter)",
        "White_American",
        "African_American",
        "Asian_American",
        "Protestantism",
        "Catholic_Church_in_the_United_States",
        "Mormon",
        "American_Jews",
        "Irreligion",
        "Christian_right",
        "LGBT",
        "Secondary_education_in_the_United_States",
        "Higher_education_in_the_United_States",
        "Postgraduate_education",
        "Labor_unions_in_the_United_States",
        "Northeastern_United_States",
        "Midwestern_United_States",
        "Southern_United_States",
        "Western_United_States",
        "Percentage",
        "Somerville,_New_Jersey",
        "George_W._Bush",
        "Thomas_Jefferson",
        "James_Madison",
        "James_Monroe",
        "1940_United_States_presidential_election",
        "Dwight_Eisenhower",
        "Andrew_Jackson",
        "Al_Gore",
        "John_Fr%C3%A9mont",
        "1856_United_States_presidential_election",
        "1972_United_States_presidential_election",
        "County_(United_States)",
        "Ed_Clark",
        "1980_United_States_presidential_election",
        "List_of_female_United_States_presidential_and_vice-presidential_candidates",
        "1988_United_States_presidential_election",
        "Plurality_(voting)",
        "Cartogram",
        "Treemapping",
        "Empire_State_Building",
        "New_York_City",
        "McCormick_Place",
        "Planned_presidential_transition_of_Mitt_Romney",
        "USA_Today",
        "CNN",
        "Politico_(newspaper)",
        "Reuters",
        "The_Australian",
        "The_Hill_(newspaper)",
        "The_Christian_Science_Monitor",
        "Bloomberg_News",
        "Wayback_Machine",
        "CBS_News",
        "The_New_York_Times",
        "NBC_News",
        "BBC",
        "ABC_News",
        "The_Patriot_News",
        "Associated_Press",
        "National_Journal",
        "Wikinews",
        "Reason_(magazine)",
        "The_Baltimore_Sun",
        "Time_(magazine)",
        "The_Roanoke_Times",
        "The_Salt_Lake_Tribune",
        "Deseret_News",
        "CNBC",
        "Bloomberg_Business",
        "ThinkProgress",
        "Center_for_American_Progress",
        "Las_Vegas_Review-Journal",
        "The_Seattle_Times",
        "The_Washington_Times",
        "Paul_Krugman",
        "Daily_News_(New_York)",
        "The_New_Republic",
        "The_Atlantic_Wire",
        "Los_Angeles_Times",
        "MSNBC",
        "Charles_Blow",
        "John_Heilemann",
        "Mark_Halperin",
        "Double_Down:_Game_Change_2012",
        "Penguin_Press",
        "ISBN_(identifier)",
        "Lynn_Vavreck",
        "Tea_Party_movement",
        "Encyclop%C3%A6dia_Britannica",
        "Federal_Election_Commission",
        "Curlie",
        "Fundraising_for_the_2012_United_States_presidential_election",
        "Pre-2012_statewide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Newspaper_endorsements_in_the_2012_United_States_presidential_election",
        "Political_impact_of_Hurricane_Sandy",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "Political_positions_of_Joe_Biden",
        "Bob_Ely",
        "Keith_Judd",
        "Warren_Mosler",
        "Darcy_Richardson",
        "Vermin_Supreme",
        "John_Wolfe_Jr.",
        "Straw_polls_for_the_2012_Republican_Party_presidential_primaries",
        "Political_positions_of_Paul_Ryan",
        "Michele_Bachmann_2012_presidential_campaign",
        "Herman_Cain_2012_presidential_campaign",
        "Political_positions_of_Herman_Cain",
        "Mark_Callahan",
        "Jack_Fellure",
        "Political_positions_of_Newt_Gingrich",
        "Stewart_Greenleaf",
        "Jon_Huntsman_Jr.",
        "Jon_Huntsman_2012_presidential_campaign",
        "Andy_Martin",
        "Thaddeus_McCotter_2012_presidential_campaign",
        "Jimmy_McMillan",
        "Roy_Moore",
        "Political_positions_of_Ron_Paul",
        "Tim_Pawlenty_2012_presidential_campaign",
        "Rick_Perry_2012_presidential_campaign",
        "Political_positions_of_Rick_Perry",
        "Buddy_Roemer_2012_presidential_campaign",
        "Rick_Santorum_2012_presidential_campaign",
        "R._J._Harris",
        "Carl_Person",
        "Sam_Sloan",
        "R._Lee_Wrights",
        "Stewart_Alexander",
        "American_Independent_Party",
        "Wiley_Drake",
        "Edward_C._Noonan",
        "Laurie_Roth",
        "American_Freedom_Party",
        "Merlin_Miller",
        "Virginia_Abernethy",
        "Darrell_Castle",
        "Robby_Wells",
        "Freedom_Socialist_Party",
        "Grassroots-Legalize_Cannabis_Party",
        "Jim_Carlson_(businessman)",
        "Party_for_Socialism_and_Liberation",
        "Peta_Lindsay",
        "Prohibition_Party",
        "James_Hedges",
        "Laurence_Kotlikoff",
        "Socialist_Equality_Party_(United_States)",
        "Jerry_White_(socialist)",
        "Socialist_Workers_Party_(United_States)",
        "James_Harris_(Socialist_Workers_Party_politician)",
        "Socialist_Party_USA",
        "Stewart_Alexander_2012_presidential_campaign",
        "Alejandro_Mendoza",
        "Tom_Stevens_(politician)",
        "Lee_Abramson",
        "Randy_Blythe",
        "Jeff_Boss",
        "Naked_Cowboy",
        "Terry_Jones_(pastor)",
        "Joe_Schriner",
        "Michael_Bloomberg",
        "Draft_Bloomberg_movement",
        "2012_Democrats_Abroad_primary",
        "2012_United_States_presidential_election_in_Guam",
        "2011_United_States_elections",
        "2013_United_States_elections",
        "2012_United_States_Senate_election_in_Arizona",
        "2012_United_States_Senate_election_in_California",
        "2012_United_States_Senate_election_in_Connecticut",
        "2012_United_States_Senate_election_in_Delaware",
        "2012_United_States_Senate_election_in_Florida",
        "2012_United_States_Senate_election_in_Hawaii",
        "2012_United_States_Senate_election_in_Indiana",
        "2012_United_States_Senate_election_in_Maine",
        "2012_United_States_Senate_election_in_Maryland",
        "2012_United_States_Senate_election_in_Massachusetts",
        "2012_United_States_Senate_election_in_Michigan",
        "2012_United_States_Senate_election_in_Minnesota",
        "2012_United_States_Senate_election_in_Mississippi",
        "2012_United_States_Senate_election_in_Missouri",
        "2012_United_States_Senate_election_in_Montana",
        "2012_United_States_Senate_election_in_Nebraska",
        "2012_United_States_Senate_election_in_Nevada",
        "2012_United_States_Senate_election_in_New_Jersey",
        "2012_United_States_Senate_election_in_New_Mexico",
        "2012_United_States_Senate_election_in_New_York",
        "2012_United_States_Senate_election_in_North_Dakota",
        "2012_United_States_Senate_election_in_Ohio",
        "2012_United_States_Senate_election_in_Pennsylvania",
        "2012_United_States_Senate_election_in_Rhode_Island",
        "2012_United_States_Senate_election_in_Tennessee",
        "2012_United_States_Senate_election_in_Texas",
        "2012_United_States_Senate_election_in_Utah",
        "2012_United_States_Senate_election_in_Vermont",
        "2012_United_States_Senate_election_in_Virginia",
        "2012_United_States_Senate_election_in_Washington",
        "2012_United_States_Senate_election_in_West_Virginia",
        "2012_United_States_Senate_election_in_Wisconsin",
        "2012_United_States_Senate_election_in_Wyoming",
        "2012_United_States_House_of_Representatives_elections_in_Alabama",
        "2012_United_States_House_of_Representatives_election_in_Alaska",
        "2012_United_States_House_of_Representatives_election_in_American_Samoa",
        "2012_United_States_House_of_Representatives_elections_in_Arizona",
        "2012_Arizona%27s_8th_congressional_district_special_election",
        "2012_United_States_House_of_Representatives_elections_in_Arkansas",
        "2012_United_States_House_of_Representatives_elections_in_California",
        "2012_United_States_House_of_Representatives_elections_in_Colorado",
        "2012_United_States_House_of_Representatives_elections_in_Connecticut",
        "2012_United_States_House_of_Representatives_election_in_Delaware",
        "2012_United_States_House_of_Representatives_election_in_the_District_of_Columbia",
        "2012_United_States_House_of_Representatives_elections_in_Florida",
        "2012_United_States_House_of_Representatives_elections_in_Georgia",
        "2012_United_States_House_of_Representatives_election_in_Guam",
        "2012_United_States_House_of_Representatives_elections_in_Hawaii",
        "2012_United_States_House_of_Representatives_elections_in_Idaho",
        "2012_United_States_House_of_Representatives_elections_in_Illinois",
        "2012_United_States_House_of_Representatives_elections_in_Indiana",
        "2012_United_States_House_of_Representatives_elections_in_Iowa",
        "2012_United_States_House_of_Representatives_elections_in_Kansas",
        "2012_United_States_House_of_Representatives_elections_in_Kentucky",
        "2012_Kentucky%27s_4th_congressional_district_special_election",
        "2012_United_States_House_of_Representatives_elections_in_Louisiana",
        "2012_United_States_House_of_Representatives_elections_in_Maine",
        "2012_United_States_House_of_Representatives_elections_in_Maryland",
        "2012_United_States_House_of_Representatives_elections_in_Massachusetts",
        "2012_United_States_House_of_Representatives_elections_in_Michigan",
        "2012_Michigan%27s_11th_congressional_district_election",
        "2012_Michigan%27s_11th_congressional_district_special_election",
        "2012_United_States_House_of_Representatives_elections_in_Minnesota",
        "2012_United_States_House_of_Representatives_elections_in_Mississippi",
        "2012_United_States_House_of_Representatives_elections_in_Missouri",
        "2012_United_States_House_of_Representatives_election_in_Montana",
        "2012_United_States_House_of_Representatives_elections_in_Nebraska",
        "2012_United_States_House_of_Representatives_elections_in_Nevada",
        "2012_United_States_House_of_Representatives_elections_in_New_Hampshire",
        "2012_United_States_House_of_Representatives_elections_in_New_Jersey",
        "2012_New_Jersey%27s_10th_congressional_district_special_election",
        "2012_United_States_House_of_Representatives_elections_in_New_Mexico",
        "2012_United_States_House_of_Representatives_elections_in_New_York",
        "2012_United_States_House_of_Representatives_elections_in_North_Carolina",
        "2012_United_States_House_of_Representatives_election_in_North_Dakota",
        "2012_United_States_House_of_Representatives_election_in_the_Northern_Mariana_Islands",
        "2012_United_States_House_of_Representatives_elections_in_Ohio",
        "2012_United_States_House_of_Representatives_elections_in_Oklahoma",
        "2012_United_States_House_of_Representatives_elections_in_Oregon",
        "2012_Oregon%27s_1st_congressional_district_special_election",
        "2012_United_States_House_of_Representatives_elections_in_Pennsylvania",
        "2012_United_States_House_of_Representatives_election_in_Puerto_Rico",
        "2012_United_States_House_of_Representatives_elections_in_Rhode_Island",
        "2012_United_States_House_of_Representatives_elections_in_South_Carolina",
        "2012_United_States_House_of_Representatives_election_in_South_Dakota",
        "2012_United_States_House_of_Representatives_elections_in_Tennessee",
        "2012_United_States_House_of_Representatives_elections_in_Texas",
        "2012_United_States_House_of_Representatives_elections_in_Utah",
        "2012_United_States_House_of_Representatives_election_in_Vermont",
        "2012_United_States_House_of_Representatives_elections_in_Virginia",
        "2012_United_States_House_of_Representatives_election_in_the_United_States_Virgin_Islands",
        "2012_United_States_House_of_Representatives_elections_in_Washington",
        "2012_United_States_House_of_Representatives_elections_in_West_Virginia",
        "2012_United_States_House_of_Representatives_elections_in_Wisconsin",
        "2012_United_States_House_of_Representatives_election_in_Wyoming",
        "2012_American_Samoa_gubernatorial_election",
        "2012_Delaware_gubernatorial_election",
        "2012_Indiana_gubernatorial_election",
        "2012_Missouri_gubernatorial_election",
        "2012_Montana_gubernatorial_election",
        "2012_New_Hampshire_gubernatorial_election",
        "2012_North_Carolina_gubernatorial_election",
        "2012_North_Dakota_gubernatorial_election",
        "2012_Puerto_Rico_gubernatorial_election",
        "2012_Utah_gubernatorial_election",
        "2012_Vermont_gubernatorial_election",
        "2012_Washington_gubernatorial_election",
        "2012_West_Virginia_gubernatorial_election",
        "Wisconsin_gubernatorial_recall_election",
        "2012_California_State_Assembly_election",
        "2012_California_State_Senate_election",
        "2012_Connecticut_Senate_election",
        "2012_Delaware_House_of_Representatives_election",
        "2012_Florida_House_of_Representatives_election",
        "2012_Hawaii_House_of_Representatives_election",
        "2012_Hawaii_Senate_election",
        "2012_Illinois_House_of_Representatives_election",
        "2012_Illinois_Senate_election",
        "2012_Iowa_Senate_election",
        "2012_Michigan_House_of_Representatives_election",
        "2012_Minnesota_House_of_Representatives_election",
        "2012_Minnesota_Senate_election",
        "2012_New_York_State_Senate_election",
        "2012_Oregon_legislative_election",
        "2012_Pennsylvania_House_of_Representatives_election",
        "2012_Pennsylvania_Senate_election",
        "2012_Washington_House_of_Representatives_election",
        "2012_Washington_State_Senate_election",
        "2012_Anchorage_mayoral_election",
        "2012_Austin_mayoral_election",
        "2012_Bakersfield,_California_mayoral_election",
        "2012_Baton_Rouge_mayoral_election",
        "2012_Corpus_Christi_mayoral_election",
        "2012_Fort_Lauderdale_mayoral_election",
        "2012_Fresno_mayoral_election",
        "2012_Gilbert_mayoral_election",
        "2012_Glendale,_Arizona_mayoral_election",
        "2012_Honolulu_mayoral_election",
        "2012_Irvine_mayoral_election",
        "2012_Lubbock_mayoral_election",
        "2012_Miami-Dade_County_mayoral_election",
        "2012_Milwaukee_mayoral_election",
        "2012_Orlando_mayoral_election",
        "2012_Portland,_Oregon_mayoral_election",
        "2012_Riverside,_California_mayoral_election",
        "2012_Sacramento_mayoral_election",
        "2012_San_Diego_mayoral_election",
        "2012_Scottsdale_mayoral_election",
        "2012_Stockton,_California_mayoral_election",
        "2012_Virginia_Beach_mayoral_election",
        "2012_Wilmington_mayoral_election",
        "2012_Alaska_elections",
        "2012_American_Samoan_general_election",
        "November_2012_California_elections",
        "2012_Delaware_elections",
        "2012_Hawaii_elections",
        "2012_Illinois_elections",
        "2012_Indiana_elections",
        "2012_Kansas_elections",
        "2012_Massachusetts_general_election",
        "2012_Minnesota_elections",
        "2012_Nevada_elections",
        "2012_New_York_state_elections",
        "2012_North_Dakota_elections",
        "2012_Oklahoma_state_elections",
        "2012_Oregon_state_elections",
        "2012_Pennsylvania_state_elections",
        "2012_Puerto_Rican_general_election",
        "2012_South_Carolina_elections",
        "2012_United_States_Virgin_Islands_general_election",
        "2012_Vermont_elections",
        "2012_Washington_elections",
        "2012_West_Virginia_elections",
        "1788%E2%80%9389_United_States_presidential_election",
        "1792_United_States_presidential_election",
        "1796_United_States_presidential_election",
        "1800_United_States_presidential_election",
        "1804_United_States_presidential_election",
        "1808_United_States_presidential_election",
        "1812_United_States_presidential_election",
        "1816_United_States_presidential_election",
        "1820_United_States_presidential_election",
        "1824_United_States_presidential_election",
        "1828_United_States_presidential_election",
        "1832_United_States_presidential_election",
        "1836_United_States_presidential_election",
        "1840_United_States_presidential_election",
        "1844_United_States_presidential_election",
        "1848_United_States_presidential_election",
        "1852_United_States_presidential_election",
        "1860_United_States_presidential_election",
        "1864_United_States_presidential_election",
        "1868_United_States_presidential_election",
        "1872_United_States_presidential_election",
        "1876_United_States_presidential_election",
        "1880_United_States_presidential_election",
        "1884_United_States_presidential_election",
        "1888_United_States_presidential_election",
        "1892_United_States_presidential_election",
        "1896_United_States_presidential_election",
        "1900_United_States_presidential_election",
        "1904_United_States_presidential_election",
        "1908_United_States_presidential_election",
        "1912_United_States_presidential_election",
        "1916_United_States_presidential_election",
        "1920_United_States_presidential_election",
        "1924_United_States_presidential_election",
        "1928_United_States_presidential_election",
        "1932_United_States_presidential_election",
        "1936_United_States_presidential_election",
        "1948_United_States_presidential_election",
        "1952_United_States_presidential_election",
        "1956_United_States_presidential_election",
        "1960_United_States_presidential_election",
        "1964_United_States_presidential_election",
        "1968_United_States_presidential_election",
        "1976_United_States_presidential_election",
        "1984_United_States_presidential_election",
        "1992_United_States_presidential_election",
        "1996_United_States_presidential_election",
        "2020_United_States_presidential_election",
        "United_States_presidential_elections_in_Alabama",
        "United_States_presidential_elections_in_Alaska",
        "United_States_presidential_elections_in_Arizona",
        "United_States_presidential_elections_in_Arkansas",
        "United_States_presidential_elections_in_California",
        "United_States_presidential_elections_in_Colorado",
        "United_States_presidential_elections_in_Connecticut",
        "United_States_presidential_elections_in_Delaware",
        "United_States_presidential_elections_in_Florida",
        "United_States_presidential_elections_in_Georgia",
        "United_States_presidential_elections_in_Hawaii",
        "United_States_presidential_elections_in_Idaho",
        "United_States_presidential_elections_in_Illinois",
        "United_States_presidential_elections_in_Indiana",
        "United_States_presidential_elections_in_Iowa",
        "United_States_presidential_elections_in_Kansas",
        "United_States_presidential_elections_in_Kentucky",
        "United_States_presidential_elections_in_Louisiana",
        "United_States_presidential_elections_in_Maine",
        "United_States_presidential_elections_in_Maryland",
        "United_States_presidential_elections_in_Massachusetts",
        "United_States_presidential_elections_in_Michigan",
        "United_States_presidential_elections_in_Minnesota",
        "United_States_presidential_elections_in_Mississippi",
        "United_States_presidential_elections_in_Missouri",
        "United_States_presidential_elections_in_Montana",
        "United_States_presidential_elections_in_Nebraska",
        "United_States_presidential_elections_in_Nevada",
        "United_States_presidential_elections_in_New_Hampshire",
        "United_States_presidential_elections_in_New_Jersey",
        "United_States_presidential_elections_in_New_Mexico",
        "United_States_presidential_elections_in_New_York",
        "United_States_presidential_elections_in_North_Carolina",
        "United_States_presidential_elections_in_North_Dakota",
        "United_States_presidential_elections_in_Ohio",
        "United_States_presidential_elections_in_Oklahoma",
        "United_States_presidential_elections_in_Oregon",
        "List_of_United_States_presidential_elections_in_Pennsylvania",
        "United_States_presidential_elections_in_Rhode_Island",
        "United_States_presidential_elections_in_South_Carolina",
        "United_States_presidential_elections_in_South_Dakota",
        "United_States_presidential_elections_in_Tennessee",
        "United_States_presidential_elections_in_Texas",
        "United_States_presidential_elections_in_Utah",
        "United_States_presidential_elections_in_Vermont",
        "United_States_presidential_elections_in_Virginia",
        "United_States_presidential_elections_in_Washington",
        "United_States_presidential_elections_in_Washington,_D.C.",
        "United_States_presidential_elections_in_West_Virginia",
        "United_States_presidential_elections_in_Wisconsin",
        "United_States_presidential_elections_in_Wyoming",
        "Iowa_caucuses",
        "New_Hampshire_primary",
        "Nevada_caucuses",
        "South_Carolina_primary",
        "Super_Tuesday",
        "United_States_presidential_nominating_convention",
        "List_of_presidential_nominating_conventions_in_the_United_States",
        "Brokered_convention",
        "Convention_bounce",
        "Popular_vote_(representative_democracy)",
        "United_States_presidential_election_summary",
        "United_States_presidential_elections_in_which_the_winner_lost_the_popular_vote",
        "List_of_United_States_presidential_elections_by_Electoral_College_margin",
        "List_of_United_States_presidential_election_results_by_state",
        "Electoral_vote_changes_between_United_States_presidential_elections",
        "List_of_people_who_received_an_electoral_vote_in_the_United_States_Electoral_College",
        "Contingent_election",
        "Faithless_elector",
        "Unpledged_elector",
        "Voter_turnout_in_the_United_States_presidential_elections",
        "List_of_U.S._presidential_campaign_slogans",
        "Historical_polling_for_U.S._Presidential_elections",
        "Election_Day_(United_States)",
        "List_of_United_States_major_party_presidential_tickets",
        "List_of_unsuccessful_major_party_candidates_for_President_of_the_United_States",
        "United_States_presidential_debates",
        "October_surprise",
        "Red_states_and_blue_states",
        "Tipping-point_state",
        "Election_recount",
        "United_States_presidential_straw_polls_in_Guam",
        "1973_United_States_vice_presidential_confirmation",
        "1974_United_States_vice_presidential_confirmation",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "2004_Democratic_National_Convention",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "West_Wing_Week",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2008_Democratic_Party_presidential_primaries",
        "2008_Democratic_National_Convention",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Michelle_Obama",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "Book:Barack_Obama",
        "List_of_vice_presidents_of_the_United_States",
        "List_of_United_States_senators_from_Delaware",
        "United_States_Senate_career_of_Joe_Biden",
        "Vice_presidency_of_Joe_Biden",
        "Classified_Information_Procedures_Act",
        "Omnibus_Counterterrorism_Act_of_1995",
        "Violence_Against_Women_Act",
        "Violent_Crime_Control_and_Law_Enforcement_Act",
        "Biden-Sanders_Unity_Task_Forces",
        "Electoral_history_of_Joe_Biden",
        "1972_United_States_Senate_election_in_Delaware",
        "1978_United_States_Senate_election_in_Delaware",
        "1984_United_States_Senate_election_in_Delaware",
        "1990_United_States_Senate_election_in_Delaware",
        "1996_United_States_Senate_election_in_Delaware",
        "2002_United_States_Senate_election_in_Delaware",
        "2008_United_States_Senate_election_in_Delaware",
        "2008_Democratic_Party_vice_presidential_candidate_selection",
        "2008_United_States_presidential_debates#October_2:_Vice_presidential_debate_(Washington_University_in_St._Louis)",
        "2012_United_States_presidential_debates#October_11:_Vice_presidential_debate_(Centre_College)",
        "Joe_Biden_1988_presidential_campaign",
        "1988_Democratic_Party_presidential_primaries",
        "Joe_Biden_2008_presidential_campaign",
        "2008_Democratic_Party_presidential_debates_and_forums",
        "Joe_Biden_2020_presidential_campaign",
        "List_of_Joe_Biden_2020_presidential_campaign_endorsements",
        "2020_Democratic_Party_presidential_primaries",
        "List_of_Joe_Biden_2020_presidential_campaign_primary_endorsements",
        "2020_Democratic_Party_presidential_debates",
        "2020_Democratic_Party_vice_presidential_candidate_selection",
        "2020_Democratic_National_Convention",
        "2020_United_States_presidential_debates",
        "Biden_family",
        "Neilia_Hunter",
        "Jill_Biden",
        "Beau_Biden",
        "Hunter_Biden",
        "Edward_Francis_Blewitt",
        "Promises_to_Keep_(Biden_book)",
        "Promise_Me,_Dad",
        "Tomorrow_Will_Be_Different",
        "List_of_honors_received_by_Joe_Biden",
        "List_of_things_named_after_Joe_Biden",
        "Joe_Biden_(The_Onion)",
        "Cancer_Breakthroughs_2020",
        "Crumb_and_Get_It_bakery_incident",
        "Joe_Biden_sexual_assault_allegation",
        "Book:Joe_Biden",
        "List_of_United_States_Senators_from_Utah",
        "United_States_Senate_election_in_Massachusetts,_1994",
        "2002_Massachusetts_gubernatorial_election",
        "Mitt_(film)",
        "2018_United_States_Senate_election_in_Utah",
        "Bain_%26_Company",
        "Bain_Capital",
        "Turnaround:_Crisis,_Leadership,_and_the_Olympic_Games",
        "Romney_family",
        "Ann_Romney",
        "Tagg_Romney",
        "George_W._Romney",
        "Lenore_Romney",
        "Scott_Romney",
        "Gaskell_Romney",
        "Harold_A._Lafount",
        "Miles_Park_Romney",
        "Ronna_McDaniel",
        "Book:Mitt_Romney"
      ],
      "sourcestr1": "2012_United_States_presidential_election",
      "sourcestr2": "Q4226",
      "sourcestr3": "Q47566",
      "sourcestr4": "United States presidential election",
      "sourcevarchar3": "[{\"538 members of the Electoral College 270 electoral votes needed to win\":\"Opinionpolls\",\"Turnout\":[\"54.9%\",\"3.4\",\"pp\"]}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/ElectoralCollege2012.svg/1200px-ElectoralCollege2012.svg.png",
      "sourcedouble1": 0.035893,
      "entity1": [
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "0",
          "display": "0"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "6",
          "display": "6"
        },
        {
          "value": "29",
          "display": "29"
        },
        {
          "value": "7",
          "display": "7"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "11",
          "display": "11"
        },
        {
          "value": "47",
          "display": "47"
        },
        {
          "value": "50",
          "display": "50"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "42",
          "display": "42"
        },
        {
          "value": "48",
          "display": "48"
        },
        {
          "value": "51",
          "display": "51"
        },
        {
          "value": "38",
          "display": "38"
        }
      ],
      "date": [
        {
          "value": "2011-08-14",
          "display": "2011-08-14"
        },
        {
          "value": "2011-09-22",
          "display": "2011-09-22"
        },
        {
          "value": "2011-09-23",
          "display": "2011-09-23"
        },
        {
          "value": "2011-12-03",
          "display": "2011-12-03"
        },
        {
          "value": "2011-12-28",
          "display": "2011-12-28"
        },
        {
          "value": "2012-06-29",
          "display": "2012-06-29"
        },
        {
          "value": "2012-07-27",
          "display": "2012-07-27"
        },
        {
          "value": "2012-08-28",
          "display": "2012-08-28"
        },
        {
          "value": "2012-08-30",
          "display": "2012-08-30"
        },
        {
          "value": "2012-10-03",
          "display": "2012-10-03"
        },
        {
          "value": "2012-10-11",
          "display": "2012-10-11"
        },
        {
          "value": "2012-10-16",
          "display": "2012-10-16"
        },
        {
          "value": "2012-10-22",
          "display": "2012-10-22"
        },
        {
          "value": "2012-11-30",
          "display": "2012-11-30"
        },
        {
          "value": "2013-01-04",
          "display": "2013-01-04"
        },
        {
          "value": "2011-05-05",
          "display": "2011-05-05"
        },
        {
          "value": "2011-08-13",
          "display": "2011-08-13"
        },
        {
          "value": "2012-04-03",
          "display": "2012-04-03"
        },
        {
          "value": "2012-11-06",
          "display": "2012-11-06"
        }
      ],
      "entity3": [
        {
          "value": "01:00",
          "display": "01:00"
        },
        {
          "value": "23:15",
          "display": "23:15"
        }
      ],
      "entity4": [
        {
          "value": "USD 10000",
          "display": "USD 10000"
        },
        {
          "value": "USD 2000000000",
          "display": "USD 2000000000"
        },
        {
          "value": "USD 500000000",
          "display": "USD 500000000"
        },
        {
          "value": "USD 690000000",
          "display": "USD 690000000"
        },
        {
          "value": "USD 8400000",
          "display": "USD 8400000"
        },
        {
          "value": "USD 250000",
          "display": "USD 250000"
        },
        {
          "value": "USD 30000",
          "display": "USD 30000"
        }
      ],
      "entity7": [
        {
          "value": "43.018, 0.03",
          "display": "43.018, 0.03"
        },
        {
          "value": "1, -36",
          "display": "1, -36"
        },
        {
          "value": "1.177, 0.45",
          "display": "1.177, 0.45"
        },
        {
          "value": "1.361, 0.42",
          "display": "1.361, 0.42"
        },
        {
          "value": "1.516, 0.04",
          "display": "1.516, 0.04"
        },
        {
          "value": "1.588, 0.12",
          "display": "1.588, 0.12"
        },
        {
          "value": "1.734, 0.16",
          "display": "1.734, 0.16"
        },
        {
          "value": "1.940, 0.47",
          "display": "1.940, 0.47"
        },
        {
          "value": "10, 43.151",
          "display": "10, 43.151"
        },
        {
          "value": "10.309, 0.38",
          "display": "10.309, 0.38"
        },
        {
          "value": "10.400, 0.42",
          "display": "10.400, 0.42"
        },
        {
          "value": "10.968, 1.08",
          "display": "10.968, 1.08"
        },
        {
          "value": "11, 18.623",
          "display": "11, 18.623"
        },
        {
          "value": "11, 32.100",
          "display": "11, 32.100"
        },
        {
          "value": "11, 50.111",
          "display": "11, 50.111"
        },
        {
          "value": "11.379, 0.37",
          "display": "11.379, 0.37"
        },
        {
          "value": "11.630, 0.20",
          "display": "11.630, 0.20"
        },
        {
          "value": "12.071, 0.27",
          "display": "12.071, 0.27"
        },
        {
          "value": "12.324, 0.78",
          "display": "12.324, 0.78"
        },
        {
          "value": "12.580, 0.81",
          "display": "12.580, 0.81"
        }
      ],
      "entity12": [
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        }
      ],
      "entity14": [
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "LOSSES",
          "display": "Losses"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        }
      ],
      "event_date": [
        {
          "value": "(ELECTION)#(2012-11-30)",
          "display": "(Election)#(2012-11-30)"
        },
        {
          "value": "(VICTORY)#(2012-11-30)",
          "display": "(Victory)#(2012-11-30)"
        },
        {
          "value": "(VICTORY)#(2011-08-13)",
          "display": "(Victory)#(2011-08-13)"
        },
        {
          "value": "(ELECTION)#(2012-11-06)",
          "display": "(Election)#(2012-11-06)"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(JOE BIDEN)",
          "display": "(Vice-President)#(Joe Biden)"
        },
        {
          "value": "(VICE-PRESIDENT)#(MITT ROMNEY)",
          "display": "(Vice-President)#(Mitt Romney)"
        },
        {
          "value": "(VICE-PRESIDENT)#(PAUL RYAN)",
          "display": "(Vice-President)#(Paul Ryan)"
        },
        {
          "value": "(VICE-PRESIDENT)#(BARACK OBAMA)",
          "display": "(Vice-President)#(Barack Obama)"
        }
      ],
      "entity18": [
        {
          "value": "(REVENUE)#(USD 30000)",
          "display": "(Revenue)#(USD 30000)"
        }
      ],
      "rank": 12,
      "displayTitle": "2012 United States presidential election",
      "relevantExtracts": "Democratic President Barack <b>Obama </b>, and his ... incumbent president , <b>Obama </b>secured the Democratic ... Care Act , <b>Obama</b>&#39;s ... <b>Obama </b>defeated Romney, winning ... <b>Obama </b>won 332 electoral ... <b>Obama </b>was the ... <b>Obama </b>did not ... the 2012 election, <b>Obama </b>won 8, ... <b>Obama</b>, the ... The <b>Obama </b>campaign fought "
    },
    {
      "id": "/Web/Wikipedia/|2015_United_States_federal_budget",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.962104,
      "matchingpartnames": [
        "text",
        "tables"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "President {b}Obama{nb}'s Proposed Fiscal Year 2015 United States Federal Budget",
        "2,72",
        "13143,72",
        "{b}Obama{nb} administration proposal",
        "3692,29",
        "32313,29",
        "President Barack {b}Obama{nb} submitted his fiscal year 2015 budget request on March 4, 2014.",
        "3723,86",
        "32761,206",
        "President {b}Obama{nb}'s proposed budget was for $3.9 trillion.",
        "3944,56",
        "33102,56",
        "President {b}Obama{nb}'s budget proposal was described as being full of \"populist proposals\" and as a \"populist wish list.",
        "4001,115,5772,115",
        "33318,115,37158,115",
        "President {b}Obama{nb}'s budget proposal was a \"comprehensive assembly of the White House's policy proposals and economic projections.",
        "5447,127",
        "36447,127",
        "President {b}Obama{nb} did not release his 2015 budget proposal until March 4, 2014, a delay he said was due to the need to wait for the Bipartisan Budget Act of 2013 to be agreed to in December 2013.",
        "5577,193",
        "36726,281",
        "President {b}Obama{nb}'s budget proposal only addresses about a third of the federal government's total estimated spending for fiscal year 2015.",
        "6442,137",
        "39212,137",
        "The federal government's total estimated spending would be $3.5 trillion, while {b}Obama{nb}'s budget only addresses $1.014 trillion.",
        "6580,126",
        "39499,126",
        "{b}Obama{nb}'s plan would also get rid of the A-10 airplane.",
        "7208,53",
        "42333,111"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "12,5,3692,5,3740,5,3954,5,4011,5,5457,5,5587,5,5782,5,6243,5,6452,5,6660,5,7208,5,7734,5,8031,5,8220,5,8890,5,9213,5,10249,5,10504,5,10669,5,13354,5,15399,5,17626,5,17679,5,19288,5,19336,5,19429,5;13153,5,32313,5,32828,5,33112,5,33328,5,36457,5,36736,5,37168,5,38283,5,39222,5,39579,5,42333,5,44426,5,45498,5,46453,5,49523,5,50541,5,52979,5,53394,5,53922,5,59023,5,64005,5,73546,5,73605,5,174806,5,174994,5,175091,5"
          },
          {
            "partname": "tables",
            "data": "19583,5;205146,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "2015 United States federal budget",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-19 05:39:53",
      "indexationtime": "2020-09-02 05:41:46",
      "version": "HXESmnZXN/bMrzDw/XaFRA==",
      "size": 204989,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "2015_United_States_federal_budget",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "JIM MCDERMOTT",
          "display": "Jim McDermott"
        },
        {
          "value": "MICK MULVANEY",
          "display": "Mick Mulvaney"
        },
        {
          "value": "JEFF SESSIONS",
          "display": "Jeff Sessions"
        },
        {
          "value": "JOHN BOEHNER",
          "display": "John Boehner"
        },
        {
          "value": "PAUL RYAN",
          "display": "Paul Ryan"
        }
      ],
      "company": [
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        },
        {
          "value": "REUTERS",
          "display": "Reuters"
        }
      ],
      "geo": [
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        }
      ],
      "wordcount": 2187,
      "exacthash": "MAbiGa5bfxOn8H+0V+WOqQ==",
      "nearhash": "20Sbs3kFYm4jfm3FtAlIGg==",
      "partnamelocations": [
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/2015_United_States_federal_budget",
      "sourcecsv1": [
        "Submitted",
        "Submitted by",
        "Submitted to",
        "Total revenue",
        "Total expenditures",
        "Deficit",
        "Debt",
        "GDP",
        "Website"
      ],
      "sourcecsv2": [
        "United_States_federal_budget",
        "Barack_Obama",
        "113th_United_States_Congress",
        "Trillion_(short_scale)",
        "Government_budget_deficit",
        "Gross_domestic_product",
        "2014_United_States_federal_budget",
        "2016_United_States_federal_budget",
        "Fiscal_year",
        "Budget_resolution",
        "United_States_House_of_Representatives",
        "United_States_Senate",
        "President_of_the_United_States",
        "Continuing_resolution",
        "United_States_Department_of_Homeland_Security",
        "Omnibus_spending_bill",
        "Department_of_Homeland_Security_Appropriations_Act,_2015",
        "United_States_budget_process",
        "Congressional_Research_Service",
        "U.S._Congress",
        "Title_31_of_the_United_States_Code",
        "United_States_House_Committee_on_the_Budget",
        "United_States_Senate_Committee_on_the_Budget",
        "Conference_committee",
        "Concurrent_resolution",
        "Appropriations_bill_(United_States)",
        "Office_of_Management_and_Budget",
        "Executive_Office_of_the_President_of_the_United_States",
        "United_States_federal_executive_departments",
        "Independent_agencies_of_the_United_States_government",
        "Bipartisan_Budget_Act_of_2013",
        "Social_Security_(United_States)",
        "Medicare_(United_States)",
        "Medicaid",
        "United_States_Army",
        "World_War_II",
        "Iraq_War",
        "A-10",
        "United_States_Department_of_Defense",
        "Buffett_Rule",
        "Race_to_the_Top",
        "Public_Service_Loan_Forgiveness_(PSLF)",
        "Border_Security,_Economic_Opportunity,_and_Immigration_Modernization_Act_of_2013",
        "John_Boehner",
        "Jeff_Sessions",
        "Reuters",
        "Associated_Press",
        "Politico",
        "House_Budget_Committee",
        "Paul_Ryan",
        "The_Hill_(newspaper)",
        "Jim_McDermott",
        "Heritage_Action_for_America",
        "Mick_Mulvaney",
        "2015_United_States_federal_appropriations",
        "Continuing_Appropriations_Resolution,_2015",
        "Department_of_Homeland_Security",
        "Immigration_reform#Obama.27s_executive_actions_of_November_2014",
        "Income_tax_in_the_United_States",
        "Corporate_tax_in_the_United_States",
        "Payroll_tax",
        "Excise_tax_in_the_United_States",
        "Customs",
        "Duty_(economics)",
        "Inheritance_tax",
        "Gift_tax",
        "Federal_Reserve_System",
        "ISBN_(identifier)",
        "NPR",
        "ISSN_(identifier)",
        "1993_United_States_federal_budget",
        "1994_United_States_federal_budget",
        "1995_United_States_federal_budget",
        "1996_United_States_federal_budget",
        "1997_United_States_federal_budget",
        "1998_United_States_federal_budget",
        "1999_United_States_federal_budget",
        "2000_United_States_federal_budget",
        "2001_United_States_federal_budget",
        "2002_United_States_federal_budget",
        "2003_United_States_federal_budget",
        "2004_United_States_federal_budget",
        "2005_United_States_federal_budget",
        "2006_United_States_federal_budget",
        "2007_United_States_federal_budget",
        "2008_United_States_federal_budget",
        "2009_United_States_federal_budget",
        "2010_United_States_federal_budget",
        "2011_United_States_federal_budget",
        "2012_United_States_federal_budget",
        "2013_United_States_federal_budget",
        "2017_United_States_federal_budget",
        "2018_United_States_federal_budget",
        "2019_United_States_federal_budget",
        "2020_United_States_federal_budget"
      ],
      "sourcestr1": "2015_United_States_federal_budget",
      "sourcestr2": "Q16958939",
      "sourcevarchar3": "[{\"Submitted\":\"March 4, 2014\",\"Submitted by\":\"Barack Obama\",\"Submitted to\":\"113th Congress\",\"Total revenue\":[\"$3.34\",\"trillion\",\"(requested)\",\"$3.249 trillion\",\"(actual)\",\"18.2% of GDP\"],\"Total expenditures\":[\"$3.90 trillion\",\"(requested)\",\"$3.688 trillion\",\"(actual)\",\"20.6% of GDP\"],\"Deficit\":[\"$564 billion\",\"(requested)\",\"$438.9 billion\",\"(actual)\",\"2.45% of GDP\"],\"Debt\":[\"$18.15 trillion\",\"(actual)\"],\"GDP\":[\"$17.9 trillion\",\"(actual)\"],\"Website\":\"Office of Management and Budget\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/3/3b/President_Obama%27s_Proposed_Fiscal_Year_2015_United_States_Federal_Budget.jpg",
      "sourcedouble1": 0.009883,
      "entity1": [
        {
          "value": "2015",
          "display": "2015"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "500",
          "display": "500"
        },
        {
          "value": "3249",
          "display": "3249"
        },
        {
          "value": "3900000000000",
          "display": "3900000000000"
        },
        {
          "value": "1065",
          "display": "1065"
        },
        {
          "value": "11",
          "display": "11"
        },
        {
          "value": "150",
          "display": "150"
        },
        {
          "value": "153.0",
          "display": "153.0"
        },
        {
          "value": "18",
          "display": "18"
        },
        {
          "value": "23.6",
          "display": "23.6"
        },
        {
          "value": "250",
          "display": "250"
        },
        {
          "value": "251.871",
          "display": "251.871"
        },
        {
          "value": "267.3",
          "display": "267.3"
        },
        {
          "value": "27.9",
          "display": "27.9"
        }
      ],
      "date": [
        {
          "value": "2014-03-04",
          "display": "2014-03-04"
        },
        {
          "value": "2014-12-11",
          "display": "2014-12-11"
        },
        {
          "value": "2014-04-01",
          "display": "2014-04-01"
        },
        {
          "value": "2014-04-09",
          "display": "2014-04-09"
        },
        {
          "value": "2014-04-10",
          "display": "2014-04-10"
        },
        {
          "value": "2014-09-17",
          "display": "2014-09-17"
        },
        {
          "value": "2014-09-18",
          "display": "2014-09-18"
        },
        {
          "value": "2015-02-27",
          "display": "2015-02-27"
        },
        {
          "value": "2014-12-16",
          "display": "2014-12-16"
        },
        {
          "value": "2015-03-04",
          "display": "2015-03-04"
        },
        {
          "value": "2014-10-01",
          "display": "2014-10-01"
        },
        {
          "value": "2015-09-30",
          "display": "2015-09-30"
        }
      ],
      "entity4": [
        {
          "value": "USD 3900000000000",
          "display": "USD 3900000000000"
        },
        {
          "value": "USD 17900000000000",
          "display": "USD 17900000000000"
        },
        {
          "value": "USD 18150000000000",
          "display": "USD 18150000000000"
        },
        {
          "value": "USD 2800000000000",
          "display": "USD 2800000000000"
        },
        {
          "value": "USD 3100000000000",
          "display": "USD 3100000000000"
        },
        {
          "value": "USD 3200000000000",
          "display": "USD 3200000000000"
        },
        {
          "value": "USD 3249",
          "display": "USD 3249"
        },
        {
          "value": "USD 3260000000000",
          "display": "USD 3260000000000"
        },
        {
          "value": "USD 3340000000000",
          "display": "USD 3340000000000"
        },
        {
          "value": "USD 3688",
          "display": "USD 3688"
        },
        {
          "value": "USD 438900000000",
          "display": "USD 438900000000"
        },
        {
          "value": "USD 483000000000",
          "display": "USD 483000000000"
        },
        {
          "value": "USD 5000000000000",
          "display": "USD 5000000000000"
        },
        {
          "value": "USD 564000000000",
          "display": "USD 564000000000"
        },
        {
          "value": "USD 791000000000",
          "display": "USD 791000000000"
        },
        {
          "value": "USD 10.10",
          "display": "USD 10.10"
        },
        {
          "value": "USD 1000000000000",
          "display": "USD 1000000000000"
        },
        {
          "value": "USD 1014",
          "display": "USD 1014"
        },
        {
          "value": "USD 116000000000",
          "display": "USD 116000000000"
        },
        {
          "value": "USD 158000000000",
          "display": "USD 158000000000"
        }
      ],
      "entity7": [
        {
          "value": "-90.740, -95.653",
          "display": "-90.740, -95.653"
        },
        {
          "value": "1.056, 1.065",
          "display": "1.056, 1.065"
        },
        {
          "value": "1.534, 1.478",
          "display": "1.534, 1.478"
        },
        {
          "value": "1.875, 29.285",
          "display": "1.875, 29.285"
        },
        {
          "value": "13.375, 8.620",
          "display": "13.375, 8.620"
        },
        {
          "value": "17.858, 43.452",
          "display": "17.858, 43.452"
        },
        {
          "value": "22.407, 25.706",
          "display": "22.407, 25.706"
        },
        {
          "value": "22.659, 16.953",
          "display": "22.659, 16.953"
        },
        {
          "value": "24.750, 16.805",
          "display": "24.750, 16.805"
        },
        {
          "value": "24.905, 26.563",
          "display": "24.905, 26.563"
        },
        {
          "value": "28.718, 30.839",
          "display": "28.718, 30.839"
        },
        {
          "value": "29.356, 29.307",
          "display": "29.356, 29.307"
        },
        {
          "value": "3.337, 3.176",
          "display": "3.337, 3.176"
        },
        {
          "value": "33.305, 28.865",
          "display": "33.305, 28.865"
        },
        {
          "value": "36.961, 37.224",
          "display": "36.961, 37.224"
        },
        {
          "value": "38.536, 38.992",
          "display": "38.536, 38.992"
        },
        {
          "value": "39.102, 41.349",
          "display": "39.102, 41.349"
        },
        {
          "value": "48.472, 50.086",
          "display": "48.472, 50.086"
        },
        {
          "value": "53.102, 55.843",
          "display": "53.102, 55.843"
        },
        {
          "value": "54.561, 54.036",
          "display": "54.561, 54.036"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        }
      ],
      "entity14": [
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "INVESTMENT",
          "display": "Investment"
        },
        {
          "value": "DEBT",
          "display": "Debt"
        }
      ],
      "entity18": [
        {
          "value": "(DEBT)#(USD 18150000000000)",
          "display": "(Debt)#(USD 18150000000000)"
        },
        {
          "value": "(REVENUE)#(USD 3249)",
          "display": "(Revenue)#(USD 3249)"
        },
        {
          "value": "(REVENUE)#(USD 3340000000000)",
          "display": "(Revenue)#(USD 3340000000000)"
        },
        {
          "value": "(REVENUE)#(USD 1000)",
          "display": "(Revenue)#(USD 1000)"
        },
        {
          "value": "(REVENUE)#(USD 1000000000000)",
          "display": "(Revenue)#(USD 1000000000000)"
        },
        {
          "value": "(REVENUE)#(USD 116000000000)",
          "display": "(Revenue)#(USD 116000000000)"
        },
        {
          "value": "(REVENUE)#(USD 500)",
          "display": "(Revenue)#(USD 500)"
        }
      ],
      "rank": 13,
      "displayTitle": "2015 United States federal budget",
      "relevantExtracts": "President <b>Obama</b>&#39;s Proposed Fiscal ... <b>Obama </b>... President Barack <b>Obama </b>submitted his fiscal ... President <b>Obama</b>&#39;s proposed budget ... President <b>Obama</b>&#39;s budget ... President <b>Obama</b>&#39;s budget ... President <b>Obama </b>did not ... President <b>Obama</b>&#39;s budget ... $3.5 trillion, while <b>Obama</b>&#39;s budget ... <b>Obama</b>&#39;s plan "
    },
    {
      "id": "/Web/Wikipedia/|2004_United_States_Senate_election_in_Illinois",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.960093,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "On March 16, 2004, State Senator Barack {b}Obama{nb} won the Democratic primary, and businessman Jack Ryan won the Republican primary.",
        "358,127",
        "159179,255",
        "{b}Obama{nb} won by 43%, the largest margin of victory in the state history of U.S. Senate elections, and served in the Senate for four years until he was elected President in 2008.",
        "1029,174",
        "160223,284",
        "The inequality in the candidates spending for the fall elections - $14,244,768 by {b}Obama{nb} and $2,545,325 by Keyes - is also among the largest in history in both absolute and relative terms .",
        "1247,188",
        "160551,275",
        "Barack {b}Obama{nb} , State Senator and future President of the United States",
        "1923,70",
        "174054,159",
        "{b}Obama{nb} float at the 2004 Bud Billiken Parade and Picnic",
        "2297,54",
        "176799,140",
        "Barack {b}Obama{nb}, a member of the Illinois Senate since 1997 and an unsuccessful 2000 Democratic primary challenger to four-term incumbent U.S. Rep. Bobby Rush for Rush's U.S House seat, launched a campaign committee at the beginning of July 2002 to run for the U.S. Senate, 21 months before the March 2004 primary, and two months later had David Axelrod lined up to do his campaign media.",
        "2427,385",
        "177106,981",
        "{b}Obama{nb} formally announced his candidacy on January 21, 2003, four days after former U.S. Sen. Carol Moseley Braun announced she would not seek a rematch with U.S. Sen. Peter Fitzgerald .",
        "2813,185",
        "178202,454",
        "{b}Obama{nb} touted his legislative experience and early public opposition to the Iraq War to distinguish himself from his Democratic primary rivals.",
        "3525,142",
        "180036,188",
        "{b}Obama{nb} succeeded in obtaining the support of three of the state's largest and most active member unions:",
        "3736,103",
        "180411,103",
        "{b}Obama{nb} had the endorsements of four:",
        "4070,35",
        "181138,35"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "398,5,1029,5,1329,5,1930,5,2297,5,2434,5,2813,5,3525,5,3736,5,4070,5,4176,5,4615,5,4753,5,4834,5,5474,5,8047,5,8128,5,8190,5,8308,5,8488,5,8506,5,8589,5,8812,5,9263,5,11218,5,11255,5,11913,5,12832,5,13021,5,13129,5,13202,5,13210,5,13682,5,13796,5,13918,5,14191,5,14424,5,14485,5,14580,5,14846,5,15035,5,15394,5,15697,5;159269,5,160223,5,160635,5,174061,5,176799,5,177113,5,178202,5,180036,5,180411,5,181138,5,181498,5,182519,5,182732,5,183399,5,185050,5,197920,5,198467,5,198612,5,198730,5,199046,5,199065,5,199148,5,199687,5,200388,5,203481,5,203573,5,205238,5,206974,5,207286,5,207395,5,207469,5,207717,5,208403,5,208601,5,210229,5,212824,5,213201,5,213430,5,213525,5,214045,5,214234,5,214730,5,386471,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "2004 United States Senate election in Illinois",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-02 08:49:27",
      "indexationtime": "2020-09-02 09:49:41",
      "version": "pZBczB8txASynWOE2rhgEA==",
      "size": 622081,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "2004_United_States_Senate_election_in_Illinois",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "JACK RYAN",
          "display": "Jack Ryan"
        },
        {
          "value": "JIM OBERWEIS",
          "display": "Jim Oberweis"
        },
        {
          "value": "ALAN KEYES",
          "display": "Alan Keyes"
        },
        {
          "value": "BLAIR HULL",
          "display": "Blair Hull"
        },
        {
          "value": "GERY CHICO",
          "display": "Gery Chico"
        },
        {
          "value": "JERI RYAN",
          "display": "Jeri Ryan"
        },
        {
          "value": "JUDY BAAR TOPINKA",
          "display": "Judy Baar Topinka"
        },
        {
          "value": "ANDREW MCKENNA",
          "display": "Andrew McKenna"
        },
        {
          "value": "ESTELLA JOHNSON",
          "display": "Estella Johnson"
        },
        {
          "value": "JOHN BORLING",
          "display": "John Borling"
        },
        {
          "value": "JONATHAN C. WRIGHT",
          "display": "Jonathan C. Wright"
        },
        {
          "value": "MARIA PAPPAS",
          "display": "Maria Pappas"
        },
        {
          "value": "NANCY SKINNER",
          "display": "Nancy Skinner"
        },
        {
          "value": "STEVE RAUSCHENBERGER",
          "display": "Steve Rauschenberger"
        },
        {
          "value": "JIM EDGAR",
          "display": "Jim Edgar"
        },
        {
          "value": "PETER FITZGERALD",
          "display": "Peter Fitzgerald"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "JERRY KOHN",
          "display": "Jerry Kohn"
        },
        {
          "value": "MELISSA BEAN",
          "display": "Melissa Bean"
        }
      ],
      "company": [
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "AIR FORCE",
          "display": "Air Force"
        }
      ],
      "geo": [
        {
          "value": "ILLINOIS",
          "display": "Illinois"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "CHICAGO",
          "display": "Chicago"
        },
        {
          "value": "MARYLAND",
          "display": "Maryland"
        },
        {
          "value": "NEW YORK",
          "display": "New York"
        },
        {
          "value": "HENDERSON",
          "display": "Henderson"
        },
        {
          "value": "MICHIGAN",
          "display": "Michigan"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "PEORIA",
          "display": "Peoria"
        },
        {
          "value": "ROCKFORD",
          "display": "Rockford"
        }
      ],
      "wordcount": 1774,
      "exacthash": "hByqm9AW7RbVxIpcEtQ0Rg==",
      "nearhash": "Em/iMcsS8bZRUhOl9lfoLg==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "value",
          "display": "value"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/2004_United_States_Senate_election_in_Illinois",
      "sourcecsv1": [
        "Turnout"
      ],
      "sourcecsv2": [
        "1998_United_States_Senate_election_in_Illinois",
        "2010_United_States_Senate_elections_in_Illinois",
        "Barack_Obama",
        "Alan_Keyes",
        "Democratic_Party_(United_States)",
        "Republican_Party_(United_States)",
        "List_of_United_States_senators_from_Illinois",
        "Peter_Fitzgerald_(politician)",
        "Elections_in_Illinois",
        "Federal_government_of_the_United_States",
        "President_of_the_United_States",
        "1824_United_States_presidential_election_in_Illinois",
        "1828_United_States_presidential_election_in_Illinois",
        "1832_United_States_presidential_election_in_Illinois",
        "1836_United_States_presidential_election_in_Illinois",
        "1840_United_States_presidential_election_in_Illinois",
        "1844_United_States_presidential_election_in_Illinois",
        "1848_United_States_presidential_election_in_Illinois",
        "1852_United_States_presidential_election_in_Illinois",
        "1856_United_States_presidential_election_in_Illinois",
        "1860_United_States_presidential_election_in_Illinois",
        "1864_United_States_presidential_election_in_Illinois",
        "1868_United_States_presidential_election_in_Illinois",
        "1872_United_States_presidential_election_in_Illinois",
        "1876_United_States_presidential_election_in_Illinois",
        "1880_United_States_presidential_election_in_Illinois",
        "1884_United_States_presidential_election_in_Illinois",
        "1888_United_States_presidential_election_in_Illinois",
        "1892_United_States_presidential_election_in_Illinois",
        "1896_United_States_presidential_election_in_Illinois",
        "1900_United_States_presidential_election_in_Illinois",
        "1904_United_States_presidential_election_in_Illinois",
        "1908_United_States_presidential_election_in_Illinois",
        "1912_United_States_presidential_election_in_Illinois",
        "1916_United_States_presidential_election_in_Illinois",
        "1920_United_States_presidential_election_in_Illinois",
        "1924_United_States_presidential_election_in_Illinois",
        "1928_United_States_presidential_election_in_Illinois",
        "1932_United_States_presidential_election_in_Illinois",
        "1936_United_States_presidential_election_in_Illinois",
        "1940_United_States_presidential_election_in_Illinois",
        "1944_United_States_presidential_election_in_Illinois",
        "1948_United_States_presidential_election_in_Illinois",
        "1952_United_States_presidential_election_in_Illinois",
        "1956_United_States_presidential_election_in_Illinois",
        "1960_United_States_presidential_election_in_Illinois",
        "1964_United_States_presidential_election_in_Illinois",
        "1968_United_States_presidential_election_in_Illinois",
        "1972_United_States_presidential_election_in_Illinois",
        "1976_United_States_presidential_election_in_Illinois",
        "1980_United_States_presidential_election_in_Illinois",
        "1984_United_States_presidential_election_in_Illinois",
        "1988_United_States_presidential_election_in_Illinois",
        "1992_United_States_presidential_election_in_Illinois",
        "1996_United_States_presidential_election_in_Illinois",
        "2000_United_States_presidential_election_in_Illinois",
        "2004_United_States_presidential_election_in_Illinois",
        "2008_United_States_presidential_election_in_Illinois",
        "2012_United_States_presidential_election_in_Illinois",
        "2016_United_States_presidential_election_in_Illinois",
        "2020_United_States_presidential_election_in_Illinois",
        "1818_United_States_Senate_elections_in_Illinois",
        "1819_United_States_Senate_election_in_Illinois",
        "1823_United_States_Senate_election_in_Illinois",
        "1824_United_States_Senate_election_in_Illinois",
        "1824_United_States_Senate_special_election_in_Illinois",
        "1825_United_States_Senate_election_in_Illinois",
        "1830_United_States_Senate_special_election_in_Illinois",
        "1831_United_States_Senate_election_in_Illinois",
        "1835_United_States_Senate_election_in_Illinois",
        "1837_United_States_Senate_election_in_Illinois",
        "1843_United_States_Senate_election_in_Illinois",
        "1846_United_States_Senate_election_in_Illinois",
        "1849_United_States_Senate_election_in_Illinois",
        "1849_United_States_Senate_special_election_in_Illinois",
        "1852_United_States_Senate_election_in_Illinois",
        "1858_United_States_Senate_election_in_Illinois",
        "1861_United_States_Senate_election_in_Illinois",
        "1863_United_States_Senate_special_election_in_Illinois",
        "1867_United_States_Senate_election_in_Illinois",
        "1879_United_States_Senate_election_in_Illinois",
        "1882_United_States_Senate_election_in_Illinois",
        "1885_United_States_Senate_election_in_Illinois",
        "1885_United_States_Senate_special_election_in_Illinois",
        "1887_United_States_Senate_special_election_in_Illinois",
        "1888_United_States_Senate_election_in_Illinois",
        "1890_United_States_Senate_election_in_Illinois",
        "1894_United_States_Senate_election_in_Illinois",
        "1896_United_States_Senate_election_in_Illinois",
        "1897_United_States_Senate_election_in_Illinois",
        "1901_United_States_Senate_election_in_Illinois",
        "1903_United_States_Senate_election_in_Illinois",
        "1907_United_States_Senate_election_in_Illinois",
        "1909_United_States_Senate_election_in_Illinois",
        "1913_United_States_Senate_election_in_Illinois",
        "1913_United_States_Senate_special_election_in_Illinois",
        "1914_United_States_Senate_election_in_Illinois",
        "1918_United_States_Senate_election_in_Illinois",
        "1920_United_States_Senate_election_in_Illinois",
        "1924_United_States_Senate_election_in_Illinois",
        "1926_United_States_Senate_election_in_Illinois",
        "1928_United_States_Senate_special_election_in_Illinois",
        "1930_United_States_Senate_election_in_Illinois",
        "1932_United_States_Senate_election_in_Illinois",
        "1936_United_States_Senate_election_in_Illinois",
        "1938_United_States_Senate_election_in_Illinois",
        "1940_United_States_Senate_special_election_in_Illinois",
        "1942_United_States_Senate_election_in_Illinois",
        "1944_United_States_Senate_election_in_Illinois",
        "1948_United_States_Senate_election_in_Illinois",
        "1950_United_States_Senate_election_in_Illinois",
        "1954_United_States_Senate_election_in_Illinois",
        "1956_United_States_Senate_election_in_Illinois",
        "1960_United_States_Senate_election_in_Illinois",
        "1962_United_States_Senate_election_in_Illinois",
        "1966_United_States_Senate_election_in_Illinois",
        "1968_United_States_Senate_election_in_Illinois",
        "1970_United_States_Senate_special_election_in_Illinois",
        "1972_United_States_Senate_election_in_Illinois",
        "1974_United_States_Senate_election_in_Illinois",
        "1978_United_States_Senate_election_in_Illinois",
        "1980_United_States_Senate_election_in_Illinois",
        "1984_United_States_Senate_election_in_Illinois",
        "1986_United_States_Senate_election_in_Illinois",
        "1990_United_States_Senate_election_in_Illinois",
        "1992_United_States_Senate_election_in_Illinois",
        "1996_United_States_Senate_election_in_Illinois",
        "2002_United_States_Senate_election_in_Illinois",
        "2008_United_States_Senate_election_in_Illinois",
        "2014_United_States_Senate_election_in_Illinois",
        "2016_United_States_Senate_election_in_Illinois",
        "2020_United_States_Senate_election_in_Illinois",
        "2022_United_States_Senate_election_in_Illinois",
        "1818_United_States_House_of_Representatives_election_in_Illinois",
        "1819_United_States_House_of_Representatives_election_in_Illinois",
        "1820_United_States_House_of_Representatives_election_in_Illinois",
        "1822_United_States_House_of_Representatives_election_in_Illinois",
        "1824_United_States_House_of_Representatives_election_in_Illinois",
        "1826_United_States_House_of_Representatives_election_in_Illinois",
        "1828_United_States_House_of_Representatives_election_in_Illinois",
        "1831_United_States_House_of_Representatives_election_in_Illinois",
        "1832_United_States_House_of_Representatives_elections_in_Illinois",
        "1834_United_States_House_of_Representatives_elections_in_Illinois",
        "1836_United_States_House_of_Representatives_elections_in_Illinois",
        "1838_United_States_House_of_Representatives_elections_in_Illinois",
        "1840_United_States_House_of_Representatives_elections_in_Illinois",
        "1842_United_States_House_of_Representatives_elections_in_Illinois",
        "1844_United_States_House_of_Representatives_elections_in_Illinois",
        "1846_United_States_House_of_Representatives_elections_in_Illinois",
        "1848_United_States_House_of_Representatives_elections_in_Illinois",
        "1850_United_States_House_of_Representatives_elections_in_Illinois",
        "1852_United_States_House_of_Representatives_elections_in_Illinois",
        "1854_United_States_House_of_Representatives_elections_in_Illinois",
        "1856_United_States_House_of_Representatives_elections_in_Illinois",
        "1858_United_States_House_of_Representatives_elections_in_Illinois",
        "1859_Illinois%27s_6th_congressional_district_special_elections",
        "1860_United_States_House_of_Representatives_elections_in_Illinois",
        "1861_Illinois%27s_6th_congressional_district_special_election",
        "1862_United_States_House_of_Representatives_elections_in_Illinois",
        "1864_United_States_House_of_Representatives_elections_in_Illinois",
        "1866_United_States_House_of_Representatives_elections_in_Illinois",
        "1868_United_States_House_of_Representatives_elections_in_Illinois",
        "1870_United_States_House_of_Representatives_elections_in_Illinois",
        "1871_Illinois%27s_at-large_congressional_district_special_election",
        "1872_United_States_House_of_Representatives_elections_in_Illinois",
        "1874_United_States_House_of_Representatives_elections_in_Illinois",
        "1876_United_States_House_of_Representatives_elections_in_Illinois",
        "1878_United_States_House_of_Representatives_elections_in_Illinois",
        "1880_United_States_House_of_Representatives_elections_in_Illinois",
        "1882_United_States_House_of_Representatives_elections_in_Illinois",
        "1884_United_States_House_of_Representatives_elections_in_Illinois",
        "1886_United_States_House_of_Representatives_elections_in_Illinois",
        "1888_United_States_House_of_Representatives_elections_in_Illinois",
        "1890_United_States_House_of_Representatives_elections_in_Illinois",
        "1892_United_States_House_of_Representatives_elections_in_Illinois",
        "1894_United_States_House_of_Representatives_elections_in_Illinois",
        "1895_Illinois%27s_10th_congressional_district_special_election",
        "1895_Illinois%27s_18th_congressional_district_special_election",
        "1896_United_States_House_of_Representatives_elections_in_Illinois",
        "1898_United_States_House_of_Representatives_elections_in_Illinois",
        "1900_United_States_House_of_Representatives_elections_in_Illinois",
        "1902_United_States_House_of_Representatives_elections_in_Illinois",
        "1904_United_States_House_of_Representatives_elections_in_Illinois",
        "1906_United_States_House_of_Representatives_elections_in_Illinois",
        "1908_United_States_House_of_Representatives_elections_in_Illinois",
        "1910_United_States_House_of_Representatives_elections_in_Illinois",
        "1912_United_States_House_of_Representatives_elections_in_Illinois",
        "1914_United_States_House_of_Representatives_elections_in_Illinois",
        "1916_United_States_House_of_Representatives_elections_in_Illinois",
        "1918_Illinois%27s_4th_congressional_district_special_election",
        "1920_United_States_House_of_Representatives_elections_in_Illinois",
        "1928_United_States_House_of_Representatives_elections_in_Illinois",
        "1930_United_States_House_of_Representatives_elections_in_Illinois",
        "1932_United_States_House_of_Representatives_elections_in_Illinois",
        "1934_United_States_House_of_Representatives_elections_in_Illinois",
        "1936_United_States_House_of_Representatives_elections_in_Illinois",
        "1938_United_States_House_of_Representatives_elections_in_Illinois",
        "1940_United_States_House_of_Representatives_elections_in_Illinois",
        "1942_United_States_House_of_Representatives_elections_in_Illinois",
        "1944_United_States_House_of_Representatives_elections_in_Illinois",
        "1944_Illinois%27s_19th_congressional_district_special_election",
        "1946_United_States_House_of_Representatives_elections_in_Illinois",
        "1948_United_States_House_of_Representatives_elections_in_Illinois",
        "1950_United_States_House_of_Representatives_elections_in_Illinois",
        "1952_United_States_House_of_Representatives_elections_in_Illinois",
        "1954_United_States_House_of_Representatives_elections_in_Illinois",
        "1956_United_States_House_of_Representatives_elections_in_Illinois",
        "1958_United_States_House_of_Representatives_elections_in_Illinois",
        "1960_United_States_House_of_Representatives_elections_in_Illinois",
        "1962_United_States_House_of_Representatives_elections_in_Illinois",
        "1964_United_States_House_of_Representatives_elections_in_Illinois",
        "1966_United_States_House_of_Representatives_elections_in_Illinois",
        "1968_United_States_House_of_Representatives_elections_in_Illinois",
        "1970_United_States_House_of_Representatives_elections_in_Illinois",
        "1972_United_States_House_of_Representatives_elections_in_Illinois",
        "1972_Illinois%27s_15th_congressional_district_special_election",
        "1976_United_States_House_of_Representatives_elections_in_Illinois",
        "1978_United_States_House_of_Representatives_elections_in_Illinois",
        "1980_United_States_House_of_Representatives_elections_in_Illinois",
        "1980_Illinois%27s_10th_congressional_district_special_election",
        "1982_United_States_House_of_Representatives_elections_in_Illinois",
        "1986_United_States_House_of_Representatives_elections_in_Illinois",
        "1988_United_States_House_of_Representatives_elections_in_Illinois",
        "1992_United_States_House_of_Representatives_elections_in_Illinois",
        "1994_United_States_House_of_Representatives_elections_in_Illinois",
        "1995_Illinois%27s_2nd_congressional_district_special_election",
        "1996_United_States_House_of_Representatives_elections_in_Illinois",
        "1998_United_States_House_of_Representatives_elections_in_Illinois",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2000_United_States_House_of_Representatives_elections_in_Illinois",
        "2002_United_States_House_of_Representatives_elections_in_Illinois",
        "2004_United_States_House_of_Representatives_elections_in_Illinois",
        "2006_United_States_House_of_Representatives_elections_in_Illinois",
        "2006_Illinois%27s_6th_congressional_district_election",
        "2006_Illinois%27s_8th_congressional_district_election",
        "2006_Illinois%27s_10th_congressional_district_election",
        "2006_Illinois%27s_11th_congressional_district_election",
        "2006_Illinois%27s_19th_congressional_district_election",
        "2008_United_States_House_of_Representatives_elections_in_Illinois",
        "2008_Illinois%27s_14th_congressional_district_special_election",
        "2009_Illinois%27s_5th_congressional_district_special_election",
        "2010_United_States_House_of_Representatives_elections_in_Illinois",
        "2012_United_States_House_of_Representatives_elections_in_Illinois",
        "2013_Illinois%27s_2nd_congressional_district_special_election",
        "2014_United_States_House_of_Representatives_elections_in_Illinois",
        "2015_Illinois%27s_18th_congressional_district_special_election",
        "2016_United_States_House_of_Representatives_elections_in_Illinois",
        "2018_United_States_House_of_Representatives_elections_in_Illinois",
        "2020_United_States_House_of_Representatives_elections_in_Illinois",
        "Government_of_Illinois",
        "Illinois_gubernatorial_elections",
        "1818_Illinois_gubernatorial_election",
        "1822_Illinois_gubernatorial_election",
        "1826_Illinois_gubernatorial_election",
        "1830_Illinois_gubernatorial_election",
        "1834_Illinois_gubernatorial_election",
        "1838_Illinois_gubernatorial_election",
        "1842_Illinois_gubernatorial_election",
        "1846_Illinois_gubernatorial_election",
        "1848_Illinois_gubernatorial_election",
        "1852_Illinois_gubernatorial_election",
        "1856_Illinois_gubernatorial_election",
        "1860_Illinois_gubernatorial_election",
        "1864_Illinois_gubernatorial_election",
        "1868_Illinois_gubernatorial_election",
        "1872_Illinois_gubernatorial_election",
        "1904_Illinois_gubernatorial_election",
        "1908_Illinois_gubernatorial_election",
        "1912_Illinois_gubernatorial_election",
        "1916_Illinois_gubernatorial_election",
        "1940_Illinois_gubernatorial_election",
        "1944_Illinois_gubernatorial_election",
        "1948_Illinois_gubernatorial_election",
        "1952_Illinois_gubernatorial_election",
        "1956_Illinois_gubernatorial_election",
        "1960_Illinois_gubernatorial_election",
        "1964_Illinois_gubernatorial_election",
        "1968_Illinois_gubernatorial_election",
        "1972_Illinois_gubernatorial_election",
        "1976_Illinois_gubernatorial_election",
        "1978_Illinois_gubernatorial_election",
        "1982_Illinois_gubernatorial_election",
        "1986_Illinois_gubernatorial_election",
        "1990_Illinois_gubernatorial_election",
        "1994_Illinois_gubernatorial_election",
        "1998_Illinois_gubernatorial_election",
        "2002_Illinois_gubernatorial_election",
        "2006_Illinois_gubernatorial_election",
        "2010_Illinois_gubernatorial_election",
        "2014_Illinois_gubernatorial_election",
        "2018_Illinois_gubernatorial_election",
        "2008_Illinois_Senate_election",
        "2010_Illinois_Senate_election",
        "2012_Illinois_Senate_election",
        "2014_Illinois_Senate_election",
        "2016_Illinois_Senate_election",
        "2018_Illinois_Senate_election",
        "2020_Illinois_Senate_election",
        "2006_Illinois_House_of_Representatives_election",
        "2008_Illinois_House_of_Representatives_election",
        "2010_Illinois_House_of_Representatives_election",
        "2012_Illinois_House_of_Representatives_election",
        "2014_Illinois_House_of_Representatives_election",
        "2016_Illinois_House_of_Representatives_election",
        "2018_Illinois_House_of_Representatives_election",
        "2020_Illinois_House_of_Representatives_election",
        "1942_Illinois_elections",
        "1948_Illinois_elections",
        "1960_Illinois_elections",
        "1962_Illinois_elections",
        "2014_Illinois_judicial_elections",
        "2016_Illinois_judicial_elections",
        "2018_Illinois_judicial_elections",
        "2020_Illinois_judicial_elections",
        "1944_Illinois_elections",
        "1946_Illinois_elections",
        "1950_Illinois_elections",
        "1952_Illinois_elections",
        "1954_Illinois_elections",
        "1956_Illinois_elections",
        "1958_Illinois_elections",
        "1964_Illinois_elections",
        "1966_Illinois_elections",
        "1968_Illinois_elections",
        "1969_Illinois_elections",
        "1970_Illinois_elections",
        "1972_Illinois_elections",
        "1974_Illinois_elections",
        "1976_Illinois_elections",
        "1978_Illinois_elections",
        "1980_Illinois_elections",
        "1982_Illinois_elections",
        "1984_Illinois_elections",
        "1986_Illinois_elections",
        "1988_Illinois_elections",
        "1990_Illinois_elections",
        "1992_Illinois_elections",
        "1994_Illinois_elections",
        "1996_Illinois_elections",
        "1998_Illinois_elections",
        "2000_Illinois_elections",
        "2002_Illinois_elections",
        "2004_Illinois_elections",
        "2006_Illinois_elections",
        "2008_Illinois_elections",
        "2010_Illinois_elections",
        "2012_Illinois_elections",
        "2014_Illinois_elections",
        "2016_Illinois_elections",
        "2018_Illinois_elections",
        "2020_Illinois_elections",
        "Illinois_Fair_Tax",
        "Chicago",
        "Mayoral_elections_in_Chicago",
        "1837_Chicago_mayoral_election",
        "1838_Chicago_mayoral_election",
        "1839_Chicago_mayoral_election",
        "1840_Chicago_mayoral_election",
        "1841_Chicago_mayoral_election",
        "1842_Chicago_mayoral_election",
        "1843_Chicago_mayoral_election",
        "1844_Chicago_mayoral_elections",
        "1845_Chicago_mayoral_election",
        "1846_Chicago_mayoral_election",
        "1847_Chicago_mayoral_election",
        "1848_Chicago_mayoral_election",
        "1849_Chicago_mayoral_election",
        "1850_Chicago_mayoral_election",
        "1851_Chicago_mayoral_election",
        "1852_Chicago_mayoral_election",
        "1853_Chicago_mayoral_election",
        "1854_Chicago_mayoral_election",
        "1855_Chicago_mayoral_election",
        "1856_Chicago_mayoral_election",
        "1857_Chicago_mayoral_election",
        "1858_Chicago_mayoral_election",
        "1859_Chicago_mayoral_election",
        "1860_Chicago_mayoral_election",
        "1861_Chicago_mayoral_election",
        "1862_Chicago_mayoral_election",
        "1863_Chicago_mayoral_election",
        "1865_Chicago_mayoral_election",
        "1867_Chicago_mayoral_election",
        "1869_Chicago_mayoral_election",
        "1871_Chicago_mayoral_election",
        "1873_Chicago_mayoral_election",
        "1876_Chicago_mayoral_elections",
        "1877_Chicago_mayoral_election",
        "1879_Chicago_mayoral_election",
        "1881_Chicago_mayoral_election",
        "1883_Chicago_mayoral_election",
        "1885_Chicago_mayoral_election",
        "1887_Chicago_mayoral_election",
        "1889_Chicago_mayoral_election",
        "1891_Chicago_mayoral_election",
        "1893_Chicago_mayoral_election",
        "1893_Chicago_mayoral_special_election",
        "1895_Chicago_mayoral_election",
        "1897_Chicago_mayoral_election",
        "1899_Chicago_mayoral_election",
        "1901_Chicago_mayoral_election",
        "1903_Chicago_mayoral_election",
        "1905_Chicago_mayoral_election",
        "1907_Chicago_mayoral_election",
        "1911_Chicago_mayoral_election",
        "1915_Chicago_mayoral_election",
        "1919_Chicago_mayoral_election",
        "1923_Chicago_mayoral_election",
        "1927_Chicago_mayoral_election",
        "1931_Chicago_mayoral_election",
        "1935_Chicago_mayoral_election",
        "1939_Chicago_mayoral_election",
        "1943_Chicago_mayoral_election",
        "1947_Chicago_mayoral_election",
        "1951_Chicago_mayoral_election",
        "1955_Chicago_mayoral_election",
        "1959_Chicago_mayoral_election",
        "1963_Chicago_mayoral_election",
        "1967_Chicago_mayoral_election",
        "1971_Chicago_mayoral_election",
        "1975_Chicago_mayoral_election",
        "1977_Chicago_mayoral_special_election",
        "1979_Chicago_mayoral_election",
        "1983_Chicago_mayoral_election",
        "1987_Chicago_mayoral_election",
        "1989_Chicago_mayoral_special_election",
        "1991_Chicago_mayoral_election",
        "1995_Chicago_mayoral_election",
        "1999_Chicago_mayoral_election",
        "2003_Chicago_mayoral_election",
        "2007_Chicago_mayoral_election",
        "2011_Chicago_mayoral_election",
        "2015_Chicago_mayoral_election",
        "2019_Chicago_mayoral_election",
        "Aldermanic_elections_in_Chicago",
        "1923_Chicago_aldermanic_election",
        "1927_Chicago_aldermanic_election",
        "1929_Chicago_aldermanic_election",
        "2015_Chicago_aldermanic_election",
        "2019_Chicago_aldermanic_election",
        "2019_Chicago_elections",
        "Cicero,_Illinois",
        "1924_Cicero,_Illinois_municipal_elections",
        "Government_of_Cook_County,_Illinois",
        "1946_Cook_County,_Illinois_elections",
        "2000_Cook_County,_Illinois_elections",
        "2002_Cook_County,_Illinois_elections",
        "2004_Cook_County,_Illinois_elections",
        "2006_Cook_County,_Illinois_elections",
        "2008_Cook_County,_Illinois_elections",
        "2010_Cook_County,_Illinois_elections",
        "2012_Cook_County,_Illinois_elections",
        "2014_Cook_County,_Illinois_elections",
        "2016_Cook_County,_Illinois_elections",
        "2018_Cook_County,_Illinois_elections",
        "2020_Cook_County,_Illinois_elections",
        "Peoria,_Illinois",
        "1997_Peoria_municipal_election",
        "2001_Peoria_municipal_election",
        "2003_Peoria_municipal_election",
        "2005_Peoria_municipal_election",
        "2007_Peoria_municipal_election",
        "2009_Peoria_municipal_election",
        "2011_Peoria_municipal_election",
        "2013_Peoria_municipal_election",
        "2015_Peoria_municipal_election",
        "Incumbent",
        "Primary_election",
        "Open_seat",
        "Jack_Ryan_(politician)",
        "Chicago_Tribune",
        "Jeri_Ryan",
        "African_American",
        "2008_United_States_presidential_election",
        "Absolute_and_relative_terms",
        "Gery_Chico",
        "President_of_the_Chicago_Board_of_Education",
        "Blair_Hull",
        "Daniel_Hynes",
        "Maria_Pappas",
        "Nancy_Skinner_(Midwestern_politician)",
        "Metamora,_Illinois",
        "Bud_Billiken_Parade_and_Picnic",
        "Carol_Moseley_Braun",
        "Illinois_Senate",
        "Illinois%27s_1st_congressional_district_election,_2000",
        "Bobby_Rush",
        "Illinois%27s_1st_congressional_district",
        "David_Axelrod_(political_consultant)",
        "Jim_Edgar",
        "Bipartisan_Campaign_Reform_Act",
        "Iraq_War",
        "AFL-CIO",
        "American_Federation_of_State,_County_and_Municipal_Employees",
        "Service_Employees_International_Union",
        "American_Federation_of_Teachers",
        "Jesse_Jackson,_Jr.",
        "Danny_K._Davis",
        "Lane_Evans",
        "Jan_Schakowsky",
        "Downstate_Illinois",
        "Chicago_Sun-Times",
        "Daily_Herald_(Arlington_Heights)",
        "The_Rockford_Register_Star",
        "Peoria_Journal_Star",
        "Sheila_Simon",
        "Paul_Simon_(politician)",
        "Dreams_from_My_Father",
        "Write-in_candidate",
        "Andrew_McKenna",
        "Jim_Oberweis",
        "Steve_Rauschenberger",
        "Jonathan_C._Wright",
        "WLS-TV",
        "American_Broadcasting_Company",
        "Tax",
        "Tort_reform",
        "Medical_malpractice",
        "Lawsuit",
        "School_choice",
        "Vouchers",
        "Soldier_Field",
        "Child_custody_laws_in_the_United_States",
        "Sensationalism",
        "Tabloid_(newspaper_format)",
        "Judy_Baar_Topinka",
        "Chicago_Bears",
        "Mike_Ditka",
        "American_conservatism",
        "Parachute_candidate",
        "Editorial",
        "O%27Hare_International_Airport",
        "Lake_Michigan",
        "The_New_York_Times",
        "Hillary_Clinton",
        "Democratic_Senatorial_Campaign_Committee",
        "Melissa_Bean",
        "Phil_Crane",
        "Education_voucher",
        "Independent_(United_States)",
        "Libertarian_Party_(United_States)",
        "Write-in",
        "Election_Day_(United_States)",
        "Opinion_poll",
        "Election",
        "ISBN_(identifier)",
        "Crain%27s_Chicago_Business",
        "Chicago,_Illinois",
        "Wayback_Machine",
        "Stephen_Kinzer",
        "CBS_News",
        "CNN",
        "List_of_Presidents_of_the_United_States",
        "United_States_Senate",
        "List_of_United_States_Senators_from_Illinois",
        "Early_life_and_career_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention",
        "United_States_Senate_career_of_Barack_Obama",
        "Political_positions_of_Barack_Obama",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "2009_Nobel_Peace_Prize",
        "West_Wing_Week",
        "Presidency_of_Barack_Obama",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "Second_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Obama_Doctrine",
        "Patient_Protection_and_Affordable_Care_Act",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Barack_Obama_Presidential_Center",
        "The_Audacity_of_Hope",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Electoral_history_of_Barack_Obama",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2008_Democratic_Party_presidential_primaries",
        "2012_Democratic_Party_presidential_primaries",
        "Barack_Obama_2008_presidential_primary_campaign",
        "2008_Democratic_National_Convention",
        "2012_Democratic_National_Convention",
        "Barack_Obama_2008_presidential_campaign",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Barack_Obama_2012_presidential_campaign",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "2012_United_States_presidential_election",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Family_of_Barack_Obama",
        "Michelle_Obama",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Maya_Soetoro-Ng",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Craig_Robinson_(basketball)",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Public_image_of_Barack_Obama",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "George_W._Bush",
        "Donald_Trump",
        "Book:Barack_Obama",
        "2008_Illinois_Democratic_primary",
        "2008_Illinois_Republican_primary",
        "2016_Illinois_Democratic_primary",
        "2020_Illinois_Democratic_primary",
        "2010_Illinois%27s_17th_congressional_district_election",
        "2016_Illinois_Comptroller_special_election",
        "2003_United_States_elections",
        "2004_United_States_elections",
        "2005_United_States_elections",
        "2004_United_States_presidential_election",
        "2004_United_States_Senate_elections",
        "2004_United_States_Senate_election_in_Alabama",
        "2004_United_States_Senate_election_in_Alaska",
        "2004_United_States_Senate_election_in_Arizona",
        "2004_United_States_Senate_election_in_Arkansas",
        "2004_United_States_Senate_election_in_California",
        "2004_United_States_Senate_election_in_Colorado",
        "2004_United_States_Senate_election_in_Connecticut",
        "2004_United_States_Senate_election_in_Florida",
        "2004_United_States_Senate_election_in_Georgia",
        "2004_United_States_Senate_election_in_Hawaii",
        "2004_United_States_Senate_election_in_Idaho",
        "2004_United_States_Senate_election_in_Indiana",
        "2004_United_States_Senate_election_in_Iowa",
        "2004_United_States_Senate_election_in_Kansas",
        "2004_United_States_Senate_election_in_Kentucky",
        "2004_United_States_Senate_election_in_Louisiana",
        "2004_United_States_Senate_election_in_Maryland",
        "2004_United_States_Senate_election_in_Missouri",
        "2004_United_States_Senate_election_in_Nevada",
        "2004_United_States_Senate_election_in_New_Hampshire",
        "2004_United_States_Senate_election_in_New_York",
        "2004_United_States_Senate_election_in_North_Carolina",
        "2004_United_States_Senate_election_in_North_Dakota",
        "2004_United_States_Senate_election_in_Ohio",
        "2004_United_States_Senate_election_in_Oklahoma",
        "2004_United_States_Senate_election_in_Oregon",
        "2004_United_States_Senate_election_in_Pennsylvania",
        "2004_United_States_Senate_election_in_South_Carolina",
        "2004_United_States_Senate_election_in_South_Dakota",
        "2004_United_States_Senate_election_in_Utah",
        "2004_United_States_Senate_election_in_Vermont",
        "2004_United_States_Senate_election_in_Washington",
        "2004_United_States_Senate_election_in_Wisconsin",
        "2004_United_States_House_of_Representatives_elections",
        "2004_United_States_House_of_Representatives_elections_in_Alabama",
        "2004_United_States_House_of_Representatives_election_in_Alaska",
        "2004_United_States_House_of_Representatives_elections_in_Arizona",
        "2004_United_States_House_of_Representatives_elections_in_Arkansas",
        "2004_United_States_House_of_Representatives_elections_in_California",
        "2004_United_States_House_of_Representatives_elections_in_Colorado",
        "2004_United_States_House_of_Representatives_elections_in_Connecticut",
        "2004_United_States_House_of_Representatives_election_in_Delaware",
        "2004_United_States_House_of_Representatives_elections_in_Florida",
        "2004_United_States_House_of_Representatives_elections_in_Georgia",
        "2004_United_States_House_of_Representatives_elections_in_Hawaii",
        "2004_United_States_House_of_Representatives_elections_in_Idaho",
        "2004_United_States_House_of_Representatives_elections_in_Indiana",
        "2004_United_States_House_of_Representatives_elections_in_Iowa",
        "2004_United_States_House_of_Representatives_elections_in_Kansas",
        "2004_United_States_House_of_Representatives_elections_in_Kentucky",
        "2004_Kentucky%27s_6th_congressional_district_special_election",
        "2004_United_States_House_of_Representatives_elections_in_Louisiana",
        "2004_United_States_House_of_Representatives_elections_in_Maine",
        "2004_United_States_House_of_Representatives_elections_in_Maryland",
        "2004_United_States_House_of_Representatives_elections_in_Massachusetts",
        "2004_United_States_House_of_Representatives_elections_in_Michigan",
        "2004_United_States_House_of_Representatives_elections_in_Minnesota",
        "2004_United_States_House_of_Representatives_elections_in_Mississippi",
        "2004_United_States_House_of_Representatives_elections_in_Missouri",
        "2004_United_States_House_of_Representatives_election_in_Montana",
        "2004_United_States_House_of_Representatives_elections_in_Nebraska",
        "2004_United_States_House_of_Representatives_elections_in_Nevada",
        "2004_United_States_House_of_Representatives_elections_in_New_Hampshire",
        "2004_United_States_House_of_Representatives_elections_in_New_Jersey",
        "2004_United_States_House_of_Representatives_elections_in_New_Mexico",
        "2004_United_States_House_of_Representatives_elections_in_New_York",
        "2004_United_States_House_of_Representatives_elections_in_North_Carolina",
        "2004_North_Carolina%27s_1st_congressional_district_special_election",
        "2004_United_States_House_of_Representatives_election_in_North_Dakota",
        "2004_United_States_House_of_Representatives_elections_in_Ohio",
        "2004_United_States_House_of_Representatives_elections_in_Oklahoma",
        "2004_United_States_House_of_Representatives_elections_in_Oregon",
        "2004_United_States_House_of_Representatives_elections_in_Pennsylvania",
        "2004_United_States_House_of_Representatives_elections_in_Rhode_Island",
        "2004_United_States_House_of_Representatives_elections_in_South_Carolina",
        "2004_United_States_House_of_Representatives_election_in_South_Dakota",
        "2004_South_Dakota%27s_at-large_congressional_district_special_election",
        "2004_United_States_House_of_Representatives_elections_in_Tennessee",
        "2004_United_States_House_of_Representatives_elections_in_Texas",
        "2004_United_States_House_of_Representatives_elections_in_Utah",
        "2004_United_States_House_of_Representatives_election_in_Vermont",
        "2004_United_States_House_of_Representatives_elections_in_Virginia",
        "2004_United_States_House_of_Representatives_elections_in_Washington",
        "2004_United_States_House_of_Representatives_elections_in_West_Virginia",
        "2004_United_States_House_of_Representatives_elections_in_Wisconsin",
        "2004_United_States_House_of_Representatives_election_in_Wyoming",
        "2004_United_States_gubernatorial_elections",
        "2004_Delaware_gubernatorial_election",
        "2004_Indiana_gubernatorial_election",
        "2004_Missouri_gubernatorial_election",
        "2004_Montana_gubernatorial_election",
        "2004_New_Hampshire_gubernatorial_election",
        "2004_North_Carolina_gubernatorial_election",
        "2004_North_Dakota_gubernatorial_election",
        "2004_Utah_gubernatorial_election",
        "2004_Vermont_gubernatorial_election",
        "2004_Washington_gubernatorial_election",
        "2004_West_Virginia_gubernatorial_election",
        "2003%E2%80%932004_Baltimore_mayoral_election",
        "2004_Bakersfield,_California_mayoral_election",
        "2004_Baton_Rouge_mayoral_election",
        "2004_Fresno_mayoral_election",
        "2004_Irvine_mayoral_election",
        "2004_Jersey_City_mayoral_special_election",
        "2004_Milwaukee_mayoral_election",
        "2004_Orlando_mayoral_election",
        "2004_Portland,_Oregon_mayoral_election",
        "2004_Sacramento_mayoral_election",
        "2004_San_Diego_mayoral_election",
        "2004_Virginia_Beach_mayoral_election",
        "2004_Oklahoma_state_elections",
        "2004_Pennsylvania_state_elections",
        "2004_Vermont_elections"
      ],
      "sourcestr1": "2004_United_States_Senate_election_in_Illinois",
      "sourcestr2": "Q3586671",
      "sourcestr3": "Q24333627",
      "sourcestr4": "United States Senate election",
      "sourcevarchar3": "[{\"Turnout\":\"68.56%\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Alan_Keyes_speech_%28cropped%29.jpg",
      "sourcedouble1": 0.008657,
      "entity1": [
        {
          "value": "2004",
          "display": "2004"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "15",
          "display": "15"
        },
        {
          "value": "2003",
          "display": "2003"
        },
        {
          "value": "100.0",
          "display": "100.0"
        },
        {
          "value": "29",
          "display": "29"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "16",
          "display": "16"
        },
        {
          "value": "6",
          "display": "6"
        },
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "24",
          "display": "24"
        },
        {
          "value": "27",
          "display": "27"
        },
        {
          "value": "1.3",
          "display": "1.3"
        },
        {
          "value": "12",
          "display": "12"
        },
        {
          "value": "2000",
          "display": "2000"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "5141520",
          "display": "5141520"
        }
      ],
      "date": [
        {
          "value": "2004-03-16",
          "display": "2004-03-16"
        },
        {
          "value": "2004-11-02",
          "display": "2004-11-02"
        },
        {
          "value": "2004-03-12",
          "display": "2004-03-12"
        },
        {
          "value": "2004-07-29",
          "display": "2004-07-29"
        },
        {
          "value": "2007-08-14",
          "display": "2007-08-14"
        },
        {
          "value": "2009-01-24",
          "display": "2009-01-24"
        },
        {
          "value": "2009-01-27",
          "display": "2009-01-27"
        },
        {
          "value": "2003-01-21",
          "display": "2003-01-21"
        },
        {
          "value": "2003-04-15",
          "display": "2003-04-15"
        },
        {
          "value": "2003-12-01",
          "display": "2003-12-01"
        },
        {
          "value": "2004-03-03",
          "display": "2004-03-03"
        },
        {
          "value": "2004-03-29",
          "display": "2004-03-29"
        },
        {
          "value": "2004-04-02",
          "display": "2004-04-02"
        },
        {
          "value": "2004-06-22",
          "display": "2004-06-22"
        }
      ],
      "entity4": [
        {
          "value": "USD 14244768",
          "display": "USD 14244768"
        },
        {
          "value": "USD 2545325",
          "display": "USD 2545325"
        },
        {
          "value": "USD 46000000",
          "display": "USD 46000000"
        },
        {
          "value": "USD 21000",
          "display": "USD 21000"
        },
        {
          "value": "USD 60000000",
          "display": "USD 60000000"
        }
      ],
      "entity7": [
        {
          "value": "2.957, 0.1",
          "display": "2.957, 0.1"
        },
        {
          "value": "69.253, 1.3",
          "display": "69.253, 1.3"
        },
        {
          "value": "81.164, 1.6",
          "display": "81.164, 1.6"
        },
        {
          "value": "13.375, 1.1",
          "display": "13.375, 1.1"
        },
        {
          "value": "13.390, 2.0",
          "display": "13.390, 2.0"
        },
        {
          "value": "16.098, 1.3",
          "display": "16.098, 1.3"
        },
        {
          "value": "17.189, 2.6",
          "display": "17.189, 2.6"
        },
        {
          "value": "5.110, 0.8",
          "display": "5.110, 0.8"
        },
        {
          "value": "5.637, 0.9",
          "display": "5.637, 0.9"
        },
        {
          "value": "53.433, 4.3",
          "display": "53.433, 4.3"
        },
        {
          "value": "74.987, 6.0",
          "display": "74.987, 6.0"
        },
        {
          "value": "10, 0.0",
          "display": "10, 0.0"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "BATTLE",
          "display": "Battle"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "DEATH",
          "display": "Death"
        }
      ],
      "entity13": [
        {
          "value": "CHIEF INFORMATION OFFICER",
          "display": "Chief Information Officer"
        }
      ],
      "entity14": [
        {
          "value": "REVENUE",
          "display": "Revenue"
        }
      ],
      "event_date": [
        {
          "value": "(VICTORY)#(2004-03-16)",
          "display": "(Victory)#(2004-03-16)"
        },
        {
          "value": "(ELECTION)#(2004-11-02)",
          "display": "(Election)#(2004-11-02)"
        },
        {
          "value": "(DEATH)#(2004-03-16)",
          "display": "(Death)#(2004-03-16)"
        },
        {
          "value": "(DEFEAT)#(2004-03-16)",
          "display": "(Defeat)#(2004-03-16)"
        }
      ],
      "company_person": [
        {
          "value": "(NEW YORK TIMES)#(HILLARY CLINTON)",
          "display": "(New York Times)#(Hillary Clinton)"
        },
        {
          "value": "(AIR FORCE)#(JOHN BORLING)",
          "display": "(Air Force)#(John Borling)"
        }
      ],
      "rank": 14,
      "displayTitle": "2004 United States Senate election in Illinois",
      "relevantExtracts": "State Senator Barack <b>Obama </b>won the Democratic ... <b>Obama </b>won by 43%, ... - $14,244,768 by <b>Obama </b>and $2,545,325 by ... Barack <b>Obama </b>, State Senator ... <b>Obama </b>float at the ... Barack <b>Obama</b>, a member ... <b>Obama </b>formally announced his ... <b>Obama </b>touted his legislative ... <b>Obama </b>succeeded in ... <b>Obama </b>had the "
    },
    {
      "id": "/Web/Wikipedia/|Cuban_Thaw",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.959474,
      "matchingpartnames": [
        "text",
        "tables"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "In March 2016, Barack {b}Obama{nb} became the first U.S. President to visit Cuba since 1928.",
        "182,85",
        "34560,139",
        "On December 17, 2014, U.S. President Barack {b}Obama{nb} and Cuban President Raúl Castro announced the beginning of the process of normalizing relations between Cuba and the United States .",
        "269,182",
        "34845,388",
        "On April 14, 2015, the {b}Obama{nb} administration announced that Cuba would be removed from the United States State Sponsors of Terrorism list.",
        "1023,137",
        "36828,241",
        "On June 16, 2017, President Donald Trump stated that he was \"canceling\" the {b}Obama{nb} administration's deals with Cuba, while also expressing that a new deal could be negotiated between the Cuban and United States governments.",
        "1539,222",
        "37864,276",
        "On November 8, 2017, it was announced that some travel restrictions which were loosened by the {b}Obama{nb} administration would resume, and that fresh restrictions would be imposed on \"direct financial transactions\" with certain businesses belonging to the Cuban armed forces and interior ministries and would go into effect on November 9.",
        "1763,333",
        "38382,450",
        "Although the Cuban trade embargo can only be ended by the U.S. Congress, the {b}Obama{nb} administration took executive action to ease some restrictions on travel to Cuba by U.S. citizens, as well as restrictions on the import and export of goods between each country.",
        "4113,261",
        "53894,261",
        "In his 2015 State of the Union Address to Congress , {b}Obama{nb} called on lawmakers to lift the embargo against Cuba , a message he reiterated in 2016 .",
        "4375,147",
        "54273,617",
        "MLB Commissioner Rob Manfred said on March 19, 2015, that the league would likely play an exhibition game in Cuba sometime in early 2016 and on March 22, 2016, the Tampa Bay Rays played an exhibition game against the Cuban national team at Estadio Latinoamericano in Havana with Presidents {b}Obama{nb} and Castro in attendance.",
        "5031,321",
        "56407,709",
        "The letter President Barack {b}Obama{nb} sent to President Raúl Castro of Cuba about re-establishing diplomatic relations and permanent diplomatic missions in the United States and Cuba, June 30, 2015",
        "6481,193",
        "60777,194",
        "President Barack {b}Obama{nb} delivers remarks on the re-establishment of the American embassy in Cuba.",
        "6688,96",
        "69702,96"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "204,5,313,5,1046,5,1615,5,1858,5,4190,5,4428,5,5321,5,6509,5,6705,5,8930,5,9061,5,9159,5,10162,5,15053,5,15120,5,15155,5,15218,5,15382,5,15471,5,17820,5,17860,5,18016,5,20245,5,20353,5,20420,5,20586,5,20904,5,21701,5,22208,5,24349,5,26195,5,26293,5,26717,5,27433,5;34632,5,34939,5,36851,5,37994,5,38477,5,53971,5,54491,5,57085,5,60805,5,69719,5,74852,5,75121,5,75336,5,77720,5,94979,5,95122,5,95177,5,95357,5,95676,5,96178,5,102577,5,102617,5,102773,5,107009,5,107172,5,107239,5,107522,5,108343,5,110227,5,111536,5,115414,5,119972,5,120197,5,120918,5,123944,5"
          },
          {
            "partname": "tables",
            "data": "29878,5;546434,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Cuban thaw",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-30 19:41:03",
      "indexationtime": "2020-09-02 06:09:40",
      "version": "6LAk+RPn5DSo+41cKHtj4g==",
      "size": 546134,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Cuban_Thaw",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "RAUL CASTRO",
          "display": "Raul Castro"
        },
        {
          "value": "RAUL CASTRO",
          "display": "Raúl Castro"
        },
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "FIDEL CASTRO",
          "display": "Fidel Castro"
        },
        {
          "value": "DONALD TRUMP",
          "display": "Donald Trump"
        },
        {
          "value": "ALAN GROSS",
          "display": "Alan Gross"
        },
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "BOB MENENDEZ",
          "display": "Bob Menendez"
        },
        {
          "value": "BRUNO RODRIGUEZ PARRILLA",
          "display": "Bruno Rodríguez Parrilla"
        },
        {
          "value": "CALVIN COOLIDGE",
          "display": "Calvin Coolidge"
        },
        {
          "value": "DEBBIE WASSERMAN-SCHULTZ",
          "display": "Debbie Wasserman-Schultz"
        },
        {
          "value": "ERNESTO SAMPER",
          "display": "Ernesto Samper"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "JEFF FLAKE",
          "display": "Jeff Flake"
        },
        {
          "value": "JEFFREY GOLDBERG",
          "display": "Jeffrey Goldberg"
        },
        {
          "value": "JOHN BAIRD",
          "display": "John Baird"
        },
        {
          "value": "JOHN BOLTON",
          "display": "John Bolton"
        },
        {
          "value": "JOHN KERRY",
          "display": "John Kerry"
        },
        {
          "value": "JOSH EARNEST",
          "display": "Josh Earnest"
        }
      ],
      "company": [
        {
          "value": "REUTERS",
          "display": "Reuters"
        },
        {
          "value": "AMERICAN AIRLINES",
          "display": "American Airlines"
        },
        {
          "value": "DELTA AIRLINES",
          "display": "Delta AirLines"
        },
        {
          "value": "STARWOOD HOTELS&RESORTS WORLDWIDE",
          "display": "Starwood Hotels&Resorts Worldwide"
        },
        {
          "value": "BLOOMBERG",
          "display": "Bloomberg"
        },
        {
          "value": "NETFLIX",
          "display": "Netflix"
        },
        {
          "value": "VERIZON",
          "display": "Verizon"
        },
        {
          "value": "AIR FORCE",
          "display": "Air Force"
        }
      ],
      "geo": [
        {
          "value": "CUBA",
          "display": "Cuba"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "MIAMI",
          "display": "Miami"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "GUANTANAMO",
          "display": "Guantanamo"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        },
        {
          "value": "ISRAEL",
          "display": "Israel"
        },
        {
          "value": "VATICAN CITY",
          "display": "Vatican City"
        },
        {
          "value": "CANADA",
          "display": "Canada"
        },
        {
          "value": "PANAMA",
          "display": "Panama"
        },
        {
          "value": "VENEZUELA",
          "display": "Venezuela"
        },
        {
          "value": "COSTA RICA",
          "display": "Costa Rica"
        },
        {
          "value": "FORT LAUDERDALE",
          "display": "Fort Lauderdale"
        },
        {
          "value": "NEW JERSEY",
          "display": "New Jersey"
        },
        {
          "value": "SANTA CLARA",
          "display": "Santa Clara"
        },
        {
          "value": "ARIZONA",
          "display": "Arizona"
        },
        {
          "value": "CHINA",
          "display": "China"
        },
        {
          "value": "HAVANA",
          "display": "Havana"
        },
        {
          "value": "KENTUCKY",
          "display": "Kentucky"
        },
        {
          "value": "RUSSIA",
          "display": "Russia"
        }
      ],
      "wordcount": 3300,
      "exacthash": "j93z72vEy8UFfJH+HsJFTQ==",
      "nearhash": "RT9As7w6VOz2PlyyFrurGw==",
      "partnamelocations": [
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Cuban_Thaw",
      "sourcecsv1": [
        "Date",
        "Also known as",
        "Patron",
        "Organized by",
        "Participants",
        "Outcome"
      ],
      "sourcecsv2": [
        "Panama",
        "Pope_Francis",
        "Barack_Obama",
        "Ra%C3%BAl_Castro",
        "Canada",
        "Cuba",
        "Holy_See",
        "United_States",
        "Political_positions_of_Barack_Obama",
        "Electoral_history_of_Barack_Obama",
        "Early_life_and_career_of_Barack_Obama",
        "Family_of_Barack_Obama",
        "Public_image_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "United_States_Senate_career_of_Barack_Obama",
        "Presidency_of_Barack_Obama",
        "Timeline_of_the_Barack_Obama_presidency",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Obama_Doctrine",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_2008_presidential_campaign",
        "2008_United_States_presidential_election",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Patient_Protection_and_Affordable_Care_Act",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Barack_Obama_2012_presidential_campaign",
        "2012_United_States_presidential_election",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Second_inauguration_of_Barack_Obama",
        "Immigration_reform_in_the_United_States#Obama&#39",
        "s_executive_actions_of_November_2014",
        "Joint_Comprehensive_Plan_of_Action",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "Barack_Obama_Presidential_Center",
        "Obama_Foundation",
        "One_America_Appeal",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "2009_Nobel_Peace_Prize",
        "Spanish_language",
        "Cuba%E2%80%93United_States_relations",
        "Government_of_Canada",
        "Vatican_City",
        "Remittance",
        "Embassy_of_the_United_States,_Havana",
        "Embassy_of_Cuba_in_Washington,_D.C.",
        "Cuba%E2%80%93Soviet_Union_relations",
        "State_Sponsors_of_Terrorism",
        "Cold_War",
        "United_States_Interests_Section_in_Havana",
        "Donald_Trump",
        "Tourism_in_Cuba",
        "Alan_Gross",
        "Andrews_Air_Force_Base",
        "Cuban_Five",
        "USAID",
        "Rolando_Sarraff_Trujillo",
        "White_House",
        "2015_State_of_the_Union_Address",
        "United_States_Congress",
        "United_States_embargo_against_Cuba",
        "2016_State_of_the_Union_Address",
        "Conan_O%27Brien",
        "Michael_Moore",
        "Sicko",
        "Anthony_Bourdain",
        "Anthony_Bourdain:_No_Reservations",
        "Minnesota_Orchestra",
        "Major_League_Baseball",
        "Spring_training",
        "Rob_Manfred",
        "Tampa_Bay_Rays",
        "Cuba_national_baseball_team",
        "Estadio_Latinoamericano",
        "Sun_Country_Airlines",
        "John_F._Kennedy_International_Airport",
        "Jos%C3%A9_Mart%C3%AD_International_Airport",
        "Ferry",
        "Carnival_Cruise_Line",
        "Pew_Research_Center",
        "2010s_oil_glut",
        "Pink_tide",
        "U.S._Assistant_Secretary_of_State",
        "Roberta_S._Jacobson",
        "Josefina_Vidal_Ferreiro",
        "Wet_feet,_dry_feet_policy",
        "United_States_citizen",
        "Immigration_to_the_United_States",
        "Cuban_Adjustment_Act",
        "Washington,_D.C.",
        "Josefina_Vidal",
        "Summit_of_the_Americas",
        "Cuban_Revolution",
        "Iran",
        "Sudan",
        "Syria",
        "Flag_of_Cuba",
        "Havana",
        "John_Kerry",
        "Bruno_Rodr%C3%ADguez_Parrilla",
        "Flag_of_the_United_States",
        "San_Jos%C3%A9,_Costa_Rica",
        "Guantanamo_Bay_Naval_Base",
        "Josh_Earnest",
        "Guantanamo_Bay_detention_camp",
        "Internet_in_Cuba",
        "World_economy",
        "Verizon_Wireless",
        "Sprint_Corporation",
        "Airbnb",
        "Netflix",
        "Starwood_Hotels_%26_Resorts_Worldwide",
        "Engage_Cuba",
        "Delta_Air_Lines",
        "Cuban_Missile_Crisis",
        "JetBlue",
        "JetBlue_Flight_387",
        "Fort_Lauderdale,_Florida",
        "Santa_Clara,_Cuba",
        "List_of_international_trips_made_by_the_President_of_the_United_States",
        "Calvin_Coolidge",
        "Cuban_dissident_movement",
        "Commercial_vessel",
        "MV_Adonia",
        "Cruise_ship",
        "Fathom_(cruise_line)",
        "Havana_Bay",
        "Royal_Caribbean_International",
        "Norwegian_Cruise_Line",
        "U.S._Department_of_the_Treasury",
        "Presidency_of_Donald_Trump",
        "Marxism",
        "Fidel_Castro",
        "Cuban_embargo",
        "Granma_(newspaper)",
        "Sandino,_Cuba",
        "CELAC",
        "Manifest_destiny",
        "Marco_Rubio",
        "Florida",
        "Cuban_American",
        "Republican_Party_(United_States)",
        "United_States_Senate_elections,_2014",
        "Bob_Menendez",
        "Democratic_Party_(United_States)",
        "New_Jersey",
        "United_States_Senate_Committee_on_Foreign_Relations",
        "USA_Today",
        "Albio_Sires",
        "Debbie_Wasserman-Schultz",
        "United_States_Ambassador_to_Cuba",
        "Ted_Cruz",
        "Texas",
        "Associated_Press",
        "United_States_Chamber_of_Commerce",
        "Jeff_Flake",
        "Arizona",
        "Rand_Paul",
        "Hillary_Clinton",
        "Radio_Poland",
        "Ministry_of_Foreign_Affairs_(Poland)",
        "Russia",
        "China",
        "Israel",
        "Foreign_relations_of_Cuba",
        "Latin_America",
        "Venezuela",
        "Nicol%C3%A1s_Maduro",
        "Ernesto_Samper",
        "UNASUR",
        "Juan_Carlos_Varela",
        "7th_Summit_of_the_Americas",
        "Canada%E2%80%93Cuba_relations",
        "John_Baird_(Canadian_politician)",
        "The_Atlantic",
        "Jeffrey_Goldberg",
        "Newsweek",
        "Reuters",
        "Fugitive",
        "Bloomberg_News",
        "The_New_Republic",
        "Bill_Clinton",
        "United_States-Vietnam_relations",
        "Miami",
        "Presidential_memorandum",
        "Trump_Administration",
        "John_R._Bolton",
        "Bay_of_Pigs_Invasion",
        "Minister_of_Foreign_Affairs_(Cuba)",
        "Perry_Christie",
        "The_New_York_Times",
        "Mark_Mazzetti",
        "Michael_S._Schmidt",
        "The_Washington_Post",
        "CNN",
        "ABC_News",
        "NPR",
        "ESPN",
        "The_Wall_Street_Journal",
        "Sun-Sentinel",
        "The_Economist",
        "Time_(magazine)",
        "The_Huffington_Post",
        "ISSN_(identifier)",
        "NBC_News",
        "Agence_France-Presse",
        "Chicago_Tribune",
        "National_Journal",
        "The_Press_of_Atlantic_City",
        "Indo-Asian_News_Service",
        "Agencia_EFE",
        "Hamodia",
        "All_Things_Considered",
        "The_New_Zealand_Herald",
        "Wayback_Machine",
        "White_House_Office_of_the_Press_Secretary",
        "Whitehouse.gov",
        "Federal_Register",
        "National_Archives_and_Records_Administration",
        "New_York_City",
        "American_Broadcasting_Company",
        "Atlanta",
        "Turner_Broadcasting_System",
        "Canary_Wharf",
        "London",
        "Thomson_Reuters",
        "Ostend_Manifesto",
        "USS_Maine_(ACR-1)",
        "Spanish%E2%80%93American_War",
        "Teller_Amendment",
        "Platt_Amendment",
        "Cuban%E2%80%93American_Treaty_of_Relations_(1903)",
        "United_States_Military_Government_in_Cuba",
        "Second_Occupation_of_Cuba",
        "Sugar_Intervention",
        "Hay-Quesada_Treaty",
        "Cuban%E2%80%93American_Treaty_of_Relations_(1934)",
        "American_fugitives_in_Cuba",
        "Antonio_Maceo_Brigade",
        "Brothers_to_the_Rescue",
        "Balseros_(rafters)",
        "Commission_for_Assistance_to_a_Free_Cuba",
        "Coordination_of_United_Revolutionary_Organizations",
        "Cuban-American_lobby",
        "Luis_Posada_Carriles",
        "Cuban_Project",
        "Eli%C3%A1n_Gonz%C3%A1lez",
        "List_of_Cuba%E2%80%93United_States_aircraft_hijackings",
        "Mariel_boatlift",
        "Operation_Northwoods",
        "Operation_Peter_Pan",
        "Helms%E2%80%93Burton_Act",
        "1999_Baltimore_Orioles%E2%80%93Cuba_national_baseball_team_exhibition_series",
        "Balseros_(film)",
        "Cuban_Americans",
        "History_of_Cuba",
        "Timeline_of_Cuban_history",
        "List_of_colonial_governors_of_Cuba",
        "Slavery_in_Cuba",
        "Ten_Years%27_War",
        "Little_War_(Cuba)",
        "Cuban_War_of_Independence",
        "Cuba_during_World_War_I",
        "Republic_of_Cuba_(1902%E2%80%9359)",
        "1932_Cuba_hurricane",
        "Cuba_during_World_War_II",
        "Escambray_Rebellion",
        "Cuban_intervention_in_Angola",
        "Special_Period",
        "2006%E2%80%9308_Cuban_transfer_of_presidential_duties",
        "United_States%E2%80%93Cuban_thaw",
        "History_of_Havana",
        "Timeline_of_Havana",
        "Timeline_of_Camag%C3%BCey",
        "Timeline_of_Cienfuegos",
        "Timeline_of_Guant%C3%A1namo",
        "Timeline_of_Holgu%C3%ADn",
        "Timeline_of_Matanzas",
        "Timeline_of_Santiago_de_Cuba",
        "Geography_of_Cuba",
        "List_of_cities_in_Cuba",
        "Bayamo",
        "Camag%C3%BCey",
        "Ciego_de_%C3%81vila",
        "Cienfuegos",
        "Guant%C3%A1namo",
        "Holgu%C3%ADn",
        "Las_Tunas_(city)",
        "Matanzas",
        "Pinar_del_R%C3%ADo",
        "Sancti_Sp%C3%ADritus",
        "Santiago_de_Cuba",
        "Provinces_of_Cuba",
        "Artemisa_Province",
        "Camag%C3%BCey_Province",
        "Ciego_de_%C3%81vila_Province",
        "Cienfuegos_Province",
        "Granma_Province",
        "Guant%C3%A1namo_Province",
        "Holgu%C3%ADn_Province",
        "Isla_de_la_Juventud",
        "Las_Tunas_Province",
        "Matanzas_Province",
        "Mayabeque_Province",
        "Pinar_del_R%C3%ADo_Province",
        "Sancti_Sp%C3%ADritus_Province",
        "Santiago_de_Cuba_Province",
        "Villa_Clara_Province",
        "Almendares_River",
        "List_of_earthquakes_in_Cuba",
        "List_of_islands_of_Cuba",
        "Sierra_Maestra",
        "List_of_wettest_tropical_cyclones_by_country",
        "List_of_World_Heritage_Sites_in_Cuba",
        "Economy_of_Cuba",
        "Cuban_Revolutionary_Armed_Forces",
        "Politics_of_Fidel_Castro",
        "Constitution_of_Cuba",
        "Elections_in_Cuba",
        "Cuban_law",
        "Politics_of_Cuba",
        "President_of_Cuba",
        "Eli%C3%A1n_Gonz%C3%A1lez_affair",
        "Fair_Play_for_Cuba_Committee",
        "Orlando_Bosch",
        "List_of_political_parties_in_Cuba",
        "Communist_Party_of_Cuba",
        "Christian_Democratic_Party_of_Cuba",
        "Democratic_Social-Revolutionary_Party_of_Cuba",
        "Cuban_Democratic_Socialist_Current",
        "Democratic_Solidarity_Party",
        "Liberal_Party_of_Cuba",
        "National_Liberal_Party_of_Cuba",
        "Social_Democratic_Co-ordination_of_Cuba",
        "Partido_Aut%C3%A9ntico",
        "Cuban_National_Party",
        "Democratic_Union_Party_(Cuba)",
        "Independent_Republican_Party_(Cuba)",
        "Partido_Ortodoxo",
        "Popular_Socialist_Party_(Cuba)",
        "Republican_Party_of_Havana",
        "Cuban_Revolutionary_Air_and_Air_Defense_Force",
        "Cuban_Army",
        "Cuban_Navy",
        "Territorial_Troops_Militia",
        "National_Revolutionary_Police_Force",
        "Direcci%C3%B3n_General_de_Inteligencia",
        "Military_Counterintelligence_Directorate",
        "Agriculture_in_Cuba",
        "Instituto_Nacional_de_Reforma_Agraria",
        "CPA_(agriculture)",
        "Central_Bank_of_Cuba",
        "Cuban_peso",
        "Cuban_convertible_peso",
        "International_rankings_of_Cuba",
        "Telecommunications_in_Cuba",
        "Transport_in_Cuba",
        "Cubana_de_Aviaci%C3%B3n",
        "Culture_of_Cuba",
        "Censorship_in_Cuba",
        "Committees_for_the_Defense_of_the_Revolution",
        "Education_in_Cuba",
        "Health_care_in_Cuba",
        "Human_rights_in_Cuba",
        "LGBT_rights_in_Cuba",
        "LGBT_history_in_Cuba",
        "Women%27s_rights_in_Cuba",
        "Cuban_Spanish",
        "Rationing_in_Cuba",
        "Scouting_and_Guiding_in_Cuba",
        "Sociolismo",
        "Cuban_art",
        "Cinema_of_Cuba",
        "Cuban_cuisine",
        "Cuban_literature",
        "Media_of_Cuba",
        "List_of_newspapers_in_Cuba",
        "Television_in_Cuba",
        "Music_of_Cuba",
        "Cuban_musical_theatre",
        "Festivals_in_Havana",
        "Public_holidays_in_Cuba",
        "Radio_Havana_Cuba",
        "Religion_in_Cuba",
        "Santer%C3%ADa",
        "Sport_in_Cuba",
        "Baseball_in_Cuba",
        "Boxing_in_Cuba",
        "Association_football_in_Cuba",
        "List_of_universities_in_Cuba",
        "Demographics_of_Cuba",
        "Cubans",
        "Afro-Cuban",
        "List_of_Cuban_Americans",
        "Cape_Verdean_Cuban",
        "Chinese_Cuban",
        "Ciboney",
        "Filipino_Cuban",
        "French_immigration_to_Cuba",
        "Haitian_Cuban",
        "Isle%C3%B1o",
        "Italian_Cuban",
        "Japanese_Cuban",
        "History_of_the_Jews_in_Cuba",
        "Koreans_in_Cuba",
        "List_of_Lebanese_people_in_Cuba",
        "Mexican_immigration_to_Cuba",
        "Spanish_immigration_to_Cuba",
        "White_Latin_American",
        "Desi_Arnaz",
        "Fulgencio_Batista",
        "Leo_Brouwer",
        "Celia_Cruz",
        "Ibrahim_Ferrer",
        "Osmani_Garc%C3%ADa",
        "M%C3%A1ximo_G%C3%B3mez",
        "Nicol%C3%A1s_Guill%C3%A9n",
        "Jos%C3%A9_Mart%C3%AD",
        "Pablo_Milan%C3%A9s",
        "Omara_Portuondo",
        "Silvio_Rodr%C3%ADguez",
        "Compay_Segundo",
        "F%C3%A9lix_Varela",
        "List_of_Cuban_architects",
        "List_of_Cuban_artists",
        "List_of_Cuban_athletes",
        "List_of_Major_League_Baseball_players_from_Cuba",
        "List_of_Cuban_painters",
        "List_of_Cuban_abstract_painters",
        "List_of_Cuban_writers",
        "List_of_Cuban_women_writers",
        "Roman_Catholic_Archdiocese_of_Buenos_Aires",
        "Cardinal_(Catholic_Church)",
        "San_Roberto_Bellarmino,_Rome",
        "Pope",
        "Resignation_of_Pope_Benedict_XVI",
        "2013_papal_conclave",
        "Papal_inauguration_of_Pope_Francis",
        "List_of_people_declared_venerable_by_Pope_Francis",
        "List_of_people_beatified_by_Pope_Francis",
        "List_of_saints_canonized_by_Pope_Francis",
        "Cardinals_created_by_Francis",
        "Joint_Declaration_of_Pope_Francis_and_Patriarch_Kirill",
        "Synod_of_Bishops_in_the_Catholic_Church",
        "Third_Extraordinary_General_Assembly_of_the_Synod_of_Bishops",
        "Fourteenth_Ordinary_General_Assembly_of_the_Synod_of_Bishops",
        "Fifteenth_Ordinary_General_Assembly_of_the_Synod_of_Bishops",
        "Synod_of_Bishops_for_the_Pan-Amazon_region",
        "Extraordinary_Jubilee_of_Mercy",
        "Study_Commission_on_the_Women%27s_Diaconate",
        "Sovereign_Military_Order_of_Malta",
        "Apostolic_constitution",
        "Vultum_Dei_quaerere",
        "Veritatis_gaudium",
        "Apostolic_exhortation",
        "Evangelii_gaudium",
        "Amoris_laetitia",
        "Gaudete_et_exsultate",
        "Christus_vivit",
        "Querida_Amazonia",
        "Encyclical",
        "Lumen_fidei",
        "Laudato_si%27",
        "Ecclesiastical_letter",
        "Misericordiae_vultus",
        "Papal_bull",
        "Maiorem_hac_dilectionem",
        "Motu_proprio",
        "Magnum_principium",
        "Vos_estis_lux_mundi",
        "List_of_pastoral_visits_of_Pope_Francis",
        "Pope_Francis%27s_visit_to_the_Philippines",
        "Pope_Francis%27s_2015_visit_to_North_America",
        "Pope_Francis%27s_visit_to_Kenya",
        "Pope_Francis%27s_visit_to_Ireland",
        "Pope_Francis%27s_visit_to_the_Baltic_states",
        "Papal_household",
        "Alfred_Xuereb",
        "Fabi%C3%A1n_Pedacchio",
        "Yoannis_Lahzi_Gaid",
        "Gonzalo_Aemilius",
        "Guido_Marini",
        "Office_for_the_Liturgical_Celebrations_of_the_Supreme_Pontiff",
        "Georg_G%C3%A4nswein",
        "Prefecture_of_the_Papal_Household",
        "Council_of_Cardinal_Advisers",
        "%C3%93scar_Rodr%C3%ADguez_Maradiaga",
        "Giuseppe_Bertello",
        "Oswald_Gracias",
        "Reinhard_Marx",
        "Se%C3%A1n_Patrick_O%27Malley",
        "Pietro_Parolin",
        "Cardinal_Secretary_of_State",
        "Pope_Benedict_XVI",
        "Angelo_Comastri",
        "Vicar_General_for_Vatican_City",
        "Angelo_De_Donatis",
        "Cardinal_Vicar",
        "Antonio_Quarracino",
        "Mario_Aurelio_Poli",
        "Sergio_Rubin",
        "Pope_Francis:_Conversations_with_Jorge_Bergoglio:_His_Life_in_His_Own_Words",
        "On_Heaven_and_Earth",
        "Pope_Francis:_Life_and_Revolution",
        "The_Dictator_Pope",
        "Coat_of_arms_of_Pope_Francis",
        "List_of_places_and_things_named_after_Pope_Francis",
        "Theology_of_Pope_Francis",
        "Domus_Sanctae_Marthae",
        "Wake_Up!_(Pope_Francis_album)",
        "Francis:_Pray_for_Me",
        "Chiamatemi_Francesco",
        "Pope_Francis:_A_Man_of_His_Word",
        "The_Two_Popes"
      ],
      "sourcestr1": "Cuban_Thaw",
      "sourcestr2": "Q19816100",
      "sourcestr3": "Q1889",
      "sourcestr4": "diplomacy",
      "sourcevarchar3": "[{\"Date\":\"July20,2015\",\"Also known as\":\"Normalization of relations between the governments of Cuba and the United States\",\"Patron\":\"Pope Francis\",\"Organized by\":[\"President of the United States\",\"Barack Obama\",\",\",\"President of Cuba\",\"Ra\\u00fal Castro\",\",\",\"Pope Francis\",\", Holy See\"],\"Participants\":[\"Canada\",\"Cuba\",\"Holy See\",\"United States\"],\"Outcome\":\"Restoration of diplomatic relations between the two governments\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Handshake_between_the_President_and_Cuban_President_Ra%C3%BAl_Castro.jpg/1200px-Handshake_between_the_President_and_Cuban_President_Ra%C3%BAl_Castro.jpg",
      "sourcedouble1": 0.008327,
      "entity1": [
        {
          "value": "2015",
          "display": "2015"
        },
        {
          "value": "2016",
          "display": "2016"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2017",
          "display": "2017"
        },
        {
          "value": "17",
          "display": "17"
        },
        {
          "value": "28",
          "display": "28"
        },
        {
          "value": "16",
          "display": "16"
        },
        {
          "value": "1959",
          "display": "1959"
        },
        {
          "value": "2019",
          "display": "2019"
        },
        {
          "value": "50",
          "display": "50"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "8",
          "display": "8"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "40",
          "display": "40"
        },
        {
          "value": "60",
          "display": "60"
        },
        {
          "value": "7",
          "display": "7"
        },
        {
          "value": "12",
          "display": "12"
        }
      ],
      "date": [
        {
          "value": "2015-07-20",
          "display": "2015-07-20"
        },
        {
          "value": "2017-06-16",
          "display": "2017-06-16"
        },
        {
          "value": "2016-03-20",
          "display": "2016-03-20"
        },
        {
          "value": "2015-04-14",
          "display": "2015-04-14"
        },
        {
          "value": "2015-05-29",
          "display": "2015-05-29"
        },
        {
          "value": "2016-05-01",
          "display": "2016-05-01"
        },
        {
          "value": "2017-11-08",
          "display": "2017-11-08"
        },
        {
          "value": "2014-12-17",
          "display": "2014-12-17"
        },
        {
          "value": "2015-01-26",
          "display": "2015-01-26"
        },
        {
          "value": "2015-01-28",
          "display": "2015-01-28"
        },
        {
          "value": "2015-04-07",
          "display": "2015-04-07"
        },
        {
          "value": "2015-05-20",
          "display": "2015-05-20"
        },
        {
          "value": "2015-12-11",
          "display": "2015-12-11"
        },
        {
          "value": "2015-12-17",
          "display": "2015-12-17"
        },
        {
          "value": "2016-02-16",
          "display": "2016-02-16"
        },
        {
          "value": "2016-03-17",
          "display": "2016-03-17"
        },
        {
          "value": "2016-04-22",
          "display": "2016-04-22"
        },
        {
          "value": "2016-07-07",
          "display": "2016-07-07"
        },
        {
          "value": "2016-07-20",
          "display": "2016-07-20"
        },
        {
          "value": "2016-08-31",
          "display": "2016-08-31"
        }
      ],
      "entity3": [
        {
          "value": "00:00",
          "display": "00:00"
        }
      ],
      "entity12": [
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        }
      ],
      "entity14": [
        {
          "value": "CONTRACT",
          "display": "Contract"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "CAPITAL",
          "display": "Capital"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "LIQUIDITY",
          "display": "Liquidity"
        }
      ],
      "company_person": [
        {
          "value": "(AIR FORCE)#(ALAN GROSS)",
          "display": "(Air Force)#(Alan Gross)"
        }
      ],
      "rank": 15,
      "displayTitle": "Cuban thaw",
      "relevantExtracts": "March 2016, Barack <b>Obama </b>became ... U.S. President Barack <b>Obama </b>and ... 14, 2015, the <b>Obama </b>... was &quot;canceling&quot; the <b>Obama </b>... loosened by the <b>Obama </b>... U.S. Congress, the <b>Obama </b>... to Congress , <b>Obama </b>... Havana with Presidents <b>Obama </b>... letter President Barack <b>Obama </b>... President Barack <b>Obama </b>"
    },
    {
      "id": "/Web/Wikipedia/|Withdrawal_of_U.S._troops_from_Afghanistan",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.958664,
      "matchingpartnames": [
        "text",
        "tables"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "2009 U.S. troops increase under the {b}Obama{nb} Administration",
        "899,56",
        "155115,56",
        "Troop levels remained roughly constant under U.S. president Barack {b}Obama{nb} 's predecessor, former president George W. Bush , with around 30,000 American troops deployed in Afghanistan.",
        "957,182",
        "155626,292",
        "The troops were the first wave of an expected surge of reinforcements originally ordered by George W. Bush and increased by Barack {b}Obama{nb}.",
        "1288,137",
        "156570,195",
        "On 17 February 2009, Barack {b}Obama{nb} ordered 17,000 more US troops be sent to Afghanistan to bolster security in the country and thereby boosted the 36,000 US troops already there by 50%.",
        "1427,184",
        "157004,184",
        "This increase is necessary to stabilize a deteriorating situation in Afghanistan, which has not received the strategic attention, direction and resources it urgently requires,\" {b}Obama{nb} said in a written statement.",
        "1613,211",
        "157567,211",
        "The Taliban is resurgent in Afghanistan, and Al-Qaeda supports the insurgency and threatens America from its safe haven along the Pakistani border,\" {b}Obama{nb} also said.",
        "1826,165",
        "157923,283",
        "{b}Obama{nb} also said he was \"absolutely convinced that you cannot solve the problem of Afghanistan, the Taliban, the spread of extremism in that region solely through military means.",
        "2427,177",
        "159429,177",
        "On 27 March 2009, {b}Obama{nb} announced after an intense 60-day White House policy review, in which military commanders and diplomats, regional governments, partners, NATO allies, NGOs and aid organisations were consulted, a new strategy for Afghanistan and Pakistan .",
        "2729,262",
        "160023,687",
        "we will defeat you,\" {b}Obama{nb} said.",
        "3355,32",
        "161461,32",
        "For this purpose {b}Obama{nb} announced that he plans to further bolster American forces in Afghanistan, increase aid to Pakistan, and set strict standards - like levels of violence and casualties in Afghanistan, Pakistani attacks against insurgents and accounting for U.S. aid - for measuring progress in fighting Al Qaeda and the Taliban in both countries.",
        "3388,351",
        "161790,496"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "935,5,1024,5,1419,5,1455,5,1790,5,1975,5,2427,5,2747,5,3376,5,3405,5,4090,5,4551,5,4907,5,5197,5,5967,5,6349,5,6464,5,6853,5,6894,5,7899,5,8019,5,8180,5,9560,5,9953,5,10171,5,10823,5,11489,5,12174,5,16178,5,16267,5,16464,5,16497,5,26816,5,28126,5,30976,5,33398,5,34292,5,34968,5,35111,5,35898,5,36190,5,38691,5,40124,5,40356,5,41090,5,42326,5,42491,5,43999,5,44976,5,45383,5,46513,5,47491,5,52237,5,52374,5,52715,5,53104,5,53379,5,53713,5,53776,5,54813,5,55404,5,56051,5,56266,5,56707,5,57745,5,57982,5,60665,5,61281,5,61508,5,62281,5,62640,5,63076,5,63330,5,63686,5,64330,5,64569,5,65612,5,66165,5;155151,5,155743,5,156759,5,157032,5,157744,5,158190,5,159429,5,160041,5,161482,5,161807,5,163383,5,164003,5,164510,5,165221,5,166552,5,167075,5,167333,5,168008,5,168049,5,170720,5,171251,5,171670,5,174490,5,175143,5,175561,5,177704,5,179751,5,181228,5,190735,5,191092,5,191491,5,191524,5,212897,5,215778,5,220286,5,224082,5,226152,5,226999,5,227408,5,229165,5,229885,5,234707,5,237441,5,237819,5,239333,5,241916,5,242675,5,245080,5,247063,5,247596,5,249165,5,251807,5,258854,5,259117,5,259910,5,260663,5,260938,5,261566,5,261775,5,263392,5,264392,5,265457,5,265792,5,266825,5,268977,5,269214,5,274568,5,275184,5,275411,5,276538,5,276897,5,277699,5,277953,5,278310,5,279784,5,280023,5,281991,5,283076,5"
          },
          {
            "partname": "tables",
            "data": "76455,5;991444,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Withdrawal of U.S. troops from Afghanistan",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-09-01 19:53:16",
      "indexationtime": "2020-09-02 05:45:42",
      "version": "WI4+UX6of2+NhFraGy2CqQ==",
      "size": 990645,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Withdrawal_of_U.S._troops_from_Afghanistan",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "ASHRAF GHANI",
          "display": "Ashraf Ghani"
        },
        {
          "value": "DONALD TRUMP",
          "display": "Donald Trump"
        },
        {
          "value": "HAMID KARZAI",
          "display": "Hamid Karzai"
        },
        {
          "value": "JOHN ALLEN",
          "display": "John Allen"
        },
        {
          "value": "JAMES MATTIS",
          "display": "James Mattis"
        },
        {
          "value": "JAY CARNEY",
          "display": "Jay Carney"
        },
        {
          "value": "LEON PANETTA",
          "display": "Leon Panetta"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "GEORGE W. BUSH",
          "display": "George W. Bush"
        },
        {
          "value": "TRUMP",
          "display": "Trump"
        },
        {
          "value": "ABDULLAH ABDULLAH",
          "display": "Abdullah Abdullah"
        },
        {
          "value": "ABDULLAH AZZAM",
          "display": "Abdullah Azzam"
        },
        {
          "value": "ALFRED A. KNOPF",
          "display": "Alfred A. Knopf"
        },
        {
          "value": "ANDERS FOGH RASMUSSEN",
          "display": "Anders Fogh Rasmussen"
        },
        {
          "value": "BARACK OBAMA JOSEPH",
          "display": "Barack Obama Joseph"
        },
        {
          "value": "CAITLIN M. HAYDEN",
          "display": "Caitlin M. Hayden"
        },
        {
          "value": "CHUCK HAGEL",
          "display": "Chuck Hagel"
        },
        {
          "value": "GEORGE LITTLE",
          "display": "George Little"
        }
      ],
      "company": [
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        },
        {
          "value": "REUTERS",
          "display": "Reuters"
        }
      ],
      "geo": [
        {
          "value": "AFGHANISTAN",
          "display": "Afghanistan"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "KABUL",
          "display": "Kabul"
        },
        {
          "value": "PAKISTAN",
          "display": "Pakistan"
        },
        {
          "value": "KANDAHAR",
          "display": "Kandahar"
        },
        {
          "value": "CHICAGO",
          "display": "Chicago"
        },
        {
          "value": "IRAQ",
          "display": "Iraq"
        },
        {
          "value": "UNITED KINGDOM",
          "display": "United Kingdom"
        },
        {
          "value": "JALALABAD",
          "display": "Jalalabad"
        },
        {
          "value": "TOKYO",
          "display": "Tokyo"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "GERMANY",
          "display": "Germany"
        },
        {
          "value": "HERAT",
          "display": "Herat"
        },
        {
          "value": "BAMIAN",
          "display": "Bamian"
        },
        {
          "value": "ITALY",
          "display": "Italy"
        },
        {
          "value": "SYRIA",
          "display": "Syria"
        },
        {
          "value": "LONDON",
          "display": "London"
        },
        {
          "value": "GUANTANAMO",
          "display": "Guantanamo"
        },
        {
          "value": "ASIA",
          "display": "Asia"
        }
      ],
      "wordcount": 8241,
      "exacthash": "iMp0MLBOua1bbF0iYFg/0w==",
      "nearhash": "I9CYRywPT2t00JeBoAhf+w==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Withdrawal_of_U.S._troops_from_Afghanistan",
      "sourcecsv1": [
        "Withdrawal of U.S. troops from Afghanistan",
        "Belligerents",
        "Commanders and leaders"
      ],
      "sourcecsv2": [
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Afghanistan",
        "United_States",
        "United_States_Armed_Forces",
        "Australia",
        "Australian_Defence_Force",
        "Afghan_Armed_Forces",
        "International_Security_Assistance_Force",
        "Resolute_Support_Mission",
        "Taliban",
        "Al-Qaeda",
        "Islamic_Movement_of_Uzbekistan",
        "Harkat-ul-Jihad-al-Islami",
        "Hezb-e-Islami_Gulbuddin",
        "Hezb-e_Islami_Khalis",
        "Haqqani_network",
        "Lashkar-e-Taiba",
        "Lashkar-e-Islam",
        "Abdullah_Azzam_Shaheed_Brigade",
        "Jaish-e-Mohammed",
        "East_Turkestan_Islamic_Movement",
        "Tehrik-i-Taliban_Pakistan",
        "Islamic_Emirate_of_Waziristan",
        "Sipah-e-Sahaba_Pakistan",
        "Tehreek-e-Nafaz-e-Shariat-e-Mohammadi",
        "Islamic_Jihad_Union",
        "Lashkar-e-Jhangvi",
        "Harkat-ul-Mujahideen",
        "Mullah_Dadullah_Front",
        "Barack_Obama",
        "Joseph_F._Dunford,_Jr.",
        "John_O._Brennan",
        "James_B._Cunningham",
        "Timeline_of_the_War_in_Afghanistan_(2001%E2%80%9314)",
        "2001_in_Afghanistan",
        "2002_in_Afghanistan",
        "2003_in_Afghanistan",
        "2004_in_Afghanistan",
        "2005_in_Afghanistan",
        "2006_in_Afghanistan",
        "2007_in_Afghanistan",
        "2008_in_Afghanistan",
        "2009_in_Afghanistan",
        "2010_in_Afghanistan",
        "2011_in_Afghanistan",
        "2012_in_Afghanistan",
        "2013_in_Afghanistan",
        "2014_in_Afghanistan",
        "2015_in_Afghanistan",
        "2016_in_Afghanistan",
        "2017_in_Afghanistan",
        "2018_in_Afghanistan",
        "2019_in_Afghanistan",
        "2020_in_Afghanistan",
        "United_States_invasion_of_Afghanistan",
        "Operation_Crescent_Wind",
        "Operation_Rhino",
        "Fall_of_Mazar-i-Sharif",
        "Siege_of_Kunduz",
        "2001_uprising_in_Herat",
        "Fall_of_Kabul",
        "Battle_of_Tarinkot",
        "Operation_Trent",
        "Fall_of_Kandahar",
        "Battle_of_Qala-i-Jangi",
        "Battle_of_Shawali_Kowt",
        "Battle_of_Sayyd_Alma_Kalay",
        "Battle_of_Tora_Bora",
        "Helmand_province_campaign",
        "2003_Lejay_firefight",
        "Operation_Eagle_Fury",
        "Friendly_fire_incident_at_Sangin",
        "Operation_Mountain_Thrust",
        "Siege_of_Sangin",
        "Operation_Mountain_Fury",
        "Battle_of_Now_Zad",
        "Operation_Achilles",
        "Siege_of_Musa_Qala",
        "Operation_Volcano",
        "Operation_Kryptonite",
        "Operation_Silver_(2007)",
        "Operation_Pickaxe-Handle",
        "Operation_Hammer_(Afghanistan)",
        "Operation_Nasrat",
        "Battle_of_Musa_Qala",
        "Battle_of_Garmsir",
        "Operation_Eagle%27s_Summit",
        "Operation_Red_Dagger",
        "Operation_Shahi_Tandar",
        "Operation_Diesel",
        "Operation_Mar_Lewe",
        "Operation_Panther%27s_Claw",
        "Operation_Strike_of_the_Sword",
        "Battle_of_Dahaneh",
        "Operation_Cobra%27s_Anger",
        "Operation_Moshtarak",
        "Operation_Tor_Shezada",
        "Battle_of_Sangin_(2010)",
        "September_2012_Camp_Bastion_raid",
        "January_2017_Afghanistan_bombings",
        "Fall_of_Sangin",
        "June_2017_Lashkargah_bombing",
        "2019_Camp_Shorabak_attack",
        "May_2020_Afghanistan_attacks",
        "Kandahar_Province",
        "Bombing_of_Kandahar_(2001)",
        "Tarnak_Farm_incident",
        "Operation_Mongoose_(War_in_Afghanistan)",
        "Operation_Medusa",
        "Operation_Avalanche_(Afghanistan)",
        "Operation_Kaika",
        "Battle_of_Panjwaii",
        "Operation_Falcon_Summit",
        "Operation_Hoover",
        "Operation_Luger",
        "Operation_Kamin",
        "Shah_Wali_Kot_Offensive",
        "2008_Kandahar_bombing",
        "Spin_Boldak_bombing",
        "Sarposa_prison_attack_of_2008",
        "Battle_of_Arghandab_(2008)",
        "Wech_Baghtu_wedding_party_attack",
        "2009_Kandahar_bombing",
        "Nadahan_wedding_bombing",
        "Operation_Dragon_Strike",
        "Operation_Baawar",
        "Battle_of_Kandahar_(2011)",
        "Kandahar_massacre",
        "Hazar_Qadam_raid",
        "Operation_Anaconda",
        "Battle_of_Takur_Ghar",
        "Operation_Warrior_Sweep",
        "Operation_Jacana",
        "Operation_Haven_Denial",
        "Operation_Mountain_Resolve",
        "Operation_Tar_Heels",
        "Korangal_Valley_campaign",
        "Operation_Red_Wings",
        "Afghanistan%E2%80%93Pakistan_Skirmishes",
        "2007_Bagram_Airfield_bombing",
        "2007_South_Korean_hostage_crisis_in_Afghanistan",
        "Nangar_Khel_incident",
        "Battle_of_Wanat",
        "Battle_of_Ebrahimkhel",
        "Battle_of_Alasay",
        "Attack_on_Bari_Alai",
        "Battle_of_Ganjgal",
        "Battle_of_Kamdesh",
        "Narang_night_raid",
        "Khataba_raid",
        "2010_Badakhshan_massacre",
        "Operation_Bulldog_Bite",
        "Battle_of_Barawala_Kalay_Valley",
        "Battle_of_Do_Ab",
        "Battle_of_Asadabad",
        "2014_Bagram_Airfield_bombing",
        "2015_Jalalabad_suicide_bombing",
        "2015_Bagram_Airfield_bombing",
        "Nangarhar_Offensive_(2016)",
        "2016_Jalalabad_suicide_bombing",
        "Jani_Khel_offensive",
        "2016_Bagram_Airfield_bombing",
        "Mohmand_Valley_raid",
        "Battle_of_Tora_Bora_(2017)",
        "2018_Save_the_Children_Jalalabad_attack",
        "July_2018_Jalalabad_suicide_bombing",
        "September_2018_Jalalabad_suicide_bombing",
        "17_September_Afghanistan_bombings",
        "2019_Jalalabad_suicide_bombing",
        "2019_Bagram_Airfield_attack",
        "Kabul_Province",
        "2002_Kabul_bombing",
        "2008_Kabul_Serena_Hotel_attack",
        "2008_Indian_embassy_bombing_in_Kabul",
        "Uzbin_Valley_ambush",
        "February_2009_Kabul_raids",
        "2009_NATO_Afghanistan_headquarters_bombing",
        "2009_Kabul_Indian_embassy_attack",
        "2009_UN_guest_house_attack_in_Kabul",
        "January_2010_Kabul_attack",
        "February_2010_Kabul_attack",
        "May_2010_Kabul_bombing",
        "2011_Inter-Continental_Hotel_Kabul_attack",
        "September_2011_Kabul_attack",
        "2011_Afghanistan_Ashura_bombings",
        "April_2012_Afghanistan_attacks",
        "June_2013_Kabul_bombings",
        "2013_Afghan_presidential_palace_attack",
        "2014_Kabul_restaurant_bombing",
        "2014_Kabul_Serena_Hotel_attack",
        "December_2014_Kabul_bombings",
        "2015_Park_Palace_guesthouse_attack",
        "2015_Kabul_Parliament_attack",
        "August_2015_Kabul_attacks",
        "10_August_2015_Kabul_suicide_attack",
        "22_August_2015_Kabul_suicide_attack",
        "2015_Spanish_Embassy_attack_in_Kabul",
        "February_2016_Kabul_bombing",
        "April_2016_Kabul_attack",
        "July_2016_Kabul_bombing",
        "August_2016_Kabul_attack",
        "September_2016_Kabul_attacks",
        "November_2016_Kabul_suicide_bombing",
        "February_2017_Supreme_Court_of_Afghanistan_attack",
        "March_2017_Kabul_attack",
        "May_2017_Kabul_attack",
        "3_June_2017_Kabul_bombing",
        "June_2017_Kabul_mosque_attack",
        "24_July_2017_Kabul_bombing",
        "2017_attack_on_the_Iraqi_embassy_in_Kabul",
        "28_December_2017_Kabul_suicide_bombing",
        "4_January_2018_Kabul_bombing",
        "2018_Inter-Continental_Hotel_Kabul_attack",
        "Kabul_ambulance_bombing",
        "March_2018_Kabul_suicide_bombing",
        "22_April_2018_Kabul_suicide_bombing",
        "30_April_2018_Kabul_suicide_bombings",
        "August_2018_Kabul_suicide_bombing",
        "2019_Kabul_mosque_bombing",
        "1_July_2019_Kabul_attack",
        "25_July_2019_Kabul_bombings",
        "28_July_2019_Kabul_suicide_bombing",
        "7_August_2019_Kabul_bombing",
        "17_August_2019_Kabul_bombing",
        "2_and_5_September_2019_Kabul_bombings",
        "17_September_2019_Afghanistan_bombings",
        "November_2019_Kabul_bombing",
        "February_2020_Kabul_bombing",
        "6_March_2020_Kabul_shooting",
        "Kabul_gurdwara_attack",
        "Counterinsurgency_in_Northern_Afghanistan",
        "Kunduz_airlift",
        "Operation_Harekate_Yolo",
        "Operation_Karez",
        "Operation_Oqab",
        "2009_Kunduz_airstrike",
        "Operation_Halmazag",
        "Battle_of_Kunduz_(2015)",
        "Kunduz_hospital_airstrike",
        "Kunduz-Takhar_highway_hostage_crisis",
        "Battle_of_Kunduz_(2016)",
        "Battle_of_Boz_Qandahari",
        "Kunduz_madrassa_attack",
        "Operation_Mountain_Viper",
        "Operation_Asbury_Park",
        "Operation_Perth",
        "Battle_of_Chora",
        "Battle_of_Firebase_Anaconda",
        "Battle_of_Shewan",
        "Balamorghab_ambush",
        "Battle_of_Derapet",
        "Battle_of_Doan",
        "Operation_Omari",
        "Battle_of_Tarinkot_(2016)",
        "Battle_of_Darzab_(2017)",
        "Battle_of_Farah",
        "Battle_of_Darzab_(2018)",
        "Ghazni_offensive",
        "2001_Sayyd_Alma_Kalay_airstrike",
        "Hyderabad_airstrike",
        "Gora_Prai_airstrike",
        "Deh_Bala_wedding_party_bombing",
        "Azizabad_airstrike",
        "Wech_Baghtu_wedding_party_airstrike",
        "Granai_airstrike",
        "Uruzgan_helicopter_attack",
        "Sangin_airstrike",
        "Mano_Gai_airstrike",
        "Baraki_Barak_airstrike",
        "2012_Kapisa_airstrike",
        "Kunar_Raid",
        "2017_Sangin_airstrike",
        "2017_Nangarhar_airstrike",
        "2007_Baghlan_sugar_factory_bombing",
        "2008_Khost_suicide_bombing",
        "2008_bombing_of_Indian_embassy_in_Kabul",
        "2009_bombing_of_Indian_embassy_in_Kabul",
        "Camp_Chapman_attack",
        "Battle_of_Sabzak",
        "2011_Logar_province_bombing",
        "2011_Nimruz_province_bombing",
        "2011_Zabul_province_bombing",
        "2013_attack_on_Indian_consulate_in_Jalalabad",
        "2013_attack_on_U.S._consulate_in_Herat",
        "2014_attack_on_Indian_consulate_in_Herat",
        "2014_Paktika_car_bombing",
        "2014_Yahyakhel_suicide_bombing",
        "2015_Khost_suicide_bombing",
        "Ghazni_prison_escape",
        "2015_Kandahar_Airport_attack",
        "Kabul_attack_on_Canadian_Embassy_Guards",
        "30_June_2016_Afghanistan_bombings",
        "American_University_of_Afghanistan_attack",
        "German_consulate_in_Mazar-i-Sharif_attack",
        "2017_Camp_Shaheen_attack",
        "June_2017_Herat_mosque_bombing",
        "August_2017_Herat_mosque_attack",
        "Save_the_Children_Jalalabad_attack",
        "August_2018_Baghlan_Province_attack",
        "September_2018_Kabul_attacks",
        "November_2018_Kabul_attack",
        "Maidan_Shar_attack",
        "2019_Ghazni_bombing",
        "Kabul_University_bombing",
        "July_2019_Farah_bombing",
        "2019_Qalat_bombing",
        "Haska_Meyna_mosque_bombing",
        "June_2020_Afghanistan_attacks",
        "July_2020_Afghanistan_attacks",
        "August_2020_Afghanistan_attacks",
        "Jalalabad_prison_attack",
        "September_2020_Afghanistan_attacks",
        "Dasht-i-Leili_massacre",
        "2007_Shinwar_shooting",
        "Maywand_District_murders",
        "Forward_Operating_Base_Delhi_massacre",
        "Video_of_U.S._Marines_urinating_on_Taliban_fighters",
        "2012_Afghanistan_Quran_burning_protests",
        "Insurgents%27_bodies_incident",
        "U.S.%E2%80%93Afghanistan_Strategic_Partnership_Agreement",
        "War_in_Afghanistan_(2015%E2%80%93present)",
        "George_W._Bush",
        "Logar_Province",
        "Wardak_Province",
        "Al-Qa%27ida",
        "U.S._Marines",
        "Marine_Corps_Base_Camp_Lejeune",
        "U.S._Army",
        "Joint_Base_Lewis-McChord",
        "Non-governmental_organization",
        "Pakistan",
        "International_Conference_on_Afghanistan,_London_(2010)",
        "The_Huffington_Post",
        "U.S.-Afghanistan_Strategic_Partnership_Agreement",
        "134th_Cavalry_Regiment_(United_States)",
        "113th_Cavalry_Regiment",
        "Parwan_province",
        "North_Atlantic_Treaty_Organization",
        "Hamid_Karzai",
        "Kabul",
        "Death_of_Osama_bin_Laden",
        "2012_Chicago_Summit",
        "2011_NATO_attack_in_Pakistan",
        "Jay_Carney",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Taliban_insurgency",
        "Aimal_Faizi",
        "Withdrawal_of_U.S._troops_from_Afghanistan#NATO_Chicago_Summit:_Troops_withdrawal_and_longterm_presence",
        "2013_State_of_the_Union_Address",
        "Abdullah_Abdullah",
        "Harold_J._Greene",
        "Joint_Special_Operations_Command",
        "Islamic_State_of_Iraq_and_the_Levant",
        "Donald_Trump",
        "American-led_intervention_in_Syria",
        "American-led_intervention_in_Iraq_(2014%E2%80%93present)",
        "James_Mattis",
        "United_States_Department_of_Defense",
        "Red_tape",
        "General_Dynamics_F-16_Fighting_Falcon",
        "Fairchild_Republic_A-10_Thunderbolt_II",
        "Boeing_B-52_Stratofortress",
        "Austin_S._Miller",
        "Afghanistan_Papers",
        "Afghan_peace_process",
        "U.S._Central_Command",
        "Kenneth_F._McKenzie_Jr.",
        "Russian_bounty_program",
        "United_States_House_Committee_on_Armed_Services",
        "National_Defense_Authorization_Act",
        "United_States_Senate",
        "Mark_Esper",
        "Paris_Peace_Accords",
        "Civilian_casualties_in_the_War_in_Afghanistan_(2001%E2%80%93present)",
        "Duty:_Memoirs_of_a_Secretary_at_War",
        "Daily_News_(New_York)",
        "NBC_News",
        "NPR",
        "Scribd",
        "Chicago_Sun-Times",
        "NATO",
        "The_Hill_(newspaper)",
        "David_Nakamura",
        "Vox_(website)",
        "Business_Insider",
        "Associated_Press",
        "Robert_Gates",
        "Alfred_A._Knopf",
        "Al_Jazeera_English",
        "United_States_Central_Command",
        "CNN",
        "War_on_Terror",
        "Iraq_War",
        "Symbolism_of_terrorism",
        "Participants_in_Operation_Enduring_Freedom",
        "Northern_Alliance",
        "Iraq",
        "Iraqi_Armed_Forces",
        "United_Kingdom",
        "European_Union",
        "Philippines",
        "Ethiopia",
        "Osama_bin_Laden",
        "Al-Qaeda_in_the_Arabian_Peninsula",
        "Abu_Sayyaf",
        "Anwar_al-Awlaki",
        "Al-Shabaab_(militant_group)",
        "Boko_Haram",
        "Harkat-ul-Jihad_al-Islami",
        "Hizbul_Mujahideen",
        "Islamic_Courts_Union",
        "Jemaah_Islamiyah",
        "Operation_Enduring_Freedom",
        "Operation_Enduring_Freedom_%E2%80%93_Philippines",
        "Georgia_Train_and_Equip_Program",
        "Georgia_Sustainment_and_Stability_Operations_Program",
        "Operation_Enduring_Freedom_%E2%80%93_Horn_of_Africa",
        "Operation_Juniper_Shield",
        "Drone_strikes_in_Pakistan",
        "Operation_Active_Endeavour",
        "Insurgency_in_the_Maghreb_(2002%E2%80%93present)",
        "Insurgency_in_the_North_Caucasus",
        "Moro_conflict",
        "Iraqi_insurgency_(2011%E2%80%932013)",
        "Operation_Linda_Nchi",
        "Terrorism_in_Saudi_Arabia",
        "Insurgency_in_Khyber_Pakhtunkhwa",
        "Somalia_War_(2006%E2%80%932009)",
        "2007_Lebanon_conflict",
        "Al-Qaeda_insurgency_in_Yemen",
        "Abu_Ghraib_torture_and_prisoner_abuse",
        "Axis_of_evil",
        "Black_site",
        "Bush_Doctrine",
        "Clash_of_Civilizations",
        "Cold_War",
        "Combatant_Status_Review_Tribunal",
        "Criticism_of_the_war_on_terror",
        "Enhanced_interrogation_techniques",
        "Torture_Memos",
        "Extrajudicial_prisoners_of_the_United_States",
        "Extraordinary_rendition",
        "Guantanamo_Bay_detention_camp",
        "Iranian_Revolution",
        "Islamic_terrorism",
        "Islamism",
        "Military_Commissions_Act_of_2006",
        "North_Korea_and_weapons_of_mass_destruction",
        "Terrorist_Surveillance_Program",
        "Operation_Noble_Eagle",
        "Operation_Eagle_Assist",
        "Pakistan%27s_role_in_the_War_on_Terror",
        "Patriot_Act",
        "President%27s_Surveillance_Program",
        "Protect_America_Act_of_2007",
        "September_11_attacks",
        "State_Sponsors_of_Terrorism_(U.S._list)",
        "Disposition_Matrix",
        "Targeted_Killing_in_International_Law",
        "Targeted_Killings:_Law_and_Morality_in_an_Asymmetrical_World",
        "Unitary_executive_theory",
        "Unlawful_combatant",
        "Cage_(organisation)",
        "War_in_Afghanistan_(1978%E2%80%93present)",
        "Afghan_War_order_of_battle_2012",
        "List_of_military_operations_in_the_war_in_Afghanistan_(2001%E2%80%932014)",
        "NATO_logistics_in_the_Afghan_War",
        "List_of_Afghan_security_forces_fatality_reports_in_Afghanistan",
        "Civilian_casualties_in_the_war_in_Afghanistan_(2001%E2%80%932014)",
        "List_of_civilian_casualties_in_the_war_in_Afghanistan_(2001%E2%80%932006)",
        "List_of_civilian_casualties_in_the_war_in_Afghanistan_(2007)",
        "List_of_civilian_casualties_in_the_war_in_Afghanistan_(2008)",
        "List_of_civilian_casualties_in_the_war_in_Afghanistan_(2009)",
        "List_of_civilian_casualties_in_the_war_in_Afghanistan_(2011)",
        "List_of_civilian_casualties_in_the_war_in_Afghanistan_(2012)",
        "Coalition_casualties_in_Afghanistan",
        "United_States_military_casualties_in_the_War_in_Afghanistan",
        "British_Forces_casualties_in_Afghanistan_since_2001",
        "Canadian_Forces_casualties_in_Afghanistan",
        "German_Armed_Forces_casualties_in_Afghanistan",
        "Norwegian_Armed_Forces_casualties_in_Afghanistan",
        "List_of_aviation_accidents_and_incidents_in_the_war_in_Afghanistan",
        "2003_attack_on_Pakistan_Embassy_in_Kabul",
        "Bagram_torture_and_prisoner_abuse",
        "Salt_Pit",
        "2007_Helmand_Province_airstrikes",
        "Haska_Meyna_wedding_party_airstrike",
        "Kidnapping_of_David_Rohde",
        "Tarok_Kolache",
        "Sarposa_prison_tunneling_escape_of_2011",
        "2011_Afghanistan_Boeing_Chinook_shootdown",
        "2011_Helmand_Province_killing",
        "U.S._soldiers_posing_with_body_parts_of_dead_Afghans",
        "2013_Indian_embassy_attack",
        "Atiqullah_Raufi",
        "April_2015_Jalalabad_suicide_bombing",
        "2019_Jalalabad_bombing",
        "Afghan_War_documents_leak",
        "International_public_opinion_on_the_war_in_Afghanistan",
        "Opposition_to_the_war_in_Afghanistan_(2001%E2%80%932014)",
        "Protests_against_the_war_in_Afghanistan_(2001%E2%80%932014)",
        "Iraq_and_Afghanistan_Memorial"
      ],
      "sourcestr1": "Withdrawal_of_U.S._troops_from_Afghanistan",
      "sourcestr2": "Q8028129",
      "sourcestr3": "Q180684",
      "sourcestr4": "conflict",
      "sourcevarchar3": "[{\"Withdrawal of U.S. troops from Afghanistan\":[[\"Part of the\",\"Afghanistan war\"],[\"Date\",\"14 June 2011 \\u2013 31 December 2016\",\"Location\",\"Afghanistan\",\"Result\",\"Withdrawal completed in December 2016 and larger U.S. presence\",\"U.S. keeps 13,000 troops as October 2019.\"]],\"Belligerents\":[\"Coalition:\",\"United States\",\"Australia\",\"Afghanistan\",\"International Security Assistance Force\",\"Resolute Support Mission\",\"Insurgent groups:\",\"Taliban\",\"al-Qaeda\",\"IMU\",\"Harkat-ul-Jihad-al-Islami\",\"HI-Gulbuddin\",\"HI-Khalis\",\"Haqqani network\",\"Lashkar-e-Taiba\",\"Lashkar-e-Islam\",\"Abdullah Azzam Shaheed Brigade\",\"JeM\",\"ETIM\",\"TTP\",\"IEW\",\"Sipah-e-Sahaba Pakistan\",\"TNSM\",\"IJU\",\"Lashkar-e-Jhangvi\",\"Harkat-ul-Mujahideen\",\"Mullah Dadullah Front\"],\"Commanders and leaders\":[\"Barack Obama\",\"Joseph F. Dunford, Jr.\",\"John O. Brennan\",\"James B. Cunningham\",\"Various\"]}]",
      "sourcedouble1": 0.018844,
      "entity1": [
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "2015",
          "display": "2015"
        },
        {
          "value": "2017",
          "display": "2017"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2016",
          "display": "2016"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2020",
          "display": "2020"
        },
        {
          "value": "-2014",
          "display": "-2014"
        },
        {
          "value": "9800",
          "display": "9800"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "68000",
          "display": "68000"
        },
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "21",
          "display": "21"
        },
        {
          "value": "10000",
          "display": "10000"
        },
        {
          "value": "23000",
          "display": "23000"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "10",
          "display": "10"
        }
      ],
      "date": [
        {
          "value": "2013-11-21",
          "display": "2013-11-21"
        },
        {
          "value": "2015-01-01",
          "display": "2015-01-01"
        },
        {
          "value": "2012-09-02",
          "display": "2012-09-02"
        },
        {
          "value": "2013-06-18",
          "display": "2013-06-18"
        },
        {
          "value": "2013-06-19",
          "display": "2013-06-19"
        },
        {
          "value": "2013-11-20",
          "display": "2013-11-20"
        },
        {
          "value": "2014-05-27",
          "display": "2014-05-27"
        },
        {
          "value": "2017-08-21",
          "display": "2017-08-21"
        },
        {
          "value": "2017-08-30",
          "display": "2017-08-30"
        },
        {
          "value": "2020-03-10",
          "display": "2020-03-10"
        },
        {
          "value": "2001-09-11",
          "display": "2001-09-11"
        },
        {
          "value": "2011-06-14",
          "display": "2011-06-14"
        },
        {
          "value": "2011-07-13",
          "display": "2011-07-13"
        },
        {
          "value": "2012-04-18",
          "display": "2012-04-18"
        },
        {
          "value": "2012-05-02",
          "display": "2012-05-02"
        },
        {
          "value": "2012-05-21",
          "display": "2012-05-21"
        },
        {
          "value": "2012-07-04",
          "display": "2012-07-04"
        },
        {
          "value": "2012-07-08",
          "display": "2012-07-08"
        },
        {
          "value": "2012-07-22",
          "display": "2012-07-22"
        },
        {
          "value": "2012-09-01",
          "display": "2012-09-01"
        }
      ],
      "entity4": [
        {
          "value": "USD 15000000000",
          "display": "USD 15000000000"
        },
        {
          "value": "USD 16000000000",
          "display": "USD 16000000000"
        },
        {
          "value": "USD 4000000000",
          "display": "USD 4000000000"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "DEATH",
          "display": "Death"
        },
        {
          "value": "BATTLE",
          "display": "Battle"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        }
      ],
      "entity14": [
        {
          "value": "CONTRACT",
          "display": "Contract"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "CAPITAL",
          "display": "Capital"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        }
      ],
      "event_date": [
        {
          "value": "(VICTORY)#(2017-08-21)",
          "display": "(Victory)#(2017-08-21)"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(BIDEN)",
          "display": "(Vice-President)#(Biden)"
        }
      ],
      "company_person": [
        {
          "value": "(REUTERS)#(HAMID KARZAI)",
          "display": "(Reuters)#(Hamid Karzai)"
        }
      ],
      "rank": 16,
      "displayTitle": "Withdrawal of U.S. troops from Afghanistan",
      "relevantExtracts": "increase under the <b>Obama </b>... U.S. president Barack <b>Obama </b>&#39;s ... increased by Barack <b>Obama</b>... February 2009, Barack <b>Obama </b>ordered ... it urgently requires,&quot; <b>Obama </b>said ... the Pakistani border,&quot; <b>Obama </b>... <b>Obama </b>also ... 27 March 2009, <b>Obama </b>announced ... will defeat you,&quot; <b>Obama </b>... For this purpose <b>Obama </b>"
    },
    {
      "id": "/Web/Wikipedia/|Gregory_B._Craig",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.957814,
      "matchingpartnames": [
        "text"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "Gregory Bestor Craig (born March 4, 1945) is an American lawyer and former White House Counsel , under President Barack {b}Obama{nb} , from 2009 to 2010.",
        "2,146",
        "11917,270",
        "After leaving the {b}Obama{nb} administration , Craig returned to private practice as a partner at the law firm Skadden, Arps, Slate, Meagher & Flom .",
        "603,143",
        "13197,363",
        "{b}Obama{nb} presidential campaign",
        "8231,27",
        "43235,27",
        "Craig met Barack and Michelle {b}Obama{nb} for the first time in 2003, at the home of Vernon Jordan , a close friend of the Clintons, and the then-Illinois state senator impressed Craig.",
        "8260,179",
        "43662,292",
        "Despite close ties to the Clintons, Craig urged {b}Obama{nb} to run for president, and became an informal foreign-policy adviser to him.",
        "8440,129",
        "44204,129",
        "In March 2007, Craig publicly declared his support for {b}Obama{nb} in the 2008 Democratic presidential primary",
        "8570,106",
        "44469,227",
        "In summer 2008, during the presidential campaign, {b}Obama{nb} decided to support legislation (specifically, an amendment to the Foreign Intelligence Surveillance Act ) to granting legal immunity to telecommunications companies that cooperated with the Bush administration's warrantless NSA wiretapping program .",
        "8758,305",
        "45033,543",
        "This angered many Democrats, because it was a reversal of {b}Obama{nb}'s earlier vow during the primary campaign to oppose such legislation and to filibuster against it.",
        "9064,162",
        "45708,212",
        "a leading contender to be secretary of state after {b}Obama{nb} got the nomination.",
        "9745,76",
        "46884,76",
        "The campaign expected \"that McCain would condescend to {b}Obama{nb} as a wet-behind-the-ears rookie\" and Craig played his role as such.",
        "9973,128",
        "47601,128"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "122,5,621,5,8231,5,8290,5,8488,5,8625,5,8808,5,9122,5,9260,5,9291,5,9323,5,9796,5,10028,5,10132,5,10304,5,10580,5,10649,5,10858,5,10964,5,11013,5,11176,5,12594,5,14276,5,14817,5,15121,5,15287,5,15414,5,16512,5;12158,5,13301,5,43235,5,43746,5,44252,5,44524,5,45083,5,45766,5,46085,5,46116,5,46148,5,46935,5,47656,5,47895,5,48202,5,49030,5,51041,5,51491,5,51714,5,51896,5,52338,5,56428,5,61589,5,63459,5,64028,5,64484,5,64877,5,67691,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Gregory B. Craig",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-27 15:28:13",
      "indexationtime": "2020-09-02 05:50:56",
      "version": "OROsVp1R8L8pVjfuUnIzuA==",
      "size": 339893,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Gregory_B._Craig",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "GREGORY B. CRAIG",
          "display": "Gregory B. Craig"
        },
        {
          "value": "GREG CRAIG",
          "display": "Greg Craig"
        },
        {
          "value": "JIM STEINBERG",
          "display": "Jim Steinberg"
        },
        {
          "value": "JONATHAN ALTER",
          "display": "Jonathan Alter"
        },
        {
          "value": "MORTON HALPERIN",
          "display": "Morton Halperin"
        },
        {
          "value": "SONIA SOTOMAYOR",
          "display": "Sonia Sotomayor"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "BOB BAUER",
          "display": "Bob Bauer"
        },
        {
          "value": "EDWARD BENNETT WILLIAMS",
          "display": "Edward Bennett Williams"
        },
        {
          "value": "EDWARD M. KENNEDY",
          "display": "Edward M. Kennedy"
        },
        {
          "value": "PAUL MANAFORT",
          "display": "Paul Manafort"
        },
        {
          "value": "WILLIAM KENNEDY SMITH",
          "display": "William Kennedy Smith"
        },
        {
          "value": "ALEX VAN DER ZWAAN",
          "display": "Alex van der Zwaan"
        },
        {
          "value": "BILL BURTON",
          "display": "Bill Burton"
        },
        {
          "value": "CLIFFORD SLOAN",
          "display": "Clifford Sloan"
        },
        {
          "value": "CYNTHIA HOGAN",
          "display": "Cynthia Hogan"
        },
        {
          "value": "DERRY NOYES",
          "display": "Derry Noyes"
        },
        {
          "value": "ELIOT NOYES",
          "display": "Eliot Noyes"
        },
        {
          "value": "ELIZABETH DREW",
          "display": "Elizabeth Drew"
        }
      ],
      "company": [
        {
          "value": "GOLDMAN SACHS",
          "display": "Goldman Sachs"
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "IBM",
          "display": "IBM"
        },
        {
          "value": "WASHINGTON POST",
          "display": "Washington Post"
        }
      ],
      "geo": [
        {
          "value": "GUANTANAMO",
          "display": "Guantanamo"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "KENDALL",
          "display": "Kendall"
        },
        {
          "value": "VERMONT",
          "display": "Vermont"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "CONNECTICUT",
          "display": "Connecticut"
        },
        {
          "value": "VIETNAM",
          "display": "Vietnam"
        },
        {
          "value": "DERRY",
          "display": "Derry"
        },
        {
          "value": "EGYPT",
          "display": "Egypt"
        },
        {
          "value": "NEW HAMPSHIRE",
          "display": "New Hampshire"
        },
        {
          "value": "NORFOLK",
          "display": "Norfolk"
        },
        {
          "value": "VIRGINIA",
          "display": "Virginia"
        },
        {
          "value": "EXETER",
          "display": "Exeter"
        },
        {
          "value": "UKRAINE",
          "display": "Ukraine"
        },
        {
          "value": "ABA",
          "display": "Aba"
        },
        {
          "value": "BERMUDA",
          "display": "Bermuda"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "CAMBRIDGE",
          "display": "Cambridge"
        },
        {
          "value": "LONDON",
          "display": "London"
        },
        {
          "value": "MISSISSIPPI",
          "display": "Mississippi"
        }
      ],
      "wordcount": 2477,
      "exacthash": "i0sTwnTaOOlw3fRibKhYGg==",
      "nearhash": "KIrfI4K1JhVdqf5JnE8hrQ==",
      "partnamelocations": [
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Gregory_B._Craig",
      "sourcecsv1": [
        "White House Counsel",
        "President",
        "Preceded by",
        "Succeeded by",
        "Director of Policy Planning",
        "Born",
        "Political party",
        "Education"
      ],
      "sourcecsv2": [
        "White_House_Counsel",
        "Barack_Obama",
        "Fred_F._Fielding",
        "Robert_Bauer",
        "Director_of_Policy_Planning",
        "Bill_Clinton",
        "James_Steinberg",
        "Morton_Halperin",
        "Norfolk,_Virginia",
        "Virginia",
        "United_States",
        "Democratic_Party_(United_States)",
        "Harvard_University",
        "Bachelor_of_Arts",
        "Emmanuel_College,_Cambridge",
        "Master_of_Arts",
        "Yale_University",
        "Juris_Doctor",
        "Law_firm",
        "Williams_%26_Connolly",
        "White_House",
        "Impeachment_of_Bill_Clinton",
        "Edward_Kennedy",
        "United_States_Secretary_of_State",
        "Madeleine_Albright",
        "Obama_Administration",
        "Skadden,_Arps,_Slate,_Meagher_%26_Flom",
        "Government_of_Ukraine",
        "Viktor_F._Yanukovych",
        "Paul_Manafort",
        "United_States_Navy",
        "World_War_II",
        "Vermont_State_Colleges",
        "California_Community_College",
        "Monterey_Institute",
        "Governor_of_Vermont",
        "Vermont",
        "Middlebury,_Vermont",
        "Palo_Alto,_California",
        "Phillips_Exeter_Academy",
        "New_Hampshire",
        "Harvard_College",
        "Harvard_Krokodiloes",
        "A_cappella",
        "Phi_Beta_Kappa",
        "Upton_Sinclair",
        "Great_Depression",
        "Harvard_Undergraduate_Council",
        "Henry_Kissinger",
        "Freedom_Summer",
        "Harlem",
        "Opposition_to_the_Vietnam_War",
        "Conscientious_objector",
        "Draft_lottery_(1969)",
        "Exeter,_New_Hampshire",
        "Selective_Service_System",
        "Lionel_de_Jersey_Harvard_Fellowship",
        "Cambridge_University",
        "Master%27s_degree",
        "Yale_Law_School",
        "Hillary_Clinton",
        "David_E._Kendall",
        "New_Haven,_Connecticut",
        "Public_defender",
        "Edward_M._Kennedy",
        "United_States_Department_of_State",
        "Clinton_White_House",
        "Connecticut",
        "Master_of_Fine_Arts",
        "Joe_Califano",
        "Edward_Bennett_Williams",
        "Bribery",
        "Conspiracy_(criminal)",
        "Juror_misconduct",
        "Philadelphia",
        "John_W._Hinckley,_Jr.",
        "Attempted_assassination_of_Ronald_Reagan",
        "Not_guilty_by_reason_of_insanity",
        "William_Kennedy_Smith",
        "Global_Rights",
        "Madeleine_K._Albright",
        "Think_tank",
        "Human_rights_in_Tibet",
        "Assistant_to_the_President",
        "West_Wing",
        "Public_relations",
        "John_Podesta",
        "White_House_chief_of_staff",
        "PBS_Frontline",
        "Charles_Ruff",
        "Cheryl_D._Mills",
        "Dale_Bumpers",
        "Eli%C3%A1n_Gonz%C3%A1lez_affair",
        "Eli%C3%A1n_Gonz%C3%A1lez",
        "Child_custody",
        "Cuban-American_relations",
        "Richard_Helms",
        "Director_of_Central_Intelligence",
        "Salvador_Allende",
        "United_Nations_Secretary-General",
        "Kofi_Annan",
        "Soviet_dissident",
        "Aleksandr_Solzhenitsyn",
        "Manuel_Noriega",
        "Michelle_Obama",
        "Vernon_Jordan",
        "Democratic_Presidential_Primary_2008",
        "Foreign_Intelligence_Surveillance_Act",
        "NSA_warrantless_surveillance_(2001%E2%80%9307)",
        "Filibuster",
        "Glenn_Greenwald",
        "John_McCain",
        "United_States_presidential_election_debates,_2008",
        "2004_United_States_presidential_election",
        "John_Kerry",
        "George_W._Bush",
        "Oval_Office",
        "Pete_Souza",
        "2008_United_States_presidential_election",
        "ABA_Journal",
        "Executive_order_(United_States)",
        "Torture",
        "Guantanamo_Bay_prison_camp",
        "Central_Intelligence_Agency",
        "Torture_Memos",
        "Office_of_Legal_Counsel",
        "U.S._Department_of_Justice",
        "National_security",
        "Freedom_of_Information_Act_(United_States)",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Sonia_Sotomayor",
        "Supreme_Court_of_the_United_States",
        "Vetting",
        "Barack_Obama_Supreme_Court_candidates",
        "Nina_Totenberg",
        "NPR",
        "Rahm_Emanuel",
        "Jonathan_Alter",
        "United_States_National_Security_Council",
        "Uyghur_detainees_at_Guantanamo_Bay",
        "Pete_Rouse",
        "Ronald_A._Klain",
        "Cynthia_Hogan",
        "Ken_Salazar",
        "United_States_federal_judge",
        "Steve_Clemons",
        "Maureen_Dowd",
        "Kimba_Wood",
        "Lani_Guinier",
        "Elizabeth_Drew",
        "Clifford_Sloan",
        "Joseph_H._Flom",
        "Investment_banking",
        "Goldman_Sachs",
        "Securities_and_Exchange_Commission",
        "White_House_Press_Secretary",
        "Bill_Burton_(political_consultant)",
        "Revolving_door_(politics)",
        "John_Edwards",
        "Rielle_Hunter",
        "Acquittal",
        "Vin_Weber",
        "Washington_Institute_for_Near_East_Policy",
        "Egypt%E2%80%93United_States_relations",
        "President_of_Egypt",
        "Mohamed_Morsi",
        "United_States_military_aid",
        "President_of_Ukraine",
        "Viktor_Yanukovich",
        "Criminal_cases_against_Yulia_Tymoshenko_since_2010",
        "Prime_Minister_of_Ukraine",
        "Yulia_Tymoshenko",
        "Right_to_counsel",
        "Right_to_a_fair_trial",
        "Due_process",
        "Rule_of_law",
        "Alex_van_der_Zwaan",
        "London",
        "Viktor_Yanukovych",
        "Mueller_investigation",
        "Making_false_statements",
        "U.S._Attorney%27s_Office_for_the_Southern_District_of_New_York",
        "Tony_Podesta",
        "Foreign_Agents_Registration_Act",
        "New_Canaan,_Connecticut",
        "Eliot_Noyes",
        "IBM_Selectric",
        "Graphic_designer",
        "Cleveland_Park",
        "Timeline_of_investigations_into_Trump_and_Russia_(2019)",
        "Peter_Baker_(author)",
        "New_York_Times",
        "NBC_News",
        "CNBC",
        "ISSN_(identifier)",
        "C-SPAN",
        "The_New_York_Times",
        "Presidency_of_Barack_Obama",
        "Cabinet_of_the_United_States",
        "United_States_Secretary_of_the_Treasury",
        "Jack_Lew",
        "United_States_Secretary_of_Defense",
        "Ash_Carter",
        "United_States_Attorney_General",
        "Loretta_Lynch",
        "United_States_Secretary_of_the_Interior",
        "Sally_Jewell",
        "United_States_Secretary_of_Agriculture",
        "Tom_Vilsack",
        "United_States_Secretary_of_Commerce",
        "Penny_Pritzker",
        "United_States_Secretary_of_Labor",
        "Tom_Perez",
        "United_States_Secretary_of_Health_and_Human_Services",
        "Sylvia_Mathews_Burwell",
        "United_States_Secretary_of_Education",
        "United_States_Secretary_of_Transportation",
        "John_King_Jr.",
        "Anthony_Foxx",
        "United_States_Secretary_of_Housing_and_Urban_Development",
        "Julian_Castro",
        "United_States_Secretary_of_Veterans_Affairs",
        "Robert_A._McDonald",
        "United_States_Secretary_of_Energy",
        "Ernest_Moniz",
        "United_States_Secretary_of_Homeland_Security",
        "Jeh_Johnson",
        "Vice_President_of_the_United_States",
        "Joe_Biden",
        "White_House_Chief_of_Staff",
        "Denis_McDonough",
        "Office_of_Management_and_Budget",
        "Shaun_Donovan",
        "Administrator_of_the_Environmental_Protection_Agency",
        "Gina_McCarthy",
        "United_States_Ambassador_to_the_United_Nations",
        "Samantha_Power",
        "Council_of_Economic_Advisers",
        "Jason_Furman",
        "Office_of_the_United_States_Trade_Representative",
        "Michael_Froman",
        "Administrator_of_the_Small_Business_Administration",
        "Maria_Contreras-Sweet",
        "Cabinet_of_the_United_States#Cabinet-level_officers",
        "Confirmations_of_Barack_Obama%27s_Cabinet",
        "Executive_Office_of_the_President_of_the_United_States",
        "National_Security_Advisor_(United_States)",
        "James_L._Jones",
        "Thomas_E._Donilon",
        "William_M._Daley",
        "Susan_Rice",
        "Deputy_National_Security_Advisor_(United_States)",
        "White_House_Deputy_Chief_of_Staff",
        "Mona_Sutphen",
        "Tony_Blinken",
        "Nancy-Ann_DeParle",
        "Avril_Haines",
        "Rob_Nabors",
        "John_O._Brennan",
        "Jim_Messina_(political_staffer)",
        "Lisa_Monaco",
        "Alyssa_Mastromonaco",
        "Douglas_Lute",
        "Anita_Decker_Breckenridge",
        "Ben_Rhodes_(White_House_staffer)",
        "Mark_B._Childress",
        "Mark_Lippert",
        "Kristie_Canegallo",
        "Counselor_to_the_President",
        "Brooke_D._Anderson",
        "White_House_Communications_Director",
        "Ellen_Moran",
        "Senior_Advisor_to_the_President_of_the_United_States",
        "David_Axelrod_(political_consultant)",
        "Anita_Dunn",
        "David_Plouffe",
        "Daniel_Pfeiffer",
        "Jennifer_Palmieri",
        "Shailagh_Murray",
        "Jen_Psaki",
        "Brian_Deese",
        "Valerie_Jarrett",
        "Robert_Gibbs",
        "Office_of_Public_Liaison",
        "Tina_Tchen",
        "Jay_Carney",
        "Josh_Earnest",
        "White_House_Office_of_Intergovernmental_Affairs",
        "Cecilia_Mu%C3%B1oz",
        "Eric_Schultz",
        "Jerry_Abramson",
        "Stephanie_Cutter",
        "National_Economic_Council_(United_States)",
        "Lawrence_Summers",
        "Jon_Favreau_(speechwriter)",
        "Gene_Sperling",
        "Cody_Keenan",
        "Jeffrey_Zients",
        "Macon_Phillips",
        "Christina_Romer",
        "Austan_Goolsbee",
        "Phil_Schiliro",
        "President%27s_Council_on_Jobs_and_Competitiveness",
        "Paul_Volcker",
        "Katie_Beirne_Fallon",
        "Jeff_Immelt",
        "United_States_Domestic_Policy_Council",
        "Melody_Barnes",
        "Patrick_Gaspard",
        "White_House_Office_of_Faith-Based_and_Neighborhood_Partnerships",
        "Joshua_DuBois",
        "David_Simas",
        "Melissa_Rogers",
        "White_House_Office_of_Health_Reform",
        "Office_of_National_AIDS_Policy",
        "Jeffrey_Crowley",
        "White_House_Office_of_the_Staff_Secretary",
        "Lisa_Brown_(lawyer)",
        "White_House_Office_of_Urban_Affairs",
        "Adolfo_Carri%C3%B3n_Jr.",
        "Rajesh_De",
        "White_House_Office_of_Energy_and_Climate_Change_Policy",
        "Carol_Browner",
        "Kathryn_Ruemmler",
        "Neil_Eggleston",
        "White_House_Cabinet_Secretary",
        "Chris_Lu",
        "Danielle_C._Gray",
        "David_Recordon",
        "Broderick_D._Johnson",
        "Office_of_Administration",
        "Reggie_Love",
        "Brian_Mosteller",
        "Office_of_Science_and_Technology_Policy",
        "John_Holdren",
        "Oval_Office_Operations",
        "Chief_Technology_Officer_of_the_United_States",
        "Aneesh_Chopra",
        "Secretary_to_the_President_of_the_United_States",
        "Katie_Johnson_(presidential_secretary)",
        "Todd_Park",
        "Megan_Smith",
        "Ferial_Govashiri",
        "Peter_R._Orszag",
        "Office_of_the_First_Lady_of_the_United_States",
        "Jackie_Norris",
        "White_House_Social_Secretary",
        "Desir%C3%A9e_Rogers",
        "Julianna_Smoot",
        "Jeremy_Bernard",
        "Federal_Chief_Information_Officer_of_the_United_States",
        "Vivek_Kundra",
        "Deesha_Dyer",
        "Steven_VanRoekel",
        "Chief_of_Staff_to_the_Vice_President_of_the_United_States",
        "Ron_Klain",
        "Bruce_Reed_(political_operative)",
        "United_States_Trade_Representative",
        "Ron_Kirk",
        "Steve_Ricchetti",
        "White_House_Chief_Usher",
        "Stephen_W._Rochon",
        "Office_of_National_Drug_Control_Policy",
        "Gil_Kerlikowske",
        "Angella_Reid",
        "Michael_Botticelli",
        "White_House_Military_Office",
        "Council_on_Environmental_Quality",
        "Nancy_Sutley",
        "Christy_Goldfuss",
        "Presidency_of_George_W._Bush",
        "Office_of_the_Vice_President_of_the_United_States",
        "Mike_Donilon",
        "Evan_Ryan",
        "Colin_Kahl",
        "Wife_of_the_Vice_President_of_the_United_States",
        "Catherine_M._Russell",
        "Moises_Vela",
        "Terrell_McSweeny",
        "Jared_Bernstein",
        "Elizabeth_Alexander_(press_secretary)",
        "Sudafi_Henry",
        "Samuel_Rosenman",
        "Clark_Clifford",
        "Charles_S._Murphy",
        "Bernard_M._Shanley",
        "Gerald_D._Morgan",
        "David_W._Kendall",
        "Ted_Sorensen",
        "Myer_Feldman",
        "Lee_C._White",
        "Milton_Semer",
        "Harry_McPherson",
        "Larry_E._Temple",
        "Charles_Colson",
        "John_Ehrlichman",
        "John_Dean",
        "Leonard_Garment",
        "William_E._Casselman_II",
        "Philip_W._Buchen",
        "Robert_Lipshutz",
        "Lloyd_Cutler",
        "Peter_J._Wallison",
        "Arthur_B._Culvahouse_Jr.",
        "C._Boyden_Gray",
        "Bernard_Nussbaum",
        "Abner_J._Mikva",
        "Jack_Quinn_(lawyer)",
        "Beth_Nolan",
        "Alberto_Gonzales",
        "Harriet_Miers",
        "Greg_Craig",
        "Don_McGahn",
        "Emmet_Flood",
        "Pat_Cipollone"
      ],
      "sourcestr1": "Gregory_B._Craig",
      "sourcestr2": "Q5605452",
      "sourcestr3": "Q5",
      "sourcestr4": "human",
      "sourcevarchar3": "[{\"Gregory B. Craig\":\"\",\"White House Counsel\":[\"In office\",\"January 20, 2009\\u2013January 3, 2010\"],\"President\":\"Bill Clinton\",\"Preceded by\":\"Jim Steinberg\",\"Succeeded by\":\"Morton Halperin\",\"Director of Policy Planning\":[\"In office\",\"July 10, 1997\\u2013September 16, 1998\"],\"Personal details\":\"\",\"Born\":[\"Gregory Bestor Craig\",\"March 4, 1945\",\"(age75)\",\"Norfolk\",\",\",\"Virginia\",\",\",\"U.S.\"],\"Political party\":\"Democratic\",\"Education\":[\"Harvard University\",\"Emmanuel College, Cambridge\",\"Yale University\"]}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/3/34/Greg_Craig.jpg",
      "sourcedouble1": 0.011271,
      "entity1": [
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "2019",
          "display": "2019"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "1997",
          "display": "1997"
        },
        {
          "value": "1998",
          "display": "1998"
        },
        {
          "value": "1972",
          "display": "1972"
        },
        {
          "value": "1945",
          "display": "1945"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2018",
          "display": "2018"
        },
        {
          "value": "27",
          "display": "27"
        },
        {
          "value": "10",
          "display": "10"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "2000",
          "display": "2000"
        },
        {
          "value": "4600000",
          "display": "4600000"
        }
      ],
      "date": [
        {
          "value": "1945-03-04",
          "display": "1945-03-04"
        },
        {
          "value": "2010-01-03",
          "display": "2010-01-03"
        },
        {
          "value": "1974-07-27",
          "display": "1974-07-27"
        },
        {
          "value": "1997-07-10",
          "display": "1997-07-10"
        },
        {
          "value": "1998-09-16",
          "display": "1998-09-16"
        },
        {
          "value": "2009-01-20",
          "display": "2009-01-20"
        },
        {
          "value": "2009-05-01",
          "display": "2009-05-01"
        },
        {
          "value": "2009-11-13",
          "display": "2009-11-13"
        },
        {
          "value": "2010-01-27",
          "display": "2010-01-27"
        },
        {
          "value": "2019-04-11",
          "display": "2019-04-11"
        }
      ],
      "entity4": [
        {
          "value": "USD 2000000",
          "display": "USD 2000000"
        },
        {
          "value": "USD 4600000",
          "display": "USD 4600000"
        },
        {
          "value": "USD 1700000",
          "display": "USD 1700000"
        },
        {
          "value": "USD 75",
          "display": "USD 75"
        }
      ],
      "entity12": [
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        }
      ],
      "entity13": [
        {
          "value": "DIRECTOR",
          "display": "Director"
        }
      ],
      "entity14": [
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "INVESTMENT",
          "display": "Investment"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        }
      ],
      "event_date": [
        {
          "value": "(BIRTH)#(1945-03-04)",
          "display": "(Birth)#(1945-03-04)"
        },
        {
          "value": "(BIRTH)#(1998-09-16)",
          "display": "(Birth)#(1998-09-16)"
        }
      ],
      "person_cooc": [
        {
          "value": "(DIRECTOR)#(JIM STEINBERG)",
          "display": "(Director)#(Jim Steinberg)"
        },
        {
          "value": "(DIRECTOR)#(MORTON HALPERIN)",
          "display": "(Director)#(Morton Halperin)"
        },
        {
          "value": "(DIRECTOR)#(RICHARD HELMS)",
          "display": "(Director)#(Richard Helms)"
        }
      ],
      "entity18": [
        {
          "value": "(ACQUISITION)#(USD 2000000)",
          "display": "(Acquisition)#(USD 2000000)"
        },
        {
          "value": "(REVENUE)#(USD 1700000)",
          "display": "(Revenue)#(USD 1700000)"
        }
      ],
      "company_person": [
        {
          "value": "(IBM)#(ELIOT NOYES)",
          "display": "(IBM)#(Eliot Noyes)"
        }
      ],
      "rank": 17,
      "displayTitle": "Gregory B. Craig",
      "relevantExtracts": "under President Barack <b>Obama </b>, ... After leaving the <b>Obama </b>administration ... <b>Obama </b>... Barack and Michelle <b>Obama </b>for ... Clintons, Craig urged <b>Obama </b>to ... his support for <b>Obama </b>in ... the presidential campaign, <b>Obama </b>decided ... a reversal of <b>Obama</b>... of state after <b>Obama </b>... would condescend to <b>Obama </b>"
    },
    {
      "id": "/Web/Wikipedia/|2012_Democratic_National_Convention",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.957618,
      "matchingpartnames": [
        "text",
        "tables"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "The 2012 Democratic National Convention was a gathering, held from September 3-6, 2012, at the Time Warner Cable Arena in Charlotte, North Carolina , in which delegates of the Democratic Party nominated President Barack {b}Obama{nb} and Vice President Joe Biden for reelection, in the 2012 United States national election .",
        "185,316",
        "40026,1289",
        "On April 3, 2012, President Barack {b}Obama{nb} won the Maryland and District of Columbia primaries, giving him more than the required 2,778 delegates to secure the presidential nomination.",
        "503,182",
        "41323,236",
        "First Lady Michelle {b}Obama{nb} announced on February 1, 2011, in an email to supporters that Charlotte, North Carolina , had been chosen as the site for the 2012 Convention.",
        "909,168",
        "52655,309",
        "North Carolina was a closely contested state in the 2008 presidential election , with Barack {b}Obama{nb} winning the state's 15 electoral votes by just 13,692 votes (out of more than 4.2 million votes cast) and Democrats Kay Hagan and Bev Perdue winning close elections for U.S. Senate and Governor , respectively.",
        "1443,308",
        "54516,890",
        "The last night, Thursday, September 6, was originally scheduled to be held at the 72,000-seat Bank of America Stadium , where presumptive presidential nominee Barack {b}Obama{nb} was to deliver his acceptance speech.",
        "2276,209",
        "57608,284",
        "The date of {b}Obama{nb}'s acceptance speech caused the National Football League to move the Kickoff game , normally on a Thursday, to Wednesday, September 5, to avoid a conflict.",
        "3218,172",
        "59491,373",
        "This in turn caused the DNC to move Joe Biden's vice presidential acceptance speech, normally held the day before the presidential acceptance speech, to Thursday, before {b}Obama{nb}'s speech, to avoid a conflict with the NFL game.",
        "3391,224",
        "59982,224",
        "Tuesday, September 4 - Julián Castro and Michelle {b}Obama{nb}",
        "3617,55",
        "60512,58",
        "Michelle {b}Obama{nb} speaks at the convention",
        "3674,39",
        "61964,43",
        "A man who already is our president, Barack {b}Obama{nb}\", with the Global Post describing the audience as \"adoring and appreciative\" and the speech as \"powerful words, and the audience responded with gratitude.",
        "4907,203",
        "69307,282"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "405,5,538,5,929,5,1536,5,2442,5,3230,5,3561,5,3667,5,3683,5,4950,5,5133,5,5580,5,8934,5,9030,5,9367,5,9579,5,13303,5,13353,5,14419,5,14460,5,14486,5,14630,5,14866,5,15001,5,16358,5,16816,5,17015,5,17168,5,17216,5,23105,5,23899,5,24426,5,24540,5,24620,5;40958,5,41408,5,52733,5,54826,5,57849,5,59503,5,60152,5,60565,5,61973,5,69350,5,69789,5,70240,5,78709,5,78948,5,80102,5,83324,5,95898,5,97171,5,98663,5,99113,5,99139,5,99283,5,100440,5,100939,5,108662,5,110011,5,110598,5,110933,5,111042,5,130115,5,132842,5,286914,5,287138,5,287368,5"
          },
          {
            "partname": "tables",
            "data": "25411,5,25600,5;549941,5,550133,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "2012 Democratic National Convention",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-30 08:18:08",
      "indexationtime": "2020-09-02 08:24:19",
      "version": "/y3taoUpkhEgrkgb/UNs4A==",
      "size": 549540,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "2012_Democratic_National_Convention",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "MICHELLE OBAMA",
          "display": "Michelle Obama"
        },
        {
          "value": "JOE BIDEN",
          "display": "Joe Biden"
        },
        {
          "value": "BILL CLINTON",
          "display": "Bill Clinton"
        },
        {
          "value": "ANTONIO VILLARAIGOSA",
          "display": "Antonio Villaraigosa"
        },
        {
          "value": "CORY BOOKER",
          "display": "Cory Booker"
        },
        {
          "value": "ELIZABETH WARREN",
          "display": "Elizabeth Warren"
        },
        {
          "value": "NANCY PELOSI",
          "display": "Nancy Pelosi"
        },
        {
          "value": "DAVID FOSTER",
          "display": "David Foster"
        },
        {
          "value": "DEBBIE WASSERMAN SCHULTZ",
          "display": "Debbie Wasserman Schultz"
        },
        {
          "value": "JENNIFER GRANHOLM",
          "display": "Jennifer Granholm"
        },
        {
          "value": "JOHN WOLFE",
          "display": "John Wolfe"
        },
        {
          "value": "KEITH RUSSELL JUDD",
          "display": "Keith Russell Judd"
        },
        {
          "value": "RANDALL TERRY",
          "display": "Randall Terry"
        },
        {
          "value": "SANDRA FLUKE",
          "display": "Sandra Fluke"
        },
        {
          "value": "MARTIN O'MALLEY",
          "display": "Martin O'Malley"
        },
        {
          "value": "TED STRICKLAND",
          "display": "Ted Strickland"
        },
        {
          "value": "BARBARA LEE",
          "display": "Barbara Lee"
        },
        {
          "value": "CHARLIE GONZALEZ",
          "display": "Charlie Gonzalez"
        },
        {
          "value": "NYDIA VELAZQUEZ",
          "display": "Nydia Velazquez"
        }
      ],
      "company": [
        {
          "value": "BANK OF AMERICA",
          "display": "Bank of America"
        },
        {
          "value": "TIME WARNER",
          "display": "Time Warner"
        },
        {
          "value": "DUKE ENERGY",
          "display": "Duke Energy"
        },
        {
          "value": "CARMAX",
          "display": "CarMax"
        },
        {
          "value": "GENERAL MOTORS",
          "display": "General Motors"
        },
        {
          "value": "WELLS FARGO&CO.",
          "display": "Wells Fargo&Co."
        },
        {
          "value": "COSTCO",
          "display": "Costco"
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        }
      ],
      "geo": [
        {
          "value": "NORTH CAROLINA",
          "display": "North Carolina"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "OHIO",
          "display": "Ohio"
        },
        {
          "value": "MASSACHUSETTS",
          "display": "Massachusetts"
        },
        {
          "value": "TEXAS",
          "display": "Texas"
        },
        {
          "value": "MARYLAND",
          "display": "Maryland"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "NEW YORK",
          "display": "New York"
        },
        {
          "value": "ILLINOIS",
          "display": "Illinois"
        },
        {
          "value": "COLORADO",
          "display": "Colorado"
        },
        {
          "value": "CONNECTICUT",
          "display": "Connecticut"
        },
        {
          "value": "DELAWARE",
          "display": "Delaware"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        },
        {
          "value": "PHILADELPHIA",
          "display": "Philadelphia"
        },
        {
          "value": "PENNSYLVANIA",
          "display": "Pennsylvania"
        },
        {
          "value": "ISRAEL",
          "display": "Israel"
        },
        {
          "value": "JERUSALEM",
          "display": "Jerusalem"
        },
        {
          "value": "MINNEAPOLIS",
          "display": "Minneapolis"
        },
        {
          "value": "MONTANA",
          "display": "Montana"
        }
      ],
      "wordcount": 2819,
      "exacthash": "xIreU+uoEhKAE+IW5Cl7+g==",
      "nearhash": "h1yZlRdK7kXcxFJ2eDf7MQ==",
      "partnamelocations": [
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/2012_Democratic_National_Convention",
      "sourcecsv1": [
        "Date",
        "City",
        "Venue",
        "Chair",
        "Keynote speaker",
        "Notable speakers",
        "Presidential nominee",
        "Vice presidential nominee",
        "Other candidates",
        "Total delegates",
        "Votes needed for nomination",
        "Results",
        "Ballots"
      ],
      "sourcecsv2": [
        "2012_United_States_presidential_election",
        "Charlotte,_North_Carolina",
        "Spectrum_Center_(arena)",
        "Antonio_Villaraigosa",
        "Julian_Castro",
        "Texas",
        "Jennifer_Granholm",
        "Cory_Booker",
        "Tim_Kaine",
        "Lincoln_Chafee",
        "Rahm_Emanuel",
        "Martin_O%27Malley",
        "Michelle_Obama",
        "Sandra_Fluke",
        "Elizabeth_Warren",
        "Bill_Clinton",
        "Scarlett_Johansson",
        "Caroline_Kennedy",
        "Brian_Schweitzer",
        "Patty_Murray",
        "Barbara_Mikulski",
        "Charlie_Crist",
        "Barack_Obama",
        "Illinois",
        "Joe_Biden",
        "Delaware",
        "Keith_Russell_Judd",
        "Randall_Terry",
        "John_Wolfe,_Jr.",
        "Absolute_majority",
        "Acclamation",
        "2008_Democratic_National_Convention",
        "2016_Democratic_National_Convention",
        "Timeline_of_the_2012_United_States_presidential_election",
        "2012_United_States_presidential_debates",
        "List_of_2012_United_States_presidential_electors",
        "Nationwide_opinion_polling_for_the_United_States_2012_presidential_election",
        "Statewide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Political_parties_in_the_United_States",
        "Democratic_Party_(United_States)",
        "2012_Democratic_Party_presidential_candidates",
        "2012_Democratic_Party_presidential_primaries",
        "Barack_Obama_2012_presidential_campaign",
        "Republican_Party_(United_States)",
        "Prelude_to_the_2012_Republican_Party_presidential_primaries",
        "2012_Republican_Party_presidential_candidates",
        "2012_Republican_Party_presidential_debates_and_forums",
        "2012_Republican_Party_presidential_primaries",
        "Nationwide_opinion_polling_for_the_2012_Republican_Party_presidential_primaries",
        "Statewide_opinion_polling_for_the_2012_Republican_Party_presidential_primaries",
        "2012_Straw_polls_for_the_Republican_Party_presidential_primaries",
        "Results_of_the_2012_Republican_Party_presidential_primaries",
        "Mitt_Romney_2012_presidential_campaign",
        "2012_Republican_Party_vice_presidential_candidate_selection",
        "2012_Republican_National_Convention",
        "Endorsements_in_the_2012_Republican_Party_presidential_primaries",
        "Third_party_(United_States)",
        "Libertarian_Party_(United_States)",
        "Libertarian_Party_presidential_candidates,_2012",
        "Libertarian_Party_(United_States)_presidential_primaries,_2012",
        "Gary_Johnson_2012_presidential_campaign",
        "2012_Libertarian_National_Convention",
        "Green_Party_of_the_United_States",
        "2012_Green_Party_presidential_primaries",
        "Jill_Stein_2012_presidential_campaign",
        "2012_Green_National_Convention",
        "Constitution_Party_(United_States)",
        "Virgil_Goode_2012_presidential_campaign",
        "2012_Constitution_Party_National_Convention",
        "Justice_Party_(United_States)",
        "Rocky_Anderson",
        "Americans_Elect",
        "Third-party_and_independent_candidates_for_the_2012_United_States_presidential_election",
        "2012_United_States_elections",
        "2012_United_States_House_of_Representatives_elections",
        "2012_United_States_Senate_elections",
        "2012_United_States_gubernatorial_elections",
        "Vice_President_of_the_United_States",
        "Joe_Biden#Vice_Presidency_(2009–2017)",
        "2008_United_States_presidential_election",
        "2016_United_States_presidential_election",
        "Time_Warner_Cable_Arena",
        "Delegate_(American_politics)",
        "President_of_the_United_States",
        "List_of_Democratic_National_Conventions",
        "First_Lady_of_the_United_States",
        "North_Carolina",
        "Cleveland",
        "Minneapolis",
        "St._Louis",
        "United_States_presidential_election_in_North_Carolina,_2008",
        "Kay_Hagan",
        "Bev_Perdue",
        "North_Carolina_United_States_Senate_election,_2008",
        "2008_North_Carolina_gubernatorial_election",
        "Democratic_National_Committee",
        "Request_for_proposals",
        "Bank_of_America_Stadium",
        "WCNC-TV",
        "National_Football_League",
        "National_Football_League_Kickoff_game",
        "Barbara_Lee",
        "Charlie_Gonzalez",
        "Nancy_Pelosi",
        "Tammy_Duckworth",
        "San_Antonio",
        "Pell_Grant",
        "Global_Post",
        "The_New_York_Times",
        "California%27s_9th_congressional_district",
        "Claudia_J._Kennedy",
        "Newark,_New_Jersey",
        "Mary_Kay_Henry",
        "Service_Employees_International_Union",
        "Texas%27s_20th_congressional_district",
        "Nydia_Velazquez",
        "New_York%27s_12th_congressional_district",
        "Pat_Quinn_(politician)",
        "Anthony_Foxx",
        "Annise_Parker",
        "Houston,_Texas",
        "Harry_Reid",
        "California%27s_8th_congressional_district",
        "Rosa_DeLauro",
        "Connecticut%27s_3rd_congressional_district",
        "Carolyn_Maloney",
        "New_York%27s_14th_congressional_district",
        "Allyson_Schwartz",
        "Pennsylvania%27s_13th_congressional_district",
        "Gwen_Moore",
        "Wisconsin%27s_4th_congressional_district",
        "Tulsi_Gabbard",
        "Honolulu",
        "Hawaii%27s_2nd_congressional_district",
        "Joyce_Beatty",
        "Ohio%27s_3rd_congressional_district",
        "Jimmy_Carter",
        "Ken_Salazar",
        "Joseph_P._Kennedy_III",
        "Massachusetts%27s_4th_congressional_district",
        "Robert_Wexler",
        "S._Daniel_Abraham_Center_for_Middle_East_Peace",
        "Florida%27s_19th_congressional_district",
        "R._T._Rybak",
        "Minneapolis,_Minnesota",
        "Jared_Polis",
        "Colorado%27s_2nd_congressional_district",
        "Nancy_Keenan",
        "U.S._Department_of_Veterans_Affairs",
        "Illinois%27s_8th_congressional_district",
        "Ted_Strickland",
        "Kathleen_Sebelius",
        "Kal_Penn",
        "Craig_Robinson_(basketball)",
        "Oregon_State_University",
        "Maya_Soetoro-Ng",
        "Lilly_Ledbetter",
        "Deval_Patrick",
        "Joaqu%C3%ADn_Castro",
        "San_Antonio,_Texas",
        "Winona,_Ohio",
        "Luis_Guti%C3%A9rrez",
        "Illinois%27s_4th_congressional_district",
        "Diana_DeGette",
        "Colorado%27s_1st_congressional_district",
        "John_P%C3%A9rez",
        "California_State_Assembly",
        "Thomas_Menino",
        "Boston,_Massachusetts",
        "Judy_Chu",
        "California%27s_32nd_congressional_district",
        "Steve_Westly",
        "John_B._Larson",
        "Connecticut%27s_1st_congressional_district",
        "Carroll_County,_Iowa",
        "Richard_Trumka",
        "American_Federation_of_Labor_and_Congress_of_Industrial_Organizations",
        "Steve_Israel",
        "Democratic_Congressional_Campaign_Committee",
        "New_York%27s_2nd_congressional_district",
        "Pedro_Pierluisi",
        "Puerto_Rico",
        "Tom_Steyer",
        "Charles_Schumer",
        "Karen_Bass",
        "California%27s_33rd_congressional_district",
        "Al_Green_(politician)",
        "Texas%27s_9th_congressional_district",
        "Emanuel_Cleaver",
        "Missouri%27s_5th_congressional_district",
        "Dannel_Malloy",
        "Denise_Juneau",
        "Tom_Vilsack",
        "Arne_Duncan",
        "Jim_Hunt",
        "Endometriosis",
        "Cecile_Richards",
        "Planned_Parenthood_Federation_of_America",
        "Steny_Hoyer",
        "Maryland%27s_5th_congressional_district",
        "Eric_Shinseki",
        "John_Hickenlooper",
        "Simone_Campbell",
        "Jack_Markell",
        "Karen_Mills",
        "Kamala_Harris",
        "Cristina_Saralegui",
        "Austin_Ligon",
        "CarMax_Inc.",
        "General_Motors",
        "Bob_King_(labor_leader)",
        "United_Auto_Workers",
        "Bain_Capital",
        "Chris_Van_Hollen",
        "Maryland%27s_8th_congressional_district",
        "Rush_Limbaugh%E2%80%93Sandra_Fluke_controversy",
        "Jim_Sinegal",
        "Costco",
        "Massachusetts",
        "Los_Angeles,_California",
        "GST_Steel",
        "United_Steelworkers_of_America",
        "Jerusalem",
        "Israel",
        "Barack_H._Obama",
        "Walter_Dalton",
        "G._K._Butterfield",
        "North_Carolina%27s_1st_congressional_district",
        "David_Price_(U.S._politician)",
        "North_Carolina%27s_4th_congressional_district",
        "Mel_Watt",
        "North_Carolina%27s_12th_congressional_district",
        "Duke_Energy",
        "Donna_Edwards",
        "Maryland%27s_4th_congressional_district",
        "Barney_Frank",
        "Harvey_Gantt",
        "John_Lewis",
        "Georgia%27s_5th_congressional_district",
        "College_Democrats_of_America",
        "Debbie_Wasserman_Schultz",
        "Florida%27s_20th_congressional_district",
        "Tammy_Baldwin",
        "Wisconsin%27s_2nd_congressional_district",
        "Michael_Nutter",
        "Philadelphia,_Pennsylvania",
        "Zach_Wahls",
        "LGBT",
        "Jim_Messina_(political_staffer)",
        "Barack_Obama_presidential_campaign,_2012",
        "Beau_Biden",
        "James_Clyburn",
        "South_Carolina%27s_6th_congressional_district",
        "Kerry_Washington",
        "John_F._Kennedy",
        "Xavier_Becerra",
        "California%27s_31st_congressional_district",
        "Eva_Longoria",
        "John_Kerry",
        "John_Nathman",
        "Jill_Biden",
        "Gabrielle_Giffords",
        "Arizona%27s_8th_congressional_district",
        "James_Taylor",
        "Mary_J._Blige",
        "Foo_Fighters",
        "Jessica_Sanchez",
        "Veteran",
        "Russian_Navy",
        "Northrop_F-5",
        "NASCAR_Hall_of_Fame",
        "Chelsea_Manning",
        "Occupy_Movement",
        "Military-industrial_complex",
        "Federal_government",
        "Occupy_Charlotte",
        "National_Special_Security_Event",
        "United_States_Secret_Service",
        "United_States_Department_of_Homeland_Security",
        "Charlotte_Police_Department",
        "North_Carolina_Amendment_1",
        "Same-sex_marriage",
        "Pro-life",
        "Oklahoma_Democratic_primary,_2012",
        "Oklahoma_Democratic_Party",
        "Bank_of_America",
        "Interlocking_directorate",
        "Wells_Fargo",
        "Democratic_National_Convention",
        "United_States_presidential_nominating_convention",
        "History_of_the_United_States_Democratic_Party",
        "U.S._presidential_nomination_convention",
        "Politico_(newspaper)",
        "USA_Today",
        "Wayback_Machine",
        "CNN",
        "The_Washington_Post",
        "The_New_Republic",
        "Chattanooga_Times_Free_Press",
        "WRCB",
        "The_Huffington_Post",
        "SFGate",
        "Associated_Press",
        "Denver",
        "Philadelphia",
        "Fundraising_for_the_2012_United_States_presidential_election",
        "Nationwide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Pre-2012_statewide_opinion_polling_for_the_2012_United_States_presidential_election",
        "Newspaper_endorsements_in_the_2012_United_States_presidential_election",
        "International_reactions_to_the_2012_United_States_presidential_election",
        "Political_impact_of_Hurricane_Sandy",
        "List_of_Barack_Obama_2012_presidential_campaign_endorsements",
        "Political_positions_of_Barack_Obama",
        "Political_positions_of_Joe_Biden",
        "Bob_Ely",
        "Keith_Judd",
        "Warren_Mosler",
        "Darcy_Richardson",
        "Vermin_Supreme",
        "John_Wolfe_Jr.",
        "Straw_polls_for_the_2012_Republican_Party_presidential_primaries",
        "Mitt_Romney",
        "List_of_Mitt_Romney_2012_presidential_campaign_endorsements",
        "Political_positions_of_Mitt_Romney",
        "Paul_Ryan",
        "Political_positions_of_Paul_Ryan",
        "Michele_Bachmann",
        "Michele_Bachmann_2012_presidential_campaign",
        "Herman_Cain",
        "Herman_Cain_2012_presidential_campaign",
        "Political_positions_of_Herman_Cain",
        "Mark_Callahan",
        "Jack_Fellure",
        "Newt_Gingrich",
        "Newt_Gingrich_2012_presidential_campaign",
        "Political_positions_of_Newt_Gingrich",
        "Stewart_Greenleaf",
        "Jon_Huntsman_Jr.",
        "Jon_Huntsman_2012_presidential_campaign",
        "Gary_Johnson",
        "Fred_Karger",
        "Andy_Martin",
        "Thaddeus_McCotter",
        "Thaddeus_McCotter_2012_presidential_campaign",
        "Jimmy_McMillan",
        "Roy_Moore",
        "Ron_Paul",
        "Ron_Paul_2012_presidential_campaign",
        "Political_positions_of_Ron_Paul",
        "Tim_Pawlenty",
        "Tim_Pawlenty_2012_presidential_campaign",
        "Rick_Perry",
        "Rick_Perry_2012_presidential_campaign",
        "Political_positions_of_Rick_Perry",
        "Buddy_Roemer",
        "Buddy_Roemer_2012_presidential_campaign",
        "Rick_Santorum",
        "Rick_Santorum_2012_presidential_campaign",
        "Jim_Gray_(jurist)",
        "R._J._Harris",
        "Carl_Person",
        "Sam_Sloan",
        "R._Lee_Wrights",
        "Jill_Stein",
        "Cheri_Honkala",
        "Stewart_Alexander",
        "Roseanne_Barr",
        "American_Independent_Party",
        "Tom_Hoefling",
        "Wiley_Drake",
        "Virgil_Goode",
        "Edward_C._Noonan",
        "Laurie_Roth",
        "American_Freedom_Party",
        "Merlin_Miller",
        "Virginia_Abernethy",
        "Jim_Clymer",
        "Darrell_Castle",
        "Robby_Wells",
        "Freedom_Socialist_Party",
        "Grassroots-Legalize_Cannabis_Party",
        "Jim_Carlson_(businessman)",
        "Luis_J._Rodriguez",
        "Party_for_Socialism_and_Liberation",
        "Peta_Lindsay",
        "Peace_and_Freedom_Party",
        "Cindy_Sheehan",
        "Prohibition_Party",
        "James_Hedges",
        "Reform_Party_of_the_United_States_of_America",
        "Andre_Barnett",
        "Laurence_Kotlikoff",
        "Socialist_Equality_Party_(United_States)",
        "Jerry_White_(socialist)",
        "Socialist_Workers_Party_(United_States)",
        "James_Harris_(Socialist_Workers_Party_politician)",
        "Socialist_Party_USA",
        "Stewart_Alexander_2012_presidential_campaign",
        "Alejandro_Mendoza",
        "Tom_Stevens_(politician)",
        "Lee_Abramson",
        "Randy_Blythe",
        "Jeff_Boss",
        "Naked_Cowboy",
        "Terry_Jones_(pastor)",
        "Joe_Schriner",
        "Michael_Bloomberg",
        "Draft_Bloomberg_movement",
        "List_of_United_States_Democratic_Party_presidential_tickets",
        "1828_United_States_presidential_election",
        "Andrew_Jackson",
        "John_C._Calhoun",
        "1832_Democratic_National_Convention",
        "Martin_Van_Buren",
        "1835_Democratic_National_Convention",
        "Richard_Mentor_Johnson",
        "1840_Democratic_National_Convention",
        "1844_Democratic_National_Convention",
        "James_K._Polk",
        "George_M._Dallas",
        "1848_Democratic_National_Convention",
        "Lewis_Cass",
        "William_Orlando_Butler",
        "1852_Democratic_National_Convention",
        "Franklin_Pierce",
        "William_R._King",
        "1856_Democratic_National_Convention",
        "James_Buchanan",
        "John_C._Breckinridge",
        "1860_Democratic_National_Conventions",
        "Stephen_A._Douglas",
        "Herschel_Vespasian_Johnson",
        "Joseph_Lane",
        "Southern_Democrats",
        "1864_Democratic_National_Convention",
        "George_B._McClellan",
        "George_H._Pendleton",
        "1868_Democratic_National_Convention",
        "Horatio_Seymour",
        "Francis_Preston_Blair_Jr.",
        "1872_Democratic_National_Convention",
        "Horace_Greeley",
        "Benjamin_Gratz_Brown",
        "1876_Democratic_National_Convention",
        "Samuel_J._Tilden",
        "Thomas_A._Hendricks",
        "1880_Democratic_National_Convention",
        "Winfield_Scott_Hancock",
        "William_Hayden_English",
        "1884_Democratic_National_Convention",
        "Grover_Cleveland",
        "1888_Democratic_National_Convention",
        "Allen_G._Thurman",
        "1892_Democratic_National_Convention",
        "Adlai_Stevenson_I",
        "1896_Democratic_National_Convention",
        "William_Jennings_Bryan",
        "Arthur_Sewall",
        "1900_Democratic_National_Convention",
        "1904_Democratic_National_Convention",
        "Alton_B._Parker",
        "Henry_Gassaway_Davis",
        "1908_Democratic_National_Convention",
        "John_W._Kern",
        "1912_Democratic_National_Convention",
        "Woodrow_Wilson",
        "Thomas_R._Marshall",
        "1916_Democratic_National_Convention",
        "1920_Democratic_National_Convention",
        "James_M._Cox",
        "Franklin_D._Roosevelt",
        "1924_Democratic_National_Convention",
        "John_W._Davis",
        "Charles_W._Bryan",
        "1928_Democratic_National_Convention",
        "Al_Smith",
        "Joseph_Taylor_Robinson",
        "1932_Democratic_National_Convention",
        "John_Nance_Garner",
        "1936_Democratic_National_Convention",
        "1940_Democratic_National_Convention",
        "Henry_A._Wallace",
        "1944_Democratic_National_Convention",
        "Harry_S._Truman",
        "1948_Democratic_National_Convention",
        "Alben_W._Barkley",
        "1952_Democratic_National_Convention",
        "Adlai_Stevenson_II",
        "John_Sparkman",
        "1956_Democratic_National_Convention",
        "Estes_Kefauver",
        "1960_Democratic_National_Convention",
        "Lyndon_B._Johnson",
        "1964_Democratic_National_Convention",
        "Hubert_Humphrey",
        "1968_Democratic_National_Convention",
        "Edmund_Muskie",
        "1972_Democratic_National_Convention",
        "George_McGovern",
        "Thomas_Eagleton",
        "Sargent_Shriver",
        "1976_Democratic_National_Convention",
        "Walter_Mondale",
        "1980_Democratic_National_Convention",
        "1984_Democratic_National_Convention",
        "Geraldine_Ferraro",
        "1988_Democratic_National_Convention",
        "Michael_Dukakis",
        "Lloyd_Bentsen",
        "1992_Democratic_National_Convention",
        "Al_Gore",
        "1996_Democratic_National_Convention",
        "2000_Democratic_National_Convention",
        "Joe_Lieberman",
        "2004_Democratic_National_Convention",
        "John_Edwards",
        "Hillary_Clinton",
        "2020_Democratic_National_Convention",
        "Party_leaders_of_the_United_States_House_of_Representatives",
        "Andrew_Stevenson",
        "John_Bell_(Tennessee_politician)",
        "John_Winston_Jones",
        "John_Wesley_Davis",
        "Howell_Cobb",
        "Linn_Boyd",
        "George_Washington_Jones_(Tennessee_politician)",
        "James_Lawrence_Orr",
        "George_S._Houston",
        "William_E._Niblack",
        "Samuel_J._Randall",
        "Michael_C._Kerr",
        "John_G._Carlisle",
        "William_S._Holman",
        "Charles_Frederick_Crisp",
        "David_B._Culberson",
        "James_D._Richardson",
        "John_Sharp_Williams",
        "Champ_Clark",
        "Claude_Kitchin",
        "Finis_J._Garrett",
        "Henry_Thomas_Rainey",
        "Jo_Byrns",
        "William_B._Bankhead",
        "Sam_Rayburn",
        "John_W._McCormack",
        "Carl_Albert",
        "Tip_O%27Neill",
        "Jim_Wright",
        "Tom_Foley",
        "Dick_Gephardt",
        "Party_leaders_of_the_United_States_Senate",
        "John_W._Stevenson",
        "William_A._Wallace",
        "James_B._Beck",
        "Arthur_Pue_Gorman",
        "David_Turpie",
        "James_Kimbrough_Jones",
        "Joseph_Clay_Stiles_Blackburn",
        "Charles_Allen_Culberson",
        "Hernando_Money",
        "Thomas_S._Martin",
        "Gilbert_Hitchcock",
        "Oscar_Underwood",
        "Scott_W._Lucas",
        "Ernest_McFarland",
        "Mike_Mansfield",
        "Robert_Byrd",
        "George_J._Mitchell",
        "Tom_Daschle",
        "Chuck_Schumer",
        "Benjamin_F._Hallett",
        "Robert_Milligan_McLane",
        "David_Allen_Smalley",
        "August_Belmont",
        "Augustus_Schell",
        "Abram_Hewitt",
        "William_Henry_Barnum",
        "Calvin_S._Brice",
        "William_F._Harrity",
        "Thomas_Taggart",
        "Norman_E._Mack",
        "William_F._McCombs",
        "Vance_C._McCormick",
        "Homer_Stille_Cummings",
        "George_White_(Ohio_politician)",
        "Cordell_Hull",
        "Clem_L._Shaver",
        "John_J._Raskob",
        "James_Farley",
        "Edward_J._Flynn",
        "Frank_Comerford_Walker",
        "Robert_E._Hannegan",
        "J._Howard_McGrath",
        "William_M._Boyle",
        "Frank_E._McKinney",
        "Stephen_A._Mitchell_(politician)",
        "Paul_Butler_(lawyer)",
        "Henry_M._Jackson",
        "John_Moran_Bailey",
        "Larry_O%27Brien",
        "Fred_R._Harris",
        "Jean_Westwood_(politician)",
        "Robert_S._Strauss",
        "Kenneth_M._Curtis",
        "John_Coyle_White",
        "Charles_Manatt",
        "Paul_G._Kirk",
        "Ron_Brown",
        "David_Wilhelm",
        "Debra_DeLee",
        "Chris_Dodd",
        "Donald_Fowler",
        "Roy_Romer",
        "Steven_Grossman_(politician)",
        "Ed_Rendell",
        "Joe_Andrew",
        "Terry_McAuliffe",
        "Howard_Dean",
        "Tom_Perez",
        "List_of_state_parties_of_the_Democratic_Party_(United_States)",
        "Alabama_Democratic_Party",
        "Alaska_Democratic_Party",
        "Arizona_Democratic_Party",
        "Democratic_Party_of_Arkansas",
        "California_Democratic_Party",
        "Colorado_Democratic_Party",
        "Democratic_Party_of_Connecticut",
        "Delaware_Democratic_Party",
        "Florida_Democratic_Party",
        "Democratic_Party_of_Georgia",
        "Democratic_Party_of_Hawaii",
        "Idaho_Democratic_Party",
        "Democratic_Party_of_Illinois",
        "Indiana_Democratic_Party",
        "Iowa_Democratic_Party",
        "Kansas_Democratic_Party",
        "Kentucky_Democratic_Party",
        "Louisiana_Democratic_Party",
        "Maine_Democratic_Party",
        "Maryland_Democratic_Party",
        "Massachusetts_Democratic_Party",
        "Michigan_Democratic_Party",
        "Minnesota_Democratic%E2%80%93Farmer%E2%80%93Labor_Party",
        "Mississippi_Democratic_Party",
        "Missouri_Democratic_Party",
        "Montana_Democratic_Party",
        "Nebraska_Democratic_Party",
        "Nevada_Democratic_Party",
        "New_Hampshire_Democratic_Party",
        "New_Jersey_Democratic_State_Committee",
        "Democratic_Party_of_New_Mexico",
        "New_York_State_Democratic_Committee",
        "North_Carolina_Democratic_Party",
        "North_Dakota_Democratic%E2%80%93Nonpartisan_League_Party",
        "Ohio_Democratic_Party",
        "Democratic_Party_of_Oregon",
        "Pennsylvania_Democratic_Party",
        "Rhode_Island_Democratic_Party",
        "South_Carolina_Democratic_Party",
        "South_Dakota_Democratic_Party",
        "Tennessee_Democratic_Party",
        "Texas_Democratic_Party",
        "Utah_Democratic_Party",
        "Vermont_Democratic_Party",
        "Democratic_Party_of_Virginia",
        "Washington_State_Democratic_Party",
        "West_Virginia_Democratic_Party",
        "Democratic_Party_of_Wisconsin",
        "Wyoming_Democratic_Party",
        "District_of_Columbia_Democratic_State_Committee",
        "Democratic_Party_of_Guam",
        "Democratic_Party_(Northern_Mariana_Islands)",
        "Democratic_Party_(Puerto_Rico)",
        "Democratic_Party_of_the_Virgin_Islands",
        "Democrats_Abroad",
        "Democratic_Party_(United_States)_organizations",
        "Senate_Democratic_Caucus",
        "United_States_Senate_Democratic_Policy_Committee",
        "United_States_Senate_Democratic_Steering_and_Outreach_Committee",
        "United_States_Senate_Democratic_Conference_Secretary",
        "House_Democratic_Caucus",
        "Democratic_Governors_Association",
        "Democratic_Legislative_Campaign_Committee",
        "Democratic_Senatorial_Campaign_Committee",
        "National_Conference_of_Democratic_Mayors",
        "National_Federation_of_Democratic_Women",
        "Stonewall_Democrats",
        "Stonewall_Young_Democrats",
        "Young_Democrats_of_America",
        "High_School_Democrats_of_America",
        "List_of_Democratic_Party_presidential_primaries",
        "Democratic_Party_presidential_debates",
        "Factions_in_the_Democratic_Party_(United_States)",
        "Superdelegate",
        "2005_Democratic_National_Committee_chairmanship_election",
        "2017_Democratic_National_Committee_chairmanship_election",
        "2006_United_States_House_of_Representatives_Democratic_Caucus_leadership_election",
        "2018_United_States_House_of_Representatives_Democratic_Caucus_leadership_election",
        "Weekly_Democratic_Address",
        "List_of_Presidents_of_the_United_States",
        "United_States_Senate",
        "List_of_United_States_Senators_from_Illinois",
        "Illinois_Senate",
        "Early_life_and_career_of_Barack_Obama",
        "Illinois_Senate_career_of_Barack_Obama",
        "United_States_Senate_career_of_Barack_Obama",
        "Foreign_policy_of_the_Barack_Obama_administration",
        "Economic_policy_of_the_Barack_Obama_administration",
        "Energy_policy_of_the_Barack_Obama_administration",
        "Loggerhead_sea_turtle_policies_of_the_Barack_Obama_Administration_(2009-2017)",
        "Barack_Obama_on_mass_surveillance",
        "Social_policy_of_the_Barack_Obama_administration",
        "Space_policy_of_the_Barack_Obama_administration",
        "2009_Nobel_Peace_Prize",
        "West_Wing_Week",
        "Presidency_of_Barack_Obama",
        "Presidential_transition_of_Barack_Obama",
        "First_inauguration_of_Barack_Obama",
        "Second_inauguration_of_Barack_Obama",
        "First_100_days_of_Barack_Obama%27s_presidency",
        "Timeline_of_the_Barack_Obama_presidency_(2009)",
        "Timeline_of_the_Barack_Obama_presidency_(2010)",
        "Timeline_of_the_Barack_Obama_presidency_(2011)",
        "Timeline_of_the_Barack_Obama_presidency_(2012)",
        "Timeline_of_the_Barack_Obama_presidency_(2013)",
        "Timeline_of_the_Barack_Obama_presidency_(2014)",
        "Timeline_of_the_Barack_Obama_presidency_(2015)",
        "Timeline_of_the_Barack_Obama_presidency_(2016)",
        "Timeline_of_the_Barack_Obama_presidency_(2017)",
        "War_in_Afghanistan_(2001%E2%80%93present)",
        "Withdrawal_of_U.S._troops_from_Iraq_(2007%E2%80%932011)",
        "Death_of_Osama_bin_Laden",
        "2012_Benghazi_attack",
        "Joint_Comprehensive_Plan_of_Action",
        "Cuban_thaw",
        "Obama_Doctrine",
        "Patient_Protection_and_Affordable_Care_Act",
        "Healthy,_Hunger-Free_Kids_Act_of_2010",
        "New_START",
        "List_of_people_granted_executive_clemency_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama",
        "List_of_international_presidential_trips_made_by_Barack_Obama",
        "List_of_presidential_trips_made_by_Barack_Obama_(2009)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2010)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2011)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2012)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2013)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2014)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2015)",
        "List_of_presidential_trips_made_by_Barack_Obama_(2016)",
        "List_of_federal_judges_appointed_by_Barack_Obama",
        "Barack_Obama_Supreme_Court_candidates",
        "Barack_Obama_judicial_appointment_controversies",
        "Barack_Obama_Presidential_Center",
        "Dreams_from_My_Father",
        "The_Audacity_of_Hope",
        "Of_Thee_I_Sing_(book)",
        "Speeches_of_Barack_Obama",
        "2004_Democratic_National_Convention_keynote_address",
        "A_More_Perfect_Union_(speech)",
        "Barack_Obama_2008_presidential_election_victory_speech",
        "First_inauguration_of_Barack_Obama#Ceremony:_&quot",
        "A_New_Birth_of_Freedom&quot",
        "February_2009_Barack_Obama_speech_to_joint_session_of_Congress",
        "A_New_Beginning",
        "Barack_Obama_speech_to_joint_session_of_Congress,_September_2009",
        "State_of_the_Union",
        "2010_State_of_the_Union_Address",
        "2011_State_of_the_Union_Address",
        "2012_State_of_the_Union_Address",
        "2013_State_of_the_Union_Address",
        "2014_State_of_the_Union_Address",
        "2015_State_of_the_Union_Address",
        "2016_State_of_the_Union_Address",
        "Barack_Obama_Tucson_memorial_speech",
        "American_Jobs_Act",
        "You_didn%27t_build_that",
        "Barack_Obama_Selma_50th_anniversary_speech",
        "Barack_Obama%27s_farewell_address",
        "Electoral_history_of_Barack_Obama",
        "Illinois_Senate_elections_of_Barack_Obama",
        "2000_Illinois%27s_1st_congressional_district_election",
        "2004_United_States_Senate_election_in_Illinois",
        "2008_Democratic_Party_presidential_primaries",
        "Barack_Obama_2008_presidential_primary_campaign",
        "Barack_Obama_2008_presidential_campaign",
        "List_of_Barack_Obama_2008_presidential_campaign_endorsements",
        "Republican_and_conservative_support_for_Barack_Obama_in_2008",
        "Family_of_Barack_Obama",
        "Ann_Dunham",
        "Barack_Obama_Sr.",
        "Lolo_Soetoro",
        "Stanley_Armour_Dunham",
        "Madelyn_Dunham",
        "Auma_Obama",
        "Malik_Obama",
        "Marian_Shields_Robinson",
        "Bo_(dog)",
        "Sunny_(dog)",
        "Public_image_of_Barack_Obama",
        "Oprah_Winfrey%27s_endorsement_of_Barack_Obama",
        "Barack_Obama_citizenship_conspiracy_theories",
        "Barack_Obama_presidential_eligibility_litigation",
        "Barack_Obama_religion_conspiracy_theories",
        "Bill_Ayers_2008_presidential_election_controversy",
        "Jeremiah_Wright_controversy",
        "Assassination_threats_against_Barack_Obama",
        "Barack_Obama_assassination_plot_in_Denver",
        "Barack_Obama_assassination_plot_in_Tennessee",
        "Invitations_to_the_first_inauguration_of_Barack_Obama",
        "We_Are_One:_The_Obama_Inaugural_Celebration_at_the_Lincoln_Memorial",
        "Citizen%27s_Briefing_Book",
        "Tea_Party_protests",
        "New_Energy_for_America",
        "Lilly_Ledbetter_Fair_Pay_Act_of_2009",
        "American_Recovery_and_Reinvestment_Act_of_2009",
        "Henry_Louis_Gates_arrest_controversy",
        "Firing_of_Shirley_Sherrod",
        "Efforts_to_impeach_Barack_Obama",
        "Bibliography_of_Barack_Obama",
        "Obama:_From_Promise_to_Power",
        "Barack_Obama:_Der_schwarze_Kennedy",
        "Redemption_Song_(book)",
        "The_Case_Against_Barack_Obama",
        "The_Obama_Nation",
        "Culture_of_Corruption",
        "Catastrophe_(book)",
        "Barack_and_Michelle",
        "The_Speech_(book)",
        "The_Obama_Story",
        "Game_Change",
        "Double_Down:_Game_Change_2012",
        "Rising_Star_(book)",
        "Amber_Lee_Ettinger",
        "Crush_on_Obama",
        "Magical_Negro",
        "Will.i.am",
        "Yes_We_Can_(will.i.am_song)",
        "We_Are_the_Ones",
        "There%27s_No_One_as_Irish_as_Barack_O%27Bama",
        "S%C3%AD_Se_Puede_Cambiar",
        "My_President",
        "Deadheads_for_Obama",
        "Air_and_Simple_Gifts",
        "Change_Is_Now:_Renewing_America%27s_Promise",
        "Hope!_%E2%80%93_Das_Obama_Musical",
        "Barack_Obama_vs._Mitt_Romney",
        "Baracksdubs",
        "Signed,_Sealed,_Delivered_I%27m_Yours",
        "By_the_People:_The_Election_of_Barack_Obama",
        "Change_(film)",
        "Obama_Anak_Menteng",
        "2016:_Obama%27s_America",
        "The_Road_We%27ve_Traveled",
        "Southside_with_You",
        "Barry_(2016_film)",
        "America%27s_Great_Divide",
        "Barack_Obama_on_social_media",
        "Artists_for_Obama",
        "Barack_Obama_%22Hope%22_poster",
        "Barack_Obama_%22Joker%22_poster",
        "Hair_Like_Mine",
        "Situation_Room_(photograph)",
        "President_Barack_Obama_(painting)",
        "Obama_logo",
        "Barack_Obama_in_comics",
        "Barack_Obama_Day",
        "Obama_Day",
        "List_of_honors_and_awards_received_by_Barack_Obama",
        "List_of_things_named_after_Barack_Obama",
        "One_Last_Time_(Hamilton_song)",
        "George_W._Bush",
        "Donald_Trump",
        "Book:Barack_Obama",
        "List_of_vice_presidents_of_the_United_States",
        "List_of_United_States_senators_from_Delaware",
        "United_States_Senate_career_of_Joe_Biden",
        "Vice_presidency_of_Joe_Biden",
        "Classified_Information_Procedures_Act",
        "Omnibus_Counterterrorism_Act_of_1995",
        "Violence_Against_Women_Act",
        "Violent_Crime_Control_and_Law_Enforcement_Act",
        "Biden-Sanders_Unity_Task_Forces",
        "Electoral_history_of_Joe_Biden",
        "1972_United_States_Senate_election_in_Delaware",
        "1978_United_States_Senate_election_in_Delaware",
        "1984_United_States_Senate_election_in_Delaware",
        "1990_United_States_Senate_election_in_Delaware",
        "1996_United_States_Senate_election_in_Delaware",
        "2002_United_States_Senate_election_in_Delaware",
        "2008_United_States_Senate_election_in_Delaware",
        "2008_Democratic_Party_vice_presidential_candidate_selection",
        "2008_United_States_presidential_debates#October_2:_Vice_presidential_debate_(Washington_University_in_St._Louis)",
        "2012_United_States_presidential_debates#October_11:_Vice_presidential_debate_(Centre_College)",
        "Joe_Biden_1988_presidential_campaign",
        "1988_Democratic_Party_presidential_primaries",
        "Joe_Biden_2008_presidential_campaign",
        "2008_Democratic_Party_presidential_debates_and_forums",
        "Joe_Biden_2020_presidential_campaign",
        "List_of_Joe_Biden_2020_presidential_campaign_endorsements",
        "2020_Democratic_Party_presidential_primaries",
        "List_of_Joe_Biden_2020_presidential_campaign_primary_endorsements",
        "2020_Democratic_Party_presidential_debates",
        "2020_Democratic_Party_vice_presidential_candidate_selection",
        "2020_United_States_presidential_debates",
        "2020_United_States_presidential_election",
        "Biden_family",
        "Neilia_Hunter",
        "Hunter_Biden",
        "Edward_Francis_Blewitt",
        "Promises_to_Keep_(Biden_book)",
        "Promise_Me,_Dad",
        "Tomorrow_Will_Be_Different",
        "List_of_honors_received_by_Joe_Biden",
        "List_of_things_named_after_Joe_Biden",
        "Joe_Biden_(The_Onion)",
        "Cancer_Breakthroughs_2020",
        "Crumb_and_Get_It_bakery_incident",
        "Joe_Biden_sexual_assault_allegation",
        "Book:Joe_Biden"
      ],
      "sourcestr1": "2012_Democratic_National_Convention",
      "sourcestr2": "Q2104713",
      "sourcestr3": "Q1185865",
      "sourcestr4": "Democratic National Convention",
      "sourcevarchar3": "[{\"Convention\":\"\",\"Date\":\"September 3\\u20136, 2012\",\"City\":\"Charlotte, North Carolina\",\"Venue\":\"Time Warner Cable Arena\",\"Chair\":\"Antonio Villaraigosa\",\"Keynote speaker\":[\"Julian Castro\",\"of\",\"Texas\"],\"Notable speakers\":[\"Jennifer Granholm\",\"Cory Booker\",\"Tim Kaine\",\"Lincoln Chafee\",\"Rahm Emanuel\",\"Martin O'Malley\",\"Michelle Obama\",\"Sandra Fluke\",\"Elizabeth Warren\",\"Bill Clinton\",\"Scarlett Johansson\",\"Caroline Kennedy\",\"Brian Schweitzer\",\"Patty Murray\",\"Barbara Mikulski\",\"Charlie Crist\"],\"Candidates\":\"\",\"Presidential nominee\":[\"Barack Obama\",\"of\",\"Illinois\"],\"Vice presidential nominee\":[\"Joe Biden\",\"of\",\"Delaware\"],\"Other candidates\":[\"Keith Russell Judd\",\",\",\"Randall Terry\",\"and\",\"John Wolfe, Jr.\",\"(disqualified)\"],\"Voting\":\"\",\"Total delegates\":\"5,554\",\"Votes needed for nomination\":[\"2,778 (\",\"absolute majority\"],\"Results\":\"Biden\",\"Ballots\":\"1\"}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/f/fd/DP2012.png",
      "sourcedouble1": 0.019561,
      "entity1": [
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "4",
          "display": "4"
        },
        {
          "value": "2010",
          "display": "2010"
        },
        {
          "value": "5556",
          "display": "5556"
        },
        {
          "value": "0",
          "display": "0"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "2778",
          "display": "2778"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "100.00",
          "display": "100.00"
        },
        {
          "value": "6",
          "display": "6"
        },
        {
          "value": "20",
          "display": "20"
        },
        {
          "value": "10000000",
          "display": "10000000"
        },
        {
          "value": "25000000",
          "display": "25000000"
        },
        {
          "value": "27000000",
          "display": "27000000"
        },
        {
          "value": "33000000",
          "display": "33000000"
        },
        {
          "value": "50000000",
          "display": "50000000"
        },
        {
          "value": "150000000",
          "display": "150000000"
        }
      ],
      "date": [
        {
          "value": "2011-04-04",
          "display": "2011-04-04"
        },
        {
          "value": "2012-05-08",
          "display": "2012-05-08"
        },
        {
          "value": "2009-10-28",
          "display": "2009-10-28"
        },
        {
          "value": "2010-01-11",
          "display": "2010-01-11"
        },
        {
          "value": "2010-05-21",
          "display": "2010-05-21"
        },
        {
          "value": "2010-06-30",
          "display": "2010-06-30"
        },
        {
          "value": "2011-02-01",
          "display": "2011-02-01"
        },
        {
          "value": "2012-04-03",
          "display": "2012-04-03"
        }
      ],
      "entity4": [
        {
          "value": "USD 10000000",
          "display": "USD 10000000"
        },
        {
          "value": "USD 25000000",
          "display": "USD 25000000"
        },
        {
          "value": "USD 27000000",
          "display": "USD 27000000"
        },
        {
          "value": "USD 33000000",
          "display": "USD 33000000"
        },
        {
          "value": "USD 50000000",
          "display": "USD 50000000"
        },
        {
          "value": "USD 150000000",
          "display": "USD 150000000"
        },
        {
          "value": "USD 303596",
          "display": "USD 303596"
        },
        {
          "value": "USD 61000",
          "display": "USD 61000"
        },
        {
          "value": "USD 704795",
          "display": "USD 704795"
        },
        {
          "value": "USD 937852",
          "display": "USD 937852"
        }
      ],
      "entity12": [
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        }
      ],
      "entity13": [
        {
          "value": "VICE-PRESIDENT",
          "display": "Vice-President"
        },
        {
          "value": "DIRECTOR",
          "display": "Director"
        },
        {
          "value": "CHIEF EXECUTIVE OFFICER",
          "display": "Chief Executive Officer"
        },
        {
          "value": "CO-FOUNDER",
          "display": "Co-founder"
        },
        {
          "value": "FOUNDER",
          "display": "Founder"
        }
      ],
      "entity14": [
        {
          "value": "CAPITAL",
          "display": "Capital"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "CONTRACT",
          "display": "Contract"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        }
      ],
      "event_date": [
        {
          "value": "(ELECTION)#(2012-04-03)",
          "display": "(Election)#(2012-04-03)"
        }
      ],
      "person_cooc": [
        {
          "value": "(VICE-PRESIDENT)#(JOE BIDEN)",
          "display": "(Vice-President)#(Joe Biden)"
        },
        {
          "value": "(VICE-PRESIDENT)#(BARACK OBAMA)",
          "display": "(Vice-President)#(Barack Obama)"
        },
        {
          "value": "(CHIEF EXECUTIVE OFFICER)#(CAROL BERMAN)",
          "display": "(Chief Executive Officer)#(Carol Berman)"
        },
        {
          "value": "(CHIEF EXECUTIVE OFFICER)#(DONNA EDWARDS)",
          "display": "(Chief Executive Officer)#(Donna Edwards)"
        },
        {
          "value": "(CHIEF EXECUTIVE OFFICER)#(ELIZABETH WARREN)",
          "display": "(Chief Executive Officer)#(Elizabeth Warren)"
        },
        {
          "value": "(CHIEF EXECUTIVE OFFICER)#(JAMES ROGERS)",
          "display": "(Chief Executive Officer)#(James Rogers)"
        },
        {
          "value": "(CHIEF EXECUTIVE OFFICER)#(KAREN EUSANIO)",
          "display": "(Chief Executive Officer)#(Karen Eusanio)"
        },
        {
          "value": "(CO-FOUNDER)#(AUSTIN LIGON)",
          "display": "(Co-founder)#(Austin Ligon)"
        },
        {
          "value": "(CO-FOUNDER)#(JIM SINEGAL)",
          "display": "(Co-founder)#(Jim Sinegal)"
        },
        {
          "value": "(DIRECTOR)#(JACK MARKELL)",
          "display": "(Director)#(Jack Markell)"
        },
        {
          "value": "(DIRECTOR)#(SIMONE CAMPBELL)",
          "display": "(Director)#(Simone Campbell)"
        },
        {
          "value": "(FOUNDER)#(TOM STEYER)",
          "display": "(Founder)#(Tom Steyer)"
        },
        {
          "value": "(VICE-PRESIDENT)#(BIDEN)",
          "display": "(Vice-President)#(Biden)"
        },
        {
          "value": "(VICE-PRESIDENT)#(JAMES CLYBURN)",
          "display": "(Vice-President)#(James Clyburn)"
        },
        {
          "value": "(VICE-PRESIDENT)#(MICHELLE OBAMA)",
          "display": "(Vice-President)#(Michelle Obama)"
        },
        {
          "value": "(DIRECTOR)#(CRAIG ROBINSON)",
          "display": "(Director)#(Craig Robinson)"
        },
        {
          "value": "(DIRECTOR)#(NATE DAVIS)",
          "display": "(Director)#(Nate Davis)"
        },
        {
          "value": "(DIRECTOR)#(TAMMY DUCKWORTH)",
          "display": "(Director)#(Tammy Duckworth)"
        }
      ],
      "company_person": [
        {
          "value": "(CARMAX)#(AUSTIN LIGON)",
          "display": "(CarMax)#(Austin Ligon)"
        },
        {
          "value": "(COSTCO)#(JIM SINEGAL)",
          "display": "(Costco)#(Jim Sinegal)"
        },
        {
          "value": "(DUKE ENERGY)#(JAMES ROGERS)",
          "display": "(Duke Energy)#(James Rogers)"
        },
        {
          "value": "(GENERAL MOTORS)#(KAREN EUSANIO)",
          "display": "(General Motors)#(Karen Eusanio)"
        },
        {
          "value": "(BANK OF AMERICA)#(BARACK OBAMA)",
          "display": "(Bank of America)#(Barack Obama)"
        },
        {
          "value": "(NEW YORK TIMES)#(JIM RUTENBERG)",
          "display": "(New York Times)#(Jim Rutenberg)"
        },
        {
          "value": "(TIME WARNER)#(BARACK OBAMA)",
          "display": "(Time Warner)#(Barack Obama)"
        },
        {
          "value": "(TIME WARNER)#(JOE BIDEN)",
          "display": "(Time Warner)#(Joe Biden)"
        }
      ],
      "person_job_company": [
        {
          "value": "(AUSTIN LIGON)#(CHIEF EXECUTIVE OFFICER)#(CARMAX)",
          "display": "(Austin Ligon)#(Chief Executive Officer)#(CarMax)"
        },
        {
          "value": "(AUSTIN LIGON)#(CO-FOUNDER)#(CARMAX)",
          "display": "(Austin Ligon)#(Co-founder)#(CarMax)"
        },
        {
          "value": "(JAMES ROGERS)#(CHIEF EXECUTIVE OFFICER)#(DUKE ENERGY)",
          "display": "(James Rogers)#(Chief Executive Officer)#(Duke Energy)"
        },
        {
          "value": "(JIM SINEGAL)#(CHIEF EXECUTIVE OFFICER)#(COSTCO)",
          "display": "(Jim Sinegal)#(Chief Executive Officer)#(Costco)"
        },
        {
          "value": "(JIM SINEGAL)#(CO-FOUNDER)#(COSTCO)",
          "display": "(Jim Sinegal)#(Co-founder)#(Costco)"
        },
        {
          "value": "(BARACK OBAMA)#(VICE-PRESIDENT)#(TIME WARNER)",
          "display": "(Barack Obama)#(Vice-President)#(Time Warner)"
        },
        {
          "value": "(JOE BIDEN)#(VICE-PRESIDENT)#(TIME WARNER)",
          "display": "(Joe Biden)#(Vice-President)#(Time Warner)"
        }
      ],
      "rank": 18,
      "displayTitle": "2012 Democratic National Convention",
      "relevantExtracts": "nominated President Barack <b>Obama </b>and ... 2012, President Barack <b>Obama </b>won ... First Lady Michelle <b>Obama </b>announced ... , with Barack <b>Obama </b>... presidential nominee Barack <b>Obama </b>... The date of <b>Obama</b>... to Thursday, before <b>Obama</b>... Castro and Michelle <b>Obama</b>... Michelle <b>Obama </b>... our president, Barack <b>Obama</b>"
    },
    {
      "id": "/Web/Wikipedia/|Penny_Pritzker",
      "databasealias": "Wikipedia",
      "flags": [
        "h",
        "id"
      ],
      "globalrelevance": 0.9574,
      "matchingpartnames": [
        "text",
        "tables"
      ],
      "termspresence": [
        {
          "term": "obama",
          "presence": "found"
        }
      ],
      "extracts": [
        "President Barack {b}Obama{nb} nominated Pritzker as United States Secretary of Commerce .",
        "114,82",
        "13753,235",
        "Pritzker's friendship with Barack {b}Obama{nb} and his family dates back to the 1990s when he was a professor at the University of Chicago.",
        "7023,132",
        "40573,186",
        "{b}Obama{nb} and his family were frequent guests at Pritzker's Lake Michigan vacation home.",
        "7295,84",
        "41497,140",
        "Pritzker was an early supporter of {b}Obama{nb}'s political career, helping to finance his 2004 Senate campaign.",
        "7381,105",
        "42023,105",
        "Pritzker remained a major fundraiser for {b}Obama{nb} during the 2008 Democratic primary and raised millions overall for his White House bid.",
        "7641,134",
        "42534,134",
        "She served as the national finance chair of {b}Obama{nb}'s 2008 presidential campaign .",
        "7776,80",
        "42856,187",
        "As a result of her public support for President {b}Obama{nb}, Pritzker found herself the target of labor groups for Hyatt Hotels' practices.",
        "8448,133",
        "44852,133",
        "The president of Unite Here cited her connection to {b}Obama{nb} as a reason why the group expected her to use better labor practices as the group staged demonstrations against Pritzker.",
        "8582,179",
        "44986,229",
        "Pritzker with President Barack {b}Obama{nb} and Mike Froman in the Oval Office, May 2, 2013",
        "9238,84",
        "47996,189",
        "Pritzker was nominated as United States Secretary of Commerce by President Barack {b}Obama{nb} on May 2, 2013.",
        "9401,103",
        "49771,347"
      ],
      "matchlocationsperpartname": {
        "matchlocations": [
          {
            "partname": "text",
            "data": "131,5,1026,5,1086,5,7057,5,7169,5,7255,5,7295,5,7416,5,7561,5,7592,5,7682,5,7820,5,8014,5,8113,5,8496,5,8634,5,8952,5,9038,5,9269,5,9483,5,9904,5,10555,5,11332,5,11466,5;13820,5,15439,5,15499,5,40657,5,40959,5,41045,5,41497,5,42058,5,42203,5,42234,5,42575,5,43004,5,43523,5,43767,5,44900,5,45088,5,45732,5,46009,5,48027,5,50093,5,51340,5,53087,5,54587,5,55012,5"
          },
          {
            "partname": "tables",
            "data": "15014,5;339748,5"
          }
        ]
      },
      "groupcount": 1,
      "title": "Penny Pritzker",
      "language": [
        "en"
      ],
      "documentweight": "default",
      "modified": "2020-08-27 15:21:23",
      "indexationtime": "2020-09-01 19:10:17",
      "version": "3QKgdsYDobwkxRvSiyQbJg==",
      "size": 339514,
      "treepath": [
        "/Web/Wiki/"
      ],
      "filename": "Penny_Pritzker",
      "fileext": "htm",
      "collection": [
        "/Web/Wikipedia/"
      ],
      "docformat": "htm",
      "containerid": "/Web/Wikipedia/|",
      "person": [
        {
          "value": "PENNY PRITZKER",
          "display": "Penny Pritzker"
        },
        {
          "value": "JAY PRITZKER",
          "display": "Jay Pritzker"
        },
        {
          "value": "BARACK OBAMA",
          "display": "Barack Obama"
        },
        {
          "value": "BRYAN TRAUBERT",
          "display": "Bryan Traubert"
        },
        {
          "value": "DONALD PRITZKER",
          "display": "Donald Pritzker"
        },
        {
          "value": "JOHN BRYSON",
          "display": "John Bryson"
        },
        {
          "value": "OBAMA",
          "display": "Obama"
        },
        {
          "value": "ANTHONY PRITZKER",
          "display": "Anthony Pritzker"
        },
        {
          "value": "BRUCE H. ANDREWS",
          "display": "Bruce H. Andrews"
        },
        {
          "value": "HARVEY V. FINEBERG",
          "display": "Harvey V. Fineberg"
        },
        {
          "value": "J. B. PRITZKER",
          "display": "J. B. Pritzker"
        },
        {
          "value": "MADELINE W. LISSNER",
          "display": "Madeline W. Lissner"
        },
        {
          "value": "PATRICK D. GALLAGHER",
          "display": "Patrick D. Gallagher"
        },
        {
          "value": "WILBUR ROSS",
          "display": "Wilbur Ross"
        },
        {
          "value": "WILBUR ROSS PERSONAL",
          "display": "Wilbur Ross Personal"
        },
        {
          "value": "ALVIN DWORMAN",
          "display": "Alvin Dworman"
        },
        {
          "value": "CRAIG ROBINSON",
          "display": "Craig Robinson"
        },
        {
          "value": "DEBORAH HARMON",
          "display": "Deborah Harmon"
        },
        {
          "value": "HILLARY CLINTON",
          "display": "Hillary Clinton"
        },
        {
          "value": "MIKE FROMAN",
          "display": "Mike Froman"
        }
      ],
      "company": [
        {
          "value": "FORBES",
          "display": "Forbes"
        },
        {
          "value": "ARTEMIS",
          "display": "Artemis"
        },
        {
          "value": "BERKSHIRE HATHAWAY",
          "display": "Berkshire Hathaway"
        },
        {
          "value": "NEW YORK TIMES",
          "display": "New York Times"
        },
        {
          "value": "COMMERCE",
          "display": "Commerce"
        },
        {
          "value": "UNITE",
          "display": "Unite"
        }
      ],
      "geo": [
        {
          "value": "CHICAGO",
          "display": "Chicago"
        },
        {
          "value": "UNITED STATES",
          "display": "United States"
        },
        {
          "value": "ILLINOIS",
          "display": "Illinois"
        },
        {
          "value": "CUBA",
          "display": "Cuba"
        },
        {
          "value": "AMERICA",
          "display": "America"
        },
        {
          "value": "WASHINGTON",
          "display": "Washington"
        },
        {
          "value": "BALDWIN PARK",
          "display": "Baldwin Park"
        },
        {
          "value": "CALIFORNIA",
          "display": "California"
        },
        {
          "value": "EUROPE",
          "display": "Europe"
        },
        {
          "value": "HAWAII",
          "display": "Hawaii"
        },
        {
          "value": "ATHERTON",
          "display": "Atherton"
        },
        {
          "value": "FLORIDA",
          "display": "Florida"
        },
        {
          "value": "MICHIGAN",
          "display": "Michigan"
        },
        {
          "value": "ORLANDO",
          "display": "Orlando"
        },
        {
          "value": "TOKYO",
          "display": "Tokyo"
        }
      ],
      "wordcount": 1724,
      "exacthash": "yp6NP+ZWVVOUP4SIPIKyUw==",
      "nearhash": "rnDXVCdKcCZbtPQBNnD/Dg==",
      "partnamelocations": [
        {
          "value": "event",
          "display": "event"
        },
        {
          "value": "value",
          "display": "value"
        },
        {
          "value": "job",
          "display": "job"
        },
        {
          "value": "tables",
          "display": "tables"
        },
        {
          "value": "title",
          "display": "title"
        }
      ],
      "url1": "https://en.wikipedia.org/wiki/Penny_Pritzker",
      "sourcecsv1": [
        "38th United States Secretary of Commerce",
        "President",
        "Deputy",
        "Preceded by",
        "Succeeded by",
        "Born",
        "Political party",
        "Spouse",
        "Children",
        "Relatives",
        "Education"
      ],
      "sourcecsv2": [
        "United_States_Secretary_of_Commerce",
        "Barack_Obama",
        "Patrick_D._Gallagher",
        "Bruce_H._Andrews",
        "John_Bryson",
        "Wilbur_Ross",
        "Chicago",
        "Illinois",
        "Democratic_Party_(United_States)",
        "Donald_Pritzker",
        "J._B._Pritzker",
        "Anthony_Pritzker",
        "Harvard_University",
        "Bachelor_of_Arts",
        "Stanford_University",
        "Juris_Doctor",
        "Master_of_Business_Administration",
        "Pritzker_family",
        "Jay_Pritzker",
        "Forbes",
        "United_States_dollar",
        "Chicago_Board_of_Education",
        "Museum_of_Contemporary_Art,_Chicago",
        "Governor_of_Illinois",
        "Hyatt",
        "Atherton,_California",
        "Abram_Nicholas_Pritzker",
        "Castilleja_School",
        "Harvard_College",
        "Nicholas_J._Pritzker",
        "Vi_Senior_Living,_Classic_Residence",
        "Orlando,_Florida",
        "Hinsdale,_Illinois",
        "Superior_Bank_of_Chicago",
        "Federal_Deposit_Insurance_Corporation",
        "United_States_Treasury_Department",
        "Wall_Street_Journal",
        "Business_Week",
        "New_York_Times",
        "Thomas_Pritzker",
        "Marmon_Group",
        "Berkshire_Hathaway",
        "TransUnion",
        "Craig_Robinson_(basketball)",
        "Lake_Michigan",
        "Hillary_Clinton",
        "Barack_Obama_2008_presidential_campaign",
        "2008_United_States_presidential_election",
        "CNN",
        "Chicago_Tribune",
        "UNITE_HERE",
        "President%27s_Council_on_Jobs_and_Competitiveness",
        "Council_on_Foreign_Relations",
        "Mike_Froman",
        "President_of_the_United_States",
        "Trans-Pacific_Partnership",
        "2016_United_States_presidential_election",
        "Cuban_Thaw",
        "Cuba",
        "United_States_embargo_against_Cuba",
        "Harvard_Board_of_Overseers",
        "President_and_Fellows_of_Harvard_College",
        "Aspen_Institute",
        "5k_race",
        "Chicago_(magazine)",
        "Elle_(magazine)",
        "Harvey_V._Fineberg",
        "Carnegie_Endowment_for_International_Peace",
        "COVID-19_pandemic",
        "Ironman_Triathlon",
        "Hawaii",
        "List_of_female_United_States_Cabinet_Secretaries",
        "List_of_people_and_organisations_named_in_the_Paradise_Papers",
        "Office_of_Thrift_Supervision",
        "International_Consortium_of_Investigative_Journalists",
        "Paradise_Papers",
        "Bernie_Sanders",
        "The_Forward",
        "ISSN_(identifier)",
        "Palo_Alto_Weekly",
        "The_Wall_Street_Journal",
        "The_New_York_Times",
        "The_Chicago_Tribune",
        "Wayback_Machine",
        "In_These_Times",
        "Washington_Post",
        "Politico_(newspaper)",
        "Lynn_Sweet",
        "Chicago_Sun-Times",
        "Bloomberg_BNA",
        "United_States_Department_of_Commerce",
        "C-SPAN",
        "United_States_Secretary_of_Commerce_and_Labor",
        "George_B._Cortelyou",
        "Victor_H._Metcalf",
        "Oscar_Straus_(politician)",
        "Charles_Nagel",
        "William_C._Redfield",
        "Joshua_W._Alexander",
        "Herbert_Hoover",
        "William_F._Whiting",
        "Robert_P._Lamont",
        "Roy_D._Chapin",
        "Daniel_C._Roper",
        "Harry_Hopkins",
        "Jesse_H._Jones",
        "Henry_A._Wallace",
        "W._Averell_Harriman",
        "Charles_W._Sawyer",
        "Sinclair_Weeks",
        "Lewis_Strauss",
        "Frederick_H._Mueller",
        "Luther_H._Hodges",
        "John_T._Connor",
        "Alexander_Trowbridge",
        "C._R._Smith",
        "Maurice_Stans",
        "Peter_G._Peterson",
        "Frederick_B._Dent",
        "Rogers_Morton",
        "Elliot_Richardson",
        "Juanita_M._Kreps",
        "Philip_Klutznick",
        "Malcolm_Baldrige,_Jr.",
        "William_Verity,_Jr.",
        "Robert_Mosbacher",
        "Barbara_Franklin",
        "Ron_Brown",
        "Mickey_Kantor",
        "William_M._Daley",
        "Norman_Mineta",
        "Donald_Evans",
        "Carlos_Gutierrez",
        "Gary_Locke",
        "Cabinet_of_the_United_States",
        "United_States_Secretary_of_State",
        "John_Kerry",
        "United_States_Secretary_of_the_Treasury",
        "Timothy_Geithner",
        "Jack_Lew",
        "United_States_Secretary_of_Defense",
        "Robert_Gates",
        "Leon_Panetta",
        "Chuck_Hagel",
        "Ash_Carter",
        "United_States_Attorney_General",
        "Eric_Holder",
        "Loretta_Lynch",
        "United_States_Secretary_of_the_Interior",
        "Ken_Salazar",
        "Sally_Jewell",
        "United_States_Secretary_of_Agriculture",
        "Tom_Vilsack",
        "United_States_Secretary_of_Labor",
        "Hilda_Solis",
        "Tom_Perez",
        "United_States_Secretary_of_Health_and_Human_Services",
        "Kathleen_Sebelius",
        "Sylvia_Mathews_Burwell",
        "United_States_Secretary_of_Housing_and_Urban_Development",
        "Shaun_Donovan",
        "Julian_Castro",
        "United_States_Secretary_of_Transportation",
        "Ray_LaHood",
        "Anthony_Foxx",
        "United_States_Secretary_of_Energy",
        "Steven_Chu",
        "Ernest_Moniz",
        "United_States_Secretary_of_Education",
        "Arne_Duncan",
        "John_King_Jr.",
        "United_States_Secretary_of_Veterans_Affairs",
        "Eric_Shinseki",
        "Bob_McDonald_(businessman)",
        "United_States_Secretary_of_Homeland_Security",
        "Janet_Napolitano",
        "Jeh_Johnson",
        "Cabinet_of_the_United_States#Cabinet-level_officers",
        "Vice_President_of_the_United_States",
        "Joe_Biden",
        "White_House_Chief_of_Staff",
        "Rahm_Emanuel",
        "Denis_McDonough",
        "Administrator_of_the_Environmental_Protection_Agency",
        "Lisa_P._Jackson",
        "Gina_McCarthy",
        "Office_of_Management_and_Budget",
        "Peter_R._Orszag",
        "Office_of_the_United_States_Trade_Representative",
        "Ron_Kirk",
        "Michael_Froman",
        "United_States_Ambassador_to_the_United_Nations",
        "Susan_Rice",
        "Samantha_Power",
        "Council_of_Economic_Advisers",
        "Christina_Romer",
        "Austan_Goolsbee",
        "Alan_Krueger",
        "Jason_Furman",
        "Administrator_of_the_Small_Business_Administration",
        "Karen_Mills",
        "Maria_Contreras-Sweet",
        "Confirmations_of_Barack_Obama%27s_Cabinet",
        "GND_(identifier)",
        "ISNI_(identifier)",
        "LCCN_(identifier)",
        "SNAC",
        "VIAF_(identifier)",
        "WorldCat_Identities"
      ],
      "sourcestr1": "Penny_Pritzker",
      "sourcestr2": "Q293365",
      "sourcestr3": "Q5",
      "sourcestr4": "human",
      "sourcevarchar3": "[{\"Penny Pritzker\":\"\",\"38th United States Secretary of Commerce\":[\"In office\",\"June 26, 2013\\u2013January 20, 2017\"],\"President\":\"Barack Obama\",\"Deputy\":[\"Patrick D. Gallagher\",\"(acting)\",\"Bruce H. Andrews\"],\"Preceded by\":\"John Bryson\",\"Succeeded by\":\"Wilbur Ross\",\"Personal details\":\"\",\"Born\":[\"Penny Sue Pritzker\",\"May 2, 1959\",\"(age61)\",\"Chicago\",\",\",\"Illinois\",\", U.S.\"],\"Political party\":\"Democratic\",\"Spouse\":\"Bryan Traubert\",\"Children\":\"2\",\"Relatives\":[\"Donald Pritzker\",\"(father)\",\"J. B. Pritzker\",\"(brother)\",\"Anthony Pritzker\",\"(brother)\"],\"Education\":[\"Harvard University\",\"Stanford University\"]}]",
      "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Penny_Pritzker_official_portrait.jpg/1200px-Penny_Pritzker_official_portrait.jpg",
      "sourcedouble1": 0.035539,
      "entity1": [
        {
          "value": "2",
          "display": "2"
        },
        {
          "value": "1",
          "display": "1"
        },
        {
          "value": "2013",
          "display": "2013"
        },
        {
          "value": "2001",
          "display": "2001"
        },
        {
          "value": "2008",
          "display": "2008"
        },
        {
          "value": "3",
          "display": "3"
        },
        {
          "value": "2018",
          "display": "2018"
        },
        {
          "value": "26",
          "display": "26"
        },
        {
          "value": "6",
          "display": "6"
        },
        {
          "value": "2012",
          "display": "2012"
        },
        {
          "value": "2011",
          "display": "2011"
        },
        {
          "value": "1959",
          "display": "1959"
        },
        {
          "value": "-19",
          "display": "-19"
        },
        {
          "value": "2017",
          "display": "2017"
        },
        {
          "value": "2020",
          "display": "2020"
        },
        {
          "value": "2014",
          "display": "2014"
        },
        {
          "value": "5",
          "display": "5"
        },
        {
          "value": "100",
          "display": "100"
        },
        {
          "value": "2009",
          "display": "2009"
        },
        {
          "value": "1500000",
          "display": "1500000"
        }
      ],
      "date": [
        {
          "value": "2013-06-26",
          "display": "2013-06-26"
        },
        {
          "value": "2013-05-02",
          "display": "2013-05-02"
        },
        {
          "value": "1959-05-02",
          "display": "1959-05-02"
        },
        {
          "value": "2006-06-05",
          "display": "2006-06-05"
        },
        {
          "value": "2014-03-26",
          "display": "2014-03-26"
        },
        {
          "value": "2017-01-20",
          "display": "2017-01-20"
        },
        {
          "value": "2020-03-24",
          "display": "2020-03-24"
        },
        {
          "value": "2014-10-21",
          "display": "2014-10-21"
        }
      ],
      "entity4": [
        {
          "value": "USD 1000000",
          "display": "USD 1000000"
        },
        {
          "value": "USD 1500000",
          "display": "USD 1500000"
        },
        {
          "value": "USD 23000000",
          "display": "USD 23000000"
        },
        {
          "value": "USD 5000000",
          "display": "USD 5000000"
        },
        {
          "value": "USD 15000000000",
          "display": "USD 15000000000"
        },
        {
          "value": "USD 360000000",
          "display": "USD 360000000"
        },
        {
          "value": "USD 40000000",
          "display": "USD 40000000"
        },
        {
          "value": "USD 4500000000",
          "display": "USD 4500000000"
        },
        {
          "value": "USD 460000000",
          "display": "USD 460000000"
        },
        {
          "value": "USD 100000",
          "display": "USD 100000"
        },
        {
          "value": "USD 2400000000",
          "display": "USD 2400000000"
        }
      ],
      "entity12": [
        {
          "value": "DEATH",
          "display": "Death"
        },
        {
          "value": "BIRTH",
          "display": "Birth"
        },
        {
          "value": "ELECTION",
          "display": "Election"
        },
        {
          "value": "BATTLE",
          "display": "Battle"
        },
        {
          "value": "DEFEAT",
          "display": "Defeat"
        },
        {
          "value": "VICTORY",
          "display": "Victory"
        }
      ],
      "entity13": [
        {
          "value": "DIRECTOR",
          "display": "Director"
        },
        {
          "value": "CO-FOUNDER",
          "display": "Co-founder"
        },
        {
          "value": "CHIEF EXECUTIVE OFFICER",
          "display": "Chief Executive Officer"
        },
        {
          "value": "VICE CHAIRMAN",
          "display": "Vice chairman"
        },
        {
          "value": "FOUNDER",
          "display": "Founder"
        }
      ],
      "entity14": [
        {
          "value": "INVESTMENT",
          "display": "Investment"
        },
        {
          "value": "REVENUE",
          "display": "Revenue"
        },
        {
          "value": "CAPITAL",
          "display": "Capital"
        },
        {
          "value": "ACQUISITION",
          "display": "Acquisition"
        },
        {
          "value": "CONTRACT",
          "display": "Contract"
        },
        {
          "value": "SHARES",
          "display": "Shares"
        }
      ],
      "event_date": [
        {
          "value": "(BIRTH)#(1959-05-02)",
          "display": "(Birth)#(1959-05-02)"
        }
      ],
      "person_cooc": [
        {
          "value": "(CO-FOUNDER)#(DONALD PRITZKER)",
          "display": "(Co-founder)#(Donald Pritzker)"
        },
        {
          "value": "(FOUNDER)#(JAY PRITZKER)",
          "display": "(Founder)#(Jay Pritzker)"
        }
      ],
      "company_person": [
        {
          "value": "(FORBES)#(PENNY PRITZKER)",
          "display": "(Forbes)#(Penny Pritzker)"
        },
        {
          "value": "(ARTEMIS)#(DEBORAH HARMON)",
          "display": "(Artemis)#(Deborah Harmon)"
        }
      ],
      "rank": 19,
      "displayTitle": "Penny Pritzker",
      "relevantExtracts": "President Barack <b>Obama </b>nominated ... friendship with Barack <b>Obama </b>and ... <b>Obama </b>and ... early supporter of <b>Obama</b>&#39;s ... major fundraiser for <b>Obama </b>during ... finance chair of <b>Obama</b>&#39;s ... support for President <b>Obama</b>, ... her connection to <b>Obama </b>... with President Barack <b>Obama </b>... by President Barack <b>Obama </b>"
    }
  ],
  "methodresult": "ok"
}