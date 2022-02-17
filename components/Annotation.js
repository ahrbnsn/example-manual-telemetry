import Markdown from "./EnhancedMarkdown";

export function Annotation({ content = {} }) {
  if (!content.text) {
    return null;
  }

  console.log({ text: content.text });

  return (
    <aside className="eventAnnotation">
      <Markdown>{content.text}</Markdown>
    </aside>
  );
}

export default Annotation;
