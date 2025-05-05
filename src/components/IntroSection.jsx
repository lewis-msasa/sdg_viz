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

export const SideIntro = ({countryFacts, handleSelectAll, showAllCountriesDetails}) => {
    return (
          <div className="map-sidebar">
                      <h3>About the Focus Countries</h3>
                      <p>This map highlights key African nations including:</p>
                      <ul className="country-list">
                      
                        {Object.entries(countryFacts).map(([country, countryData], index) => (
                        
                          <li key={index}>{countryData.name}</li>
                        ))}
                      </ul>
                      <p>When you select a country, you will have a quiz on the basic knowledge about the country. You can skip this quiz</p>

                      When you select "All countries", you will see their information on SDGs. You can also take a quiz at the end to test how much you have learnt.

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
                        <div className="click-prompt" >
                            <p>Scroll down to see more</p>
                            <div className="arrow-icon" style={{ color: "#000000"}}>↓</div>
                        </div> 
                      )}
     </div>
    )
}