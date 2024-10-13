import { query } from "./_generated/server";

export const getWorkspaces = query({
  args: {},
  async handler(ctx) {
    return await ctx.db.query("workspaces").collect();
  },
});
