import dynamic from "next/dynamic";
import React, { FC } from "react";

const ChatEditor = dynamic(() => import("@/components/ChatEditor"), {
  ssr: false, // Disable server-side rendering for this component
});
type ChatInputProps = {};
const ChatInput: FC<ChatInputProps> = (): JSX.Element => {
  return (
    <div className=" fixed bottom-0  bg-white px-2 w-[79.5%] pb-1  pt-3">
      <ChatEditor />
    </div>
  );
};

export default ChatInput;
