export const styles = `
  .africa-map-container {
    display: flex;
    flex-direction: column;
    min-height: 120vh;
  }
.map-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #457b9d, #1d3557);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.8s ease-out;
}
.mini-map-topbar{
   display: none;
}
.map-sidebar {
  flex: 0 0 350px;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  height: 60vh;
  margin-top: 10rem;
  margin-left: 10rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
/* Sidebar content styles */
.country-list {
  columns: 2;
  column-gap: 1rem;
  margin: 1rem 0;
}

.country-list li {
  margin-bottom: 0.5rem;
  break-inside: avoid;
}


.map-wrapper {
  flex: 1;
  min-width: 300px;
}

.map-controls {
  pointer-events: all;
}

.select-all-button {
  fill: #457b9d;
  cursor: pointer;
  transition: all 0.3s

  display: block;
  margin: 2rem auto 0;
  padding: 10px 25px;
  background: #457b9d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

}
.miniselect-all-button:hover {
  fill: #1d3557;
}

.miniselect-all-button {
  fill: #457b9d;
  cursor: pointer;
  transition: all 0.3s;
  display: block;
  background: #457b9d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2rem auto 0;
  font-size: 0.6rem;

}
.miniselect-all-button:hover {
  fill: #1d3557;
}

.country.focus-country.all-selected {
  fill: #457b9d;
  stroke: #1d3557;
  stroke-width: 1.5px;
}

.map-section.visible {
  transform: translateY(0);
  opacity: 1;
}

  .quiz-section {
    min-height: 30vh;
    padding: 2rem;
    background: white;
    border-top: 2px solid #457b9d;
  }
  
  .map-container {
    width: 100%;
    height: 100vh;
    background: none;
  }
  
  .country {
    stroke: #fff;
    stroke-width: 0.5px;
    transition: all 0.3s ease;
  }
  
  .focus-country {
    fill: #e63946;
    cursor: pointer;
  }
  .country-name {
    font-size: 10px;
    fill: white;
    pointer-events: none; 
  }
  .other-country {
    fill: #a8dadc;
    pointer-events: none;
  }
  
  .country.clicked {
    fill: #457b9d;
    stroke: #1d3557;
    stroke-width: 1.5px;
    filter: drop-shadow(0 0 5px rgba(69, 123, 157, 0.7));
  }
.quiz-history {
  margin-top: 2rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.history-country {
  font-weight: bold;
  margin-right: 5px;
}

.history-score {
  color: #4CAF50;
  margin: 0 10px;
}

.history-date {
  color: #666;
  font-size: 0.9rem;
}
.tooltip {
            position: absolute;
            padding: 8px;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            border-radius: 4px;
            pointer-events: none;
            font-size: 12px;
}

/* Animations */
@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  to { opacity: 0; visibility: hidden; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .animated-text {
    font-size: 2.5rem;
  }
  
  .subtext {
    font-size: 1.2rem;
  }
}
@media (max-width: 900px) {
  .map-section {
    flex-direction: column;
    flex: 1;
  }
  .mini-map-topbar {
    display:block;
  }
  .map-container {
    width: 100%;
    height: 80vh;
    background: none;
  }
  .map-wrapper {
      flex: 1;
      min-width: 100%;
    }
  .map-sidebar {
    display: none;
  }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Scroll to Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.scroll-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #457b9d;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.scroll-button:hover {
  background-color: #1d3557;
  transform: translateY(-3px);
}

.scroll-button svg {
  font-size: 1.2rem;
}

/* Country Details Section */
.country-details-section {
  padding: 2rem;
  margin: 4rem;
  background: #457b9d;
  width: 90%;
}

.country-details {
  // max-width: 900px;
  // margin: 0 auto;
}

.detail-columns {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;
}

.detail-column {
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.country-description {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.country-image img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}




`;