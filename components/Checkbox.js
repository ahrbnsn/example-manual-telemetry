export function Checkbox({ id, updateValue, values, children }) {
  return (
    <div className="surveySelection">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={!!values[id]}
        onClick={() => updateValue(id)}
      />
      <label htmlFor={id}> {children} </label>
    </div>
  );
}

export default Checkbox;
