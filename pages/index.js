import { useState } from "react";

import EventWatcher from "components/EventWatcher";
import Quiz from "components/Quiz";

export default function Home({ children }) {
  const [events, setEvents] = useState([]);
  const [showEventWatcher, setShowEvents] = useState(true);

  return (
    <main className={showEventWatcher ? "two-column" : "single-column"}>
      <section className="main-panel">
        <Quiz />
      </section>
      {showEventWatcher && (
        <EventWatcher events={events} setEvents={setEvents} />
      )}
    </main>
  );
}
