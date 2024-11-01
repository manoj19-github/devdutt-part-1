import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";

type UseGetWorkspaceInfoProps = {
  id: Id<"workspaces">;
};

export const useGetWorkspaceInfo = ({ id }: UseGetWorkspaceInfoProps) => {
  const response = useQuery(api.workspaces.getInfoOfWorkspaceById, {
    workspaceId: id,
  });
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
