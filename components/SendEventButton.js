import { useSpanContext } from "honeycomb/useSpanContext";

export const SendEventButton = ({
  eventName = "button-clicked",
  name = "Send Event",
}) => {
  const { sendEvent } = useSpanContext();

  return <button onClick={() => sendEvent({ name: eventName })}>{name}</button>;
};
