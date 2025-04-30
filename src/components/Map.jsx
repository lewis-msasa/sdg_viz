import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const Map = ({ clickableCountries, onCountryClick, selectedCountry,onSelectAll }) => {
  const mapContainerRef = useRef(null);
  const selectAllRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const width = mapContainerRef.current.clientWidth;
    const height = window.innerHeight;
    let isZoomed = false;
    let isClicked = false;
    let clickedCountry = null;

    const svg = d3.select(mapContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Add control group
    const controls = svg.append("g")
      .attr("class", "map-controls")
      .attr("transform", `translate(20,20)`);

     // Add Select All button
    controls.append("rect")
     .attr("x", 0)
     .attr("y", 0)
     .attr("width", 120)
     .attr("height", 40)
     .attr("rx", 5)
     .attr("class", "select-all-button")
     .on("click", onSelectAll);

    controls.append("text")
     .attr("x", 60)
     .attr("y", 25)
     .attr("text-anchor", "middle")
     .attr("fill", "white")
     .text("Select All");
      
      svg.on("wheel.zoom", null); // Disable mouse wheel zoom
      svg.on("touchstart.zoom", null); // Disable touch zoom

    const g = svg.append("g");
    const initialProjection = d3.geoMercator()
      .center([20, 2])
      .scale(width / 2.5)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(initialProjection);

    // Set up zoom behavior
    const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .filter(event => {
      // Disable wheel zoom but allow other interactions
      return event.type !== 'wheel';
    })
    .on("zoom", (event) => {
        g.attr("transform", event.transform);
    });

    // Create a tooltip
    const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    svg.call(zoom);

    d3.json("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson")
      .then(function(world) {
        const africa = world.features.filter(d => 
          d.properties.REGION_UN === "Africa" || 
          d.properties.CONTINENT === "Africa");
        
        // Draw countries
        g.selectAll(".country")
          .data(africa)
          .enter()
          .append("path")
          .attr("class", d => 
            isClickableCountry(d.properties.NAME) ? "country focus-country" : "country other-country")
          .attr("d", path)
          .on("mouseover", function(event, d) {
            if (isClickableCountry(d.properties.NAME)) {
              d3.select(this)
              .attr("stroke", "#000")
              .attr("stroke-width", 1.5)
              .style("cursor", "pointer"); // Explicit pointer on hover
              console.log(isClicked)
              if(!isZoomed && !isClicked){
                //showTooltip(d,event);
              }
            }
          })
          .on("mouseout", function(event,d) {
             hideTooltip();
          })
          .on("dblclick", function(event, d){
            if(isClickableCountry(d.properties.NAME)){
                hideTooltip();
                event.stopPropagation();
                        
                if (clickedCountry === d && isZoomed) {
                    // Clicked same country while zoomed - unzoom
                    resetZoom();
                } else {
                    // Zoom to new country
                    zoomToCountry(d);
                }
                //showTooltip(d,event);
           }
          })
          .on("click", function(event, d) {
            if (isClickableCountry(d.properties.NAME)) {
              //hideTooltip();
              onCountryClick(d.properties.NAME);
              highlightCountry(this);
              //showTooltip(d,event);
              isClicked = true;
            }
          });


          g.selectAll(".country-name")
              .data(africa)
              .enter()
              .append("text")
              .attr("class", "country-name")
              .attr("transform", d => {
               
                const centroid = path.centroid(d);
                return `translate(${centroid[0]}, ${centroid[1]})`;
              })
              .attr("text-anchor", "middle") 
              .attr("dy", ".35em")
              .text(d => isClickableCountry(d.properties.NAME) ? d.properties.NAME : ""); 

        if (selectedCountry) {
          highlightSelectedCountry();
        }
        if (selectedCountry === 'all') {
          svg.selectAll(".country")
            .filter(d => isClickableCountry(d.properties.NAME))
            .classed("all-selected", true);
        } else {
          svg.selectAll(".country")
            .classed("all-selected", false);
        }
      });
      function hideTooltip(){
        tooltip.transition()
        .duration(500)
        .style("opacity", 0);
      }
      function showTooltip(d,event){
        tooltip.transition()
                .duration(200)
                .style("opacity", .9);
                tooltip.html(d.properties.NAME)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
      }
      function zoomToCountry(d) {
        // Clear previous selection
       
        
        // Set new selection
        clickedCountry = d;
        isZoomed = true;
      
        onCountryClick(d.properties.NAME);
        
        // Calculate zoom transform
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );
    }
    
    function resetZoom() {
        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity);
        
        clickedCountry = null;
        isZoomed = false;
        //infoPanel.html("Click on any country to zoom/unzoom");
    }

    function isClickableCountry(countryName) {
      return clickableCountries.some(name => 
        countryName.includes(name));
    }

    function highlightCountry(element) {
      g.selectAll(".country").classed("clicked", false);
      d3.select(element).classed("clicked", true);
     
    }

    function highlightSelectedCountry() {
      g.selectAll(".country")
        .filter(d => d.properties.NAME === selectedCountry)
        .classed("clicked", true);
    }
    // Reset zoom button
    d3.select("#reset-zoom").on("click", function() {
      svg.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);
      
      // Clear selection
      g.selectAll(".country").classed("clicked", false);
      //infoPanel.html("Click on any country to zoom and see details");
    });

    return () => {
      svg.remove();
    };
  }, [clickableCountries, onCountryClick, selectedCountry, onSelectAll]);

  return <div ref={mapContainerRef} className="map-container"></div>;
};

export default Map;