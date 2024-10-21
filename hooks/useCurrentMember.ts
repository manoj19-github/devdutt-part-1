import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react"

interface CurrentMemberProps{
    workspaceId:Id<"workspaces">
}
export const useCurrentMember=({workspaceId}:CurrentMemberProps)=>{
    const response = useQuery(api.members.currentMembers,{workspaceId});
    const isLoading = response?.data ===undefined;
    if(response)
    return{
        data:response.data,
        isLoading
    }

}