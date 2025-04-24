import React from 'react';

const QuizCard = ({ 
  isVisible, 
  country, 
  facts, 
  currentIndex, 
  onPrev, 
  onNext, 
  onClose 
}) => {
  console.log(facts)
  if (!country) {
    return (
      <div className="quiz-card empty-state">
        <h2>Select a country from the map to view facts</h2>
      </div>
    );
  }

  const currentFact = facts[currentIndex] || [];
 
  return (
  
      <div className="quiz-card">
        <div className="card-header">
          <h2 className="card-title">{country}</h2>
         
        </div>
        
        <div className="quiz-content">
          {facts.length > 0 ? (
            <div className="fact-item">
              <span className="fact-category">{currentFact.category}</span>
              <div className="fact-question">{currentFact.question}</div>
              <div className="fact-answer">{currentFact.answer}</div>
            </div>
          ) : (
            <p>No quiz facts available for {country} yet.</p>
          )}
        </div>

        {facts.length > 0 && (
        <div className="card-nav">
          <button 
            className="card-button" 
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          
          <span className="fact-counter">
            {facts.length ? `${currentIndex + 1}/${facts.length}` : '0/0'}
          </span>
          
          <button 
            className="card-button" 
            onClick={onNext}
            disabled={currentIndex === facts.length - 1}
          >
            Next
          </button>
        </div>
        )}

      </div>
  
  );
};

export default QuizCard;