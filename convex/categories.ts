import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all active categories
export const getAllCategories = query({
    args: {},
    handler: async (ctx) => {
        const categories = await ctx.db
            .query("categories")
            .withIndex("by_active_order", (q) => q.eq("isActive", true))
            .order("asc")
            .collect();
        return categories;
    },
});

// Get all categories (including inactive) - Admin only
export const getAllCategoriesAdmin = query({
    args: {},
    handler: async (ctx) => {
        const categories = await ctx.db
            .query("categories")
            .withIndex("by_order")
            .order("asc")
            .collect();
        return categories;
    },
});

// Create category
export const createCategory = mutation({
    args: {
        name: v.string(),
        name_ta: v.optional(v.string()),
        displayOrder: v.number(),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const categoryId = await ctx.db.insert("categories", {
            ...args,
            isActive: args.isActive !== undefined ? args.isActive : true,
            createdAt: Date.now(),
        });
        return categoryId;
    },
});

// Update category
export const updateCategory = mutation({
    args: {
        id: v.id("categories"),
        name: v.optional(v.string()),
        name_ta: v.optional(v.string()),
        displayOrder: v.optional(v.number()),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
        return id;
    },
});

// Delete category
export const deleteCategory = mutation({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return args.id;
    },
});

// Seed default categories
export const seedCategories = mutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("categories").collect();
        if (existing.length > 0) return "Already seeded";

        const defaultCategories = [
            { name: "Blouse", name_ta: "ஜாக்கெட்", displayOrder: 1, isActive: true, createdAt: Date.now() },
            { name: "Salwar", name_ta: "சல்வார்", displayOrder: 2, isActive: true, createdAt: Date.now() },
            { name: "Frock", name_ta: "ஃபிராக்", displayOrder: 3, isActive: true, createdAt: Date.now() },
            { name: "Kids", name_ta: "குழந்தைகள்", displayOrder: 4, isActive: true, createdAt: Date.now() },
        ];

        for (const cat of defaultCategories) {
            await ctx.db.insert("categories", cat);
        }

        return "Seeded successfully";
    },
});
