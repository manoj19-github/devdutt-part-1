import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type UseGetChannelByIdProps = {
  channelId: Id<"channels">;
};
const useGetChannelById = ({ channelId }: UseGetChannelByIdProps) => {
  const data = useQuery(api.channels.getByChannelId, { channelId });
  const isLoading = data === undefined;
  return {
    response: data,
    isLoading,
  };
};
export default useGetChannelById;
