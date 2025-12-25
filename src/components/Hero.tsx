import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronDown, Sparkles, Play } from "lucide-react";

export default function Hero() {
    const { language, t } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Advanced parallax transforms
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Mouse parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const heroImages = [
        "/hero1.jpg",
        "/hero2.jpg",
        "/hero3.jpg"
    ];

    // Preload images
    useEffect(() => {
        heroImages.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
        setImageLoaded(true);
    }, []);

    // Image carousel with pause on hover
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Mouse move parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX - innerWidth / 2) / 50);
            mouseY.set((clientY - innerHeight / 2) / 50);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleScrollDown = () => {
        const aboutSection = document.querySelector("#about");
        aboutSection?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={containerRef}
            className="relative h-screen flex items-center justify-center bg-primary overflow-hidden"
            style={{ minHeight: "100svh" }}
        >
            {/* Cinematic Background System */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                {/* Image Slideshow */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('${heroImages[currentImageIndex]}')`,
                                filter: "brightness(0.85) contrast(1.1)",
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Sophisticated Overlay System */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/50 to-primary/95 z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-accent/20 mix-blend-multiply z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] z-10" />

                {/* Dynamic Light Elements with Mouse Parallax */}
                <motion.div
                    style={{ x: smoothMouseX, y: smoothMouseY }}
                    className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-accent/15 rounded-full blur-[120px] mix-blend-screen opacity-70 z-20"
                />
                <motion.div
                    style={{
                        x: useTransform(smoothMouseX, x => -x * 0.5),
                        y: useTransform(smoothMouseY, y => -y * 0.5)
                    }}
                    className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[100px] mix-blend-screen opacity-50 z-20"
                />
            </motion.div>

            {/* Slideshow Progress Indicators */}
            <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className="group relative"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className={`w-8 sm:w-12 h-1 rounded-full transition-all duration-500 ${index === currentImageIndex
                            ? "bg-accent"
                            : "bg-white/20 hover:bg-white/40"
                            }`}>
                            {index === currentImageIndex && (
                                <motion.div
                                    className="h-full bg-accent rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    key={`progress-${index}-${currentImageIndex}`}
                                    transition={{ duration: 5, ease: "linear" }}
                                />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30"
            >
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    {/* Premium Badge */}
                    <motion.div
                        initial={{ y: 30, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group mb-8 sm:mb-12"
                    >
                        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl text-white/90 shadow-2xl hover:border-accent/50 hover:bg-white/10 transition-all duration-500">
                            <Sparkles size={14} className="text-accent animate-pulse" />
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black">
                                {language === "ta" ? "பெண்கள் மற்றும் குழந்தைகளுக்கான தையல்" : "Bespoke Couture for Ladies & Kids"}
                            </span>
                        </div>
                    </motion.div>

                    {/* Hero Headline - Responsive Typography */}
                    <div className="text-center mb-8 sm:mb-12 px-4">
                        <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-serif text-white leading-[0.85] tracking-tighter select-none">
                            {language === "ta" ? (
                                <motion.span
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="block"
                                >
                                    நேர்த்தியான <br />
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8, duration: 1 }}
                                        className="text-accent italic font-light inline-block mt-2 sm:mt-4"
                                        style={{ textShadow: "0 0 40px rgba(234, 179, 8, 0.3)" }}
                                    >
                                        கலை
                                    </motion.span>
                                </motion.span>
                            ) : (
                                <>
                                    <motion.span
                                        initial={{ opacity: 0, y: 50, rotateX: 45 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="block"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            textShadow: "0 10px 30px rgba(0,0,0,0.3)"
                                        }}
                                    >
                                        Timeless
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 50, rotateX: 45 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="block text-accent italic font-light mt-2 sm:mt-4"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            textShadow: "0 0 40px rgba(234, 179, 8, 0.4), 0 10px 30px rgba(0,0,0,0.3)"
                                        }}
                                    >
                                        Artistry.
                                    </motion.span>
                                </>
                            )}
                        </h1>
                    </div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4 sm:px-6 font-sans tracking-wide text-center"
                    >
                        {language === "ta"
                            ? "அபி ஃபேஷன் டிசைனர் - உங்கள் விசேஷ தருணங்களை மறக்க முடியாததாக மாற்றும் நேர்த்தியான ஆரி மற்றும் பிரைடல் வேலைப்பாடுகள்."
                            : "Celebrating the intersection of traditional Indian craftsmanship and contemporary high-fashion silhouettes."}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-4"
                    >
                        {/* Primary CTA */}
                        <Link
                            to="/works"
                            className="group relative w-full sm:w-auto"
                        >
                            <div className="absolute inset-0 bg-accent rounded-full blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500" />
                            <div className="relative px-10 sm:px-16 py-4 sm:py-6 bg-accent text-white font-black rounded-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex items-center justify-center gap-3">
                                <span className="relative z-10 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-[11px]">
                                    {t("viewWorks") || "View Works"}
                                </span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                            </div>
                        </Link>

                        {/* Secondary CTA */}
                        <button
                            onClick={handleScrollDown}
                            className="group relative w-full sm:w-auto"
                        >
                            <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="relative flex items-center justify-center gap-4 sm:gap-6 px-10 sm:px-16 py-4 sm:py-6 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-500 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-[11px] backdrop-blur-sm">
                                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                                    {language === "ta" ? "மேலும் அறிக" : "Discover More"}
                                </span>
                                <motion.div
                                    className="w-8 sm:w-10 h-px bg-white/20 group-hover:bg-accent transition-all duration-500"
                                    animate={{ width: ["32px", "40px", "32px"] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                />
                            </div>
                        </button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-white/40 text-xs sm:text-sm font-light"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="uppercase tracking-wider">{language === "ta" ? "100+ வாடிக்கையாளர்கள்" : "100+ Clients"}</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="uppercase tracking-wider">{language === "ta" ? "கைவினை நிபுணத்துவம்" : "Artisan Expertise"}</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="uppercase tracking-wider">{language === "ta" ? "தனிப்பயன் வடிவமைப்பு" : "Custom Design"}</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.button
                onClick={handleScrollDown}
                style={{ opacity }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 sm:gap-4 group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                aria-label="Scroll down"
            >
                <div className="relative w-6 h-10 sm:w-7 sm:h-12 rounded-full border-2 border-white/30 group-hover:border-accent/50 transition-colors overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-accent rounded-full"
                    />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/50 group-hover:text-white/80 font-bold transition-colors">
                    {language === "ta" ? "கீழே உருட்டவும்" : "Scroll"}
                </span>
            </motion.button>

            {/* Ambient Grain Texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-40"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat"
                }}
            />

            {/* Vignette Effect */}
            <div className="absolute inset-0 pointer-events-none z-30 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
        </section>
    );
}