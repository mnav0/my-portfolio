import { linkResolver } from "../prismic";

export const richTextComponents = {
  hyperlink: ({ node, children }) => {
    const href = linkResolver(node.data);
    const target = node.data.target;
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
};
