import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to resolve image URLs
const enrichWork = async (ctx: any, work: any) => {
    if (!work.images || work.images.length === 0) return work;
    const resolvedImages = await Promise.all(
        work.images.map(async (img: string) => {
            if (img.startsWith("http")) return img;
            try {
                const url = await ctx.storage.getUrl(img);
                return url || img;
            } catch (e) {
                return img;
            }
        })
    );
    return { ...work, images: resolvedImages };
};

// Get all active works
export const getAllWorks = query({
    args: {},
    handler: async (ctx) => {
        const works = await ctx.db
            .query("works")
            .withIndex("by_active_created", (q) => q.eq("isActive", true))
            .order("desc")
            .collect();
        return await Promise.all(works.map((w) => enrichWork(ctx, w)));
    },
});

// Get works by category
export const getWorksByCategory = query({
    args: { category: v.string() },
    handler: async (ctx, args) => {
        const works = await ctx.db
            .query("works")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();
        return await Promise.all(works.map((w) => enrichWork(ctx, w)));
    },
});

// Get single work by ID
export const getWorkById = query({
    args: { id: v.id("works") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// Create new work (Admin only - password validated on frontend before calling)
export const createWork = mutation({
    args: {
        category: v.string(),
        images: v.array(v.string()),
        title_ta: v.string(),
        title_en: v.string(),
        description_ta: v.string(),
        description_en: v.string(),
        price: v.optional(v.number()),
        customField1_label: v.optional(v.string()),
        customField1_value: v.optional(v.string()),
        customField2_label: v.optional(v.string()),
        customField2_value: v.optional(v.string()),
        isActive: v.optional(v.boolean()),
        createdAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { ...data } = args;
        const workId = await ctx.db.insert("works", {
            ...data,
            createdAt: args.createdAt || Date.now(),
            isActive: args.isActive !== undefined ? args.isActive : true,
        });
        return workId;
    },
});

// Update work (Admin only)
export const updateWork = mutation({
    args: {
        id: v.id("works"),
        category: v.optional(v.string()),
        images: v.optional(v.array(v.string())),
        title_ta: v.optional(v.string()),
        title_en: v.optional(v.string()),
        description_ta: v.optional(v.string()),
        description_en: v.optional(v.string()),
        price: v.optional(v.number()),
        customField1_label: v.optional(v.string()),
        customField1_value: v.optional(v.string()),
        customField2_label: v.optional(v.string()),
        customField2_value: v.optional(v.string()),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
        return id;
    },
});

// Delete work (Admin only - soft delete by setting isActive to false)
export const deleteWork = mutation({
    args: { id: v.id("works") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isActive: false });
        return args.id;
    },
});

// Hard delete work (Admin only)
export const hardDeleteWork = mutation({
    args: { id: v.id("works") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return args.id;
    },
});

// Seed initial works (Development/First-time setup only)
export const seedWorks = mutation({
    args: {},
    handler: async (ctx) => {
        const existingWorks = await ctx.db.query("works").collect();
        if (existingWorks.length > 0) return "Already seeded";

        const seedData = [
            {
                category: "Bridal",
                title_en: "Royal Emerald Aari Blouse",
                title_ta: "அரச மரகத ஆரி ஜாக்கெட்",
                description_en: "Intricate gold Aari hand embroidery on premium emerald silk, perfect for grand weddings.",
                description_ta: "முன்னணி திருமணங்களுக்காக பிரீமியம் மரகத பட்டில் நுணுக்கமான தங்க ஆரி கை தையல்.",
                images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop"],
                isActive: true,
                createdAt: Date.now(),
            },
            {
                category: "Aari Embroidery",
                title_en: "Golden Floral Pattern",
                title_ta: "தங்க மலர் வேலைப்பாடு",
                description_en: "Detailed floral embroidery featuring zardosi and bead work on pink raw silk.",
                description_ta: "இளஞ்சிவப்பு பட்டில் சர்தோசி மற்றும் மணி வேலைப்பாடுகளுடன் கூடிய விரிவான மலர் தையல்.",
                images: ["https://images.unsplash.com/photo-1590736963921-51034c641437?q=80&w=1000&auto=format&fit=crop"],
                isActive: true,
                createdAt: Date.now() - 86400000,
            },
            {
                category: "Designer Blouse",
                title_en: "Velvet Elegance",
                title_ta: "வெல்வெட் நேர்த்தி",
                description_en: "Modern velvet blouse with stone work and contemporary silhouette.",
                description_ta: "கல் வேலைப்பாடு மற்றும் நவீன வடிவமைப்புடன் கூடிய நவீன வெல்வெட் ஜாக்கெட்.",
                images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop"],
                isActive: true,
                createdAt: Date.now() - 172800000,
            }
        ];

        for (const data of seedData) {
            await ctx.db.insert("works", data);
        }
        return "Seeded successfully";
    },
});
