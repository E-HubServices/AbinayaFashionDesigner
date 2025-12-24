import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, IndianRupee, Tag, Calendar, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface WorkDetailsModalProps {
    work: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function WorkDetailsModal({ work, isOpen, onClose }: WorkDetailsModalProps) {
    const { language } = useLanguage();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!isOpen || !work) return null;

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919788078748";
    const message = language === "ta"
        ? `வணக்கம்! ${work.title_ta} பற்றி மேலும் தெரிந்து கொள்ள விரும்புகிறேன்.`
        : `Hello! I'm interested in learning more about ${work.title_en}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-white rounded-[4rem] max-w-6xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto border-4 border-primary/10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-10 p-4 bg-white/90 hover:bg-white rounded-full transition-all text-primary/60 hover:text-primary shadow-xl"
                        >
                            <X size={24} strokeWidth={2.5} />
                        </button>

                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Image Gallery */}
                            <div className="relative bg-gradient-to-br from-teal-50 to-amber-50 p-8 md:p-12">
                                <div className="sticky top-8">
                                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white">
                                        {work.images && work.images.length > 0 ? (
                                            <img
                                                src={work.images[currentImageIndex]}
                                                alt={language === "ta" ? work.title_ta : work.title_en}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-primary/20">
                                                <Sparkles size={64} strokeWidth={1} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Image Thumbnails */}
                                    {work.images && work.images.length > 1 && (
                                        <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                                            {work.images.map((img: string, idx: number) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all ${currentImageIndex === idx
                                                        ? "border-accent shadow-lg scale-110"
                                                        : "border-white/50 hover:border-accent/50"
                                                        }`}
                                                >
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="mt-6">
                                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent/10 to-amber-100 text-accent rounded-full text-sm font-black uppercase tracking-widest border-2 border-accent/20">
                                            <Tag size={16} />
                                            {work.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="p-8 md:p-12 space-y-8">
                                {/* Title */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-accent">
                                        <Sparkles size={18} strokeWidth={2.5} />
                                        <span className="text-xs uppercase tracking-[0.4em] font-black">
                                            {language === "ta" ? "படைப்பு விவரங்கள்" : "Masterpiece Details"}
                                        </span>
                                    </div>
                                    <h2 className={`text-5xl md:text-6xl font-serif font-bold text-primary leading-tight ${language === "ta" ? "tamil-text" : ""}`}>
                                        {language === "ta" ? work.title_ta : work.title_en}
                                    </h2>
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <h3 className="text-sm uppercase tracking-widest font-black text-primary/60">
                                        {language === "ta" ? "விவரம்" : "Description"}
                                    </h3>
                                    <p className="text-lg text-primary/80 leading-relaxed font-medium">
                                        {language === "ta" ? work.description_ta : work.description_en}
                                    </p>
                                </div>

                                {/* Price */}
                                {work.price && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm uppercase tracking-widest font-black text-primary/60">
                                            {language === "ta" ? "விலை" : "Price"}
                                        </h3>
                                        <div className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-50 text-emerald-700 rounded-3xl font-bold text-2xl border-2 border-emerald-200">
                                            <IndianRupee size={24} strokeWidth={3} />
                                            {work.price.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                )}

                                {/* Custom Fields */}
                                {(work.customField1_label || work.customField2_label) && (
                                    <div className="space-y-4 pt-4 border-t-2 border-primary/10">
                                        {work.customField1_label && work.customField1_value && (
                                            <div className="flex items-start gap-4">
                                                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                                                <div>
                                                    <p className="text-xs uppercase tracking-widest font-black text-primary/60">
                                                        {work.customField1_label}
                                                    </p>
                                                    <p className="text-base font-semibold text-primary mt-1">
                                                        {work.customField1_value}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {work.customField2_label && work.customField2_value && (
                                            <div className="flex items-start gap-4">
                                                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                                                <div>
                                                    <p className="text-xs uppercase tracking-widest font-black text-primary/60">
                                                        {work.customField2_label}
                                                    </p>
                                                    <p className="text-base font-semibold text-primary mt-1">
                                                        {work.customField2_value}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* WhatsApp CTA */}
                                <div className="pt-8">
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-4 px-8 py-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl hover:shadow-[#25D366]/50 transition-all hover:scale-105"
                                    >
                                        <MessageCircle size={24} strokeWidth={2.5} />
                                        <span>{language === "ta" ? "WhatsApp மூலம் விசாரிக்கவும்" : "Inquire via WhatsApp"}</span>
                                    </a>
                                    <p className="text-center text-xs text-primary/40 mt-4 uppercase tracking-widest font-semibold">
                                        {language === "ta" ? "உடனடி பதில்" : "Instant Response"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
