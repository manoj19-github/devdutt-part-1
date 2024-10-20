"use client";
import { useGetWorkSpaceById } from "@/hooks/useGetWorkSpace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import React, { FC } from "react";

type WorkspaceIdPageProps = {};
const WorkspaceIdPage: FC<WorkspaceIdPageProps> = () => {
  const workSpaceId = useWorkspaceId();
  const { data } = useGetWorkSpaceById({ id: workSpaceId });
  console.log("data: ", data);
  return <div>WorkspaceIdPage : {workSpaceId}</div>;
};

export default WorkspaceIdPage;
