"use client";
import UserButton from "@/app/(auth)/_components/UserButton";
import React, { FC } from "react";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import SidebarButton from "./SidebarButton";
import {
  Bell,
  BellIcon,
  Home,
  MessageSquare,
  MessagesSquare,
  MoreHorizontal,
} from "lucide-react";
import useIsMounted from "@/hooks/useIsMounted";
import { usePathname } from "next/navigation";

type SidebarProps = {};
const Sidebar: FC<SidebarProps> = (): JSX.Element => {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  if (!isMounted) return <></>;
  return (
    <aside className="w-[90px] h-full bg-appColor  gap-y-4 items-center  pt-[9px] flex flex-col py-2">
      <WorkspaceSwitcher />
      <SidebarButton
        Icon={Home}
        label={"Home"}
        isActive={pathname.includes("/workspaces")}
      />
      <SidebarButton Icon={MessagesSquare} label={"DMs"} />
      <SidebarButton Icon={Bell} label={"Notifications"} />
      <SidebarButton Icon={MoreHorizontal} label={"More"} />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto ">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
