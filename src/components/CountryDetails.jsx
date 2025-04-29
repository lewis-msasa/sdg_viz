import React from 'react';
import { countryInfo } from '../data/countryData';

const CountryDetails = ({ country }) => {
  const details = countryInfo[country] || {};
  
  return (
    <div className="country-details">
      <div className="detail-columns">
        <div className="detail-column">
          <h3>Basic Information</h3>
          <p><strong>Capital:</strong> {details.capital || 'N/A'}</p>
          <p><strong>Population:</strong> {details.population ? details.population.toLocaleString() : 'N/A'}</p>
          <p><strong>Official Language:</strong> {details.language || 'N/A'}</p>
        </div>
        
        <div className="detail-column">
          <h3>Geography</h3>
          <p><strong>Area:</strong> {details.area ? `${details.area.toLocaleString()} km²` : 'N/A'}</p>
          <p><strong>Climate:</strong> {details.climate || 'N/A'}</p>
          <p><strong>Natural Resources:</strong> {details.resources || 'N/A'}</p>
        </div>
      </div>
      
      <div className="country-description">
        <h3>About {country}</h3>
        <p>{details.description || 'No additional information available.'}</p>
      </div>
      
      {details.imageUrl && (
        <div className="country-image">
          <img src={details.imageUrl} alt={country} />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;