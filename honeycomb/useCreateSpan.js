import { useState, useCallback, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { sendSpanEventToHoneycomb, sendSpanToHoneycomb } from "./send";
import useSpanContext from "./useSpanContext";
import useFieldsReducer from "./useFieldsReducer";

export const useCreateSpan = ({
  name: initialName,
  initialFields = {},
  startSpanOnMount = false,
} = {}) => {
  const { contextFields, traceId, parentId } = useSpanContext();

  const [fields, dispatch] = useFieldsReducer(initialFields);
  const [extraContextFields, setExtraContextFields] = useState(contextFields);
  const [spanUuid, setUuid] = useState(uuid());

  /* Any span information we need to pass
   * on to children spans and events (uuid, fields)
   * we store in the component's state.
   *
   * We also store all necessary span information
   * in mutable refs so they can always be accessed &
   * modified without triggering rerenders. This lets
   * us use them in `useEffect` hooks safely
   */
  const isActive = useRef(startSpanOnMount);
  const startTime = useRef();
  const timestamp = useRef();
  const extraContextFieldsFromParent = useRef();
  const spanFields = useRef({});
  const traceIdRef = useRef();
  const parentIdRef = useRef();
  const name = useRef();
  const spanId = useRef();

  const sendSpan = (payload) => {
    sendSpanToHoneycomb({
      name: name.current,
      spanId: spanId.current,
      startTime: startTime.current,
      endTime: performance.now(),
      parentId: parentIdRef.current,
      traceId: traceIdRef.current,
      contextFields: extraContextFieldsFromParent.current,
      spanFields: {
        ...spanFields.current,
        ...payload,
      },
    });
  };

  useEffect(() => {
    if (isActive.current) {
      timestamp.current = Date.now();
      startTime.current = performance.now();
      name.current = initialName;
    }

    // make sure to send the span if the component
    // unmounts while still active
    return () => {
      if (isActive.current) {
        sendSpan();
      }
      isActive.current = false;
    };
  }, []);

  useEffect(() => {
    if (!traceIdRef.current) {
      traceIdRef.current = traceId;
    }
  }, [traceId]);

  useEffect(() => {
    if (!spanId.current) {
      spanId.current = spanUuid;
    }
  }, [spanUuid]);

  useEffect(() => {
    if (!parentIdRef.current) {
      parentIdRef.current = parentId;
    }
  }, [parentId]);

  useEffect(() => {
    spanFields.current = fields;
  }, [fields]);

  /* We check the parent id before updating the context
   * fields in this span. This is a safety check in case the
   * parent span higher in the component tree is a different
   * span than the one this span was initialized under.
   *
   * The parent when the span is created is the parent
   * for the span's entire lifecycle */
  useEffect(() => {
    if (parentId === parentIdRef.current) {
      setExtraContextFields(contextFields);
      extraContextFieldsFromParent.current = contextFields;
    }
  }, [contextFields, parentId]);

  const startSpan = (spanName) => {
    isActive.current = true;
    timestamp.current = Date.now();
    startTime.current = performance.now();
    name.current = spanName || initialName;
  };

  const endSpan = (payload) => {
    if (isActive.current) {
      sendSpan(payload);
      isActive.current = false;
    }
  };

  const sendEvent = (payload) => {
    sendSpanEventToHoneycomb({
      traceId: traceIdRef.current,
      parentId: spanId.current,
      contextFields: {
        ...extraContextFieldsFromParent.current,
        ...fields,
      },
      payload,
    });
  };

  return {
    fields,
    dispatch,
    startSpan,
    endSpan,
    sendEvent,
    spanId: spanUuid,
    traceId,
    extraContextFields,
  };
};
