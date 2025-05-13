import React, { useState, useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { SDGIndexScores} from "../data/countryData";
import "./SDGBarChart.css"

const SDG4BarChart = () => {


  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const margin = {top: 70, right: 120, bottom: 100, left: 60};
  const width = containerRef.current ? 0.8 * containerRef.current.clientWidth  : 1200;
  console.log(containerRef?.current?.clientWidth)
  const height = 950; 
  const processAndCleanData = (rawData) => {
    const countryMaxScores = {};
    rawData.forEach((row) => {
      const country = row["country"]?.trim();
      const score = parseFloat(row["goal_4_score"]);
      if (country && !isNaN(score)) {
        if (!countryMaxScores[country] || score > countryMaxScores[country].score) {
          countryMaxScores[country] = { country, score };
        }
      }
    });
    return Object.values(countryMaxScores)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
  };

  const data = processAndCleanData(SDGIndexScores.filter( d => d.goal_4_score));

  console.log(data);

  useEffect(() => {
    if (data.length > 0) {
      const plot = Plot.plot({
        style: { fontSize: "18px" },
        marginBottom: 100,
        marginLeft: 100,
        x: { label: "Country", tickRotate: 0, domain: data.map(d => d.country) },
        y: { label: "SDG4 Score",labelOffset: 50, labelAnchor: "center",  grid: false, domain: [0, 60] },
        marks: [
          Plot.barY(data, {
            x: "country",
            y: "score",
            fill: d => d.country == "South Sudan" ?  "#1d3557" : "#457b9d",
            title: (d) => `${d.country}: ${d.score.toFixed(1)}`,
          }),
          Plot.ruleY([0]),
        ],
        width: width,
        height: height,
      });

      const chartContainer = document.getElementById("chart");
      chartRef.current.appendChild(plot);

      return ()  => plot.remove();
       
    
    }
  }, []);

 

  return (
    <div ref={containerRef} className="chart-container">
    <h1 className="chart-title">
      Highest SDG4 (Quality Education) Scores ever achieved by Country
    </h1>
   
    <div style={{display:'flex', flexDirection:'row', gap:'4px', alignItems:'center', width:'100%'}}>
            <div id="chart" ref={chartRef} style={{width:'55%'}} className="chart"></div>
            <div style={{width:'40%'}}>
                <p></p>
                <p className="chart-fact">
                South Sudan has the lowest SDG4 index indicating challenges being faced in the Educational sector due to persistent internal conflicts.
                Mozambique’s and Burundi’s results indicate stronger progress in building an inclusive education system—though still far from global targets of ~80%. South Sudan lags furthest behind with a score below 20, signaling serious structural gaps in educational infrastructure, access, and quality. 
                - Success of Mozambique can be attributed to the 2018 revision of the National Education System Law extending compulsory education from seven to nine years, aiming at reducing dropout rates and enhancing literacy.
                - Success of Burundi can be attributed to the introduction of free primary education in 2005 and introduction of a nine-year basic education cycle in 2010, combining primary and lower secondary education to streamline the education system and improve retention rates.

                </p>
            </div>

    </div>
    
  </div>
  );
};

export default SDG4BarChart;