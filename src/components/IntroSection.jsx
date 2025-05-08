import React from "react";
import "./IntroSection.css";
import sdg1 from "../assets/sdg1.png"
import sdg4 from "../assets/sdg4.png"






export const IntroSection = ({ onClick, introRef}) => {
    return (
                      <div 
                        className="intro-animation" 
                        ref={introRef}
                        onClick={onClick}
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
                          <p className="subtext">SDGs stands for Sustainable Development Goals. These are 17 global goals adopted by all United Nations Member States in 2015 as part of the 2030 Agenda for Sustainable Development.
                            They are a universal call to action to end poverty, protect the planet, and ensure peace and prosperity for all by 2030. Each goal has specific targets (169 in total) and indicators to track progress.
                            In this project, we focus on the two SDGs and on five least developed countries according to the UN</p>
                          <p className="subtext">How are the five least developed countries doing?</p>
                          <div className="click-prompt">
                            <p>Click anywhere to find out</p>
                            <div className="arrow-icon">↓</div>
                          </div>
                        </div>
                </div>
    )
}

export const SideIntro = ({countryFacts, handleSelectAll, onSelectCountry, selectedCountry, showAllCountriesDetails}) => {
    return (
      <div className="map-sidebar">
      <h3>About the Focus Countries</h3>
      <p>When you select "All countries", you will see their information on SDGs. You can also take a quiz at the end to test how much you have learnt.</p>
      <p>Click any options below or click directly on the map to select a country:</p>
      
      <div className="country-button-group">
        {Object.entries(countryFacts).map(([country, countryData], index) => (
          <button
            key={country}
            className={`country-button ${selectedCountry === country ? 'active' : ''}`}
            onClick={() => onSelectCountry(country)}
          >
            {countryData.name}
          </button>
        ))}
        {!showAllCountriesDetails && (
           <button 
            className="country-button"
            onClick={handleSelectAll}
          >
            Select All Countries
        </button>)}
      </div>
      {/* {!showAllCountriesDetails && (
      <div className="sidebar-actions">
        <button 
          className="select-all-button"
          onClick={handleSelectAll}
        >
          Select All Countries
        </button>
      </div>
      )} */}
  
    </div>
   
    )
}