"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { NpmCommands } from "@/types/unist";
import { Style } from "@/components/md/styles";
import { Event } from "@/lib/events";
import { CopyButton, CopyNpmCommandButton } from "@/components/md/copy-button";
import { CodeBlockWrapper } from "@/components/md/code-block-wrapper";
import Image from "next/image";
import { StyleWrapper } from "@/components/md/style-wrapper";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { remark } from "remark";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const customStyle = {
  backgroundColor: "#18181b",
};

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "group font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "group font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "group font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "group font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "group mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "group mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    __npmCommand__,
    __yarnCommand__,
    __pnpmCommand__,
    __bunCommand__,
    __withMeta__,
    __src__,
    __event__,
    __style__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __style__?: Style["name"];
    __rawString__?: string;
    __withMeta__?: boolean;
    __src__?: string;
    __event__?: Event["name"];
  } & NpmCommands) => {
    return (
      <StyleWrapper styleName={__style__}>
        <pre
          className={cn(
            "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 p- dark:bg-zinc-900",
            className,
          )}
          {...props}
        />

        {__rawString__ && !__npmCommand__ && (
          <CopyButton
            value={__rawString__}
            src={__src__}
            event={__event__}
            className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
          />
        )}

        {__npmCommand__ &&
          __yarnCommand__ &&
          __pnpmCommand__ &&
          __bunCommand__ && (
            <CopyNpmCommandButton
              commands={{
                __npmCommand__,
                __yarnCommand__,
                __pnpmCommand__,
                __bunCommand__,
              }}
              className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
            />
          )}
      </StyleWrapper>
    );
  },
  code(props: any) {
    const { children, className, node, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");

    const language = match ? match[1] : null;
    const modifier = match ? match[2] : null;
    const value = String(children).replace(/\n$/, "");

    return match ? (
      <div className="relative">
        <code
          className={cn(
            "relative rounded bg-muted font-mono text-sm",
            className,
          )}
        >
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            customStyle={customStyle}
            language={language}
            style={coldarkDark}
            showLineNumbers={modifier === "showLineNumbers"}
          >
            {value}
          </SyntaxHighlighter>
        </code>
        <CopyButton className="absolute right-0 top-0 m-2" value={value} />
      </div>
    ) : (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className,
        )}
        {...props}
      />
    );
  },
  Image,
  CodeBlockWrapper: ({ ...props }) => (
    <CodeBlockWrapper className="rounded-md border" {...props} />
  ),
};

const MarkdownReader = ({ markdown }: { markdown: any }) => {
  const [mdSourse, setMdSourse] = useState("");

  const Mdgenerating = async () => {
    const file = await remark()
      .use(remarkGfm)
      .use(remarkGemoji)
      .process(markdown);

    return file.toString();
  };

  useEffect(() => {
    Mdgenerating().then((res) => {
      setMdSourse(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown]);

  return (
    <div className="markdown-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkGemoji, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          ...components,
        }}
      >
        {mdSourse}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownReader;
