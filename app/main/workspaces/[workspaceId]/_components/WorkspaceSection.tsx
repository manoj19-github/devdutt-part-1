"use client";
import { Button } from "@/components/ui/button";
import Hint from "@/components/ui/Hint";
import useIsMounted from "@/hooks/useIsMounted";
import { cn } from "@/lib/utils";
import { Plus, PlusIcon } from "lucide-react";
import React, { FC, ReactNode } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";

type WorkspaceSectionProps = {
  children: ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
  className?: string;
};
const WorkspaceSection: FC<WorkspaceSectionProps> = ({
  children,
  label,
  hint,
  onNew,
  className,
}): JSX.Element => {
  const isMounted = useIsMounted();
  const [toggle, onToggle] = useToggle(true);
  if (!isMounted) return <></>;
  return (
    <div className={"flex flex-col mt-3 px-3"}>
      <div className="flex items-center px-3.5 group">
        <Button
          onClick={onToggle}
          variant="transparent"
          className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
        >
          <FaCaretDown
            className={cn(
              "size-5 transition-all duration-100",
              toggle && "-rotate-90"
            )}
          />
        </Button>
        <Button
          variant={"transparent"}
          className="group px-1 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden"
          size="sm"
        >
          <span className="truncate text-[16px]">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant={"transparent"}
              size="iconSm"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      <div
        className={cn(
          "mt-2 flex flex-col gap-y-3  items-start justify-start",
          className
        )}
      >
        {toggle && children}
      </div>
    </div>
  );
};

export default WorkspaceSection;
