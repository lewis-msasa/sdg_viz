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
  if (!country) return null;

  const currentFact = facts[currentIndex] || [];
 
  return (
    <div className={`quiz-card-container ${isVisible ? 'visible' : ''}`}>
      
      <div className="quiz-card">
        <div className="card-header">
          <h2 className="card-title">{country}</h2>
          <button className="card-close" onClick={onClose}>✕</button>
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
      </div>
    </div>
  );
};

export default QuizCard;