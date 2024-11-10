"use client";
import React, { FC, ReactNode, useState } from "react";
import EmojiPicker from "@emoji-mart/react";
import emojiPickerData from "@emoji-mart/data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
type EmojiPopoverProps = {
  children: ReactNode;
  hint?: string;
  onEmojiSelect: (emoji: any) => void;
};
const EmojiPopover: FC<EmojiPopoverProps> = ({
  children,
  hint = "Emoji",
  onEmojiSelect,
}): JSX.Element => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const handleEmojiSelect = (_emoji: any) => {
    onEmojiSelect(_emoji);
    setPopoverOpen(false);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };
  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
          delayDuration={50}
        >
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <EmojiPicker
            data={emojiPickerData}
            onEmojiSelect={handleEmojiSelect}
          />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default EmojiPopover;
