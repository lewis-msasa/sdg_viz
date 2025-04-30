import React, { useState } from 'react';

const CombinedQuizCard = ({ facts, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentIndex < facts.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 500);
    } else {
      const finalScore = calculateScore(newAnswers);
      setScore(finalScore);
      setShowResults(true);
      onComplete(finalScore, facts.length);
    }
  };


  const calculateScore = (answers) => {
    return facts.reduce((correct, question, index) => {
      return correct + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };


  const currentQuestion = facts[currentIndex];
  const progress = ((currentIndex) / (facts.length)) * 100;

  return (

    
    <div className="quiz-card">
    {showResults ? (
          <div className="quiz-results">
            <h2>Quiz Results</h2>
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
            <br />
           
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
              <h2 className="card-title">All Countries</h2>
            </div>
            <div className="quiz-content">
              {facts.length > 0 ? (
                <>
                <h3 className="category">{currentQuestion.category}</h3>
                <h2 className="question">{currentQuestion.question}</h2>
                
                <div className="options-container">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${
                        selectedAnswers[currentIndex] === index ? 'selected' : ''
                      } ${
                        selectedAnswers[currentIndex] !== undefined && 
                        index === currentQuestion.correctAnswer ? 'correct' : ''
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
                <p>No quiz facts available for yet.</p>
              )}

            </div>
            
          </>
        )
      }

 

    </div>
  );

}

export default CombinedQuizCard;