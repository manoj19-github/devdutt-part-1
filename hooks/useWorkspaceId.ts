import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
  const { workspaceId } = useParams();
  return workspaceId as Id<"workspaces">;
};
