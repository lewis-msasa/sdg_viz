import React from 'react';
import { FaBook, FaMoneyBillWave, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { flagImages } from '../data/countryData';

const ConnectionCycleCard= () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '80%',
    margin: 'auto',
    borderRadius: '10px',
  };

  const cycleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0',
    flexWrap: 'wrap',
  };

  const iconBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem',
  };

  const iconStyle = {
    fontSize: '3rem',
    color: '#1d3557',
  };

  const headerStyle = {
    color: '#1d3557'
  }

  const arrowStyle = {
    fontSize: '2rem',
    margin: '0 1rem',
    color: '#1d3557',
  };
  const imageContainerStyle = {
      display : 'flex',
      flexDirection: "row",
      gap: "1rem"
  }

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Poverty and Education: A Vicious Cycle</h2>
      <p>
        Even though the relationship may not be strictly causal, it is logically argued that the
        struggle against poverty affects access to quality education and vice versa.
      </p>

      <div style={cycleStyle}>
        <div style={iconBoxStyle}>
          <FaMoneyBillWave style={iconStyle} />
          <span>Poverty</span>
        </div>
        <FaArrowRight style={arrowStyle} />
        <div style={iconBoxStyle}>
          <FaBook style={iconStyle} />
          <span>Lack of Education</span>
        </div>
        <FaArrowRight style={arrowStyle} />
        <div style={iconBoxStyle}>
          <FaMoneyBillWave style={iconStyle} />
          <span>Continued Poverty</span>
        </div>
      </div>

      <p>
        This forms a feedback loop: without quality education, poverty persists;
        and without addressing poverty, education remains out of reach.
        
      </p>
      <div style={imageContainerStyle}>
          {Object.keys(flagImages).map(key => {
                return (
                  <img  key={key} width={40}  src={flagImages[key]} />
                )
          })}
      </div>
     
      <p>Mozambique, Burundi, South Sudan, the Democratic Republic of Congo (Congo), and the Central African Republic (CAR) are classified as Least Developed Countries due to persistent challenges across income, education, and health. Low school completion rates, gender disparities in education, and the wealth gap between the richest and the poorest contribute to their low index scores. Years of conflict, political instability, and underinvestment in public services have further eroded infrastructure and institutional capacity. </p>
      <p>Addressing SDG 1 and SDG 4 in the world's most vulnerable nations is not just a goal—it's an imperative. In regions plagued by conflict and disaster, the path to education and poverty alleviation is fraught with challenges. As current and future policymakers, it's our duty to navigate these complexities and forge inclusive solutions.</p>
    </div>
  );
};

export default ConnectionCycleCard;
