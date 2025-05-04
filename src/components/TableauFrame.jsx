
import React, { Component } from 'react';  
import tableau from 'tableau-api';  

class TableauIframe extends Component { 
 
  componentDidMount() {  
    this.initViz();
  }  

  initViz() {  
    const vizUrl = 'https://public.tableau.com/views/sdg4_17463060491760/MaxQualityEducationDashboard';
    const vizContainer = this.vizContainer;  
    const options = {
      width: this.vizContainer.offsetWidth,
      height: this.vizContainer.offsetHeight,
    };
    let viz = new window.tableau.Viz(vizContainer, vizUrl, options); 
  }  

  render() {  
    return (  
      <div className='vizDiv' ref={(div) => { this.vizContainer = div }}>  
      </div>  
    )  
  }  
}  


// export default TableauIframe;


// import React, { useEffect, useRef } from 'react';
// import "./TableauEmbed.css";

// const TableauEmbed = ({ vizUrl, options }) => {
//   const vizContainer = useRef(null);
//   const vizRef = useRef(null);
 
//   const isInitialized = useRef(false);
//   let viz;
//     useEffect(() => {
//       if (isInitialized.current) return;
//       if (vizRef.current) {
//         vizRef.current?.dispose();
//       }

//       import('https://public.tableau.com/javascripts/api/tableau.embedding.3.8.0.min.js').then(({ TableauViz }) => {
//         viz = new TableauViz();
//         viz.src = vizUrl;
//         if (options.toolbar) viz.toolbar = options.toolbar;
//         viz.options = options;
//         vizRef.current = viz;
//         vizContainer.current.appendChild(viz);
//         isInitialized.current = true;
//       }).catch(error => {
//         console.error('Error loading Tableau API:', error);
//       });

//       return () => {
//         isInitialized.current = false;
//         if (viz) {
//           //viz?.dispose();
//         }
//       };
//     }, [vizUrl, options]);

//   return <div ref={vizContainer} className="tableau-viz" />;
// };

// export default TableauEmbed;