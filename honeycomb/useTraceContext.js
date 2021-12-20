import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";

import { sendSpanEventToHoneycomb } from "./send";

export const TraceContext = createContext({
  traceId: uuid(),
  extraFields: {},
});

/* When you want to send events associated with the parent
 * span with trace context from anywere in the app
 *
 * Example:
 *
 * function SendEventButton() {
 * const { sendEvent } = useTraceContext()
 *
 * return (
 *   <Button onClick={() => { sendEvent({ name: "clcked-button"})}} >
 *     Send Event
 *   </Button>
 * )
 * }
 *
 */
export const useTraceContext = () => {
  const { extraFields, traceId, parentId } = useContext(TraceContext);

  const sendEvent = (payload) => {
    sendSpanEventToHoneycomb({
      traceId,
      parentId,
      extraFields,
      payload,
    });
  };

  return { sendEvent, traceId, parentId, extraFields };
};

export default useTraceContext;
