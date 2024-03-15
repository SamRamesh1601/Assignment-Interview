import React, { useState, useEffect } from "react";
import Option from "./Options";
import useConvertHtmlText from "../Hooks/useConvertHtmlText";
import { FaHome, FaPlay } from "react-icons/fa";

function Question({ questionArr, handleHome }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(30); // Initial timer value in seconds

  const currquestion = questionArr[currentQuestionIndex];

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!showResults) {
        if (currquestion) setTimer((prevTimer) => prevTimer - 1);
        if (timer === 1 && currentQuestionIndex === questionArr.length - 1) {
          setShowResults(true); // Show results when timer ends
        }
        if (timer === 1) {
          handleNextQuestion();
        }
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timer, currquestion, showResults]);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect === currquestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex === questionArr.length - 1) {
      setShowResults(true);
    }
    handleNextQuestion();
  };
  const handleRefresh = () => {
    setScore(0);
    setTimer(30);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTimer(30);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };
  const [currQuestionText, setCurrQuestionText] =
    useConvertHtmlText(currquestion);
  return (
    <div className="question-container basic-center-div flex-col">
      <div className="choose-container basic-center-div flex-col">
        {!currquestion &&
          currentQuestionIndex === questionArr.length &&
          !showResults && <div className="circle-loader"></div>}
        {currquestion && !showResults && (
          <div className="qustion-ans-container basic-center-div flex-col">
            <p className="qustion-ans-container-text">{currQuestionText}</p>
            <div className="question-container-text timer">{timer}</div>
            <div className="options">
              {[
                currquestion.correct_answer,
                ...currquestion.incorrect_answers,
              ].map((option, index) => (
                <Option
                  key={index}
                  option={option}
                  handleAnswerClick={handleAnswerClick}
                />
              ))}
            </div>
            <div className=" btn-group basic-gap-center-div">
              {/* {currentQuestionIndex !== 0 && (
                <button
                  className="button-action"
                  onClick={() =>
                    setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
                  }
                >
                  Previous Question
                </button>
              )} */}
              {currentQuestionIndex !== questionArr.length - 1 && (
                <button className="button-action" onClick={handleNextQuestion}>
                  Next Question
                </button>
              )}
              <button className="button-action success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
        {showResults && (
          <div className="answer-container basic-center-div flex-col">
            <h2 className="qustion-ans-container-text font-2">Score Results</h2>
            <p
              className={`question-container-text ${score >= 40 && "good"}  ${
                score <= 20 && "not-good"
              }`}
            >
              {score}
            </p>
            <p
              className={`question-container-text small ${
                score >= 40 && "good"
              }  ${score <= 20 && "not-good"}`}
            >
              {score >= 45 && "Excellent Records"}
              {score >= 40 && score < 45 && "Good Records"}
              {score >= 35 && score < 40 && "Not Bad Records"}
              {score <= 15 && score > 5 && "Bad Records"}
              {score <= 5 && "Very Bad Records"}
            </p>
            <div className="mt-4 d-flex">
              <button
                className="mx-4 button-action circle"
                onClick={handleRefresh}
              >
                <FaPlay />
              </button>
              <button
                className="mx-5 button-action circle"
                onClick={handleHome}
              >
                <FaHome />
              </button>
            </div>
          </div>
        )}
        {currentQuestionIndex !== 0 &&
          currentQuestionIndex === questionArr.length &&
          !showResults && (
            <div className="question-container-text">
              All questions answered!
            </div>
          )}
      </div>
    </div>
  );
}

export default Question;
