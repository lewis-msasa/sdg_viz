import React, { useState, useEffect, useRef } from 'react';


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
import AllCountriesAnimatedGDPLineChart from './components/AllCountriesAnimatedGDPLineChart';
import { HideWhenAway } from '../hooks/useScrollAway';
import useVisibilityOnScroll from '../hooks/useScrollAway';
import CallToActionCard from './components/CallToActionCard';
import './AfricaStory.css';
import ConnectionCycleCard from './components/ConnectionCycleCard';

const AfricaStory = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryDetails, setShowCountryDetails] = useState(false);
  const [showAllCountriesDetails, setShowAllCountriesDetails] = useState(false);
  const [currentCountryDetails, setCurrentCountryDetails] = useState(null);
  const [isValidCountry, setIsValidCountry] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showAllQuiz, setAllQuiz] = useState(false);
  // const [showAllEconQuiz, setAllEconQuiz] = useState(false);
  const { isVisible: showAllEconQuiz, setIsVisible : setAllEconQuiz, elementRef : econQuizRef} = useVisibilityOnScroll(false);
  const { isVisible: showAllEduQuiz, setIsVisible : setAllEduQuiz, elementRef : eduQuizRef} = useVisibilityOnScroll(false);
  //const { isVisible: showMap, setIsVisible : setShowMap, elementRef : showMapRef} = useVisibilityOnScroll(true);
  const [quizMode, setQuizMode] = useState('country');
  const [showQuiz, setShowQuiz] = useState(false);

  const [showMap, setShowMap] = useState(false);
  const  showMapRef = useRef(null);

  const [quizHistory, setQuizHistory] = useState([]);
  const [allQuizHistory, setAllQuizHistory] = useState([]);


  //skipping quiz
  const [showSkipModal, setShowSkipModal] = useState(false);

  const confirmSkip = () => {
    setShowSkipModal(false);
    setShowQuiz(false);
    handleLearnMore(countryFacts[selectedCountry] ? countryFacts[selectedCountry].name : "")
  };

  const learnMoreAbout = () => {
      setShowMap(true);
      setTimeout(() => {
        showMapRef.current?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
  }

  const cancelSkip = () => {
    setShowQuiz(true);
    setShowSkipModal(false);
    setTimeout(() => {
      quizCardRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
   
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
    category: null,
    score: 0,
    showWrongAnswers: false,
    questionResults : false
  });
  const [combinedEduQuizState, setCombinedEduQuizState] = useState({
    currentIndex: 0,
    selectedAnswers: [],
    showResults: false,
    category: "Education",
    score: 0,
    showWrongAnswers: false,
    questionResults : false
  });
  const [combinedEconQuizState, setCombinedEconQuizState] = useState({
    currentIndex: 0,
    selectedAnswers: [],
    showResults: false,
    category: "Economy",
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
 
    setCurrentCountryDetails(countryName);
    setShowCountryDetails(true);
    // Scroll to details section
    setTimeout(() => {
      countryDetailsRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleAllQuizComplete = (score, total,category) => {
    setAllQuizHistory([...allQuizHistory, {
      score,
      category,
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
      
      return { ...prev, ...newState };
    });
  };

  const updateCombinedQuizState = (updater) => {
    setCombinedQuizState(prev => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;
     
      return { ...prev, ...newState };
    });
  };
  const updateCombinedEduQuizState = (updater) => {
    setCombinedEduQuizState(prev => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;
     
      return { ...prev, ...newState };
    });
  };
  const updateCombinedEconQuizState = (updater) => {
    setCombinedEconQuizState(prev => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;
     
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

    
          <IntroSection onClick={handleStartClick} introRef={introRef} /> 
          <>
          <div  ref={countryDetailsRef} className="country-details-section">
              <h1 className='main-header'>Let's start with the No Poverty SDG. How are the five countries doing in fighting poverty?</h1>
              
               <div className="country-details" >
               
                  <div className="detail-columns" >
                      <div className="detail-column" style={{display:'flex', flexDirection: "column"}}>
                          <p className='sub-header'>Starting from the macro-economics view, we look at progress in the  Gross Domestic Product(GDP) as a key indicator of a country’s overall economic health.</p>
                          <div>
                              <AllCountriesAnimatedGDPLineChart />
                          </div>
                          {/* <div >
                          
                           
                            <TableauEmbed vizUrl={"https://public.tableau.com/views/GDP_17463121025640/GDPDiffDashboard"}
                              options={{
                                width: '100%',
                                height: '600px',
                                hideTabs: true,
                                hideToolbar: true,
                              }} />
                               <span><p>The table shows the GDP difference (compared to the previous year).In the case of South Sudan, the sudden drops in the data coincides with significant political and social disturbances. In 2011, South Sudan had a high GDP as it had just gained independence and utilized its oil reserves in exports. In 2012, 2015, and 2016 South Sudan experienced a huge drop in GDP - a direct result of the Civil wars. 
                                CAR experienced the same drop in 2013, and also faced unusual political disturbances that year. 
                                This suggests that the political instability may be connected to these high fluctuations in GDP - interestingly, if causality was involved, it could go both ways - the fluctuations could cause instability, or the other way around. 
                                </p></span>
                          </div> */}
                        </div>
                    </div>
                  <br />
                  <div className="detail-columns" style={{marginTop:'12px'}}>
                   
                    <div className="detail-column" style={{display:'flex', flexDirection: "column"}}>
                        <p className='sub-header'>But what do these numbers and disturbances mean for people - on an individual level? </p>
                        <div>
                        <PovertyIconography />
                        </div>
                        <div>
                             <p style={{fontWeight:"bold" }}>A deeper look into housing conditions</p>
                             <div style={{display:'flex', flexDirection: "row", alignItems:'center'}}>
                              <div style={{width:'45%'}}>
                                  <p>This waffle chart illustrates the percentage of the urban population living in slums. These figures reflect not only housing shortages but broader issues like limited access to clean water, sanitation, and secure tenure—challenges that are deeply linked to poverty and conflict. South Sudan’s staggering 94% indicates severe housing deprivation attributed to a combination of protracted conflict, political instability, weak governance, and underdeveloped infrastructure. Since gaining independence in 2011, the country has been engulfed in civil war, displacement crises, and recurring ethnic violence, which have severely disrupted basic services, education, and economic development. South Sudan’s developmental struggles aren’t just economic—they are structural and deeply rooted in decades of instability and neglect.</p>
                              </div>
                              <div style={{width: '50%'}} >
                                 <SlumPopulationChart data={slumData} />
                              </div>
                            </div>
                        </div>
                        <div>
                            <div>
                              <p style={{  fontWeight:"bold" }}>Is everyone equally affected by poverty? </p>
                              <div style={{display:'flex', flexDirection: "row", alignItems:'end'}}>
                                 <div style={{width: '50%'}}>
                                    <WealthSharePlot povertyData={slumData} />
                                 </div>
                                 
                                 <div style={{ width: '45%'}}>
                                    <p>This chart visualizes wealth inequality and shows just how concentrated wealth is at the very top. Over the years, these disparities have mostly remained unchanged, emphasizing the structural nature of wealth concentration in many of the least developed African nations.</p>
                                 </div>
                              </div>
                            </div>
                        </div>
                       
                    </div>
                  
                  </div>
      
                  <button 
                    className="back-button"
                    onClick={() => { setAllEconQuiz(true);}}
                  >
                    Take Quiz to test your knowledge for this section
                  </button>
                  <br />
                  <div ref={econQuizRef}>
                  {showAllEconQuiz && (
                     
                           <>
                            <CombinedQuizCard
                                facts={sdgFacts.filter(fact => fact.category == "Economy" || fact.category == "Poverty")}
                                quizState={combinedEconQuizState}
                                category="Economy"
                                updateQuizState={updateCombinedEconQuizState}
                                onComplete={handleAllQuizComplete}
                              />
                                {allQuizHistory.filter( c => c.category == "Economy").length > 0 && (
                                    <div className="quiz-history">
                                      <h3>Your Quiz History</h3>
                                      <ul>
                                        {allQuizHistory.filter( c => c.category == "Economy").map((item, index) => (
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
                 
                  <h2 className='main-header'>Now let's look at the Quality Education SDG. How are the countries progressing on education?</h2>
                  <div className="country-details">
                    <div className="detail-columns">
                      <div className="detail-column">
                        <p className='sub-header'>Let's start with the broader level; quality indices and literacy rates</p>
                        <div>
                             <p style={{ fontWeight:"bold" }}>Maximum Quality Education Index each country has ever scored</p>
                              <span><p>The index assesses the effectiveness, inclusivity, and equity of education systems. We look at the maximum education quality index a country has ever scored</p></span>
                              <div style={{ display: 'flex', flexDirection:'column', alignItems:'start'}}>
                                 <div style={{width: '100%' }}>
                                 <TableauEmbed vizUrl={"https://public.tableau.com/views/sdg4_max/MaxQualityEducationDashboard"}
                                    options={{
                                      width: '100%',
                                      height: '800px',
                                      hideTabs: true,
                                      hideToolbar: true,
                                    }} />
                                 </div>
                                 <div style={{width:'100%'}}>
                                     <p>
                                     Mozambique’s and Burundi’s results indicate stronger progress in building an inclusive education system—though still far from global targets of ~80%. South Sudan lags furthest behind with a score below 20, signaling serious structural gaps in educational infrastructure, access, and quality. 
                                      - Success of Mozambique can be attributed to the 2018 revision of the National Education System Law extending compulsory education from seven to nine years, aiming at reducing dropout rates and enhancing literacy.
                                      - Success of Burundi can be attributed to the introduction of free primary education in 2005 and introduction of a nine-year basic education cycle in 2010, combining primary and lower secondary education to streamline the education system and improve retention rates.

                                    </p>
                                 </div>
                              </div>
                           
                        </div>
                        <div>
                        <p style={{ fontWeight:"bold" }}>Here we look at adult literacy rate. We look at the Highest Adult Literacy Rate each country ever reached. </p>
                          <span><p>This accesses the number of people literate per 100 people</p></span>
                          <div style={{ display: 'flex', flexDirection:'column', alignItems:'start'}}>
                              <div>
                                  <TableauEmbed vizUrl={"https://public.tableau.com/views/sdg4_17463060491760/MaxLiteracyDashboard"}
                                  options={{
                                    width: '100%',
                                    height: '600px',
                                    hideTabs: true,
                                    hideToolbar: true,
                                  }} />
                              </div>
                              <div>
                                  <p>DRC has drastically improved. Such an increase can be attributed to the relatively recent free primary education policy introduced in September 2019. This initiative led to a significant increase in enrollment, with over 3 million additional children attending primary school. </p>
                              </div>
                          </div>
                           
                        </div>
                       </div>
                    </div>
                    
                    <div className="detail-columns">
                        <div className="detail-column">
                           <p className='sub-header'>Now let's look at access to education based on gender</p>
                           <div>
                                <p style={{ fontWeight:"bold" }}>Age Range of Female Population with No Education, %</p>
                                <p>There are both generational and geographic disparities in women’s access to education across five of Africa’s least developed countries. In all countries, older women (ages 55–64) are significantly more likely to have received no formal education, while younger generations—especially those aged 15–24—show modest improvements. However, progress is uneven. Countries like Burundi and Congo demonstrate meaningful gains across generations, while Mozambique and the Central African Republic continue to show high exclusion rates across all age groups, indicating deeper structural barriers. Access to education for women is shaped not only by time, but also by national context and investment.</p>
                                <div style={{ display: 'flex', flexDirection:'row', alignItems:'end'}}>
                                    <div style={{width: '50%'}}>
                                        <FemaleEducationRadarChart data={femaleEducationData} />
                                    </div>
                                    <div style={{ width:'35%', background:'#1d3557', color:'#fff', padding:'2rem', borderRadius:'10px', height:'auto'}}>
                                      <p>
                                      The reforms introduced by Burundi and Congo have made a serious impact on the educational attainment by the female part of the population, with over 50% of females between 15 and 35 receiving education.  

                                      </p>
                                    </div>
                                </div>
                           </div>
                           {/* <div>
                                <p style={{  fontSize:"14px", fontWeight:"bold" }}>Summary on Education</p>
                                <EducationCard />
                           </div> */}
                        </div>
                    </div>

                  </div>
                  <button 
                    className="back-button"
                    onClick={() => { setAllEduQuiz(true);}}
                  >
                    Take Quiz to test your knowledge for this section
                  </button>
                  <br />
                  <div ref={eduQuizRef}>
                  {showAllEduQuiz && (
                     
                           <>
                            <CombinedQuizCard
                                facts={sdgFacts.filter(fact => fact.category == "Education")}
                                quizState={combinedEduQuizState}
                                category="Education"
                                updateQuizState={updateCombinedEduQuizState}
                                onComplete={handleAllQuizComplete}
                              />
                                {allQuizHistory.filter( c => c.category == "Education").length > 0 && (
                                    <div className="quiz-history">
                                      <h3>Your Quiz History</h3>
                                      <ul>
                                        {allQuizHistory.filter( c => c.category == "Education").map((item, index) => (
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
                  {/* <h2 style={{color:"#ffffff"}}>Call to Action</h2> */}
                  <div className="country-details">
                    <div className="detail-columns">
                      <div className="detail-column" style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                         <ConnectionCycleCard />
                         <button className="back-button">
                          Take Action Now
                        </button>
                         <div style={{cursor:'pointer', margin:'auto', color:'#457b9d', display:'flex', alignItems: 'center'}}>
                           <p  onClick={() => { learnMoreAbout(); learnMoreAbout();}}>Learn more about the countries</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="country-details">
                    <div className="detail-columns">
                      <div className="detail-column" style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                         <CallToActionCard />
                         <div style={{cursor:'pointer', margin:'auto', color:'#457b9d', display:'flex', alignItems: 'center'}}>
                           <p  onClick={() => { learnMoreAbout(); learnMoreAbout();}}>Learn more about the countries</p>
                         </div>
                      </div>
                    </div>
                  </div> */}

               
                  
                  
                </div>
             
              
            </div>
            {/* <div ref={allQuizCardRef} className="quiz-section"> 
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
             </div> */}
         </>
      
        
 
        <div ref={showMapRef} className={`map-section ${showMap ? 'visible' : ''}`} style={{ display: showMap ? 'flex' : 'none'}}>
          
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
     
        
      <ScrollToTopButton /> 
    </div>
  );
};

export default AfricaStory;