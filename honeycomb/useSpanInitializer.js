import { useRef, useContext, useCallback, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useTraceContext } from "./useTraceContext";
import { sendSpanEventToHoneycomb, sendSpanToHoneycomb } from "./send";

export const useSpanInitializer = (
  initialName,
  { initialTraceId, initialFields = {} } = {}
) => {
  const {
    extraFields,
    traceId: traceIdFromContext,
    parentId: parentIdFromContext,
  } = useTraceContext();

  const [traceId, setTraceId] = useState();
  const [parentId, setParentId] = useState();
  const [spanId, setSpanId] = useState(uuid());
  const [name, setName] = useState(initialName);

  /*
   * Any span information we need to pass
   * on to children spans and events (uuid, extra fields)
   * we store in the component's state.
   *
   * We also store all necessary span information
   * in mutable refs so they can always be accessed &
   * modified without triggering rerenders. This lets
   * us use them in `useEffect` hooks safely without any
   * dependencies.
   *
   * Changing the name or uuid of a span
   * ends the previous span and creates a new
   * one.
   */

  const isActive = useRef();
  const startTime = useRef({});
  const timestamp = useRef();
  const extraContextFieldsFromParent = useRef();
  const fields = useRef(initialFields);
  const traceIdRef = useRef();
  const parentIdRef = useRef();

  const sendToHoneycomb = useCallback(
    (payload = {}) => {
      sendSpanToHoneycomb({
        name,
        spanId,
        startTime: startTime.current,
        endTime: performance.now(),
        timestamp: timestamp.current,
        parentId: parentIdRef.current,
        traceId: traceIdRef.current,
        extraFields: extraContextFieldsFromParent.current,
        payload: {
          ...fields.current,
          ...payload,
        },
      });
    },
    [name, spanId]
  );

  useEffect(() => {
    isActive.current = true;
    timestamp.current = Date.now();
    startTime.current = performance.now();
    extraContextFieldsFromParent.current = {};

    // make sure to send the span if the component
    // unmounts while still active, or if a new span
    // is created by passing in a new name or calling
    // "start span"
    return () => {
      if (isActive.current) {
        sendToHoneycomb({
          message: "component unmounted or the uuid or name changed",
        });
      }
      isActive.current = false;
    };
  }, [sendToHoneycomb]);

  // only update the traceId if one doesn't already exist
  useEffect(() => {
    if (!traceIdRef.current) {
      const id = initialTraceId || traceIdFromContext;
      traceIdRef.current = id;
      setTraceId(id);
    }
  }, [initialTraceId, traceIdFromContext]);

  useEffect(() => {
    if (!parentIdRef.current) {
      parentIdRef.current = parentIdFromContext;
      setParentId(parentIdFromContext);
    }
  }, [parentIdFromContext]);

  useEffect(() => {
    if (parentId === parentIdRef.current) {
      extraContextFieldsFromParent.current = extraFields;
    }
  }, [extraFields, parentId]);

  const sendEvent = (payload) => {
    sendSpanEventToHoneycomb({
      traceId: span.current.traceId,
      parentId: spanId,
      extraFields: {
        ...extraContetFieldsFromParent.current,
        ...fields.current,
      },
      payload,
    });
  };

  const setSpanFields = (updatedFields) => {
    fields.current = updatedFields;
  };

  const addSpanFields = (newFields) => {
    fields.current = {
      ...fields.current,
      ...newFields,
    };
  };

  const removeSpanField = (fieldKey) => {
    const { [fieldKey]: value, ...remainingFields } = span.current;
    span.current = remainingFields;
  };

  const endSpan = () => {
    if (isActive.current) {
      sendToHoneycomb();
      isActive.current = false;
    }
  };

  const startSpan = (name) => {
    const newId = uuid();

    setSpanId(newId);
    setName(name);

    return newId;
  };

  return {
    addSpanFields,
    setSpanFields,
    removeSpanField,
    startSpan,
    endSpan,
    sendEvent,
    spanId,
    extraFieldsFromParent: extraFields,
    traceId,
  };
};

export default useSpanInitializer;
