import "../styles/globals.css";
import Head from "next/head";
import send from "honeycomb/send";
import { v4 as uuid } from "uuid";

import { SpanContext } from "honeycomb/useSpanContext";
import { SpanProvider } from "honeycomb/SpanProvider";

/* Send core web vitals events to Honeycomb
 * by exporting a `reportWebVitals` function:
 *
 * https://nextjs.org/docs/advanced-features/measuring-performance */
export function reportWebVitals(metric) {
  send(metric);
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Test your Telemetry Know-How</title>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Mono:400,500|Poppins:700"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <SpanContext.Provider value={{ traceId: pageProps.traceId || uuid() }}>
        <SpanProvider name={pageProps.pageName || "pageView"}>
          <Component {...pageProps} />;
        </SpanProvider>
      </SpanContext.Provider>
    </>
  );
}

export default MyApp;
