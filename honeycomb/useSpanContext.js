import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";

import { sendSpanEventToHoneycomb } from "./send";

export const SpanContext = createContext({
  contextFields: {},
});

/* Returns a function to send span events
 * from anywere in the app
 *
 * Example:
 * ```
 * function SendEventButton() {
 *   const { sendEvent } = useSpanContext()
 *
 *   return (
 *     <Button onClick={() => { sendEvent({ name: "clcked-button"})}} >
 *       Send Event
 *     </Button>
 *   )
 * }
 * ```
 */
export const useSpanContext = () => {
  const { contextFields, traceId, parentId } = useContext(SpanContext);

  const sendEvent = (payload) => {
    sendSpanEventToHoneycomb({
      traceId,
      parentId,
      contextFields,
      payload,
    });
  };

  return { sendEvent, traceId, parentId, contextFields };
};

export default useSpanContext;
