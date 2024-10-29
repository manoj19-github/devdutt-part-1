import { v } from "convex/values";
import { query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

const populateUser = (ctx: QueryCtx, userId: Id<"users">) => {
  return ctx.db.get(userId);
};
export const getMembers = query({
  args: { workspaceId: v.id("workspaces") },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        isLogout: true,
        data: null,
      };
    }
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return {
        isLogout: false,
        data: null,
      };
    }
    const response = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();
    const members = [];
    for (const _member of response) {
      const tUser = await populateUser(ctx, _member.userId);
      if (tUser) {
        members.push({
          ..._member,
          user: tUser,
        });
      }
    }
    return {
      isLogout: false,
      data: members,
    };
  },
});

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