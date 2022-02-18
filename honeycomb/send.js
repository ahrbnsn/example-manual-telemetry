export const CUSTOM_EVENT = "HoneyEvent";

const eventEmitter = (payload) => {
  const event = new CustomEvent(CUSTOM_EVENT, { detail: payload });
  window.dispatchEvent(event);
};

export const send = (payload) => {
  const url = "api/sendEvent";
  const body = JSON.stringify(payload);

  /* The `EventWatcher` component listens for
   * custom "HoneyEvent" events; `eventEmitter` is used
   * to emit those custom events anytime we send data
   * to honeycomb. It is useful for this demo app but
   * not something you're likely to need in your app */
  eventEmitter(payload);
  console.log("Event sent to honeycomb:", payload);

  if (navigator?.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }
};

/* spans are special events that "span" a period of time.
 * They must belong to a trace (`trace.trace_id`), and may
 * have a parent span (indicated by `trace.parent_id`) if
 * they were triggered from within an existing span
 *
 * Read more:
 * https://docs.honeycomb.io/getting-data-in/tracing/send-trace-data/#opentelemetry */
export const sendSpanToHoneycomb = ({
  timestamp,
  startTime,
  endTime,
  spanId,
  parentId,
  traceId,
  contextFields,
  spanFields,
  name,
}) => {
  const end = endTime || performance.now();
  const durationMs = end - startTime;

  send({
    timestamp: Date.now(),
    duration_ms: durationMs,
    "trace.trace_id": traceId,
    "trace.span_id": spanId,
    "trace.parent_id": parentId,
    name,
    ...contextFields,
    ...spanFields,
  });
};

/* `span events` are individual events that take
 * place within an existing span
 *
 * We include the following fields to create a span
 * event instead of a regular event:
 * - `meta.annotation_type` (set to "span_event")
 * - `timestamp`
 * - `trace.parent_id`
 * - `trace.span_id`
 * - `name`
 *
 * Read more:
 * https://docs.honeycomb.io/getting-data-in/tracing/send-trace-data/#span-events */
export const sendSpanEventToHoneycomb = ({
  traceId,
  parentId,
  payload,
  contextFields,
  name,
}) => {
  send({
    timestamp: Date.now(),
    "trace.trace_id": traceId,
    "trace.parent_id": parentId,
    "meta.annotation_type": "span_event",
    name,
    ...contextFields,
    ...payload,
  });
};

export default send;
