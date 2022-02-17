import { useState } from "react";
import { questions } from "data/questions";
import { useCreateSpan } from "honeycomb/useCreateSpan";

import Question from "./Question";
import Survey from "./Survey";

export function Quiz() {
  const [score, setScore] = useState(0);
  const { endSpan, startSpan } = useCreateSpan({
    name: "quiz-section",
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [startedQuiz, setStartedQuiz] = useState(false);

  const startQuiz = () => {
    startSpan();
    setStartedQuiz(true);
  };
  const increaseScore = () => setScore((s) => s + 1);

  const quizOver = currentQuestion === questions.length;

  if (quizOver) {
    endSpan({ score });

    return (
      <>
        Your score: {score}/{questions.length}
        <Survey />
      </>
    );
  }

  if (startedQuiz) {
    return (
      <>
        <Question
          increaseScore={increaseScore}
          key={currentQuestion}
          question={questions[currentQuestion]}
          nextQuestion={() => setCurrentQuestion((c) => c + 1)}
        />
      </>
    );
  }

  return (
    <>
      <h1>How much do you know about observablity?</h1>
      <p>
        Take this 10-question quiz about observability to test your knowledge —
        and see an example of the type of data that powers observability in
        Honeycomb at the same time!
      </p>

      <button onClick={startQuiz}>Start the quiz</button>
    </>
  );
}

export default Quiz;
