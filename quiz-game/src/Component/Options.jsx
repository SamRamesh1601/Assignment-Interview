import React from "react";
import useConvertHtmlText from "../Hooks/useConvertHtmlText";

function Option({ option, handleAnswerClick }) {
  const [currQuestionText, setCurrQuestionText] = useConvertHtmlText(
    option,
    true
  );
  return (
    <button
      className="button-outline-action"
      onClick={() => handleAnswerClick(option)}
    >
      {currQuestionText}
    </button>
  );
}

export default Option;
