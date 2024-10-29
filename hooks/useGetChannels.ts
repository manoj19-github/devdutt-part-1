import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type UseGetChannelProps = {
  workspaceId: Id<"workspaces">;
};
const useGetChannels = ({ workspaceId }: UseGetChannelProps) => {
  const data = useQuery(api.channels.getChannelByWorkspaceId, { workspaceId });
  const isLoading = data === undefined;
  return {
    response: data,
    isLoading,
  };
};
export default useGetChannels;
