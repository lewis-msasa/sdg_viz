import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const AllCountriesAnimatedGDPChart = () => {
  const svgRef = useRef();
  const [currentYear, setCurrentYear] = useState(2010);
  const [isPlaying, setIsPlaying] = useState(false);
  //const [data, setData] = useState({});
  const intervalRef = useRef();

  // Data
  const data = [
    {country: "Burundi",shortName : "Burundi", values: [
      {year: 2010, value: 216.727965207652}, {year: 2011, value: 230.069434925139}, 
      {year: 2012, value: 231.098718976607}, {year: 2013, value: 234.844831699177}, 
      {year: 2014, value: 250.544731674453}, {year: 2015, value: 254.4024700031}, 
      {year: 2016, value: 260.696625494712}, {year: 2017, value: 286.599031735713}, 
      {year: 2018, value: 279.719590157947}, {year: 2019, value: 274.862619154566}, 
      {year: 2020, value: 273.548528961108}, {year: 2021, value: 288.64332648242}, 
      {year: 2022, value: 328.872716075275}, {year: 2023, value: 289.296488995284}
    ]},
    {country: "Central African Republic", shortName: "CAR", values: [
      {year: 2010, value: 476.873620302207}, {year: 2011, value: 534.057263196404}, 
      {year: 2012, value: 544.395848658427}, {year: 2013, value: 364.367176857717}, 
      {year: 2014, value: 409.850288935818}, {year: 2015, value: 366.32291971654}, 
      {year: 2016, value: 387.176353760609}, {year: 2017, value: 432.32402599112}, 
      {year: 2018, value: 455.243848134944}, {year: 2019, value: 449.228467464147}, 
      {year: 2020, value: 462.879071687303}, {year: 2021, value: 492.263142801121}, 
      {year: 2022, value: 467.359825092786}, {year: 2023, value: 495.978897153054}
    ]},
    {country: "Democratic Republic of the Congo", shortName: "DRC", values: [
      {year: 2010, value: 314.538957671846}, {year: 2011, value: 364.713814421314}, 
      {year: 2012, value: 400.060541170331}, {year: 2013, value: 431.191823632518}, 
      {year: 2014, value: 458.004701062796}, {year: 2015, value: 467.914234284784}, 
      {year: 2016, value: 480.457775679255}, {year: 2017, value: 432.257644524906}, 
      {year: 2018, value: 523.567327420982}, {year: 2019, value: 509.100941930224}, 
      {year: 2020, value: 472.003892454099}, {year: 2021, value: 533.034783150737}, 
      {year: 2022, value: 606.786509239869}, {year: 2023, value: 655.434799030557}
    ]},
    {country: "Mozambique", shortName: "Mozambique", values: [
      {year: 2010, value: 496.185842311137}, {year: 2011, value: 618.176494326153}, 
      {year: 2012, value: 685.68573657162}, {year: 2013, value: 686.505670463987}, 
      {year: 2014, value: 697.142687033172}, {year: 2015, value: 610.56377247822}, 
      {year: 2016, value: 441.489736711504}, {year: 2017, value: 470.938563700631}, 
      {year: 2018, value: 517.507256359495}, {year: 2019, value: 519.092552407335}, 
      {year: 2020, value: 462.433887213236}, {year: 2021, value: 509.90785829548}, 
      {year: 2022, value: 578.251683392102}, {year: 2023, value: 622.985625115086}
    ]},
    {country: "South Sudan", shortName: "South Sudan", values: [
      {year: 2010, value: 1531.40388442934}, {year: 2011, value: 1671.11288046859}, 
      {year: 2012, value: 825.055859920554}, {year: 2013, value: 1139.54441754452}, 
      {year: 2014, value: 1330.11875905125}, {year: 2015, value: 636.456949735732}, 
      {year: 2016, value: 302.526287229124}, {year: 2017, value: 348.11521554064}, 
      {year: 2018, value: 374.746292432014}, {year: 2019, value: 412.054262174437}, 
      {year: 2020, value: 393.132565843856}, {year: 2021, value: 394.8528158435}, 
      {year: 2022, value: 395.413965328741}, {year: 2023, value: 403.117721679247}
    ]}
  ];



  const years = data[0]?.values?.map(d => d.year);

  // Set up dimensions
  const margin = {top: 50, right: 30, bottom: 80, left: 60};
  const width = 800 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // Animation controls
  const playAnimation = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      let i = years.indexOf(currentYear);
      intervalRef.current = setInterval(() => {
        i = (i + 1) % years.length;
        setCurrentYear(years[i]);
      }, 1000);
    }
  };

  const pauseAnimation = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    pauseAnimation();
    setCurrentYear(years[0]);
  };

  useEffect(() => {
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add title
    svg.append("text")
      .attr("class", "title")
      .attr("x", width / 2)
      .attr("y", -24)
      .attr("text-anchor", "middle")
      .text("GDP Progression in African Countries (2010-2023)");

    // Add year display
    svg.append("text")
      .attr("class", "year-display")
      .attr("x", width / 2)
      .attr("y", -1)
      .attr("text-anchor", "middle")
      .text(currentYear);

    // Set up scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.shortName))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => {
        const yearData = d.values.find(v => v.year === currentYear);
        return d3.max(d.values.flatMap(v => v.value))
      }) * 1.1])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(years)
      .range(d3.schemeTableau10);

    // Add axes
    const xAxis = svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const yAxis = svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

    // Add axis labels
    // svg.append("text")
    //   .attr("class", "axis-label")
    //   .attr("x", width / 2)
    //   .attr("y", height + margin.bottom - 10)
    //   .attr("text-anchor", "middle")
    //   .text("Country");

    svg.append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("text-anchor", "middle")
      .text("GDP Value");

    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.shortName))
      .attr("width", x.bandwidth())
      .attr("y", d => {
        const yearData = d.values.find(v => v.year === currentYear);
        return y(yearData ? yearData.value : 0);
      })
      .attr("height", d => {
        const yearData = d.values.find(v => v.year === currentYear);
        return height - y(yearData ? yearData.value : 0);
      })
      .attr("fill", color(currentYear))
      .on("mouseover", function(event, d) {
        const yearData = d.values.find(v => v.year === currentYear);
        d3.select("#tooltip")
          .style("opacity", 1)
          .html(`Country: ${d.country}<br>Year: ${currentYear}<br>GDP: ${yearData.value.toFixed(2)}`)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select("#tooltip").style("opacity", 0);
      });

  }, [currentYear]);

  return (
    <div style={{ margin: '20px' }}>
      <svg ref={svgRef}></svg>
      <div id="controls" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={!isPlaying ? playAnimation : pauseAnimation} 
          style={{ padding: '8px 16px', margin: '0 5px', cursor: 'pointer' }}
        >
         { !isPlaying ? <FaPlay /> : <FaPause />}
        </button>
        <button 
          onClick={resetAnimation} 
          style={{ padding: '8px 16px', margin: '0 5px', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>
      <div 
        id="tooltip"
        style={{
          opacity: 0,
          position: 'absolute',
          background: 'white',
          padding: '5px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          pointerEvents: 'none'
        }}
      ></div>
      <style>{`
        .bar {
          fill: steelblue;
          transition: all 0.5s ease-out;
        }
        .bar:hover {
          fill: orange;
        }
        .axis text {
          font-size: 12px;
        }
        .axis-label {
          font-size: 14px;
          font-weight: bold;
        }
        .title {
          font-size: 18px;
          font-weight: bold;
        }
        .year-display {
          font-size: 24px;
          font-weight: bold;
          text-anchor: middle;
        }
      `}</style>
    </div>
  );
};

export default AllCountriesAnimatedGDPChart;