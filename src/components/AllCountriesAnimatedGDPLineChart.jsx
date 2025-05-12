import React, { useEffect, useRef, useState } from 'react';
import { GDPData as data, flagImages, yearGDPDescriptions as yearDescriptions } from '../data/countryData';
import { FaArrowDownLong,FaArrowUpLong } from "react-icons/fa6";
import * as d3 from 'd3';


const AllCountriesAnimatedGDPLineChart = () => {
  // Refs
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const gRef = useRef(null);
  const pathsRef = useRef([]);
  const xScaleRef = useRef(null);
  const yScaleRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const observerRef = useRef(null);
  const descriptionRef = useRef(null);

  const margin = {top: 70, right: 120, bottom: 100, left: 60};
  const width = containerRef.current ? 0.8 * containerRef.current.clientWidth - margin.left - margin.right : 900 - margin.left - margin.right;
  const height = 650 - margin.top - margin.bottom; 

  // State
  const [currentYear, setCurrentYear] = useState(2010);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState(null);
  const [isManualStep, setIsManualStep] = useState(false);



  const years = data[0].values.map(d => d.year);
  const lastYear = years[years.length-1];
  const firstYear = years[0];
  const countries = data.map(d => d.country);

  



  // Color scale
  const color = d3.scaleOrdinal()
    .domain(countries)
    .range(d3.schemeTableau10);

  // Animation controls
  const startAnimation = () => {
    if (animationComplete) {
      setCurrentYear(years[0]);
      setAnimationComplete(false);
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    setIsPaused(true);
  };

  const resetAnimation = () => {
    clearInterval(intervalRef.current);
    setCurrentYear(years[0]);
    setIsPlaying(false);
    setAnimationComplete(false);
    updateChart();
    setIsPaused(false);
  };
  //manual steps
  const nextYear = () => {
    const nextIndex = years.indexOf(currentYear) + 1;
    if (nextIndex < years.length) {
      setCurrentYear(years[nextIndex]);
      setAnimationComplete(false);
    } else {
      setAnimationComplete(true);
    }
  };

  const prevYear = () => {
    const prevIndex = years.indexOf(currentYear) - 1;
    if (prevIndex >= 0) {
      setCurrentYear(years[prevIndex]);
      setAnimationComplete(false);
    }
  };


    // Set up Intersection Observer
    useEffect(() => {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting && !animationComplete) {
            if(!isPaused){
               startAnimation();
            }
          }
        },
        { threshold: 0.5 } // 50% of element must be visible
      );
  
      if (containerRef.current) {
        observerRef.current.observe(containerRef.current);
      }
  
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [animationComplete]);

  // Initialize chart
  useEffect(() => {
    if (!svgRef.current || !containerRef) return;

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
      .text("GDP Growth (2010-2023)");

   

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
        .attr("opacity", d => d.year === currentYear && isPaused && d.year == lastYear ? 1 : 0);

      // Add GDP value text next to flag
      group.selectAll(".gdp-value")
        .data(countryData.values)
        .enter()
        .append("text")
        .attr("class", "gdp-value")
        .attr("x", d => xScaleRef.current(d.year) + 15)
        .attr("y", d => yScaleRef.current(d.value) - 10)
        .attr("text-anchor", "left")
        .attr("font-size", "10px")
        .attr("fill", d => color(countryData.country))
        .text(d => `$${d.value.toFixed(1)}B`)
        .attr("opacity", d => d.year === currentYear  && (d.year == lastYear || d.year == firstYear )? 1 : 0);
     
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
        // .on("mouseover", (event, d) => showTooltip(event, d, countryData.country))
        // .on("mouseout", hideTooltip);
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
    updateChart();

    return () => clearInterval(intervalRef.current);
  }, [width]);

   // Update description panel
  const updateDescription = (year) => {
    const description = yearDescriptions[year] || {
      title: "Data Not Available",
      content: "No description available for this year",
      highlights: []
    };
  
    const prevYearIndex = years.indexOf(year) > 0 ? years.indexOf(year) - 1 : 0;
  
    const jsxContent = (
      <div>
        <h3>{year}: {description.title}</h3>
        <p>{description.content}</p>
  
        {description.highlights.length > 0 && (
          <ul>
            {description.highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
  
        <div className="current-values">
          <h4>Current GDP Values:</h4>
          <ul>
            {data.map((country) => {
              const value = country.values.find(v => v.year === year)?.value;
              const prev_value = country.values.find(v => v.year === years[prevYearIndex])?.value;
  
              if (!value) return null;
  
              const change = value - prev_value;
              const isUp = change > 0;
  
              return (
                <li key={country.country}>
                  <img
                    src={flagImages[country.country]}
                    alt={country.country}
                    width="20"
                    height="15"
                  />{" "}
                  {country.country}: ${value.toFixed(1)}B{" "}
                  {isUp ? (
                    <FaArrowUpLong style={{ color: "green" }} />
                  ) : (
                    <FaArrowDownLong style={{ color: "red" }} />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  
    setDescriptionContent(jsxContent);
  };
  

   // Update description when year changes
   useEffect(() => {
    updateDescription(currentYear);
  }, [currentYear]);


    // Animation effect
    useEffect(() => {
      if (!isPlaying) return;
  
      clearInterval(intervalRef.current);
  
      intervalRef.current = setInterval(() => {
        setCurrentYear(prev => {
          const nextIndex = years.indexOf(prev) + 1;
          if (nextIndex >= years.length) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setAnimationComplete(true);
            return prev; 
          }
          return years[nextIndex];
        });
      }, 1500);
  
      return () => clearInterval(intervalRef.current);
    }, [isPlaying, years]);

  // Update chart when year changes
  useEffect(() => {
    if (!gRef.current || !xScaleRef.current || !yScaleRef.current) return;
    updateChart();

  }, [currentYear]);

  // Pause animation when not in view
  useEffect(() => {
      if (!isInView && isPlaying) {
        pauseAnimation();
      }
    }, [isInView, isPlaying]);

  const updateChart = () => {
        

        // Update description
        gRef.current.select(".year-description")
          .text(yearDescriptions[currentYear] || "Data not available");

        // Update flags visibility
        gRef.current.selectAll(".flag, .gdp-valuey")
          .transition()
          .duration(1000)
          .attr("opacity", d => d.year === currentYear  && (d.year == lastYear || d.year == firstYear ) ? 1 : 0)
          .attr("x", d => xScaleRef.current(d.year) - 10)
          .attr("y", d => yScaleRef.current(d.value) - 10);

        gRef.current.selectAll(".gdp-value")
          .attr("x", d => xScaleRef.current(d.year) + 15)
          .attr("y", d => yScaleRef.current(d.value) - 10)
          .text(d => `$${d.value.toFixed(1)}B`);

        // Update paths
        const line = d3.line()
          .x(d => xScaleRef.current(d.year))
          .y(d => yScaleRef.current(d.value));

        pathsRef.current.forEach((path, i) => {
          const filteredData = data[i].values.filter(d => d.year <= currentYear);
          path.datum(filteredData)
            .transition()
            .duration(1000)
            .attr("d", line(filteredData));
        });

        // Update vertical line
        // gRef.current.selectAll(".year-line").remove();
        // gRef.current.append("line")
        //   .attr("class", "year-line")
        //   .attr("x1", xScaleRef.current(currentYear))
        //   .attr("x2", xScaleRef.current(currentYear))
        //   .attr("y1", 0)
        //   .attr("y2", height)
        //   .attr("stroke", "#000")
        //   .attr("stroke-dasharray", "3,3");
  }

  // Tooltip functions
  const showTooltip = (event, dataPoint, country) => {
    d3.select(tooltipRef.current)
      .html(`
        <strong>${country}</strong><br>
        Year: ${dataPoint.year}<br>
        GDP: $${dataPoint.value.toFixed(2)} billion
      `)
      .style("fill", "green")
      .style("left", `${event.pageX + 15}px`)
      .style("top", `${event.pageY - 28}px`)
      //.transition()
      //.duration(200)
      .style("opacity", 1);
  };

  const hideTooltip = () => {
    d3.select(tooltipRef.current)
      .transition()
      .duration(500)
      //.style("opacity", 0);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          <div ref={containerRef} style={{ flex: '1 1 60%', minWidth: '620px', minHeight:'600px' }}>
            <svg ref={svgRef}></svg>
            
            {/* <div ref={tooltipRef} className="tooltip" 
              style={{
                position: 'absolute',
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.95)',
                color: "#FFF",
                border: '1px solid #ddd',
                borderRadius: '4px',
                pointerEvents: 'none',
                opacity: 0,
                transition: 'opacity 0.3s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                fontSize: '14px',
                maxWidth: '200px'
              }}
            ></div> */}

            <div id="controls" style={{ marginTop: '10px', textAlign: 'center' }}>
              <button 
                onClick={isPlaying ? pauseAnimation : startAnimation} 
                // disabled={isPlaying}
                style={{ 
                  padding: '8px 16px', 
                  margin: '0 5px', 
                  backgroundColor: isPlaying ? '#ddd' : '#1d3557',
                  color: isPlaying ? '#666' : 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
               { isPlaying ?  "⏸Pause" : "▶ Play" }
              </button>

              <button 
                onClick={prevYear}
                disabled={!isPaused || currentYear === firstYear}
                style={{ 
                  padding: '8px 16px', 
                  margin: '0 5px', 
                  backgroundColor: (!isPaused || currentYear === firstYear) ? '#ddd' : '#457b9d',
                  color: (!isPaused || currentYear === firstYear) ? '#666' : 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                ← Prev
              </button>

              <button 
                onClick={nextYear}
                disabled={!isPaused || animationComplete}
                style={{ 
                  padding: '8px 16px', 
                  margin: '0 5px', 
                  backgroundColor: (!isPaused || animationComplete) ? '#ddd' : '#457b9d',
                  color: (!isPaused || animationComplete) ? '#666' : 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                Next →
              </button>

              <button 
                onClick={resetAnimation}
                style={{ 
                  padding: '8px 16px', 
                  margin: '0 5px', 
                  backgroundColor: '#457b9d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                ↻ Reset
              </button>
            </div>
            <div className="graph-summary">
              <p style={{fontSize: '1.5rem', color: '#d2cfcf' }}>Summary</p>
              <p>
              This animated line graph illustrates the GDP progression per capita of five countries between 2010 and 2023. While Burundi, Central African Republic, Congo and Mozambique maintain consistently low GDP levels, South Sudan shows notable fluctuations linked to oil revenue and political instability - civil wars. 
              </p>
            </div>
          </div>
          <div ref={descriptionRef} style={{
                flex: '1 1 30%',
                minWidth: '250px',
                minHeight: '856px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                marginLeft: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
         }}>
         {descriptionContent}
        </div>

      <style>{`
        .current-values img {
          vertical-align: middle;
          margin-right: 8px;
        }
        .graph-summary {
             background-color: #1d3557;
             color: #fff;
             margin-top: 10px;
             padding: 2rem;
             /*font-family: 'Arial, sans-serif';*/
             border-radius: 10px;
            height: auto;
        }
        .current-values ul {
          list-style: none;
          padding: 0;
        }
        .current-values li {
          margin: 8px 0;
          display: flex;
          align-items: center;
        }
        h3 {
          color: #2c3e50;
          margin-top: 0;
        }
        h4 {
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default AllCountriesAnimatedGDPLineChart;