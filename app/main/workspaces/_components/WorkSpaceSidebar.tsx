"use client";
import { useCurrentMember } from "@/hooks/useCurrentMember";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import React, { FC } from "react";
import { useGetWorkSpaceById } from "./../../../../hooks/useGetWorkSpace";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import WorkSpaceHeader from "./WorkSpaceHeader";
import SidebarItem from "./SidebarItem";
import useGetChannels from "@/hooks/useGetChannels";
import WorkspaceSection from "../[workspaceId]/_components/WorkspaceSection";
import { useGetMembers } from "@/hooks/useGetMembers";
import UserItem from "../[workspaceId]/_components/UserItem";
import { useCreateChannelModal } from "@/stores/useCreateChannelModal";
import { useChannelId } from "@/hooks/useChannelId";

type WorkSpaceSidebarProps = {};
const WorkSpaceSidebar: FC<WorkSpaceSidebarProps> = () => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [openCreateChannelModal, setOpenCreateChannelModal] =
    useCreateChannelModal();
  const channelResponse = useGetChannels({ workspaceId });

  const memberResponse = useCurrentMember({ workspaceId });
  const membersResponse = useGetMembers({ workspaceId });
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
      <WorkSpaceHeader
        workspace={workSpaceByIdResponse?.data}
        isAdmin={memberResponse?.data && memberResponse.data?.role === "admin"}
      />
      <div className="flex flex-col  mt-3 space-y-3">
        <SidebarItem label="Threads" Icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" Icon={SendHorizonal} id="drafts" />
      </div>
      <WorkspaceSection
        label={"Channels"}
        hint={"Create channel"}
        onNew={
          memberResponse && memberResponse?.data?.role === "admin"
            ? () => {
                setOpenCreateChannelModal(true);
              }
            : undefined
        }
      >
        {!!channelResponse &&
          channelResponse.response &&
          channelResponse.response?.data &&
          Array.isArray(channelResponse.response?.data) &&
          channelResponse.response.data.map((_channel, index) => {
            return (
              <SidebarItem
                key={index}
                label={_channel.name}
                Icon={HashIcon}
                id={_channel._id}
                variant={_channel._id === channelId ? "active" : "default"}
              />
            );
          })}
      </WorkspaceSection>
      <WorkspaceSection
        label={"Direct Messages"}
        hint={"New direct message"}
        onNew={() => {}}
        className="pb-10"
      >
        {membersResponse &&
          membersResponse.response &&
          membersResponse.response?.data &&
          Array.isArray(membersResponse.response?.data) &&
          membersResponse.response.data.map((member, index) => {
            return (
              <UserItem
                // variant={
                //   member._id === memberResponse?.data?._id ? "active" : "default"
                // }
                key={index}
                id={member._id}
                label={member.user.name}
                image={member.user.image}
              />
            );
          })}
      </WorkspaceSection>
    </div>
  );
};

export default WorkSpaceSidebar;
