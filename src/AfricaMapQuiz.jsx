import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './AfricaMapQuiz.css'
import { clickableCountries, countryFacts } from './data/countryData';
import Map from "./components/Map"
import QuizCard from "./components/QuizCard"

const AfricaMapQuiz = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isValidCountry, setIsValidCountry] = useState(false);
  
  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    const facts = countryFacts[countryName].facts ?? []
    if(facts.length > 0){
      setIsValidCountry(true)
    }
    else{
      setIsValidCountry(false)
    }
    setCurrentFactIndex(0);
    setIsCardVisible(true);
    // document.getElementById('quiz-card-container').classList.add('visible');
    // document.getElementById('quiz-card').classList.add('active');
  };

  const handlePrevFact = () => {
    if (currentFactIndex > 0) {
      setCurrentFactIndex(currentFactIndex - 1);
    }
  };

  const handleNextFact = () => {
    if (selectedCountry && currentFactIndex < countryFacts[selectedCountry].facts.length - 1) {
      setCurrentFactIndex(currentFactIndex + 1);
    }
  };

  const closeCard = () => {
    setIsCardVisible(false);
  };

  return (
    <div className="africa-map-container">
     
      <Map 
        clickableCountries={clickableCountries} 
        onCountryClick={handleCountryClick}
        selectedCountry={selectedCountry}
      />
      
      <QuizCard
        isVisible={isCardVisible}
        country={countryFacts[selectedCountry] ? countryFacts[selectedCountry].name : ""}
        facts={selectedCountry && isValidCountry ? countryFacts[selectedCountry].facts : []}
        currentIndex={currentFactIndex}
        onPrev={handlePrevFact}
        onNext={handleNextFact}
        onClose={closeCard}
      />
    </div>
  );
};

export default AfricaMapQuiz;