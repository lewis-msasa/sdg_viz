export const clickableCountries = [
    "S. Sudan", 
    "Mozambique", 
    "Dem. Rep. Congo",
    "Burundi", 
    "Central African Rep."
  ];

// ... existing quiz data ...

export const countryInfo = {
    "S. Sudan": {
      capital: "Juba",
      population: 11000000,
      area: 644329,
      language: "English",
      climate: "Tropical",
      resources: "Petroleum, hydropower, gold",
      description: "South Sudan is the world's newest country, having gained independence from Sudan in 2011. It's rich in oil but has faced significant challenges including civil war and economic instability.",
      imageUrl: "https://example.com/south-sudan.jpg"
    },
    "Mozambique": {
      capital: "Maputo",
      population: 31200000,
      area: 801590,
      language: "Portuguese",
      climate: "Tropical to subtropical",
      resources: "Coal, titanium, natural gas",
      description: "Mozambique is a scenic country in Southeast Africa with a long Indian Ocean coastline. It's known for its wildlife, beaches, and the island archipelago of Bazaruto.",
      imageUrl: "https://example.com/mozambique.jpg"
    }
    // Add details for other countries
  };


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
    {country: "Democratic Republic of the Congo", shortName: "DRC", values: [
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
        "name" : "South Sudan",
        "facts" : [
            {
                question: "What is the capital of South Sudan?",
                options: ["Khartoum", "Juba", "Nairobi", "Kampala"],
                correctAnswer: 1,
                category: "Geography"
              },
              {
                question: "When did South Sudan gain independence?",
                options: ["2005", "2011", "2015", "1999"],
                correctAnswer: 1,
                category: "History"
              }
     ]
    },
    "Mozambique":
    {
     "name" : "Mozambique",
     "facts" : [
        {
            question: "What ocean borders Mozambique to the east?",
            options: ["Atlantic", "Indian", "Pacific", "Arctic"],
            correctAnswer: 1,
            category: "Geography"
          },
          {
            question: "What is Mozambique's official language?",
            options: ["English", "French", "Portuguese", "Swahili"],
            correctAnswer: 2,
            category: "Culture"
          }
    ]
    },
    "Dem. Rep. Congo":{
        "name" : "Democratic Republic of Congo",
     
        "facts" : [ 
            {
                question: "What ocean borders Mozambique to the east?",
                options: ["Atlantic", "Indian", "Pacific", "Arctic"],
                correctAnswer: 1,
                category: "Geography"
              },
              {
                question: "What is Mozambique's official language?",
                options: ["English", "French", "Portuguese", "Swahili"],
                correctAnswer: 2,
                category: "Culture"
              }
        ]
    },
    "Burundi":
    {
     "name" : "Burundi",
     "facts" : [
        {
            question: "What ocean borders Mozambique to the east?",
            options: ["Atlantic", "Indian", "Pacific", "Arctic"],
            correctAnswer: 1,
            category: "Geography"
          },
          {
            question: "What is Mozambique's official language?",
            options: ["English", "French", "Portuguese", "Swahili"],
            correctAnswer: 2,
            category: "Culture"
          }
    ]
    },
    "Central African Rep.":
    {
     "name" : "Central African Republic",
     "facts" : [
        {
            question: "What ocean borders Mozambique to the east?",
            options: ["Atlantic", "Indian", "Pacific", "Arctic"],
            correctAnswer: 1,
            category: "Geography"
          },
          {
            question: "What is Mozambique's official language?",
            options: ["English", "French", "Portuguese", "Swahili"],
            correctAnswer: 2,
            category: "Culture"
          }
    ]
    },
  };