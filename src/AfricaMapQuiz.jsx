import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './AfricaMapQuiz.css'
import { clickableCountries, countryFacts } from './data/countryData';
import Map from "./components/Map"
import QuizCard from "./components/QuizCard"
import sdg1 from "./assets/sdg1.png"
import sdg4 from "./assets/sdg4.png"

const AfricaMapQuiz = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isValidCountry, setIsValidCountry] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const quizCardRef = React.useRef(null);
  const introRef = useRef(null);

  const handleStartClick = () => {
    // Fade out intro
    if (introRef.current) {
      introRef.current.style.animation = 'fadeOut 0.5s ease-out forwards';
    }
    
    // Show map after intro fades
    setTimeout(() => {
      setShowIntro(false);
      setShowMap(true);
    }, 100);
  };

  
  
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

      {showIntro && (
              <div 
                className="intro-animation" 
                ref={introRef}
                onClick={handleStartClick}
              >
                <div className="text-background">
                    <div className="image-container">
                      <img 
                        src={sdg1} 
                        alt="No Poverty" 
                        className="sdg-image"
                      />
                      <img 
                        src={sdg4} 
                        alt="Quality Education" 
                        className="sdg-image"
                      />
                  </div>
                  <h1 className="animated-text">No Poverty & Quality Education SDGs</h1>
                  <p className="subtext">Exploring 5 least developed countries</p>
                  <div className="click-prompt">
                    <p>Click anywhere to continue</p>
                    <div className="arrow-icon">↓</div>
                  </div>
                </div>
              </div>
            )}

        <div className={`map-section ${showMap ? 'visible' : ''}`}>
        {showMap && (
          <Map 
            clickableCountries={clickableCountries} 
            onCountryClick={handleCountryClick}
            selectedCountry={selectedCountry}
          />
        )}
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