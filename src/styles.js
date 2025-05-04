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
  height: 50vh;
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

.combined-quiz-button {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 1.5rem;
  background: #457b9d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.combined-quiz-button:hover {
  background: #1d3557;
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
  
  /* Quiz Card Styles */
  .quiz-card {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    max-width: 600px;
    margin: 0 auto;
}
.quiz-progress {
  margin-bottom: 1.5rem;
  position: relative;
}

.progress-bar {
  height: 6px;
  background: #4CAF50;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -25px;
  font-size: 0.9rem;
  color: #666;
}

.question {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.category {
  color: #457b9d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.options-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.option-button {
  padding: 12px 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  color: black;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-size: 1rem;
}

.option-button:hover {
  border-color: #a8dadc;
  background: #f1f9f9;
}

.option-button.selected {
  border-color: #457b9d;
  background: #e8f4f8;
}

.option-button.correct {
  border-color: #4CAF50;
  background: #e8f5e9;
}

.quiz-results {
  text-align: center;
}

.score-display {
  font-size: 1.5rem;
  margin: 1rem 0;
  color: #333;
}

.progress-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem auto;
  position: relative;
}

.progress-circle span {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

.retry-button {
  padding: 10px 20px;
  background: #457b9d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
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


.quiz-card.empty-state {
  text-align: center;
  color: #666;
  padding: 3rem;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.card-title {
    font-size: 1.8rem;
    color: #1d3557;
    margin: 0;
}
.card-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #e63946;
}
.fact-category {
    background: #a8dadc;
    color: #1d3557;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 10px;
}
.fact-item {
   animation: fadeIn 0.3s ease-out;
}
.fact-question {
    font-weight: bold;
    color: #457b9d;
    margin-bottom: 5px;
}
.fact-answer {
    color: #1d3557;
}
.card-nav {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.card-button {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background: #457b9d;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
}
.card-button:hover {
    background: #1d3557;
    transform: translateY(-2px);
}
.card-button:disabled {
    background: #ccc;
    cursor: not-allowed;
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
/* Intro Animation */
.intro-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1d3557, #457b9d);
  z-index: 1000;
  cursor: pointer;
}

.text-background {
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 800px;
}

.animated-text {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: slideIn 1s ease-out;
}

.subtext {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out 0.5s both;
}

.click-prompt {
  margin-top: 3rem;
  animation: fadeIn 1s ease-out 1.5s both;
}

.click-prompt p {
  margin-bottom: 0.5rem;
}

.arrow-icon {
  font-size: 2rem;
  animation: bounce 2s infinite;
  color: #335C7D;
}

.sdg-image {
  width: 100px;
  height: 100px;
  padding:2rem;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
  animation: float 6s ease-in-out infinite;
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
  background: #457b9d;
  width: 100%;
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

/* Quiz Result Buttons */
.result-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.learn-more-button {
  padding: 10px 20px;
  margin-top: 1.5rem;
  background: #1d3557;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.learn-more-button:hover {
  background: #457b9d;
  transform: translateY(-2px);
}

.back-button {
  display: block;
  margin: 2rem auto 0;
  padding: 10px 25px;
  background: #1D3557;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}


`;