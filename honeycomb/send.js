export const send = (payload) => {
  const url = "api/sendEvent";
  const body = JSON.stringify(payload);

  if (navigator?.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }
};

export const sendSpanEventToHoneycomb = ({
  traceId,
  parentId,
  payload,
  extraFields,
  name,
}) => {
  send({
    timestamp: Date.now(),
    "trace.trace_id": traceId,
    "trace.span_id": parentId,
    "meta.annotation_type": "span_event",
    name,
    ...extraFields,
    ...payload,
  });
};

export const sendSpanToHoneycomb = ({
  timestamp,
  startTime,
  endTime,
  spanId,
  parentId,
  traceId,
  extraFields,
  payload,
  name,
}) => {
  const end = endTime || performance.now();

  send({
    timestamp: Date.now(),
    "trace.trace_id": traceId,
    "trace.span_id": spanId,
    "trace.parent_id": parentId,
    duration_ms: endTime - startTime,
    name,
    ...extraFields,
    ...payload,
  });
};

export default send;
