import { useLanguage } from "@/contexts/LanguageContext";
import { Scissors, Award, Heart, Sparkles, Star, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
    const { language } = useLanguage();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const stats = [
        { id: 1, label: "Years of Heritage", value: "12+", tamil: "வருட அனுபவம்" },
        { id: 2, label: "Bespoke Creations", value: "2K+", tamil: "தனித்துவமான வடிவமைப்புகள்" },
        { id: 3, label: "Global Clientele", value: "15+", tamil: "சர்வதேச வாடிக்கையாளர்கள்" },
    ];

    const specs = [
        { icon: Scissors, en: "Bespoke Tailoring", ta: "தனிப்பயன் தையல்", desc: "Precision fit for your unique silhouette." },
        { icon: Sparkles, en: "Exquisite Aari", ta: "சிறந்த ஆரி வேலை", desc: "Masterful embroidery with golden threads." },
        { icon: Award, en: "Bridal Couture", ta: "திருமண ஆடை", desc: "Exclusive designs for your special day." },
        { icon: Heart, en: "Perfect Finish", ta: "சரியான பொருத்தம்", desc: "Meticulous attention to every single hem." },
    ];

    return (
        <section id="about" ref={sectionRef} className="py-20 bg-surface-muted relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">

                    {/* Visual Side - Editorial Layout */}
                    <div className="relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Image Container with Custom Mask */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-premium">
                                <img
                                    src="/Blouse3.jpg"
                                    alt="Boutique Craftsmanship"
                                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                            </div>

                            {/* Floating Glass Card */}
                            <motion.div
                                style={{ y }}
                                className="absolute -bottom-12 -right-12 p-10 glass rounded-[3rem] shadow-glow border-white/40 max-w-[300px]"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-accent rounded-2xl text-white shadow-lg">
                                        <Star size={24} fill="currentColor" />
                                    </div>
                                    <div>
                                        <span className="text-3xl font-serif font-bold text-primary block">4.9/5</span>
                                        <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Rating</span>
                                    </div>
                                </div>
                                <p className="text-[11px] leading-relaxed font-medium text-primary/70">
                                    Trusted by over <span className="text-primary font-bold">1,000+ brides</span> for their most precious moments across Tamil Nadu.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Vertical Decorative Element */}
                        <div className="absolute -left-20 top-1/2 -rotate-90 origin-center hidden xl:block">
                            <span className="text-[10px] uppercase tracking-[1em] text-accent font-black">Crafting Excellence Since 2012</span>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4"
                            >
                                <span className="text-accent font-black tracking-[0.5em] uppercase text-[10px]">The Heritage</span>
                                <div className="h-px flex-1 bg-border/60"></div>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-6xl md:text-8xl font-serif text-primary leading-[0.9] tracking-tighter ${language === "ta" ? "tamil-text" : ""}`}
                            >
                                {language === "ta" ? (
                                    <>நூலிழையில் <br /><span className="italic text-accent">மாயம்</span></>
                                ) : (
                                    <>The Alchemy <br />of <span className="italic text-accent">Artistry.</span></>
                                )}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-primary/80 text-xl leading-relaxed font-light font-sans tracking-wide max-w-xl"
                            >
                                {language === "ta"
                                    ? "அபி ஃபேஷன் டிசைனர் - பாரம்பரிய தையல் கலை மற்றும் நவீன வடிவமைப்பு இரண்டையும் இணைத்து உங்கள் கனவு ஆடையை உருவாக்குகிறோம்."
                                    : "Founded on the principles of precision and passion, ABI Fashion Designer transforms premium textiles into timeless expressions of individuality. Our studio is dedicated to the art of the perfect fit."}
                            </motion.p>
                        </div>

                        {/* Specializations - Interactive Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {specs.map((spec, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-6 group cursor-default"
                                >
                                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-surface-muted flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm border border-border/40">
                                        <spec.icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm font-black uppercase tracking-[0.15em] text-primary group-hover:text-accent transition-colors block">
                                            {language === "ta" ? spec.ta : spec.en}
                                        </span>
                                        <p className="text-[11px] text-primary/70 font-medium leading-relaxed">{spec.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats & CTA */}
                        <div className="pt-16 border-t border-border/60 space-y-12">
                            <div className="flex flex-wrap gap-x-16 gap-y-10">
                                {stats.map(stat => (
                                    <div key={stat.id}>
                                        <div className="text-5xl font-serif font-bold text-primary mb-1">{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-accent font-black">{language === "ta" ? stat.tamil : stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-primary hover:text-accent transition-all duration-300"
                            >
                                <span>Learn our process</span>
                                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
