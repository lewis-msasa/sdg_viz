import React from 'react';
import { FaPerson,FaArrowUpRightDots,FaArrowDown } from "react-icons/fa6";
import { povertyData, flagImages } from '../data/countryData';


const data = povertyData.map(country => {
    return {
      Country: country.Country,
      values: country.values.filter(value => value.year === 2024)
    };
  }).filter(country => country.values.length > 0);


  const PovertyRateCard = () => {
    return (
      <div style={styles.rateCard}>
      
  
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
               
          
            <div style={{color: '#d2cfcf' }}>
          which countries have the highest poverty rates?
        </div>
          <div style={{ display:'flex', flexDirection:'row', gap:'4px', alignItems:'center' }}>
            <div>
              <FaArrowUpRightDots size={30} style={{ color: "#f1c232"}} />
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f1c232' }}>
                80%
              </div>
            </div>
            
            <p style={{ lineHeight: '1.4', marginTop: '0.5rem', color: '#fff' }}>
              The poverty rates in South Sudan and Central African Republic have been increasing. It is suggested that this is caused by a combination of factors, mainly, conflicts, violence and natural disasters.
            </p>
          </div>
        </div>
      </div>
    );
  };

  export const CountryPovertyRateCard = ({rate, message, isUp}) => {
    return (
      <div style={styles.rateCard}>
        <div style={{ color: '#d2cfcf' }}>
          Poverty Rate
        </div>
  
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          
          { isUp ? <FaArrowUpRightDots size={200} style={{ color: "#f1c232"}} /> : <FaArrowDown size={200} style={{ color: "#f1c232"}} /> }
          <div>
            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#f1c232' }}>
              {rate}%
            </div>
            <p style={{  lineHeight: '1.4', marginTop: '0.5rem', color: '#fff' }}>
             {message}
            </p>
          </div>
        </div>
      </div>
    );
  };

  

export const PovertyCard = ({ country, povertyRatio }) => (
   <div style={styles.item}>
    <div style={styles.icon}>
        {Array.from({ length: 10 }, (_, index) => (
          
            <FaPerson key={index} size={60} 
            style={{
                color: '#457b9b',
                opacity: index < Math.round(povertyRatio/10) ? 1 : 0.3
              }}  />
           
        ))}
   
    </div>
    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}><img src={flagImages[country]} height={16}/><p style={{ paddingLeft:'10px',  color:"#1d3557" }}>{country}</p></div>
 </div>

);

const PovertyIconography = () => {
  return (
    <div style={styles.container}>
        <div style={styles.card}>
            <p style={{fontWeight:"bold"}}>Number of people per every 10 living below $2.15 per day(with every deep-blue icon representing 10%)</p>
            {/* <p>Every deep-blue icon representing 10%</p> */}
            <div style={{ display:'flex', flexDirection:'row'}}>
                  <div style={{ display:'flex', flexDirection:'column', width: '50%'}}>
                      {data.map((data) => {
                          const { Country, values } = data;
                          const povertyRatio = values[0]["Poverty headcount ratio at $2.15 a day"];
                          return <PovertyCard key={Country} country={Country} povertyRatio={povertyRatio} />;
                      })}
                  </div>
              
                  <div style={{width:'45%'}}>
                    <p>The threshold of $2.15 per day is the international poverty line defined by the World Bank to reflect the minimum amount of income needed to meet basic needs like food, shelter, and clothing. It helps track extreme poverty globally in a consistent way and is used to measure progress toward Sustainable Development Goal 1: ending poverty in all its forms everywhere. Anyone living below this line is considered to lack even the most fundamental means of survival. As we see, the two countries experiencing the highest rates of poverty are South Sudan and Burundi.</p>
                      <PovertyRateCard />
                  </div>
            
            </div>
            
        </div>
       
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: "column"
  },
  rateCard: {
     backgroundColor: '#1d3557',
     color: '#fff',
     padding: '2rem',
     fontFamily: 'Arial, sans-serif',
     borderRadius: '10px',
     height: 'auto',
     width: '90%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'left',
    //backgroundColor: '#f9f9f9',
    //padding: '20px',
    //borderRadius: '10px',
    //boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  item : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'left',
  },
  icon: {
    marginBottom: '4px',
  },
  content: {
    color: '#333',
  }
};

export default PovertyIconography;
