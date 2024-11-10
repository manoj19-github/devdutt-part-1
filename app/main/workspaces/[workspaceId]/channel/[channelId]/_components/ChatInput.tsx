"use client";
import useIsMounted from "@/hooks/useIsMounted";
import dynamic from "next/dynamic";
import Quill from "quill";
import { FC, useRef } from "react";

const ChatEditor = dynamic(() => import("@/components/ChatEditor"), {
  ssr: false, // Disable server-side rendering for this component
});
type ChatInputProps = {
  placeholder: string;
};
const ChatInput: FC<ChatInputProps> = ({ placeholder }): JSX.Element => {
  const isMounted = useIsMounted();
  const chatEditorRef = useRef<Quill | null>(null);
  if (!isMounted) return <></>;
  return (
    <div className="   bg-white px-2 w-[79.5%] pb-1  pt-0 ">
      <ChatEditor
        onSubmit={() => {}}
        disabled={false}
        innerRef={chatEditorRef}
        placeholder={placeholder}
        variant="create"
      />
    </div>
  );
};

export default ChatInput;
