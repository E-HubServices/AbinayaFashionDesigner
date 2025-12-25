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
                    <div className="relative group mb-8 sm:mb-12">
                        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-opacity duration-300" />
                        <div className="relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl text-white/90 shadow-2xl hover:border-accent/50 hover:bg-white/10 transition-colors duration-300">
                            <Sparkles size={14} className="text-accent" />
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black">
                                {language === "ta" ? "பெண்கள் மற்றும் குழந்தைகளுக்கான தையல்" : "Bespoke Couture for Ladies & Kids"}
                            </span>
                        </div>
                    </div>

                    <div className="text-center mb-8 sm:mb-12 px-4">
                        <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-serif text-white leading-[0.85] tracking-tighter select-none">
                            {language === "ta" ? (
                                <span className="block">
                                    நேர்த்தியான <br />
                                    <span
                                        className="text-accent italic font-light inline-block mt-2 sm:mt-4"
                                        style={{ textShadow: "0 0 40px rgba(234, 179, 8, 0.3)" }}
                                    >
                                        கலை
                                    </span>
                                </span>
                            ) : (
                                <>
                                    <span
                                        className="block"
                                        style={{
                                            textShadow: "0 10px 30px rgba(0,0,0,0.3)"
                                        }}
                                    >
                                        Timeless
                                    </span>
                                    <span
                                        className="block text-accent italic font-light mt-2 sm:mt-4"
                                        style={{
                                            textShadow: "0 0 40px rgba(234, 179, 8, 0.4), 0 10px 30px rgba(0,0,0,0.3)"
                                        }}
                                    >
                                        Artistry.
                                    </span>
                                </>
                            )}
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4 sm:px-6 font-sans tracking-wide text-center">
                        {language === "ta"
                            ? "அபி ஃபேஷன் டிசைனர் - உங்கள் விசேஷ தருணங்களை மறக்க முடியாததாக மாற்றும் நேர்த்தியான ஆரி மற்றும் பிரைடல் வேலைப்பாடுகள்."
                            : "Celebrating the intersection of traditional Indian craftsmanship and contemporary high-fashion silhouettes."}
                    </p>



                    <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-white/40 text-xs sm:text-sm font-light">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="uppercase tracking-wider">{language === "ta" ? "100+ வாடிக்கையாளர்கள்" : "100+ Clients"}</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="uppercase tracking-wider">{language === "ta" ? "கைவினை நிபுணத்துவம்" : "Artisan Expertise"}</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="uppercase tracking-wider">{language === "ta" ? "தனிப்பயன் வடிவமைப்பு" : "Custom Design"}</span>
                        </div>
                    </div>
                </div>
            </motion.div>



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