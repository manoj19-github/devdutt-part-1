"use client";
import { useCurrentMember } from "@/hooks/useCurrentMember";
import useGetChannels from "@/hooks/useGetChannels";
import { useGetWorkSpaceById } from "@/hooks/useGetWorkSpace";
import useIsMounted from "@/hooks/useIsMounted";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useCreateChannelModal } from "@/stores/useCreateChannelModal";
import { Loader, Triangle, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, Fragment, useEffect, useMemo } from "react";

type WorkspaceIdPageProps = {};
const WorkspaceIdPage: FC<WorkspaceIdPageProps> = (): JSX.Element => {
  const workSpaceId = useWorkspaceId();
  const router = useRouter();
  const currentMemberResponse = useCurrentMember({ workspaceId: workSpaceId });
  const isMounted = useIsMounted();
  const { data } = useGetWorkSpaceById({ id: workSpaceId });
  const isAdminOfUser = useMemo(
    () => currentMemberResponse?.data?.role === "admin",
    [currentMemberResponse?.data?.role]
  );
  const getWorkspaceByResponse = useGetWorkSpaceById({ id: workSpaceId });
  const getChannelResponse = useGetChannels({ workspaceId: workSpaceId });
  const [openCreateChannelModal, setOpenCreateChannelModal] =
    useCreateChannelModal();
  const channelId = useMemo(
    () => getChannelResponse.response?.data?.[0]?._id,
    [getChannelResponse.response?.data]
  );
  useEffect(() => {
    if (
      getWorkspaceByResponse.isLoading ||
      currentMemberResponse?.isLoading ||
      !currentMemberResponse?.data ||
      getChannelResponse.isLoading
    )
      return;
    if (channelId)
      return router.push(
        `/main/workspaces/${workSpaceId}/channel/${channelId}`
      );
    else if (!openCreateChannelModal && isAdminOfUser)
      setOpenCreateChannelModal(true);
  }, [
    channelId,
    currentMemberResponse?.data,
    currentMemberResponse?.isLoading,
    isAdminOfUser,
    getChannelResponse.isLoading,
    getWorkspaceByResponse.isLoading,
    getWorkspaceByResponse.data,
    openCreateChannelModal,
    setOpenCreateChannelModal,
    router,
    workSpaceId,
  ]);
  if (!isMounted) return <></>;
  if (
    getChannelResponse.isLoading ||
    getWorkspaceByResponse.isLoading ||
    currentMemberResponse?.isLoading
  )
    return (
      <div className="h-full flex-1 items-center justify-center flex-col gap-y-2">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  if (!getWorkspaceByResponse.data || !currentMemberResponse?.data)
    return (
      <div className="h-[80vh] flex items-center justify-center flex-col gap-y-2">
        <TriangleAlert className="h-8 w-8  text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace Not Found
        </span>
      </div>
    );
  return (
    <div className="h-[80vh] flex items-center justify-center flex-col gap-y-2">
      <TriangleAlert className="h-8 w-8  text-muted-foreground" />
      <span className="text-sm text-muted-foreground">No Channel found</span>
    </div>
  );
};

export default WorkspaceIdPage;
