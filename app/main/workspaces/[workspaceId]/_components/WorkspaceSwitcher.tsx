"use client";
import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useGetWorkSpaceById } from "@/hooks/useGetWorkSpace";
import { useGetWorkSpaces } from "@/hooks/useGetWorkSpaces";

import { useWorkSpaceModal } from "@/hooks/useWorkSpaceModal";
import { Loader, Plus } from "lucide-react";
import useIsMounted from "@/hooks/useIsMounted";
import { useRouter } from "next/navigation";
type WorkspaceSwitcherProps = {};
const WorkspaceSwitcher: FC<WorkspaceSwitcherProps> = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data: workspaceByIdData, isLoading: workspaceByIdLoading } =
    useGetWorkSpaceById({ id: workspaceId });
  const { data: workspacesData, isLoading: workspacesLoading } =
    useGetWorkSpaces();
  const filteredWorkSpaces = workspacesData?.filter(
    (workspace) => workspace._id !== workspaceId
  );
  const [, setWorkSpaceModalOpned] = useWorkSpaceModal();
  const isMounted = useIsMounted();
  console.log("workspacesData>>>>>>>>>>> ", workspaceByIdData);

  if (!isMounted) return <></>;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="btn btn-ghost btn-sm" asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ababab] hover:bg-[#ababab]/80 text-slate-700 font-semibold text-xl">
          {workspaceByIdLoading ? (
            <Loader className="siz-5 animate-spin shrink-0" />
          ) : (
            <></>
          )}
          <p className="">
            {" "}
            {!workspaceByIdLoading
              ? workspaceByIdData?.name.charAt(0)?.toUpperCase()
              : ""}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuItem
          onClick={() => {
            router.push(`/main/workspaces/${workspaceId}`);
          }}
          className="cursor-pointer justify-start items-start capitalize overflow-hidden"
        >
          {workspaceByIdData?.name}
          <span className="text-xs text-muted-foreground">
            Active workspaces
          </span>
        </DropdownMenuItem>
        {filteredWorkSpaces?.map((self, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => {
              router.push(`/main/workspaces/${self._id}`);
            }}
            className="cursor-pointer flex justify-start items-center gap-x-3 capitalize"
          >
            <div className="shrink-0 size-8 rounded-md flex items-center font-semibold justify-center relative overflow-hidden text-base bg-[#616061] text-white">
              {self.name.charAt(0)?.toUpperCase()}
            </div>
            <p className="truncate">{self.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer overflow-hidden truncate"
          onClick={() => setWorkSpaceModalOpned(true)}
        >
          <div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2 ">
            <Plus />
          </div>
          create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
