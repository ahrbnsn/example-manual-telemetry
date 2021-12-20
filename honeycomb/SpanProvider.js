import {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
  useReducer,
} from "react";
import { v4 as uuid } from "uuid";
import { useSpanInitializer } from "./useSpanInitializer";
import { useEventFields } from "./useEventFields";
import { TraceContext } from "./useTraceContext";

export const SpanFieldsDispatchContext = createContext({
  addFields: () => {},
  removeField: () => {},
  setFields: () => {},
});

export const SpanProvider = ({
  name,
  children,
  traceId: initialTraceId,
  initialFields = {},
}) => {
  const { spanId, traceId, extraFieldsFromParent, setSpanFields } =
    useSpanInitializer(name, { initialTraceId });

  const { fields, addFields, removeField, setFields } = useEventFields({
    initialFields,
    setSpanFields,
  });

  const traceContext = {
    parentId: spanId,
    traceId,
    extraFields: {
      ...extraFieldsFromParent,
      ...fields,
    },
  };

  const fieldDispatch = useMemo(
    () => ({
      addFields,
      removeField,
      setFields,
    }),
    [addFields, removeField, setFields]
  );

  return (
    <TraceContext.Provider value={traceContext}>
      <SpanFieldsDispatchContext.Provider value={fieldDispatch}>
        {children}
      </SpanFieldsDispatchContext.Provider>
    </TraceContext.Provider>
  );
};

export default SpanProvider;
