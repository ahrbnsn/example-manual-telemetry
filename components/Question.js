import { useState } from "react";
import ReactMarkdown from "react-markdown";
import cx from "classnames";
import { useCreateSpan } from "honeycomb/useCreateSpan";

export function Question({ nextQuestion, question, increaseScore }) {
  const [answered, setAnswered] = useState();

  /* The span intitializer pulls in all the event fields from any parent
   * span, and adds anything else you want to pass in under "initialFields"
   *
   * `startSpanOnMount` sets the initial timestamp for the span when
   * the component is rendered
   *
   * When the unit of work is complete, we call "endSpan" and send the
   * event to honeycomb */
  const { endSpan } = useCreateSpan({
    name: "quiz-question",
    initialFields: {
      question: question.question,
      options: question.answers.map((o) => o.name),
    },
    startSpanOnMount: true,
  });

  const correctGuess = answered === question.correctAnswer;

  const selectAnswer = (choice) => {
    /*
     * we're using questions as a slightly contrived way to
     * generate spans — spans are an event that "span" a period of time,
     * and need a start time & a duration.
     *
     *
     * When a question has been answered, we end the span and report
     * to honeycomb.
     *
     * learn more:
     * https://www.honeycomb.io/blog/observability-driven-development/
     */
    endSpan({ picked: choice.name, pickedRight: !!choice.correct });
    setAnswered(choice.name);

    if (choice.correct) {
      increaseScore();
    }
  };

  return (
    <>
      <h1>{question.question}</h1>
      <section className={answered ? "choices-answered" : "choices"}>
        {question.answers.map((choice) => (
          <button
            className={cx({
              answerSelect: true,
              selected: choice.name === answered,
              correct: choice.correct,
            })}
            key={choice.name}
            onClick={() => selectAnswer(choice)}
            disabled={answered}
          >
            {choice.name}
          </button>
        ))}
      </section>

      {answered && (
        <>
          {correctGuess ? (
            <p>You got it!</p>
          ) : (
            <>
              <p>
                <b>You picked:</b> {answered}
              </p>
              <b>Correct Answer:</b> {question.correctAnswer}
            </>
          )}
          <div className="explanation">
            <ReactMarkdown>{question.explanation}</ReactMarkdown>
          </div>
          <button onClick={nextQuestion}>Next</button>
        </>
      )}
    </>
  );
}

export default Question;
