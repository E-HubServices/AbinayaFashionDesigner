"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Search, MessageSquare, Scissors } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
    const { language, t } = useLanguage();

    const steps = [
        {
            num: "01",
            icon: Search,
            title: language === "ta" ? "வடிவமைப்பை தேர்வு செய்க" : "View Designs",
            desc: language === "ta" ? "எங்கள் சமீபத்திய சேகரிப்பிலிருந்து உங்களுக்கு பிடித்த வடிவமைப்பைத் தேர்ந்தெடுக்கவும்." : "Browse our curated collection of bridal and boutique designs."
        },
        {
            num: "02",
            icon: MessageSquare,
            title: language === "ta" ? "வாட்ஸ்அப்-ல் பேசுங்கள்" : "Talk on WhatsApp",
            desc: language === "ta" ? "உங்கள் தேவைகளைப் பகிர்ந்து ஆலோசனையைப் பெறுங்கள்." : "Message us your requirements and get expert consultation."
        },
        {
            num: "03",
            icon: Scissors,
            title: language === "ta" ? "அளவெடுத்து தைக்கவும்" : "Stitch to Perfection",
            desc: language === "ta" ? "மிகவும் துல்லியமான அளவீடுகளுடன் உங்களின் உடை தயாராகும்." : "Your garment is crafted with precision to match your fit."
        },
    ];

    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-24"></div>

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`text-4xl md:text-5xl font-serif text-primary-dark mb-4 ${language === "ta" ? "tamil-text" : ""}`}
                    >
                        {t("howItWorks")}
                    </motion.h2>
                    <div className="h-[2px] w-24 bg-accent mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative text-center"
                        >
                            <div className="mb-8 relative inline-flex">
                                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative w-24 h-24 bg-white shadow-xl rounded-full border border-accent/10 flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-white transition-all duration-500">
                                    <step.icon size={32} strokeWidth={1.5} />
                                </div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent text-primary-dark rounded-full flex items-center justify-center font-serif text-lg font-bold shadow-lg border-2 border-white">
                                    {step.num}
                                </div>
                            </div>

                            <h3 className={`text-xl font-serif text-foreground mb-4 group-hover:text-primary-dark transition-colors ${language === "ta" ? "tamil-text" : ""}`}>
                                {step.title}
                            </h3>
                            <p className="text-foreground-muted text-sm leading-relaxed px-4">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
