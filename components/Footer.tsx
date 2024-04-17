import React from "react";
import { ExternalLink } from "./external-link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center">
      <p className={"px-2 text-center text-xs leading-normal text-zinc-500"}>
        Markdown editor with{" "}
        <ExternalLink href="https://www.npmjs.com/package/react-markdown">
          React-markdown
        </ExternalLink>{" "}
        and <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> |
        source code on{" "}
        <ExternalLink href="https://github.com/ruru-m07/md-editor">
          Github
        </ExternalLink>{" "}
        | Made by{" "}
        <ExternalLink href="https://github.com/ruru-m07">Ruru</ExternalLink> .
      </p>
    </footer>
  );
};

export default Footer;
