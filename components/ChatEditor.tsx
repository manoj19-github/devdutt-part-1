"use client";
import { useRef, FC, useEffect } from "react";
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import useIsMounted from "@/hooks/useIsMounted";
import { Button } from "./ui/button";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";
import { ImageIcon, Smile } from "lucide-react";
import Hint from "./ui/Hint";
type ChatEditorProps = {
  variant?: "create" | "update";
};
const ChatEditor: FC<ChatEditorProps> = ({
  variant = "create",
}): JSX.Element => {
  const ChatContainerRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();
  useEffect(() => {
    if (!ChatContainerRef.current || !isMounted) return;
    const container = ChatContainerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const options: QuillOptions = {
      placeholder: "Type your message here...",
      theme: "snow",
    };
    const quill = new Quill(editorContainer, options);
    return () => {
      if (container) container.innerHTML = "";
    };
  }, [isMounted]);
  if (!isMounted) return <></>;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm  transition-all bg-white">
        <div ref={ChatContainerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[10] ">
          <Hint label="Hide formatting">
            <Button
              onClick={() => {}}
              disabled={false}
              size="iconSm"
              variant={"ghost"}
            >
              <PiTextAa className="size-5" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button
              onClick={() => {}}
              disabled={false}
              size="iconSm"
              variant={"ghost"}
            >
              <Smile className="size-5" />
            </Button>
          </Hint>
          {variant === "create" ? (
            <Hint label="Image">
              <Button
                onClick={() => {}}
                disabled={false}
                size="iconSm"
                variant={"ghost"}
              >
                <ImageIcon className="size-5" />
              </Button>
            </Hint>
          ) : (
            <></>
          )}

          <Button
            disabled={false}
            onClick={() => {}}
            className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white "
          >
            <MdSend className="size-5" />
          </Button>
        </div>
      </div>
      <div className="p-2 text-[13px] text-muted-foreground flex justify-end">
        <strong className="pr-[6px] font-bold">Shift + Return</strong> to add a
        new line
      </div>
    </div>
  );
};

export default ChatEditor;
