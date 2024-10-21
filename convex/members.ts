import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const currentMembers = query({
    args:{workspaceId:v.id("workspaces")},
    async handler(ctx,args){
        const userId = await getAuthUserId(ctx);
        if(!userId){
            return{
                isLogout:true,
                data:null

            }
        }
        const member = await ctx.db.query("members").withIndex("by_workspace_id_user_id",(q)=>q.eq("workspaceId",args.workspaceId).eq("userId",userId)).unique();
        if(!member){
            return{
                isLogout:false,
                data:null

            }
        }
        return{
            isLogout:false,
            data:member
        }


    }
})