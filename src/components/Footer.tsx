import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, MessageCircle, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    const { language, t } = useLanguage();

    return (
        <footer id="contact" className="bg-primary text-white pt-32 pb-16 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="grid md:grid-cols-4 gap-20 mb-20">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 space-y-10">
                        <div className="flex flex-col">
                            <span className="font-serif text-5xl font-bold tracking-tighter text-white">ABI</span>
                            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-black mt-1">Fashion Designer</span>
                        </div>
                        <p className="text-white/60 leading-relaxed max-w-sm text-lg font-light">
                            Crafting elegance since 2012. Specializing in bespoke bridal couture and intricate Aari embroidery that celebrates your unique story.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, href: "https://instagram.com/abi_couture" },
                                { icon: MessageCircle, href: "https://wa.me/919788078748" },
                                { icon: Phone, href: "tel:+919788078748" }
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all duration-500 hover:-translate-y-1 shadow-lg"
                                >
                                    <item.icon size={20} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-accent">Navigation</h4>
                        <ul className="space-y-6">
                            {(["home", "works", "about"] as const).map((key) => (
                                <li key={key}>
                                    <Link
                                        to={key === "home" ? "/" : key === "works" ? "/works" : `#${key}`}
                                        className="text-white/60 hover:text-accent transition-all text-sm font-bold uppercase tracking-widest flex items-center gap-3 group"
                                    >
                                        <div className="w-0 h-px bg-accent group-hover:w-4 transition-all" />
                                        {language === "ta" && key === "home" ? "முகப்பு" :
                                            language === "ta" && key === "works" ? "படைப்புகள்" :
                                                language === "ta" && key === "about" ? "பற்றி" :
                                                    key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "919788078748"}?text=${encodeURIComponent(language === "ta" ? "வணக்கம் ABI ஃபேஷன்! 🌸 நான் உங்கள் சேவைகளைப் பற்றி அறிய விரும்புகிறேன்." : "Hello ABI Fashion! 🌸 I'm interested in your bespoke design services.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-white/90 hover:text-accent transition-all text-sm font-bold uppercase tracking-widest group"
                                >
                                    <div className="w-0 h-px bg-accent group-hover:w-4 transition-all" />
                                    <MessageCircle size={14} className="text-accent" />
                                    <span>{language === "ta" ? "WhatsApp வினவல்" : "WhatsApp Inquiry"}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-accent">Get in Touch</h4>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                                    <MapPin size={18} />
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed font-medium">Boutique Address,<br />Tamil Nadu, India</p>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                                    <Mail size={18} />
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed font-medium">hello@abifashion.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black">
                            © {new Date().getFullYear()} ABI Fashion Designer. All Rights Reserved.
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">
                            Developed by <span className="text-accent underline decoration-accent/50 underline-offset-4 cursor-pointer hover:text-white transition-colors">Manoj</span>
                            <span className="mx-2 text-white/20">|</span>
                            <a href="mailto:manoj12k6@gmail.com" className="hover:text-white transition-colors">manoj12k6@gmail.com</a>
                        </p>
                    </div>
                    <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">
                        <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
