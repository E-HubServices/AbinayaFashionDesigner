import { Link, useLocation } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAdmin } from "@/contexts/AdminContext"
import { cn } from "@/lib/utils"
import { User, LogOut, LayoutGrid, Globe, Scissors, Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect, useCallback, useRef } from "react"
import LoginModal from "./LoginModal"

export default function Navbar() {
    const { language, setLanguage } = useLanguage()
    const { isAdmin, logout } = useAdmin()
    const location = useLocation()
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const navRef = useRef(null)

    // Advanced scroll detection with threshold
    const { scrollY } = useScroll()
    const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1])
    const navBlur = useTransform(scrollY, [0, 100], [8, 24])
    const isScrolled = useTransform(scrollY, (value) => value > 20)
    const [scrollState, setScrollState] = useState(false)

    useEffect(() => {
        return isScrolled.on("change", setScrollState)
    }, [isScrolled])

    // Performance optimized scroll handler
    useEffect(() => {
        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    ticking = false
                })
                ticking = true
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [location.pathname])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [mobileMenuOpen])

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false)
                setDropdownOpen(false)
            }
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [])

    const navLinks = [
        { name: "Archive", path: "/works", tamil: "படைப்புகள்", id: "works" },
        { name: "The Studio", path: "/#about", tamil: "பற்றி", id: "about" },
        { name: "Inquiry", path: "/contact", tamil: "தொடர்பு", id: "contact" },
    ]

    const handleLanguageToggle = useCallback(() => {
        setLanguage(language === "en" ? "ta" : "en")
    }, [language, setLanguage])

    const isActiveLink = (path: string) => {
        if (path === "/") return location.pathname === "/"
        return location.pathname.startsWith(path.split("#")[0])
    }

    return (
        <>
            <motion.nav
                ref={navRef}
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1
                }}
                style={{
                    opacity: navOpacity,
                }}
                className={cn(
                    "fixed top-4 left-1/2 z-[100] w-[95%] md:w-fit bg-white/80 backdrop-blur-3xl border border-primary/10 rounded-full shadow-premium h-14 lg:h-16 flex items-center px-6 lg:px-10"
                )}
            >
                <div className="flex items-center justify-between w-full gap-8">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 lg:gap-3 group relative z-10"
                        aria-label="ABI Couture Home"
                    >
                        <div className="relative w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent rounded-lg lg:rounded-xl shadow-lg shadow-primary/20">
                            <Scissors
                                size={18}
                                strokeWidth={1.5}
                                className="text-white"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-xl lg:text-2xl font-bold tracking-tighter text-primary">ABI</span>
                            <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.4em] font-black -mt-1 text-accent">Couture</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
                        {navLinks.map((link) => {
                            const isActive = isActiveLink(link.path)
                            return (
                                <Link
                                    key={link.id}
                                    to={link.path}
                                    className="relative px-4 xl:px-6 py-2.5 text-[10px] xl:text-[11px] uppercase tracking-[0.4em] font-black transition-all duration-300 group rounded-full text-primary/70 hover:text-primary hover:bg-primary/5"
                                >
                                    <span className="relative z-10">
                                        {language === "ta" ? link.tamil : link.name}
                                    </span>
                                    <motion.span
                                        layoutId="navbar-indicator"
                                        className={cn(
                                            "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-accent via-primary to-accent rounded-full",
                                            isActive ? "w-8" : "w-0 group-hover:w-8"
                                        )}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3 lg:gap-4">
                        {/* Language Toggle */}
                        <button
                            onClick={handleLanguageToggle}
                            aria-label={`Switch to ${language === "en" ? "Tamil" : "English"}`}
                            className={cn(
                                "hidden sm:flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full transition-colors duration-300 group relative overflow-hidden bg-surface-muted/80 hover:bg-primary text-primary hover:text-white shadow-sm"
                            )}
                        >
                            <Globe size={14} strokeWidth={2.5} className="relative z-10" />
                            <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest relative z-10">
                                {language === "en" ? "தமிழ்" : "EN"}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        {/* User Dropdown */}
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    aria-label="User menu"
                                    className={cn(
                                        "w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 relative overflow-hidden group bg-gradient-to-br from-primary via-primary to-accent text-white shadow-lg shadow-primary/30"
                                    )}
                                >
                                    <User size={16} strokeWidth={2.5} className="relative z-10" />
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-72 p-2 rounded-3xl bg-white/95 backdrop-blur-2xl shadow-2xl border border-black/5 mt-2"
                                sideOffset={8}
                            >
                                {isAdmin ? (
                                    <>
                                        <div className="px-4 py-3 mb-1 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10">
                                            <p className="text-[9px] uppercase tracking-widest text-accent font-black">Authorized Access</p>
                                            <p className="text-sm font-serif text-primary mt-1 font-medium">Abi Designer</p>
                                        </div>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/admin"
                                                className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white transition-all group my-1"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                                    <LayoutGrid size={16} className="text-primary group-hover:text-white transition-colors" />
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-widest flex-1">Dashboard</span>
                                                <ChevronDown size={14} className="-rotate-90 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </DropdownMenuItem>
                                        <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-1" />
                                        <DropdownMenuItem
                                            onClick={logout}
                                            className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 transition-all group my-1"
                                        >
                                            <div className="w-8 h-8 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                                                <LogOut size={16} />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest">Logout</span>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <DropdownMenuItem
                                        onClick={() => setShowLoginModal(true)}
                                        className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                            <User size={16} className="text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest flex-1">Staff Portal</span>
                                        <ChevronDown size={14} className="-rotate-90 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={mobileMenuOpen}
                            className={cn(
                                "lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 bg-primary/10 text-primary hover:bg-primary hover:text-white"
                            )}
                        >
                            <Menu size={20} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence mode="wait">
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm lg:hidden"
                            aria-hidden="true"
                        />

                        {/* Menu Panel - Vertical Slide Down */}
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="fixed inset-0 z-[200] bg-white lg:hidden flex flex-col"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-8 border-b border-black/5">
                                    <div className="flex flex-col">
                                        <span className="font-serif text-3xl font-bold tracking-tighter text-primary">ABI</span>
                                        <span className="text-[10px] uppercase tracking-[0.4em] font-black -mt-1 text-accent">Couture</span>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                        aria-label="Close menu"
                                        className="w-12 h-12 rounded-full bg-primary/5 hover:bg-primary hover:text-white flex items-center justify-center text-primary transition-all shadow-sm"
                                    >
                                        <X size={24} strokeWidth={1.5} />
                                    </motion.button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 flex flex-col justify-center px-12 space-y-8" aria-label="Mobile navigation">
                                    {navLinks.map((link, index) => {
                                        const isActive = isActiveLink(link.path)
                                        return (
                                            <motion.div
                                                key={link.id}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 + 0.2 }}
                                            >
                                                <Link
                                                    to={link.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={cn(
                                                        "group flex items-center gap-6 py-4 transition-all",
                                                        isActive ? "text-accent" : "text-primary hover:text-accent"
                                                    )}
                                                >
                                                    <span className="text-5xl md:text-7xl font-serif font-bold tracking-tighter italic">
                                                        {language === "ta" ? link.tamil : link.name}
                                                    </span>
                                                    <div className={cn(
                                                        "h-px bg-accent transition-all duration-700",
                                                        isActive ? "w-20" : "w-0 group-hover:w-12"
                                                    )} />
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </nav>

                                {/* Footer Actions - Editorial Style */}
                                <div className="p-12 border-t border-black/5 flex flex-col items-start gap-8">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-accent font-black">Region / Voice</p>
                                        <button
                                            onClick={handleLanguageToggle}
                                            className="text-2xl font-serif italic text-primary hover:text-accent transition-colors flex items-center gap-4"
                                        >
                                            <Globe size={20} className="text-accent" />
                                            <span>{language === "en" ? "தமிழ் (Tamil)" : "English (UK)"}</span>
                                        </button>
                                    </div>
                                    <div className="space-y-3 opacity-80">
                                        <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-primary">© {new Date().getFullYear()} ABI Couture</p>
                                        <div className="pt-2 border-t border-black/5">
                                            <p className="text-[9px] uppercase tracking-[0.2em] font-black text-primary">
                                                Design & Dev: <span className="text-accent underline decoration-accent/20 underline-offset-4">Manoj</span>
                                            </p>
                                            <a href="mailto:manoj12k6@gmail.com" className="text-[8px] uppercase tracking-[0.1em] text-primary/80 hover:text-accent transition-colors block mt-1">
                                                manoj12k6@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )
                }
            </AnimatePresence>

            {/* Login Modal */}
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </>
    )
}