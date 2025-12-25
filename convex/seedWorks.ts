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
                images: ["/Blouse1.jpg"],
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
                images: ["/Blouse2.jpg"],
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
                images: ["/Blouse3.jpg"],
                price: 2800,
                customField1_label: "Style",
                customField1_value: "Off-Shoulder Contemporary",
                customField2_label: "Material",
                customField2_value: "Premium Velvet",
                isActive: true,
                createdAt: now - (oneDay * 2),
            },
            {
                category: "Half-Saree",
                title_en: "Traditional Half-Saree Set",
                title_ta: "பாரம்பரிய தாவணி செட்",
                description_en: "Elegant half-saree with traditional borders and intricate blouse work. Perfect for teen ceremonies and festive occasions.",
                description_ta: "பாரம்பரிய பார்டர்கள் மற்றும் நுணுக்கமான ரவிக்கை வேலைப்பாடுகளுடன் கூடிய நேர்த்தியான தாவணி. இளம்பருவ விழாக்கள் மற்றும் பண்டிகை நிகழ்வுகளுக்கு ஏற்றது.",
                images: ["/Half-Saree.jpg"],
                price: 5500,
                customField1_label: "Work Style",
                customField1_value: "Heavy Zardosi",
                customField2_label: "Design Feature",
                customField2_value: "Traditional Border",
                isActive: true,
                createdAt: now - (oneDay * 3),
            },
            {
                category: "Half-Saree",
                title_en: "Bridal Half-Saree Collection",
                title_ta: "மணமகள் தாவணி சேகரிப்பு",
                description_en: "Premium bridal half-saree with heavy pearl and crystal embellishments. Features exquisite craftsmanship and rich fabric.",
                description_ta: "முத்து மற்றும் படிக அலங்காரங்களுடன் கூடிய பிரீமியம் மணமகள் தாவணி. நேர்த்தியான கைவினைத்திறன் மற்றும் பணக்கார துணி கொண்டது.",
                images: ["/Half-Saree2.jpg"],
                price: 7500,
                customField1_label: "Occasion",
                customField1_value: "Bridal Exclusive",
                customField2_label: "Embellishment",
                customField2_value: "Pearl & Crystal Heavy",
                isActive: true,
                createdAt: now - (oneDay * 4),
            },

            // SALWAR/FROCK DESIGNS (6 items)
            {
                category: "Frock",
                title_en: "Designer Party Frok",
                title_ta: "டிசைனர் பார்ட்டி ஃபிராக்",
                description_en: "Beautifully designed party frok with elegant details. Perfect for special occasions and themed events.",
                description_ta: "நேர்த்தியான விவரங்களுடன் அழகாக வடிவமைக்கப்பட்ட பார்ட்டி ஃபிராக். சிறப்பு நிகழ்வுகள் மற்றும் கருப்பொருள் நிகழ்வுகளுக்கு ஏற்றது.",
                images: ["/Frok.jpg"],
                price: 3800,
                customField1_label: "Set Includes",
                customField1_value: "Frok with Matching Headband",
                customField2_label: "Fabric",
                customField2_value: "Premium Silk Blend",
                isActive: true,
                createdAt: now - (oneDay * 5),
            },
            {
                category: "Frock",
                title_en: "Elegant Evening Frok",
                title_ta: "நேர்த்தியான மாலை ஃபிராக்",
                description_en: "Classic evening frok with a modern silhouette. Simple yet sophisticated design for parties.",
                description_ta: "நவீன வடிவமைப்புடன் கூடிய கிளாசிக் மாலை ஃபிராக். விருந்துகளுக்கு எளிமையான மற்றும் அதிநவீன வடிவமைப்பு.",
                images: ["/Frok2.jpg"],
                price: 3200,
                customField1_label: "Style",
                customField1_value: "A-Line Frok",
                customField2_label: "Stitching Time",
                customField2_value: "3-5 Days",
                isActive: true,
                createdAt: now - (oneDay * 6),
            },
            {
                category: "Salwar",
                title_en: "Palazzo Suit Modern",
                title_ta: "பலாஸோ உடை நவீன",
                description_en: "Contemporary palazzo suit with digital print kurta and solid palazzo pants.",
                description_ta: "டிஜிட்டல் பிரிண்ட் குர்தா மற்றும் திட பலாஸோ பேண்ட்டுடன் கூடிய சமகால பலாஸோ உடை.",
                images: ["/hero3.jpg"],
                price: 2800,
                customField1_label: "Design Type",
                customField1_value: "Modern Cut",
                customField2_label: "Bottom Style",
                customField2_value: "Wide Leg Palazzo",
                isActive: true,
                createdAt: now - (oneDay * 7),
            },
            {
                category: "Salwar",
                title_en: "Straight Cut Party Wear",
                title_ta: "ஸ்ட்ரெய்ட் கட் பார்ட்டி வேர்",
                description_en: "Elegant straight cut suit in silk. Perfect for evening parties and gatherings.",
                description_ta: "பட்டில் நேர்த்தியான ஸ்ட்ரெய்ட் கட் உடை. மாலை விருந்துகள் மற்றும் கூட்டங்களுக்கு ஏற்றது.",
                images: ["/hero3.jpg"],
                price: 3500,
                customField1_label: "Embroidery",
                customField1_value: "Gota Patti",
                customField2_label: "Fabric Quality",
                customField2_value: "Chanderi Silk",
                isActive: true,
                createdAt: now - (oneDay * 8),
            },

            // KIDS DESIGNS (3 items)
            {
                category: "Kids",
                title_en: "Girls Party Frock",
                title_ta: "பெண்கள் பார்ட்டி ஃபிராக்",
                description_en: "Stunning kids frock with corset bodice. Features flowing skirt.",
                description_ta: "கார்செட் உடலுடன் கூடிய அழகான குழந்தைகள் ஃபிராக். பாயும் பாவாடை கொண்டது.",
                images: ["/hero3.jpg"],
                price: 4200,
                customField1_label: "Style",
                customField1_value: "Party Gown",
                customField2_label: "Occasion",
                customField2_value: "Party/Reception",
                isActive: true,
                createdAt: now - (oneDay * 9),
            },
            {
                category: "Kids",
                title_en: "Traditional Kids Wear",
                title_ta: "பாரம்பரிய குழந்தைகள் உடை",
                description_en: "Traditional ethnic wear for kids in soft fabric. Perfect for ceremonies.",
                description_ta: "மென்மையான துணியில் குழந்தைகளுக்கான பாரம்பரிய உடை. விழாக்களுக்கு ஏற்றது.",
                images: ["/hero3.jpg"],
                price: 1500,
                customField1_label: "Length",
                customField1_value: "Traditional",
                customField2_label: "Print Type",
                customField2_value: "Ethnic Print",
                isActive: true,
                createdAt: now - (oneDay * 10),
            },
            {
                category: "Kids",
                title_en: "A-Line Kids Frock",
                title_ta: "ஏ-லைன் குழந்தைகள் ஃபிராக்",
                description_en: "Stylish A-line frock in organza with sequin detailing.",
                description_ta: "சீக்வின் விவரங்களுடன் கூடிய ஆர்கன்சாவில் ஸ்டைலான ஏ-லைன் ஃபிராக்.",
                images: ["/hero3.jpg"],
                price: 2600,
                customField1_label: "Silhouette",
                customField1_value: "A-Line",
                customField2_label: "Work Type",
                customField2_value: "Sequin",
                isActive: true,
                createdAt: now - (oneDay * 11),
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