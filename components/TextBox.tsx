import React, { useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  Link2Icon,
  ListBulletIcon,
  QuoteIcon,
} from "@radix-ui/react-icons";
import {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { Badge } from "./ui/badge";

const TextBox = ({
  text,
  setText,
}: {
  text: string | null;
  setText: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const insertH1AtCursor = (modifiers: string) => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;

      const newText =
        (text?.substring(0, startPos) || "") +
        `${text && "\n"}${modifiers}${" "}` +
        (text?.substring(endPos, text.length) || "");

      setText(newText);

      const newPosition = startPos + 2;

      textarea.selectionStart = newPosition;
      textarea.selectionEnd = newPosition + 2;

      textarea.focus();
    }
  };

  return (
    <div className="h-full w-2/4 rounded-l-md border-r ">
      <div className="h-10  w-full rounded-none rounded-tl-xl bg-primary-foreground/90 border-b flex items-center justify-between px-2">
        <div className="ml-2 flex items-center space-x-2">
          <svg
            fill="#ffffff"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Markdown icon</title>
            <path d="M22.269 19.385H1.731a1.73 1.73 0 0 1-1.73-1.73V6.345a1.73 1.73 0 0 1 1.73-1.73h20.538a1.73 1.73 0 0 1 1.73 1.73v11.308a1.73 1.73 0 0 1-1.73 1.731zm-16.5-3.462v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.461v7.847zM21.231 12h-2.308V8.077h-2.307V12h-2.308l3.461 4.039z" />
          </svg>
        </div>
        <div className="space-x-1 flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"} variant={"outline"}>
                <HeadingIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex items-center">
                <Badge variant="outline" className="px-1 mr-2">
                  <Heading size={16} />
                </Badge>
                Heading
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => insertH1AtCursor("#")}>
                  <Badge variant="outline" className="px-1 mr-2">
                    <Heading1 size={20} />
                  </Badge>
                  Heading 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertH1AtCursor("##")}>
                  <Badge variant="outline" className="px-1 mr-2">
                    <Heading2 size={20} />
                  </Badge>
                  Heading 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertH1AtCursor("###")}>
                  <Badge variant="outline" className="px-1 mr-2">
                    <Heading3 size={20} />
                  </Badge>
                  Heading 3
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertH1AtCursor("####")}>
                  <Badge variant="outline" className="px-1 mr-2">
                    <Heading4 size={20} />
                  </Badge>
                  Heading 4
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertH1AtCursor("#####")}>
                  <Badge variant="outline" className="px-1 mr-2">
                    <Heading5 size={20} />
                  </Badge>
                  Heading 5
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertH1AtCursor("######")}>
                  <Badge variant="outline" className="px-1 mr-2">
                    <Heading6 size={20} />
                  </Badge>
                  Heading 6
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => insertH1AtCursor("****")}
          >
            <FontBoldIcon />
          </Button>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => insertH1AtCursor("__")}
          >
            <FontItalicIcon />
          </Button>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => insertH1AtCursor("> ")}
          >
            <QuoteIcon />
          </Button>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => insertH1AtCursor("` `")}
          >
            <CodeIcon />
          </Button>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => insertH1AtCursor("[](url)")}
          >
            <Link2Icon />
          </Button>

          <div className="w-px h-7 bg-border" />

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => insertH1AtCursor("1. ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-list-ordered"
            >
              <line x1="10" x2="21" y1="6" y2="6" />
              <line x1="10" x2="21" y1="12" y2="12" />
              <line x1="10" x2="21" y1="18" y2="18" />
              <path d="M4 6h1v4" />
              <path d="M4 10h2" />
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
            </svg>
          </Button>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => insertH1AtCursor("- ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-list-collapse"
            >
              <path d="m3 10 2.5-2.5L3 5" />
              <path d="m3 19 2.5-2.5L3 14" />
              <path d="M10 6h11" />
              <path d="M10 12h11" />
              <path d="M10 18h11" />
            </svg>
          </Button>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => insertH1AtCursor("- [ ] ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-list-todo"
            >
              <rect x="3" y="5" width="6" height="6" rx="1" />
              <path d="m3 17 2 2 4-4" />
              <path d="M13 6h8" />
              <path d="M13 12h8" />
              <path d="M13 18h8" />
            </svg>
          </Button>
        </div>
      </div>
      <Textarea
        ref={textAreaRef}
        id="text-area"
        className="h-[93%] border-none resize-none rounded-none rounded-bl-xl"
        onChange={(e) => setText(e.target.value)}
        value={text ? text : ""}
        placeholder="start writing here..."
        autoFocus
      />
    </div>
  );
};

export default TextBox;
