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
      throw new Error("Not logged in");
    }
    // Todo: create a proper method later
    const joinCode = Math.random().toString(36).substring(2, 8);
    const existingWorkSpaces = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (!!existingWorkSpaces) {
      await ctx.db.patch(existingWorkSpaces._id, {
        name: args.name,
        joinCode: joinCode,
      });
      return existingWorkSpaces._id;
    } else {
      return await ctx.db.insert("workspaces", {
        name: args.name,
        joinCode: joinCode,
        userId,
      });
    }
  },
});

export const getWorkspaces = query({
  args: {},
  async handler(ctx) {
    return await ctx.db.query("workspaces").collect();
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
