import { useState } from "react";
import { SpanProvider } from "honeycomb/SpanProvider";
import { v4 as uuid } from "uuid";

import { SendEventButton } from "components/SendEventButton";
import { ExampleSpan } from "components/ExampleSpan";

export default function Home({ children }) {
  const [show, setShow] = useState(true);

  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <>
      {show && (
        <SpanProvider
          name="homePage"
          traceId={uuid()}
          initialFields={{ hi: "hello!" }}
        >
          <SendEventButton />
          <SpanProvider name="childSpan" initialFields={{ nested: true }}>
            <SendEventButton>Child event</SendEventButton>
            <ExampleSpan />
          </SpanProvider>
        </SpanProvider>
      )}
      <button onClick={toggle}>show/hide</button>
    </>
  );
}
