import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const CountryRadarFemaleEducationChart = ({ data, selectedCountry, selectedCountryName }) => {
  const chartRef = useRef();

  useEffect(() => {
    const labelMap = {
      "Barro-Lee: Percentage of female population age 15-19 with no education": "15–19",
      "Barro-Lee: Percentage of female population age 20-24 with no education": "20–24",
      "Barro-Lee: Percentage of female population age 25-29 with no education": "25–29",
      "Barro-Lee: Percentage of female population age 30-34 with no education": "30–34",
      "Barro-Lee: Percentage of female population age 35-39 with no education": "35–39",
      "Barro-Lee: Percentage of female population age 40-44 with no education": "40–44",
      "Barro-Lee: Percentage of female population age 45-49 with no education": "45–49",
      "Barro-Lee: Percentage of female population age 50-54 with no education": "50–54",
      "Barro-Lee: Percentage of female population age 55-59 with no education": "55–59",
      "Barro-Lee: Percentage of female population age 60-64 with no education": "60–64"
    };

    const dataFiltered = data.filter(
      d =>
        d.Year >= "2010" &&
        d["Indicator Name"] in labelMap &&
        !["15+", "25+"].some(substr => d["Indicator Name"].includes(substr)) &&
        (d["Country Name"] === selectedCountry || d["Country Name"] === selectedCountryName)
    );
    if (dataFiltered.length < 1) return <></>;
  
    const points = dataFiltered.map(d => ({
      key: d["Indicator Name"],
      value: +d.Value,
      name: selectedCountry
    }));

    const keys = points.map(d => d.key);

    const longitude = d3.scalePoint().domain(keys).range([180, -145]);

    const plot = Plot.plot({
      width: 450,
      title: "Age Range of Female Population with No Education",
      subtitle: "Percentage, 2010 census",
      projection: {
        type: "azimuthal-equidistant",
        rotate: [0, -90],
        domain: d3.geoCircle().center([0, 90]).radius(0.625)()
      },
      color: { legend: true },
      marks: [
        Plot.geo([0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05], {
          geometry: r => d3.geoCircle().center([0, 90]).radius(r)(),
          stroke: "black",
          fill: "black",
          strokeOpacity: 0.3,
          fillOpacity: 0.03,
          strokeWidth: 0.5
        }),

        Plot.link(keys, {
          x1: longitude,
          y1: 90 - 0.57,
          x2: 0,
          y2: 90,
          stroke: "white",
          strokeOpacity: 0.5,
          strokeWidth: 1
        }),

        Plot.text([0.2, 0.4, 0.6, 0.8, 1], {
          x: 180,
          y: d => 90 - d / 2,
          dx: 2,
          textAnchor: "start",
          text: d => `${100 * d}%`,
          fill: "currentColor",
          stroke: "white",
          fontSize: 8
        }),

        Plot.text(keys, {
          x: longitude,
          y: 90 - 0.57,
          text: d => labelMap[d] || d,
          textAnchor: "middle",
          lineWidth: 10
        }),

        Plot.area(points, {
          x1: d => longitude(d.key),
          y1: d => 90 - d.value / 200,
          x2: 0,
          y2: 90,
          fill: "red",
          stroke: "#eee",
          curve: "cardinal-closed",
          fillOpacity: 0.25
        }),

        Plot.dot(points, {
          x: d => longitude(d.key),
          y: d => 90 - d.value / 200,
          fill: "name",
          fillOpacity: 0.5,
          stroke: "white"
        }),

        Plot.text(
          points,
          Plot.pointer({
            x: d => longitude(d.key),
            y: d => 90 - d.value / 200,
            text: d => `${d.value.toFixed(0)}%`,
            textAnchor: "start",
            dx: 4,
            fill: "currentColor",
            stroke: "white",
            maxRadius: 10
          })
        )
        // ,

        // () =>
        //   svg`<style>
        //       g[aria-label=area] path {fill-opacity: 0.1; transition: fill-opacity .2s;}
        //       g[aria-label=area]:hover path:not(:hover) {fill-opacity: 0.05; transition: fill-opacity .2s;}
        //       g[aria-label=area] path:hover {fill-opacity: 0.3; transition: fill-opacity .2s;}
        //   </style>`
      ]
    });

    // Clean up and append
    const container = chartRef.current;
    container.innerHTML = "";
    const style = document.createElement("style");
    container.appendChild(plot);
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

  return <div ref={chartRef}></div>;
};

export default CountryRadarFemaleEducationChart;
