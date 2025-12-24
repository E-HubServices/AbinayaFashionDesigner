import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useState } from "react";
import WorkCard from "@/components/WorkCard";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Filter } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ErrorBoundary from "@/components/ErrorBoundary";
import { cn } from "@/lib/utils";

export default function WorksPage() {
    return (
        <ErrorBoundary>
            <WorksContent />
        </ErrorBoundary>
    );
}

function WorksContent() {
    const worksQuery = useQuery(api.works.getAllWorks);
    const categoriesQuery = useQuery(api.categories.getAllCategories);

    const works = worksQuery || [];
    const dbCategories = categoriesQuery || [];

    // Use DB categories if available, otherwise use defaults
    const defaultCategories = ["Blouse", "Salwar", "Frock", "Kids", "Gowns", "Bridal"];
    const categories = dbCategories.length > 0
        ? ["All", ...dbCategories.map(c => c.name)]
        : ["All", ...defaultCategories];

    const [activeCategory, setActiveCategory] = useState("All");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { language } = useLanguage();

    const filteredWorks =
        activeCategory === "All"
            ? works
            : (works as any[]).filter(w => w.category === activeCategory);

    return (
        <div className="min-h-screen bg-surface-muted">
            <main className="pt-32 pb-24">

                {/* ===== HERO / INTRO ===== */}
                <section className="container mx-auto px-6 mb-20 text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="block text-[11px] tracking-[0.35em] uppercase text-accent mb-6"
                    >
                        {language === "ta" ? "கைவினைத் தொகுப்பு" : "Bespoke Craft Archive"}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                            "text-4xl md:text-6xl font-serif text-primary font-bold leading-tight mb-6",
                            language === "ta" && "tamil-text"
                        )}
                    >
                        {language === "ta" ? "எங்கள் படைப்புகள்" : "Timeless Works, Tailored With Care"}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="max-w-2xl mx-auto text-muted text-lg font-light leading-relaxed"
                    >
                        {language === "ta"
                            ? "ஒவ்வொரு வடிவமைப்பும் அனுபவத்தின் பிரதிபலிப்பு."
                            : "Each piece reflects decades of mastery, patience, and personal attention."}
                    </motion.p>
                </section>

                {/* ===== CATEGORY SELECTOR ===== */}
                <section className="sticky top-24 z-[40] mb-20">
                    <div className="container mx-auto px-6">

                        {/* Mobile Drawer Trigger */}
                        <div className="md:hidden">
                            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                                <SheetTrigger asChild>
                                    <button className="w-full bg-white/90 backdrop-blur-xl rounded-full px-6 py-4 shadow-lg border border-primary/10 flex items-center justify-between text-primary">
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-black">
                                            {language === "ta" ? "வகை" : "Refine Archive"}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-accent text-[10px] font-black uppercase tracking-wider">{activeCategory === "All" ? "All" : activeCategory}</span>
                                            <Filter size={14} strokeWidth={2.5} />
                                        </div>
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="bottom" className="rounded-t-[2.5rem] p-8 bg-white/95 backdrop-blur-2xl border-t border-primary/10">
                                    <SheetHeader className="mb-8">
                                        <SheetTitle className="text-center font-serif text-3xl text-primary">
                                            {language === "ta" ? "தொகுப்புகள்" : "Collections"}
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="grid grid-cols-2 gap-4 pb-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                                        {categories.map(c => (
                                            <button
                                                key={c}
                                                onClick={() => { setActiveCategory(c); setIsSheetOpen(false); }}
                                                className={cn(
                                                    "p-5 rounded-2xl border transition-all text-center uppercase tracking-[0.2em] text-[10px] font-black",
                                                    activeCategory === c
                                                        ? "bg-primary text-white border-primary shadow-lg"
                                                        : "bg-surface-muted text-primary/60 border-transparent hover:bg-white hover:border-primary/20"
                                                )}
                                            >
                                                {c === "All" && language === "ta" ? "அனைத்தும்" : c === "All" ? "All Works" : c}
                                            </button>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Desktop Horizontal List */}
                        <div className="hidden md:block mx-auto w-fit bg-white/90 backdrop-blur-xl rounded-full px-4 py-2 shadow-lg border border-primary/10">
                            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                {categories.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setActiveCategory(c)}
                                        className={cn(
                                            "px-6 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 whitespace-nowrap",
                                            activeCategory === c
                                                ? "bg-primary text-white shadow-md"
                                                : "text-primary/60 hover:text-primary hover:bg-primary/5"
                                        )}
                                    >
                                        {c === "All"
                                            ? language === "ta"
                                                ? "அனைத்தும்"
                                                : "All Collections"
                                            : c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== GRID ===== */}
                <section className="container mx-auto px-6 md:px-12">
                    <AnimatePresence mode="popLayout">
                        {!worksQuery ? (
                            <SkeletonGrid />
                        ) : filteredWorks.length === 0 ? (
                            <EmptyState
                                category={activeCategory}
                                language={language}
                                onReset={() => setActiveCategory("All")}
                            />
                        ) : (
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
                            >
                                {(filteredWorks as any[]).map((work, idx) => (
                                    <motion.div
                                        key={work._id}
                                        layout
                                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.7,
                                            delay: idx * 0.05,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                    >
                                        <WorkCard work={work} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <Footer />
            </main>
        </div>
    );
}

/* ===== Skeleton ===== */
function SkeletonGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="aspect-[4/5] rounded-[2.5rem] bg-white border border-border/20 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
                </div>
            ))}
        </div>
    );
}

/* ===== Empty State ===== */
function EmptyState({
    category,
    language,
    onReset,
}: {
    category: string;
    language: string;
    onReset: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-48 text-center"
        >
            <div className="w-28 h-28 mx-auto rounded-full bg-white shadow-inner flex items-center justify-center text-accent/40 mb-10">
                <Scissors size={44} strokeWidth={1} />
            </div>

            <h3 className={cn(
                "text-4xl font-serif text-primary mb-4",
                language === "ta" && "tamil-text"
            )}>
                {language === "ta"
                    ? "புதிய வடிவமைப்புகள் விரைவில்"
                    : "New Works Coming Soon"}
            </h3>

            <p className="max-w-lg mx-auto text-muted font-light leading-relaxed">
                {category !== "All"
                    ? `We are curating new pieces under the ${category} collection.`
                    : "We are currently preparing several bespoke creations."}
            </p>

            <button
                onClick={onReset}
                className="mt-10 text-[11px] tracking-[0.35em] uppercase font-semibold text-accent hover:text-primary transition-colors"
            >
                View Full Archive
            </button>
        </motion.div>
    );
}
