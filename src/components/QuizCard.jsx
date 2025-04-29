import React, { useState } from 'react';
import ScrollToTopButton from './scrollToTopButton';

const QuizCard = ({  
  country, 
  facts,
  onComplete,
  onLearnMore,
  quizState,
  updateQuizState
}) => {

  if (!country || !facts) {
    return (
      <div className="quiz-card empty-state">
        <h2>Select a country from the map to view facts</h2>
      </div>
    );
  }

  const { currentIndex, selectedAnswers, showResults, score } = quizState;

  const currentFact = facts[currentIndex] || [];
  const progress = ((currentIndex) / facts.length) * 100;

  

  const handleAnswerSelect = (answerIndex) => {
    updateQuizState(prev => {
      const updatedAnswers = [...prev.selectedAnswers];
      updatedAnswers[prev.currentIndex] = answerIndex;
      
      const isLastQuestion = prev.currentIndex >= facts.length - 1;
      const newIndex = isLastQuestion ? prev.currentIndex : prev.currentIndex + 1;
      const newScore = isLastQuestion ? calculateScore(updatedAnswers) : prev.score;
      
      return {
        selectedAnswers: updatedAnswers,
        currentIndex: newIndex,
        showResults: isLastQuestion,
        score: newScore
      };
    });
  };



  const calculateScore = (answers) => {
    let correct = 0;
    facts.forEach((quiz, index) => {
  
      if (answers[index] === quiz.correctAnswer) {
        correct++;
      }
    });
    console.log("num_correct " + correct)
    updateQuizState({ score: correct });
    onComplete(correct, facts.length);
  };

  const resetQuiz = () => {
    updateQuizState({
      currentIndex: 0,
      selectedAnswers: [],
      showResults: false,
      score: 0
    });
  };

 
  return (
  
      <div className="quiz-card">
      {showResults ? (
            <div className="quiz-results">
              <h2>Quiz Results for {country}</h2>
              <div className="score-display">
                You scored {score} out of {facts.length}!
              </div>
              <div className="progress-circle" style={{ 
                background: `conic-gradient(#4CAF50 ${(score/facts.length)*100}%, #f0f0f0 ${(score/facts.length)*100}%)`
              }}>
                <span>{Math.round((score/facts.length)*100)}%</span>
              </div>
              { Math.round((score/facts.length)*100) != 100 ? (<button className="retry-button" onClick={resetQuiz}>
                Try Again
              </button> ) : <></> }
              <button 
                className="learn-more-button"
                onClick={() => onLearnMore(country)}
                >
                Learn More About {country}
              </button>
            </div>
          ) : (
            <>
              <div className="quiz-progress">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <div className="progress-text">
                  Question {currentIndex + 1} of {facts.length}
                </div>
              </div>
              <div className="card-header">
                <h2 className="card-title">{country}</h2>
              </div>
              <div className="quiz-content">
                {facts.length > 0 ? (
                  <>
                  <h3 className="category">{currentFact.category}</h3>
                  <h2 className="question">{currentFact.question}</h2>
                  
                  <div className="options-container">
                    {currentFact.options.map((option, index) => (
                      <button
                        key={index}
                        className={`option-button ${
                          selectedAnswers[currentIndex] === index ? 'selected' : ''
                        } ${
                          selectedAnswers[currentIndex] !== undefined && 
                          index === currentFact.correctAnswer ? 'correct' : ''
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswers[currentIndex] !== undefined}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  </>
                ): (
                  <p>No quiz facts available for {country} yet.</p>
                )}

              </div>
              
            </>
          )
        }

        {/* <div className="card-header">
          <h2 className="card-title">{country}</h2>
         
        </div> */}
        {/*         
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
        </div> */}

        {/* {facts.length > 0 && (
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
        
        )} */}

      </div>
  
  );
};

export default QuizCard;