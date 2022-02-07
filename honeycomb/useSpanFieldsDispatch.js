import { useContext, createContext } from "react";

export const SpanFieldsDispatch = createContext(() => {});

export const useSpanFieldsDispatch = () => {
  const dispatch = useContext(SpanFieldsDispatch);

  const setField = (key, value) => {
    dispatch({
      type: "setField",
      key,
      value,
    });
  };

  const addFields = (payload = {}) => {
    dispatch({
      type: "addFields",
      payload,
    });
  };

  const removeField = (key) => {
    dispatch({
      type: "removeField",
      payload: key,
    });
  };

  const clearAllFields = () => {
    dispatch({
      type: "clearAllFields",
    });
  };

  return { dispatch, setField, removeField, addFiels, clearAllFields };
};

export default useSpanFieldsDispatch;
