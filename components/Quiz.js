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
      <h1 className="quizHeader">Trivia: What do you know about observability?</h1>
      <p>
       Observability's fast-growing popularity in recent years has made it a watchword among developers working on complex, distributed systems. But what is it -- and is it only useful for DevOps?
      </p>
      <p>
      This 10-question quiz tests your knowledge -- and shows you core concepts from a frontend perspective at the same time. 
      </p>
      <button className="actionButton" onClick={startQuiz}>
        Show me the first question
      </button>
    </>
  );
}

export default Quiz;
