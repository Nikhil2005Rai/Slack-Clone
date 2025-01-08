import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
// import {auth} from "./auth";

export const current = query({
  args: {},
  handler: async (ctx) => {
    // Fetch the authenticated user ID
    // const _userId = await auth.getUserId(ctx);//Depricated
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null; // User is not authenticated
    }

    // Fetch and return the user document from the database
    return await ctx.db.get(userId);
  },
});
