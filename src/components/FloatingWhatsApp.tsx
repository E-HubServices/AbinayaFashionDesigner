import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatIcon() {
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919788078748";
    const message = language === "ta"
        ? "வணக்கம் ABI ஃபேஷன்! 🌸 நான் உங்கள் பிரீமியம் தையல் சேவைகளைப் பற்றி அறிய விரும்புகிறேன். குறிப்பாக ஆரி வேலைப்பாடுகள் மற்றும் திருமண ஆடைகள் பற்றிய விபரங்கள், தையல் கட்டணங்கள் மற்றும் நேரம் ஒதுக்குதல் பற்றி அறிய விரும்புகிறேன்."
        : "Hello ABI Fashion! 🌸 I'm mesmerized by your couture archive. I'm interested in your premium bespoke services and would like to inquire about custom bridal/Aari work details, pricing, and the appointment process. Looking forward to your guidance!";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-glow hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 group"
                    aria-label="Inquire on WhatsApp"
                >
                    <MessageCircle size={28} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
                </motion.a>
            )}
        </AnimatePresence>
    );
}
