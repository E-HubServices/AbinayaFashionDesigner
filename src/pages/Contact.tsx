import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Clock, Mail, Facebook, Instagram, Send, Navigation, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Contact() {
    const { language, t } = useLanguage();

    const ownerDetails = {
        name: "K. Abinaya",
        address: {
            line1: "48/3 Chinna Sengodam Palayam",
            line2: "Golden City 1st Street",
            line3: "Thindal Post",
            city: "Erode - 638012",
            state: "Tamil Nadu, India"
        },
        phone: "+91 97880 78748",
        whatsapp: "919788078748",
        email: "abidesigner@example.com",
        hours: {
            weekdays: "9:00 AM - 7:00 PM",
            sunday: "10:00 AM - 5:00 PM"
        },
        social: {
            instagram: "https://instagram.com/abi_couture",
            facebook: "https://facebook.com/abicouture"
        },
        mapUrl: "https://maps.google.com/?q=11.3410,77.7172" // Erode coordinates
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as any
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-surface-muted via-white to-surface-muted/30">
            <main className="relative pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 lg:pb-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">

                    {/* Enhanced Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-16 sm:mb-20 lg:mb-24 space-y-6"
                    >
                        {/* Decorative Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm mb-6">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/70">
                                {language === "ta" ? "எங்களை அணுகவும்" : "Let's Connect"}
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-primary tracking-tight leading-[0.95]">
                            {language === "ta" ? "தொடர்பு கொள்ள" : "Get in Touch"}
                        </h1>

                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-accent" />
                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-accent" />
                        </div>

                        <p className="text-primary/60 text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed px-4">
                            {language === "ta"
                                ? "உங்கள் கனவு ஆடையை வடிவமைக்க எங்களை அணுகவும். நாங்கள் உங்கள் விசேஷ தருணங்களை மறக்க முடியாததாக மாற்ற காத்திருக்கிறோம்."
                                : "Visit our boutique or reach out to us to begin your bespoke journey. We're here to make your special moments unforgettable."}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start"
                    >

                        {/* Contact Information Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl sm:rounded-[3rem] p-8 sm:p-10 lg:p-14 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-primary/5 space-y-10 sm:space-y-12 relative overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            {/* Owner & Address */}
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                                        <MapPin className="text-white" size={24} />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-serif text-primary">
                                        {language === "ta" ? "முகவரி" : "The Boutique"}
                                    </h2>
                                </div>
                                <div className="space-y-2 text-base sm:text-lg text-primary/80 font-light leading-relaxed pl-0 sm:pl-4">
                                    <p className="font-semibold text-primary text-lg sm:text-xl">{ownerDetails.name}</p>
                                    <p className="text-primary/70">{ownerDetails.address.line1}</p>
                                    <p className="text-primary/70">{ownerDetails.address.line2}</p>
                                    <p className="text-primary/70">{ownerDetails.address.line3}</p>
                                    <p className="text-primary/70">{ownerDetails.address.city}</p>
                                    <p className="text-primary/70">{ownerDetails.address.state}</p>
                                </div>

                                {/* Get Directions Button */}
                                <a
                                    href={ownerDetails.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/5 hover:bg-primary text-primary hover:text-white transition-all duration-300 group font-medium text-sm"
                                >
                                    <Navigation size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                                    <span>{language === "ta" ? "வழிகாட்டுதல்கள் பெறுங்கள்" : "Get Directions"}</span>
                                    <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                                </a>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                            {/* Contact Methods */}
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg shadow-accent/20">
                                        <Phone className="text-white" size={24} />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-serif text-primary">
                                        {language === "ta" ? "தொடர்பு விவரங்கள்" : "Direct Contact"}
                                    </h2>
                                </div>
                                <div className="space-y-4 pl-0 sm:pl-4">
                                    <a
                                        href={`tel:${ownerDetails.phone}`}
                                        className="flex items-center gap-4 text-base sm:text-lg text-primary hover:text-accent transition-all duration-300 group p-4 rounded-2xl hover:bg-accent/5"
                                    >
                                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-surface-muted flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                                            <Phone size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs uppercase tracking-wider text-primary/40 font-bold mb-0.5">Phone</div>
                                            <div className="font-medium">{ownerDetails.phone}</div>
                                        </div>
                                        <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 text-accent transition-all" />
                                    </a>
                                    <a
                                        href={`mailto:${ownerDetails.email}`}
                                        className="flex items-center gap-4 text-base sm:text-lg text-primary hover:text-accent transition-all duration-300 group p-4 rounded-2xl hover:bg-accent/5"
                                    >
                                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-surface-muted flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                                            <Mail size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs uppercase tracking-wider text-primary/40 font-bold mb-0.5">Email</div>
                                            <div className="font-medium break-all">{ownerDetails.email}</div>
                                        </div>
                                        <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 text-accent transition-all" />
                                    </a>
                                </div>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                            {/* Hours */}
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                                        <Clock className="text-white" size={24} />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-serif text-primary">
                                        {language === "ta" ? "வேலை நேரம்" : "Studio Hours"}
                                    </h2>
                                </div>
                                <div className="space-y-3 pl-0 sm:pl-4">
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5">
                                        <span className="text-primary/70 font-medium">Monday - Saturday</span>
                                        <span className="text-primary font-bold text-sm sm:text-base">{ownerDetails.hours.weekdays}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/5">
                                        <span className="text-primary/70 font-medium">Sunday</span>
                                        <span className="text-primary font-bold text-sm sm:text-base">{ownerDetails.hours.sunday}</span>
                                    </div>
                                </div>
                            </div>

                        </motion.div>

                        {/* Quick Actions & Map */}
                        <div className="space-y-6 sm:space-y-8">

                            {/* WhatsApp Action */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-br from-[#25D366]/10 via-[#25D366]/5 to-transparent rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 border border-[#25D366]/20 relative overflow-hidden group hover:border-[#25D366]/40 hover:shadow-xl hover:shadow-[#25D366]/10 transition-all duration-500 cursor-pointer"
                                onClick={() => window.open(`https://wa.me/${ownerDetails.whatsapp}`, '_blank')}
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#25D366]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                                <div className="flex items-start justify-between relative z-10">
                                    <div className="space-y-5 flex-1">
                                        <div className="w-16 h-16 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            <MessageCircle size={32} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-[#075E54] mb-2">
                                                {language === "ta" ? "வாட்ஸ்அப்பில் அரட்டை" : "WhatsApp Us"}
                                            </h3>
                                            <p className="text-[#075E54]/70 text-sm sm:text-base font-medium leading-relaxed">
                                                {language === "ta"
                                                    ? "விரைவான பதில்களுக்கு நேரடியாக அரட்டையடிக்கவும்"
                                                    : "Chat directly for quick responses and instant support"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#075E54]/20 flex items-center justify-center text-[#075E54] group-hover:bg-[#075E54] group-hover:text-white group-hover:border-[#075E54] transition-all duration-300 flex-shrink-0 ml-4">
                                        <Send size={20} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Social Media Grid */}
                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-2 gap-4 sm:gap-6"
                            >
                                <a
                                    href={ownerDetails.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white p-6 sm:p-8 rounded-3xl border border-border flex flex-col items-center justify-center gap-4 hover:border-transparent hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10 transition-all duration-500" />
                                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-surface-muted to-surface-muted/50 flex items-center justify-center text-primary group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-orange-500 group-hover:text-white transition-all duration-500 shadow-lg transform group-hover:scale-110 group-hover:rotate-6">
                                        <Instagram size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className="font-bold text-primary text-sm sm:text-base relative z-10">Instagram</span>
                                </a>

                                <a
                                    href={ownerDetails.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white p-6 sm:p-8 rounded-3xl border border-border flex flex-col items-center justify-center gap-4 hover:border-transparent hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-500 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-500" />
                                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface-muted flex items-center justify-center text-primary group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg transform group-hover:scale-110 group-hover:rotate-6">
                                        <Facebook size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className="font-bold text-primary text-sm sm:text-base relative z-10">Facebook</span>
                                </a>
                            </motion.div>

                            {/* Enhanced Map Placeholder */}
                            <motion.div
                                variants={itemVariants}
                                className="aspect-[16/10] sm:aspect-video bg-gradient-to-br from-surface-dark to-surface-muted rounded-3xl sm:rounded-[2.5rem] overflow-hidden relative group shadow-xl border border-primary/5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 flex items-center justify-center backdrop-blur-sm">
                                    <div className="text-center space-y-4 p-6">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/80 backdrop-blur-xl flex items-center justify-center mx-auto shadow-xl transform group-hover:scale-110 transition-transform duration-500">
                                            <MapPin size={32} className="text-primary" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <span className="text-primary/60 font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
                                                {language === "ta" ? "இடம்" : "Location"}
                                            </span>
                                            <span className="text-primary font-semibold text-sm sm:text-base">
                                                {language === "ta" ? "வரைபடத்தில் காண்க" : "View on Map"}
                                            </span>
                                        </div>
                                        <a
                                            href={ownerDetails.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold text-sm hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                        >
                                            <span>{language === "ta" ? "திறக்க" : "Open Map"}</span>
                                            <ArrowUpRight size={16} />
                                        </a>
                                    </div>
                                </div>
                                {/* In production, replace with actual map iframe */}
                                {/* <iframe 
                                    src="https://www.google.com/maps/embed?..."
                                    className="w-full h-full"
                                    allowFullScreen
                                    loading="lazy"
                                /> */}
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}