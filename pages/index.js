import { useState } from "react";

import EventWatcher from "components/EventWatcher";
import Quiz from "components/Quiz";
import Banner from "components/Banner";

export default function Home({ children }) {
  const [events, setEvents] = useState([]);
  const [showEventWatcher, setShowEvents] = useState(true);

  return (
    <>
      <Banner />
      <main className={showEventWatcher ? "two-column" : "single-column"}>
        <section className="main-panel">
          <Quiz />
        </section>
        {showEventWatcher && (
          <EventWatcher events={events} setEvents={setEvents} />
        )}
      </main>
    </>
  );
}
