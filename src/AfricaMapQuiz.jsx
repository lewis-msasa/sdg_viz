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
import AllCountriesAnimatedGDPChart from './components/AllCountriesAnimatedGDP';


const AfricaMapQuiz = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryDetails, setShowCountryDetails] = useState(false);
  const [showAllCountriesDetails, setShowAllCountriesDetails] = useState(false);
  const [currentCountryDetails, setCurrentCountryDetails] = useState(null);
  const [isValidCountry, setIsValidCountry] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showAllQuiz, setAllQuiz] = useState(false);
  const [quizMode, setQuizMode] = useState('country'); 
  const [quizHistory, setQuizHistory] = useState([]);
  const [allQuizHistory, setAllQuizHistory] = useState([]);
  const [quizState, setQuizState] = useState({
    currentIndex: 0,
    selectedAnswers: [],
    showResults: false,
    score: 0
  });

  const quizCardRef = React.useRef(null);
  const allQuizCardRef = React.useRef(null);
  const introRef = useRef(null);

  const countryDetailsRef = useRef(null);
  const countriesDetailsRef = useRef(null);


  const handleSelectAll = () => {
    setQuizMode('combined');
    setSelectedCountry('all');
    setShowCountryDetails(false)
    setShowAllCountriesDetails(true)
  };

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
    setQuizMode('country');
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

  const handleAllQuizComplete = (score, total) => {
    setAllQuizHistory([...allQuizHistory, {
      score,
      total,
      date: new Date().toLocaleString()
    }]);
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
                  <p className="subtext">How are the five least developed countries doing?</p>
                  <div className="click-prompt">
                    <p>Click anywhere to find out</p>
                    <div className="arrow-icon">↓</div>
                  </div>
                </div>
              </div>
            )}

        <div className={`map-section ${showMap ? 'visible' : ''}`}>
          
            <div className="map-sidebar">
              <h3>About the Focus Countries</h3>
              <p>This map highlights key African nations including:</p>
              <ul className="country-list">
                {clickableCountries.map(country => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
              {!showAllCountriesDetails && (
                <div className="quiz-info">
                  <p>To select all countries, click "Select All"</p>
                  <button 
                    className="select-all-button"
                    onClick={handleSelectAll}
                  >
                    Select all
                  </button>
                </div> 
              )}
               {showAllCountriesDetails && (
                <div className="click-prompt">
                    <p>Scroll down to see more</p>
                    <div className="arrow-icon">↓</div>
                </div> 
              )}
            </div>
            {
              /* This the map */
            }
            <div className="map-wrapper">
              <Map 
                clickableCountries={clickableCountries} 
                onCountryClick={handleCountryClick}
                selectedCountry={selectedCountry}
                onSelectAll={handleSelectAll}
              />
            </div>

            
        </div>
      {!showAllCountriesDetails && (
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

      </div> )}
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
         {showAllCountriesDetails && (
          <>
          <div  ref={countryDetailsRef} className="country-details-section">
              <h2>More About the 5 countries</h2>
               <div className="country-details">
                  <div className="detail-columns">
                    <div className="detail-column">
                        <AllCountriesAnimatedGDPChart />
                    </div>
                    <div className="detail-column">
                       
                    </div>
                  </div>
                  
                </div>
              { Object.keys(countryFacts).flatMap((option, index) => ( <CountryDetails key={index} country={option} /> )) }
              
              <button 
                className="back-button"
                onClick={() => { setAllQuiz(true);  allQuizCardRef.current.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Take Quiz
              </button>
            </div>
            <div ref={allQuizCardRef} className="quiz-section"> 
            {showAllQuiz && (
                   
                       <>
                        <CombinedQuizCard
                        facts={Object.values(countryFacts).flatMap(country => country.facts)}
                        onComplete={handleAllQuizComplete}
                      />
                        {allQuizHistory.length > 0 && (
                            <div className="quiz-history">
                              <h3>Your Quiz History</h3>
                              <ul>
                                {allQuizHistory.map((item, index) => (
                                  <li key={index}>
                                    <span className="history-score">{item.score}/{item.total}</span>
                                    <span className="history-date">{item.date}</span>
                                  </li>
                                ))}
                              </ul>
                          </div>
                    )}
                  </>
            )}
             </div>
         </>
         )}
        
      { showMap ? <ScrollToTopButton /> : <></>}
    </div>
  );
};

export default AfricaMapQuiz;