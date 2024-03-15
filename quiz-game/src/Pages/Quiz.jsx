import React, { useEffect, useState } from "react";
import { getQuestions } from "../service/service";
import useUpdateEffect from "../Hooks/useUpdateEffect";
import { FaPlay } from "react-icons/fa";
import CategorySelection from "../Component/CategorySelection";
import Question from "../Component/Question";
import bgImg from "../assets/bg1.svg";

const Quiz = () => {
  const [questionList, setQuestionList] = useState([]);
  const [error, setError] = useState();
  const [isStart, setIsStart] = useState(false);
  const [Category, setCategory] = useState({
    CategoryList: [],
    SelectedCategory: "Entertainment: Music",
  });

  useUpdateEffect(() => {
    const fetchData = async () => {
      try {
        // (async () => {
        //   const response = await getQuestions();
        //   const data = await response.json();
        //   if (response) {
        //     setQuestionList(response.results);
        //     const CategoryList = response.results.map((res) => res.category);
        //     setCategory({
        //       ...Category,
        //       CategoryList: [...new Set(CategoryList)],
        //     });
        //   }
        // })();
        const response = await getQuestions();
        if (response) {
          setQuestionList(response.results);
          const CategoryList = response.results.map((res) => res.category);
          setCategory({
            ...Category,
            CategoryList: [...new Set(CategoryList)],
          });
        }
      } catch (error) {
        console.error("API fetch error:", error);
        setError("Error fetching questions");
      }
    };
    fetchData();
  }, []);
  const handleSelectCategory = (value) => {
    let categoryDetails = { ...Category };
    categoryDetails["SelectedCategory"] = value;
    setCategory(categoryDetails);
  };
  useEffect(() => {
    console.log(questionList);
  }, [questionList]);

  return (
    <>
      <div className="quiz-container basic-center-div">
        <div className="quiz-semi-container img basic-center-div flex-col">
          <img src={bgImg} alt="background" />
        </div>
        <div className="quiz-semi-container basic-center-div flex-col">
          <span className="quiz-content-text">Test your Knowledge</span>
          <span className="quiz-content-text para">Launch the game</span>
          <span className="button-action" onClick={() => setIsStart(true)}>
            Start Quiz
          </span>
        </div>
      </div>
      {questionList.length !== 0 && isStart && (
        <Question
          questionArr={questionList}
          handleHome={() => setIsStart(false)}
        />
      )}
    </>
  );
};

export default Quiz;
