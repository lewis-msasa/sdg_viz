import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './AfricaMapQuiz.css'
import { clickableCountries, countryFacts } from './data/countryData';
import Map from "./components/Map"
import QuizCard from "./components/QuizCard"
import sdg1 from "./assets/sdg1.png"
import sdg4 from "./assets/sdg4.png"
import ScrollToTopButton from './components/scrollToTopButton';
import CountryDetails from './components/CountryDetails';
import CombinedQuizCard from './components/CombinedQuizCard';


const AfricaMapQuiz = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryDetails, setShowCountryDetails] = useState(false);
  const [currentCountryDetails, setCurrentCountryDetails] = useState(null);
  const [isValidCountry, setIsValidCountry] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [quizState, setQuizState] = useState({
    currentIndex: 0,
    selectedAnswers: [],
    showResults: false,
    score: 0
  });

  const quizCardRef = React.useRef(null);
  const introRef = useRef(null);
  const countryDetailsRef = useRef(null);

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

  const startCombinedQuiz = () => {
    //setQuizMode('combined');
    setSelectedCountry(null);
  };
  
  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    if (selectedCountry !== countryName) {
      setQuizState({
        currentIndex: 0,
        selectedAnswers: [],
        showResults: false,
        score: 0
      });
    }
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
  
  };

  const handleLearnMore = (countryName) => {
    setCurrentCountryDetails(countryName);
    setShowCountryDetails(true);
    // Scroll to details section
    setTimeout(() => {
      countryDetailsRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleQuizComplete = (score, total) => {
    setQuizHistory([...quizHistory, {
      country: selectedCountry,
      score,
      total,
      date: new Date().toLocaleString()
    }]);
  };
  const updateQuizState = (updater) => {
    setQuizState(prev => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;
      console.log('Updating state:', newState);
      return { ...prev, ...newState };
    });
  };

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
          country={countryFacts[selectedCountry] ? countryFacts[selectedCountry].name : ""}
          facts={selectedCountry && isValidCountry ? countryFacts[selectedCountry].facts : []}
          onLearnMore={handleLearnMore}
          onComplete={handleQuizComplete}
          quizState={quizState}
          updateQuizState={updateQuizState}
        />
        {quizHistory.length > 0 && (
          <div className="quiz-history">
            <h3>Your Quiz History</h3>
            <ul>
              {quizHistory.map((item, index) => (
                <li key={index}>
                  <span className="history-country">{item.country}</span>: 
                  <span className="history-score">{item.score}/{item.total}</span>
                  <span className="history-date">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
        {showCountryDetails && (
          <div id="country-details" ref={countryDetailsRef} className="country-details-section">
            <h2>More About {currentCountryDetails}</h2>
            <CountryDetails country={currentCountryDetails} />
            <button 
              className="back-button"
              onClick={() => setShowCountryDetails(false)}
            >
              Back to Quiz
            </button>
          </div>
        )}
         <CombinedQuizCard
          facts={Object.values(countryFacts).flatMap(country => country.facts)}
          onComplete={handleQuizComplete}
        />
      { showMap ? <ScrollToTopButton /> : <></>}
    </div>
  );
};

export default AfricaMapQuiz;