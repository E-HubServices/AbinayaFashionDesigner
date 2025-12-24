import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save chat message
export const saveMessage = mutation({
    args: {
        sessionId: v.string(),
        role: v.string(),
        content: v.string(),
        language: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("chatMessages", {
            ...args,
            timestamp: Date.now(),
        });
    },
});

// Get session messages
export const getSessionMessages = query({
    args: { sessionId: v.string() },
    handler: async (ctx, args) => {
        const messages = await ctx.db
            .query("chatMessages")
            .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
            .order("asc")
            .collect();
        return messages;
    },
});

// Clear old messages (cleanup function)
export const clearOldMessages = mutation({
    args: { daysOld: v.number() },
    handler: async (ctx, args) => {
        const cutoffTime = Date.now() - args.daysOld * 24 * 60 * 60 * 1000;
        const oldMessages = await ctx.db
            .query("chatMessages")
            .withIndex("by_timestamp")
            .filter((q) => q.lt(q.field("timestamp"), cutoffTime))
            .collect();

        for (const msg of oldMessages) {
            await ctx.db.delete(msg._id);
        }

        return oldMessages.length;
    },
});
