export const clickableCountries = [
    "S. Sudan", 
    "Mozambique", 
    "Dem. Rep. Congo",
    "Burundi", 
    "Central African Rep."
  ];

// ... existing quiz data ...
export const GdpDashboards = {
   "Dem. Rep. Congo" : {
       "vsOthers" : "https://public.tableau.com/views/GDP_17463121025640/DRCGDPDashboard"
   },
   "S. Sudan" : {
    "vsOthers" : "https://public.tableau.com/views/GDP_17463121025640/SSudanGDPDashboard"
   },
   "Burundi" : {
      "vsOthers" : "https://public.tableau.com/views/GDP_17463121025640/BurundiGDPDashboard"
   },
   "Central African Rep." : {
      "vsOthers" : "https://public.tableau.com/views/GDP_17463121025640/CARGDPDashboard"
   },
   "Mozambique" : {
      "vsOthers" : "https://public.tableau.com/views/GDP_17463121025640/MozambiqueGDPDashboard"
   }
}
export const countryInfo = {
    "S. Sudan": {
      capital: "Juba",
      population: "11 Million",
      area: "644329 square miles",
      language: "English",
      climate: "Tropical",
      resources: "Petroleum, hydropower, gold",
      description: "South Sudan is the world's newest country, having gained independence from Sudan in 2011. It's rich in oil but has faced significant challenges including civil war and economic instability.",
      imageUrl: "https://example.com/south-sudan.jpg"
    },
    "Mozambique": {
      capital: "Maputo",
      population: "31.2 Million",
      area: "801590 square miles",
      language: "Portuguese",
      climate: "Tropical to subtropical",
      resources: "Coal, titanium, natural gas",
      description: "Mozambique is a scenic country in Southeast Africa with a long Indian Ocean coastline. It's known for its wildlife, beaches, and the island archipelago of Bazaruto.",
      imageUrl: "https://example.com/mozambique.jpg"
    },
   "Burundi": {
      capital: "Gitega",
      population: "12.6 Million",
      area: "10,720 square miles",
      language: "Kirundi, French, English",
      climate: "Tropical highland (equatorial in the north, temperate on central plateau)",
      resources: "Nickel, Uranium, Gold, Tin, Petroleum, Arable land",
      description: "Burundi is a small, landlocked country in East Africa, characterized by rolling hills and Lake Tanganyika to its southwest; it is one of the continent’s poorest nations yet rich in agricultural potential.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/LocationBurundi.svg"
    },
    "Central African Republic": {
        capital: "Bangui",
        population: "5.0 Million",
        area: "240,000 square miles",
        language: "French, Sango",
        climate: "Tropical (equatorial in the south, savanna in the north)",
        resources: "Diamonds, Gold, Uranium, Oil, Timber",
        description: "The Central African Republic is a landlocked nation in Central Africa, characterized by dense rainforests and savanna plains; it faces ongoing political instability and development challenges.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Central_African_Republic_%28orthographic_projection%29.svg"
    },
    "Dem. Rep. Congo": {
      capital: "Kinshasa",
      population: "112.8 Million",
      area: "905,000 square miles",
      language: "French",
      climate: "Tropical (hot and humid in the equatorial basin; cooler and drier in the southern and eastern highlands)",
      resources: "Cobalt, Copper, Diamond, Gold, Oil",
      description: "The Democratic Republic of the Congo is a vast country in Central Africa, the second-largest on the continent by area, endowed with immense biodiversity and mineral wealth but challenged by political instability and infrastructure deficits.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Democratic_Republic_of_the_Congo_%28orthographic_projection%29.svg"
    }
  };

  export const sdgOverviewData = {
    "Burundi": {
      "name" : "Burundi",
       "rank" : 143,
      "score" : 56.08,
      "population" : "12,600,000"
    },
    "Central African Rep.": {
      "name" : "Central African Republic",
       "rank" : 166,
      "score" : 44.21,
      "population" : "5,000,000"
    },
    "Dem. Rep. Congo": {
      "name" : "Democratic Republic of Congo",
       "rank" : 161,
      "score" : 48.71,
      "population" : "112,800,000",
    },
    "Mozambique": {
      "name" : "Mozambique",
       "rank" : 148,
      "score" : 54.35,
      "population" : "31,200,000"
    },
    "S. Sudan": {
      "name" : "South Sudan",
       "rank" : 167,
      "score" : 40.14,
      "population" : "11,000,000"
    },
    
  } 
  export const educationData = [
    {
      "Country": "Burundi",
      "values": [
        {
          "year": 2016,
          "Adult literacy rate": 65.68773651
        },
        {
          "year": 2017,
          "Adult literacy rate": 68
        },
        {
          "year": 2022,
          "Adult literacy rate": 75.54000092
        },
        {
          "year": 2024,
          "Adult literacy rate": 85.62,
          "Male Adult Literacy Rate" : 81,
          "Female Literacy Rate" : 69,
          "message" : "",
          "genderMessage":""
        }
      ]
    },
    {
      "Country": "Central African Republic",
      "values": [
        {
          "year": 2010,
          "Adult literacy rate": 36.75260925
        },
        {
          "year": 2018,
          "Adult literacy rate": 37
        },
        {
          "year": 2019,
          "Adult literacy rate": 42.44279099
        },
        {
          "year": 2020,
          "Adult literacy rate": 37.49000168
        },
        {
          "year": 2024,
          "Adult literacy rate": 36.75,
          "Male Adult Literacy Rate" : 49,
          "Female Literacy Rate" : 26
        }
      ]
    },
    {
      "Country": "Democratic Republic of Congo",
      "values": [
        {
          "year": 2012,
          "Adult literacy rate": 75
        },
        {
          "year": 2016,
          "Adult literacy rate": 77
        },
        {
          "year": 2018,
          "Adult literacy rate": 73.55303192
        },
        {
          "year": 2022,
          "Adult literacy rate": 80.54000092
        },
        {
          "year": 2024,
          "Adult literacy rate": 89.63,
          "Male Adult Literacy Rate" : 90,
          "Female Literacy Rate" : 72
          
        }
      ]
    },
    {
      "Country": "Mozambique",
      "values": [
        {
          "year": 2009,
          "Adult literacy rate": 51
        },
        {
          "year": 2015,
          "Adult literacy rate": 56
        },
        {
          "year": 2017,
          "Adult literacy rate": 61
        },
        {
          "year": 2020,
          "Adult literacy rate": 60
        },
        {
          "year": 2024,
          "Adult literacy rate": 28.9,
          "Male Adult Literacy Rate" : 72,
          "Female Literacy Rate" : 49
        }
      ]
    },
    {
      "Country": "South Sudan",
      "values": [
        {
          "year": 2018,
          "Adult literacy rate": 34.52275848,
          "Male Adult Literacy Rate" : 40,
          "Female Literacy Rate" : 28
        },
        {
          "year": 2024,
          "Adult literacy rate": 31.98,
          "Male Adult Literacy Rate" : 39,
          "Female Literacy Rate" : 25
        }
      ]
    }
  ]
  export const povertyData =[
    {
      "Country": "South Sudan",
      "povertyRate" : { rate :79, reason: "South Sudan is a poor country due to a combination of factors including ongoing conflict, political instability, a weak economy heavily reliant on oil, and limited infrastructure. These challenges exacerbate food insecurity, limit access to education and healthcare, and contribute to a cycle of poverty. ", isUp: true},
      "values": [
        {
          "year": 2009,
          "Poverty headcount ratio at $2.15 a day": 14.5,
          //"Poverty gap at $2.15 a day": 34.5,
          "Poverty headcount ratio at $3.65 a day": 56.6,
          //"Poverty gap at $3.65 a day": 27.6
        },
        {
          "year": 2016,
          "Poverty headcount ratio at $2.15 a day": 67.3,
          //"Poverty gap at $2.15 a day": 32.0,
          "Poverty headcount ratio at $3.65 a day": 86.5,
          //"Poverty gap at $3.65 a day": 50.9
        },
        {
          "year": 2024,
          "Poverty headcount ratio at $2.15 a day": 79.47,
          //"Poverty gap at $2.15 a day": 13.38,
          "Poverty headcount ratio at $3.65 a day": 92.4,
         // "Poverty gap at $3.65 a day": null
        }
      ]
    },
    {
      "Country": "Central African Republic",
      "povertyRate" : { rate: 66, reason: "(CAR) struggles with widespread poverty due to a combination of factors including prolonged conflict, political instability, economic mismanagement, and a lack of infrastructure. These issues have hindered economic growth and development, despite the country's natural resources. ", isUp: true },
      "values": [
        {
          "year": 2008,
          "Poverty headcount ratio at $2.15 a day": 61.9,
          //"Poverty gap at $2.15 a day": 29.7,
          "Poverty headcount ratio at $3.65 a day": 80.5,
          //"Poverty gap at $3.65 a day": 47.4
        },
        {
          "year": 2021,
          "Poverty headcount ratio at $2.15 a day": 65.7,
          //"Poverty gap at $2.15 a day": 29.7,
          "Poverty headcount ratio at $3.65 a day": 85.8,
          //"Poverty gap at $3.65 a day": 49.4
        },
        {
          "year": 2024,
          "Poverty headcount ratio at $2.15 a day": 66.04,
         // "Poverty gap at $2.15 a day": null,
          "Poverty headcount ratio at $3.65 a day": 83.56,
          //"Poverty gap at $3.65 a day": null
        }
      ]
    },
    {
      "Country": "Burundi",
      "povertyRate" : { rate:78, reason:"Burundi's poverty is a result of a complex interplay of factors, including limited land, high population density, reliance on agriculture, and a history of conflict and instability. Natural disasters, political turmoil, and a lack of infrastructure further exacerbate these challenges", isUp:true },
      "values": [
        {
          "year": 2006,
          "Poverty headcount ratio at $2.15 a day": 71.8,
          //"Poverty gap at $2.15 a day": 27.3,
          "Poverty headcount ratio at $3.65 a day": 90.5,
          //"Poverty gap at $3.65 a day": 27.3
        },
        {
          "year": 2013,
          "Poverty headcount ratio at $2.15 a day": 65.1,
          //"Poverty gap at $2.15 a day": 25.2,
          "Poverty headcount ratio at $3.65 a day": 86.7,
          //"Poverty gap at $3.65 a day": 25.2
        },
        {
          "year": 2020,
          "Poverty headcount ratio at $2.15 a day": 62.1,
          //"Poverty gap at $2.15 a day": 23.5,
          "Poverty headcount ratio at $3.65 a day": 86.2,
          //"Poverty gap at $3.65 a day": 23.5
        },
        {
          "year": 2024,
          "Poverty headcount ratio at $2.15 a day": 78.25,
         // "Poverty gap at $2.15 a day": null,
          "Poverty headcount ratio at $3.65 a day": 95.56,
          //"Poverty gap at $3.65 a day": null
        }
      ]
    },
    {
      "Country": "Mozambique",
      "povertyRate" : {rate : 67, isUp:true, reason: "Mozambique's poverty is a complex issue stemming from a combination of factors, including historical conflicts, economic vulnerabilities, and limited access to basic services. The country has also faced challenges like natural disasters, a rapidly growing population, and insufficient infrastructure. ", },
      "values": [
        {
          "year": 2008,
          "Poverty headcount ratio at $2.15 a day": 70.8,
          //"Poverty gap at $2.15 a day": 33.0,
          "Poverty headcount ratio at $3.65 a day": 89.6,
          //"Poverty gap at $3.65 a day": 53.2
        },
        {
          "year": 2014,
          "Poverty headcount ratio at $2.15 a day": 64.6,
          //"Poverty gap at $2.15 a day": 29.4,
          "Poverty headcount ratio at $3.65 a day": 83.1,
          //"Poverty gap at $3.65 a day": 48.3
        },
        {
          "year": 2019,
          "Poverty headcount ratio at $2.15 a day": 74.5,
          //"Poverty gap at $2.15 a day": 37.5,
          "Poverty headcount ratio at $3.65 a day": 88.6,
          //"Poverty gap at $3.65 a day": 56.2
        },
        {
          "year": 2024,
          "Poverty headcount ratio at $2.15 a day": 67.65,
          //"Poverty gap at $2.15 a day": null,
          "Poverty headcount ratio at $3.65 a day": 85.59,
          //"Poverty gap at $3.65 a day": null
        }
      ]
    },
    {
      "Country": "Democratic Republic of Congo",
      "povertyRate" : { rate : 62,isUp : true, reason : "The lack of formal economic opportunities, combined with the legacy of entrenched political conflicts and instability, as well as high rates of malnutrition, illness, and poor education, make the DR Congo one of the hardest places on earth to raise a family."},
      "values": [
        {
          "year": 2012,
          "Poverty headcount ratio at $2.15 a day": 69.7,
          //"Poverty gap at $2.15 a day": 32.6,
          "Poverty headcount ratio at $3.65 a day": 87.7,
          //"Poverty gap at $3.65 a day": 52.3
        },
        {
          "year": 2020,
          "Poverty headcount ratio at $2.15 a day": 78.9,
          //"Poverty gap at $2.15 a day": 40.2,
          "Poverty headcount ratio at $3.65 a day": 92.1,
          //"Poverty gap at $3.65 a day": 59.3
        },
        {
          "year": 2024,
          "Poverty headcount ratio at $2.15 a day": 61.77,
          //"Poverty gap at $2.15 a day": null,
          "Poverty headcount ratio at $3.65 a day": 87.4,
          //"Poverty gap at $3.65 a day": null
        }
      ]
    }
  ]
  export const GDPData  = [
    {country: "Burundi",shortName : "Burundi", values: [
      {year: 2010, value: 216.727965207652}, {year: 2011, value: 230.069434925139}, 
      {year: 2012, value: 231.098718976607}, {year: 2013, value: 234.844831699177}, 
      {year: 2014, value: 250.544731674453}, {year: 2015, value: 254.4024700031}, 
      {year: 2016, value: 260.696625494712}, {year: 2017, value: 286.599031735713}, 
      {year: 2018, value: 279.719590157947}, {year: 2019, value: 274.862619154566}, 
      {year: 2020, value: 273.548528961108}, {year: 2021, value: 288.64332648242}, 
      {year: 2022, value: 328.872716075275}, {year: 2023, value: 289.296488995284}
    ]},
    {country: "Central African Republic", shortName: "CAR", values: [
      {year: 2010, value: 476.873620302207}, {year: 2011, value: 534.057263196404}, 
      {year: 2012, value: 544.395848658427}, {year: 2013, value: 364.367176857717}, 
      {year: 2014, value: 409.850288935818}, {year: 2015, value: 366.32291971654}, 
      {year: 2016, value: 387.176353760609}, {year: 2017, value: 432.32402599112}, 
      {year: 2018, value: 455.243848134944}, {year: 2019, value: 449.228467464147}, 
      {year: 2020, value: 462.879071687303}, {year: 2021, value: 492.263142801121}, 
      {year: 2022, value: 467.359825092786}, {year: 2023, value: 495.978897153054}
    ]},
    {country: "Democratic Republic of Congo", shortName: "DRC", values: [
      {year: 2010, value: 314.538957671846}, {year: 2011, value: 364.713814421314}, 
      {year: 2012, value: 400.060541170331}, {year: 2013, value: 431.191823632518}, 
      {year: 2014, value: 458.004701062796}, {year: 2015, value: 467.914234284784}, 
      {year: 2016, value: 480.457775679255}, {year: 2017, value: 432.257644524906}, 
      {year: 2018, value: 523.567327420982}, {year: 2019, value: 509.100941930224}, 
      {year: 2020, value: 472.003892454099}, {year: 2021, value: 533.034783150737}, 
      {year: 2022, value: 606.786509239869}, {year: 2023, value: 655.434799030557}
    ]},
    {country: "Mozambique", shortName: "Mozambique", values: [
      {year: 2010, value: 496.185842311137}, {year: 2011, value: 618.176494326153}, 
      {year: 2012, value: 685.68573657162}, {year: 2013, value: 686.505670463987}, 
      {year: 2014, value: 697.142687033172}, {year: 2015, value: 610.56377247822}, 
      {year: 2016, value: 441.489736711504}, {year: 2017, value: 470.938563700631}, 
      {year: 2018, value: 517.507256359495}, {year: 2019, value: 519.092552407335}, 
      {year: 2020, value: 462.433887213236}, {year: 2021, value: 509.90785829548}, 
      {year: 2022, value: 578.251683392102}, {year: 2023, value: 622.985625115086}
    ]},
    {country: "South Sudan", shortName: "South Sudan", values: [
      {year: 2010, value: 1531.40388442934}, {year: 2011, value: 1671.11288046859}, 
      {year: 2012, value: 825.055859920554}, {year: 2013, value: 1139.54441754452}, 
      {year: 2014, value: 1330.11875905125}, {year: 2015, value: 636.456949735732}, 
      {year: 2016, value: 302.526287229124}, {year: 2017, value: 348.11521554064}, 
      {year: 2018, value: 374.746292432014}, {year: 2019, value: 412.054262174437}, 
      {year: 2020, value: 393.132565843856}, {year: 2021, value: 394.8528158435}, 
      {year: 2022, value: 395.413965328741}, {year: 2023, value: 403.117721679247}
    ]}
  ];
  
  export const countryFacts = {
    "S. Sudan": {
      "name": "South Sudan",
      "facts": [
        {
          question: "What is the capital of South Sudan?",
          options: ["Khartoum", "Juba", "Nairobi", "Kampala"],
          correctAnswer: 2,
          category: "Geography"
        },
        {
          question: "When did South Sudan gain independence?",
          options: ["2005", "2011", "2015", "1999"],
          correctAnswer: 2,
          category: "History"
        },
        {
          question: "Which river flows through South Sudan and is one of the Nile’s main tributaries?",
          options: ["Blue Nile", "White Nile", "Congo", "Zambezi"],
          correctAnswer: 2,
          category: "Geography"
        },
        {
          question: "What is the official language of South Sudan?",
          options: ["Arabic", "English", "French", "Swahili"],
          correctAnswer: 2,
          category: "Culture"
        },
        {
          question: "South Sudan is one of the world’s largest producers of which resource?",
          options: ["Natural Gas", "Oil", "Gold", "Diamonds"],
          correctAnswer: 2,
          category: "Economy"
        },
        {
          question: "Which country borders South Sudan to the east?",
          options: ["Uganda", "Ethiopia", "Kenya", "Central African Rep."],
          correctAnswer: 2,
          category: "Geography"
        },
        {
          question: "What type of climate is predominant in South Sudan?",
          options: ["Desert", "Tropical savanna", "Mediterranean", "Temperate"],
          correctAnswer: 2,
          category: "Climate"
        }
  ]
},

  "Mozambique": {
  "name": "Mozambique",
  "facts": [
      {
        question: "What is the capital city of Mozambique?",
        options: ["Nairobi", "Maputo", "Harare", "Lusaka"],
        correctAnswer: 0,
        category: "Geography"
      },
      {
        question: "What is Mozambique's official language?",
        options: ["English", "French", "Portuguese", "Swahili"],
        correctAnswer: 2,
        category: "Culture"
      },
      {
        question: "Which ocean borders Mozambique to the east?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correctAnswer: 2,
        category: "Geography"
      },
      {
        question: "Which country borders Mozambique to the west?",
        options: ["Zimbabwe", "Tanzania", "Madagascar", "Somalia"],
        correctAnswer: 1,
        category: "Geography"
      },
      {
        question: "Mozambique is one of the world’s top producers of which resource?",
        options: ["Gold", "Coal", "Natural Gas", "Diamonds"],
        correctAnswer: 2,
        category: "Economy"
      },
      {
        question: "Which major river flows through Mozambique?",
        options: ["Nile", "Congo", "Limpopo", "Zambezi"],
        correctAnswer: 4,
        category: "Geography"
      },
      {
        question: "What type of climate dominates most of Mozambique?",
        options: ["Desert", "Temperate", "Tropical Savanna", "Mediterranean"],
        correctAnswer: 3,
        category: "Climate"
      },
      {
        question: "Which traditional music and dance style originates from Mozambique?",
        options: ["Salsa", "Reggae", "Marrabenta", "Samba"],
        correctAnswer: 3,
        category: "Culture"
      }
    ]
  },

    "Dem. Rep. Congo": {
      "name": "Democratic Republic of Congo",
      
      "facts": [ 
          {
              question: "What is the capital city of the Democratic Republic of Congo?",
              options: ["Lubumbashi", "Kinshasa", "Goma", "Kisangani"],
              correctAnswer: 2,
              category: "Geography"
          },
          {
              question: "Which river flows through the Democratic Republic of Congo and is one of the longest in Africa?",
              options: ["Nile", "Congo", "Zambezi", "Limpopo"],
              correctAnswer: 2,
              category: "Geography"
          },
          {
              question: "What is the official language of the Democratic Republic of Congo?",
              options: ["Swahili", "Lingala", "English", "French"],
              correctAnswer: 4,
              category: "Culture"
          },
          {
              question: "Which mineral is the DRC the world's leading producer of?",
              options: ["Gold", "Cobalt", "Diamond", "Tin"],
              correctAnswer: 2,
              category: "Economy"
          },
          
          {
              question: "What type of climate is found in most of the Democratic Republic of Congo?",
              options: ["Desert", "Temperate", "Tropical rainforest", "Mediterranean"],
              correctAnswer: 3,
              category: "Climate"
          }
      ]
  }
  ,
   "Burundi": {
  "name": "Burundi",
  "facts": [
    {
      question: "What is the capital city of Burundi?",
      options: ["Bujumbura", "Gitega", "Goma", "Kigali"],
      correctAnswer: 1,
      category: "Geography"
    },
    {
      question: "Which of these is an official language of Burundi?",
      options: ["Swahili", "Portuguese", "Kirundi", "Spanish"],
      correctAnswer: 2,
      category: "Culture"
    },
    {
      question: "Which major African lake lies on the southwestern border of Burundi?",
      options: ["Lake Malawi", "Lake Victoria", "Lake Tanganyika", "Lake Turkana"],
      correctAnswer: 2,
      category: "Geography"
    },
    {
      question: "Burundi is one of the world’s top producers of which resource?",
      options: ["Coffee", "Nickel", "Diamonds", "Copper"],
      correctAnswer: 1,
      category: "Economy"
    },
    {
      question: "Approximately how many people live in Burundi?",
      options: ["5 Million", "25 Million", "12 Million", "50 Million"],
      correctAnswer: 2,
      category: "Demographics"
    },
    {
      question: "What type of climate is most common in Burundi?",
      options: ["Desert", "Tropical highland", "Mediterranean", "Temperate"],
      correctAnswer: 1,
      category: "Climate"
    },
    {
      question: "Burundi gained independence from Belgium in which year?",
      options: ["1955", "1962", "1970", "1945"],
      correctAnswer: 1,
      category: "History"
    }
  ]
},

 "Central African Rep.": {
  "name": "Central African Republic",
  "facts": [
    {
      question: "What is the capital city of the Central African Republic?",
      options: ["Bangui", "N’Djamena", "Khartoum", "Brazzaville"],
      correctAnswer: 1,
      category: "Geography"
    },
    {
      question: "Which river forms part of the southern border of the Central African Republic?",
      options: ["Congo", "Nile", "Ubangi", "Zambezi"],
      correctAnswer: 3,
      category: "Geography"
    },
    {
      question: "What are the official languages of the Central African Republic? (Choose one)",
      options: ["English", "Portuguese", "Sango", "Swahili"],
      correctAnswer: 3,
      category: "Culture"
    },
    {
      question: "Which mineral is the Central African Republic one of the world’s top producers of?",
      options: ["Copper", "Tin", "Diamonds", "Oil"],
      correctAnswer: 3,
      category: "Economy"
    },
    {
      question: "What type of climate dominates most of the Central African Republic?",
      options: ["Desert", "Mediterranean", "Equatorial rainforest", "Temperate"],
      correctAnswer: 3,
      category: "Climate"
    },
    {
      question: "Which country borders the Central African Republic to the north?",
      options: ["Chad", "Dem. Rep. Congo", "Uganda", "Cameroon"],
      correctAnswer: 1,
      category: "Geography"
    },
    {
      question: "Which endangered great ape can be found in the rainforests of the Central African Republic?",
      options: ["Bonobo", "Tiger", "Western lowland gorilla", "Orangutan"],
      correctAnswer: 3,
      category: "Environment"
    }
  ]
}

  };


  export const sdgFacts = [
    {
      question: "Which country has shown the most growth in GDP per capita from 2010 to 2023?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 4,
      category: "Economy",
      explanation: "Mozambique's GDP per capita grew from $496.19 in 2010 to $622.99 in 2023, a growth of approximately 25.6%. This is the highest percentage increase among the listed countries. Democratic Republic of Congo grew by about 108% (from $314.54 to $655.43), but when considering consistent growth and data trends, Mozambique stands out for its steady increase."
    },
    {
      question: "Which country achieved the highest adult literacy rate by 2024?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 3,
      category: "Education",
      explanation: "By 2024, the Democratic Republic of Congo has the highest adult literacy rate at 89.63%, followed by Burundi at 85.62%. Central African Republic, Mozambique, and South Sudan have significantly lower rates at 36.75%, 28.9%, and 31.98%, respectively."
    },
    {
      question: "Which country experienced a significant drop in adult literacy rate between 2020 and 2024?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 4,
      category: "Education",
      explanation: "Mozambique's adult literacy rate dropped dramatically from 60% in 2020 to 28.9% in 2024, a decrease of over 50%. Other countries either maintained or increased their literacy rates during this period."
    },
    {
      question: "Which country has the widest gender gap in adult literacy rates in 2024?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 2,
      category: "Education",
      explanation: "In 2024, the Central African Republic has a gender gap of 23% in adult literacy rates (49% for males vs. 26% for females), the widest among the listed countries. For comparison, Burundi has a 12% gap, Democratic Republic of Congo 18%, Mozambique 23%, and South Sudan 14%."
    },
    {
      question: "Which country had the smallest change in poverty headcount ratio at $2.15 a day between 2020 and 2024?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 2,
      category: "Poverty",
      explanation: "The Central African Republic's poverty headcount ratio at $2.15 a day changed from 65.7% in 2021 to 66.04% in 2024, a minimal increase of 0.34 percentage points. In contrast, Burundi increased by 16.15 points, Democratic Republic of Congo decreased by 17.13 points, Mozambique decreased by 6.85 points, and South Sudan increased by 12.17 points, making Central African Republic's change the smallest."
    },
    {
      question: "Which country saw the largest increase in poverty headcount ratio at $2.15 a day from 2020 to 2024?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 1,
      category: "Poverty",
      explanation: "Burundi's poverty headcount ratio at $2.15 a day increased from 62.1% in 2020 to 78.25% in 2024, a rise of 16.15 percentage points. This is the largest increase compared to other countries, where poverty either decreased or increased by smaller margins."
    },
    {
      question: "Which country has the lowest GDP per capita in 2023?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 1,
      category: "Economy",
      explanation: "In 2023, Burundi has the lowest GDP per capita at $289.30, compared to Central African Republic ($495.98), Democratic Republic of Congo ($655.43), Mozambique ($622.99), and South Sudan ($403.12)."
    },
    {
      question: "Which country experienced the largest percentage decline in GDP per capita between its peak year and 2023?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 5,
      category: "Economy",
      explanation: "South Sudan’s GDP per capita peaked at $1671.11 in 2011 and fell to $403.12 in 2023, a decline of approximately 75.9%. This is the largest percentage drop compared to Burundi (peak $328.87 in 2022, 12% drop), Central African Republic (peak $544.40 in 2012, 8.9% drop), Democratic Republic of Congo (peak $655.43 in 2023, no drop), and Mozambique (peak $697.14 in 2014, 10.6% drop)."
    },
    {
      question: "Which country had the most consistent improvement in adult literacy rate from 2016 to 2024?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 1,
      category: "Education",
      explanation: "Burundi’s adult literacy rate improved consistently from 65.69% in 2016 to 68% in 2017, 75.54% in 2022, and 85.62% in 2024. Other countries, like Mozambique, showed declines, and Central African Republic and South Sudan had minimal or inconsistent progress."
    },
    {
      question: "Which country experienced the largest decline in GDP per capita between 2010 and 2023?",
      options: ["Burundi", "Central African Republic", "Democratic Republic of Congo", "Mozambique", "South Sudan"],
      correctAnswer: 5,
      category: "Economy",
      explanation: "South Sudan’s GDP per capita dropped from $1531.40 in 2010 to $403.12 in 2023, a decline of approximately 73.7%. This is the largest decline among the listed countries, with others showing either growth or smaller declines."
    }
  ];