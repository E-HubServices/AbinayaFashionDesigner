import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    works: defineTable({
        category: v.string(), // "Blouse", "Salwar", "Frock", "Kids"
        images: v.array(v.string()), // Array of image URLs or Convex storage IDs
        title_ta: v.string(), // Tamil title
        title_en: v.string(), // English title
        description_ta: v.string(), // Tamil description
        description_en: v.string(), // English description
        price: v.optional(v.number()), // Price in INR (optional)
        customField1_label: v.optional(v.string()), // Custom field 1 label (e.g., "Fabric Type", "Work Duration")
        customField1_value: v.optional(v.string()), // Custom field 1 value
        customField2_label: v.optional(v.string()), // Custom field 2 label (e.g., "Stitching Time", "Special Notes")
        customField2_value: v.optional(v.string()), // Custom field 2 value
        createdAt: v.number(), // Timestamp
        isActive: v.boolean(), // Whether to show this work
    }).index("by_category", ["category"])
        .index("by_active_created", ["isActive", "createdAt"])
        .index("by_created", ["createdAt"]),

    settings: defineTable({
        key: v.string(), // "adminPasswordHash"
        value: v.string(), // The hashed password
    }).index("by_key", ["key"]),

    chatMessages: defineTable({
        sessionId: v.string(), // Unique session ID for each visitor
        role: v.string(), // "user" or "assistant"
        content: v.string(), // Message content
        language: v.string(), // "ta" or "en"
        timestamp: v.number(),
    }).index("by_session", ["sessionId"])
        .index("by_timestamp", ["timestamp"]),

    categories: defineTable({
        name: v.string(), // Category name (e.g., "Blouse", "Salwar")
        name_ta: v.optional(v.string()), // Tamil name
        displayOrder: v.number(), // Order to display categories
        isActive: v.boolean(), // Whether to show this category
        createdAt: v.number(),
    }).index("by_active_order", ["isActive", "displayOrder"])
        .index("by_order", ["displayOrder"]),
});
