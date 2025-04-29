export const styles = `
  .africa-map-container {
    display: flex;
    flex-direction: column;
    min-height: 120vh;
  }
  .map-section {
  height: 100vh;
  position: relative;
  background: #e8f4f8;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.8s ease-out;
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
    background: linear-gradient(135deg, #1d3557, #457b9d);
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
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
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
  font-size: 1.2rem;
}

.arrow-icon {
  font-size: 2rem;
  animation: bounce 2s infinite;
}

.sdg-image {
  width: 100px;
  height: 100px;
  padding:2rem;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
  animation: float 6s ease-in-out infinite;
}
  

`;