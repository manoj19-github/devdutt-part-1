"use client";
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
  const isMounted = useIsMounted();
  const { data } = useGetWorkSpaceById({ id: workSpaceId });
  const getWorkspaceByResponse = useGetWorkSpaceById({ id: workSpaceId });
  const getChannelResponse = useGetChannels({ workspaceId: workSpaceId });
  const [openCreateChannelModal, setOpenCreateChannelModal] =
    useCreateChannelModal();
  const channelId = useMemo(
    () => getChannelResponse.response?.data?.[0]?._id,
    [getChannelResponse.response?.data]
  );
  useEffect(() => {
    if (getWorkspaceByResponse.isLoading || getChannelResponse.isLoading)
      return;
    if (channelId)
      return router.push(
        `/main/workspaces/${workSpaceId}/channel/${channelId}`
      );
    else if (!openCreateChannelModal) setOpenCreateChannelModal(true);
  }, [
    channelId,
    getChannelResponse.isLoading,
    getWorkspaceByResponse.isLoading,
    getWorkspaceByResponse.data,
    openCreateChannelModal,
    setOpenCreateChannelModal,
    router,
    workSpaceId,
  ]);
  if (!isMounted) return <></>;
  if (getChannelResponse.isLoading || getWorkspaceByResponse.isLoading)
    return (
      <div className="h-full flex-1 items-center justify-center flex-col gap-y-2">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  if (!getWorkspaceByResponse.data)
    return (
      <div className="h-full flex-1 items-center justify-center flex-col gap-y-2">
        <TriangleAlert className="h-8 w-8  text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace Not Found
        </span>
      </div>
    );
  return <Fragment></Fragment>;
};

export default WorkspaceIdPage;
