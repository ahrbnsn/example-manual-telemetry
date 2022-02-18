import { useEffect } from "react";
import { CUSTOM_EVENT } from "honeycomb/send";
import annotations from "data/annotations";
import Annotation from "./Annotation";
import Arrow from "./Arrow";

export function EventWatcher({ events, setEvents, show }) {
  useEffect(() => {
    const listener = ({ detail }) => {
      setEvents((prevEvents) => [detail, ...prevEvents]);
    };

    window.addEventListener(CUSTOM_EVENT, listener);

    return () => window.removeEventListener(CUSTOM_EVENT, listener);
  }, [setEvents]);

  return (
    <div className="eventWatcher">
      <div>
        <header>
          <Arrow />
          <section>
            A sneak peak at the telemetry events generated as you take the quiz
            <div className="subhead">
              (You can also watch them in the console logs)
            </div>
          </section>
        </header>
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
    </div>
  );
}

export default EventWatcher;
