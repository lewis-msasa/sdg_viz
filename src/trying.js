import React, { useEffect, useRef, useState } from 'react';
import { GDPData as data, flagImages, yearGDPDescriptions as yearDescriptions } from '../data/countryData';
import * as d3 from 'd3';


const AllCountriesAnimatedGDPLineChart = () => {
  // Refs
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const gRef = useRef(null);
  const pathsRef = useRef([]);
  const xScaleRef = useRef(null);
  const yScaleRef = useRef(null);

  // State
  const [currentYear, setCurrentYear] = useState(2010);
  const [isPlaying, setIsPlaying] = useState(true);



  const years = data[0].values.map(d => d.year);
  const countries = data.map(d => d.country);

  // Dimensions
  const margin = {top: 70, right: 120, bottom: 100, left: 60};
  const width = 900 - margin.left - margin.right;
  const height = 550 - margin.top - margin.bottom;

  // Color scale
  const color = d3.scaleOrdinal()
    .domain(countries)
    .range(d3.schemeTableau10);

  // Animation controls
  const startAnimation = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    pauseAnimation();
    setCurrentYear(years[0]);
  };

  // Initialize chart
  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create SVG group
    gRef.current = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Initialize scales
    xScaleRef.current = d3.scaleLinear()
      .domain(d3.extent(years))
      .range([0, width]);

    yScaleRef.current = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(d.values, v => v.value)) * 1.1])
      .range([height, 0]);

    // Add title
    gRef.current.append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .text("African Nations GDP Growth (2010-2023)");

    // Add description box
    gRef.current.append("rect")
      .attr("class", "description-box")
      .attr("x", 10)
      .attr("y", height + 20)
      .attr("width", width - 20)
      .attr("height", 60)
      .attr("rx", 5)
      .attr("ry", 5);

    gRef.current.append("text")
      .attr("class", "year-description")
      .attr("x", 20)
      .attr("y", height + 40)
      .text(yearDescriptions[currentYear] || "Data not available");

    // Create line generator
    const line = d3.line()
      .x(d => xScaleRef.current(d.year))
      .y(d => yScaleRef.current(d.value));

    // Draw lines
    pathsRef.current = data.map((countryData, i) => {
      return gRef.current.append("path")
        .datum(countryData.values)
        .attr("class", "line")
        .attr("stroke", color(countryData.country))
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("d", line(countryData.values.filter(d => d.year <= currentYear)));
    });

    // Add flags and dots
    const dotGroups = gRef.current.selectAll(".dot-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "dot-group");

    dotGroups.each(function(countryData) {
      const group = d3.select(this);
      
      // Add flag images
      group.selectAll(".flag")
        .data(countryData.values)
        .enter()
        .append("image")
        .attr("class", "flag")
        .attr("xlink:href", flagImages[countryData.country])
        .attr("x", d => xScaleRef.current(d.year) - 10)
        .attr("y", d => yScaleRef.current(d.value) - 10)
        .attr("width", 20)
        .attr("height", 15)
        .attr("opacity", 0);
      
      // Add invisible hit areas
      group.selectAll(".dot")
        .data(countryData.values)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScaleRef.current(d.year))
        .attr("cy", d => yScaleRef.current(d.value))
        .attr("r", 12)
        .attr("fill", "transparent")
        .on("mouseover", (event, d) => showTooltip(event, d, countryData.country))
        .on("mouseout", hideTooltip);
    });

     // Add legend
     const legend = gRef.current.append("g")
     .attr("transform", `translate(${width - 80}, 20)`);

   countries.forEach((country, i) => {
     const legendItem = legend.append("g")
       .attr("transform", `translate(0, ${i * 20})`);

     legendItem.append("circle")
       .attr("r", 5)
       .attr("fill", color(country));

     legendItem.append("text")
       .attr("x", 10)
       .attr("y", 5)
       .text(country)
       .style("font-size", "12px")
       .style("dominant-baseline", "middle");
   });

    // Add axes
    gRef.current.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScaleRef.current).tickFormat(d3.format("d")));

    gRef.current.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(yScaleRef.current));

    // Start animation
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentYear(prev => {
          const nextIndex = years.indexOf(prev) + 1;
          return nextIndex < years.length ? years[nextIndex] : years[0];
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update chart when year changes
  useEffect(() => {
    if (!gRef.current || !xScaleRef.current || !yScaleRef.current) return;

    // Update description
    gRef.current.select(".year-description")
      .text(yearDescriptions[currentYear] || "Data not available");

    // Update flags visibility
    gRef.current.selectAll(".flag")
      .transition()
      .duration(300)
      .attr("opacity", d => d.year === currentYear ? 1 : 0)
      .attr("x", d => xScaleRef.current(d.year) - 10)
      .attr("y", d => yScaleRef.current(d.value) - 10);

    // Update paths
    const line = d3.line()
      .x(d => xScaleRef.current(d.year))
      .y(d => yScaleRef.current(d.value));

    pathsRef.current.forEach((path, i) => {
      const filteredData = data[i].values.filter(d => d.year <= currentYear);
      path.datum(filteredData)
        .transition()
        .duration(800)
        .attr("d", line(filteredData));
    });

    // Update vertical line
    gRef.current.selectAll(".year-line").remove();
    gRef.current.append("line")
      .attr("class", "year-line")
      .attr("x1", xScaleRef.current(currentYear))
      .attr("x2", xScaleRef.current(currentYear))
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#000")
      .attr("stroke-dasharray", "3,3");

  }, [currentYear]);

  // Tooltip functions
  const showTooltip = (event, dataPoint, country) => {
    d3.select(tooltipRef.current)
      .html(`
        <strong>${country}</strong><br>
        Year: ${dataPoint.year}<br>
        GDP: $${dataPoint.value.toFixed(2)} billion
      `)
      .style("left", `${event.pageX + 15}px`)
      .style("top", `${event.pageY - 28}px`)
      .transition()
      .duration(200)
      .style("opacity", 1);
  };

  const hideTooltip = () => {
    d3.select(tooltipRef.current)
      .transition()
      .duration(500)
      .style("opacity", 0);
  };

  return (
    <div style={{ margin: '20px', position: 'relative' }}>
      <svg ref={svgRef}></svg>
      
      <div ref={tooltipRef} className="tooltip" 
        style={{
          position: 'absolute',
          padding: '8px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #ddd',
          borderRadius: '4px',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontSize: '14px',
          maxWidth: '200px'
        }}
      ></div>

      <div id="controls" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={startAnimation} 
          disabled={isPlaying}
          style={{ 
            padding: '8px 16px', 
            margin: '0 5px', 
            backgroundColor: isPlaying ? '#ddd' : '#4CAF50',
            color: isPlaying ? '#666' : 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          ▶ Play
        </button>
        <button 
          onClick={pauseAnimation} 
          disabled={!isPlaying}
          style={{ 
            padding: '8px 16px', 
            margin: '0 5px', 
            backgroundColor: !isPlaying ? '#ddd' : '#f44336',
            color: !isPlaying ? '#666' : 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          ⏸ Pause
        </button>
        <button 
          onClick={resetAnimation}
          style={{ 
            padding: '8px 16px', 
            margin: '0 5px', 
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          ↻ Reset
        </button>
      </div>
    </div>
  );
};

export default AllCountriesAnimatedGDPLineChart;