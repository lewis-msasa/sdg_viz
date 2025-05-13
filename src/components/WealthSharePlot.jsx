import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as Plot from "@observablehq/plot";

const WealthSharePlot = ({ povertyData }) => {
  const plotRef = useRef();

  useEffect(() => {
    const indicators = [
      "Income share held by highest 10%",
      "Income share held by highest 20%"
    ];

    const countries = [
      "Burundi",
      "Mozambique",
      "Dem. Rep. Congo",
      "South Sudan",
      "Central African Republic"
    ];

    // Filter and preprocess data
    const filtered = povertyData
      .filter(
        (d) =>
          indicators.includes(d["Indicator Name"]) &&
          countries.includes(d["Country Name"])
      )
      .map((d) => ({
        ...d,
        Year: +d["Year"],
        Value: +d["Value"]
      }));

  

    // Roll up and normalize country name
    const rolled = Array.from(
      d3.rollup(
        filtered,
        (v) => v[0],
        (d) => d["Country Name"],
        (d) => d["Year"],
        (d) => d["Indicator Name"]
      ),
      ([country, years]) =>
        Array.from(years, ([year, indicators]) => {
          const cleanCountry =
            country === "Dem. Rep. Congo" ? "Dem. Rep. Congo" : country;
          return Array.from(indicators, ([indicator, record]) => ({
            "Country Name": cleanCountry,
            Year: +year,
            "Indicator Name": indicator,
            Value: +record.Value
          }));
        })
    ).flat(2);

    const data_2000 = rolled.filter((d) => d.Year >= 2000);

    // Clear previous chart
    if (plotRef.current.firstChild) {
      plotRef.current.firstChild.remove();
    }

    // Create plot
    const plot = Plot.plot({
      width: 800,
      height: 500,
      marginLeft: 50,
      marginBottom: 50,
      //title: "Wealth share owned by the richest 10% vs 20% of the population",
      subtitle: "By country & by year",
      x: {
        label: "Year",
        tickFormat: d3.format("d"),
        domain: [2000, 2022]
      },
      y: {
        label: "↑ Wealth share held by 10% vs 20% of the population",
        domain: [0, 65]
      },
      color: {
        legend: true,
        type: "categorical",
        domain: countries.map((c) =>
          c === "Congo, Dem. Rep." ? "Congo" : c
        ),
        label: "Country"
      },
      marks: [
        Plot.link(
          d3.group(data_2000, (d) => `${d["Country Name"]}-${d.Year}`),
          {
            stroke: "black",
            x1: (d) => d[1][0].Year,
            y1: (d) => d[1][0].Value,
            x2: (d) => d[1][1].Year,
            y2: (d) => d[1][1].Value
          }
        ),
        Plot.dot(data_2000, {
          x: "Year",
          y: "Value",
          fill: "Country Name",
          r: 6,
          tip: true,
          title: (d) => {
            const map = {
              "Income share held by highest 10%":
                "Wealth share owned by the richest 10%",
              "Income share held by highest 20%":
                "Wealth share owned by the richest 20%"
            };
            const label = map[d["Indicator Name"]] || d["Indicator Name"];
            return `${d["Country Name"]}, ${d.Year}\n${label}: ${d.Value}%`;
          }
        })
      ],
      x: {
        label: "Year",
        labelFont: "32px",
        tickFont: "12px"
      },
      y: {
        label: "Value (%)",
        labelFont: "24px",
        tickFont: "12px"
      }
    });

    plotRef.current.appendChild(plot);
  }, [povertyData]);

  return <div ref={plotRef}></div>;
};

export default WealthSharePlot;
