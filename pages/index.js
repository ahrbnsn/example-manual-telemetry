import { useState } from "react";

import EventWatcher from "components/EventWatcher";
import Quiz from "components/Quiz";
import Banner from "components/Banner";

export default function Home({ children }) {
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);

  const toggleEvents = () => setShowEvents(!showEvents);
  return (
    <>
      <Banner />
      <main className={showEvents ? "showEvents" : "hideEvents"}>
        <section className="main-panel">
          <header className="logoHeader">
            <img
              src="logomark.svg"
              alt="honeycomb.io"
              srcSet="logomark.svg 200w,
          logo.svg"
              sizes="(max-width: 500px) 200px"
              className="logo"
            />
          </header>
          <Quiz />
        </section>
        <EventWatcher show={showEvents} events={events} setEvents={setEvents} />
      </main>

      <div className="inspector" onClick={toggleEvents}>
        {showEvents ? "Back to quiz" : "Inspect event stream"}
      </div>
    </>
  );
}
