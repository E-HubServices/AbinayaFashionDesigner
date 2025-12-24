import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

declare const process: {
    env: {
        ADMIN_PASSWORD_HASH: string;
        [key: string]: string | undefined;
    };
};

// Validate admin password
export const validatePassword = query({
    args: { password: v.string() },
    handler: async (ctx, args) => {
        const setting = await ctx.db
            .query("settings")
            .withIndex("by_key", (q) => q.eq("key", "adminPasswordHash"))
            .first();

        if (!setting) {
            // If no password is set, use default (should be set via environment variable)
            const defaultHash = process.env.ADMIN_PASSWORD_HASH || "";
            return args.password === defaultHash;
        }

        // Simple comparison - in production, use proper hashing (bcrypt)
        // For now, we'll store the password hash in environment variable
        return args.password === setting.value;
    },
});

// Set admin password (only call this once during setup)
export const setAdminPassword = mutation({
    args: { passwordHash: v.string() },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("settings")
            .withIndex("by_key", (q) => q.eq("key", "adminPasswordHash"))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, { value: args.passwordHash });
        } else {
            await ctx.db.insert("settings", {
                key: "adminPasswordHash",
                value: args.passwordHash,
            });
        }
    },
});
