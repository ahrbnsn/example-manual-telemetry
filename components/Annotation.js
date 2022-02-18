import Markdown from "./EnhancedMarkdown";
import Arrow from "./Arrow";

export function Annotation({ content = {} }) {
  return (
    <aside className="eventAnnotation">
      <Markdown>
        {content.text ||
          "This is a live event stream that’s emitted from your interactions with this quiz app."}
      </Markdown>
      <Arrow />
    </aside>
  );
}

export default Annotation;
