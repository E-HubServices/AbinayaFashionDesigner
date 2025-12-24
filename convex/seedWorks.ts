import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Seed 15 diverse tailoring work projects into the Convex database
 * Run this mutation once to populate your database with sample data
 * 
 * Usage: npx convex run works:seedWorks
 */
export const seedWorks = mutation({
    args: {},
    handler: async (ctx) => {
        // Check if works already exist
        const existingWorks = await ctx.db.query("works").collect();
        if (existingWorks.length > 0) {
            return {
                success: false,
                message: `Database already has ${existingWorks.length} works. Seeding skipped to prevent duplicates.`
            };
        }

        const now = Date.now();
        const oneDay = 86400000; // milliseconds in a day

        const seedData = [
            // BLOUSE DESIGNS (5 items)
            {
                category: "Blouse",
                title_en: "Royal Emerald Aari Blouse",
                title_ta: "அரச மரகத ஆரி ரவிக்கை",
                description_en: "Intricate gold Aari hand embroidery on premium emerald silk, perfect for grand weddings. Features peacock motifs and heavy stone work on sleeves.",
                description_ta: "முன்னணி திருமணங்களுக்காக பிரீமியம் மரகத பட்டில் நுணுக்கமான தங்க ஆரி கை தையல். கைகளில் மயில் வடிவங்கள் மற்றும் கனமான கல் வேலைப்பாடு.",
                images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000"],
                price: 4500,
                customField1_label: "Fabric Type",
                customField1_value: "Pure Silk",
                customField2_label: "Work Duration",
                customField2_value: "7-10 Days",
                isActive: true,
                createdAt: now,
            },
            {
                category: "Blouse",
                title_en: "Golden Floral Embroidery",
                title_ta: "தங்க மலர் வேலைப்பாடு",
                description_en: "Detailed floral embroidery featuring zardosi and bead work on pink raw silk. Perfect for festive occasions and traditional ceremonies.",
                description_ta: "இளஞ்சிவப்பு பட்டில் சர்தோசி மற்றும் மணி வேலைப்பாடுகளுடன் கூடிய விரிவான மலர் தையல். பண்டிகை நிகழ்வுகளுக்கு ஏற்றது.",
                images: ["https://images.unsplash.com/photo-1590736963921-51034c641437?q=80&w=1000"],
                price: 3200,
                customField1_label: "Embroidery Type",
                customField1_value: "Zardosi & Bead Work",
                customField2_label: "Occasion",
                customField2_value: "Festive & Wedding",
                isActive: true,
                createdAt: now - oneDay,
            },
            {
                category: "Blouse",
                title_en: "Velvet Elegance Designer",
                title_ta: "வெல்வெட் நேர்த்தி வடிவமைப்பு",
                description_en: "Modern velvet blouse with stone work and contemporary silhouette. Features off-shoulder design with sequin detailing.",
                description_ta: "கல் வேலைப்பாடு மற்றும் நவீன வடிவமைப்புடன் கூடிய நவீன வெல்வெட் ரவிக்கை. தோள் வடிவமைப்பு மற்றும் சீக்வின் விவரங்கள்.",
                images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000"],
                price: 2800,
                customField1_label: "Style",
                customField1_value: "Off-Shoulder Contemporary",
                customField2_label: "Material",
                customField2_value: "Premium Velvet",
                isActive: true,
                createdAt: now - (oneDay * 2),
            },
            {
                category: "Blouse",
                title_en: "Mirror Work Traditional",
                title_ta: "கண்ணாடி வேலை பாரம்பரிய",
                description_en: "Traditional Gujarati-style mirror work blouse with vibrant thread embroidery. Features backless design with tassel details.",
                description_ta: "துடிப்பான நூல் தையலுடன் கூடிய பாரம்பரிய குஜராத்தி பாணி கண்ணாடி வேலை ரவிக்கை. பின்புற வடிவமைப்பு மற்றும் குஞ்சம் விவரங்கள்.",
                images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000"],
                price: 2500,
                customField1_label: "Work Style",
                customField1_value: "Gujarati Mirror Work",
                customField2_label: "Design Feature",
                customField2_value: "Backless with Tassels",
                isActive: true,
                createdAt: now - (oneDay * 3),
            },
            {
                category: "Blouse",
                title_en: "Bridal Net Embellished",
                title_ta: "மணமகள் நெட் அலங்கார",
                description_en: "Luxurious bridal blouse in net fabric with heavy pearl and crystal embellishments. Features sweetheart neckline and illusion sleeves.",
                description_ta: "முத்து மற்றும் படிக அலங்காரங்களுடன் கூடிய ஆடம்பரமான மணமகள் நெட் ரவிக்கை. இதய வடிவ கழுத்து மற்றும் மாய கைகள்.",
                images: ["https://images.unsplash.com/photo-1583391733981-8b1a9c0fbc9b?q=80&w=1000"],
                price: 5500,
                customField1_label: "Occasion",
                customField1_value: "Bridal Exclusive",
                customField2_label: "Embellishment",
                customField2_value: "Pearl & Crystal Heavy",
                isActive: true,
                createdAt: now - (oneDay * 4),
            },

            // SALWAR DESIGNS (4 items)
            {
                category: "Salwar",
                title_en: "Anarkali Georgette Set",
                title_ta: "அனார்கலி ஜார்ஜெட் செட்",
                description_en: "Flowing Anarkali suit in georgette with intricate thread work. Comes with matching dupatta and churidar bottom.",
                description_ta: "நுணுக்கமான நூல் வேலைப்பாடுடன் கூடிய ஜார்ஜெட்டில் பாயும் அனார்கலி உடை. பொருந்தும் துப்பட்டா மற்றும் சுரிதார் பாட்டம்.",
                images: ["https://images.unsplash.com/photo-1583391265773-6cd6b3cd1f98?q=80&w=1000"],
                price: 3800,
                customField1_label: "Set Includes",
                customField1_value: "Kurta, Churidar, Dupatta",
                customField2_label: "Fabric",
                customField2_value: "Premium Georgette",
                isActive: true,
                createdAt: now - (oneDay * 5),
            },
            {
                category: "Salwar",
                title_en: "Punjabi Patiala Suit",
                title_ta: "பஞ்சாபி படியாலா உடை",
                description_en: "Traditional Punjabi Patiala suit in cotton with phulkari embroidery. Vibrant colors perfect for festivals and celebrations.",
                description_ta: "பூல்காரி தையலுடன் கூடிய பருத்தியில் பாரம்பரிய பஞ்சாபி படியாலா உடை. பண்டிகைகள் மற்றும் கொண்டாட்டங்களுக்கு ஏற்ற துடிப்பான வண்ணங்கள்.",
                images: ["https://images.unsplash.com/photo-1610030469862-0fbf36c0a4f3?q=80&w=1000"],
                price: 2200,
                customField1_label: "Style",
                customField1_value: "Patiala with Phulkari",
                customField2_label: "Stitching Time",
                customField2_value: "3-5 Days",
                isActive: true,
                createdAt: now - (oneDay * 6),
            },
            {
                category: "Salwar",
                title_en: "Palazzo Suit Modern",
                title_ta: "பலாஸோ உடை நவீன",
                description_en: "Contemporary palazzo suit with digital print kurta and solid palazzo pants. Chiffon dupatta with lace border.",
                description_ta: "டிஜிட்டல் பிரிண்ட் குர்தா மற்றும் திட பலாஸோ பேண்ட்டுடன் கூடிய சமகால பலாஸோ உடை. சரிகை விளிம்புடன் கூடிய ஷிஃபான் துப்பட்டா.",
                images: ["https://images.unsplash.com/photo-1617627143750-3c68f5be7119?q=80&w=1000"],
                price: 2800,
                customField1_label: "Design Type",
                customField1_value: "Digital Print Modern",
                customField2_label: "Bottom Style",
                customField2_value: "Wide Leg Palazzo",
                isActive: true,
                createdAt: now - (oneDay * 7),
            },
            {
                category: "Salwar",
                title_en: "Straight Cut Party Wear",
                title_ta: "ஸ்ட்ரெய்ட் கட் பார்ட்டி வேர்",
                description_en: "Elegant straight cut suit in chanderi silk with gota patti work. Perfect for evening parties and gatherings.",
                description_ta: "கோட்டா பட்டி வேலைப்பாடுடன் கூடிய சந்தேரி பட்டில் நேர்த்தியான ஸ்ட்ரெய்ட் கட் உடை. மாலை விருந்துகள் மற்றும் கூட்டங்களுக்கு ஏற்றது.",
                images: ["https://images.unsplash.com/photo-1583391265642-f66d68030c4d?q=80&w=1000"],
                price: 3500,
                customField1_label: "Embroidery",
                customField1_value: "Gota Patti Traditional",
                customField2_label: "Fabric Quality",
                customField2_value: "Chanderi Silk",
                isActive: true,
                createdAt: now - (oneDay * 8),
            },

            // FROCK DESIGNS (3 items)
            {
                category: "Frock",
                title_en: "Long Gown Evening Wear",
                title_ta: "நீண்ட கவுன் மாலை உடை",
                description_en: "Stunning floor-length evening gown in satin with corset bodice. Features flowing skirt with side slit.",
                description_ta: "கார்செட் உடலுடன் கூடிய சடினில் அதிர்ச்சியூட்டும் தரை நீள மாலை கவுன். பக்க பிளவுடன் பாயும் பாவாடை.",
                images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000"],
                price: 4200,
                customField1_label: "Style",
                customField1_value: "Floor Length Gown",
                customField2_label: "Occasion",
                customField2_value: "Evening Party/Reception",
                isActive: true,
                createdAt: now - (oneDay * 9),
            },
            {
                category: "Frock",
                title_en: "Midi Dress Floral",
                title_ta: "மிடி டிரஸ் மலர்",
                description_en: "Casual midi dress in floral print cotton with gathered waist. Perfect for daily wear and casual outings.",
                description_ta: "சேகரிக்கப்பட்ட இடுப்புடன் கூடிய மலர் பிரிண்ட் காட்டனில் சாதாரண மிடி டிரஸ். தினசரி அணியவும் சாதாரண வெளியேற்றங்களுக்கும் ஏற்றது.",
                images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000"],
                price: 1500,
                customField1_label: "Length",
                customField1_value: "Midi (Knee Length)",
                customField2_label: "Print Type",
                customField2_value: "Floral Digital Print",
                isActive: true,
                createdAt: now - (oneDay * 10),
            },
            {
                category: "Frock",
                title_en: "A-Line Party Frock",
                title_ta: "ஏ-லைன் பார்ட்டி ஃபிராக்",
                description_en: "Stylish A-line party frock in organza with sequin detailing. Features fitted bodice and flared skirt.",
                description_ta: "சீக்வின் விவரங்களுடன் கூடிய ஆர்கன்சாவில் ஸ்டைலான ஏ-லைன் பார்ட்டி ஃபிராக். பொருத்தமான உடல் மற்றும் விரிவான பாவாடை.",
                images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000"],
                price: 2600,
                customField1_label: "Silhouette",
                customField1_value: "A-Line Flared",
                customField2_label: "Work Type",
                customField2_value: "Sequin Embellished",
                isActive: true,
                createdAt: now - (oneDay * 11),
            },

            // KIDS DESIGNS (3 items)
            {
                category: "Kids",
                title_en: "Girls Party Lehenga",
                title_ta: "பெண்கள் பார்ட்டி லஹங்கா",
                description_en: "Beautiful kids lehenga set with embroidered choli and flared skirt. Includes matching dupatta. Available in multiple colors.",
                description_ta: "தையல் செய்யப்பட்ட சோலி மற்றும் விரிவான பாவாடையுடன் கூடிய அழகான குழந்தைகள் லஹங்கா செட். பொருந்தும் துப்பட்டா. பல வண்ணங்களில் கிடைக்கிறது.",
                images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000"],
                price: 1800,
                customField1_label: "Age Group",
                customField1_value: "3-12 Years",
                customField2_label: "Set Includes",
                customField2_value: "Choli, Skirt, Dupatta",
                isActive: true,
                createdAt: now - (oneDay * 12),
            },
            {
                category: "Kids",
                title_en: "Boys Kurta Pajama",
                title_ta: "சிறுவர் குர்தா பஜாமா",
                description_en: "Traditional boys kurta pajama set in cotton silk. Perfect for festivals and family functions. Comfortable and stylish.",
                description_ta: "காட்டன் பட்டில் பாரம்பரிய சிறுவர் குர்தா பஜாமா செட். பண்டிகைகள் மற்றும் குடும்ப நிகழ்வுகளுக்கு ஏற்றது. வசதியான மற்றும் ஸ்டைலான.",
                images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=1000"],
                price: 1200,
                customField1_label: "Size Range",
                customField1_value: "2-14 Years",
                customField2_label: "Material",
                customField2_value: "Cotton Silk Blend",
                isActive: true,
                createdAt: now - (oneDay * 13),
            },
            {
                category: "Kids",
                title_en: "Baby Girl Frock Set",
                title_ta: "பேபி பெண் ஃபிராக் செட்",
                description_en: "Adorable frock for toddlers with bow details and frills. Soft cotton fabric perfect for sensitive skin. Comes with matching bloomers.",
                description_ta: "வில் விவரங்கள் மற்றும் விளிம்புகளுடன் கூடிய குழந்தைகளுக்கான அழகான ஃபிராக். உணர்திறன் தோலுக்கு ஏற்ற மென்மையான காட்டன் துணி. பொருந்தும் பூக்களுடன்.",
                images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000"],
                price: 900,
                customField1_label: "Age Group",
                customField1_value: "6 Months - 3 Years",
                customField2_label: "Features",
                customField2_value: "Soft Cotton, Bow & Frills",
                isActive: true,
                createdAt: now - (oneDay * 14),
            },
        ];

        // Insert all seed data
        const insertedIds = [];
        for (const work of seedData) {
            const id = await ctx.db.insert("works", work);
            insertedIds.push(id);
        }

        return {
            success: true,
            message: `Successfully seeded ${seedData.length} works into the database!`,
            insertedCount: insertedIds.length,
            categories: {
                Blouse: 5,
                Salwar: 4,
                Frock: 3,
                Kids: 3
            }
        };
    },
});