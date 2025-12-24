import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-6"
                }`}
        >
            <nav className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo - Minimal */}
                <Link to="/" className="group">
                    <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${scrolled ? "bg-primary text-white" : "bg-white/20 backdrop-blur-md text-white border border-white/30"}`}>
                            <span className="font-serif font-bold text-xl">A</span>
                        </div>
                        <span className={`text-xl font-serif font-bold tracking-wide transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white hidden"}`}>
                            {t("brandName")}
                        </span>
                    </div>
                </Link>

                {/* Right Actions: Lang + Hamburger Only (No Desktop Menu) */}
                <div className="flex items-center gap-6">
                    {/* Language Toggle - Text Only */}
                    <button
                        onClick={() => setLanguage(language === "ta" ? "en" : "ta")}
                        className={`text-sm tracking-widest uppercase font-medium transition-colors duration-300 ${scrolled ? "text-foreground hover:text-primary" : "text-white/80 hover:text-white"}`}
                    >
                        {language === "ta" ? "EN" : "TA"}
                    </button>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`p-2 transition-colors duration-300 ${scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"}`}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="fixed inset-0 top-0 bg-background z-40 flex flex-col justify-center items-center space-y-8 animate-fade-in">
                        {(["home", "works", "about", "contact"] as const).map((key) => (
                            <Link
                                key={key}
                                to={key === "home" ? "/" : key === "works" ? "/works" : `#${key}`}
                                className="text-3xl font-serif text-primary-dark hover:text-accent transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t(key)}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}
