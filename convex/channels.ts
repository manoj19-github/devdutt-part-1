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


export const getByChannelId = query({
  args: {
    channelId: v.id("channels"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        data: null,
        isLoggedOut: false,
      };
    }

    const channel = await ctx.db.get(args.channelId);
    if (!channel) {
      return {
        data: null,
        isLoggedOut: false,
      };
    }
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return {
        data: null,
        isLoggedOut: false,
      };
    }
    return {
      data: channel,
      isLoggedOut: false,
    };
  },
});

export const updateChannel = mutation({
  args: {
    channelId: v.id("channels"),
    name: v.string(),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId)
      return {
        data: null,
        isLoggedOut: true,
        isNotAdmin: false,
        channelNotFound: false,
      };
    const channel = await ctx.db.get(args.channelId);
    if (!channel)
      return {
        data: null,
        isLoggedOut: false,
        isNotAdmin: false,
        channelNotFound: true,
      };
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member || member.role !== "admin")
      return {
        data: null,
        isLoggedOut: false,
        isNotAdmin: true,
        channelNotFound: false,
      };

    await ctx.db.patch(args.channelId, {
      name: args.name,
    });
    return {
      data: args.channelId,
      isLoggedOut: false,
      isNotAdmin: false,
      channelNotFound: false,
    };
  },
});

export const deleteChannel = mutation({
  args: {
    channelId: v.id("channels"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId)
      return {
        data: null,
        isLoggedOut: true,
        isNotAdmin: false,
        channelNotFound: false,
      };
    const channel = await ctx.db.get(args.channelId);
    if (!channel)
      return {
        data: null,
        isLoggedOut: false,
        isNotAdmin: false,
        channelNotFound: true,
      };
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member || member.role !== "admin")
      return {
        data: null,
        isLoggedOut: false,
        isNotAdmin: true,
        channelNotFound: false,
      };

    // ToDo : Remove associated messages of this channel *****************************************************

    await ctx.db.delete(args.channelId);
    return {
      data: args.channelId,
      isLoggedOut: false,
      isNotAdmin: false,
      channelNotFound: false,
    };
  },
});