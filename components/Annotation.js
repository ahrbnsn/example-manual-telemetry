import Markdown from "./EnhancedMarkdown";
import Arrow from "./Arrow";

export function Annotation({ content = {} }) {
  if (!content.text) {
    return null;
  }

  console.log({ text: content.text });

  return (
    <aside className="eventAnnotation">
      <Markdown>{content.text}</Markdown>
      <Arrow />
    </aside>
  );
}

export default Annotation;
