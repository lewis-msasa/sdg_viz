import React, { useState } from 'react';
import './QuizCard.css'

const CombinedQuizCard = ({  
  facts,
  onComplete,
  quizState,
  updateQuizState,
  category = null
}) => {

  const { currentIndex, selectedAnswers, showResults, showWrongAnswers, questionResults, score } = quizState;

  const currentFact = facts[currentIndex] || [];
  const progress = ((currentIndex) / facts.length) * 100;


  const handleAnswerSelect = (answerIndex) => {
    updateQuizState(prev => {
      const updatedAnswers = [...prev.selectedAnswers];
      updatedAnswers[prev.currentIndex] = answerIndex;
      
      const isLastQuestion = prev.currentIndex >= facts.length - 1;
      const newIndex = isLastQuestion ? prev.currentIndex : prev.currentIndex + 1;
      const newScore = isLastQuestion ? calculateScore(updatedAnswers) : prev.score;
      if (document.activeElement) {
        document.activeElement.blur();
      }
      return {
        selectedAnswers: updatedAnswers,
        currentIndex: newIndex,
        showResults: isLastQuestion,
        score: newScore
      };
      
    });
  };



  const calculateScore = (answers) => {
 

    const results = facts.map((quiz, index) => { 
      console.log(answers[index])
      return {
      question: quiz.question,
      userAnswer: quiz.options[answers[index]],
      correctAnswer: quiz.options[quiz.correctAnswer - 1],
      isCorrect: answers[index] === (quiz.correctAnswer -1),
      explanation: quiz.explanation || "" 
      }
    });
    const correct = results.filter(r => r.isCorrect).length;
    updateQuizState({ score: correct, questionResults : results, category: category});
    onComplete(correct, facts.length,category);
  };
  const seeWrongAnswers = () => {
    updateQuizState({ showWrongAnswers : true});
  }
  const resetQuiz = () => {
    updateQuizState({
      currentIndex: 0,
      selectedAnswers: [],
      showResults: false,
      category: category,
      showWrongAnswers: true,
      score: 0
    });
  };

 
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
              {showWrongAnswers && (
                     <div className="wrong-answers">
                     <h3>Incorrect Answers:</h3>
                     {questionResults
                       .filter(result => !result.isCorrect)
                       .map((result, index) => (
                         <div key={index} className="wrong-answer">
                           <p className="question"><strong>Question:</strong> {result.question}</p>
                           <p className="user-answer"><strong>Your answer:</strong> <span className="incorrect">{result.userAnswer}</span></p>
                           <p className="correct-answer"><strong>Correct answer:</strong> <span className="correct">{result.correctAnswer}</span></p>
                           {result.explanation && (
                             <p className="explanation"><strong>Why:</strong> {result.explanation}</p>
                           )}
                         </div>
                       ))
                     }
                   </div>
              )}


              { Math.round((score/facts.length)*100) != 100 ? (<button className="retry-button" onClick={resetQuiz}>
                Try Again
              </button> ) : <></> }
              { Math.round((score/facts.length)*100) != 100 && !showWrongAnswers ? (<button className="wrong-answers-button" onClick={ () => seeWrongAnswers()}>
                See Answers
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

   

      </div>
  
  );
};

export default CombinedQuizCard;