"use client";
import { useCurrentMember } from "@/hooks/useCurrentMember";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import React, { FC } from "react";
import { useGetWorkSpaceById } from "./../../../../hooks/useGetWorkSpace";
import { AlertTriangle, Loader } from "lucide-react";
import WorkSpaceHeader from "./WorkSpaceHeader";

type WorkSpaceSidebarProps = {};
const WorkSpaceSidebar: FC<WorkSpaceSidebarProps> = () => {
  const workspaceId = useWorkspaceId();
  const memberResponse = useCurrentMember({ workspaceId });
  const workSpaceByIdResponse = useGetWorkSpaceById({ id: workspaceId });
  console.log("workspace data >>>>>>>>>>>>>>>> ", {
    data: memberResponse?.data,
    data23: workSpaceByIdResponse?.data,
  });

  if (memberResponse?.isLoading || workSpaceByIdResponse?.isLoading)
    return (
      <div className="flex flex-col bg-appColor h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-white" />
      </div>
    );

  if (!memberResponse?.data || !workSpaceByIdResponse?.data)
    return (
      <div className="flex flex-col gap-y-2 bg-appColor h-full items-center justify-center">
        <AlertTriangle className="size-6 text-white" />
        <p className="text-white text-base">workspace not found</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-2 bg-appColor/20 h-full">
      <WorkSpaceHeader workspace={workSpaceByIdResponse?.data} isAdmin={memberResponse?.data && memberResponse.data?.role==="admin"}/>

    </div>
  );
};

export default WorkSpaceSidebar;
