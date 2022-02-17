import ReactMarkdown from "react-markdown";
import Link from "./Link";

export function EnhancedMarkdown({ children }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => <Link {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export default EnhancedMarkdown;
