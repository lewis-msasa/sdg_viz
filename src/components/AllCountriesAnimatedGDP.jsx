import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { GDPData as data } from '../data/countryData';



export const CountryAnimatedGDPChart = ({country}) => {
    const svgRef = useRef();
    const [currentYear, setCurrentYear] = useState(2010);
    const [isPlaying, setIsPlaying] = useState(false);
    const [everPlayed, setEverPlayed] = useState(false);
    //const [data, setData] = useState({});
    const intervalRef = useRef();

    const countryData = [data.find(d => d.country == country)]
    const years = countryData[0]?.values?.map(d => d.year);
  
    // Set up dimensions
    const margin = {top: 50, right: 30, bottom: 80, left: 60};
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    // Animation controls
    const playAnimation = () => {
      if (!isPlaying) {
        setIsPlaying(true);
        setEverPlayed(true);
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
        .text(`GDP Progression in ${country} (2010-2023)`);
  
      // Add year display
      svg.append("text")
        .attr("class", "year-display")
        .attr("x", width / 2)
        .attr("y", -1)
        .attr("text-anchor", "middle")
        .text(currentYear);
  
      // Set up scales
      const x = d3.scaleBand()
        .domain(countryData.map(d => d.country))
        .range([0, width/2])
        .padding(0.2);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(countryData, d => {
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
        .data(countryData)
        .enter()
        .append("rect")
        .attr("class", d => d.shortName == "South Sudan" ? "bar-sudan": "bar" )
        .attr("x", d => x(d.country))
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
      <div style={{ margin: '10px', background:"#F5F7FA" }}>
        <svg ref={svgRef}></svg>
        <div id="controls" style={{ marginTop: '4px', textAlign: 'center' }}>
          <button 
            onClick={!isPlaying ? playAnimation : pauseAnimation} 
            style={{ padding: '8px 6px', margin: '2px', cursor: 'pointer' }}
          >
           { !isPlaying ? <FaPlay /> : <FaPause />}
          </button>
          {everPlayed && (<button 
            onClick={resetAnimation} 
            style={{ padding: '8px 6px', margin: '2px', cursor: 'pointer' }}
          >
            Reset
          </button>)}
        </div>
        {!isPlaying && (<p style={{ textAlign: 'center'}}>Press Play to see progress</p>) }
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
            fill: #457b9d;
            transition: all 0.5s ease-out;
          }
          .bar-sudan {
            fill: #1d3557;
            transition: all 0.5s ease-out;
          }
          .bar:hover {
             fill: #457b9d;
             opacity: 0.8;
          }
          .bar-sudan:hover {
             fill: #1d3557;
             opacity: 0.8
          }
          .axis text {
            font-size: 12px;
          }
          .axis-label {
            font-size: 14px;
            font-weight: bold;
          }
          .title {
            font-size: 14px;
            font-weight: normal;
          }
          .year-display {
            font-size: 14px;
            font-weight: bold;
            text-anchor: middle;
          }
        `}</style>
      </div>
    );
  };

const AllCountriesAnimatedGDPChart = () => {
  const svgRef = useRef();
  const [currentYear, setCurrentYear] = useState(2010);
  const [isPlaying, setIsPlaying] = useState(false);
  const [everPlayed, setEverPlayed] = useState(false);
  //const [data, setData] = useState({});
  const intervalRef = useRef();

  const years = data[0]?.values?.map(d => d.year);

  // Set up dimensions
  const margin = {top: 50, right: 30, bottom: 80, left: 60};
  const width = 800 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // Animation controls
  const playAnimation = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setEverPlayed(true);
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
      .attr("class", d => d.shortName == "South Sudan" ? "bar-sudan": "bar" )
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
        {everPlayed && (<button 
          onClick={resetAnimation} 
          style={{ padding: '8px 16px', margin: '0 5px', cursor: 'pointer' }}
        >
          Reset
        </button>)}
      </div>
      {!isPlaying && (<p style={{ textAlign: 'center'}}>Press Play to see progress</p>) }
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
          fill: #457b9d;
          transition: all 0.5s ease-out;
        }
        .bar-sudan {
          fill: #1d3557;
          transition: all 0.5s ease-out;
        }
        .bar:hover {
           fill: #457b9d;
           opacity: 0.8;
        }
        .bar-sudan:hover {
           fill: #1d3557;
           opacity: 0.8
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