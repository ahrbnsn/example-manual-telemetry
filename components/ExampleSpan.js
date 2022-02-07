import { useCreateSpan } from "honeycomb/useCreateSpan";

export const ExampleSpan = () => {
  const { startSpan } = useCreateSpan({
    name: "example",
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
