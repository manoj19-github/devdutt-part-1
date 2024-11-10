"use client";
import {
  useRef,
  FC,
  useEffect,
  MutableRefObject,
  useLayoutEffect,
  useState,
} from "react";
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import useIsMounted from "@/hooks/useIsMounted";
import { Button } from "./ui/button";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";
import { ImageIcon, Smile } from "lucide-react";
import Hint from "./ui/Hint";
import { Delta, Op } from "quill/core";
import { cn } from "@/lib/utils";
import EmojiPopover from "@/app/main/_components/EmojiPopover";

type EditorValue = {
  image: File | null;
  body: string;
};
type ChatEditorProps = {
  variant?: "create" | "update";
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  defaultValue?: Delta | Array<Op>;
};
const ChatEditor: FC<ChatEditorProps> = ({
  variant = "create",
  onSubmit,
  onCancel,
  placeholder = "Write something...",
  disabled = false,
  innerRef,
  defaultValue = [],
}): JSX.Element => {
  const ChatContainerRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const [text, setText] = useState("");
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef<Delta | Array<Op>>(defaultValue);
  const disabledRef = useRef(disabled);
  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });
  useEffect(() => {
    if (!ChatContainerRef.current || !isMounted) return;
    const container = ChatContainerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const options: QuillOptions = {
      placeholder: placeholderRef.current,
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            // [
            //   { header: "1" },
            //   { header: "2" },
            //   { header: "3" },
            //   { header: "4" },
            //   { header: "5" },
            // ],
            ["bold", "italic", "underline", "strike", "link"], // toggled buttons
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          ],
        },
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                if (quillRef.current) {
                  const _quill = quillRef.current;
                  const range = quill.getSelection();
                  if (range) {
                    _quill.insertText(range?.index || 0, "\n");
                    // _quill.setSelection(range.index + 1);
                  }
                }
              },
            },
          },
        },
      },
    };
    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();
    if (innerRef) innerRef.current = quill;
    quill.setContents(defaultValueRef.current);
    setText(quill.getText());
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });
    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (quillRef?.current) quillRef.current = null;
      if (innerRef?.current) innerRef.current = null;

      if (container) container.innerHTML = "";
    };
  }, [isMounted, innerRef]);
  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
  const toggleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
    const toolbarElement =
      ChatContainerRef?.current?.querySelector(".ql-toolbar");
    if (toolbarElement) toolbarElement.classList.toggle("hidden");
  };
  console.log("isEmpty: ", isEmpty);
  const onEmojiSelect = (selectedEmoji: any) => {
    const quill = quillRef.current;
    if (quill) {
      quill.insertText(quill.getSelection()?.index || 0, selectedEmoji.native);
    }
  };

  if (!isMounted) return <></>;
  return (
    <div className="flex flex-col  ">
      <div className="flex flex-col fixed bottom-2 w-[79%] border   border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm  transition-all bg-white">
        <div
          ref={ChatContainerRef}
          className="h-full ql-custom  min-h-[98px] "
        />
        <div className="flex px-2 pb-2 z-[10] ">
          <Hint
            label={isToolbarVisible ? "Hide formatting" : "Show formatting"}
          >
            <Button
              onClick={toggleToolbar}
              disabled={disabled}
              size="iconSm"
              variant={"ghost"}
            >
              <PiTextAa className="size-5" />
            </Button>
          </Hint>
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} size="iconSm" variant={"ghost"}>
              <Smile className="size-5" />
            </Button>
          </EmojiPopover>

          {variant === "create" ? (
            <Hint label="Image">
              <Button
                onClick={() => {}}
                disabled={disabled}
                size="iconSm"
                variant={"ghost"}
              >
                <ImageIcon className="size-5" />
              </Button>
            </Hint>
          ) : (
            <></>
          )}

          {variant === "create" ? (
            <Button
              disabled={disabled || isEmpty}
              onClick={() => {}}
              className={cn(
                "ml-auto",
                isEmpty
                  ? "bg-white hover:white text-muted-foreground "
                  : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white "
              )}
            >
              <MdSend className="size-5" />
            </Button>
          ) : (
            <></>
          )}
          {variant === "update" ? (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant={"outline"}
                disabled={disabled}
                onClick={() => {}}
              >
                Cancel
              </Button>
              <Button
                className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white "
                disabled={disabled || isEmpty}
                onClick={() => {}}
              >
                Save
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
        {variant === "create" && !isEmpty ? (
          <div
            className={
              " px-2 text-[13px] text-muted-foreground flex justify-end"
            }
          >
            <strong className="pr-[6px] font-bold">Shift + Return</strong> to
            add a new line
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChatEditor;
