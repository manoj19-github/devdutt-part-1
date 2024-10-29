import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getChannelByWorkspaceId = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        data: null,
        isLoggedOut: false,
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
        data: null,
        isLoggedOut: false,
      };
    }

    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();
    return {
      data: channels,
      isLoggedOut: false,
    };
  },
});

export const createChannel = mutation({
  args: {
    name: v.string(),
    workspaceId: v.id("workspaces"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        data: null,
        isLoggedOut: false,
      };
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member || member.role !== "admin") {
      return {
        data: null,
        isLoggedOut: false,
      };
    }
    const parsedName = args.name.trim().replace(/\s+/g, "-").toLowerCase();
    const newChannel = await ctx.db.insert("channels", {
      name: parsedName,
      workspaceId: args.workspaceId,
    });
    return {
      data: newChannel,
      isLoggedOut: false,
    };
  },
});
