import { useEffect, useRef, useState } from "react";

export default function useConvertHtmlText(value, dependenices = false) {
  const firstRenderRef = useRef(true);
  const [currQuestionText, setCurrQuestionText] = useState("");
  useEffect(() => {
    const decodeHtmlEntity = (html) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    };

    let question = "";
    if (!dependenices && value && value.question) {
      question = decodeHtmlEntity(value.question);
    } else if (dependenices) question = decodeHtmlEntity(value);

    setCurrQuestionText(question);
  }, [value]);

  return [currQuestionText, setCurrQuestionText];
}
