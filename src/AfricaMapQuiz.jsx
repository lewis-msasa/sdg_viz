import React, { useState, useEffect, useRef } from 'react';

import './AfricaMapQuiz.css'
import { clickableCountries, countryFacts, sdgFacts, slumData, femaleEducationData } from './data/countryData';
import Map from "./components/Map"
import QuizCard from "./components/QuizCard"

import ScrollToTopButton from './components/scrollToTopButton';
import CountryDetails from './components/CountryDetails';
import CombinedQuizCard from './components/CombinedQuizCard';
import AllCountriesAnimatedGDPChart from './components/AllCountriesAnimatedGDP';
import PovertyIconography from './components/PovertyCard';
import TableauEmbed from './components/TableauEmbed';
import { EducationCard } from './components/EducationCard';
import {IntroSection, SideIntro} from './components/IntroSection';
import SkipConfirmationModal from './components/SkipConfirmationModal';
import SlumPopulationChart from './components/SlumPopulationChart';
import FemaleEducationRadarChart from "./components/FemaleEducationRadarChart";
import WealthSharePlot  from './components/WealthSharePlot';


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
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [allQuizHistory, setAllQuizHistory] = useState([]);


  //skipping quiz
  const [showSkipModal, setShowSkipModal] = useState(false);

  const confirmSkip = () => {
    setShowSkipModal(false);
    setShowQuiz(false);
    handleLearnMore(countryFacts[selectedCountry] ? countryFacts[selectedCountry].name : "")
  };

  const cancelSkip = () => {
    setShowQuiz(true);
    setShowSkipModal(false);
    quizCardRef?.current?.scrollIntoView({ behavior: 'smooth' });
   
  };
  

  const [quizState, setQuizState] = useState({
    currentIndex: 0,
    selectedAnswers: [],
    showResults: false,
    score: 0,
    showWrongAnswers: false,
    questionResults : false
  });
  const [combinedQuizState, setCombinedQuizState] = useState({
    currentIndex: 0,
    selectedAnswers: [],
    showResults: false,
    score: 0,
    showWrongAnswers: false,
    questionResults : false
  });

  const quizCardRef = React.useRef(null);
  const allQuizCardRef = React.useRef(null);
  const introRef = useRef(null);

  const countryDetailsRef = useRef(null);
  const countriesDetailsRef = useRef(null);


  const handleSelectAll = () => {
    setQuizMode('combined');
    setSelectedCountry('all');
    setShowCountryDetails(false);
    setShowAllCountriesDetails(true);
    setTimeout(() => {
      countryDetailsRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
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
    setShowSkipModal(true);
    setShowAllCountriesDetails(false)
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
    console.log(countryName)
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

  const updateCombinedQuizState = (updater) => {
    setCombinedQuizState(prev => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;
      console.log('Updating state:', newState);
      return { ...prev, ...newState };
    });
  };


  return (
    <div className="africa-map-container">

        <SkipConfirmationModal 
                    isOpen={showSkipModal}
                    onConfirm={confirmSkip}
                    onCancel={cancelSkip}
                    countryName={countryFacts[selectedCountry] ? countryFacts[selectedCountry].name : ""}
          />

      {showIntro && (
               <IntroSection onClick={handleStartClick} introRef={introRef} />
            )}

        <div className={`map-section ${showMap ? 'visible' : ''}`}>
          
             <SideIntro countryFacts={countryFacts} 
                        showAllCountriesDetails={showAllCountriesDetails}
                        selectedCountry={selectedCountry}
                        onSelectCountry={handleCountryClick}
                        handleSelectAll={handleSelectAll} />
           
            <div className="map-wrapper">
              <Map 
                clickableCountries={clickableCountries} 
                onCountryClick={handleCountryClick}
                selectedCountry={selectedCountry}
                onSelectAll={handleSelectAll}
              />
            </div>
            {/* <div className='mini-map-topbar' style={{color:"#ffffff"}}>
                 <p>To select all countries, click "Select All"</p>
                  <button 
                    className="miniselect-all-button"
                    onClick={handleSelectAll}
                  >
                    Select all
                  </button>
            </div> */}

            
        </div>
      <div ref={quizCardRef}> 
      {(!showAllCountriesDetails && showQuiz) && (
          <div className="quiz-section">
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
          )}
       </div>
        {showCountryDetails && (
          <>
          <div id="country-details" ref={countryDetailsRef} className="country-details-section">
            <h2 style={{color: "#ffffff"}}>More About {currentCountryDetails}</h2>
            <CountryDetails country={selectedCountry} countryName={currentCountryDetails} />
            <button 
              className="back-button"
              onClick={() => setShowCountryDetails(false)}
            >
              Back to Quiz
            </button>
          </div>

         

          </>
        )}
         {showAllCountriesDetails && (
          <>
          <div  ref={countryDetailsRef} className="country-details-section">
              <h2 style={{color:"#ffffff"}}>More About the 5 countries</h2>
               <div className="country-details">
                  <div className="detail-columns">
                    <div className="detail-column">
                        <AllCountriesAnimatedGDPChart />
                    </div>
                    <div className="detail-column">
                       <PovertyIconography />
                    </div>
                  
                  </div>

                  <div className="detail-columns">
                    <div className="detail-column">
                        <SlumPopulationChart data={slumData} />
                    </div>
                    <div className="detail-column">
                        <WealthSharePlot povertyData={slumData} />
                    </div>
                  </div>

                  <div className="country-details">
                    <div className="detail-columns">
                        {/* <div className="detail-column">
                          <TableauEmbed vizUrl={"https://public.tableau.com/views/GDP_17463121025640/GDPDiffDashboard"}
                            options={{
                              width: '100%',
                              height: '600px',
                              hideTabs: true,
                              hideToolbar: true,
                            }} />
                        </div> */}
                        <div className="detail-column">
                          <p style={{  fontSize:"18px", fontWeight:"bold",  color:"#1d3557" }}>GDP Differences</p>
                          <span><p>The table shows the GDP difference (compared to the previous year). In 2012 and 2015, South Sudan experienced a huge drop in GDP value because of Civil wars. CAR also experience the same because of the same reason.
                                   South Sudan has a high GDP in 2011 because it had just gained independence and it utilized its oil reserves in exports</p></span>
                          <TableauEmbed vizUrl={"https://public.tableau.com/views/GDP_17463121025640/GDPDiffDashboard"}
                            options={{
                              width: '100%',
                              height: '600px',
                              hideTabs: true,
                              hideToolbar: true,
                            }} />
                        </div>
                      </div>
                  </div>

                  <div className="country-details">
                    <div className="detail-columns">
                      <div className="detail-column">
                      <p style={{  fontSize:"18px", fontWeight:"bold",  color:"#1d3557" }}>Maximum Quality Education Index each country has ever scored</p>
                          <span><p>The index assesses the effectiveness, inclusivity, and equity of education systems</p></span>
                      <TableauEmbed vizUrl={"https://public.tableau.com/views/sdg4_max/MaxQualityEducationDashboard"}
                        options={{
                          width: '80%',
                          height: '600px',
                          hideTabs: true,
                          hideToolbar: true,
                        }} />
                      </div>
                      <div className="detail-column">
                        <p style={{  fontSize:"18px", fontWeight:"bold",  color:"#1d3557" }}>Highest Adult Literacy Rate each country ever reached</p>
                        <span><p>This accesses the number of people literate per 100 people</p></span>
                          <TableauEmbed vizUrl={"https://public.tableau.com/views/sdg4_17463060491760/MaxLiteracyDashboard"}
                            options={{
                              width: '80%',
                              height: '600px',
                              hideTabs: true,
                              hideToolbar: true,
                            }} />
                       </div>
                    </div>
                  </div>

            

                  <div className="country-details">
                    <div className="detail-columns">
                      <div className="detail-column">
                         <p style={{  fontSize:"18px", fontWeight:"bold",  color:"#1d3557" }}>FemaleEducation</p>
                         <FemaleEducationRadarChart data={femaleEducationData} />
                      </div>
                      <div className="detail-column">
                         <p style={{  fontSize:"18px", fontWeight:"bold",  color:"#1d3557" }}>Summary on Education</p>
                         <EducationCard />
                      </div>
                      
                    </div>
                  </div>
                
                  
                </div>
              {/* { Object.keys(countryFacts).flatMap((option, index) => ( <CountryDetails key={index} country={option} /> )) } */}
              
              <button 
                className="back-button"
                onClick={() => { setAllQuiz(true);  allQuizCardRef.current.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Take Quiz to test your knowledge
              </button>
            </div>
            <div ref={allQuizCardRef} className="quiz-section"> 
            {showAllQuiz && (
                   
                       <>
                        <CombinedQuizCard
                        facts={sdgFacts}
                        quizState={combinedQuizState}
                        updateQuizState={updateCombinedQuizState}
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