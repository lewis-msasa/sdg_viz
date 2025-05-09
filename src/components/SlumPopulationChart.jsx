import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const SlumPopulationChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    // Step 1: Filter only relevant indicators (defensive)
    const relevantIndicators = [
      "Population living in slums ",
      "Population living in slums"
    ];

    const filtered = data
      .filter(d => relevantIndicators.includes(d["Indicator Name"]))
      .map(d => ({
        ...d,
        Year: +d["Year"],
        Value: +d["Value"]
      }));

    // Step 2: Find latest year entry for each country
    const rolled = Array.from(
      d3.group(filtered, d => d["Country Name"]),
      ([country, records]) => {
        const latestYear = d3.max(records, d => d.Year);
        const latest = records.find(d => d.Year === latestYear);
        return {
          ...latest,
          "Country Name": latest["Country Name"] === "Congo, Dem. Rep." ? "Congo" : latest["Country Name"]
        };
      }
    );

    // Step 3: Render the plot
    const plot = Plot.plot({
      axis: null,
      label: null,
      height: 260,
      marginTop: 30,
      marginBottom: 70,
      //title: "Population living in Slums",
      subtitle: "%",
      color: {
        legend: true,
        label: "Country",
      },
      marks: [
        Plot.waffleY({ length: 1 }, {
          y: 100,
          fill: "#eee",
          rx: "100%",
        }),
        Plot.waffleY(rolled, {
          fx: "Country Name",
          y: d => Math.round(d.Value),
          fill: "Country Name",
          rx: "100%",
        }),
        Plot.text(rolled, {
          fx: "Country Name",
          text: d => `${Math.round(d.Value)}%`,
          frameAnchor: "bottom",
          lineAnchor: "top",
          dy: 6,
          fontSize: 18,
          fontWeight: "regular",
          fill: "grey",
        }),
      ],
    });

    chartRef.current.innerHTML = "";
    chartRef.current.appendChild(plot);

    return () => plot.remove();
  }, [data]);

  return <div ref={chartRef} />;
};

export default SlumPopulationChart;
