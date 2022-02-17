import { useReducer } from "react";

const fieldsReducer = (state, action) => {
  switch (action.type) {
    case "setField":
      return {
        ...state,
        [action.fieldName]: action.value,
      };
    case "removeField": {
      const { [action.payload]: value, ...remainingFields } = state;
      return remainingFields;
    }
    case "addFields":
      return {
        ...state,
        ...action.payload,
      };
    case "clearAllFields":
      return {};
  }
};

export const useFieldsReducer = (initialFields = {}) => {
  const [fields, dispatch] = useReducer(fieldsReducer, initialFields);

  return [fields, dispatch];
};

export default useFieldsReducer;
