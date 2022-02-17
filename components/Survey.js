import { useState } from "react";
import { useCreateSpan } from "honeycomb/useCreateSpan";
import Checkbox from "./Checkbox";

export function Survey() {
  const { endSpan, startSpan, sendEvent } = useCreateSpan({
    name: "survey",
    initialFields: {
      completedSurvey: false,
    },
    startSpanOnMount: true,
  });

  const [selected, setSelected] = useState({});
  const [additionalFeedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    endSpan({
      completedSurvey: true,
      additionalFeedback,
      ...selected,
    });
    setSubmitted(true);
  };

  const updateSelected = (key) => {
    sendEvent({
      action: `selected-${key}`,
      name: "survey-selection",
      value: !selected[key],
    });

    setSelected((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  if (submitted) {
    return <h1> Thank you!</h1>;
  }

  return (
    <>
      <h1>
        This is an experiment we&rsquo;re running to help explain what
        observability is with Honeycomb. What would you like to see us build
        next? (choose all that apply)
      </h1>

      <form onSubmit={handleSubmit}>
        <Checkbox
          id="dataInHoneycomb"
          values={selected}
          updateValue={updateSelected}
        >
          Put this data in Honeycomb so I can play with it
        </Checkbox>

        <Checkbox
          id="interactiveDemo"
          values={selected}
          updateValue={updateSelected}
        >
          Let me play with an interactive demo
        </Checkbox>

        <Checkbox
          id="shortVideo"
          values={selected}
          updateValue={updateSelected}
        >
          Make a short video that shows how to use Honeycomb’s UI
        </Checkbox>

        <Checkbox
          id="documentation"
          values={selected}
          updateValue={updateSelected}
        >
          Let me read a webpage about how Honeycomb is different
        </Checkbox>

        <Checkbox id="deepDive" values={selected} updateValue={updateSelected}>
          Take me to a deeper dive into observability concepts
        </Checkbox>

        <label className="additionalFeedback" htmlFor="additionalFeedback">
          Anything else you&rsquo;d like to share?
        </label>
        <textarea
          name="additionalFeedback"
          onChange={(event) => setFeedback(event.target.value)}
          value={additionalFeedback}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Survey;
