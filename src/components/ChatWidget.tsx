"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useAction } from "convex/react";
import { api } from "@convex/_generated/api";
import { useChat } from "@/contexts/ChatContext";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatWidget() {
    const { language, t } = useLanguage();
    const { isOpen, setIsOpen } = useChat();

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [sessionId] = useState(() => {
        const saved = localStorage.getItem("chat_session_id");
        if (saved) return saved;
        const newId = Math.random().toString(36).substring(7);
        localStorage.setItem("chat_session_id", newId);
        return newId;
    });

    const chatAction = useAction(api.ai.chatWithAssistant);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await chatAction({
                sessionId,
                message: userMessage,
                language: language,
            });

            if (response) {
                setMessages((prev) => [...prev, { role: "assistant", content: response }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: language === "ta"
                        ? "மன்னிக்கவும், என்னால் இப்பொழுது பதிலளிக்க முடியவில்லை."
                        : "Our concierge is temporarily unavailable. Please try again shortly.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
                        className="glass rounded-[2.5rem] w-[400px] max-w-[calc(100vw-4rem)] h-[600px] max-h-[80vh] flex flex-col overflow-hidden mb-6 pointer-events-auto shadow- premium border-white/40"
                    >
                        {/* Elegant Concierge Header */}
                        <div className="p-8 border-b border-border/20 bg-primary flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles size={120} strokeWidth={0.5} className="text-white" />
                            </div>

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg">
                                    <Sparkles size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-white text-xl tracking-wide leading-none">
                                        {language === "ta" ? "உதவியாளர்" : "Studio Concierge"}
                                    </h3>
                                    <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-black mt-2 block">Powered by AI Artistry</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all relative z-10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Interactive Message Stage */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white/40 backdrop-blur-md">
                            {messages.length === 0 && (
                                <div className="text-center py-20 space-y-6">
                                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto">
                                        <MessageCircle size={32} strokeWidth={1} />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-serif text-2xl text-primary font-medium italic">Welcome to the Studio.</p>
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted max-w-[200px] mx-auto leading-relaxed">
                                            {language === "ta" ? "என்னிடம் உங்கள் கேள்விகளைக் கேளுங்கள்." : "Inquire about our latest collections or bespoke services."}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                            ? "bg-primary text-white rounded-br-none"
                                            : "glass text-primary rounded-bl-none border-border/40 font-medium"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="glass p-5 rounded-[1.8rem] rounded-bl-none">
                                        <div className="flex gap-2">
                                            <span className="w-1 h-1 bg-accent rounded-full animate-bounce"></span>
                                            <span className="w-1 h-1 bg-accent rounded-full animate-bounce delay-150"></span>
                                            <span className="w-1 h-1 bg-accent rounded-full animate-bounce delay-300"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Sculptural Input Console */}
                        <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-border/20">
                            <div className="relative flex items-center group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={language === "ta" ? "உங்கள் வினவலை தட்டச்சு செய்யவும்..." : "Your design inquiry..."}
                                    className="w-full bg-surface-muted border border-transparent focus:border-accent/40 rounded-full pl-6 pr-16 py-4 text-sm outline-none transition-all shadow-inner font-medium text-primary"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-1.5 p-3.5 bg-primary text-white rounded-full hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl group-hover:scale-105"
                                >
                                    {isLoading ? <Loader2 size={18} className="animate-spin text-accent" /> : <Send size={18} />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
