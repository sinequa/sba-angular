export const RESULTS = {
  "queryAnalysis": {
      "initial": true,
      "text": "tesla",
      "elements": [
          {
              "text": "tesla",
              "weight": 1,
              "offset": 0,
              "length": 5,
              "stopword": false,
              "baseform": "tesla",
              "lemmas": [
                  {
                      "text": "tesla"
                  }
              ]
          }
      ]
  },
  "queryIntents": [],
  "statements": [
      "select distribution('sourcestr4,basicforms=true,order=freqdesc,labels=true,wantnulls=true,post-group-by=true,merge-groups=true') as count_tab from Wikipedia,SinequaDoc,Press where text contains 'tesla' and  process-entities('WikiKey') and sourcestr4 in ('*',NULL,'human','business','company','website','software','software company','newspaper','organization','city of the United States','city','state of the United States','state','country','sovereign state') and  relevancetransforms='<RelevanceTransforms><PartNameBoost fraction=\"30\"><PartNames mode=\"and\"><PartName>title</PartName></PartNames><Action op=\"add\" field=\"sourcedouble1\"></Action></PartNameBoost></RelevanceTransforms>' and  synonyms='uk-us' and  reformulations='false' and  SearchParameters='mac=1000;mw=0;dlang=autodetect;langw=en/1.2/fr/1.1/es/1.0/it/1.0/nl/1.0/ko/0.8/*/0.9;scmode=Smart' and  language='autodetect' and  concepts limit 100 and  globalrelevance>=40 and  wordsrelevance>=0 and  (CACHE (CHECKACLS('accesslists=\"accesslist1,accesslist2\",deniedlists=\"deniedlist1\"') FOR ('internal|S-1-5-21-2165854416-2067547654-1784818317-6655'))) group by nearhash skip 0 count 1 forget above 1",
      "select searchguid('CC6296105F7E41B798EE6C99E86845B0'),internalquerylog,id,databasealias,flags,globalrelevance,matchingpartnames,termspresence,internalqueryanalysis,highlight(Text,'chunk=sentence/window,count=10,context.window=3,offsets=true,separator=;,startmarker=\"{b}\",endmarker=\"{nb}\",remap=true,dedup=1') as extracts,matchlocations('remap=true,perpartname=true') as matchlocationsperpartname,groupcount,title,documentlanguages,documentweight,authors,modified,indexationtime,version,keywords,size,treepath,filename,fileext,flags,collection,docformat,doctype,containerid,msgfrom,msgto,remap(person),remap(company),remap(geo),wordcount,exacthash,nearhash,remap(partnamelocations),url1,url2,accesslist1,accesslist2,deniedlist1,sourcecsv1,sourcecsv2,sourcecsv3,sourcecsv4,sourcecsv5,sourcestr1,sourcestr2,sourcestr3,sourcestr4,sourcestr5,sourcevarchar3,sourcevarchar4,sourcevarchar5,sourcedouble1,sourcedouble2,sourcedouble3,sourcedouble4,sourcedouble5,remap(entity1),remap(entity2),remap(entity3),remap(entity4),remap(entity5),remap(entity6),remap(entity7),remap(entity8),remap(entity9),remap(entity10),remap(entity11),remap(entity12),remap(entity13),remap(entity14),remap(entity15),remap(entity16),remap(entity17),remap(entity18),remap(entity19),remap(entity20),enginecsv1,enginecsv2,enginecsv3,enginecsv4,enginecsv5,engineusercsv1,engineusercsv2,engineusercsv3,engineusercsv4,engineusercsv5,distribution('size,bounds=\"0;10240;102400;1048576;10485760;2147483646,order=freqdesc\",post-group-by=true,merge-groups=true,count=11') as count_Size__005F_SizeDefault,concepts,distribution('matchingpartnames,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_MatchingPartnames,distribution('documentlanguages,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_DocumentLanguages,distribution('docformat,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_DocFormat,distribution('authors,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Authors,distribution('doctype,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_DocType,distribution('fileext,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_FileExt,distribution('filename,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_FileName,distribution('title,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Title,distribution('modified,bounds=\"2022-01-01;2022-02-01;2022-02-13;2022-02-14,order=freqdesc\",post-group-by=true,merge-groups=true,count=11') as count_Modified__005F_DateDefault,distribution('treepath,basicforms=false,labels=true,maxcount=20,minlevel=2,wantmore=true,order=labelasc,post-group-by=true,merge-groups=true') as count_Treepath,correlation('geo,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true') as correl_Geo,correlation('person,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true') as correl_Person,correlation('company,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true') as correl_Company,distribution('entity4,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Money,distribution('sourcestr4,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Categories,distribution('modified,basicforms=true,labels=false,order2=labelasc,order=keyasc,mask=YYYY-WW,post-group-by=true,merge-groups=true') as count_Timeline,distribution('enginecsv1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_publicLabels,distribution('engineusercsv1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true,prefixes=\"internal|S-1-5-21-2165854416-2067547654-1784818317-6655|\"') as count_privateLabels,distribution('entity19,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Company_Person_Cooc,distribution('entity20,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_Person_Job_Company_Cooc,distribution('entity18,count=101,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true') as count_ValueAmounts from Wikipedia,SinequaDoc,Press where text contains 'tesla' and  process-entities('WikiKey') and sourcestr4 in ('*',NULL) and  relevancetransforms='<RelevanceTransforms><PartNameBoost fraction=\"30\"><PartNames mode=\"and\"><PartName>title</PartName></PartNames><Action op=\"add\" field=\"sourcedouble1\"></Action></PartNameBoost></RelevanceTransforms>' and  synonyms='uk-us' and  reformulations='false' and  SearchParameters='mac=1000;mw=0;dlang=autodetect;langw=en/1.2/fr/1.1/es/1.0/it/1.0/nl/1.0/ko/0.8/*/0.9;scmode=Smart' and  language='autodetect' and  concepts limit 100 and  globalrelevance>=40 and  wordsrelevance>=0 and  (CACHE (CHECKACLS('accesslists=\"accesslist1,accesslist2\",deniedlists=\"deniedlist1\"') FOR ('internal|S-1-5-21-2165854416-2067547654-1784818317-6655'))) group by nearhash order by globalrelevance desc skip 0 count 20"
  ],
  "tab": "all",
  "tabs": [
      {
          "name": "all",
          "display": "msg#results.resultsAllTab",
          "value": "*,",
          "count": 499
      },
      {
          "name": "human",
          "display": "msg#results.tabPeople",
          "value": "human",
          "count": 44
      },
      {
          "name": "business",
          "display": "msg#results.tabBusiness",
          "value": "business,company,website,software,software company,newspaper,organization",
          "count": 44
      },
      {
          "name": "location",
          "display": "msg#results.tabLocation",
          "value": "city of the United States,city,state of the United States,state,country,sovereign state",
          "count": 18
      }
  ],
  "aggregations": [
      {
          "name": "Concepts",
          "column": "concepts",
          "items": [
              {
                  "value": "forward-facing radar",
                  "score": 43.788,
                  "count": 11
              },
              {
                  "value": "electric car",
                  "score": 42.495,
                  "count": 33
              },
              {
                  "value": "autopilot mode",
                  "score": 42.031,
                  "count": 11
              },
              {
                  "value": "Driving Mode",
                  "score": 36.747,
                  "count": 13
              },
              {
                  "value": "Cumulative global sales",
                  "score": 36.562,
                  "count": 11
              },
              {
                  "value": "List of modern production plug-in",
                  "score": 36.511,
                  "count": 10
              },
              {
                  "value": "traditional manufacturers",
                  "score": 35.124,
                  "count": 10
              },
              {
                  "value": "drive system",
                  "score": 34.616,
                  "count": 18
              },
              {
                  "value": "compute module",
                  "score": 32.668,
                  "count": 11
              },
              {
                  "value": "first production car",
                  "score": 31.877,
                  "count": 12
              },
              {
                  "value": "List of production battery",
                  "score": 31.846,
                  "count": 8
              }
          ]
      },
      {
          "name": "Geo",
          "column": "geo",
          "items": [
              {
                  "value": "TOYOTA",
                  "display": "Toyota",
                  "count": 23
              },
              {
                  "value": "FREMONT",
                  "display": "Fremont",
                  "count": 11
              },
              {
                  "value": "TILBURG",
                  "display": "Tilburg",
                  "count": 4
              },
              {
                  "value": "TAKAOKA",
                  "display": "Takaoka",
                  "count": 2
              },
              {
                  "value": "PALO ALTO",
                  "display": "Palo Alto",
                  "count": 11
              },
              {
                  "value": "BLUE SPRINGS",
                  "display": "Blue Springs",
                  "count": 2
              },
              {
                  "value": "MURFREESBORO",
                  "display": "Murfreesboro",
                  "count": 3
              },
              {
                  "value": "BALLYCASTLE",
                  "display": "Ballycastle",
                  "count": 1
              },
              {
                  "value": "NORTH LAS VEGAS",
                  "display": "North Las Vegas",
                  "count": 2
              },
              {
                  "value": "WEST HARTFORD",
                  "display": "West Hartford",
                  "count": 2
              },
              {
                  "value": "LIVERMORE",
                  "display": "Livermore",
                  "count": 3
              }
          ]
      },
      {
          "name": "Money",
          "column": "entity4",
          "items": [
              {
                  "value": "USD 1000000000",
                  "display": "USD 1000000000",
                  "count": 37
              },
              {
                  "value": "USD 10000000",
                  "display": "USD 10000000",
                  "count": 25
              },
              {
                  "value": "USD 1000",
                  "display": "USD 1000",
                  "count": 24
              },
              {
                  "value": "USD 1000000",
                  "display": "USD 1000000",
                  "count": 24
              },
              {
                  "value": "USD 100000000",
                  "display": "USD 100000000",
                  "count": 23
              },
              {
                  "value": "USD 2000000000",
                  "display": "USD 2000000000",
                  "count": 22
              },
              {
                  "value": "USD 50000000",
                  "display": "USD 50000000",
                  "count": 21
              },
              {
                  "value": "USD 100",
                  "display": "USD 100",
                  "count": 20
              },
              {
                  "value": "USD 500",
                  "display": "USD 500",
                  "count": 20
              },
              {
                  "value": "USD 1",
                  "display": "USD 1",
                  "count": 19
              },
              {
                  "value": "USD 100000",
                  "display": "USD 100000",
                  "count": 18
              }
          ]
      },
      {
          "name": "Person",
          "column": "person",
          "items": [
              {
                  "value": "NIKOLA TESLA",
                  "display": "Nikola Tesla",
                  "count": 19
              },
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk",
                  "count": 21
              },
              {
                  "value": "MARC TARPENNING",
                  "display": "Marc Tarpenning",
                  "count": 4
              },
              {
                  "value": "MAYE MUSK",
                  "display": "Maye Musk",
                  "count": 3
              },
              {
                  "value": "TOSCA MUSK",
                  "display": "Tosca Musk",
                  "count": 3
              },
              {
                  "value": "GEORGE WESTINGHOUSE",
                  "display": "George Westinghouse",
                  "count": 6
              },
              {
                  "value": "STEVE JURVETSON",
                  "display": "Steve Jurvetson",
                  "count": 4
              },
              {
                  "value": "BJORN NYLAND",
                  "display": "Bjørn Nyland",
                  "count": 2
              },
              {
                  "value": "MATTHEW INMAN",
                  "display": "Matthew Inman",
                  "count": 2
              },
              {
                  "value": "MALI MIDGARD",
                  "display": "Mali Midgard",
                  "count": 2
              },
              {
                  "value": "MARTIN EBERHARD",
                  "display": "Martin Eberhard",
                  "count": 3
              }
          ]
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
                  "count": 499
              }
          ]
      },
      {
          "name": "Company",
          "column": "company",
          "items": [
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors",
                  "count": 31
              },
              {
                  "value": "NVIDIA",
                  "display": "NVIDIA",
                  "count": 23
              },
              {
                  "value": "NISSAN",
                  "display": "Nissan",
                  "count": 20
              },
              {
                  "value": "TOYOTA MOTOR",
                  "display": "Toyota Motor",
                  "count": 9
              },
              {
                  "value": "PASSAT",
                  "display": "Passat",
                  "count": 7
              },
              {
                  "value": "MERCEDES",
                  "display": "Mercedes",
                  "count": 18
              },
              {
                  "value": "FORD",
                  "display": "Ford",
                  "count": 17
              },
              {
                  "value": "VOLKSWAGEN",
                  "display": "Volkswagen",
                  "count": 15
              },
              {
                  "value": "NAVIGANT",
                  "display": "Navigant",
                  "count": 3
              },
              {
                  "value": "GENERAL MOTORS",
                  "display": "General Motors",
                  "count": 19
              },
              {
                  "value": "DAIMLER",
                  "display": "Daimler",
                  "count": 10
              }
          ]
      },
      {
          "name": "Timeline",
          "column": "modified",
          "items": [
              {
                  "value": "2020-W34",
                  "count": 48
              },
              {
                  "value": "2020-W35",
                  "count": 163
              },
              {
                  "value": "2020-W36",
                  "count": 287
              },
              {
                  "value": "2021-W19",
                  "count": 1
              }
          ]
      },
      {
          "name": "Treepath",
          "column": "treepath",
          "isTree": true,
          "count": 499,
          "hasChildren": true,
          "items": [
              {
                  "value": "web",
                  "count": 499,
                  "hasChildren": true,
                  "items": [
                      {
                          "value": "Huffington Post",
                          "count": 1,
                          "hasChildren": false,
                          "$path": "/web/Huffington Post/",
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
                          "$opened": false,
                          "$filtered": false
                      },
                      {
                          "value": "Wiki",
                          "count": 498,
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
                          "$opened": false,
                          "$filtered": false
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
                  "$opened": true,
                  "$filtered": false
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
                  "count": 499
              }
          ]
      },
      {
          "name": "Categories",
          "column": "sourcestr4",
          "items": [
              {
                  "value": "human",
                  "display": "human",
                  "count": 44
              },
              {
                  "value": "business",
                  "display": "business",
                  "count": 36
              },
              {
                  "value": "wikimedia list article",
                  "display": "Wikimedia list article",
                  "count": 24
              },
              {
                  "value": "city of the united states",
                  "display": "city of the United States",
                  "count": 11
              },
              {
                  "value": "automobile manufacturer",
                  "display": "automobile manufacturer",
                  "count": 10
              },
              {
                  "value": "microarchitecture",
                  "display": "microarchitecture",
                  "count": 8
              },
              {
                  "value": "aspect of history",
                  "display": "aspect of history",
                  "count": 7
              },
              {
                  "value": "film",
                  "display": "film",
                  "count": 5
              },
              {
                  "value": "automobile model",
                  "display": "automobile model",
                  "count": 4
              },
              {
                  "value": "car brand",
                  "display": "car brand",
                  "count": 4
              },
              {
                  "value": "free software",
                  "display": "free software",
                  "count": 4
              }
          ]
      },
      {
          "name": "publicLabels",
          "column": "enginecsv1",
          "items": [
              {
                  "value": "casa escols",
                  "display": "casa escols",
                  "count": 1
              },
              {
                  "value": "fefwwf",
                  "display": "fefwwf",
                  "count": 1
              },
              {
                  "value": "important doc",
                  "display": "important doc",
                  "count": 1
              },
              {
                  "value": "sdfsdfs",
                  "display": "sdfsdfs",
                  "count": 1
              },
              {
                  "value": "teste 01",
                  "display": "TESTE 01",
                  "count": 1
              }
          ]
      },
      {
          "name": "ValueAmounts",
          "column": "entity18",
          "items": [
              {
                  "value": "(INVESTMENT)#(USD 1000000000)",
                  "display": "(Investment)#(USD 1000000000)",
                  "count": 6
              },
              {
                  "value": "(ACQUISITION)#(USD 1500000000)",
                  "display": "(Acquisition)#(USD 1500000000)",
                  "count": 4
              },
              {
                  "value": "(CONTRACT)#(USD 1000000000)",
                  "display": "(Contract)#(USD 1000000000)",
                  "count": 4
              },
              {
                  "value": "(ACQUISITION)#(USD 200000000)",
                  "display": "(Acquisition)#(USD 200000000)",
                  "count": 3
              },
              {
                  "value": "(ACQUISITION)#(USD 400000000)",
                  "display": "(Acquisition)#(USD 400000000)",
                  "count": 3
              },
              {
                  "value": "(ACQUISITION)#(USD 50000000)",
                  "display": "(Acquisition)#(USD 50000000)",
                  "count": 3
              },
              {
                  "value": "(CONTRACT)#(USD 14000000000)",
                  "display": "(Contract)#(USD 14000000000)",
                  "count": 3
              },
              {
                  "value": "(CONTRACT)#(USD 250000000)",
                  "display": "(Contract)#(USD 250000000)",
                  "count": 3
              },
              {
                  "value": "(INVESTMENT)#(USD 100000000)",
                  "display": "(Investment)#(USD 100000000)",
                  "count": 3
              },
              {
                  "value": "(INVESTMENT)#(USD 42000000)",
                  "display": "(Investment)#(USD 42000000)",
                  "count": 3
              },
              {
                  "value": "(REVENUE)#(USD 1000000000)",
                  "display": "(Revenue)#(USD 1000000000)",
                  "count": 3
              },
              {
                  "value": "(REVENUE)#(USD 1400000000)",
                  "display": "(Revenue)#(USD 1400000000)",
                  "count": 3
              },
              {
                  "value": "(REVENUE)#(USD 500000)",
                  "display": "(Revenue)#(USD 500000)",
                  "count": 3
              },
              {
                  "value": "(SHARES)#(USD 1500000000)",
                  "display": "(Shares)#(USD 1500000000)",
                  "count": 3
              },
              {
                  "value": "(ACQUISITION)#(USD 1000)",
                  "display": "(Acquisition)#(USD 1000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 1000000)",
                  "display": "(Acquisition)#(USD 1000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 10000000)",
                  "display": "(Acquisition)#(USD 10000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 100000000)",
                  "display": "(Acquisition)#(USD 100000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 1300000000)",
                  "display": "(Acquisition)#(USD 1300000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 17000000)",
                  "display": "(Acquisition)#(USD 17000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 170000000)",
                  "display": "(Acquisition)#(USD 170000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 2000000000)",
                  "display": "(Acquisition)#(USD 2000000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 260000000)",
                  "display": "(Acquisition)#(USD 260000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 307000000)",
                  "display": "(Acquisition)#(USD 307000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 42000000)",
                  "display": "(Acquisition)#(USD 42000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(USD 50)",
                  "display": "(Acquisition)#(USD 50)",
                  "count": 2
              },
              {
                  "value": "(CAPITAL)#(USD 200000000)",
                  "display": "(Capital)#(USD 200000000)",
                  "count": 2
              },
              {
                  "value": "(CAPITAL)#(USD 206000000000)",
                  "display": "(Capital)#(USD 206000000000)",
                  "count": 2
              },
              {
                  "value": "(CAPITAL)#(USD 2500000000)",
                  "display": "(Capital)#(USD 2500000000)",
                  "count": 2
              },
              {
                  "value": "(CAPITAL)#(USD 5000000000)",
                  "display": "(Capital)#(USD 5000000000)",
                  "count": 2
              },
              {
                  "value": "(CAPITAL)#(USD 86000000000)",
                  "display": "(Capital)#(USD 86000000000)",
                  "count": 2
              },
              {
                  "value": "(CONTRACT)#(USD 10000000000)",
                  "display": "(Contract)#(USD 10000000000)",
                  "count": 2
              },
              {
                  "value": "(CONTRACT)#(USD 15000000000)",
                  "display": "(Contract)#(USD 15000000000)",
                  "count": 2
              },
              {
                  "value": "(CONTRACT)#(USD 300000000)",
                  "display": "(Contract)#(USD 300000000)",
                  "count": 2
              },
              {
                  "value": "(CONTRACT)#(USD 316000000)",
                  "display": "(Contract)#(USD 316000000)",
                  "count": 2
              },
              {
                  "value": "(CONTRACT)#(USD 3200000000)",
                  "display": "(Contract)#(USD 3200000000)",
                  "count": 2
              },
              {
                  "value": "(CONTRACT)#(USD 75000000)",
                  "display": "(Contract)#(USD 75000000)",
                  "count": 2
              },
              {
                  "value": "(DEBT)#(USD 153)",
                  "display": "(Debt)#(USD 153)",
                  "count": 2
              },
              {
                  "value": "(DEBT)#(USD 445000000)",
                  "display": "(Debt)#(USD 445000000)",
                  "count": 2
              },
              {
                  "value": "(DEBT)#(USD 500000000)",
                  "display": "(Debt)#(USD 500000000)",
                  "count": 2
              },
              {
                  "value": "(INVESTMENT)#(USD 105000000)",
                  "display": "(Investment)#(USD 105000000)",
                  "count": 2
              },
              {
                  "value": "(INVESTMENT)#(USD 1200)",
                  "display": "(Investment)#(USD 1200)",
                  "count": 2
              },
              {
                  "value": "(INVESTMENT)#(USD 13000000)",
                  "display": "(Investment)#(USD 13000000)",
                  "count": 2
              },
              {
                  "value": "(INVESTMENT)#(USD 50000000)",
                  "display": "(Investment)#(USD 50000000)",
                  "count": 2
              },
              {
                  "value": "(INVESTMENT)#(USD 500000000)",
                  "display": "(Investment)#(USD 500000000)",
                  "count": 2
              },
              {
                  "value": "(INVESTMENT)#(USD 5200000000)",
                  "display": "(Investment)#(USD 5200000000)",
                  "count": 2
              },
              {
                  "value": "(INVESTMENT)#(USD 7000000000)",
                  "display": "(Investment)#(USD 7000000000)",
                  "count": 2
              },
              {
                  "value": "(INVESTMENT)#(USD 7500000)",
                  "display": "(Investment)#(USD 7500000)",
                  "count": 2
              },
              {
                  "value": "(LOSSES)#(USD 30000000)",
                  "display": "(Losses)#(USD 30000000)",
                  "count": 2
              },
              {
                  "value": "(LOSSES)#(USD 862000000)",
                  "display": "(Losses)#(USD 862000000)",
                  "count": 2
              },
              {
                  "value": "(PENALTY)#(USD 20000000)",
                  "display": "(Penalty)#(USD 20000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD -69)",
                  "display": "(Revenue)#(USD -69)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD -862)",
                  "display": "(Revenue)#(USD -862)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 1)",
                  "display": "(Revenue)#(USD 1)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 100000)",
                  "display": "(Revenue)#(USD 100000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 1000000)",
                  "display": "(Revenue)#(USD 1000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 10000000)",
                  "display": "(Revenue)#(USD 10000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 100000000)",
                  "display": "(Revenue)#(USD 100000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 10000000000)",
                  "display": "(Revenue)#(USD 10000000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 1900000000)",
                  "display": "(Revenue)#(USD 1900000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 200000000)",
                  "display": "(Revenue)#(USD 200000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 24600000000)",
                  "display": "(Revenue)#(USD 24600000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 250000)",
                  "display": "(Revenue)#(USD 250000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 295000000)",
                  "display": "(Revenue)#(USD 295000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 30)",
                  "display": "(Revenue)#(USD 30)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 4000000)",
                  "display": "(Revenue)#(USD 4000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 6350000000)",
                  "display": "(Revenue)#(USD 6350000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 7200000000)",
                  "display": "(Revenue)#(USD 7200000000)",
                  "count": 2
              },
              {
                  "value": "(REVENUE)#(USD 862000000)",
                  "display": "(Revenue)#(USD 862000000)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(AMD 4.2)",
                  "display": "(Shares)#(AMD 4.2)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(USD 10)",
                  "display": "(Shares)#(USD 10)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(USD 10000000)",
                  "display": "(Shares)#(USD 10000000)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(USD 1000000000)",
                  "display": "(Shares)#(USD 1000000000)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(USD 180000000)",
                  "display": "(Shares)#(USD 180000000)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(USD 400000000)",
                  "display": "(Shares)#(USD 400000000)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(USD 50000000)",
                  "display": "(Shares)#(USD 50000000)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(USD 600000000)",
                  "display": "(Shares)#(USD 600000000)",
                  "count": 2
              },
              {
                  "value": "(SHARES)#(USD 700000000)",
                  "display": "(Shares)#(USD 700000000)",
                  "count": 2
              },
              {
                  "value": "(ACQUISITION)#(EUR 50000000000)",
                  "display": "(Acquisition)#(EUR 50000000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(GBP 3500)",
                  "display": "(Acquisition)#(GBP 3500)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 0.12)",
                  "display": "(Acquisition)#(USD 0.12)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 1.25)",
                  "display": "(Acquisition)#(USD 1.25)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 10000)",
                  "display": "(Acquisition)#(USD 10000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 10500000)",
                  "display": "(Acquisition)#(USD 10500000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 105000000)",
                  "display": "(Acquisition)#(USD 105000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 107406)",
                  "display": "(Acquisition)#(USD 107406)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 110000000)",
                  "display": "(Acquisition)#(USD 110000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 1120000000)",
                  "display": "(Acquisition)#(USD 1120000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 120000000)",
                  "display": "(Acquisition)#(USD 120000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 122759)",
                  "display": "(Acquisition)#(USD 122759)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 12400000000)",
                  "display": "(Acquisition)#(USD 12400000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 12500000000)",
                  "display": "(Acquisition)#(USD 12500000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 13000000)",
                  "display": "(Acquisition)#(USD 13000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 140000000)",
                  "display": "(Acquisition)#(USD 140000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 1400000000)",
                  "display": "(Acquisition)#(USD 1400000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 149200000)",
                  "display": "(Acquisition)#(USD 149200000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 15)",
                  "display": "(Acquisition)#(USD 15)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 15300000000)",
                  "display": "(Acquisition)#(USD 15300000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 156000000)",
                  "display": "(Acquisition)#(USD 156000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 1600000000)",
                  "display": "(Acquisition)#(USD 1600000000)",
                  "count": 1
              },
              {
                  "value": "(ACQUISITION)#(USD 16000000000)",
                  "display": "(Acquisition)#(USD 16000000000)",
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
                  "count": 499
              }
          ]
      },
      {
          "name": "MatchingPartnames",
          "column": "matchingpartnames",
          "items": [
              {
                  "value": "text",
                  "count": 498
              },
              {
                  "value": "tables",
                  "count": 27
              },
              {
                  "value": "title",
                  "count": 13
              }
          ]
      },
      {
          "name": "Company_Person_Cooc",
          "column": "entity19",
          "items": [
              {
                  "value": "(APPLE)#(STEVE WOZNIAK)",
                  "display": "(Apple)#(Steve Wozniak)",
                  "count": 11
              },
              {
                  "value": "(TESLA MOTORS)#(ELON MUSK)",
                  "display": "(Tesla Motors)#(Elon Musk)",
                  "count": 10
              },
              {
                  "value": "(APPLE)#(STEVE JOBS)",
                  "display": "(Apple)#(Steve Jobs)",
                  "count": 9
              },
              {
                  "value": "(FERRARIS)#(NIKOLA TESLA)",
                  "display": "(Ferraris)#(Nikola Tesla)",
                  "count": 9
              },
              {
                  "value": "(GOOGLE)#(SERGEY BRIN)",
                  "display": "(Google)#(Sergey Brin)",
                  "count": 9
              },
              {
                  "value": "(GOOGLE)#(ERIC SCHMIDT)",
                  "display": "(Google)#(Eric Schmidt)",
                  "count": 8
              },
              {
                  "value": "(INTEL)#(FEDERICO FAGGIN)",
                  "display": "(Intel)#(Federico Faggin)",
                  "count": 8
              },
              {
                  "value": "(GOOGLE)#(LARRY PAGE)",
                  "display": "(Google)#(Larry Page)",
                  "count": 7
              },
              {
                  "value": "(INTEL)#(MASATOSHI SHIMA)",
                  "display": "(Intel)#(Masatoshi Shima)",
                  "count": 7
              },
              {
                  "value": "(FACEBOOK)#(MARK ZUCKERBERG)",
                  "display": "(Facebook)#(Mark Zuckerberg)",
                  "count": 6
              },
              {
                  "value": "(ORACLE)#(LARRY ELLISON)",
                  "display": "(Oracle)#(Larry Ellison)",
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
                  "count": 0
              },
              {
                  "value": "size`10 Ko à 100 Ko`:(>= 10240 AND < 102400)",
                  "display": "10 Ko à 100 Ko",
                  "count": 52
              },
              {
                  "value": "size`100 Ko à 1 Mo`:(>= 102400 AND < 1048576)",
                  "display": "100 Ko à 1 Mo",
                  "count": 404
              },
              {
                  "value": "size`1 Mo à 10 Mo`:(>= 1048576 AND < 10485760)",
                  "display": "1 Mo à 10 Mo",
                  "count": 43
              },
              {
                  "value": "size`> 10 Mo`:(>= 10485760 AND < 2147483646)",
                  "display": "> 10 Mo",
                  "count": 0
              }
          ]
      },
      {
          "name": "Person_Job_Company_Cooc",
          "column": "entity20",
          "items": [
              {
                  "value": "(ELON MUSK)#(CHIEF EXECUTIVE OFFICER)#(TESLA MOTORS)",
                  "display": "(Elon Musk)#(Chief Executive Officer)#(Tesla Motors)",
                  "count": 7
              },
              {
                  "value": "(SERGEY BRIN)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Sergey Brin)#(Co-founder)#(Google)",
                  "count": 6
              },
              {
                  "value": "(STEVE WOZNIAK)#(CO-FOUNDER)#(APPLE)",
                  "display": "(Steve Wozniak)#(Co-founder)#(Apple)",
                  "count": 6
              },
              {
                  "value": "(LARRY PAGE)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Larry Page)#(Co-founder)#(Google)",
                  "count": 5
              },
              {
                  "value": "(BRIAN KRZANICH)#(CHIEF EXECUTIVE OFFICER)#(INTEL)",
                  "display": "(Brian Krzanich)#(Chief Executive Officer)#(Intel)",
                  "count": 3
              },
              {
                  "value": "(ERIC SCHMIDT)#(CHIEF EXECUTIVE OFFICER)#(GOOGLE)",
                  "display": "(Eric Schmidt)#(Chief Executive Officer)#(Google)",
                  "count": 3
              },
              {
                  "value": "(GORDON MOORE)#(CO-FOUNDER)#(INTEL)",
                  "display": "(Gordon Moore)#(Co-founder)#(Intel)",
                  "count": 3
              },
              {
                  "value": "(MARK ZUCKERBERG)#(CHIEF EXECUTIVE OFFICER)#(FACEBOOK)",
                  "display": "(Mark Zuckerberg)#(Chief Executive Officer)#(Facebook)",
                  "count": 3
              },
              {
                  "value": "(MARK ZUCKERBERG)#(FOUNDER)#(FACEBOOK)",
                  "display": "(Mark Zuckerberg)#(Founder)#(Facebook)",
                  "count": 3
              },
              {
                  "value": "(PIERRE OMIDYAR)#(FOUNDER)#(EBAY)",
                  "display": "(Pierre Omidyar)#(Founder)#(eBay)",
                  "count": 3
              },
              {
                  "value": "(SATYA NADELLA)#(CHIEF EXECUTIVE OFFICER)#(MICROSOFT)",
                  "display": "(Satya Nadella)#(Chief Executive Officer)#(Microsoft)",
                  "count": 3
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
                  "value": "modified`Depuis hier`:>= 2022-02-13",
                  "display": "Depuis hier",
                  "count": 0
              },
              {
                  "value": "modified`Cette semaine`:>= 2022-02-14",
                  "display": "Cette semaine",
                  "count": 0
              },
              {
                  "value": "modified`Ce mois ci`:>= 2022-02-01",
                  "display": "Ce mois ci",
                  "count": 0
              },
              {
                  "value": "modified`Cette année`:>= 2022-01-01",
                  "display": "Cette année",
                  "count": 0
              },
              {
                  "value": "modified`Avant cette année`:< 2022-01-01",
                  "display": "Avant cette année",
                  "count": 499
              }
          ]
      }
  ],
  "id": "412D3A2E6E1C48169E1B403CA4DE83B8",
  "rowCount": 499,
  "totalRowCount": 499,
  "cursorRowCount": 20,
  "page": 1,
  "pageSize": 20,
  "columnCount": 87,
  "sort": "relevance",
  "attributes": {
      "cachehit": "1",
      "searchguid": "CC6296105F7E41B798EE6C99E86845B0",
      "rowfetchtime": "0.02 ms",
      "processingtime": "2.26 ms",
      "internalquerylog": "<QueryLog>\t<timing name='AcqMRdLk' duration='0.00 ms' start='2.87 ms' tid='15'/>\n\t<timing name='AcqDBRdLk' duration='0.00 ms' start='2.89 ms' tid='15'/>\n\t<timing name='QueryProcessor::Parse' duration='2.62 ms' start='0.17 ms' tid='15'/>\n<Info Type='AutoOpt.SetOrderBySize' value='500'/>\n<Info Type='AutoOpt.MaxQueryHits' value='500'/>\n<IndexSearch index='SinequaDoc'>\n\t<timing name='AcqRLk' duration='0.00 ms' start='4.87 ms' tid='15'/>\n\t<timing name='Fetching DBQuery' duration='0.03 ms' start='4.93 ms' tid='15'/>\n\t<timing name='GetKeywords' duration='0.06 ms' start='5.00 ms' tid='15'/>\n\t<timing name='HeliumMatcher::HeliumMatcher' duration='0.24 ms' start='5.09 ms' tid='15'/>\n\t<timing name='Searching idx #0' duration='0.01 ms' start='5.36 ms' tid='15'/>\n\t<timing name='PSearching [1-139643[' duration='0.02 ms' start='5.36 ms' tid='15'/>\n\t<timing name='SearcherContext::FinalMergeAndSort' duration='0.00 ms' start='5.39 ms' tid='15'/>\n\t<timing name='FinalMergeAndSort [1-139643[' duration='0.01 ms' start='5.39 ms' tid='15'/>\n\t<timing name='MergeContexts' duration='0.00 ms' start='5.40 ms' tid='15'/>\n\t<timing name='FullTextSearchRWA' duration='0.48 ms' start='4.97 ms' tid='15'/>\n\t<timing name='SearchRWA' duration='0.56 ms' start='4.90 ms' tid='15'/>\n</IndexSearch><IndexSearch index='Wikipedia'>\n\t<timing name='AcqRLk' duration='0.00 ms' start='4.88 ms' tid='9'/>\n\t<timing name='Fetching DBQuery' duration='0.03 ms' start='4.92 ms' tid='9'/>\n\t<timing name='GetKeywords' duration='0.13 ms' start='4.98 ms' tid='9'/>\n\t<timing name='HeliumMatcher::HeliumMatcher' duration='0.05 ms' start='5.14 ms' tid='9'/>\n\t<timing name='Searching idx #0' duration='0.59 ms' start='5.24 ms' tid='9'/>\n\t<timing name='Searching idx #1' duration='0.19 ms' start='5.84 ms' tid='9'/>\n\t<timing name='Searching idx #2' duration='0.02 ms' start='6.04 ms' tid='9'/>\n\t<timing name='Searching idx #3' duration='0.06 ms' start='6.07 ms' tid='9'/>\n\t<timing name='Searching idx #4' duration='0.00 ms' start='6.13 ms' tid='9'/>\n\t<timing name='Searching idx #5' duration='0.00 ms' start='6.15 ms' tid='9'/>\n\t<timing name='PSearching [1-83930[' duration='0.92 ms' start='5.23 ms' tid='9'/>\n\t<timing name='SearcherContext::FinalMergeAndSort' duration='0.15 ms' start='6.16 ms' tid='9'/>\n\t<timing name='FinalMergeAndSort [1-83930[' duration='0.16 ms' start='6.16 ms' tid='9'/>\n\t<timing name='MergeContexts' duration='0.04 ms' start='6.32 ms' tid='9'/>\n\t<timing name='FullTextSearchRWA' duration='1.45 ms' start='4.96 ms' tid='9'/>\n\t<timing name='SearchRWA' duration='1.52 ms' start='4.90 ms' tid='9'/>\n</IndexSearch><IndexSearch index='Press'>\n\t<timing name='AcqRLk' duration='0.00 ms' start='4.89 ms' tid='16'/>\n\t<timing name='Fetching DBQuery' duration='0.03 ms' start='4.92 ms' tid='16'/>\n\t<timing name='GetKeywords' duration='0.04 ms' start='4.99 ms' tid='16'/>\n\t<timing name='HeliumMatcher::HeliumMatcher' duration='0.03 ms' start='5.05 ms' tid='16'/>\n\t<timing name='Searching idx #0' duration='0.02 ms' start='5.11 ms' tid='16'/>\n\t<timing name='PSearching [1-503[' duration='0.03 ms' start='5.11 ms' tid='16'/>\n\t<timing name='SearcherContext::FinalMergeAndSort' duration='0.00 ms' start='5.15 ms' tid='16'/>\n\t<timing name='FinalMergeAndSort [1-503[' duration='0.01 ms' start='5.15 ms' tid='16'/>\n\t<timing name='MergeContexts' duration='0.01 ms' start='5.17 ms' tid='16'/>\n\t<timing name='FullTextSearchRWA' duration='0.23 ms' start='4.97 ms' tid='16'/>\n\t<timing name='SearchRWA' duration='0.30 ms' start='4.91 ms' tid='16'/>\n</IndexSearch>\t<timing name='ConceptualizeDBRWA' duration='13.71 ms' start='6.65 ms' tid='15'/>\n\t<timing name='ComputeAttributeAggregates' duration='0.02 ms' start='20.38 ms' tid='15'/>\n\t<timing name='Grouper(AH-,GB+)' duration='0.16 ms' start='20.41 ms' tid='15'/>\n\t<timing name='correlation(geo,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true)' duration='0.35 ms' start='20.58 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='21.81 ms' tid='15'/>\n\t<timing name='distribution(entity4,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.91 ms' start='20.93 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='22.16 ms' tid='15'/>\n\t<timing name='distribution(title,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.46 ms' start='21.85 ms' tid='15'/>\n\t<timing name='correlation(person,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true)' duration='0.59 ms' start='22.31 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='22.94 ms' tid='15'/>\n\t<timing name='distribution(authors,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.04 ms' start='22.91 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='22.98 ms' tid='15'/>\n\t<timing name='distribution(doctype,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.03 ms' start='22.95 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='23.02 ms' tid='15'/>\n\t<timing name='distribution(fileext,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.04 ms' start='22.99 ms' tid='15'/>\n\t<timing name='correlation(company,count=11,basicforms=true,labels=true,order2=labelasc,scores=false,freq=true,limit=100,order=scoredesc,post-group-by=true,merge-groups=true)' duration='0.25 ms' start='23.03 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='23.69 ms' tid='15'/>\n\t<timing name='distribution(filename,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.60 ms' start='23.29 ms' tid='15'/>\n\t<timing name='distribution(modified,basicforms=true,labels=false,order2=labelasc,order=keyasc,mask=YYYY-WW,post-group-by=true,merge-groups=true)' duration='0.10 ms' start='23.89 ms' tid='15'/>\n\t<timing name='TreePathSort of 4 items' duration='0.00 ms' start='24.05 ms' tid='15'/>\n\t<timing name='BuildResultStringTreePath' duration='0.00 ms' start='24.06 ms' tid='15'/>\n\t<timing name='distribution(treepath,basicforms=false,labels=true,maxcount=20,minlevel=2,wantmore=true,order=labelasc,post-group-by=true,merge-groups=true)' duration='0.07 ms' start='24.00 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='24.11 ms' tid='15'/>\n\t<timing name='distribution(docformat,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.05 ms' start='24.07 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='24.31 ms' tid='15'/>\n\t<timing name='distribution(sourcestr4,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.24 ms' start='24.12 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='24.39 ms' tid='15'/>\n\t<timing name='distribution(enginecsv1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.04 ms' start='24.36 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='24.73 ms' tid='15'/>\n\t<timing name='distribution(entity18,count=101,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.66 ms' start='24.40 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='25.10 ms' tid='15'/>\n\t<timing name='distribution(engineusercsv1,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true,prefixes=&quot;internal|S-1-5-21-2165854416-2067547654-1784818317-6655|&quot;)' duration='0.04 ms' start='25.07 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.00 ms' start='25.15 ms' tid='15'/>\n\t<timing name='distribution(documentlanguages,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.04 ms' start='25.11 ms' tid='15'/>\n\t<timing name='distribution(matchingpartnames,count=11,basicforms=true,labels=false,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.06 ms' start='25.16 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='26.59 ms' tid='15'/>\n\t<timing name='distribution(entity19,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='1.47 ms' start='25.22 ms' tid='15'/>\n\t<timing name='distribution(size,bounds=&quot;0;10240;102400;1048576;10485760;2147483646,order=freqdesc&quot;,post-group-by=true,merge-groups=true,count=11)' duration='0.07 ms' start='26.70 ms' tid='15'/>\n\t<timing name='TruncateItems' duration='0.01 ms' start='27.04 ms' tid='15'/>\n\t<timing name='distribution(entity20,count=11,basicforms=true,labels=true,order2=labelasc,order=freqdesc,post-group-by=true,merge-groups=true)' duration='0.34 ms' start='26.78 ms' tid='15'/>\n\t<timing name='distribution(modified,bounds=&quot;2022-01-01;2022-02-01;2022-02-13;2022-02-14,order=freqdesc&quot;,post-group-by=true,merge-groups=true,count=11)' duration='0.06 ms' start='27.12 ms' tid='15'/>\n\t<timing name='ComputeAttributeAggregates' duration='6.62 ms' start='20.57 ms' tid='15'/>\n</QueryLog>",
      "matchingrowcount": "711",
      "internalqueryanalysis": "<?xml version='1.0' encoding='utf-8' standalone='yes' ?>\n<deep-query>\n<text>tesla<tree>\n<word><surface-form>tesla</surface-form><image>tesla</image><form language=\"fr\" weight=\"1.0000\">tesla<base-form>tesla</base-form></form>\n</word>\n</tree>\n</text>\n\n<semantic-descriptors>\n<descriptor id=\"56\" value=\"1\" />\n</semantic-descriptors><analysis></analysis><DYM><text form=\"tesla\" /></DYM></deep-query>",
      "postgroupbymatchingrowcount": "499"
  },
  "records": [
      {
          "id": "/Web/Wikipedia/|Nikola_Tesla",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 1.034269,
          "matchingpartnames": [
              "text",
              "tables",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "Nikola {b}Tesla{nb} ( /ˈtɛslə/",
              "2,25",
              "23824,544",
              "Born and raised in the Austrian Empire , {b}Tesla{nb} studied engineering and physics in the 1870s without receiving a degree, and gained practical experience in the early 1880s working in telephony and at Continental Edison in the new electric power industry .",
              "332,254",
              "26207,436",
              "With the help of partners to finance and market his ideas, {b}Tesla{nb} set up laboratories and companies in New York to develop a range of electrical and mechanical devices.",
              "774,167",
              "26901,167",
              "Attempting to develop inventions he could patent and market, {b}Tesla{nb} conducted a range of experiments with mechanical oscillators/generators, electrical discharge tubes, and early X-ray imaging.",
              "1198,192",
              "27617,192",
              "{b}Tesla{nb} became well known as an inventor and demonstrated his achievements to celebrities and wealthy patrons at his lab, and was noted for his showmanship at public lectures.",
              "1466,173",
              "27885,173",
              "Throughout the 1890s, {b}Tesla{nb} pursued his ideas for wireless lighting and worldwide wireless electric power distribution in his high-voltage, high-frequency power experiments in New York and Colorado Springs .",
              "1640,207",
              "28059,288",
              "{b}Tesla{nb} tried to put these ideas to practical use in his unfinished Wardenclyffe Tower project, an intercontinental wireless communication and power transmitter, but ran out of funding before he could complete it.",
              "1943,211",
              "28537,277",
              "After Wardenclyffe, {b}Tesla{nb} experimented with a series of inventions in the 1910s and 1920s with varying degrees of success.",
              "2156,122",
              "28964,122",
              "Having spent most of his money, {b}Tesla{nb} lived in a series of New York hotels, leaving behind unpaid bills.",
              "2279,104",
              "29087,104",
              "There has been a resurgence in popular interest in {b}Tesla{nb} since the 1990s.",
              "2620,73",
              "29985,73"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "9,5,80,5,373,5,833,5,1259,5,1466,5,1662,5,1943,5,2176,5,2311,5,2426,5,2600,5,2671,5,2717,5,2968,5,3015,5,3204,5,3255,5,3498,5,3595,5,3659,5,3828,5,3858,5,3963,5,4011,5,4120,5,4318,5,4393,5,4496,5,4619,5,4812,5,4954,5,5146,5,5331,5,5573,5,5679,5,6001,5,6079,5,6133,5,6329,5,6450,5,6515,5,6598,5,6734,5,6893,5,7078,5,7120,5,7292,5,7459,5,7613,5,7723,5,7854,5,7947,5,8220,5,8399,5,8535,5,8758,5,8833,5,9058,5,9122,5,9314,5,9909,5,10302,5,10363,5,10681,5,10793,5,10898,5,11115,5,11267,5,11574,5,11780,5,12045,5,12165,5,12453,5,12713,5,12932,5,13009,5,13273,5,13405,5,13423,5,13462,5,13590,5,13670,5,13810,5,14121,5,14173,5,14396,5,14661,5,14720,5,14937,5,15115,5,15223,5,15311,5,15467,5,15804,5,16493,5,16702,5,17078,5,17136,5,17314,5,17491,5,17688,5,17981,5,18031,5,18112,5,18238,5,18886,5,18974,5,19435,5,19470,5,19795,5,19939,5,20115,5,20246,5,20473,5,20528,5,20670,5,21021,5,21112,5,21147,5,21342,5,21480,5,21782,5,22022,5,22263,5,22355,5,22388,5,22578,5,22700,5,23283,5,23487,5,23754,5,23955,5,24270,5,24314,5,24418,5,25005,5,25255,5,25477,5,26204,5,26450,5,27212,5,27575,5,27651,5,27963,5,28201,5,28286,5,28331,5,28404,5,28788,5,28925,5,29012,5,29105,5,29309,5,29404,5,29524,5,29566,5,29870,5,30229,5,30440,5,30639,5,30769,5,30830,5,30993,5,31377,5,31617,5,31840,5,32043,5,32216,5,32388,5,32640,5,32849,5,32993,5,33451,5,33610,5,33884,5,34199,5,34850,5,34947,5,35407,5,35509,5,35747,5,36490,5,36782,5,37342,5,37443,5,37984,5,38043,5,38114,5,38206,5,38806,5,38925,5,39186,5,39282,5,39443,5,39579,5,39717,5,39903,5,40054,5,40122,5,40136,5,40480,5,40544,5,40634,5,41193,5,41258,5,41473,5,41618,5,41766,5,42384,5,42536,5,42921,5,42958,5,43214,5,43640,5,43938,5,44254,5,44288,5,44663,5,44749,5,44842,5,44926,5,45749,5,45788,5,45889,5,45954,5,46145,5,46502,5,46738,5,46794,5,46944,5,47222,5,47413,5,47529,5,47714,5,47956,5,48191,5,48307,5,48551,5,48913,5,49292,5,49572,5,50056,5,50095,5,50248,5,50309,5,50398,5,50494,5,50808,5,51143,5,51206,5,51295,5,51827,5,51983,5,52140,5,52263,5,52625,5,52778,5,53653,5,53810,5,54034,5,54203,5,54407,5,54534,5,54659,5,54713,5,54981,5,55178,5,55370,5,55721,5,55814,5,55881,5,56201,5,56280,5,56585,5,56617,5,56747,5,56880,5,56905,5,56977,5,57150,5,57181,5,57344,5,57410,5,57464,5,58083,5,58310,5,58421,5,58831,5,59109,5,59207,5,59615,5,60311,5,60437,5,60597,5,60905,5,61109,5,61274,5,61402,5,61541,5,61704,5,61804,5,61878,5,62075,5,62171,5,62891,5,63074,5,63262,5,63348,5,63385,5,63438,5,63557,5,63774,5,63936,5,64211,5,64278,5,64502,5,64742,5,64822,5,64986,5,65347,5,65548,5,66166,5,66662,5,66680,5,66848,5,66954,5,67841,5,68094,5,68311,5,68410,5,68985,5,69119,5,69214,5,69287,5,69358,5,69382,5,69695,5,69730,5,69764,5,69922,5,70006,5,70032,5,70076,5,70147,5,70300,5,70394,5,70446,5,70570,5,70651,5,70715,5,70742,5,70771,5,70917,5,70988,5,71026,5,71065,5,71123,5,71217,5,71277,5,71299,5,71344,5,71438,5,71536,5,71605,5,71636,5,71678,5,71839,5,71952,5,72116,5,72154,5,72205,5,72288,5,72369,5,72566,5,73017,5,73209,5,73285,5,73546,5,73746,5,73977,5,74146,5,74666,5,74734,5,74816,5,74916,5,74930,5,75196,5,75260,5,75440,5,75523,5,75642,5,75690,5,75902,5,76047,5,76061,5,76122,5,76191,5,76253,5,76299,5,76353,5,76406,5,76449,5;23831,5,24832,6,26307,5,26960,5,27678,5,27885,5,28081,5,28537,5,28984,5,29119,5,29350,5,29844,5,30036,5,57712,5,59086,5,59153,5,60042,5,62200,5,62686,5,63157,5,63398,5,63567,5,63760,5,64056,5,64152,5,64408,5,65590,5,65805,5,66025,5,66311,5,66844,5,67029,5,67624,5,68185,5,68762,5,68994,5,70080,5,70215,5,70275,5,70771,5,70892,5,70957,5,71320,5,71456,5,71682,5,72784,5,72920,5,73515,5,73888,5,74434,5,74551,5,74946,5,75193,5,75694,5,76347,5,76708,5,76931,5,77154,5,77677,5,77898,5,78133,5,80045,5,80854,5,81078,5,81852,5,82081,5,82411,5,82752,5,83074,5,83736,5,84121,5,84728,5,85190,5,85595,5,87007,5,87663,5,87758,5,88541,5,88673,5,88815,5,89022,5,89150,5,89458,5,89604,5,90146,5,90361,5,90747,5,92118,5,92197,5,92633,5,93056,5,93164,5,93415,5,93577,5,94254,5,96007,5,96674,5,97113,5,98170,5,98531,5,98708,5,99276,5,99569,5,99619,5,99700,5,100202,5,101591,5,101830,5,102585,5,102946,5,104026,5,104170,5,104509,5,104980,5,106633,5,106708,5,106967,5,107723,5,107864,5,108177,5,108812,5,108950,5,109406,5,109857,5,110923,5,111482,5,112471,5,112890,5,113012,5,114418,5,114942,5,116676,5,117045,5,117651,5,117695,5,118031,5,119076,5,119541,5,120145,5,121570,5,122331,5,124071,5,124434,5,124510,5,124822,5,125304,5,125403,5,125448,5,125521,5,126085,5,126284,5,126371,5,126464,5,126668,5,126984,5,128904,5,128966,5,129557,5,130877,5,131399,5,131650,5,131851,5,131912,5,132206,5,132683,5,133392,5,133635,5,133838,5,134247,5,134766,5,135406,5,136960,5,137124,5,137663,5,137822,5,138668,5,139157,5,142209,5,142326,5,143995,5,144097,5,146008,5,147633,5,148475,5,149529,5,149959,5,150697,5,151903,5,151974,5,152086,5,153569,5,153688,5,154355,5,154451,5,154780,5,154916,5,155203,5,155583,5,155854,5,156000,5,156134,5,156886,5,156950,5,157040,5,159000,5,159085,5,159537,5,160122,5,160390,5,161759,5,162251,5,162696,5,163137,5,163781,5,164837,5,165731,5,166385,5,166419,5,166794,5,167211,5,167304,5,167707,5,172287,5,172346,5,172486,5,172551,5,173036,5,173393,5,173966,5,174022,5,174260,5,174697,5,175074,5,175190,5,175547,5,176158,5,176751,5,176941,5,177891,5,178841,5,179482,5,180306,5,181468,5,181507,5,181802,5,182792,5,182968,5,183247,5,184015,5,185434,5,185517,5,185835,5,186493,5,187120,5,187277,5,187464,5,188471,5,188969,5,190772,5,191185,5,191473,5,191642,5,191846,5,192316,5,192441,5,192495,5,193174,5,193729,5,194192,5,194716,5,195750,5,195922,5,196623,5,196796,5,197448,5,197481,5,197760,5,198105,5,198632,5,198840,5,199149,5,199180,5,199663,5,200662,5,200796,5,202199,5,203089,5,203200,5,203938,5,204297,5,204626,5,205198,5,206185,5,206317,5,207067,5,207786,5,208221,5,209148,5,209475,5,209854,5,210275,5,210510,5,210830,5,211193,5,211509,5,212651,5,213211,5,213669,5,213931,5,213968,5,214021,5,214150,5,214603,5,214985,5,215265,5,215557,5,216017,5,216257,5,216485,5,217064,5,217832,5,218261,5,219386,5,221249,5,221287,5,221954,5,222177,5,223336,5,223844,5,224181,5,224542,5,225621,5,226000,5,226102,5,226304,5,226461,5,226494,5,227127,5,228586,5,228644,5,228802,5,228950,5,229471,5,229814,5,229944,5,230349,5,230828,5,231037,5,231169,5,231278,5,231518,5,231727,5,231934,5,232307,5,232555,5,232721,5,232931,5,233231,5,233480,5,233723,5,233941,5,234342,5,234447,5,234967,5,235239,5,236242,5,236433,5,237030,5,237313,5,239257,5,240342,5,240492,5,240575,5,240977,5,241532,5,242283,5,242922,5,243073,5,243692,5,244033,5,244750,5,245306,5,246428,5,246501,5,246714,5,246943,5,246957,5,247526,5,247718,5,248100,5,248183,5,248430,5,248747,5,249337,5,750064,5,750174,5,750372,5,750571,5,750796,5,751403,5,751563,5,752178,5,752376,5"
                  },
                  {
                      "partname": "tables",
                      "data": "76530,5,76551,5,76728,5,77234,5,77245,5,77272,5,77291,5,77305,5;983729,5,983761,5,983946,5,984466,5,984477,5,984504,5,984523,5,984537,5"
                  },
                  {
                      "partname": "title",
                      "data": "78067,5;985385,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Nikola Tesla",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-01 11:14:11",
          "indexationtime": "2020-09-01 20:34:25",
          "version": "WSLHD/Yjm6Mlc8t9oPMO2w==",
          "size": 983613,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Nikola_Tesla",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "NIKOLA TESLA",
                  "display": "Nikola Tesla"
              },
              {
                  "value": "THOMAS EDISON",
                  "display": "Thomas Edison"
              },
              {
                  "value": "MARK TWAIN",
                  "display": "Mark Twain"
              },
              {
                  "value": "GEORGE WESTINGHOUSE",
                  "display": "George Westinghouse"
              },
              {
                  "value": "ARTHUR BRISBANE",
                  "display": "Arthur Brisbane"
              },
              {
                  "value": "ELLIOTT CRESSON",
                  "display": "Elliott Cresson"
              },
              {
                  "value": "JOHN SCOTT",
                  "display": "John Scott"
              },
              {
                  "value": "KENNETH SWEZEY",
                  "display": "Kenneth Swezey"
              },
              {
                  "value": "ROBERT UNDERWOOD",
                  "display": "Robert Underwood"
              },
              {
                  "value": "ALBERT EINSTEIN",
                  "display": "Albert Einstein"
              },
              {
                  "value": "ALFRED BROWN",
                  "display": "Alfred Brown"
              },
              {
                  "value": "ALFRED S. BROWN",
                  "display": "Alfred S. Brown"
              },
              {
                  "value": "ALICE MONAGHAN",
                  "display": "Alice Monaghan"
              },
              {
                  "value": "BEN JOHNSTON",
                  "display": "Ben Johnston"
              },
              {
                  "value": "BENJAMIN VAIL",
                  "display": "Benjamin Vail"
              },
              {
                  "value": "CHARLES BATCHELOR",
                  "display": "Charles Batchelor"
              },
              {
                  "value": "CHARLES F. COANEY",
                  "display": "Charles F. Coaney"
              },
              {
                  "value": "CHARLES F. SCOTT",
                  "display": "Charles F. Scott"
              },
              {
                  "value": "CHARLES PROTEUS STEINMETZ",
                  "display": "Charles Proteus Steinmetz"
              },
              {
                  "value": "CHARLOTTE MUZAR",
                  "display": "Charlotte Muzar"
              }
          ],
          "company": [
              {
                  "value": "MARCONI",
                  "display": "Marconi"
              },
              {
                  "value": "NEW YORK TIMES",
                  "display": "New York Times"
              },
              {
                  "value": "ERICSSON",
                  "display": "Ericsson"
              },
              {
                  "value": "REUTERS",
                  "display": "Reuters"
              },
              {
                  "value": "WESTERN UNION",
                  "display": "Western Union"
              },
              {
                  "value": "FERRARIS",
                  "display": "Ferraris"
              },
              {
                  "value": "WEMBLEY",
                  "display": "Wembley"
              }
          ],
          "geo": [
              {
                  "value": "NEW YORK",
                  "display": "New York"
              },
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "CROATIA",
                  "display": "Croatia"
              },
              {
                  "value": "SERBIA",
                  "display": "Serbia"
              },
              {
                  "value": "BELGRADE",
                  "display": "Belgrade"
              },
              {
                  "value": "NIAGARA FALLS",
                  "display": "Niagara Falls"
              },
              {
                  "value": "COLORADO SPRINGS",
                  "display": "Colorado Springs"
              },
              {
                  "value": "PARIS",
                  "display": "Paris"
              },
              {
                  "value": "YUGOSLAVIA",
                  "display": "Yugoslavia"
              },
              {
                  "value": "ZAGREB",
                  "display": "Zagreb"
              },
              {
                  "value": "ONTARIO",
                  "display": "Ontario"
              },
              {
                  "value": "BUDAPEST",
                  "display": "Budapest"
              },
              {
                  "value": "UNITED KINGDOM",
                  "display": "United Kingdom"
              },
              {
                  "value": "CHICAGO",
                  "display": "Chicago"
              },
              {
                  "value": "LONDON",
                  "display": "London"
              },
              {
                  "value": "EUROPE",
                  "display": "Europe"
              },
              {
                  "value": "FRANCE",
                  "display": "France"
              },
              {
                  "value": "GERMANY",
                  "display": "Germany"
              },
              {
                  "value": "GRAZ",
                  "display": "Graz"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              }
          ],
          "wordcount": 8581,
          "exacthash": "sAXAzJqeXoLjSyx9+W9DyA==",
          "nearhash": "1F2jNSMyCI+kxHcX2LMysw==",
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
          "url1": "https://en.wikipedia.org/wiki/Nikola_Tesla",
          "sourcecsv1": [
              "Nikola Tesla",
              "Born",
              "Died",
              "Resting place",
              "Citizenship",
              "Education",
              "Discipline",
              "Projects",
              "Significant design",
              "Awards",
              "External video"
          ],
          "sourcecsv2": [
              "Nikola_Tesla_(disambiguation)",
              "Smiljan",
              "Austrian_Empire",
              "Croatia",
              "New_York_City",
              "United_States",
              "Nikola_Tesla_Museum",
              "Belgrade",
              "Serbia",
              "Graz_University_of_Technology",
              "Alternating_current",
              "AC_motor",
              "Carbon_button_lamp",
              "Death_ray",
              "Induction_motor",
              "Plasma_globe",
              "Plasma_lamp",
              "Polyphase_system",
              "Radio_control",
              "Resonant_inductive_coupling",
              "Rotating_magnetic_field",
              "Teleforce",
              "Telegeodynamics",
              "Teleoperation",
              "Tesla_coil",
              "Tesla_Experimental_Station",
              "Tesla%27s_oscillator",
              "Tesla_turbine",
              "Tesla_valve",
              "Torpedo",
              "Vacuum_variable_capacitor",
              "Violet_ray",
              "VTOL",
              "Wardenclyffe_Tower",
              "Wireless_power_transfer",
              "World_Wireless_System",
              "Order_of_St._Sava",
              "Elliott_Cresson_Medal",
              "Order_of_Prince_Danilo_I",
              "Edison_Medal",
              "Order_of_the_Yugoslav_Crown",
              "John_Scott_Medal",
              "Order_of_the_White_Eagle_(Serbia)",
              "Order_of_the_White_Lion",
              "Sofia,_Bulgaria",
              "Serbian_Cyrillic_alphabet",
              "Serbian-American",
              "Inventor",
              "Electrical_engineer",
              "Mechanical_engineering",
              "Futurist",
              "Electricity_supply",
              "Telephony",
              "Electric_power_industry",
              "Edison_Machine_Works",
              "Westinghouse_Electric_Corporation",
              "Colorado_Springs,_Colorado",
              "Wireless_communication",
              "General_Conference_on_Weights_and_Measures",
              "SI_unit",
              "Magnetic_flux_density",
              "Tesla_(unit)",
              "Yugoslav_Wars",
              "Serbs",
              "Military_Frontier",
              "Old_Style_and_New_Style_dates",
              "Eastern_Orthodox_Church",
              "Serbian_epic_poetry",
              "Eidetic_memory",
              "Gospi%C4%87",
              "Karlovac",
              "Gymnasium_Karlovac",
              "Integral",
              "Cholera",
              "Conscription",
              "Austro-Hungarian_Army",
              "Tomingaj",
              "Gra%C4%8Dac",
              "Mark_Twain",
              "Graz",
              "Gramme_machine",
              "Billiards",
              "Mur_River",
              "Maribor",
              "Nervous_breakdown",
              "Prague",
              "Charles_University_in_Prague",
              "Czech_(language)",
              "Budapest",
              "Kingdom_of_Hungary",
              "Tivadar_Pusk%C3%A1s",
              "Telegraphy",
              "Repeater",
              "Amplifier",
              "Paris",
              "Utility",
              "Ivry-sur-Seine",
              "Dynamo",
              "Tenement",
              "Charles_Batchelor",
              "Manhattan",
              "Lower_East_Side",
              "Thomas_Edison",
              "Autobiography",
              "SS_Oregon_(1883)",
              "Arc_lamp",
              "Tesla_Electric_Light_%26_Manufacturing",
              "Rahway,_New_Jersey",
              "Western_Union",
              "Thermo-magnetic_motor",
              "High-voltage",
              "Commutator_(electric)",
              "William_Arnold_Anthony",
              "Thomas_Commerford_Martin",
              "George_Westinghouse",
              "Galileo_Ferraris",
              "Electric_generator",
              "Pittsburgh",
              "Traction_motor",
              "Thomson-Houston_Electric_Company",
              "War_of_currents",
              "Direct_current",
              "Barings_Bank",
              "Panic_of_1890",
              "Lump_sum",
              "General_Electric",
              "Fifth_Avenue",
              "Houston_Street",
              "Exposition_Universelle_(1889)",
              "Heinrich_Hertz",
              "Electromagnetic_radiation",
              "Radio_wave",
              "Induction_coil",
              "Alternator",
              "Voltage",
              "Electric_current",
              "Frequency",
              "Resonant_transformer",
              "Naturalization",
              "Columbia_College_(New_York)",
              "Geissler_tube",
              "Neon_light",
              "Near_and_far_field",
              "St._Louis",
              "Franklin_Institute",
              "Philadelphia",
              "National_Electric_Light_Association",
              "American_Institute_of_Electrical_Engineers",
              "IEEE",
              "Institute_of_Radio_Engineers",
              "Charles_F._Scott_(engineer)",
              "Benjamin_G._Lamme",
              "Rotary_converter",
              "Priority_right",
              "World%27s_Columbian_Exposition",
              "Tesla%27s_Egg_of_Columbus",
              "International_Electrical_Congress",
              "Gas-discharge_lamp",
              "Magnetic_field",
              "Electromagnetic_induction",
              "Edward_Dean_Adams",
              "Niagara_Falls",
              "Cataract_Construction_Company",
              "The_New_York_Times",
              "X-Rays",
              "Crookes_tube",
              "Cold_cathode",
              "Wilhelm_R%C3%B6ntgen",
              "Radiography",
              "Vacuum_tube",
              "Bremsstrahlung",
              "Ozone",
              "Nitrous_acid",
              "Waves_in_plasmas",
              "Force-free_magnetic_field",
              "New_York_Herald_Tribune",
              "Coherer",
              "Madison_Square_Garden_(1890)",
              "Glide_bomb",
              "Chicago",
              "Magnifying_transmitter",
              "Colorado_Springs_Notes,_1899%E2%80%931900",
              "El_Paso_Power_Company",
              "John_Jacob_Astor_IV",
              "Wireless_telegraphy",
              "Pikes_Peak",
              "Multiple_exposure",
              "Red_Cross_Society",
              "Mars",
              "Venus",
              "Guglielmo_Marconi",
              "The_Century_Magazine",
              "Waldorf-Astoria",
              "The_Players_(New_York_City)",
              "Delmonico%27s",
              "J._Pierpont_Morgan",
              "Shoreham,_New_York",
              "Newfoundland_and_Labrador",
              "Wall_Street",
              "Marc_J._Seifer",
              "Metropolitan_Life_Insurance_Company_Tower",
              "Woolworth_Building",
              "Milwaukee",
              "Allis-Chalmers",
              "Speedometer",
              "World_War_I",
              "Germany",
              "Telefunken",
              "Jonathan_Zenneck",
              "Karl_Ferdinand_Braun",
              "Marconi_Company",
              "Supreme_Court_of_the_United_States",
              "Oliver_Lodge",
              "John_Stone_Stone",
              "Reuters",
              "Nobel_Prize_in_Physics",
              "Sir_William_Henry_Bragg",
              "William_Lawrence_Bragg",
              "Kingdom_of_Serbia",
              "United_States_of_America",
              "Principality_of_Montenegro",
              "AIEE_Edison_Medal",
              "Institute_of_Electrical_and_Electronics_Engineers",
              "Kingdom_of_Serbs,_Croats_and_Slovenes",
              "Kingdom_of_Yugoslavia",
              "Philadelphia_City_Council",
              "Czechoslovakia",
              "University_of_Paris",
              "Paris,_France",
              "Electrical_Experimenter",
              "Radar",
              "%C3%89mile_Girardeau",
              "Biplane",
              "Vertical_take-off_and_landing",
              "V-22_Osprey",
              "Waldorf_Astoria_New_York",
              "St._Regis_New_York",
              "Columbidae",
              "Hotel_Pennsylvania",
              "270_Park_Avenue",
              "Wyndham_New_Yorker_Hotel",
              "Time_(magazine)",
              "Kenneth_M._Swezey",
              "Albert_Einstein",
              "Time_magazine",
              "Electricity_generation",
              "Cosmic_ray",
              "Electrostatic",
              "United_States_Department_of_Defense",
              "Inductive_charging",
              "Lower_Manhattan",
              "Empire_State_Building",
              "Coronary_thrombosis",
              "Federal_Bureau_of_Investigation",
              "Alien_Property_Custodian",
              "John_G._Trump",
              "MIT",
              "National_Defense_Research_Committee",
              "Decade_Box",
              "Sphere",
              "Fiorello_La_Guardia",
              "Louis_Adamic",
              "WNYC",
              "Tamo_daleko",
              "Cathedral_of_St._John_the_Divine",
              "Ferncliff_Cemetery",
              "Trinity_Chapel_Complex",
              "List_of_Nikola_Tesla_patents",
              "United_Kingdom_of_Great_Britain_and_Ireland",
              "Canada",
              "Napoleon_Sarony",
              "Arthur_Brisbane",
              "Photographic_memory",
              "Polyglot_(person)",
              "Serbo-Croatian",
              "Czech_language",
              "Latin",
              "Picture_thinking",
              "Robert_Underwood_Johnson",
              "Julian_Hawthorne",
              "Francis_Marion_Crawford",
              "Stanford_White",
              "Sarah_Bernhardt",
              "Vivekananda",
              "Vedantic",
              "George_Sylvester_Viereck",
              "Nazi",
              "Chess",
              "Card_game",
              "Waldorf-Astoria_Hotel",
              "Subatomic_particle",
              "Electron",
              "Ether_(classical_element)",
              "Theory_of_relativity",
              "Humanism",
              "Scientist",
              "Selective_breeding",
              "Eugenics",
              "Gender_equality",
              "Queen_bee_(sociology)",
              "League_of_Nations",
              "Religious_fanaticism",
              "My_Inventions:_The_Autobiography_of_Nikola_Tesla",
              "The_Fantastic_Inventions_of_Nikola_Tesla",
              "David_Hatcher_Childress",
              "Nikola_Tesla_in_popular_culture",
              "List_of_things_named_after_Nikola_Tesla",
              "IEEE_Nikola_Tesla_Award",
              "Tesla_(Czechoslovak_company)",
              "Tesla,_Inc.",
              "Nikola_Motor_Company",
              "Class_8_truck",
              "Ericsson_Nikola_Tesla",
              "Sweden",
              "Telecommunication",
              "Ericsson",
              "Tesla_Electric_Light_and_Manufacturing",
              "Novi_Sad",
              "Plandi%C5%A1te",
              "Tesla_(band)",
              "Vojvodina",
              "Nikola_Tesla_Memorial_Center",
              "Belgrade_Nikola_Tesla_Airport",
              "TPP_Nikola_Tesla",
              "Tesla_(crater)",
              "2244_Tesla",
              "Tesla_STEM_High_School",
              "Redmond,_Washington",
              "Science,_technology,_engineering,_and_mathematics",
              "Tesla_Girls",
              "Orchestral_Manoeuvres_in_the_Dark",
              "Liberty_Ship",
              "Niagara_Falls,_Ontario",
              "Old_City_Hall_(Zagreb)",
              "Zagreb",
              "Power_station",
              "Croatian_language",
              "Donji_grad_(Zagreb)",
              "Ivan_Me%C5%A1trovi%C4%87",
              "Ru%C4%91er_Bo%C5%A1kovi%C4%87_Institute",
              "Niagara_Falls,_New_York",
              "Frano_Kr%C5%A1ini%C4%87",
              "University_of_Belgrade_Faculty_of_Electrical_Engineering",
              "Queen_Victoria_Park",
              "Hamilton,_Ontario",
              "Baku",
              "Ilham_Aliyev",
              "Tomislav_Nikoli%C4%87",
              "Tesla_Science_Center_at_Wardenclyffe",
              "The_Oatmeal",
              "Long_Island",
              "Sixth_Avenue",
              "40th_Street_(Manhattan)",
              "Bryant_Park",
              "Tesla_(microarchitecture)",
              "Nvidia",
              "Charles_Proteus_Steinmetz",
              "Atmospheric_electricity",
              "Adze",
              "Carpenter",
              "Random_House_Webster%27s_Unabridged_Dictionary",
              "John_Joseph_O%27Neill_(journalist)",
              "Prodigal_Genius:_The_Life_of_Nikola_Tesla",
              "ISBN_(identifier)",
              "Martin_Sekuli%C4%87",
              "Allen_Kent",
              "Questia",
              "Pbs.org",
              "Wayback_Machine",
              "Collier%27s_Weekly",
              "Project_Gutenberg",
              "Slaven_Letica",
              "Nenad_Bach",
              "ISSN_(identifier)",
              "OCLC_(identifier)",
              "C-SPAN",
              "Capstone_Publishers",
              "Princeton_University_Press",
              "Simon_%26_Schuster",
              "Barnes_%26_Noble_Books",
              "Twenty-First_Century_Books",
              "Random_House",
              "ABC-CLIO",
              "HarperCollins",
              "My_Inventions",
              "Robert_Lomas",
              "The_Man_Who_Invented_the_Twentieth_Century",
              "The_Inventions,_Researches,_and_Writings_of_Nikola_Tesla",
              "F._David_Peat",
              "In_Search_of_Nikola_Tesla",
              "Doi_(identifier)",
              "Scientific_American",
              "The_New_American",
              "Omni_(magazine)",
              "Popular_Electronics",
              "Anil_K._Rajvanshi",
              "The_AWA_Review",
              "Rade_Serbedzija",
              "Krsto_Papi%C4%87",
              "Petar_Bo%C5%BEovi%C4%87",
              "Orson_Welles",
              "J.P._Morgan",
              "Stacy_Keach",
              "Tesla_(2016_film)",
              "David_Grubin",
              "American_Experience",
              "Tesla_(2020_film)",
              "Biographical_film",
              "Michael_Almereyda",
              "2020_Sundance_Film_Festival",
              "Internet_Archive",
              "LibriVox",
              "History_of_the_Tesla_coil",
              "Wireless_power",
              "Three-phase_electric_power",
              "Fragments_of_Olympian_Gossip",
              "War_of_the_currents",
              "Nikola_Tesla_Satellite_Award",
              "The_Secret_of_Nikola_Tesla",
              "Tesla_-_Lightning_in_His_Hand",
              "The_Prestige_(film)",
              "Tower_to_the_People",
              "The_Tesla_World_Light",
              "The_Current_War",
              "Nikola_Tesla%27s_Night_of_Terror",
              "Tesla:_Man_Out_of_Time",
              "Wizard:_The_Life_and_Times_of_Nikola_Tesla",
              "History_of_telecommunication",
              "Beacon",
              "History_of_broadcasting",
              "Cable_protection_system",
              "Cable_television",
              "Communications_satellite",
              "Computer_network",
              "Data_compression",
              "Audio_coding_format",
              "Discrete_cosine_transform",
              "Image_compression",
              "Video_coding_format",
              "Digital_media",
              "Internet_video",
              "Online_video_platform",
              "Social_media",
              "Streaming_media",
              "Drums_in_communication",
              "Edholm%27s_law",
              "Electrical_telegraph",
              "Fax",
              "Heliograph",
              "Hydraulic_telegraph",
              "Information_Age",
              "Information_revolution",
              "History_of_the_Internet",
              "Mass_media",
              "History_of_mobile_phones",
              "Smartphone",
              "Optical_communication",
              "Optical_telegraphy",
              "Pager",
              "Photophone",
              "History_of_prepaid_mobile_phones",
              "History_of_radio",
              "Radiotelephone",
              "Flag_semaphore",
              "Semiconductor",
              "Semiconductor_device",
              "MOSFET",
              "History_of_the_transistor",
              "Smoke_signal",
              "Telautograph",
              "Teleprinter",
              "History_of_the_telephone",
              "The_Telephone_Cases",
              "History_of_television",
              "Digital_television",
              "Streaming_television",
              "Submarine_communications_cable#Early_history:_telegraph_and_coaxial_cables",
              "History_of_videotelephony",
              "Whistled_language",
              "Wireless_revolution",
              "N._Ahmed",
              "Edwin_Howard_Armstrong",
              "Mohamed_M._Atalla",
              "John_Logie_Baird",
              "Paul_Baran",
              "John_Bardeen",
              "Alexander_Graham_Bell",
              "Tim_Berners-Lee",
              "Jagadish_Chandra_Bose",
              "Walter_Houser_Brattain",
              "Vint_Cerf",
              "Claude_Chappe",
              "Yogen_Dalal",
              "Donald_Davies",
              "Lee_de_Forest",
              "Philo_Farnsworth",
              "Reginald_Fessenden",
              "Elisha_Gray",
              "Oliver_Heaviside",
              "Erna_Schneider_Hoover",
              "Harold_Hopkins_(physicist)",
              "List_of_Internet_pioneers",
              "Bob_Kahn",
              "Dawon_Kahng",
              "Charles_K._Kao",
              "Narinder_Singh_Kapany",
              "Hedy_Lamarr",
              "Innocenzo_Manzetti",
              "Robert_Metcalfe",
              "Antonio_Meucci",
              "Jun-ichi_Nishizawa",
              "Radia_Perlman",
              "Alexander_Stepanovich_Popov",
              "Johann_Philipp_Reis",
              "Claude_Shannon",
              "Henry_Sutton_(inventor)",
              "Camille_Tissot",
              "Alfred_Vail",
              "Charles_Wheatstone",
              "Vladimir_K._Zworykin",
              "Transmission_medium",
              "Coaxial_cable",
              "Fiber-optic_communication",
              "Optical_fiber",
              "Free-space_optical_communication",
              "Molecular_communication",
              "Wireless",
              "Transmission_line",
              "Data_transmission_circuit",
              "Telecommunication_circuit",
              "Network_topology",
              "Bandwidth_(computing)",
              "Telecommunications_link",
              "Node_(networking)",
              "Terminal_(telecommunication)",
              "Network_switch",
              "Circuit_switching",
              "Packet_switching",
              "Telephone_exchange",
              "Multiplexing",
              "Space-division_multiple_access",
              "Frequency-division_multiplexing",
              "Time-division_multiplexing",
              "Polarization-division_multiplexing",
              "Orbital_angular_momentum_multiplexing",
              "Code-division_multiple_access",
              "Communication_protocols",
              "Data_transmission",
              "Store_and_forward",
              "Telecommunications_equipment",
              "Telecommunications_network",
              "Cellular_network",
              "Ethernet",
              "Integrated_Services_Digital_Network",
              "Local_area_network",
              "Mobile_telephony",
              "Next-generation_network",
              "Public_switched_telephone_network",
              "Radio_network",
              "Television_network",
              "Telex",
              "UUCP",
              "Wide_area_network",
              "Wireless_network",
              "ARPANET",
              "BITNET",
              "CYCLADES",
              "FidoNet",
              "Internet",
              "Internet2",
              "JANET",
              "NPL_network",
              "Usenet",
              "Outline_of_telecommunication",
              "IEEE_Edison_Medal",
              "Elihu_Thomson",
              "Frank_J._Sprague",
              "William_Stanley,_Jr.",
              "Charles_F._Brush",
              "John_J._Carty",
              "William_Le_Roy_Emmet",
              "Mihajlo_Pupin",
              "Cummings_C._Chesney",
              "Robert_Andrews_Millikan",
              "John_W._Lieb",
              "John_White_Howell",
              "Harris_J._Ryan",
              "GlobalSpec",
              "IEEE_Standards_Association",
              "IEEE_Biometrics_Council",
              "IEEE_Council_on_Electronic_Design_Automation",
              "IEEE_Council_on_Superconductivity",
              "IEEE_Nanotechnology_Council",
              "IEEE_Sensors_Council",
              "IEEE_Systems_Council",
              "IEEE_Technical_Activities_Board",
              "Learned_society",
              "IEEE_Aerospace_and_Electronic_Systems_Society",
              "IEEE_Antennas_%26_Propagation_Society",
              "IEEE_Broadcast_Technology_Society",
              "IEEE_Circuits_and_Systems_Society",
              "IEEE_Communications_Society",
              "IEEE_Components,_Packaging_%26_Manufacturing_Technology_Society",
              "IEEE_Computational_Intelligence_Society",
              "IEEE_Computer_Society",
              "IEEE_Consumer_Electronics_Society",
              "IEEE_Control_Systems_Society",
              "IEEE_Dielectrics_%26_Electrical_Insulation_Society",
              "IEEE_Education_Society",
              "IEEE_Electromagnetic_Compatibility_Society",
              "IEEE_Electron_Devices_Society",
              "IEEE_Engineering_in_Medicine_and_Biology_Society",
              "IEEE_Geoscience_and_Remote_Sensing_Society",
              "IEEE_Industrial_Electronics_Society",
              "IEEE_Industry_Applications_Society",
              "IEEE_Information_Theory_Society",
              "IEEE_Instrumentation_%26_Measurement_Society",
              "IEEE_Intelligent_Transportation_Systems_Society",
              "IEEE_Magnetics_Society",
              "IEEE_Nuclear_and_Plasma_Sciences_Society",
              "IEEE_Oceanic_Engineering_Society",
              "IEEE_Photonics_Society",
              "IEEE_Power_%26_Energy_Society",
              "IEEE_Power_Electronics_Society",
              "IEEE_Product_Safety_Engineering_Society",
              "IEEE_Professional_Communication_Society",
              "IEEE_Reliability_Society",
              "IEEE_Robotics_and_Automation_Society",
              "IEEE_Signal_Processing_Society",
              "IEEE_Society_on_Social_Implications_of_Technology",
              "IEEE_Solid-State_Circuits_Society",
              "IEEE_Systems,_Man,_and_Cybernetics_Society",
              "IEEE_Technology_and_Engineering_Management_Society",
              "IEEE_Ultrasonics,_Ferroelectrics,_and_Frequency_Control_Society",
              "IEEE_Vehicular_Technology_Society",
              "Certified_Software_Development_Professional",
              "Computer-Aided_Design_Technical_Committee",
              "Engineering_and_Technology_History_Wiki",
              "Engineering_for_Change",
              "Eta_Kappa_Nu",
              "IEEE_Access",
              "IEEE_Cloud_Computing",
              "IEEE_conferences",
              "IEEEXtreme",
              "IEEEmadC",
              "IEEE_Rebooting_Computing",
              "IEEE_Xplore",
              "Internet_Technical_Committee",
              "IEEE_Life_Sciences",
              "List_of_IEEE_awards",
              "List_of_IEEE_milestones",
              "List_of_IEEE_publications",
              "IEEE_Registration_Authority",
              "IEEE_Smart_Grid",
              "IEEE_style",
              "Technical_Committee_on_VLSI",
              "Andr%C3%A9-Marie_Amp%C3%A8re",
              "Ampere",
              "William_Thomson,_1st_Baron_Kelvin",
              "Kelvin",
              "Henri_Becquerel",
              "Becquerel",
              "Anders_Celsius",
              "Celsius",
              "Charles-Augustin_de_Coulomb",
              "Coulomb",
              "Michael_Faraday",
              "Farad",
              "Louis_Harold_Gray",
              "Gray_(unit)",
              "Joseph_Henry",
              "Henry_(unit)",
              "Hertz",
              "James_Prescott_Joule",
              "Joule",
              "Isaac_Newton",
              "Newton_(unit)",
              "Georg_Ohm",
              "Ohm",
              "Blaise_Pascal",
              "Pascal_(unit)",
              "Werner_von_Siemens",
              "Siemens_(unit)",
              "Rolf_Maximilian_Sievert",
              "Sievert",
              "Alessandro_Volta",
              "Volt",
              "James_Watt",
              "Watt",
              "Wilhelm_Eduard_Weber",
              "Weber_(unit)",
              "Cgs",
              "Anders_Jonas_%C3%85ngstr%C3%B6m",
              "Angstrom",
              "Peter_Debye",
              "Debye",
              "Lor%C3%A1nd_E%C3%B6tv%C3%B6s",
              "Eotvos_(unit)",
              "Galileo_Galilei",
              "Gal_(unit)",
              "Carl_Friedrich_Gauss",
              "Gauss_(unit)",
              "William_Gilbert_(physician)",
              "Gilbert_(unit)",
              "Heinrich_Kayser",
              "Kayser_(unit)",
              "Johann_Heinrich_Lambert",
              "Lambert_(unit)",
              "Samuel_Langley",
              "Langley_(unit)",
              "James_Clerk_Maxwell",
              "Maxwell_(unit)",
              "Hans_Christian_%C3%98rsted",
              "Oersted",
              "Jean_L%C3%A9onard_Marie_Poiseuille",
              "Poise_(unit)",
              "Sir_George_Stokes,_1st_Baronet",
              "Stokes_(unit)",
              "John_William_Strutt,_3rd_Baron_Rayleigh",
              "Rayl",
              "Imperial_units",
              "United_States_customary_units",
              "Daniel_Gabriel_Fahrenheit",
              "Fahrenheit",
              "Foot-lambert",
              "William_John_Macquorn_Rankine",
              "Rankine_scale",
              "Bel_(unit)",
              "Marie_Curie",
              "Curie_(unit)",
              "Pierre_Curie",
              "John_Dalton",
              "Dalton_(unit)",
              "Faraday_(unit)",
              "Heinrich_Mache",
              "Mache_(unit)",
              "John_Napier",
              "Neper",
              "Ren%C3%A9_Antoine_Ferchault_de_R%C3%A9aumur",
              "R%C3%A9aumur_scale",
              "Roentgen_(unit)",
              "J._J._Thomson",
              "Thomson_(unit)",
              "Evangelista_Torricelli",
              "Torr",
              "List_of_scientists_whose_names_are_used_as_units",
              "List_of_scientists_whose_names_are_used_in_physical_constants",
              "List_of_people_whose_names_are_used_in_chemical_element_names",
              "National_symbols_of_Serbia",
              "Coat_of_arms_of_Serbia",
              "Flag_of_Serbia",
              "Bo%C5%BEe_pravde",
              "Constitution_of_Serbia",
              "Orders,_decorations,_and_medals_of_Serbia",
              "Names_of_the_Serbs_and_Serbia",
              ".rs",
              ".%D1%81%D1%80%D0%B1",
              "Regalia_of_Serbia",
              "Serbian_heraldry",
              "Serbian_eagle",
              "Serbian_cross",
              "List_of_Serbian_mottos",
              "Only_Unity_Saves_the_Serbs",
              "Three-finger_salute_(Serbian)",
              "Serbian_cuisine",
              "%C4%86evapi",
              "Gibanica",
              "B%C3%B6rek",
              "Pljeskavica",
              "Pasulj",
              "Sarma_(food)",
              "Ajvar",
              "Slatko",
              "Slivovitz",
              "Serbian_national_costume",
              "%C5%A0ajka%C4%8Da",
              "Opanak",
              "Musical_instrument",
              "Gusle",
              "Tamburica",
              "Frula",
              "Gaida",
              "List_of_World_Heritage_Sites_in_Serbia",
              "Studenica_Monastery",
              "Stari_Ras",
              "Sopo%C4%87ani",
              "Gamzigrad",
              "Medieval_Monuments_in_Kosovo",
              "Visoki_De%C4%8Dani",
              "Patriarchate_of_Pe%C4%87_(monastery)",
              "Our_Lady_of_Ljevi%C5%A1",
              "Gra%C4%8Danica_monastery",
              "Ste%C4%87ci",
              "Mramorje_(Peru%C4%87ac)",
              "UNESCO_Intangible_Cultural_Heritage_Lists",
              "Slava",
              "Kolo_(dance)",
              "Memory_of_the_World_Programme",
              "Miroslav_Gospel",
              "Man_and_the_Biosphere_Programme",
              "Gornje_Podunavlje",
              "Church_of_Saint_Sava",
              "Ba%C4%8D_Fortress",
              "Petrovaradin_Fortress",
              "Belgrade_Fortress",
              "Smederevo_Fortress",
              "Golubac_Fortress",
              "Manasija_monastery",
              "Oplenac",
              "Justiniana_Prima",
              "%C5%A0argan_Eight",
              "%C4%90avolja_Varo%C5%A1",
              "List_of_Serbs",
              "Saint_Sava",
              "Serbian_dinar",
              "Vuk_Karad%C5%BEi%C4%87",
              "Petar_II_Petrovi%C4%87-Njego%C5%A1",
              "Stevan_Mokranjac",
              "Nade%C5%BEda_Petrovi%C4%87",
              "Jovan_Cviji%C4%87",
              "%C4%90or%C4%91e_Vajfert",
              "Milutin_Milankovi%C4%87",
              "Slobodan_Jovanovi%C4%87",
              "Fauna_of_Serbia",
              "Eagle",
              "Gray_wolf",
              "Plum",
              "Oak",
              "Serbian_Spruce",
              "Ramonda_nathaliae",
              "Biblioteca_Nacional_de_Espa%C3%B1a",
              "BNF_(identifier)",
              "Name_and_Title_Authority_File_of_Catalonia",
              "CiNii_(identifier)",
              "GND_(identifier)",
              "ISNI_(identifier)",
              "LCCN_(identifier)",
              "MusicBrainz",
              "National_Diet_Library",
              "National_Library_of_the_Czech_Republic",
              "National_Library_of_Australia",
              "National_Library_of_Israel",
              "National_Library_of_Korea",
              "Royal_Library_of_the_Netherlands",
              "SNAC",
              "SUDOC_(identifier)",
              "Trove",
              "Union_List_of_Artist_Names",
              "VIAF_(identifier)",
              "WorldCat_Identities"
          ],
          "sourcestr1": "Nikola_Tesla",
          "sourcestr2": "Q9036",
          "sourcestr3": "Q5",
          "category": "human",
          "sourcevarchar3": "[{\"Nikola Tesla\":[\"\\u041d\\u0438\\u043a\\u043e\\u043b\\u0430 \\u0422\\u0435\\u0441\\u043b\\u0430\",[\"Tesla\",\"c.\",\"1896\"]],\"Born\":[\"10 July 1856\",\"Smiljan\",\",\",\"Austrian Empire\",\"(modern-day\",\"Croatia\"],\"Died\":[\"7 January 1943\",\"(1943-01-07)\",\"(aged86)\",\"New York City\",\",\",\"United States\"],\"Resting place\":[\"Nikola Tesla Museum\",\",\",\"Belgrade\",\",\",\"Serbia\"],\"Citizenship\":[\"Austrian (1856\\u20131891)\",\"American\",\"(1891\\u20131943)\"],\"Education\":[\"Graz University of Technology\",\"(dropped out)\"],\"Discipline\":[\"Electrical engineering,\",\"Mechanical engineering\"],\"Projects\":[\"Alternating current\",\"high-voltage, high-frequency power experiments\"],\"Significant design\":[\"AC motor\",\"Carbon button lamp\",\"Death ray\",\"Induction motor\",\"Plasma globe\",\"Plasma lamp\",\"Polyphase system\",\"Radio control\",\"Resonant inductive coupling\",\"Rotating magnetic field\",\"Teleforce\",\"Telegeodynamics\",\"Teleoperation\",\"Tesla coil\",\"Tesla Experimental Station\",\"Tesla's oscillator\",\"Tesla turbine\",\"Tesla valve\",\"Torpedo\",\"Vacuum variable capacitor\",\"Violet ray\",\"VTOL\",\"Wardenclyffe Tower\",\"Wireless power transfer\",\"World Wireless System\"],\"Awards\":[\"Order of St. Sava\",\", II Class, Government of Serbia (1892)\",\"Elliott Cresson Medal\",\"(1894)\",\"Order of Prince Danilo I\",\"(1895)\",\"Edison Medal\",\"(1916)\",\"Order of St. Sava\",\", I Class, Government of Yugoslavia (1926)\",\"Order of the Yugoslav Crown\",\"(1931)\",\"John Scott Medal\",\"(1934)\",\"Order of the White Eagle\",\", I Class, Government of Yugoslavia (1936)\",\"Order of the White Lion\",\", I Class, Government of Czechoslovakia (1937)\",\"University of Paris Medal (1937)\",\"The Medal of the University St Clement of Ochrida,\",\"Sofia, Bulgaria\",\"(1939)\"],\"Signature\":\"\"},{\"External video\":[\"Booknotes\",\"interview with Jill Jonnes on\",\"Empires of Light\",\", 26 October 2003\",\",\",\"C-SPAN\"]}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/N.Tesla.JPG/1200px-N.Tesla.JPG",
          "sourcedouble1": 0.052596,
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
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "1937",
                  "display": "1937"
              },
              {
                  "value": "10",
                  "display": "10"
              },
              {
                  "value": "1915",
                  "display": "1915"
              },
              {
                  "value": "1888",
                  "display": "1888"
              },
              {
                  "value": "7",
                  "display": "7"
              },
              {
                  "value": "1943",
                  "display": "1943"
              },
              {
                  "value": "1893",
                  "display": "1893"
              },
              {
                  "value": "1892",
                  "display": "1892"
              },
              {
                  "value": "1900",
                  "display": "1900"
              },
              {
                  "value": "1934",
                  "display": "1934"
              },
              {
                  "value": "8",
                  "display": "8"
              },
              {
                  "value": "1894",
                  "display": "1894"
              },
              {
                  "value": "1895",
                  "display": "1895"
              },
              {
                  "value": "1896",
                  "display": "1896"
              },
              {
                  "value": "6",
                  "display": "6"
              },
              {
                  "value": "9",
                  "display": "9"
              },
              {
                  "value": "1879",
                  "display": "1879"
              }
          ],
          "date": [
              {
                  "value": "1943-01-07",
                  "display": "1943-01-07"
              },
              {
                  "value": "1856-07-10",
                  "display": "1856-07-10"
              },
              {
                  "value": "1884-12-07",
                  "display": "1884-12-07"
              },
              {
                  "value": "1885-01-04",
                  "display": "1885-01-04"
              },
              {
                  "value": "1888-05-16",
                  "display": "1888-05-16"
              },
              {
                  "value": "1891-07-30",
                  "display": "1891-07-30"
              },
              {
                  "value": "1892-05-24",
                  "display": "1892-05-24"
              },
              {
                  "value": "1895-03-13",
                  "display": "1895-03-13"
              },
              {
                  "value": "1899-05-13",
                  "display": "1899-05-13"
              },
              {
                  "value": "1901-02-09",
                  "display": "1901-02-09"
              },
              {
                  "value": "1914-12-20",
                  "display": "1914-12-20"
              },
              {
                  "value": "1915-04-23",
                  "display": "1915-04-23"
              },
              {
                  "value": "1915-11-06",
                  "display": "1915-11-06"
              },
              {
                  "value": "1924-08-10",
                  "display": "1924-08-10"
              },
              {
                  "value": "1934-07-11",
                  "display": "1934-07-11"
              },
              {
                  "value": "1943-01-10",
                  "display": "1943-01-10"
              },
              {
                  "value": "1943-08-31",
                  "display": "1943-08-31"
              },
              {
                  "value": "1943-09-25",
                  "display": "1943-09-25"
              },
              {
                  "value": "2003-10-26",
                  "display": "2003-10-26"
              },
              {
                  "value": "2006-07-07",
                  "display": "2006-07-07"
              }
          ],
          "entity3": [
              {
                  "value": "03:00",
                  "display": "03:00"
              },
              {
                  "value": "09:00",
                  "display": "09:00"
              },
              {
                  "value": "18:00",
                  "display": "18:00"
              },
              {
                  "value": "20:10",
                  "display": "20:10"
              }
          ],
          "money": [
              {
                  "value": "USD 1000",
                  "display": "USD 1000"
              },
              {
                  "value": "USD 2000",
                  "display": "USD 2000"
              },
              {
                  "value": "USD 20000",
                  "display": "USD 20000"
              },
              {
                  "value": "USD 100000000",
                  "display": "USD 100000000"
              },
              {
                  "value": "USD 12000000",
                  "display": "USD 12000000"
              },
              {
                  "value": "USD 1370511",
                  "display": "USD 1370511"
              },
              {
                  "value": "USD 2220511",
                  "display": "USD 2220511"
              },
              {
                  "value": "USD 3073200",
                  "display": "USD 3073200"
              },
              {
                  "value": "USD 4609800",
                  "display": "USD 4609800"
              },
              {
                  "value": "USD 100000",
                  "display": "USD 100000"
              },
              {
                  "value": "USD 125",
                  "display": "USD 125"
              },
              {
                  "value": "USD 15000",
                  "display": "USD 15000"
              },
              {
                  "value": "USD 150000",
                  "display": "USD 150000"
              },
              {
                  "value": "USD 2",
                  "display": "USD 2"
              },
              {
                  "value": "USD 2.50",
                  "display": "USD 2.50"
              },
              {
                  "value": "USD 216000",
                  "display": "USD 216000"
              },
              {
                  "value": "USD 50000",
                  "display": "USD 50000"
              },
              {
                  "value": "USD 510500",
                  "display": "USD 510500"
              },
              {
                  "value": "USD 56900",
                  "display": "USD 56900"
              },
              {
                  "value": "USD 60000",
                  "display": "USD 60000"
              }
          ],
          "entity12": [
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
              },
              {
                  "value": "BIRTH",
                  "display": "Birth"
              }
          ],
          "entity13": [
              {
                  "value": "INVESTOR",
                  "display": "Investor"
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
              },
              {
                  "value": "LIQUIDITY",
                  "display": "Liquidity"
              },
              {
                  "value": "CAPITAL",
                  "display": "Capital"
              },
              {
                  "value": "DEBT",
                  "display": "Debt"
              },
              {
                  "value": "REFINANCING",
                  "display": "Refinancing"
              },
              {
                  "value": "LOSSES",
                  "display": "Losses"
              }
          ],
          "event_date": [
              {
                  "value": "(DEATH)#(1943-01-07)",
                  "display": "(Death)#(1943-01-07)"
              },
              {
                  "value": "(BIRTH)#(1856-07-10)",
                  "display": "(Birth)#(1856-07-10)"
              },
              {
                  "value": "(DEATH)#(2043-01-07)",
                  "display": "(Death)#(2043-01-07)"
              },
              {
                  "value": "(BIRTH)#(1856-06-28)",
                  "display": "(Birth)#(1856-06-28)"
              },
              {
                  "value": "(DEATH)#(1879-04-17)",
                  "display": "(Death)#(1879-04-17)"
              }
          ],
          "person_cooc": [
              {
                  "value": "(FOUNDER)#(THOMAS EDISON)",
                  "display": "(Founder)#(Thomas Edison)"
              },
              {
                  "value": "(INVESTOR)#(CHARLES F. COANEY)",
                  "display": "(Investor)#(Charles F. Coaney)"
              }
          ],
          "value_amount": [
              {
                  "value": "(LIQUIDITY)#(USD 12000000)",
                  "display": "(Liquidity)#(USD 12000000)"
              },
              {
                  "value": "(LIQUIDITY)#(USD 2.50)",
                  "display": "(Liquidity)#(USD 2.50)"
              },
              {
                  "value": "(LIQUIDITY)#(USD 60000)",
                  "display": "(Liquidity)#(USD 60000)"
              },
              {
                  "value": "(REVENUE)#(USD 100000000)",
                  "display": "(Revenue)#(USD 100000000)"
              },
              {
                  "value": "(SHARES)#(USD 2.50)",
                  "display": "(Shares)#(USD 2.50)"
              },
              {
                  "value": "(SHARES)#(USD 60000)",
                  "display": "(Shares)#(USD 60000)"
              }
          ],
          "company_person": [
              {
                  "value": "(ERICSSON)#(NIKOLA TESLA)",
                  "display": "(Ericsson)#(Nikola Tesla)"
              },
              {
                  "value": "(MARCONI)#(JOHN STONE)",
                  "display": "(Marconi)#(John Stone)"
              },
              {
                  "value": "(MARCONI)#(OLIVER LODGE)",
                  "display": "(Marconi)#(Oliver Lodge)"
              },
              {
                  "value": "(REUTERS)#(NIKOLA TESLA)",
                  "display": "(Reuters)#(Nikola Tesla)"
              },
              {
                  "value": "(REUTERS)#(WILLIAM HENRY BRAGG)",
                  "display": "(Reuters)#(William Henry Bragg)"
              },
              {
                  "value": "(REUTERS)#(WILLIAM LAWRENCE BRAGG)",
                  "display": "(Reuters)#(William Lawrence Bragg)"
              },
              {
                  "value": "(NEW YORK TIMES)#(THOMAS EDISON)",
                  "display": "(New York Times)#(Thomas Edison)"
              },
              {
                  "value": "(REUTERS)#(THOMAS EDISON)",
                  "display": "(Reuters)#(Thomas Edison)"
              },
              {
                  "value": "(WESTERN UNION)#(ALFRED S. BROWN)",
                  "display": "(Western Union)#(Alfred S. Brown)"
              }
          ],
          "rank": 0,
          "displayTitle": "Nikola <span class=\"match-highlight\">Tesla</span>",
          "relevantExtracts": "Nikola <b>Tesla </b>... Austrian Empire , <b>Tesla </b>studied ... market his ideas, <b>Tesla </b>set ... patent and market, <b>Tesla </b>conducted ... <b>Tesla </b>became ... Throughout the 1890s, <b>Tesla </b>pursued ... <b>Tesla </b>tried ... After Wardenclyffe, <b>Tesla </b>experimented ... of his money, <b>Tesla </b>lived ... popular interest in <b>Tesla </b>"
      },
      {
          "id": "/Web/Wikipedia/|Tesla,_Inc.",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 1.018461,
          "matchingpartnames": [
              "text",
              "tables",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "{b}tesla{nb} .",
              "91255,7",
              "2196642,7",
              "Musk, who formerly served as chairman and is the current CEO, said in 2006 that \"the overarching purpose of {b}Tesla Motors{nb}...",
              "632,123",
              "30789,123",
              "{b}Tesla{nb}'s current products include cars (the Model S , Model 3 , Model X , and Model Y ), batteries (the Powerwall , Powerpack , and Megapack ), solar products ( solar panels and solar roof tiles ) and related products and services.",
              "1003,230",
              "31683,1939",
              "To produce these, {b}Tesla{nb} operates multiple production and assembly plants.",
              "1234,73",
              "33867,73",
              "Its main vehicle manufacturing facility is at {b}Tesla{nb} Factory in Fremont, California .",
              "1308,84",
              "33941,324",
              "After 11 years in the market, {b}Tesla{nb} ranked as the world's best-selling plug-in and battery electric passenger car manufacturer in 2019, both as a brand and by automotive group, with a market share of 17% of the plug-in segment and 23% of the battery electric segment.",
              "1465,267",
              "34623,423",
              "{b}Tesla{nb} global vehicle sales increased 50% from 245,240 units in 2018 to 367,849 units in 2019.",
              "1733,93",
              "35178,210",
              "{b}Tesla{nb} cars accounted for 81% of the battery electric vehicles sold in the United States in the first half of 2020.",
              "2015,114",
              "35998,114",
              "A lawsuit settlement agreed to by Eberhard and {b}Tesla{nb} in September 2009 allows all five (Eberhard, Tarpenning, Wright, Musk and Straubel) to call themselves co-founders.",
              "3276,168",
              "82734,168",
              "From the beginning, Musk consistently maintained that {b}Tesla{nb}'s long-term strategic goal was to create affordable mass market electric vehicles.",
              "4064,142",
              "84373,142"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "2,5,24,12,406,12,495,5,740,12,1003,5,1252,5,1354,5,1495,5,1733,5,2015,5,2156,12,2182,5,2215,12,2230,5,3323,5,3927,5,4047,5,4118,5,4207,5,4540,5,4730,5,5200,5,5317,12,5494,12,5529,5,5561,5,5659,5,5788,5,5984,5,6125,5,6294,5,6387,5,6541,5,6579,5,7354,5,7775,5,7905,5,8041,5,8319,5,8564,5,8646,5,8695,5,8807,5,8837,5,8997,5,9270,5,9443,5,9601,5,9744,5,9786,5,9927,5,9972,5,10159,5,10201,5,10327,5,10408,5,10542,5,10645,5,10868,5,10946,5,10990,5,11127,5,11155,5,11254,5,11472,5,11569,5,11729,5,12046,5,12196,5,12287,5,12439,5,12589,5,12817,5,13226,5,13361,5,13525,5,15244,5,15369,5,15830,5,15862,5,16000,5,16408,5,16514,5,16758,5,17107,5,17174,5,17440,5,17492,5,17669,5,17724,5,17754,5,17884,5,18121,5,18290,5,18357,5,18428,5,18469,5,18522,5,18851,5,18972,5,19365,5,19579,5,19809,5,20093,5,20304,5,20502,5,20656,5,20704,5,20903,5,21421,5,21589,5,21664,5,21822,5,21983,5,22207,5,22253,5,22411,5,22470,5,22668,5,22795,5,23081,5,23385,5,23541,5,23683,5,23821,5,23856,5,24023,5,24376,5,24495,5,24542,5,24713,5,24824,5,25211,5,25415,5,25701,5,26074,5,26396,5,26488,5,26651,5,26742,5,26814,5,27126,5,27246,5,28463,5,28668,5,28706,5,28916,5,29411,5,29555,5,29651,5,30095,5,30315,5,30417,5,30705,5,30771,5,31129,5,31763,5,32140,5,32248,5,32699,5,33624,5,33969,5,35054,5,35085,5,35191,5,35275,5,36121,5,36160,5,36429,5,36594,5,37459,5,37471,5,37493,5,37578,5,38025,5,38382,5,38604,5,39000,5,39284,5,39403,5,39952,5,40058,5,40180,12,40198,5,41167,5,41448,5,41701,5,41921,5,42037,5,42077,5,42190,5,42840,5,43033,5,43103,5,44114,5,44367,5,44672,5,44795,5,45623,5,45682,5,45696,5,45710,5,45724,5,45738,5,45767,5,45818,5,45832,5,46218,5,46232,5,46276,5,46429,5,46443,5,46487,5,46595,5,46612,5,46626,5,46641,5,46702,5,46728,5,46751,5,46797,5,46961,5,47072,5,47250,5,47413,5,47517,5,47831,5,47991,5,48050,5,48080,5,48248,5,48451,5,48468,5,49250,5,49386,5,49457,5,49625,5,49660,5,49747,5,49814,5,50045,5,50278,5,50312,5,50414,5,50485,5,50567,5,50626,5,50734,5,50759,5,50859,5,50883,5,51033,5,51119,5,51154,5,51216,5,51515,5,51622,5,51799,5,51836,5,51927,5,52134,5,52323,5,52488,5,52650,5,52915,5,53015,5,53195,5,53279,5,53390,5,53636,5,53754,5,53830,5,54079,5,54210,5,54326,5,54576,5,54655,5,55001,5,55111,5,55229,5,55416,5,55595,5,55698,5,55845,5,56104,5,56294,5,56302,5,56655,5,56977,5,57542,5,57575,5,57728,5,57738,5,57811,5,58170,5,58411,5,58668,5,58972,5,59110,5,59364,5,59782,5,59820,5,60018,5,60172,5,60239,5,60635,5,60724,5,60751,5,61222,5,61229,5,61402,5,61719,5,62221,5,62524,5,62657,5,63129,5,63490,5,63643,5,63994,5,64240,5,64813,5,65147,5,65168,5,65317,5,65619,5,65770,5,65889,5,65947,5,66044,5,66108,5,66274,5,66435,5,66706,5,66783,5,67091,5,67310,5,67574,5,67735,5,67872,5,67902,5,67988,5,68128,5,68262,5,68397,5,68543,5,68752,5,68847,5,70035,5,70176,5,70481,5,70658,5,70972,5,71110,5,71261,5,71406,5,71565,5,71676,5,71729,5,71799,5,72118,5,72278,5,72531,5,72758,5,72803,5,72943,5,73145,5,73311,5,74065,5,74330,5,74398,5,74594,5,74619,5,74900,5,75169,5,75366,5,75625,5,76064,5,76163,5,76342,5,76464,5,76666,5,77019,5,77216,5,77370,5,77569,5,77630,5,78273,5,78667,5,78919,5,79071,5,79229,5,79517,5,79717,5,79780,5,80110,5,80280,5,80639,5,80658,5,80748,5,81012,5,81900,5,81998,5,82488,5,82614,5,82800,5,83142,5,83184,5,83385,5,83549,5,83786,5,83921,5,84020,5,84240,5,84420,5,84468,5,84546,5,84722,5,84883,5,84961,5,85326,5,85632,5,86225,5,86351,5,86676,5,86735,5,89321,5,89759,12,89880,5,90009,5,90088,5,90120,5;29016,5,29045,12,30275,12,30416,5,30897,12,31683,5,33885,5,34039,5,34653,5,35178,5,35998,5,79084,12,79110,5,79466,12,79484,5,82781,5,83933,5,84233,5,84427,5,84651,5,85131,5,85576,5,87169,5,87409,12,87912,12,87947,5,87985,5,88206,5,88452,5,88878,5,89207,5,89678,5,91709,5,92824,5,92967,5,95055,5,97147,5,97501,5,97637,5,98618,5,99483,5,99683,5,99862,5,100325,5,100481,5,100759,5,101284,5,101709,5,101867,5,102127,5,102285,5,102603,5,102648,5,103384,5,103886,5,104012,5,104786,5,105129,5,105737,5,107228,5,107417,5,107461,5,107791,5,108119,5,108420,5,109812,5,110365,5,111131,5,112343,5,112857,5,113068,5,113523,5,113890,5,114403,5,115604,5,115867,5,117163,5,135216,5,135413,5,137722,5,137830,5,138211,5,139465,5,139571,5,140761,5,141411,5,141606,5,142450,5,142752,5,143286,5,143478,5,143508,5,143768,5,144141,5,144684,5,146134,5,147326,5,148192,5,148265,5,149316,5,149563,5,150490,5,150874,5,151554,5,152198,5,152655,5,153428,5,153713,5,153998,5,154705,5,155788,5,156832,5,157009,5,157298,5,157459,5,157927,5,158306,5,158681,5,158885,5,159527,5,159654,5,160377,5,161183,5,162589,5,163088,5,163226,5,163561,5,164120,5,165156,5,165373,5,165548,5,166347,5,166578,5,167809,5,168373,5,168905,5,170009,5,170451,5,170669,5,170952,5,171354,5,171489,5,174385,5,174573,5,180552,5,181123,5,181201,5,182417,5,183967,5,185552,5,185674,5,187014,5,187474,5,188247,5,189937,5,190023,5,191347,5,193099,5,194068,5,194463,5,196749,5,199502,5,201359,5,207359,5,207414,5,207760,5,208351,5,210149,5,210240,5,212337,5,212522,5,214275,5,215439,5,215527,5,215758,5,216527,5,217150,5,217627,5,220080,5,220637,5,220756,5,222031,5,222798,5,223092,12,223110,5,225309,5,225769,5,226268,5,226728,5,227024,5,227123,5,227366,5,229482,5,230039,5,230302,5,232842,5,233509,5,234267,5,235448,5,237442,5,238302,5,238377,5,238452,5,238527,5,238621,5,238820,5,239648,5,239723,5,243328,5,243406,5,243480,5,244632,5,244707,5,244781,5,245990,5,246068,5,246143,5,246217,5,247371,5,247453,5,247500,5,247739,5,248428,5,248665,5,249157,5,250546,5,250930,5,251707,5,252260,5,252596,5,253309,5,254176,5,254438,5,254617,5,256943,5,257126,5,257253,5,258205,5,258388,5,258475,5,258662,5,258893,5,259251,5,259405,5,259507,5,260717,5,260954,5,261234,5,261401,5,261476,5,263016,5,263060,5,263532,5,264400,5,264455,5,264757,5,265764,5,265996,5,266293,5,266450,5,266907,5,267452,5,268021,5,269069,5,269491,5,270615,5,270794,5,271321,5,271622,5,271733,5,272099,5,272337,5,272517,5,273279,5,273770,5,274073,5,274812,5,274891,5,275295,5,275640,5,275850,5,276135,5,276540,5,276643,5,277097,5,278064,5,280258,5,280406,5,281818,5,282495,5,284422,5,284635,5,284949,5,284959,5,285619,5,287022,5,287418,5,288160,5,288834,5,289260,5,289562,5,290428,5,290637,5,291481,5,291766,5,292475,5,293275,5,293494,5,293641,5,294572,5,294579,5,294752,5,295465,5,296233,5,296778,5,296911,5,297849,5,298678,5,298965,5,299751,5,300245,5,301080,5,301993,5,302014,5,302283,5,302715,5,302996,5,303314,5,303446,5,303671,5,303735,5,304151,5,304448,5,304845,5,304922,5,305350,5,305697,5,306276,5,306506,5,306834,5,306864,5,307070,5,307450,5,307704,5,308089,5,308579,5,308998,5,309333,5,312314,5,312843,5,313690,5,313987,5,314499,5,314757,5,315042,5,315416,5,315703,5,316062,5,316235,5,316545,5,317069,5,317359,5,317870,5,318357,5,318532,5,318802,5,319134,5,319487,5,321135,5,321619,5,321693,5,322195,5,322220,5,322721,5,323372,5,323809,5,324188,5,324889,5,325176,5,325780,5,326284,5,326732,5,328036,5,328353,5,328630,5,329075,5,329136,5,330343,5,331181,5,331803,5,331955,5,332239,5,332531,5,332932,5,333125,5,333715,5,334286,5,334645,5,334664,5,334754,5,335543,5,337198,5,337296,5,338087,5,338513,5,339016,5,339520,5,339562,5,340217,5,340595,5,341078,5,341528,5,341867,5,342437,5,343007,5,343059,5,343137,5,343547,5,343708,5,343792,5,344962,5,345570,5,347031,5,347738,5,348649,5,348749,5,359015,5,1831954,12,1832599,5,1834857,5,1835804,5,1836329,5"
                  },
                  {
                      "partname": "tables",
                      "data": "90288,12,90753,5,91161,5,91255,5;2195639,12,2196118,5,2196546,5,2196642,5"
                  },
                  {
                      "partname": "title",
                      "data": "91267,5;2196734,5"
                  }
              ]
          },
          "groupcount": 2,
          "title": "Tesla, Inc.",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-01 18:28:14",
          "indexationtime": "2020-09-01 19:16:06",
          "version": "w6H1P59MJKhuFLER9r+42Q==",
          "size": 2195519,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Tesla,_Inc.",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              },
              {
                  "value": "MARTIN EBERHARD",
                  "display": "Martin Eberhard"
              },
              {
                  "value": "EDGAR MONSERRATT",
                  "display": "Edgar Monserratt"
              },
              {
                  "value": "EDWARD CHEN",
                  "display": "Edward Chen"
              },
              {
                  "value": "HERBERT KOHLER",
                  "display": "Herbert Kohler"
              },
              {
                  "value": "IRA EHRENPREIS",
                  "display": "Ira Ehrenpreis"
              },
              {
                  "value": "NAOTO NOGUCHI",
                  "display": "Naoto Noguchi"
              },
              {
                  "value": "ROBYN DENHOLM",
                  "display": "Robyn Denholm"
              },
              {
                  "value": "STEVE JURVETSON",
                  "display": "Steve Jurvetson"
              },
              {
                  "value": "ZACH KIRKHORN",
                  "display": "Zach Kirkhorn"
              },
              {
                  "value": "IAN WRIGHT",
                  "display": "Ian Wright"
              },
              {
                  "value": "MARC TARPENNING",
                  "display": "Marc Tarpenning"
              },
              {
                  "value": "BARRETT RILEY",
                  "display": "Barrett Riley"
              },
              {
                  "value": "CARLOS RAMIREZ",
                  "display": "Carlos Ramirez"
              },
              {
                  "value": "DAVID EINHORN",
                  "display": "David Einhorn"
              },
              {
                  "value": "HIROMICHI MIZUNO",
                  "display": "Hiromichi Mizuno"
              },
              {
                  "value": "JAIR BOLSONARO",
                  "display": "Jair Bolsonaro"
              },
              {
                  "value": "JAMES GOODWIN",
                  "display": "James Goodwin"
              },
              {
                  "value": "JAMES MURDOCH",
                  "display": "James Murdoch"
              },
              {
                  "value": "KARL HANSEN",
                  "display": "Karl Hansen"
              }
          ],
          "company": [
              {
                  "value": "PANASONIC",
                  "display": "Panasonic"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "DAIMLER",
                  "display": "Daimler"
              },
              {
                  "value": "WALMART",
                  "display": "Walmart"
              },
              {
                  "value": "BLOOMBERG",
                  "display": "Bloomberg"
              },
              {
                  "value": "MERCEDES",
                  "display": "Mercedes"
              },
              {
                  "value": "NISSAN",
                  "display": "Nissan"
              },
              {
                  "value": "GOOGLE",
                  "display": "Google"
              },
              {
                  "value": "21ST CENTURY",
                  "display": "21st Century"
              },
              {
                  "value": "LIBERTY MUTUAL",
                  "display": "Liberty Mutual"
              },
              {
                  "value": "ORACLE",
                  "display": "Oracle"
              },
              {
                  "value": "RIVIERA TOOL",
                  "display": "Riviera Tool"
              },
              {
                  "value": "TOYOTA MOTOR",
                  "display": "Toyota Motor"
              },
              {
                  "value": "APPLE",
                  "display": "Apple"
              },
              {
                  "value": "CITROEN",
                  "display": "Citroën"
              },
              {
                  "value": "COMPASS",
                  "display": "Compass"
              },
              {
                  "value": "FORD",
                  "display": "Ford"
              },
              {
                  "value": "J.P.MORGAN",
                  "display": "J.P.Morgan"
              },
              {
                  "value": "NAVIGANT",
                  "display": "Navigant"
              },
              {
                  "value": "NORDSTROM",
                  "display": "Nordstrom"
              }
          ],
          "geo": [
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "NEW YORK",
                  "display": "New York"
              },
              {
                  "value": "NEVADA",
                  "display": "Nevada"
              },
              {
                  "value": "FREMONT",
                  "display": "Fremont"
              },
              {
                  "value": "TOYOTA",
                  "display": "Toyota"
              },
              {
                  "value": "EUROPE",
                  "display": "Europe"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "NETHERLANDS",
                  "display": "Netherlands"
              },
              {
                  "value": "AUSTRALIA",
                  "display": "Australia"
              },
              {
                  "value": "CHINA",
                  "display": "China"
              },
              {
                  "value": "DUBAI",
                  "display": "Dubai"
              },
              {
                  "value": "GERMANY",
                  "display": "Germany"
              },
              {
                  "value": "NORWAY",
                  "display": "Norway"
              },
              {
                  "value": "TEXAS",
                  "display": "Texas"
              },
              {
                  "value": "TILBURG",
                  "display": "Tilburg"
              },
              {
                  "value": "CANADA",
                  "display": "Canada"
              },
              {
                  "value": "TORONTO",
                  "display": "Toronto"
              },
              {
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "MIDDLE EAST",
                  "display": "Middle East"
              }
          ],
          "wordcount": 11008,
          "exacthash": "2E3q6aa3QNHbiYtTrAro9Q==",
          "nearhash": "Ahc89x/qklkX5Ft6B6Rp3Q==",
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
          "url1": "https://en.wikipedia.org/wiki/Tesla,_Inc.",
          "sourcecsv1": [
              "Formerly",
              "Type",
              "Traded as",
              "ISIN",
              "Industry",
              "Founded",
              "Founders",
              "Headquarters",
              "Area served",
              "Key people",
              "Products",
              "Production output",
              "Revenue",
              "Operating income",
              "Net income",
              "Total assets",
              "Total equity",
              "Owner",
              "Number of employees",
              "Subsidiaries",
              "Website"
          ],
          "sourcecsv2": [
              "Tesla_(disambiguation)",
              "Induction_motor",
              "AC_motor",
              "Palo_Alto,_California",
              "List_of_legal_entity_types_by_country",
              "Public_company",
              "Ticker_symbol",
              "NASDAQ",
              "NASDAQ-100",
              "Russell_1000_Index",
              "International_Securities_Identification_Number",
              "Automotive_industry",
              "Energy_storage",
              "Energy_production",
              "Martin_Eberhard",
              "Marc_Tarpenning",
              "Elon_Musk",
              "J._B._Straubel",
              "Chief_executive_officer",
              "Robyn_Denholm",
              "Chairperson",
              "Drew_Baglino",
              "Chief_technology_officer",
              "Zach_Kirkhorn",
              "Chief_financial_officer",
              "Electric_vehicle",
              "Tesla_Powerwall",
              "SolarCity",
              "United_States_dollar",
              "Earnings_before_interest_and_taxes",
              "Net_income",
              "Asset",
              "Equity_(finance)",
              "Subsidiary",
              "Tesla_Grohmann_Automation",
              "Maxwell_Technologies",
              "DeepScale",
              "Hibar_Systems",
              "Clean_energy",
              "Solar_panel",
              "Nikola_Tesla",
              "Tesla_Model_S",
              "Tesla_Model_3",
              "Tesla_Model_X",
              "Tesla_Model_Y",
              "Tesla_Powerpack",
              "Tesla_Megapack",
              "Tesla_Factory",
              "Fremont,_California",
              "Giga_Nevada",
              "Giga_New_York",
              "Giga_Shanghai",
              "Plug-in_electric_vehicle",
              "Battery_electric_vehicle",
              "History_of_Tesla,_Inc.",
              "General_Motors",
              "General_Motors_EV1",
              "Fuel_efficiency",
              "Fuel_economy_in_automobiles",
              "AC_Propulsion_tzero",
              "Venture_capital",
              "Series_A_round",
              "Carbon-fiber-reinforced_polymer",
              "Global_Green",
              "Mikhail_Gorbachev",
              "Venture_round",
              "Google",
              "Sergey_Brin",
              "Larry_Page",
              "EBay",
              "Jeff_Skoll",
              "Hyatt",
              "Nicholas_J._Pritzker",
              "Draper_Fisher_Jurvetson",
              "JPMorgan_Chase",
              "Initial_public_offering",
              "Ford_Motor_Company",
              "US$",
              "Toyota",
              "S%26P_500_Index",
              "Market_capitalization",
              "Automation",
              "Strategic_management",
              "Consumer_electronics",
              "Economic_surplus",
              "Vertical_integration",
              "Economies_of_scale",
              "Open-source-software_movement",
              "Trade_secret",
              "Human_Resources",
              "Arnnon_Geshuri",
              "Veteran",
              "Navigant_Consulting",
              "BYD_Auto",
              "China",
              "Shanghai",
              "BAIC_Motor",
              "Brand",
              "Nordstrom",
              "The_Grove_at_Farmers_Market",
              "Los_Angeles",
              "Dubai",
              "South_Korea",
              "Motor_vehicle_type_approval",
              "Marketing_communications",
              "Referral_marketing",
              "Word_of_mouth",
              "Car_carrier",
              "Auto_manufacturer",
              "Tesla_US_dealership_disputes",
              "Austin,_Texas",
              "Federal_Trade_Commission",
              "Tesla_Supercharger",
              "Newark,_Delaware",
              "Delaware",
              "Toronto",
              "Charging_speed",
              "Direct_current",
              "Speed",
              "Twitter",
              "Artificial_intelligence",
              "West_Hartford,_Connecticut",
              "Battery_cell",
              "Commodity_cell",
              "Intumescent",
              "Panasonic",
              "List_of_battery_sizes#List_of_Li-ion_sizes",
              "Electrochemical_cell",
              "Contemporary_Amperex_Technology",
              "Argonne_National_Laboratory",
              "Plug-in_electric_vehicle_fire_incidents",
              "Aluminium_alloy",
              "Vehicle-to-grid",
              "Battery_storage",
              "Lithium-ion_battery_recycling",
              "Restriction_of_Hazardous_Substances_Directive",
              "Dalhousie_University",
              "Jeff_Dahn",
              "Three-phase_electric_power",
              "Alternating_current",
              "Rotor_(electric)",
              "Permanent_magnet_motor",
              "Tesla_Autopilot",
              "Advanced_driver-assistance_systems",
              "Graphics_processing_unit",
              "Adaptive_cruise_control",
              "Lane_centering",
              "Automatic_parking",
              "Tesla_Autopilot#Summon_(Beta)",
              "Tesla_Autopilot#Smart_Summon_(Beta)",
              "EPA",
              "All-electric_range",
              "Model_year",
              "Nikola_Tesla_electric_car_hoax",
              "Tesla_Roadster_(2008)",
              "Right-_and_left-hand_traffic",
              "Plug-in_electric_vehicles_in_Norway",
              "Nissan_Leaf",
              "NUMMI",
              "Tesla_facilities_in_Tilburg",
              "Motor_Trend_Car_of_the_Year",
              "World_Green_Car",
              "Automobile_(magazine)",
              "Time_(magazine)",
              "Bloomberg_News",
              "Citro%C3%ABn_DS",
              "Paris_Auto_Show",
              "Chevrolet_Volt",
              "Mid-size",
              "Crossover_SUV",
              "Pre-order",
              "Plug-in_electric_car",
              "Giga_Berlin",
              "Tesla_Roadster_(2020)",
              "All-wheel_drive",
              "Torque_vectoring",
              "Tesla_Semi",
              "Class_8_truck",
              "Semi-trailer_truck",
              "Self-driving_car",
              "Tesla_Megacharger",
              "Tesla_Cybertruck",
              "Jay_Leno%27s_Garage",
              "Lotus_Elise",
              "Heliocentric_orbit",
              "Falcon_Heavy",
              "Ford",
              "Sharing_economy",
              "Tesla_Cyberquad",
              "Open-source_model",
              "Southern_California_Edison",
              "Electric_power",
              "Electrical_energy",
              "Natural_gas",
              "Southern_California_Gas_Company",
              "Methane",
              "Aliso_Canyon_Natural_Gas_Storage_Facility",
              "American_Samoa",
              "Ta%E2%80%98%C5%AB",
              "Microgrid",
              "Samoa",
              "Upolu",
              "Faleolo_International_Airport",
              "Hurricane_Maria",
              "Government_of_Puerto_Rico",
              "Kauai",
              "Battery_storage_power_station",
              "Hornsdale_Power_Reserve",
              "Ultracapacitor",
              "Shipping_container",
              "Pacific_Gas_and_Electric_Company",
              "Moss_Landing,_California",
              "Monterey_County,_California",
              "United_States",
              "Tilburg",
              "Netherlands",
              "Storey_County,_Nevada",
              "Lithium-ion_batteries",
              "Buffalo,_New_York",
              "Photovoltaic_cells",
              "Solar_panels",
              "Solar_shingles",
              "Gr%C3%BCnheide_(Mark)",
              "Brandenburg",
              "Germany",
              "Europe",
              "Gigafactory_5",
              "San_Carlos,_California",
              "Menlo_Park,_California",
              "Chelsea,_Manhattan",
              "Automobile_repair_shop",
              "Giga_Texas",
              "Grand_Rapids,_Michigan",
              "Stamping_(metalworking)",
              "Elgin,_Illinois",
              "Republic_Steel",
              "Photovoltaics",
              "Buffalo_Billion",
              "Golden_Driller",
              "Tulsa,_Oklahoma",
              "Eastern_United_States",
              "Yorkdale_Shopping_Centre",
              "Unibody",
              "Pr%C3%BCm",
              "Tesla_Gigafactory_Europe",
              "Berlin",
              "Tokyo",
              "Shanghai,_China",
              "Roads_and_Transport_Authority_(Dubai)",
              "Amman",
              "Tel_Aviv",
              "Marcos_Pontes",
              "Santa_Catarina_(state)",
              "Jair_Bolsonaro",
              "Original_equipment_manufacturer",
              "Daimler_AG",
              "Airbnb",
              "International_Petroleum_Investment_Company",
              "Freightliner_Trucks",
              "Mercedes-Benz_A-Class_E-Cell",
              "Mercedes-Benz_B-Class_Electric_Drive",
              "Electric_car",
              "Liberty_Mutual_Insurance_Company",
              "Mobileye",
              "Smart_electric_drive",
              "Lithium-ion_battery",
              "Toyota_RAV4_EV",
              "Los_Angeles_Auto_Show",
              "JB_Straubel",
              "Suminoe-ku,_Osaka",
              "Lawsuits_and_Controversies_of_Tesla,_Inc.",
              "PlainSite",
              "Whistleblower",
              "420_(cannabis_culture)",
              "Federal_Bureau_of_Investigation",
              "TSLAQ",
              "Delaware_Court_of_Chancery",
              "Martin_Tripp",
              "Slate_(magazine)",
              "Generally_Accepted_Accounting_Principles_(United_States)",
              "California_Air_Resources_Board",
              "COVID-19_pandemic_in_the_United_States",
              "Alameda_County,_California",
              "Governor_of_California",
              "Bay_Area_Air_Quality_Management_District",
              "United_States_Environmental_Protection_Agency",
              "National_Highway_Traffic_Safety_Administration",
              "Bid_rigging",
              "Short_(finance)",
              "Lyft",
              "Reveal_(podcast)",
              "Occupational_Safety_and_Health_Administration",
              "Product_recall",
              "Corrosion",
              "Power_steering",
              "Kent,_Washington",
              "Murfreesboro,_Tennessee",
              "Tow_hitch",
              "Williston,_Florida",
              "Fort_Lauderdale,_Florida",
              "American_Automobile_Association",
              "Insurance_Institute_for_Highway_Safety",
              "Solar-power",
              "Security_hacker",
              "Patch_(computing)",
              "Exploit_(computer_security)",
              "Tencent",
              "CAN_bus",
              "Bug_bounty_program",
              "Amazon_Web_Services",
              "Black_hat_(computer_security)",
              "Cryptocurrency",
              "White_hat_(computer_security)",
              "Pwn2Own",
              "Kelley_Blue_Book",
              "Motor_Vehicle_Owners%27_Right_to_Repair_Act",
              "New_York_State_Legislature",
              "Ze%27ev_Drori",
              "Groupthink",
              "Board_of_directors",
              "Independent_director",
              "Telstra",
              "Chief_product_officer",
              "SpaceX",
              "Kimbal_Musk",
              "Steve_Jurvetson",
              "James_Murdoch",
              "21st_Century_Fox",
              "Larry_Ellison",
              "Oracle_Corporation",
              "Kathleen_Wilson-Thompson",
              "Walgreens_Boots_Alliance",
              "Hiromichi_Mizuno",
              "Steve_Westly",
              "Johnson_Publishing_Company",
              "COVID-19_pandemic_in_mainland_China",
              "List_of_automobile_manufacturers_of_the_United_States",
              "List_of_Easter_eggs_in_Tesla_products",
              "List_of_electric_cars_currently_available",
              "List_of_modern_production_plug-in_electric_vehicles",
              "List_of_production_battery_electric_vehicles",
              "Plug-in_electric_vehicles_in_California",
              "Plug-in_electric_vehicles_in_the_United_States",
              "NIO",
              "Rivian",
              "Karma_Automotive",
              "Faraday_Future",
              "Byton_(company)",
              "Fisker_Inc.",
              "Polestar",
              "Xpeng_G3",
              "CNET",
              "U.S._Securities_and_Exchange_Commission",
              "ISBN_(identifier)",
              "OCLC_(identifier)",
              "TechCrunch",
              "Flash_video",
              "The_Guardian",
              "Electrek.co",
              "United_States_Department_of_Energy",
              "The_Columbus_Dispatch",
              "The_Wall_Street_Journal",
              "Wired_(magazine)",
              "Los_Angeles_Times",
              "San_Jose_Mercury_News",
              "CBS",
              "Palo_Alto",
              "CNN",
              "Fortune.com",
              "Time,_Inc.",
              "Reuters",
              "ISSN_(identifier)",
              "Jalopnik",
              "The_Washington_Post",
              "Engadget",
              "Associated_Press",
              "Greentech_Media",
              "Yahoo_News",
              "Business_Insider",
              "USA_Today",
              "U.S._Department_of_Energy",
              "U._S._Environmental_Protection_Agency",
              "The_New_York_Times",
              "Nissan",
              "AutoWeek",
              "Motor_Trend",
              "International_Business_Times",
              "Auto_Express",
              "Bloomberg_L.P.",
              "NPR",
              "San_Francisco_Chronicle",
              "The_Verge",
              "Teknisk_Ukeblad",
              "Financial_Post",
              "HuffPost",
              "San_Jose,_California",
              "Autoblog",
              "Wall_Street_Journal",
              "Reno_Gazette_Journal",
              "Fox_News",
              "Weblogs,_Inc.",
              "CNBC",
              "Business_Wire",
              "The_Huffington_Post",
              "Autoblog.com",
              "New_York_Times",
              "New_Statesman",
              "Nihon_Keizai_Shimbun",
              "Public_domain",
              "Fortune_(magazine)",
              "Vox_(website)",
              "NTSB",
              "Consumer_Reports",
              "New_York_Law_Journal",
              "Fox_Business",
              "Ludicrous:_The_Unvarnished_Story_of_Tesla_Motors",
              "Mercedes_A-Class_E-Cell",
              "Tesla_Solar_Roof",
              "Franz_von_Holzhausen",
              "Jerome_Guillen",
              "Andrej_Karpathy",
              "Deepak_Ahuja",
              "Jim_Keller_(engineer)",
              "Chris_Lattner",
              "Jay_Vijayan",
              "Sudden_unintended_acceleration#Tesla&#39",
              "s_Model_X,_S_and_3",
              "Elon_Musk%27s_Tesla_Roadster",
              "Giga_Press",
              "Compact_executive_car",
              "Mid-size_car",
              "Luxury_car",
              "Compact_car",
              "Crossover_(automobile)",
              "Sport_Utility_Vehicle",
              "Roadster_(automobile)",
              "Activision_Blizzard",
              "Adobe_Inc.",
              "Advanced_Micro_Devices",
              "Alexion_Pharmaceuticals",
              "Align_Technology",
              "Alphabet_Inc.",
              "Amazon_(company)",
              "Amgen",
              "Analog_Devices",
              "Ansys",
              "Apple_Inc.",
              "Applied_Materials",
              "ASML_Holding",
              "Autodesk",
              "ADP_(company)",
              "Baidu",
              "Biogen",
              "BioMarin_Pharmaceutical",
              "Booking_Holdings",
              "Broadcom_Inc.",
              "Cadence_Design_Systems",
              "CDW",
              "Cerner",
              "Charter_Communications",
              "Check_Point",
              "Cintas",
              "Cisco_Systems",
              "Citrix_Systems",
              "Cognizant",
              "Comcast",
              "Copart",
              "Costco",
              "CSX_Corporation",
              "Dexcom",
              "DocuSign",
              "Dollar_Tree",
              "Electronic_Arts",
              "Exelon",
              "Expedia_Group",
              "Facebook,_Inc.",
              "Fastenal",
              "Fiserv",
              "Fox_Corporation",
              "Gilead_Sciences",
              "Idexx_Laboratories",
              "Illumina,_Inc.",
              "Incyte",
              "Intel",
              "Intuit",
              "Intuitive_Surgical",
              "JD.com",
              "KLA_Corporation",
              "Kraft_Heinz",
              "Lam_Research",
              "Liberty_Global",
              "Lululemon_Athletica",
              "Marriott_International",
              "Maxim_Integrated",
              "MercadoLibre",
              "Microchip_Technology",
              "Micron_Technology",
              "Microsoft",
              "Moderna",
              "Mondelez_International",
              "Monster_Beverage",
              "NetEase",
              "Netflix",
              "Nvidia",
              "NXP_Semiconductors",
              "O%27Reilly_Auto_Parts",
              "Paccar",
              "Paychex",
              "PayPal",
              "PepsiCo",
              "Pinduoduo",
              "Qualcomm",
              "Regeneron_Pharmaceuticals",
              "Ross_Stores",
              "Seattle_Genetics",
              "Sirius_XM",
              "Skyworks_Solutions",
              "Splunk",
              "Starbucks",
              "Synopsys",
              "T-Mobile_US",
              "Take-Two_Interactive",
              "Texas_Instruments",
              "Trip.com_Group",
              "Ulta_Beauty",
              "Verisign",
              "Verisk_Analytics",
              "Vertex_Pharmaceuticals",
              "Western_Digital",
              "Workday,_Inc.",
              "Xcel_Energy",
              "Xilinx",
              "Zoom_Video_Communications",
              "Automotive_industry_in_the_United_States",
              "Economy_of_the_United_States",
              "Transportation_in_the_United_States",
              "AGCO",
              "Challenger_Tractor",
              "Massey_Ferguson",
              "AM_General",
              "Workhorse_Group",
              "Arcimoto",
              "Rhino_Runner",
              "ATK_motorcycles",
              "Autocar_Company",
              "Blue_Bird_Corporation",
              "Callaway_Cars",
              "Caterpillar_Inc",
              "Chrysler",
              "Chrysler_(brand)",
              "Dodge",
              "Jeep",
              "Ram_Trucks",
              "Desert_Patrol_Vehicle",
              "Environmental_Performance_Vehicles",
              "Equus_Automotive",
              "Forest_River_(company)",
              "Champion_Bus_Incorporated",
              "ElDorado_National",
              "Glaval_Bus",
              "Goshen_Coach",
              "Starcraft_Bus",
              "Lincoln_Motor_Company",
              "Special_Vehicle_Team",
              "General_Dynamics_Land_Systems",
              "Buick",
              "Cadillac",
              "Cadillac_V_series",
              "Chevrolet",
              "Chevrolet_Performance",
              "GMC_(automobile)",
              "Gillig",
              "Growler_Manufacturing_and_Engineering",
              "Harley-Davidson",
              "Ingersoll_Rand",
              "Club_Car",
              "Storm_Search_and_Rescue_Tactical_Vehicle",
              "HME,_Incorporated",
              "John_Deere",
              "Laffite_X-Road",
              "Lenco_BearCat",
              "Lockheed_Martin",
              "Lordstown_Motors",
              "Mack_Trucks",
              "Millennium_Luxury_Coaches",
              "Morgan_Olson",
              "Motor_Coach_Industries",
              "Navistar_International",
              "IC_Bus",
              "Oshkosh_Corporation",
              "Pierce_Manufacturing",
              "Kenworth",
              "Peterbilt",
              "Panoz,_LLC",
              "Polaris_Industries",
              "Global_Electric_Motorcars",
              "Indian_Motocycle_Manufacturing_Company",
              "Victory_Motorcycles",
              "Proterra,_Inc.",
              "REV_Group",
              "Collins_Industries",
              "E-One",
              "Fleetwood_Enterprises",
              "Holiday_Rambler",
              "Wheeled_Coach",
              "SSC_North_America",
              "Superformance",
              "Textron",
              "E-Z-Go",
              "Cushman_(company)",
              "Trans_Tech",
              "Utilimaster_Corporation",
              "VIA_Motors",
              "Zero_Motorcycles",
              "BMW_US_Manufacturing_Company",
              "Changan_Automobile",
              "CNH_Industrial",
              "Case_Construction_Equipment",
              "Case_IH",
              "Daimler_Trucks_North_America",
              "Thomas_Built_Buses",
              "Western_Star_Trucks",
              "Mercedes-Benz_USA",
              "FAW_Group",
              "Fiat_S.p.A.",
              "Subaru_Corporation",
              "American_Honda_Motor_Company",
              "Acura",
              "Hyundai_Motor_Company",
              "Kia_Motors",
              "Isuzu_Motors",
              "Mazda",
              "Mitsubishi_Motors_North_America",
              "NFI_Group",
              "New_Flyer_Industries",
              "ARBOC_Specialty_Vehicles",
              "Nissan_USA",
              "Peugeot",
              "SAIC_Motor",
              "Suzuki",
              "Toyota_Motor_Sales,_USA",
              "Hino_Motors",
              "Lexus",
              "Volkswagen_Group_of_America",
              "Volvo_Cars",
              "Volvo_Trucks",
              "Yamaha_Motor_Company",
              "Wanxiang",
              "Commuter_Cars",
              "Elio_Motors",
              "Fisker_Inc",
              "Local_Motors",
              "Lucid_Motors",
              "Myers_Motors",
              "Nikola_Motor_Company",
              "Trion_Supercars",
              "List_of_Chrysler_factories",
              "List_of_Ford_factories",
              "List_of_General_Motors_factories",
              "List_of_Honda_assembly_plants",
              "Hyundai_Motor_Manufacturing_Alabama",
              "List_of_Kia_design_and_manufacturing_facilities#Kia_Motors_Manufacturing_Georgia_(KMMG)",
              "Mercedes-Benz_U.S._International",
              "Subaru_of_Indiana_Automotive",
              "Toyota_Motor_Engineering_%26_Manufacturing_North_America",
              "Volkswagen_Chattanooga_Assembly_Plant",
              "Performance_car",
              "Allison_Transmission",
              "American_Expedition_Vehicles",
              "BFGoodrich",
              "BorgWarner",
              "Brunton_Stalker",
              "Cooper_Tire_%26_Rubber_Company",
              "Cummins",
              "Brammo",
              "Delphi_Automotive",
              "Detroit_Diesel",
              "Eaton_Corporation",
              "Firestone_Tire_and_Rubber_Company",
              "General_Tire",
              "Goodyear_Tire_and_Rubber_Company",
              "Hennessey_Performance_Engineering",
              "Legacy_Classic_Trucks",
              "Lingenfelter_Performance_Engineering",
              "Nexteer_Automotive",
              "Phoenix_Motorcars",
              "Remy_International",
              "Saleen",
              "Carroll_Shelby_International",
              "Timken_Company",
              "Torrington_Company",
              "Visteon",
              "Calty_Design_Research",
              "Designworks",
              "Rezvani_Automotive_Designs",
              "Wheego_Electric_Cars",
              "Automotive_industry_in_Massachusetts",
              "Allis-Chalmers",
              "American_Austin_Car_Company",
              "The_Kurrent",
              "American_LaFrance",
              "American_Motors_Corporation",
              "Hudson_Motor_Car_Company",
              "Essex_(automobile)",
              "Terraplane",
              "Nash_Motors",
              "Rambler_(automobile)",
              "Armor_Holdings",
              "Armored_Motor_Car_Company",
              "Auburn_Automobile",
              "Aurica_Motors",
              "Autoette",
              "Avanti_(car)",
              "Avery_Company",
              "Best_Manufacturing_Company",
              "Boulder_Electric_Vehicle",
              "Carbon_Motors_Corporation",
              "Checker_Motors_Corporation",
              "Clydesdale_Motor_Truck_Company",
              "Coda_Automotive",
              "Commonwealth_(automobile_company)",
              "Cord_(automobile)",
              "Case_Corporation",
              "CNH_Global",
              "Cycle-Scoot",
              "DeLorean_Motor_Company",
              "Duesenberg",
              "Durant_Motors",
              "Flint_(automobile)",
              "Locomobile_Company_of_America",
              "Mason_Truck",
              "Rugby_(automobile)",
              "Star_(automobile)",
              "Eagle_Bus",
              "Excalibur_(automobile)",
              "Eagle_(automobile)",
              "Plymouth_(automobile)",
              "Street_%26_Racing_Technology",
              "Fiberfab",
              "Fitch_Four_Drive",
              "Fisker_Automotive",
              "Fisker_Coachbuild",
              "Force_Protection_Inc",
              "Continental_Mark_II",
              "Edsel",
              "Mercury_(automobile)",
              "FMC_Corporation",
              "Cartercar",
              "Elmore_(automobile)",
              "General_Motors_Diesel_Division",
              "Geo_(automobile)",
              "Hummer",
              "LaSalle_(automobile)",
              "Marquette_(automobile)",
              "McLaughlin_Motor_Car_Company",
              "Oakland_Motor_Car_Company",
              "Oldsmobile",
              "Pontiac",
              "Saturn_Corporation",
              "Scripps-Booth",
              "Sheridan_(automobile)",
              "Viking_(automobile)",
              "Yellow_Coach_Manufacturing_Company",
              "Green_Vehicles",
              "GreenTech_Automotive",
              "Grumman",
              "Henney_Kilowatt",
              "International_Harvester",
              "Jeffery_(automobile)",
              "Kaiser-Frazer",
              "Allstate_(automobile)",
              "Frazer_(automobile)",
              "Henry_J",
              "Willys",
              "Marathon_Motor_Works",
              "Marmon_Motor_Car_Company",
              "Roosevelt_(automobile)",
              "Marvel_(automobile)",
              "Matbro",
              "Mercer_(automobile)",
              "Monaco_Coach_Corporation",
              "Mosler_Automotive",
              "MotoCzysz",
              "Muntz_Car_Company",
              "North_American_Bus_Industries",
              "Oliver_Farm_Equipment_Company",
              "Packard",
              "Peerless_Motor_Company",
              "Pierce-Arrow_Motor_Car_Company",
              "Sebring_Vanguard",
              "Sterling_Trucks",
              "Studebaker",
              "Erskine_(automobile)",
              "Rockne",
              "Stutz_Motor_Company",
              "Scion_(automobile)",
              "Twentieth_Century_Motor_Car_Corporation",
              "United_Defense",
              "Visionary_Vehicles",
              "VL_Automotive",
              "White_Motor_Company",
              "Wildfire_(motor_company)",
              "ZAP_(motor_company)",
              "Zimmer_(automobile)",
              "Diamond-Star_Motors",
              "Packard_Automotive_Plant",
              "Volkswagen_Westmoreland_Assembly",
              "Chicago_Auto_Show",
              "Interstate_Highway_System",
              "List_of_automobiles_manufactured_in_the_United_States",
              "New_York_International_Auto_Show",
              "North_American_International_Auto_Show",
              "SAE_International",
              "Trucking_industry_in_the_United_States",
              "Federal_Motor_Carrier_Safety_Administration",
              "Commercial_driver%27s_license",
              "Hours_of_service",
              "Federal_Bridge_Gross_Weight_Formula",
              "Electronic_on-board_recorder",
              "Motor_carrier_safety_rating",
              "Motor_Carrier_Act_of_1980",
              "International_Registration_Plan",
              "National_Network",
              "Bering_Truck",
              "Bremach",
              "Brockway_Motor_Company",
              "Caterpillar_Inc.",
              "Chase_Motor_Truck_Company",
              "Crane_Carrier_Company",
              "Diamond_T",
              "REO_Motor_Car_Company",
              "Diamond_Reo_Trucks",
              "DINA_S.A.",
              "F650_Pickups",
              "Hayes_Manufacturing_Company",
              "Marmon-Herrington",
              "Mercedes-Benz",
              "Moreland_Motor_Truck_Company",
              "Mitsubishi_Fuso_Truck_of_America,_Inc.",
              "Selden_Motor_Vehicle_Company",
              "Schacht_(automobile)",
              "Smith_Electric_Vehicles",
              "Spartan_Motors",
              "Tiger_Truck",
              "Traffic_Motor_Truck_Corporation",
              "UD_Trucks",
              "Ward_LaFrance_Truck_Corporation",
              "Marmon_Group",
              "Fruehauf_Trailer_Corporation",
              "Great_Dane_Trailers",
              "Lufkin_Industries",
              "Utility_Trailer_Manufacturing_Company",
              "China_International_Marine_Containers",
              "Wabash_National",
              "Wilson_Trailer_Company",
              "Truckload_shipping",
              "Averitt_Express",
              "Celadon_Group",
              "Covenant_Transport",
              "CRST",
              "FFE_Transportation",
              "J._B._Hunt",
              "Knight-Swift",
              "Landstar_System",
              "PAM_Transport",
              "Patriot_Transportation",
              "Roehl_Transport",
              "Schneider_National",
              "Swift_Transportation",
              "Werner_Enterprises",
              "WTI_Transport",
              "Less_than_truckload_shipping",
              "ABF_Freight_System",
              "Con-way_Freight",
              "Estes_Express_Lines",
              "FedEx",
              "New_England_Motor_Freight",
              "Old_Dominion_Freight_Line",
              "Pitt_Ohio_Express",
              "R%2BL_Carriers",
              "Saia",
              "Southeastern_Freight_Lines",
              "Trailer_Bridge",
              "UPS_Freight",
              "XPO_Logistics",
              "YRC_Worldwide",
              "Third-party_logistics",
              "Access_America_Transport",
              "American_Lamprecht_Transport",
              "C._H._Robinson_Worldwide",
              "CaseStack",
              "Freightquote",
              "Ryder",
              "Total_Quality_Logistics",
              "Package_delivery",
              "DHL_Express",
              "Greyhound_Lines",
              "United_Parcel_Service",
              "United_States_Postal_Service",
              "General_Logistics_Systems",
              "LaserShip",
              "OnTrac",
              "Moving_company",
              "Allied_Van_Lines",
              "Atlas_Van_Lines",
              "Bekins_Van_Lines,_Inc.",
              "Gentle_Giant_Moving_Company",
              "Global_Van_Lines",
              "Interstate_Van_Lines",
              "Mayflower_Transit",
              "National_Van_Lines,_Inc.",
              "North_American_Van_Lines",
              "PODS_(company)",
              "Two_Men_and_a_Truck",
              "United_Van_Lines",
              "Wheaton_World_Wide_Moving",
              "Truck_stop",
              "Bowlin_Travel_Centers",
              "Dixie_Travel_Plaza",
              "Iowa_80",
              "Love%27s_Travel_Stops_%26_Country_Stores",
              "Pilot_Flying_J",
              "Road_Ranger",
              "Roady%27s_Truck_Stops",
              "TravelCenters_of_America",
              "Town_Pump",
              "Attack_on_Reginald_Denny",
              "Jimmy_Hoffa",
              "Frederick_W._Smith",
              "Johnnie_Bryan_Hunt",
              "Kelly_Reno",
              "Iyman_Faris",
              "Keith_Hunter_Jesperson",
              "International_Brotherhood_of_Teamsters",
              "Owner%E2%80%93Operator_Independent_Drivers_Association",
              "DAT_Solutions",
              "American_Trucking_Associations",
              "National_Motor_Freight_Traffic_Association",
              "National_Motor_Freight_Classification",
              "National_Private_Truck_Council",
              "FJ_Management",
              "SmartWay_Transport_Partnership",
              "American_Moving_%26_Storage_Association",
              "Glossary_of_the_American_trucking_industry",
              "Trucking_industry_in_popular_culture_(United_States)",
              "Black_Dog_(film)",
              "Breakdown_(1997_film)",
              "Breaker!_Breaker!",
              "Convoy_(1978_film)",
              "Duel_(1971_film)",
              "F.I.S.T.",
              "The_Gang%27s_All_Here_(1941_film)",
              "Joy_Ride_(2001_film)",
              "Maximum_Overdrive",
              "Over_the_Top_(1987_film)",
              "Smokey_and_the_Bandit",
              "They_Drive_by_Night",
              "White_Line_Fever_(film)",
              "Trucker_(film)",
              "B._J._and_the_Bear",
              "Ice_Road_Truckers",
              "Movin%27_On_(TV_series)",
              "Trick_My_Truck",
              "American_Loggers",
              "American_Trucker",
              "Convoy_(song)",
              "Papa_Loved_Mama",
              "Six_Days_on_the_Road",
              "Teddy_Bear_(Red_Sovine_song)",
              "Phantom_309",
              "Giddyup_Go",
              "The_White_Knight_(Cledus_Maggard_song)",
              "East_Bound_and_Down",
              "Roll_On_(Eighteen_Wheeler)",
              "Drivin%27_My_Life_Away",
              "Eighteen_Wheels_and_a_Dozen_Roses",
              "Girl_on_the_Billboard",
              "A_Tombstone_Every_Mile",
              "Roll_On_Big_Mama",
              "Movin%27_On_(Merle_Haggard_song)",
              "Big_Wheels_in_the_Moonlight",
              "Bonnie_Jean_(Little_Sister)",
              "Road_Dog_Trucking",
              "Dave_Nemo",
              "Red_Eye_Radio",
              "Bill_Mack_(songwriter)",
              "Dale_Sommers",
              "18_Wheels_of_Steel",
              "American_Truck_Simulator",
              "Rig_%27n%27_Roll",
              "The_Rolling_Memorial",
              "Citizens_band_radio",
              "Automotive_industry_in_Australia",
              "Economy_of_Australia",
              "Transport_in_Australia",
              "Alpha_Sports",
              "Brabham_Automotive",
              "BCI_Bus",
              "Bolwell",
              "Borland_Racing_Developments",
              "Bush_Ranger_(4WD)",
              "Bustech",
              "Coach_Concepts",
              "Coach_Design",
              "Custom_Bus",
              "Denning_Manufacturing",
              "Devaux_Coupe",
              "Express_Coach_Builders",
              "General_Dynamics_Land_Systems%E2%80%93Australia",
              "Howard_Porter_(manufacturer)",
              "Jacer",
              "Minetti_Sports_Cars",
              "Nota",
              "P%26D_Coachworks",
              "PRB_(car)",
              "RFW",
              "Thales_Australia",
              "Volgren",
              "Alan_B_Denning",
              "Ansair",
              "Austral_(bus_manufacturer)",
              "Australian_Autobus",
              "Australian_Motor_Industries",
              "Birrana",
              "Boltons_(bus_manufacturer)",
              "Bowin_Cars",
              "Brabham",
              "British_Motor_Corporation_(Australia)",
              "Buckle_Motors",
              "Caldwell_Vale",
              "Centurion_Transport_Engineering",
              "Cheetah_Racing_Cars",
              "Coachmaster",
              "Commonwealth_Aircraft_Corporation",
              "Commonwealth_Engineering",
              "Corsa_Specialised_Vehicles",
              "Denning_(bus_manufacturer)",
              "Duncan_%26_Fraser",
              "Elfin_Sports_Cars",
              "Ford_Australia",
              "Ford_Performance_Vehicles",
              "Giocattolo",
              "Hartnett_(car)",
              "Holden_Dealer_Team",
              "Holden",
              "Holden_Special_Vehicles",
              "IBC_(bus_manufacturer)",
              "Jakab_Industries",
              "JW_Bolton",
              "Kaditcha",
              "Leader_Trucks",
              "Mills-Tui",
              "Motor_Body_Specialists",
              "MotorCoach_Australia",
              "Northcoast_Bus_%26_Coach",
              "OKA_4wd",
              "Parramatta-Ryde_Bus_Service",
              "Pressed_Metal_Corporation",
              "Pressed_Metal_Corporation_South_Australia",
              "Purvis_Eureka",
              "Queensland_Coach_Company",
              "Ralt",
              "Rennmax",
              "The_Roo_Motor_Car_Company",
              "Rootes_Australia",
              "Smithfield_Bus_%26_Coach_Works",
              "Stewart_%26_Sons",
              "Superior_(bus_manufacturer)",
              "TJ_Richards_%26_Sons",
              "United_Australian_Automobile_Industries",
              "Zeta_(automobile)",
              "Beaurepaires",
              "Bob_Jane_T-Marts",
              "James_Hardie",
              "Repco",
              "Supercheap_Auto",
              "Tickford_Vehicle_Engineering",
              "Ultra_Tune",
              "Chrysler_Australia",
              "Honda_Australia",
              "Mitsubishi_Motors_Australia",
              "Toyota_Australia",
              "Volkswagen_Australia",
              "Australasian_New_Car_Assessment_Program",
              "Australian_International_Motor_Show",
              "Highways_in_Australia",
              "Melbourne_International_Motor_Show",
              "Automotive_industry_in_New_Zealand",
              "Zip2",
              "X.com",
              "OpenAI",
              "Neuralink",
              "The_Boring_Company",
              "Hyperloop",
              "Boring_Test_Tunnel",
              "Maye_Musk",
              "Justine_Musk",
              "Talulah_Riley",
              "Grimes_(musician)",
              "Tosca_Musk",
              "Lyndon_Rive",
              "Elon_Musk:_Tesla,_SpaceX,_and_the_Quest_for_a_Fantastic_Future",
              "The_Musk_Who_Fell_to_Earth",
              "One_Crew_over_the_Crewcoo%27s_Morty",
              "Mercedes-AMG",
              "Maybach",
              "Smart_(marque)",
              "BharatBenz",
              "Fuso_(company)",
              "Manufacturing_Commercial_Vehicles",
              "Master_Motors",
              "DaimlerChrysler_Commercial_Buses_North_Carolina",
              "Mercedes-Benz_buses",
              "Setra",
              "EvoBus",
              "Orion_International",
              "Mercedes-Benz_in_motorsport",
              "Mercedes-Benz_in_Formula_One",
              "Mercedes_AMG_High_Performance_Powertrains",
              "Alliance_Truck_Parts",
              "Car2Go",
              "Daimler_Financial_Services",
              "Mercedes-Benz_Bank",
              "Mercedes-Benz_India",
              "Mercedes-Benz_Mexico",
              "Shareholder",
              "Automotive_Fuel_Cell_Cooperation",
              "Beijing_Benz",
              "Denza",
              "Tognum",
              "Fujian_Benz",
              "Here_(company)",
              "Airbus",
              "Kamaz",
              "MV_Agusta",
              "Tata_Motors",
              "Aston_Martin",
              "Renault",
              "Karl_Benz#Benz_&amp",
              "_Cie._and_the_Motorwagen",
              "Daimler-Motoren-Gesellschaft",
              "Active_Cylinder_Control",
              "BlueTec",
              "Wolfgang_Bernhard",
              "Karl-Gottfried_Nordmann",
              "Andreas_Renschler",
              "Hans_Scherenberg",
              "J%C3%BCrgen_E._Schrempp",
              "Karl_Wilfert",
              "Joachim_Zahn",
              "Dieter_Zetsche",
              "DaimlerChrysler%E2%80%93Mitsubishi_alliance",
              "BeiBen_Truck",
              "Silicon_Valley",
              "Belmont,_California",
              "Campbell,_California",
              "Cupertino,_California",
              "East_Palo_Alto,_California",
              "Los_Altos,_California",
              "Los_Altos_Hills,_California",
              "Los_Gatos,_California",
              "Milpitas,_California",
              "Morgan_Hill,_California",
              "Mountain_View,_California",
              "Newark,_California",
              "Redwood_City,_California",
              "San_Mateo,_California",
              "Santa_Clara,_California",
              "Saratoga,_California",
              "Sunnyvale,_California",
              "Woodside,_California",
              "Ca%C3%B1ada_College",
              "Carnegie_Mellon_Silicon_Valley",
              "Cogswell_Polytechnical_College",
              "De_Anza_College",
              "Evergreen_Valley_College",
              "Foothill_College",
              "International_Technological_University",
              "Menlo_College",
              "Mission_College_(California)",
              "Ohlone_College",
              "Silicon_Valley_Technical_Institute",
              "National_Hispanic_University",
              "Northwestern_Polytechnic_University",
              "San_Jose_City_College",
              "San_Jose_State_University",
              "Silicon_Valley_University",
              "Santa_Clara_University",
              "Stanford_University",
              "University_of_California,_Berkeley",
              "University_of_California,_Santa_Cruz",
              "3Com",
              "Access_Systems_Americas",
              "Actuate_Corporation",
              "Adaptec",
              "Adobe_Inc",
              "Agilent_Technologies",
              "Altera",
              "Amdahl_Corporation",
              "Ampex",
              "Apple_Inc",
              "Aricent",
              "Asus",
              "Atari",
              "Atmel",
              "Avaya",
              "Ayasdi",
              "BEA_Systems",
              "Box_(company)",
              "Brocade_Communications_Systems",
              "BusinessObjects",
              "Capcom",
              "Computer_Literacy_Bookshops",
              "Cypress_Semiconductor",
              "Facebook",
              "Foundry_Networks",
              "Fry%27s_Electronics",
              "Fujitsu",
              "Gaia_Online",
              "Geeknet",
              "Hewlett-Packard",
              "HGST",
              "Internet_Engineering_Task_Force",
              "Internet_Systems_Consortium",
              "Juniper_Networks",
              "Knight_Ridder",
              "LinkedIn",
              "Logitech",
              "LSI_Corporation",
              "Magellan_Navigation",
              "Marvell_Technology_Group",
              "Maxtor",
              "McAfee",
              "Memorex",
              "Mozilla_Corporation",
              "National_Semiconductor",
              "Netscape",
              "NetApp",
              "NeXT",
              "Nintendo",
              "Nortel",
              "Opera_Software",
              "Oppo_Digital",
              "Palm_Inc",
              "Palo_Alto_Networks",
              "Pinterest",
              "Playdom",
              "Rambus",
              "Redback_Networks",
              "Reputation.com",
              "SAP",
              "SanDisk",
              "Silicon_Graphics",
              "Silicon_Image",
              "Solectron",
              "Sony_Interactive_Entertainment",
              "SRI_International",
              "Sun_Microsystems",
              "Symyx_Technologies",
              "Taligent",
              "Tesla_Inc",
              "TiVo_Corporation",
              "Uber",
              "Veritas_Technologies",
              "VMware",
              "Cisco_Webex",
              "WhatsApp",
              "Yahoo!",
              "PayPal_Mafia",
              "Peter_Thiel",
              "Reid_Hoffman",
              "Max_Levchin",
              "Ken_Howery",
              "Luke_Nosek",
              "Steve_Chen",
              "Keith_Rabois",
              "Chad_Hurley",
              "Roelof_Botha",
              "Jawed_Karim",
              "Yishan_Wong",
              "Eric_M._Jackson",
              "David_O._Sacks",
              "Premal_Shah",
              "Russel_Simmons",
              "Jeremy_Stoppelman",
              "YouTube",
              "Slide.com",
              "Yelp",
              "Geni.com",
              "Yammer",
              "Palantir_Technologies",
              "Kiva_(organization)",
              "Affirm_(company)",
              "Friendster",
              "Powerset_(company)",
              "Vator",
              "Six_Apart",
              "Zynga",
              "IronPort",
              "Flickr",
              "Digg",
              "Grockit",
              "Ooma",
              "Quantcast",
              "RapLeaf",
              "SmartDrive_Systems",
              "TransferWise",
              "Ping.fm",
              "Nanosolar",
              "Knewton",
              "Kongregate",
              "Last.fm",
              "TokBox",
              "Xoom_(web_hosting)",
              "Joost",
              "Founders_Fund",
              "Clarium_Capital",
              "Greylock_Partners",
              "Sequoia_Capital",
              "Valar_Ventures",
              "The_PayPal_Wars",
              "Thank_You_for_Smoking_(film)",
              "The_Stanford_Review",
              "GND_(identifier)",
              "ISNI_(identifier)",
              "LCCN_(identifier)",
              "National_Library_of_the_Czech_Republic",
              "VIAF_(identifier)",
              "WorldCat_Identities",
              "Geographic_coordinate_system"
          ],
          "sourcestr1": "Tesla,_Inc.",
          "sourcestr2": "Q478214",
          "sourcestr3": "Q786820",
          "category": "automobile manufacturer",
          "sourcevarchar3": "[{\"Formerly\":\"Tesla Motors, Inc. (2003\\u20132017)\",\"Type\":\"Public\",\"Traded as\":[\"NASDAQ\",\":\",\"TSLA\",\"NASDAQ-100\",\"component\",\"Russell 1000\",\"component\"],\"ISIN\":\"US88160R1014\",\"Industry\":[\"Automotive\",\"Energy storage\",\"Energy production\"],\"Founded\":[\"July1, 2003\",\";17years ago\"],\"Founders\":[\"Martin Eberhard\",\"Marc Tarpenning\",\"Elon Musk\",\"J. B. Straubel\",\"Ian Wright\"],\"Headquarters\":[\"Palo Alto, California\",\",\",\"U.S.\"],\"Area served\":\"Worldwide\",\"Key people\":[\"Elon Musk\",\"Robyn Denholm\",\"Drew Baglino\",\"Zach Kirkhorn\"],\"Products\":[\"Electric vehicles\",\"Tesla batteries\",\"Solar panels and roofs\"],\"Production output\":[\"367,500 vehicles (2019)\",\"1,651 MWh batteries\",\"(2019)\",\"173 MW solar\",\"(2019)\"],\"Revenue\":[\"US$\",\"24.578billion\",\"(2019)\"],\"Operating income\":[\"US$\",\"\\u221269\",\"million\",\"(2019)\"],\"Net income\":[\"US$\",\"\\u2212862\",\"million\",\"(2019)\"],\"Total assets\":[\"US$34.309billion\",\"(2019)\"],\"Total equity\":[\"US$6.618billion\",\"(2019)\"],\"Owner\":\"Elon Musk (20.8%)\",\"Number of employees\":[\"48,016\",\"(2019)\"],\"Subsidiaries\":[\"SolarCity\",\"Tesla Grohmann Automation\",\"Maxwell Technologies\",\"DeepScale\",\"Hibar Systems\",\"SilLion\"],\"Website\":[\"www\",\".tesla\",\".com\"]}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png",
          "sourcevarchar5": "POINT(-122.150277777778 37.3947222222222)",
          "sourcedouble1": 0.036557,
          "latitude": 37.394722,
          "longitude": -122.150278,
          "entity1": [
              {
                  "value": "2019",
                  "display": "2019"
              },
              {
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "2020",
                  "display": "2020"
              },
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "2017",
                  "display": "2017"
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
                  "value": "2",
                  "display": "2"
              },
              {
                  "value": "2014",
                  "display": "2014"
              },
              {
                  "value": "2015",
                  "display": "2015"
              },
              {
                  "value": "5",
                  "display": "5"
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
                  "value": "4",
                  "display": "4"
              },
              {
                  "value": "2010",
                  "display": "2010"
              },
              {
                  "value": "7",
                  "display": "7"
              },
              {
                  "value": "6",
                  "display": "6"
              },
              {
                  "value": "10",
                  "display": "10"
              },
              {
                  "value": "100",
                  "display": "100"
              },
              {
                  "value": "20",
                  "display": "20"
              }
          ],
          "date": [
              {
                  "value": "2016-07-20",
                  "display": "2016-07-20"
              },
              {
                  "value": "2017-01-15",
                  "display": "2017-01-15"
              },
              {
                  "value": "2017-11-16",
                  "display": "2017-11-16"
              },
              {
                  "value": "2017-12-01",
                  "display": "2017-12-01"
              },
              {
                  "value": "2019-08-03",
                  "display": "2019-08-03"
              },
              {
                  "value": "2020-07-01",
                  "display": "2020-07-01"
              },
              {
                  "value": "2009-05-19",
                  "display": "2009-05-19"
              },
              {
                  "value": "2009-07-13",
                  "display": "2009-07-13"
              },
              {
                  "value": "2010-01-07",
                  "display": "2010-01-07"
              },
              {
                  "value": "2010-05-20",
                  "display": "2010-05-20"
              },
              {
                  "value": "2012-06-22",
                  "display": "2012-06-22"
              },
              {
                  "value": "2012-11-16",
                  "display": "2012-11-16"
              },
              {
                  "value": "2013-10-01",
                  "display": "2013-10-01"
              },
              {
                  "value": "2013-11-06",
                  "display": "2013-11-06"
              },
              {
                  "value": "2014-01-04",
                  "display": "2014-01-04"
              },
              {
                  "value": "2014-03-28",
                  "display": "2014-03-28"
              },
              {
                  "value": "2014-07-16",
                  "display": "2014-07-16"
              },
              {
                  "value": "2015-05-08",
                  "display": "2015-05-08"
              },
              {
                  "value": "2015-05-19",
                  "display": "2015-05-19"
              },
              {
                  "value": "2015-09-29",
                  "display": "2015-09-29"
              }
          ],
          "money": [
              {
                  "value": "USD 1000000000",
                  "display": "USD 1000000000"
              },
              {
                  "value": "USD 100",
                  "display": "USD 100"
              },
              {
                  "value": "USD 35000",
                  "display": "USD 35000"
              },
              {
                  "value": "USD 420",
                  "display": "USD 420"
              },
              {
                  "value": "USD 250000",
                  "display": "USD 250000"
              },
              {
                  "value": "USD 42000000",
                  "display": "USD 42000000"
              },
              {
                  "value": "USD 50000000",
                  "display": "USD 50000000"
              },
              {
                  "value": "USD 1",
                  "display": "USD 1"
              },
              {
                  "value": "USD 206000000000",
                  "display": "USD 206000000000"
              },
              {
                  "value": "CNY 5000000",
                  "display": "CNY 5000000"
              },
              {
                  "value": "USD 14000000000",
                  "display": "USD 14000000000"
              },
              {
                  "value": "USD 200000",
                  "display": "USD 200000"
              },
              {
                  "value": "USD 20000000",
                  "display": "USD 20000000"
              },
              {
                  "value": "USD 2000000000",
                  "display": "USD 2000000000"
              },
              {
                  "value": "USD 2500000000",
                  "display": "USD 2500000000"
              },
              {
                  "value": "USD 295000000",
                  "display": "USD 295000000"
              },
              {
                  "value": "USD 30000000",
                  "display": "USD 30000000"
              },
              {
                  "value": "USD 37000000",
                  "display": "USD 37000000"
              },
              {
                  "value": "USD 375000",
                  "display": "USD 375000"
              },
              {
                  "value": "USD 37500000",
                  "display": "USD 37500000"
              }
          ],
          "entity7": [
              {
                  "value": "10.000, 22.026",
                  "display": "10.000, 22.026"
              },
              {
                  "value": "10.045, 10.045",
                  "display": "10.045, 10.045"
              },
              {
                  "value": "10.070, 8.182",
                  "display": "10.070, 8.182"
              },
              {
                  "value": "11.370, 18.440",
                  "display": "11.370, 18.440"
              },
              {
                  "value": "11.532, 11.532",
                  "display": "11.532, 11.532"
              },
              {
                  "value": "11.550, 25.051",
                  "display": "11.550, 25.051"
              },
              {
                  "value": "12.200, 76.200",
                  "display": "12.200, 76.200"
              },
              {
                  "value": "13.091, 11.597",
                  "display": "13.091, 11.597"
              },
              {
                  "value": "13.120, 1.542",
                  "display": "13.120, 1.542"
              },
              {
                  "value": "13.190, 56.065",
                  "display": "13.190, 56.065"
              },
              {
                  "value": "14.037, 17.272",
                  "display": "14.037, 17.272"
              },
              {
                  "value": "14.050, 63.359",
                  "display": "14.050, 63.359"
              },
              {
                  "value": "15.510, 12.420",
                  "display": "15.510, 12.420"
              },
              {
                  "value": "17.483, 79.703",
                  "display": "17.483, 79.703"
              },
              {
                  "value": "18.345, 9.764",
                  "display": "18.345, 9.764"
              },
              {
                  "value": "19.450, 92.550",
                  "display": "19.450, 92.550"
              },
              {
                  "value": "2.400, 14.820",
                  "display": "2.400, 14.820"
              },
              {
                  "value": "24.882, 12.700",
                  "display": "24.882, 12.700"
              },
              {
                  "value": "25.185, 16.047",
                  "display": "25.185, 16.047"
              },
              {
                  "value": "25.336, 14.065",
                  "display": "25.336, 14.065"
              }
          ],
          "entity12": [
              {
                  "value": "DEATH",
                  "display": "Death"
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
                  "value": "DIRECTOR",
                  "display": "Director"
              },
              {
                  "value": "CHIEF EXECUTIVE OFFICER",
                  "display": "Chief Executive Officer"
              },
              {
                  "value": "INVESTOR",
                  "display": "Investor"
              },
              {
                  "value": "CO-FOUNDER",
                  "display": "Co-founder"
              },
              {
                  "value": "FOUNDER",
                  "display": "Founder"
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
                  "value": "CHAIRMAN OF THE BOARD",
                  "display": "Chairman of the board"
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
                  "value": "REVENUE",
                  "display": "Revenue"
              },
              {
                  "value": "SHARES",
                  "display": "Shares"
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
                  "value": "PENALTY",
                  "display": "Penalty"
              },
              {
                  "value": "LOSSES",
                  "display": "Losses"
              },
              {
                  "value": "LIQUIDITY",
                  "display": "Liquidity"
              }
          ],
          "person_cooc": [
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(ELON MUSK)",
                  "display": "(Chief Executive Officer)#(Elon Musk)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(JAMES MURDOCH)",
                  "display": "(Chief Executive Officer)#(James Murdoch)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(LARRY ELLISON)",
                  "display": "(Chief Executive Officer)#(Larry Ellison)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(LINDA JOHNSON)",
                  "display": "(Chief Executive Officer)#(Linda Johnson)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(MARTIN EBERHARD)",
                  "display": "(Chief Executive Officer)#(Martin Eberhard)"
              },
              {
                  "value": "(CHIEF TECHNOLOGY OFFICER)#(KATHLEEN WILSON)",
                  "display": "(Chief Technology Officer)#(Kathleen Wilson)"
              },
              {
                  "value": "(CHIEF TECHNOLOGY OFFICER)#(NAOTO NOGUCHI)",
                  "display": "(Chief Technology Officer)#(Naoto Noguchi)"
              },
              {
                  "value": "(CO-FOUNDER)#(ELON MUSK)",
                  "display": "(Co-founder)#(Elon Musk)"
              },
              {
                  "value": "(CO-FOUNDER)#(LARRY ELLISON)",
                  "display": "(Co-founder)#(Larry Ellison)"
              },
              {
                  "value": "(DIRECTOR)#(BRAD BUSS)",
                  "display": "(Director)#(Brad Buss)"
              },
              {
                  "value": "(FOUNDER)#(ELON MUSK)",
                  "display": "(Founder)#(Elon Musk)"
              },
              {
                  "value": "(INVESTOR)#(ELON MUSK)",
                  "display": "(Investor)#(Elon Musk)"
              },
              {
                  "value": "(VICE-PRESIDENT)#(HERBERT KOHLER)",
                  "display": "(Vice-President)#(Herbert Kohler)"
              },
              {
                  "value": "(VICE-PRESIDENT)#(KATHLEEN WILSON)",
                  "display": "(Vice-President)#(Kathleen Wilson)"
              },
              {
                  "value": "(CO-FOUNDER)#(LARRY PAGE)",
                  "display": "(Co-founder)#(Larry Page)"
              },
              {
                  "value": "(CO-FOUNDER)#(SERGEY BRIN)",
                  "display": "(Co-founder)#(Sergey Brin)"
              },
              {
                  "value": "(FOUNDER)#(MARC TARPENNING)",
                  "display": "(Founder)#(Marc Tarpenning)"
              },
              {
                  "value": "(FOUNDER)#(MARTIN EBERHARD)",
                  "display": "(Founder)#(Martin Eberhard)"
              }
          ],
          "value_amount": [
              {
                  "value": "(REVENUE)#(USD 1)",
                  "display": "(Revenue)#(USD 1)"
              },
              {
                  "value": "(CAPITAL)#(USD 206000000000)",
                  "display": "(Capital)#(USD 206000000000)"
              },
              {
                  "value": "(ACQUISITION)#(USD 42000000)",
                  "display": "(Acquisition)#(USD 42000000)"
              },
              {
                  "value": "(CAPITAL)#(USD 2500000000)",
                  "display": "(Capital)#(USD 2500000000)"
              },
              {
                  "value": "(CONTRACT)#(USD 14000000000)",
                  "display": "(Contract)#(USD 14000000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 1000000000)",
                  "display": "(Investment)#(USD 1000000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 42000000)",
                  "display": "(Investment)#(USD 42000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 50000000)",
                  "display": "(Investment)#(USD 50000000)"
              },
              {
                  "value": "(PENALTY)#(USD 20000000)",
                  "display": "(Penalty)#(USD 20000000)"
              },
              {
                  "value": "(REVENUE)#(USD 295000000)",
                  "display": "(Revenue)#(USD 295000000)"
              },
              {
                  "value": "(REVENUE)#(USD 30)",
                  "display": "(Revenue)#(USD 30)"
              },
              {
                  "value": "(REVENUE)#(USD 6350000000)",
                  "display": "(Revenue)#(USD 6350000000)"
              },
              {
                  "value": "(REVENUE)#(USD -69)",
                  "display": "(Revenue)#(USD -69)"
              },
              {
                  "value": "(REVENUE)#(USD -862)",
                  "display": "(Revenue)#(USD -862)"
              },
              {
                  "value": "(SHARES)#(USD 700000000)",
                  "display": "(Shares)#(USD 700000000)"
              },
              {
                  "value": "(CAPITAL)#(USD 86000000000)",
                  "display": "(Capital)#(USD 86000000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 105000000)",
                  "display": "(Investment)#(USD 105000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 13000000)",
                  "display": "(Investment)#(USD 13000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 7500000)",
                  "display": "(Investment)#(USD 7500000)"
              },
              {
                  "value": "(LOSSES)#(USD 862000000)",
                  "display": "(Losses)#(USD 862000000)"
              }
          ],
          "company_person": [
              {
                  "value": "(PANASONIC)#(NAOTO NOGUCHI)",
                  "display": "(Panasonic)#(Naoto Noguchi)"
              },
              {
                  "value": "(DAIMLER)#(HERBERT KOHLER)",
                  "display": "(Daimler)#(Herbert Kohler)"
              },
              {
                  "value": "(TESLA MOTORS)#(MARC TARPENNING)",
                  "display": "(Tesla Motors)#(Marc Tarpenning)"
              },
              {
                  "value": "(TESLA MOTORS)#(MARTIN EBERHARD)",
                  "display": "(Tesla Motors)#(Martin Eberhard)"
              },
              {
                  "value": "(GOOGLE)#(NICK PRITZKER)",
                  "display": "(Google)#(Nick Pritzker)"
              },
              {
                  "value": "(J.P.MORGAN)#(JEFF SKOLL)",
                  "display": "(J.P.Morgan)#(Jeff Skoll)"
              },
              {
                  "value": "(J.P.MORGAN)#(LARRY PAGE)",
                  "display": "(J.P.Morgan)#(Larry Page)"
              },
              {
                  "value": "(J.P.MORGAN)#(NICK PRITZKER)",
                  "display": "(J.P.Morgan)#(Nick Pritzker)"
              },
              {
                  "value": "(J.P.MORGAN)#(SERGEY BRIN)",
                  "display": "(J.P.Morgan)#(Sergey Brin)"
              },
              {
                  "value": "(EBAY)#(JEFF SKOLL)",
                  "display": "(eBay)#(Jeff Skoll)"
              },
              {
                  "value": "(EBAY)#(LARRY PAGE)",
                  "display": "(eBay)#(Larry Page)"
              },
              {
                  "value": "(EBAY)#(NICK PRITZKER)",
                  "display": "(eBay)#(Nick Pritzker)"
              },
              {
                  "value": "(EBAY)#(SERGEY BRIN)",
                  "display": "(eBay)#(Sergey Brin)"
              },
              {
                  "value": "(GOOGLE)#(JEFF SKOLL)",
                  "display": "(Google)#(Jeff Skoll)"
              },
              {
                  "value": "(GOOGLE)#(LARRY PAGE)",
                  "display": "(Google)#(Larry Page)"
              },
              {
                  "value": "(GOOGLE)#(SERGEY BRIN)",
                  "display": "(Google)#(Sergey Brin)"
              },
              {
                  "value": "(TESLA MOTORS)#(NIKOLA TESLA)",
                  "display": "(Tesla Motors)#(Nikola Tesla)"
              }
          ],
          "person_job_company": [
              {
                  "value": "(NAOTO NOGUCHI)#(CHIEF TECHNOLOGY OFFICER)#(PANASONIC)",
                  "display": "(Naoto Noguchi)#(Chief Technology Officer)#(Panasonic)"
              },
              {
                  "value": "(HERBERT KOHLER)#(VICE-PRESIDENT)#(DAIMLER)",
                  "display": "(Herbert Kohler)#(Vice-President)#(Daimler)"
              },
              {
                  "value": "(JEFF SKOLL)#(CO-FOUNDER)#(J.P.MORGAN)",
                  "display": "(Jeff Skoll)#(Co-founder)#(J.P.Morgan)"
              },
              {
                  "value": "(LARRY PAGE)#(CO-FOUNDER)#(J.P.MORGAN)",
                  "display": "(Larry Page)#(Co-founder)#(J.P.Morgan)"
              },
              {
                  "value": "(NICK PRITZKER)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Nick Pritzker)#(Co-founder)#(Google)"
              },
              {
                  "value": "(NICK PRITZKER)#(CO-FOUNDER)#(J.P.MORGAN)",
                  "display": "(Nick Pritzker)#(Co-founder)#(J.P.Morgan)"
              },
              {
                  "value": "(SERGEY BRIN)#(CO-FOUNDER)#(J.P.MORGAN)",
                  "display": "(Sergey Brin)#(Co-founder)#(J.P.Morgan)"
              },
              {
                  "value": "(JEFF SKOLL)#(CO-FOUNDER)#(EBAY)",
                  "display": "(Jeff Skoll)#(Co-founder)#(eBay)"
              },
              {
                  "value": "(JEFF SKOLL)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Jeff Skoll)#(Co-founder)#(Google)"
              },
              {
                  "value": "(LARRY PAGE)#(CO-FOUNDER)#(EBAY)",
                  "display": "(Larry Page)#(Co-founder)#(eBay)"
              },
              {
                  "value": "(LARRY PAGE)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Larry Page)#(Co-founder)#(Google)"
              },
              {
                  "value": "(NICK PRITZKER)#(CO-FOUNDER)#(EBAY)",
                  "display": "(Nick Pritzker)#(Co-founder)#(eBay)"
              },
              {
                  "value": "(SERGEY BRIN)#(CO-FOUNDER)#(EBAY)",
                  "display": "(Sergey Brin)#(Co-founder)#(eBay)"
              },
              {
                  "value": "(SERGEY BRIN)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Sergey Brin)#(Co-founder)#(Google)"
              }
          ],
          "rank": 1,
          "displayTitle": "<span class=\"match-highlight\">Tesla</span>, Inc.",
          "relevantExtracts": "<b>tesla </b>... overarching purpose of <b>Tesla </b><b>Motors</b>... <b>Tesla</b>&#39;s current ... To produce these, <b>Tesla </b>operates multiple ... facility is at <b>Tesla </b>Factory ... in the market, <b>Tesla </b>ranked as ... <b>Tesla </b>global vehicle ... <b>Tesla </b>cars accounted ... by Eberhard and <b>Tesla </b>in September ... consistently maintained that <b>Tesla</b>&#39;s "
      },
      {
          "id": "/Web/Wikipedia/|Tesla_Model_S",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.996645,
          "matchingpartnames": [
              "text",
              "tables",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "Global Model S sales passed 250,000 units in September 2018 (more recent numbers are not available because {b}Tesla{nb} combines sales of Model S and Model X ).",
              "1025,153",
              "25212,208",
              "The {b}Tesla{nb} Model S was the top-selling plug-in electric car worldwide in 2015 and 2016.",
              "1269,86",
              "26228,176",
              "The December 2017 Consumer Reports owner satisfaction survey had the {b}Tesla{nb} Model S at the top for all cars",
              "1357,107",
              "26851,107",
              "In 2019, the US magazine Motor Trend named the 2013 {b}Tesla{nb} Model S the ultimate \"car of the year\" over the magazine's 70-year history.",
              "1507,133",
              "27235,220",
              "{b}Tesla{nb} Model S prototype at the 2009 Frankfurt Motor Show",
              "1651,56",
              "58183,142",
              "First production Model S, with owner and {b}Tesla{nb} board member Steve Jurvetson",
              "2535,75",
              "61842,131",
              "The {b}Tesla{nb} Model S was the 2013 World Green Car of the Year , 2013 Motor Trend Car of the Year , Automobile magazine's 2013 Car of the Year, Time Magazine 's Best 25 Inventions of the Year 2012, and Consumer Reports ' top-scoring car in road testing.",
              "3014,249",
              "63233,616",
              "Pre-facelift {b}Tesla{nb} Model S",
              "3471,26,3537,26",
              "66527,26,68547,26",
              "Facelifted {b}Tesla{nb} Model S",
              "3499,24,3565,24",
              "67300,24,69308,24",
              "{b}Tesla{nb} said that after three years (by June 2015), Model S cars traveled over 1 billion miles (1.6 billion km), the first plug-in electric car to reach that total.",
              "3602,162",
              "69515,162"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "6,5,76,5,1132,5,1273,5,1426,5,1559,5,1651,5,2177,5,2195,12,2453,5,2493,5,2576,5,2843,5,2964,5,3018,5,3484,5,3510,5,3550,5,3576,5,3602,5,3950,5,4228,5,4332,5,4625,5,4773,5,4913,5,4930,5,4958,5,5176,5,5191,5,5264,5,5328,5,5735,5,6090,5,6271,5,7456,5,7945,5,8026,5,9070,5,9658,5,10539,5,10680,5,10839,5,11021,5,11282,5,11470,5,12012,5,12467,5,12752,5,13225,5,13395,5,13515,5,15969,5,16259,5,16653,5,16747,5,17086,5,17401,5,17462,5,17485,5,17737,5,17840,5,18112,5,18495,5,18680,5,18813,5,18975,5,19016,5,23634,5,26886,5,26929,5,27052,5,28300,5,28370,5,28804,5,29744,5,30004,5,30844,5,31052,5,32258,5,32343,5,33070,5,33415,5,33692,5,33724,5,33879,5,34027,5,34168,5,35689,5,36869,5,38808,5,40253,5,40309,5,40653,5,40757,5,41282,5,41523,5,41836,5,44336,5,44451,5,44988,5,45267,5,45349,5,45418,5,45556,5,45768,5,46032,5,46053,5,46166,5,46236,5,46298,5,46340,5,46464,5,46654,5,46857,5,46976,5,47113,5,47145,5,47231,5,47684,5,47754,5,47913,5,48051,5,48320,5,48472,5,49017,5,49421,5,49483,5,49807,5,49945,5,50249,5,50374,5,51126,5,51370,5,51700,5,53885,5,55284,5,55803,5,56261,5,56486,5,57814,5,58331,5,59058,5,59189,5,59318,5,59556,5,59657,5,59769,5,60178,5,60298,5,60409,5,60479,5,60809,5,63421,5,63549,5,63739,5,64210,5,64665,5,66173,5,66915,5,67358,5,67446,5,69424,5,69845,5,72458,5,74498,5,74876,5,75041,5,75200,5,75287,5,75350,5,75392,5,75409,5,76489,5,76709,5,77292,5,77660,5,77950,5,78188,5,78686,5,78949,5,79395,5,79756,5,80648,5,80876,5,81125,5,81286,5,81391,5,81681,5,81888,5,81950,5,82226,5,82377,5,82610,5,82748,5,82855,5,83040,5,86373,5,86636,5,86800,5,86884,5,87154,5,87478,5,87625,5,88291,5,88939,5,89035,5,89269,5,89377,5,90028,5,90100,5,90339,5,90435,5,90976,5,91108,5,91313,5,92364,5,92726,5,92938,5,93374,5,93728,5,93796,5,94218,5,94290,5,94385,5,94590,5,94643,5,94791,5;22086,5,22374,5,25319,5,26232,5,26920,5,27346,5,58183,5,60018,5,60036,12,60589,5,60676,5,61883,5,62844,5,63174,5,63237,5,66540,5,67311,5,68560,5,69319,5,69515,5,70254,5,71098,5,71202,5,71773,5,72044,5,72301,5,72318,5,72469,5,74914,5,74953,5,75242,5,75377,5,76136,5,77058,5,77239,5,83338,5,84946,5,85234,5,87816,5,89074,5,90492,5,90848,5,91170,5,91477,5,92591,5,93178,5,93999,5,94748,5,95294,5,96187,5,96483,5,98188,5,105897,5,106995,5,107664,5,107884,5,108649,5,109023,5,110205,5,110393,5,111011,5,111114,5,111455,5,112312,5,112884,5,113017,5,113179,5,113226,5,137307,5,155204,5,156101,5,156272,5,160450,5,160664,5,161353,5,164708,5,166108,5,168405,5,168738,5,172345,5,172430,5,174295,5,175234,5,175511,5,175543,5,175698,5,176278,5,176419,5,180572,5,182729,5,187470,5,191038,5,191238,5,191724,5,191828,5,193943,5,194424,5,195088,5,203351,5,203466,5,205244,5,206279,5,206361,5,206430,5,206814,5,207272,5,208051,5,209358,5,209832,5,210025,5,210090,5,210132,5,210256,5,211391,5,212156,5,212395,5,212820,5,212931,5,213020,5,214888,5,215042,5,215679,5,215937,5,218116,5,218557,5,220246,5,222061,5,222214,5,222804,5,223188,5,223638,5,224055,5,226001,5,226949,5,234522,5,241728,5,246218,5,248138,5,250919,5,252084,5,280252,5,281717,5,283823,5,284100,5,284229,5,284467,5,285080,5,285340,5,286443,5,286853,5,287667,5,288052,5,290256,5,298036,5,298164,5,298354,5,301404,5,302563,5,308337,5,310494,5,311465,5,311673,5,320410,5,321788,5,329783,5,334762,5,335380,5,336027,5,336186,5,336393,5,336459,5,336508,5,336532,5,361512,5,361852,5,364273,5,364887,5,365222,5,365790,5,366564,5,366947,5,368410,5,369163,5,371558,5,371936,5,372311,5,373035,5,373140,5,374037,5,375273,5,375715,5,376119,5,376398,5,376631,5,376769,5,377124,5,377509,5,387624,5,388458,5,388761,5,389243,5,390872,5,391538,5,391805,5,392995,5,394451,5,394547,5,395626,5,396105,5,398270,5,398342,5,398581,5,398677,5,399719,5,400052,5,400420,5,404205,5,405612,5,406220,5,407256,5,407976,5,408164,5,410146,5,1726376,5,1727373,5,1728343,5,1729158,5,1732391,5"
                  },
                  {
                      "partname": "tables",
                      "data": "95079,5,95121,5,95244,5,95471,5,95485,5,95499,5,95513,5,95535,5,96537,5;1802651,5,1802695,5,1802822,5,1803058,5,1803072,5,1803086,5,1803100,5,1803122,5,1804175,5"
                  },
                  {
                      "partname": "title",
                      "data": "96587,5;1804307,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Tesla Model S",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-31 18:05:30",
          "indexationtime": "2020-09-02 03:53:41",
          "version": "Dzkk1YlvuahOWdwfYNqCvw==",
          "size": 1802542,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Tesla_Model_S",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              },
              {
                  "value": "HARRIS RANCH",
                  "display": "Harris Ranch"
              },
              {
                  "value": "FRANZ VON HOLZHAUSEN",
                  "display": "Franz von Holzhausen"
              },
              {
                  "value": "BJORN NYLAND",
                  "display": "Bjørn Nyland"
              },
              {
                  "value": "JOHN M. BRODER",
                  "display": "John M. Broder"
              },
              {
                  "value": "MARGARET SULLIVAN",
                  "display": "Margaret Sullivan"
              },
              {
                  "value": "MORGAN TORVOLT",
                  "display": "Morgan Tørvolt"
              },
              {
                  "value": "STEVE JURVETSON",
                  "display": "Steve Jurvetson"
              }
          ],
          "company": [
              {
                  "value": "NISSAN",
                  "display": "Nissan"
              },
              {
                  "value": "MERCEDES",
                  "display": "Mercedes"
              },
              {
                  "value": "NEW YORK TIMES",
                  "display": "New York Times"
              },
              {
                  "value": "AUDI",
                  "display": "Audi"
              },
              {
                  "value": "GARMIN",
                  "display": "Garmin"
              },
              {
                  "value": "GOOGLE",
                  "display": "Google"
              },
              {
                  "value": "PANASONIC",
                  "display": "Panasonic"
              },
              {
                  "value": "RENAULT",
                  "display": "Renault"
              },
              {
                  "value": "TEJON RANCH",
                  "display": "Tejon Ranch"
              },
              {
                  "value": "VOLKSWAGEN",
                  "display": "Volkswagen"
              },
              {
                  "value": "AWD",
                  "display": "AWD"
              },
              {
                  "value": "FORBES",
                  "display": "Forbes"
              },
              {
                  "value": "PORSCHE",
                  "display": "Porsche"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
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
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "EUROPE",
                  "display": "Europe"
              },
              {
                  "value": "NORWAY",
                  "display": "Norway"
              },
              {
                  "value": "NORTH AMERICA",
                  "display": "North America"
              },
              {
                  "value": "CHINA",
                  "display": "China"
              },
              {
                  "value": "NETHERLANDS",
                  "display": "Netherlands"
              },
              {
                  "value": "CANADA",
                  "display": "Canada"
              },
              {
                  "value": "GERMANY",
                  "display": "Germany"
              },
              {
                  "value": "DENMARK",
                  "display": "Denmark"
              },
              {
                  "value": "SWITZERLAND",
                  "display": "Switzerland"
              },
              {
                  "value": "UK",
                  "display": "UK"
              },
              {
                  "value": "ASIA",
                  "display": "Asia"
              },
              {
                  "value": "FREMONT",
                  "display": "Fremont"
              },
              {
                  "value": "HONG KONG",
                  "display": "Hong Kong"
              },
              {
                  "value": "WASHINGTON",
                  "display": "Washington"
              },
              {
                  "value": "AUSTRALIA",
                  "display": "Australia"
              },
              {
                  "value": "TILBURG",
                  "display": "Tilburg"
              },
              {
                  "value": "UNITED KINGDOM",
                  "display": "United Kingdom"
              },
              {
                  "value": "NEW JERSEY",
                  "display": "New Jersey"
              }
          ],
          "wordcount": 12659,
          "exacthash": "qeOl8oc5BzRTcRQGsk/l+A==",
          "nearhash": "sURdd0aB2TFDka8Gnk27gg==",
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
          "url1": "https://en.wikipedia.org/wiki/Tesla_Model_S",
          "sourcecsv1": [
              "Manufacturer",
              "Also called",
              "Production",
              "Assembly",
              "Designer",
              "Class",
              "Body style",
              "Layout",
              "Related",
              "Electric motor",
              "Transmission",
              "Battery",
              "Electric range",
              "Plug-in charging",
              "Wheelbase",
              "Length",
              "Width",
              "Height",
              "Curb weight",
              "External images",
              "External video"
          ],
          "sourcecsv2": [
              "Curtiss_Model_S",
              "Tesla,_Inc.",
              "Code_name",
              "Fremont,_California",
              "Tesla_Factory",
              "Tilburg",
              "Knock-down_kit",
              "Automotive_design",
              "Franz_von_Holzhausen",
              "Car_classification",
              "Full-size_car",
              "Luxury_vehicle",
              "F-segment",
              "Grand_tourer",
              "S-segment",
              "Car_body_style",
              "Liftback",
              "Sedan_(automobile)",
              "Automobile_layout",
              "Rear-engine,_rear-wheel_drive_layout",
              "All-wheel_drive",
              "Tesla_Model_X",
              "Tesla_Model_3",
              "Tesla_Model_Y",
              "Tesla_Roadster_(2008)",
              "Tesla_Roadster_(2020)",
              "Electric_motor",
              "AC_induction_motor",
              "Transmission_(mechanics)",
              "Electric_vehicle_battery",
              "KWh",
              "Lithium-ion_battery",
              "All-electric_range",
              "FTP-75",
              "New_European_Driving_Cycle",
              "Charging_station",
              "Type_2_connector",
              "Split-phase_electric_power",
              "Wheelbase",
              "Curb_weight",
              "Electric_car",
              "Tesla_Autopilot",
              "Plug-in_electric_car",
              "Motor_Trend",
              "Frankfurt_Motor_Show",
              "Mazda_North_American_Operations",
              "Menlo_Park,_California",
              "Range_extender_(vehicle)",
              "Gasoline_engine",
              "Elon_Musk",
              "Steve_Jurvetson",
              "Albuquerque,_New_Mexico",
              "San_Jose,_California",
              "NUMMI",
              "World_Car_of_the_Year",
              "Motor_Trend_Car_of_the_Year",
              "Automobile_(magazine)",
              "Time_(magazine)",
              "Consumer_Reports",
              "Car_and_Driver",
              "HEPA",
              "Source_code",
              "GitHub",
              "Software_license",
              "Software_Freedom_Conservancy",
              "Chassis",
              "Powertrain",
              "Battery_pack",
              "Car_classifications",
              "Euro_Car_Segment",
              "Regenerative_braking",
              "Three-phase_electric_power",
              "Alternating_current",
              "Induction_motor",
              "Rotor_(electric)",
              "Automobile_drag_coefficient",
              "Open_differential",
              "Electronic_differential",
              "Speed_limiter",
              "Gee_force",
              "Fan_(machine)",
              "18650",
              "Panasonic",
              "Cathode",
              "Thermal_insulation",
              "Waste_heat",
              "Heating_element",
              "Shore_power",
              "G-force",
              "Free_fall",
              "Silicon",
              "Anode",
              "Fuse_(electrical)",
              "Inconel",
              "Tesla_Supercharger",
              "One_foot_rollout",
              "United_States_Environmental_Protection_Agency",
              "Fuel_economy_in_automobiles",
              "Miles_per_gallon_gasoline_equivalent",
              "Drag_(physics)",
              "Hotel_electric_power",
              "Battery_electric_vehicle",
              "Center_of_gravity",
              "Automobile_handling",
              "Lotus_Elise",
              "Formula_One_car",
              "Vehicle_rollover",
              "Mass_distribution",
              "Rotational_inertia",
              "Anti-intrusion_bar",
              "Automobile_safety",
              "SAE_J1772",
              "Circuit_breaker",
              "AC_power_plugs_and_sockets#NEMA_14-50",
              "RVs",
              "Three-phase",
              "IEC_62196",
              "IEC_60309",
              "Combined_Charging_System",
              "Independent_suspension",
              "Coil_spring",
              "Double_wishbone_suspension",
              "Control_arm",
              "Multi-link_suspension",
              "Self-leveling_suspension",
              "Height_adjustable_suspension",
              "Air_suspension",
              "Ground_clearance",
              "NHTSA",
              "Autonomous_car",
              "Lane_centering",
              "Mobileye",
              "Robert_Bosch_GmbH",
              "Acoustic_location",
              "Adaptive_cruise_control",
              "Hands-free_driving",
              "Narrow_AI",
              "Williston,_Florida",
              "National_Highway_Traffic_Safety_Administration",
              "Florida_Highway_Patrol",
              "Touchscreen",
              "Liquid-crystal_display",
              "Electronic_instrument_cluster",
              "Garmin",
              "Infotainment",
              "Multi-touch",
              "HomeLink",
              "Vehicle_identification_number",
              "Bluetooth",
              "Google_Maps",
              "Nvidia",
              "Tegra_3",
              "3D_computer_graphics",
              "System_on_a_chip",
              "Multi-core",
              "ARM_architecture",
              "CPU",
              "GPU",
              "GPS",
              "OVMS",
              "Smartphone",
              "Linux",
              "Operating_system",
              "On-board_diagnostics",
              "Ethernet",
              "Ubuntu_(operating_system)",
              "Five-point_harness",
              "Electromechanical_brake",
              "Pillar_(car)",
              "Gigafactory_1",
              "Umicore",
              "Battery_recycling",
              "Restriction_of_Hazardous_Substances_Directive",
              "Life-cycle_assessment",
              "Nissan_Leaf",
              "Union_of_Concerned_Scientists",
              "Moscow",
              "NEMA_5-15",
              "NEMA_14-50",
              "IEC_60309#Red_3P+N+E,_6h",
              "AC_power_plugs_and_sockets",
              "BS_1363",
              "CHAdeMO",
              "Harris_Ranch",
              "Interstate_5_in_California",
              "Tejon,_California",
              "Selma,_California",
              "Chief_Minister_of_Gibraltar",
              "Convertible",
              "Oceanic_Preservation_Society",
              "Obscura_Digital",
              "Holocene_mass_extinction",
              "Racing_Extinction",
              "University_of_California,_Davis",
              "Right-_and_left-hand_traffic",
              "BAIC_EC-Series",
              "City_car",
              "Liechtenstein",
              "New_South_Wales",
              "Victoria_(Australia)",
              "St_Leonards,_New_South_Wales",
              "Pyrmont,_New_South_Wales",
              "Chauffeur",
              "Oslo",
              "Renault_Zoe",
              "Audi_A8",
              "BMW_7_Series",
              "Jaguar_XJ",
              "Mercedes-Benz_S-Class",
              "Folketing",
              "Amsterdam_Airport_Schiphol",
              "Plug-in_electric_vehicles_in_the_Netherlands",
              "Lyngdal",
              "Aurland",
              "Domb%C3%A5s",
              "Gol,_Norway",
              "Sundebru",
              "Lillehammer",
              "Volkswagen_Golf",
              "Ford_Sierra",
              "Mercedes_S-Class",
              "London_congestion_charge",
              "Mexico_City",
              "Plug-in_electric_vehicle",
              "Chevrolet_Volt",
              "Edmunds.com",
              "Market_share",
              "ZIP_code",
              "Forbes",
              "Atherton,_California",
              "Los_Altos_Hills,_California",
              "Portola_Valley,_California",
              "Mercedes-Benz_E-Class",
              "BMW_5_Series",
              "Full-size_luxury_car",
              "Ward%27s",
              "Chevrolet_Bolt",
              "Tesla_US_dealership_disputes",
              "YouTube",
              "Euro_NCAP",
              "IIHS",
              "Side_collision",
              "Insurance_Institute_for_Highway_Safety",
              "Plug-in_electric_vehicle_fire_incidents",
              "Washington_State_Route_167",
              "Kent,_Washington",
              "HOV_lane",
              "Battery_(electricity)",
              "Ton",
              "Tow_hitch",
              "Accident_Investigation_Board_Norway",
              "Product_recall",
              "Takata_Corporation",
              "Automobile_Magazine",
              "CNET",
              "Hagerty_Insurance_Agency",
              "Natural_Resources_Canada",
              "Popular_Science",
              "The_Daily_Telegraph",
              "Yahoo!",
              "American_Automobile_Association",
              "R%C3%B8dekro",
              "Energy-efficient_driving",
              "Laguna_Seca_Raceway",
              "Porsche_Taycan",
              "N%C3%BCrburgring_Nordschleife",
              "The_New_York_Times",
              "East_Coast_of_the_United_States",
              "Flatbed_truck",
              "Milford,_Connecticut",
              "Dub_(wheel)",
              "CNN",
              "CNBC",
              "Firmware",
              "Public_Editor",
              "Die_Welt",
              "Dynamometer",
              "Stuff_(magazine)",
              "Electric_car_use_by_country",
              "Government_incentives_for_plug-in_electric_vehicles",
              "List_of_electric_cars_currently_available",
              "List_of_fastest_production_cars_by_acceleration",
              "List_of_modern_production_plug-in_electric_vehicles",
              "List_of_production_battery_electric_vehicles",
              "List_of_Easter_eggs_in_Tesla_products",
              "Gizmodo.com",
              "San_Jose_Mercury_News",
              "Cleantechnica.com",
              "Palo_Alto",
              "CleanTechnica",
              "Road_%26_Track",
              "Western_Morning_News",
              "Fortune_(magazine)",
              "Reuters",
              "The_Wall_Street_Journal",
              "JB_Straubel",
              "Wired_(website)",
              "U._S._Environmental_Protection_Agency",
              "U.S._Department_of_Energy",
              "Tesla_Motors",
              "Seeking_Alpha",
              "Quartz_(publication)",
              "U.S._Environmental_Protection_Agency",
              "Scientific_American",
              "Automotive_News",
              "Fortunes",
              "The_Guardian",
              "San_Francisco",
              "The_Verge",
              "Teknisk_Ukeblad",
              "Associated_Press",
              "Motley_Fool",
              "Seattle_P-I",
              "Doi_(identifier)",
              "Bloomberg_News",
              "Los_Angeles_Times",
              "International_Business_Times",
              "Wayback_Machine",
              "RAC_Foundation",
              "South_China_Morning_Post",
              "Rolle",
              "Hospod%C3%A1%C5%99sk%C3%A9_noviny",
              "Jyllandsposten",
              "Politiken",
              "Aarhus_University,_School_of_Business_and_Social_Sciences",
              "The_Globe_and_Mail",
              "San_Francisco_Chronicle",
              "Mojo_Motors,_Inc.",
              "Business_Insider",
              "Ars_Technica",
              "The_Detroit_News",
              "AOL_Inc.",
              "Verdens_Gang",
              "Bloomberg_Businessweek",
              "USA_Today",
              "NBC_News",
              "Jalopnik",
              "Auto_motor_und_sport",
              "James_Poniewozik",
              "Digital_Trends",
              "United_Nations_Economic_Commission_for_Europe",
              "ISBN_(identifier)",
              "Tesla_Cybertruck",
              "Tesla_Cyberquad",
              "Tesla_Semi",
              "Mercedes_A-Class_E-Cell",
              "Mercedes-Benz_B-Class_Electric_Drive",
              "Smart_electric_drive",
              "Toyota_RAV4_EV",
              "Tesla_Solar_Roof",
              "Tesla_Powerwall",
              "Tesla_Powerpack",
              "Tesla_Megapack",
              "Robyn_Denholm",
              "Zach_Kirkhorn",
              "Drew_Baglino",
              "Jerome_Guillen",
              "Larry_Ellison",
              "Hiromichi_Mizuno",
              "Andrej_Karpathy",
              "Kathleen_Wilson-Thompson",
              "Deepak_Ahuja",
              "Ze%27ev_Drori",
              "Martin_Eberhard",
              "Arnnon_Geshuri",
              "Jim_Keller_(engineer)",
              "Chris_Lattner",
              "Marc_Tarpenning",
              "J._B._Straubel",
              "Jay_Vijayan",
              "Tesla_facilities_in_Tilburg",
              "Giga_Nevada",
              "Giga_New_York",
              "Giga_Shanghai",
              "Giga_Berlin",
              "Gigafactory_5",
              "Lawsuits_and_Controversies_of_Tesla,_Inc.",
              "Sudden_unintended_acceleration#Tesla&#39",
              "s_Model_X,_S_and_3",
              "TSLAQ",
              "History_of_Tesla,_Inc.",
              "SolarCity",
              "Elon_Musk%27s_Tesla_Roadster",
              "Giga_Press",
              "Hornsdale_Power_Reserve",
              "Maxwell_Technologies",
              "Compact_executive_car",
              "Mid-size_car",
              "Luxury_car",
              "Compact_car",
              "Crossover_(automobile)",
              "Sport_Utility_Vehicle",
              "Roadster_(automobile)"
          ],
          "sourcestr1": "Tesla_Model_S",
          "sourcestr2": "Q1463050",
          "sourcestr3": "Q3231690",
          "category": "automobile model",
          "sourcevarchar3": "[{\"Tesla Model S\":\"\",\"Overview\":\"\",\"Manufacturer\":\"Tesla, Inc.\",\"Also called\":[\"Code name\",\": WhiteStar\"],\"Production\":\"2012\\u2013present\",\"Assembly\":[\"United States:\",\"Fremont\",\", California (\",\"Tesla Factory\",\"Netherlands:\",\"Tilburg\"],\"Designer\":\"Franz von Holzhausen\",\"Body and chassis\":\"\",\"Class\":[\"Full-size\",\"\\/\",\"Luxury Car\"],\"Body style\":[\"5-door\",\"liftback\",\"sedan\"],\"Layout\":[\"Rear-motor, rear-wheel drive\",\"Dual-motor\",\"all-wheel drive\"],\"Related\":[\"Tesla Model X\",\"Tesla Model 3\",\"Tesla Model Y\",\"Tesla Roadster (2008)\",\"Tesla Roadster (2020)\"],\"Powertrain\":\"\",\"Electric motor\":[\"Front and rear motor combined output up to 615kW (825bhp), 1,300N\\u22c5m (960lb\\u22c5ft), 3-phase\",\"AC induction motor\"],\"Transmission\":\"1-speed fixed gear (9.734:1 or 9.325:1)\",\"Battery\":[\"100\",\"kWh\",\"lithium ion\",\"60, 70, 75, 85, 90\",\"kWh\",\"discontinued\"],\"Electric range\":[\"75kWh (270MJ)\",\"249\\u2013259mi (401\\u2013417km)\",\"85kWh (310MJ)\",\"253\\u2013272mi (407\\u2013438km)\",\"310mi (500km)\",\"90kWh (320MJ)\",\"270\\u2013294mi (435\\u2013473km)\",\"100kWh (360MJ)\",\"348\\u2013402mi (560\\u2013647km)\"],\"Plug-in charging\":[\"Onboard charger\",\"3\\u03d5 400V 16A\"],\"Dimensions\":\"\",\"Wheelbase\":\"116.5in (2,960mm)\",\"Length\":\"195.9in (4,980mm)\",\"Width\":[\"77.3in (1,964mm) (ex. mirrors)\",\"86.2in (2,189mm) (inc. mirrors)\"],\"Height\":\"56.5in (1,440mm)\",\"Curb weight\":\"4,323\\u20134,960lb (1,961\\u20132,250kg)\"},{\"External images\":[\"Speed-dependent power consumption\",\"Speed-dependent ranges of various Model S\",\"Speed-dependent mileage, Model S & Roadster\"]},{\"External video\":[[\"NHTSA Frontal crash test\",\"on\",\"YouTube\"],[\"NHTSA Side crash test\",\"on\",\"YouTube\"],[\"NHTSA Pole crash test\",\"on\",\"YouTube\"],[\"EuroNCAP crash test\",\"on\",\"YouTube\"],[\"Tesla EV Safety Training for rescuers\",\"on\",\"YouTube\"]]}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/2018_Tesla_Model_S_75D.jpg/1200px-2018_Tesla_Model_S_75D.jpg",
          "sourcedouble1": 0.018174,
          "entity1": [
              {
                  "value": "100",
                  "display": "100"
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
                  "value": "2014",
                  "display": "2014"
              },
              {
                  "value": "2013",
                  "display": "2013"
              },
              {
                  "value": "2017",
                  "display": "2017"
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
                  "value": "60",
                  "display": "60"
              },
              {
                  "value": "85",
                  "display": "85"
              },
              {
                  "value": "1",
                  "display": "1"
              },
              {
                  "value": "5",
                  "display": "5"
              },
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "22",
                  "display": "22"
              },
              {
                  "value": "2019",
                  "display": "2019"
              },
              {
                  "value": "20",
                  "display": "20"
              },
              {
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "70",
                  "display": "70"
              },
              {
                  "value": "90",
                  "display": "90"
              },
              {
                  "value": "6",
                  "display": "6"
              }
          ],
          "date": [
              {
                  "value": "2012-06-22",
                  "display": "2012-06-22"
              },
              {
                  "value": "2015-04-08",
                  "display": "2015-04-08"
              },
              {
                  "value": "2012-06-01",
                  "display": "2012-06-01"
              },
              {
                  "value": "2013-02-08",
                  "display": "2013-02-08"
              },
              {
                  "value": "2013-02-18",
                  "display": "2013-02-18"
              },
              {
                  "value": "2013-05-10",
                  "display": "2013-05-10"
              },
              {
                  "value": "2013-06-08",
                  "display": "2013-06-08"
              },
              {
                  "value": "2013-06-14",
                  "display": "2013-06-14"
              },
              {
                  "value": "2013-08-07",
                  "display": "2013-08-07"
              },
              {
                  "value": "2013-08-19",
                  "display": "2013-08-19"
              },
              {
                  "value": "2013-08-22",
                  "display": "2013-08-22"
              },
              {
                  "value": "2013-10-01",
                  "display": "2013-10-01"
              },
              {
                  "value": "2013-10-24",
                  "display": "2013-10-24"
              },
              {
                  "value": "2013-11-06",
                  "display": "2013-11-06"
              },
              {
                  "value": "2013-11-12",
                  "display": "2013-11-12"
              },
              {
                  "value": "2013-12-12",
                  "display": "2013-12-12"
              },
              {
                  "value": "2013-12-13",
                  "display": "2013-12-13"
              },
              {
                  "value": "2014-01-13",
                  "display": "2014-01-13"
              },
              {
                  "value": "2014-03-06",
                  "display": "2014-03-06"
              },
              {
                  "value": "2014-03-28",
                  "display": "2014-03-28"
              }
          ],
          "money": [
              {
                  "value": "USD 500000",
                  "display": "USD 500000"
              }
          ],
          "entity7": [
              {
                  "value": "1.131, 1.299",
                  "display": "1.131, 1.299"
              },
              {
                  "value": "1.181, 3.633",
                  "display": "1.181, 3.633"
              },
              {
                  "value": "1.248, 2.241",
                  "display": "1.248, 2.241"
              },
              {
                  "value": "1.319, 0.6",
                  "display": "1.319, 0.6"
              },
              {
                  "value": "1.465, 1.192",
                  "display": "1.465, 1.192"
              },
              {
                  "value": "1.474, 1.582",
                  "display": "1.474, 1.582"
              },
              {
                  "value": "1.675, 1.466",
                  "display": "1.675, 1.466"
              },
              {
                  "value": "1.693, 1.805",
                  "display": "1.693, 1.805"
              },
              {
                  "value": "1.756, 2.518",
                  "display": "1.756, 2.518"
              },
              {
                  "value": "1.835, 0.9",
                  "display": "1.835, 0.9"
              },
              {
                  "value": "11.858, 6.334",
                  "display": "11.858, 6.334"
              },
              {
                  "value": "13.839, 5.3",
                  "display": "13.839, 5.3"
              },
              {
                  "value": "2.221, 1.0",
                  "display": "2.221, 1.0"
              },
              {
                  "value": "2.367, 1.389",
                  "display": "2.367, 1.389"
              },
              {
                  "value": "20.639, 7.4",
                  "display": "20.639, 7.4"
              },
              {
                  "value": "25.745, 26.500",
                  "display": "25.745, 26.500"
              },
              {
                  "value": "29.156, 25.202",
                  "display": "29.156, 25.202"
              },
              {
                  "value": "3.025, 2.499",
                  "display": "3.025, 2.499"
              },
              {
                  "value": "3.358, 1.3",
                  "display": "3.358, 1.3"
              },
              {
                  "value": "3.432, 1.6",
                  "display": "3.432, 1.6"
              }
          ],
          "entity12": [
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
              },
              {
                  "value": "VICTORY",
                  "display": "Victory"
              },
              {
                  "value": "BIRTH",
                  "display": "Birth"
              }
          ],
          "entity13": [
              {
                  "value": "CHIEF EXECUTIVE OFFICER",
                  "display": "Chief Executive Officer"
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
                  "value": "LOSSES",
                  "display": "Losses"
              },
              {
                  "value": "CAPITAL",
                  "display": "Capital"
              },
              {
                  "value": "REVENUE",
                  "display": "Revenue"
              }
          ],
          "person_cooc": [
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(ELON MUSK)",
                  "display": "(Chief Executive Officer)#(Elon Musk)"
              }
          ],
          "value_amount": [
              {
                  "value": "(SHARES)#(USD 500000)",
                  "display": "(Shares)#(USD 500000)"
              }
          ],
          "company_person": [
              {
                  "value": "(NEW YORK TIMES)#(JOHN M. BRODER)",
                  "display": "(New York Times)#(John M. Broder)"
              },
              {
                  "value": "(NEW YORK TIMES)#(MARGARET SULLIVAN)",
                  "display": "(New York Times)#(Margaret Sullivan)"
              }
          ],
          "rank": 2,
          "displayTitle": "<span class=\"match-highlight\">Tesla</span> Model S",
          "relevantExtracts": "not available because <b>Tesla </b>combines sales of ... The <b>Tesla </b>Model S was ... survey had the <b>Tesla </b>Model S at ... named the 2013 <b>Tesla </b>Model S the ... <b>Tesla </b>Model S prototype ... with owner and <b>Tesla </b>board ... The <b>Tesla </b>Model S was ... Pre-facelift <b>Tesla </b>... Facelifted <b>Tesla </b>... <b>Tesla </b>said that after "
      },
      {
          "id": "/Web/Wikipedia/|Tesla_Inc",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.990772,
          "matchingpartnames": [
              "text",
              "tables",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "{b}tesla{nb} .",
              "91971,7",
              "2209792,7",
              "Musk, who formerly served as chairman and is the current CEO, said in 2006 that \"the overarching purpose of {b}Tesla Motors{nb}...",
              "632,123",
              "31076,123",
              "{b}Tesla{nb}'s current products include cars (the Model S , Model 3 , Model X , and Model Y ), batteries (the Powerwall , Powerpack , and Megapack ), solar products ( solar panels and solar roof tiles ) and related products and services.",
              "1001,230",
              "31968,1939",
              "To produce these, {b}Tesla{nb} operates multiple production and assembly plants.",
              "1232,73",
              "34152,73",
              "Its main vehicle manufacturing facility is at {b}Tesla{nb} Factory in Fremont, California .",
              "1306,84",
              "34226,324",
              "After 11 years in the market, {b}Tesla{nb} ranked as the world's best-selling plug-in and battery electric passenger car manufacturer in 2019, both as a brand and by automotive group, with a market share of 17% of the plug-in segment and 23% of the battery electric segment.",
              "1463,267",
              "34908,423",
              "{b}Tesla{nb} global vehicle sales increased 50% from 245,240 units in 2018 to 367,849 units in 2019.",
              "1731,93",
              "35463,210",
              "{b}Tesla{nb} cars accounted for 81% of the battery electric vehicles sold in the United States in the first half of 2020.",
              "2013,114",
              "36283,114",
              "A lawsuit settlement agreed to by Eberhard and {b}Tesla{nb} in September 2009 allows all five (Eberhard, Tarpenning, Wright, Musk and Straubel) to call themselves co-founders.",
              "3274,168",
              "83019,168",
              "From the beginning, Musk consistently maintained that {b}Tesla{nb}'s long-term strategic goal was to create affordable mass market electric vehicles.",
              "4062,142",
              "84658,142"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "2,5,24,12,406,12,495,5,740,12,1001,5,1250,5,1352,5,1493,5,1731,5,2013,5,2154,12,2180,5,2213,12,2228,5,3321,5,3925,5,4045,5,4116,5,4205,5,4538,5,4728,5,5198,5,5315,12,5492,12,5527,5,5559,5,5657,5,5787,5,5983,5,6127,5,6215,5,6325,5,7125,5,7399,5,7478,5,7574,5,7849,5,7984,5,8070,5,8243,5,8428,5,8558,5,8699,5,8889,5,9044,5,9178,5,9207,5,9301,5,9339,5,9512,5,9933,5,10063,5,10221,5,10364,5,10406,5,10547,5,10592,5,10779,5,10821,5,10947,5,11028,5,11162,5,11265,5,11488,5,11566,5,11610,5,11747,5,11775,5,11874,5,12092,5,12189,5,12349,5,12666,5,12816,5,12907,5,13059,5,13209,5,13437,5,13846,5,13981,5,14145,5,15864,5,15989,5,16450,5,16482,5,16620,5,17028,5,17134,5,17378,5,17727,5,17794,5,18060,5,18112,5,18289,5,18344,5,18374,5,18504,5,18741,5,18910,5,18977,5,19048,5,19089,5,19142,5,19471,5,19592,5,19985,5,20199,5,20429,5,20713,5,20924,5,21122,5,21276,5,21324,5,21563,5,22081,5,22249,5,22324,5,22482,5,22643,5,22867,5,22913,5,23071,5,23130,5,23328,5,23455,5,23741,5,24045,5,24201,5,24343,5,24481,5,24516,5,24683,5,25036,5,25155,5,25202,5,25373,5,25484,5,25871,5,26075,5,26361,5,26734,5,27056,5,27148,5,27311,5,27402,5,27474,5,27786,5,27906,5,29123,5,29328,5,29366,5,29576,5,30071,5,30215,5,30311,5,30755,5,30975,5,31077,5,31365,5,31431,5,31789,5,32423,5,32800,5,32908,5,33359,5,34284,5,34629,5,35714,5,35745,5,35851,5,35935,5,36781,5,36820,5,37089,5,37254,5,38119,5,38131,5,38153,5,38238,5,38685,5,39042,5,39264,5,39660,5,39944,5,40063,5,40612,5,40718,5,40840,12,40858,5,41827,5,42108,5,42361,5,42581,5,42697,5,42737,5,42850,5,43500,5,43693,5,43763,5,44774,5,45027,5,45332,5,45455,5,46283,5,46342,5,46356,5,46370,5,46384,5,46398,5,46427,5,46478,5,46492,5,46507,5,46933,5,46947,5,46991,5,47145,5,47159,5,47203,5,47311,5,47328,5,47342,5,47357,5,47418,5,47444,5,47467,5,47513,5,47677,5,47788,5,47966,5,48129,5,48233,5,48547,5,48707,5,48766,5,48796,5,48964,5,49167,5,49184,5,49966,5,50102,5,50173,5,50341,5,50376,5,50463,5,50530,5,50761,5,50994,5,51028,5,51130,5,51201,5,51283,5,51342,5,51450,5,51475,5,51575,5,51599,5,51749,5,51835,5,51870,5,51932,5,52231,5,52338,5,52515,5,52552,5,52643,5,52850,5,53039,5,53204,5,53366,5,53631,5,53731,5,53911,5,53995,5,54106,5,54352,5,54470,5,54546,5,54795,5,54926,5,55042,5,55292,5,55371,5,55717,5,55827,5,55945,5,56132,5,56311,5,56414,5,56561,5,56820,5,57010,5,57018,5,57371,5,57693,5,58258,5,58291,5,58444,5,58454,5,58527,5,58886,5,59127,5,59384,5,59688,5,59826,5,60080,5,60498,5,60536,5,60734,5,60888,5,60955,5,61351,5,61440,5,61467,5,61938,5,61945,5,62118,5,62435,5,62937,5,63240,5,63373,5,63845,5,64206,5,64359,5,64710,5,64956,5,65529,5,65863,5,65884,5,66033,5,66335,5,66486,5,66605,5,66663,5,66760,5,66824,5,66990,5,67151,5,67422,5,67499,5,67807,5,68026,5,68290,5,68451,5,68588,5,68618,5,68704,5,68844,5,68978,5,69113,5,69259,5,69468,5,69563,5,70751,5,70892,5,71197,5,71374,5,71688,5,71826,5,71977,5,72122,5,72281,5,72392,5,72445,5,72515,5,72834,5,72994,5,73247,5,73474,5,73519,5,73659,5,73861,5,74027,5,74781,5,75046,5,75114,5,75310,5,75335,5,75616,5,75885,5,76082,5,76341,5,76780,5,76879,5,77058,5,77180,5,77382,5,77735,5,77932,5,78086,5,78285,5,78346,5,78989,5,79383,5,79635,5,79787,5,79945,5,80233,5,80433,5,80496,5,80826,5,80996,5,81355,5,81374,5,81464,5,81728,5,82616,5,82714,5,83204,5,83330,5,83516,5,83858,5,83900,5,84101,5,84265,5,84502,5,84637,5,84736,5,84956,5,85136,5,85184,5,85262,5,85438,5,85599,5,85677,5,86042,5,86348,5,86941,5,87067,5,87392,5,87451,5,90037,5,90475,12,90596,5,90725,5,90804,5,90836,5;29303,5,29332,12,30562,12,30703,5,31184,12,31968,5,34170,5,34324,5,34938,5,35463,5,36283,5,79369,12,79395,5,79751,12,79769,5,83066,5,84218,5,84518,5,84712,5,84936,5,85416,5,85861,5,87454,5,87694,12,88197,12,88232,5,88270,5,88491,5,88745,5,89171,5,89503,5,90622,5,90893,5,93006,5,93525,5,93721,5,93935,5,94460,5,94713,5,94922,5,95339,5,95524,5,95899,5,96391,5,97165,5,97456,5,97941,5,98087,5,99122,5,99253,5,99676,5,101768,5,102122,5,102280,5,102540,5,102698,5,103016,5,103061,5,103797,5,104301,5,104427,5,105208,5,105551,5,106159,5,107650,5,107839,5,107883,5,108213,5,108541,5,108842,5,110234,5,110787,5,111553,5,112765,5,113279,5,113490,5,113945,5,114312,5,114825,5,116026,5,116289,5,117585,5,135644,5,135841,5,138150,5,138258,5,138639,5,139893,5,139999,5,141189,5,141839,5,142034,5,142878,5,143180,5,143714,5,143906,5,143936,5,144196,5,144569,5,145112,5,146562,5,147754,5,148620,5,148693,5,149744,5,149991,5,150918,5,151302,5,151982,5,152626,5,153083,5,153856,5,154141,5,154426,5,155301,5,156384,5,157428,5,157605,5,157894,5,158055,5,158523,5,158902,5,159277,5,159481,5,160123,5,160250,5,160973,5,161779,5,163185,5,163684,5,163822,5,164157,5,164716,5,165752,5,165969,5,166144,5,166943,5,167174,5,168405,5,168969,5,169501,5,170605,5,171047,5,171265,5,171548,5,171950,5,172085,5,174981,5,175169,5,181148,5,181719,5,181797,5,183013,5,184563,5,186148,5,186270,5,187610,5,188070,5,188843,5,190533,5,190619,5,191943,5,193695,5,194664,5,195059,5,197345,5,200098,5,201955,5,207955,5,208010,5,208356,5,208947,5,210745,5,210836,5,212933,5,213118,5,214871,5,216035,5,216123,5,216354,5,217123,5,217746,5,218223,5,220676,5,221233,5,221352,5,222627,5,223394,5,223688,12,223706,5,225905,5,226365,5,226864,5,227324,5,227620,5,227719,5,227962,5,230078,5,230635,5,230898,5,233438,5,234105,5,234863,5,236044,5,238038,5,238898,5,238973,5,239048,5,239123,5,239217,5,239416,5,240244,5,240319,5,240360,5,243980,5,244058,5,244132,5,245405,5,245480,5,245554,5,246763,5,246841,5,246916,5,246990,5,248144,5,248226,5,248273,5,248512,5,249204,5,249441,5,249933,5,251322,5,251706,5,252483,5,253036,5,253372,5,254085,5,254952,5,255214,5,255393,5,257719,5,257902,5,258029,5,258981,5,259164,5,259251,5,259438,5,259669,5,260027,5,260181,5,260283,5,261493,5,261730,5,262010,5,262177,5,262252,5,263792,5,263836,5,264308,5,265176,5,265231,5,265533,5,266540,5,266772,5,267069,5,267226,5,267683,5,268228,5,268797,5,269845,5,270267,5,271391,5,271570,5,272097,5,272398,5,272509,5,272875,5,273113,5,273293,5,274055,5,274546,5,274849,5,275588,5,275667,5,276071,5,276416,5,276626,5,276911,5,277316,5,277419,5,277873,5,278840,5,281034,5,281182,5,282594,5,283271,5,285198,5,285411,5,285725,5,285735,5,286395,5,287798,5,288194,5,288936,5,289610,5,290036,5,290338,5,291204,5,291413,5,292257,5,292542,5,293251,5,294051,5,294270,5,294417,5,295348,5,295355,5,295528,5,296241,5,297009,5,297554,5,297687,5,298625,5,299454,5,299741,5,300527,5,301021,5,301856,5,302769,5,302790,5,303059,5,303491,5,303772,5,304090,5,304222,5,304447,5,304511,5,304927,5,305224,5,305621,5,305698,5,306126,5,306473,5,307052,5,307282,5,307610,5,307640,5,307846,5,308226,5,308480,5,308865,5,309355,5,309774,5,310109,5,313090,5,313619,5,314466,5,314763,5,315275,5,315533,5,315818,5,316192,5,316479,5,316838,5,317011,5,317321,5,317845,5,318135,5,318646,5,319133,5,319308,5,319578,5,319910,5,320263,5,321911,5,322395,5,322469,5,322971,5,322996,5,323497,5,324148,5,324585,5,324964,5,325665,5,325952,5,326556,5,327060,5,327508,5,328812,5,329129,5,329406,5,329851,5,329912,5,331119,5,331957,5,332579,5,332731,5,333015,5,333307,5,333708,5,333901,5,334491,5,335062,5,335421,5,335440,5,335530,5,336319,5,337974,5,338072,5,338863,5,339289,5,339792,5,340296,5,340338,5,340993,5,341371,5,341854,5,342304,5,342643,5,343213,5,343783,5,343835,5,343913,5,344323,5,344484,5,344568,5,345738,5,346346,5,347807,5,348514,5,349425,5,349525,5,359791,5,1845138,12,1845783,5,1848041,5,1848988,5,1849513,5"
                  },
                  {
                      "partname": "tables",
                      "data": "91004,12,91469,5,91877,5,91971,5;2208789,12,2209268,5,2209696,5,2209792,5"
                  },
                  {
                      "partname": "title",
                      "data": "91983,5;2209884,5"
                  }
              ]
          },
          "groupcount": 2,
          "title": "Tesla, Inc.",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-02 01:46:04",
          "indexationtime": "2020-09-02 08:13:22",
          "version": "DMM6iC73MGIMSCKVYa1D7w==",
          "size": 2208669,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Tesla_Inc",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              },
              {
                  "value": "MARTIN EBERHARD",
                  "display": "Martin Eberhard"
              },
              {
                  "value": "EDGAR MONSERRATT",
                  "display": "Edgar Monserratt"
              },
              {
                  "value": "EDWARD CHEN",
                  "display": "Edward Chen"
              },
              {
                  "value": "HERBERT KOHLER",
                  "display": "Herbert Kohler"
              },
              {
                  "value": "IRA EHRENPREIS",
                  "display": "Ira Ehrenpreis"
              },
              {
                  "value": "NAOTO NOGUCHI",
                  "display": "Naoto Noguchi"
              },
              {
                  "value": "ROBYN DENHOLM",
                  "display": "Robyn Denholm"
              },
              {
                  "value": "STEVE JURVETSON",
                  "display": "Steve Jurvetson"
              },
              {
                  "value": "ZACH KIRKHORN",
                  "display": "Zach Kirkhorn"
              },
              {
                  "value": "IAN WRIGHT",
                  "display": "Ian Wright"
              },
              {
                  "value": "MARC TARPENNING",
                  "display": "Marc Tarpenning"
              },
              {
                  "value": "BARRETT RILEY",
                  "display": "Barrett Riley"
              },
              {
                  "value": "CARLOS RAMIREZ",
                  "display": "Carlos Ramirez"
              },
              {
                  "value": "DAVID EINHORN",
                  "display": "David Einhorn"
              },
              {
                  "value": "HIROMICHI MIZUNO",
                  "display": "Hiromichi Mizuno"
              },
              {
                  "value": "JAIR BOLSONARO",
                  "display": "Jair Bolsonaro"
              },
              {
                  "value": "JAMES GOODWIN",
                  "display": "James Goodwin"
              },
              {
                  "value": "JAMES MURDOCH",
                  "display": "James Murdoch"
              },
              {
                  "value": "KARL HANSEN",
                  "display": "Karl Hansen"
              }
          ],
          "company": [
              {
                  "value": "PANASONIC",
                  "display": "Panasonic"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "DAIMLER",
                  "display": "Daimler"
              },
              {
                  "value": "WALMART",
                  "display": "Walmart"
              },
              {
                  "value": "BLOOMBERG",
                  "display": "Bloomberg"
              },
              {
                  "value": "MERCEDES",
                  "display": "Mercedes"
              },
              {
                  "value": "NISSAN",
                  "display": "Nissan"
              },
              {
                  "value": "GOOGLE",
                  "display": "Google"
              },
              {
                  "value": "21ST CENTURY",
                  "display": "21st Century"
              },
              {
                  "value": "LIBERTY MUTUAL",
                  "display": "Liberty Mutual"
              },
              {
                  "value": "ORACLE",
                  "display": "Oracle"
              },
              {
                  "value": "RIVIERA TOOL",
                  "display": "Riviera Tool"
              },
              {
                  "value": "TOYOTA MOTOR",
                  "display": "Toyota Motor"
              },
              {
                  "value": "APPLE",
                  "display": "Apple"
              },
              {
                  "value": "CITROEN",
                  "display": "Citroën"
              },
              {
                  "value": "COMPASS",
                  "display": "Compass"
              },
              {
                  "value": "FORD",
                  "display": "Ford"
              },
              {
                  "value": "J.P.MORGAN",
                  "display": "J.P.Morgan"
              },
              {
                  "value": "NAVIGANT",
                  "display": "Navigant"
              },
              {
                  "value": "NORDSTROM",
                  "display": "Nordstrom"
              }
          ],
          "geo": [
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "NEW YORK",
                  "display": "New York"
              },
              {
                  "value": "NEVADA",
                  "display": "Nevada"
              },
              {
                  "value": "FREMONT",
                  "display": "Fremont"
              },
              {
                  "value": "TOYOTA",
                  "display": "Toyota"
              },
              {
                  "value": "EUROPE",
                  "display": "Europe"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "NETHERLANDS",
                  "display": "Netherlands"
              },
              {
                  "value": "AUSTRALIA",
                  "display": "Australia"
              },
              {
                  "value": "CHINA",
                  "display": "China"
              },
              {
                  "value": "DUBAI",
                  "display": "Dubai"
              },
              {
                  "value": "GERMANY",
                  "display": "Germany"
              },
              {
                  "value": "NORWAY",
                  "display": "Norway"
              },
              {
                  "value": "TEXAS",
                  "display": "Texas"
              },
              {
                  "value": "TILBURG",
                  "display": "Tilburg"
              },
              {
                  "value": "CANADA",
                  "display": "Canada"
              },
              {
                  "value": "TORONTO",
                  "display": "Toronto"
              },
              {
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "MIDDLE EAST",
                  "display": "Middle East"
              }
          ],
          "wordcount": 11080,
          "exacthash": "IQRmzGqt5FC7Dg3Da+pXBg==",
          "nearhash": "V4tqcKq5q26byMm9qJ1S/g==",
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
          "url1": "https://en.wikipedia.org/wiki/Tesla_Inc",
          "sourcecsv1": [
              "Formerly",
              "Type",
              "Traded as",
              "ISIN",
              "Industry",
              "Founded",
              "Founders",
              "Headquarters",
              "Area served",
              "Key people",
              "Products",
              "Production output",
              "Revenue",
              "Operating income",
              "Net income",
              "Total assets",
              "Total equity",
              "Owner",
              "Number of employees",
              "Subsidiaries",
              "Website"
          ],
          "sourcecsv2": [
              "Tesla_(disambiguation)",
              "Induction_motor",
              "AC_motor",
              "Palo_Alto,_California",
              "List_of_legal_entity_types_by_country",
              "Public_company",
              "Ticker_symbol",
              "NASDAQ",
              "NASDAQ-100",
              "Russell_1000_Index",
              "International_Securities_Identification_Number",
              "Automotive_industry",
              "Energy_storage",
              "Energy_production",
              "Martin_Eberhard",
              "Marc_Tarpenning",
              "Elon_Musk",
              "J._B._Straubel",
              "Chief_executive_officer",
              "Robyn_Denholm",
              "Chairperson",
              "Drew_Baglino",
              "Chief_technology_officer",
              "Zach_Kirkhorn",
              "Chief_financial_officer",
              "Electric_vehicle",
              "Tesla_Powerwall",
              "SolarCity",
              "United_States_dollar",
              "Earnings_before_interest_and_taxes",
              "Net_income",
              "Asset",
              "Equity_(finance)",
              "Subsidiary",
              "Tesla_Grohmann_Automation",
              "Maxwell_Technologies",
              "DeepScale",
              "Hibar_Systems",
              "Clean_energy",
              "Solar_panel",
              "Nikola_Tesla",
              "Tesla_Model_S",
              "Tesla_Model_3",
              "Tesla_Model_X",
              "Tesla_Model_Y",
              "Tesla_Powerpack",
              "Tesla_Megapack",
              "Tesla_Factory",
              "Fremont,_California",
              "Giga_Nevada",
              "Giga_New_York",
              "Giga_Shanghai",
              "Plug-in_electric_vehicle",
              "Battery_electric_vehicle",
              "History_of_Tesla,_Inc.",
              "General_Motors",
              "General_Motors_EV1",
              "Fuel_efficiency",
              "Fuel_economy_in_automobiles",
              "AC_Propulsion_tzero",
              "Venture_capital",
              "Series_A_round",
              "Carbon-fiber-reinforced_polymer",
              "Global_Green",
              "Mikhail_Gorbachev",
              "Venture_round",
              "Google",
              "Sergey_Brin",
              "Larry_Page",
              "EBay",
              "Jeff_Skoll",
              "Hyatt",
              "Nicholas_J._Pritzker",
              "Draper_Fisher_Jurvetson",
              "JPMorgan_Chase",
              "Initial_public_offering",
              "Ford_Motor_Company",
              "US$",
              "Toyota",
              "S%26P_500_Index",
              "Strategic_management",
              "Consumer_electronics",
              "Economic_surplus",
              "Automation",
              "Vertical_integration",
              "Economies_of_scale",
              "Open-source-software_movement",
              "Trade_secret",
              "Human_Resources",
              "Arnnon_Geshuri",
              "Veteran",
              "Navigant_Consulting",
              "BYD_Auto",
              "China",
              "Shanghai",
              "BAIC_Motor",
              "Brand",
              "Nordstrom",
              "The_Grove_at_Farmers_Market",
              "Los_Angeles",
              "Dubai",
              "South_Korea",
              "Motor_vehicle_type_approval",
              "Marketing_communications",
              "Referral_marketing",
              "Word_of_mouth",
              "Car_carrier",
              "Auto_manufacturer",
              "Tesla_US_dealership_disputes",
              "Austin,_Texas",
              "Federal_Trade_Commission",
              "Tesla_Supercharger",
              "Newark,_Delaware",
              "Delaware",
              "Toronto",
              "Charging_speed",
              "Direct_current",
              "Speed",
              "Twitter",
              "Artificial_intelligence",
              "West_Hartford,_Connecticut",
              "Battery_cell",
              "Commodity_cell",
              "Intumescent",
              "Panasonic",
              "List_of_battery_sizes#List_of_Li-ion_sizes",
              "Electrochemical_cell",
              "Contemporary_Amperex_Technology",
              "Argonne_National_Laboratory",
              "Plug-in_electric_vehicle_fire_incidents",
              "Aluminium_alloy",
              "Vehicle-to-grid",
              "Battery_storage",
              "Lithium-ion_battery_recycling",
              "Restriction_of_Hazardous_Substances_Directive",
              "Dalhousie_University",
              "Jeff_Dahn",
              "Three-phase_electric_power",
              "Alternating_current",
              "Rotor_(electric)",
              "Permanent_magnet_motor",
              "Tesla_Autopilot",
              "Advanced_driver-assistance_systems",
              "Graphics_processing_unit",
              "Adaptive_cruise_control",
              "Lane_centering",
              "Automatic_parking",
              "Tesla_Autopilot#Summon_(Beta)",
              "Tesla_Autopilot#Smart_Summon_(Beta)",
              "EPA",
              "All-electric_range",
              "Model_year",
              "Nikola_Tesla_electric_car_hoax",
              "Tesla_Roadster_(2008)",
              "Right-_and_left-hand_traffic",
              "Plug-in_electric_vehicles_in_Norway",
              "Nissan_Leaf",
              "NUMMI",
              "Tesla_facilities_in_Tilburg",
              "Motor_Trend_Car_of_the_Year",
              "World_Green_Car",
              "Automobile_(magazine)",
              "Time_(magazine)",
              "Bloomberg_News",
              "Citro%C3%ABn_DS",
              "Paris_Auto_Show",
              "Chevrolet_Volt",
              "Mid-size",
              "Crossover_SUV",
              "Pre-order",
              "Plug-in_electric_car",
              "Giga_Berlin",
              "Tesla_Roadster_(2020)",
              "All-wheel_drive",
              "Torque_vectoring",
              "Tesla_Semi",
              "Class_8_truck",
              "Semi-trailer_truck",
              "Self-driving_car",
              "Tesla_Megacharger",
              "Tesla_Cybertruck",
              "Jay_Leno%27s_Garage",
              "Lotus_Elise",
              "Heliocentric_orbit",
              "Falcon_Heavy",
              "Ford",
              "Sharing_economy",
              "Tesla_Cyberquad",
              "Open-source_model",
              "Southern_California_Edison",
              "Electric_power",
              "Electrical_energy",
              "Natural_gas",
              "Southern_California_Gas_Company",
              "Methane",
              "Aliso_Canyon_Natural_Gas_Storage_Facility",
              "American_Samoa",
              "Ta%E2%80%98%C5%AB",
              "Microgrid",
              "Samoa",
              "Upolu",
              "Faleolo_International_Airport",
              "Hurricane_Maria",
              "Government_of_Puerto_Rico",
              "Kauai",
              "Battery_storage_power_station",
              "Hornsdale_Power_Reserve",
              "Ultracapacitor",
              "Shipping_container",
              "Pacific_Gas_and_Electric_Company",
              "Moss_Landing,_California",
              "Monterey_County,_California",
              "United_States",
              "Tilburg",
              "Netherlands",
              "Storey_County,_Nevada",
              "Lithium-ion_batteries",
              "Buffalo,_New_York",
              "Photovoltaic_cells",
              "Solar_panels",
              "Solar_shingles",
              "Gr%C3%BCnheide_(Mark)",
              "Brandenburg",
              "Germany",
              "Europe",
              "Gigafactory_5",
              "San_Carlos,_California",
              "Menlo_Park,_California",
              "Chelsea,_Manhattan",
              "Automobile_repair_shop",
              "Giga_Texas",
              "Grand_Rapids,_Michigan",
              "Stamping_(metalworking)",
              "Elgin,_Illinois",
              "Republic_Steel",
              "Photovoltaics",
              "Buffalo_Billion",
              "Golden_Driller",
              "Tulsa,_Oklahoma",
              "Eastern_United_States",
              "Yorkdale_Shopping_Centre",
              "Unibody",
              "Pr%C3%BCm",
              "Tesla_Gigafactory_Europe",
              "Berlin",
              "Tokyo",
              "Shanghai,_China",
              "Roads_and_Transport_Authority_(Dubai)",
              "Amman",
              "Tel_Aviv",
              "Marcos_Pontes",
              "Santa_Catarina_(state)",
              "Jair_Bolsonaro",
              "Original_equipment_manufacturer",
              "Daimler_AG",
              "Airbnb",
              "International_Petroleum_Investment_Company",
              "Freightliner_Trucks",
              "Mercedes-Benz_A-Class_E-Cell",
              "Mercedes-Benz_B-Class_Electric_Drive",
              "Electric_car",
              "Liberty_Mutual_Insurance_Company",
              "Mobileye",
              "Smart_electric_drive",
              "Lithium-ion_battery",
              "Toyota_RAV4_EV",
              "Los_Angeles_Auto_Show",
              "JB_Straubel",
              "Suminoe-ku,_Osaka",
              "Lawsuits_and_Controversies_of_Tesla,_Inc.",
              "PlainSite",
              "Whistleblower",
              "420_(cannabis_culture)",
              "Federal_Bureau_of_Investigation",
              "TSLAQ",
              "Delaware_Court_of_Chancery",
              "Martin_Tripp",
              "Slate_(magazine)",
              "Generally_Accepted_Accounting_Principles_(United_States)",
              "California_Air_Resources_Board",
              "COVID-19_pandemic_in_the_United_States",
              "Alameda_County,_California",
              "Governor_of_California",
              "Bay_Area_Air_Quality_Management_District",
              "United_States_Environmental_Protection_Agency",
              "National_Highway_Traffic_Safety_Administration",
              "Bid_rigging",
              "Short_(finance)",
              "Lyft",
              "Reveal_(podcast)",
              "Occupational_Safety_and_Health_Administration",
              "Product_recall",
              "Corrosion",
              "Power_steering",
              "Kent,_Washington",
              "Murfreesboro,_Tennessee",
              "Tow_hitch",
              "Williston,_Florida",
              "Fort_Lauderdale,_Florida",
              "American_Automobile_Association",
              "Insurance_Institute_for_Highway_Safety",
              "Solar-power",
              "Security_hacker",
              "Patch_(computing)",
              "Exploit_(computer_security)",
              "Tencent",
              "CAN_bus",
              "Bug_bounty_program",
              "Amazon_Web_Services",
              "Black_hat_(computer_security)",
              "Cryptocurrency",
              "White_hat_(computer_security)",
              "Pwn2Own",
              "Kelley_Blue_Book",
              "Motor_Vehicle_Owners%27_Right_to_Repair_Act",
              "New_York_State_Legislature",
              "Ze%27ev_Drori",
              "Groupthink",
              "Board_of_directors",
              "Independent_director",
              "Telstra",
              "Chief_product_officer",
              "SpaceX",
              "Kimbal_Musk",
              "Steve_Jurvetson",
              "James_Murdoch",
              "21st_Century_Fox",
              "Larry_Ellison",
              "Oracle_Corporation",
              "Kathleen_Wilson-Thompson",
              "Walgreens_Boots_Alliance",
              "Hiromichi_Mizuno",
              "Steve_Westly",
              "Johnson_Publishing_Company",
              "COVID-19_pandemic_in_mainland_China",
              "List_of_automobile_manufacturers_of_the_United_States",
              "List_of_Easter_eggs_in_Tesla_products",
              "List_of_electric_cars_currently_available",
              "List_of_modern_production_plug-in_electric_vehicles",
              "List_of_production_battery_electric_vehicles",
              "Plug-in_electric_vehicles_in_California",
              "Plug-in_electric_vehicles_in_the_United_States",
              "NIO",
              "Rivian",
              "Karma_Automotive",
              "Faraday_Future",
              "Byton_(company)",
              "Fisker_Inc.",
              "Polestar",
              "Xpeng_G3",
              "CNET",
              "U.S._Securities_and_Exchange_Commission",
              "ISBN_(identifier)",
              "OCLC_(identifier)",
              "TechCrunch",
              "Flash_video",
              "The_Guardian",
              "Wired_(magazine)",
              "The_Columbus_Dispatch",
              "The_Wall_Street_Journal",
              "Electrek.co",
              "United_States_Department_of_Energy",
              "Los_Angeles_Times",
              "San_Jose_Mercury_News",
              "CBS",
              "Palo_Alto",
              "CNN",
              "Fortune.com",
              "Time,_Inc.",
              "Reuters",
              "ISSN_(identifier)",
              "Jalopnik",
              "The_Washington_Post",
              "Engadget",
              "Associated_Press",
              "Greentech_Media",
              "Yahoo_News",
              "Business_Insider",
              "USA_Today",
              "U.S._Department_of_Energy",
              "U._S._Environmental_Protection_Agency",
              "The_New_York_Times",
              "Nissan",
              "AutoWeek",
              "Motor_Trend",
              "International_Business_Times",
              "Auto_Express",
              "Bloomberg_L.P.",
              "NPR",
              "San_Francisco_Chronicle",
              "The_Verge",
              "Teknisk_Ukeblad",
              "Financial_Post",
              "HuffPost",
              "San_Jose,_California",
              "Autoblog",
              "Wall_Street_Journal",
              "Reno_Gazette_Journal",
              "Fox_News",
              "Weblogs,_Inc.",
              "CNBC",
              "Business_Wire",
              "The_Huffington_Post",
              "Autoblog.com",
              "New_York_Times",
              "New_Statesman",
              "Nihon_Keizai_Shimbun",
              "Public_domain",
              "Fortune_(magazine)",
              "Vox_(website)",
              "NTSB",
              "Consumer_Reports",
              "New_York_Law_Journal",
              "Fox_Business",
              "Ludicrous:_The_Unvarnished_Story_of_Tesla_Motors",
              "Mercedes_A-Class_E-Cell",
              "Tesla_Solar_Roof",
              "Franz_von_Holzhausen",
              "Jerome_Guillen",
              "Andrej_Karpathy",
              "Deepak_Ahuja",
              "Jim_Keller_(engineer)",
              "Chris_Lattner",
              "Jay_Vijayan",
              "Sudden_unintended_acceleration#Tesla&#39",
              "s_Model_X,_S_and_3",
              "Elon_Musk%27s_Tesla_Roadster",
              "Giga_Press",
              "Compact_executive_car",
              "Mid-size_car",
              "Luxury_car",
              "Compact_car",
              "Crossover_(automobile)",
              "Sport_Utility_Vehicle",
              "Roadster_(automobile)",
              "Activision_Blizzard",
              "Adobe_Inc.",
              "Advanced_Micro_Devices",
              "Alexion_Pharmaceuticals",
              "Align_Technology",
              "Alphabet_Inc.",
              "Amazon_(company)",
              "Amgen",
              "Analog_Devices",
              "Ansys",
              "Apple_Inc.",
              "Applied_Materials",
              "ASML_Holding",
              "Autodesk",
              "ADP_(company)",
              "Baidu",
              "Biogen",
              "BioMarin_Pharmaceutical",
              "Booking_Holdings",
              "Broadcom_Inc.",
              "Cadence_Design_Systems",
              "CDW",
              "Cerner",
              "Charter_Communications",
              "Check_Point",
              "Cintas",
              "Cisco_Systems",
              "Citrix_Systems",
              "Cognizant",
              "Comcast",
              "Copart",
              "Costco",
              "CSX_Corporation",
              "Dexcom",
              "DocuSign",
              "Dollar_Tree",
              "Electronic_Arts",
              "Exelon",
              "Expedia_Group",
              "Facebook,_Inc.",
              "Fastenal",
              "Fiserv",
              "Fox_Corporation",
              "Gilead_Sciences",
              "Idexx_Laboratories",
              "Illumina,_Inc.",
              "Incyte",
              "Intel",
              "Intuit",
              "Intuitive_Surgical",
              "JD.com",
              "KLA_Corporation",
              "Kraft_Heinz",
              "Lam_Research",
              "Liberty_Global",
              "Lululemon_Athletica",
              "Marriott_International",
              "Maxim_Integrated",
              "MercadoLibre",
              "Microchip_Technology",
              "Micron_Technology",
              "Microsoft",
              "Moderna",
              "Mondelez_International",
              "Monster_Beverage",
              "NetEase",
              "Netflix",
              "Nvidia",
              "NXP_Semiconductors",
              "O%27Reilly_Auto_Parts",
              "Paccar",
              "Paychex",
              "PayPal",
              "PepsiCo",
              "Pinduoduo",
              "Qualcomm",
              "Regeneron_Pharmaceuticals",
              "Ross_Stores",
              "Seattle_Genetics",
              "Sirius_XM",
              "Skyworks_Solutions",
              "Splunk",
              "Starbucks",
              "Synopsys",
              "T-Mobile_US",
              "Take-Two_Interactive",
              "Texas_Instruments",
              "Trip.com_Group",
              "Ulta_Beauty",
              "Verisign",
              "Verisk_Analytics",
              "Vertex_Pharmaceuticals",
              "Western_Digital",
              "Workday,_Inc.",
              "Xcel_Energy",
              "Xilinx",
              "Zoom_Video_Communications",
              "Automotive_industry_in_the_United_States",
              "Economy_of_the_United_States",
              "Transportation_in_the_United_States",
              "AGCO",
              "Challenger_Tractor",
              "Massey_Ferguson",
              "AM_General",
              "Workhorse_Group",
              "Arcimoto",
              "Rhino_Runner",
              "ATK_motorcycles",
              "Autocar_Company",
              "Blue_Bird_Corporation",
              "Callaway_Cars",
              "Caterpillar_Inc",
              "Chrysler",
              "Chrysler_(brand)",
              "Dodge",
              "Jeep",
              "Ram_Trucks",
              "Desert_Patrol_Vehicle",
              "Environmental_Performance_Vehicles",
              "Equus_Automotive",
              "Forest_River_(company)",
              "Champion_Bus_Incorporated",
              "ElDorado_National",
              "Glaval_Bus",
              "Goshen_Coach",
              "Starcraft_Bus",
              "Lincoln_Motor_Company",
              "Special_Vehicle_Team",
              "General_Dynamics_Land_Systems",
              "Buick",
              "Cadillac",
              "Cadillac_V_series",
              "Chevrolet",
              "Chevrolet_Performance",
              "GMC_(automobile)",
              "Gillig",
              "Growler_Manufacturing_and_Engineering",
              "Harley-Davidson",
              "Ingersoll_Rand",
              "Club_Car",
              "Storm_Search_and_Rescue_Tactical_Vehicle",
              "HME,_Incorporated",
              "John_Deere",
              "Laffite_X-Road",
              "Lenco_BearCat",
              "Lockheed_Martin",
              "Lordstown_Motors",
              "Mack_Trucks",
              "Millennium_Luxury_Coaches",
              "Morgan_Olson",
              "Motor_Coach_Industries",
              "Navistar_International",
              "IC_Bus",
              "Oshkosh_Corporation",
              "Pierce_Manufacturing",
              "Kenworth",
              "Peterbilt",
              "Panoz,_LLC",
              "Polaris_Industries",
              "Global_Electric_Motorcars",
              "Indian_Motocycle_Manufacturing_Company",
              "Victory_Motorcycles",
              "Proterra,_Inc.",
              "REV_Group",
              "Collins_Industries",
              "E-One",
              "Fleetwood_Enterprises",
              "Holiday_Rambler",
              "Wheeled_Coach",
              "SSC_North_America",
              "Superformance",
              "Textron",
              "E-Z-Go",
              "Cushman_(company)",
              "Trans_Tech",
              "Utilimaster_Corporation",
              "VIA_Motors",
              "Zero_Motorcycles",
              "BMW_US_Manufacturing_Company",
              "Changan_Automobile",
              "CNH_Industrial",
              "Case_Construction_Equipment",
              "Case_IH",
              "Daimler_Trucks_North_America",
              "Thomas_Built_Buses",
              "Western_Star_Trucks",
              "Mercedes-Benz_USA",
              "FAW_Group",
              "Fiat_S.p.A.",
              "Subaru_Corporation",
              "American_Honda_Motor_Company",
              "Acura",
              "Hyundai_Motor_Company",
              "Kia_Motors",
              "Isuzu_Motors",
              "Mazda",
              "Mitsubishi_Motors_North_America",
              "NFI_Group",
              "New_Flyer_Industries",
              "ARBOC_Specialty_Vehicles",
              "Nissan_USA",
              "Peugeot",
              "SAIC_Motor",
              "Suzuki",
              "Toyota_Motor_Sales,_USA",
              "Hino_Motors",
              "Lexus",
              "Volkswagen_Group_of_America",
              "Volvo_Cars",
              "Volvo_Trucks",
              "Yamaha_Motor_Company",
              "Wanxiang",
              "Commuter_Cars",
              "Elio_Motors",
              "Fisker_Inc",
              "Local_Motors",
              "Lucid_Motors",
              "Myers_Motors",
              "Nikola_Motor_Company",
              "Trion_Supercars",
              "List_of_Chrysler_factories",
              "List_of_Ford_factories",
              "List_of_General_Motors_factories",
              "List_of_Honda_assembly_plants",
              "Hyundai_Motor_Manufacturing_Alabama",
              "List_of_Kia_design_and_manufacturing_facilities#Kia_Motors_Manufacturing_Georgia_(KMMG)",
              "Mercedes-Benz_U.S._International",
              "Subaru_of_Indiana_Automotive",
              "Toyota_Motor_Engineering_%26_Manufacturing_North_America",
              "Volkswagen_Chattanooga_Assembly_Plant",
              "Performance_car",
              "Allison_Transmission",
              "American_Expedition_Vehicles",
              "BFGoodrich",
              "BorgWarner",
              "Brunton_Stalker",
              "Cooper_Tire_%26_Rubber_Company",
              "Cummins",
              "Brammo",
              "Delphi_Automotive",
              "Detroit_Diesel",
              "Eaton_Corporation",
              "Firestone_Tire_and_Rubber_Company",
              "General_Tire",
              "Goodyear_Tire_and_Rubber_Company",
              "Hennessey_Performance_Engineering",
              "Legacy_Classic_Trucks",
              "Lingenfelter_Performance_Engineering",
              "Nexteer_Automotive",
              "Phoenix_Motorcars",
              "Remy_International",
              "Saleen",
              "Carroll_Shelby_International",
              "Timken_Company",
              "Torrington_Company",
              "Visteon",
              "Calty_Design_Research",
              "Designworks",
              "Rezvani_Automotive_Designs",
              "Wheego_Electric_Cars",
              "Automotive_industry_in_Massachusetts",
              "Allis-Chalmers",
              "American_Austin_Car_Company",
              "The_Kurrent",
              "American_LaFrance",
              "American_Motors_Corporation",
              "Hudson_Motor_Car_Company",
              "Essex_(automobile)",
              "Terraplane",
              "Nash_Motors",
              "Rambler_(automobile)",
              "Armor_Holdings",
              "Armored_Motor_Car_Company",
              "Auburn_Automobile",
              "Aurica_Motors",
              "Autoette",
              "Avanti_(car)",
              "Avery_Company",
              "Best_Manufacturing_Company",
              "Boulder_Electric_Vehicle",
              "Carbon_Motors_Corporation",
              "Checker_Motors_Corporation",
              "Clydesdale_Motor_Truck_Company",
              "Coda_Automotive",
              "Commonwealth_(automobile_company)",
              "Cord_(automobile)",
              "Case_Corporation",
              "CNH_Global",
              "Cycle-Scoot",
              "DeLorean_Motor_Company",
              "Duesenberg",
              "Durant_Motors",
              "Flint_(automobile)",
              "Locomobile_Company_of_America",
              "Mason_Truck",
              "Rugby_(automobile)",
              "Star_(automobile)",
              "Eagle_Bus",
              "Excalibur_(automobile)",
              "Eagle_(automobile)",
              "Plymouth_(automobile)",
              "Street_%26_Racing_Technology",
              "Fiberfab",
              "Fitch_Four_Drive",
              "Fisker_Automotive",
              "Fisker_Coachbuild",
              "Force_Protection_Inc",
              "Continental_Mark_II",
              "Edsel",
              "Mercury_(automobile)",
              "FMC_Corporation",
              "Cartercar",
              "Elmore_(automobile)",
              "General_Motors_Diesel_Division",
              "Geo_(automobile)",
              "Hummer",
              "LaSalle_(automobile)",
              "Marquette_(automobile)",
              "McLaughlin_Motor_Car_Company",
              "Oakland_Motor_Car_Company",
              "Oldsmobile",
              "Pontiac",
              "Saturn_Corporation",
              "Scripps-Booth",
              "Sheridan_(automobile)",
              "Viking_(automobile)",
              "Yellow_Coach_Manufacturing_Company",
              "Green_Vehicles",
              "GreenTech_Automotive",
              "Grumman",
              "Henney_Kilowatt",
              "International_Harvester",
              "Jeffery_(automobile)",
              "Kaiser-Frazer",
              "Allstate_(automobile)",
              "Frazer_(automobile)",
              "Henry_J",
              "Willys",
              "Marathon_Motor_Works",
              "Marmon_Motor_Car_Company",
              "Roosevelt_(automobile)",
              "Marvel_(automobile)",
              "Matbro",
              "Mercer_(automobile)",
              "Monaco_Coach_Corporation",
              "Mosler_Automotive",
              "MotoCzysz",
              "Muntz_Car_Company",
              "North_American_Bus_Industries",
              "Oliver_Farm_Equipment_Company",
              "Packard",
              "Peerless_Motor_Company",
              "Pierce-Arrow_Motor_Car_Company",
              "Sebring_Vanguard",
              "Sterling_Trucks",
              "Studebaker",
              "Erskine_(automobile)",
              "Rockne",
              "Stutz_Motor_Company",
              "Scion_(automobile)",
              "Twentieth_Century_Motor_Car_Corporation",
              "United_Defense",
              "Visionary_Vehicles",
              "VL_Automotive",
              "White_Motor_Company",
              "Wildfire_(motor_company)",
              "ZAP_(motor_company)",
              "Zimmer_(automobile)",
              "Diamond-Star_Motors",
              "Packard_Automotive_Plant",
              "Volkswagen_Westmoreland_Assembly",
              "Chicago_Auto_Show",
              "Interstate_Highway_System",
              "List_of_automobiles_manufactured_in_the_United_States",
              "New_York_International_Auto_Show",
              "North_American_International_Auto_Show",
              "SAE_International",
              "Trucking_industry_in_the_United_States",
              "Federal_Motor_Carrier_Safety_Administration",
              "Commercial_driver%27s_license",
              "Hours_of_service",
              "Federal_Bridge_Gross_Weight_Formula",
              "Electronic_on-board_recorder",
              "Motor_carrier_safety_rating",
              "Motor_Carrier_Act_of_1980",
              "International_Registration_Plan",
              "National_Network",
              "Bering_Truck",
              "Bremach",
              "Brockway_Motor_Company",
              "Caterpillar_Inc.",
              "Chase_Motor_Truck_Company",
              "Crane_Carrier_Company",
              "Diamond_T",
              "REO_Motor_Car_Company",
              "Diamond_Reo_Trucks",
              "DINA_S.A.",
              "F650_Pickups",
              "Hayes_Manufacturing_Company",
              "Marmon-Herrington",
              "Mercedes-Benz",
              "Moreland_Motor_Truck_Company",
              "Mitsubishi_Fuso_Truck_of_America,_Inc.",
              "Selden_Motor_Vehicle_Company",
              "Schacht_(automobile)",
              "Smith_Electric_Vehicles",
              "Spartan_Motors",
              "Tiger_Truck",
              "Traffic_Motor_Truck_Corporation",
              "UD_Trucks",
              "Ward_LaFrance_Truck_Corporation",
              "Marmon_Group",
              "Fruehauf_Trailer_Corporation",
              "Great_Dane_Trailers",
              "Lufkin_Industries",
              "Utility_Trailer_Manufacturing_Company",
              "China_International_Marine_Containers",
              "Wabash_National",
              "Wilson_Trailer_Company",
              "Truckload_shipping",
              "Averitt_Express",
              "Celadon_Group",
              "Covenant_Transport",
              "CRST",
              "FFE_Transportation",
              "J._B._Hunt",
              "Knight-Swift",
              "Landstar_System",
              "PAM_Transport",
              "Patriot_Transportation",
              "Roehl_Transport",
              "Schneider_National",
              "Swift_Transportation",
              "Werner_Enterprises",
              "WTI_Transport",
              "Less_than_truckload_shipping",
              "ABF_Freight_System",
              "Con-way_Freight",
              "Estes_Express_Lines",
              "FedEx",
              "New_England_Motor_Freight",
              "Old_Dominion_Freight_Line",
              "Pitt_Ohio_Express",
              "R%2BL_Carriers",
              "Saia",
              "Southeastern_Freight_Lines",
              "Trailer_Bridge",
              "UPS_Freight",
              "XPO_Logistics",
              "YRC_Worldwide",
              "Third-party_logistics",
              "Access_America_Transport",
              "American_Lamprecht_Transport",
              "C._H._Robinson_Worldwide",
              "CaseStack",
              "Freightquote",
              "Ryder",
              "Total_Quality_Logistics",
              "Package_delivery",
              "DHL_Express",
              "Greyhound_Lines",
              "United_Parcel_Service",
              "United_States_Postal_Service",
              "General_Logistics_Systems",
              "LaserShip",
              "OnTrac",
              "Moving_company",
              "Allied_Van_Lines",
              "Atlas_Van_Lines",
              "Bekins_Van_Lines,_Inc.",
              "Gentle_Giant_Moving_Company",
              "Global_Van_Lines",
              "Interstate_Van_Lines",
              "Mayflower_Transit",
              "National_Van_Lines,_Inc.",
              "North_American_Van_Lines",
              "PODS_(company)",
              "Two_Men_and_a_Truck",
              "United_Van_Lines",
              "Wheaton_World_Wide_Moving",
              "Truck_stop",
              "Bowlin_Travel_Centers",
              "Dixie_Travel_Plaza",
              "Iowa_80",
              "Love%27s_Travel_Stops_%26_Country_Stores",
              "Pilot_Flying_J",
              "Road_Ranger",
              "Roady%27s_Truck_Stops",
              "TravelCenters_of_America",
              "Town_Pump",
              "Attack_on_Reginald_Denny",
              "Jimmy_Hoffa",
              "Frederick_W._Smith",
              "Johnnie_Bryan_Hunt",
              "Kelly_Reno",
              "Iyman_Faris",
              "Keith_Hunter_Jesperson",
              "International_Brotherhood_of_Teamsters",
              "Owner%E2%80%93Operator_Independent_Drivers_Association",
              "DAT_Solutions",
              "American_Trucking_Associations",
              "National_Motor_Freight_Traffic_Association",
              "National_Motor_Freight_Classification",
              "National_Private_Truck_Council",
              "FJ_Management",
              "SmartWay_Transport_Partnership",
              "American_Moving_%26_Storage_Association",
              "Glossary_of_the_American_trucking_industry",
              "Trucking_industry_in_popular_culture_(United_States)",
              "Black_Dog_(film)",
              "Breakdown_(1997_film)",
              "Breaker!_Breaker!",
              "Convoy_(1978_film)",
              "Duel_(1971_film)",
              "F.I.S.T.",
              "The_Gang%27s_All_Here_(1941_film)",
              "Joy_Ride_(2001_film)",
              "Maximum_Overdrive",
              "Over_the_Top_(1987_film)",
              "Smokey_and_the_Bandit",
              "They_Drive_by_Night",
              "White_Line_Fever_(film)",
              "Trucker_(film)",
              "B._J._and_the_Bear",
              "Ice_Road_Truckers",
              "Movin%27_On_(TV_series)",
              "Trick_My_Truck",
              "American_Loggers",
              "American_Trucker",
              "Convoy_(song)",
              "Papa_Loved_Mama",
              "Six_Days_on_the_Road",
              "Teddy_Bear_(Red_Sovine_song)",
              "Phantom_309",
              "Giddyup_Go",
              "The_White_Knight_(Cledus_Maggard_song)",
              "East_Bound_and_Down",
              "Roll_On_(Eighteen_Wheeler)",
              "Drivin%27_My_Life_Away",
              "Eighteen_Wheels_and_a_Dozen_Roses",
              "Girl_on_the_Billboard",
              "A_Tombstone_Every_Mile",
              "Roll_On_Big_Mama",
              "Movin%27_On_(Merle_Haggard_song)",
              "Big_Wheels_in_the_Moonlight",
              "Bonnie_Jean_(Little_Sister)",
              "Road_Dog_Trucking",
              "Dave_Nemo",
              "Red_Eye_Radio",
              "Bill_Mack_(songwriter)",
              "Dale_Sommers",
              "18_Wheels_of_Steel",
              "American_Truck_Simulator",
              "Rig_%27n%27_Roll",
              "The_Rolling_Memorial",
              "Citizens_band_radio",
              "Automotive_industry_in_Australia",
              "Economy_of_Australia",
              "Transport_in_Australia",
              "Alpha_Sports",
              "Brabham_Automotive",
              "BCI_Bus",
              "Bolwell",
              "Borland_Racing_Developments",
              "Bush_Ranger_(4WD)",
              "Bustech",
              "Coach_Concepts",
              "Coach_Design",
              "Custom_Bus",
              "Denning_Manufacturing",
              "Devaux_Coupe",
              "Express_Coach_Builders",
              "General_Dynamics_Land_Systems%E2%80%93Australia",
              "Howard_Porter_(manufacturer)",
              "Jacer",
              "Minetti_Sports_Cars",
              "Nota",
              "P%26D_Coachworks",
              "PRB_(car)",
              "RFW",
              "Thales_Australia",
              "Volgren",
              "Alan_B_Denning",
              "Ansair",
              "Austral_(bus_manufacturer)",
              "Australian_Autobus",
              "Australian_Motor_Industries",
              "Birrana",
              "Boltons_(bus_manufacturer)",
              "Bowin_Cars",
              "Brabham",
              "British_Motor_Corporation_(Australia)",
              "Buckle_Motors",
              "Caldwell_Vale",
              "Centurion_Transport_Engineering",
              "Cheetah_Racing_Cars",
              "Coachmaster",
              "Commonwealth_Aircraft_Corporation",
              "Commonwealth_Engineering",
              "Corsa_Specialised_Vehicles",
              "Denning_(bus_manufacturer)",
              "Duncan_%26_Fraser",
              "Elfin_Sports_Cars",
              "Ford_Australia",
              "Ford_Performance_Vehicles",
              "Giocattolo",
              "Hartnett_(car)",
              "Holden_Dealer_Team",
              "Holden",
              "Holden_Special_Vehicles",
              "IBC_(bus_manufacturer)",
              "Jakab_Industries",
              "JW_Bolton",
              "Kaditcha",
              "Leader_Trucks",
              "Mills-Tui",
              "Motor_Body_Specialists",
              "MotorCoach_Australia",
              "Northcoast_Bus_%26_Coach",
              "OKA_4wd",
              "Parramatta-Ryde_Bus_Service",
              "Pressed_Metal_Corporation",
              "Pressed_Metal_Corporation_South_Australia",
              "Purvis_Eureka",
              "Queensland_Coach_Company",
              "Ralt",
              "Rennmax",
              "The_Roo_Motor_Car_Company",
              "Rootes_Australia",
              "Smithfield_Bus_%26_Coach_Works",
              "Stewart_%26_Sons",
              "Superior_(bus_manufacturer)",
              "TJ_Richards_%26_Sons",
              "United_Australian_Automobile_Industries",
              "Zeta_(automobile)",
              "Beaurepaires",
              "Bob_Jane_T-Marts",
              "James_Hardie",
              "Repco",
              "Supercheap_Auto",
              "Tickford_Vehicle_Engineering",
              "Ultra_Tune",
              "Chrysler_Australia",
              "Honda_Australia",
              "Mitsubishi_Motors_Australia",
              "Toyota_Australia",
              "Volkswagen_Australia",
              "Australasian_New_Car_Assessment_Program",
              "Australian_International_Motor_Show",
              "Highways_in_Australia",
              "Melbourne_International_Motor_Show",
              "Automotive_industry_in_New_Zealand",
              "Zip2",
              "X.com",
              "OpenAI",
              "Neuralink",
              "The_Boring_Company",
              "Hyperloop",
              "Boring_Test_Tunnel",
              "Maye_Musk",
              "Justine_Musk",
              "Talulah_Riley",
              "Grimes_(musician)",
              "Tosca_Musk",
              "Lyndon_Rive",
              "Elon_Musk:_Tesla,_SpaceX,_and_the_Quest_for_a_Fantastic_Future",
              "The_Musk_Who_Fell_to_Earth",
              "One_Crew_over_the_Crewcoo%27s_Morty",
              "Mercedes-AMG",
              "Maybach",
              "Smart_(marque)",
              "BharatBenz",
              "Fuso_(company)",
              "Manufacturing_Commercial_Vehicles",
              "Master_Motors",
              "DaimlerChrysler_Commercial_Buses_North_Carolina",
              "Mercedes-Benz_buses",
              "Setra",
              "EvoBus",
              "Orion_International",
              "Mercedes-Benz_in_motorsport",
              "Mercedes-Benz_in_Formula_One",
              "Mercedes_AMG_High_Performance_Powertrains",
              "Alliance_Truck_Parts",
              "Car2Go",
              "Daimler_Financial_Services",
              "Mercedes-Benz_Bank",
              "Mercedes-Benz_India",
              "Mercedes-Benz_Mexico",
              "Shareholder",
              "Automotive_Fuel_Cell_Cooperation",
              "Beijing_Benz",
              "Denza",
              "Tognum",
              "Fujian_Benz",
              "Here_(company)",
              "Airbus",
              "Kamaz",
              "MV_Agusta",
              "Tata_Motors",
              "Aston_Martin",
              "Renault",
              "Karl_Benz#Benz_&amp",
              "_Cie._and_the_Motorwagen",
              "Daimler-Motoren-Gesellschaft",
              "Active_Cylinder_Control",
              "BlueTec",
              "Wolfgang_Bernhard",
              "Karl-Gottfried_Nordmann",
              "Andreas_Renschler",
              "Hans_Scherenberg",
              "J%C3%BCrgen_E._Schrempp",
              "Karl_Wilfert",
              "Joachim_Zahn",
              "Dieter_Zetsche",
              "DaimlerChrysler%E2%80%93Mitsubishi_alliance",
              "BeiBen_Truck",
              "Silicon_Valley",
              "Belmont,_California",
              "Campbell,_California",
              "Cupertino,_California",
              "East_Palo_Alto,_California",
              "Los_Altos,_California",
              "Los_Altos_Hills,_California",
              "Los_Gatos,_California",
              "Milpitas,_California",
              "Morgan_Hill,_California",
              "Mountain_View,_California",
              "Newark,_California",
              "Redwood_City,_California",
              "San_Mateo,_California",
              "Santa_Clara,_California",
              "Saratoga,_California",
              "Sunnyvale,_California",
              "Woodside,_California",
              "Ca%C3%B1ada_College",
              "Carnegie_Mellon_Silicon_Valley",
              "Cogswell_Polytechnical_College",
              "De_Anza_College",
              "Evergreen_Valley_College",
              "Foothill_College",
              "International_Technological_University",
              "Menlo_College",
              "Mission_College_(California)",
              "Ohlone_College",
              "Silicon_Valley_Technical_Institute",
              "National_Hispanic_University",
              "Northwestern_Polytechnic_University",
              "San_Jose_City_College",
              "San_Jose_State_University",
              "Silicon_Valley_University",
              "Santa_Clara_University",
              "Stanford_University",
              "University_of_California,_Berkeley",
              "University_of_California,_Santa_Cruz",
              "3Com",
              "Access_Systems_Americas",
              "Actuate_Corporation",
              "Adaptec",
              "Adobe_Inc",
              "Agilent_Technologies",
              "Altera",
              "Amdahl_Corporation",
              "Ampex",
              "Apple_Inc",
              "Aricent",
              "Asus",
              "Atari",
              "Atmel",
              "Avaya",
              "Ayasdi",
              "BEA_Systems",
              "Box_(company)",
              "Brocade_Communications_Systems",
              "BusinessObjects",
              "Capcom",
              "Computer_Literacy_Bookshops",
              "Cypress_Semiconductor",
              "Facebook",
              "Foundry_Networks",
              "Fry%27s_Electronics",
              "Fujitsu",
              "Gaia_Online",
              "Geeknet",
              "Hewlett-Packard",
              "HGST",
              "Internet_Engineering_Task_Force",
              "Internet_Systems_Consortium",
              "Juniper_Networks",
              "Knight_Ridder",
              "LinkedIn",
              "Logitech",
              "LSI_Corporation",
              "Magellan_Navigation",
              "Marvell_Technology_Group",
              "Maxtor",
              "McAfee",
              "Memorex",
              "Mozilla_Corporation",
              "National_Semiconductor",
              "Netscape",
              "NetApp",
              "NeXT",
              "Nintendo",
              "Nortel",
              "Opera_Software",
              "Oppo_Digital",
              "Palm_Inc",
              "Palo_Alto_Networks",
              "Pinterest",
              "Playdom",
              "Rambus",
              "Redback_Networks",
              "Reputation.com",
              "SAP",
              "SanDisk",
              "Silicon_Graphics",
              "Silicon_Image",
              "Solectron",
              "Sony_Interactive_Entertainment",
              "SRI_International",
              "Sun_Microsystems",
              "Symyx_Technologies",
              "Taligent",
              "Tesla_Inc",
              "TiVo_Corporation",
              "Uber",
              "Veritas_Technologies",
              "VMware",
              "Cisco_Webex",
              "WhatsApp",
              "Yahoo!",
              "PayPal_Mafia",
              "Peter_Thiel",
              "Reid_Hoffman",
              "Max_Levchin",
              "Ken_Howery",
              "Luke_Nosek",
              "Steve_Chen",
              "Keith_Rabois",
              "Chad_Hurley",
              "Roelof_Botha",
              "Jawed_Karim",
              "Yishan_Wong",
              "Eric_M._Jackson",
              "David_O._Sacks",
              "Premal_Shah",
              "Russel_Simmons",
              "Jeremy_Stoppelman",
              "YouTube",
              "Slide.com",
              "Yelp",
              "Geni.com",
              "Yammer",
              "Palantir_Technologies",
              "Kiva_(organization)",
              "Affirm_(company)",
              "Friendster",
              "Powerset_(company)",
              "Vator",
              "Six_Apart",
              "Zynga",
              "IronPort",
              "Flickr",
              "Digg",
              "Grockit",
              "Ooma",
              "Quantcast",
              "RapLeaf",
              "SmartDrive_Systems",
              "TransferWise",
              "Ping.fm",
              "Nanosolar",
              "Knewton",
              "Kongregate",
              "Last.fm",
              "TokBox",
              "Xoom_(web_hosting)",
              "Joost",
              "Founders_Fund",
              "Clarium_Capital",
              "Greylock_Partners",
              "Sequoia_Capital",
              "Valar_Ventures",
              "The_PayPal_Wars",
              "Thank_You_for_Smoking_(film)",
              "The_Stanford_Review",
              "GND_(identifier)",
              "ISNI_(identifier)",
              "LCCN_(identifier)",
              "National_Library_of_the_Czech_Republic",
              "VIAF_(identifier)",
              "WorldCat_Identities",
              "Geographic_coordinate_system"
          ],
          "sourcestr1": "Tesla_Inc",
          "sourcestr2": "Q478214",
          "sourcestr3": "Q786820",
          "category": "automobile manufacturer",
          "sourcevarchar3": "[{\"Formerly\":\"Tesla Motors, Inc. (2003\\u20132017)\",\"Type\":\"Public\",\"Traded as\":[\"NASDAQ\",\":\",\"TSLA\",\"NASDAQ-100\",\"component\",\"Russell 1000\",\"component\"],\"ISIN\":\"US88160R1014\",\"Industry\":[\"Automotive\",\"Energy storage\",\"Energy production\"],\"Founded\":[\"July1, 2003\",\";17years ago\"],\"Founders\":[\"Martin Eberhard\",\"Marc Tarpenning\",\"Elon Musk\",\"J. B. Straubel\",\"Ian Wright\"],\"Headquarters\":[\"Palo Alto, California\",\",\",\"U.S.\"],\"Area served\":\"Worldwide\",\"Key people\":[\"Elon Musk\",\"Robyn Denholm\",\"Drew Baglino\",\"Zach Kirkhorn\"],\"Products\":[\"Electric vehicles\",\"Tesla batteries\",\"Solar panels and roofs\"],\"Production output\":[\"367,500 vehicles (2019)\",\"1,651 MWh batteries\",\"(2019)\",\"173 MW solar\",\"(2019)\"],\"Revenue\":[\"US$\",\"24.578billion\",\"(2019)\"],\"Operating income\":[\"US$\",\"\\u221269\",\"million\",\"(2019)\"],\"Net income\":[\"US$\",\"\\u2212862\",\"million\",\"(2019)\"],\"Total assets\":[\"US$34.309billion\",\"(2019)\"],\"Total equity\":[\"US$6.618billion\",\"(2019)\"],\"Owner\":\"Elon Musk (20.8%)\",\"Number of employees\":[\"48,016\",\"(2019)\"],\"Subsidiaries\":[\"SolarCity\",\"Tesla Grohmann Automation\",\"Maxwell Technologies\",\"DeepScale\",\"Hibar Systems\",\"SilLion\"],\"Website\":[\"www\",\".tesla\",\".com\"]}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png",
          "sourcevarchar5": "POINT(-122.150277777778 37.3947222222222)",
          "sourcedouble1": 0.008826,
          "latitude": 37.394722,
          "longitude": -122.150278,
          "entity1": [
              {
                  "value": "2019",
                  "display": "2019"
              },
              {
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "2020",
                  "display": "2020"
              },
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "2017",
                  "display": "2017"
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
                  "value": "2",
                  "display": "2"
              },
              {
                  "value": "2014",
                  "display": "2014"
              },
              {
                  "value": "2015",
                  "display": "2015"
              },
              {
                  "value": "5",
                  "display": "5"
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
                  "value": "4",
                  "display": "4"
              },
              {
                  "value": "2010",
                  "display": "2010"
              },
              {
                  "value": "7",
                  "display": "7"
              },
              {
                  "value": "6",
                  "display": "6"
              },
              {
                  "value": "10",
                  "display": "10"
              },
              {
                  "value": "100",
                  "display": "100"
              },
              {
                  "value": "20",
                  "display": "20"
              }
          ],
          "date": [
              {
                  "value": "2016-07-20",
                  "display": "2016-07-20"
              },
              {
                  "value": "2017-01-15",
                  "display": "2017-01-15"
              },
              {
                  "value": "2017-11-16",
                  "display": "2017-11-16"
              },
              {
                  "value": "2017-12-01",
                  "display": "2017-12-01"
              },
              {
                  "value": "2019-08-03",
                  "display": "2019-08-03"
              },
              {
                  "value": "2009-05-19",
                  "display": "2009-05-19"
              },
              {
                  "value": "2009-07-13",
                  "display": "2009-07-13"
              },
              {
                  "value": "2010-01-07",
                  "display": "2010-01-07"
              },
              {
                  "value": "2010-05-20",
                  "display": "2010-05-20"
              },
              {
                  "value": "2012-06-22",
                  "display": "2012-06-22"
              },
              {
                  "value": "2012-11-16",
                  "display": "2012-11-16"
              },
              {
                  "value": "2013-10-01",
                  "display": "2013-10-01"
              },
              {
                  "value": "2013-11-06",
                  "display": "2013-11-06"
              },
              {
                  "value": "2014-01-04",
                  "display": "2014-01-04"
              },
              {
                  "value": "2014-03-28",
                  "display": "2014-03-28"
              },
              {
                  "value": "2014-07-16",
                  "display": "2014-07-16"
              },
              {
                  "value": "2015-05-08",
                  "display": "2015-05-08"
              },
              {
                  "value": "2015-05-19",
                  "display": "2015-05-19"
              },
              {
                  "value": "2015-09-29",
                  "display": "2015-09-29"
              },
              {
                  "value": "2016-03-31",
                  "display": "2016-03-31"
              }
          ],
          "money": [
              {
                  "value": "USD 1000000000",
                  "display": "USD 1000000000"
              },
              {
                  "value": "USD 100",
                  "display": "USD 100"
              },
              {
                  "value": "USD 35000",
                  "display": "USD 35000"
              },
              {
                  "value": "USD 420",
                  "display": "USD 420"
              },
              {
                  "value": "USD 250000",
                  "display": "USD 250000"
              },
              {
                  "value": "USD 42000000",
                  "display": "USD 42000000"
              },
              {
                  "value": "USD 50000000",
                  "display": "USD 50000000"
              },
              {
                  "value": "USD 1",
                  "display": "USD 1"
              },
              {
                  "value": "CNY 5000000",
                  "display": "CNY 5000000"
              },
              {
                  "value": "USD 14000000000",
                  "display": "USD 14000000000"
              },
              {
                  "value": "USD 200000",
                  "display": "USD 200000"
              },
              {
                  "value": "USD 20000000",
                  "display": "USD 20000000"
              },
              {
                  "value": "USD 2000000000",
                  "display": "USD 2000000000"
              },
              {
                  "value": "USD 2500000000",
                  "display": "USD 2500000000"
              },
              {
                  "value": "USD 295000000",
                  "display": "USD 295000000"
              },
              {
                  "value": "USD 30000000",
                  "display": "USD 30000000"
              },
              {
                  "value": "USD 37000000",
                  "display": "USD 37000000"
              },
              {
                  "value": "USD 375000",
                  "display": "USD 375000"
              },
              {
                  "value": "USD 37500000",
                  "display": "USD 37500000"
              },
              {
                  "value": "USD 3880000000",
                  "display": "USD 3880000000"
              }
          ],
          "entity7": [
              {
                  "value": "10.000, 22.026",
                  "display": "10.000, 22.026"
              },
              {
                  "value": "10.045, 10.045",
                  "display": "10.045, 10.045"
              },
              {
                  "value": "10.070, 8.182",
                  "display": "10.070, 8.182"
              },
              {
                  "value": "11.370, 18.440",
                  "display": "11.370, 18.440"
              },
              {
                  "value": "11.532, 11.532",
                  "display": "11.532, 11.532"
              },
              {
                  "value": "11.550, 25.051",
                  "display": "11.550, 25.051"
              },
              {
                  "value": "12.200, 76.200",
                  "display": "12.200, 76.200"
              },
              {
                  "value": "13.091, 11.597",
                  "display": "13.091, 11.597"
              },
              {
                  "value": "13.120, 1.542",
                  "display": "13.120, 1.542"
              },
              {
                  "value": "13.190, 56.065",
                  "display": "13.190, 56.065"
              },
              {
                  "value": "14.037, 17.272",
                  "display": "14.037, 17.272"
              },
              {
                  "value": "14.050, 63.359",
                  "display": "14.050, 63.359"
              },
              {
                  "value": "15.510, 12.420",
                  "display": "15.510, 12.420"
              },
              {
                  "value": "17.483, 79.703",
                  "display": "17.483, 79.703"
              },
              {
                  "value": "18.345, 9.764",
                  "display": "18.345, 9.764"
              },
              {
                  "value": "19.450, 92.550",
                  "display": "19.450, 92.550"
              },
              {
                  "value": "2.400, 14.820",
                  "display": "2.400, 14.820"
              },
              {
                  "value": "24.882, 12.700",
                  "display": "24.882, 12.700"
              },
              {
                  "value": "25.185, 16.047",
                  "display": "25.185, 16.047"
              },
              {
                  "value": "25.336, 14.065",
                  "display": "25.336, 14.065"
              }
          ],
          "entity12": [
              {
                  "value": "DEATH",
                  "display": "Death"
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
                  "value": "DIRECTOR",
                  "display": "Director"
              },
              {
                  "value": "CHIEF EXECUTIVE OFFICER",
                  "display": "Chief Executive Officer"
              },
              {
                  "value": "INVESTOR",
                  "display": "Investor"
              },
              {
                  "value": "CO-FOUNDER",
                  "display": "Co-founder"
              },
              {
                  "value": "FOUNDER",
                  "display": "Founder"
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
                  "value": "CHAIRMAN OF THE BOARD",
                  "display": "Chairman of the board"
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
                  "value": "REVENUE",
                  "display": "Revenue"
              },
              {
                  "value": "SHARES",
                  "display": "Shares"
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
                  "value": "PENALTY",
                  "display": "Penalty"
              },
              {
                  "value": "LOSSES",
                  "display": "Losses"
              },
              {
                  "value": "LIQUIDITY",
                  "display": "Liquidity"
              }
          ],
          "person_cooc": [
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(ELON MUSK)",
                  "display": "(Chief Executive Officer)#(Elon Musk)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(JAMES MURDOCH)",
                  "display": "(Chief Executive Officer)#(James Murdoch)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(LARRY ELLISON)",
                  "display": "(Chief Executive Officer)#(Larry Ellison)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(LINDA JOHNSON)",
                  "display": "(Chief Executive Officer)#(Linda Johnson)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(MARTIN EBERHARD)",
                  "display": "(Chief Executive Officer)#(Martin Eberhard)"
              },
              {
                  "value": "(CHIEF TECHNOLOGY OFFICER)#(KATHLEEN WILSON)",
                  "display": "(Chief Technology Officer)#(Kathleen Wilson)"
              },
              {
                  "value": "(CHIEF TECHNOLOGY OFFICER)#(NAOTO NOGUCHI)",
                  "display": "(Chief Technology Officer)#(Naoto Noguchi)"
              },
              {
                  "value": "(CO-FOUNDER)#(ELON MUSK)",
                  "display": "(Co-founder)#(Elon Musk)"
              },
              {
                  "value": "(CO-FOUNDER)#(LARRY ELLISON)",
                  "display": "(Co-founder)#(Larry Ellison)"
              },
              {
                  "value": "(DIRECTOR)#(BRAD BUSS)",
                  "display": "(Director)#(Brad Buss)"
              },
              {
                  "value": "(FOUNDER)#(ELON MUSK)",
                  "display": "(Founder)#(Elon Musk)"
              },
              {
                  "value": "(INVESTOR)#(ELON MUSK)",
                  "display": "(Investor)#(Elon Musk)"
              },
              {
                  "value": "(VICE-PRESIDENT)#(HERBERT KOHLER)",
                  "display": "(Vice-President)#(Herbert Kohler)"
              },
              {
                  "value": "(VICE-PRESIDENT)#(KATHLEEN WILSON)",
                  "display": "(Vice-President)#(Kathleen Wilson)"
              },
              {
                  "value": "(CO-FOUNDER)#(LARRY PAGE)",
                  "display": "(Co-founder)#(Larry Page)"
              },
              {
                  "value": "(CO-FOUNDER)#(SERGEY BRIN)",
                  "display": "(Co-founder)#(Sergey Brin)"
              },
              {
                  "value": "(FOUNDER)#(MARC TARPENNING)",
                  "display": "(Founder)#(Marc Tarpenning)"
              },
              {
                  "value": "(FOUNDER)#(MARTIN EBERHARD)",
                  "display": "(Founder)#(Martin Eberhard)"
              }
          ],
          "value_amount": [
              {
                  "value": "(REVENUE)#(USD 1)",
                  "display": "(Revenue)#(USD 1)"
              },
              {
                  "value": "(ACQUISITION)#(USD 42000000)",
                  "display": "(Acquisition)#(USD 42000000)"
              },
              {
                  "value": "(CAPITAL)#(USD 2500000000)",
                  "display": "(Capital)#(USD 2500000000)"
              },
              {
                  "value": "(CONTRACT)#(USD 14000000000)",
                  "display": "(Contract)#(USD 14000000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 1000000000)",
                  "display": "(Investment)#(USD 1000000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 42000000)",
                  "display": "(Investment)#(USD 42000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 50000000)",
                  "display": "(Investment)#(USD 50000000)"
              },
              {
                  "value": "(PENALTY)#(USD 20000000)",
                  "display": "(Penalty)#(USD 20000000)"
              },
              {
                  "value": "(REVENUE)#(USD 295000000)",
                  "display": "(Revenue)#(USD 295000000)"
              },
              {
                  "value": "(REVENUE)#(USD 30)",
                  "display": "(Revenue)#(USD 30)"
              },
              {
                  "value": "(REVENUE)#(USD 6350000000)",
                  "display": "(Revenue)#(USD 6350000000)"
              },
              {
                  "value": "(REVENUE)#(USD -69)",
                  "display": "(Revenue)#(USD -69)"
              },
              {
                  "value": "(REVENUE)#(USD -862)",
                  "display": "(Revenue)#(USD -862)"
              },
              {
                  "value": "(SHARES)#(USD 700000000)",
                  "display": "(Shares)#(USD 700000000)"
              },
              {
                  "value": "(CAPITAL)#(USD 206000000000)",
                  "display": "(Capital)#(USD 206000000000)"
              },
              {
                  "value": "(CAPITAL)#(USD 86000000000)",
                  "display": "(Capital)#(USD 86000000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 105000000)",
                  "display": "(Investment)#(USD 105000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 13000000)",
                  "display": "(Investment)#(USD 13000000)"
              },
              {
                  "value": "(INVESTMENT)#(USD 7500000)",
                  "display": "(Investment)#(USD 7500000)"
              },
              {
                  "value": "(LOSSES)#(USD 862000000)",
                  "display": "(Losses)#(USD 862000000)"
              }
          ],
          "company_person": [
              {
                  "value": "(PANASONIC)#(NAOTO NOGUCHI)",
                  "display": "(Panasonic)#(Naoto Noguchi)"
              },
              {
                  "value": "(DAIMLER)#(HERBERT KOHLER)",
                  "display": "(Daimler)#(Herbert Kohler)"
              },
              {
                  "value": "(TESLA MOTORS)#(MARC TARPENNING)",
                  "display": "(Tesla Motors)#(Marc Tarpenning)"
              },
              {
                  "value": "(TESLA MOTORS)#(MARTIN EBERHARD)",
                  "display": "(Tesla Motors)#(Martin Eberhard)"
              },
              {
                  "value": "(GOOGLE)#(NICK PRITZKER)",
                  "display": "(Google)#(Nick Pritzker)"
              },
              {
                  "value": "(J.P.MORGAN)#(JEFF SKOLL)",
                  "display": "(J.P.Morgan)#(Jeff Skoll)"
              },
              {
                  "value": "(J.P.MORGAN)#(LARRY PAGE)",
                  "display": "(J.P.Morgan)#(Larry Page)"
              },
              {
                  "value": "(J.P.MORGAN)#(NICK PRITZKER)",
                  "display": "(J.P.Morgan)#(Nick Pritzker)"
              },
              {
                  "value": "(J.P.MORGAN)#(SERGEY BRIN)",
                  "display": "(J.P.Morgan)#(Sergey Brin)"
              },
              {
                  "value": "(EBAY)#(JEFF SKOLL)",
                  "display": "(eBay)#(Jeff Skoll)"
              },
              {
                  "value": "(EBAY)#(LARRY PAGE)",
                  "display": "(eBay)#(Larry Page)"
              },
              {
                  "value": "(EBAY)#(NICK PRITZKER)",
                  "display": "(eBay)#(Nick Pritzker)"
              },
              {
                  "value": "(EBAY)#(SERGEY BRIN)",
                  "display": "(eBay)#(Sergey Brin)"
              },
              {
                  "value": "(GOOGLE)#(JEFF SKOLL)",
                  "display": "(Google)#(Jeff Skoll)"
              },
              {
                  "value": "(GOOGLE)#(LARRY PAGE)",
                  "display": "(Google)#(Larry Page)"
              },
              {
                  "value": "(GOOGLE)#(SERGEY BRIN)",
                  "display": "(Google)#(Sergey Brin)"
              },
              {
                  "value": "(TESLA MOTORS)#(NIKOLA TESLA)",
                  "display": "(Tesla Motors)#(Nikola Tesla)"
              }
          ],
          "person_job_company": [
              {
                  "value": "(NAOTO NOGUCHI)#(CHIEF TECHNOLOGY OFFICER)#(PANASONIC)",
                  "display": "(Naoto Noguchi)#(Chief Technology Officer)#(Panasonic)"
              },
              {
                  "value": "(HERBERT KOHLER)#(VICE-PRESIDENT)#(DAIMLER)",
                  "display": "(Herbert Kohler)#(Vice-President)#(Daimler)"
              },
              {
                  "value": "(JEFF SKOLL)#(CO-FOUNDER)#(J.P.MORGAN)",
                  "display": "(Jeff Skoll)#(Co-founder)#(J.P.Morgan)"
              },
              {
                  "value": "(LARRY PAGE)#(CO-FOUNDER)#(J.P.MORGAN)",
                  "display": "(Larry Page)#(Co-founder)#(J.P.Morgan)"
              },
              {
                  "value": "(NICK PRITZKER)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Nick Pritzker)#(Co-founder)#(Google)"
              },
              {
                  "value": "(NICK PRITZKER)#(CO-FOUNDER)#(J.P.MORGAN)",
                  "display": "(Nick Pritzker)#(Co-founder)#(J.P.Morgan)"
              },
              {
                  "value": "(SERGEY BRIN)#(CO-FOUNDER)#(J.P.MORGAN)",
                  "display": "(Sergey Brin)#(Co-founder)#(J.P.Morgan)"
              },
              {
                  "value": "(JEFF SKOLL)#(CO-FOUNDER)#(EBAY)",
                  "display": "(Jeff Skoll)#(Co-founder)#(eBay)"
              },
              {
                  "value": "(JEFF SKOLL)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Jeff Skoll)#(Co-founder)#(Google)"
              },
              {
                  "value": "(LARRY PAGE)#(CO-FOUNDER)#(EBAY)",
                  "display": "(Larry Page)#(Co-founder)#(eBay)"
              },
              {
                  "value": "(LARRY PAGE)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Larry Page)#(Co-founder)#(Google)"
              },
              {
                  "value": "(NICK PRITZKER)#(CO-FOUNDER)#(EBAY)",
                  "display": "(Nick Pritzker)#(Co-founder)#(eBay)"
              },
              {
                  "value": "(SERGEY BRIN)#(CO-FOUNDER)#(EBAY)",
                  "display": "(Sergey Brin)#(Co-founder)#(eBay)"
              },
              {
                  "value": "(SERGEY BRIN)#(CO-FOUNDER)#(GOOGLE)",
                  "display": "(Sergey Brin)#(Co-founder)#(Google)"
              }
          ],
          "rank": 3,
          "displayTitle": "<span class=\"match-highlight\">Tesla</span>, Inc.",
          "relevantExtracts": "<b>tesla </b>... overarching purpose of <b>Tesla </b><b>Motors</b>... <b>Tesla</b>&#39;s current ... To produce these, <b>Tesla </b>operates multiple ... facility is at <b>Tesla </b>Factory ... in the market, <b>Tesla </b>ranked as ... <b>Tesla </b>global vehicle ... <b>Tesla </b>cars accounted ... by Eberhard and <b>Tesla </b>in September ... consistently maintained that <b>Tesla</b>&#39;s "
      },
      {
          "id": "/Web/Wikipedia/|Tesla_Factory",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.988887,
          "matchingpartnames": [
              "text",
              "tables",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "{b}Tesla{nb} took ownership in 2010.",
              "244,29",
              "14676,29",
              "{b}Tesla{nb} had planned for an assembly factory in Albuquerque, New Mexico , as a central location for shipping.",
              "408,106",
              "25445,181",
              "{b}Tesla{nb} initially also dismissed NUMMI for being too big and costly.",
              "745,66",
              "26449,66",
              "Rail freight transport is also used to receive batteries and Model 3 drivetrains from {b}Tesla{nb}'s Gigafactory 1 .",
              "1542,109",
              "29486,188",
              "On May 20, 2010, {b}Tesla{nb} Inc. and Toyota announced a partnership to work on electric vehicle development and collaborate on the \"development of electric vehicles, parts, and production system and engineering support\".",
              "1653,215",
              "29799,285",
              "This included {b}Tesla{nb}'s partial purchase of the former NUMMI site, mainly consisting of the factory building, for $42 million.",
              "1869,124",
              "30085,384",
              "{b}Tesla{nb} officially took possession of the site on October 19, 2010, and opened it on October 27.",
              "1995,94",
              "30729,221",
              "The former NUMMI (now {b}Tesla{nb}) plant in Fremont, California",
              "2304,57",
              "32932,57",
              "NUMMI auctioned off the press lines, robots and other equipment to Toyota's other US factories , and {b}Tesla{nb} purchased over $17 million of manufacturing equipment and spare parts in 2011, at significant discounts compared to new equipment.",
              "2375,237",
              "33444,927",
              "Additionally, {b}Tesla{nb} bought a Schuler SMG hydraulic stamping press, worth $50 million, for $6 million, including shipping costs from Detroit.",
              "2613,140",
              "34489,140"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "6,5,94,5,244,5,408,5,745,5,1628,5,1670,5,1883,5,1995,5,2216,5,2271,5,2326,5,2476,5,2627,5,2795,5,3105,5,3630,5,3721,5,3924,5,3999,5,4160,5,4295,5,4451,5,4534,5,4641,5,4978,5,5004,5,5078,5,5138,5,5269,5,5404,5,5612,5,5775,5,5960,5,6093,5,6227,5,6761,5,6879,5,7037,5,7291,5,7752,5,7928,5,7998,5,8131,5,8332,5,8395,5,8501,5,8717,5,8799,5,8946,5,9409,5,10112,5,10254,5,12284,5,12469,5,13420,5,15264,5,15401,5,15512,5,15968,5,16188,5,16267,5,16308,12,16425,5,16437,5,16494,5,16540,5;13760,5,14137,5,14676,5,25445,5,26449,5,29576,5,29882,5,30099,5,30729,5,31632,5,31687,5,32954,5,34235,5,34503,5,34986,5,35921,5,38282,5,38613,5,39702,5,40106,5,40420,5,41251,5,41780,5,42750,5,43282,5,45199,5,45229,5,45459,5,45672,5,45920,5,46172,5,46636,5,47460,5,47911,5,48167,5,48450,5,50347,5,50742,5,51049,5,51770,5,52727,5,53347,5,53417,5,53740,5,54106,5,54286,5,54515,5,55254,5,55461,5,55925,5,57887,5,60864,5,62852,5,67285,5,67720,5,73792,5,81046,5,81303,5,81414,5,82001,5,83340,5,381282,5,381327,12,381917,5,382028,5,382088,5,382330,5"
                  },
                  {
                      "partname": "tables",
                      "data": "16918,5,17104,5,17118,5,17132,5,17146,5,17247,5;432965,5,433179,5,433193,5,433207,5,433221,5,433326,5"
                  },
                  {
                      "partname": "title",
                      "data": "17260,5;433417,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Tesla Factory",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-31 18:23:14",
          "indexationtime": "2020-09-02 10:45:32",
          "version": "wVTmCvPuHSdzGPi9kKWB6g==",
          "size": 432815,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Tesla_Factory",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              }
          ],
          "company": [
              {
                  "value": "UNION PACIFIC",
                  "display": "Union Pacific"
              },
              {
                  "value": "GENERAL MOTORS",
                  "display": "General Motors"
              },
              {
                  "value": "SCHULER",
                  "display": "Schuler"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "PANASONIC",
                  "display": "Panasonic"
              },
              {
                  "value": "BASF",
                  "display": "Basf"
              },
              {
                  "value": "LENNAR",
                  "display": "Lennar"
              }
          ],
          "geo": [
              {
                  "value": "FREMONT",
                  "display": "Fremont"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "TOYOTA",
                  "display": "Toyota"
              },
              {
                  "value": "NORTH AMERICA",
                  "display": "North America"
              },
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "NEW YORK",
                  "display": "New York"
              },
              {
                  "value": "TILBURG",
                  "display": "Tilburg"
              },
              {
                  "value": "BERLIN",
                  "display": "Berlin"
              },
              {
                  "value": "NETHERLANDS",
                  "display": "Netherlands"
              },
              {
                  "value": "NEVADA",
                  "display": "Nevada"
              },
              {
                  "value": "SAN FRANCISCO",
                  "display": "San Francisco"
              },
              {
                  "value": "ALBUQUERQUE",
                  "display": "Albuquerque"
              },
              {
                  "value": "DETROIT",
                  "display": "Detroit"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "LIVERMORE",
                  "display": "Livermore"
              },
              {
                  "value": "NEW MEXICO",
                  "display": "New Mexico"
              },
              {
                  "value": "SAN JOSE",
                  "display": "San Jose"
              }
          ],
          "wordcount": 2083,
          "exacthash": "QZ2ihOlxIrMv6/XeSs86Cw==",
          "nearhash": "k10ovUXTejIzXCNg8KykNQ==",
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
          "url1": "https://en.wikipedia.org/wiki/Tesla_Factory",
          "sourcecsv1": [
              "Built",
              "Location",
              "Coordinates",
              "Industry",
              "Products",
              "Employees",
              "Address",
              "Owner"
          ],
          "sourcecsv2": [
              "Gigafactory_(disambiguation)",
              "Tesla_facilities_in_Tilburg",
              "Tesla_Model_S",
              "Fremont_Assembly",
              "Fremont,_California",
              "Automotive_industry",
              "Tesla_Model_3",
              "Tesla_Model_X",
              "Tesla_Model_Y",
              "Tesla,_Inc.",
              "Automobile",
              "Manufacturing",
              "Factory",
              "General_Motors",
              "NUMMI",
              "Toyota",
              "Albuquerque,_New_Mexico",
              "Greenfield_project",
              "San_Jose,_California",
              "Aurica_Motors",
              "Mud_Slough",
              "California_State_Route_262",
              "Union_Pacific_Railroad",
              "Rail_freight_transport",
              "Gigafactory_1",
              "Tesla_Inc.",
              "Toyota_Motor_Manufacturing_Kentucky",
              "Toyota_Motor_Manufacturing_Texas",
              "Toyota_Motor_Manufacturing_Mississippi",
              "BASF",
              "Electrostatic_coating",
              "Lathrop,_California",
              "Livermore,_California",
              "Lennar_Corporation",
              "Series_production",
              "Battery_electric_vehicle",
              "Sedan_(automobile)",
              "Overhead_crane",
              "Tilburg",
              "Netherlands",
              "Mass_production",
              "Shift_work",
              "San_Francisco_Bay_Area",
              "Dashboard",
              "Giga_Shanghai",
              "Giga_New_York",
              "X-Men",
              "Battery_pack",
              "Machine_press",
              "North_America",
              "Assembly_line",
              "Centimetre",
              "Stator",
              "Rotor_(electric)",
              "Induction_motor",
              "Power_inverter",
              "Direct_current",
              "Metal%E2%80%93oxide%E2%80%93semiconductor",
              "Power_transistor",
              "Insulated-gate_bipolar_transistor",
              "Silicon_carbide",
              "Power_MOSFET",
              "MOSFET",
              "18650",
              "Lithium-ion_battery",
              "AA_battery",
              "Panasonic",
              "Ampere-hour",
              "Cathode",
              "Commodity_cell",
              "Laptop",
              "Mobile_phone",
              "Intumescent",
              "Aluminium",
              "Laser_cutting",
              "Ton-force",
              "Die_(manufacturing)",
              "Axle",
              "Wheel",
              "Drive_shaft",
              "Center_of_mass",
              "Titanium",
              "United_States_Environmental_Protection_Agency",
              "California_Department_of_Industrial_Relations",
              "Giga_Nevada",
              "Giga_Berlin",
              "Giga_Austin",
              "Autoweek",
              "Wall_Street_Journal",
              "San_Francisco_Gate",
              "Los_Angeles_Times",
              "San_Jose_Mercury_News",
              "Automotive_News",
              "TheStreet",
              "Electrek",
              "Wired.com",
              "Bloomberg_L.P.",
              "Bloomberg_Businessweek",
              "Tesla_Motors",
              "American_City_Business_Journals",
              "Xinhua_News_Agency",
              "Wired_(website)",
              "The_Christian_Science_Monitor",
              "The_New_York_Times",
              "USA_Today",
              "Gawker_Media",
              "AOL_Inc.",
              "Wired_(magazine)",
              "National_Geographic_Channel",
              "YouTube",
              "Ultimate_Factories#Season_6_(2013)",
              "This_American_Life",
              "Tesla_Cybertruck",
              "Tesla_Cyberquad",
              "Tesla_Roadster_(2020)",
              "Tesla_Semi",
              "Tesla_Roadster_(2008)",
              "Mercedes_A-Class_E-Cell",
              "Mercedes-Benz_B-Class_Electric_Drive",
              "Smart_electric_drive",
              "Toyota_RAV4_EV",
              "Tesla_Autopilot",
              "Tesla_Solar_Roof",
              "Tesla_Powerwall",
              "Tesla_Powerpack",
              "Tesla_Megapack",
              "Robyn_Denholm",
              "Elon_Musk",
              "Zach_Kirkhorn",
              "Drew_Baglino",
              "Franz_von_Holzhausen",
              "Jerome_Guillen",
              "Larry_Ellison",
              "Hiromichi_Mizuno",
              "Andrej_Karpathy",
              "Kathleen_Wilson-Thompson",
              "Deepak_Ahuja",
              "Ze%27ev_Drori",
              "Martin_Eberhard",
              "Arnnon_Geshuri",
              "Jim_Keller_(engineer)",
              "Chris_Lattner",
              "Marc_Tarpenning",
              "J._B._Straubel",
              "Jay_Vijayan",
              "Gigafactory_5",
              "Tesla_Supercharger",
              "Lawsuits_and_Controversies_of_Tesla,_Inc.",
              "Tesla_US_dealership_disputes",
              "Sudden_unintended_acceleration#Tesla&#39",
              "s_Model_X,_S_and_3",
              "TSLAQ",
              "History_of_Tesla,_Inc.",
              "SolarCity",
              "Elon_Musk%27s_Tesla_Roadster",
              "Giga_Press",
              "Hornsdale_Power_Reserve",
              "Maxwell_Technologies",
              "Geographic_coordinate_system"
          ],
          "sourcestr1": "Tesla_Factory",
          "sourcestr2": "Q7705509",
          "sourcestr3": "Q83405",
          "category": "factory",
          "sourcevarchar3": "[{\"Built\":[\"1962\",\"as\",\"Fremont Assembly\",\"2010\",\"as Tesla Factory\"],\"Location\":\"Fremont, California\",\"Coordinates\":[\"37\\u00b029\\u203241.12\\u2033N\",\"121\\u00b056\\u203241.16\\u2033W\",\"\\ufeff \\/ \\ufeff\",\"37.4947556\\u00b0N 121.9447667\\u00b0W\",\"\\ufeff \\/\",\"37.4947556; -121.9447667\"],\"Industry\":\"Automotive industry\",\"Products\":[\"Tesla Model S\",\"Tesla Model 3\",\"Tesla Model X\",\"Tesla Model Y\"],\"Employees\":\"10,000\",\"Address\":[\"45500 Fremont Boulevard\",\"Fremont, California\",\"94538\"],\"Owner\":\"Tesla, Inc.\"}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Tesla_auto_bots.jpg/1200px-Tesla_auto_bots.jpg",
          "sourcevarchar5": "POINT(-121.944766666667 37.4947555555556)",
          "sourcedouble1": 0.015262,
          "latitude": 37.494756,
          "longitude": -121.944767,
          "entity1": [
              {
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "2016",
                  "display": "2016"
              },
              {
                  "value": "2015",
                  "display": "2015"
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
                  "value": "2017",
                  "display": "2017"
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
                  "value": "2010",
                  "display": "2010"
              },
              {
                  "value": "2014",
                  "display": "2014"
              },
              {
                  "value": "6",
                  "display": "6"
              },
              {
                  "value": "37.4947556",
                  "display": "37.4947556"
              },
              {
                  "value": "10000",
                  "display": "10000"
              },
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "5",
                  "display": "5"
              },
              {
                  "value": "20",
                  "display": "20"
              },
              {
                  "value": "18",
                  "display": "18"
              },
              {
                  "value": "50",
                  "display": "50"
              },
              {
                  "value": "5000",
                  "display": "5000"
              },
              {
                  "value": "10",
                  "display": "10"
              }
          ],
          "date": [
              {
                  "value": "2012-06-22",
                  "display": "2012-06-22"
              },
              {
                  "value": "2019-04-01",
                  "display": "2019-04-01"
              },
              {
                  "value": "2010-05-20",
                  "display": "2010-05-20"
              },
              {
                  "value": "2010-10-19",
                  "display": "2010-10-19"
              },
              {
                  "value": "2015-07-02",
                  "display": "2015-07-02"
              },
              {
                  "value": "2016-08-03",
                  "display": "2016-08-03"
              }
          ],
          "money": [
              {
                  "value": "USD 1260000000",
                  "display": "USD 1260000000"
              },
              {
                  "value": "USD 1460000000",
                  "display": "USD 1460000000"
              },
              {
                  "value": "USD 17000000",
                  "display": "USD 17000000"
              },
              {
                  "value": "USD 34700000",
                  "display": "USD 34700000"
              },
              {
                  "value": "USD 42000000",
                  "display": "USD 42000000"
              },
              {
                  "value": "USD 50000000",
                  "display": "USD 50000000"
              },
              {
                  "value": "USD 6000000",
                  "display": "USD 6000000"
              },
              {
                  "value": "USD 89000",
                  "display": "USD 89000"
              }
          ],
          "entity7": [
              {
                  "value": "37.4948, -121.9448",
                  "display": "37.4948, -121.9448"
              },
              {
                  "value": "37.4948, -121.9448121.9448",
                  "display": "37.4948, -121.9448121.9448"
              }
          ],
          "entity12": [
              {
                  "value": "DEATH",
                  "display": "Death"
              },
              {
                  "value": "VICTORY",
                  "display": "Victory"
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
                  "value": "REVENUE",
                  "display": "Revenue"
              }
          ],
          "value_amount": [
              {
                  "value": "(ACQUISITION)#(USD 17000000)",
                  "display": "(Acquisition)#(USD 17000000)"
              },
              {
                  "value": "(SHARES)#(USD 1260000000)",
                  "display": "(Shares)#(USD 1260000000)"
              },
              {
                  "value": "(SHARES)#(USD 1460000000)",
                  "display": "(Shares)#(USD 1460000000)"
              }
          ],
          "rank": 4,
          "displayTitle": "<span class=\"match-highlight\">Tesla</span> Factory",
          "relevantExtracts": "<b>Tesla </b>took ... <b>Tesla </b>had planned for ... <b>Tesla </b>initially also dismissed ... 3 drivetrains from <b>Tesla</b>... May 20, 2010, <b>Tesla </b>Inc. and ... This included <b>Tesla</b>&#39;s partial ... <b>Tesla </b>officially took ... former NUMMI (now <b>Tesla</b>) plant ... factories , and <b>Tesla </b>purchased over ... Additionally, <b>Tesla </b>bought a "
      },
      {
          "id": "/Web/Wikipedia/|Tesla_(2020_film)",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.985178,
          "matchingpartnames": [
              "text",
              "tables",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "{b}Tesla{nb} is a 2020 American biographical drama film written and directed by Michael Almereyda .",
              "2,92",
              "13747,297",
              "It stars Ethan Hawke as Nikola {b}Tesla{nb} .",
              "95,38",
              "14045,143",
              "In New York City in 1884, Nikola {b}Tesla{nb} works for Thomas Edison where neither gets along with one another.",
              "401,105",
              "19678,217",
              "{b}Tesla{nb} pitches his idea to those who will pay him much more than Edison.",
              "507,71",
              "19896,71",
              "{b}Tesla{nb} continues work on his induction motor, assisted by his friend Anthony Szigeti from Budapest .",
              "623,99",
              "20019,144",
              "{b}Tesla{nb} meets Anne , the daughter of J. P. Morgan .",
              "723,49",
              "20164,187",
              "Edison says, direct current is better and dismisses {b}Tesla{nb}'s alternating current.",
              "1060,80",
              "20830,82",
              "Meanwhile, {b}Tesla{nb} begins dating Anne, despite her father being one of Edison's incredibly wealthy funders.",
              "1282,105",
              "21177,107",
              "Westinghouse tells {b}Tesla{nb} that Edison has failed, but that their business is still failing, and that they need a merger.",
              "1389,119",
              "21292,119",
              "The only merger he could get requires {b}Tesla{nb} to give up his horsepower clause, but then the entire country will be using his machines.",
              "1509,133",
              "21412,133"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "2,5,126,5,434,5,507,5,623,5,723,5,773,5,852,5,882,5,946,5,997,5,1112,5,1293,5,1408,5,1547,5,1643,5,1801,5,1850,5,1949,5,2005,5,2098,5,2194,5,2219,5,2370,5,2433,5,2596,5,2788,5,2854,5,2897,5,3159,5,3269,5,3931,5,4092,5,4246,5,4925,5,5216,5;13747,5,14178,5,19767,5,19896,5,20019,5,20164,5,20352,5,20499,5,20531,5,20645,5,20762,5,20882,5,21188,5,21311,5,21450,5,21546,5,21770,5,21819,5,21918,5,21984,5,22122,5,22218,5,22243,5,22396,5,22459,5,22630,5,22865,5,22931,5,22976,5,23353,5,23990,5,26485,5,26710,5,27512,5,30389,5,58022,5"
                  },
                  {
                      "partname": "tables",
                      "data": "5236,5;123789,5"
                  },
                  {
                      "partname": "title",
                      "data": "5928,5;124567,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Tesla  (2020 film)",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-01 15:41:14",
          "indexationtime": "2020-09-02 01:23:56",
          "version": "hr7lleWJm6mA/EIsixtKyg==",
          "size": 123680,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Tesla_(2020_film)",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "ETHAN HAWKE",
                  "display": "Ethan Hawke"
              },
              {
                  "value": "MICHAEL ALMEREYDA",
                  "display": "Michael Almereyda"
              },
              {
                  "value": "KYLE MACLACHLAN",
                  "display": "Kyle MacLachlan"
              },
              {
                  "value": "NIKOLA TESLA",
                  "display": "Nikola Tesla"
              },
              {
                  "value": "SARAH BERNHARDT",
                  "display": "Sarah Bernhardt"
              },
              {
                  "value": "WILLIAM KEMMLER",
                  "display": "William Kemmler"
              },
              {
                  "value": "EVE HEWSON",
                  "display": "Eve Hewson"
              },
              {
                  "value": "GEORGE WESTINGHOUSE",
                  "display": "George Westinghouse"
              },
              {
                  "value": "JIM GAFFIGAN",
                  "display": "Jim Gaffigan"
              },
              {
                  "value": "THOMAS EDISON",
                  "display": "Thomas Edison"
              },
              {
                  "value": "ALFRED BROWN",
                  "display": "Alfred Brown"
              },
              {
                  "value": "ANNE MORGAN",
                  "display": "Anne Morgan"
              },
              {
                  "value": "BLAKE DELONG",
                  "display": "Blake Delong"
              },
              {
                  "value": "DEREK JARMAN",
                  "display": "Derek Jarman"
              },
              {
                  "value": "DONNIE KESHAWARZ",
                  "display": "Donnie Keshawarz"
              },
              {
                  "value": "HANNAH GROSS",
                  "display": "Hannah Gross"
              },
              {
                  "value": "HENRY JAMES",
                  "display": "Henry James"
              },
              {
                  "value": "IAN LITHGOW",
                  "display": "Ian Lithgow"
              },
              {
                  "value": "JAMES URBANIAK",
                  "display": "James Urbaniak"
              },
              {
                  "value": "JERZY SKOLIMOWSKI",
                  "display": "Jerzy Skolimowski"
              }
          ],
          "company": [
              {
                  "value": "J.P.MORGAN",
                  "display": "J.P.Morgan"
              }
          ],
          "geo": [
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "COLORADO",
                  "display": "Colorado"
              },
              {
                  "value": "JOHNSON",
                  "display": "Johnson"
              },
              {
                  "value": "PITTSBURGH",
                  "display": "Pittsburgh"
              },
              {
                  "value": "BUDAPEST",
                  "display": "Budapest"
              },
              {
                  "value": "NEW YORK",
                  "display": "New York"
              }
          ],
          "wordcount": 716,
          "exacthash": "LdOF82dcXDcdxtr3GaoB1A==",
          "nearhash": "ozPu5zvvRCvMuF4/DKBDZQ==",
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
          "url1": "https://en.wikipedia.org/wiki/Tesla_(2020_film)",
          "sourcecsv1": [
              "Tesla",
              "Directed by",
              "Produced by",
              "Written by",
              "Starring",
              "Music by",
              "Cinematography",
              "Edited by",
              "Production companies",
              "Distributed by",
              "Release date",
              "Running time",
              "Country",
              "Language",
              "Box office"
          ],
          "sourcecsv2": [
              "Michael_Almereyda",
              "Uri_Singer",
              "Christa_Campbell",
              "Lati_Grobman",
              "Ethan_Hawke",
              "Eve_Hewson",
              "Ebon_Moss-Bachrach",
              "Jim_Gaffigan",
              "Kyle_MacLachlan",
              "John_Paesano",
              "Sean_Price_Williams",
              "Campbell_Grobman_Films",
              "IFC_Films",
              "Sundance_Film_Festival",
              "Biographical_film",
              "Drama_film",
              "Nikola_Tesla",
              "New_York_City",
              "Thomas_Edison",
              "Budapest",
              "Anne_Morgan_(philanthropist)",
              "J._P._Morgan",
              "George_Westinghouse",
              "Pittsburgh",
              "War_of_the_currents",
              "William_Kemmler",
              "Electric_chair",
              "Sarah_Bernhardt",
              "Colorado",
              "Mars",
              "American_Committee_for_Devastated_France",
              "Hannah_Gross",
              "Josh_Hamilton_(actor)",
              "Robert_Underwood_Johnson",
              "James_Urbaniak",
              "Donnie_Keshawarz",
              "J.P._Morgan",
              "Lois_Smith",
              "Ian_Lithgow",
              "Jerzy_Skolimowski",
              "Derek_Jarman",
              "Henry_James",
              "Apple_TV",
              "Charter_Communications",
              "Rotten_Tomatoes",
              "Metacritic",
              "Box_Office_Mojo",
              "The_Hollywood_Reporter",
              "Deadline_Hollywood",
              "IndieWire",
              "IMDb",
              "Twister_(1989_film)",
              "Another_Girl_Another_Planet_(film)",
              "Nadja_(film)",
              "Trance_(1998_film)",
              "Hamlet_(2000_film)",
              "Happy_Here_and_Now",
              "William_Eggleston_in_the_Real_World",
              "Cymbeline_(film)",
              "Experimenter_(film)",
              "Marjorie_Prime",
              "List_of_Nikola_Tesla_patents",
              "Magnifying_transmitter",
              "Plasma_lamp",
              "Plasma_globe",
              "Polyphase_system",
              "Induction_motor",
              "Tesla_Experimental_Station",
              "Teleforce",
              "Telegeodynamics",
              "Tesla_coil",
              "History_of_the_Tesla_coil",
              "Wireless_power",
              "Resonant_inductive_coupling",
              "Radio_control",
              "Tesla_turbine",
              "Tesla%27s_oscillator",
              "Tesla_valve",
              "Three-phase_electric_power",
              "Wardenclyffe_Tower",
              "Tesla_Electric_Light_and_Manufacturing",
              "The_Inventions,_Researches,_and_Writings_of_Nikola_Tesla",
              "Colorado_Springs_Notes,_1899%E2%80%931900",
              "Fragments_of_Olympian_Gossip",
              "My_Inventions:_The_Autobiography_of_Nikola_Tesla",
              "Westinghouse_Electric_Corporation",
              "World_Wireless_System",
              "Nikola_Tesla_in_popular_culture",
              "Nikola_Tesla_Museum",
              "Nikola_Tesla_Memorial_Center",
              "Tesla_Science_Center_at_Wardenclyffe",
              "IEEE_Nikola_Tesla_Award",
              "Nikola_Tesla_Satellite_Award",
              "Belgrade_Nikola_Tesla_Airport",
              "Wyndham_New_Yorker_Hotel",
              "The_Secret_of_Nikola_Tesla",
              "Tesla_-_Lightning_in_His_Hand",
              "The_Prestige_(film)",
              "Tower_to_the_People",
              "Tesla_(2016_film)",
              "The_Tesla_World_Light",
              "The_Current_War",
              "Nikola_Tesla%27s_Night_of_Terror",
              "Tesla:_Man_Out_of_Time",
              "Wizard:_The_Life_and_Times_of_Nikola_Tesla",
              "The_Man_Who_Invented_the_Twentieth_Century",
              "Tesla_(unit)",
              "Tesla_(crater)",
              "2244_Tesla",
              "List_of_Edison_patents",
              "Carbon_microphone",
              "Edison%27s_Phonograph_Doll",
              "Edison_screw",
              "Etheric_force",
              "Kinetoscope",
              "Phonograph",
              "Phonomotor",
              "Quadruplex_telegraph",
              "Tasimeter",
              "Consolidated_Edison",
              "Edison%E2%80%93Lalande_cell",
              "Fluoroscopy",
              "Incandescent_light_bulb",
              "Movie_camera",
              "Nickel%E2%80%93iron_battery",
              "Thermionic_emission",
              "Ticker_tape",
              "Thomas_A._Edison,_Inc.",
              "Edison_and_Swan_Electric_Light_Company",
              "Edison_Gower-Bell_Telephone_Company_of_Europe,_Ltd.",
              "Edison_Illuminating_Company",
              "Edison_Machine_Works",
              "Edison_Manufacturing_Company",
              "Edison_Ore-Milling_Company",
              "Edison_Portland_Cement_Company",
              "Edison_Records",
              "Edison_Storage_Battery_Company",
              "Edison_Studios",
              "General_Electric",
              "Motion_Picture_Patents_Company",
              "MSA_Safety",
              "Oriental_Telephone_Company",
              "Thomas_Alva_Edison_Birthplace",
              "Edison%27s_Black_Maria",
              "Thomas_Edison_Depot_Museum",
              "Thomas_Alva_Edison_Memorial_Tower_and_Museum",
              "Thomas_Edison_National_Historical_Park",
              "Edison_State_Park",
              "Edison_Storage_Battery_Company_Building",
              "General_Electric_Research_Laboratory",
              "Edison_and_Ford_Winter_Estates",
              "Charles_Edison",
              "Theodore_Miller_Edison",
              "Young_Tom_Edison",
              "Edison,_the_Man",
              "The_Wizard_of_Evergreen_Terrace",
              "The_Future_Eve",
              "Edison%27s_Conquest_of_Mars",
              "Tales_from_the_Bully_Pulpit",
              "The_Execution_of_Mary_Stuart",
              "The_Kiss_(1896_film)",
              "Frankenstein_(1910_film)",
              "A_Night_of_Terror_(1911_film)",
              "Kidnapped_(1917_film)",
              "Edisonade",
              "Edisonian_approach",
              "Thomas_Edison_in_popular_culture",
              "Pearl_Street_Station",
              "Edison_Museum",
              "Thomas_Edison_House",
              "Edison_Hotel_(Sunbury,_Pennsylvania)",
              "Telephonoscope",
              "Thomas_Edison_(Cottrill)",
              "Thomas_Alva_Edison_silver_dollar"
          ],
          "sourcestr1": "Tesla_(2020_film)",
          "sourcestr2": "Q88053410",
          "sourcestr3": "Q11424",
          "category": "film",
          "sourcevarchar3": "[{\"Tesla\":\"Official promotional poster\",\"Directed by\":\"Michael Almereyda\",\"Produced by\":[\"Michael Almereyda\",\"Uri Singer\",\"Christa Campbell\",\"Isen Robbins\",\"Lati Grobman\",\"Per Melita\"],\"Written by\":\"Michael Almereyda\",\"Starring\":[\"Ethan Hawke\",\"Eve Hewson\",\"Ebon Moss-Bachrach\",\"Jim Gaffigan\",\"Kyle MacLachlan\"],\"Music by\":\"John Paesano\",\"Cinematography\":\"Sean Price Williams\",\"Edited by\":\"Kathryn J. Schubert\",\"Production companies\":[\"Passage Pictures\",\"BB Film Production\",\"Campbell Grobman Films\",\"Intrinsic Value Films\",\"RNG Entertainment Oy\",\"Millennium Media\"],\"Distributed by\":\"IFC Films\",\"Release date\":[\"January27,2020\",\"August21,2020\",\"(United States)\"],\"Running time\":\"102 minutes\",\"Country\":\"United States\",\"Language\":\"English\",\"Box office\":\"$79,603\"}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/en/d/d0/Tesla_2020_poster.jpg",
          "sourcedouble1": 0.018802,
          "entity1": [
              {
                  "value": "2020",
                  "display": "2020"
              },
              {
                  "value": "1",
                  "display": "1"
              },
              {
                  "value": "21",
                  "display": "21"
              },
              {
                  "value": "27",
                  "display": "27"
              },
              {
                  "value": "100000",
                  "display": "100000"
              },
              {
                  "value": "100",
                  "display": "100"
              },
              {
                  "value": "102",
                  "display": "102"
              },
              {
                  "value": "108",
                  "display": "108"
              },
              {
                  "value": "140",
                  "display": "140"
              },
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "28",
                  "display": "28"
              },
              {
                  "value": "4",
                  "display": "4"
              },
              {
                  "value": "42000",
                  "display": "42000"
              },
              {
                  "value": "60",
                  "display": "60"
              },
              {
                  "value": "68",
                  "display": "68"
              },
              {
                  "value": "79603",
                  "display": "79603"
              },
              {
                  "value": "87",
                  "display": "87"
              },
              {
                  "value": "1884",
                  "display": "1884"
              },
              {
                  "value": "1885",
                  "display": "1885"
              }
          ],
          "date": [
              {
                  "value": "2020-01-27",
                  "display": "2020-01-27"
              },
              {
                  "value": "2020-08-21",
                  "display": "2020-08-21"
              }
          ],
          "money": [
              {
                  "value": "USD 100000",
                  "display": "USD 100000"
              },
              {
                  "value": "USD 42000",
                  "display": "USD 42000"
              },
              {
                  "value": "USD 79603",
                  "display": "USD 79603"
              }
          ],
          "entity12": [
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
          "entity14": [
              {
                  "value": "ACQUISITION",
                  "display": "Acquisition"
              },
              {
                  "value": "CONTRACT",
                  "display": "Contract"
              }
          ],
          "event_date": [
              {
                  "value": "(VICTORY)#(2020-01-27)",
                  "display": "(Victory)#(2020-01-27)"
              }
          ],
          "person_cooc": [
              {
                  "value": "(DIRECTOR)#(DEREK JARMAN)",
                  "display": "(Director)#(Derek Jarman)"
              },
              {
                  "value": "(DIRECTOR)#(HENRY JAMES)",
                  "display": "(Director)#(Henry James)"
              },
              {
                  "value": "(DIRECTOR)#(JERZY SKOLIMOWSKI)",
                  "display": "(Director)#(Jerzy Skolimowski)"
              }
          ],
          "company_person": [
              {
                  "value": "(J.P.MORGAN)#(DONNIE KESHAWARZ)",
                  "display": "(J.P.Morgan)#(Donnie Keshawarz)"
              }
          ],
          "rank": 5,
          "displayTitle": "<span class=\"match-highlight\">Tesla</span> (2020 film)",
          "relevantExtracts": "<b>Tesla </b>is a 2020 ... Hawke as Nikola <b>Tesla </b>... in 1884, Nikola <b>Tesla </b>works for Thomas ... <b>Tesla </b>pitches his idea ... <b>Tesla </b>continues work on ... <b>Tesla </b>meets Anne , ... better and dismisses <b>Tesla</b>... Meanwhile, <b>Tesla </b>begins dating ... Westinghouse tells <b>Tesla </b>that Edison ... could get requires <b>Tesla </b>to give "
      },
      {
          "id": "/Web/Wikipedia/|Nvidia_Tesla",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.978596,
          "matchingpartnames": [
              "text",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "The Nvidia {b}Tesla{nb} product line competed with AMD's Radeon Instinct and Intel Xeon Phi lines of deep learning and GPU cards.",
              "364,122",
              "9538,228",
              "Nvidia retired the {b}Tesla{nb} brand in May 2020, reportedly because of potential confusion with the brand of cars .",
              "488,110",
              "9774,161",
              "Nvidia {b}Tesla{nb} C2075",
              "671,18",
              "14413,18",
              "Offering computational power much greater than traditional microprocessors , the {b}Tesla{nb} products targeted the high-performance computing market.",
              "691,143",
              "16764,342",
              "{b}Tesla{nb} cards have four times the double precision performance of a Fermi -based Nvidia GeForce card of similar single precision performance.",
              "1001,139",
              "18021,218",
              "Unlike Nvidia's consumer GeForce cards and professional Nvidia Quadro cards, {b}Tesla{nb} cards were originally unable to output images to a display .",
              "1141,143",
              "18612,324",
              "However, the last {b}Tesla{nb} C-class products included one Dual-Link DVI port.",
              "1285,73",
              "18937,73",
              "The {b}Tesla{nb} P100 uses TSMC 's 16 nanometer FinFET semiconductor manufacturing process , which is more advanced than the 28-nanometer process previously used by AMD and Nvidia GPUs between 2012 and 2016.",
              "1507,200",
              "19514,602",
              "{b}Tesla{nb} products are primarily used in simulations and in large-scale calculations (especially floating-point calculations), and for high-end image generation for professional and scientific fields.",
              "1766,196",
              "20821,196",
              "In 2013, the defense industry accounted for less than one-sixth of {b}Tesla{nb} sales, but Sumit Gupta predicted increasing sales to the geospatial intelligence market.",
              "1964,161",
              "21139,237"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "9,5,192,5,375,5,507,5,678,5,772,5,1001,5,1218,5,1303,5,1511,5,1766,5,2031,5,2583,5,8712,5,8841,5,8864,5,8915,5,8956,5,8996,5,9016,5;8606,5,9080,5,9549,5,9793,5,14420,5,16942,5,18021,5,18809,5,18955,5,19518,5,20821,5,21206,5,24799,5,69197,5,152238,5,152383,5,152556,5,152713,5,152869,5,153005,5"
                  },
                  {
                      "partname": "title",
                      "data": "9066,5;238498,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Nvidia Tesla",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-01 21:37:29",
          "indexationtime": "2020-09-02 12:16:15",
          "version": "2KVI5CLp2Xb9x8LRpN+yIQ==",
          "size": 238303,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Nvidia_Tesla",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "SUMIT GUPTA",
                  "display": "Sumit Gupta"
              },
              {
                  "value": "NIKOLA TESLA",
                  "display": "Nikola Tesla"
              }
          ],
          "company": [
              {
                  "value": "NVIDIA",
                  "display": "NVIDIA"
              },
              {
                  "value": "SAMSUNG",
                  "display": "Samsung"
              },
              {
                  "value": "INTEL",
                  "display": "Intel"
              }
          ],
          "geo": [
              {
                  "value": "DENVER",
                  "display": "Denver"
              },
              {
                  "value": "CHINA",
                  "display": "China"
              },
              {
                  "value": "TIANJIN",
                  "display": "Tianjin"
              }
          ],
          "wordcount": 1436,
          "exacthash": "thASzm7wUwdVEMnU/LvwiA==",
          "nearhash": "dvnVd8OD3ulj/CIOh7Fofg==",
          "partnamelocations": [
              {
                  "value": "value",
                  "display": "value"
              },
              {
                  "value": "title",
                  "display": "title"
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/Nvidia_Tesla",
          "sourcecsv2": [
              "Tesla_(microarchitecture)",
              "Tesla_Model_S",
              "Tesla_Model_X",
              "Nvidia",
              "Stream_processing",
              "GPGPU",
              "Named_after",
              "Nikola_Tesla",
              "GeForce_8_Series",
              "CUDA",
              "OpenCL",
              "Application_programming_interface",
              "Radeon_Instinct",
              "Xeon_Phi",
              "Tesla,_Inc.",
              "Ampere_(microarchitecture)",
              "Central_processing_units",
              "High-performance_computing",
              "Supercomputers",
              "Summit_(supercomputer)",
              "Oak_Ridge_National_Laboratory",
              "Tianhe-1A",
              "Tianjin",
              "China",
              "Fermi_(microarchitecture)",
              "GeForce",
              "Nvidia_Quadro",
              "Computer_monitor",
              "Project_Denver",
              "Tegra",
              "TSMC",
              "16_nanometer",
              "FinFET",
              "Semiconductor_manufacturing_process",
              "28_nanometer",
              "AMD",
              "Samsung",
              "HBM2",
              "Geospatial_intelligence",
              "Microarchitecture",
              "Hertz",
              "GFLOPS",
              "Thermal_design_power",
              "Bit",
              "Gigabyte",
              "Transfer_(computing)",
              "Single_precision_floating-point_format",
              "Fused_multiply%E2%80%93add",
              "Double_precision_floating-point_format",
              "19-inch_rack",
              "Kepler_(microarchitecture)",
              "Maxwell_(microarchitecture)",
              "Pascal_(microarchitecture)",
              "PCIe",
              "Mobile_PCI_Express_Module",
              "High_Bandwidth_Memory",
              "NVLink",
              "Volta_(microarchitecture)",
              "Turing_(microarchitecture)",
              "GeForce_8800",
              "GeForce_200_series",
              "Fastra_II",
              "List_of_Nvidia_graphics_processing_units",
              "Nvidia_Tesla_Personal_Supercomputer",
              "Ars_Technica",
              "List_of_Nvidia_graphics_processing_units#Pre-GeForce",
              "NV1",
              "NV2",
              "RIVA_128",
              "RIVA_TNT",
              "RIVA_TNT2",
              "GeForce_256",
              "GeForce_2_series",
              "GeForce_4_series",
              "Vertex_shader",
              "Pixel_shader",
              "GeForce_3_series",
              "GeForce_FX_series",
              "GeForce_6_series",
              "GeForce_7_series",
              "Unified_Shader_Model",
              "GeForce_8_series",
              "GeForce_9_series",
              "GeForce_100_series",
              "GeForce_300_series",
              "GeForce_400_series",
              "GeForce_500_series",
              "Non-uniform_memory_access",
              "GeForce_600_series",
              "GeForce_700_series",
              "GeForce_800M_series",
              "GeForce_900_series",
              "GeForce_10_series",
              "GeForce_16_series",
              "Ray_tracing_(graphics)",
              "GeForce_20_series",
              "GeForce_30_series",
              "Nvidia_NVENC",
              "Nvidia_PureVideo",
              "Cg_(programming_language)",
              "Gelato_(software)",
              "Nvidia_GameWorks",
              "OptiX",
              "PhysX",
              "Nvidia_RTX",
              "Nvidia_System_Tools",
              "VDPAU",
              "Nvidia_3D_Vision",
              "Nvidia_G-Sync",
              "Nvidia_Optimus",
              "Nvidia_Surround",
              "Scalable_Link_Interface",
              "TurboCache",
              "Hopper_(microarchitecture)",
              "Quadro",
              "Nvidia_Quadro_Plex",
              "General-purpose_computing_on_graphics_processing_units",
              "Nvidia_DGX",
              "Video_game_console",
              "Xbox_(console)",
              "RSX_Reality_Synthesizer",
              "PlayStation_3",
              "Nintendo_Switch",
              "Shield_Portable",
              "Shield_Tablet",
              "Shield_Android_TV",
              "GeForce_Now",
              "System_on_a_chip",
              "GoForce",
              "Nvidia_Drive",
              "Nvidia_Jetson",
              "Central_processing_unit",
              "Chipset",
              "Comparison_of_Nvidia_chipsets",
              "Jen-Hsun_Huang",
              "Chris_Malachowsky",
              "Curtis_Priem",
              "David_Kirk_(scientist)",
              "Bill_Dally",
              "3dfx_Interactive",
              "Ageia",
              "Acer_Laboratories_Incorporated",
              "Icera",
              "Mellanox_Technologies",
              "Mental_Images",
              "PortalPlayer",
              "Graphics_processing_unit",
              "List_of_Intel_graphics_processing_units",
              "Intel_Xe",
              "Intel_Graphics_Technology",
              "List_of_AMD_graphics_processing_units",
              "Radeon",
              "Radeon_Pro",
              "Matrox",
              "InfiniteReality",
              "NEC_%C2%B5PD7220",
              "Comparison_of_3dfx_graphics_processing_units",
              "S3_Graphics",
              "Adreno",
              "Apple-designed_processors",
              "Mali_(GPU)",
              "PowerVR",
              "VideoCore",
              "Vivante_Corporation",
              "Compute_kernel",
              "Semiconductor_device_fabrication",
              "CMOS",
              "MOSFET",
              "Graphics_pipeline",
              "Geometry_pipelines",
              "Vertex_pipeline",
              "High-dynamic-range_rendering",
              "Multiply%E2%80%93accumulate_operation",
              "Rasterisation",
              "Shading",
              "Ray-tracing_hardware",
              "SIMD",
              "Single_instruction,_multiple_threads",
              "Tessellation_(computer_graphics)",
              "Transform,_clipping,_and_lighting",
              "Tiled_rendering",
              "Unified_shader_model",
              "Blitter",
              "Geometry_processing",
              "Input%E2%80%93output_memory_management_unit",
              "Render_output_unit",
              "Shader",
              "Tensor",
              "Texture_mapping_unit",
              "Video_display_controller",
              "Video_processing_unit",
              "Direct_memory_access",
              "Framebuffer",
              "SGRAM",
              "GDDR_SDRAM",
              "GDDR3_SDRAM",
              "GDDR4_SDRAM",
              "GDDR5_SDRAM",
              "GDDR6_SDRAM",
              "Memory_bandwidth",
              "Memory_controller",
              "Shared_graphics_memory",
              "Texture_memory",
              "Video_RAM_(dual-ported_DRAM)",
              "Semiconductor_intellectual_property_core",
              "Video_card",
              "GPU_cluster",
              "GPU_switching",
              "External_GPU",
              "Integrated_graphics",
              "Clock_rate",
              "Computer_display_standard",
              "Fillrate",
              "Gigapixel_image",
              "Texel_(graphics)",
              "FLOPS",
              "Frame_rate",
              "Performance_per_watt",
              "Transistor_count",
              "2D_computer_graphics",
              "Scrolling",
              "Sprite_(computer_graphics)",
              "Tile-based_video_game",
              "3D_computer_graphics",
              "Global_illumination",
              "Texture_mapping",
              "Application-specific_integrated_circuit",
              "Graphics_library",
              "Hardware_acceleration",
              "Digital_image_processing",
              "Image_compression",
              "Parallel_computing",
              "Vector_processor",
              "Video_coding_format",
              "Video_codec",
              "Very_long_instruction_word"
          ],
          "sourcestr1": "Nvidia_Tesla",
          "sourcestr2": "Q16258100",
          "sourcestr3": "Q431289",
          "category": "brand",
          "sourcevarchar3": "[{}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/NvidiaTesla.jpg/1200px-NvidiaTesla.jpg",
          "sourcedouble1": 0.020949,
          "entity1": [
              {
                  "value": "4",
                  "display": "4"
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
                  "value": "384",
                  "display": "384"
              },
              {
                  "value": "16",
                  "display": "16"
              },
              {
                  "value": "8",
                  "display": "8"
              },
              {
                  "value": "12",
                  "display": "12"
              },
              {
                  "value": "2011",
                  "display": "2011"
              },
              {
                  "value": "225",
                  "display": "225"
              },
              {
                  "value": "25",
                  "display": "25"
              },
              {
                  "value": "256",
                  "display": "256"
              },
              {
                  "value": "512",
                  "display": "512"
              },
              {
                  "value": "1600",
                  "display": "1600"
              },
              {
                  "value": "2016",
                  "display": "2016"
              },
              {
                  "value": "1.3",
                  "display": "1.3"
              },
              {
                  "value": "250",
                  "display": "250"
              },
              {
                  "value": "5.2",
                  "display": "5.2"
              },
              {
                  "value": "2012",
                  "display": "2012"
              },
              {
                  "value": "1296",
                  "display": "1296"
              },
              {
                  "value": "2.0",
                  "display": "2.0"
              }
          ],
          "date": [
              {
                  "value": "2011-07-25",
                  "display": "2011-07-25"
              },
              {
                  "value": "2007-05-02",
                  "display": "2007-05-02"
              },
              {
                  "value": "2008-06-01",
                  "display": "2008-06-01"
              },
              {
                  "value": "2012-11-12",
                  "display": "2012-11-12"
              },
              {
                  "value": "2015-08-30",
                  "display": "2015-08-30"
              },
              {
                  "value": "2015-11-10",
                  "display": "2015-11-10"
              },
              {
                  "value": "2016-06-20",
                  "display": "2016-06-20"
              },
              {
                  "value": "2016-09-13",
                  "display": "2016-09-13"
              },
              {
                  "value": "2009-04-09",
                  "display": "2009-04-09"
              },
              {
                  "value": "2012-05-01",
                  "display": "2012-05-01"
              },
              {
                  "value": "2013-10-08",
                  "display": "2013-10-08"
              },
              {
                  "value": "2014-11-17",
                  "display": "2014-11-17"
              },
              {
                  "value": "2016-04-05",
                  "display": "2016-04-05"
              },
              {
                  "value": "2017-03-24",
                  "display": "2017-03-24"
              },
              {
                  "value": "2017-06-21",
                  "display": "2017-06-21"
              },
              {
                  "value": "2018-09-12",
                  "display": "2018-09-12"
              }
          ],
          "entity7": [
              {
                  "value": "1.0, 170.9",
                  "display": "1.0, 170.9"
              },
              {
                  "value": "77.76, 1.3",
                  "display": "77.76, 1.3"
              },
              {
                  "value": "6.1, 90",
                  "display": "6.1, 90"
              },
              {
                  "value": "7.5, 70",
                  "display": "7.5, 70"
              }
          ],
          "entity14": [
              {
                  "value": "CONTRACT",
                  "display": "Contract"
              }
          ],
          "rank": 6,
          "displayTitle": "Nvidia <span class=\"match-highlight\">Tesla</span>",
          "relevantExtracts": "The Nvidia <b>Tesla </b>product line ... Nvidia retired the <b>Tesla </b>brand in ... Nvidia <b>Tesla </b>... microprocessors , the <b>Tesla </b>products targeted ... <b>Tesla </b>cards have ... Nvidia Quadro cards, <b>Tesla </b>cards ... However, the last <b>Tesla </b>C-class ... The <b>Tesla </b>P100 ... <b>Tesla </b>products ... than one-sixth of <b>Tesla </b>sales, "
      },
      {
          "id": "/Web/Wikipedia/|Tesla_(Czechoslovak_company)",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.972677,
          "matchingpartnames": [
              "text",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "Stained glass {b}Tesla{nb} Radio logo in Passage Světozor in Prague",
              "135,60",
              "16241,61",
              "{b}Tesla{nb} a.s. Prague - Hloubětín became a direct successor.",
              "918,56",
              "17918,158",
              "{b}Tesla{nb} a.s. headquarters in Prague",
              "985,33",
              "22160,71",
              "{b}Tesla{nb} 308U Talisman radio (1953",
              "1020,31",
              "23098,31",
              "{b}Tesla{nb} tape recorders (B93, B115, B116, B730, B56 and B100) in Radebeul museum",
              "1054,77",
              "24378,123",
              "{b}Tesla{nb} the National Enterprise was set up on 10 August at the Mikrofon Factory in Strašnice with the participation of Yugoslavian Minister Zlataric Branko, Minister of Industry of North Macedonia Vasilijev Georgie, Minister of Industry of B. Laušman, representatives of government, institutions and universities.",
              "1194,311",
              "24584,313",
              "Then the Minister declared {b}Tesla{nb} as established.",
              "1810,48",
              "25202,48",
              "In 1953, the production of the first Czechoslovak television {b}Tesla{nb} 4001A began in Strašnice .",
              "2647,93",
              "26964,197",
              "The first Czechoslovak color TV {b}Tesla{nb} 4401A began manufacturing in 1974.",
              "2741,72",
              "27162,134",
              "The direct successor is a joint-stock company {b}Tesla{nb} a.s. Prague - Hloubětín .",
              "3850,77",
              "29230,178"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "149,5,197,5,234,5,497,5,520,5,918,5,985,5,1020,5,1054,5,1194,5,1837,5,2449,5,2708,5,2773,5,2849,5,2871,5,2932,5,2969,5,3133,5,3256,5,3526,5,3896,5,4034,5,4070,5,4213,5,4512,5,4543,5,4589,5,4625,5,4647,12,4688,5,4703,12,4772,5,4848,5,4892,12,5000,5,5012,5,5121,5,5132,5,5150,12,5222,5,5249,5,5434,5,5474,5,5500,5,5596,5,5616,5,5709,5,5737,5,5770,5,5829,5,5990,5,5998,5,6027,5,6051,5,6067,5,6084,5,6099,5,6125,5,6139,5;16255,5,16327,5,16418,5,16873,5,16896,5,17918,5,22160,5,23098,5,24378,5,24584,5,25229,5,26702,5,27075,5,27256,5,27452,5,27474,5,27535,5,27572,5,27922,5,28229,5,28619,5,29276,5,29629,5,29672,5,30003,5,30844,5,31098,5,31551,5,31635,5,31661,12,31702,5,31717,12,31786,5,31977,5,32021,12,32129,5,32142,5,32251,5,32262,5,32280,12,32352,5,33505,5,38546,5,39363,5,40101,5,41135,5,41855,5,43645,5,44525,5,45572,5,62928,5,63481,5,63573,5,63686,5,63792,5,63891,5,63990,5,64091,5,64205,5,64309,5"
                  },
                  {
                      "partname": "title",
                      "data": "6174,5;87266,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Tesla (Czechoslovak company)",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-01 19:28:09",
          "indexationtime": "2020-09-01 22:59:05",
          "version": "EYDKmFsdYR8yLYxzgI3xIg==",
          "size": 87079,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Tesla_(Czechoslovak_company)",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "BRANKO ZLATARIC",
                  "display": "Branko Zlataric"
              },
              {
                  "value": "IGOR DIDOV",
                  "display": "Igor Didov"
              },
              {
                  "value": "NIKOLA TESLA",
                  "display": "Nikola Tesla"
              }
          ],
          "company": [
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              }
          ],
          "geo": [
              {
                  "value": "PRAGUE",
                  "display": "Prague"
              },
              {
                  "value": "CZECH REPUBLIC",
                  "display": "Czech Republic"
              },
              {
                  "value": "BRATISLAVA",
                  "display": "Bratislava"
              },
              {
                  "value": "EASTERN EUROPE",
                  "display": "Eastern Europe"
              },
              {
                  "value": "BRNO",
                  "display": "Brno"
              },
              {
                  "value": "MACEDONIA",
                  "display": "Macedonia"
              },
              {
                  "value": "OLOMOUC",
                  "display": "Olomouc"
              },
              {
                  "value": "RIGA",
                  "display": "Riga"
              },
              {
                  "value": "SLOVAKIA",
                  "display": "Slovakia"
              }
          ],
          "wordcount": 690,
          "exacthash": "xTtZMBz5O6MXVK8unq/sEQ==",
          "nearhash": "9TqIwCaB1SyIyd0Zgnlk7g==",
          "partnamelocations": [
              {
                  "value": "value",
                  "display": "value"
              },
              {
                  "value": "title",
                  "display": "title"
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/Tesla_(Czechoslovak_company)",
          "sourcecsv2": [
              "Nikola_Tesla",
              "Conglomerate_(company)",
              "Czechoslovakia",
              "Monopoly",
              "Electronics",
              "Czechoslovak_Socialist_Republic",
              "Liptovsk%C3%BD_Hr%C3%A1dok",
              "Hradec_Kr%C3%A1lov%C3%A9",
              "Pardubice",
              "%C5%BD%C4%8F%C3%A1r_nad_S%C3%A1zavou",
              "Bratislava",
              "Ni%C5%BEn%C3%A1,_Tvrdo%C5%A1%C3%ADn_District",
              "Prague",
              "Hloub%C4%9Bt%C3%ADn",
              "Radebeul",
              "Television",
              "Radio_receiver",
              "Transistor",
              "Integrated_circuit",
              "Electronic_visual_display",
              "Loudspeaker",
              "Phonograph",
              "Cassette_deck",
              "CD_player",
              "Videocassette_recorder",
              "Obsolete",
              "Diode",
              "Silicon_controlled_rectifier",
              "Power_transistor",
              "Eastern_Europe",
              "Stra%C5%A1nice",
              "Color_television",
              "Tamara_passive_sensor",
              "Stealth_technology",
              "Velvet_Revolution",
              "Privatization",
              "Czech_Republic",
              "Slovakia",
              "JJ_Electronic",
              "%C4%8Cadca",
              "Vacuum_tubes",
              "Radio_communication_service",
              "Security_alarm",
              "Military",
              "Brno",
              "Set-top_box",
              "Antenna_array",
              "Vacuum_cleaner",
              "Soundbar",
              "Motion_detector",
              "Pressure_cooking",
              "Primary_cell",
              "Tesla,_Inc.",
              "Kbely_Aviation_Museum",
              "Riga_Civil_Aviation_Engineers_Institute",
              "Riga",
              "Tatra_815",
              "Military_Museum_Le%C5%A1any",
              "Q_meter",
              "Olomouc"
          ],
          "sourcestr1": "Tesla_(Czechoslovak_company)",
          "sourcestr2": "Q1548225",
          "sourcestr3": "Q4830453",
          "category": "business",
          "sourcevarchar3": "[]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Tesla_Radio_vitrage.jpg/1200px-Tesla_Radio_vitrage.jpg",
          "sourcedouble1": 0.006444,
          "entity1": [
              {
                  "value": "1953",
                  "display": "1953"
              },
              {
                  "value": "1",
                  "display": "1"
              },
              {
                  "value": "1986",
                  "display": "1986"
              },
              {
                  "value": "-86",
                  "display": "-86"
              },
              {
                  "value": "1946",
                  "display": "1946"
              },
              {
                  "value": "10",
                  "display": "10"
              },
              {
                  "value": "1958",
                  "display": "1958"
              },
              {
                  "value": "1959",
                  "display": "1959"
              },
              {
                  "value": "1974",
                  "display": "1974"
              },
              {
                  "value": "1978",
                  "display": "1978"
              },
              {
                  "value": "1984",
                  "display": "1984"
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
                  "value": "30",
                  "display": "30"
              },
              {
                  "value": "-4",
                  "display": "-4"
              },
              {
                  "value": "425",
                  "display": "425"
              },
              {
                  "value": "470",
                  "display": "470"
              },
              {
                  "value": "500",
                  "display": "500"
              },
              {
                  "value": "560",
                  "display": "560"
              },
              {
                  "value": "80",
                  "display": "80"
              }
          ],
          "date": [
              {
                  "value": "2010-06-10",
                  "display": "2010-06-10"
              },
              {
                  "value": "1921-01-18",
                  "display": "1921-01-18"
              },
              {
                  "value": "1946-03-07",
                  "display": "1946-03-07"
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
              }
          ],
          "rank": 7,
          "displayTitle": "<span class=\"match-highlight\">Tesla</span> (Czechoslovak company)",
          "relevantExtracts": "Stained glass <b>Tesla </b>Radio logo in ... <b>Tesla </b>a.s. Prague - ... <b>Tesla </b>a.s. ... <b>Tesla </b>308U ... <b>Tesla </b>tape recorders (B93, ... <b>Tesla </b>the National ... the Minister declared <b>Tesla </b>... first Czechoslovak television <b>Tesla </b>4001A ... Czechoslovak color TV <b>Tesla </b>4401A began ... a joint-stock company <b>Tesla </b>a.s. "
      },
      {
          "id": "/Web/Wikipedia/|SolarCity",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.969259,
          "matchingpartnames": [
              "text",
              "tables"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "{b}tesla{nb} .",
              "34526,7",
              "534968,7",
              "SolarCity Corporation is a subsidiary of {b}Tesla{nb}, Inc. that develops and sells solar panels and solar roof tiles.",
              "2,111",
              "15562,167",
              "After its acquisition in 2016, effectively all products and services are sold through {b}Tesla{nb}'s website.",
              "159,102",
              "15842,102",
              "The company, in partnership with Panasonic , manufactures solar module components in {b}Tesla{nb} Giga New York , a factory in Buffalo, New York .",
              "262,139",
              "16059,304",
              "Subsidiary of {b}Tesla{nb} Inc. (2016 - present",
              "3402,40",
              "44541,42",
              "On August 1, 2016, {b}Tesla{nb} announced (in a joint statement with SolarCity) that it would be acquiring the company in an all-stock $2.6 billion merger.",
              "3445,148",
              "44993,148",
              "{b}Tesla{nb}'s mission since its inception has been \"to accelerate the world's transition to sustainable energy\".",
              "3594,106",
              "45142,106",
              "Members of the anti-{b}Tesla{nb} group TSLAQ have cited Musk's solar roof tile reveal as a major point of contention and an impetus for organizing.",
              "4237,140",
              "46528,180",
              "More than 85% of unaffiliated shareholders from {b}Tesla{nb} and SolarCity voted to approve the acquisition on November 17, 2016, allowing the acquisition to close on November 21, 2016.",
              "4438,178",
              "47021,548",
              "There is ongoing litigation against Musk and {b}Tesla{nb}'s board of directors, alleging \"they overpaid for SolarCity, ignored their own conflicts of interest and failed to disclose 'troubling facts' essential to a rational analysis of the proposed deal.",
              "4878,247",
              "48072,247"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "43,5,245,5,347,5,3416,5,3464,5,3594,5,3736,12,3763,5,4257,5,4486,5,4923,5,5426,5,5445,5,5665,5,6369,5,6497,5,6605,5,6641,5,6722,5,6870,5,6953,5,7420,5,7530,5,7641,5,9204,5,10092,5,10256,5,10413,5,10522,5,10825,5,10877,5,11232,5,11494,5,11618,5,11802,5,11898,5,12113,5,12263,5,12332,5,12391,5,12586,5,12754,5,12787,5,26580,5,26857,5,27189,5,27343,5,27570,5,27738,5,27957,5,28095,5,28304,5,28448,5,31828,5,32017,5;15655,5,15928,5,16243,5,44555,5,45012,5,45142,5,45401,12,45428,5,46548,5,47069,5,48117,5,49521,5,49657,5,50111,5,52586,5,52839,5,52947,5,52983,5,53307,5,53455,5,53655,5,55355,5,55672,5,56091,5,63150,5,67648,5,68632,5,68789,5,69015,5,70247,5,70299,5,71048,5,71733,5,72072,5,72373,5,72850,5,73206,5,73356,5,73745,5,73805,5,74142,5,75393,5,75426,5,101408,5,102407,5,102866,5,103020,5,103247,5,103415,5,103638,5,103776,5,103985,5,104255,5,112460,5,112769,5"
                  },
                  {
                      "partname": "tables",
                      "data": "34504,5,34526,5;534946,5,534968,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "SolarCity",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-31 18:05:58",
          "indexationtime": "2020-09-02 07:55:28",
          "version": "fPK/RkoZbqKrO2RtA9cZtg==",
          "size": 534581,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "SolarCity",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              },
              {
                  "value": "ANDREW CUOMO",
                  "display": "Andrew Cuomo"
              },
              {
                  "value": "ANTHONY ROISMAN",
                  "display": "Anthony Roisman"
              },
              {
                  "value": "ELLEN ROSENBLUM",
                  "display": "Ellen Rosenblum"
              },
              {
                  "value": "MARTIN SHAIN",
                  "display": "Martin Shain"
              },
              {
                  "value": "PREET BHARARA",
                  "display": "Preet Bharara"
              },
              {
                  "value": "RYAN DAVIES",
                  "display": "Ryan Davies"
              },
              {
                  "value": "WHITMAN OSTERMAN",
                  "display": "Whitman Osterman"
              },
              {
                  "value": "JOHN WELLINGHOFF",
                  "display": "John Wellinghoff"
              }
          ],
          "company": [
              {
                  "value": "WALMART",
                  "display": "Walmart"
              },
              {
                  "value": "PANASONIC",
                  "display": "Panasonic"
              },
              {
                  "value": "GOOGLE",
                  "display": "Google"
              },
              {
                  "value": "AIR FORCE",
                  "display": "Air Force"
              },
              {
                  "value": "NEW YORK TIMES",
                  "display": "New York Times"
              },
              {
                  "value": "HOME DEPOT",
                  "display": "Home Depot"
              },
              {
                  "value": "HAWAIIAN ELECTRIC INDUSTRIES",
                  "display": "Hawaiian Electric Industries"
              },
              {
                  "value": "AMPHENOL",
                  "display": "Amphenol"
              },
              {
                  "value": "BANK OF AMERICA",
                  "display": "Bank of America"
              },
              {
                  "value": "LEND LEASE",
                  "display": "Lend Lease"
              },
              {
                  "value": "MERRILL LYNCH",
                  "display": "Merrill Lynch"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "U.S.BANCORP",
                  "display": "U.S.Bancorp"
              },
              {
                  "value": "EBAY",
                  "display": "eBay"
              },
              {
                  "value": "INTEL",
                  "display": "Intel"
              },
              {
                  "value": "RABOBANK",
                  "display": "Rabobank"
              }
          ],
          "geo": [
              {
                  "value": "NEW YORK",
                  "display": "New York"
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
                  "value": "OREGON",
                  "display": "Oregon"
              },
              {
                  "value": "VERMONT",
                  "display": "Vermont"
              },
              {
                  "value": "ARIZONA",
                  "display": "Arizona"
              },
              {
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "SAN FRANCISCO",
                  "display": "San Francisco"
              },
              {
                  "value": "HAWAII",
                  "display": "Hawaii"
              },
              {
                  "value": "FREMONT",
                  "display": "Fremont"
              },
              {
                  "value": "NEVADA",
                  "display": "Nevada"
              },
              {
                  "value": "ALBANY",
                  "display": "Albany"
              },
              {
                  "value": "CONNECTICUT",
                  "display": "Connecticut"
              },
              {
                  "value": "NEW HAMPSHIRE",
                  "display": "New Hampshire"
              },
              {
                  "value": "PALO ALTO",
                  "display": "Palo Alto"
              },
              {
                  "value": "PENNSYLVANIA",
                  "display": "Pennsylvania"
              },
              {
                  "value": "SEATTLE",
                  "display": "Seattle"
              },
              {
                  "value": "SOUTH CAROLINA",
                  "display": "South Carolina"
              },
              {
                  "value": "UTAH",
                  "display": "Utah"
              },
              {
                  "value": "COLORADO",
                  "display": "Colorado"
              }
          ],
          "wordcount": 3804,
          "exacthash": "UKmZMa61BkVkWt/O3wa8GQ==",
          "nearhash": "gootWAEOpfjD38Fml/2iQA==",
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
          "url1": "https://en.wikipedia.org/wiki/SolarCity",
          "sourcecsv1": [
              "Type",
              "Industry",
              "Founded",
              "Founders",
              "Headquarters",
              "Key people",
              "Number of employees",
              "Parent",
              "Website",
              "External image"
          ],
          "sourcecsv2": [
              "Solar_Cities_in_Australia",
              "City_Solar",
              "List_of_legal_entity_types_by_country",
              "Subsidiary",
              "Energy_production",
              "Lyndon_Rive",
              "Fremont,_California",
              "California",
              "United_States",
              "Chief_executive_officer",
              "Chief_technology_officer",
              "Elon_Musk",
              "Chairman",
              "Parent_company",
              "Tesla,_Inc.",
              "Panasonic",
              "Giga_New_York",
              "Buffalo,_New_York",
              "Foster_City,_California",
              "Megawatt",
              "Paramount_Equity",
              "SpaceX",
              "Net_metering",
              "TSLAQ",
              "Gigafactory_2",
              "Charging_station",
              "Rabobank",
              "Tesla_Roadster_(2008)",
              "U.S._Route_101_in_California",
              "Tesla_Supercharger",
              "Efficient_energy_use",
              "SolarStrong",
              "Solar_photovoltaic",
              "Lend_Lease_Group",
              "Bank_of_America_Merrill_Lynch",
              "U.S._Bancorp",
              "United_States_Department_of_Energy",
              "Joint_Base_Pearl_Harbor%E2%80%93Hickam",
              "Hawaii",
              "Davis%E2%80%93Monthan_Air_Force_Base",
              "Arizona",
              "Los_Angeles_Air_Force_Base",
              "Peterson_Air_Force_Base",
              "Schriever_Air_Force_Base",
              "Colorado",
              "Tesla_Powerwall",
              "Green_Mountain_Power",
              "EBay",
              "San_Francisco",
              "Walmart",
              "Intel",
              "GivePower",
              "Zep_Solar",
              "Solar_shingle",
              "Photovoltaic",
              "Universal_Studios",
              "Colonial_Street",
              "Consumer_Reports",
              "Tesla_Model_3",
              "Buffalo_Billion",
              "Watt",
              "Solar_panel",
              "United_States_Attorney_for_the_Southern_District_of_New_York",
              "Preet_Bharara",
              "Andrew_Cuomo",
              "Mail_and_wire_fraud",
              "Bribery",
              "Bid_rigging",
              "The_Oregonian",
              "Campaign_for_Accountability",
              "Ellen_Rosenblum",
              "Oregon_Department_of_Justice",
              "Sheridan,_Oregon",
              "Oregon_University_System",
              "Oregon_State_University",
              "Oregon_Institute_of_Technology,_Klamath_Falls",
              "KOIN",
              "FICO",
              "Credit_rating",
              "Foreclosure",
              "U.S._Securities_and_Exchange_Commission",
              "Sunrun",
              "American_Radio_Relay_League",
              "Vermont_Public_Service_Board",
              "Arizona_Corporation_Commission",
              "Federal_Bureau_of_Investigation",
              "Asset-backed_security",
              "Project_finance",
              "Power_Purchase_Agreement",
              "SUNY_Polytechnic_Institute",
              "Western_Hemisphere",
              "Crystalline_silicon",
              "Solar_cell_efficiency",
              "The_Alliance_for_Solar_Choice",
              "Rooftop_photovoltaic_power_station",
              "Trade_organization",
              "National_Renewable_Energy_Laboratory",
              "Hawaiian_Electric_Industries",
              "List_of_energy_storage_projects",
              "Solar_power",
              "Cleantechnica.com",
              "Reuters",
              "ISSN_(identifier)",
              "Business_Insider",
              "Electrek",
              "Forbes",
              "The_Huffington_Post",
              "NHST_Media_Group",
              "The_Buffalo_News",
              "Recharge_(magazine)",
              "Tesla_Model_S",
              "Tesla_Model_X",
              "Tesla_Model_Y",
              "Tesla_Cybertruck",
              "Tesla_Cyberquad",
              "Tesla_Roadster_(2020)",
              "Tesla_Semi",
              "Mercedes_A-Class_E-Cell",
              "Mercedes-Benz_B-Class_Electric_Drive",
              "Smart_electric_drive",
              "Toyota_RAV4_EV",
              "Tesla_Autopilot",
              "Tesla_Solar_Roof",
              "Tesla_Powerpack",
              "Tesla_Megapack",
              "Robyn_Denholm",
              "Zach_Kirkhorn",
              "Drew_Baglino",
              "Franz_von_Holzhausen",
              "Jerome_Guillen",
              "Larry_Ellison",
              "Hiromichi_Mizuno",
              "Andrej_Karpathy",
              "Kathleen_Wilson-Thompson",
              "Deepak_Ahuja",
              "Ze%27ev_Drori",
              "Martin_Eberhard",
              "Arnnon_Geshuri",
              "Jim_Keller_(engineer)",
              "Chris_Lattner",
              "Marc_Tarpenning",
              "J._B._Straubel",
              "Jay_Vijayan",
              "Tesla_Factory",
              "Tesla_facilities_in_Tilburg",
              "Giga_Nevada",
              "Giga_Shanghai",
              "Giga_Berlin",
              "Gigafactory_5",
              "Lawsuits_and_Controversies_of_Tesla,_Inc.",
              "Tesla_US_dealership_disputes",
              "Sudden_unintended_acceleration#Tesla&#39",
              "s_Model_X,_S_and_3",
              "History_of_Tesla,_Inc.",
              "Elon_Musk%27s_Tesla_Roadster",
              "Giga_Press",
              "Hornsdale_Power_Reserve",
              "Maxwell_Technologies",
              "Solar_power_in_the_United_States",
              "Energy_in_the_United_States",
              "Solar_power_in_Alabama",
              "Solar_power_in_Alaska",
              "Solar_power_in_Arizona",
              "Solar_power_in_Arkansas",
              "Solar_power_in_California",
              "Solar_power_in_Colorado",
              "Solar_power_in_Connecticut",
              "Solar_power_in_Delaware",
              "Solar_power_in_Florida",
              "Solar_power_in_Georgia_(U.S._state)",
              "Solar_power_in_Hawaii",
              "Solar_power_in_Idaho",
              "Solar_power_in_Illinois",
              "Solar_power_in_Indiana",
              "Solar_power_in_Iowa",
              "Solar_power_in_Kansas",
              "Solar_power_in_Kentucky",
              "Solar_power_in_Louisiana",
              "Solar_power_in_Maine",
              "Solar_power_in_Maryland",
              "Solar_power_in_Massachusetts",
              "Solar_power_in_Michigan",
              "Solar_power_in_Minnesota",
              "Solar_power_in_Mississippi",
              "Solar_power_in_Missouri",
              "Solar_power_in_Montana",
              "Solar_power_in_Nebraska",
              "Solar_power_in_Nevada",
              "Solar_power_in_New_Hampshire",
              "Solar_power_in_New_Jersey",
              "Solar_power_in_New_Mexico",
              "Solar_power_in_New_York",
              "Solar_power_in_North_Carolina",
              "Solar_power_in_North_Dakota",
              "Solar_power_in_Ohio",
              "Solar_power_in_Oklahoma",
              "Solar_power_in_Oregon",
              "Solar_power_in_Pennsylvania",
              "Solar_power_in_Rhode_Island",
              "Solar_power_in_South_Carolina",
              "Solar_power_in_South_Dakota",
              "Solar_power_in_Tennessee",
              "Solar_power_in_Texas",
              "Solar_power_in_Utah",
              "Solar_power_in_Vermont",
              "Solar_power_in_Virginia",
              "Solar_power_in_Washington",
              "Solar_power_in_Washington,_D.C.",
              "Solar_power_in_West_Virginia",
              "Solar_power_in_Wisconsin",
              "Solar_power_in_Wyoming",
              "Agua_Caliente_Solar_Project",
              "Alamosa_Solar_Generating_Project",
              "Antelope_Valley_Solar_Ranch",
              "Avenal_Solar_Facility",
              "Avra_Valley_Solar_Generating_Station",
              "Beacon_Solar_Project",
              "Bison_Solar_Plant",
              "Blue_Wing_Solar_Project",
              "Blythe_Photovoltaic_Power_Plant",
              "Blythe_Mesa_Solar_Power_Project",
              "Boulder_Solar",
              "Brockton_Brightfield",
              "California_Flats_Solar_Project",
              "California_Valley_Solar_Ranch",
              "Campo_Verde_Solar_Project",
              "Catalina_Solar_Project",
              "Centinela_Solar_Energy_Project",
              "Cimarron_Solar_Facility",
              "Comanche_Solar_Project",
              "Copper_Mountain_Solar_Facility",
              "Crescent_Dunes_Solar_Energy_Project",
              "Davidson_County_Solar_Farm",
              "Stateline_Solar",
              "Desert_Sunlight_Solar_Farm",
              "DeSoto_Next_Generation_Solar_Energy_Center",
              "El_Dorado_Solar_Power_Plant",
              "Enterprise_Solar_Farm",
              "Escalante_Solar_Project",
              "Genesis_Solar_Energy_Project",
              "Holaniku_at_Keahole_Point",
              "Hooper_Solar_PV_Power_Plant",
              "Imperial_Solar_Energy_Center_West",
              "Imperial_Solar_Energy_Center_South",
              "Imperial_Valley_Solar_Project",
              "Ivanpah_Solar_Power_Facility",
              "Kimberlina_Solar_Thermal_Energy_Plant",
              "Long_Island_Solar_Farm",
              "Martin_Next_Generation_Solar_Energy_Center",
              "McCoy_Solar_Energy_Project",
              "Mesquite_Solar_project",
              "Moapa_Southern_Paiute_Solar_Project",
              "Mojave_Solar_Project",
              "Mount_Signal_Solar",
              "Nellis_Solar_Power_Plant",
              "Nevada_Solar_One",
              "Panoche_Valley_Solar_Farm",
              "Red_Hills_Renewable_Energy_Park",
              "Redwood_Solar_Farm",
              "Roserock_Solar",
              "San_Luis_Valley_Solar_Ranch",
              "San_Isabel_Solar_Energy_Center",
              "Sierra_SunTower",
              "Silver_State_North_Solar_Project",
              "Silver_State_South_Solar_Project",
              "Solana_Generating_Station",
              "Solar_Energy_Generating_Systems",
              "Solar_Star",
              "Space_Coast_Next_Generation_Solar_Energy_Center",
              "Springbok_Solar_Farm",
              "Sunset_Reservoir",
              "Techren_Solar_Project",
              "Three_Cedars_Solar_Project",
              "Topaz_Solar_Farm",
              "Webberville_Solar_Farm",
              "Wyandot_Solar_Facility",
              "Amargosa_Valley",
              "Eagle_Shadow_Mountain_Solar_Farm",
              "Robins_Air_Force_Base",
              "Sandstone_Solar_Energy_Project",
              "Sonoran_Solar_Project",
              "Westlands_Solar_Park",
              "Abengoa_Solar",
              "Ascent_Solar",
              "Ausra_(company)",
              "BP_Solar",
              "BrightSource_Energy",
              "Canadian_Solar",
              "ESolar",
              "EnviroMission",
              "First_Solar",
              "Global_Solar",
              "Grape_Solar",
              "Hanwha_Group",
              "Hanwha_Q_Cells",
              "HelioPower",
              "Jinko_Solar",
              "Loanpal",
              "Miasole",
              "Practical_Solar,_Inc.",
              "Sharp_Solar",
              "Skyline_Solar",
              "Solar_Frontier",
              "Solaren",
              "SolarReserve",
              "SoloPower",
              "Sopogy",
              "StratoSolar",
              "Stirling_Energy_Systems",
              "SunEdison",
              "SunPower",
              "Suntech_Power",
              "Trina_Solar",
              "Yingli",
              "8minutenergy_Renewables",
              "American_Council_on_Renewable_Energy",
              "Interstate_Renewable_Energy_Council",
              "Solar_Energy_Industries_Association",
              "1BOG",
              "Citizenre",
              "Community_solar_farm",
              "PACE_financing",
              "REC_Solar",
              "Sungevity",
              "Sunlight_Solar_Energy",
              "Sundog_Solar",
              "Sunetric",
              "SunRun",
              "Zip2",
              "X.com",
              "PayPal",
              "OpenAI",
              "Neuralink",
              "The_Boring_Company",
              "Hyperloop",
              "Boring_Test_Tunnel",
              "Maye_Musk",
              "Justine_Musk",
              "Talulah_Riley",
              "Grimes_(musician)",
              "Kimbal_Musk",
              "Tosca_Musk",
              "Elon_Musk:_Tesla,_SpaceX,_and_the_Quest_for_a_Fantastic_Future",
              "The_Musk_Who_Fell_to_Earth",
              "One_Crew_over_the_Crewcoo%27s_Morty"
          ],
          "sourcestr1": "SolarCity",
          "sourcestr2": "Q7555824",
          "sourcestr3": "Q891723",
          "category": "public company",
          "sourcevarchar3": "[{\"Type\":\"Subsidiary\",\"Industry\":\"Energy production\",\"Founded\":[\"July4, 2006\",\";14years ago\"],\"Founders\":[\"Lyndon Rive\",\"Peter Rive\"],\"Headquarters\":[\"Fremont\",\",\",\"California\",\",\",\"U.S.\"],\"Key people\":[\"Lyndon Rive\",\"until 2016\"],\"Number of employees\":\"15,000(December 2016)\",\"Parent\":\"Tesla, Inc.\",\"Website\":[\"tesla\",\".com\"]},{\"External image\":\"38 photos of factory construction\"}]",
          "sourcedouble1": 0.014865,
          "entity1": [
              {
                  "value": "2016",
                  "display": "2016"
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
                  "value": "2019",
                  "display": "2019"
              },
              {
                  "value": "2020",
                  "display": "2020"
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
                  "value": "2011",
                  "display": "2011"
              },
              {
                  "value": "3",
                  "display": "3"
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
                  "value": "5",
                  "display": "5"
              },
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "2009",
                  "display": "2009"
              },
              {
                  "value": "14",
                  "display": "14"
              },
              {
                  "value": "7",
                  "display": "7"
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
                  "value": "2006",
                  "display": "2006"
              }
          ],
          "date": [
              {
                  "value": "2011-02-25",
                  "display": "2011-02-25"
              },
              {
                  "value": "2015-12-31",
                  "display": "2015-12-31"
              },
              {
                  "value": "2016-04-29",
                  "display": "2016-04-29"
              },
              {
                  "value": "2016-05-18",
                  "display": "2016-05-18"
              },
              {
                  "value": "2017-03-30",
                  "display": "2017-03-30"
              },
              {
                  "value": "2017-04-01",
                  "display": "2017-04-01"
              },
              {
                  "value": "2019-08-21",
                  "display": "2019-08-21"
              },
              {
                  "value": "2019-10-25",
                  "display": "2019-10-25"
              },
              {
                  "value": "2019-11-05",
                  "display": "2019-11-05"
              },
              {
                  "value": "2020-03-16",
                  "display": "2020-03-16"
              },
              {
                  "value": "2020-06-05",
                  "display": "2020-06-05"
              },
              {
                  "value": "2016-08-01",
                  "display": "2016-08-01"
              },
              {
                  "value": "2016-11-17",
                  "display": "2016-11-17"
              },
              {
                  "value": "2016-11-21",
                  "display": "2016-11-21"
              },
              {
                  "value": "2019-02-28",
                  "display": "2019-02-28"
              },
              {
                  "value": "2020-01-01",
                  "display": "2020-01-01"
              }
          ],
          "money": [
              {
                  "value": "USD 500000000",
                  "display": "USD 500000000"
              },
              {
                  "value": "USD 1100000000",
                  "display": "USD 1100000000"
              },
              {
                  "value": "USD 12000000",
                  "display": "USD 12000000"
              },
              {
                  "value": "USD 13000000",
                  "display": "USD 13000000"
              },
              {
                  "value": "USD 24000000",
                  "display": "USD 24000000"
              },
              {
                  "value": "USD 256000000",
                  "display": "USD 256000000"
              },
              {
                  "value": "USD 280000000",
                  "display": "USD 280000000"
              },
              {
                  "value": "USD 29500000",
                  "display": "USD 29500000"
              },
              {
                  "value": "USD 41200000",
                  "display": "USD 41200000"
              },
              {
                  "value": "USD 457000000",
                  "display": "USD 457000000"
              },
              {
                  "value": "USD 485000000",
                  "display": "USD 485000000"
              },
              {
                  "value": "USD 5000000000",
                  "display": "USD 5000000000"
              },
              {
                  "value": "USD 501200000",
                  "display": "USD 501200000"
              },
              {
                  "value": "USD 750000000",
                  "display": "USD 750000000"
              },
              {
                  "value": "USD 900000000",
                  "display": "USD 900000000"
              },
              {
                  "value": "USD 1000000000",
                  "display": "USD 1000000000"
              },
              {
                  "value": "USD 1120000000",
                  "display": "USD 1120000000"
              },
              {
                  "value": "USD 120000000",
                  "display": "USD 120000000"
              },
              {
                  "value": "USD 1530000000",
                  "display": "USD 1530000000"
              },
              {
                  "value": "USD 1550000000",
                  "display": "USD 1550000000"
              }
          ],
          "entity12": [
              {
                  "value": "DEFEAT",
                  "display": "Defeat"
              }
          ],
          "entity13": [
              {
                  "value": "INVESTOR",
                  "display": "Investor"
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
              },
              {
                  "value": "DIRECTOR",
                  "display": "Director"
              }
          ],
          "entity14": [
              {
                  "value": "ACQUISITION",
                  "display": "Acquisition"
              },
              {
                  "value": "CONTRACT",
                  "display": "Contract"
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
                  "value": "LIQUIDITY",
                  "display": "Liquidity"
              },
              {
                  "value": "BONDS",
                  "display": "Bonds"
              },
              {
                  "value": "INVESTMENT",
                  "display": "Investment"
              },
              {
                  "value": "PENALTY",
                  "display": "Penalty"
              },
              {
                  "value": "DEBT",
                  "display": "Debt"
              }
          ],
          "person_cooc": [
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(ELON MUSK)",
                  "display": "(Chief Executive Officer)#(Elon Musk)"
              },
              {
                  "value": "(INVESTOR)#(ELON MUSK)",
                  "display": "(Investor)#(Elon Musk)"
              }
          ],
          "value_amount": [
              {
                  "value": "(INVESTMENT)#(USD 501200000)",
                  "display": "(Investment)#(USD 501200000)"
              },
              {
                  "value": "(PENALTY)#(USD 29500000)",
                  "display": "(Penalty)#(USD 29500000)"
              },
              {
                  "value": "(PENALTY)#(USD 41200000)",
                  "display": "(Penalty)#(USD 41200000)"
              },
              {
                  "value": "(ACQUISITION)#(USD 1120000000)",
                  "display": "(Acquisition)#(USD 1120000000)"
              },
              {
                  "value": "(ACQUISITION)#(USD 120000000)",
                  "display": "(Acquisition)#(USD 120000000)"
              },
              {
                  "value": "(ACQUISITION)#(USD 90000000)",
                  "display": "(Acquisition)#(USD 90000000)"
              },
              {
                  "value": "(BONDS)#(USD 200000000)",
                  "display": "(Bonds)#(USD 200000000)"
              },
              {
                  "value": "(DEBT)#(USD 3000000000)",
                  "display": "(Debt)#(USD 3000000000)"
              },
              {
                  "value": "(REVENUE)#(USD 1120000000)",
                  "display": "(Revenue)#(USD 1120000000)"
              },
              {
                  "value": "(SHARES)#(USD 2600000000)",
                  "display": "(Shares)#(USD 2600000000)"
              },
              {
                  "value": "(SHARES)#(USD 90000000)",
                  "display": "(Shares)#(USD 90000000)"
              }
          ],
          "company_person": [
              {
                  "value": "(HOME DEPOT)#(ELON MUSK)",
                  "display": "(Home Depot)#(Elon Musk)"
              },
              {
                  "value": "(TESLA MOTORS)#(ELON MUSK)",
                  "display": "(Tesla Motors)#(Elon Musk)"
              }
          ],
          "rank": 8,
          "displayTitle": "SolarCity",
          "relevantExtracts": "<b>tesla </b>... a subsidiary of <b>Tesla</b>, Inc. ... are sold through <b>Tesla</b>... module components in <b>Tesla </b>Giga New ... Subsidiary of <b>Tesla </b>Inc. ... August 1, 2016, <b>Tesla </b>announced (in ... <b>Tesla</b>&#39;s mission ... of the anti-<b>Tesla </b>group TSLAQ ... unaffiliated shareholders from <b>Tesla </b>and ... against Musk and <b>Tesla</b>&#39;s "
      },
      {
          "id": "/Web/Wikipedia/|Elon_Musk",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.96635,
          "matchingpartnames": [
              "text",
              "tables"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "early investor, CEO and product architect of {b}Tesla{nb}, Inc.",
              "199,58",
              "22608,360",
              "In 2006, he helped create SolarCity , a solar energy services company (now a subsidiary of {b}Tesla{nb}).",
              "2068,98",
              "28230,145",
              "Musk has said the goals of SpaceX, {b}Tesla{nb}, and SolarCity revolve around his vision to \"change the world and help humanity\".",
              "2681,122",
              "29250,122",
              "According to early {b}Tesla{nb} and SpaceX investor Steve Jurvetson , Musk calculated that the raw materials for building a rocket were only 3 percent of the sales price of a rocket at the time.",
              "9416,187",
              "69766,439",
              "Musk's {b}Tesla{nb} Roadster in orbit after the Falcon Heavy test flight in 2018",
              "13291,73",
              "84449,239",
              "The inaugural mission carried a {b}Tesla{nb} Roadster belonging to Musk as a dummy payload .",
              "13571,85",
              "85716,350",
              "{b}Tesla{nb}",
              "18327,5",
              "98821,5",
              "Musk led the Series A round of investment in February 2004, joining {b}Tesla{nb}'s board of directors as its chairman.",
              "18603,111",
              "99847,111",
              "{b}Tesla{nb}'s \"master plan\", as iterated by Musk in 2006 was:",
              "19341,55",
              "102816,189",
              "{b}Tesla{nb} began delivery of its four-door Model S sedan on June 22, 2012.",
              "19816,69",
              "103805,130"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "244,5,1897,12,1921,5,2159,5,2716,5,9435,5,13298,5,13603,5,18327,5,18334,5,18358,12,18671,5,19341,5,19594,12,19647,5,19816,5,20078,5,20301,5,20353,5,20389,5,20497,5,20572,5,20635,5,20863,5,21496,5,21751,5,22228,9,22310,5,22804,5,22935,5,23320,5,23447,5,23659,5,24193,5,24692,5,24775,5,24806,5,25237,5,25482,5,26010,5,26666,5,27092,5,27229,5,27437,5,27870,5,27945,5,28010,5,28094,5,28620,5,28687,5,28807,5,29617,5,29838,5,31807,5,31816,5,31865,5,33770,5,39474,5,39563,5,39641,5,41142,5,44113,5,50034,5,50444,5,50680,5,56197,5,59457,5,59665,5,60142,5,60300,5,60484,5,60547,5,60768,5,60961,5,61709,5,61771,5,61912,5,62947,5,65940,5,66038,5,66776,5,66841,5,66918,5,67322,5,68763,5,70930,5,73341,5;22952,5,28008,12,28080,5,28368,5,29285,5,69785,5,84540,5,85930,5,98821,5,99109,5,99133,12,99915,5,102816,5,103241,12,103362,5,103805,5,104641,5,105311,5,106366,5,106458,5,107414,5,108660,5,108760,5,109742,5,112208,5,112644,5,113382,9,113516,5,116078,5,116575,5,117118,5,117350,5,117988,5,119851,5,121086,5,121169,5,121200,5,121871,5,122376,5,123270,5,124840,5,126416,5,126793,5,127121,5,128634,5,128709,5,129038,5,129362,5,130166,5,130309,5,130571,5,132931,5,133508,5,137954,5,137963,5,138068,5,143129,5,158442,5,158533,5,158655,5,162772,5,169911,5,183025,5,183539,5,184148,5,195507,5,203071,5,203712,5,204474,5,204709,5,205014,5,205159,5,205621,5,205985,5,207952,5,208161,5,208471,5,212699,5,223807,5,223905,5,225742,5,225940,5,226211,5,227195,5,231269,5,238613,5,1267958,5"
                  },
                  {
                      "partname": "tables",
                      "data": "74075,5;1483206,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Elon Musk",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-31 21:43:07",
          "indexationtime": "2020-09-01 20:41:57",
          "version": "WLQfl0hZQIh/OQ17w9fePg==",
          "size": 1482566,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Elon_Musk",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              },
              {
                  "value": "JEFF BEZOS",
                  "display": "Jeff Bezos"
              },
              {
                  "value": "MARK ZUCKERBERG",
                  "display": "Mark Zuckerberg"
              },
              {
                  "value": "ASHLEE VANCE",
                  "display": "Ashlee Vance"
              },
              {
                  "value": "BERNIE SANDERS",
                  "display": "Bernie Sanders"
              },
              {
                  "value": "BURT RUTAN",
                  "display": "Burt Rutan"
              },
              {
                  "value": "CHIANG RAI",
                  "display": "Chiang Rai"
              },
              {
                  "value": "DONALD TRUMP",
                  "display": "Donald Trump"
              },
              {
                  "value": "MARCO RUBIO",
                  "display": "Marco Rubio"
              },
              {
                  "value": "PATTON BOGGS",
                  "display": "Patton Boggs"
              },
              {
                  "value": "ROBERT DOWNEY",
                  "display": "Robert Downey"
              },
              {
                  "value": "THAM LUANG",
                  "display": "Tham Luang"
              },
              {
                  "value": "TOSCA MUSK",
                  "display": "Tosca Musk"
              },
              {
                  "value": "BARACK OBAMA",
                  "display": "Barack Obama"
              },
              {
                  "value": "ERROL MUSK",
                  "display": "Errol Musk"
              },
              {
                  "value": "ISAAC ASIMOV",
                  "display": "Isaac Asimov"
              },
              {
                  "value": "STEVE JURVETSON",
                  "display": "Steve Jurvetson"
              },
              {
                  "value": "MAYE MUSK",
                  "display": "Maye Musk"
              },
              {
                  "value": "ALEXANDER MUSK",
                  "display": "Alexander Musk"
              },
              {
                  "value": "ALEXI PETRIDIS",
                  "display": "Alexi Petridis"
              }
          ],
          "company": [
              {
                  "value": "FORBES",
                  "display": "Forbes"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "WASHINGTON POST",
                  "display": "Washington Post"
              },
              {
                  "value": "AIR FORCE",
                  "display": "Air Force"
              },
              {
                  "value": "FACEBOOK",
                  "display": "Facebook"
              },
              {
                  "value": "MERCEDES",
                  "display": "Mercedes"
              },
              {
                  "value": "EBAY",
                  "display": "eBay"
              },
              {
                  "value": "FORD",
                  "display": "Ford"
              },
              {
                  "value": "GENERAL MOTORS",
                  "display": "General Motors"
              },
              {
                  "value": "KITTY HAWK",
                  "display": "Kitty Hawk"
              },
              {
                  "value": "DAIMLER",
                  "display": "Daimler"
              },
              {
                  "value": "GOOGLE",
                  "display": "Google"
              },
              {
                  "value": "NEW YORK TIMES",
                  "display": "New York Times"
              },
              {
                  "value": "PANASONIC",
                  "display": "Panasonic"
              },
              {
                  "value": "REUTERS",
                  "display": "Reuters"
              },
              {
                  "value": "APPLE",
                  "display": "Apple"
              },
              {
                  "value": "MICROSOFT",
                  "display": "Microsoft"
              },
              {
                  "value": "BLOOMBERG",
                  "display": "Bloomberg"
              }
          ],
          "geo": [
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "SOUTH AFRICA",
                  "display": "South Africa"
              },
              {
                  "value": "NEW YORK",
                  "display": "New York"
              },
              {
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "CANADA",
                  "display": "Canada"
              },
              {
                  "value": "THAILAND",
                  "display": "Thailand"
              },
              {
                  "value": "WASHINGTON",
                  "display": "Washington"
              },
              {
                  "value": "PRETORIA",
                  "display": "Pretoria"
              },
              {
                  "value": "CHINA",
                  "display": "China"
              },
              {
                  "value": "AMERICA",
                  "display": "America"
              },
              {
                  "value": "NEVADA",
                  "display": "Nevada"
              },
              {
                  "value": "BALTIMORE",
                  "display": "Baltimore"
              },
              {
                  "value": "FREMONT",
                  "display": "Fremont"
              },
              {
                  "value": "HAWTHORNE",
                  "display": "Hawthorne"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "MEXICO",
                  "display": "Mexico"
              },
              {
                  "value": "PARIS",
                  "display": "Paris"
              },
              {
                  "value": "MOSCOW",
                  "display": "Moscow"
              },
              {
                  "value": "NORTH AMERICA",
                  "display": "North America"
              }
          ],
          "wordcount": 8385,
          "exacthash": "X7UpTq5TW/FoSFv/YYPquA==",
          "nearhash": "gyhfJIdRiQV3yqxfakM/QA==",
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
          "url1": "https://en.wikipedia.org/wiki/Elon_Musk",
          "sourcecsv1": [
              "Elon Musk FRS",
              "Born",
              "Citizenship",
              "Education",
              "Occupation",
              "Years active",
              "Net worth",
              "Title",
              "Spouse",
              "Partner",
              "Children",
              "Parents",
              "Relatives"
          ],
          "sourcecsv2": [
              "Fellow_of_the_Royal_Society",
              "Royal_Society",
              "Pretoria",
              "South_Africa",
              "Queen%27s_University_at_Kingston",
              "University_of_Pennsylvania",
              "Bachelor_of_Arts",
              "Bachelor_of_Science",
              "United_States_dollar",
              "SpaceX",
              "Tesla,_Inc.",
              "The_Boring_Company",
              "X.com",
              "PayPal",
              "Neuralink",
              "OpenAI",
              "Zip2",
              "SolarCity",
              "Justine_Musk",
              "Talulah_Riley",
              "Grimes_(musician)",
              "Maye_Musk",
              "Kimbal_Musk",
              "Tosca_Musk",
              "Lyndon_Rive",
              "Engineer",
              "Industrial_designer",
              "Entrepreneur",
              "Philanthropy",
              "Chief_executive_officer",
              "Chief_technology_officer",
              "List_of_Fellows_of_the_Royal_Society_elected_in_2018",
              "Forbes",
              "Forbes_list_of_The_World%27s_Most_Powerful_People",
              "Bloomberg_L.P.",
              "Bloomberg_Billionaires_Index",
              "United_States_Dollar",
              "Centi-billionaire",
              "University_of_Pretoria",
              "Canada",
              "Bachelor%27s_degree",
              "Wharton_School_of_the_University_of_Pennsylvania",
              "University_of_Pennsylvania_School_of_Arts_and_Sciences",
              "Stanford_University",
              "Compaq",
              "Confinity",
              "EBay",
              "Aerospace",
              "Space",
              "Friendly_artificial_intelligence",
              "Neurotechnology",
              "Brain%E2%80%93computer_interface",
              "Hyperloop",
              "Global_warming",
              "Sustainable_energy",
              "Existential_risk",
              "Human_extinction",
              "Colonization_of_Mars",
              "N%C3%A9e",
              "Dietitian",
              "Saskatchewan",
              "Electromechanical_Engineering",
              "Pennsylvania_Dutch",
              "Computing",
              "Commodore_VIC-20",
              "Computer_programming",
              "Code",
              "BASIC",
              "Video_game",
              "Isaac_Asimov",
              "Foundation_series",
              "Flight_of_stairs",
              "Waterkloof_House_Preparatory_School",
              "Bryanston_High_School",
              "Pretoria_Boys_High_School",
              "South_African_Defence_Force",
              "Economics",
              "Physics",
              "University_of_Pennsylvania_College_of_Arts_%26_Sciences",
              "Silicon_Valley",
              "Ultracapacitor",
              "Bruce_Leak",
              "Energy_physics",
              "Materials_science",
              "California",
              "Internet_boom",
              "Angel_investor",
              "Newspaper",
              "Java_(programming_language)",
              "The_New_York_Times",
              "Chicago_Tribune",
              "CitySearch",
              "E-mail",
              "Unix",
              "Shareholder",
              "Mars_Oasis",
              "Greenhouse",
              "Regolith",
              "Moscow",
              "Jim_Cantrell",
              "Adeo_Ressi",
              "Dnepr_(rocket)",
              "Intercontinental_ballistic_missile",
              "NPO_Lavochkin",
              "Kosmotras",
              "In-Q-Tel",
              "Jet_Propulsion_Laboratory",
              "Orbital_Sciences",
              "Steve_Jurvetson",
              "Raw_materials",
              "Vertical_integration",
              "Gross_margin",
              "Barack_Obama",
              "Falcon_9",
              "Hawthorne,_California",
              "Launch_vehicle",
              "Falcon_1",
              "Millennium_Falcon",
              "SpaceX_Dragon",
              "Puff_the_Magic_Dragon_(film)",
              "SpaceX_launch_vehicles",
              "Thrust-to-weight_ratio",
              "Merlin_1D",
              "Altitude",
              "NASA",
              "Charles_Bolden",
              "International_Space_Station",
              "Commercial_Resupply_Services",
              "Federal_government_of_the_United_States",
              "Space_Shuttle",
              "Dragon_C2%2B",
              "Berthing_(spacecraft)",
              "Commercial_Crew_Development",
              "SpaceX_Dragon_2",
              "Launch_pad",
              "Autonomous_spaceport_drone_ship",
              "Elon_Musk%27s_Tesla_Roadster",
              "Falcon_Heavy_test_flight",
              "Falcon_Heavy",
              "Saturn_V",
              "Energia",
              "N1_(rocket)",
              "Falcon_Heavy_Test_Flight",
              "Boilerplate_(spaceflight)",
              "Starlink",
              "Satellite_Internet_access",
              "Flight_test",
              "UTC",
              "SpaceX_DM-1",
              "Micro_black_hole",
              "Human_spaceflight",
              "Ashlee_Vance",
              "Elon_Musk:_Tesla,_SpaceX,_and_the_Quest_for_a_Fantastic_Future",
              "SpaceX_Mars_transportation_infrastructure",
              "SpaceX_Starship",
              "North_American_Aerospace_Defense_Command",
              "Air_Force_Space_Command",
              "Launch_service_provider",
              "Cislunar",
              "Raptor_(rocket_engine_family)",
              "Private_spaceflight",
              "DearMoon_project",
              "Canard_(aeronautics)",
              "Crew_Dragon_Demo-2",
              "STS-135",
              "Martin_Eberhard",
              "Marc_Tarpenning",
              "Series_A_round",
              "J._B._Straubel",
              "AC_Propulsion_tzero",
              "Financial_crisis_of_2007%E2%80%932008",
              "Tesla_Roadster_(2008)",
              "Serial_production",
              "Lithium-ion_battery",
              "Tesla_Model_S",
              "Tesla_Model_X",
              "SUV",
              "Minivan",
              "Powertrain",
              "Daimler_AG",
              "Smart_EV",
              "Mercedes_B-Class",
              "Mercedes_A-Class_E-Cell",
              "Toyota",
              "RAV4_EV",
              "Dianne_Feinstein",
              "Tesla_Factory",
              "NUMMI",
              "Fremont,_California",
              "Tesla_Model_3",
              "Ford",
              "Henry_Ford",
              "Spaceballs",
              "All_Things_Digital",
              "North_America",
              "Good_faith_(law)",
              "Hydrocarbons",
              "Domain_name",
              "Narendra_Modi",
              "Gigafactory_1",
              "Tesla_Autopilot",
              "Mobileye",
              "South_Australia",
              "Battery_storage_power_station",
              "U.S._Securities_and_Exchange_Commission",
              "Twitter",
              "Privately_held_company",
              "CEO",
              "Public_company",
              "Gigafactory_3",
              "Li_Keqiang",
              "Tesla_Model_Y",
              "Tesla_Cybertruck",
              "Blade_Runner",
              "Gigafactory_2",
              "Andrew_Cuomo",
              "Buffalo_Billion",
              "Buffalo,_New_York",
              "Hyperloop_pod_competition",
              "Air_bearing",
              "Linear_induction_motor",
              "Air_compressor",
              "Greater_Los_Angeles_Area",
              "San_Francisco_Bay_Area",
              "Tesla_Inc.",
              "Whitepaper",
              "Mode_of_transport",
              "Aerodynamic_drag",
              "Incentive_prize_competition",
              "Virgin_Hyperloop_One",
              "New_York_City",
              "Washington,_D.C.",
              "Philadelphia",
              "Baltimore",
              "Artificial_general_intelligence",
              "Joe_Rogan",
              "The_Guardian",
              "TED_(conference)",
              "Regulatory_agency",
              "United_States",
              "Chicago",
              "Merchandising",
              "Tham_Luang_cave_rescue",
              "Rescue_pod",
              "Richard_Stanton_(cave_diver)",
              "Diving_weighting_system",
              "Order_of_the_Direkgunabhorn",
              "CNN",
              "Public_relations",
              "L._Lin_Wood",
              "BuzzFeed_News",
              "Off_the_record_(journalism)",
              "Chiang_Rai",
              "Tequila",
              "United_States_Patent_and_Trademark_Office",
              "Rap_music",
              "SoundCloud",
              "Caroline_Polachek",
              "BloodPop",
              "Electronic_dance_music",
              "Alexis_Petridis",
              "TechCrunch",
              "Short_(finance)",
              "Securities_Exchange_Commission",
              "60_Minutes",
              "Taoiseach",
              "Enda_Kenny",
              "Democratic_Party_(United_States)",
              "Republican_Party_(United_States)",
              "Independent_voter",
              "Universal_basic_income",
              "Direct_democracy",
              "Mars",
              "Socialism",
              "Consumption_tax",
              "Income_tax",
              "Inheritance_tax",
              "Democracy",
              "World_War_I",
              "World_War_II",
              "Cold_War",
              "Donald_Trump",
              "President_of_the_United_States",
              "Rex_Tillerson",
              "United_States_Secretary_of_State",
              "United_States_withdrawal_from_the_Paris_Agreement",
              "Paris_Agreement",
              "COVID-19_pandemic",
              "Andrew_Yang",
              "Transphobic",
              "Non-binary",
              "Bernie_Sanders",
              "Mike_Pence",
              "Karen_Pence",
              "The_Washington_Post",
              "Sunlight_Foundation",
              "Lobbying",
              "United_States_Congress",
              "George_W._Bush",
              "Marco_Rubio",
              "Space_industry",
              "Senate_Majority_Leader",
              "Trent_Lott",
              "Patton_Boggs_LLP",
              "Political_action_committee",
              "FWD.us",
              "Mark_Zuckerberg",
              "Immigration_reform",
              "Keystone_Pipeline",
              "David_O._Sacks",
              "Mic_(media_company)",
              "National_Republican_Congressional_Committee",
              "Anti-science",
              "Anti-environmentalism",
              "Michele_Bachmann",
              "Climate_change",
              "Subsidies",
              "Carbon_tax",
              "Externality",
              "Free_market",
              "Fred_Turner_(author)",
              "Social_change",
              "Michael_Shellenberger",
              "Jim_Motavalli",
              "LA_Times",
              "Reveal_News",
              "Pravda",
              "Ukrayinska_Pravda",
              "Destiny",
              "Relationship_between_religion_and_science",
              "Simulation_hypothesis",
              "Fermi_paradox",
              "Simulated_reality",
              "Existential_risk_from_advanced_artificial_intelligence",
              "Artificial_intelligence",
              "MIT",
              "Existential_threat",
              "DeepMind",
              "Vicarious_(Company)",
              "Machine_intelligence",
              "Future_of_Life_Institute",
              "Terminator_(franchise)",
              "Facebook",
              "Slate_(magazine)",
              "Information_Technology_and_Innovation_Foundation",
              "Robert_D._Atkinson",
              "Nature_(journal)",
              "Conference_on_Neural_Information_Processing_Systems",
              "Jarrett_Walker",
              "Portland,_Oregon",
              "Paul_Krugman",
              "COVID-19",
              "Chloroquine",
              "Alameda_County_Sheriff%27s_Office",
              "Alameda_County",
              "Texas",
              "Nevada",
              "Hurricane_response",
              "Coden,_Alabama",
              "Soma,_Fukushima",
              "Cartoonist",
              "Matthew_Inman",
              "Nikola_Tesla",
              "Tesla_Science_Center_at_Wardenclyffe",
              "X_Prize_Foundation",
              "The_Giving_Pledge",
              "Flint_water_crisis",
              "Flint,_Michigan",
              "ACLU",
              "Team_Trees",
              "YouTube",
              "Arbor_Day_Foundation",
              "Ulana_Suprun",
              "Mohammed_Mostajo-Radji",
              "Zainab_Ahmed",
              "Sudden_infant_death_syndrome",
              "In_vitro_fertilization",
              "Joint_custody_(United_States)",
              "Amber_Heard",
              "English_alphabet",
              "%C3%86",
              "The_Joe_Rogan_Experience",
              "Fortune_(magazine)",
              "United_States_Air_Force",
              "The_Verge",
              "United_States_National_Academy_of_Sciences",
              "Inc._(magazine)",
              "Global_Green",
              "Mikhail_Gorbachev",
              "American_Institute_of_Aeronautics_and_Astronautics",
              "National_Wildlife_Federation",
              "Thomas_Friedman",
              "Patrick_Leahy",
              "Charlie_Crist",
              "National_Space_Society",
              "Burt_Rutan",
              "Steve_Squyres",
              "Time_(magazine)",
              "F%C3%A9d%C3%A9ration_A%C3%A9ronautique_Internationale",
              "Neil_Armstrong",
              "Scaled_Composites",
              "John_Glenn",
              "Esquire_(magazine)",
              "Living_Legends_of_Aviation",
              "Buzz_Aldrin",
              "Richard_Branson",
              "Heinlein_Prize_for_Advances_in_Space_Commercialization",
              "Royal_Aeronautical_Society",
              "Explorers_Club",
              "Edison_Awards",
              "IEEE_Honorary_Membership",
              "Business_Insider",
              "Sal_Khan",
              "Business_for_Peace_Foundation",
              "Chiang_Rai_Province",
              "Thailand",
              "Starmus_Festival",
              "Stephen_Hawking_Medal_for_Science_Communication",
              "Iron_Man_2",
              "Tony_Stark_(Marvel_Cinematic_Universe)",
              "Robert_Downey_Jr.",
              "Iron_Man_(Marvel_Cinematic_Universe_character)",
              "Marvel_Cinematic_Universe",
              "The_Simpsons",
              "The_Musk_Who_Fell_to_Earth",
              "The_Big_Bang_Theory",
              "Soup_kitchen",
              "Howard_Wolowitz",
              "Young_Sheldon",
              "Racing_Extinction",
              "Empire_State_Building",
              "Vatican_City",
              "South_Park",
              "Members_Only_(South_Park)",
              "Why_Him%3F",
              "Bryan_Cranston",
              "New_Girl",
              "Firestorm_(comics)#Live-action",
              "The_CW",
              "Legends_of_Tomorrow",
              "Time_travel",
              "CBS_All_Access",
              "Star_Trek:_Discovery",
              "Gabriel_Lorca",
              "Wright_Brothers",
              "Zefram_Cochrane",
              "Blue_Origin",
              "Jeff_Bezos",
              "Star_Trek_Beyond",
              "PewDiePie",
              "Justin_Roiland",
              "Rick_and_Morty",
              "One_Crew_over_the_Crewcoo%27s_Morty",
              "MrBeast",
              "Mark_Rober",
              "IJustine",
              "The_Slow_Mo_Guys",
              "Marques_Brownlee",
              "Hannah_Stocking",
              "The_Try_Guys",
              "AsapScience",
              "Destin_Sandlin",
              "How_Ridiculous",
              "Sam_Denby",
              "HowToBasic",
              "The_Daily_Telegraph",
              "Asme.org",
              "CNET",
              "Bloomberg_News",
              "TWiT.tv",
              "ISSN_(identifier)",
              "PMC_(identifier)",
              "The_Mercury_News",
              "Ecco_Press",
              "ISBN_(identifier)",
              "VentureBeat",
              "Vox_Media",
              "HarperCollins",
              "Slate",
              "Mercury_News",
              "The_PayPal_Wars",
              "SpaceNews",
              "Space.com",
              "NASASpaceFlight.com",
              "Guardian_Media_Group",
              "Hearst_Corporation",
              "Wired_(magazine)",
              "Alan_Boyle",
              "GeekWire",
              "Cbsnews.com",
              "Toronto_Star",
              "Phys.org",
              "All_Things_D",
              "CNBC",
              "CNNMoney",
              "Bloomberg_BusinessWeek",
              "Backchannel_(blog)",
              "Medium_(website)",
              "Inverse_(website)",
              "Royal_Thai_Government_Gazette",
              "BBC",
              "Engadget",
              "Spin_(magazine)",
              "XXL_(magazine)",
              "Mashable.com",
              "BBC_News",
              "Mother_Jones_(magazine)",
              "Aeon_(digital_magazine)",
              "The_Independent_(UK)",
              "Bibcode_(identifier)",
              "Doi_(identifier)",
              "PMID_(identifier)",
              "The_Huffington_Post",
              "The_Fader",
              "The_Wall_Street_Journal",
              "C-SPAN",
              "IMDb",
              "Boring_Test_Tunnel",
              "History_of_SpaceX",
              "Falcon_9_Block_5",
              "Starship_development_history",
              "Falcon_9_v1.0",
              "Falcon_9_v1.1",
              "Falcon_9_Full_Thrust",
              "Falcon_1e",
              "Falcon_5",
              "Falcon_9_Air",
              "SpaceX_Grasshopper",
              "F9R_Dev1",
              "SpaceX_DragonFly",
              "Starhopper",
              "F9R_Dev2",
              "Crew_Dragon_C201",
              "Crew_Dragon_Endeavour",
              "Crew_Dragon_C207",
              "List_of_Falcon_9_first-stage_boosters",
              "Falcon_9_booster_B1046",
              "Falcon_9_booster_B1048",
              "Falcon_9_booster_B1056",
              "SpaceX_Dragon_C106",
              "SpaceX_Dragon_C108",
              "SpaceX_rocket_engines",
              "SpaceX_Kestrel",
              "SpaceX_Merlin",
              "SpaceX_Draco",
              "SuperDraco",
              "SpaceX_Raptor",
              "List_of_Falcon_9_and_Falcon_Heavy_launches",
              "List_of_Starship_flights",
              "SpaceX_launch_facilities",
              "Cape_Canaveral_Air_Force_Station_Space_Launch_Complex_40",
              "Cape_Canaveral_Air_Force_Station",
              "Kennedy_Space_Center_Launch_Complex_39A",
              "Kennedy_Space_Center",
              "Vandenberg_Air_Force_Base_Space_Launch_Complex_4#SLC-4E",
              "Vandenberg_Air_Force_Base",
              "Ronald_Reagan_Ballistic_Missile_Defense_Test_Site",
              "Kwajalein_Atoll",
              "SpaceX_launch_facilities#SpaceX_rocket_development_and_test_facility,_McGregor,_Texas",
              "SpaceX_launch_facilities#SpaceX_high-altitude_test_facility,_New_Mexico",
              "SpaceX_South_Texas_Launch_Site",
              "Boca_Chica_Village,_Texas",
              "Landing_Zones_1_and_2",
              "Vandenberg_Air_Force_Base_Space_Launch_Complex_4#SLC-4W",
              "SpaceX_launch_facilities#SpaceX_Rocket_Development_and_Test_Facility,_McGregor,_Texas",
              "McGregor,_Texas",
              "SpaceX_satellite_development_facility",
              "Redmond,_Washington",
              "GO_Searcher",
              "GO_Navigator",
              "Ms._Tree_(ship)",
              "SpaceX_reusable_launch_system_development_program",
              "Commercial_Orbital_Transportation_Services",
              "Commercial_Crew_Program",
              "Commercial_Lunar_Payload_Services",
              "Gateway_Logistics_Services",
              "Falcon_9_first-stage_landing_tests",
              "SpaceX_Red_Dragon",
              "Gwynne_Shotwell",
              "Tom_Mueller",
              "Bob_Behnken",
              "Doug_Hurley",
              "Book:SpaceX",
              "Tesla_Cyberquad",
              "Tesla_Roadster_(2020)",
              "Tesla_Semi",
              "Mercedes-Benz_B-Class_Electric_Drive",
              "Smart_electric_drive",
              "Toyota_RAV4_EV",
              "Tesla_Solar_Roof",
              "Tesla_Powerwall",
              "Tesla_Powerpack",
              "Tesla_Megapack",
              "Robyn_Denholm",
              "Zach_Kirkhorn",
              "Drew_Baglino",
              "Franz_von_Holzhausen",
              "Jerome_Guillen",
              "Larry_Ellison",
              "Hiromichi_Mizuno",
              "Andrej_Karpathy",
              "Kathleen_Wilson-Thompson",
              "Deepak_Ahuja",
              "Ze%27ev_Drori",
              "Arnnon_Geshuri",
              "Jim_Keller_(engineer)",
              "Chris_Lattner",
              "Jay_Vijayan",
              "Tesla_facilities_in_Tilburg",
              "Giga_Nevada",
              "Giga_New_York",
              "Giga_Shanghai",
              "Giga_Berlin",
              "Gigafactory_5",
              "Tesla_Supercharger",
              "Lawsuits_and_Controversies_of_Tesla,_Inc.",
              "Tesla_US_dealership_disputes",
              "Sudden_unintended_acceleration#Tesla&#39",
              "s_Model_X,_S_and_3",
              "TSLAQ",
              "History_of_Tesla,_Inc.",
              "Giga_Press",
              "Hornsdale_Power_Reserve",
              "Maxwell_Technologies",
              "PayPal_Mafia",
              "Peter_Thiel",
              "Reid_Hoffman",
              "Max_Levchin",
              "Ken_Howery",
              "Luke_Nosek",
              "Steve_Chen",
              "Keith_Rabois",
              "Chad_Hurley",
              "Roelof_Botha",
              "Jawed_Karim",
              "Yishan_Wong",
              "Eric_M._Jackson",
              "Premal_Shah",
              "Russel_Simmons",
              "Jeremy_Stoppelman",
              "LinkedIn",
              "Slide.com",
              "Yelp",
              "Geni.com",
              "Yammer",
              "Palantir_Technologies",
              "Kiva_(organization)",
              "Affirm_(company)",
              "Friendster",
              "Powerset_(company)",
              "Vator",
              "Six_Apart",
              "Zynga",
              "IronPort",
              "Flickr",
              "Digg",
              "Grockit",
              "Ooma",
              "Quantcast",
              "RapLeaf",
              "SmartDrive_Systems",
              "TransferWise",
              "Ping.fm",
              "Nanosolar",
              "Knewton",
              "Kongregate",
              "Last.fm",
              "TokBox",
              "Xoom_(web_hosting)",
              "Joost",
              "Founders_Fund",
              "Clarium_Capital",
              "Greylock_Partners",
              "Sequoia_Capital",
              "Valar_Ventures",
              "Thank_You_for_Smoking_(film)",
              "The_Stanford_Review",
              "Jim_Al-Khalili",
              "Polly_Arnold",
              "Jillian_Banfield",
              "Margaret_Brimble",
              "Neil_Brockdorff",
              "Frank_Caruso_(chemical_engineer)",
              "Vincenzo_Cerundolo",
              "Kevin_Costello",
              "Robert_H._Crabtree",
              "Philip_Dawid",
              "Peter_Dayan",
              "Richard_Dixon_(biologist)",
              "Gregory_Edgecombe",
              "Wenfei_Fan",
              "Roger_S._Goody",
              "Robin_Grimes",
              "Gregory_Hannon",
              "Demis_Hassabis",
              "Judy_Hirst",
              "Graeme_Jameson",
              "Harren_Jhoti",
              "Sophien_Kamoun",
              "Andrew_King_(neurophysiologist)",
              "Dimitri_Kullmann",
              "Dominic_Kwiatkowski",
              "Richard_Marais",
              "Cathie_Martin",
              "Peter_O%27Hearn",
              "Vassilis_Pachnis",
              "Tracy_Palmer",
              "Colin_Prentice",
              "Lalita_Ramakrishnan",
              "Nancy_Reid",
              "Graham_Richards",
              "David_Richardson_(physicist)",
              "Sheila_Rowan_(physicist)",
              "Ingrid_Scheffer",
              "Michelle_Simmons",
              "John_Smol",
              "Timothy_Softley",
              "John_Speakman",
              "Graeme_Stephens",
              "Angela_Strank",
              "Charles_Swanton",
              "Peter_Visscher",
              "Guy_Wilkinson_(physicist)",
              "Geordie_Williamson",
              "Daniel_Wise_(mathematician)",
              "Nikolay_Zheludev",
              "David_Willetts",
              "Carolyn_R._Bertozzi",
              "Martin_Chalfie",
              "Sebsebe_Demissew",
              "Jeffrey_M._Friedman",
              "Fabiola_Gianotti",
              "Albrecht_Hofmann",
              "Butler_Lampson",
              "Tullio_Pozzan",
              "Joachim_Sauer",
              "Adi_Shamir",
              "Existential_risk_from_artificial_general_intelligence",
              "Accelerating_change",
              "AI_box",
              "AI_takeover",
              "AI_control_problem",
              "Instrumental_convergence",
              "Intelligence_explosion",
              "Machine_ethics",
              "Superintelligence",
              "Technological_singularity",
              "Allen_Institute_for_AI",
              "Center_for_Applied_Rationality",
              "Center_for_Human-Compatible_Artificial_Intelligence",
              "Center_for_Security_and_Emerging_Technology",
              "Centre_for_the_Study_of_Existential_Risk",
              "Foundational_Questions_Institute",
              "Future_of_Humanity_Institute",
              "Humanity%2B",
              "Institute_for_Ethics_and_Emerging_Technologies",
              "Leverhulme_Centre_for_the_Future_of_Intelligence",
              "Machine_Intelligence_Research_Institute",
              "Nick_Bostrom",
              "K._Eric_Drexler",
              "Sam_Harris",
              "Stephen_Hawking",
              "Bill_Hibbard",
              "Bill_Joy",
              "Steve_Omohundro",
              "Huw_Price",
              "Martin_Rees",
              "Stuart_J._Russell",
              "Jaan_Tallinn",
              "Max_Tegmark",
              "Frank_Wilczek",
              "Roman_Yampolskiy",
              "Eliezer_Yudkowsky",
              "Global_catastrophic_risk",
              "Ethics_of_artificial_intelligence",
              "Human_Compatible",
              "Open_Letter_on_Artificial_Intelligence",
              "Our_Final_Invention",
              "The_Precipice:_Existential_Risk_and_the_Future_of_Humanity",
              "Superintelligence:_Paths,_Dangers,_Strategies",
              "Transhumanism",
              "Outline_of_transhumanism",
              "Transhuman",
              "Transhumanism_in_fiction",
              "Abolitionism_(transhumanism)",
              "Extropianism",
              "Immortalism",
              "Postgenderism",
              "Postpoliticism",
              "Singularitarianism",
              "Technogaianism",
              "Anarcho-transhumanism",
              "Democratic_transhumanism",
              "Libertarian_transhumanism",
              "Techno-progressivism",
              "Foresight_Institute",
              "LessWrong",
              "Science_Party_(Australia)",
              "Transhumanist_Party",
              "Jos%C3%A9_Luis_Cordeiro",
              "Ben_Goertzel",
              "Aubrey_de_Grey",
              "Zoltan_Istvan",
              "FM-2030",
              "Nikolai_Fyodorovich_Fyodorov",
              "Robin_Hanson",
              "Ray_Kurzweil",
              "Ole_Martin_Moen",
              "Hans_Moravec",
              "Max_More",
              "David_Pearce_(philosopher)",
              "Martine_Rothblatt",
              "Anders_Sandberg",
              "Gennady_Stolyarov_II",
              "Vernor_Vinge",
              "Natasha_Vita-More",
              "Mark_Alan_Walker",
              "Bibsys",
              "GND_(identifier)",
              "ISNI_(identifier)",
              "LCCN_(identifier)",
              "MusicBrainz",
              "National_Diet_Library",
              "National_Library_of_the_Czech_Republic",
              "National_Library_of_Israel",
              "National_Library_of_Korea",
              "Royal_Library_of_the_Netherlands",
              "VIAF_(identifier)",
              "WorldCat_Identities"
          ],
          "sourcestr1": "Elon_Musk",
          "sourcestr2": "Q317521",
          "sourcestr3": "Q5",
          "category": "human",
          "sourcevarchar3": "[{\"Elon Musk FRS\":[\"Musk at the\",\"Royal Society\",\"admissions day in London, July 2018\"],\"Born\":[\"Elon Reeve Musk\",\"June 28, 1971\",\"(age49)\",\"Pretoria\",\",\",\"South Africa\"],\"Citizenship\":[\"South Africa (1971\\u2013present)\",\"Canada (1971\\u2013present)\",\"United States (2002\\u2013present)\"],\"Education\":[\"Queen's University\",\"(no degree)\",\"University of Pennsylvania\"],\"Occupation\":[\"Engineer\",\"Industrial designer\",\"Entrepreneur\"],\"Years active\":\"1995\\u2013present\",\"Net worth\":[\"US$\",\"101 billion (August 27, 2020)\"],\"Title\":[\"Founder, CEO, lead designer of\",\"SpaceX\",\"CEO, product architect of\",\"Tesla, Inc.\",\"Founder of\",\"The Boring Company\",\"and\",\"X.com\",\"(now\",\"PayPal\",\"Co-founder of\",\"Neuralink\",\",\",\"OpenAI\",\", and\",\"Zip2\",\"Chairman of\",\"SolarCity\"],\"Spouse\":[\"Justine Wilson\",\"\\u200b\"],\"Partner\":[\"Grimes\",\"(2018\\u2013present)\"],\"Children\":\"7\",\"Parents\":[\"Errol Musk (father)\",\"Maye Musk\",\"(mother)\"],\"Relatives\":[\"Kimbal Musk\",\"(brother)\",\"Tosca Musk\",\"(sister)\",\"Lyndon Rive\",\"(cousin)\"],\"Signature\":\"\"}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
          "sourcedouble1": 0.029035,
          "entity1": [
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "1",
                  "display": "1"
              },
              {
                  "value": "2019",
                  "display": "2019"
              },
              {
                  "value": "2017",
                  "display": "2017"
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
                  "value": "2015",
                  "display": "2015"
              },
              {
                  "value": "2020",
                  "display": "2020"
              },
              {
                  "value": "9",
                  "display": "9"
              },
              {
                  "value": "2014",
                  "display": "2014"
              },
              {
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "2012",
                  "display": "2012"
              },
              {
                  "value": "2008",
                  "display": "2008"
              },
              {
                  "value": "2010",
                  "display": "2010"
              },
              {
                  "value": "2013",
                  "display": "2013"
              },
              {
                  "value": "12",
                  "display": "12"
              },
              {
                  "value": "2011",
                  "display": "2011"
              },
              {
                  "value": "4",
                  "display": "4"
              },
              {
                  "value": "2002",
                  "display": "2002"
              },
              {
                  "value": "30",
                  "display": "30"
              }
          ],
          "date": [
              {
                  "value": "1971-06-28",
                  "display": "1971-06-28"
              },
              {
                  "value": "2020-08-27",
                  "display": "2020-08-27"
              },
              {
                  "value": "2008-12-23",
                  "display": "2008-12-23"
              },
              {
                  "value": "2012-02-09",
                  "display": "2012-02-09"
              },
              {
                  "value": "2012-05-25",
                  "display": "2012-05-25"
              },
              {
                  "value": "2012-06-22",
                  "display": "2012-06-22"
              },
              {
                  "value": "2013-08-12",
                  "display": "2013-08-12"
              },
              {
                  "value": "2014-03-16",
                  "display": "2014-03-16"
              },
              {
                  "value": "2014-06-17",
                  "display": "2014-06-17"
              },
              {
                  "value": "2015-09-26",
                  "display": "2015-09-26"
              },
              {
                  "value": "2015-12-22",
                  "display": "2015-12-22"
              },
              {
                  "value": "2016-01-29",
                  "display": "2016-01-29"
              },
              {
                  "value": "2016-07-29",
                  "display": "2016-07-29"
              },
              {
                  "value": "2016-12-17",
                  "display": "2016-12-17"
              },
              {
                  "value": "2017-01-21",
                  "display": "2017-01-21"
              },
              {
                  "value": "2017-05-12",
                  "display": "2017-05-12"
              },
              {
                  "value": "2017-07-20",
                  "display": "2017-07-20"
              },
              {
                  "value": "2018-02-06",
                  "display": "2018-02-06"
              },
              {
                  "value": "2018-05-07",
                  "display": "2018-05-07"
              },
              {
                  "value": "2018-05-25",
                  "display": "2018-05-25"
              }
          ],
          "entity3": [
              {
                  "value": "00:02",
                  "display": "00:02"
              }
          ],
          "money": [
              {
                  "value": "USD 250000",
                  "display": "USD 250000"
              },
              {
                  "value": "USD 10000000",
                  "display": "USD 10000000"
              },
              {
                  "value": "USD 1000000",
                  "display": "USD 1000000"
              },
              {
                  "value": "USD 750000000",
                  "display": "USD 750000000"
              },
              {
                  "value": "USD 8000000",
                  "display": "USD 8000000"
              },
              {
                  "value": "USD 101000000000",
                  "display": "USD 101000000000"
              },
              {
                  "value": "USD 1500000000",
                  "display": "USD 1500000000"
              },
              {
                  "value": "USD 35000",
                  "display": "USD 35000"
              },
              {
                  "value": "USD 100000",
                  "display": "USD 100000"
              },
              {
                  "value": "USD 100000000",
                  "display": "USD 100000000"
              },
              {
                  "value": "USD 10000000000",
                  "display": "USD 10000000000"
              },
              {
                  "value": "USD 1600000000",
                  "display": "USD 1600000000"
              },
              {
                  "value": "USD 190000000",
                  "display": "USD 190000000"
              },
              {
                  "value": "USD 20000000",
                  "display": "USD 20000000"
              },
              {
                  "value": "USD 260000000",
                  "display": "USD 260000000"
              },
              {
                  "value": "USD 4000000",
                  "display": "USD 4000000"
              },
              {
                  "value": "USD 4900000000",
                  "display": "USD 4900000000"
              },
              {
                  "value": "USD 6000000000",
                  "display": "USD 6000000000"
              },
              {
                  "value": "USD 650000000000",
                  "display": "USD 650000000000"
              },
              {
                  "value": "USD 725000",
                  "display": "USD 725000"
              }
          ],
          "entity12": [
              {
                  "value": "BIRTH",
                  "display": "Birth"
              },
              {
                  "value": "DEATH",
                  "display": "Death"
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
                  "value": "CHIEF EXECUTIVE OFFICER",
                  "display": "Chief Executive Officer"
              },
              {
                  "value": "INVESTOR",
                  "display": "Investor"
              },
              {
                  "value": "FOUNDER",
                  "display": "Founder"
              },
              {
                  "value": "VICE-PRESIDENT",
                  "display": "Vice-President"
              },
              {
                  "value": "CHIEF TECHNOLOGY OFFICER",
                  "display": "Chief Technology Officer"
              },
              {
                  "value": "CO-FOUNDER",
                  "display": "Co-founder"
              },
              {
                  "value": "DIRECTOR",
                  "display": "Director"
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
              }
          ],
          "event_date": [
              {
                  "value": "(BIRTH)#(1971-06-28)",
                  "display": "(Birth)#(1971-06-28)"
              },
              {
                  "value": "(BIRTH)#(2020-05-04)",
                  "display": "(Birth)#(2020-05-04)"
              }
          ],
          "person_cooc": [
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(ELON MUSK)",
                  "display": "(Chief Executive Officer)#(Elon Musk)"
              },
              {
                  "value": "(FOUNDER)#(JEFF BEZOS)",
                  "display": "(Founder)#(Jeff Bezos)"
              },
              {
                  "value": "(FOUNDER)#(MARK ZUCKERBERG)",
                  "display": "(Founder)#(Mark Zuckerberg)"
              },
              {
                  "value": "(INVESTOR)#(DIANNE FEINSTEIN)",
                  "display": "(Investor)#(Dianne Feinstein)"
              },
              {
                  "value": "(VICE-PRESIDENT)#(JUSTIN MCANEAR)",
                  "display": "(Vice-President)#(Justin McAnear)"
              },
              {
                  "value": "(VICE-PRESIDENT)#(KAREN PENCE)",
                  "display": "(Vice-President)#(Karen Pence)"
              },
              {
                  "value": "(VICE-PRESIDENT)#(MIKE PENCE)",
                  "display": "(Vice-President)#(Mike Pence)"
              },
              {
                  "value": "(INVESTOR)#(STEVE JURVETSON)",
                  "display": "(Investor)#(Steve Jurvetson)"
              }
          ],
          "value_amount": [
              {
                  "value": "(ACQUISITION)#(USD 1500000000)",
                  "display": "(Acquisition)#(USD 1500000000)"
              },
              {
                  "value": "(CONTRACT)#(USD 1)",
                  "display": "(Contract)#(USD 1)"
              },
              {
                  "value": "(SHARES)#(USD 700)",
                  "display": "(Shares)#(USD 700)"
              },
              {
                  "value": "(ACQUISITION)#(USD 307000000)",
                  "display": "(Acquisition)#(USD 307000000)"
              },
              {
                  "value": "(ACQUISITION)#(USD 340000000)",
                  "display": "(Acquisition)#(USD 340000000)"
              },
              {
                  "value": "(CONTRACT)#(USD 10000000)",
                  "display": "(Contract)#(USD 10000000)"
              },
              {
                  "value": "(CONTRACT)#(USD 165000000)",
                  "display": "(Contract)#(USD 165000000)"
              },
              {
                  "value": "(LIQUIDITY)#(USD 22000000)",
                  "display": "(Liquidity)#(USD 22000000)"
              },
              {
                  "value": "(LIQUIDITY)#(USD 307000000)",
                  "display": "(Liquidity)#(USD 307000000)"
              },
              {
                  "value": "(SHARES)#(USD 1500000000)",
                  "display": "(Shares)#(USD 1500000000)"
              },
              {
                  "value": "(SHARES)#(USD 165000000)",
                  "display": "(Shares)#(USD 165000000)"
              }
          ],
          "company_person": [
              {
                  "value": "(FACEBOOK)#(ELON MUSK)",
                  "display": "(Facebook)#(Elon Musk)"
              },
              {
                  "value": "(FACEBOOK)#(JEROME PERSATI)",
                  "display": "(Facebook)#(Jerome Persati)"
              },
              {
                  "value": "(FACEBOOK)#(MARK ZUCKERBERG)",
                  "display": "(Facebook)#(Mark Zuckerberg)"
              },
              {
                  "value": "(TESLA MOTORS)#(MARC TARPENNING)",
                  "display": "(Tesla Motors)#(Marc Tarpenning)"
              },
              {
                  "value": "(TESLA MOTORS)#(MARTIN EBERHARD)",
                  "display": "(Tesla Motors)#(Martin Eberhard)"
              },
              {
                  "value": "(APPLE)#(BRUCE LEAK)",
                  "display": "(Apple)#(Bruce Leak)"
              }
          ],
          "person_job_company": [
              {
                  "value": "(MARK ZUCKERBERG)#(FOUNDER)#(FACEBOOK)",
                  "display": "(Mark Zuckerberg)#(Founder)#(Facebook)"
              }
          ],
          "rank": 9,
          "displayTitle": "Elon Musk",
          "relevantExtracts": "product architect of <b>Tesla</b>... a subsidiary of <b>Tesla</b>... goals of SpaceX, <b>Tesla</b>, and SolarCity ... According to early <b>Tesla </b>and SpaceX ... Musk&#39;s <b>Tesla </b>Roadster in ... mission carried a <b>Tesla </b>Roadster belonging ... <b>Tesla</b>... February 2004, joining <b>Tesla</b>&#39;s board ... <b>Tesla</b>&#39;s &quot;master ... <b>Tesla </b>began delivery "
      },
      {
          "id": "/Web/Wikipedia/|Elon_Musk%27s_Tesla_Roadster",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.963054,
          "matchingpartnames": [
              "text",
              "tables",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "Elon Musk's {b}Tesla{nb} Roadster is an electric sports car that served as the dummy payload for the February 2018 Falcon Heavy test flight and became an artificial satellite of the Sun . \"Starman\", a mannequin dressed in a spacesuit , occupies the driver's seat.",
              "2,256",
              "16978,605",
              "The car and rocket are products of {b}Tesla{nb} and SpaceX , respectively, both companies headed by Elon Musk .",
              "259,104",
              "17584,244",
              "Advertising analysts noted Musk's sense of brand management and use of new media for his decision to launch a {b}Tesla{nb} into space.",
              "989,127",
              "19773,189",
              "Musk's {b}Tesla{nb} Roadster parked outside SpaceX in 2010",
              "1420,51",
              "28859,51",
              "In June 2017, one of his Twitter followers suggested that the silly thing be a {b}Tesla{nb} Model S , to which Musk replied \"Suggestions welcome!\".",
              "1643,140",
              "29358,195",
              "In December 2017 he announced that the payload would be his personal \"midnight cherry {b}Tesla{nb} Roadster\".",
              "1784,102",
              "30019,102",
              "Nine months after launch, the {b}Tesla{nb} had travelled beyond the orbit of Mars, reaching aphelion at 12:48 UTC on November 9, 2018, at a distance of 248,892,559 km (1.664 au) from the Sun. The maximum speed of the car relative to the Sun will be 121,005 km/h (75,189 mph) at perihelion .",
              "5818,283",
              "48285,697",
              "An attempt was made by Donut Media to launch a Hot Wheels {b}Tesla{nb} Model X to the stratosphere using a weather balloon .",
              "6784,117",
              "51620,334",
              "The choice of the Roadster as a dummy payload was variously interpreted as marketing for {b}Tesla{nb}, a work of art, or a contribution to space debris .",
              "7603,146",
              "54301,199",
              "Thematically, it was a perfect fit\" to use the {b}Tesla{nb} car, and there was no reason not to take the opportunity to remind the auto industry that Musk was challenging the status quo in that arena, as well as in space.",
              "8075,214",
              "56026,214"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "14,5,294,5,1099,5,1427,5,1722,5,1870,5,5186,5,5848,5,6842,5,7692,5,8122,5,12323,5,14918,5,15051,5;16990,5,17667,5,19945,5,28866,5,29489,5,30105,5,46415,5,48315,5,51832,5,54390,5,56073,5,67335,5,265845,5,266063,5"
                  },
                  {
                      "partname": "tables",
                      "data": "15353,5,15463,5;465219,5,465331,5"
                  },
                  {
                      "partname": "title",
                      "data": "15926,5;465889,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Elon Musk's Tesla Roadster",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-02 01:29:49",
          "indexationtime": "2020-09-02 12:33:25",
          "version": "5N+Iw4WoelhffYl3TCmfFg==",
          "size": 464942,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Elon_Musk's_Tesla_Roadster",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              },
              {
                  "value": "DARREN MCKNIGHT",
                  "display": "Darren McKnight"
              },
              {
                  "value": "HUGH LEWIS",
                  "display": "Hugh Lewis"
              },
              {
                  "value": "TOMMY SANFORD",
                  "display": "Tommy Sanford"
              },
              {
                  "value": "WILLIAM CARROLL",
                  "display": "William Carroll"
              },
              {
                  "value": "ALICE GORMAN",
                  "display": "Alice Gorman"
              },
              {
                  "value": "DOUGLAS ADAMS",
                  "display": "Douglas Adams"
              },
              {
                  "value": "FELIX BAUMGARTNER",
                  "display": "Felix Baumgartner"
              },
              {
                  "value": "ISAAC ASIMOV",
                  "display": "Isaac Asimov"
              },
              {
                  "value": "LORI GARVER",
                  "display": "Lori Garver"
              },
              {
                  "value": "MARCEL DUCHAMP",
                  "display": "Marcel Duchamp"
              },
              {
                  "value": "ALEX HERN",
                  "display": "Alex Hern"
              }
          ],
          "company": [
              {
                  "value": "AIR FORCE",
                  "display": "Air Force"
              }
          ],
          "geo": [
              {
                  "value": "AUSTRALIA",
                  "display": "Australia"
              },
              {
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "FRANCE",
                  "display": "France"
              }
          ],
          "wordcount": 1803,
          "exacthash": "kvkhDPDEYm/Ksojq6ZWZlA==",
          "nearhash": "ECVxRzL8a9ij+JB8eDlReg==",
          "partnamelocations": [
              {
                  "value": "job",
                  "display": "job"
              },
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
                  "value": "title",
                  "display": "title"
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/Elon_Musk%27s_Tesla_Roadster",
          "sourcecsv1": [
              "Names",
              "Mission type",
              "Operator",
              "COSPAR ID",
              "SATCAT no.",
              "Spacecraft type",
              "Manufacturer",
              "Launch mass",
              "Launch date",
              "Rocket",
              "Launch site",
              "Reference system",
              "Eccentricity",
              "Perihelion altitude",
              "Aphelion altitude",
              "Inclination",
              "Period",
              "Epoch"
          ],
          "sourcecsv2": [
              "Tesla_Roadster_(2020)",
              "SpaceX",
              "International_Designator",
              "Satellite_Catalog_Number",
              "Tesla_Roadster_(2008)",
              "Mass_simulator",
              "Upper_stage",
              "Falcon_Heavy",
              "Tesla,_Inc.",
              "Falcon_Heavy_test_flight",
              "Kennedy_Space_Center",
              "Kennedy_Space_Center_Launch_Complex_39",
              "Heliocentric_orbit",
              "Orbital_eccentricity",
              "Apsis",
              "Astronomical_unit",
              "Kilometre",
              "Orbital_inclination",
              "Orbital_period",
              "Epoch_(astronomy)",
              "Dummy_payload",
              "Artificial_satellite",
              "Sun",
              "Space_suit",
              "Elon_Musk",
              "Commuting",
              "Production_car",
              "Escape_velocity",
              "Elliptic_orbit",
              "Mars",
              "Perihelion_and_aphelion",
              "Mission_control_center",
              "Live-streamed",
              "Brand_management",
              "Space_debris",
              "SpaceX_Mars_transportation_infrastructure",
              "Tesla_Model_S",
              "NASA",
              "Lunar_rovers",
              "Mars_rover",
              "SpaceX_spacesuit",
              "David_Bowie",
              "Starman_(song)",
              "Space_Oddity",
              "Douglas_Adams",
              "The_Hitchhiker%27s_Guide_to_the_Galaxy_(novel)",
              "Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Knowing_where_one&#39",
              "s_towel_is",
              "Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Don&#39",
              "t_Panic",
              "Hot_Wheels",
              "Foundation_series",
              "5D_optical_data_storage",
              "Arch_Mission_Foundation",
              "Aphelion",
              "Astronomical_units",
              "Office_of_Commercial_Space_Transportation",
              "Parking_orbit",
              "Van_Allen_radiation_belt",
              "United_States_Air_Force",
              "Geostationary_orbit",
              "Escape_trajectory",
              "Live_streaming",
              "Public_domain",
              "Flickr",
              "COSPAR_designation",
              "JPL_Horizons",
              "Ecliptic_plane",
              "Mars_flyby",
              "Areocentric_orbit",
              "DSCOVR",
              "Lagrangian_point",
              "Perihelion",
              "Mars_transfer_orbit",
              "Internet_meme",
              "Western_Australia_Police",
              "Radar_gun",
              "%C5%A0koda_Auto",
              "Parody",
              "%C5%A0koda_Superb",
              "Mars,_Loire",
              "Donut_Media",
              "Tesla_Model_X",
              "Weather_balloon",
              "Lada",
              "Dmitry_Rogozin",
              "High-altitude_platform_station",
              "Heavy_Metal_(film)",
              "Chevrolet_Corvette",
              "Felix_Baumgartner",
              "Red_Bull_Stratos",
              "Marketing",
              "Scientific_American",
              "Advertising_Age",
              "Business_Insider",
              "The_Guardian",
              "Nerd",
              "Lori_Garver",
              "Gimmick",
              "The_Verge",
              "Readymade",
              "Work_of_art",
              "Marcel_Duchamp",
              "Fountain_(Duchamp)",
              "Alice_Gorman",
              "Flinders_University",
              "Masculinity",
              "Talisman",
              "Commercial_Spaceflight_Federation",
              "Graveyard_orbit",
              "Outer_space",
              "University_of_Southampton",
              "Low_Earth_orbit",
              "The_Planetary_Society",
              "Planetary_protection",
              "Purdue_University",
              "Passivation_(spacecraft)",
              "Telemetry",
              "Dubbo",
              "Virtual_Telescope_Project",
              "Apparent_magnitude",
              "Pluto",
              "Charon_(moon)",
              "Asteroid_Terrestrial-impact_Last_Alert_System",
              "University_of_Hawaii",
              "Astrometry",
              "Arcsecond",
              "SeeSat-L",
              "Earth",
              "Venus",
              "Near-Earth_object",
              "Half-life",
              "Solar_irradiance",
              "Cosmic_radiation",
              "Micrometeoroid",
              "Carbon%E2%80%93carbon_bond",
              "Carbon_fiber_reinforced_polymer",
              "Meteoroids",
              "List_of_artificial_objects_in_heliocentric_orbit",
              "List_of_passive_satellites",
              "JPL_Horizons_On-Line_Ephemeris_System",
              "Tesla_Motors",
              "Martin_Eberhard",
              "J._B._Straubel",
              "Marc_Tarpenning",
              "Ian_Wright_(engineer)",
              "Twitter",
              "The_Brownsville_Herald",
              "Aviation_Week_%26_Space_Technology",
              "Forbes_(magazine)",
              "Instagram",
              "Orlando_Sentinel",
              "NASASpaceFlight.com",
              "Ars_Technica",
              "GeekWire",
              "Jonathan_McDowell",
              "Space.com",
              "Philippine_Daily_Inquirer",
              "RTL_Nieuws",
              "CFNY-FM",
              "The_Economist",
              "Evening_Standard",
              "The_Conversation_(website)",
              "Mashable",
              "Phys.org",
              "Gianluca_Masi",
              "ArXiv_(identifier)",
              "Bibcode_(identifier)",
              "Doi_(identifier)",
              "LiveScience",
              "YouTube",
              "Zip2",
              "X.com",
              "PayPal",
              "SolarCity",
              "OpenAI",
              "Neuralink",
              "The_Boring_Company",
              "Hyperloop",
              "Boring_Test_Tunnel",
              "Maye_Musk",
              "Justine_Musk",
              "Talulah_Riley",
              "Grimes_(musician)",
              "Kimbal_Musk",
              "Tosca_Musk",
              "Lyndon_Rive",
              "Elon_Musk:_Tesla,_SpaceX,_and_the_Quest_for_a_Fantastic_Future",
              "The_Musk_Who_Fell_to_Earth",
              "One_Crew_over_the_Crewcoo%27s_Morty",
              "Tesla_Model_3",
              "Tesla_Model_Y",
              "Tesla_Cybertruck",
              "Tesla_Cyberquad",
              "Tesla_Semi",
              "Mercedes_A-Class_E-Cell",
              "Mercedes-Benz_B-Class_Electric_Drive",
              "Smart_electric_drive",
              "Toyota_RAV4_EV",
              "Tesla_Autopilot",
              "Tesla_Solar_Roof",
              "Tesla_Powerwall",
              "Tesla_Powerpack",
              "Tesla_Megapack",
              "Robyn_Denholm",
              "Zach_Kirkhorn",
              "Drew_Baglino",
              "Franz_von_Holzhausen",
              "Jerome_Guillen",
              "Larry_Ellison",
              "Hiromichi_Mizuno",
              "Andrej_Karpathy",
              "Kathleen_Wilson-Thompson",
              "Deepak_Ahuja",
              "Ze%27ev_Drori",
              "Arnnon_Geshuri",
              "Jim_Keller_(engineer)",
              "Chris_Lattner",
              "Jay_Vijayan",
              "Tesla_Factory",
              "Tesla_facilities_in_Tilburg",
              "Giga_Nevada",
              "Giga_New_York",
              "Giga_Shanghai",
              "Giga_Berlin",
              "Gigafactory_5",
              "Tesla_Supercharger",
              "Lawsuits_and_Controversies_of_Tesla,_Inc.",
              "Tesla_US_dealership_disputes",
              "Sudden_unintended_acceleration#Tesla&#39",
              "s_Model_X,_S_and_3",
              "TSLAQ",
              "History_of_Tesla,_Inc.",
              "Giga_Press",
              "Hornsdale_Power_Reserve",
              "Maxwell_Technologies",
              "List_of_missions_to_Mars",
              "List_of_Mars_orbiters",
              "List_of_artificial_objects_on_Mars",
              "2001_Mars_Odyssey",
              "Mars_Express",
              "Mars_Reconnaissance_Orbiter",
              "Mars_Orbiter_Mission",
              "MAVEN",
              "ExoMars_Trace_Gas_Orbiter",
              "Emirates_Mars_Mission",
              "Mars_landing",
              "InSight",
              "Mars_Science_Laboratory",
              "Curiosity_(rover)",
              "Tianwen-1",
              "Perseverance_(rover)",
              "Mars_2020",
              "Mars_aircraft",
              "Mars_Helicopter_Ingenuity",
              "Mars_1",
              "Mariner_4",
              "Zond_2",
              "Mariner_6_and_7",
              "Mars_6",
              "Mars_7",
              "Rosetta_(spacecraft)",
              "Dawn_(spacecraft)",
              "Mars_Cube_One",
              "Mars_2",
              "Mars_3",
              "Mariner_9",
              "Mars_4",
              "Mars_5",
              "Viking_program",
              "Viking_1",
              "Viking_2",
              "Phobos_program",
              "Phobos_1",
              "Phobos_2",
              "Mars_Observer",
              "Mars_Global_Surveyor",
              "Nozomi_(spacecraft)",
              "Mars_Climate_Orbiter",
              "Mars_Pathfinder",
              "Mars_Polar_Lander",
              "Deep_Space_2",
              "Beagle_2",
              "Phoenix_(spacecraft)",
              "Schiaparelli_EDM",
              "Prop-M",
              "Sojourner_(rover)",
              "Mars_Exploration_Rover",
              "Spirit_(rover)",
              "Opportunity_(rover)",
              "Mars_1M_No.1",
              "Mars_1M_No.2",
              "Mars_2MV-4_No.1",
              "Mars_2MV-3_No.1",
              "Mariner_3",
              "Mars_2M_No.521",
              "Mars_2M_No.522",
              "Mariner_8",
              "Kosmos_419",
              "Mars_96",
              "Fobos-Grunt",
              "Yinghuo-1",
              "ExoMars_2022",
              "Rosalind_Franklin_(rover)",
              "Kazachok",
              "Psyche_(spacecraft)",
              "Jupiter_Icy_Moons_Explorer",
              "Tera-hertz_Explorer",
              "Mars_Orbiter_Mission_2",
              "Martian_Moons_Exploration",
              "Biological_Oxidant_and_Life_Detection",
              "DePhine",
              "Icebreaker_Life",
              "Mars_Geyser_Hopper",
              "Mars-Grunt",
              "Mars_Micro_Orbiter",
              "MELOS",
              "Mars_MetNet",
              "Next_Mars_Orbiter",
              "Phobos_And_Deimos_%26_Mars_Environment",
              "Phootprint",
              "Sky-Sailor",
              "Mars_Exploration_Ice_Mapper",
              "Aerial_Regional-scale_Environmental_Survey",
              "Astrobiology_Field_Laboratory",
              "Beagle_3",
              "Mars_4NM",
              "Mars_5M",
              "Mars-Aster",
              "Mars_Astrobiology_Explorer-Cacher",
              "Mars_One",
              "Mars_Surveyor_2001_Lander",
              "Mars_Telecommunications_Orbiter",
              "NetLander",
              "Northern_Light_(spacecraft)",
              "SpaceX_Red_Dragon",
              "Sample_Collection_for_Investigation_of_Mars",
              "Vesta_(spacecraft)",
              "Voyager_program_(Mars)",
              "Exploration_of_Mars",
              "Mars_sample-return_mission",
              "Human_mission_to_Mars",
              "Mars_to_Stay",
              "Colonization_of_Mars",
              "Terraforming_of_Mars",
              "Mars_Scout_Program",
              "Mars_Exploration_Program",
              "Mars_Exploration_Joint_Initiative",
              "Mars_Next_Generation",
              "The_Mars_Project",
              "The_Case_for_Mars",
              "Inspiration_Mars_Foundation",
              "Mars_Institute",
              "Mars_Society",
              "Mars_race",
              "SpaceX_launch_vehicles",
              "Falcon_1",
              "Falcon_9",
              "Falcon_9_v1.0",
              "Falcon_9_v1.1",
              "Falcon_9_Full_Thrust",
              "Falcon_9_Block_5",
              "FalconSAT-2",
              "Trailblazer_(satellite)",
              "PRESat",
              "NanoSail-D",
              "Celestis",
              "Ratsat",
              "RazakSAT",
              "List_of_Falcon_9_and_Falcon_Heavy_launches",
              "Dragon_Spacecraft_Qualification_Unit",
              "SpaceX_COTS_Demo_Flight_1",
              "SpaceX_COTS_Demo_Flight_2",
              "Crew_Dragon_Pad_Abort_Test",
              "Crew_Dragon_Demo-1",
              "Crew_Dragon_In-Flight_Abort_Test",
              "Crew_Dragon_Demo-2",
              "ISS",
              "SpaceX_CRS-1",
              "SpaceX_CRS-2",
              "SpaceX_CRS-3",
              "SpaceX_CRS-4",
              "SpaceX_CRS-5",
              "SpaceX_CRS-6",
              "SpaceX_CRS-7",
              "SpaceX_CRS-8",
              "SpaceX_CRS-9",
              "SpaceX_CRS-10",
              "SpaceX_CRS-11",
              "SpaceX_CRS-12",
              "SpaceX_CRS-13",
              "SpaceX_CRS-14",
              "SpaceX_CRS-15",
              "SpaceX_CRS-16",
              "SpaceX_CRS-17",
              "SpaceX_CRS-18",
              "SpaceX_CRS-19",
              "SpaceX_CRS-20",
              "SpaceX_CRS-21",
              "SpaceX_CRS-22",
              "SpaceX_Crew-1",
              "SpaceX_Crew-2",
              "SpaceX_Axiom_Space_1",
              "Bigelow_Aerospace",
              "USCV-3",
              "Space_Adventures_Crew_Dragon_mission",
              "SES-8",
              "Thaicom_6",
              "Falcon_9_flight_10",
              "AsiaSat_8",
              "AsiaSat_6",
              "ABS-3A",
              "Eutelsat_115_West_B",
              "Falcon_9_flight_20",
              "SES-9",
              "JCSAT-14",
              "Thaicom_8",
              "ABS-2A",
              "Eutelsat_117_West_B",
              "JCSAT-16",
              "Amos-6",
              "Iridium_NEXT",
              "EchoStar_23",
              "SES-10",
              "Inmarsat-5_F4",
              "BulgariaSat-1",
              "Intelsat_35e",
              "SES-11",
              "Koreasat_5A",
              "Hispasat_30W-6",
              "Bangabandhu-1",
              "SES-12",
              "Telstar_19V",
              "Telkom_4",
              "Telstar_18V",
              "Es%27hail_2",
              "SSO-A",
              "Nusantara_Satu",
              "Beresheet",
              "Amos_17",
              "JCSAT",
              "Sirius_XM_Holdings",
              "T%C3%BCrksat_5A",
              "CASSIOPE",
              "Deep_Space_Climate_Observatory",
              "Jason-3",
              "Formosat-5",
              "Transiting_Exoplanet_Survey_Satellite",
              "GRACE-FO",
              "SAOCOM",
              "RADARSAT_Constellation",
              "Hakuto",
              "Jason-CS",
              "Korea_Pathfinder_Lunar_Orbiter",
              "Double_Asteroid_Redirection_Test",
              "NROL",
              "X-37B",
              "Zuma_(satellite)",
              "SES-16",
              "Paz_(satellite)",
              "GPS_IIIA",
              "ANASIS-II",
              "SARah",
              "Starlink",
              "Arabsat-6A",
              "Space_Test_Program",
              "Demonstration_and_Science_Experiments",
              "COSMIC-2",
              "LightSail_2",
              "Green_Propellant_Infusion_Mission",
              "Deep_Space_Atomic_Clock",
              "Innovative_Space-based_Radar_Antenna_Technology",
              "AFSPC",
              "ViaSat-3",
              "2017_in_spaceflight",
              "2018_in_spaceflight",
              "2019_in_spaceflight",
              "BeiDou",
              "List_of_BeiDou_satellites",
              "Cartosat-2F",
              "Microsat_(ISRO)",
              "PicSat",
              "Iceye",
              "Fox-1D",
              "USA-282",
              "SBIRS",
              "Electron_(rocket)",
              "Dove_(satellite)",
              "Lemur-2",
              "Humanity_Star",
              "Yaogan",
              "SES-14",
              "Al_Yah_3",
              "S-Net",
              "CSES_Mission",
              "%C3%91uSat",
              "TRICOM-1R",
              "Progress_MS-08",
              "Tintin_(satellite)",
              "Information_Gathering_Satellite",
              "GOES-17",
              "O3b_(satellite)",
              "Soyuz_MS-08",
              "GSAT-6A",
              "1KUNS-PF",
              "Iraz%C3%BA_(satellite)",
              "UBAKUSAT",
              "Superbird-B3",
              "HYLAS-4",
              "IRNSS-1I",
              "Blagovest_(satellite)",
              "Sentinel-3B",
              "Apstar_6C",
              "Cygnus_CRS_OA-9E",
              "Soyuz_MS-09",
              "GLONASS-M",
              "List_of_GLONASS_satellites",
              "Kosmos_2527",
              "BHUTAN-1",
              "Maya-1",
              "UiTMSAT-1",
              "Pakistan_Remote_Sensing_Satellite",
              "PakTES-1A",
              "Progress_MS-09",
              "Galileo_(satellite_navigation)",
              "List_of_Galileo_satellites",
              "Gaofen",
              "Merah_Putih_(satellite)",
              "Parker_Solar_Probe",
              "ADM-Aeolus",
              "HY_(satellite)",
              "ICESat-2",
              "Surrey_Satellite_Technology",
              "Kounotori_7",
              "Azerspace-2",
              "Intelsat_38",
              "Horizons-3e",
              "SAOCOM_1A",
              "Soyuz_MS-10",
              "AEHF-4",
              "BepiColombo",
              "GOSAT-2",
              "KhalifaSat",
              "Diwata-2",
              "MetOp",
              "IRVINE01",
              "GSAT-29",
              "Progress_MS-10",
              "Cygnus_NG-10",
              "HySIS",
              "Strela-3M",
              "Soyuz_MS-11",
              "EuCROPIS",
              "European_Student_Earth_Orbiter",
              "IRVINE02",
              "Orbital_Reflector",
              "GSAT-11",
              "Chang%27e_4",
              "Yutu-2",
              "Repair_Satellite_Prototype",
              "CubeSail_(UltraSail)",
              "GSAT-7A",
              "Composante_Spatiale_Optique",
              "Blagovest",
              "USA-289",
              "Flock_(satellite)",
              "CubeSat"
          ],
          "sourcestr1": "Elon_Musk%27s_Tesla_Roadster",
          "sourcestr2": "Q46845259",
          "sourcestr3": "Q210893",
          "category": "Tesla Roadster (2008)",
          "sourcevarchar3": "[{\"Names\":[\"SpaceX Roadster\",\"Starman\"],\"Mission type\":\"Test flight\",\"Operator\":\"SpaceX\",\"COSPAR ID\":\"2018-017A\",\"SATCAT no.\":\"43205\",\"Spacecraft properties\":\"\",\"Spacecraft type\":[\"2008 Tesla Roadster\",\"used as a\",\"mass simulator\",\", attached to the\",\"upper stage\",\"of a\",\"Falcon Heavy\",\"rocket\"],\"Manufacturer\":[\"Tesla\",\"and SpaceX\"],\"Launch mass\":[\"~1,300kg (2,900lb);\",\"~6,000kg (13,000lb) including rocket upper stage\"],\"Start of mission\":\"\",\"Launch date\":\"20:45:00,February6,2018(UTC)\",\"Rocket\":[\"Falcon Heavy\",\"FH-001\"],\"Launch site\":[\"Kennedy\",\"LC-39A\"],\"Orbital parameters\":\"\",\"Reference system\":\"Heliocentric\",\"Eccentricity\":\"0.25571\",\"Perihelion altitude\":[\"0.98613\",\"au\",\"(147,523,000\",\"km\"],\"Aphelion altitude\":\"1.6637au (248,890,000km)\",\"Inclination\":\"1.077\\u00b0\",\"Period\":\"1.525 year\",\"Epoch\":\"1 May 2018\"}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Elon_Musk%27s_Tesla_Roadster_%2840110297852%29.jpg/1200px-Elon_Musk%27s_Tesla_Roadster_%2840110297852%29.jpg",
          "sourcedouble1": 0.011764,
          "entity1": [
              {
                  "value": "1",
                  "display": "1"
              },
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "6",
                  "display": "6"
              },
              {
                  "value": "2017",
                  "display": "2017"
              },
              {
                  "value": "4",
                  "display": "4"
              },
              {
                  "value": "1.66",
                  "display": "1.66"
              },
              {
                  "value": "2",
                  "display": "2"
              },
              {
                  "value": "43205",
                  "display": "43205"
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
                  "value": "147523000",
                  "display": "147523000"
              },
              {
                  "value": "20000000",
                  "display": "20000000"
              },
              {
                  "value": "4300000",
                  "display": "4300000"
              },
              {
                  "value": "6900000",
                  "display": "6900000"
              },
              {
                  "value": "0.0060",
                  "display": "0.0060"
              },
              {
                  "value": "0.25571",
                  "display": "0.25571"
              },
              {
                  "value": "0.43",
                  "display": "0.43"
              },
              {
                  "value": "0.98613",
                  "display": "0.98613"
              },
              {
                  "value": "1.077",
                  "display": "1.077"
              },
              {
                  "value": "1.4",
                  "display": "1.4"
              }
          ],
          "date": [
              {
                  "value": "2018-02-08",
                  "display": "2018-02-08"
              },
              {
                  "value": "2018-02-11",
                  "display": "2018-02-11"
              },
              {
                  "value": "2018-05-01",
                  "display": "2018-05-01"
              },
              {
                  "value": "2018-02-02",
                  "display": "2018-02-02"
              },
              {
                  "value": "2018-11-09",
                  "display": "2018-11-09"
              }
          ],
          "entity3": [
              {
                  "value": "16:29",
                  "display": "16:29"
              },
              {
                  "value": "12:48",
                  "display": "12:48"
              },
              {
                  "value": "15:45",
                  "display": "15:45"
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
                  "value": "FOUNDER",
                  "display": "Founder"
              }
          ],
          "entity14": [
              {
                  "value": "BONDS",
                  "display": "Bonds"
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
          "person_cooc": [
              {
                  "value": "(DIRECTOR)#(TOMMY SANFORD)",
                  "display": "(Director)#(Tommy Sanford)"
              },
              {
                  "value": "(DIRECTOR)#(LORI GARVER)",
                  "display": "(Director)#(Lori Garver)"
              },
              {
                  "value": "(FOUNDER)#(ELON MUSK)",
                  "display": "(Founder)#(Elon Musk)"
              }
          ],
          "company_person": [
              {
                  "value": "(AIR FORCE)#(LORI GARVER)",
                  "display": "(Air Force)#(Lori Garver)"
              }
          ],
          "person_job_company": [
              {
                  "value": "(LORI GARVER)#(DIRECTOR)#(AIR FORCE)",
                  "display": "(Lori Garver)#(Director)#(Air Force)"
              },
              {
                  "value": "(LORI GARVER)#(VICE-PRESIDENT)#(AIR FORCE)",
                  "display": "(Lori Garver)#(Vice-President)#(Air Force)"
              }
          ],
          "rank": 10,
          "displayTitle": "Elon Musk&#39;s <span class=\"match-highlight\">Tesla</span> Roadster",
          "relevantExtracts": "Elon Musk&#39;s <b>Tesla </b>Roadster is ... are products of <b>Tesla </b>and SpaceX ... to launch a <b>Tesla </b>... Musk&#39;s <b>Tesla </b>Roadster parked ... thing be a <b>Tesla </b>Model S ... personal &quot;midnight cherry <b>Tesla </b>... after launch, the <b>Tesla </b>had ... a Hot Wheels <b>Tesla </b>Model ... as marketing for <b>Tesla</b>, ... to use the <b>Tesla </b>car, "
      },
      {
          "id": "/Web/Wikipedia/|Tesla_(microarchitecture)",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.959101,
          "matchingpartnames": [
              "text",
              "title"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "{b}Tesla{nb} is the codename for a GPU microarchitecture developed by Nvidia , and released in 2006, as the successor to their prior microarchitectures.",
              "2,145",
              "8745,254",
              "It was named after the pioneering electrical engineer Nikola {b}Tesla{nb} .",
              "148,68",
              "9000,121",
              "It was also in the GeForce 405 and in the Quadro FX, Quadro x000, Quadro NVS series, and Nvidia {b}Tesla{nb} computing modules.",
              "479,120",
              "9827,336",
              "{b}Tesla{nb} replaced the old fixed-pipeline microarchitectures, represented at the time of introduction by the GeForce 7 series .",
              "601,123",
              "10171,254",
              "{b}Tesla{nb} was followed by Fermi .",
              "887,29",
              "10721,108",
              "{b}Tesla{nb} is Nvidia's first microarchitecture implementing the unified shader model .",
              "928,81",
              "16210,150",
              "The claimed theoretical single-precision processing power for {b}Tesla{nb}-based cards given in FLOPS may be hard to reach in real-world workloads.",
              "3678,140",
              "21711,180",
              "The theoretical double-precision processing power of a {b}Tesla{nb} GPU is 1/8 of the single precision performance on GT200",
              "5611,117",
              "24932,117",
              "{b}Tesla{nb} 1.0",
              "5880,9",
              "27751,9",
              "{b}Tesla{nb} 2.0",
              "5917,9",
              "28238,9"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "2,5,209,5,575,5,601,5,887,5,928,5,3740,5,5666,5,5880,5,5917,5;8745,5,9111,5,10135,5,10171,5,10721,5,16210,5,21773,5,24987,5,27751,5,28238,5"
                  },
                  {
                      "partname": "title",
                      "data": "6125,5;103952,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Tesla (microarchitecture)",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-01 21:37:29",
          "indexationtime": "2020-09-02 12:17:14",
          "version": "tHs94MIvIWuGNzShRaM5+g==",
          "size": 103628,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Tesla_(microarchitecture)",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "NIKOLA TESLA",
                  "display": "Nikola Tesla"
              }
          ],
          "company": [
              {
                  "value": "NVIDIA",
                  "display": "NVIDIA"
              }
          ],
          "wordcount": 739,
          "exacthash": "xbHWOts6CVV0dw9PtH+sVg==",
          "nearhash": "rwaE3zqZrMBFIujDu/wGZg==",
          "partnamelocations": [
              {
                  "value": "tables",
                  "display": "tables"
              },
              {
                  "value": "title",
                  "display": "title"
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/Tesla_(microarchitecture)",
          "sourcecsv1": [
              "Release date",
              "Fabrication process",
              "Predecessor",
              "Successor"
          ],
          "sourcecsv2": [
              "Nvidia_Tesla",
              "GeForce_7_series",
              "Fermi_(microarchitecture)",
              "Microarchitecture",
              "Nvidia",
              "Nikola_Tesla",
              "GeForce_8_Series",
              "GeForce_9_Series",
              "GeForce_100_Series",
              "GeForce_200_Series",
              "GeForce_300_Series",
              "GeForce_400_Series",
              "Nvidia_Quadro",
              "Pipeline_(computing)",
              "TeraScale_(microarchitecture)",
              "Xbox_360",
              "Unified_shader_model",
              "Direct3D",
              "OpenGL",
              "Floating_point",
              "Stream_processing",
              "Vector_processor",
              "Scalar_processor",
              "GeForce_7_Series",
              "Texture_filtering",
              "Anisotropic_filtering",
              "Trilinear_filtering",
              "Spatial_anti-aliasing",
              "Render_output_unit",
              "Multisample_anti-aliasing",
              "High_dynamic_range_rendering",
              "FLOPS",
              "CUDA",
              "GigaFLOPS",
              "Nvidia_NVDEC",
              "Nvidia_NVENC",
              "Wayback_Machine",
              "AnandTech",
              "GeForce",
              "List_of_Nvidia_graphics_processing_units",
              "List_of_Nvidia_graphics_processing_units#Pre-GeForce",
              "NV1",
              "NV2",
              "RIVA_128",
              "RIVA_TNT",
              "RIVA_TNT2",
              "GeForce_256",
              "GeForce_2_series",
              "GeForce_4_series",
              "Vertex_shader",
              "Pixel_shader",
              "GeForce_3_series",
              "GeForce_FX_series",
              "GeForce_6_series",
              "Unified_Shader_Model",
              "GeForce_8_series",
              "GeForce_9_series",
              "GeForce_100_series",
              "GeForce_200_series",
              "GeForce_300_series",
              "GeForce_400_series",
              "GeForce_500_series",
              "Non-uniform_memory_access",
              "GeForce_600_series",
              "GeForce_700_series",
              "GeForce_800M_series",
              "GeForce_900_series",
              "GeForce_10_series",
              "GeForce_16_series",
              "Ray_tracing_(graphics)",
              "GeForce_20_series",
              "GeForce_30_series",
              "Nvidia_PureVideo",
              "Cg_(programming_language)",
              "Gelato_(software)",
              "Nvidia_GameWorks",
              "OptiX",
              "PhysX",
              "Nvidia_RTX",
              "Nvidia_System_Tools",
              "VDPAU",
              "Nvidia_3D_Vision",
              "Nvidia_G-Sync",
              "Nvidia_Optimus",
              "Nvidia_Surround",
              "NVLink",
              "Scalable_Link_Interface",
              "TurboCache",
              "Kepler_(microarchitecture)",
              "Maxwell_(microarchitecture)",
              "Pascal_(microarchitecture)",
              "Volta_(microarchitecture)",
              "Turing_(microarchitecture)",
              "Ampere_(microarchitecture)",
              "Hopper_(microarchitecture)",
              "Quadro",
              "Nvidia_Quadro_Plex",
              "General-purpose_computing_on_graphics_processing_units",
              "Nvidia_DGX",
              "Video_game_console",
              "Xbox_(console)",
              "RSX_Reality_Synthesizer",
              "PlayStation_3",
              "Tegra",
              "Nintendo_Switch",
              "Shield_Portable",
              "Shield_Tablet",
              "Shield_Android_TV",
              "GeForce_Now",
              "System_on_a_chip",
              "GoForce",
              "Nvidia_Drive",
              "Nvidia_Jetson",
              "Central_processing_unit",
              "Project_Denver",
              "Chipset",
              "Comparison_of_Nvidia_chipsets",
              "Jen-Hsun_Huang",
              "Chris_Malachowsky",
              "Curtis_Priem",
              "David_Kirk_(scientist)",
              "Bill_Dally",
              "3dfx_Interactive",
              "Ageia",
              "Acer_Laboratories_Incorporated",
              "Icera",
              "Mellanox_Technologies",
              "Mental_Images",
              "PortalPlayer"
          ],
          "sourcestr1": "Tesla_(microarchitecture)",
          "sourcestr2": "Q1050485",
          "sourcestr3": "Q259864",
          "category": "microarchitecture",
          "sourcevarchar3": "[{\"Release date\":\"November 2006\",\"Fabrication process\":\"90 nm, 80 nm, 65 nm, 55 nm, and 40 nm\",\"History\":\"\",\"Predecessor\":\"G70\",\"Successor\":\"Fermi\"}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/NvidiaTesla.jpg/1200px-NvidiaTesla.jpg",
          "sourcedouble1": 0.015249,
          "entity1": [
              {
                  "value": "8",
                  "display": "8"
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
                  "value": "8800",
                  "display": "8800"
              },
              {
                  "value": "7",
                  "display": "7"
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
                  "value": "40",
                  "display": "40"
              },
              {
                  "value": "55",
                  "display": "55"
              },
              {
                  "value": "65",
                  "display": "65"
              },
              {
                  "value": "80",
                  "display": "80"
              },
              {
                  "value": "90",
                  "display": "90"
              },
              {
                  "value": "2006",
                  "display": "2006"
              },
              {
                  "value": "1.0",
                  "display": "1.0"
              },
              {
                  "value": "1.35",
                  "display": "1.35"
              },
              {
                  "value": "10",
                  "display": "10"
              },
              {
                  "value": "128",
                  "display": "128"
              },
              {
                  "value": "16",
                  "display": "16"
              },
              {
                  "value": "2.0",
                  "display": "2.0"
              },
              {
                  "value": "2.1",
                  "display": "2.1"
              }
          ],
          "money": [
              {
                  "value": "MAD 1",
                  "display": "MAD 1"
              }
          ],
          "rank": 11,
          "displayTitle": "<span class=\"match-highlight\">Tesla</span> (microarchitecture)",
          "relevantExtracts": "<b>Tesla </b>is the codename ... It was named ... electrical engineer Nikola <b>Tesla </b>... It was ... series, and Nvidia <b>Tesla </b>... <b>Tesla </b>replaced the old ... <b>Tesla </b>was ... <b>Tesla </b>is Nvidia&#39;s first ... The claimed ... processing power for <b>Tesla</b>-based cards given ... The theoretical ... power of a <b>Tesla </b>GPU is 1/8 ... <b>Tesla </b>... <b>Tesla </b>"
      },
      {
          "id": "/Web/Wikipedia/|Electric_car",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.956203,
          "matchingpartnames": [
              "text"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "{b}Tesla{nb} Model 3",
              "85,13",
              "14036,13",
              "The {b}Tesla{nb} Model 3 was the world's best selling EV from 2018 to 2019 and had a maximum electric range of 500 km (310 miles) according to the EPA .",
              "1273,145",
              "27827,325",
              "The {b}Tesla{nb} Roadster helped inspire the modern generation of electric vehicles.",
              "3838,77",
              "60396,149",
              "{b}Tesla{nb} global sales passed 250,000 units in September 2017.",
              "9657,58",
              "75547,58",
              "{b}Tesla{nb} sold its 200,000th Model S in the fourth quarter of 2017.",
              "9829,63",
              "76266,63",
              "{b}Tesla{nb} delivered its 100,000th Model 3 in October 2018.",
              "10022,54",
              "76737,110",
              "As of June 2019 , the Nissan Leaf listed as the best-selling highway-capable electric car ever with more than 400,000 units sold worldwide, followed by the {b}Tesla{nb} Model S with 263,500 units as of December 2018 .",
              "10459,210",
              "77885,945",
              "In July 2019, US-based Motor Trend magazine awarded the fully electric {b}Tesla{nb} Model S as the \"ultimate car of the year\".",
              "10770,119",
              "80124,178",
              "As of March 2020 , the {b}Tesla{nb} Model 3 is the world's all-time best-selling electric car, with more than 500,000 units delivered.",
              "10891,127",
              "80427,428",
              "The 2008 {b}Tesla{nb} Roadster 2.5 Sport can accelerate from 0 to 97 km/h (0 to 60 mph) in 3.7 seconds with a motor rated at 215 kW (288 hp).",
              "17113,134",
              "105096,159"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "85,5,1277,5,3842,5,8865,12,8929,5,9657,5,9829,5,10022,5,10615,5,10841,5,10914,5,17122,5,17248,5,17657,5,17683,5,19319,5,19564,5,20138,5,20940,5,23288,12,25542,5,28040,5,29849,5,31566,5,31948,12,33456,5,33598,5,33754,5,34070,5,34214,5,36404,5,36508,5,36760,5,36931,5,37198,5;14036,5,27883,5,60468,5,73930,12,74066,5,75547,5,76266,5,76737,5,78527,5,80254,5,80747,5,105105,5,105376,5,106434,5,106528,5,112038,5,112289,5,114769,5,117612,5,122835,12,132289,5,139219,5,145126,5,152301,5,153055,12,160233,5,160921,5,161343,5,162941,5,163229,5,169784,5,171094,5,174126,5,175948,5,176374,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Electric car",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-30 15:13:04",
          "indexationtime": "2020-09-01 23:44:23",
          "version": "Ra1P5H2CiQ4SbYxt0yu8Lw==",
          "size": 1007340,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Electric_car",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "GUSTAVE TROUVE",
                  "display": "Gustave Trouvé"
              },
              {
                  "value": "THOMAS PARKER",
                  "display": "Thomas Parker"
              },
              {
                  "value": "GARY L. BRASE",
                  "display": "Gary L. Brase"
              },
              {
                  "value": "MATTHEW DEBORD",
                  "display": "Matthew Debord"
              },
              {
                  "value": "RENAULT TWIZY",
                  "display": "Renault Twizy"
              },
              {
                  "value": "SUBARU FORESTER",
                  "display": "Subaru Forester"
              },
              {
                  "value": "AKIRA YOSHINO",
                  "display": "Akira Yoshino"
              },
              {
                  "value": "ANDREAS FLOCKEN",
                  "display": "Andreas Flocken"
              },
              {
                  "value": "CAMILLE FAURE",
                  "display": "Camille Faure"
              },
              {
                  "value": "CAMILLE JENATZY",
                  "display": "Camille Jenatzy"
              },
              {
                  "value": "CHRISTOPHER BECKER",
                  "display": "Christopher Becker"
              },
              {
                  "value": "FEDERICO FAGGIN",
                  "display": "Federico Faggin"
              },
              {
                  "value": "GASTON PLANTE",
                  "display": "Gaston Planté"
              },
              {
                  "value": "JOHN GOODENOUGH",
                  "display": "John Goodenough"
              },
              {
                  "value": "MASATOSHI SHIMA",
                  "display": "Masatoshi Shima"
              },
              {
                  "value": "MOHAMED M. ATALLA",
                  "display": "Mohamed M. Atalla"
              },
              {
                  "value": "RACHID YAZAMI",
                  "display": "Rachid Yazami"
              },
              {
                  "value": "ROBERT ANDERSON",
                  "display": "Robert Anderson"
              },
              {
                  "value": "STANLEY MAZOR",
                  "display": "Stanley Mazor"
              },
              {
                  "value": "THOMAS DAVENPORT",
                  "display": "Thomas Davenport"
              }
          ],
          "company": [
              {
                  "value": "NISSAN",
                  "display": "Nissan"
              },
              {
                  "value": "RENAULT",
                  "display": "Renault"
              },
              {
                  "value": "MITSUBISHI",
                  "display": "Mitsubishi"
              },
              {
                  "value": "VOLKSWAGEN",
                  "display": "Volkswagen"
              },
              {
                  "value": "GENERAL MOTORS",
                  "display": "General Motors"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "CITROEN",
                  "display": "Citroën"
              },
              {
                  "value": "TEJON RANCH",
                  "display": "Tejon Ranch"
              },
              {
                  "value": "ACEA",
                  "display": "Acea"
              },
              {
                  "value": "BLOOMBERG",
                  "display": "Bloomberg"
              },
              {
                  "value": "BMW",
                  "display": "BMW"
              },
              {
                  "value": "MERCEDES",
                  "display": "Mercedes"
              },
              {
                  "value": "PETROBRAS",
                  "display": "Petrobras"
              },
              {
                  "value": "PORSCHE",
                  "display": "Porsche"
              },
              {
                  "value": "QUALCOMM",
                  "display": "QUALCOMM"
              },
              {
                  "value": "REUTERS",
                  "display": "Reuters"
              },
              {
                  "value": "SAIC",
                  "display": "SAIC"
              },
              {
                  "value": "ALTRA",
                  "display": "Altra"
              },
              {
                  "value": "FORD",
                  "display": "Ford"
              },
              {
                  "value": "HITACHI",
                  "display": "Hitachi"
              }
          ],
          "geo": [
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "CHINA",
                  "display": "China"
              },
              {
                  "value": "TOYOTA",
                  "display": "Toyota"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "NORWAY",
                  "display": "Norway"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "EUROPE",
                  "display": "Europe"
              },
              {
                  "value": "FRANCE",
                  "display": "France"
              },
              {
                  "value": "UNITED KINGDOM",
                  "display": "United Kingdom"
              },
              {
                  "value": "GERMANY",
                  "display": "Germany"
              },
              {
                  "value": "EUROPEAN UNION",
                  "display": "European Union"
              },
              {
                  "value": "WASHINGTON",
                  "display": "Washington"
              },
              {
                  "value": "NETHERLANDS",
                  "display": "Netherlands"
              },
              {
                  "value": "CANADA",
                  "display": "Canada"
              },
              {
                  "value": "DENMARK",
                  "display": "Denmark"
              },
              {
                  "value": "HAWAII",
                  "display": "Hawaii"
              },
              {
                  "value": "INDIA",
                  "display": "India"
              },
              {
                  "value": "OSLO",
                  "display": "Oslo"
              },
              {
                  "value": "UK",
                  "display": "UK"
              },
              {
                  "value": "LONDON",
                  "display": "London"
              }
          ],
          "wordcount": 5435,
          "exacthash": "J39i7bqtpB0WbbH7+9vzTA==",
          "nearhash": "9YunCFyIW7tN1tmKj4UVew==",
          "partnamelocations": [
              {
                  "value": "value",
                  "display": "value"
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
          "url1": "https://en.wikipedia.org/wiki/Electric_car",
          "sourcecsv2": [
              "Electric_vehicles",
              "Plug-in",
              "Hybrid_electric_vehicle",
              "Fuel_cell_vehicle",
              "Nissan_Leaf",
              "Renault_Zoe",
              "BMW_i3",
              "Tesla_Model_3",
              "Jaguar_I-Pace",
              "Sustainable_energy",
              "Carbon-neutral_fuel",
              "Fossil_fuel_phase-out",
              "Energy_conservation",
              "Cogeneration",
              "Efficient_energy_use",
              "Energy_storage",
              "Green_building",
              "Geothermal_heat_pump",
              "Low-carbon_power",
              "Microgeneration",
              "Passive_solar_building_design",
              "Renewable_energy",
              "Biofuel",
              "Geothermal_power",
              "Hydroelectricity",
              "Solar_energy",
              "Tidal_power",
              "Wave_power",
              "Wind_power",
              "Sustainable_transport",
              "Electric_vehicle",
              "Green_vehicle",
              "Plug-in_hybrid",
              "Automobile",
              "Electric_motor",
              "Electric-vehicle_battery",
              "Electric_starter",
              "Mass_production",
              "Petrol",
              "Diesel_fuel",
              "Electric_drive_vehicle",
              "Greenhouse_gas_emissions",
              "Air_quality",
              "Charging_station",
              "Government_incentives_for_plug-in_electric_vehicles",
              "Internal_combustion_engine",
              "Exhaust_gas",
              "Vehicle_emissions",
              "United_States_Environmental_Protection_Agency",
              "Plug-in_electric_vehicle",
              "Battery_electric_vehicle",
              "Plug-in_hybrid_electric_vehicles",
              "NASA",
              "Lunar_Roving_Vehicle",
              "Automobiles",
              "Motorised_quadricycle",
              "Microcar",
              "City_car",
              "Solar_panel",
              "Solar_car",
              "Hybrid_car",
              "History_of_the_electric_vehicle",
              "Gustave_Trouv%C3%A9",
              "Thomas_Parker_(inventor)",
              "La_Jamais_Contente",
              "General_Motors_EV1",
              "California_Air_Resources_Board",
              "Nickel%E2%80%93metal_hydride_battery",
              "Tesla_Roadster_(2008)",
              "%C3%81nyos_Jedlik",
              "Robert_Anderson_(inventor)",
              "Battery_(electricity)",
              "Vermont",
              "Blacksmith",
              "Thomas_Davenport_(inventor)",
              "Groningen_(city)",
              "Primary_cell",
              "Gaston_Plant%C3%A9",
              "1865",
              "1881",
              "International_Electrical_Congress",
              "Ford_Model_T",
              "Wolverhampton",
              "Andreas_Flocken",
              "Taxicab",
              "Walter_Bersey",
              "Bersey_electric_cab",
              "Electrobat",
              "S.R._Bailey_%26_Co.",
              "Detroit_Electric",
              "Starter_(engine)",
              "Crank_(mechanism)",
              "Land_speed_record",
              "Camille_Jenatzy",
              "Metal-oxide-semiconductor",
              "MOSFET",
              "Mohamed_M._Atalla",
              "Dawon_Kahng",
              "Bell_Labs",
              "Power_MOSFET",
              "Hitachi",
              "Integrated_circuit",
              "Microprocessor",
              "Federico_Faggin",
              "Marcian_Hoff",
              "Masatoshi_Shima",
              "Stanley_Mazor",
              "Intel",
              "Microcontroller",
              "Power_converter",
              "Lithium-ion_battery",
              "John_Goodenough",
              "Rachid_Yazami",
              "Akira_Yoshino",
              "Zero-emissions_vehicle",
              "Chrysler_TEVan",
              "Ford_Ranger_EV",
              "GM_EV1",
              "Chevrolet_S10_EV",
              "Honda_EV_Plus",
              "Nissan_Altra",
              "Toyota_RAV4_EV",
              "Solectria_Force",
              "California",
              "Tesla_Motors",
              "Mitsubishi_i-MiEV",
              "Series_production",
              "Guinness_World_Records",
              "Renault%E2%80%93Nissan%E2%80%93Mitsubishi_Alliance",
              "Tesla_Model_S",
              "Motor_Trend",
              "Total_cost_of_ownership",
              "Car_platform",
              "Combustion_engines",
              "Electric_vehicle_battery",
              "Environmental_aspects_of_the_electric_car",
              "Motor_vehicle_emissions",
              "Particulate",
              "Soot",
              "Volatile_organic_compound",
              "Hydrocarbon",
              "Carbon_monoxide",
              "Ozone",
              "Lead",
              "Nitrogen_oxide",
              "Electricity_generation",
              "Emission_intensity",
              "Mains_electricity",
              "Salar_de_Uyuni",
              "Bolivia",
              "Lithium",
              "Plug-in_electric_vehicle#Rare-earth_metals_availability_and_supply_security",
              "Rare-earth_element",
              "Heavy_metal_(chemistry)",
              "Neodymium",
              "Boron",
              "Cobalt",
              "Strategic_material",
              "Rimac_Concept_One",
              "Power-to-weight_ratio",
              "Neighborhood_Electric_Vehicle",
              "Power_(physics)",
              "Traction_(engineering)",
              "Axle",
              "Differential_(mechanics)",
              "Transmission_(mechanics)",
              "Venturi_Fetish",
              "Supercar",
              "DC_motor",
              "Manual_transmission",
              "Porsche_918_Spyder",
              "Tesla_Roadster_(2020)",
              "Electric_car_energy_efficiency",
              "United_States_Department_of_Energy",
              "Carnot%27s_theorem_(thermodynamics)",
              "Gasoline_engine",
              "Diesel_engine",
              "Regenerative_braking",
              "Heat_pump",
              "Temperature_coefficient",
              "Citro%C3%ABn_Berlingo_Electrique",
              "Gasoline",
              "Solar_power",
              "External_battery",
              "Tesla_Model_X",
              "International_Organization_for_Standardization",
              "Plug-in_electric_vehicle_fire_incidents",
              "Vehicle_fire",
              "Shenzhen",
              "Kent,_Washington",
              "Merida,_Mexico",
              "Firefighter",
              "Certified_first_responder",
              "Chevrolet_Volt",
              "Low_rolling_resistance_tires",
              "Insurance_Institute_for_Highway_Safety",
              "Low-speed_vehicle",
              "Tesla,_Inc.",
              "BMW",
              "Uniti_(car)",
              "Automatic_transmission",
              "Parking_pawl",
              "Hand_brake",
              "Engine_braking",
              "Regenerative_brake",
              "Lithium-ion_polymer_batteries",
              "Nickel_metal_hydride_battery",
              "Zinc-air_battery",
              "List_of_electric_cars_currently_available",
              "EPA",
              "All-electric_range",
              "Model_year",
              "NIO_ES8",
              "Renault_Twizy",
              "What_Car",
              "Hyundai_Kona",
              "Roadside_assistance",
              "BYD_e6",
              "Battery_swapping",
              "Combined_Charging_System",
              "CHAdeMO",
              "Guobiao_standards",
              "Tesla_Supercharger",
              "Range_extender",
              "Range-extended_vehicle",
              "Range_extender_(vehicle)",
              "Rechargeable_battery",
              "Supercapacitor",
              "Flywheel_energy_storage",
              "F%C3%A9d%C3%A9ration_Internationale_de_l%27Automobile",
              "Formula_One",
              "Solar_vehicle",
              "Rio_de_Janeiro",
              "Brazil",
              "Petrobras",
              "Power_grid",
              "Fossil_fuel_power_plant",
              "Nuclear_power",
              "Photovoltaic",
              "Micro_hydro",
              "Global_warming",
              "Tesla_supercharger",
              "Tejon,_California",
              "Conductive_coupling",
              "SAE_J1772",
              "European_Automobile_Manufacturers_Association",
              "IEC_62196",
              "Inductive_charging",
              "Delco_Electronics",
              "Magne_Charge",
              "Chevrolet_S-10_EV",
              "Vehicle-to-grid",
              "Peak_load",
              "Off-peak",
              "List_of_production_battery_electric_vehicles",
              "Bloomberg_L.P.",
              "Plug-in_electric_car",
              "Brand",
              "Automotive_industry",
              "Mitsubishi_Motors",
              "Nissan",
              "Groupe_Renault",
              "Heavy_quadricycle",
              "Renault_Kangoo_Z.E.",
              "BAIC_Motor",
              "SAIC_Motor",
              "Geely",
              "BMW_i3_REx",
              "BAIC_EC-Series",
              "BAIC_EU-Series",
              "Electric_car_use_by_country",
              "Plug-in_electric_vehicles_in_the_United_States",
              "New_energy_vehicles_in_China",
              "Plug-in_electric_vehicles_in_Japan",
              "Plug-in_electric_vehicles_in_Europe",
              "Plug-in_electric_vehicles_in_Norway",
              "Plug-in_electric_vehicles_in_France",
              "Plug-in_electric_vehicles_in_Germany",
              "Plug-in_electric_vehicles_in_Canada",
              "Plug-in_electric_vehicles_in_the_United_Kingdom",
              "Plug-in_electric_vehicles_in_Sweden",
              "Oslo",
              "Bus_lane",
              "Phase-out_of_fossil_fuel_vehicles",
              "Toll_road",
              "Congestion_charge",
              "California_Air_Resources_Board#Zero-Emission_Vehicle_Program",
              "Plug-in_Car_Grant",
              "Bonus-malus",
              "European_Union_member_states",
              "High-occupancy_vehicle_lane",
              "Road_space_rationing",
              "Fuel_economy_in_automobiles",
              "Zero_emission_vehicles",
              "Volkswagen_ID.3",
              "Mazda_MX-30",
              "Ford_Mustang_Mach-E",
              "Volkswagen",
              "Volkswagen_Group_MEB_platform",
              "Ford",
              "Toyota",
              "E-TNGA",
              "Mercedes-Benz",
              "General_Motors",
              "Cadillac",
              "F-150",
              "Infiniti",
              "Range_anxiety",
              "Environmentalist",
              "Early_adopter",
              "Gender",
              "Norway",
              "Woman",
              "Man",
              "Stereotype",
              "Gender_identity",
              "Electric_aircraft",
              "Electric_boat",
              "Electric_bus",
              "Electric_motorcycles_and_scooters",
              "Electric_motorsport",
              "Electric_vehicle_warning_sounds",
              "Formula_E",
              "Vehicle_electrification",
              "David_B._Sandalow",
              "ISBN_(identifier)",
              "CleanTechnica",
              "International_Energy_Agency",
              "Quartz_(publication)",
              "Doi_(identifier)",
              "S2CID_(identifier)",
              "Forbes",
              "Institution_of_Engineers_Australia",
              "ISSN_(identifier)",
              "Computer_History_Museum",
              "CRC_Press",
              "Woodhead_Publishing",
              "IEEE_Medal_for_Environmental_and_Safety_Technologies",
              "Institute_of_Electrical_and_Electronics_Engineers",
              "Who_Killed_the_Electric_Car%3F",
              "The_Guardian",
              "Palo_Alto",
              "BBC",
              "Japan_Automobile_Manufacturers_Association",
              "Automotive_News",
              "The_New_York_Times",
              "The_Brookings_Institution",
              "Car_and_Driver",
              "Business_Insider",
              "Bibcode_(identifier)",
              "U.S._Fire_Administration",
              "U.S._Department_of_Energy",
              "U._S._Environmental_Protection_Agency",
              "Electrek",
              "Discover_(magazine)",
              "Munich",
              "International_Council_on_Clean_Transportation",
              "S%26P_Global_Platts",
              "Argonne_National_Laboratory",
              "Office_of_Energy_Efficiency_%26_Renewable_Energy",
              "The_Economist",
              "La_Naci%C3%B3n_(San_Jos%C3%A9)",
              "PMID_(identifier)",
              "Encyclop%C3%A6dia_Britannica",
              "Alternative_fuel_vehicle",
              "Fuel_cell",
              "Human_power",
              "Electric_bicycle",
              "Pedelec",
              "Solar_bus",
              "Pneumatic_motor",
              "Compressed_air_car",
              "Compressed-air_vehicle",
              "Tesla_turbine",
              "Battery_power",
              "Battery_electric_bus",
              "Electric_truck",
              "Electric_platform_truck",
              "Hybrid_train",
              "Motorized_bicycle",
              "Electric_locomotive",
              "Battery_electric_multiple_unit",
              "Cater_MetroTrolley",
              "Electric_kick_scooter",
              "Sentinel_Waggon_Works",
              "List_of_modern_production_plug-in_electric_vehicles",
              "Alcohol_fuel",
              "Biodiesel",
              "Biogas",
              "Butanol_fuel",
              "Biogasoline",
              "Common_ethanol_fuel_mixtures",
              "E85",
              "Ethanol_fuel",
              "Flexible-fuel_vehicle",
              "Methanol_economy",
              "Methanol_fuel",
              "Wood_gas",
              "Hydrogen",
              "Hydrogen_economy",
              "Hydrogen_vehicle",
              "Hydrogen_internal_combustion_engine_vehicle",
              "Autogas",
              "Liquid_nitrogen_engine",
              "Natural_gas_vehicle",
              "Propane",
              "Steam_car",
              "Bi-fuel_vehicle",
              "Hybrid_vehicle",
              "Multifuel",
              "What_Is_the_Electric_Car%3F",
              "Revenge_of_the_Electric_Car",
              "Wind-powered_vehicle",
              "Car",
              "Car_classification",
              "A-segment",
              "Kei_car",
              "Subcompact_car",
              "Supermini",
              "Family_car",
              "Compact_car",
              "Mid-size_car",
              "Full-size_car",
              "Custom_car",
              "Hot_rod",
              "Lead_sled",
              "Lowrider",
              "T-bucket",
              "Luxury_vehicle",
              "Compact_executive_car",
              "Executive_car",
              "Personal_luxury_car",
              "Minivan",
              "Compact_MPV",
              "Mini_MPV",
              "Sport_utility_vehicle",
              "Compact_sport_utility_vehicle",
              "Crossover_(automobile)",
              "Sports_car",
              "Grand_tourer",
              "Hot_hatch",
              "Muscle_car",
              "Pony_car",
              "Sport_compact",
              "Antique_car",
              "Classic_car",
              "Economy_car",
              "Leisure_activity_vehicle",
              "Ute_(vehicle)",
              "Van",
              "Voiturette",
              "2%2B2_(car_body_style)",
              "Baquet_(car_body_style)",
              "Barchetta",
              "Berlinetta",
              "Brougham_(car_body)",
              "Cabrio_coach",
              "Cab_over",
              "Convertible",
              "Coup%C3%A9",
              "Coupe_de_Ville",
              "Coup%C3%A9_utility",
              "Fastback",
              "Hardtop",
              "Hatchback",
              "Landaulet_(car)",
              "Limousine",
              "Multi-stop_truck",
              "Notchback",
              "Panel_van",
              "Phaeton_body",
              "Pickup_truck",
              "Quad_coup%C3%A9",
              "Roadster_(automobile)",
              "Runabout_(car)",
              "Sedan_(automobile)",
              "Shooting-brake",
              "Station_wagon",
              "Targa_top",
              "Torpedo_(car)",
              "Touring_car",
              "T-top",
              "Vis-%C3%A0-vis_(carriage)",
              "Amphibious_vehicle",
              "Connected_car",
              "Self-driving_car",
              "Hearse",
              "Gyrocar",
              "Roadable_aircraft",
              "Tow_truck",
              "Ground_propulsion",
              "Petrol_engine",
              "Gasoline_direct_injection",
              "Homogeneous_charge_compression_ignition",
              "Drive_wheel",
              "Front-wheel_drive",
              "Car_layout",
              "Two-wheel_drive",
              "Four-wheel_drive",
              "Six-wheel_drive",
              "Eight-wheel_drive",
              "Ten-wheel_drive",
              "Twelve-wheel_drive",
              "Front-engine,_front-wheel-drive_layout",
              "Mid-engine_design",
              "Rear-engine_design",
              "Front_mid-engine,_front-wheel-drive_layout",
              "Rear-engine,_front-wheel-drive_layout",
              "Front-engine,_rear-wheel-drive_layout",
              "Rear_mid-engine,_rear-wheel-drive_layout",
              "Rear-engine,_rear-wheel-drive_layout",
              "Front-engine,_four-wheel-drive_layout",
              "Mid-engine,_four-wheel-drive_layout",
              "Rear-engine,_four-wheel-drive_layout",
              "Engine_configuration",
              "Flat_engine",
              "Four-stroke_engine",
              "H_engine",
              "Reciprocating_engine",
              "Single-cylinder_engine",
              "Straight_engine",
              "Two-stroke_engine",
              "V_engine",
              "W_engine",
              "Wankel_engine",
              "List_of_renewable_energy_topics_by_country_and_territory",
              "Renewable_energy_in_Africa",
              "Renewable_energy_in_Ethiopia",
              "Renewable_energy_in_Kenya",
              "Renewable_energy_in_Morocco",
              "Renewable_energy_in_Seychelles",
              "Renewable_Energy_in_South_Africa",
              "Renewable_energy_in_Asia",
              "Renewable_energy_in_Afghanistan",
              "Renewable_energy_in_Armenia",
              "Renewable_energy_in_Bangladesh",
              "Renewable_energy_in_Bhutan",
              "Renewable_energy_in_China",
              "Renewable_energy_in_India",
              "Renewable_energy_in_Kazakhstan",
              "Renewable_energy_in_Nepal",
              "Renewable_energy_in_Pakistan",
              "Renewable_energy_in_Palestine",
              "Renewable_energy_in_the_Philippines",
              "Renewable_energy_in_Taiwan",
              "Renewable_energy_in_Thailand",
              "Renewable_energy_in_Vietnam",
              "Renewable_energy_in_the_European_Union",
              "Renewable_energy_in_Austria",
              "Renewable_energy_in_the_Czech_Republic",
              "Energy_in_Cyprus",
              "Renewable_energy_in_Denmark",
              "Renewable_energy_in_Finland",
              "Renewable_energy_in_France",
              "Renewable_energy_in_Germany",
              "Renewable_energy_in_Greece",
              "Renewable_energy_in_Hungary",
              "Renewable_energy_in_the_Republic_of_Ireland",
              "Renewable_energy_in_Italy",
              "Renewable_energy_in_Lithuania",
              "Renewable_energy_in_Luxembourg",
              "Renewable_energy_in_Malta",
              "Renewable_energy_in_the_Netherlands",
              "Renewable_energy_in_Poland",
              "Renewable_energy_in_Portugal",
              "Renewable_energy_in_Spain",
              "Renewable_energy_in_Sweden",
              "Renewable_energy_in_Albania",
              "Renewable_energy_in_Belarus",
              "Renewable_energy_in_Iceland",
              "Renewable_energy_in_Kosovo",
              "Renewable_energy_in_Norway",
              "Renewable_energy_in_Russia",
              "Energy_in_Switzerland",
              "Renewable_energy_in_Turkey",
              "Renewable_energy_in_Ukraine",
              "Renewable_energy_in_the_United_Kingdom",
              "Renewable_energy_in_Canada",
              "Renewable_energy_in_Costa_Rica",
              "Renewable_energy_in_Honduras",
              "Renewable_energy_in_Mexico",
              "Renewable_energy_in_the_United_States",
              "Renewable_energy_in_Australia",
              "Renewable_energy_in_the_Cook_Islands",
              "Renewable_energy_in_New_Zealand",
              "Renewable_energy_in_Tuvalu",
              "Renewable_energy_in_Argentina",
              "Renewable_energy_in_Brazil",
              "Renewable_energy_in_Chile",
              "Renewable_energy_in_Colombia",
              "GND_(identifier)",
              "LCCN_(identifier)",
              "National_Diet_Library"
          ],
          "sourcestr1": "Electric_car",
          "sourcestr2": "Q193692",
          "sourcevarchar3": "[]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2018_Renault_ZOE.jpg/1200px-2018_Renault_ZOE.jpg",
          "sourcedouble1": 0.024425,
          "entity1": [
              {
                  "value": "2019",
                  "display": "2019"
              },
              {
                  "value": "2020",
                  "display": "2020"
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
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "100",
                  "display": "100"
              },
              {
                  "value": "2017",
                  "display": "2017"
              },
              {
                  "value": "2",
                  "display": "2"
              },
              {
                  "value": "2016",
                  "display": "2016"
              },
              {
                  "value": "0",
                  "display": "0"
              },
              {
                  "value": "2030",
                  "display": "2030"
              },
              {
                  "value": "2015",
                  "display": "2015"
              },
              {
                  "value": "2008",
                  "display": "2008"
              },
              {
                  "value": "2012",
                  "display": "2012"
              },
              {
                  "value": "500000",
                  "display": "500000"
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
                  "value": "2021",
                  "display": "2021"
              },
              {
                  "value": "2025",
                  "display": "2025"
              },
              {
                  "value": "2010",
                  "display": "2010"
              }
          ],
          "date": [
              {
                  "value": "2013-10-01",
                  "display": "2013-10-01"
              },
              {
                  "value": "2013-10-18",
                  "display": "2013-10-18"
              },
              {
                  "value": "2017-07-03",
                  "display": "2017-07-03"
              },
              {
                  "value": "1899-04-29",
                  "display": "1899-04-29"
              }
          ],
          "money": [
              {
                  "value": "EUR 10000000000",
                  "display": "EUR 10000000000"
              },
              {
                  "value": "USD 23000000000",
                  "display": "USD 23000000000"
              },
              {
                  "value": "USD 300000000000",
                  "display": "USD 300000000000"
              },
              {
                  "value": "EUR 100",
                  "display": "EUR 100"
              },
              {
                  "value": "EUR 170",
                  "display": "EUR 170"
              },
              {
                  "value": "EUR 600",
                  "display": "EUR 600"
              },
              {
                  "value": "GBP 4500",
                  "display": "GBP 4500"
              },
              {
                  "value": "USD 1106",
                  "display": "USD 1106"
              },
              {
                  "value": "USD 1117",
                  "display": "USD 1117"
              },
              {
                  "value": "USD 140000",
                  "display": "USD 140000"
              },
              {
                  "value": "USD 1509",
                  "display": "USD 1509"
              },
              {
                  "value": "USD 372",
                  "display": "USD 372"
              },
              {
                  "value": "USD 485",
                  "display": "USD 485"
              },
              {
                  "value": "USD 5929",
                  "display": "USD 5929"
              },
              {
                  "value": "USD 7500",
                  "display": "USD 7500"
              },
              {
                  "value": "USD 847975",
                  "display": "USD 847975"
              },
              {
                  "value": "USD 993",
                  "display": "USD 993"
              }
          ],
          "entity12": [
              {
                  "value": "DEFEAT",
                  "display": "Defeat"
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
                  "value": "LOSSES",
                  "display": "Losses"
              },
              {
                  "value": "REVENUE",
                  "display": "Revenue"
              },
              {
                  "value": "INVESTMENT",
                  "display": "Investment"
              }
          ],
          "company_person": [
              {
                  "value": "(HITACHI)#(MASATOSHI SHIMA)",
                  "display": "(Hitachi)#(Masatoshi Shima)"
              },
              {
                  "value": "(HITACHI)#(MOHAMED M. ATALLA)",
                  "display": "(Hitachi)#(Mohamed M. Atalla)"
              },
              {
                  "value": "(HITACHI)#(STANLEY MAZOR)",
                  "display": "(Hitachi)#(Stanley Mazor)"
              },
              {
                  "value": "(INTEL)#(MOHAMED M. ATALLA)",
                  "display": "(Intel)#(Mohamed M. Atalla)"
              },
              {
                  "value": "(FORD)#(THOMAS PARKER)",
                  "display": "(Ford)#(Thomas Parker)"
              },
              {
                  "value": "(HITACHI)#(FEDERICO FAGGIN)",
                  "display": "(Hitachi)#(Federico Faggin)"
              },
              {
                  "value": "(INTEL)#(FEDERICO FAGGIN)",
                  "display": "(Intel)#(Federico Faggin)"
              },
              {
                  "value": "(INTEL)#(MASATOSHI SHIMA)",
                  "display": "(Intel)#(Masatoshi Shima)"
              },
              {
                  "value": "(INTEL)#(STANLEY MAZOR)",
                  "display": "(Intel)#(Stanley Mazor)"
              }
          ],
          "rank": 12,
          "displayTitle": "Electric car",
          "relevantExtracts": "<b>Tesla </b>... The <b>Tesla </b>Model 3 was ... The <b>Tesla </b>Roadster helped inspire ... <b>Tesla </b>global sales passed ... <b>Tesla </b>sold its 200,000th ... <b>Tesla </b>delivered its 100,000th ... followed by the <b>Tesla </b>Model S with ... the fully electric <b>Tesla </b>Model S as ... 2020 , the <b>Tesla </b>Model 3 is ... The 2008 <b>Tesla </b>Roadster 2.5 "
      },
      {
          "id": "/Web/Wikipedia/|NUMMI",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.9488,
          "matchingpartnames": [
              "text",
              "tables"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "NUMMI sold some equipment to {b}Tesla{nb} for $15 million.",
              "10668,51",
              "55058,51",
              "{b}Tesla{nb} would be collaborating with Toyota on the \"development of electric vehicles, parts, and production system and engineering support\".",
              "11183,137",
              "57541,179",
              "Portion of physical plant sold to {b}Tesla Motors{nb} Predecessor :",
              "12546,60",
              "280655,62",
              "{b}Tesla{nb} Factory (physical plant) Founded :",
              "12646,40",
              "280759,42",
              "On May 20, 2010, {b}Tesla Motors{nb} and Toyota announced a partnership to work on electric vehicle development, which included {b}Tesla{nb}'s partial purchase (210 of 370 acres) of the former NUMMI site for $42 million, mainly consisting of the factory building, but not equipment.",
              "10764,268",
              "56034,781",
              "{b}Tesla{nb} CEO Elon Musk said the {b}Tesla{nb} S sedan will be built at the plant.",
              "11033,70",
              "56933,174",
              "When {b}Tesla{nb} took over the location in 2010, they renamed it the {b}Tesla{nb} Factory .",
              "11104,78",
              "57244,133",
              "According to {b}Tesla Motors{nb}' plans, the plant would first be used to produce the {b}Tesla{nb} Model S sedan with \"future vehicles\" following in the coming years.",
              "11321,152",
              "57721,208",
              "After the plant was closed by its owners, the facility was sold to {b}Tesla{nb}, Inc. and reopened as a 100% {b}Tesla{nb}-owned production facility in October 2010, becoming known as the {b}Tesla{nb} Factory .",
              "198,188",
              "11624,295",
              "On May 20, 2010, it was announced that {b}Tesla Motors{nb} had purchased part of the NUMMI plant and renamed it {b}Tesla{nb} Factory , producing the {b}Tesla{nb} Model S . By 2016, the plant had 6,000 employees, with plans for more.",
              "2199,211",
              "27165,780"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "265,5,300,5,371,5,2238,12,2304,5,2334,5,10697,5,10781,12,10885,5,11033,5,11062,5,11109,5,11167,5,11183,5,11334,12,11400,5;11739,5,11778,5,11901,5,27274,12,27644,5,27729,5,55087,5,56121,12,56271,5,56933,5,57062,5,57249,5,57359,5,57541,5,57734,12,57852,5"
                  },
                  {
                      "partname": "tables",
                      "data": "12580,12,12646,5;280689,12,280759,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "NUMMI",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-30 14:18:04",
          "indexationtime": "2020-09-02 10:47:07",
          "version": "z+UekTieJ5lbG5l+HMww8g==",
          "size": 280497,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "NUMMI",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "BOB WASSERMAN",
                  "display": "Bob Wasserman"
              },
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              },
              {
                  "value": "FRITZ HENDERSON",
                  "display": "Fritz Henderson"
              },
              {
                  "value": "HENRY FORD",
                  "display": "Henry Ford"
              },
              {
                  "value": "HIDEAKI HOMMA",
                  "display": "Hideaki Homma"
              },
              {
                  "value": "GEO PRIZM",
                  "display": "Geo Prizm"
              }
          ],
          "company": [
              {
                  "value": "GENERAL MOTORS",
                  "display": "General Motors"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "TOYOTA MOTOR",
                  "display": "Toyota Motor"
              },
              {
                  "value": "SUZUKI",
                  "display": "Suzuki"
              }
          ],
          "geo": [
              {
                  "value": "TOYOTA",
                  "display": "Toyota"
              },
              {
                  "value": "FREMONT",
                  "display": "Fremont"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "MISSISSIPPI",
                  "display": "Mississippi"
              },
              {
                  "value": "TACOMA",
                  "display": "Tacoma"
              },
              {
                  "value": "NORTH AMERICA",
                  "display": "North America"
              },
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "BLUE SPRINGS",
                  "display": "Blue Springs"
              },
              {
                  "value": "CANADA",
                  "display": "Canada"
              },
              {
                  "value": "TEXAS",
                  "display": "Texas"
              },
              {
                  "value": "AUSTRALIA",
                  "display": "Australia"
              },
              {
                  "value": "KENTUCKY",
                  "display": "Kentucky"
              },
              {
                  "value": "SAN ANTONIO",
                  "display": "San Antonio"
              },
              {
                  "value": "SPRING HILL",
                  "display": "Spring Hill"
              },
              {
                  "value": "AMERICA",
                  "display": "America"
              },
              {
                  "value": "BRAZIL",
                  "display": "Brazil"
              },
              {
                  "value": "CAMBRIDGE",
                  "display": "Cambridge"
              },
              {
                  "value": "OAKLAND",
                  "display": "Oakland"
              },
              {
                  "value": "ONTARIO",
                  "display": "Ontario"
              }
          ],
          "wordcount": 1488,
          "exacthash": "QRZhD06eqc3WtJ/19XnbVQ==",
          "nearhash": "NK12o9Ot8z4+iRl4JSRoZQ==",
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
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/NUMMI",
          "sourcecsv1": [
              "Industry",
              "Fate",
              "Predecessor",
              "Successor",
              "Founded",
              "Defunct",
              "Headquarters",
              "Products",
              "Services",
              "Owner",
              "Website"
          ],
          "sourcecsv2": [
              "Nummi_(disambiguation)",
              "Automotive_industry",
              "Tesla_Motors",
              "Fremont_Assembly",
              "Tesla_Factory",
              "Fremont,_California",
              "United_States",
              "Automotive_manufacturing",
              "General_Motors",
              "Toyota",
              "Wayback_Machine",
              "Automobile",
              "Manufacturing",
              "Tesla,_Inc.",
              "Mud_Slough",
              "Interstate_880_(California)",
              "Interstate_680_(California)",
              "Joint_venture",
              "Lean_manufacturing",
              "Toyota_Production_System",
              "Protectionism",
              "Takaoka_plant",
              "Spring_Hill,_Tennessee",
              "John_F._Smith_Jr.",
              "General_Motors_Chapter_11_reorganization",
              "Bob_Wasserman",
              "Toyota_Corolla_(E140)",
              "Toyota_Motor_Manufacturing_Mississippi",
              "Blue_Springs,_Mississippi",
              "Toyota_Motor_Manufacturing_Canada",
              "Cambridge,_Ontario",
              "Tesla_Model_S",
              "Tatsuro_Toyoda",
              "United_Auto_Workers",
              "Chevrolet_Nova",
              "Toyota_Corolla_(E90)",
              "Toyota_Corolla_(E100)",
              "Toyota_Corolla_(E110)",
              "Toyota_Corolla_(E130)",
              "Geo_Prizm",
              "Chevrolet_Prizm",
              "Toyota_Hilux",
              "Toyota_Tacoma",
              "Toyota_Voltz",
              "Pontiac_Vibe",
              "Hatchback",
              "Automotive_industry_crisis_of_2008-2009",
              "Saturn_(automobile)",
              "Hummer",
              "Oldsmobile",
              "Toyota_Corolla_(E80)",
              "Pickup_truck",
              "General_Motors_Corporation",
              "Departmentalization",
              "Henry_Ford",
              "Division_of_labour",
              "Layoff",
              "Autonomation",
              "Continual_improvement_process",
              "Consensus_decision-making",
              "Chevrolet_Nova#Fifth_generation_(1985–1988)",
              "Break-even_(economics)",
              "Toyota_Prius",
              "San_Antonio,_Texas",
              "Severance_package",
              "Oakland_Athletics",
              "Major_League_Baseball",
              "Cisco_Field",
              "Business_valuation",
              "Aurica_Motors",
              "Toyota_Motor_Manufacturing_Kentucky",
              "Toyota_Motor_Manufacturing_Texas",
              "Elon_Musk",
              "CAMI_Automotive",
              "Canada",
              "Suzuki",
              "General_Motors_Canada",
              "United_Australian_Automobile_Industries",
              "Australia",
              "Holden",
              "Gung_Ho_(film)",
              "Ward%27s",
              "Ira_Glass",
              "Robert_Siegel",
              "All_Things_Considered",
              "National_Public_Radio",
              "This_American_Life",
              "Arnold_Schwarzenegger",
              "KCBS-TV",
              "Contra_Costa_Times",
              "ISBN_(identifier)",
              "Harvard_Business_Review",
              "East_Bay_Times",
              "Word_document",
              "Automotive_News",
              "Bloomberg_Businessweek",
              "University_of_Southern_California",
              "Edmunds.com",
              "Geographic_coordinate_system",
              "Buick",
              "Cadillac",
              "Chevrolet",
              "GMC_(automobile)",
              "ACDelco",
              "Cruise_(autonomous_vehicle)",
              "GM_Certified_Service",
              "GM_Defense",
              "GM_Financial",
              "OnStar",
              "General_Motors_de_Argentina",
              "General_Motors_do_Brasil",
              "General_Motors_de_Chile",
              "General_Motors_Egypt",
              "General_Motors_Japan",
              "DMAX_(engines)",
              "FAW-GM",
              "GM_Korea",
              "HRL_Laboratories",
              "Industries_M%C3%A9caniques_Maghr%C3%A9bines",
              "SAIC-GM",
              "SAIC-GM-Wuling",
              "Baojun",
              "List_of_GM_platforms",
              "List_of_GM_transmissions",
              "List_of_General_Motors_engines",
              "Straight-3",
              "GM_Family_0_engine",
              "GM_Small_Gasoline_Engine",
              "Straight-4",
              "GM_Family_1_engine",
              "GM_Medium_Gasoline_Engine",
              "Family_II_engine",
              "GM_Ecotec_engine",
              "V6_engine",
              "GM_High_Feature_engine",
              "General_Motors_90%C2%B0_V6_engine",
              "V8_engine",
              "LS_based_GM_small-block_engine",
              "Cadillac_twin-turbo_V8",
              "Allison_Engine_Company",
              "Allison_Transmission",
              "Ally_Financial",
              "Atlantic_Aircraft",
              "Chevrolet_Europe",
              "Dayton-Wright_Company",
              "Delco_Electronics",
              "Delphi_Corporation",
              "Detroit_Diesel",
              "DirecTV",
              "Electro-Motive_Diesel",
              "HP_Enterprise_Services",
              "Euclid_Trucks",
              "Fisher_Body",
              "Fleetwood_Metal_Body",
              "Frigidaire",
              "GM-AvtoVAZ",
              "General_Motors_Europe",
              "General_Motors_Diesel_Division",
              "General_Motors_Diesel",
              "General_Motors_India",
              "Chevrolet_Sales_India_Private_Limited",
              "General_Motors_South_Africa",
              "General_Motors_Thailand",
              "GM_Uzbekistan",
              "GM_Vietnam",
              "Ghandhara_Industries",
              "GMAC_Real_Estate",
              "Volvo_Trucks",
              "Holden_Special_Vehicles",
              "Hughes_Aircraft",
              "Hughes_Electronics",
              "Hughes_Network_Systems",
              "HughesNet",
              "Kettering_University",
              "Maven_(car_sharing)",
              "National_City_Lines",
              "New_Venture_Gear",
              "Nexteer_Automotive",
              "North_American_Aviation",
              "Nuvell_Financial_Services",
              "Opel",
              "PanAmSat",
              "Remy_Electric",
              "Rochester_Products_Division",
              "Terex",
              "Vauxhall_Motors",
              "Winton_Motor_Carriage_Company",
              "Yellow_Coach_Manufacturing_Company",
              "Renaissance_Center",
              "General_Motors_Technical_Center",
              "General_Motors_Proving_Grounds",
              "List_of_General_Motors_factories",
              "William_C._Durant",
              "Tim_Solso",
              "Mary_Barra",
              "World_of_Motion",
              "Test_Track",
              "General_Motors_Foundation",
              "History_of_General_Motors",
              "General_Motors_Motorama",
              "General_Motors_streetcar_conspiracy",
              "Concept_of_the_Corporation",
              "General_Motors_ignition_switch_recalls"
          ],
          "sourcestr1": "NUMMI",
          "sourcestr2": "Q3274742",
          "sourcestr3": "Q4830453",
          "category": "business",
          "sourcevarchar3": "[{\"Industry\":\"Automotive industry\",\"Fate\":[\"Dissolved; Portion of physical plant sold to\",\"Tesla Motors\"],\"Predecessor\":[\"Fremont Assembly\",\"1960-1982\"],\"Successor\":[\"Tesla Factory\",\"(physical plant)\"],\"Founded\":[\"December, 1984\",\";35years ago\"],\"Defunct\":\"April 1, 2010\",\"Headquarters\":[\"Fremont, California\",\",\",\"U.S.\"],\"Products\":\"Subcompact cars and trucks\",\"Services\":\"Automotive manufacturing\",\"Owner\":[\"General Motors\",\"and\",\"Toyota\",\"(1984\\u20132010)\"],\"Website\":[\"www.nummi.com\",\"at the\",\"Wayback Machine\",\"(archived October 24, 2007)\"]}]",
          "sourcevarchar5": "POINT(-121.944722222222 37.4947222222222)",
          "sourcedouble1": 0.017436,
          "latitude": 37.494722,
          "longitude": -121.944722,
          "entity1": [
              {
                  "value": "2010",
                  "display": "2010"
              },
              {
                  "value": "2009",
                  "display": "2009"
              },
              {
                  "value": "1984",
                  "display": "1984"
              },
              {
                  "value": "1",
                  "display": "1"
              },
              {
                  "value": "1986",
                  "display": "1986"
              },
              {
                  "value": "20",
                  "display": "20"
              },
              {
                  "value": "2006",
                  "display": "2006"
              },
              {
                  "value": "37.49472",
                  "display": "37.49472"
              },
              {
                  "value": "41",
                  "display": "41"
              },
              {
                  "value": "29",
                  "display": "29"
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
                  "value": "4700",
                  "display": "4700"
              },
              {
                  "value": "6000",
                  "display": "6000"
              },
              {
                  "value": "100",
                  "display": "100"
              },
              {
                  "value": "1962",
                  "display": "1962"
              },
              {
                  "value": "1982",
                  "display": "1982"
              },
              {
                  "value": "428633",
                  "display": "428633"
              },
              {
                  "value": "-121.94472",
                  "display": "-121.94472"
              },
              {
                  "value": "15000000",
                  "display": "15000000"
              }
          ],
          "date": [
              {
                  "value": "2010-04-01",
                  "display": "2010-04-01"
              },
              {
                  "value": "2010-05-20",
                  "display": "2010-05-20"
              },
              {
                  "value": "2007-10-24",
                  "display": "2007-10-24"
              },
              {
                  "value": "2010-03-10",
                  "display": "2010-03-10"
              },
              {
                  "value": "2009-02-27",
                  "display": "2009-02-27"
              },
              {
                  "value": "2009-06-29",
                  "display": "2009-06-29"
              },
              {
                  "value": "2009-08-27",
                  "display": "2009-08-27"
              }
          ],
          "entity3": [
              {
                  "value": "09:40",
                  "display": "09:40"
              }
          ],
          "money": [
              {
                  "value": "USD 15000000",
                  "display": "USD 15000000"
              },
              {
                  "value": "USD 42000000",
                  "display": "USD 42000000"
              },
              {
                  "value": "USD 281000000",
                  "display": "USD 281000000"
              },
              {
                  "value": "USD 54000",
                  "display": "USD 54000"
              }
          ],
          "entity7": [
              {
                  "value": "37.4947, -121.9447",
                  "display": "37.4947, -121.9447"
              }
          ],
          "entity13": [
              {
                  "value": "CHIEF EXECUTIVE OFFICER",
                  "display": "Chief Executive Officer"
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
                  "value": "INVESTMENT",
                  "display": "Investment"
              },
              {
                  "value": "CAPITAL",
                  "display": "Capital"
              }
          ],
          "person_cooc": [
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(ELON MUSK)",
                  "display": "(Chief Executive Officer)#(Elon Musk)"
              },
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(FRITZ HENDERSON)",
                  "display": "(Chief Executive Officer)#(Fritz Henderson)"
              }
          ],
          "company_person": [
              {
                  "value": "(GENERAL MOTORS)#(FRITZ HENDERSON)",
                  "display": "(General Motors)#(Fritz Henderson)"
              }
          ],
          "person_job_company": [
              {
                  "value": "(FRITZ HENDERSON)#(CHIEF EXECUTIVE OFFICER)#(GENERAL MOTORS)",
                  "display": "(Fritz Henderson)#(Chief Executive Officer)#(General Motors)"
              }
          ],
          "rank": 13,
          "displayTitle": "NUMMI",
          "relevantExtracts": "some equipment to <b>Tesla </b>... <b>Tesla </b>... plant sold to <b>Tesla </b><b>Motors </b>... <b>Tesla </b>... May 20, 2010, <b>Tesla </b><b>Motors </b>... development, which included <b>Tesla</b>... <b>Tesla </b>... Musk said the <b>Tesla </b>... When <b>Tesla </b>... renamed it the <b>Tesla </b>... According to <b>Tesla </b><b>Motors</b>... to produce the <b>Tesla </b>... was sold to <b>Tesla</b>... as a 100% <b>Tesla</b>... known as the <b>Tesla </b>... was announced that <b>Tesla </b><b>Motors </b>... and renamed it <b>Tesla </b>... , producing the <b>Tesla </b>"
      },
      {
          "id": "/Web/Wikipedia/|Plug-in_electric_vehicle",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.942871,
          "matchingpartnames": [
              "text"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "{b}Tesla{nb} Model 3 electric car (~525,000",
              "68,36",
              "13546,94",
              "{b}Tesla{nb} Model S electric car (~291,000",
              "143,36",
              "15482,94",
              "As of March 2020 , the {b}Tesla{nb} Model 3 listed as the world's top selling highway-capable plug-in electric car in history, with global sales since inception of more than 500,000 units, followed by the Nissan Leaf with 470,000 units sold through May 2020.",
              "1799,251",
              "20221,756",
              "{b}Tesla{nb} Model S (60 kWh",
              "21316,21",
              "98864,77",
              "{b}Tesla{nb} Model S (85 kWh",
              "21366,21",
              "99132,77",
              "The two BEVs modeled, midsize and full-size, are based on the two most popular BEV models sold in the United States in 2015, the Nissan Leaf and the {b}Tesla{nb} Model S . The study found that all-electric cars representative of those sold today, on average produce less than half the global warming emissions of comparable gasoline-powered vehicles, despite taking into account the higher emissions associated with BEV manufacturing.",
              "27538,427",
              "113416,482",
              "{b}Tesla{nb} Model S electric car (left) and Fisker Karma plug-in hybrid (right) at the parking spots reserved for green cars at San Francisco International Airport .",
              "36014,159",
              "141927,316",
              "As of June 2012 , and based on the three battery size options offered for the {b}Tesla{nb} Model S , the New York Times estimated the cost of automotive battery packs between US$400 to US$500 per kilowatt-hour.",
              "36804,203",
              "144882,675",
              "{b}Tesla Motors{nb} designed its Model S to allow fast battery swapping.",
              "47799,65",
              "174043,125",
              "In June 2013, {b}Tesla{nb} announced their goal to deploy a battery swapping station in each of its supercharging stations .",
              "47865,117",
              "174310,293"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "68,5,143,5,1822,5,21316,5,21366,5,27687,5,36014,5,36882,5,47799,12,47879,5,48008,5,48304,5,54930,5,55172,5,55563,5,57278,5,63733,12,63794,5,63817,5,63907,12,66360,5,66583,12,74804,5,75271,5,76239,5,76399,5,76745,5,84519,5,84874,5,92256,5,93165,5,93692,5,94027,5,94114,5,94324,5,94486,5,94753,5;13546,5,15482,5,20553,5,98864,5,99132,5,113617,5,141927,5,145269,5,174043,12,174324,5,174629,5,175289,5,196584,5,197023,5,197849,5,205537,5,222841,12,222974,5,223053,5,223839,12,228923,5,229149,12,259239,5,260476,5,264991,5,265583,5,266856,5,314595,5,315460,5,351489,5,354101,5,356401,5,357227,5,358536,5,361575,5,363408,5,363837,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Plug-in electric vehicle",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-28 11:45:13",
          "indexationtime": "2020-09-02 08:12:49",
          "version": "qLiIeNdIrHQjj2RHJYQyFQ==",
          "size": 1362639,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Plug-in_electric_vehicle",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "DAVID B. SANDALOW",
                  "display": "David B. Sandalow"
              },
              {
                  "value": "JEREMY MICHALEK",
                  "display": "Jeremy Michalek"
              },
              {
                  "value": "MAX ENERGI",
                  "display": "Max Energi"
              },
              {
                  "value": "SHAI AGASSI",
                  "display": "Shai Agassi"
              },
              {
                  "value": "TUGCE YUKSEL",
                  "display": "Tugce Yuksel"
              }
          ],
          "company": [
              {
                  "value": "NISSAN",
                  "display": "Nissan"
              },
              {
                  "value": "MITSUBISHI",
                  "display": "Mitsubishi"
              },
              {
                  "value": "RENAULT",
                  "display": "Renault"
              },
              {
                  "value": "GENERAL MOTORS",
                  "display": "General Motors"
              },
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "VOLKSWAGEN",
                  "display": "Volkswagen"
              },
              {
                  "value": "GOOGLE",
                  "display": "Google"
              },
              {
                  "value": "NEW YORK TIMES",
                  "display": "New York Times"
              },
              {
                  "value": "BLOOMBERG",
                  "display": "Bloomberg"
              },
              {
                  "value": "BMW",
                  "display": "BMW"
              },
              {
                  "value": "ADOBE SYSTEMS",
                  "display": "Adobe Systems"
              },
              {
                  "value": "EMERGENCY MEDICAL SERVICES",
                  "display": "Emergency Medical Services"
              },
              {
                  "value": "FORD",
                  "display": "Ford"
              },
              {
                  "value": "PSA",
                  "display": "PSA"
              },
              {
                  "value": "TOYOTA MOTOR",
                  "display": "Toyota Motor"
              },
              {
                  "value": "APPLE",
                  "display": "Apple"
              },
              {
                  "value": "BOEING",
                  "display": "Boeing"
              },
              {
                  "value": "DELL",
                  "display": "Dell"
              },
              {
                  "value": "HP",
                  "display": "HP"
              },
              {
                  "value": "LENOVO",
                  "display": "Lenovo"
              }
          ],
          "geo": [
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "CHINA",
                  "display": "China"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "TOYOTA",
                  "display": "Toyota"
              },
              {
                  "value": "NORWAY",
                  "display": "Norway"
              },
              {
                  "value": "EUROPE",
                  "display": "Europe"
              },
              {
                  "value": "FRANCE",
                  "display": "France"
              },
              {
                  "value": "NETHERLANDS",
                  "display": "Netherlands"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "GERMANY",
                  "display": "Germany"
              },
              {
                  "value": "UK",
                  "display": "UK"
              },
              {
                  "value": "AUSTRALIA",
                  "display": "Australia"
              },
              {
                  "value": "CANADA",
                  "display": "Canada"
              },
              {
                  "value": "ICELAND",
                  "display": "Iceland"
              },
              {
                  "value": "ISRAEL",
                  "display": "Israel"
              },
              {
                  "value": "UNITED KINGDOM",
                  "display": "United Kingdom"
              },
              {
                  "value": "INDIA",
                  "display": "India"
              },
              {
                  "value": "SWEDEN",
                  "display": "Sweden"
              },
              {
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "SAN FRANCISCO",
                  "display": "San Francisco"
              }
          ],
          "wordcount": 12526,
          "exacthash": "rsNWBX3aqFsq159ube1X6w==",
          "nearhash": "tLvSrnfcjNYFfmHTkR62Ag==",
          "partnamelocations": [
              {
                  "value": "value",
                  "display": "value"
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
          "url1": "https://en.wikipedia.org/wiki/Plug-in_electric_vehicle",
          "sourcecsv2": [
              "Electric_vehicle",
              "Electric_car",
              "Plug-in_hybrid",
              "Tesla_Model_3",
              "Nissan_Leaf",
              "Tesla_Model_S",
              "Mitsubishi_Outlander_P-HEV",
              "Motor_vehicle",
              "Wall_socket",
              "Rechargeable_battery",
              "All-electric_vehicle",
              "Plug-in_hybrid_vehicle",
              "Chevrolet_Volt",
              "Internal_combustion_engine",
              "Air_pollution",
              "Petroleum",
              "Greenhouse_gas",
              "All-electric_mode",
              "Brammo_Empulse",
              "Electric_motorcycle",
              "Charging_station",
              "Electric_grid",
              "Battery_electric_vehicle",
              "Electric_vehicle_conversion",
              "Hybrid_electric_vehicle",
              "Regenerative_braking",
              "Government_incentives_for_plug-in_electric_vehicles",
              "Automobile",
              "Electric_motorcycles_and_scooters",
              "Neighborhood_electric_vehicle",
              "Microcar",
              "City_car",
              "Van",
              "Bus",
              "Electric_truck",
              "Energy",
              "Battery_pack",
              "Electric_motor",
              "Motor_controller",
              "Charge-depleting",
              "Charge-sustaining",
              "State_of_charge",
              "All-electric_range",
              "Plug-in_hybrid_electric_vehicle",
              "Electric_power",
              "CalCars#Prius+_and_Kits",
              "Aftermarket_(automotive)",
              "Electricity",
              "All-electric",
              "Toyota_Prius",
              "Ford_Escape_Hybrid",
              "New_energy_vehicles_in_China",
              "China",
              "Hydrogen_vehicle",
              "Fuel_cell_vehicle",
              "Center_for_American_Progress",
              "Paris_Agreement",
              "Thermal_efficiency",
              "Electric_drive_vehicle",
              "Gasoline_engine",
              "Diesel_engine",
              "Toyota_Prius_Plug-in_Hybrid",
              "KWh",
              "Petroleum_price",
              "Peak_oil",
              "Consumer_Reports",
              "Range-extended_mode",
              "Toyota_Prius_(XW30)",
              "Honda_Civic_Hybrid",
              "Toyota_Corolla#Tenth_generation_(E140,_E150)",
              "Hyundai_Elantra#Fifth_generation_(MD",
              "_2010–present)",
              "Edison_Electric_Institute",
              "Mitsubishi_i_MiEV",
              "Fiat_500_(2007)",
              "1979_energy_crisis",
              "2007%E2%80%932012_global_financial_crisis",
              "Environmental_aspects_of_the_electric_car",
              "RechargeIT",
              "Google",
              "Mountain_View,_California",
              "Solar_panel",
              "Motor_vehicle_emissions",
              "Particulate",
              "Soot",
              "Volatile_organic_compound",
              "Hydrocarbon",
              "Carbon_monoxide",
              "Ozone",
              "Lead",
              "NOx",
              "Greenhouse_gases",
              "Tank-to-wheel",
              "Electricity_generation",
              "The_long_tailpipe",
              "Life_cycle_analysis",
              "Wind_power",
              "Solar_energy",
              "Hydroelectric",
              "Nuclear_power",
              "Coal",
              "Fuel_economy_in_automobiles",
              "France",
              "Nuclear_power_plants",
              "Canada",
              "Hydroelectricity",
              "Natural_gas",
              "California",
              "United_Kingdom",
              "Germany",
              "India",
              "United_States",
              "Los_Angeles",
              "M%C3%A9xico_City",
              "Santiago,_Chile",
              "S%C3%A3o_Paulo",
              "Beijing",
              "Bangkok",
              "Kathmandu",
              "Ricardo_plc",
              "Carbon_footprint",
              "Mid-size_car",
              "Embedded_emissions",
              "Steel",
              "Vehicle_glider",
              "Life_cycle_assessment",
              "Powertrain",
              "Gasohol",
              "Volkswagen",
              "Life-cycle_assessment",
              "T%C3%9CV_NORD",
              "VW_e-Golf",
              "Volkswagen_Golf_Mk7",
              "2007_enlargement_of_the_European_Union",
              "Recycling",
              "U.S._Environmental_Protection_Agency",
              "Model_year",
              "Alternative_fuel_vehicle",
              "Toyota_Prius_PHV",
              "Miles_per_gallon_gasoline_equivalent",
              "Tailpipe_emissions",
              "Rocky_Mountains",
              "BMW_i3",
              "Chevrolet_Spark_EV",
              "Honda_Fit_EV",
              "Fiat_500e",
              "Mitsubishi_i-MiEV",
              "Smart_electric_drive",
              "Ford_Focus_Electric",
              "BMW_i3_REx",
              "Mercedes-Benz_B-Class_Electric_Drive",
              "Toyota_RAV4_EV",
              "BYD_e6",
              "Honda_Accord_Plug-in_Hybrid",
              "Cadillac_ELR",
              "Ford_C-Max_Energi",
              "Ford_Fusion_Energi",
              "BMW_i8",
              "Porsche_Panamera_S_E-Hybrid",
              "McLaren_P1",
              "Series_hybrid",
              "Union_of_Concerned_Scientists",
              "Well-to-wheel",
              "Miles_per_gallon",
              "Carbon_dioxide_equivalent",
              "Hybrid_electric_car",
              "Subcompact_car",
              "Prius_c",
              "Honda_Civic_Hybrid#Third_generation_(2011-_)",
              "Lexus_CT200h",
              "Chevrolet_Cruze#2008–present_(J300)",
              "Ford_Focus_(third_generation)",
              "Life-cycle_assessment#Cradle-to-grave",
              "National_Bureau_of_Economic_Research",
              "Paraguay",
              "Hydropower",
              "Iceland",
              "Renewable_power",
              "Geothermal_power",
              "Sweden",
              "Low_carbon",
              "Spain",
              "Japan",
              "Mexico",
              "Fossil-fuel_power_station",
              "Australia",
              "Energy_development",
              "Energy_security",
              "Mitigation_of_peak_oil",
              "Brent_crude",
              "Spot_price",
              "2000s_energy_crisis",
              "1973_oil_crisis",
              "United_States_energy_independence",
              "Developed_countries",
              "Emerging_countries",
              "Shock_(economics)",
              "Supply_(economics)",
              "Unconventional_oil",
              "National_security",
              "Resource_nationalism",
              "Developing_countries",
              "Africa",
              "Balance_of_payments",
              "Plug-in_hybrids",
              "Transport",
              "Energy_resilience",
              "Vehicle-to-grid",
              "Grid_(electricity)",
              "Demand_response",
              "Fisker_Karma",
              "San_Francisco_International_Airport",
              "Electric_vehicle_battery",
              "Lithium-ion_battery",
              "United_States_National_Research_Council",
              "New_York_Times",
              "American_Council_for_an_Energy-Efficient_Economy",
              "U.S._Department_of_Energy",
              "Belfer_Center_for_Science_and_International_Affairs",
              "Harvard_University",
              "Net_present_value",
              "Level_1,_2,_and_3_charging",
              "Electric_Power_Research_Institute",
              "Total_cost_of_ownership",
              "Honda_Civic",
              "Chevrolet_Cruze",
              "Ford_Focus",
              "Volkswagen_Passat",
              "Ford_Fusion_Hybrid",
              "Toyota_Camry_Hybrid",
              "San_Francisco_City_Hall",
              "Range_anxiety",
              "Parking_lot",
              "Oregon",
              "San_Francisco",
              "San_Francisco_Bay_Area",
              "Silicon_Valley",
              "Adobe_Systems",
              "Estonia",
              "Electric_vehicle_network",
              "Car2Go",
              "San_Diego",
              "Battery_swapping",
              "Better_Place_(company)",
              "Tesla_supercharger",
              "Sustainable_energy",
              "Denmark",
              "Israel",
              "Hawaii",
              "Renault_Fluence_Z.E.",
              "Tesla_Motors",
              "Interstate_5_in_California",
              "Washington,_DC",
              "Boston",
              "Solar_panels",
              "REVA_NXR",
              "Frankfurt_Motor_Show",
              "Trickle_charging",
              "Reva_Electric_Car_Company",
              "SMS",
              "Electrical_grid",
              "Transformer",
              "General_Motors",
              "Austin,_Texas",
              "Electric_vehicle_warning_sounds",
              "Roadway_noise",
              "Noise_health_effects",
              "Visual_impairment",
              "Hybrid_vehicle",
              "Ministry_of_Land,_Infrastructure,_Transport_and_Tourism_(Japan)",
              "U.S._Senate",
              "U.S._House_of_Representatives",
              "National_Highway_Traffic_Safety_Administration",
              "Plug-in_electric_vehicle_fire_incidents",
              "Volvo_C30",
              "Thermal_runaway",
              "Rechargeable_batteries",
              "Cellphone",
              "Boeing_787_Dreamliner",
              "Zotye_Auto",
              "Dodge_Ram_1500_Plug-in_Hybrid",
              "Shenzhen",
              "Kent,_Washington",
              "Merida,_Mexico",
              "Murfreesboro,_Tennessee",
              "Nissan",
              "Firefighter",
              "Certified_first_responder",
              "Rare-earth_element",
              "Lithium",
              "Heavy_metal_(chemistry)",
              "Neodymium",
              "Boron",
              "Cobalt",
              "Lanthanum",
              "Dysprosium",
              "Lithium_carbonate",
              "Smartphone",
              "Tablet_computer",
              "Grid_energy_storage",
              "Strategic_material",
              "Salar_de_Uyuni",
              "Bolivia",
              "People%27s_Republic_of_China",
              "Andes",
              "South_America",
              "Chile",
              "Argentina",
              "Brine",
              "Nevada",
              "Mineral_resource_classification",
              "US_Geological_Survey",
              "Brazil",
              "South_Korea",
              "Mining",
              "Mineral_industry",
              "Lawrence_Berkeley_National_Laboratory",
              "University_of_California_Berkeley",
              "University_of_Michigan",
              "Ford_Motor_Company",
              "Bloomberg_L.P.",
              "Bayan_Obo",
              "Baotou",
              "Inner_Mongolia",
              "Vietnam",
              "Kazakhstan",
              "Rare-earth",
              "Toyota_Motor_Corporation",
              "Induction_motor",
              "Honda_Insight",
              "Tesla_Roadster_(2008)",
              "National_Automobile_Dealers_Association",
              "The_New_York_Times",
              "BMW",
              "Institute_of_Transportation_Studies",
              "University_of_California,_Davis",
              "J.D._Power",
              "Chevrolet",
              "Ford",
              "Honda",
              "Toyota",
              "High-occupancy_vehicle_lane",
              "Plug-in_electric_vehicles_in_the_United_States",
              "Plug-in_hybrids_in_California",
              "Plug-in_electric_vehicles_in_Europe",
              "Phase-out_of_fossil_fuel_vehicles",
              "Bus_lane",
              "Oslo",
              "Tax_credits",
              "Road_toll_(modern)",
              "Toll_bridge",
              "Toll_tunnel",
              "Congestion_pricing",
              "Bonus-malus",
              "European_Union_member_states",
              "Zero-emissions_vehicle",
              "California_Air_Resources_Board#Zero-Emission_Vehicle_Program",
              "Road_space_rationing",
              "San_Jos%C3%A9,_Costa_Rica",
              "Vehicle_restriction_in_S%C3%A3o_Paulo",
              "Pico_y_placa",
              "Mexico_City",
              "European_emission_standards",
              "Zero_emission_vehicles",
              "Ultra_Low_Emission_Zone",
              "Central_London",
              "Zero-emission_zone",
              "Oxford",
              "Amsterdam",
              "Athens",
              "Barcelona",
              "Brussels",
              "Copenhagen",
              "Madrid",
              "Milan",
              "Paris",
              "Quito",
              "Rio_de_Janeiro",
              "Rome",
              "Seattle",
              "Vancouver",
              "List_of_modern_production_plug-in_electric_vehicles",
              "Electric_car_use_by_country",
              "General_Motors_EV1",
              "All-electric_car",
              "PSA_Peugeot_Citro%C3%ABn_Group",
              "Mass_production",
              "Heavy_quadricycle",
              "Lead-acid_battery",
              "International_Energy_Agency",
              "Renault%E2%80%93Nissan%E2%80%93Mitsubishi_Alliance",
              "Mitsubishi_Motors",
              "Tesla_Inc.",
              "BYD_Qin",
              "BYD_Auto",
              "BMW_Group",
              "BMW_i",
              "BMW_iPerformance",
              "Mini_(marque)",
              "BAIC_Motor",
              "BAIC_EC-Series",
              "Brand",
              "Automotive_industry",
              "Detroit_Electric",
              "History_of_the_electric_vehicle",
              "Battery_electric_car",
              "Shanghai",
              "Los_Angeles_metropolitan_area",
              "Bergen",
              "Autonomous_territories",
              "Norway",
              "Netherlands",
              "Hong_Kong",
              "New_energy_vehicles",
              "Light_commercial_vehicle",
              "Electric_bus",
              "New_energy_vehicle",
              "Plug-in_electric_vehicles_in_California",
              "Market_share",
              "Plug-in_electric_vehicles_in_Japan",
              "Plug-in_electric_cars_in_Sweden",
              "Plug-in_electric_vehicles_in_Norway",
              "Market_penetration",
              "Renewable_energy_in_Norway",
              "Plug-in_electric_vehicles_in_Germany",
              "Plug-in_electric_vehicles_in_the_United_Kingdom",
              "BMW_330e",
              "Plug-in_electric_vehicles_in_France",
              "Renault_Zoe",
              "COVID-19_pandemic",
              "Plug-in_electric_vehicles_in_the_Netherlands",
              "Motorised_quadricycle",
              "Per_capita",
              "Renault_Kangoo_Z.E.",
              "BAIC_EU-Series",
              "Tesla_Model_X",
              "JATO_Dynamics",
              "Toyota_Prius_Prime",
              "Chevrolet_Volt_family",
              "BYD_F3DM",
              "BYD_Tang",
              "Buick_Velite_5",
              "Chevrolet_Volt_(second_generation)",
              "Hybrid_tax_credit",
              "List_of_electric_cars_currently_available",
              "Neighborhood_electric_car",
              "Plug_In_America",
              "Google.org",
              "List_of_renewable_energy_topics_by_country",
              "David_B._Sandalow",
              "The_Brookings_Institution",
              "ISBN_(identifier)",
              "Duke_Energy",
              "S%26P_Global_Platts",
              "Quartz_(publication)",
              "European_Automobile_Manufacturers_Association",
              "Internal_Revenue_Service",
              "Massachusetts_Institute_of_Technology",
              "Virginia_Tech",
              "CalCars",
              "World_Bank",
              "Daniel_Sperling",
              "Oxford_University_Press",
              "Popular_Mechanics",
              "U.S._Energy_Information_Administration",
              "U._S._Environmental_Protection_Agency",
              "United_States_Environmental_Protection_Agency",
              "The_Economist",
              "Journal_of_Economic_Behavior_and_Organization",
              "Doi_(identifier)",
              "The_Guardian",
              "The_MIT_Press",
              "R._James_Woolsey",
              "Chelsea_Sexton",
              "Mongabay",
              "African_Development_Bank",
              "Andrew_Grove",
              "Science_(journal)",
              "Elsevier",
              "Pacific_Gas_%26_Electric",
              "Bloomberg_News",
              "Kennedy_School_of_Government",
              "Wayback_Machine",
              "Financial_Times",
              "The_San_Diego_Union-Tribune",
              "Shai_Agassi",
              "David_Pogue",
              "Gavin_Newsom",
              "YouTube",
              "The_Jerusalem_Post",
              "Forbes",
              "SAE_International",
              "CNET",
              "Scientific_American",
              "Electrek",
              "USA_Today",
              "University_of_California,_Riverside",
              "Toyota_Motor_Company",
              "American_Council_of_the_Blind",
              "Reuters",
              "European_Commission",
              "PMID_(identifier)",
              "The_Wall_Street_Journal",
              "National_Geographic_(magazine)",
              "The_Nikkei",
              "U._S._Geological_Survey",
              "Argonne_National_Laboratory",
              "Wall_Street_Journal",
              "International_Council_on_Clean_Transportation",
              "La_Naci%C3%B3n_(San_Jos%C3%A9)",
              "Oxford_City_Council",
              "Sherry_Boschert",
              "Edmunds.com",
              "Denza",
              "United_States_Department_of_Energy",
              "Office_of_Energy_Efficiency_%26_Renewable_Energy",
              "McKinsey_%26_Company",
              "Business_Line",
              "Motorsport_Network",
              "Institute_of_Transport_Economics",
              "Agence_France-Presse",
              "The_Independent",
              "Society_of_Motor_Manufacturers_and_Traders",
              "Palo_Alto",
              "Tesla,_Inc.",
              "Munich",
              "Tesla,_Inc",
              "Toyota_City,_Japan",
              "Carnegie_Mellon_University",
              "RAC_Foundation",
              "UC_Davis",
              "United_Nations",
              "2014_UN_Climate_Summit",
              "Fuel_cell",
              "Human_power",
              "Electric_bicycle",
              "Pedelec",
              "Solar_power",
              "Solar_vehicle",
              "Solar_car",
              "Solar_bus",
              "Electric_aircraft",
              "Electric_boat",
              "Pneumatic_motor",
              "Compressed_air_car",
              "Compressed-air_vehicle",
              "Tesla_turbine",
              "Battery_power",
              "Battery_electric_bus",
              "Electric_platform_truck",
              "Hybrid_train",
              "Motorized_bicycle",
              "Neighborhood_Electric_Vehicle",
              "Electric_locomotive",
              "Battery_electric_multiple_unit",
              "Cater_MetroTrolley",
              "Electric_kick_scooter",
              "Sentinel_Waggon_Works",
              "Biofuel",
              "Alcohol_fuel",
              "Biodiesel",
              "Biogas",
              "Butanol_fuel",
              "Biogasoline",
              "Common_ethanol_fuel_mixtures",
              "E85",
              "Ethanol_fuel",
              "Flexible-fuel_vehicle",
              "Methanol_economy",
              "Methanol_fuel",
              "Wood_gas",
              "Hydrogen",
              "Hydrogen_economy",
              "Hydrogen_internal_combustion_engine_vehicle",
              "Autogas",
              "Liquid_nitrogen_engine",
              "Natural_gas_vehicle",
              "Propane",
              "Steam_car",
              "Bi-fuel_vehicle",
              "Multifuel",
              "Who_Killed_the_Electric_Car%3F",
              "What_Is_the_Electric_Car%3F",
              "Revenge_of_the_Electric_Car",
              "Wind-powered_vehicle",
              "List_of_renewable_energy_topics_by_country_and_territory",
              "Renewable_energy_in_Africa",
              "Renewable_energy_in_Ethiopia",
              "Renewable_energy_in_Kenya",
              "Renewable_energy_in_Morocco",
              "Renewable_energy_in_Seychelles",
              "Renewable_Energy_in_South_Africa",
              "Renewable_energy_in_Asia",
              "Renewable_energy_in_Afghanistan",
              "Renewable_energy_in_Armenia",
              "Renewable_energy_in_Bangladesh",
              "Renewable_energy_in_Bhutan",
              "Renewable_energy_in_China",
              "Renewable_energy_in_India",
              "Renewable_energy_in_Kazakhstan",
              "Renewable_energy_in_Nepal",
              "Renewable_energy_in_Pakistan",
              "Renewable_energy_in_Palestine",
              "Renewable_energy_in_the_Philippines",
              "Renewable_energy_in_Taiwan",
              "Renewable_energy_in_Thailand",
              "Renewable_energy_in_Vietnam",
              "Renewable_energy_in_the_European_Union",
              "Renewable_energy_in_Austria",
              "Renewable_energy_in_the_Czech_Republic",
              "Energy_in_Cyprus",
              "Renewable_energy_in_Denmark",
              "Renewable_energy_in_Finland",
              "Renewable_energy_in_France",
              "Renewable_energy_in_Germany",
              "Renewable_energy_in_Greece",
              "Renewable_energy_in_Hungary",
              "Renewable_energy_in_the_Republic_of_Ireland",
              "Renewable_energy_in_Italy",
              "Renewable_energy_in_Lithuania",
              "Renewable_energy_in_Luxembourg",
              "Renewable_energy_in_Malta",
              "Renewable_energy_in_the_Netherlands",
              "Renewable_energy_in_Poland",
              "Renewable_energy_in_Portugal",
              "Renewable_energy_in_Spain",
              "Renewable_energy_in_Sweden",
              "Renewable_energy_in_Albania",
              "Renewable_energy_in_Belarus",
              "Renewable_energy_in_Iceland",
              "Renewable_energy_in_Kosovo",
              "Renewable_energy_in_Russia",
              "Energy_in_Switzerland",
              "Renewable_energy_in_Turkey",
              "Renewable_energy_in_Ukraine",
              "Renewable_energy_in_the_United_Kingdom",
              "Renewable_energy_in_Canada",
              "Renewable_energy_in_Costa_Rica",
              "Renewable_energy_in_Honduras",
              "Renewable_energy_in_Mexico",
              "Renewable_energy_in_the_United_States",
              "Renewable_energy_in_Australia",
              "Renewable_energy_in_the_Cook_Islands",
              "Renewable_energy_in_New_Zealand",
              "Renewable_energy_in_Tuvalu",
              "Renewable_energy_in_Argentina",
              "Renewable_energy_in_Brazil",
              "Renewable_energy_in_Chile",
              "Renewable_energy_in_Colombia"
          ],
          "sourcestr1": "Plug-in_electric_vehicle",
          "sourcestr2": "Q7205234",
          "sourcevarchar3": "[]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Tesla_Model_3_DCA_08_2018_0275.jpg/1200px-Tesla_Model_3_DCA_08_2018_0275.jpg",
          "sourcedouble1": 0.013649,
          "entity1": [
              {
                  "value": "2019",
                  "display": "2019"
              },
              {
                  "value": "2018",
                  "display": "2018"
              },
              {
                  "value": "2014",
                  "display": "2014"
              },
              {
                  "value": "100",
                  "display": "100"
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
                  "value": "2016",
                  "display": "2016"
              },
              {
                  "value": "2013",
                  "display": "2013"
              },
              {
                  "value": "2015",
                  "display": "2015"
              },
              {
                  "value": "2020",
                  "display": "2020"
              },
              {
                  "value": "2010",
                  "display": "2010"
              },
              {
                  "value": "2012",
                  "display": "2012"
              },
              {
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "2011",
                  "display": "2011"
              },
              {
                  "value": "2017",
                  "display": "2017"
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
                  "value": "2030",
                  "display": "2030"
              },
              {
                  "value": "2009",
                  "display": "2009"
              },
              {
                  "value": "4",
                  "display": "4"
              }
          ],
          "date": [
              {
                  "value": "2010-06-09",
                  "display": "2010-06-09"
              },
              {
                  "value": "2010-07-18",
                  "display": "2010-07-18"
              },
              {
                  "value": "2010-09-29",
                  "display": "2010-09-29"
              },
              {
                  "value": "2013-10-01",
                  "display": "2013-10-01"
              },
              {
                  "value": "2013-10-18",
                  "display": "2013-10-18"
              },
              {
                  "value": "2013-11-06",
                  "display": "2013-11-06"
              },
              {
                  "value": "2016-05-01",
                  "display": "2016-05-01"
              },
              {
                  "value": "2017-07-03",
                  "display": "2017-07-03"
              },
              {
                  "value": "2020-03-31",
                  "display": "2020-03-31"
              }
          ],
          "money": [
              {
                  "value": "USD 0.12",
                  "display": "USD 0.12"
              },
              {
                  "value": "USD 0.15",
                  "display": "USD 0.15"
              },
              {
                  "value": "USD 300",
                  "display": "USD 300"
              },
              {
                  "value": "USD 4.50",
                  "display": "USD 4.50"
              },
              {
                  "value": "USD 1.50",
                  "display": "USD 1.50"
              },
              {
                  "value": "USD 1155",
                  "display": "USD 1155"
              },
              {
                  "value": "USD 3.50",
                  "display": "USD 3.50"
              },
              {
                  "value": "USD 3.75",
                  "display": "USD 3.75"
              },
              {
                  "value": "USD 30674",
                  "display": "USD 30674"
              },
              {
                  "value": "USD 34152",
                  "display": "USD 34152"
              },
              {
                  "value": "USD 4819",
                  "display": "USD 4819"
              },
              {
                  "value": "USD 500",
                  "display": "USD 500"
              },
              {
                  "value": "USD 5377",
                  "display": "USD 5377"
              },
              {
                  "value": "USD 600",
                  "display": "USD 600"
              },
              {
                  "value": "USD 7181",
                  "display": "USD 7181"
              },
              {
                  "value": "USD 2016",
                  "display": "USD 2016"
              },
              {
                  "value": "USD 850000000",
                  "display": "USD 850000000"
              },
              {
                  "value": "USD 1.00",
                  "display": "USD 1.00"
              },
              {
                  "value": "USD 10000",
                  "display": "USD 10000"
              },
              {
                  "value": "USD 120",
                  "display": "USD 120"
              }
          ],
          "entity7": [
              {
                  "value": "51, 0.45",
                  "display": "51, 0.45"
              },
              {
                  "value": "13.8, 2",
                  "display": "13.8, 2"
              },
              {
                  "value": "17, 0.43",
                  "display": "17, 0.43"
              },
              {
                  "value": "2.71, 5",
                  "display": "2.71, 5"
              },
              {
                  "value": "24.2, 0",
                  "display": "24.2, 0"
              },
              {
                  "value": "3.2, 4",
                  "display": "3.2, 4"
              },
              {
                  "value": "3.87, 3",
                  "display": "3.87, 3"
              },
              {
                  "value": "31, 0.39",
                  "display": "31, 0.39"
              },
              {
                  "value": "37, 0.37",
                  "display": "37, 0.37"
              },
              {
                  "value": "5.6, 24",
                  "display": "5.6, 24"
              },
              {
                  "value": "54, 0.65",
                  "display": "54, 0.65"
              },
              {
                  "value": "57, 0.33",
                  "display": "57, 0.33"
              },
              {
                  "value": "58, 0.29",
                  "display": "58, 0.29"
              },
              {
                  "value": "6.5, 21",
                  "display": "6.5, 21"
              },
              {
                  "value": "6.7, 19",
                  "display": "6.7, 19"
              },
              {
                  "value": "62, 0.66",
                  "display": "62, 0.66"
              },
              {
                  "value": "8.8, 19",
                  "display": "8.8, 19"
              },
              {
                  "value": "88, 0.83",
                  "display": "88, 0.83"
              }
          ],
          "entity12": [
              {
                  "value": "DEFEAT",
                  "display": "Defeat"
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
              }
          ],
          "value_amount": [
              {
                  "value": "(ACQUISITION)#(USD 0.12)",
                  "display": "(Acquisition)#(USD 0.12)"
              },
              {
                  "value": "(ACQUISITION)#(USD 21390)",
                  "display": "(Acquisition)#(USD 21390)"
              },
              {
                  "value": "(ACQUISITION)#(USD 22930)",
                  "display": "(Acquisition)#(USD 22930)"
              },
              {
                  "value": "(CAPITAL)#(USD 850000000)",
                  "display": "(Capital)#(USD 850000000)"
              }
          ],
          "company_person": [
              {
                  "value": "(MELLON)#(JEREMY MICHALEK)",
                  "display": "(Mellon)#(Jeremy Michalek)"
              },
              {
                  "value": "(MELLON)#(TUGCE YUKSEL)",
                  "display": "(Mellon)#(Tugce Yuksel)"
              }
          ],
          "rank": 14,
          "displayTitle": "Plug-in electric vehicle",
          "relevantExtracts": "<b>Tesla </b>Model 3 ... <b>Tesla </b>Model S ... As of March 2020 , the <b>Tesla </b>Model 3 listed ... <b>Tesla </b>Model ... <b>Tesla </b>Model ... The two BEVs ... Leaf and the <b>Tesla </b>Model S . ... <b>Tesla </b>Model S electric ... As of June ... offered for the <b>Tesla </b>Model S , ... <b>Tesla </b><b>Motors </b>designed its Model ... In June 2013, <b>Tesla </b>announced their goal "
      },
      {
          "id": "/Web/Wikipedia/|Thomas_Edison_in_popular_culture",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.94077,
          "matchingpartnames": [
              "text"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "He is often portrayed in popular culture as an adversary of Nikola {b}Tesla{nb} .",
              "247,74",
              "6767,127",
              "In the Assassin's Creed video game series, Edison is portrayed as a member of The Knights Templar and one of the founders of the Abstergo Industries, attempting to discredit Nikola {b}Tesla{nb} , an ally of the Assassins Order .",
              "4582,221",
              "20238,502",
              "He teams up with Edison but ends up working with {b}Tesla{nb}.",
              "5463,55",
              "22042,55",
              "The Five Fists of Science is a 2006 graphic novel in which Edison is the villain, whose evil plans are thwarted by Nikola {b}Tesla{nb} and Mark Twain .",
              "5674,144",
              "22710,369",
              "His feud with {b}Tesla{nb}, who appeared earlier as an Archer class Servant, is a running joke throughout the game.",
              "6147,108",
              "23696,108",
              "The Doctor Who series 12 fourth episode \" Nikola {b}Tesla{nb}'s Night of Terror \" featured Thomas Edison as portrayed by Robert Glenister .",
              "6257,132",
              "23814,418",
              "To Mars With {b}Tesla{nb}",
              "7388,19",
              "27794,19",
              "or, the Mystery of the Hidden World by J. Weldon Cobb ( 1901 ) featured \"Young Edison\", a fictional nephew of Thomas Edison, helping Nikola {b}Tesla{nb} in his adventures with Martians.",
              "7408,178",
              "27814,304",
              "Edison appears in the second series of YouTube series Epic Rap Battles of History , in a rap battle against Nikola {b}Tesla{nb} .",
              "8003,122",
              "29229,265",
              "Edison's Medicine\" is a song by the band {b}Tesla{nb} from the album Psychotic Supper , which features the war of the currents between Edison's DC and {b}Tesla{nb}'s AC.",
              "1181,155",
              "12694,345"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "314,5,1222,5,1325,5,4763,5,5512,5,5796,5,6161,5,6306,5,7401,5,7548,5,8118,5,8780,5,8837,5;6884,5,12785,5,13028,5,20632,5,22091,5,23004,5,23710,5,24085,5,27807,5,28076,5,29484,5,30933,5,31040,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Thomas Edison in popular culture",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-19 01:22:40",
          "indexationtime": "2020-09-02 01:24:02",
          "version": "EhccC/ezumFvAct28cuWJA==",
          "size": 83773,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "Thomas_Edison_in_popular_culture",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "THOMAS EDISON",
                  "display": "Thomas Edison"
              },
              {
                  "value": "NIKOLA TESLA",
                  "display": "Nikola Tesla"
              },
              {
                  "value": "TOM EDISON",
                  "display": "Tom Edison"
              },
              {
                  "value": "THEODORE ROOSEVELT",
                  "display": "Theodore Roosevelt"
              },
              {
                  "value": "HENRY FORD",
                  "display": "Henry Ford"
              },
              {
                  "value": "TOM EDISONS",
                  "display": "Tom Edisons"
              },
              {
                  "value": "AUGUSTE VILLIERS",
                  "display": "Auguste Villiers"
              },
              {
                  "value": "BENEDICT CUMBERBATCH",
                  "display": "Benedict Cumberbatch"
              },
              {
                  "value": "BENITO CERENO",
                  "display": "Benito Cereno"
              },
              {
                  "value": "BERNADETTE PAJER",
                  "display": "Bernadette Pajer"
              },
              {
                  "value": "DAN GUTMAN",
                  "display": "Dan Gutman"
              },
              {
                  "value": "DONALD R. BENSEN",
                  "display": "Donald R. Bensen"
              },
              {
                  "value": "GARRETT P. SERVISS",
                  "display": "Garrett P. Serviss"
              },
              {
                  "value": "HELENA BLAVATSKY",
                  "display": "Helena Blavatsky"
              },
              {
                  "value": "JESS NEVINS",
                  "display": "Jess Nevins"
              },
              {
                  "value": "JON SCIESZKA",
                  "display": "Jon Scieszka"
              },
              {
                  "value": "KAMALA KHAN",
                  "display": "Kamala Khan"
              },
              {
                  "value": "KURT VONNEGUT",
                  "display": "Kurt Vonnegut"
              },
              {
                  "value": "LORD EWALD",
                  "display": "Lord Ewald"
              },
              {
                  "value": "MARK TWAIN",
                  "display": "Mark Twain"
              }
          ],
          "geo": [
              {
                  "value": "UNITED STATES",
                  "display": "United States"
              },
              {
                  "value": "INDIANA",
                  "display": "Indiana"
              },
              {
                  "value": "NEW YORK",
                  "display": "New York"
              },
              {
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "MENLO PARK",
                  "display": "Menlo Park"
              },
              {
                  "value": "BRADSHAW",
                  "display": "Bradshaw"
              },
              {
                  "value": "EUROPE",
                  "display": "Europe"
              },
              {
                  "value": "KANSAS",
                  "display": "Kansas"
              },
              {
                  "value": "ODESSA",
                  "display": "Odessa"
              }
          ],
          "wordcount": 1060,
          "exacthash": "Qtoy0qpBmgq/fYNiD7uSFQ==",
          "nearhash": "czoK6Sm2KKX0JuCJhdGQ4Q==",
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
                  "value": "title",
                  "display": "title"
              },
              {
                  "value": "value",
                  "display": "value"
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/Thomas_Edison_in_popular_culture",
          "sourcecsv2": [
              "Thomas_Edison",
              "Popular_culture",
              "Novel",
              "Film",
              "Comics",
              "Video_games",
              "Nikola_Tesla",
              "Young_Tom_Edison",
              "Mickey_Rooney",
              "Edison,_the_Man",
              "Spencer_Tracy",
              "Schoolhouse_Rock",
              "Histeria!",
              "List_of_Histeria!_characters",
              "Henry_Ford",
              "Tesla_(band)",
              "Psychotic_Supper",
              "War_of_the_currents",
              "Chumbawamba",
              "Un_(album)",
              "Bee_Gees",
              "Odessa_(Bee_Gees_album)",
              "V%C3%ADt%C4%9Bzslav_Nezval",
              "The_Current_War",
              "Benedict_Cumberbatch",
              "Edisonade",
              "The_Future_Eve",
              "1886_in_literature",
              "Auguste_Villiers_de_l%27Isle-Adam",
              "Android_(robot)",
              "Edison%27s_Conquest_of_Mars",
              "Garrett_P._Serviss",
              "1898_in_literature",
              "The_War_of_the_Worlds",
              "Welcome_to_the_Monkey_House",
              "Kurt_Vonnegut",
              "Incandescent_light_bulb",
              "And_Having_Writ...",
              "1978_in_literature",
              "Parallel_universe_(fiction)",
              "Donald_R._Bensen",
              "Extraterrestrial_life",
              "Republican_National_Committee",
              "President_of_the_United_States",
              "United_States_Secretary_of_War",
              "William_Howard_Taft",
              "1908_United_States_presidential_election",
              "New_York_(state)",
              "Theodore_Roosevelt",
              "Europe",
              "United_States_Marine_Corps",
              "1912_United_States_presidential_election",
              "Kamen_Rider_Ghost",
              "Assassin%27s_Creed",
              "The_Knights_Templar",
              "Order_of_Assassins",
              "Voyagers!",
              "2001_in_literature",
              "Dan_Gutman",
              "JLA:_Age_of_Wonder",
              "2003_in_comics",
              "DC_Comics",
              "Elseworlds",
              "Superman",
              "Tales_From_the_Bully_Pulpit",
              "2004_in_comics",
              "Benito_Cereno_(writer)",
              "Graphic_novel",
              "The_Five_Fists_of_Science",
              "2006_in_comics",
              "Mark_Twain",
              "Role-playing_game",
              "Helena_Blavatsky",
              "Karna",
              "Geronimo",
              "Doctor_Who",
              "Doctor_Who_(series_12)",
              "Nikola_Tesla%27s_Night_of_Terror",
              "Robert_Glenister",
              "Young_Indiana_Jones_Chronicles",
              "The_Time_Warp_Trio",
              "Jon_Scieszka",
              "Time_Warp_Trio",
              "Magic_Tree_House",
              "Mary_Pope_Osborne",
              "Exposition_Universelle_(1889)",
              "1891_in_literature",
              "1901_in_literature",
              "Clone_High",
              "Expiration_Date_(novel)",
              "Tim_Powers",
              "Epic_Rap_Battles_of_History",
              "Web_series",
              "Super_Science_Friends",
              "Bernadette_Pajer",
              "The_Simpsons",
              "The_Wizard_of_Evergreen_Terrace",
              "Homer_Simpson",
              "Ms._Marvel_(Kamala_Khan)",
              "Bob%27s_Burgers",
              "Topsy_(elephant)",
              "The_Big_Bang_Theory",
              "Radio_Times",
              "Scholastic_Corporation",
              "Perma-Bound",
              "Jess_Nevins",
              "List_of_Edison_patents",
              "Carbon_microphone",
              "Edison%27s_Phonograph_Doll",
              "Edison_screw",
              "Etheric_force",
              "Kinetoscope",
              "Phonograph",
              "Phonomotor",
              "Quadruplex_telegraph",
              "Tasimeter",
              "Consolidated_Edison",
              "Edison%E2%80%93Lalande_cell",
              "Fluoroscopy",
              "Movie_camera",
              "Nickel%E2%80%93iron_battery",
              "Thermionic_emission",
              "Ticker_tape",
              "Thomas_A._Edison,_Inc.",
              "Edison_and_Swan_Electric_Light_Company",
              "Edison_Gower-Bell_Telephone_Company_of_Europe,_Ltd.",
              "Edison_Illuminating_Company",
              "Edison_Machine_Works",
              "Edison_Manufacturing_Company",
              "Edison_Ore-Milling_Company",
              "Edison_Portland_Cement_Company",
              "Edison_Records",
              "Edison_Storage_Battery_Company",
              "Edison_Studios",
              "General_Electric",
              "Motion_Picture_Patents_Company",
              "MSA_Safety",
              "Oriental_Telephone_Company",
              "Thomas_Alva_Edison_Birthplace",
              "Edison%27s_Black_Maria",
              "Thomas_Edison_Depot_Museum",
              "Thomas_Alva_Edison_Memorial_Tower_and_Museum",
              "Thomas_Edison_National_Historical_Park",
              "Edison_State_Park",
              "Edison_Storage_Battery_Company_Building",
              "General_Electric_Research_Laboratory",
              "Edison_and_Ford_Winter_Estates",
              "Charles_Edison",
              "Theodore_Miller_Edison",
              "Tesla_(2020_film)",
              "Tales_from_the_Bully_Pulpit",
              "The_Execution_of_Mary_Stuart",
              "The_Kiss_(1896_film)",
              "Frankenstein_(1910_film)",
              "A_Night_of_Terror_(1911_film)",
              "Kidnapped_(1917_film)",
              "Edisonian_approach",
              "Pearl_Street_Station",
              "Edison_Museum",
              "Thomas_Edison_House",
              "Edison_Hotel_(Sunbury,_Pennsylvania)",
              "Telephonoscope",
              "Thomas_Edison_(Cottrill)",
              "Thomas_Alva_Edison_silver_dollar"
          ],
          "sourcestr1": "Thomas_Edison_in_popular_culture",
          "sourcestr2": "Q7789246",
          "sourcestr3": "Q20742825",
          "category": "cultural depiction",
          "sourcevarchar3": "[]",
          "sourcedouble1": 0.018047,
          "entity1": [
              {
                  "value": "1",
                  "display": "1"
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
                  "value": "1940",
                  "display": "1940"
              },
              {
                  "value": "11",
                  "display": "11"
              },
              {
                  "value": "12",
                  "display": "12"
              },
              {
                  "value": "13",
                  "display": "13"
              },
              {
                  "value": "15",
                  "display": "15"
              },
              {
                  "value": "1783",
                  "display": "1783"
              },
              {
                  "value": "1876",
                  "display": "1876"
              },
              {
                  "value": "1886",
                  "display": "1886"
              },
              {
                  "value": "1889",
                  "display": "1889"
              },
              {
                  "value": "1891",
                  "display": "1891"
              },
              {
                  "value": "1898",
                  "display": "1898"
              },
              {
                  "value": "1901",
                  "display": "1901"
              },
              {
                  "value": "1908",
                  "display": "1908"
              },
              {
                  "value": "1909",
                  "display": "1909"
              },
              {
                  "value": "1912",
                  "display": "1912"
              },
              {
                  "value": "1916",
                  "display": "1916"
              },
              {
                  "value": "1930",
                  "display": "1930"
              }
          ],
          "entity12": [
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
                  "value": "DIRECTOR",
                  "display": "Director"
              },
              {
                  "value": "FOUNDER",
                  "display": "Founder"
              }
          ],
          "entity14": [
              {
                  "value": "ACQUISITION",
                  "display": "Acquisition"
              }
          ],
          "rank": 15,
          "displayTitle": "Thomas Edison in popular culture",
          "relevantExtracts": "adversary of Nikola <b>Tesla </b>... to discredit Nikola <b>Tesla </b>, an ... up working with <b>Tesla</b>... thwarted by Nikola <b>Tesla </b>... His feud with <b>Tesla</b>, who ... episode &quot; Nikola <b>Tesla</b>&#39;s ... To Mars With <b>Tesla </b>... Edison, helping Nikola <b>Tesla </b>in ... battle against Nikola <b>Tesla </b>... by the band <b>Tesla </b>from ... Edison&#39;s DC and <b>Tesla</b>"
      },
      {
          "id": "/Web/Wikipedia/|CUDA",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.940541,
          "matchingpartnames": [
              "text"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "CUDA works with all Nvidia GPUs from the G8x series onwards, including GeForce , Quadro and the {b}Tesla{nb} line.",
              "3557,107",
              "28031,314",
              "CUDA SDK 1.0 support for compute capability 1.0 - 1.1 ({b}Tesla{nb}",
              "8261,60",
              "39864,62",
              "CUDA SDK 1.1 support for compute capability 1.0 - 1.1+x ({b}Tesla{nb}",
              "8324,62",
              "40054,64",
              "CUDA SDK 2.0 support for compute capability 1.0 - 1.1+x ({b}Tesla{nb}",
              "8389,62",
              "40129,64",
              "CUDA SDK 2.1 - 2.3.1 support for compute capability 1.0 - 1.3 ({b}Tesla{nb}",
              "8454,68",
              "40204,72",
              "CUDA SDK 3.0 - 3.1 support for compute capability 1.0 - 2.0 ({b}Tesla{nb}, Fermi",
              "8525,73",
              "40755,77",
              "CUDA SDK 3.2 support for compute capability 1.0 - 2.1 ({b}Tesla{nb}, Fermi",
              "8601,67",
              "41077,69",
              "CUDA SDK 4.0 - 4.2 support for compute capability 1.0 - 2.1+x ({b}Tesla{nb}, Fermi, more?).",
              "8671,84",
              "41274,88",
              "CUDA SDK 5.0 - 5.5 support for compute capability 1.0 - 3.5 ({b}Tesla{nb}, Fermi, Kepler).",
              "8757,83",
              "41372,87",
              "CUDA SDK 6.0 support for compute capability 1.0 - 3.5 ({b}Tesla{nb}, Fermi, Kepler).",
              "8842,77",
              "41469,79"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "3653,5,8316,5,8381,5,8446,5,8517,5,8586,5,8656,5,8734,5,8818,5,8897,5,8976,5,9062,5,9971,5,10005,5,10131,5,10143,5,10155,5,11723,5,11736,5,11749,5,12014,5,12027,5,12046,5,13910,5,14266,5,14277,5,14289,5,14312,5,14656,5,15010,5,15020,5,15031,5,15041,5,15153,5,15606,5,15617,5,15627,5,15732,5,15744,5,16191,5;28330,5,39921,5,40113,5,40188,5,40271,5,40820,5,41134,5,41341,5,41437,5,41526,5,41615,5,41701,5,43021,5,43186,5,43352,5,43364,5,43376,5,45276,5,45289,5,45302,5,45740,5,45753,5,45772,5,47891,5,48397,5,48408,5,48420,5,48513,5,49028,5,49454,5,49464,5,49475,5,49485,5,49875,5,50404,5,50415,5,50425,5,50904,5,50916,5,51723,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "CUDA",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-09-01 09:21:06",
          "indexationtime": "2020-09-01 20:13:29",
          "version": "/xaBum76KNo2U0MPzEJDZA==",
          "size": 361633,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "CUDA",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "XAVIER AGX",
                  "display": "Xavier Agx"
              },
              {
                  "value": "PEGASUS AGX",
                  "display": "Pegasus Agx"
              },
              {
                  "value": "WOLFRAM MATHEMATICA",
                  "display": "Wolfram Mathematica"
              }
          ],
          "company": [
              {
                  "value": "NVIDIA",
                  "display": "NVIDIA"
              },
              {
                  "value": "MICROSOFT",
                  "display": "Microsoft"
              }
          ],
          "geo": [
              {
                  "value": "PORTLAND",
                  "display": "Portland"
              }
          ],
          "wordcount": 3916,
          "exacthash": "SJ7bDRvxOhPU4ox8hdGaTQ==",
          "nearhash": "h+f0sjQMR71NDuPtFmVxFw==",
          "partnamelocations": [
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
          "url1": "https://en.wikipedia.org/wiki/CUDA",
          "sourcecsv1": [
              "Developer",
              "Initial release",
              "Stable release",
              "Operating system",
              "Platform",
              "Type",
              "License",
              "Website"
          ],
          "sourcecsv2": [
              "Software_developer",
              "Nvidia",
              "Software_release_life_cycle",
              "Operating_system",
              "Windows",
              "Linux",
              "Computing_platform",
              "Software_categories",
              "GPGPU",
              "Software_license",
              "Proprietary_software",
              "Parallel_computing",
              "Application_programming_interface",
              "Software_engineer",
              "Graphics_processing_unit",
              "Instruction_set",
              "Compute_kernel",
              "C_(programming_language)",
              "C%2B%2B",
              "Fortran",
              "Direct3D",
              "OpenGL",
              "OpenACC",
              "OpenCL",
              "Real-time_computer_graphics",
              "3D_graphics",
              "Multi-core",
              "Central_processing_unit",
              "Algorithm",
              "Push-relabel_maximum_flow_algorithm",
              "Sort_algorithm",
              "List_(computing)",
              "Fast_wavelet_transform",
              "Molecular_dynamics",
              "Machine_learning",
              "Directive_(programming)",
              "NVIDIA_CUDA_Compiler",
              "LLVM",
              "The_Portland_Group",
              "Khronos_Group",
              "DirectCompute",
              "C%2B%2B_AMP",
              "Python_(programming_language)",
              "Perl",
              "Java_(programming_language)",
              "Ruby_(programming_language)",
              "Lua_(programming_language)",
              "Common_Lisp_(programming_language)",
              "Haskell_(programming_language)",
              "R_(programming_language)",
              "MATLAB",
              "IDL_(programming_language)",
              "Julia_(programming_language)",
              "Mathematica",
              "Computer_game",
              "Physics_processing_unit",
              "PhysX",
              "Bullet_(software)",
              "Computational_biology",
              "Cryptography",
              "Order_of_magnitude",
              "API",
              "Software_development_kit",
              "Microsoft_Windows",
              "MacOS",
              "Nvidia_GeForce",
              "Nvidia_Quadro",
              "Nvidia_Tesla",
              "Shared_memory_(interprocess_communication)",
              "Scratchpad_RAM",
              "SIMD",
              "Space_partitioning",
              "Ray_tracing_(graphics)",
              "Run-time_type_information",
              "Single_precision_floating-point_format",
              "Denormal_number",
              "Microarchitecture",
              "Tesla_(microarchitecture)",
              "Fermi_(microarchitecture)",
              "Kepler_(microarchitecture)",
              "Maxwell_(microarchitecture)",
              "Pascal_(microarchitecture)",
              "Volta_(microarchitecture)",
              "Turing_(microarchitecture)",
              "Ampere_(microarchitecture)",
              "Original_equipment_manufacturer",
              "Linear_algebra",
              "Common_Lisp",
              "Clojure",
              "F_Sharp_(programming_language)",
              "Wolfram_Mathematica",
              "Jacket_(software)",
              ".NET_Framework",
              "Encryption",
              "Decryption",
              "Data_compression",
              "Massive_parallel_sequencing",
              "Proteins",
              "Virtual_reality",
              "X-ray_computed_tomography",
              "Magnetic_resonance_imaging",
              "Fluid_dynamics",
              "Neural_network",
              "Face_recognition",
              "Distributed_computing",
              "Cryptocurrencies",
              "BOINC",
              "SETI@home",
              "Structure_from_motion",
              "SYCL",
              "BrookGPU",
              "Heterogeneous-compute_Interface_for_Portability",
              "Array_programming",
              "Stream_processing",
              "RCUDA",
              "Molecular_modeling_on_GPU",
              "Vulkan_(API)",
              "YouTube",
              "Doi_(identifier)",
              "PMC_(identifier)",
              "PMID_(identifier)",
              "Assaf_Schuster",
              "ISBN_(identifier)",
              "Michael_Larabel",
              "Phoronix",
              "GeForce",
              "List_of_Nvidia_graphics_processing_units",
              "List_of_Nvidia_graphics_processing_units#Pre-GeForce",
              "NV1",
              "NV2",
              "RIVA_128",
              "RIVA_TNT",
              "RIVA_TNT2",
              "GeForce_256",
              "GeForce_2_series",
              "GeForce_4_series",
              "Vertex_shader",
              "Pixel_shader",
              "GeForce_3_series",
              "GeForce_FX_series",
              "GeForce_6_series",
              "GeForce_7_series",
              "Unified_Shader_Model",
              "GeForce_8_series",
              "GeForce_9_series",
              "GeForce_100_series",
              "GeForce_200_series",
              "GeForce_300_series",
              "GeForce_400_series",
              "GeForce_500_series",
              "Non-uniform_memory_access",
              "GeForce_600_series",
              "GeForce_700_series",
              "GeForce_800M_series",
              "GeForce_900_series",
              "GeForce_10_series",
              "GeForce_16_series",
              "GeForce_20_series",
              "Nvidia_NVENC",
              "Nvidia_PureVideo",
              "Cg_(programming_language)",
              "Gelato_(software)",
              "Nvidia_GameWorks",
              "OptiX",
              "Nvidia_RTX",
              "Nvidia_System_Tools",
              "VDPAU",
              "Nvidia_3D_Vision",
              "Nvidia_G-Sync",
              "Nvidia_Optimus",
              "Nvidia_Surround",
              "NVLink",
              "Scalable_Link_Interface",
              "TurboCache",
              "Hopper_(microarchitecture)",
              "Quadro",
              "Nvidia_Quadro_Plex",
              "General-purpose_computing_on_graphics_processing_units",
              "Nvidia_DGX",
              "Video_game_console",
              "Xbox_(console)",
              "RSX_Reality_Synthesizer",
              "PlayStation_3",
              "Tegra",
              "Nintendo_Switch",
              "Shield_Portable",
              "Shield_Tablet",
              "Shield_Android_TV",
              "GeForce_Now",
              "System_on_a_chip",
              "GoForce",
              "Nvidia_Drive",
              "Nvidia_Jetson",
              "Project_Denver",
              "Chipset",
              "Comparison_of_Nvidia_chipsets",
              "Jen-Hsun_Huang",
              "Chris_Malachowsky",
              "Curtis_Priem",
              "David_Kirk_(scientist)",
              "Bill_Dally",
              "3dfx_Interactive",
              "Ageia",
              "Acer_Laboratories_Incorporated",
              "Icera",
              "Mellanox_Technologies",
              "Mental_Images",
              "PortalPlayer",
              "Processor_(computing)",
              "Model_of_computation",
              "Turing_machine",
              "Universal_Turing_machine",
              "Post%E2%80%93Turing_machine",
              "Quantum_Turing_machine",
              "Belt_machine",
              "Stack_machine",
              "Finite-state_machine",
              "Finite_state_machine_with_datapath",
              "Hierarchical_state_machine",
              "Queue_automaton",
              "Register_machine",
              "Counter_machine",
              "Pointer_machine",
              "Random-access_machine",
              "Random-access_stored-program_machine",
              "Computer_architecture",
              "Von_Neumann_architecture",
              "Harvard_architecture",
              "Modified_Harvard_architecture",
              "Dataflow_architecture",
              "Transport_triggered_architecture",
              "Cellular_architecture",
              "Endianness",
              "Computer_data_storage",
              "Heterogenous_Unified_Memory_Access",
              "Register_memory_architecture",
              "Cache_hierarchy",
              "Memory_hierarchy",
              "Virtual_memory",
              "Secondary_storage",
              "Heterogeneous_System_Architecture",
              "Fabric_computing",
              "Multiprocessing",
              "Cognitive_computing",
              "Neuromorphic_engineering",
              "Instruction_set_architecture",
              "Complex_instruction_set_computer",
              "Reduced_instruction_set_computer",
              "Application-specific_instruction_set_processor",
              "Explicit_data_graph_execution",
              "TRIPS_architecture",
              "Very_long_instruction_word",
              "Explicitly_parallel_instruction_computing",
              "Minimal_instruction_set_computer",
              "One_instruction_set_computer",
              "No_instruction_set_computing",
              "Zero_instruction_set_computer",
              "Comparison_of_instruction_set_architectures",
              "Addressing_mode",
              "X86",
              "ARM_architecture",
              "MIPS_architecture",
              "Power_ISA",
              "SPARC",
              "IA-64",
              "Unicore",
              "MicroBlaze",
              "RISC-V",
              "Little_man_computer",
              "List_of_instruction_sets",
              "Instruction_cycle",
              "Instruction_pipelining",
              "Pipeline_stall",
              "Operand_forwarding",
              "Classic_RISC_pipeline",
              "Hazard_(computer_architecture)",
              "Data_dependency",
              "Structural_hazard",
              "Control_hazard",
              "False_sharing",
              "Out-of-order_execution",
              "Tomasulo_algorithm",
              "Reservation_station",
              "Re-order_buffer",
              "Register_renaming",
              "Speculative_execution",
              "Branch_predictor",
              "Memory_dependence_prediction",
              "Bit-level_parallelism",
              "Bit-serial_architecture",
              "Word_(computer_architecture)",
              "Instruction-level_parallelism",
              "Scalar_processor",
              "Superscalar_processor",
              "Task_parallelism",
              "Thread_(computing)",
              "Process_(computing)",
              "Data_parallelism",
              "Vector_processor",
              "Memory-level_parallelism",
              "Distributed_architecture",
              "Multithreading_(computer_architecture)",
              "Temporal_multithreading",
              "Simultaneous_multithreading",
              "Hyper-threading",
              "Speculative_multithreading",
              "Preemption_(computing)",
              "Cooperative_multithreading",
              "Flynn%27s_taxonomy",
              "SISD",
              "SWAR",
              "Single_instruction,_multiple_threads",
              "MISD",
              "MIMD",
              "SPMD",
              "Computer_performance",
              "Transistor_count",
              "Instructions_per_cycle",
              "Cycles_per_instruction",
              "Instructions_per_second",
              "FLOPS",
              "Transactions_per_second",
              "SUPS",
              "Performance_per_watt",
              "Cache_performance_measurement_and_metric",
              "Computer_performance_by_orders_of_magnitude",
              "Barrel_processor",
              "Coprocessor",
              "Application-specific_integrated_circuit",
              "Field-programmable_gate_array",
              "Complex_programmable_logic_device",
              "Multi-chip_module",
              "System_in_package",
              "Microprocessor",
              "Microcontroller",
              "Mobile_processor",
              "Notebook_processor",
              "Ultra-low-voltage_processor",
              "Multiprocessor_system-on-chip",
              "Programmable_system-on-chip",
              "Network_on_a_chip",
              "Hardware_acceleration",
              "AI_accelerator",
              "Vision_processing_unit",
              "Digital_signal_processor",
              "Tensor_processing_unit",
              "Secure_cryptoprocessor",
              "Network_processor",
              "Baseband_processor",
              "1-bit_computing",
              "4-bit_computing",
              "8-bit_computing",
              "12-bit_computing",
              "Apollo_Guidance_Computer",
              "16-bit_computing",
              "24-bit_computing",
              "32-bit_computing",
              "48-bit_computing",
              "64-bit_computing",
              "128-bit_computing",
              "256-bit_computing",
              "512-bit_computing",
              "Bit_slicing",
              "Single-core",
              "Multi-core_processor",
              "Manycore_processor",
              "Heterogeneous_computing",
              "Processor_core",
              "Cache_(computing)",
              "CPU_cache",
              "Cache_replacement_policies",
              "Cache_coherence",
              "Bus_(computing)",
              "Clock_rate",
              "Clock_signal",
              "FIFO_(computing_and_electronics)",
              "Execution_unit",
              "Arithmetic_logic_unit",
              "Address_generation_unit",
              "Floating-point_unit",
              "Memory_management_unit",
              "Load%E2%80%93store_unit",
              "Translation_lookaside_buffer",
              "Memory_controller",
              "Digital_logic",
              "Combinational_logic",
              "Sequential_logic",
              "Glue_logic",
              "Logic_gate",
              "Quantum_logic_gate",
              "Gate_array",
              "Hardware_register",
              "Processor_register",
              "Status_register",
              "Stack_register",
              "Register_file",
              "Memory_buffer_register",
              "Program_counter",
              "Instruction_unit",
              "Data_buffer",
              "Write_buffer",
              "Microcode",
              "ROM_image",
              "Counter_(digital)",
              "Datapath",
              "Multiplexer",
              "Demultiplexer",
              "Adder_(electronics)",
              "Binary_multiplier",
              "CPU_multiplier",
              "Binary_decoder",
              "Address_decoder",
              "Sum_addressed_decoder",
              "Barrel_shifter",
              "Electronic_circuit",
              "Integrated_circuit",
              "Three-dimensional_integrated_circuit",
              "Mixed-signal_integrated_circuit",
              "Power_management_integrated_circuit",
              "Boolean_circuit",
              "Digital_circuit",
              "Analog_circuit",
              "Quantum_circuit",
              "Switch",
              "Power_management",
              "Power_Management_Unit",
              "Advanced_Power_Management",
              "Advanced_Configuration_and_Power_Interface",
              "Dynamic_frequency_scaling",
              "Dynamic_voltage_scaling",
              "Clock_gating",
              "History_of_general-purpose_CPUs",
              "Microprocessor_chronology",
              "Processor_design",
              "Digital_electronics",
              "Hardware_security_module",
              "Semiconductor_device_fabrication",
              "Tick%E2%80%93tock_model",
              "Massively_parallel",
              "Cloud_computing",
              "Supercomputer",
              "Computer_network",
              "Systolic_array",
              "Loop-level_parallelism",
              "Pipeline_(computing)",
              "Computer_multitasking",
              "Bulldozer_(microarchitecture)",
              "Hardware_scout",
              "Parallel_random-access_machine",
              "Parallel_external_memory",
              "Analysis_of_parallel_algorithms",
              "Amdahl%27s_law",
              "Gustafson%27s_law",
              "Cost_efficiency",
              "Karp%E2%80%93Flatt_metric",
              "Parallel_slowdown",
              "Speedup",
              "Fiber_(computer_science)",
              "Instruction_window",
              "Array_data_structure",
              "Memory_coherence",
              "Cache_invalidation",
              "Barrier_(computer_science)",
              "Synchronization_(computer_science)",
              "Application_checkpointing",
              "Computer_programming",
              "Dataflow_programming",
              "Parallel_programming_model",
              "Implicit_parallelism",
              "Explicit_parallelism",
              "Concurrency_(computer_science)",
              "Non-blocking_algorithm",
              "Computer_hardware",
              "Symmetric_multiprocessing",
              "Asymmetric_multiprocessing",
              "Semiconductor_memory",
              "Shared_memory",
              "Distributed_memory",
              "Distributed_shared_memory",
              "Uniform_memory_access",
              "Cache-only_memory_architecture",
              "Computer_cluster",
              "Grid_computing",
              "Ateji_PX",
              "Boost_(C%2B%2B_libraries)",
              "Chapel_(programming_language)",
              "HPX",
              "Charm%2B%2B",
              "Cilk",
              "Coarray_Fortran",
              "Dryad_(programming)",
              "Global_Arrays",
              "GPUOpen",
              "Message_Passing_Interface",
              "OpenMP",
              "OpenHMPP",
              "Parallel_Extensions",
              "Parallel_Virtual_Machine",
              "POSIX_Threads",
              "RaftLib",
              "Unified_Parallel_C",
              "Threading_Building_Blocks",
              "ZPL_(programming_language)",
              "Automatic_parallelization",
              "Deadlock",
              "Deterministic_algorithm",
              "Embarrassingly_parallel",
              "Race_condition",
              "Software_lockout",
              "Scalability",
              "Starvation_(computer_science)",
              "GND_(identifier)",
              "LCCN_(identifier)"
          ],
          "sourcestr1": "CUDA",
          "sourcestr2": "Q477690",
          "sourcestr3": "Q9143",
          "category": "programming language",
          "sourcevarchar3": "[{\"Developer\":[\"Nvidia\",\"Corporation\"],\"Initial release\":[\"June23, 2007\",\";13years ago\"],\"Stable release\":[\"11.0.228\\n   \\/    August4, 2020\",\";28days ago\"],\"Operating system\":[\"Windows\",\",\",\"Linux\"],\"Platform\":\"Supported GPUs\",\"Type\":\"GPGPU\",\"License\":\"Proprietary\",\"Website\":[\"developer\",\".nvidia\",\".com\",\"\\/cuda-zone\"]}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg",
          "sourcedouble1": 0.030476,
          "entity1": [
              {
                  "value": "32",
                  "display": "32"
              },
              {
                  "value": "2",
                  "display": "2"
              },
              {
                  "value": "32768",
                  "display": "32768"
              },
              {
                  "value": "64",
                  "display": "64"
              },
              {
                  "value": "16384",
                  "display": "16384"
              },
              {
                  "value": "16",
                  "display": "16"
              },
              {
                  "value": "2048",
                  "display": "2048"
              },
              {
                  "value": "1.0",
                  "display": "1.0"
              },
              {
                  "value": "65536",
                  "display": "65536"
              },
              {
                  "value": "1",
                  "display": "1"
              },
              {
                  "value": "1.1",
                  "display": "1.1"
              },
              {
                  "value": "2.0",
                  "display": "2.0"
              },
              {
                  "value": "8",
                  "display": "8"
              },
              {
                  "value": "128",
                  "display": "128"
              },
              {
                  "value": "48",
                  "display": "48"
              },
              {
                  "value": "3.0",
                  "display": "3.0"
              },
              {
                  "value": "8.0",
                  "display": "8.0"
              },
              {
                  "value": "1.2",
                  "display": "1.2"
              },
              {
                  "value": "4",
                  "display": "4"
              },
              {
                  "value": "6.0",
                  "display": "6.0"
              }
          ],
          "date": [
              {
                  "value": "2007-02-15",
                  "display": "2007-02-15"
              },
              {
                  "value": "2008-02-14",
                  "display": "2008-02-14"
              }
          ],
          "entity7": [
              {
                  "value": "1.0, 1.1",
                  "display": "1.0, 1.1"
              },
              {
                  "value": "1.2, 1.3",
                  "display": "1.2, 1.3"
              },
              {
                  "value": "1.1, 1.2",
                  "display": "1.1, 1.2"
              },
              {
                  "value": "3.0, 3.2",
                  "display": "3.0, 3.2"
              },
              {
                  "value": "3.5, 3.7",
                  "display": "3.5, 3.7"
              },
              {
                  "value": "5.0, 5.2",
                  "display": "5.0, 5.2"
              },
              {
                  "value": "6.1, 6.2",
                  "display": "6.1, 6.2"
              },
              {
                  "value": "7.0, 7.2",
                  "display": "7.0, 7.2"
              },
              {
                  "value": "7.5, 8.0",
                  "display": "7.5, 8.0"
              },
              {
                  "value": "1.2, 2.0",
                  "display": "1.2, 2.0"
              },
              {
                  "value": "1.3, 64",
                  "display": "1.3, 64"
              },
              {
                  "value": "2, 7.0",
                  "display": "2, 7.0"
              },
              {
                  "value": "2.0, 2.0",
                  "display": "2.0, 2.0"
              },
              {
                  "value": "2.0, 2.1",
                  "display": "2.0, 2.1"
              },
              {
                  "value": "3.0, 3.5",
                  "display": "3.0, 3.5"
              },
              {
                  "value": "3.7, 5.0",
                  "display": "3.7, 5.0"
              },
              {
                  "value": "5.2, 6.0",
                  "display": "5.2, 6.0"
              },
              {
                  "value": "5.3, 32",
                  "display": "5.3, 32"
              },
              {
                  "value": "5.3, 6",
                  "display": "5.3, 6"
              },
              {
                  "value": "5.3, 6.0",
                  "display": "5.3, 6.0"
              }
          ],
          "entity8": [
              {
                  "value": "//END",
                  "display": "//end"
              }
          ],
          "entity14": [
              {
                  "value": "SHARES",
                  "display": "Shares"
              }
          ],
          "rank": 16,
          "displayTitle": "CUDA",
          "relevantExtracts": "CUDA works with ... Quadro and the <b>Tesla </b>... CUDA SDK 1.0 ... - 1.1 (<b>Tesla</b>... CUDA SDK 1.1 ... - 1.1+x (<b>Tesla</b>... CUDA SDK 2.0 ... - 1.1+x (<b>Tesla</b>... CUDA SDK 2.1 ... - 1.3 (<b>Tesla</b>... CUDA SDK 3.0 ... - 2.0 (<b>Tesla</b>... CUDA SDK 3.2 ... - 2.1 (<b>Tesla</b>... CUDA SDK 4.0 ... - 2.1+x (<b>Tesla</b>... CUDA SDK 5.0 ... - 3.5 (<b>Tesla</b>... CUDA SDK 6.0 ... - 3.5 (<b>Tesla</b>"
      },
      {
          "id": "/Web/Wikipedia/|PMD_85",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.937779,
          "matchingpartnames": [
              "text",
              "tables"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "A 1987 Czechoslovak {b}Tesla{nb} PMD85-2A with a MHB8080A CPU 2.048 Mhz",
              "1571,64",
              "16168,64",
              "The PMD 85-0 , a prototype produced by {b}Tesla{nb} Piešťany (author was Roman Kišš), was originally in a white -coloured case and later in some other colours.",
              "1637,152",
              "16259,201",
              "The PMD 85 , produced by {b}Tesla{nb} Piešťany since 1985, was known as the PMD 85 or PMD 85-1.",
              "1815,88",
              "16494,96",
              "The PMD 85-2 , produced by {b}Tesla{nb} Piešťany since 1986, introduced some improvements in BASIC, some in input routines (for instance, key autorepeat), a more ergonomic keyboard (but less mechanically reliable) and also terminal mode.",
              "2064,230",
              "16817,366",
              "The PMD 85-2A , produced by {b}Tesla{nb} Bratislava since 1987, used 64 Kib RAM chips instead of 48 Kib, leading to less overheating of the memory chips, resulting in more memory available for BASIC, but was otherwise compatible with PMD 85-2.",
              "2369,236",
              "17353,286",
              "The PMD 85-3 , produced by {b}Tesla{nb} Bratislava since 1988, added colour TV output.",
              "2607,79",
              "17649,121",
              "{b}Tesla{nb} PMD-85 Infoserver - Emulator PMD 85 and its clones for Windows",
              "3431,68",
              "20084,68",
              "{b}Tesla{nb} Piešťany Introduced :",
              "3578,27",
              "41210,31",
              "The PMD 85 was an 8-bit personal computer produced from 1985 by the companies {b}Tesla{nb} Piešťany and {b}Tesla{nb} Bratislava in the former Czechoslovakia .",
              "2,144",
              "7858,468"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "80,5,99,5,1591,5,1676,5,1840,5,2091,5,2397,5,2634,5,3431,5;8089,5,8172,5,16188,5,16304,5,16525,5,16850,5,17387,5,17682,5,20084,5"
                  },
                  {
                      "partname": "tables",
                      "data": "3578,5;41210,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "PMD 85",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-18 16:17:36",
          "indexationtime": "2020-09-01 22:59:01",
          "version": "8+1QaqRatjW5TD3AezVosw==",
          "size": 41086,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "PMD_85",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "MARTIN SCHOTEK",
                  "display": "Martin Schotek"
              }
          ],
          "company": [
              {
                  "value": "ATARI",
                  "display": "Atari"
              },
              {
                  "value": "INTEL",
                  "display": "Intel"
              }
          ],
          "geo": [
              {
                  "value": "BRATISLAVA",
                  "display": "Bratislava"
              },
              {
                  "value": "SLOVAKIA",
                  "display": "Slovakia"
              }
          ],
          "wordcount": 458,
          "exacthash": "WvdN5InBuZlN1sDfRBQmhg==",
          "nearhash": "euMWzT4dI9EeYs1nOjqrZA==",
          "partnamelocations": [
              {
                  "value": "tables",
                  "display": "tables"
              },
              {
                  "value": "title",
                  "display": "title"
              },
              {
                  "value": "value",
                  "display": "value"
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/PMD_85",
          "sourcecsv1": [
              "Manufacturer",
              "Introduced",
              "Processor",
              "Frequency",
              "Memory"
          ],
          "sourcecsv2": [
              "Tesla_(Czechoslovak_company)",
              "Pie%C5%A1%C5%A5any",
              "Intel_8080",
              "MHz",
              "Kibibyte",
              "Read-write_memory",
              "Read-only_memory",
              "Personal_computer",
              "Bratislava",
              "Czechoslovakia",
              "Slovakia",
              "IQ_151",
              "Video_gaming_in_the_Czech_Republic",
              "ZX_Spectrum",
              "Atari",
              "Currency",
              "Western_world",
              "Velvet_Revolution",
              "Central_processing_unit",
              "Random-access_memory",
              "System_monitor",
              "Compact_Cassette",
              "TV",
              "Black_and_white",
              "PAL",
              "Component_video",
              "Display_resolution",
              "Grayscale",
              "Colour",
              "Tape_recorder",
              "Current_loop",
              "RS-232",
              "BASIC_programming_language",
              "Pascal_programming_language",
              "Assembly_language",
              "Logo_programming_language",
              "Programmer_(hardware)",
              "IEEE-488",
              "Intel_8255",
              "Handshaking",
              "White",
              "Gray",
              "Computer_keyboard",
              "Computer_terminal",
              "Backward_compatible",
              "Kibibit",
              "Character_encoding",
              "Cyrillic",
              "Checksum",
              "Relocation_(computer_science)",
              "MA%C5%A4O",
              "Didaktik"
          ],
          "sourcestr1": "PMD_85",
          "sourcestr2": "Q1066773",
          "sourcestr3": "Q16338",
          "category": "personal computer",
          "sourcevarchar3": "[{\"Manufacturer\":[\"Tesla\",\"Pie\\u0161\\u0165any\"],\"Introduced\":\"1985\",\"Processor\":\"MHB8080A\",\"Frequency\":[\"2.048\",\"MHz\"],\"Memory\":[\"48\",\"KiB\",\"RWM\",\", 4KiB\",\"ROM\"]}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/PMD_85-1.jpg/1200px-PMD_85-1.jpg",
          "sourcedouble1": 0.006383,
          "entity1": [
              {
                  "value": "85",
                  "display": "85"
              },
              {
                  "value": "8",
                  "display": "8"
              },
              {
                  "value": "2.048",
                  "display": "2.048"
              },
              {
                  "value": "48",
                  "display": "48"
              },
              {
                  "value": "1985",
                  "display": "1985"
              },
              {
                  "value": "1987",
                  "display": "1987"
              },
              {
                  "value": "64",
                  "display": "64"
              },
              {
                  "value": "4",
                  "display": "4"
              },
              {
                  "value": "1986",
                  "display": "1986"
              },
              {
                  "value": "1988",
                  "display": "1988"
              },
              {
                  "value": "2",
                  "display": "2"
              },
              {
                  "value": "-2",
                  "display": "-2"
              },
              {
                  "value": "-232",
                  "display": "-232"
              },
              {
                  "value": "32",
                  "display": "32"
              },
              {
                  "value": "6",
                  "display": "6"
              },
              {
                  "value": "-85",
                  "display": "-85"
              },
              {
                  "value": "151",
                  "display": "151"
              },
              {
                  "value": "1989",
                  "display": "1989"
              },
              {
                  "value": "256",
                  "display": "256"
              },
              {
                  "value": "288",
                  "display": "288"
              }
          ],
          "entity14": [
              {
                  "value": "ACQUISITION",
                  "display": "Acquisition"
              }
          ],
          "rank": 17,
          "displayTitle": "PMD 85",
          "relevantExtracts": "A 1987 Czechoslovak <b>Tesla </b>PMD85-2A with ... prototype produced by <b>Tesla </b>Piešťany ... , produced by <b>Tesla </b>Piešťany ... , produced by <b>Tesla </b>Piešťany ... , produced by <b>Tesla </b>Bratislava ... , produced by <b>Tesla </b>Bratislava ... <b>Tesla </b>PMD-85 ... <b>Tesla </b>... by the companies <b>Tesla </b>Piešťany and <b>Tesla </b>Bratislava "
      },
      {
          "id": "/Web/Wikipedia/|RAV4_EV",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.934818,
          "matchingpartnames": [
              "text",
              "tables"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "Toyota worked together with {b}Tesla Motors{nb} to develop the second generation RAV4 EV, and the electric SUV was released in the United States in September 2012.",
              "903,156",
              "11848,230",
              "The first prototype was built in just three weeks after the signing of a {b}Tesla{nb} and Toyota joint development agreement, and testing began in July 2010.",
              "11360,150",
              "61684,297",
              "The lithium metal-oxide battery and other power train components were supplied by {b}Tesla Motors{nb}.",
              "11740,95",
              "62560,95",
              "The second generation RAV4 EV combines a {b}Tesla{nb}-designed and produced battery and electric powertrain with Toyota's SUV model.",
              "12503,125",
              "64989,125",
              "The electric motor supplied by {b}Tesla{nb} is an AC induction motor , a departure from Toyota's practice of using synchronous permanent-magnet motors in their hybrid electric vehicles .",
              "12629,179",
              "65115,507",
              "The electric SUV was developed by {b}Tesla{nb} and Toyota Technical Center U.S.A. in Michigan.",
              "16233,87",
              "74043,87",
              "On July 15, 2011, {b}Tesla{nb} entered into a supply and services agreement with Toyota for the supply of a validated electric powertrain system, including a battery, charging system, inverter, motor, gearbox and associated software, which would be integrated into an electric vehicle version of the Toyota RAV4.",
              "16321,305",
              "74278,305",
              "The battery supply deal between Toyota and {b}Tesla{nb} concluded with the end of production in August 2014.",
              "16869,101",
              "75372,101",
              "{b}Tesla Motors{nb}",
              "17066,12",
              "76457,12",
              "Toyota and {b}Tesla Motors{nb} Production :",
              "18251,36",
              "196906,38"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "931,12,11433,5,11822,12,12370,5,12466,5,12544,5,12660,5,16088,12,16164,5,16267,5,16339,5,16746,5,16799,5,16912,5,17066,12;11946,12,61757,5,62642,12,64091,5,64259,5,65030,5,65204,5,73894,12,73974,5,74077,5,74296,5,74892,5,74997,5,75415,5,76457,12"
                  },
                  {
                      "partname": "tables",
                      "data": "18262,12;196917,12"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Toyota RAV4 EV",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-22 22:58:59",
          "indexationtime": "2020-09-02 10:36:29",
          "version": "m//j1YasPu1bH+hlyxEOsQ==",
          "size": 195944,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "RAV4_EV",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "company": [
              {
                  "value": "TESLA MOTORS",
                  "display": "Tesla Motors"
              },
              {
                  "value": "PANASONIC",
                  "display": "Panasonic"
              },
              {
                  "value": "CHEVRON",
                  "display": "Chevron"
              },
              {
                  "value": "ENERGY CONVERSION DEVICES",
                  "display": "Energy Conversion Devices"
              },
              {
                  "value": "GENERAL MOTORS",
                  "display": "General Motors"
              },
              {
                  "value": "TOYOTA MOTOR",
                  "display": "Toyota Motor"
              }
          ],
          "geo": [
              {
                  "value": "TOYOTA",
                  "display": "Toyota"
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
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "CANADA",
                  "display": "Canada"
              },
              {
                  "value": "FREMONT",
                  "display": "Fremont"
              },
              {
                  "value": "ONTARIO",
                  "display": "Ontario"
              },
              {
                  "value": "WOODSTOCK",
                  "display": "Woodstock"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "SAN FRANCISCO",
                  "display": "San Francisco"
              },
              {
                  "value": "MICHIGAN",
                  "display": "Michigan"
              },
              {
                  "value": "SAN DIEGO",
                  "display": "San Diego"
              }
          ],
          "wordcount": 2394,
          "exacthash": "JHRdKp+yfZ2Q4rBz2Dtfbg==",
          "nearhash": "jCKzbFu0l0EpI6OFeJybyw==",
          "partnamelocations": [
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
              },
              {
                  "value": "event",
                  "display": "event"
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/RAV4_EV",
          "sourcecsv1": [
              "Toyota RAV4 EV",
              "Manufacturer",
              "Production",
              "Class",
              "Body style",
              "First generation",
              "Assembly",
              "Layout",
              "Electric motor",
              "Transmission",
              "Battery",
              "Range",
              "Wheelbase",
              "Length",
              "Width",
              "Height",
              "Curb weight",
              "Second generation"
          ],
          "sourcecsv2": [
              "Toyota_RAV4",
              "Toyota",
              "Car_classification",
              "Compact_SUV",
              "Car_body_style",
              "Sport_utility_vehicle",
              "Battery_electric_vehicle",
              "SUV",
              "Zero-emissions_vehicle",
              "Tesla_Motors",
              "US_Environmental_Protection_Agency",
              "Fuel_economy_in_automobiles",
              "Miles_per_gallon_gasoline_equivalent",
              "Japan",
              "Tahara,_Aichi",
              "Toyota_City",
              "Automobile_layout",
              "FF_layout",
              "Electric_motor",
              "Transmission_(mechanics)",
              "Electric_vehicle_battery",
              "Nickel-metal_hydride_battery",
              "FTP-75",
              "Wheelbase",
              "Curb_weight",
              "Internal_combustion_engine",
              "Nickel%E2%80%93metal_hydride_battery",
              "KWh",
              "Inductive_charging",
              "Brakes",
              "Power_steering",
              "MPGe",
              "Rolling_resistance",
              "Drag_(physics)",
              "Magne_Charge",
              "Electricity_meter#Multiple_tariff_(variable_rate)_meters",
              "United_States_Environmental_Protection_Agency",
              "Economies_of_scale",
              "NiMH",
              "Lead%E2%80%93acid_battery",
              "EV1",
              "Level_1,_2,_and_3_charging",
              "Yazaki",
              "Electrical_efficiency",
              "Suggested_retail_price",
              "Patent_encumbrance_of_large_automotive_NiMH_batteries",
              "International_Court_of_Arbitration",
              "Gag_order",
              "Cobasys",
              "Canada",
              "Woodstock,_Ontario",
              "Toyota_Motor_Manufacturing_Canada",
              "Fremont,_California",
              "Tesla_Factory",
              "Lithium_ion_battery",
              "San_Francisco_Bay_Area",
              "Los_Angeles",
              "Orange_County,_California",
              "San_Diego",
              "Government_incentives_for_plug-in_electric_vehicles",
              "Los_Angeles_Auto_Show",
              "SAE_J1772",
              "Lithium-ion_battery",
              "All-electric_range",
              "Tesla_Model_S",
              "Tesla_Roadster_(2008)",
              "Induction_motor",
              "Permanent-magnet_electric_motor#Permanent-magnet_motors",
              "Hybrid_electric_vehicle",
              "Center_of_gravity",
              "Monroney_label",
              "Leviton",
              "Toyota_Motor_Company",
              "Chevron_Corporation",
              "Electric_vehicle",
              "PZEV",
              "SULEV",
              "AT-PZEV",
              "Energy_Conversion_Devices_Ovonics",
              "List_of_electric_cars_currently_available",
              "List_of_modern_production_plug-in_electric_vehicles",
              "Plug-in_electric_vehicle",
              "Sherry_Boschert",
              "ISBN_(identifier)",
              "Motor_Trend",
              "U.S._Department_of_Energy",
              "The_Sacramento_Bee",
              "Autoblog.com",
              "New_York_Times",
              "Autoblog_Green",
              "Popular_Mechanics",
              "The_New_York_Times",
              "Bloomberg_News"
          ],
          "sourcestr1": "RAV4_EV",
          "sourcestr2": "Q2655621",
          "sourcestr3": "Q3231690",
          "category": "automobile model",
          "sourcevarchar3": "[{\"Toyota RAV4 EV\":\"Second generation RAV4 EV\",\"Overview\":\"\",\"Manufacturer\":\"Toyota\",\"Production\":[\"1997\\u20132003\",\"2012\\u20132014\"],\"Body and chassis\":\"\",\"Class\":\"Compact SUV\",\"Body style\":[\"4-door\",\"SUV\"]},{\"First generation\":\"First generation Toyota RAV4 L V EV (BEA11)\",\"Overview\":\"\",\"Manufacturer\":\"Toyota\",\"Production\":\"1997\\u20132003\",\"Assembly\":[\"Japan\",\":\",\"Tahara, Aichi\",\"Toyota City\"],\"Body and chassis\":\"\",\"Class\":\"Compact SUV\",\"Body style\":[\"4-door\",\"SUV\"],\"Layout\":\"FF layout\",\"Powertrain\":\"\",\"Electric motor\":\"50kW (67hp), 190N\\u22c5m (140ft\\u22c5lb)\",\"Transmission\":\"Fixed ratio\",\"Battery\":[\"27.4 kW\\u00b7h\",\"nickel-metal hydride battery\"],\"Range\":[\"95mi (153km) (\",\"EPA\"],\"Dimensions\":\"\",\"Wheelbase\":\"94.9in (2,410mm)\",\"Length\":\"156.7in (3,980mm)\",\"Width\":\"66.7in (1,694mm)\",\"Height\":\"64.4in (1,636mm)\",\"Curb weight\":\"3,440lb (1,560kg)\"},{\"Second generation\":\"Toyota RAV4 EV second generation (QEA38)\",\"Overview\":\"\",\"Manufacturer\":[\"Toyota\",\"and\",\"Tesla Motors\"],\"Production\":\"2012\\u20132014\",\"Assembly\":[\"Canada\",\":\",\"Woodstock, Ontario\",\"USA:\",\"Fremont, California\"],\"Body and chassis\":\"\",\"Class\":\"Compact SUV\",\"Body style\":[\"4-door\",\"SUV\"],\"Powertrain\":\"\",\"Electric motor\":\"115kW (154hp), 296N\\u22c5m (220ft\\u22c5lb)\",\"Battery\":[\"41.8 kW\\u00b7h\",\"lithium ion battery\"],\"Range\":[\"103mi (166km) (\",\"EPA\"],\"Dimensions\":\"\",\"Wheelbase\":\"2,560\\u20132,660mm (100.8\\u2013104.7in)\",\"Length\":\"4,395\\u20134,620mm (173.0\\u2013181.9in)\",\"Width\":\"1,815\\u20131,855mm (71.5\\u201373.0in)\",\"Curb weight\":\"4,030lb (1,830kg)\"}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Toyota_RAV4_EV_with_badge_WAS_2012_0791_copy.jpg/1200px-Toyota_RAV4_EV_with_badge_WAS_2012_0791_copy.jpg",
          "sourcedouble1": 0.002357,
          "entity1": [
              {
                  "value": "100",
                  "display": "100"
              },
              {
                  "value": "2",
                  "display": "2"
              },
              {
                  "value": "2003",
                  "display": "2003"
              },
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
                  "value": "41.8",
                  "display": "41.8"
              },
              {
                  "value": "0",
                  "display": "0"
              },
              {
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "78",
                  "display": "78"
              },
              {
                  "value": "328",
                  "display": "328"
              },
              {
                  "value": "2014",
                  "display": "2014"
              },
              {
                  "value": "2010",
                  "display": "2010"
              },
              {
                  "value": "40",
                  "display": "40"
              },
              {
                  "value": "103",
                  "display": "103"
              },
              {
                  "value": "166",
                  "display": "166"
              },
              {
                  "value": "240",
                  "display": "240"
              },
              {
                  "value": "27",
                  "display": "27"
              },
              {
                  "value": "95",
                  "display": "95"
              },
              {
                  "value": "1997",
                  "display": "1997"
              }
          ],
          "date": [
              {
                  "value": "2011-07-15",
                  "display": "2011-07-15"
              }
          ],
          "money": [
              {
                  "value": "USD 30000000",
                  "display": "USD 30000000"
              },
              {
                  "value": "USD 1590",
                  "display": "USD 1590"
              },
              {
                  "value": "USD 2500",
                  "display": "USD 2500"
              },
              {
                  "value": "USD 3499",
                  "display": "USD 3499"
              },
              {
                  "value": "USD 49800",
                  "display": "USD 49800"
              },
              {
                  "value": "USD 599",
                  "display": "USD 599"
              },
              {
                  "value": "USD 7500",
                  "display": "USD 7500"
              },
              {
                  "value": "USD 0.09",
                  "display": "USD 0.09"
              },
              {
                  "value": "USD 2.70",
                  "display": "USD 2.70"
              },
              {
                  "value": "USD 29000",
                  "display": "USD 29000"
              },
              {
                  "value": "USD 3.00",
                  "display": "USD 3.00"
              },
              {
                  "value": "USD 3.80",
                  "display": "USD 3.80"
              },
              {
                  "value": "USD 33000",
                  "display": "USD 33000"
              },
              {
                  "value": "USD 4000",
                  "display": "USD 4000"
              },
              {
                  "value": "USD 42000",
                  "display": "USD 42000"
              },
              {
                  "value": "USD 5000",
                  "display": "USD 5000"
              },
              {
                  "value": "USD 9000",
                  "display": "USD 9000"
              }
          ],
          "entity12": [
              {
                  "value": "VICTORY",
                  "display": "Victory"
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
                  "value": "REVENUE",
                  "display": "Revenue"
              }
          ],
          "value_amount": [
              {
                  "value": "(REVENUE)#(USD 4000)",
                  "display": "(Revenue)#(USD 4000)"
              }
          ],
          "rank": 18,
          "displayTitle": "Toyota RAV4 EV",
          "relevantExtracts": "worked together with <b>Tesla </b><b>Motors </b>to develop ... signing of a <b>Tesla </b>and Toyota ... were supplied by <b>Tesla </b><b>Motors</b>... EV combines a <b>Tesla</b>-designed and ... motor supplied by <b>Tesla </b>is an ... was developed by <b>Tesla </b>and ... July 15, 2011, <b>Tesla </b>entered ... between Toyota and <b>Tesla </b>concluded ... <b>Tesla </b><b>Motors</b>... Toyota and <b>Tesla </b><b>Motors </b>"
      },
      {
          "id": "/Web/Wikipedia/|EV_charging",
          "databasealias": "Wikipedia",
          "flags": [
              "h",
              "id"
          ],
          "globalrelevance": 0.934759,
          "matchingpartnames": [
              "text"
          ],
          "termspresence": [
              {
                  "term": "tesla",
                  "presence": "found"
              }
          ],
          "extracts": [
              "Common examples are J1772 , Type 2 connector , Combined charging system , CHAdeMO , and {b}Tesla{nb} Superchargers .",
              "2878,109",
              "40765,422",
              "{b}Tesla{nb} was the first company to introduce longer range mass production electric vehicles, initially releasing their Model S with battery capacities of 40 kWh, 60 kWh and 85 kWh, with the latter having an estimated range of about 480 km (300 mi).",
              "4955,244",
              "46380,273",
              "Use an external charger, which converts AC current into DC current and charges the vehicle at 50 kW (e.g. Nissan Leaf ) or more (e.g. 120-135 kW {b}Tesla{nb} Model S ).",
              "5804,161",
              "47324,277",
              "In 2017, {b}Tesla{nb} gave the owners of its Model S and Model X cars a credit that gives 400 kWh for free at a Supercharger.",
              "6758,118",
              "50363,118",
              "After that credit is used, drivers using {b}Tesla{nb} Superchargers have to pay per kWh.",
              "6877,81",
              "50596,81",
              "Other charging networks are available for non-{b}Tesla{nb} vehicles.",
              "7082,61",
              "50924,61",
              "As of August 2019, in the U.S., there are 2,140 CHAdeMO charge stations (3,010 plugs), 1,888 SAE CCS1 charge stations (3,525 plugs), and 678 {b}Tesla{nb} super charger stations (6,340 plugs), according to the U.S. DoE's Alternative Fuels Data Center.",
              "18421,243",
              "87747,243",
              "In recent years, Better Place , {b}Tesla{nb} , and Mitsubishi Heavy Industries have been involved with integrating battery switch technology with their electric vehicles to extend driving range.",
              "24061,187",
              "105245,427",
              "However, {b}Tesla{nb} has abandoned their battery swap initiatives in favor of rapidly expanding fast-charging stations.",
              "24906,113",
              "107314,113",
              "This decision has driven {b}Tesla{nb} to be a market-leader in fast charging stations, amounting to 1,210 stations worldwide, as of April 2018 and 1,971 stations (17,467 plugs), as of July 2020.",
              "25020,187",
              "107545,304"
          ],
          "matchlocationsperpartname": {
              "matchlocations": [
                  {
                      "partname": "text",
                      "data": "2966,5,4955,5,5949,5,6767,5,6918,5,7026,5,7065,5,7128,5,18562,5,24093,5,24606,5,24682,5,24711,5,24889,5,24915,5,25045,5,26650,5,26723,5,26862,5,27160,5,27630,5,27808,5,27902,5,31967,5,32037,5,32190,5,33406,7,37742,5;41163,5,46380,5,47582,5,50372,5,50637,5,50862,5,50901,5,50970,5,87888,5,105398,5,106513,5,106593,5,106684,5,107008,5,107323,5,107570,5,113546,5,113821,5,114050,5,114712,5,115398,5,115576,5,115811,5,127934,5,128474,5,128786,5,132390,7,143299,5"
                  }
              ]
          },
          "groupcount": 1,
          "title": "Charging station",
          "language": [
              "en"
          ],
          "documentweight": "default",
          "modified": "2020-08-28 06:08:19",
          "indexationtime": "2020-09-02 02:07:11",
          "version": "DrgdiXPbNsd7BAxiNIympA==",
          "size": 365146,
          "treepath": [
              "/Web/Wiki/"
          ],
          "filename": "EV_charging",
          "fileext": "htm",
          "collection": [
              "/Web/Wikipedia/"
          ],
          "docformat": "htm",
          "containerid": "/Web/Wikipedia/|",
          "person": [
              {
                  "value": "JONATHAN TENNYSON",
                  "display": "Jonathan Tennyson"
              },
              {
                  "value": "ANTHONY LOCRICCHIO",
                  "display": "Anthony Locricchio"
              },
              {
                  "value": "BUDD STEINHILBUR",
                  "display": "Budd Steinhilbur"
              },
              {
                  "value": "HARRIS RANCH",
                  "display": "Harris Ranch"
              },
              {
                  "value": "RICHARD MARTIN",
                  "display": "Richard Martin"
              },
              {
                  "value": "ELON MUSK",
                  "display": "Elon Musk"
              },
              {
                  "value": "TODD BANK",
                  "display": "Todd Bank"
              }
          ],
          "company": [
              {
                  "value": "NISSAN",
                  "display": "Nissan"
              },
              {
                  "value": "RENAULT",
                  "display": "Renault"
              },
              {
                  "value": "MITSUBISHI",
                  "display": "Mitsubishi"
              },
              {
                  "value": "MITSUBISHI HEAVY INDUSTRIES",
                  "display": "Mitsubishi Heavy Industries"
              },
              {
                  "value": "SCHNEIDER ELECTRIC",
                  "display": "Schneider Electric"
              },
              {
                  "value": "VOLKSWAGEN",
                  "display": "Volkswagen"
              },
              {
                  "value": "ABB",
                  "display": "ABB"
              },
              {
                  "value": "FORD",
                  "display": "Ford"
              },
              {
                  "value": "NAVIGANT",
                  "display": "Navigant"
              },
              {
                  "value": "NEXANS",
                  "display": "Nexans"
              },
              {
                  "value": "NIDEC",
                  "display": "Nidec"
              },
              {
                  "value": "PETERSEN",
                  "display": "Petersen"
              },
              {
                  "value": "RABOBANK",
                  "display": "Rabobank"
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
                  "value": "LOS ANGELES",
                  "display": "Los Angeles"
              },
              {
                  "value": "NORTH AMERICA",
                  "display": "North America"
              },
              {
                  "value": "EUROPE",
                  "display": "Europe"
              },
              {
                  "value": "JAPAN",
                  "display": "Japan"
              },
              {
                  "value": "CALIFORNIA",
                  "display": "California"
              },
              {
                  "value": "SOUTH AMERICA",
                  "display": "South America"
              },
              {
                  "value": "CHINA",
                  "display": "China"
              },
              {
                  "value": "NETHERLANDS",
                  "display": "Netherlands"
              },
              {
                  "value": "SAN FRANCISCO",
                  "display": "San Francisco"
              },
              {
                  "value": "WASHINGTON",
                  "display": "Washington"
              },
              {
                  "value": "SWITZERLAND",
                  "display": "Switzerland"
              },
              {
                  "value": "HARTFORD",
                  "display": "Hartford"
              },
              {
                  "value": "GENEVA",
                  "display": "Geneva"
              },
              {
                  "value": "MICRONESIA",
                  "display": "Micronesia"
              },
              {
                  "value": "NEW ZEALAND",
                  "display": "New Zealand"
              },
              {
                  "value": "ARGENTINA",
                  "display": "Argentina"
              },
              {
                  "value": "ARIZONA",
                  "display": "Arizona"
              },
              {
                  "value": "AUSTRALIA",
                  "display": "Australia"
              }
          ],
          "wordcount": 4583,
          "exacthash": "2CwjbOJEw+vRkR/HtbJ2ig==",
          "nearhash": "eXHibXzX6uu9J10xER6Row==",
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
                  "value": "job",
                  "display": "job"
              },
              {
                  "value": "title",
                  "display": "title"
              }
          ],
          "url1": "https://en.wikipedia.org/wiki/EV_charging",
          "sourcecsv2": [
              "Compressed-air_vehicle",
              "ChargePoint",
              "Electric_vehicle",
              "Tesla_Roadster_(2008)",
              "Iwata,_Shizuoka",
              "Brammo_Empulse",
              "Electric_motorcycle",
              "AeroVironment",
              "Nissan_Leaf",
              "NRG_Energy",
              "Toyota_Prius",
              "San_Francisco",
              "Electric_energy",
              "Plug-in_electric_vehicle",
              "Electric_car",
              "Neighborhood_electric_vehicle",
              "Plug-in_hybrid",
              "Voltage",
              "Electric_current",
              "Direct_current",
              "Combined_Charging_System",
              "CHAdeMO",
              "NEMA_connector",
              "AMC_Gremlin",
              "Seattle_City_Light",
              "SAE_J1772",
              "IEC_62196",
              "Type_2_connector",
              "Combined_charging_system",
              "Tesla_Supercharger",
              "CARB",
              "Electric_car_charging_methods",
              "Inductive_charging",
              "BYD_e6",
              "Solaris_Urbino",
              "Battery_electric_bus",
              "Charging_level",
              "SAE_International",
              "Volts_alternating_current",
              "Volts_direct_current",
              "Tesla,_Inc.",
              "Tesla_Model_S",
              "Electric_vehicle_battery",
              "Single_phase",
              "Three_phase",
              "Geneva",
              "Switzerland",
              "Wall_socket",
              "Current_sensor",
              "Feedback",
              "ECOtality",
              "IEC_61851",
              "Load_shedding",
              "International_Electrotechnical_Commission",
              "Electric_vehicle_network",
              "Renault_Laguna",
              "Better_Place_(company)",
              "Ramat_Hasharon",
              "Tel_Aviv",
              "Parking_lot",
              "Los_Angeles_International_Airport",
              "REVAi",
              "London",
              "Infrastructure",
              "Electrical_grid",
              "California",
              "Texas",
              "Washington_(state)",
              "Fastned",
              "Perth",
              "Melbourne",
              "YPF",
              "Argentina",
              "Ather_Energy",
              "Bengaluru",
              "Taxi_stand",
              "Shopping_center",
              "Convenience_shop",
              "Fast_food_restaurant",
              "Coffeehouse",
              "Garage_(house)",
              "Filling_station",
              "RV_park",
              "Wireless_charging",
              "EV_Plug_Alliance",
              "Schneider_Electric",
              "Battery_swap_station",
              "Forklift_truck",
              "Hartford_Electric_Light_Company",
              "General_Electric",
              "Chicago",
              "2008_Summer_Olympics",
              "Los_Angeles_Department_of_Water_and_Power",
              "Mitsubishi_Heavy_Industries,_Ltd.",
              "Fast_charger",
              "Vehicle_to_grid",
              "Renault_Fluence_Z.E.",
              "Kiryat_Ekron",
              "Rehovot",
              "Supercharger_network",
              "Interstate_5_in_California",
              "Washington,_DC",
              "Boston",
              "Harris_Ranch",
              "Gogoro",
              "Delta_Electronics",
              "NIO_(car_company)",
              "Open_hardware",
              "Block_heater",
              "Circuit_breaker",
              "Alternating_current",
              "Clothes_drier",
              "KW",
              "Three-phase",
              "Park_%26_Charge",
              "Charging_station",
              "IEC_62196#Type_2:_VDE-AR-E_2623-2-2",
              "Nissan",
              "Mitsubishi",
              "Toyota",
              "General_Motors",
              "Ford",
              "Volkswagen",
              "BMW",
              "Smart_grid",
              "Vehicle-to-grid",
              "Solar-charged_vehicle",
              "Fossil-fuel_power_station",
              "Nuclear_power_plant",
              "Solar_power",
              "SolarCity",
              "Rabobank",
              "U.S._Route_101",
              "Chevrolet_Volt",
              "Solar_panel",
              "Frankfort,_Illinois",
              "Monocrystalline",
              "Urban_Green_Energy",
              "Automated_charging_machine",
              "Direct_coupling",
              "GridPoint",
              "IAV",
              "List_of_energy_storage_projects",
              "Magne_Charge",
              "OpenEVSE",
              "Plugless_Power",
              "Radio-frequency_identification",
              "Solar_Roadways",
              "Solar_vehicle",
              "Street_light",
              "Doi_(identifier)",
              "ISSN_(identifier)",
              "ISBN_(identifier)",
              "CleanTechnica"
          ],
          "sourcestr1": "EV_charging",
          "sourcestr2": "Q2140665",
          "sourcevarchar3": "[{}]",
          "sourcevarchar4": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Tesla_Roadster_at_recharge_station.jpg/1200px-Tesla_Roadster_at_recharge_station.jpg",
          "sourcedouble1": 0.0026,
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
                  "value": "3",
                  "display": "3"
              },
              {
                  "value": "2013",
                  "display": "2013"
              },
              {
                  "value": "4",
                  "display": "4"
              },
              {
                  "value": "400",
                  "display": "400"
              },
              {
                  "value": "2012",
                  "display": "2012"
              },
              {
                  "value": "5",
                  "display": "5"
              },
              {
                  "value": "80",
                  "display": "80"
              },
              {
                  "value": "2017",
                  "display": "2017"
              },
              {
                  "value": "62196",
                  "display": "62196"
              },
              {
                  "value": "50",
                  "display": "50"
              },
              {
                  "value": "15",
                  "display": "15"
              },
              {
                  "value": "20",
                  "display": "20"
              },
              {
                  "value": "240",
                  "display": "240"
              },
              {
                  "value": "120",
                  "display": "120"
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
                  "value": "230",
                  "display": "230"
              },
              {
                  "value": "2009",
                  "display": "2009"
              }
          ],
          "money": [
              {
                  "value": "USD 120000",
                  "display": "USD 120000"
              },
              {
                  "value": "USD 60",
                  "display": "USD 60"
              },
              {
                  "value": "USD 80",
                  "display": "USD 80"
              },
              {
                  "value": "USD 0.06",
                  "display": "USD 0.06"
              },
              {
                  "value": "USD 0.26",
                  "display": "USD 0.26"
              },
              {
                  "value": "USD 0.39",
                  "display": "USD 0.39"
              },
              {
                  "value": "USD 0.49",
                  "display": "USD 0.49"
              },
              {
                  "value": "USD 0.69",
                  "display": "USD 0.69"
              },
              {
                  "value": "USD 0.79",
                  "display": "USD 0.79"
              }
          ],
          "entity7": [
              {
                  "value": "2, -2",
                  "display": "2, -2"
              }
          ],
          "entity12": [
              {
                  "value": "DEATH",
                  "display": "Death"
              },
              {
                  "value": "VICTORY",
                  "display": "Victory"
              }
          ],
          "entity13": [
              {
                  "value": "CHIEF EXECUTIVE OFFICER",
                  "display": "Chief Executive Officer"
              },
              {
                  "value": "DIRECTOR",
                  "display": "Director"
              }
          ],
          "entity14": [
              {
                  "value": "ACQUISITION",
                  "display": "Acquisition"
              },
              {
                  "value": "CAPITAL",
                  "display": "Capital"
              },
              {
                  "value": "REVENUE",
                  "display": "Revenue"
              },
              {
                  "value": "CONTRACT",
                  "display": "Contract"
              },
              {
                  "value": "SHARES",
                  "display": "Shares"
              },
              {
                  "value": "LIQUIDITY",
                  "display": "Liquidity"
              }
          ],
          "person_cooc": [
              {
                  "value": "(CHIEF EXECUTIVE OFFICER)#(ANTHONY LOCRICCHIO)",
                  "display": "(Chief Executive Officer)#(Anthony Locricchio)"
              },
              {
                  "value": "(DIRECTOR)#(RICHARD MARTIN)",
                  "display": "(Director)#(Richard Martin)"
              }
          ],
          "company_person": [
              {
                  "value": "(NAVIGANT)#(RICHARD MARTIN)",
                  "display": "(Navigant)#(Richard Martin)"
              },
              {
                  "value": "(PETERSEN)#(JONATHAN TENNYSON)",
                  "display": "(Petersen)#(Jonathan Tennyson)"
              }
          ],
          "person_job_company": [
              {
                  "value": "(RICHARD MARTIN)#(DIRECTOR)#(NAVIGANT)",
                  "display": "(Richard Martin)#(Director)#(Navigant)"
              }
          ],
          "rank": 19,
          "displayTitle": "Charging station",
          "relevantExtracts": "CHAdeMO , and <b>Tesla </b>... <b>Tesla </b>was the ... (e.g. 120-135 kW <b>Tesla </b>... In 2017, <b>Tesla </b>gave the ... used, drivers using <b>Tesla </b>Superchargers have ... available for non-<b>Tesla </b>... plugs), and 678 <b>Tesla </b>super charger ... Better Place , <b>Tesla </b>, and ... However, <b>Tesla </b>has ... decision has driven <b>Tesla </b>to "
      }
  ],
  "methodresult": "ok"
}