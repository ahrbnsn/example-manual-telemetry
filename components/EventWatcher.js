import { useEffect } from "react";
import { CUSTOM_EVENT } from "honeycomb/send";

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
        </section>
      ))}
    </div>
  );
}

export default EventWatcher;
