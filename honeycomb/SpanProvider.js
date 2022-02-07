import { useContext, useRef, useState, useMemo, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { SpanContext } from "./useSpanContext";
import { SpanFieldsDispatch } from "./useSpanFieldsDispatch";
import { useCreateSpan } from "./useCreateSpan";

/* SpanProvider creates a parent span; all children spans & events triggered
 * from child components will use its id as their parent id, and include
 * all extra fields set on the SpanProvider in their payloads
 *
 * Arguments:
 * `name`:          the name for the span. Often the name of the component
 *                  or section
 * `initialFields`: any fields that should be included in every span & event
 *                  sent by child components */

export const SpanProvider = ({ name, children, initialFields = {} }) => {
  const { fields, spanId, traceId, extraContextFields, dispatch } =
    useCreateSpan({ name, initialFields, startSpanOnMount: true });

  const spanContext = {
    parentId: spanId,
    traceId: traceId,
    contextFields: {
      ...extraContextFields,
      ...fields,
    },
  };

  return (
    <SpanContext.Provider value={spanContext}>
      <SpanFieldsDispatch.Provider value={dispatch}>
        {children}
      </SpanFieldsDispatch.Provider>
    </SpanContext.Provider>
  );
};

export default SpanProvider;
