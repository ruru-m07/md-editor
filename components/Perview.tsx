import React from "react";
import MarkdownReader from "./md-components";

const Perview = ({ text }: { text: string | null }) => {
  return (
    <div className="max-h-full w-2/4 rounded-r-md p-4 overflow-y-auto">
      {text ? (
        <MarkdownReader markdown={text} />
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="text-center ">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Nothing to preview
            </h4>
            <p className="text-sm text-muted-foreground">
              start writing on the left side to see the preview
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perview;
