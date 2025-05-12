import React, { useEffect, useRef } from 'react';
import "./TableauEmbed.css"


const TableauEmbed = ({ vizUrl, options }) => {
  const vizContainer = useRef(null);
  const vizRef = useRef(null);
 
  const isInitialized = useRef(false);
  let viz;
    useEffect(() => {
      if (isInitialized.current) return;
      if (vizRef.current) {
        //vizRef.current?.dispose();
      }

      import('https://public.tableau.com/javascripts/api/tableau.embedding.3.8.0.min.js').then(({ TableauViz }) => {
        viz = new TableauViz();
        viz.src = vizUrl;
        if (options.toolbar) viz.toolbar = options.toolbar;
        viz.options = options;
     
        vizRef.current = viz;
        if(!isInitialized.current){
          vizContainer.current.appendChild(viz);
        }
        isInitialized.current = true;
      }).catch(error => {
        console.error('Error loading Tableau API:', error);
      });

      return () => {
        isInitialized.current = false;
        if (viz) {
          //viz?.dispose();
        }
      };
    }, [vizUrl, options]);

  return <div ref={vizContainer} className="tableau-viz" />;
};

export default TableauEmbed;