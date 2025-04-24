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
  const quizCardRef = React.useRef(null);
  
  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    setCurrentFactIndex(0);
    const facts = countryFacts[countryName].facts ?? []
    
    if (quizCardRef.current) {
      quizCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if(facts.length > 0){
      setIsValidCountry(true)
    }
    else{
      setIsValidCountry(false)
    }
    // setCurrentFactIndex(0);
    // setIsCardVisible(true);
  
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

  // const closeCard = () => {
  //   setIsCardVisible(false);
  // };

  return (
    <div className="africa-map-container">
        <div className="map-section">
        <Map 
          clickableCountries={clickableCountries} 
          onCountryClick={handleCountryClick}
          selectedCountry={selectedCountry}
        />
      </div>
      <div ref={quizCardRef} className="quiz-section"> 
        <QuizCard
          isVisible={isCardVisible}
          country={countryFacts[selectedCountry] ? countryFacts[selectedCountry].name : ""}
          facts={selectedCountry && isValidCountry ? countryFacts[selectedCountry].facts : []}
          currentIndex={currentFactIndex}
          onPrev={handlePrevFact}
          onNext={handleNextFact}
          // onClose={closeCard}
        />
      </div>
    </div>
  );
};

export default AfricaMapQuiz;