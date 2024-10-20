"use client";
import React, { FC } from "react";
import { IconType } from "react-icons/lib";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type SidebarButtonProps = {
  Icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
};
const SidebarButton: FC<SidebarButtonProps> = ({
  Icon,
  label,
  isActive,
}): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
      <Button
        variant={"transparent"}
        className={cn(
          `size-9 p-2 group-hover:bg-accent/20`,
          isActive && "bg-accent/20"
        )}
      >
        <Icon className="size-8 text-white group-hover:scale-110 transition-all  " />
      </Button>
      <span className="text-[14px] text-white group-hover:text-accent ">
        {label}
      </span>
    </div>
  );
};

export default SidebarButton;
