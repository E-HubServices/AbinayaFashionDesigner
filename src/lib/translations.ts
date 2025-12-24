export const translations = {
    ta: {
        // Navigation
        home: "முகப்பு",
        works: "வேலைகள்",
        about: "எங்களை பற்றி",
        contact: "தொடர்பு",

        // Hero Section
        brandName: "ABI Fashion Designer",
        tagline: "30+ ஆண்டுகளின் அனுபவம் கொண்ட நம்பகமான தையல் சேவை",
        viewDesigns: "டிசைன்களை பார்க்க",

        // About
        aboutTitle: "எங்களை பற்றி",
        experience: "அனுபவம்",
        years: "30+ ஆண்டுகள்",
        specializations: "சிறப்பு திறன்கள்",

        // Categories
        blouse: "ப்ளவுஸ்",
        bridal: "திருமண ப்ளவுஸ்",
        aariEmbroidery: "ஆரி எம்ப்ராய்டரி",
        alterations: "மாற்றங்கள்",

        // How It Works
        howItWorks: "இது எப்படி வேலை செய்கிறது",
        step1Title: "டிசைன்களை பார்க்கவும்",
        step1Desc: "எங்கள் வேலைகளின் தொகுப்பை உலாவவும்",
        step2Title: "WhatsApp இல் தொடர்பு கொள்ளவும்",
        step2Desc: "உங்களுக்கு பிடித்த டிசைனை தேர்ந்தெடுத்து எங்களுக்கு செய்தி அனுப்பவும்",
        step3Title: "தையல் விவாதம்",
        step3Desc: "விவரங்களை விவாதிக்க நேரில் சந்திக்கவும்",

        // CTA
        requestOnWhatsApp: "WhatsApp இல் கோரிக்கை",
        contactUs: "எங்களை தொடர்பு கொள்ளவும்",
        viewAll: "அனைத்தையும் பார்க்க",
        viewWorks: "வேலைப்பாடுகளைக் காண்க",

        // Footer
        address: "முகவரி",
        phone: "தொலைபேசி",
        followUs: "எங்களை பின்தொடரவும்",

        // Admin
        adminSettings: "நிர்வாக அமைப்புகள்",
        enterPassword: "கடவுச்சொல்லை உள்ளிடவும்",
        login: "உள்நுழைய",
        logout: "வெளியேறு",
        addNewWork: "புதிய வேலையை சேர்க்கவும்",
        editWork: "வேலையை திருத்தவும்",
        deleteWork: "வேலையை நீக்கவும்",

        // Chat
        chatWithUs: "எங்களுடன் அரட்டையடிக்கவும்",
        typeMessage: "செய்தியை தட்டச்சு செய்யவும்...",
        send: "அனுப்பு",

        // WhatsApp Message Templates
        whatsappGreeting: "வணக்கம் Abi Fashion Designer,",
        whatsappLiked: "உங்கள் இணையதளத்தில் இருந்து இந்த டிசைனை நான் விரும்பினேன்.",
        whatsappCategory: "வகை:",
        whatsappContact: "தயவுசெய்து என்னை தொடர்பு கொள்ளவும்.",
    },
    en: {
        // Navigation
        home: "Home",
        works: "Works",
        about: "About",
        contact: "Contact",

        // Hero Section
        brandName: "ABI Fashion Designer",
        tagline: "Trusted Tailoring Service with 30+ Years of Experience",
        viewDesigns: "View Designs",

        // About
        aboutTitle: "About Us",
        experience: "Experience",
        years: "30+ Years",
        specializations: "Specializations",

        // Categories
        blouse: "Blouse",
        bridal: "Bridal Blouse",
        aariEmbroidery: "Aari Embroidery",
        alterations: "Alterations",

        // How It Works
        howItWorks: "How It Works",
        step1Title: "View Designs",
        step1Desc: "Browse our collection of works",
        step2Title: "Contact on WhatsApp",
        step2Desc: "Select your favorite design and message us",
        step3Title: "Stitching Discussion",
        step3Desc: "Meet in person to discuss details",

        // CTA
        requestOnWhatsApp: "Request on WhatsApp",
        contactUs: "Contact Us",
        viewAll: "View All",
        viewWorks: "View Works",

        // Footer
        address: "Address",
        phone: "Phone",
        followUs: "Follow Us",

        // Admin
        adminSettings: "Admin Settings",
        enterPassword: "Enter Password",
        login: "Login",
        logout: "Logout",
        addNewWork: "Add New Work",
        editWork: "Edit Work",
        deleteWork: "Delete Work",

        // Chat
        chatWithUs: "Chat with Us",
        typeMessage: "Type a message...",
        send: "Send",

        // WhatsApp Message Templates
        whatsappGreeting: "Hello Abi Fashion Designer,",
        whatsappLiked: "I liked this design from your website.",
        whatsappCategory: "Category:",
        whatsappContact: "Please contact me.",
    },
};

export type Language = "ta" | "en";
export type TranslationKey = keyof typeof translations.ta;
