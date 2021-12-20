import { useTraceContext } from "honeycomb/useTraceContext";

export const SendEventButton = ({
  eventName = "button-clicked",
  name = "Send Event",
}) => {
  const { sendEvent } = useTraceContext();

  return <button onClick={() => sendEvent({ name: eventName })}>{name}</button>;
};
