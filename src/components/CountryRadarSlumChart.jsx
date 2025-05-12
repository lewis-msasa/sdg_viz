import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as Plot from "@observablehq/plot";

const CountryRadarSlumChart = ({ data, selectedCountry, selectedCountryName}) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!data || !selectedCountry) return;

    const container = containerRef.current;
    container.innerHTML = "";
    const labels = [
        "Population living in slums",
        "Income share held by highest 20%",
        "Income share held by highest 10%",
        "People living below 50% of median income",
        "Income share held by lowest 10%",
        "Income share held by lowest 20%",
        "Poverty headcount ratio at $2.15 a day ",
        "Poverty gap at $2.15 a day",
        "Poverty headcount ratio at national poverty lines",
        "Poverty headcount ratio at $6.85 a day",
        "Poverty gap at $6.85 a day"
      ]
    // Filter for the selected country
    const latestYear = data.filter(
        (d) =>
           labels.includes(d["Indicator Name"]) && (d["Country Name"] === selectedCountry ||
          d["Country Name"] === selectedCountryName)
      ).sort((a, b) => b.Year - a.Year)[0]["Year"]
     
    const dataFiltered = data.filter(
      (d) =>
         labels.includes(d["Indicator Name"]) && (d["Country Name"] === selectedCountry ||
        d["Country Name"] === selectedCountryName) && d["Year"] == latestYear
    );



    if (dataFiltered.length < 1) return <></>

    if (dataFiltered.length === 0) return;

    // Example mapping logic (you might change this depending on your actual use)
   
    const points = dataFiltered.map(d => ({
        key: d["Indicator Name"],
        value: +d.Value,
        name: selectedCountry
      }));

   

    const keys = points.map(d => d.key)
    
    const longitude = d3.scalePoint().domain(keys).range([180, -145]);

    const chart = Plot.plot({
      width: 450,
      inset: 25,
      title: `Population living in slums in ${selectedCountryName}`,
      projection: {
        type: "azimuthal-equidistant",
        rotate: [0, -90],
        domain: d3.geoCircle().center([0, 90]).radius(0.625)(),
      },
      color: { legend: true },
      marks: [
        // Grey concentric rings
        Plot.geo([0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05], {
          geometry: (r) =>
            d3.geoCircle().center([0, 90]).radius(r)(),
          stroke: "black",
          fill: "black",
          strokeOpacity: 0.3,
          fillOpacity: 0.03,
          strokeWidth: 0.5,
        }),

        // Axis lines
        Plot.link(keys, {
          x1: longitude,
          y1: 90 - 0.57,
          x2: 0,
          y2: 90,
          stroke: "white",
          strokeOpacity: 0.5,
          strokeWidth: 1,
        }),

        // Value marks
        Plot.text([0.2, 0.4, 0.6, 0.8, 1], {
          x: 180,
          y: (d) => 90 - d / 2,
          dx: 2,
          textAnchor: "start",
          text: (d) => `${100 * d}%`,
          fill: "currentColor",
          stroke: "white",
          fontSize: 8,
        }),

        // Axis labels
        Plot.text(keys, {
          x: longitude,
          y: 90 - 0.57,
          text: Plot.identity,
          lineWidth: 10,
        }),

        // Radar area
        Plot.area(points, {
          x1: (d) => longitude(d.key),
          y1: (d) => 90 - d.value / 200,
          x2: 0,
          y2: 90,
          fill: "name",
          stroke: "name",
          curve: "cardinal-closed",
          fillOpacity: 0.25,
        }),

        // Data dots
        Plot.dot(points, {
          x: (d) => longitude(d.key),
          y: (d) => 90 - d.value / 200,
          fill: "name",
          stroke: "white",
        }),

        // Tooltip labels
        Plot.text(
          points,
          Plot.pointer({
            x: (d) => longitude(d.key),
            y: (d) => 90 - d.value / 200,
            text: (d) => `${d.value.toFixed(0)}%`,
            dx: 4,
            textAnchor: "start",
            fill: "currentColor",
            stroke: "white",
            maxRadius: 10,
          })
        ),
      ],
    });

    container.appendChild(chart);

    // Add interactive hover style
    const style = document.createElement("style");
    style.textContent = `
      g[aria-label=area] path {
        fill-opacity: 0.1;
        transition: fill-opacity .2s;
      }
      g[aria-label=area]:hover path:not(:hover) {
        fill-opacity: 0.05;
        transition: fill-opacity .2s;
      }
      g[aria-label=area] path:hover {
        fill-opacity: 0.3;
        transition: fill-opacity .2s;
      }
    `;
    container.appendChild(style);
  }, [data, selectedCountry]);

  return (
    <div>
      <h3>Radar Chart for {selectedCountry}</h3>
      <div ref={containerRef}></div>
    </div>
  );
};

export default CountryRadarSlumChart;
