"use client";
import { Button } from "@/components/ui/button";
import useIsMounted from "@/hooks/useIsMounted";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  label: string;
  id: string;
  Icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
};
const sidebarItemVariants = cva(
  "flex items-center gap-1.5 hover:bg-white/70 duration-200 transition-all justify-start font-normal h-7 px-[18px] text-sm overflow-hidden hover:text-[#be185d] ",
  {
    variants: {
      variant: {
        default:
          "text-[#f9edffcc]  transition duration-200 hover:text-[#be185d]",
        active:
          "text-[#be185d] bg-white/80  text-[17px] hover:bg-white transition duration-200",
      },
    },
  }
);
const SidebarItem: FC<SidebarItemProps> = ({ label, id, Icon, variant }) => {
  const isMounted = useIsMounted();
  const workspaceId = useWorkspaceId();
  if (!isMounted) return <></>;
  return (
    <Button
      asChild
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`/main/workspaces/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-lg">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
