import { MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/contexts/ChatContext";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatIcon() {
    const { language } = useLanguage();
    const { setIsOpen } = useChat();
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

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-glow hover:bg-accent hover:scale-110 transition-all duration-300 group"
                    aria-label="Toggle AI Concierge"
                >
                    <Sparkles size={24} className="group-hover:animate-pulse" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
