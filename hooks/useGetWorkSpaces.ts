import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const useGetWorkSpaces = () => {
  const data = useQuery(api.workspaces.getWorkspaces);
  const isLoading = data === undefined;
  return { data, isLoading };
};
