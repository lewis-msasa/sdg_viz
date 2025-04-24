export const styles = `
  .africa-map-container {
    display: flex;
    flex-direction: column;
    min-height: 120vh;
  }
  .map-section {
  
    position: relative;
    background: #e8f4f8;
  }

  .quiz-section {
    min-height: 30vh;
    padding: 2rem;
    background: white;
    border-top: 2px solid #457b9d;
  }
  
  .map-container {
    width: 100%;
    height: 120vh;
    background: #e8f4f8;
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
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;