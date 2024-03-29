// Test.js

import React, { useState } from "react";
import Questions from "../Questions/Questions";
import styles from "./Tests.module.scss";
import { submitTest } from "../../services/TestService";

export default function Test({ data }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerSelection = (questionId, answerId, isCorrect) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: { answerId, isCorrect },
    }));
    console.log(selectedAnswers);
    if (isCorrect) {
      setRightAnswersCount((prevCount) => prevCount + 1);
    }
  };

  const handleSubmit = () => {
    const requestData = {
      right_answers: rightAnswersCount,
      test: data.id,
    };
    console.log(requestData);
    submitTest(requestData);
    setIsSubmitted(true);
  };

  return (
    <div>
      <h3 className={styles.testTitle}>
        {data.course_name} - {data.title}
      </h3>
      <p className={styles.testDescription}>{data.description}</p>
      {isSubmitted ? (
        <>Submitted</>
      ) : (
        <>
          <Questions id={data.id} onAnswerSelect={handleAnswerSelection} />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}
