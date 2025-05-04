import React, { useState, useEffect, useRef } from 'react';
import { FaPerson,FaPersonDress, FaBook } from "react-icons/fa6";
import "./EducationCard.css";

export const EducationCard = () => {
      const iconRef = useRef(null);

      useEffect(() => {
        const icons = d3.select(iconRef.current).selectAll(".person-icon");
        icons
          .transition()
          .duration(1000)
          .delay((d, i) => i * 200)
          .style("opacity", 1)
          .attr("transform", "scale(1)");
      }, []);

      const bookPath = "M4 6h16v12H4V6zm0-2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-4h12v2H6V10zm0-4h12v2H6V6z";
      const malePath = "M12 2C9.243 2 7 4.243 7 7c0 2.647 2.243 5.793 3 6.723V20h2v-6.277c.757-.93 3-4.076 3-6.723 0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z";
      const femalePath = "M12 2C9.243 2 7 4.243 7 7c0 2.647 2.243 5.793 3 6.723V20h2v-6.277c.757-.93 3-4.076 3-6.723 0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z";

      return (
        <div className="education-container">
          <div className="education-card">
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <FaBook size={80} style={{color: "#2A5783"}} />
                <div className="main-text" style={{ fontSize:'2rem'}}>
                While the quality of education is improving in most of the countries, South Sudan's is getting worse.
                With overall literacy rate going as low as <span className="highlight" style={{ fontSize: '3rem',fontWeight: 'bold', color: '#f1c232'}}>44%</span>.
                </div>
            </div>
            <div className="enrollment-section">
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p className="person-text" style={{fontSize: '2rem', fontWeight:'bold',  color: '#457B9D'}}>40%</p>
                    <FaPerson size={80} style={{ fontSize: '3rem',fontWeight: 'bold', color: '#457B9D'}} />
                </div>
            
                <p className="person-text" style={{fontSize: '1.5rem', color: '#457B9D'}}>In South Sudan, Girls face lower enrollment rates compared to boys mainly because of harmful gender norms</p>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <FaPersonDress size={80} style={{ fontSize: '3rem',fontWeight: 'bold', color: '#457B9D'}} />
                    <p className="person-text" style={{fontSize: '2rem', fontWeight:'bold',  color: '#457B9D'}}>29%</p>
                </div>
            </div>
          </div>
        </div>
      );
    };


    export const CountryEducationCard = ({ country, message, rate, maleRate, femaleRate, genderMessage}) => {
        const iconRef = useRef(null);
  
        useEffect(() => {
          const icons = d3.select(iconRef.current).selectAll(".person-icon");
          icons
            .transition()
            .duration(1000)
            .delay((d, i) => i * 200)
            .style("opacity", 1)
            .attr("transform", "scale(1)");
        }, []);
  
        const bookPath = "M4 6h16v12H4V6zm0-2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-4h12v2H6V10zm0-4h12v2H6V6z";
        const malePath = "M12 2C9.243 2 7 4.243 7 7c0 2.647 2.243 5.793 3 6.723V20h2v-6.277c.757-.93 3-4.076 3-6.723 0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z";
        const femalePath = "M12 2C9.243 2 7 4.243 7 7c0 2.647 2.243 5.793 3 6.723V20h2v-6.277c.757-.93 3-4.076 3-6.723 0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z";
  
        return (
          <div className="education-container">
            <div className="education-card">
              <div style={{display: 'flex', flexDirection: 'row'}}>
                  <FaBook size={80} style={{color: "#2A5783"}} />
                  <div className="main-text" style={{ fontSize:'2rem'}}>
                     {message} <span className="highlight" style={{ fontSize: '3rem',fontWeight: 'bold', color: '#f1c232'}}>{rate}%</span>.
                  </div>
              </div>
              <div className="enrollment-section">
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                      <p className="person-text" style={{fontSize: '2rem', fontWeight:'bold',  color: '#457B9D'}}>{maleRate}%</p>
                      <FaPerson size={80} style={{ fontSize: '3rem',fontWeight: 'bold', color: '#457B9D'}} />
                  </div>
              
                  <p className="person-text" style={{fontSize: '1.5rem', color: '#457B9D'}}>{genderMessage}</p>
  
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                      <FaPersonDress size={80} style={{ fontSize: '3rem',fontWeight: 'bold', color: '#457B9D'}} />
                      <p className="person-text" style={{fontSize: '2rem', fontWeight:'bold',  color: '#457B9D'}}>{femaleRate}%</p>
                  </div>
              </div>
            </div>
          </div>
        );
      };

    