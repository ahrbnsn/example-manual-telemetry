import { useState } from "react";
import { questions } from "data/questions";
import { useCreateSpan } from "honeycomb/useCreateSpan";

import Question from "./Question";

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
        <p> next steps:</p>
        <ul>
          <li> try this</li>
          <li> and try this</li>
          <li> and maybe this</li>
        </ul>
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
      <h1> Welcome to the quiz!</h1>
      <p> Here is some introductory text.</p>
      <p>
        At Waterloo we were fortunate in catching a train for Leatherhead, where
        we hired a trap at the station inn and drove for four or five miles
        through the lovely Surrey lanes. It was a perfect day, with a bright sun
        and a few fleecy clouds in the heavens. The trees and wayside hedges
        were just throwing out their first green shoots, and the air was full of
        the pleasant smell of the moist earth. To me at least there was a
        strange contrast between the sweet promise of the spring and this
        sinister quest upon which we were engaged. My companion sat in the front
        of the trap, his arms folded, his hat pulled down over his eyes, and his
        chin sunk upon his breast, buried in the deepest thought. Suddenly,
        however, he started, tapped me on the shoulder, and pointed over the
        meadows.
      </p>

      <p>"Look there!" said he.</p>

      <p>
        A heavily timbered park stretched up in a gentle slope, thickening into
        a grove at the highest point. From amid the branches there jutted out
        the grey gables and high roof-tree of a very old mansion.
      </p>

      <p>"Stoke Moran?" said he.</p>

      <p>
        "Yes, sir, that be the house of Dr. Grimesby Roylott," remarked the
        driver.
      </p>

      <button onClick={startQuiz}>Get started</button>
    </>
  );
}

export default Quiz;
