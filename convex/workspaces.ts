import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createWorkspace = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        isLogout: true,
        data: null,
      };
    }
    // Todo: create a proper method later
    const generateCode = (): string => {
      return Array.from(
        { length: 6 },
        () =>
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
            Math.floor(Math.random() * 36)
          ]
      ).join("");
    };
    // const joinCode = Math.random().toString(36).substring(2, 8);
    const existingWorkSpaces = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (!!existingWorkSpaces) {
      await ctx.db.patch(existingWorkSpaces._id, {
        name: args.name,
        joinCode: generateCode(),
      });
      return {
        data: existingWorkSpaces._id,
        isLogout: false,
      };
    } else {
      const newWorkSpaceData = await ctx.db.insert("workspaces", {
        name: args.name,
        joinCode: generateCode(),
        userId,
      });
      await ctx.db.insert("members", {
        userId,
        workspaceId: newWorkSpaceData,
        role: "admin",
      });
      await ctx.db.insert("channels", {
        name: "General",
        workspaceId: newWorkSpaceData,
      });
      return {
        data: newWorkSpaceData,
        isLogout: false,
      };
    }
  },
});

export const getWorkspaces = query({
  args: {},
  async handler(ctx) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();
    const workspaceIds = members.map((member) => member.workspaceId);
    const workspaces = [];
    for await (const _workspaceId of workspaceIds) {
      const _workspace = await ctx.db.get(_workspaceId);
      if (!!_workspace) {
        workspaces.push(_workspace);
      }
    }

    return workspaces;
  },
});

export const getWorkspacesByName = query({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
  },
});

export const getWorkspacesByJoinCode = query({
  args: {
    joinCode: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("joinCode"), args.joinCode))
      .first();
  },
});

export const getWorkspacesByUserId = query({
  args: {
    userId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const getWorkSpaceById = query({
  args: {
    id: v.id("workspaces"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return {
        data: null,
        isLogout: true,
      };
    }
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return {
        data: null,
        isLogout: false,
      };
    }
    const data = await ctx.db.get(args.id);
    return {
      data,
      isLogout: false,
    };
  },
});

export const updateWorkspace = mutation({
  args: {
    id: v.id("workspaces"),
    name: v.string(),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        data: null,
        isLogout: true,
      };
    }
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return {
        data: null,
        isLogout: false,
      };
    }
    await ctx.db.patch(args.id, {
      name: args.name,
    });
    return {
      data: args.id,
      isLogout: false,
    };
  },
});

export const deleteWorkspace = mutation({
  args: {
    id: v.id("workspaces"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        data: null,
        isLogout: true,
      };
    }
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return {
        data: null,
        isLogout: false,
      };
    }
    const members = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("workspaceId"), args.id))
      .collect();
    for await (const _member of members) {
      await ctx.db.delete(_member._id);
    }

    await ctx.db.delete(args.id);
    return {
      data: args.id,
      isLogout: false,
    };
  },
});


