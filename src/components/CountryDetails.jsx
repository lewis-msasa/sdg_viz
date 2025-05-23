
import React, { useMemo } from 'react';
import { countryInfo, sdgOverviewData, allFemaleEducationData, slumData, SDGIndexScores} from '../data/countryData';
import { CountrySdgOverview } from './sdgScoreCard';
import TableauEmbed from './TableauEmbed';
import { GdpDashboards, povertyData, educationData } from '../data/countryData';
import { PovertyCard } from './PovertyCard';
import { CountryPovertyRateCard } from './PovertyCard';
import { CountryEducationCard } from './EducationCard';
import {CountryAnimatedGDPChart} from './AllCountriesAnimatedGDP';
import CountryRadarFemaleEducationChart from "./CountryRadarFemaleEducationChart";
import { CountryAnimatedGDPLineChart } from './AllCountriesAnimatedGDPLineChart';
import "./CountryDetails.css"

const CountryDetails = ({ country, countryName }) => {
  const options = useMemo(() => ({ toolbar: 'bottom', height: '800px', width: '100%' }), []);
  const details = countryInfo[country] || {};
  const countryDashboards = GdpDashboards[country] || {};


  const countryData = povertyData.map(country => {
    return {
      Country: country.Country,
      povertyRate: country.povertyRate.rate,
      reason : country.povertyRate.reason,
      isUp : country.povertyRate.isUp,
      values: country.values.filter(value => value.year === 2024)
    };
  }).filter(country => country.values.length > 0 && country.Country == countryName);
  const { Country, values, povertyRate, reason, isUp } = countryData[0];

  const countryEducationData = educationData.map(country => {
    return {
      Country: country.Country,
      values: country.values.filter(value => value.year === 2024)
    };
  }).filter(country => country.values.length > 0 && country.Country == countryName);



  return (
    <div className="country-details">
      <div className="detail-columns">
        <div className="detail-column">
          <div>

            <h3>Basic Information</h3>
            <div style={{display:'flex', flexDirection:'row', gap:'2rem'}}>
                <p><strong>Capital:</strong> {details.capital || 'N/A'}</p>
                <p><strong>Official Language:</strong> {details.language || 'N/A'}</p>
            </div>
            <div style={{display:'flex', flexDirection:'row', gap:'2rem'}}>
                
                <p><strong>Climate:</strong> {details.climate || 'N/A'}</p>

            </div>
           
          
            <h5>About {countryName}</h5>
            <p>{details.description || 'No additional information available.'}</p>
          

          </div>
          <div>

          <h3>SDG Overview Information</h3>
            <p>The SDG Index Rank refers to a country's position in the Sustainable Development Goals (SDG) Index, which assesses how well countries are progressing toward achieving the 17 SDGs established by the United Nations.
              The SDG Index score ranges from 0 to 100, where 100 signifies full achievement of all SDGs.</p>
            <CountrySdgOverview  countryData={sdgOverviewData[country]} sdgIndexScores={SDGIndexScores.filter(entry => entry.country === countryName)} />

          </div>
          
        </div>
      </div>

      {/* <div className="detail-columns">
       
        <div className="detail-column">
           <h3>Living Conditions Overview Information</h3>
           <CountryRadarSlumChart data={slumData} selectedCountry={country} selectedCountryName={countryName} />
        </div>
      </div> */}

      <div className="country-details">
      <div className="detail-columns">
        <div className="detail-column">
        <h3>Economic Information</h3>
        <div style={{width:'100%'}}>
        <TableauEmbed vizUrl={countryDashboards.vsOthers}
                            options={options} />
        </div>
        
       
           <div>
             <p className='sub-header'>Number of people per every 10 living below $2.15 per day(with every deep-blue icon representing 10%)</p>
             <div style={{display: 'flex', flexDirection: 'row', gap:"4rem", alignItems:'center'}}>
              <div style={{width:'50%'}}>
                 <PovertyCard  key={Country} country={Country} povertyRatio={values[0]["Poverty headcount ratio at $2.15 a day"]}   />
              </div>
              <div style={{width: '50%'}}>
                  <CountryPovertyRateCard rate={povertyRate} message={reason} isUp={isUp}/>
              </div>
             </div>
           </div>
           <div>
             <p className='sub-header'>Gross Domestic Product</p>
             <p>
               GDP represents a key indicator of a country’s overall economic health. It reflects the financial value of all goods and services produced within its borders.
             </p>
             <CountryAnimatedGDPLineChart countryName={countryName} />
           </div>
            
        </div>
      </div>
      </div>


      <div className="country-details">
      <div className="detail-columns">
      <div className="detail-column">
           <h3>Quality Education Information</h3>
           {countryEducationData.map((data) => {
                const { Country, values } = data;
                return <CountryEducationCard key={country} country={country} 
                rate={values[0]["Adult literacy rate"]}
                maleRate={values[0]["Male Adult Literacy Rate"]} 
                femaleRate={values[0]["Female Literacy Rate"]}
                message={"The Adult literacy rate for this country is "}
                genderMessage={" a gender gap between male and female" }
                 />
           })}
          
        </div>
        <div className="detail-column">
            <CountryRadarFemaleEducationChart data={allFemaleEducationData} selectedCountryName={countryName} selectedCountry={country} />
        </div>
      </div>
      </div>

    
{/*       
      <div className="country-description">
        <h3>About {country}</h3>
        <p>{details.description || 'No additional information available.'}</p>
      </div> */}
      
      {/* {details.imageUrl && (
        <div className="country-image">
          <img src={details.imageUrl} alt={country} />
        </div>
      )} */}
    </div>
  );
};

export default CountryDetails;