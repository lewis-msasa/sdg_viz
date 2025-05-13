import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const FemaleEducationRadarChart = ({ data }) => {
  const plotRef = useRef();

  useEffect(() => {
    const education_agg = data;

    const edu_agg_filtered = education_agg.filter(
      (d) =>
        d.Year >= 2010 &&
        d["Indicator_Name"].toLowerCase().includes("female") &&
        d["Indicator_Name"].toLowerCase().includes("no education") &&
        !["15+", "25+"].some((substr) =>
          d["Indicator_Name"].includes(substr)
        )
    );

    const labelMap = {
      "Barro-Lee: Percentage of female population age 15-19 with no education":
        "15–19",
      "Barro-Lee: Percentage of female population age 20-24 with no education":
        "20–24",
      "Barro-Lee: Percentage of female population age 25-29 with no education":
        "25–29",
      "Barro-Lee: Percentage of female population age 30-34 with no education":
        "30–34",
      "Barro-Lee: Percentage of female population age 35-39 with no education":
        "35–39",
      "Barro-Lee: Percentage of female population age 40-44 with no education":
        "40–44",
      "Barro-Lee: Percentage of female population age 45-49 with no education":
        "45–49",
      "Barro-Lee: Percentage of female population age 50-54 with no education":
        "50–54",
      "Barro-Lee: Percentage of female population age 55-59 with no education":
        "55–59",
      "Barro-Lee: Percentage of female population age 60-64 with no education":
        "60–64",
      "Congo, Dem. Rep.": "Congo",
    };

    const points_agg = edu_agg_filtered.map((d) => ({
      name: labelMap[d.Country_Name] || d.Country_Name,
      key: d.Indicator_Name,
      value: +d.Value,
      label: labelMap[d.Indicator_Name] || d.Indicator_Name,
    }));

    const keys_agg = points_agg.map((d) => d.key);

    const longitude_agg = d3
      .scalePoint()
      .domain(keys_agg)
      .range([180, -145]);

    const plot = Plot.plot({
      width: 650,
      //title: "Age Range of Female Population with No Education, %",
      subtitle:
        "2010 Census. South Sudan is not reflected due to the lack of data",
      projection: {
        type: "azimuthal-equidistant",
        rotate: [0, -90],
        domain: d3.geoCircle().center([0, 90]).radius(0.625)(),
      },
      color: { legend: true },
      marks: [
        // Background rings
        Plot.geo([0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05], {
          geometry: (r) =>
            d3.geoCircle().center([0, 90]).radius(r)(),
          stroke: "black",
          fill: "white",
          strokeOpacity: 0.3,
          fillOpacity: 0.03,
          strokeWidth: 0.5,
        }),
        // Axis lines
        Plot.link(keys_agg, {
          x1: longitude_agg,
          y1: 90 - 0.57,
          x2: 0,
          y2: 90,
          stroke: "grey",
          strokeOpacity: 0.2,
          strokeWidth: 0.75,
        }),
        // Value rings
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
        Plot.text(keys_agg, {
          x: longitude_agg,
          y: 90 - 0.57,
          text: (d) => labelMap[d] || d,
          textAnchor: "middle",
          lineWidth: 10,
        }),
        // Radar area
        Plot.area(points_agg, {
          x1: (d) => longitude_agg(d.key),
          y1: (d) => 90 - d.value / 200,
          x2: 0,
          y2: 90,
          fill: "name",
          stroke: "name",
          curve: "cardinal-closed",
          fillOpacity: 0.25,
        }),
        // Dots
        Plot.dot(points_agg, {
          x: ({ key }) => longitude_agg(key),
          y: ({ value }) => 90 - value / 200,
          fill: "name",
          stroke: "white",
        }),
        // Interactive labels
        Plot.text(
          points_agg,
          Plot.pointer({
            x: ({ key }) => longitude_agg(key),
            y: ({ value }) => 90 - value / 200,
            text: (d) => `${Math.round(d.value)}%`,
            textAnchor: "start",
            dx: 4,
            fill: "currentColor",
            stroke: "white",
            maxRadius: 10,
          })
        ),
      ],
    });

    // Clear existing plot
    plotRef.current.innerHTML = "";
    plotRef.current.append(plot);

    return () => plot.remove();
  }, [data]);

  return <div ref={plotRef} />;
};

export default FemaleEducationRadarChart;
