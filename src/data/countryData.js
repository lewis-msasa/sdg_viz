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