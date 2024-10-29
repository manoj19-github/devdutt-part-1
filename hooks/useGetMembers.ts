import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type UserGetMembersProps = {
  workspaceId: Id<"workspaces">;
};
export const useGetMembers = ({ workspaceId }: UserGetMembersProps) => {
  const data = useQuery(api.members.getMembers, { workspaceId });
  return {
    response: data,
    isLoading: data === undefined,
  };
};
