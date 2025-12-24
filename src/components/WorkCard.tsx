import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Eye, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import WorkDetailsModal from "./WorkDetailsModal";

interface WorkCardProps {
    work: {
        _id: string;
        category: string;
        images: string[];
        title_ta: string;
        title_en: string;
        description_ta: string;
        description_en: string;
        price?: number;
        customField1_label?: string;
        customField1_value?: string;
        customField2_label?: string;
        customField2_value?: string;
    };
}

export default function WorkCard({ work }: WorkCardProps) {
    const { language } = useLanguage();
    const [showDetails, setShowDetails] = useState(false);

    const title = language === "ta" ? work.title_ta : work.title_en;
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919788078748";
    const message = language === "ta"
        ? `வணக்கம்! ${work.title_ta} பற்றி மேலும் தெரிந்து கொள்ள விரும்புகிறேன்.`
        : `Hello! I'm interested in learning more about ${work.title_en}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white rounded-[3rem] overflow-hidden border border-border/40 hover:border-accent/40 shadow-sm hover:shadow-premium transition-all duration-700 h-full flex flex-col"
            >
                {/* Artistic Image Showcase */}
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
                    {work.images && work.images.length > 0 ? (
                        <img
                            src={work.images[0]}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10">
                            <Sparkles size={64} strokeWidth={0.5} />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black mt-4">Masterpiece Pending</span>
                        </div>
                    )}

                    {/* Advanced Overlay System */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Status Badges */}
                    <div className="absolute top-8 left-8 flex flex-col gap-3">
                        <span className="px-5 py-2 glass border-none rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-primary shadow-lg">
                            {work.category}
                        </span>
                    </div>

                    {/* Action Buttons - Cinematic Reveal */}
                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-700 flex flex-col gap-3">
                        <button
                            onClick={() => setShowDetails(true)}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-primary rounded-[2rem] font-black uppercase tracking-[0.25em] text-[10px] shadow-2xl hover:bg-accent hover:text-white transition-all duration-500"
                        >
                            <Eye size={18} strokeWidth={2.5} />
                            <span>{language === "ta" ? "விவரங்கள்" : "View Details"}</span>
                        </button>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-[2rem] font-black uppercase tracking-[0.25em] text-[10px] shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-500 hover:scale-105"
                        >
                            <MessageCircle size={18} strokeWidth={2.5} />
                            <span>{language === "ta" ? "WhatsApp" : "WhatsApp"}</span>
                        </a>
                    </div>
                </div>

                {/* Typography Section */}
                <div className="p-10 flex-grow flex flex-col justify-between text-center bg-white relative z-10 transition-colors duration-700 group-hover:bg-primary/5">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px flex-1 bg-border/40 group-hover:bg-accent/20" />
                            <Sparkles size={12} className="text-accent/40 group-hover:text-accent" />
                            <div className="h-px flex-1 bg-border/40 group-hover:bg-accent/20" />
                        </div>

                        <h3 className={`text-4xl font-serif text-primary tracking-tight leading-tight group-hover:text-accent transition-colors duration-700 px-2 ${language === "ta" ? "tamil-text leading-relaxed" : ""}`}>
                            {title}
                        </h3>

                        {work.price && (
                            <div className="pt-4">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full font-bold text-sm border-2 border-emerald-200">
                                    ₹{work.price.toLocaleString('en-IN')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 p-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent group-hover:animate-ping" />
                </div>
            </motion.div>

            {/* Details Modal */}
            <WorkDetailsModal work={work} isOpen={showDetails} onClose={() => setShowDetails(false)} />
        </>
    );
}
