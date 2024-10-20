import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";

type UseGetWorkspaceIdProps = {
  id: Id<"workspaces">;
};

export const useGetWorkSpaceById = ({ id }: UseGetWorkspaceIdProps) => {
  const response = useQuery(api.workspaces.getWorkSpaceById, { id });
  console.log("response: ", response);
  const { signOut } = useAuthActions();

  const isLoading = response === undefined;
  if (!!response && response.isLogout) {
    signOut();
    console.log("HIT LOGOUT <<<<<<<<<<<<<>>>>>>>>>>>>>>>>");
    return {
      data: null,
      isLoading,
    };
  }
  const data = !!response && response.data ? response?.data : null;
  return {
    data,
    isLoading,
  };

  // return { data, isLoading };
};
