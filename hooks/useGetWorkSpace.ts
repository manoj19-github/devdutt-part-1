import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type UseGetWorkspaceIdProps = {
  id: Id<"workspaces">;
};

export const useGetWorkSpaceById = ({ id }: UseGetWorkspaceIdProps) => {
  const data = useQuery(api.workspaces.getWorkSpaceById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
};
