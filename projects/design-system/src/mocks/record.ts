import { Record, RelevantExtract } from "@sinequa/core/web-services";

export const RAW_RECORD = {
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
  "extracts": [],
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
}


export const RECORD = Object.assign({}, RAW_RECORD as unknown as Partial<Record>);

const keys = ['highlighted', 'locations', 'originalLocations'];

// for loop version
// const extracts:RelevantExtract[] = [];
// let value:Partial<RelevantExtract> = {};
// for (let i = 0; i < RAW_RECORD.extracts.length; i++) {
//   value = {...value, [ keys[i % 3]]: RAW_RECORD.extracts[i]};
//   console.log(value);
//   if (i % 3 === 2 && i > 0) {
//     extracts.push(value as RelevantExtract);
//     value = {};
//   }
// }


const extracts = [
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
]

// reduce() version
RECORD.extracts = extracts.reduce((acc, value, i) => {
  acc.relevantExtract = {...acc.relevantExtract, [keys[i % 3]]: value};
  if (i % 3 === 2 && i > 0) {
    acc.extracts.push(acc.relevantExtract as RelevantExtract);
    acc.relevantExtract = {};
  }
  return acc;
  
}, {extracts: [] as RelevantExtract[], relevantExtract: {} as Partial<RelevantExtract>}).extracts;