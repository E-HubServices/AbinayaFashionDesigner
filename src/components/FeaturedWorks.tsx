import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturedWorks() {
    const { language, t } = useLanguage();

    const collections = [
        { id: 1, name: "Bridal Couture", sub: "Signature Silk", img: "/Half-Saree.jpg", size: "large" },
        { id: 2, name: "Aari Artistry", sub: "Hand-Threaded", img: "/Blouse1.jpg", size: "tall" },
        { id: 3, name: "Designer Salwars", sub: "Modern Fit", img: "/Half-Saree2.jpg", size: "tall" },
        { id: 4, name: "Kids Ethnic", sub: "Soft & Pure", img: "/Frok.jpg", size: "small" },
        { id: 5, name: "Western Fusion", sub: "Chic & Fluid", img: "/Frok2.jpg", size: "small" },
    ];

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6">

                {/* Header - High End Editorial Style */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 text-accent">
                            <Sparkles size={16} />
                            <span className="text-[10px] uppercase tracking-[0.5em] font-black">Archive Edit</span>
                        </div>
                        <h2 className={`text-6xl md:text-8xl font-serif text-primary tracking-tighter leading-[0.9] ${language === "ta" ? "tamil-text" : ""}`}>
                            {language === "ta" ? (
                                "நேர்த்தியான தொகுப்பு"
                            ) : (
                                <>
                                    Masterpieces in <br />
                                    <span className="italic text-accent">Fine Thread</span>
                                </>
                            )}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-sm space-y-8"
                    >
                        <p className="text-muted-foreground text-lg font-light leading-relaxed border-l-2 border-accent/20 pl-8">
                            Experience the definitive collection of Tamil Nadu's finest couture. From the meticulous precision of Aari art to contemporary designer silhouettes.
                        </p>
                        <Link to="/works" className="group inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] text-primary hover:text-accent transition-all duration-500">
                            <span>{t("viewAll")}</span>
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-700 transform group-hover:translate-x-3 shadow-sm">
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Grid - Artistic Bento Layout */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[280px]">
                    {collections.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative overflow-hidden rounded-[4rem] bg-surface-muted border border-border/40 shadow-sm hover:shadow-premium transition-all duration-700",
                                item.size === "large" ? "md:col-span-4 md:row-span-2" :
                                    item.size === "tall" ? "md:col-span-2 md:row-span-2" : "md:col-span-3"
                            )}
                        >
                            {/* Deep Parallax Background */}
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                                style={{ backgroundImage: `url('${item.img}')` }} />

                            {/* Artistic Gradient Overlay - Changed from black to primary */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Content Interface */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-black block mb-2">{item.sub}</span>
                                        <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide italic">{item.name}</h3>
                                    </div>
                                    <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-dark text-[10px] uppercase tracking-widest text-white font-black">
                                            View Piece <ChevronRight size={12} className="text-accent" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture Decorations */}
            <div className="absolute -bottom-40 -left-20 opacity-[0.02] pointer-events-none select-none">
                <span className="text-[30vw] font-serif font-black tracking-tighter">COUTURE</span>
            </div>
        </section>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
