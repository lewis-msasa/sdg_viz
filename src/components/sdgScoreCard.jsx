import React, { useState, useEffect, useRef } from 'react';
import { sdgOverviewData } from '../data/countryData';
import "./ScoreCard.css"
 
const SdgCard = ({ type, value, max = 166 }) => {
      const svgRef = useRef(null);

        useEffect(() => {
        if (type === 'score' && svgRef.current) {
          const svg = d3.select(svgRef.current);
          svg.selectAll("*").remove();

          const width = 160;
          const height = 160;
          const radius = 80;

          const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

          const arc = d3.arc()
            .innerRadius(radius - 10)
            .outerRadius(radius)
            .startAngle(0);

          // Background arc
          g.append("path")
            .attr("d", arc({ endAngle: 2 * Math.PI }))
            .attr("fill", "#e5e7eb");

          // Foreground arc
          g.append("path")
            .datum({ endAngle: 0 })
            .attr("fill", "#1d3557")
            .attr("d", arc)
            .transition()
            .duration(1000)
            .attrTween("d", () => {
              const interpolate = d3.interpolate(0, (value / 100) * 2 * Math.PI);
              return t => arc({ endAngle: interpolate(t) });
            });

          // Score text
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .style("font-size", "2rem")
            .style("fill", "#1d3557")
            .text(value.toFixed(2));
        }
      }, [type, value]);

      return (
        <div className="sdg-card">
          {type === 'rank' ? (
            <>
              <h3>SDG Index Rank</h3>
              <p>{value} / {max}</p>
            </>
          ) : (
            <>
              <h3>SDG Index Score</h3>
              <svg ref={svgRef}></svg>
            </>
          )}
        </div>
      );
    };

export const CountrySdgOverview = ({ countryData }) => {
     
      return (
        <div className="country-overview">
          <SdgCard type="rank" value={countryData.rank} />
          <SdgCard type="score" value={countryData.score} />
          <div className="sdg-card">
            <>
              <h3>Population</h3>
              <p>{countryData.population}</p>
            </>
        </div>
        </div>
      );
};

    // const App = () => {
    //   return (
    //     <div className="sdg-container">
    //       <h1 className="title">SDG Overview 2024</h1>
    //       <div className="grid">
    //         {Object.values(sdgOverviewData).map((data, index) => (
    //           <CountrySdgOverview key={index} countryData={data} />
    //         ))}
    //       </div>
    //     </div>
    //   );
    // };
