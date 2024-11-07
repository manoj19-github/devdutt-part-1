"use client";
import { useChannelId } from "@/hooks/useChannelId";
import useGetChannelById from "@/hooks/useGetChannelById";
import useIsMounted from "@/hooks/useIsMounted";
import { Loader, TriangleAlert } from "lucide-react";
import { FC } from "react";
import Header from "../_components/Header";
import ChatInput from "./_components/ChatInput";
type ChannelIdPageProps = {};

const ChannelIdPage: FC<ChannelIdPageProps> = (): JSX.Element => {
  const channelId = useChannelId();
  const channelResponse = useGetChannelById({ channelId });
  const isMounted = useIsMounted();
  if (!isMounted) return <></>;

  if (channelResponse.isLoading)
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="animate-spin size-8 text-muted-foreground" />
      </div>
    );
  if (!channelResponse.response?.data)
    return (
      <div className="h-full flex-1 flex flex-col gap-y-3 items-center justify-center">
        <TriangleAlert className="size-8 text-muted-foreground" />
        <span>
          Channel not found. Make sure you have the correct channel ID.
        </span>
      </div>
    );
  return (
    <div className="flex flex-col h-full">
      <Header name={channelResponse.response.data?.name} />
      <ChatInput />
    </div>
  );
};

export default ChannelIdPage;
