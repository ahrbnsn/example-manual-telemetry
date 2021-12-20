import { useReducer, useEffect, useCallback } from "react";

const fieldsReducer = (state, action) => {
  switch (action.type) {
    case "addFields":
      return {
        ...state,
        ...action.payload,
      };
    case "removeField":
      const { [action.payload]: value, ...remainingFields } = state;
      return remainingFields;
    case "setFields":
      return action.payload;
  }
};

export const useEventFields = ({ initialFields, setSpanFields }) => {
  const [fields, dispatch] = useReducer(fieldsReducer, initialFields);

  /*
   *
   * We call `setSpanFields` to add the fields
   * to those stored by the ref object created in
   * `useSpanInitializer` — this ensures both children
   * spans & events and the parent span will send the
   * same fields
   *
   */
  useEffect(() => {
    setSpanFields(fields);
  }, [fields, setSpanFields]);

  const addFields = useCallback(
    (payload) => {
      dispatch({
        type: "addFields",
        payload,
      });
    },
    [dispatch]
  );

  const removeField = useCallback(
    (payload) => {
      dispatch({
        type: "removeField",
        payload,
      });
    },
    [dispatch]
  );

  const setFields = useCallback(
    (payload) => {
      dispatch({
        type: "setFields",
        payload,
      });
    },
    [dispatch]
  );

  return { fields, addFields, removeField, setFields };
};
