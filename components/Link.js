import useSpanContext from "honeycomb/useSpanContext";

export function Link(props) {
  const { sendEvent } = useSpanContext();

  const handleClick = (event) => {
    sendEvent({
      name: "clicked-link",
      link:
        event.target.getAttribute("title") || event.target.getAttribute("href"),
    });
  };

  return <a target="_blank" onClick={handleClick} {...props} />;
}

export default Link;
