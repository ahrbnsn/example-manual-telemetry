import { useEffect } from "react";
import { CUSTOM_EVENT } from "honeycomb/send";
import annotations from "data/annotations";
import Annotation from "./Annotation";

export function EventWatcher({ events, setEvents }) {
  useEffect(() => {
    const listener = ({ detail }) => {
      setEvents((prevEvents) => [detail, ...prevEvents]);
    };

    window.addEventListener(CUSTOM_EVENT, listener);

    return () => window.removeEventListener(CUSTOM_EVENT, listener);
  }, [setEvents]);

  return (
    <div className="eventWatcher">
      <h1> EVENTS!!!!</h1>
      {events.map((event, i) => (
        <section
          className="event"
          key={`${event.name}-${event.timestamp || event.startTime}`}
        >
          <pre className="eventPayload">{JSON.stringify(event, null, 2)}</pre>

          <Annotation content={annotations[event.name]} />
        </section>
      ))}
    </div>
  );
}

export default EventWatcher;
