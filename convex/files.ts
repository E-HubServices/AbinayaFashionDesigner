import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Generate upload URL for image files
export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

// Get image URL from storage ID
export const getImageUrl = mutation({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId as any);
    },
});
