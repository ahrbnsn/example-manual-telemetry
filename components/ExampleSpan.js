import { useSpanInitializer } from "honeycomb/useSpanInitializer";

export const ExampleSpan = () => {
  const { startSpan, setSpanFields } = useSpanInitializer("example", {
    initialFields: { a_special_field: true },
  });

  return (
    <button
      onClick={() => {
        startSpan("newExample");
      }}
    >
      Start New Span
    </button>
  );
};

export default ExampleSpan;
